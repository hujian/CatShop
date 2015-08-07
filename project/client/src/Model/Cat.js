/*
* @brief:  猫相关的业务类。
*          是充血的model，除了拥有原始的业务数据外，还绑定其他业务逻辑和view model的逻辑。
* @author: Hj
* @date:   2015-06-24
*/

// 猫的配置类
var CatSetting = CatSetting || {};

// 猫状态数据更新时间
CatSetting.updateInterval = 10;

// 掉毛概率
CatSetting.dropHairprobability = 0.05;

// 猫进化表
CatSetting.evelveSetting = {};
CatSetting.evelveSetting.probablity = {
    // 进化等级 = 进化概率
    1 : 1,
    3 : 0.2,
    5 : 0.2,
    7 : 0.2,
    9 : 0.2,
    10 : 1
};

// 猫相关事件
CatSetting.dropHairEvent = "cat_drop_hair_event";

// 加载数据，因为是配置文件是json，需要异步加载，所以需要在scene加载出来后，手动调用该方法。
CatSetting.load = function () {
    if (!this.adult || !this.baby) {
        // 猫仔的配置数据
        this.baby = new DataModel();
        this.baby.loadDataFromJson(gameResource.global.baby_cat_setting);

        // 成猫的配置数据
        this.adult = new DataModel();
        this.adult.loadDataFromJson(gameResource.global.cat_setting);

        // 成猫的进化配置
        for (var i in this.adult.jsonData) {
            var setting = this.adult.jsonData[i];
            var parentId = setting.parentId;
            if (!CatSetting.evelveSetting[parentId]) {
                CatSetting.evelveSetting[parentId] = [];
            }
            CatSetting.evelveSetting[parentId].push(setting.id);
        }
    }
};

// 获取所有成猫的数据
CatSetting.getAllAdult = function() {
    return this.adult.jsonData;
};

// 根据猫的id，获取成猫数据
CatSetting.getAdultById = function(id) {
    if (id > 0 && this.adult) {
        return this.adult.jsonData[id - CatSetting.getAllBaby().length - 1];
    }
};

// 获取所有猫仔的数据
CatSetting.getAllBaby = function() {
    return this.baby.jsonData;
};

// 根据猫的id，获取猫仔数据
CatSetting.getBabyById = function (id) {
    if (id > 0 && this.baby) {
        return this.baby.jsonData[id - 1];
    }
};

CatSetting.isBaby = function(id) {
    return id <= this.baby.jsonData.length;
};

// 根据id的大小，判断是否是成年猫
CatSetting.getById = function(id) {
    if (typeof(id) == 'string') id = parseInt(id);

    if (CatSetting.isBaby(id)) {
        return CatSetting.getBabyById(id);
    } else {
        return CatSetting.getAdultById(id);
    }
};

// cs 就是 cat state
var cs = {
    stand: 0,
    walk: 1,
    sleep: 2,
    eat: 3
};

var Cat = function(id) {
    this.id = id;
    this.instanceId = User.getNewInstanceId();

    // 状态更新剩余的时间
    this.updateStatusTimeLeft = CatSetting.updateInterval;

    // 饥饿程度
    this.hungry = 50;

    // 健康值
    this.health = 50;

    // 成长值
    this.growth = 0;

    // 是否打了疫苗
    this.vaccine = false;

    // 当前状态
    this.state = cs.stand;

    // 某一个状态持续的时间, 第一个状态是站立，不要超过1
    this.stateLastingTime = 1;
};

// 更新猫的状态
Cat.prototype.update = function(interval) {
    this.updateStatusTimeLeft -= interval;
    this.stateLastingTime = this.getStateLastingTime() - interval;

    if (this.updateStatusTimeLeft <= 0) {
        // 饥饿值
        this.hungry = Math.min(100, this.hungry + 1);
        this.updateStatusTimeLeft = CatSetting.updateInterval;

        // 掉毛
        if (Math.random() < CatSetting.dropHairprobability) {
            var event = new cc.EventCustom(CatSetting.dropHairEvent);
            event.setUserData(this);
            cc.eventManager.dispatchEvent(event);
        }

        // 健康值
        this.health = Math.max(0, Math.min(100, this.health + this.getHealthSpeed()));

        // 成长
        var oldGrowthLevel = parseInt(this.growth / 10);
        this.growth = Math.min(100, this.growth + this.getGrowthSpeed());
        var newGrowthLevel = parseInt(this.growth / 10);
        // 进化
        if (newGrowthLevel > oldGrowthLevel) {
            var setting = CatSetting.evelveSetting;
            if (setting.probablity[newGrowthLevel]) {
                if (Math.random() < setting.probablity[newGrowthLevel]) { // 是否能够进化
                    var children = setting[this.id];
                    if (children) {
                        if (children.length > 1) {
                            this.id = children[Util.getRandomInt(0, children.length)];
                        } else {
                            this.id = children[0];
                        }
                    }
                }
            }
        }
    }

    // 动作
    if (this.stateLastingTime <= 0) {
        switch (this.state) {
            case cs.stand: {
                this.state = cs.walk;
                this.stateLastingTime = Util.getRandomInt(2, 10)
                break;
            }
            case cs.walk: {
                this.state = cs.eat;
                this.stateLastingTime = Util.getRandomInt(5, 10)
                break;
            }
            case cs.eat: {
                this.state = cs.sleep;
                this.stateLastingTime = Util.getRandomInt(5, 20)
                break;
            }
            case cs.sleep: {
                this.state = cs.stand;
                this.stateLastingTime = Util.getRandomInt(1, 2)
                break;
            }
        }
    }
};

Cat.prototype.clean = function() {
};

// 喂猫
Cat.prototype.feed = function(foodValue) {
    this.hungry = Math.max(0, this.hungry - foodValue);
};

// 给猫吃药
Cat.prototype.takeMedicine = function(healthValue) {
    this.health = Math.min(100, this.health + healthValue);
};

// 给猫打疫苗
Cat.prototype.takeVaccine = function() {
    this.vaccine = true;
};

// 获取猫的成长加速度
Cat.prototype.getGrowthSpeed = function() {
    var speed = 0;

    // 健康加成
    var health = this.getHealth();
    if (health > 80) {
        speed += 1;
    } else if (health > 60){
        speed += 0.5;
    }

    // 饥饿影响
    var hungry = this.getHungry();
    if (hungry <= 40) {
        speed += 1;
    } else if (hungry <= 80) {
        speed += 0.5;
    }

    return speed
};

// 根据当前环境，计算健康变化量
Cat.prototype.getHealthSpeed = function() {
    // 猫屋的环境值
    var speed = CatManager.getHealthValue();

    // 饥饿影响
    var hungry = this.getHungry();
    if (hungry > 60) {
        speed -= 0.5;
    } else if (hungry <= 20) {
        speed += 0.5;
    }

    return speed
};

// 属性get方法，注意第一句话，是否为了防止，升级代码时，该属性在上一个版本没有
Cat.prototype.hasVaccine = function() {
    this.vaccine = this.vaccine || false;
    return this.vaccine == true;
};

Cat.prototype.getHungry = function() {
    this.hungry = this.hungry || 0;
    return this.hungry;
};

Cat.prototype.getHealth = function() {
    this.health = this.health || 0;
    return this.health
};

Cat.prototype.getCatGrowth = function() {
    this.growth = this.growth || 0;
    return this.growth
};

Cat.prototype.getStateLastingTime = function() {
    this.stateLastingTime = this.stateLastingTime || 1;
    return this.stateLastingTime
};

Cat.prototype.getState = function() {
    return this.state
};
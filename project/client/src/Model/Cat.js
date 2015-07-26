/*
* @brief:  猫相关的业务类。
*          是充血的model，除了拥有原始的业务数据外，还绑定其他业务逻辑和view model的逻辑。
* @author: Hj
* @date:   2015-06-24
*/

// 猫的配置表，拿到就是两张，为了方便起见，直接把成年猫的id改成从6开始
var AdultCatStartId = 6

// 猫的配置类
var CatSetting = CatSetting || {}

// 猫状态数据更新时间
CatSetting.updateInterval = 10

// 掉毛概率
CatSetting.dropHairprobability = 0.05

// 猫相关事件
CatSetting.dropHairEvent = "cat_drop_hair_event"


// 加载数据，因为是配置文件是json，需要异步加载，所以需要在scene加载出来后，手动调用该方法。
CatSetting.load = function () {
    if (!this.adult || !this.baby) {
        // 猫仔的配置数据
        this.baby = new DataModel()
        this.baby.loadDataFromJson(gameResource.global.baby_cat_setting)

        // 成猫的配置数据
        this.adult = new DataModel()
        this.adult.loadDataFromJson(gameResource.global.cat_setting)
    }
}

// 获取所有成猫的数据
CatSetting.getAllAdult = function() {
    return this.adult.jsonData
}

// 根据猫的id，获取成猫数据
CatSetting.getAdultById = function(id) {
    if (id > 0 && this.adult) {
        return this.adult.jsonData[id - 1]
    }
}

// 获取所有猫仔的数据
CatSetting.getAllBaby = function() {
    return this.baby.jsonData
}

// 根据猫的id，获取猫仔数据
CatSetting.getBabyById = function (id) {
    if (id > 0 && this.baby) {
        return this.baby.jsonData[id - 1]
    }
}

// 根据id的大小，判断是否是成年猫
CatSetting.getById = function(id) {
    if (typeof(id) == 'string') id = parseInt(id)

    if (id < AdultCatStartId) {
        return CatSetting.getBabyById(id)
    } else {
        return CatSetting.getAdultById(id)
    }
}

var Cat = function(id) {
    this.id = id
    this.instanceId = User.getNewInstanceId()

    // 状态更新剩余的时间
    this.updateStatusTimeLeft = CatSetting.updateInterval

    // 饥饿程度，0 ~ 100, 初始0
    this.hungry = 0

    // 健康值, 0~100, 初始100
    this.health = 100

    // 成长值，0~100，初始0
    this.growth = 0

    // 是否打了疫苗
    this.vaccine = false
}

Cat.prototype.clean = function() {
}

Cat.prototype.update = function(interval) {
    this.updateStatusTimeLeft -= interval

    if (this.updateStatusTimeLeft <= 0) {
        // 饥饿值
        this.hungry = Math.min(100, this.hungry + 1)
        this.updateStatusTimeLeft = CatSetting.updateInterval

        // 掉毛
        if (Math.random() < CatSetting.dropHairprobability) {
            var event = new cc.EventCustom(CatSetting.dropHairEvent);
            event.setUserData(this);
            cc.eventManager.dispatchEvent(event);
        }

        // 健康值
        this.health = Math.max(0, Math.min(100, this.health + CatManager.getHealthValue()))

        // 成长值
        this.growth = Math.min(100, this.growth + this.getGrowthSpeed())
    }
}

// 喂猫
Cat.prototype.feed = function(foodValue) {
    this.hungry = Math.max(0, this.hungry - foodValue)
}

// 给猫吃药
Cat.prototype.takeMedicine = function(healthValue) {
    this.health = Math.min(100, this.health + healthValue)
}

// 给猫打疫苗
Cat.prototype.takeVaccine = function() {
    this.vaccine = true
}

// 获取猫的成长加速度
Cat.prototype.getGrowthSpeed = function() {
    var speed = 0

    var health = this.getHealth()
    if (health == 100) {
        speed = 1
    } else if (health > 80){
        speed = 0.5
    }

    return speed
}

// 属性get方法，注意第一句话，是否为了防止，升级代码时，该属性在上一个版本没有
Cat.prototype.hasVaccine = function() {
    this.vaccine = this.vaccine || false
    return this.vaccine == true
}

Cat.prototype.getHungry = function() {
    this.hungry = this.hungry || 0
    return this.hungry
}

Cat.prototype.getHealth = function() {
    this.health = this.health || 0
    return this.health
}

Cat.prototype.getCatGrowth = function() {
    this.growth = this.growth || 0
    return this.growth
}
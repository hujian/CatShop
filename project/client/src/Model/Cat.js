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

// 猫状态更新间隔
CatSetting.updateInterval = 10

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

    // 饥饿程度，10秒增加1，最大100
    this.hungry = 0
}

Cat.prototype.clean = function() {
    this.stop()
}

// 喂猫
Cat.prototype.feed = function(foodId, count) {
    var foodSetting = FoodSetting.getById(foodId)
    this.hungry = Math.max(0, this.hungry - foodSetting.effect *count)
    User.flush()
}

// cat要进入养育状态，就调用该函数
Cat.start = function() {
    cc.director.getScheduler().schedule(Cat.update, Cat, CatSetting.updateInterval, cc.REPEAT_FOREVER, 0, false, "cat")
}

// 状态更新
Cat.update = function(interval) {
    var allCats = User.getAllCats()
    for (var i in allCats) {
        var cat = allCats[i]
        cat.hungry = Math.min(100, cat.hungry + 1)
    }
    User.flush()
}

// 如果要暂停养育，希望cat的所有状态暂时挺住，就掉用该函数
Cat.stop = function() {
    cc.director.getScheduler().unschedule(Cat.update, Cat)
}
/*
* @brief:  猫的管理逻辑，等于猫屋的核心逻辑
* @author: Hj
* @date:   2015-07-24
*/

var CatManager = CatManager || {}

// cat要进入养育状态，就调用该函数
CatManager.start = function() {
    cc.director.getScheduler().schedule(CatManager.update, CatManager, CatSetting.updateInterval, cc.REPEAT_FOREVER, 0, false, "cat")
}

// 状态更新
CatManager.update = function(interval) {
    var allCats = User.getAllCats()
    for (var i in allCats) {
        var cat = allCats[i]
        cat.updateStatusTimeLeft -= interval
        if (cat.updateStatusTimeLeft <= 0) {
            cat.hungry = Math.min(100, cat.hungry + 1)
            cat.updateStatusTimeLeft = CatSetting.updateInterval
        }
    }
    User.flush()
}

// 如果要暂停养育，希望cat的所有状态暂时挺住，就掉用该函数
CatManager.stop = function() {
    cc.director.getScheduler().unschedule(CatManager.update, CatManager)
}

// 喂食
CatManager.feed = function(cat, foodId, count) {
    count = count || 1
    var foodSetting = FoodSetting.getById(foodId)
    cat.feed(foodSetting.value * count)
    User.flush()
}

// 打药
CatManager.takeMedicine = function(cat, itemId, count) {
    count = count || 1
    var itemSetting = ItemSetting.getById(itemId)
    cat.takeMedicine(itemSetting.value * count)
    User.flush()
}

// 打疫苗
CatManager.takeVaccine = function(cat) {
    cat.takeVaccine()
    User.flush()
}

// 瘟疫来袭
CatManager.hasPlague = function() {
    var allCats = User.getAllCats()
    for (var i in allCats) {
        var cat = allCats[i]
        if (!cat.hasVaccine) {
            cat.health = Math.max(0, cat.health - 40)
        }
    }
    User.flush()
}
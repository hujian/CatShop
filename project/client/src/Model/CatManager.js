/*
* @brief:  猫的管理逻辑，等于猫屋的核心逻辑
* @author: Hj
* @date:   2015-07-24
*/

var CatManager = CatManager || {}

// update逻辑更新的频率
CatManager.updateInterval = 1

// 用户保存到本的时间间隔
CatManager.savingDataInterval = 10
CatManager.savingDataLeftTime = CatManager.savingDataInterval

// 是否在养育状态
CatManager.rasingCat = false

// cat要进入养育状态，就调用该函数
CatManager.start = function() {
    cc.director.getScheduler().schedule(CatManager.update, CatManager, CatManager.updateInterval, cc.REPEAT_FOREVER, 0, false, "cat")
    CatManager.rasingCat = true
}

// 如果要暂停养育，希望cat的所有状态暂时挺住，就掉用该函数
CatManager.stop = function() {
    cc.director.getScheduler().unschedule(CatManager.update, CatManager)
    CatManager.rasingCat = false
}

// 状态更新
CatManager.update = function(interval) {
    // 更新猫的状态
    var allCats = User.getAllCats()
    for (var i in allCats) {
        var cat = allCats[i]
        cat.update(interval)
    }

    // 更新风扇
    if (User.getFansCount() > 0) {
        User.removeItem(ItemSetting.id.fan, interval)
    }

    // 保存数据
    CatManager.savingDataLeftTime -= interval
    if (CatManager.savingDataLeftTime <= 0) {
        CatManager.savingDataLeftTime = CatManager.savingDataInterval
        User.flush()
    }
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
        if (!cat.hasVaccine()) {
            cat.health = Math.max(0, cat.health - 40)
        }
    }
    User.flush()
}

// 最大可能的清理猫毛
// 清理干净了，返回true
CatManager.clearHair = function() {
    var hair = User.getHairCount()
    var cleaner = User.getHairCleanerCount()
    if (hair > 0 && cleaner > 0) {
        var count = Math.min(User.get)
        User.removeItem(ItemSetting.id.hairCleaner, count)
        User.updateHairCount(hair - count)
    }
    return User.getHairCount() == 0
}

// 计算当前猫屋的健康值
CatManager.getHealthValue = function() {
    var healthValue = User.getFansCount() > 0 ? 1 : -1
    healthValue -= (User.getHairCount() > 0 ? parseInt(User.getHairCount() / 5) : -1)
    return healthValue
}
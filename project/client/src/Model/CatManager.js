/*
* @brief:  猫的管理逻辑，等于猫屋的核心逻辑
* @author: Hj
* @date:   2015-07-24
*/

var CatManager = CatManager || {};

// update逻辑更新的频率
CatManager.updateInterval = 1 / 30;

// 用户保存到本的时间间隔
CatManager.savingDataInterval = 10;
CatManager.savingDataLeftTime = CatManager.savingDataInterval;

// 测试阶段数据收集频率
CatManager.collectUserDataInerval = 30;
CatManager.collectUserDataLeftTime = CatManager.collectUserDataInerval;

// 是否在养育状态
CatManager.rasingCat = false;

// cat要进入养育状态，就调用该函数
CatManager.start = function(rect) {
    cc.director.getScheduler().schedule(CatManager.update, CatManager, CatManager.updateInterval, cc.REPEAT_FOREVER, 0, false, "cat");

    CatManager.rasingCat = true;
    CatManager.moveRect = rect;

    var cats = User.getAllCats();
    var count = cats.length;

    // 计算猫的初始位置
    var unitWidth = rect.width / cats.length;
    var unitHeight = rect.height / cats.length;
    var positions = [];
    for (var i=0; i<count; i++) {
        for (var j=0; j<count; j++) {
            var random = Util.getRandomArbitrary(-0.1, 0.1);
            var x = parseInt((i + 0.5 + random) * unitWidth);
            random = Util.getRandomArbitrary(-0.2, 0.2);
            var y = parseInt((j + 0.5 + random) * unitHeight);
            positions.push(cc.p(rect.x + x, rect.y + y));
        }
    }

    // 打乱随机
    Util.shuffle(positions);

    for (var i=0; i<cats.length; i++) {
        var cat = cats[i];
        cat.setPosition(positions[i]);
    }

    // 开始启动内部的计时器
    Time.start();
};

CatManager.getRandomPositionInMovingRect = function() {
    var x = Util.getRandomInt(this.moveRect.x, this.moveRect.x + this.moveRect.width);
    var y = Util.getRandomInt(this.moveRect.y, this.moveRect.y + this.moveRect.height);
    return cc.p(x, y);
};

// 如果要暂停养育，希望cat的所有状态暂时挺住，就掉用该函数
CatManager.stop = function() {
    cc.director.getScheduler().unschedule(CatManager.update, CatManager);
    CatManager.rasingCat = false;

    // 停止计时
    Time.stop();
};

// 状态更新
CatManager.update = function(interval) {
    // 更新猫的状态
    var allCats = User.getAllCats();
    for (var i in allCats) {
        allCats[i].update(interval);
    }

    // 更新风扇
    if (User.getFansCount() > 0) {
        User.removeItem(ItemSetting.id.fan, interval);
    }

    // 保存数据
    CatManager.savingDataLeftTime -= interval
    if (CatManager.savingDataLeftTime <= 0) {
        CatManager.savingDataLeftTime = CatManager.savingDataInterval;
        User.flush();
    }

    // 测试开发阶段玩家数据收集
    //if (cc.isDebug) {
    //    CatManager.collectUserDataLeftTime -= interval
    //    if (CatManager.collectUserDataLeftTime <= 0) {
    //        CatManager.collectUserDataLeftTime = CatManager.collectUserDataInerval
    //        var request = cc.loader.getXMLHttpRequest()
    //        request.open('POST', cc.game.config['userDataCollectServerURL'], true)
    //        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //        request.send('jsonString=' + User.getDataJsonString())
    //        cc.log('send user report')
    //    }
    //}
};

// 喂食
CatManager.feed = function(cat, foodId, count) {
    count = count || 1;
    var foodSetting = FoodSetting.getById(foodId);
    cat.feed(foodSetting.value * count);
    User.flush();
};

// 打药
CatManager.takeMedicine = function(cat, itemId, count) {
    count = count || 1;
    var itemSetting = ItemSetting.getById(itemId);
    cat.takeMedicine(itemSetting.value * count);
    User.flush();
};

// 打疫苗
CatManager.takeVaccine = function(cat) {
    cat.takeVaccine();
    User.flush();
};

// 瘟疫来袭
CatManager.hasPlague = function() {
    var allCats = User.getAllCats();
    for (var i in allCats) {
        var cat = allCats[i];
        if (!cat.hasVaccine()) {
            cat.health = Math.max(0, cat.health - 40);
        }
    }
    User.flush();
};

// 最大可能的清理猫毛
// 清理干净了，返回true
CatManager.clearHair = function() {
    var hair = User.getHairCount();
    var cleaner = User.getHairCleanerCount();
    if (hair > 0 && cleaner > 0) {
        var count = Math.min(User.get);
        User.removeItem(ItemSetting.id.hairCleaner, count);
        User.updateHairCount(hair - count);
    }
    return User.getHairCount() == 0;
};

// 计算当前猫屋的健康值
CatManager.getHealthValue = function() {
    var healthValue = User.getFansCount() > 0 ? 1 : -1;
    healthValue -= (User.getHairCount() > 0 ? parseInt(User.getHairCount() / 5) : -1);
    return healthValue
};

// 食物
CatManager.food = [];

// 加入食物
CatManager.addFood = function(food) {
    CatManager.food.push(food);
};

// 查询当前的食物，传入true，就直接扣除该食物，返回的是上层的食物精灵
// 传入cat，用以查找合适的食物
CatManager.findFood = function(cat) {
    var foods = CatManager.food;
    if (foods.length > 0) {
        for (var i=foods.length-1; i>=0; i--) {
            var food = foods[i];
            if (food.canEat) {
                foods.splice(i, 1);
                return food;
            }
        }
    }
    return null;
};
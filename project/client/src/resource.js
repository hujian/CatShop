/*
* @brief:  游戏内的资源定义文件
* @author: Hj
* @date:   2015-07-21
*/

var gameResource = gameResource || {}

// 游戏一登陆就需要加载的资源
gameResource.global = {
    cat_setting: "res/setting/cat.json",
    baby_cat_setting: "res/setting/babyCat.json",
    item_setting: "res/setting/item.json",
    food_setting: "res/setting/food.json"
}

// 测试用的资源
if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0) {
    gameResource.global.testButton = "res/test/test_button.png"
}

// 返回数组
gameResource.getGlobal = function () {
    var res = [];
    for (var i in gameResource.global) {
        res.push(gameResource.global[i]);
    }
    return res
}


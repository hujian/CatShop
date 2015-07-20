/*
* @brief:  游戏状态数据
* @author: Hj
* @date:   2015-06-30
*/

var App = App || {}
App.data = new DataModel()
App.dataSavingKey = "App_Data_Saving_key"

// 从本地缓存获取用户数据
App.restore = function() {
    if (App.data.loadDataFromLocalStorage(App.dataSavingKey)) {
        App.data.jsonData.launchCount += 1
    } else {
        App.data.jsonData.launchCount = 1
    }
    cc.log("launch count: " + App.data.jsonData.launchCount)
}

// 保存数据到local storage
// 程序初期化后，就应该调用该函数，保存必要的运行信息，比如运行次数加一
App.flush = function() {
    App.data.saveDataToLocalStorage(App.dataSavingKey)
}

// 是否是程序第一次运行
App.isFirstLaunch = function() {
    return App.data.jsonData.launchCount == 1
}
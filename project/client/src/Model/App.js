/*
* @brief:  游戏状态数据
* @author: Hj
* @date:   2015-06-30
*/

var App = App || {};
App.data = new DataModel();
App.dataSavingKey = "App_Data_Saving_key";

// 从本地缓存获取用户数据
App.restore = function() {
    if (App.data.loadDataFromLocalStorage(App.dataSavingKey)) {
        App.data.jsonData.launchCount += 1;
    } else {
        App.initData();
    }
    cc.log("launch count: " + App.data.jsonData.launchCount);
};

App.initData = function() {
    App.data.jsonData.launchCount = 1;  // 游戏运行次数
    App.data.jsonData.needBackgroundMusic = true;  // 是否要背景音
    App.data.jsonData.needAudioEffect = true;  // 是否要音效
};

// 保存数据到local storage
// 程序初期化后，就应该调用该函数，保存必要的运行信息，比如运行次数加一
App.flush = function() {
    App.data.saveDataToLocalStorage(App.dataSavingKey);
};

// 是否是程序第一次运行
App.isFirstLaunch = function() {
    return App.data.jsonData.launchCount == 1;
};

// 是否要背景音
App.getNeedBackgroundMusic = function() {
    return App.data.jsonData.needBackgroundMusic;
};

// 更新背景音设置
App.setNeedBackgroundMusic = function(need) {
    App.data.jsonData.needBackgroundMusic = need;
};

// 是否要音效
App.getNeedAudioEffect = function() {
    return App.data.jsonData.needAudioEffect;
};

// 更新音效
App.setNeedAudioEffect = function(need) {
    App.data.jsonData.needAudioEffect = need;
};

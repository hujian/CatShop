/*
* @brief:  自动化测试管理工具
* @author: Hj
* @date:   2015-07-31
*/

var TestManager = TestManager || {};

// 测试项目的名称
TestManager.testName = {};
TestManager.testName.one = "one";

// 开始某项自动测试
TestManager.start = function (name) {
    this.currentTestName = name;

    switch (name) {
        case TestManager.testName.one:
            User.initUserData();
            User.flush();

            Shop.buyItem(ItemSetting.id.fan, 2);
            Shop.buyItem(ItemSetting.id.hairCleaner, 20);
            Shop.buyFood();

            CatManager.start();
            Util.speedUp(10);

            break
    }
};

// 停止测试
TestManager.stop = function () {
    CatManager.stop();
    Util.speedUp(1);
};
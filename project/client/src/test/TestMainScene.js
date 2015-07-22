/* 
* @brief:
* @author: hujian
* @date:   2015-04-01 21:28:02
*/


var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();
        this.needBackButton = false
        this.needSwitchButton = false

        // 正常UI测试用例
        this.addTestButton('正常流程', this.goRoutine)

        // 文字UI测试用例
        this.addTestButton('测试-主界面', this.goTestShop)
        this.addTestButton('测试-猫屋', this.goTestCat)
        this.addTestButton('测试-猫食工厂', this.goTestFood)
    },

    onEnter:function() {
        // temp in developing
        if (cc.isDebug) {
            this.goTestShop()
        }
    },

    goRoutine:function () {
    },

    goTestShop:function () {
        cc.director.pushScene(new TestGameScene())
    },

    goTestCat:function () {
        cc.director.pushScene(new TestCatScene())
    },

    goTesetFood:function () {
        cc.director.pushScene(new TestFoodScene())
    }
});
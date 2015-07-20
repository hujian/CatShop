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

        // 加入测试用例按钮
        this.addTestButton('正常流程', this.goRoutine)
        this.addTestButton('商店', this.goShop)
        this.addTestButton('猫屋', this.goCat)
        this.addTestButton('猫食工厂', this.goFood)
    },

    onEnter:function() {
        // temp in developing
        if (cc.isDebug) {
            this.goShop()
        }
    },

    goRoutine:function () {
    },

    goShop:function () {
        cc.director.pushScene(new TestGameScene())
    },

    goCat:function () {
        cc.director.pushScene(new TestCatScene())
    },

    goFood:function () {
        cc.director.pushScene(new TestFoodScene())
    }
});
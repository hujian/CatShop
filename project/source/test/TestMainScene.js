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
        this.addTestButton('文字模式', this.goText)
    },

    onEnter:function() {
        // temp in developing
        if (cc.isDebug) {
            this.goText()
        }
    },

    goRoutine:function () {
    },

    goShop:function () {
        cc.director.pushScene(new ShopScene())
    },

    goText:function () {
        cc.director.pushScene(new TestGameScene())
    }
});
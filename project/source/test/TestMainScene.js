/* 
* @breife: 
* @author: hujian
* @date:   2015-04-01 21:28:02
*/


var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();
        this.needBackButton = false
        this.needSwitchButton = false

        // 正常流程
        this.addTestButton('正常流程', this.goRoutine)

        // 商店测试
        this.addTestButton('商店', this.goShop)

        // temp in developing
        if (cc.isDebug) {
            this.goShop()
        }
    },

    goRoutine:function () {
    },

    goShop:function () {
        cc.director.pushScene(new ShopScene());
    },
});
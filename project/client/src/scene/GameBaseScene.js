/*
* @brief:  所有游戏场景的基类
* @author: Hj
* @date:   2015-06-24
*/

var GameBaseScene = cc.Scene.extend({
    ctor:function () {
        this._super()
        this.init()
    },

    init:function () {
    	this._super()

        // 返回键响应
        this.backKeyReleasedEvent = new EventHandler();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: this.onKeyReleased
        }, this);
    },

    // 最上层的接受者响应返回键响应
    onKeyReleased: function (keyCode, event) {
        if(keyCode == cc.KEY.escape) {
            this.backKeyReleasedEvent.raiseLastHandler();
        }
    }
})
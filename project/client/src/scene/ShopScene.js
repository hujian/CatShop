/* 
* @breife: 商店界面
* @author: hujian
* @date:   2015-06-01 21:28:02
*/

var ShopScene = GameBaseScene.extend({
    init:function () {
    	this._super()

        this.initUI()
    },

    initUI:function () {

    },

    onEnter:function () {
        this._super()
    },

    onExit:function () {
        this._super()
    }
})

ShopScene.create = function () {
    return new ShopScene
}
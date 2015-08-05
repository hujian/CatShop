/* 
* @brief: 商店页
* @author: Hj
* @date:   2015-06-01 21:28:02
*/

var ShopLayer = GameBaseLayer.extend({
    ctor:function () {
    	this._super();

        this.initUI();
    },

    initUI:function () {
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    }
});

ShopLayer.create = function () {
    return new ShopLayer
};
/*
* @brief:  售卖页
* @author: Hj
* @date:   2015-08-02
*/

var SellLayer = GameBaseLayer.extend({
    init:function () {
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
})

SellLayer.create = function () {
    return new SellLayer
}
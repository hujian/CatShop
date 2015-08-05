/*
* @brief:  食物生产页
* @author: Hj
* @date:   2015-08-02
*/

var FoodLayer = GameBaseLayer.extend({
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
});

FoodLayer.create = function () {
    return new FoodLayer;
};
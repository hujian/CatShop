/*
* @brief:  猫屋
* @author: Hj
* @date:   2015-08-02
*/

var CatHouseLayer = GameBaseLayer.extend({
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

CatHouseLayer.create = function () {
    return new CatHouseLayer;
};
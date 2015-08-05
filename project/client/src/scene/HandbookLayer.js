/*
* @brief:  图鉴页
* @author: Hj
* @date:   2015-08-02
*/

var HandbookLayer = GameBaseLayer.extend({
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

HandbookLayer.create = function () {
    return new HandbookLayer;
};
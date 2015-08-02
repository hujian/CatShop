/*
* @brief:  售卖场景
* @author: Hj
* @date:   2015-08-02
*/

var SellScene = GameBaseScene.extend({
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

SellScene.create = function () {
    return new SellScene
}
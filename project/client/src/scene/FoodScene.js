/*
* @brief:  食物生产场景
* @author: Hj
* @date:   2015-08-02
*/

var FoodScene = GameBaseScene.extend({
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

FoodScene.create = function () {
    return new FoodScene
}
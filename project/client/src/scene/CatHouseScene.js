/*
* @brief:  猫屋，游戏主场景
* @author: Hj
* @date:   2015-08-02
*/

var CatHouseScene = GameBaseScene.extend({
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

CatHouseScene.create = function () {
    return new CatHouseScene
}
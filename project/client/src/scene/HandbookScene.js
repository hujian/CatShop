/*
* @brief:  图鉴场景
* @author: Hj
* @date:   2015-08-02
*/

var HandbookScene = GameBaseScene.extend({
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

HandbookScene.create = function () {
    return new HandbookScene
}
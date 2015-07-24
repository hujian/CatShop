/*
* @brief:  UI测试菜单
* @author: Hj
* @date:   2015-07-24
*/

var TestUIScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.addTestButton('弹出层', this.goPopup)
        this.addTestButton('内容层', this.goLayer)
    },

    goPopup:function () {
        cc.director.pushScene(new TestPopupScene())
    },

    goLayer:function () {
        cc.director.pushScene(new TestLayerScene())
    }
})
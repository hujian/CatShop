/*
* @brief:  弹出层测试
* @author: Hj
* @date:   2015-07-22
*/

var TestPopupScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.addTestButton("弹出一个", this.popOne)
        this.addTestButton("弹出5个", this.popFive)
    },

    popOne:function () {
        this.createLayer(this.getLayerText())
    },

    popFive:function () {
        for (var i = 0; i<5; i++) {
            this.createLayer(this.getLayerText())
        }
    },

    getLayerText:function () {
        return "弹出层" +  (this.backKeyReleasedEvent.size() + 1).toString()
    },

    createLayer:function (text) {
        var layer = new PopupBaseLayer()
        layer.setAnchorPoint(cc.p(0.5, 0.5))
        layer.ignoreAnchorPointForPosition(false)
        layer.setContentSize(cc.size(300, 200))
        layer.setPosition(cc.visibleRect.center)
        this.addChild(layer)

        var bgLayer = new cc.LayerColor(cc.color(52, 113, 143, 255));
        bgLayer.setContentSize(layer.getContentSize())
        layer.addChild(bgLayer, 0);

        var label = new ccui.Text(text, TestSceneFontName, 12)
        label.setColor(cc.color.BLACK)
        label.setPosition(cc.p(150, 100))
        layer.addChild(label)

        var button = this.createTestButton("再弹出一个", this.createLayer)
        button.setPosition(cc.p(150, 150))
        layer.addChild(button)
    }
})
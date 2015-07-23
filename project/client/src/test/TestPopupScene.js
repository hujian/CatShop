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
        this.popLayer()
    },

    popFive:function () {
        for (var i = 0; i<5; i++) {
            this.popLayer()
        }
    },

    popLayer:function () {
        var layer = new TestPopupLayer()
        layer.present()

        // 显示当前的弹出层是第几个
        var label = new ccui.Text("弹出层" +  this.backKeyReleasedEvent.size().toString(), TestSceneFontName, 12)
        label.setColor(cc.color.BLACK)
        label.setPosition(cc.p(150, 100))
        layer.contentLayer.addChild(label)

        // 可以在现在这个弹出层上，再弹出一个
        layer.addTestButton("再弹出一个", this.popOne, this)
    }
})
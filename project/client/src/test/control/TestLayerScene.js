/*
* @brief:  测试内容layer的页面
* @author: Hj
* @date:   2015-07-24
*/

var TestLayerScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.addTestButton(["显示带边框的layer", "隐藏带边框的layer"], this.showBorderLayer)
        this.addTestButton(['显示contentLayer', '隐藏contentLayer'], this.showContentLayer)

        this.cellContent = []
        for (var i = 0; i < 10; i++) {
            this.cellContent.push("真是一只好猫" + i.toString())
        }
    },

    showBorderLayer:function(button, state) {
        if (state == 1) {
            var layer = new GameBaseLayer()
            layer.setContentSize(cc.size(200, 400))
            layer.setPosition(cc.p(50, 50))
            layer.showBorder(true)
            this.addChild(layer)
            this.borderLayer = layer
        } else {
            this.borderLayer && this.borderLayer.removeFromParent()
        }
    },

    showContentLayer:function(button, state) {
        if (state == 1) {
            var layer = new TestContentCellLayer()
            layer.setContentSize(cc.size(500, 400))
            layer.setPosition(cc.p(180, 20))
            this.addChild(layer)
            layer.showBorder(true)
            this.contentLayer = layer
            this.reloadContentLayer()
        } else {
            this.closeContentLayer()
        }
    },

    reloadContentLayer:function() {
        this.contentLayer.cellCount = parseInt((this.cellContent.length + 1) / 2)
        this.contentLayer.clearAllContent()
        for (var i = 0; i < this.cellContent.length; i++) {
            var content = this.cellContent[i]
            var name = '猫' + i.toString()
            this.contentLayer.addCell(name, content, ['关闭', '删除'], this.contentLayerOperation, this, content)
            this.contentLayer.cells[name].status.setString('状态真的好！')
        }
    },

    closeContentLayer:function(button) {
        this.contentLayer && this.contentLayer.removeFromParent()
    },

    contentLayerOperation:function(button) {
        if (button.operation == "关闭") {
            this.closeContentLayer(button)
        } else {
            var index = this.cellContent.indexOf(button.userData)
            this.cellContent.splice(index, 1)
            this.reloadContentLayer()
        }
    }
})
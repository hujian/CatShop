/*
* @brief:  游戏内容layer基础类
* @author: Hj
* @date:   2015-07-24
*/

var GameBaseLayer = cc.Layer.extend({
    ctor:function () {
        this._super()

        this.borderColor = cc.color.RED
    },

    // show之前，一定要设置contentSize
    showBorder:function (show) {
        if (show) {
            this.border = new cc.DrawNode()
            this.border.drawRect(cc.p(0, 0), cc.p(this.getContentSize().width, this.getContentSize().height), null, 1, this.borderColor)
            this.addChild(this.border)
        } else {
            if (this.border) {
                this.border.removeFromParent()
                this.border = null
            }
        }
    }
})
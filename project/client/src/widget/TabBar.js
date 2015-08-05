/*
* @brief:  TabBar控件
* @author: Hj
* @date:   2015-08-04
*/

var TabBar = GameBaseLayer.extend({
    // items 是imagePath数组，注意path不要带文件后缀，默认.png，高亮文件带_on
    ctor:function (items, callback, target, texType, index) {
        this._super()
        this._callback = callback
        this._target = target
        this._buttons = []
        this._lastSelectedButtonIndex = -1
        index = index || 0

        var height = 0
        var width = 0
        for (var i in items) {
            var imagePath = items[i]
            var button = new ccui.Button(imagePath + '.png', imagePath + '_on.png', null, texType)
            button.setAnchorPoint(cc.p(0, 0))
            button.addTouchEventListener(this.tabBarSelect, this)
            button.setPosition(width, 0)
            button.index = parseInt(i)
            this.addChild(button)
            height = Math.max(height, button.getContentSize().height)
            width += button.getContentSize().width
            this._buttons.push(button)
        }
        this.setContentSize(width, height)

        this.select(index)
    },

    tabBarSelect:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (button.index != this._lastSelectedButtonIndex) {
                this.select(button.index)
            }
        }
    },

    select:function(index) {
        if (this._lastSelectedButtonIndex >= 0) {
            this._buttons[this._lastSelectedButtonIndex].setHighlighted(false)
            this._buttons[this._lastSelectedButtonIndex].setEnabled(true)
        }
        if (index >= 0 && index < this._buttons.length) {
            this._buttons[index].setHighlighted(true)
            this._buttons[index].setEnabled(false)
        }

        if (this._callback && this._target) {
            this._callback.call(this._target, index)
        }

        this._lastSelectedButtonIndex = index
    },

    currentSelect:function() {
        return this._lastSelectedButtonIndex
    }
})

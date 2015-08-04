/* 
* @brief:  翻页控件
* @author: Hj
* @date:   2015-08-04
*/

var PageLayer = GameBaseLayer.extend({
    ctor:function (arrow, background, texType, callBack, target) {
        this._super()
        this._currentPageIndex = 0
        this._pages = []

        if (background) {
            var bg = new cc.Sprite("#" + background)
            bg.setAnchorPoint(cc.p(0, 0))
            bg.setPosition(cc.p(0, 0))
            this.addChild(bg)
            this.setContentSize(bg.getContentSize())
        }

        if (arrow) {
            var leftArrow = new ccui.Button(arrow, null, null, texType)
            leftArrow.addTouchEventListener(this.leftArrowTouch, this)
            leftArrow.setAnchorPoint(cc.p(0, 0))
            leftArrow.setPosition(cc.p(0, 0))
            this.addChild(leftArrow)
            this._leftArrow = leftArrow

            var rightArrow = new ccui.Button(arrow, null, null, texType)
            leftArrow.addTouchEventListener(this.rightArrowTouch, this)
            rightArrow.setFlippedX(true)
            rightArrow.setAnchorPoint(cc.p(0, 0))
            rightArrow.setPosition(cc.p(this.getContentSize().width, 0))
            this.addChild(rightArrow)
            this._rightArrow = rightArrow
        }

        this.showBorder(true)
    },

    addPage:function(layer) {
        if (this._pages.length == 0) {
            this._leftArrow.setVisible(false)
            this._rightArrow.setVisible(false)
        } else {
            layer.setVisible(false)
            this._rightArrow.setVisible(true)
        }

        this.addChild(layer)
        this._pages.push(layer)
    },

    leftArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._pages.length > 0 && this._currentPageIndex > 0) {
                this._pages[this._currentPageIndex].setVisible(false)
                this._currentPageIndex--;
                this._pages[this._currentPageIndex].setVisible(true)

                this._rightArrow.setVisible(true)
                if (this._currentPageIndex == 0) {
                    this._leftArrow.setVisible(false)
                }
            }
        }
    },

    rightArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._pages.length > 0 && this._currentPageIndex < this._pages.length - 1) {
                this._pages[this._currentPageIndex].setVisible(false)
                this._currentPageIndex++
                this._pages[this._currentPageIndex].setVisible(true)

                this._leftArrow.setVisible(true)
                if (this._currentPageIndex == this._pages.length - 1) {
                    this._rightArrow.setVisible(false)
                }
            }
        }
    },

    getCurrentPageIndex:function() {
        return this._currentPageIndex
    }
})
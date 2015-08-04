/* 
* @brief:  翻页控件
* @author: Hj
* @date:   2015-08-04
*/

var PageLayer = GameBaseLayer.extend({
    ctor:function (arrow, background, texType) {
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
            rightArrow.addTouchEventListener(this.rightArrowTouch, this)
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
    },

    getPageCount:function() {
        return this._pages.length
    },

    addItems:function(items, itemCount, leftMargin, itemMargin) {
        var pageCount = parseInt((items.length - 1) / itemCount) + 1
        for (var i=0; i<pageCount; i++) {
            var page = new cc.Layer()
            var startPosition = cc.p(this._leftArrow.getContentSize().width + leftMargin, 0)
            for (var j=0; j<Math.min(itemCount, items.length - i*itemCount); j++) {
                var item = items[i * itemCount + j]
                item.setAnchorPoint(cc.p(0, 0))
                item.setPosition(startPosition)
                page.addChild(item)
                startPosition.x += item.getContentSize().width + itemMargin
            }
            this.addPage(page)
        }
    }
})

var FoodStockPageLayer = PageLayer.extend({
    ctor:function (callBack, target) {
        this._super("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE, callBack, target)
        this.callback = callBack
        this.target = target

        var allFood = FoodSetting.getAll()
        var items = []
        for (var i=0; i<allFood.length; i++) {
            var id = i + 1
            var item = new FoodStockItem(id, User.getFoodCount(id), ccui.Widget.PLIST_TEXTURE)
            item.food = allFood[i]
            item.addTouchEventListener(this.selectFood, this)
            items.push(item)
        }
        this.addItems(items, 4, 15, 22)
    },

    selectFood:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.callback) {
                this.callback.call(this.target, button, button.food.id)
            }
        }
    }
})

var FoodPageLayer = PageLayer.extend({
    ctor:function (callBack, target) {
        this._super("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE, callBack, target)
        this.callback = callBack
        this.target = target

        var allFood = FoodSetting.getAll()
        var items = []
        for (var i=0; i<allFood.length; i++) {
            var id = i + 1
            var item = new FoodStockItem(id, User.getFoodCount(id), ccui.Widget.PLIST_TEXTURE)
            item.food = allFood[i]
            item.addTouchEventListener(this.selectFood, this)
            items.push(item)
        }
        this.addItems(items, 4, 15, 22)
    },

    selectFood:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.callback) {
                this.callback.call(this.target, button, button.food.id)
            }
        }
    }
})
/* 
* @brief:  翻页控件
* @author: Hj
* @date:   2015-08-04
*/

var PageLayer = GameBaseLayer.extend({
    // needHideArrow == true，在某个方向没有下一页的时候，会隐藏该arrow
    ctor:function (arrow, background, texType, needHideArrow) {
        this._super();
        this._currentPageIndex = 0;
        this._pages = [];
        this._needHideArrow = needHideArrow;

        if (background) {
            var bg = new cc.Sprite("#" + background);
            bg.setAnchorPoint(cc.p(0, 0));
            bg.setPosition(cc.p(0, 0));
            this.addChild(bg);
        }

        if (arrow) {
            var leftArrow = new ccui.Button(arrow, null, null, texType);

            leftArrow.addTouchEventListener(this.leftArrowTouch, this);
            leftArrow.setAnchorPoint(cc.p(0, 0.5));
            this.addChild(leftArrow);
            this._leftArrow = leftArrow;

            var rightArrow = new ccui.Button(arrow, null, null, texType);
            rightArrow.addTouchEventListener(this.rightArrowTouch, this);
            rightArrow.setFlippedX(true);
            rightArrow.setAnchorPoint(cc.p(0, 0.5));
            this.addChild(rightArrow);
            this._rightArrow = rightArrow;

            // 如果没有背景就能等待外部设置contentSize, 这里临时先设置一个
            if (!background) {
                this.setContentSize(cc.size(leftArrow.width * 2 + 30, leftArrow.height))
            } else {
                this.setContentSize(bg.getContentSize())
            }
        }

    },

    // 重新部署UI位置
    updateUIPosition:function() {
        this._leftArrow.setPosition(cc.p(0, this.height / 2));
        this._rightArrow.setPosition(cc.p(this.width, this.height / 2));
    },

    setContentSize:function(size) {
        this._super(size);
        this.updateUIPosition()
    },

    addPage:function(layer) {
        if (this._pages.length == 0) {
            if (this._needHideArrow) {
                this._leftArrow.setVisible(false);
                this._rightArrow.setVisible(false);
            }
        } else {
            layer.setVisible(false);

            if (this._needHideArrow) {
                this._rightArrow.setVisible(true);
            }
        }

        this.addChild(layer);
        this._pages.push(layer);
    },

    leftArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._pages.length > 0 && this._currentPageIndex > 0) {
                this._pages[this._currentPageIndex].setVisible(false);
                this._currentPageIndex--;
                this._pages[this._currentPageIndex].setVisible(true);

                if (this._needHideArrow) {
                    this._rightArrow.setVisible(true);
                    if (this._currentPageIndex == 0) {
                        this._leftArrow.setVisible(false);
                    }
                }
            }
        }
    },

    rightArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._pages.length > 0 && this._currentPageIndex < this._pages.length - 1) {
                this._pages[this._currentPageIndex].setVisible(false);
                this._currentPageIndex++;
                this._pages[this._currentPageIndex].setVisible(true);

                if (this._needHideArrow) {
                    this._leftArrow.setVisible(true);
                    if (this._currentPageIndex == this._pages.length - 1) {
                        this._rightArrow.setVisible(false);
                    }
                }
            }
        }
    },

    getCurrentPageIndex:function() {
        return this._currentPageIndex;
    },

    getPageCount:function() {
        return this._pages.length;
    },

    addItems:function(items, itemCount, leftMargin, itemMargin) {
        var pageCount = parseInt((items.length - 1) / itemCount) + 1;
        for (var i=0; i<pageCount; i++) {
            var page = new cc.Layer();
            var startPosition = cc.p(this._leftArrow.getContentSize().width + leftMargin, 0);
            for (var j=0; j<Math.min(itemCount, items.length - i*itemCount); j++) {
                var item = items[i * itemCount + j];
                item.setAnchorPoint(cc.p(0, 0));
                item.setPosition(startPosition);
                page.addChild(item);
                startPosition.x += item.getContentSize().width + itemMargin;
            }
            this.addPage(page);
        }
    }
});

var FoodStockPageLayer = PageLayer.extend({
    ctor:function (callBack, target) {
        this._super("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE, true);
        this.callback = callBack;
        this.target = target;

        var allFood = FoodSetting.getAll();
        var items = [];
        for (var i=0; i<allFood.length; i++) {
            var id = i + 1;
            var item = new FoodStockItem(id, User.getFoodCount(id), ccui.Widget.PLIST_TEXTURE);
            item.food = allFood[i];
            item.addTouchEventListener(this.selectFood, this);
            items.push(item);
        }
        this.addItems(items, 4, 15, 22);
    },

    selectFood:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.callback) {
                this.callback.call(this.target, button, button.food.id);
            }
        }
    }
});

var FoodPageLayer = PageLayer.extend({
    ctor:function (callBack, target) {
        this._super("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE, true);
        this.callback = callBack;
        this.target = target;

        var allFood = FoodSetting.getAll();
        var items = [];
        for (var i=0; i<allFood.length; i++) {
            var id = i + 1;
            var setting = FoodSetting.getById(id);
            var item = new FoodItem(id, setting.money, setting.time, ccui.Widget.PLIST_TEXTURE);
            item.food = allFood[i];
            item.addTouchEventListener(this.selectFood, this);
            items.push(item);
        }
        this.addItems(items, 4, 15, 22);
    },

    selectFood:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this.callback) {
                this.callback.call(this.target, button, button.food.id);
            }
        }
    }
});

var SelectCatPageLayer = PageLayer.extend({
    ctor:function (count, callBack, target) {
        this._super("sell_select_btn.png", null, ccui.Widget.PLIST_TEXTURE, false);

        this._callback = callBack;
        this._target = target;
        this._count = count;

        this.initUI();
    },

    decreaseCount:function() {
        this._count -= 1;
        this.updateStatusLabel();
    },

    initUI:function() {
        // 生成中间的数字标示
        var bg = new cc.Sprite("#sell_select_btn_center.png")
        this.addChild(bg)
        this._statusBg = bg

        var label = new ccui.Text("", gameResource.defaultFont, 20);
        this.addChild(label);
        this._statusLabel = label;
        this.updateStatusLabel();

        this.updateStatusUI()
        this.updateStatusLabel()
    },

    updateStatusLabel:function() {
        if (this._count > 0) {
            this._statusLabel.setString((this._currentPageIndex + 1).toString() + '/' + this._count.toString());
        } else {
            this._statusLabel.setString("0/0");
        }

        if (this._callback) {
            this._callback.call(this._target, this._currentPageIndex);
        }
    },

    leftArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._currentPageIndex > 0) {
                this._currentPageIndex--;
                this.updateStatusLabel()
            }
        }
    },

    rightArrowTouch:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._currentPageIndex < this._count - 1) {
                this._currentPageIndex++;
                this.updateStatusLabel()
            }
        }
    },

    updateStatusUI:function() {
        if (this._statusBg) {
            this._statusBg.setPosition(cc.p(this.width / 2, this.height / 2))
            this._statusLabel.setPosition(this._statusBg.getPosition());
        }
    },

    updateUIPosition:function() {
        this._super()
        this.updateStatusUI()
    }
});
/*
* @brief:  售卖页
* @author: Hj
* @date:   2015-08-02
*/

var SellLayer = GameBaseLayer.extend({
    ctor:function (height) {
        this._super();

        this.initUI(height);
    },

    initUI:function (height) {
        // 背景
        var bg = new cc.Sprite("#sell_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 右边栏
        var leftPanel = new cc.Sprite("#sell_right_panel.png");
        leftPanel.setAnchorPoint(cc.p(1, 0));
        leftPanel.setPosition(cc.p(cc.visibleRect.width, 0));
        this.addChild(leftPanel);

        // 头部
        var headerBg = new cc.Sprite("#sell_header.png");
        headerBg.setAnchorPoint(cc.p(0, 1));
        headerBg.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(headerBg);

        var text = new ccui.Text("努力工作，满足客户的要求，\n成为最好的宠物商店把。", gameResource.defaultFont, 30);
        text.setTextColor(cc.color.BLACK);
        text.setAnchorPoint(cc.p(0, 1));
        text.setPosition(cc.p(185, cc.visibleRect.height - 93));
        this.addChild(text);

        var money = new ccui.Text(User.getMoneyString(), gameResource.defaultFont, 30);
        money.setAnchorPoint(cc.p(1, 1));
        money.setPosition(cc.p(cc.visibleRect.width - 100, cc.visibleRect.height - 26));
        this.addChild(money);
        this._moneyLabel = money;

        // 当前猫咪
        this.updateCat(0);

        var cats = User.getAllCats();
        // 选择工具栏
        var layer = new SelectCatPageLayer(cats.length, function(index) {
            this.updateCat(index);
        }, this);
        layer.setContentSize(cc.size(383, 57));
        layer.setAnchorPoint(cc.p(0, 0));
        layer.setPosition(cc.p(9, 286));
        this.addChild(layer);
        this._selectlayer = layer;

        // 出售按钮
        var sellButton = new ccui.Button("sell_cat_btn.png", null, null, ccui.Widget.PLIST_TEXTURE);
        sellButton.setAnchorPoint(cc.p(0, 0));
        sellButton.setPosition(cc.p(0, height));
        sellButton.addTouchEventListener(this.sellCat, this);
        this.addChild(sellButton);

        var sellHistoryButton = new ccui.Button("sell_history_btn.png", null, null, ccui.Widget.PLIST_TEXTURE);
        sellHistoryButton.setAnchorPoint(cc.p(1, 0));
        sellHistoryButton.setPosition(cc.p(cc.visibleRect.width, height));
        sellHistoryButton.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                var scene = new SellingHistoryScene();
                cc.director.pushScene(scene);
            }
        }, this);
        this.addChild(sellHistoryButton);
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    },

    updateCat:function(index) {
        if (this._catSprite) {
            this._catSprite.removeFromParent();
            this._catSprite = null
        }

        var cats = User.getAllCats();
        if (cats.length > index) {
            var cat = cats[index];
            var catSprite = new CatSprite(cat.id);
            catSprite.model = cat;
            catSprite.setPosition(cc.p(183, 450));
            catSprite.setScale(1.2);
            this.addChild(catSprite);
            this._catSprite = catSprite;
        }
    },

    sellCat:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._catSprite) {
                if (CatSetting.isBaby(this._catSprite.getId())) {
                    var dialog = new MessageDialog("幼崽是没法出售的哦！请再培养一阵子看看！");
                    dialog.present();
                } else {
                    Shop.sellCat(this._catSprite.model);
                    this.updateCat(Math.max(this._selectlayer.getCurrentPageIndex() - 1, 0));
                    this._moneyLabel.setString(User.getMoneyString());
                    this._selectlayer.decreaseCount();
                }
            }
        }
    }
});

SellLayer.create = function () {
    return new SellLayer;
};
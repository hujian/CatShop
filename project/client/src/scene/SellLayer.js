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
        leftPanel.setPosition(cc.p(cc.visibleRect.width, 0))
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

        var money = new ccui.Text(User.getMoney().toString() + "元", gameResource.defaultFont, 30);
        money.setAnchorPoint(cc.p(1, 1));
        money.setPosition(cc.p(cc.visibleRect.width - 100, cc.visibleRect.height - 26));
        this.addChild(money);

        // 当前猫咪

        // 选择工具栏
        var layer = new SelectCatPageLayer(User.getAllCats().length, function(index) {

        }, this);
        layer.setAnchorPoint(cc.p(0, 0));
        layer.setPosition(cc.p(9, 286));
        this.addChild(layer);

        // 出售按钮
        var sellButton = new ccui.Button("sell_cat_btn.png", null, null, ccui.Widget.PLIST_TEXTURE);
        sellButton.setAnchorPoint(cc.p(0, 0));
        sellButton.setPosition(cc.p(0, height));
        this.addChild(sellButton);

        var sellHistoryButton = new ccui.Button("sell_history_btn.png", null, null, ccui.Widget.PLIST_TEXTURE);
        sellHistoryButton.setAnchorPoint(cc.p(1, 0));
        sellHistoryButton.setPosition(cc.p(cc.visibleRect.width, height));
        this.addChild(sellHistoryButton);
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    }
})

SellLayer.create = function () {
    return new SellLayer;
}
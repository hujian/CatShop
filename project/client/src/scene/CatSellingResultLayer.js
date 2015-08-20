/* 
* @brief:  猫卖出后的结果页面
* @author: Hj
* @date:   2015-08-19
*/

var CatSellingResultLayer = PopupBaseLayer.extend({
    ctor:function (cat) {
        this._super();
        this._setting = CatSetting.getById(cat.id);
        this._id = cat.id;

        this.addTransparentMaskBackground();

        var index = CatSetting.getIndexById(cat.id);

        // 背景
        var bg = new cc.Sprite("#sell_result_message_bg.png")
        bg.setPosition(cc.visibleRect.center);
        this.addChild(bg);

        // 序号
        var indexLabel = new ccui.Text("No." + Util.formatInteger(index, 2), gameResource.defaultFont, 30);
        indexLabel.setPosition(cc.p(130, 511));
        bg.addChild(indexLabel);

        // 人物icon
        var icon = new cc.Sprite("#cat_chara_" + index.toString() + "_fin" + ".png");
        icon.setPosition(cc.p(198, 332));
        bg.addChild(icon);

        var buyerInfo = this._setting.after.split("@");
        var buyerName = buyerInfo[0];
        var buyerDescription = buyerInfo[1];

        // 买家名称
        var buyerNameLabel = new ccui.Text(buyerName, gameResource.defaultFont, 36);
        buyerNameLabel.setPosition(cc.p(396, indexLabel.y));
        buyerNameLabel.setTextColor(cc.color.BLACK);
        bg.addChild(buyerNameLabel);

        // 买家描述
        var buyerDescriptionLabel = new ccui.Text(buyerDescription, gameResource.defaultFont, 22);
        buyerDescriptionLabel.setTextColor(cc.color.BLACK);
        buyerDescriptionLabel.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        buyerDescriptionLabel.getVirtualRenderer().setLineHeight(46);
        buyerDescriptionLabel.setPosition(cc.p(471, 316 + 16));
        buyerDescriptionLabel.ignoreContentAdaptWithSize(false);
        buyerDescriptionLabel.setContentSize(cc.size(208, 254));
        bg.addChild(buyerDescriptionLabel);

        // 分享
        var shareBtn = new ccui.Button("sell_result_share.png", "", "", ccui.Widget.PLIST_TEXTURE);
        shareBtn.setPosition(cc.p(bg.width / 2, 102));
        shareBtn.addTouchEventListener(function(btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
            }
        }, this);
        bg.addChild(shareBtn);

        // 关闭
        var closeBtn = new ccui.Button("btn_close.png", "", "", ccui.Widget.PLIST_TEXTURE);
        closeBtn.setPosition(cc.p(bg.width / 2, 220));
        closeBtn.addTouchEventListener(function(btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.dismiss();
            }
        }, this);
        this.addChild(closeBtn);
    }
});
/* 
* @brief:  出售记录页面
* @author: Hj
* @date:   2015-08-16
*/

var SellingHistoryScene = GameBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        // 背景
        var bg = new cc.Sprite("#sell_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 头部导航栏
        var navBarBg = new cc.Sprite("#navigation_bar_bg.png");
        navBarBg.setAnchorPoint(cc.p(0, 1));
        navBarBg.setPosition(cc.visibleRect.topLeft);
        this.addChild(navBarBg);

        var backButton = new ccui.Button("btn_back.png", null, null, ccui.Widget.PLIST_TEXTURE);
        backButton.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                cc.director.popScene();
            }
        }, this);
        backButton.setPosition(cc.p(112, 1084));
        this.addChild(backButton);

        var pageName = new ccui.Text("记录", gameResource.defaultFont, 48);
        pageName.setPosition(cc.p(cc.visibleRect.width / 2, backButton.y));
        this.addChild(pageName);

        // 广告条
        var ad = new AdLayer();
        this.addChild(ad);

        // 页面选择条
        var layer = new SelectCatPageLayer((User.getAllCats().length - 1) / 4 + 1, function(index) {

        }, this);
        layer.setContentSize(cc.size(574, 57));
        layer.setPosition(cc.p((bg.width - layer.width) / 2, ad.height + 20));
        this.addChild(layer);
    }
});

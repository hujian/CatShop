/*
* @brief:  所有scene的容器类，是基于TabBar的
* @author: Hj
* @date:   2015-08-05
*/

var ContainerScene = GameBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        this.initUI();
    },

    initUI:function() {
        // tab条
        var bar = new TabBar(['tab_btn_cat_house', 'tab_btn_food', 'tab_btn_shop', 'tab_btn_sell', 'tab_btn_handbook'],
                             this.tabBarCallback, this, ccui.Widget.PLIST_TEXTURE);
        this.addChild(bar);
        this._tabBar = bar;

        // 广告条
        var ad = new AdLayer();
        ad.setPosition(cc.p(0, bar.getContentSize().height));
        this.addChild(ad);
        this._adLayer = ad;
    }
});
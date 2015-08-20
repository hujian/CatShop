/*
* @brief:  所有scene的容器类，是基于TabBar的
* @author: Hj
* @date:   2015-08-05
*/

var ContainerScene = GameBaseScene.extend({
    ctor:function (index) {
        this._super();
        this._currentPage = null;

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_baby_plist, gameResource.global.cat_baby_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_plist, gameResource.global.cat_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.food_plist, gameResource.global.food_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.help_plist, gameResource.global.help_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.sell_plist, gameResource.global.sell_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.other_plist, gameResource.global.other_image);

        this.initUI(index);
    },

    initUI:function(index) {
        // 广告条, 为了计算下面的高度，必须放在上面
        var ad = new AdLayer();
        this.addChild(ad, 2);
        this._adLayer = ad;

        // tab条
        var bar = new TabBar(['tab_btn_cat_house', 'tab_btn_food', 'tab_btn_shop', 'tab_btn_sell', 'tab_btn_handbook'],
                             this.tabBarCallback, this, ccui.Widget.PLIST_TEXTURE, index);
        // zOrder必须要高于currentPage，盖在上面
        this.addChild(bar, 2);
        this._tabBar = bar;

        ad.setPosition(cc.p(0, bar.getContentSize().height));
    },

    tabBarCallback:function(index, tabBar) {
        if (this._currentPage) {
            this._currentPage.removeFromParent();
            this._currentPage = null;
        }

        var barHeight = tabBar.height + this._adLayer.height;

        switch (index) {
            case 0: {
               this._currentPage = new CatHouseLayer(barHeight);
               break;
            }
            case 1: {
                this._currentPage = new FoodLayer(barHeight);
                break;
            }
            case 2: {
                this._currentPage = new ShopLayer(barHeight);
                break;
            }
            case 3: {
                this._currentPage = new SellLayer(barHeight);
                break;
            }
            case 4: {
                this._currentPage = new HandbookLayer(barHeight);
                break;
            }
            default :{
                cc.error("unknown page index")
            }
        }

        this.addChild(this._currentPage);
    }
});
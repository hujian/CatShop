/*
* @brief:  所有scene的容器类，是基于TabBar的
* @author: Hj
* @date:   2015-08-05
*/

var ContainerScene = GameBaseScene.extend({
    ctor:function () {
        this._super();
        this._currentPage = null

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        this.initUI();
    },

    initUI:function() {
        // tab条
        var bar = new TabBar(['tab_btn_cat_house', 'tab_btn_food', 'tab_btn_shop', 'tab_btn_sell', 'tab_btn_handbook'],
                             this.tabBarCallback, this, ccui.Widget.PLIST_TEXTURE);
        // zOrder必须要高于currentPage，盖在上面
        this.addChild(bar, 2);
        this._tabBar = bar;

        // 广告条
        var ad = new AdLayer();
        ad.setPosition(cc.p(0, bar.getContentSize().height));
        this.addChild(ad, 2);
        this._adLayer = ad;
    },

    tabBarCallback:function(index) {
        if (this._currentPage) {
            this._currentPage.removeFromParent();
            this._currentPage = null;
        }

        switch (index) {
            case 0: {
               this._currentPage = new CatHouseLayer();
               break;
            }
            case 1: {
                this._currentPage = new FoodLayer();
                break;
            }
            case 2: {
                this._currentPage = new ShopLayer();
                break;
            }
            case 3: {
                this._currentPage = new SellLayer();
                break;
            }
            case 4: {
                this._currentPage = new HandbookLayer();
                break;
            }
            default :{
                cc.error("unknown page index")
            }
        }

        this.addChild(this._currentPage)
    }
});
/* 
* @brief:  TabBar测试用例
* @author: Hj
* @date:   2015-08-04
*/

var TestTabBarScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function() {
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);

        var bar = new TabBar(['tab_btn_cat_house', 'tab_btn_food', 'tab_btn_shop', 'tab_btn_sell', 'tab_btn_handbook'],
            this.tabBarCallback, this, ccui.Widget.PLIST_TEXTURE);
        bar.setPosition(cc.p(100, 240));
        this.addChild(bar);
    },

    tabBarCallback:function(index) {
        this.printMessage("选中" + index.toString());
    }
});
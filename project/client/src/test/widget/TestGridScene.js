/*
* @brief:  测试grid控件
* @author: Hj
* @date:   2015-08-17
*/

var TestGridScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_baby_plist, gameResource.global.cat_baby_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_plist, gameResource.global.cat_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        var grid = new GridWidget();
        grid.setContentSize(cc.size(640, 676));
        grid.setScale(0.3);
        grid.setPosition(cc.p(100, 0));
        this.addChild(grid);

        var items = [];
        for (var i=0; i<4; i++) {
            var item = new HandbookItem(i+1, i+1);
            items.push(item);
        }

        grid.update(items, 2, 2, 10, 20, 20, 20);

        grid.showBorder(true);
    }
});
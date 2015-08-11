/*
* @brief:  进度条测试
* @author: Hj
* @date:   2015-08-10
*/

var TestProgressBar = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        var bar = new FoodProduceProgressBar();
        var count = 8;
        var time = 5;
        bar.start(time, count, function(index) {
            this.printMessage("percentage: " + (index * 100 / count).toString() + "%")
        }, this)
        bar.setPosition(cc.visibleRect.center);
        this.addChild(bar);
    }
});
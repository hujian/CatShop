/*
* @brief:  PageLayer的测试用例
* @author: Hj
* @date:   2015-08-04
*/

var TestPageLayerScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image)

        var layer = new PageLayer("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE)
        layer.setPosition(cc.p(100, 100))
        this.addChild(layer)

        this.addTestButton("加一页", function() {
        })
    }
})
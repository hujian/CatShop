/* 
* @brief: 猫详细页里面的饥饿度空间
* @author: Hj
* @date:   2015-08-15
*/

var CatHungryWidget = GameBaseLayer.extend({
    ctor:function (hungry) {
        this._super();

        this._hungry = hungry;

        this.updateHungry(hungry);
    },

    updateHungry:function(hungry) {
        this._hungry = hungry;
        this.removeAllChildren();

        var full = 100 - hungry;

        var allCount = 5;
        var fullSpriteCount = full / 20;
        var halfFullSpriteCount = full % 20;

        var x = 0;

        // 饱的精灵
        for (var i=0; i<fullSpriteCount; i++) {
            var sprite = new cc.Sprite("#cat_detail_hungry_full.png");
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition(cc.p(x, 0));
            this.addChild(sprite);

            x += sprite.width;
            allCount--;
        }

        // 半饱的精灵
        if (halfFullSpriteCount > 0) {
            var sprite = new cc.Sprite("#cat_detail_hungry_half_full.png");
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition(cc.p(x, 0));
            this.addChild(sprite);

            x += sprite.width;
            allCount--;
        }

        // 饿的精灵
        for (var i=0; i<allCount; i++) {
            var sprite = new cc.Sprite("#cat_detail_hungry_no_full.png");
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition(cc.p(x, 0));
            this.addChild(sprite);

            x += sprite.width;
        }
    },

    getHungry:function() {
        return this._hungry;
    }
});

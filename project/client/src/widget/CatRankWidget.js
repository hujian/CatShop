/* 
* @brief:  猫评级控件
* @author: Hj
* @date:   2015-08-20
*/

var CatRankWidget = GameBaseLayer.extend({
    ctor:function (rank) {
        this._super();

        this._rank = rank;
        this.updateRank(rank);
    },

    updateRank:function(rank) {
        this._rank = rank;
        this.removeAllChildren();

        // 饱的精灵
        var x = 0;
        for (var i=0; i<rank; i++) {
            var sprite = new cc.Sprite("#sell_cat_rank_star.png");
            sprite.setAnchorPoint(0, 0);
            sprite.setPosition(cc.p(x, 0));
            this.addChild(sprite);
            x += sprite.width + 4;
        }
    },

    getRank:function() {
        return this._rank;
    }
});
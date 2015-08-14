/*
* @brief:  清洁器精灵
* @author: Hj
* @date:   2015-08-14
*/

var CleanerSprite = cc.Sprite.extend({
    ctor:function () {
        this._super("#cat_house_cleaner_0.png");

        var animation = new cc.Animation();
        for (var i=0; i<2; i++) {
            animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("cat_house_cleaner_" + i.toString() + ".png"));
        }
        animation.setDelayPerUnit(1 / 10);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        this.runAction(cc.repeatForever(action));
    },

    move:function(rect) {
        this._moveRect = rect;

        // 上边清理，从左往右出
    }
});
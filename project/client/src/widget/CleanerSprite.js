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
        var self = this;

        var gap = 50;
        var leftX = cc.visibleRect.topLeft.x - this.width - gap;
        var rightX = cc.visibleRect.topRight.x + this.width + gap;
        var topY = rect.y + rect.height;
        var bottomY = rect.y + this.height / 2;
        var movingTime = 10;

        this.setPosition(cc.p(leftX, topY));
        this.updateZOrder();

        var moveFromLeftToRight = new cc.moveTo(movingTime, rightX, topY);
        var moveFromTopToBottom = new cc.moveTo(1, rightX, bottomY);
        var moveFromRightToLeft = new cc.moveTo(movingTime, leftX, bottomY);
        var moveFromBottomToTop = new cc.moveTo(1, leftX, topY);

        var rightToLeftPrepare = new cc.callFunc(function() {
            self.setFlippedX(true);
            self.updateZOrder();
        });
        var leftToRightPrepare = new cc.callFunc(function() {
            self.setFlippedX(false);
            self.updateZOrder();
        })

        this.runAction(cc.repeatForever(cc.sequence(moveFromLeftToRight, moveFromTopToBottom, rightToLeftPrepare,
                                                    moveFromRightToLeft, moveFromBottomToTop, leftToRightPrepare)));
    },

    updateZOrder:function() {
        this.setLocalZOrder(cc.visibleRect.height - this.y + this.height / 2);
    }
});
/* 
* @brief:  猫毛团精灵
* @author: Hj
* @date:   2015-08-14
*/

var HairSprite = cc.Sprite.extend({
    ctor:function () {
        this._super("#cat_house_cat_hair.png");
        this.setScale(0.6);
        this.setAnchorPoint(cc.p(0.5, 0));
        var self = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event) {
                var ret = Util.touchInNode(touch, self);
                return ret;
            },
            onTouchEnded:function(touch, event) {
                self.playCleanAnimation(true);
            }
        });
        cc.eventManager.addListener(listener, this);
    },

    // 被清理掉时，播放的压扁动画
    playCleanAnimation:function(needSaving) {
        var scale = cc.scaleTo(0.2, 0.8, 0.3);
        var delay = cc.delayTime(0.2);
        var callback = cc.callFunc(this.cleaned, this, needSaving);
        this.runAction(cc.sequence(scale, delay, callback));

        Audio.playAudioEffect(gameResource.global.audio_effect_cat_hair);
    },

    cleaned:function(needSaving) {
        this.removeFromParent();
        User.updateHairCount(User.getHairCount() - 1);

        if (needSaving) {
            User.flush();
        }
    }
});
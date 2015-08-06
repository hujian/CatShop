/*
* @brief:  猫精灵
* @author: Hj
* @date:   2015-08-06
*/

var CatSprite = cc.Sprite.extend({
    // isProfile 是指侧面
    ctor:function (id, isProfile) {
        this._setting = CatSetting.getById(id);

        if (isProfile) {
            this._super("#" + this.getImageName("move", 0));
        } else {
            this._super("#" + this.getImageName("eat", 0));
        }
    },

    // 走路动画
    playMove:function() {
        this.play("move", 2, 1 / 5);
    },

    // 吃饭动画
    playEat:function() {
        this.play("eat", 2, 1 / 2);
    },

    // 睡觉
    playSleep:function() {
        this.play("sleep", 1);
    },

    // 播放动画
    play:function(type, count, delay) {
        if (count > 1) {
            var animation = new cc.Animation();
            for (var i=0; i<count; i++) {
                animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName(type, i)));
            }
            animation.setDelayPerUnit(delay);
            animation.setRestoreOriginalFrame(true);
            var action = cc.animate(animation);
            this.runAction(cc.repeatForever(action));
        } else {
            this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName(type, 0)));
        }
    },

    getPrefix:function() {
        var name = null;
        if (this._setting.id > CatSetting.getAllBaby.length) {
            name = "cat";
        } else {
            name = "baby";
        }
        return name + this._setting.id.toString();
    },


    getImageName:function(type, index) {
        return this.getPrefix() + "_" + type + index.toString() + '.png';
    }
});
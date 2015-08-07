/*
* @brief:  猫精灵
* @author: Hj
* @date:   2015-08-06
*/

var CatSprite = cc.Sprite.extend({
    ctor:function (id) {
        this._setting = CatSetting.getById(id);
        this._emotion = null;
        this._super("#" + this.getImageName("eat", 0));
    },

    getId:function() {
        return this._setting.id;
    },

    // 显示正面
    showFront:function() {
        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName("eat", 0)));
    },

    // 显示侧面
    showProfile:function() {
        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName("move", 0)));
    },

    // 走路动画
    playMove:function() {
        this.play("move", 2, 1 / 2);
    },

    // 吃饭动画
    playEat:function() {
        this.play("eat", 2, 1 / 2);
    },

    // 睡觉动画
    playSleep:function() {
        this.play("sleep", 1);

        // 呼噜动画
        var sprite = new cc.Sprite("#icon_sleep.png");
        sprite.setPosition(cc.p(this.width - 20, this.height + 30));
        sprite.setScale(0.8);
        this.addChild(sprite);
        this._sleepSprite = sprite

        var animate = new cc.MoveBy(2, 10, 10);
        sprite.runAction(cc.repeatForever(cc.sequence(animate, animate.reverse())));
    },

    angry:function() {
        this.playEmotionAnimation("angry");
    },

    ill:function() {
        this.playEmotionAnimation("ill");
    },

    happy:function() {
        this.playEmotionAnimation("happy");
    },

    // 播放心情动画
    playEmotionAnimation:function(type) {
        var self = this;

        if (self._emotion) {
            self._emotion.removeFromParent();
            self._emotion = null;
        }

        var sprite = new cc.Sprite("#icon_" + type + ".png");
        sprite.setPosition(cc.p(this.width - 20, this.height + 30));
        sprite.setScale(0.8);
        self.addChild(sprite);
        self._emotion = sprite;

        sprite.runAction(cc.sequence(cc.moveBy(3, 10, 10), cc.fadeOut(0.5), cc.callFunc(function() {
            self._emotion.removeFromParent();
            self._emotion = null;
        })));
    },

    // 播放动画
    play:function(type, count, delay) {
        this.stopAllActions()

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
        var id = this._setting.id;
        if (CatSetting.isBaby(this._setting.id)) {
            name = "baby";
        } else {
            name = "cat";

            // 成猫的图也是从1开始的，所以需要处理下
            id -= CatSetting.getAllBaby().length;
        }
        return name + id.toString();
    },


    getImageName:function(type, index) {
        return this.getPrefix() + "_" + type + index.toString() + '.png';
    },

    // cat是指在CatManager中被管理cat对象
    start:function(cat, rect) {
        this._cat = cat
        this._moveRect = rect;
        this._state = undefined
        this.scheduleUpdate();
    },

    stop:function() {
        this.unscheduleUpdate();
    },

    update:function(interval) {
        var state = this._cat.getState();
        var stateChanged = state != this._state

        if (stateChanged) {
            switch (state) {
                case cs.walk: {
                    this.playMove()
                    this.nextTargetPosition();
                    break;
                }
                case cs.sleep: {
                    this.playSleep()
                    break;
                }
                case cs.stand: {
                    this.showFront()
                    break;
                }
                case cs.eat: {
                    this.playEat()
                    break;
                }
            }

            if (this._state == cs.sleep && this._sleepSprite) {
                this._sleepSprite.removeFromParent()
                this._sleepSprite = undefined
            }

            this._state = state
        }

        if (state === cs.walk) {
            // 处理运动逻辑
            var position = this.getPosition()
            if (cc.pFuzzyEqual(position, this._targetPosition, 1)) {
                this.nextTargetPosition();
            } else {
                var pos = this.getPosition();
                var distance = interval * 30;
                var radians = cc.pToAngle(cc.pSub(this._targetPosition, this.getPosition()));
                if (radians < cc.PI / 2 && radians > -(cc.PI / 2)) {
                    this.setFlippedX(true)
                } else {
                    this.setFlippedX(false)
                }
                var point = cc.pForAngle(radians);
                var vector = cc.pMult(point, distance);
                this.setPosition(cc.pAdd(pos, vector));
                this.setLocalZOrder(cc.visibleRect.height - parseInt(pos.y))
            }
        }
    },

    nextTargetPosition:function() {
        var rect = this._moveRect;
        this._targetPosition = cc.p(rect.x + Math.random() * rect.width, rect.y + Math.random() * rect.height);
    },

    move:function() {
    },

    stand:function() {
    },

    sleep:function() {
    }
});
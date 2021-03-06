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


        var self = this;
        // 点击弹出猫的详细页，必须要有cat对象
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event) {
                return Util.touchInNode(touch, self) && self._cat !== null;
            },
            onTouchEnded:function(touch, event) {
                var detailLayer = new CatDetailLayer(self._cat);
                detailLayer.present();

                var index = Util.getRandomInt(1, 7);
                var name = "audio_effect_cat_sound_" + index.toString();
                Audio.playAudioEffect(gameResource.global[name]);
            }
        });
        cc.eventManager.addListener(listener, this);
    },

    getId:function() {
        return this._setting.id;
    },

    // 显示正面
    showFront:function() {
        this.stopAllActions();

        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName("eat", 0)));
    },

    // 显示侧面
    showProfile:function() {
        this.stopAllActions();

        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName("move", 0)));
    },

    // 走路动画
    playMove:function() {
        this.play("move", 2, 1 / 2);
    },

    // 吃饭动画
    playEat:function() {
        this.play("eat", 2, 1 / 2);

        Audio.playAudioEffect(gameResource.global.audio_effect_cat_eat, true);
    },

    // 睡觉动画
    playSleep:function() {
        this.play("sleep", 1);

        // 呼噜动画
        var sprite = new cc.Sprite("#icon_sleep.png");
        sprite.setPosition(cc.p(this.width - 20, this.height + 30));
        sprite.setScale(0.8);
        this.addChild(sprite);
        this._sleepSprite = sprite;

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

        Audio.playAudioEffect(gameResource.global.audio_effect_cat_happy);
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
        this.stopAllActions();

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

    getCat:function() {
        return this._cat;
    },

    setCat:function(cat) {
        this._cat = cat;
    },

    // cat是指在CatManager中被管理cat对象
    start:function(cat) {
        this._cat = cat;
        this._state = undefined;
        this.scheduleUpdate();
    },

    stop:function() {
        this.unscheduleUpdate();
    },

    update:function() {
        var state = this._cat.getState();
        var stateChanged = state != this._state;

        if (stateChanged) {
            switch (state) {
                case cs.walk: {
                    this.playMove();
                    break;
                }
                case cs.sleep: {
                    this.playSleep();
                    break;
                }
                case cs.stand: {
                    this.showFront();
                    break;
                }
                case cs.eat: {
                    this.playEat();
                    break;
                }
            }

            // 去除那个睡觉的“z”字动画
            if (this._state == cs.sleep && this._sleepSprite) {
                this._sleepSprite.removeFromParent();
                this._sleepSprite = undefined;
            }

            // 吃完的时候要改变声音
            if (this._state == cs.eat) {
                Audio.stopPlayAudioEffect(gameResource.global.audio_effect_cat_eat);
                Audio.playAudioEffect(gameResource.global.audio_effect_cat_eat_done);
            }

            this._state = state;
        }

        // 设置位置，注意移动的具体逻辑在Cat这个model里面
        if (state === cs.walk) {
            this.setPosition(this._cat.getPosition());

            if (this._cat.getTargetPosition().x > this._cat.getPosition().x + 5) {
                this.setFlippedX(true);
            } else {
                this.setFlippedX(false);
            }
        }

        this.setLocalZOrder(cc.visibleRect.height - this.y + this.height / 2);
    }
});
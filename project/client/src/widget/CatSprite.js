/*
* @brief:  猫精灵
* @author: Hj
* @date:   2015-08-06
*/

var CatSprite = cc.Sprite.extend({
    // cat是指在CatManager中被管理cat对象
    ctor:function (id, cat) {
        this._setting = CatSetting.getById(id);
        this._model = cat

        this._super("#" + this.getImageName("eat", 0));
    },

    // 显示侧面
    showProfile:function() {
        this.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame(this.getImageName("move", 0)));
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

        // 呼噜动画
        var sprite = new cc.Sprite("#icon_sleep.png")
        sprite.setPosition(cc.p(this.width - 20, this.height + 30))
        sprite.setScale(0.8)
        this.addChild(sprite)

        var animate = new cc.MoveBy(2, 10, 10)
        sprite.runAction(cc.repeatForever(cc.sequence(animate, animate.reverse())))
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
        var id = this._setting.id
        if (CatSetting.isBaby(this._setting.id)) {
            name = "baby";
        } else {
            name = "cat";

            // 成猫的图也是从1开始的，所以需要处理下
            id -= CatSetting.getAllBaby().length
        }
        return name + id.toString();
    },


    getImageName:function(type, index) {
        return this.getPrefix() + "_" + type + index.toString() + '.png';
    }
});
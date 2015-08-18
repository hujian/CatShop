/*
* @brief:  游戏中用到的进度条
* @author: Hj
* @date:   2015-08-10
*/

var FoodProduceProgressBar = GameBaseLayer.extend({
    // count, 分成几次回调
    ctor:function () {
        this._super();

        // 下面的背景
        var bg = new cc.Sprite("#food_progress_bar_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);
        this.setContentSize(bg.getContentSize());

        // 上面的条
        var loadingBar = new ccui.LoadingBar();
        loadingBar.loadTexture("food_progress_bar_front.png", ccui.Widget.PLIST_TEXTURE);
        loadingBar.setAnchorPoint(cc.p(0, 0));
        loadingBar.setPercent(0);
        this.addChild(loadingBar);
        this._loadingBar = loadingBar;
    },

    start:function(time, count, callback, target) {
        this.stop();
        this.setVisible(true);

        this._count = count;
        this._countLeft = count
        this._callback = callback;
        this._target = target;
        this._time = time;
        this._timeLeft = 0.3;
        this._loadingBar.setPercent(0)

        // 先播放一个一秒的动画，从0到100
        this.scheduleUpdate();
    },

    stop:function() {
        this.unscheduleAllCallbacks();
    },

    update:function(interval) {
        if (this._timeLeft > 0) {
            this._timeLeft -= interval;
            this._loadingBar.setPercent(100 - 100 * this._timeLeft / 0.5);
        } else {
            var clock = new cc.Sprite("#food_icon_clock.png");
            clock.setPosition(cc.p(this.width / 2, this.height / 2));
            this.addChild(clock);

            //var scale = cc.scaleTo(1, 1);
            //var restore = cc.callFunc(function(){
            //    clock.setScale(0);
            //})
            //clock.runAction(cc.repeatForever(cc.sequence(scale, restore)));
            //this._clock = clock;

            this.unscheduleUpdate();
            this.schedule(this.updateOnce, this._time / this._count, this._count - 1);
        }
    },

    updateOnce:function() {
        if (this._countLeft > 0) {
            this._countLeft--;
            this._loadingBar.setPercent(this._countLeft / this._count * 100);
            if (this._callback) {
                this._callback.call(this._target, this._count - this._countLeft - 1);
            }
        }
    }
});
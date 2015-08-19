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

        // 开始动画的时间
        this._startAnimationDuration = 0.3;

        // 倒计时的时间单位
        this._countDownTimeUnit = 1;
    },

    // time: 生产总的时间
    // count: 生产食物的个数
    start:function(time, count, callback, target) {
        this.stop();
        this.setVisible(true);

        this._time = time;
        this._count = count;
        this._callback = callback;
        this._target = target;

        // 先播放一个一秒的动画，从0到80
        this._loadingBar.setPercent(0)
        this._startAnimationLeftTime = this._startAnimationDuration;
        this.schedule(this.updateStartAnimation, 0);
    },

    stop:function() {
        this.unscheduleAllCallbacks();
    },

    getCountDownCount:function() {
        return parseInt((this._time - 1)  / this._countDownTimeUnit) + 1;
    },

    updateStartAnimation:function(interval) {
        this._startAnimationLeftTime -= interval;
        if (this._loadingBar.getPercent() >= 100) {
            this.unschedule(this.updateStartAnimation);
            this.schedule(this.updateCountDown, this._countDownTimeUnit, this.getCountDownCount() - 1);
            this.schedule(this.updateProducingFood, this._time / this._count, this._count - 1);

            var clock = new cc.Sprite("#food_icon_clock.png");
            clock.setPosition(cc.p(this.width / 2, this.height / 2));
            this.addChild(clock);
        } else {
            this._loadingBar.setPercent(100 - 100 * this._startAnimationLeftTime / this._startAnimationDuration);
        }
    },

    updateCountDown:function() {
        this._loadingBar.setPercent(this._loadingBar.getPercent() - 100 / this.getCountDownCount());
    },

    updateProducingFood:function() {
        this._count--;
        if (this._callback) {
            this._callback.call(this._target, this._count);
        }
    },

    getPercent:function() {
        return this._loadingBar.getPercent();
    }
});
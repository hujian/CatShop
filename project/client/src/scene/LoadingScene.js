/*
* @brief:  资源加载页面
* @author: Hj
* @date:   2015-07-21
*/

LoadingScene = GameBaseScene.extend({
    _label : null,
    _className:"LoadingScene",
    _logo: null,
    cb: null,
    target: null,
    loadingText: "努力加载中...",
    needLoadResource:true,

    init : function(){
        var self = this;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(52, 113, 143, 255));
        self.addChild(bgLayer, 0);

        if(!cc.sys.isNative){
            if(gameResource.loadingLogoImg){
                //logo
                cc.loader.loadImg(gameResource.loadingLogoImg, {isCrossOrigin : false }, function(err, img){
                    var texture2d = self._texture2d = new cc.Texture2D();
                    texture2d.initWithElement(img);
                    texture2d.handleLoadedTexture();
                    self._logo = new cc.Sprite(texture2d);
                    self._logo.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, cc.visibleRect.height / 4)));
                    self._bgLayer.addChild(self._logo, 10);
                });
            }
        }
        else{
            self._logo = new cc.Sprite(gameResource.loading.loading_logo_img);
            self._logo.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, cc.visibleRect.height / 4)))
            self._bgLayer.addChild(self._logo, 10)
        }

        //loading percent
        var label = self._label = new cc.LabelTTF(this.loadingText + " 0%", "Arial", 24);
        label.setPosition(cc.pSub(cc.visibleRect.center, cc.p(0, cc.visibleRect.height / 3)));
        label.setColor(cc.color.BLACK);
        bgLayer.addChild(this._label, 10);

        return true;
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);

        if (this.needLoadResource) {
            self.schedule(self._startLoading, 0.3);
        }
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = this.loadingText + " 0%";
        this._label.setString(tmpStr);

        this.unschedule(this._startLoading)
        Time.stopFetchServeTime()
    },

    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;

        // 加载loading界面自己的资源
        cc.loader.load(Util.getArray(gameResource.loading), function () {}, function () {
            // 播放动画
            self.playLogoAnimation();

            // 获取服务器时间
            Time.load(cc.game.config['timestampServerURL'], function () {
                // 加载其他资源
                if (res && res.length > 0) {
                    cc.loader.load(res,
                        function (result, count, loadedCount) {
                            // 设置进度
                            var percent = (loadedCount / count * 100) | 0;
                            percent = Math.min(percent, 100);
                            self._label.setString(self.loadingText + percent.toString() + "%");
                        }, function () {
                            // 加载完成回调
                            if (self.cb)
                                self.cb.call(self.target);
                        }
                    );
                }
            }, this);

        })
    },

    playLogoAnimation: function() {
        var animation = new cc.Animation();
        cc.spriteFrameCache.addSpriteFrames(gameResource.loading.loading_logo_plist, gameResource.loading.loading_logo_img)
        for (var i = 1; i < 23; i++) {
            var frameName = "cat_" + i + ".png";
            animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame(frameName));
        }

        animation.setDelayPerUnit(1 / 20);
        animation.setRestoreOriginalFrame(true);
        var action = cc.animate(animation);
        this._logo.runAction(cc.repeatForever(action));
    },

    preload: function(resources, cb, target) {
        this.initWithResources(resources, cb, target);
        cc.director.runScene(this);
    }
});

LoadingScene.create = function () {
    return new LoadingScene();
};
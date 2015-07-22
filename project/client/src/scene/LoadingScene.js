/*
* @brief:  资源加载页面
* @author: Hj
* @date:   2015-07-21
*/

LoadingScene = GameBaseScene.extend({
    _interval : null,
    _label : null,
    _className:"LoadingScene",
    cb: null,
    target: null,
    loadingText: "努力加载中...",

    init : function(){
        var self = this;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(52, 113, 143, 255));
        self.addChild(bgLayer, 0);

        //logo
        var logoWidth = 350;
        var logoHeight = 240;
        var fontSize = 24, lblHeight =  -logoHeight / 2 + 100;
        if(gameResource.loadingLogoImg){
            cc.loader.loadImg(gameResource.loadingLogoImg, {isCrossOrigin : false }, function(err, img){
                logoWidth = img.width;
                logoHeight = img.height;
                var center = cc.visibleRect.center
                center.y += 80
                self._initStage(img, center);
            });
            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }

        //loading percent
        var label = self._label = new cc.LabelTTF(this.loadingText + " 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color.BLACK);
        bgLayer.addChild(this._label, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self.logo = logo
        self._bgLayer.addChild(logo, 10);
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = this.loadingText + " 0%";
        this._label.setString(tmpStr);
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
            self.playLogoAnimation()

            // 获取服务器时间
            Time.load(cc.game.config['timestampServerURL'], function () {
                // 加载其他资源
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
            }, this)

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
        this.logo.runAction(cc.repeatForever(action));
    },

    preload: function(resources, cb, target) {
        this.initWithResources(resources, cb, target);
        cc.director.runScene(this);
    }
});
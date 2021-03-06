/*
* @brief:  弹出层基类
* @author: 来自朱杰克的guess项目
* @date:   2015-07-22
*/

var PopupBaseLayer = cc.Layer.extend({
    _className: "PopupBaseLayer",
    _touchListener: null,
    _isBackKeyEnabled: true,
    _backKeyReleasedHandler: null,

    ctor: function(){
        this._super();

        this.init();

        this._touchListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            swallowTouches: true
        }, this);

        this.zIndex = PopupBaseLayer.DefualtZOrder;
    },

    present:function (animation) {
        var runningScene = cc.director.getRunningScene();
        runningScene.addChild(this)
    },

    dismiss:function() {
        this.removeFromParent();
    },

    onEnter: function(){
        this._super();

        if(this._isBackKeyEnabled) {
            var runningScene = cc.director.getRunningScene();
            if(runningScene.backKeyReleasedEvent) {
                this._backKeyReleasedHandler = this.onBackKeyPressed.bind(this);
                runningScene.backKeyReleasedEvent.push(this._backKeyReleasedHandler);
            }
        }
    },

    onExit: function(){
        var runningScene = cc.director.getRunningScene();
        if(this._backKeyReleasedHandler && runningScene.backKeyReleasedEvent) {
            runningScene.backKeyReleasedEvent.erase(this._backKeyReleasedHandler);
            this._backKeyReleasedHandler = null;
        }

        this._super();
    },

    onTouchBegan: function(touch, event){
        return true;
    },

    onBackKeyPressed: function(){
        this.removeFromParent(true);
    },

    // 加入半透明遮罩
    addTransparentMaskBackground:function() {
        var bg = new cc.LayerColor(cc.color(0, 0, 0, 120));
        bg.setContentSize(cc.size(cc.visibleRect.width, cc.visibleRect.height));
        this.addChild(bg);
    }

});

PopupBaseLayer.DefualtZOrder = 10000;
PopupBaseLayer.animation = {
    slideDown: 1
};
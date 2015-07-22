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
    }
});

PopupBaseLayer.DefualtZOrder = 10000;
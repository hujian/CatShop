/* 
* @brief: 通用的stack事件管理器，可以用来处理类似弹出层关闭这种层叠响应的事件。
* @author: 来自朱杰克的guess项目
* @date:   2015-07-22
*/

EventHandler = cc.Class.extend({
    _handlers: null,
    _raising: false,

    ctor: function () {
        this._handlers = [];
    },

    size: function () {
        var validHandlerCount = 0;
        for(var i = 0; i < this._handlers.length; ++i)
        {
            if(!this._handlers[i].isDeleted)
            {
                validHandlerCount++;
            }
        }
        return validHandlerCount;
    },

    empty: function () {
        return this.size() === 0;
    },

    push: function (handler) {
        if(!cc.isFunction(handler)) {
            return;
        }
        this._handlers.push({ isDeleted: false, func: handler });
    },

    erase: function(handler) {
        for(var i = this._handlers.length - 1; i >= 0 ; --i) {
            if(this._handlers[i].func === handler) {
                this._handlers[i].isDeleted = true;
            }
        }
    },

    // Remove the deleted handlers.
    refresh: function() {
        if(this._raising) {
            cc.assert("Do not call refresh in the handler.");
            return;
        }
        var index = 0;
        var handlers = this._handlers;
        while(index < handlers.length)
        {
            if(!handlers[index].isDeleted)
            {
                ++index;
                continue;
            }
            else
            {
                handlers.splice(index, 1);
            }
        }
    },

    clear: function () {
        this._handlers.length = 0;
    },

    getHandlers: function () {
        return this._handlers;
    },

    raise: function() {
        this.refresh();
	this._raising = true;
        var handlers = this._handlers;
        for(var i = 0; i < handlers.length; ++i)
        {
            if(!handlers[i].isDeleted)
            {
                handler.func(arguments);
            }
        }
	
        this._raising = false;
    },

    raiseLastHandler: function(){
        this.refresh();
        if(this._handlers.length <= 0) {
            return;
        }

        this._handlers[this._handlers.length - 1].func(arguments);
    }
});
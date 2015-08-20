/*
* @brief:  消息通知框
* @author: Hj
* @date:   2015-08-10
*/

var MessageDialog = PopupBaseLayer.extend({
    ctor:function (text, callback, target) {
        this._super();

        // 背景
        var bg = new cc.Sprite("#dialog_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 对话框文字内容
        var text = new ccui.Text(text, gameResource.defaultFont, 30);
        text.setPosition(cc.p(bg.width / 2, 164));
        text.setTextColor(cc.color.BLACK);
        text.ignoreContentAdaptWithSize(false);
        text.setContentSize(cc.size(446, 62));
        this.addChild(text);

        // 按钮
        var button = new ccui.Button("btn_close.png", "", "", ccui.Widget.PLIST_TEXTURE);
        button.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.removeFromParent();

                if (callback) {
                    callback.call(target);
                }
            }
        }, this);
        button.setPosition(cc.p(bg.width / 2, 61));
        this.addChild(button);

        // 在屏幕正中间显示
        this.setContentSize(bg.getContentSize());
        var pos = cc.p(cc.visibleRect.center);
        pos.x -= bg.width / 2;
        pos.y -= bg.height / 2;
        this.setPosition(pos);
    }
});
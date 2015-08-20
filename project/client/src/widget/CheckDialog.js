/* 
* @brief:  有yes，no两种选择的对话框
* @author: Hj
* @date:   2015-08-10
*/

var CheckDialog = PopupBaseLayer.extend({
    ctor:function (text, yesCallback, noCallback, target) {
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
        var noButton = new ccui.Button("btn_no.png", "", "", ccui.Widget.PLIST_TEXTURE);
        noButton.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                noCallback.call(target);
                this.removeFromParent();
            }
        }, this);
        noButton.setPosition(cc.p(139, 61));
        this.addChild(noButton);

        var yesButton = new ccui.Button("btn_yes.png", "", "", ccui.Widget.PLIST_TEXTURE);
        yesButton.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                yesCallback.call(target);
                this.removeFromParent();
            }
        }, this);
        yesButton.setPosition(cc.p(bg.width - noButton.x, noButton.y));
        this.addChild(yesButton);

        // 在屏幕正中间显示
        this.setContentSize(bg.getContentSize());
        var pos = cc.p(cc.visibleRect.center);
        pos.x -= bg.width / 2;
        pos.y -= bg.height / 2;
        this.setPosition(pos);
    }
});
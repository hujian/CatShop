/* 
* @brief:  测试用的弹出层
* @author: Hj
* @date:   2015-07-23
*/

var TestPopupLayer = PopupBaseLayer.extend({
    ctor:function () {
        this._super();

        // 测试按钮的初始位置
        this.testButtonInitPosition = cc.p(50, 180);
        this.currentTestButtonPosition = cc.p(this.testButtonInitPosition);
        // 测试按钮的间隔
        this.testButtonGap = cc.p(100, 30);
        // 测试按钮大小
        this.testButtonSize = cc.size(130, 36);
        // 所有测试用例按钮
        this.buttons = [];

        // 背景颜色框
        var bgLayer = new cc.LayerColor(cc.color(52, 113, 143, 255));
        bgLayer.setAnchorPoint(cc.p(0.5, 0.5));
        bgLayer.ignoreAnchorPointForPosition(false);
        bgLayer.setContentSize(cc.size(300, 200));
        bgLayer.setPosition(cc.visibleRect.center);
        this.addChild(bgLayer, 0);
        this.contentLayer = bgLayer;
    },

    createTestButton:function (title, selector, target) {
        var button = new ccui.Button();
        button.loadTextureNormal(gameResource.global.testButton, ccui.Widget.LOCAL_TEXTURE);
        button.setTouchEnabled(true);
        button.setTitleText(title);
        button.setTitleFontName(TestSceneFontName);
        button.setTitleColor(cc.color.BLACK);
        button.setScale9Enabled(true);
        button.setTitleFontSize(14);
        button.setContentSize(this.testButtonSize);
        button.addTouchEventListener(this.testCall, this);
        button.setCapInsets(cc.rect(7, 0, 1, 36));
        button.setScale(0.7);
        button.handler = selector;
        button.target = target;

        return button;
    },

    addTestButton:function (title, selector, target) {
        var button = this.createTestButton(title, selector, target);
        button.setPosition(this.currentTestButtonPosition);
        this.currentTestButtonPosition.y -= this.testButtonGap.y;
        if (this.currentTestButtonPosition.y < 20) {
            this.currentTestButtonPosition.y = this.testButtonInitPosition.y;
            this.currentTestButtonPosition.x += this.testButtonGap.x;
        }
        this.contentLayer.addChild(button);
        return button;
    },

    // 包装函数，转一下
    testCall:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            sender.handler.call(sender.target, sender, sender.state);
        }
    }
});
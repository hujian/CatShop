/* 
* @brief:  帮助页
* @author: Hj
* @date:   2015-08-13
*/

var HelpLayer = PopupBaseLayer.extend({
    ctor:function () {
        this._super();

        // 背景滚动层
        var scrollView = new ccui.ScrollView()
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL)
        scrollView.setBounceEnabled(false);
        scrollView.setTouchEnabled(true);
        this.addChild(scrollView);

        // 游戏介绍，共三张
        var images = [];
        var height = 0;
        for (var i=2; i>=0; i--) {
            var name = "#help_" + i.toString() + ".png";
            var image = new cc.Sprite(name);
            image.setScale(1.25);
            image.setAnchorPoint(cc.p(0, 0));
            image.setPosition(cc.p(0, height));
            scrollView.addChild(image);

            images.push(image);
            height += image.height * 1.25;
        }

        // 关闭按钮
        var button = new ccui.Button("btn_close.png", "", "", ccui.Widget.PLIST_TEXTURE);
        button.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.removeFromParent();
            }
        }, this);
        button.setPosition(cc.p(cc.visibleRect.width / 2, 40));
        this.addChild(button);

        scrollView.setContentSize(cc.size(cc.visibleRect.width, cc.visibleRect.height));
        scrollView.setInnerContainerSize(cc.size(cc.visibleRect.width, height));
    }
});
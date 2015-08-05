/*
* @brief:  广告条控件
* @author: Hj
* @date:   2015-08-05
*/

var AdLayer = GameBaseLayer.extend({
    ctor:function() {
        this._super();

        this._height = 98;

        // 测试用
        var bg = new cc.LayerColor(cc.color.GRAY, cc.game.config.width, 98);
        this.addChild(bg);

        var label = new ccui.Text("广告", "", 24);
        label.setTextColor(cc.color.BLACK)
        label.setPosition(cc.p(cc.game.config.width / 2, bg.getContentSize().height/2));
        this.addChild(label);
    }
})

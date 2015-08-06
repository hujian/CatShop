/*
* @brief:  图鉴页
* @author: Hj
* @date:   2015-08-02
*/

var HandbookLayer = GameBaseLayer.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function () {
        // 背景
        var bg = new cc.Sprite("#handbook_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 猫进度
        var progressBg = new cc.Sprite("#handbook_cat_status.png");
        progressBg.setPosition(cc.p(10, bg.height - 16));
        progressBg.setAnchorPoint(cc.p(0, 1));
        this.addChild(progressBg);

        var label = new ccui.Text("1%", gameResource.defaultFont, 30)
        label.setPosition(cc.p(241, bg.height - 46))
        this.addChild(label)

        // 食物进度
        progressBg = new cc.Sprite("#handbook_food_status.png");
        progressBg.setPosition(cc.p(bg.width - 10, bg.height - 16));
        progressBg.setAnchorPoint(cc.p(1, 1));
        this.addChild(progressBg);

        label = new ccui.Text("20%", gameResource.defaultFont, 30)
        label.setPosition(cc.p(bg.width - 78, bg.height - 46))
        this.addChild(label)

        for (var i=0; i<4; i++) {
            var cell = new HandbookItem(i+1, i+1)
            cell.setAnchorPoint(cc.p(0.5, 0.5))
            cell.ignoreAnchorPointForPosition(false)
            cell.setPosition(cc.p(152 + (i % 2 == 1 ? 332 : 0), 886 - (i > 1  ? 375 : 0)))
            this.addChild(cell)
        }

        // 选择工具栏
        var layer = new SelectCatPageLayer((User.getAllCats().length - 1) / 4 + 1, function(index) {

        }, this);
        layer.setContentSize(cc.size(574, 57))
        layer.setPosition(cc.p((bg.width - layer.width) / 2, 279));
        this.addChild(layer);

    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    }
});

HandbookLayer.create = function () {
    return new HandbookLayer;
};
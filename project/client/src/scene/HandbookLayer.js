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

        var catPercentage = parseInt(User.getAllUnlockCats().length / CatSetting.getAllAdult().length * 100);
        var label = new ccui.Text(catPercentage.toString() + "%", gameResource.defaultFont, 30);
        label.setPosition(cc.p(241, bg.height - 46));
        this.addChild(label);

        // 内容
        var contentLayer = new GridWidget();
        contentLayer.setContentSize(cc.size(640, 676));
        contentLayer.setPosition(cc.p(0, 360));
        this.addChild(contentLayer);
        this._contentLayer = contentLayer;

        var cats = CatSetting.getAllAdult();
        var layer = new SelectCatPageLayer(parseInt((cats.length - 1) / 4) + 1, function(index) {
            this.updateCell(index);
        }, this);
        layer.setContentSize(cc.size(574, 57));
        layer.setPosition(cc.p((bg.width - layer.width) / 2, 279));
        this.addChild(layer);
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    },

    updateCell:function(index) {
        // 加入item
        var pageCount = 4;
        var cats = CatSetting.getAllAdult();
        var count = cats.length;
        var start = index * pageCount;
        var end = start + Math.min(count - start, pageCount);

        var cells = [];
        for (var i=start; i<end; i++) {
            var catId = i + 1 + CatSetting.getAllBaby().length;

            // 如果是还没有解锁的猫，就显示 ？号
            if (User.isNewCat(catId)) {
                catId = -1;
            }
            var cell = new HandbookItem(i + 1, catId);
            cells.push(cell);
        }

        this._contentLayer.update(cells, 2, 2, 10, 20, 20, 20);
    }
});

HandbookLayer.create = function () {
    return new HandbookLayer;
};
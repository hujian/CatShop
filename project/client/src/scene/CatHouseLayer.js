/*
* @brief:  猫屋
* @author: Hj
* @date:   2015-08-02
*/

var CatHouseLayer = GameBaseLayer.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function () {
        this.showBorder();

        // 天气
        var weather = new cc.Sprite("#cat_house_bg_cloud.png");
        weather.setAnchorPoint(cc.p(0, 1));
        weather.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(weather);

        // 背景
        var bg = new cc.Sprite("#cat_house_bg_1.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 猫屋状态
        var headerBg = new cc.Sprite("#cat_house_header_bg.png");
        headerBg.setAnchorPoint(cc.p(0, 1));
        headerBg.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(headerBg);

        // 猫数量，格式：当前数量/最大数量
        var text = User.getAllCats().length.toString() + '/' + User.getMaxCatCount().toString();
        var label = new ccui.Text(text, gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(85, cc.visibleRect.height - 20));
        this.addChild(label);
        this._catNumberLabel = label;

        // 清扫器数量
        text = User.getHairCleanerCount().toString();
        label = new ccui.Text(text, gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0.5, 1));
        label.setPosition(cc.p(304, this._catNumberLabel.y));
        this.addChild(label);
        this._fanNumberLabel = label;

        var seconds = User.getFansCount()
        // 小时
        label = new ccui.Text(parseInt(seconds / 3600).toString(), gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0.5, 1));
        label.setPosition(cc.p(470, this._catNumberLabel.y));
        this.addChild(label)
        this._hourLabel = label

        // 分
        label = new ccui.Text(parseInt(seconds / 3600 % 60).toString(), gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(this._hourLabel.x + 60, this._catNumberLabel.y));
        this.addChild(label)
        this._minLabel = label

        // 秒
        label = new ccui.Text(parseInt(seconds % 60).toString(), gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(this._minLabel.x + 54, this._catNumberLabel.y));
        this.addChild(label)
        this._secondsLabel = label

        // 帮助按钮
        var help = new ccui.Button("btn_help.png", null, null, ccui.Widget.PLIST_TEXTURE);
        help.setPosition(cc.p(cc.visibleRect.width - 53, cc.visibleRect.height - 100));
        help.addTouchEventListener(this.showHelp, this);
        this.addChild(help);

        // 食物栏
        var food = new FoodStockPageLayer(this.foodSelect, this);
        food.setPosition(cc.p(0, 198));
        this.addChild(food);


        // 开始养猫
        var rect = cc.rect(39, 332, 660, 490);
        CatManager.start(rect);
        this.initCats();
    },

    initCats:function() {
        var cats = User.getAllCats()
        for (var i=0; i<cats.length; i++) {
            var cat = cats[i];
            var catSprite = new CatSprite(cat.id);
            catSprite.start(cat);
            catSprite.setPosition(cat.getPosition());
            this.addChild(catSprite);
        }
    },

    onEnter:function () {
        this._super();

    },

    onExit:function () {
        this._super();
    },

    showHelp:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
        }
    },

    foodSelect:function(foodItem) {
        var foodId = foodItem.getId();
        var foodSprite = new FoodSprite(foodId);
        foodSprite.setPosition(cc.p(this.width / 2, 689));
        foodSprite.startMoving();
        this.addChild(foodSprite);
    }
});

CatHouseLayer.create = function () {
    return new CatHouseLayer;
};
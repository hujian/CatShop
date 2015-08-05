/*
* @brief:  食物生产页
* @author: Hj
* @date:   2015-08-02
*/

var FoodLayer = GameBaseLayer.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function () {
        // 背景
        var bg = new cc.Sprite("#food_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 食物栏
        var food = new FoodPageLayer(this.foodSelect, this);
        food.setPosition(cc.p(0, 198));
        this.addChild(food);

        // 玩家金钱
        bg = new cc.Sprite("#food_user_money_bg.png")
        bg.setAnchorPoint(cc.p(1, 0))
        bg.setPosition(cc.p(cc.visibleRect.width - 28, 338))
        this.addChild(bg)

        var label = new ccui.Text(User.getMoney().toString(), gameResource.defaultFont, 30)
        label.setPosition(cc.p(bg.width / 2, bg.height / 2))
        bg.addChild(label)
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    }
});

FoodLayer.create = function () {
    return new FoodLayer;
};
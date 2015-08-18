/*
* @brief:  食物生产页
* @author: Hj
* @date:   2015-08-02
*/

var FoodLayer = GameBaseLayer.extend({
    ctor:function() {
        this._super();

        this.initUI();
    },

    initUI:function() {
        // 背景
        var bg = new cc.Sprite("#food_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 食物栏
        var food = new FoodPageLayer(this.foodSelect, this);
        food.setPosition(cc.p(0, 198));
        this.addChild(food);

        // 玩家金钱
        bg = new cc.Sprite("#food_user_money_bg.png");
        bg.setAnchorPoint(cc.p(1, 0));
        bg.setPosition(cc.p(cc.visibleRect.width - 28, 338));
        this.addChild(bg);

        var label = new ccui.Text(User.getMoney().toString(), gameResource.defaultFont, 30);
        label.setPosition(cc.p(bg.width / 2, bg.height / 2));
        bg.addChild(label);

        // 生产容器
        this._containers = [];
        for (var i=0; i<4; i++) {
            var container = new FoodProduceContainer();
            container.setContentSize(cc.size(306, 270));
            container.setPosition(cc.p(18 + (i % 2 != 0 ? container.width : 0), 846 - (i > 1 ? container.height : 0)));
            this.addChild(container);
            this._containers.push(container);
        }
    },

    onEnter:function() {
        this._super();
    },

    onExit:function() {
        this._super();
    },

    foodSelect:function(foodItem) {
        var foodId = foodItem.getId();
        var setting = FoodSetting.getById(foodId);
        if (User.getMoney() < setting.money) {
            var dialog = new MessageDialog("资金不足，请加油赚钱哦！");
            dialog.present();
        } else {
            var validContainer = null;
            for (var i=0; i<4; i++) {
                var container = this._containers[i];

                if (container.isFoodProducing(foodId)) {
                    var message = new MessageDialog("这种食物正在生产中，需要等待完成哦！");
                    message.present();
                    return;
                }

                if (container.isDone() && !validContainer) {
                    validContainer = container;
                }
            }

            if (validContainer) {
                validContainer.produceFood(foodId);
                Shop.buyFood(foodId);
            } else {
                var message = new MessageDialog("没有空闲的生产栏哦，请稍等!");
                message.present();
            }
        }
    }
});

FoodLayer.create = function () {
    return new FoodLayer;
};
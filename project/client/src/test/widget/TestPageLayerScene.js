/*
* @brief:  PageLayer的测试用例
* @author: Hj
* @date:   2015-08-04
*/

var TestPageLayerScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        this.addTestButton("基础PageLayer", this.testBasic);
        this.addTestButton("猫屋食物条", this.testCatHouseFood);
        this.addTestButton("生产食物条", this.testProduceFood);
        this.addTestButton("售卖选择条", this.testSellCat);

        this.nextColumn();
        this.addTestButton("加一页", this.addPage);
    },

    addPage:function() {
        if (this.pageLayer) {
            var page = new cc.Layer();
            var startPosition = cc.p(this.pageLayer._leftArrow.getContentSize().width + 15, 0);
            for (var i=0; i<4; i++) {
                var item = new FoodStockItem(1, i + this.pageLayer.getPageCount() * 4, ccui.Widget.PLIST_TEXTURE);
                item.setAnchorPoint(cc.p(0, 0));
                item.setPosition(startPosition);
                item.addTouchEventListener(this.selectFood, this);
                page.addChild(item);
                startPosition.x += item.getContentSize().width + 22;
            }
            this.pageLayer.addPage(page);
        }
    },

    updateLayer:function(layer) {
        if (this.pageLayer) {
            this.pageLayer.removeFromParent();
            this.pageLayer = null;
        }

        layer.setPosition(cc.p(100, 20));
        this.addChild(layer);
        layer.showBorder(true);
        this.pageLayer = layer;
    },

    testBasic:function() {
        var layer = new PageLayer("food_bar_btn_left.png", "food_bar_bg.png", ccui.Widget.PLIST_TEXTURE);
        this.updateLayer(layer);
    },

    testCatHouseFood:function() {
        var layer = new FoodStockPageLayer(this.foodSelect, this);
        this.updateLayer(layer);
    },

    foodSelect:function(item, foodId) {
        var setting = FoodSetting.getById(foodId);
        if (User.getFoodCount(foodId) > 0) {
            User.removeFood(foodId, 1);
            item.updateStock(User.getFoodCount(foodId));
            User.flush();
            this.printMessage("喂了一个" + setting.name);
        } else {
            this.printMessage("数量不够，请购买");
        }
    },

    testProduceFood:function() {
        var layer = new FoodPageLayer(this.foodProduce, this);
        this.updateLayer(layer);
    },

    foodProduce:function(item, foodId) {
        var name = FoodSetting.getById(foodId).name;
        if (Shop.buyFood(foodId)) {
            this.printMessage("开始生产" + name);
            this.printMessage("生产" + name + "成功");
        } else {
            this.printMessage("金钱不够..");
        }
    },

    testSellCat:function() {
        var layer = new SelectCatPageLayer(10, function(index) {
            this.printMessage("index:" + (index + 1).toString())
        }, this)
        layer.setContentSize(cc.size(383, 57));
        this.updateLayer(layer);
    }
})
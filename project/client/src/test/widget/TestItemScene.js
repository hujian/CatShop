/* 
* @brief:  测试各种item的test case
* @author: Hj
* @date:   2015-08-04
*/

var TestItemScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_baby_plist, gameResource.global.cat_baby_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        var name = this.createTestLabel("猫屋食物储量item");
        name.setAnchorPoint(cc.p(0, 0));
        name.setPosition(cc.p(160, 400));
        this.addChild(name);
        var startPosition = cc.p(160, 350);
        for (var i in FoodSetting.getAll()) {
            var food = FoodSetting.getAll()[i]
            var item = new FoodStockItem(food.id, 10, ccui.Widget.PLIST_TEXTURE);
            item.food = food;
            item.setAnchorPoint(cc.p(0, 0.5));
            item.setPosition(startPosition);
            item.setScale(0.6);
            item.addTouchEventListener(this.selectFood, this);
            this.addChild(item);
            startPosition.x += 80;
        }

        name = this.createTestLabel("食物生产列表item");
        name.setAnchorPoint(cc.p(0, 0));
        name.setPosition(cc.p(160, 280));
        this.addChild(name);
        startPosition = cc.p(160, 230);
        for (i in FoodSetting.getAll()) {
            food = FoodSetting.getAll()[i];
            item = new FoodItem(food.id, 10, 10, ccui.Widget.PLIST_TEXTURE);
            item.food = food;
            item.setAnchorPoint(cc.p(0, 0.5));
            item.setPosition(startPosition);
            item.setScale(0.6);
            item.addTouchEventListener(this.selectFood, this);
            this.addChild(item);
            startPosition.x += 80;
        }

        name = this.createTestLabel("商店item");
        name.setAnchorPoint(cc.p(0, 0));
        name.setPosition(cc.p(160, 160));
        this.addChild(name);
        item = new ShopItem(1, ShopItem.type.Cat, function(id) {
            this.printMessage("购买" + CatSetting.getBabyById(id).name);
        }, this);
        item.setScale(0.5);
        item.setPosition(cc.p(160, 40));
        this.addChild(item);

        name = this.createTestLabel("图鉴item");
        name.setAnchorPoint(cc.p(0, 0));
        name.setPosition(cc.p(500, 160));
        this.addChild(name);

        item = new HandbookItem(1, 1);
        item.setAnchorPoint(cc.p(0, 0));
        item.setScale(0.5);
        item.setPosition(cc.p(500, 10));
        this.addChild(item);

        item = new HandbookItem(2, -1);
        item.setAnchorPoint(cc.p(0, 0));
        item.setScale(0.5);
        item.setPosition(cc.p(650, 10));
        this.addChild(item);
    },

    selectFood:function(foodItem, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.printMessage("选择食物" + FoodSetting.getById(foodItem.getId()).name);
        }
    }
});
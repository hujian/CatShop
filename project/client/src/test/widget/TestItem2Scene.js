/* 
* @brief:  item测试用例
* @author: Hj
* @date:   2015-08-10
*/

var TestItem2Scene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.food_plist, gameResource.global.food_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.other_plist, gameResource.global.other_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_plist, gameResource.global.cat_image);

        this.addTestButton("生产食物", function() {
            var container = new FoodProduceContainer();
            container.setContentSize(cc.size(306, 270));
            container.setPosition(cc.p(376, 175));
            this.addChild(container);
            container.produceFood(1);
        });

        this.addTestButton("移动食物", function() {
            var food = new FoodSprite(1);
            food.setPosition(cc.visibleRect.center);
            this.addChild(food);
            food.setScale(0.6)
        });

        this.addTestButton(["猫的饥饿0", "猫的饥饿65", "猫的饥饿100"], function(button, state) {
            if (!this._hungry) {
                var hungry = new CatHungryWidget(0);
                hungry.setPosition(cc.visibleRect.center);
                this.addChild(hungry);
                this._hungry = hungry;
            }
            if (state == 1) {
                this._hungry.updateHungry(0)
            } else if (state == 2) {
                this._hungry.updateHungry(65)
            } else {
                this._hungry.updateHungry(100)
            }
        });

        this.addTestButton("出售历史", function() {
            var cat = new Cat(30);
            var item = new SellingHistoryItem(cat);
            item.setScale(0.5);
            item.setPosition(cc.p(200, 100));
            this.addChild(item);
        });

        this.addTestButton("猫评级", function() {
            var rank = new CatRankWidget(4);
            rank.setScale(0.5);
            rank.setPosition(cc.p(200, 100));
            this.addChild(rank);
        });
    }
});
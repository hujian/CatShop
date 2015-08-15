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

        var container = new FoodProduceContainer();
        container.setContentSize(cc.size(306, 270));
        container.setPosition(cc.p(376, 175));
        this.addChild(container);

        this.addTestButton("生产食物", function() {
            container.produceFood(1);
        });

        this.addTestButton("移动食物", function() {
            var food = new FoodSprite(1);
            food.setPosition(cc.visibleRect.center);
            this.addChild(food);
            food.setScale(0.6)
            food.startMoving();
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
    }
});
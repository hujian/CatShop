/* 
* @brief:  食物精灵
* @author: Hj
* @date:   2015-08-12
*/

var FoodSprite = cc.Sprite.extend({
    ctor:function (id) {
        this._setting = FoodSetting.getById(id);
        this._super("#food_img_" + id.toString() + ".png");
        this.canMove = true;
        this.canEat = false;

        var self = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch, event) {
                var ret = Util.touchInNode(touch, self);
                if (ret) {
                    if (!self._moving && this.canMove) {
                        self.startMoving();
                    }
                }
                return ret;
            },
            onTouchMoved:function(touch, event) {
                var delta = touch.getDelta();
                self.x += delta.x;
                self.y += delta.y;
                self.setLocalZOrder(cc.visibleRect.height - self.y);
            },
            onTouchEnded:function(touch, event) {
                // 食物刚放上去的时候，不能吃，一旦移动过一次，就可以吃了
                self.canEat = true;

                self.stopMoving();
            }
        });
        cc.eventManager.addListener(listener, this);
    },

    startMoving:function() {
        if (!this._move) {
            this._move = new cc.Sprite("#food_move.png");
            this._move.setPosition(cc.p(this.width / 2, this.height / 2));
            this._move.setScale(0.8);
            this.addChild(this._move);
        }
        this._moving = true;
    },

    stopMoving:function() {
        this._moving = false;
        this._move.removeFromParent();
        this._move = null;
    },

    getId:function() {
        return this._setting.id;
    },

    // 被猫吃掉了
    ate:function() {
        this.removeFromParent();
        User.removeFood(this.getId(), 1);
        return this._setting.value;
    },

    // 食物有大小，吃得时候，需要一个固定的位置
    getEatingPosition:function() {
        return cc.pAdd(this.getPosition(), cc.p(0, 30));
    }
});

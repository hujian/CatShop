/* 
* @brief:  食物精灵
* @author: Hj
* @date:   2015-08-12
*/

var FoodSprite = cc.Sprite.extend({
    ctor:function (id) {
        this._setting = FoodSetting.getById(id);
        this._super("#food_img_" + id.toString() + ".png");

        var self = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touch, event) {
                if (!self._moving) {
                    self.startMoving();
                }
                return Util.touchInNode(touch, self);
            },
            onTouchMoved:function(touch, event) {
                var delta = touch.getDelta();
                self.x += delta.x;
                self.y += delta.y;
            },
            onTouchEnded:function(touch, event) {
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
    }
});

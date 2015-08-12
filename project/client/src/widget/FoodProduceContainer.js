/*
* @brief:  食品生产页面容器
* @author: Hj
* @date:   2015-08-10
*/

var FoodProduceContainerPositions = [
    [60, 50], [160, 50], [260, 50],
    [50, 140], [130, 140], [210, 140], [290, 140],
    [60, 230], [160, 230], [260, 230]
];

var FoodProduceContainer = GameBaseLayer.extend({
    ctor:function (callback, target) {
        this._super();
        this._amount = 0;
        this._callback = callback;
        this._target = target;
        this._foodSprites = [];

        var self = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan:function(touch, event) {
                return Util.touchInNode(touch, event.getCurrentTarget());
            },
            onTouchEnded:function(touch, event) {
                var position = self.convertToNodeSpace(touch.getLocation());
                self.selectFood(position);
            }
        });

        cc.eventManager.addListener(listener, this);
    },

    produceFood:function(id) {
        this._foodPositions = Util.shuffle(FoodProduceContainerPositions.slice());
        this.removeAllChildren();
        this._loadingBar = null;

        this._loadingBar = new FoodProduceProgressBar();
        this._loadingBar.setPosition(cc.p((this.width - this._loadingBar.width)/ 2, this.height /2));
        this.addChild(this._loadingBar);

        var setting = FoodSetting.getById(id);
        this._foodId= id;
        this._amount = setting.amount;
        this._loadingBar.start(setting.time, setting.amount, this.doneOneFood, this);
    },

    doneOneFood:function(index) {
        var imageName = "#food_img_" + this._foodId.toString() + ".png";
        var sprite = new cc.Sprite(imageName);
        var position = this._foodPositions[Math.min(index, FoodProduceContainerPositions.length - 1)];
        sprite.setPosition(cc.p(position[0], position[1]));
        //sprite.setScale(0);
        //sprite.runAction(cc.sequence(cc.scaleBy(1, 0.8), cc.scaleBy(1, 1.25)));
        //sprite.runAction(cc.sequence(cc.scaleTo(1, 0.5), cc.scaleTo(1, 1)));
        this.addChild(sprite);
        this._foodSprites.push(sprite);
    },

    isDone:function() {
        return this._amount <= 0;
    },

    selectFood:function(positon) {
        // 碰撞用矩形
        var rectLength = 200;
        var rect = cc.rect(positon.x - rectLength / 2, positon.y - rectLength / 100, rectLength, rectLength);
        var targetPosition = this.convertToNodeSpace(cc.p(Util.getRandomInt(500, 540), Util.getRandomInt(460, 480)));
        for (var i=this._foodSprites.length-1; i>=0; i--) {
            var sprite = this._foodSprites[i];
            if (cc.rectContainsPoint(rect, sprite.getPosition())) {
                var callback = cc.callFunc(function(sprite) {
                    sprite.removeFromParent();
                    this._amount--;
                    User.addFood(this._foodId, 1);
                    User.flush();
                }, this, sprite);
                sprite.runAction(cc.sequence(cc.moveTo(1, targetPosition), callback));
                this._foodSprites.splice(i, 1)
            }
        }
    }
});
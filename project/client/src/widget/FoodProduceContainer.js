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
        this._isProducing = false; // 是否在生产食物中
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

        this._loadingBar = new FoodProduceProgressBar();
        this.addChild(this._loadingBar);
    },

    produceFood:function(id) {
        this._isProducing = true;
        this._foodPositions = Util.shuffle(FoodProduceContainerPositions.slice());
        var setting = FoodSetting.getById(id);
        this._foodId= id;
        this._loadingBar.start(setting.time, setting.amount, this.doneOneFood, this);
    },

    setContentSize:function(size) {
        this._super(size);

        this._loadingBar.setPosition(cc.p((this.width - this._loadingBar.width)/ 2, this.height /2));
    },

    doneOneFood:function(leftCount) {
        var imageName = "#food_img_" + this._foodId.toString() + ".png";
        var sprite = new cc.Sprite(imageName);
        var position = this._foodPositions[Math.min(leftCount, FoodProduceContainerPositions.length - 1)];
        sprite.setPosition(cc.p(position[0], position[1]));
        //sprite.setScale(0);
        //sprite.runAction(cc.sequence(cc.scaleBy(1, 0.8), cc.scaleBy(1, 1.25)));
        //sprite.runAction(cc.sequence(cc.scaleTo(1, 0.5), cc.scaleTo(1, 1)));
        this.addChild(sprite);
        this._foodSprites.push(sprite);

        Audio.playAudioEffect(gameResource.global.audio_effect_food_producing);

        if (leftCount == 0) {
            this._isProducing = false;
        }
    },

    // 当前这个食物栏，是否可以生产新的食物，要求不能在生产中，并且，所有已经生产出来的食物被选走了。
    isValid:function() {
        return !this._isProducing && this._foodSprites.length == 0;
    },

    // 这个食物是否在本栏中生产
    isFoodProducing:function(foodId) {
        if (foodId) {
            return this._isProducing && this._foodId == foodId;
        } else {
            return this._isProducing;
        }
    },

    selectFood:function(positon) {
        // 碰撞用矩形
        var rectLength = 200;
        var rect = cc.rect(positon.x - rectLength / 2, positon.y - rectLength / 100, rectLength, rectLength);
        var targetPosition = this.convertToNodeSpace(cc.p(Util.getRandomInt(500, 540), Util.getRandomInt(460, 480)));
        var count = 0;
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
                count++;
            }
        }
        if (count > 0) {
            Audio.playAudioEffect(gameResource.global.audio_effect_food_select);
        }
    }
});
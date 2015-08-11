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
    ctor:function () {
        this._super();
        this._amount = 0;
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

        this.showBorder(true);
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
        this._amount--;
    },

    isDone:function() {
        return this._amount <= 0;
    }
});
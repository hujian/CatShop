/*
* @brief:  弹出层测试
* @author: Hj
* @date:   2015-07-22
*/

var TestPopupScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.food_plist, gameResource.global.food_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.other_plist, gameResource.global.other_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_baby_plist, gameResource.global.cat_baby_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_plist, gameResource.global.cat_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.other_plist, gameResource.global.other_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.sell_plist, gameResource.global.sell_image);

        this.addTestButton("弹出一个", this.popOne);
        this.addTestButton("弹出5个", this.popFive);
        this.addTestButton("食物确认框", this.foodCheckDialog);
        this.addTestButton("食物通知框", this.foodMessageDialog);
        this.addTestButton("猫详细页", this.catDetail);
        this.addTestButton("猫卖出结构页", this.catSellingResult);
    },

    onEnter:function() {
        this._super();
    },

    popOne:function () {
        this.popLayer();
    },

    popFive:function () {
        for (var i = 0; i<5; i++) {
            this.popLayer();
        }
    },

    popLayer:function () {
        var layer = new TestPopupLayer();
        layer.present();

        // 显示当前的弹出层是第几个
        var label = new ccui.Text("弹出层" +  this.backKeyReleasedEvent.size().toString(), TestSceneFontName, 12);
        label.setColor(cc.color.BLACK);
        label.setPosition(cc.p(150, 100));
        layer.contentLayer.addChild(label);

        // 可以在现在这个弹出层上，再弹出一个
        layer.addTestButton("再弹出一个", this.popOne, this);
    },

    foodCheckDialog:function() {
        var dialog = new CheckDialog("需要花费100元和30秒钟，购买10个牛奶吗？", this.foodYes, this.foodNo, this);
        dialog.setScale(0.6);
        dialog.present();
    },

    foodYes:function() {
        this.printMessage("确认生产牛奶。。。");
    },

    foodNo:function() {
        this.printMessage("取消生产牛奶。。。");
    },

    foodMessageDialog:function() {
        var dialog = new MessageDialog("当前食物栏已满，无法继续生产，请稍等。", this.messageCheck, this);
        dialog.setScale(0.6);
        dialog.present();
    },

    messageCheck:function() {
        this.printMessage("确认消息框");
    },

    catDetail:function() {
        var cat = new Cat(30);
        cat.ill = true;

        var catLayer = new CatDetailLayer(cat);
        catLayer.setScale(0.5);
        catLayer.present();
    },

    catSellingResult:function() {
        var cat = new Cat(30);
        var layer = new CatSellingResultLayer(cat);
        layer.setScale(0.5);
        layer.present();
    }
});
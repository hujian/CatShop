/*
* @brief:  测试猫精灵控件
* @author: Hj
* @date:   2015-08-06
*/

var TestCatSpriteScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_baby_plist, gameResource.global.cat_baby_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_plist, gameResource.global.cat_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.cat_house_plist, gameResource.global.cat_house_image);

        cc.spriteFrameCache.addSpriteFrames(gameResource.global.food_plist, gameResource.global.food_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.other_plist, gameResource.global.other_image);
        cc.spriteFrameCache.addSpriteFrames(gameResource.global.shop_plist, gameResource.global.shop_image);

        var p = cc.p(340, 350);
        // 正面
        var cat = new CatSprite(1);
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);

        // 侧面
        cat = new CatSprite(1, true);
        cat.playEat();
        p.x += 100;
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);

        // 走路
        cat = new CatSprite(1, true);
        p.x += 100;
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);
        cat.playMove();

        // 吃饭
        cat = new CatSprite(1, true);
        p.x += 100;
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);
        cat.playSleep();

        // 睡觉
        cat = new CatSprite(25, true);
        p.x += 100;
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);
        cat.playMove();

        // 跑动区域
        var layer = new GameBaseLayer();
        layer.setPosition(cc.p(320, 20));
        layer.setContentSize(cc.size(450, 280));
        layer.showBorder(true);
        this.addChild(layer);

        // 到处跑
        var catModel = User.addCat(25);
        cat = new CatSprite(25);
        p.x -= 150;
        p.y -= 200;
        cat.setPosition(p);
        cat.setScale(0.5);
        cat.start(catModel);
        this.addChild(cat);
        CatManager.start(cc.rect(layer.x, layer.y, layer.width, layer.height));
        cat.setPosition(catModel.getPosition());

        this.addTestButton("生气", function() {
            cat.angry();
        });
        this.addTestButton("高兴", function() {
            cat.happy();
        });
        this.addTestButton("生病", function() {
            cat.ill();
        });
        this.addTestButton("掉毛", function() {
            catModel.dropHair();
        });

        // 加入毛
        this.dropHairListenter = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: CatSetting.dropHairEvent,
            callback: function(event) {
                var cat = event.getUserData();
                var position = cat.getPosition();
                var hair = new cc.Sprite("#cat_house_cat_hair.png");
                hair.setScale(0.5);
                hair.setPosition(cc.p(position.x + Util.getRandomInt(-20, 20), position.y + Util.getRandomInt(-30, 30)));
                this.addChild(hair);
            }.bind(this)
        });
        cc.eventManager.addListener(this.dropHairListenter, 1);
    }
});
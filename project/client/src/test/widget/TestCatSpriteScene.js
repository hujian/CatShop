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
        p.x -= 150
        p.y -= 200;
        cat.setPosition(p);
        cat.setScale(0.5);
        cat.start(catModel)
        this.addChild(cat);
        CatManager.start(cc.rect(layer.x, layer.y, layer.width, layer.height));
        cat.setPosition(catModel.getPosition());

        this.addTestButton("生气", function() {
            cat.angry();
        })
        this.addTestButton("高兴", function() {
            cat.happy();
        })
        this.addTestButton("生病", function() {
            cat.ill();
        })

    }
});
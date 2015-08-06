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

        var p = cc.p(220, 350);
        // 正面
        var cat = new CatSprite(1);
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);

        // 侧面
        cat = new CatSprite(1, true);
        cat.showProfile()
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
        cat.playEat();

        // 睡觉
        cat = new CatSprite(25, true);
        p.x += 100;
        cat.setPosition(p);
        cat.setScale(0.5);
        this.addChild(cat);
        cat.playSleep();
    }
});
/*
* @brief:  猫屋
* @author: Hj
* @date:   2015-08-02
*/

var CatHouseLayer = GameBaseLayer.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function () {
        this.showBorder();

        // 天气
        var weather = new cc.Sprite("#cat_house_bg_cloud.png");
        weather.setAnchorPoint(cc.p(0, 1));
        weather.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(weather);

        // 背景
        var bg = new cc.Sprite("#cat_house_bg_1.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 猫屋状态
        var headerBg = new cc.Sprite("#cat_house_header_bg.png");
        headerBg.setAnchorPoint(cc.p(0, 1));
        headerBg.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(headerBg);

        // 猫数量，格式：当前数量/最大数量
        var label = new ccui.Text("", gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(85, cc.visibleRect.height - 20));
        this.addChild(label);
        this._catNumberLabel = label;

        // 清扫器数量
        label = new ccui.Text("", gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0.5, 1));
        label.setPosition(cc.p(304, this._catNumberLabel.y));
        this.addChild(label);
        this._fanNumberLabel = label;

        // 小时
        label = new ccui.Text("", gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0.5, 1));
        label.setPosition(cc.p(470, this._catNumberLabel.y));
        this.addChild(label);
        this._hourLabel = label;

        // 分
        label = new ccui.Text("", gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(this._hourLabel.x + 60, this._catNumberLabel.y));
        this.addChild(label);
        this._minLabel = label;

        // 秒
        label = new ccui.Text("", gameResource.defaultFont, 16);
        label.setAnchorPoint(cc.p(0, 1));
        label.setPosition(cc.p(this._minLabel.x + 54, this._catNumberLabel.y));
        this.addChild(label);
        this._secondsLabel = label;

        // 帮助按钮
        var help = new ccui.Button("btn_help.png", null, null, ccui.Widget.PLIST_TEXTURE);
        help.setPosition(cc.p(cc.visibleRect.width - 53, cc.visibleRect.height - 100));
        help.addTouchEventListener(this.showHelp, this);
        this.addChild(help);

        // 食物栏
        var food = new FoodStockPageLayer(this.foodSelect, this);
        food.setPosition(cc.p(0, 198));
        this.addChild(food);

        // 开始养猫
        var rect = cc.rect(80, 400, 480, 390);
        CatManager.start(rect);
        this.initCats();

        // 猫掉毛
        this.initCatHair();

        // 更新猫屋状态信息
        this.updateStatus();
    },

    initCats:function() {
        var cats = User.getAllCats();
        for (var i=0; i<cats.length; i++) {
            var cat = cats[i];
            var catSprite = new CatSprite(cat.id);
            catSprite.start(cat);
            catSprite.setPosition(cat.getPosition());
            this.addChild(catSprite);
        }
    },

    initCatHair:function() {
        var count = User.getHairCount();
        for (var i=0; i<count; i++) {
            this.addCatHair(CatManager.getRandomPositionInMovingRect());
        }

        this.dropHairListenter = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: CatSetting.dropHairEvent,
            callback: function(event) {
                var cat = event.getUserData();
                var position = cat.getPosition();
                this.addCatHair(position);
            }.bind(this)
        });
        cc.eventManager.addListener(this.dropHairListenter, 1);
    },

    addCatHair:function(position) {
        var hair = new HairSprite();
        hair.setPosition(cc.p(position.x + Util.getRandomInt(-20, 20), position.y + Util.getRandomInt(-30, 30)));
        hair.setLocalZOrder(cc.visibleRect.height - hair.y);
        this.addChild(hair);
    },

    onEnter:function () {
        this._super();

        this.schedule(this.update, 0.5);
    },

    onExit:function () {
        this.unscheduleUpdate();

        this._super();
    },

    update:function() {
        this.updateStatus();
    },

    updateStatus:function() {
        // 猫数量
        var text = User.getAllCats().length.toString() + '/' + User.getMaxCatCount().toString();
        this._catNumberLabel.setString(text);

        // 清洁器
        var cleanerCount = User.getHairCleanerCount();
        text = cleanerCount.toString();
        this._fanNumberLabel.setString(text);

        // 风扇
        if (cleanerCount > 0) {
            if (!this._fanSprite) {
                var fan = new cc.Sprite("#cat_house_fan_0.png");
                var animation = new cc.Animation();
                for (var i=0; i<2; i++) {
                    animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("cat_house_fan_" + i.toString() + ".png"));
                }
                animation.setDelayPerUnit(1 / 10);
                animation.setRestoreOriginalFrame(true);
                var action = cc.animate(animation);
                fan.runAction(cc.repeatForever(action));
                fan.setPosition(cc.p(cc.visibleRect.width / 2, 964));
                this.addChild(fan);
                this._fanSprite = fan;
            }
            this._fanSprite.setVisible(true);
        } else {
            if (this._fanSprite) {
                this._fanSprite.setVisible(false);
            }
        }

        var seconds = User.getFansCount();
        this._hourLabel.setString(parseInt(seconds / 3600).toString());
        this._minLabel.setString(parseInt(seconds / 3600 % 60).toString());
        this._secondsLabel.setString(parseInt(seconds % 60).toString());
    },

    showHelp:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var layer = new HelpLayer();
            layer.present();
        }
    },

    foodSelect:function(foodItem) {
        var count = foodItem.getStockCount();
        if (count > 0) {
            // 加入食物精灵
            var foodId = foodItem.getId();
            var foodSprite = new FoodSprite(foodId);
            foodSprite.setPosition(cc.p(this.width / 2, 689));
            foodSprite.startMoving();
            foodSprite.setScale(0.8);
            this.addChild(foodSprite);

            // 将食物加入猫屋逻辑
            CatManager.addFood(foodSprite);

            // 更新UI上食物数量
            foodItem.updateStock(count - 1);
        } else {
            var message = new MessageDialog("食物不够，请先去购买足够的食物哦！");
            message.present();
        }
    }
});

CatHouseLayer.create = function () {
    return new CatHouseLayer;
};
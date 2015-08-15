/*
* @brief:  猫的详细页
* @author: Hj
* @date:   2015-08-15
*/

var CatDetailLayer = PopupBaseLayer.extend({
    ctor:function (cat) {
        this._super();

        this._cat = cat;
        var setting = CatSetting.getById(cat.id);

        // 加入半透明背景
        this.addTransparentMaskBackground();

        // 背景
        var bg = new cc.Sprite("#cat_detail_bg.png");
        bg.setPosition(cc.visibleRect.center);
        this.addChild(bg)

        // 猫的正面头像
        var catSprite = new CatSprite(cat.id);
        catSprite.setPosition(cc.p(124, 296));
        bg.addChild(catSprite);

        // 猫的名称
        var name = new ccui.Text(setting.name, gameResource.defaultFont, 30);
        name.setPosition(cc.p(346, 430));
        bg.addChild(name);

        // 养猫的提示
        var hint = new ccui.Text(setting.hint, gameResource.defaultFont, 18);
        hint.setContentSize(cc.size(198, 116));
        hint.setPosition(cc.p(name.x, 263));
        hint.ignoreContentAdaptWithSize(false);
        bg.addChild(hint);

        // 药物/疫苗
        // 数量
        var countLabel = new ccui.Text("", gameResource.defaultFont, 18);
        countLabel.setPosition(cc.p(203, 163))
        bg.addChild(countLabel, 2);
        this._countLabel = countLabel;

        var button = null;
        // 吃药按钮
        if (cat.getIll()) {
            button = new ccui.Button("btn_take_medicine.png", null, null, ccui.Widget.PLIST_TEXTURE);
            countLabel.setString(User.getMedicineCount().toString());
            button.addTouchEventListener(function(button, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    if (User.getMedicineCount() > 0) {
                        this._countLabel.setString((User.getMedicineCount() - 1).toString());
                        this._cat.takeMedicine();
                        User.removeItem(ItemSetting.id.medicine, 1);
                        User.flush();
                    }
                }
            }, this)
        } else {
            // 疫苗按钮
            if (cat.hasVaccine()) {
                button = new ccui.Button("btn_take_vaccine_done.png", null, null, ccui.Widget.PLIST_TEXTURE);
                countLabel.setVisible(false);
            } else {
                button = new ccui.Button("btn_take_vaccine.png", null, null, ccui.Widget.PLIST_TEXTURE);
                countLabel.setString(User.getVaccineCount());
                button.addTouchEventListener(function(button, type) {
                    if (type == ccui.Widget.TOUCH_ENDED) {
                        if (User.getVaccineCount() > 0) {
                            // 刷新界面
                            this._countLabel.setVisible(false)
                            button.loadTextureNormal("btn_take_vaccine_done.png", ccui.Widget.PLIST_TEXTURE);

                            // 更新用户数据
                            this._cat.takeVaccine();
                            User.removeItem(ItemSetting.id.vaccine, 1);
                            User.flush();
                        }
                    }
                }, this)
            }
        }
        button.setPosition(cc.p(catSprite.x, countLabel.y));
        bg.addChild(button);

        // 喜欢和讨厌的食物
        var likeFoodId = setting.like;
        var dislikeFoodId = setting.dislike;

        var likeFood = new cc.Sprite("#food_img_" + likeFoodId.toString() + ".png");
        likeFood.setPosition(cc.p(300, 60));
        bg.addChild(likeFood);
        if (likeFoodId > 0) {
            likeFood.setScale(0.5);
        }

        var dislikeFood = new cc.Sprite("#food_img_" + dislikeFoodId.toString() + ".png");
        dislikeFood.setPosition(cc.p(400, 60));
        bg.addChild(dislikeFood);
        if (dislikeFoodId > 0) {
            dislikeFood.setScale(0.5);
        }

        // 饥饿状况
        var hungryLayer = new CatHungryWidget(cat.getHungry());
        hungryLayer.setPosition(cc.p(239, 136));
        bg.addChild(hungryLayer);

        // 猫养育的时间
        var time = new ccui.Text("0小时0分", gameResource.defaultFont, 16);
        time.setPosition(cc.p(174, 90));
        bg.addChild(time);

        // 猫的体重
        var weight = new ccui.Text("5KG", gameResource.defaultFont, 18);
        weight.setPosition(cc.p(200, 46));
        bg.addChild(weight);

        // 关闭按钮
        var closeButton = new ccui.Button("btn_close.png", null, null, ccui.Widget.PLIST_TEXTURE);
        closeButton.setPosition(cc.p(bg.x, bg.y - bg.height / 2 - 40));
        this.addChild(closeButton);
        closeButton.addTouchEventListener(function(button, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.dismiss();
            }
        }, this);

    }

});
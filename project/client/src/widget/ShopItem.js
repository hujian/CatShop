/*
* @brief:  商店列表Item
* @author: Hj
* @date:   2015-08-05
*/

var ShopItem = ccui.Layout.extend({
    ctor:function (id, type, callBack, target) {
        this._super();

        this._callback = callBack;
        this._target = target;

        var setting = type == ShopItem.type.Cat ? CatSetting.getBabyById(id) : ItemSetting.getById(id) ;

        // 背景
        var bg = new cc.Sprite("#shop_list_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 图像，如果是猫，是正面吃东西第一张
        var icon = null
        if (type == ShopItem.type.Cat) {
            icon = new CatSprite(id)
        } else {
            icon = new cc.Sprite("#item_" + id.toString() + ".png");
        }

        icon.setPosition(cc.p(72, bg.height / 2));
        this.addChild(icon);

        // 名字
        var name = new ccui.Text(setting.name, gameResource.defaultFont, 30);
        name.setTextColor(cc.color.BLACK);
        name.setAnchorPoint(cc.p(0, 1));
        name.setPosition(cc.p(169, bg.height - 32));
        this.addChild(name);

        // 描述
        var description = new ccui.Text(setting.content, gameResource.defaultFont, 16);
        description.setTextColor(cc.color.BLACK);
        description.ignoreContentAdaptWithSize(false);
        description.setContentSize(cc.size(240, 110));
        description.setAnchorPoint(cc.p(0, 1));
        description.setPosition(cc.p(name.x, name.y - name.height - 17));
        this.addChild(description);

        // 价格
        var money = new ccui.Text(setting.money + "元", gameResource.defaultFont, 20);
        money.setAnchorPoint(cc.p(0.5, 1));
        money.setPosition(cc.p(bg.width - 130, bg.height - 35));
        this.addChild(money);

        // 购买按钮
        var buyButton = new ccui.Button("buy_button.png", null, null, ccui.Widget.PLIST_TEXTURE);
        buyButton.setAnchorPoint(cc.p(1, 0));
        buyButton.setPosition(cc.p(bg.width - 27, 12));
        buyButton.id = id;
        buyButton.addTouchEventListener(this.buyItem, this);
        this.addChild(buyButton);

        this.setContentSize(bg.getContentSize())
    },

    buyItem:function(button, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (this._target && this._callback) {
                this._callback.call(this._target, button.id);
            }
        }
    }
});

ShopItem.type = {
    Cat: "cat",
    Item: "item"
}
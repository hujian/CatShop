/* 
* @brief: 商店页
* @author: Hj
* @date:   2015-06-01 21:28:02
*/

var ShopLayer = GameBaseLayer.extend({
    // barHeight 是容器类底部需要覆盖的面积高度，layer的可见内容部分要高于这个
    ctor:function (barHeight) {
    	this._super();

        this.initUI(barHeight || 198);
    },

    initUI:function (barHeight) {
        // 头部
        var headerBg = new cc.Sprite("#shop_header.png");
        headerBg.setAnchorPoint(cc.p(0, 1));
        headerBg.setPosition(cc.p(0, cc.visibleRect.height));
        this.addChild(headerBg);

        var text = new ccui.Text("价格越高的猫仔，\n越容易养成稀有的猫哦!", gameResource.defaultFont, 30);
        text.setTextColor(cc.color.BLACK);
        text.setAnchorPoint(cc.p(0, 1));
        text.setPosition(cc.p(185, cc.visibleRect.height - 93));
        this.addChild(text);

        var money = new ccui.Text(User.getMoney().toString() + "元", gameResource.defaultFont, 30);
        money.setAnchorPoint(cc.p(1, 1));
        money.setPosition(cc.p(cc.visibleRect.width - 100, cc.visibleRect.height - 26));
        this.addChild(money);

        // 商品列表
        var listView = new ccui.ListView();
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setBounceEnabled(false);
        listView.setTouchEnabled(true);
        listView.setContentSize(cc.size(cc.visibleRect.width, cc.visibleRect.height - barHeight - headerBg.height));
        listView.setAnchorPoint(cc.p(0, 0));
        listView.setPosition(cc.p(0, barHeight));
        this.addChild(listView);

        // 猫仔
        for (var i in CatSetting.getAllBaby()) {
            var setting = CatSetting.getAllBaby()[i];
            var customItem = new ShopItem(setting.id, ShopItem.type.Cat, this.buyItem, this);
            listView.pushBackCustomItem(customItem);
        }

        // 道具
        for (var i in ItemSetting.getAll()) {
            var setting = ItemSetting.getAll()[i];
            var customItem = new ShopItem(setting.id, ShopItem.type.Item, this.buyItem, this);
            listView.pushBackCustomItem(customItem);
        }
    },

    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    },

    buyItem:function(id) {

    }
});

ShopLayer.create = function () {
    return new ShopLayer;
};
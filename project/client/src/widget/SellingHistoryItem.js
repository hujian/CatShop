/* 
* @brief:  出售历史列表item
* @author: Hj
* @date:   2015-08-16
*/

var SellingHistoryItem = GameBaseLayer.extend({
    ctor:function (cat) {
        this._super();

        var setting = CatSetting.getById(cat.id);

        // 背景
        var bg = new cc.Sprite("#sell_record_cell_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        // 猫名称
        var catName = new ccui.Text(setting.name, gameResource.defaultFont, 30);
        catName.setPosition(cc.p(bg.width / 2, 326));
        catName.setTextColor(cc.color.BLACK);
        this.addChild(catName);

        // 猫的头像
        var icon = new cc.Sprite("#cat" + cat.id.toString() + "_eat0.png");
        icon.setPosition(cc.p(bg.width / 2,  212));
        this.addChild(icon);

        // 评级标志

        //
    }
});
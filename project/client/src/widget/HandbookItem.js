/* 
* @brief:  图鉴item
* @author: Hj
* @date:   2015-08-06
*/

var HandbookItem = GameBaseLayer.extend({
    ctor:function (index, catId) {
        this._super();

        // 背景
        var bg = new cc.Sprite("#handbook_item_bg.png");
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        this.setContentSize(bg.getContentSize());

        // 序列
        var indexLabel = new ccui.Text("No." + index.toString(), gameResource.defaultFont, 24);
        indexLabel.setAnchorPoint(cc.p(0.5, 1));
        indexLabel.setPosition(cc.p(bg.width / 2, bg.height - 11));
        this.addChild(indexLabel);

        // 猫的名称
        var name = new ccui.Text("", gameResource.defaultFont, 20);
        name.setPosition(cc.p(bg.width / 2, 21));
        this.addChild(name);

        if (catId > 0) {
            var catSetting = CatSetting.getById(catId);
            name.setString(catSetting.name);

            var cat = new CatSprite(catId);
            cat.showProfile()
            cat.setPosition(cc.p(bg.width / 2, bg.height / 2));
            this.addChild(cat);

        } else {
            name.setString("???");

            var cat = new cc.Sprite("#hand_book_item_question.png");
            cat.setPosition(cc.p(bg.width / 2, bg.height / 2));
            this.addChild(cat);
        }
    }
});
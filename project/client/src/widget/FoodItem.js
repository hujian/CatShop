/*
* @brief:  食物相关的两个item
* @author: Hj
* @date:   2015-08-04
*/

// 食物页面，生产列表里的item
var FoodItem = ccui.Button.extend({
    ctor:function (id, money, time, type) {
        // 背景
        var imagePath = "food_select_icon_" + id.toString() + ".png"
        this._super(imagePath, null, null, type)

        // 食物生产需要的时间
        this.setTitleText(time.toString())
        this.setTitleFontSize(20)
        this.setTitleColor(cc.color.WHITE)

        // 食物的价格
        var label = new ccui.Text(money.toString() + "元", "", 18)
        label.setTextColor(cc.color.WHITE)
        label.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height - 26))
        this.addChild(label)
    },

    // 需要调整title的位置，直接覆盖父类的方法
    _updateTitleLocation: function(){
        this._titleRenderer.setPosition(this._contentSize.width * 0.5, 15);
    }
})

var FoodStockItem = ccui.Button.extend({
    ctor:function (id, count, type) {
        // 背景
        var imagePath = "cat_house_food_icon_" + id.toString() + ".png"
        this._super(imagePath, null, null, type)

        // 食物剩余的数量
        this.setTitleText(count.toString())
        this.setTitleFontSize(20)
        this.setTitleColor(cc.color.WHITE)
    },

    updateStock:function(count) {
        this.setTitleText(count.toString())
    },

    // 需要调整title的位置，直接覆盖父类的方法
    _updateTitleLocation: function(){
        this._titleRenderer.setPosition(this._contentSize.width * 0.5, 15);
    }
})
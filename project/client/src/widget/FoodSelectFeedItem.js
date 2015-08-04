/*
* @brief:  猫屋下方选择食物工具栏中的食物信息cell
* @author: Hj
* @date:   2015-08-04
*/

var FoodSelectFeedItem = ccui.Button.extend({
    ctor:function (id, count, type) {
        // 背景
        var imagePath = "cat_house_food_icon_" + id.toString() + ".png"
        this._super(imagePath, null, null, type)

        // 食物剩余的数量
        this.setTitleText(count.toString())
        this.setTitleFontSize(20)
        this.setTitleColor(cc.color.WHITE)
    },

    // 需要调整title的位置，直接覆盖父类的方法
    _updateTitleLocation: function(){
        this._titleRenderer.setPosition(this._contentSize.width * 0.5, 15);
    }
})
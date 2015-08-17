/* 
* @brief:  grid控件
* @author: Hj
* @date:   2015-08-17
*/

var GridWidget = GameBaseLayer.extend({
    ctor:function () {
        this._super();
    },

    update:function(items, row, column, topGap, leftGap, rowGap, columnGap) {
        topGap = topGap || 0;
        leftGap = leftGap || 0;
        rowGap = rowGap || 0;
        columnGap = columnGap || 0;

        this.removeAllChildren();

        var height = this.height - topGap;
        for (var i=0; i<row; i++) {
            if (i * column < items.length) {
                height -= (items[i * column].height + rowGap);
            } else {
                return ;
            }

            var width = leftGap;
            for (var j=0; j<column; j++) {
                var index = i * column + j;
                if (index < items.length) {
                    var item = items[index];
                    item.setPosition(cc.p(width, height));
                    width += (item.width + columnGap);
                    this.addChild(item);
                } else {
                    return;
                }
            }
        }
    }
});
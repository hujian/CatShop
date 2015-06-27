/*
* @brief:  商店页面的测试用例
* @author: Hj
* @date:   2015-06-24
*/

var TestShopScene = TestBaseScene.extend({
    ctor:function () {
        this._super()
    },

    onEnter:function () {
    	this._super()
        cc.log("欢迎进入商店，请选择你要买的猫仔。")

        cc.log("可以选购如下猫仔:")
        Cat.loadSetting()
        var babies = Cat.getAllBaby()
        for(var i in babies) {
            var b = this.addTestButton(babies[i].name, this.buyCat);
            b.cat = babies[i]
        }
    },

    buyCat:function(button) {
        this.printMessage("购买了一只 " + button.cat.name)
    }
})
/*
* @brief:  基于文字的测试用游戏主界面
* @author: Hj
* @date:   2015-06-24
*/

var TestGameScene = TestBaseScene.extend({
    ctor:function () {
        this._super()
    },

    onEnter:function () {
    	this._super()

        if (App.isFirstLaunch()) {
        }
        this.printMessage("欢迎进入商店，请选择你要买的猫仔。")

        CatSetting.load()
        var babies = CatSetting.getAllBaby()
        for(var i in babies) {
            var b = this.addTestButton(babies[i].name, this.buyCat);
            b.cat = babies[i]
        }
    },

    buyCat:function(button) {
        var cat = button.cat
        if (User.getMoney() >= cat.money) {
            User.buyCat(cat.id)
            this.printMessage("购买了一只" + cat.name)
        } else {
            this.printMessage("资金不足以购买一只" + cat.name)
        }
    }
})
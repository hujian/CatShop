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
        this.printMessage("欢迎进入商店，请选择你要买的商品。")

        var babies = CatSetting.getAllBaby()
        for (var i in babies) {
            var b = this.addTestButton(babies[i].name + " = " + babies[i].money + "$", this.buyCat);
            b.cat = babies[i]
        }

        var items = ItemSetting.getAll()
        for (var i in items) {
            var b = this.addTestButton(items[i].name + " = " +items[i].money + "$", this.buyItem)
            b.item = items[i]
        }

        this.printStatus('商店', ['资金', '风扇', '疫苗', '药品', '猫最大数量'])

        var catNames = []
        var cats = User.getAllCats()
        for (var i in cats) {
            var setting = CatSetting.getById(parseInt(cats[i].id))
            catNames.push(setting.name)
        }

        this.printStatus('猫', catNames)
    },

    buyCat:function(button) {
        var cat = button.cat
        if (Shop.buyCat(cat.id)) {
            this.printMessage("购买了一只" + cat.name)
        } else {
            this.printMessage("资金不足以购买一只" + cat.name)
        }
    },

    buyItem: function (button) {
        var item = button.item
        if(Shop.buyItem(item.id)) {
            // 如果是永久性商品就不能继续购买了
            button.setEnable(item.consumable)

            this.printMessage("购买了" + item.name)
        } else {
            this.printMessage("资金不足以购买" + item.name)
        }
    },

    updateStatusLabels:function() {
        this.statutsLables['资金'].setString(User.getMoney() + '$')
        this.statutsLables['猫最大数量'].setString(User.getMaxCatCount())
    }
})
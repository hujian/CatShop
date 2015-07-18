/*
* @brief:  基于文字的测试用游戏主界面
* @author: Hj
* @date:   2015-06-24
*/

var TestGameScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.initUI()
    },

    initUI:function () {
        this.printMessage("欢迎进入商店，请选择你要买的商品。")

        // 购买猫仔
        var babies = CatSetting.getAllBaby()
        for (var i in babies) {
            var b = this.addTestButton(babies[i].name + " = " + babies[i].money, this.buyCat);
            b.cat = babies[i]
        }

        // 购买道具
        var items = Shop.getAllItem()
        for (var i in items) {
            var item = items[i]
            var b = this.addTestButton(this.getItemDescription(item), this.buyItem)
            b.item = item
            b.setEnabled(!item.invalid)
        }

        // 当前商店的状况
        this.printStatus('商店', ['资金', '疫苗', '药品', '毛团打扫器', '排风扇', '猫', '猫数量上限'])


        // 当前拥有的猫咪
        var catNames = []
        var cats = User.getAllCats()
        for (var i in cats) {
            var setting = CatSetting.getById(cats[i].id)
            catNames.push(setting.name)
        }
        this.printStatus('猫', catNames)

        // 跳转到猫咪养殖页面
        this.addTestButton('跳转到猫咪培育室', this.goCatScene, cc.p(250, 400), true)
    },

    getItemDescription:function (item) {
        if (item.invalid) {
            return item.name + " 已购买"
        } else {
            return item.name + " = " + item.money
        }
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
            if (!item.consumable) {
                button.setEnabled(false)
                item.invalid = true
                button.setTitleText(this.getItemDescription(item))
            }
            this.printMessage("购买了" + item.name)
        } else {
            this.printMessage("资金不足以购买" + item.name)
        }
    },

    updateStatusLabels:function() {
        this.statutsLables['资金'].setString(User.getMoney())
        this.statutsLables['疫苗'].setString(User.getVaccineCount().toString())
        this.statutsLables['药品'].setString(User.getMedicineCount().toString())
        this.statutsLables['毛团打扫器'].setString(User.getHairCleanerCount().toString())
        this.statutsLables['排风扇'].setString(User.getFansCount().toString())
        this.statutsLables['猫'].setString(User.getAllCats().length)
        this.statutsLables['猫数量上限'].setString(User.getMaxCatCount())
    },

    goCatScene:function () {
        cc.director.pushScene(new TestCatScene())
    }
})
/*
* @brief:  测试猫相关的主要逻辑
* @author: Hj
* @date:   2015-07-07
*/

var TestCatScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.catOpertaions = ["喂食", "吃药", "安抚", "打疫苗", "出售"]

        this.initUI()
    },

    initUI:function () {
        this.printMessage("这里是猫咪生活的场所，请妥善照顾好他们。")

        this.testButtonInitPosition.y -= 60

        this.refreshCatStatusCell()

        var button = this.addTestButton(['开始养育', '停止养育'], this.startFeed, cc.p(300, 440))
        button.setTitleColor(cc.color.ORANGE)
        button = this.addTestButton(['10x加速', '恢复原速'], this.speedUp, cc.p(400, 440))
        button.setTitleColor(cc.color.ORANGE)
    },

    startFeed:function (button, state) {
        if (state == 1) {
            Cat.start()
        } else {
            Cat.stop()
        }
    },

    speedUp:function (button, state) {
        if (state == 1) {
            CatSetting.updateInterval = 1
        } else {
            CatSetting.updateInterval = 10
        }
    },

    getCatDescription:function (cat) {
        var setting = CatSetting.getById(cat.id)
        var description = setting.name + "\n\n"
        description += this.getDescriptionString("价格", setting.money)
        description += this.getDescriptionString("成长值", 0) + "\n"
        description += this.getDescriptionString("健康值", 0)
        description += this.getDescriptionString("饥饿值", cat.hungry)
        return description
    },

    refreshCatStatusCell:function () {
        this.clearAllContent()

        var cats = User.getAllCats()
        for (var i in cats) {
            var cat = cats[i]
            this.addTestCell(cat.instanceId, this.getCatDescription(cat), this.catOpertaions, this.operate, cat)
        }
    },

    getDescriptionString:function (key, value) {
        return key + ": " + value.toString() + ", "
    },

    createFeedPopupLayer:function (cat) {
        var layer = new TestPopupLayer()
        layer.present()

        // 列出所有食物
        var foodSetting = FoodSetting.getAll()
        for (var i in foodSetting) {
            var setting = foodSetting[i]
            var button = layer.addTestButton(setting.name, this.feed, this)
            button.food = setting
            button.cat = cat
        }
    },

    feed:function(button) {
        var foodSetting = button.food
        var cat = button.cat
        var catSetting = CatSetting.getById(cat.id)

        if (User.getFoodCount(foodSetting.id) > 0) {
            User.removeFood(foodSetting.id)
            User.flush()
            cat.feed(foodSetting.id, 1)
            this.printMessage("成功给[" + catSetting.name + "]喂食了一个[" + foodSetting.name + "], 还剩" + User.getFoodCount(foodSetting.id) + "个[" + foodSetting.name + "]")
        } else {
            this.printMessage("[" + foodSetting.name + "]数量不足")
        }
    },

    operate:function(button) {
        var cat = button.userData
        var setting = CatSetting.getById(cat.id)
        var operation = button.operation
        switch(operation) {
            case this.catOpertaions[0]:
                this.createFeedPopupLayer(cat)
                break
            case this.catOpertaions[1]:
                break
            case this.catOpertaions[2]:
                break
            case this.catOpertaions[3]:
                break
            case this.catOpertaions[4]:
                Shop.sellCat(cat)
                this.printMessage("出售一只" + setting.name + ", 获的金钱" + setting.money)
                this.refreshCatStatusCell()
                break
        }
    },

    updateStatus:function() {
        var cats = User.getAllCats()
        for (var i in cats) {
            var cat = cats[i]
            this.cells[cat.instanceId].description.setString(this.getCatDescription(cat))
        }
    }
})
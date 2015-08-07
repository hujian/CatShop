/*
* @brief:  测试猫相关的主要逻辑
* @author: Hj
* @date:   2015-07-07
*/

var TestCatScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.catOpertaions = ["喂食", "吃药", "打疫苗", "出售"]

        // 内容区
        var layer = new TestContentCellLayer()
        layer.setContentSize(cc.size(600, 400))
        layer.setPosition(cc.p(180, 20))
        this.addChild(layer)
        this.contentLayer = layer

        this.initUI()
    },

    initUI:function () {
        this.printMessage("这里是猫咪生活的场所，请妥善照顾好他们。")

        this.refreshCatStatusCell()

        // 操作菜单
        var state = CatManager.rasingCat ? 2 : 1
        var button = this.addTestButton(['开始养育', '停止养育'], this.startFeed, cc.p(240, 460), true, state)
        button.setTitleColor(cc.color.ORANGE)

        state = CatSetting.updateInterval == 1 ? 2 : 1
        button = this.addTestButton(['10x加速', '恢复原速'], this.speedUp, cc.p(340, 460), true, state)
        button.setTitleColor(cc.color.ORANGE)

        button = this.addTestButton('瘟疫来袭', this.hasPlague, cc.p(440, 460), true)
        button.setTitleColor(cc.color.ORANGE)

        // 环境变量
        var label = new ccui.Text("", TestSceneFontName, 12)
        label.setTextColor(cc.color.BLACK)
        label.setPosition(cc.p(190, 430))
        label.setAnchorPoint(cc.p(0, 0.5))
        label.getTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT)
        this.addChild(label)
        this.evironmentLabel = label

        // 接收掉毛事件
        this.dropHairListenter = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: CatSetting.dropHairEvent,
            callback: function(event) {
                User.updateHairCount(User.getHairCount() + 1)
                var ret = CatManager.clearHair()
                var catSetting = CatSetting.getById(event.getUserData().id)
                this.printMessage(catSetting.name + "掉了一团猫毛, " + (ret ? "已被清理" : "请赶快清理，保持环境干净。"))
            }.bind(this)
        });
        cc.eventManager.addListener(this.dropHairListenter, 1);
    },

    onEnter:function () {
        this._super()
    },

    onExit:function () {
        this._super()

        cc.eventManager.removeListener(this.dropHairListenter)
    },

    startFeed:function (button, state) {
        if (state == 1) {
            CatManager.start()

            // 每次进来都要清理
            if (User.getHairCount() > 0 && User.getHairCleanerCount() > 0) {
                this.printMessage("清理了" + Math.min(User.getHairCount(), User.getHairCleanerCount()).toString() + "团猫毛")
                CatManager.clearHair()
            }
        } else {
            CatManager.stop()
        }
    },

    speedUp:function (button, state) {
        if (state == 1) {
            Util.speedUp(10)
        } else {
            Util.speedUp(1)
        }
    },

    hasPlague:function (button, state) {
        CatManager.hasPlague()
    },

    getCatDescription:function (cat) {
        var setting = CatSetting.getById(cat.id)
        var description = setting.name + "\n\n"
        description += this.getDescriptionString("价格", setting.money)
        description += this.getDescriptionString("成长", cat.getCatGrowth())
        description += this.getDescriptionString("健康", cat.getHealth())
        description += this.getDescriptionString("疫苗", cat.hasVaccine() ? "是" : "否")
        description += this.getDescriptionString("饥饿", cat.getHungry())
        description += this.getDescriptionString("状态", this.getCatStateChinese(cat.getState()))
        return description
    },

    getCatStateChinese:function (state) {
        switch (state) {
            case cs.stand :
                return '站立'
            case cs.walk :
                return '散步'
            case cs.eat :
                return '吃饭'
            case cs.sleep :
                return '睡觉'
            default :
                '未知状态'
        }
    },

    refreshCatStatusCell:function () {
        this.contentLayer.cellCount = parseInt((User.getAllCats().length + 1) / 2)
        this.contentLayer.clearAllContent()

        var cats = User.getAllCats()
        for (var i in cats) {
            var cat = cats[i]
            this.contentLayer.addCell(cat.instanceId, this.getCatDescription(cat), this.catOpertaions, this.operate, this, cat)
        }
    },

    getDescriptionString:function (key, value) {
        return key + ": " + value.toString() + "\n"
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
            CatManager.feed(cat, foodSetting.id, 1)
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
                if (User.getMedicineCount() > 0) {
                    CatManager.takeMedicine(cat, ItemSetting.id.medicine, 1)
                    this.printMessage("给" + setting.name + "打了一剂药")
                } else {
                    this.printMessage("药品不足")
                }
                break
            case this.catOpertaions[2]:
                if (User.getVaccineCount() > 0) {
                    CatManager.takeVaccine(cat)
                    this.printMessage("给" + setting.name + "打了一剂疫苗")
                } else {
                    this.printMessage("疫苗不足")
                }
                break
            case this.catOpertaions[3]:
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
            this.contentLayer.updateCellDescription(cat.instanceId, this.getCatDescription(cat))
        }

        var string = "风扇: " + (User.getFansCount() > 0 ? Util.getTimeString(User.getFansCount()) : "无")
        string += (User.getHairCount() > 0 ? ", 猫毛团: " + User.getHairCount() : ", 猫毛清理器: " + User.getHairCleanerCount())
        string +=  ", 环境健康: " + CatManager.getHealthValue().toString()
        this.evironmentLabel.setString(string)
    }
})
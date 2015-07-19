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

        this.updateCatStatus()
    },

    updateCatStatus:function () {
        this.clearAllContent()

        var cats = User.getAllCats()
        for (var i in cats) {
            var cat = cats[i]
            var setting = CatSetting.getById(cat.id)

            var description = setting.name + "\n\n"
            description += this.getDescriptionString("价格", setting.money)
            description += this.getDescriptionString("成长值", 0) + "\n"
            description += this.getDescriptionString("健康值", 0)
            description += this.getDescriptionString("饥饿值", 0)

            this.addTestCell(cat.id,  description, this.catOpertaions, this.operate, cat)
        }
    },

    getDescriptionString:function (key, value) {
        return key + ": " + value.toString() + ", "
    },

    operate:function(button) {
        var cat = button.userData
        var setting = CatSetting.getById(cat.id)
        var operation = button.operation
        switch(operation) {
            case this.catOpertaions[0]:
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
                this.updateCatStatus()
                break
        }
    }
})
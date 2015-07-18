/*
* @brief:  测试猫相关的主要逻辑
* @author: Hj
* @date:   2015-07-07
*/

var TestCatScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.initUI()
    },

    initUI:function () {
        this.printMessage("这里是猫咪生活的场所，请妥善照顾好他们。")

        var cats = User.getAllCats()
        for (var i in cats) {
            var cat = cats[i]
            cat.setting = CatSetting.getById(cat.id)
        }

        this.addTestCell("这个喵咪真的好")
    },


})
/*
* @brief:  食物工厂类
* @author: Hj
* @date:   2015-07-19
*/

var TestFoodScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.initUI()
    },

    initUI:function () {
        this.printMessage("欢迎进入食物工厂，请选择你要生成的猫粮。")

        // 列出所有食物
        var foodSetting = FoodSetting.getAll()
        for (var i in foodSetting) {
            var setting = foodSetting[i]
            var button = this.addTestButton(setting.name + " = " + setting.money, this.buyFood)
            button.food = setting
        }
    },

    buyFood: function (button) {
        var food = button.food
        if (Shop.buyFood(food.id)) {
            this.printMessage("开始生产" + food.name)
            this.printMessage("生产" + food.name + "成功")
        } else {
            this.printMessage("金钱不够..")
        }
    }
})

/*
* @brief:  基于文字的测试用游戏主界面
* @author: Hj
* @date:   2015-06-24
*/

var TestGameScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.initUI();
    },

    initUI:function () {
        this.printMessage("欢迎进入商店，请选择你要买的商品。");

        // 购买猫仔
        this.addCatButtons();
        // 购买道具
        this.addItemButtons();
        // 购买食物
        this.addFoodButtons();

        // 当前商店的状况
        this.printStatus('商店', ['资金', '疫苗', '药品', '毛团打扫器', '排风扇', '猫', '猫数量上限']);

        // 当前食物状况
        var foodName = [];
        var allFood = FoodSetting.getAll();
        for (var i in allFood) {
            var name = allFood[i].name;
            foodName.push(name);
        }
        this.printStatus('猫食', foodName);

        // 跳转到猫咪养殖页面
        var button = this.addTestButton('跳转到猫屋', this.goCatScene, cc.p(250, 400), true);
        button.setTitleColor(cc.color.ORANGE);
    },

    addCatButtons:function () {
        this.addTestLabel("猫仔");

        var babies = CatSetting.getAllBaby();
        for (var i in babies) {
            var b = this.addTestButton(babies[i].name + "  " + babies[i].money + "$", this.buyCat);
            b.cat = babies[i];
        }
    },

    addItemButtons:function () {
        this.nextColumn();
        this.addTestLabel("道具");

        var items = Shop.getAllItem();
        for (var i in items) {
            var item = items[i];
            var b = this.addTestButton(this.getItemDescription(item), this.buyItem);
            b.item = item;
            b.setEnabled(!item.invalid);
        }
    },

    addFoodButtons:function () {
        this.nextColumn();
        this.addTestLabel("猫食");

        var foodSetting = FoodSetting.getAll();
        for (var i in foodSetting) {
            var setting = foodSetting[i];
            var button = this.addTestButton(setting.name + "  " + setting.money + "$", this.buyFood);
            button.food = setting;
        }
    },

    getItemDescription:function (item) {
        if (item.invalid) {
            return item.name + " 已购买";
        } else {
            return item.name + "  " + item.money + "$";
        }
    },

    buyCat:function(button) {
        var catSetting = button.cat;
        var cat = Shop.buyCat(catSetting.id);
        if (cat instanceof Cat) {
            this.printMessage("购买了一只" + catSetting.name);
        } else if (cat == Shop.error.notEnoughMoney) {
            this.printMessage("资金不足以购买一只" + catSetting.name);
        } else if (cat == Shop.error.tooMuchCat) {
            this.printMessage("已经到达猫屋的上限，请升级猫屋!");
        }
    },

    buyItem: function (button) {
        var item = button.item;
        if(Shop.buyItem(item.id)) {
            // 如果是永久性商品就不能继续购买了
            if (!item.consumable) {
                button.setEnabled(false);
                item.invalid = true;
                button.setTitleText(this.getItemDescription(item));
            }
            this.printMessage("购买了" + item.name);
        } else {
            this.printMessage("资金不足以购买" + item.name);
        }
    },

    buyFood: function (button) {
        var food = button.food;
        if (Shop.buyFood(food.id)) {
            this.printMessage("开始生产" + food.name);
            this.printMessage("生产" + food.name + "成功");
        } else {
            this.printMessage("金钱不够..");
        }
    },

    updateStatus:function(interval) {
        // 金币
        this.statutsLables['资金'].setString(User.getMoney());

        // 道具
        this.statutsLables['疫苗'].setString(User.getVaccineCount().toString());
        this.statutsLables['药品'].setString(User.getMedicineCount().toString());
        this.statutsLables['毛团打扫器'].setString(User.getHairCleanerCount());
        this.statutsLables['排风扇'].setString(Util.getTimeString(User.getFansCount()));

        // 猫
        this.statutsLables['猫'].setString(User.getAllCats().length);
        this.statutsLables['猫数量上限'].setString(User.getMaxCatCount());

        // 食物数据
        var allFood = FoodSetting.getAll();
        for (var i in allFood) {
            var food = allFood[i];
            this.statutsLables[food.name].setString(User.getFoodCount(food.id));
        }
    },

    goCatScene:function () {
        cc.director.pushScene(new TestCatScene());
    },

    goFoodScene:function () {
        cc.director.pushScene(new TestFoodScene());
    }
});
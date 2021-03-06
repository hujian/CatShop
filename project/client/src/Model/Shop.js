/*
* @brief:  商店购买，道具使用逻辑都在这里
* @author: Hj
* @date:   2015-07-05
*/

var Shop = Shop || {};

// 买猫可能会有多种原因失败
Shop.error = {
    notEnoughMoney : 1,
    tooMuchCat : 2,
    alreadyGot : 3
};

// 购买猫，传入的是猫种类id
Shop.buyCat = function (catId) {
    var ret = null;

    if (User.getAllCats().length < User.getMaxCatCount()) {
        var catSetting = CatSetting.getById(catId);
        if (catSetting) {
            var moneyLeft = User.getMoney() - catSetting.money;
            if (moneyLeft >= 0) {
                User.updateMoney(moneyLeft);
                var cat =User.addCat(catId);
                User.flush();

                // 把cat加入manager管理，配置基础属性
                CatManager.addCat(cat);
            } else {
                ret = Shop.error.notEnoughMoney;
            }
        }
    } else {
        ret = Shop.error.tooMuchCat;
    }

    return ret;
};

// 售出猫, 注意必须传进来从User中获取的cat
Shop.sellCat = function (cat) {
    var catSetting = CatSetting.getById(cat.id);
    User.updateMoney(User.getMoney() + catSetting.money);
    User.removeCat(cat);
    User.flush();
};

// 获取所有道具
// 通过判读invalid属性，判断该item是否可以购买
Shop.getAllItem = function () {
    // 所有道具
    var items = ItemSetting.getAll();
    // 玩家已经买过的道具
    var itemsAlreadyBuy = User.getAllItems();

    // 如果是非消耗性的道具，已经买过的话，就置invalid = true
    for (var i in items) {
        var setting = items[i];
        if (!setting.consumable) {
            setting.invalid = itemsAlreadyBuy[setting.id] > 0;
        } else {
            setting.invalid = false;
        }
    }
    return items;
};

// 买道具
Shop.buyItem = function (id, count) {
    var ret = null;

    count = count || 1;

    var itemSetting = ItemSetting.getById(id);
    if (itemSetting) {
        var moneyLeft = User.getMoney() - itemSetting.money * count;
        if (moneyLeft >= 0) {
            // 如果是商店扩建道具，则直接用掉
            if (itemSetting.type == ItemSetting.type.upgradeShop) {
                if (!User.itemAlreadyGot(id)) {
                    User.updateMaxCatCount(itemSetting.value);
                } else {
                    count = 0;
                    ret = Shop.error.alreadyGot;
                }
            }

            if (count > 0) {
                User.updateMoney(moneyLeft);
                User.addItem(id, count);
                User.flush();
            }
        } else {
            ret = Shop.error.notEnoughMoney;
        }
    }

    return ret;
};

// 购买食物，返回true表示购买成功
// 注意食物有个生产过程，所以这里不是一定直接加上食物的
Shop.buyFood = function (id, count, addFood) {
    var ret = false;
    count = count || 1;
    var setting = FoodSetting.getById(id);
    if (setting) {
        var moneyLeft = User.getMoney() - setting.money * count;
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft);
            if (addFood) {
                User.addFood(id, count);
                User.flush();
            }
            ret = true;
        }
    }

    return ret;
};
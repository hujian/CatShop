/*
* @brief:  商店购买，道具使用逻辑都在这里
* @author: Hj
* @date:   2015-07-05
*/

var Shop = Shop || {}

// 购买猫，传入的是猫种类id
Shop.buyCat = function (catId) {
    var cat = null

    var catSetting = CatSetting.getById(catId)
    if (catSetting) {
        var moneyLeft = User.getMoney() - catSetting.money
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft)
            cat = User.addCat(catId)
            User.flush()
        }
    }

    return cat
}

// 售出猫, 注意必须传进来从User中获取的cat
Shop.sellCat = function (cat) {
    var catSetting = CatSetting.getById(cat.id)
    User.updateMoney(User.getMoney() + catSetting.money)
    User.removeCat(cat)
    User.flush()
}

// 获取所有道具
// 通过判读invalid属性，判断该item是否可以购买
Shop.getAllItem = function () {
    // 所有道具
    var items = ItemSetting.getAll()
    // 玩家已经买过的道具
    var itemsAlreadyBuy = User.getAllItems()

    // 如果是非消耗性的道具，已经买过的话，就置invalid = true
    for (var i in items) {
        var setting = items[i]
        if (!setting.consumable) {
            setting.invalid = itemsAlreadyBuy[setting.id] > 0
        } else {
            setting.invalid = false
        }
    }
    return items
}

// 买道具, 返回true表示购买成功
Shop.buyItem = function (id) {
    var ret = false

    var itemSetting = ItemSetting.getById(id)
    if (itemSetting) {
        var moneyLeft = User.getMoney() - itemSetting.money
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft)

            // 如果是商店扩建道具，则直接用掉
            if (itemSetting.type == ItemSetting.type.upgradeShop) {
                if (itemSetting.value > User.getMaxCatCount()) {
                    User.updateMaxCatCount(itemSetting.value)
                } else {
                    cc.error("something wrong when buy upgrade shop item.")
                }
            }

            User.addItem(id)
            User.flush()

            ret = true
        }
    }

    return ret
}

// 购买食物，返回true表示购买成功
Shop.buyFood = function (id) {
    var ret = false

    var setting = FoodSetting.getById(id)
    if (setting) {
        var moneyLeft = User.getMoney() - setting.money
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft)
            User.addFood(id)
            User.flush()

            ret = true
        }
    }

    return ret
}
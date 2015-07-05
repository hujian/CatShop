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

// 售出猫
Shop.sellCat = function (catId) {
}

// 获取所有可以购买的道具

// 买道具
Shop.buyItem = function (id) {
    var item = null

    var itemSetting = ItemSetting.getById(id)
    if (itemSetting) {
        var moneyLeft = User.getMoney() - itemSetting.money
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft)

            // 如果是商店扩建道具，则直接用掉不用保存
            if (itemSetting.type = ItemSetting.type.upgradeShop) {
                if (itemSetting.value > User.getMaxCatCount()) {
                    User.updateMaxCatCount(itemSetting.value)
                } else {
                    cc.error("something wrong when buy upgrade shop item.")
                }
            } else {
                item = User.addItem(id)
            }

            User.flush()
        }
    }

    return item
}

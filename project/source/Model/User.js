/*
* @brief:  用户信息模块
* @author: Hj
* @date:   2015-06-28
*/

var User = User || {}
User.data = new DataModel()
User.dataSavingKey = "User_Data_Saving_key"

// 从本地缓存获取用户数据
User.restore = function() {
    // 初期化玩家基本数据
    if (!User.data.loadDataFromLocalStorage(User.dataSavingKey)) {
        User.data.jsonData.money = 1000
        User.data.jsonData.items = []
        User.data.jsonData.cats = []
        User.flush()
    }
}

// 保存到本地缓存
User.flush = function() {
    User.data.saveDataToLocalStorage(User.dataSavingKey)
}

// 玩家金币
User.getMoney = function() {
    return User.data.jsonData.money
}

// 设置金币
// 会缓存数据，不要短时间频繁调用
User.updateMoney = function(money) {
    User.data.jsonData.money = money
    User.flush()
}

// 获取所有猫，数组对象是Cat.js中的Cat
User.getAllCats = function() {
    return User.data.jsonData.cats
}

// 加猫，这里的id是猫种类id，就是CatSetting的id
User.addCat = function(id) {

    var cat = new Cat(id)
    User.data.jsonData.cats.push(cat)
    User.flush()

    return cat
}

// 减猫，把addCat返回的对象，或是从getAllCats获取的对象传进来
User.removeCat = function(cat) {
    var index = User.data.jsonData.cats.indexOf(cat)
    if (index > -1) {
        User.data.jsonData.cats.slice(index, 1)
    }
}

// 类似上面的cat
User.addItem = function (id) {
    var item = new Item(id)
    User.data.jsonData.items.push(item)
    User.flush()

    return item
}

User.removeItem = function (item) {
    var index = User.data.jsonData.items.indexOf(item)
    if (index > -1) {
        User.data.jsonData.items.slice(index, 1)
    }
}

// 购买猫，传入的是猫种类id
User.buyCat = function (catId) {
    var catSetting = CatSetting.getById(catId)
    if (catSetting) {
        var moneyLeft = User.getMoney() - catSetting.money
        if (moneyLeft >= 0) {
            User.updateMoney(moneyLeft)
            return User.addCat(catId)
        }
    }
}

// 售出猫
User.sellCat = function (catId) {
}

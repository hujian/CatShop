/*
* @brief:  用户信息模块
* @author: Hj
* @date:   2015-06-28
*/

var User = User || {}

User.data = new DataModel()

// 保存到本地数据的key
User.dataSavingKey = "User_Data_Saving_key"

// 从本地缓存获取用户数据
User.restore = function() {
    // 初期化玩家基本数据
    if (!User.data.loadDataFromLocalStorage(User.dataSavingKey)) {
        User.initUserData()
        User.flush()
    } else {
        // 需要把恢复出来的数据的prototype挂接到相关的model上去，外面才能调用model的函数
        // 道具和食物不用挂，因为根本不保存单个实例
        this.restoreModel(User.data.jsonData.cats, Cat)
    }
}

// 程序初次进入后，初期化用户数据
User.initUserData = function () {
    User.data.jsonData.money = 1000            // 初始金钱
    User.data.jsonData.maxCatCount = 3         // 商店能够养的猫的最大数
    User.data.jsonData.items = {}              // 已经购买的商品
    User.data.jsonData.food = {}               // 玩家已经购买的食物
    User.data.jsonData.cats = []               // 玩家已经购买的猫
    User.data.jsonData.instanceId = 0          // 玩家数据中用到的实例对象
    User.data.jsonData.catHairCount = 0        // 猫屋猫毛团的数量
}

User.restoreModel = function(dataArray, model) {
    for (var i in dataArray) {
        dataArray[i].__proto__ = model.prototype
    }
}

// 保存到本地缓存
User.flush = function() {
    User.data.saveDataToLocalStorage(User.dataSavingKey, ['fsm'])
}

// 获取数据的json字符串
User.getDataJsonString = function() {
    return User.data.getDataStringFromLocalStorage(User.dataSavingKey)
}

// 获取实例id，数据会缓存的，不会重复
User.getNewInstanceId = function() {
    return ++User.data.jsonData.instanceId
}

// 玩家金币
User.getMoney = function() {
    return User.data.jsonData.money || 0
}

// 获取玩家金币描述字符串
User.getMoneyString = function() {
    return User.getMoney().toString() + "元"
}

// 设置金币
// 会缓存数据，不要短时间频繁调用
User.updateMoney = function(money) {
    User.data.jsonData.money = money
}

// 获取所有猫，数组对象是Cat.js中的Cat
User.getAllCats = function() {
    return User.data.jsonData.cats || []
}

// 加猫，这里的id是猫种类id，就是CatSetting的id
User.addCat = function(id) {

    var cat = new Cat(id)
    User.data.jsonData.cats.push(cat)

    return cat
}

// 减猫，把addCat返回的对象，或是从getAllCats获取的对象传进来
User.removeCat = function(cat) {
    var index = User.data.jsonData.cats.indexOf(cat)
    if (index > -1) {
        cat.clean()
        User.data.jsonData.cats.splice(index, 1)
    }
}


// 获取当前能够养的最大猫德数量
User.getMaxCatCount = function () {
    return User.data.jsonData.maxCatCount || 0
}

// 跟新猫的最大数量
User.updateMaxCatCount = function (count) {
    User.data.jsonData.maxCatCount = count
}

// 增加道具
User.addItem = function (id, count) {
    count = count || 1
    var setting = ItemSetting.getById(id)
    var items = User.data.jsonData.items

    var value = 1
    // 风扇和猫毛清洁器不需要记录具体的个数，要记录具体的效果数量
    if (setting.type == ItemSetting.type.cleanMachine) {
        value = setting.value
    }

    if (items[id]) {
        items[id] += value * count
    } else {
        items[id] = value * count
    }
}

// 删除道具, value可以不传或是正数
User.removeItem = function (id, value) {
    value = value || 1

    var items = User.data.jsonData.items
    if (items[id] > 0) {
        items[id] = Math.max(0, items[id] - value)
    }
}

// 获取所有已经购买的道具
User.getAllItems = function () {
    return User.data.jsonData.items || {}
}

// 获取购买的疫苗数量
User.getVaccineCount = function () {
    return User.getAllItems()[ItemSetting.id.vaccine] || 0
}

// 获取购买的药品数量
User.getMedicineCount = function () {
    return User.getAllItems()[ItemSetting.id.medicine] || 0
}

// 获取购买的风扇剩余的时间，秒数
User.getFansCount = function () {
    return User.getAllItems()[ItemSetting.id.fan] || 0
}

// 获取购买的猫毛清洁器数量
User.getHairCleanerCount = function () {
    return User.getAllItems()[ItemSetting.id.hairCleaner] || 0
}

// 增加食物
User.addFood = function (id, count) {
    count = count || 1
    var allFood = User.data.jsonData.food
    if (allFood[id]) {
        allFood[id] += count
    } else {
        allFood[id] = count
    }
}

// 减少食物
User.removeFood = function (id, count) {
    var ret = false
    count = count || 1
    var allFood = User.data.jsonData.food
    if (allFood[id] >= count) {
        allFood[id] -= count
        ret = true
    }
    return ret
}

// 获取食物的数量
User.getFoodCount = function (id) {
    return User.data.jsonData.food[id] || 0
}

// 获取猫毛团的数量
User.getHairCount = function () {
    return User.data.jsonData.catHairCount || 0
}

// 更新猫毛团的数量
User.updateHairCount = function (count) {
    User.data.jsonData.catHairCount = count
}
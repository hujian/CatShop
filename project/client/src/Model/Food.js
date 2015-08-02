/*
* @brief:  食物数据类
* @author: Hj
* @date:   2015-07-19
*/

var FoodSetting = FoodSetting || {}

FoodSetting.load = function () {
    if (!FoodSetting.data) {
        FoodSetting.data = new DataModel()
        FoodSetting.data.loadDataFromJson(gameResource.global.food_setting)
    }
}

FoodSetting.getAll = function () {
    return FoodSetting.data.jsonData
}

FoodSetting.getById = function (id) {
    return FoodSetting.data.jsonData[id - 1]
}

var Food = function(id) {
    this.id = id
}

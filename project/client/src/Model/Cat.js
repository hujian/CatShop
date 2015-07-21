/*
* @brief:  猫相关的业务类。
*          是充血的model，除了拥有原始的业务数据外，还绑定其他业务逻辑和view model的逻辑。
* @author: Hj
* @date:   2015-06-24
*/

// 猫德配置表，拿到就是两张，为了方便起见，直接把成年猫的id改成从6开始
var AdultCatStartId = 6

// 猫的配置类
var CatSetting = CatSetting || {}

// 加载数据，因为是配置文件是json，需要异步加载，所以需要在scene加载出来后，手动调用该方法。
CatSetting.load = function () {
    if (!this.adult || !this.baby) {
        // 猫仔的配置数据
        this.baby = new DataModel()
        this.baby.loadDataFromJson(game_resource_table.baby_cat_setting)

        // 成猫的配置数据
        this.adult = new DataModel()
        this.adult.loadDataFromJson(game_resource_table.cat_setting)
    }
}

// 获取所有成猫的数据
CatSetting.getAllAdult = function() {
    return this.adult.jsonData
}

// 根据猫的id，获取成猫数据
CatSetting.getAdultById = function(id) {
    if (id > 0 && this.adult) {
        return this.adult.jsonData[id - 1]
    }
}

// 获取所有猫仔的数据
CatSetting.getAllBaby = function() {
    return this.baby.jsonData
}

// 根据猫的id，获取猫仔数据
CatSetting.getBabyById = function (id) {
    if (id > 0 && this.baby) {
        return this.baby.jsonData[id - 1]
    }
}

// 根据id的大小，判断是否是成年猫
CatSetting.getById = function(id) {
    if (typeof(id) == 'string') id = parseInt(id)

    if (id < AdultCatStartId) {
        return CatSetting.getBabyById(id)
    } else {
        return CatSetting.getAdultById(id)
    }
}

var Cat = function(id) {
    this.id = id
}
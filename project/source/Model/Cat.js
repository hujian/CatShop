/*
* @brief:  猫相关的业务类。
*          是充血的model，除了拥有原始的业务数据外，还绑定其他业务逻辑和view model的逻辑。
* @author: Hj
* @date:   2015-06-24
*/

var Cat = Cat || {}

// 加载数据，因为是配置文件是json，需要异步加载，所以需要在scene加载出来后，手动调用该方法。
Cat.loadSetting = function () {
    if (!this.setting || !this.babySetting) {
        // 猫仔的配置数据
        this.babySetting = new DataModel()
        this.babySetting.loadDataFromJson(game_resource_table.baby_cat_setting)

        // 成猫的配置数据
        this.setting = new DataModel()
        this.setting.loadDataFromJson(game_resource_table.cat_setting)
    }
}

// 获取所有成猫的数据
Cat.getAll = function() {
    return this.setting.jsonData
}

// 根据猫的id，获取成猫数据
Cat.getById = function(id) {
    if (id > 0 && this.setting) {
        return this.setting.jsonData[id - 1]
    }
}

// 获取所有猫仔的数据
Cat.getAllBaby = function() {
    return this.babySetting.jsonData
}

// 根据猫的id，获取猫仔数据
Cat.getBabyById = function (id) {
    if (id > 0 && this.babySetting) {
        return this.babySetting.jsonData[id - 1]
    }
}

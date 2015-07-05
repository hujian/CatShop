/*
* @brief:  玩家拥有的道具
* @author: Hj
* @date:   2015-07-04
*/

var ItemSetting = ItemSetting || {}

/*
 item根据类型分成4类：
 疫苗
 药品
 清洁设备
 商店扩建
 */
ItemSetting.type = {}
ItemSetting.type.vaccine = 1
ItemSetting.type.medicine = 2
ItemSetting.type.cleanMachine = 3
ItemSetting.type.upgradeShop = 4

ItemSetting.load = function () {
    if (!ItemSetting.data) {
        ItemSetting.data = new DataModel()
        ItemSetting.data.loadDataFromJson(game_resource_table.item_setting)
    }
}

ItemSetting.getAll = function () {
    return ItemSetting.data.jsonData
}

ItemSetting.getById = function (id) {
    return ItemSetting.data.jsonData[id - 1]
}

var Item = function (id) {
    this.id = id
}

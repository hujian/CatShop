/*
* @brief:  猫相关的业务类
* @author: Hj
* @date:   2015-06-24
*/

// 猫仔数据类
var BabyCatSetting = DataModel.extend( {
    ctor:function () {
        this._super(game_resource_table.cat_setting)
    },

    getInstance: function() {
        if(CatSetting._instance == null){
            CatSetting._instance = new BabyCatSetting();
        }
        return CatSetting._instance;
    },

    // id是猫仔的id号，对应cvs里面的id号
    // 返回一个table
    settingById: function(id) {
        var setting = this.data[id - 1]

        // 防止万一表上的数据错了
        if (setting.id == id) {
            return setting
        } else {
            cc.error("get cat setting error, name: [" + setting.name + "]")
            return null
        }
    }
})

// 成猫数据类
var CatSetting = DataModel.extend({
    ctor:function () {
        this._super(game_resource_table.baby_cat_setting)
    },

    getInstance: function() {
        if(CatSetting._instance == null){
            CatSetting._instance = new CatSetting();
        }
        return CatSetting._instance;
    },

    // id是猫的id号，对应cvs里面的id号
    settingById: BabyCatSetting.settingById
})


// 猫类, 包括猫仔和成猫
var Cat = cc.Class.extend({
    // 猫德设置参数
    setting: null,

    ctor:function (setting) {
        this._super()
        this.setting = setting
    }
})

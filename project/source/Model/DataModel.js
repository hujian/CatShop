/*
* @brief:  数据型模型类的基类
* @author: Hj
* @date:   2015-06-24
*/

var DataModel = cc.Class.extend({
    // 数据类一般来说应该是单例，如果是的话，请使用_instance作为静态变量，并且实现getInstance。
    _instance: null,

    ctor:function (dataFilePath) {
        this._super()

        if (dataFilePath != null) {
            try {
                this.data = JSON.parse(game_resource_table.cat_setting);
                //cc.log(result)
            }
            catch (e) {
                cc.error("parse json [" + game_resource_table.cat_setting + "] failed : " + e.toString());
                return;
            }
        }
    }
})

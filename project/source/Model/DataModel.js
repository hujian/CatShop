/*
* @brief:  数据型模型类的基类
* @author: Hj
* @date:   2015-06-24
*/

var DataModel = cc.Class.extend({
    ctor: function () {
    },

    // 直接从json文件初始化该模型
    loadDataFromJson: function(filePath) {
        if (filePath != null) {
            try {
                this.jsonData = cc.loader.getRes(filePath);
                cc.log("load json from file [" + filePath + "]")
            }
            catch (e) {
                cc.error("parse json [" + filePath + "] failed : ");
                return;
            }
        }
    }
})

/*
* @brief:  数据型模型类的基类
* @author: Hj
* @date:   2015-06-24
*/

var DataModel = cc.Class.extend({
    ctor: function () {
        this.jsonData = {}
    },

    // 直接从json文件初始化该模型
    loadDataFromJson: function(filePath) {
        if (filePath) {
            try {
                this.jsonData = cc.loader.getRes(filePath);
                cc.log("load json from file [" + filePath + "]")
            }
            catch (e) {
                cc.error("parse json [" + filePath + "] failed : ");
                return;
            }
        }
    },
    
    // 从local storage中直接恢复数据
    // 如果local storage已经有数据的话，返回true，否则返回false
    loadDataFromLocalStorage: function (key) {
        if (key) {
            var jsonString = cc.sys.localStorage.getItem(key)
            if (jsonString) {
                try {
                    this.jsonData = JSON.parse(jsonString)
                } catch (e) {
                    cc.log("load data from local storage failed, key: [" + key + "]")
                    return false
                }
                cc.log("load data from local storage, key: [" + key + "]")
                return true
            }
        }
        return false
    },

    // 保存数据到local storage
    saveDataToLocalStorage: function(key) {
        if (key) {
            try {
                cc.sys.localStorage.setItem(key, JSON.stringify(this.jsonData))
                cc.log("save data to local storage, key: [" + key + "]")
            } catch (e) {
                cc.log("save data to local storage failed, key: [" + key + "]")
            }
        }
    }
})

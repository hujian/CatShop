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
            this.jsonData = cc.loader.getRes(filePath);
            if (this.jsonData) {
                cc.log("load json from file [" + filePath + "]")
            } else {
                cc.error("parse json [" + filePath + "] failed : ");
            }
        }
    },
    
    // 从local storage中直接恢复数据
    // 如果local storage已经有数据的话，返回true，否则返回false
    loadDataFromLocalStorage: function (key) {
        if (key) {
            var jsonString = cc.sys.localStorage.getItem(key)
            if (jsonString) {
                this.jsonData = JSON.parse(jsonString)
                if (this.jsonData) {
                    cc.log("load data from local storage, key: [" + key + "]")
                    return true
                } else {
                    cc.log("load data from local storage failed, key: [" + key + "]")
                }
            }
        }
        return false
    },

    // 保存数据到local storage
    saveDataToLocalStorage: function(key, excludeKeys) {
        if (key) {
            try {
                // 哪些key需要被排除，不需要保存到磁盘
                if (excludeKeys) {
                    var excludeFunc = function (key, value) {
                        var index = excludeKeys.indexOf(key)
                        if (index > -1) {
                            return undefined
                        } else {
                            return value
                        }
                    }
                }

                cc.sys.localStorage.setItem(key, JSON.stringify(this.jsonData, excludeFunc))
                cc.log("save data to local storage, key: [" + key + "]")
            } catch (e) {
                cc.log("save data to local storage failed, key: [" + key + "]")
            }
        }
    }
})

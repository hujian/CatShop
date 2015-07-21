/*
* @brief:  时间管理工具
* @author: Hj
* @date:   2015-07-19
*/

var Time = Time || {}

Time.timestamp = 0

Time.load = function (callback, target) {
    var request = cc.loader.getXMLHttpRequest()
    request.open('GET', "http://catshop.coding.io/time", true)
    request.onreadystatechange = function () {
        if (request.readyState == 4 && (request.status >= 200 && request.status <= 207)) {
            Time.timestamp = parseInt(request.responseText)
            if (Time.timestamp)
            cc.log("get time stamp from server, " + request.responseText)

            // 开始通过定时器累计时间
            cc.director.getScheduler().schedule(Time.update, Time, 1, cc.REPEAT_FOREVER, 0, false, "Time")
        }
    }
    request.send()
}

Time.update = function (interval) {
    interval = Math.min(interval, 59)
    Time.timestamp += interval
    cc.log(new Date(Time.timestamp * 1000).toString())
}

// 获取的是时间戳
Time.now = function () {
    return Time.timestamp
}
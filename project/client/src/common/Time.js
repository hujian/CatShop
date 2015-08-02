/*
* @brief:  时间管理工具
* @author: Hj
* @date:   2015-07-19
*/

var Time = Time || {}

Time.timestamp = Date.parse(new Date()) / 1000

Time.load = function (timestampServerUrl, callback, target) {
    var self = this
    self._callback = callback
    self._target = target

    var result = false
    var request = cc.loader.getXMLHttpRequest()

    request.open('GET', timestampServerUrl, true)
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status >= 200 && request.status <= 207) {
                Time.timestamp = parseInt(request.responseText)
                if (Time.timestamp) {
                    // 开始通过定时器累计时间
                    cc.director.getScheduler().schedule(Time.update, Time, 1, cc.REPEAT_FOREVER, 0, false, "Time")

                    cc.log("get time stamp from server: " + request.responseText + ", current time: " + new Date(Time.timestamp).toString())
                    result = true

                } else {
                    cc.error("服务器返回奇怪的东西：" + request.responseText)
                }
            } else {
                cc.error("网络出啥问题了, status code: " + request.status.toString())
            }

            if (self._callback && self._target) {
                self._callback.call(self._target, result)
            }
        }
    }
    request.send()
}

Time.update = function (interval) {
    interval = Math.min(interval, 59)
    Time.timestamp += interval
}

// 获取的是时间戳
Time.now = function () {
    return Time.timestamp
}

// 可以避免回调异常
Time.stopFetchServeTime = function () {
    this._callback = null
    this._target = null
}
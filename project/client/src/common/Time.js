/*
* @brief:  时间管理工具
* @author: Hj
* @date:   2015-07-19
*/

var Time = Time || {}

Time.load = function (handler) {
    var request = cc.loader.getXMLHttpRequest()
    request.open('GET', "http://gamblerwebserver-d3aa9.coding.io", true)
    request.onreadystatechange = function () {
        if (request.readyState == 4 && (request.status >= 200 && request.status <= 207)) {
            Time.timestamp = parseInt(request.responseText)
            cc.log("%d", Time.timestamp)
        }
    }
    request.send()
}
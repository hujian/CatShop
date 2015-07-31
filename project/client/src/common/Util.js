/* 
* @breife: 工具类
* @author: hujian
* @date:   2015-03-29 20:56:06
*/


var Util = {
	//  Fisher-Yates Shuffle
	shuffle:function (array) {
	    var counter = array.length, temp, index;

	    // While there are elements in the array
	    while (counter > 0) {
	        // Pick a random index
	        index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }
	    return array;
	},
	
	// 精灵平铺，用到webGL，会有兼容的问题
	spriteTileRepeat:function (sprite) {
		sprite.texture.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT)
	},

	// 从字典中，抽出value组成数组
	getArray:function (obj) {
		var array = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				array.push(obj[key]);
			}
		}
		return array
	},

	// cc.p 的辅助函数
	ccpAdd:function (p1, p2) {
		return cc.p(p1.x + p2.x, + p1.y + p2.y)
	},

	ccpSub:function (p1, p2) {
		return cc.p(p1.x - p2.x, p1.y - p2.y)
	},

	// 获取时间字符串，hh:mm:ss
	getTimeString:function (seconds) {
		return parseInt(seconds / 3600).toString() + '小时' + parseInt(seconds % 3600 / 60).toString() + '分' + parseInt(seconds % 60).toString() + '秒'
	},

	// 获取[min, max)的随机整数
	getRandomInt:function (min, max) {
		return parseInt(Math.random() * (max - min) + min)
	},

	// 全局加速, 注意factor不是乘上原值，设成1恢复原值
	speedUp:function (factor) {
		cc.director.getScheduler().setTimeScale(factor)
	}
};
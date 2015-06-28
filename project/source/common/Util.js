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
	}
};
/*
* @brief:  测试猫相关的主要逻辑
* @author: Hj
* @date:   2015-07-07
*/

var TestCatScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        this.needSwitchButton = false
    },

    onEnter:function () {
        this._super()

        this.printMessage("这里是猫咪生活的场所，请妥善照顾好你的猫咪。")
    }
})
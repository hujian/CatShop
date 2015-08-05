/*
* @brief:  广告控件的测试用例
* @author: Hj
* @date:   2015-08-05
*/

var TestAdScene = TestBaseScene.extend({
    ctor:function () {
        this._super()

        var ad = new AdLayer()
        ad.setPosition(cc.p(100, 200))
        this.addChild(ad)
    }
});
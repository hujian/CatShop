/* 
* @brief:
* @author: hujian
* @date:   2015-04-01 21:28:02
*/


var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        // 正常UI测试用例
        this.addTestButton('正常流程', this.goRoutine)
        this.addTestButton('弹出层', this.goPopup)

        // 文字UI测试用例
        this.addTestButton('文字-主界面', this.goTestMain)
        this.addTestButton('文字-猫屋', this.goTestCat)
        this.addTestButton('文字-猫食工厂', this.goTestFood)
    },

    onEnter:function() {
        this._super()

        // temp in developing
        if (cc.isDebug && !this.autoRun) {
            this.autoRun = true
            //this.goPopup()
        }
    },

    goRoutine:function () {
    },

    goPopup:function () {
        cc.director.pushScene(new TestPopupScene())
    },

    goTestMain:function () {
        cc.director.pushScene(new TestGameScene())
    },

    goTestCat:function () {
        cc.director.pushScene(new TestCatScene())
    },

    goTestFood:function () {
        cc.director.pushScene(new TestFoodScene())
    }
});
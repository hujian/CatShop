/* 
* @brief:
* @author: hujian
* @date:   2015-04-01 21:28:02
*/

var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.needBackButton = false

        // 正常UI测试用例
        this.addTestButton('正常流程', this.goRoutine)
        this.addTestButton('UI测试', this.goUI)

        // 文字UI测试用例
        this.addTestButton('文字-主界面', this.goTestMain)
        this.addTestButton('文字-猫屋', this.goTestCat)

        // 自动测试
        this.addTestButton(['自动测试-1', '自动测试-1-进行中'], this.goTest1)
    },

    onEnter:function() {
        this._super()

        // temp in developing
        if (cc.isDebug && !this.autoRun) {
            this.autoRun = true
            //this.goTestCat()
        }
    },

    goRoutine:function () {
    },

    goUI:function () {
        cc.director.pushScene(new TestUIScene())
    },

    goTestMain:function () {
        cc.director.pushScene(new TestGameScene())
    },

    goTestCat:function () {
        cc.director.pushScene(new TestCatScene())
    },

    goTest1:function (button, state) {
        if (state == 1) {
            TestManager.start(TestManager.testName.one)
        } else {
            TestManager.stop()
        }
    }
});
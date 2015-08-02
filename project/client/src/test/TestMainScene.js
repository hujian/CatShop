/* 
* @brief:
* @author: hujian
* @date:   2015-04-01 21:28:02
*/

var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.needBackButton = false

        this.addTestLabel("逻辑测试")
        this.addLogicTest('主界面', TestGameScene)
        this.addLogicTest('猫屋', TestCatScene)

        this.nextColumn()
        this.addTestLabel("UI测试")
        this.addUITest('正常流程', CatHouseScene)
        this.addUITest('加载', LoadingScene)
        this.addUITest('猫屋', CatHouseScene)
        this.addUITest('食物', FoodScene)
        this.addUITest('商店', ShopScene)
        this.addUITest('出售', SellScene)
        this.addUITest('图鉴', HandbookScene)
        this.addLogicTest('其他', TestUIScene)

        this.nextColumn()
        this.addTestLabel("自动化测试")
        this.addTestButton(['1号测试', '1好号测试进行中'], this.goTest1)
    },

    onEnter:function() {
        this._super()

        // temp in developing
        if (cc.isDebug && !this.autoRun) {
            this.autoRun = true
            //this.goTestCat()
        }
    },

    addLogicTest:function(name, scene) {
        var button = this.addTestButton(name, this.logicTestCallBack)
        button.scene = scene
    },

    logicTestCallBack:function(button) {
        cc.director.pushScene(new button.scene())
    },

    addUITest:function (name, scene) {
        var button = this.addTestButton(name, this.uiTestCallBack)
        button.scene = scene
    },

    uiTestCallBack:function (button) {
        Util.setReleaseDesignResolution()
        var scene = new button.scene()
        var button = this.createTestButton("返回")
        button.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(50, -50)))
        button.addTouchEventListener(function () {
            Util.setDebugDesignResolution()
            cc.director.popScene()
        })
        scene.addChild(button)
        cc.director.pushScene(scene)
    },

    goTest1:function (button, state) {
        if (state == 1) {
            TestManager.start(TestManager.testName.one)
        } else {
            TestManager.stop()
        }
    }
});
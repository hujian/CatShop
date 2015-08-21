/* 
* @brief:
* @author: hujian
* @date:   2015-04-01 21:28:02
*/

var TestMainScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.needBackButton = false;

        this.addTestLabel("快捷功能");
        this.addUITestCase('正常流程', ContainerScene);
        this.addTestButton("加1w钱", function() {
            User.updateMoney(User.getMoney() + 10000);
            User.flush();
        });
        this.addTestButton("清除用户数据", function() {
            CatManager.stop();
            App.initData();
            App.flush();
            User.initUserData();
            User.flush();
        });

        this.nextColumn();
        this.addTestLabel("逻辑测试");
        this.addTestCase('商店逻辑', TestGameScene);
        this.addTestCase('猫屋逻辑', TestCatScene);
        this.addTestCase('时间相关', TestCatScene);
        this.addTestCase('游戏音效', TestAudioScene);

        this.nextColumn();
        this.addTestLabel("基础控件测试");
        this.addTestCase('TabBar', TestTabBarScene);
        this.addTestCase('翻页控件', TestPageLayerScene);
        this.addTestCase('grid控件', TestGridScene);
        this.addTestCase('各种Item', TestItemScene);
        this.addTestCase('各种Item2', TestItem2Scene);
        this.addTestCase('广告控件', TestAdScene);
        this.addTestCase('测试用控件', TestLayerScene);

        this.nextColumn();
        this.addTestLabel("UI测试");
        this.addUITestCase('加载', LoadingScene);
        this.addTestCase('弹出层', TestPopupScene);
        this.addTestCase('猫精灵', TestCatSpriteScene);
        this.addTestCase('食物进度条', TestProgressBar);
        //this.addUITestCase('猫屋', CatHouseLayer)
        //this.addUITestCase('食物', FoodLayer)
        //this.addUITestCase('商店', ShopLayer)
        //this.addUITestCase('出售', SellLayer)
        this.addUITestCase('出售历史', SellingHistoryScene);
        //this.addUITestCase('图鉴', HandbookLayer)
        this.addTestCase('动画', LoadingScene);

        this.nextColumn();
        this.addTestLabel("自动化测试");
        this.addTestButton(['1号测试', '1好号测试进行中'], this.goTest1);
    },

    onEnter:function() {
        this._super();

        // temp in developing
        if (cc.isDebug && !this.autoRun) {
            this.autoRun = true;

            //Util.setReleaseDesignResolution();
            //cc.director.pushScene(new ContainerScene(3));

            //cc.director.pushScene(new TestItem2Scene());
        }
    },

    addTestCase:function(name, scene) {
        var button = this.addTestButton(name, this.testCaseCallBack);
        button.scene = scene;
    },

    testCaseCallBack:function(button) {
        cc.director.pushScene(new button.scene());
    },

    addUITestCase:function (name, scene) {
        var button = this.addTestButton(name, this.uiTestCallBack);
        button.scene = scene;
    },

    uiTestCallBack:function (button) {
        Util.setReleaseDesignResolution();
        var scene = new button.scene();
        var button = this.createTestButton("返回");
        button.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(50, -50)));
        button.addTouchEventListener(function () {
            Util.setDebugDesignResolution();
            cc.director.popScene();
        })
        scene.addChild(button, 9);
        cc.director.pushScene(scene);
    },

    goTest1:function (button, state) {
        if (state == 1) {
            TestManager.start(TestManager.testName.one);
        } else {
            TestManager.stop();
        }
    }
});
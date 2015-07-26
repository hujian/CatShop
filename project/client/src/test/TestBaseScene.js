/*
* @breife: 测试页面基类
*          左边是交互文字输出区域，上面是页面切换区域，中间是操作选择区域，右边是信息展示区域。
* @author: hujian
* @date:   2015-04-01 21:30:04
*/

var TestSceneFontName = 'Arial Bold'

var TestBaseScene = cc.Scene.extend({

    ctor:function () {
        this._super();

        // 测试按钮的初始位置
        this.testButtonInitPosition = cc.p(250, 340)
        this.currentTestButtonPosition = cc.p(this.testButtonInitPosition)

        // 测试按钮的间隔
        this.testButtonGap = cc.p(100, 30)
        // 测试按钮大小
        this.testButtonSize = cc.size(130, 36)
        // 所有测试用例按钮
        this.buttons = []

        // 是否需要返回按钮，默认需要
        this.needBackButton = true;

        // 是否要切换button按钮，默认需要
        this.needSwitchButton = false;

        // 右侧的状态框
        this.statusXPosition = 550
        this.statusYPosition = 415
        this.statusCellHeight = 20
        this.statusCellWidth = 140
        this.statusMaxCellCount = 10.5 // 为了遮掉一点，从而看出是能滚的
        this.statusCellGap = 5
        this.statutsLables = {}

        // 返回键响应
        this.backKeyReleasedEvent = new EventHandler();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: this.onKeyReleased.bind(this)
        }, this);

        // 初始化UI
        this.initTestBaseSceneUI()
    },

    initTestBaseSceneUI:function () {
        // 加入背景
        var background = new cc.LayerColor(cc.color.WHITE);
        this.addChild(background)

        // 左侧的消息栏
        this.oldMessageView = new ccui.Text("", TestSceneFontName, 6)
        this.oldMessageView.ignoreContentAdaptWithSize(false);
        this.oldMessageView.setTextColor(cc.color.BLACK)
        this.oldMessageView.setPosition(cc.p(100, 120))
        this.oldMessageView.setContentSize(cc.size(160, 420))
        this.addChild(this.oldMessageView)
        this.newMessageView = this.oldMessageView.clone()
        this.newMessageView.setPosition(cc.p(100, 360))
        this.newMessageView.setContentSize(cc.size(160, 40))
        this.newMessageView.setTextColor(cc.color(53, 124, 78))
        this.addChild(this.newMessageView)

        // 加个白色渐变的遮罩，增加逐渐往前的效果
        var layer = new cc.LayerGradient(new cc.color(255,255,255,20), new cc.color(255,255,255,255), cc.p(0, -1))
        layer.setContentSize(cc.size(200, 330))
        this.addChild(layer)
    },

    // 最上层的接受者响应返回键响应
    onKeyReleased: function (keyCode, event) {
        if(keyCode == cc.KEY.escape) {
            this.backKeyReleasedEvent.raiseLastHandler();
        }
    },

    onEnter:function() {
        this._super()

        // 返回按钮
        if (this.needBackButton && !this.backButton) {
            this.backButton = this.addTestButton('返回', this.back, cc.p(100, 400), true)
        }

        // 切换按钮
        if (this.needSwitchButton && !this.switchButton) {
            this.switchButton = this.addTestButton(['隐藏按钮', '显示按钮'], this.switchButtons, cc.p(250, 400), true)
        };

        // 更新右侧状态信息
        this.schedule(this.updateStatus, 0.5)
    },

    onExit:function() {
        this.unscheduleAllCallbacks()

        this._super()
    },

    // 返回上层菜单
    back:function (sender, state) {
        cc.director.popScene()
    },

    switchButtons:function (sender, state) {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].setVisible(!this.buttons[i].isVisible())
        };
    },

    createTestButton:function (title, handler, initState) {
        var button = new ccui.Button()
        button.loadTextureNormal(gameResource.global.testButton, ccui.Widget.LOCAL_TEXTURE)
        button.setTouchEnabled(true);
        button.setTitleFontName(TestSceneFontName)
        button.setTitleColor(cc.color.BLACK)
        button.setScale9Enabled(true);
        button.setTitleFontSize(14)
        button.setContentSize(this.testButtonSize)
        button.addTouchEventListener(this.testCall, this)
        button.setCapInsets(cc.Rect(7, 0, 1, 36))
        button.setScale(0.7)
        button.handler = handler
        button.state = initState
        button.title = title
        this.setTestButtonTitle(button)

        return button
    },

    // 新增测试按钮
    // 如果只有一种操作状态，则title直接传字符串，否则传数组
    addTestButton:function (title, handler, position, isSpecialButton, initState) {
        initState = initState || 1
        var button = this.createTestButton(title, handler, initState)

    	button.setPosition(this.currentTestButtonPosition)
        // 移动测试按钮位置
    	if (!position) {
	    	this.currentTestButtonPosition.y -= this.testButtonGap.y
	    	if (this.currentTestButtonPosition.y < 50) {
	    		this.currentTestButtonPosition.y = this.testButtonInitPosition.y
	    		this.currentTestButtonPosition.x += this.testButtonGap.x
	    	}
    	} else {
    		button.setPosition(position)
    	}

        // 如果是特殊按钮，比如返回按钮，就不要加入按钮组了，方便对测试按钮做整体操作，比如全部隐藏之类。
        if (!isSpecialButton) {
            if (!this.contentLayer) {
                this.contentLayer = new cc.Layer()
                this.addChild(this.contentLayer)
            }
            this.buttons.push(button)
            this.contentLayer.addChild(button)
        } else {
            this.addChild(button)
        }

    	return button
    },

    setTestButtonTitle:function (button) {
        if (typeof(button.title) == 'string') {
            button.setTitleText(button.title)
        } else {
            button.setTitleText(button.title[button.state - 1])
        }
    },

    // 包装函数，转一下
    testCall:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            sender.handler.call(this, sender, sender.state)
            if (typeof(sender.title) != 'string') {
                sender.state++
                if (sender.state > sender.title.length) {
                    sender.state = 1
                }
                this.setTestButtonTitle(sender)
            };
        };
    },

    printMessage:function (string) {
        if (this.newMessageView.getString().length > 0) {
            this.oldMessageView.setString(this.newMessageView.getString() + "\n\n" + this.oldMessageView.getString())
        }
        this.newMessageView.setString(string)
        this.newMessageView.setOpacity(0)
        this.newMessageView.runAction(new cc.FadeIn(0.5))
    },

    // name是这个状态内容区的名字，content是具体的内容，是个数组。比如:
    // printStatus('商店', ['资金', '风扇', '药品', '猫粮'])
    printStatus:function (name, contentNames) {
        // 背景用的方框
        var statusBackgroundRect = new cc.DrawNode()
        this.addChild(statusBackgroundRect)
        statusBackgroundRect.drawRect(cc.p(this.statusXPosition, this.statusYPosition - Math.min(contentNames.length, this.statusMaxCellCount) * this.statusCellHeight - this.statusCellGap),
                                      cc.p(this.statusXPosition + this.statusCellWidth + this.statusCellGap * 2, this.statusYPosition), null, 1, cc.color.BLACK)

        // name
        var label = new ccui.Text(name, TestSceneFontName, 10)
        label.setAnchorPoint(cc.p(0, 0.5))
        label.setTextColor(cc.color.BLACK)
        label.setPosition(cc.p(this.statusXPosition, this.statusYPosition + this.statusCellGap * 2))
        this.addChild(label)

        // content
        var listView = new ccui.ListView()
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL)
        listView.setBounceEnabled(false)
        listView.setTouchEnabled(true)
        listView.setContentSize(cc.size(this.statusCellWidth, Math.min(contentNames.length, this.statusMaxCellCount) * this.statusCellHeight))
        listView.setAnchorPoint(cc.p(0, 1))
        listView.setPosition(cc.p(this.statusXPosition + this.statusCellGap, this.statusYPosition - this.statusCellGap))
        this.addChild(listView)

        for (var i in contentNames) {
            var customItem = new ccui.Layout();
            customItem.setContentSize(cc.size(this.statusCellWidth, this.statusCellHeight));

            var nameLabel = new ccui.Text(contentNames[i], TestSceneFontName, 6)
            nameLabel.setTextColor(cc.color.BLACK)
            nameLabel.setAnchorPoint(cc.p(0, 0.5))
            nameLabel.setPosition(cc.p(0, this.statusCellHeight / 2))
            customItem.addChild(nameLabel)

            var label = new ccui.Text("", TestSceneFontName, 6)
            label.setTextColor(cc.color.BLACK)
            label.setAnchorPoint(cc.p(1, 0.5))
            label.setPosition(cc.p(this.statusCellWidth, this.statusCellHeight / 2))
            customItem.addChild(label)

            listView.pushBackCustomItem(customItem)
            this.statutsLables[contentNames[i]] = label
        }

        this.statusYPosition = this.statusYPosition - contentNames.length * this.statusCellHeight - 30
    },

    updateStatus:function() {
    }
});
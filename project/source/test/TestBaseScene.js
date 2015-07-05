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

        // 加入背景
        var background = new cc.LayerColor(cc.color.WHITE);
        this.addChild(background)

        // 测试按钮的初始位置
        this.testButtonInitPosition = cc.p(250, 350)
        // 测试按钮的当前位置
        this.currentTestButtonPosition = cc.p(this.testButtonInitPosition)
        // 测试按钮的间隔
        this.testButtonGap = cc.p(100, 30)

        // 所有测试用例按钮
        this.buttons = []

        // 是否需要返回按钮，默认需要
        this.needBackButton = true;

        // 是否要切换button按钮，默认需要
        this.needSwitchButton = true;

        // 当前有几个右侧的状态框
        this.statusXPosition = 550
        this.statusYPosition = 380
        this.statusCellHeight = 20
        this.statusCellWidth = 140
        this.statusMaxCellCount = 10.5 // 为了遮掉一点，从而看出是能滚的
        this.statusCellGap = 5
        this.statutsLables = {}
    },

    onEnter:function () {
    	this._super()

    	// 返回按钮
    	if (this.needBackButton) {
            this.addTestButton('返回', this.back, cc.p(100, 550), true)
    	}

        // 切换按钮
        if (this.needSwitchButton) {
            this.addTestButton(['隐藏按钮', '显示按钮'], this.switchButtons, cc.p(250, 550), true)
        };

        // 动作描述
        this.stateLable = new ccui.Text()
        this.stateLable.setFontSize(22)
        this.stateLable.setPosition(cc.p(cc.visibleRect.center.x, 550))
        this.addChild(this.stateLable)

        // 左侧的消息栏
        this.oldMessageView = new ccui.Text("", TestSceneFontName, 6)
        this.oldMessageView.ignoreContentAdaptWithSize(false);
        this.oldMessageView.setTextColor(cc.color.BLACK)
        this.oldMessageView.setPosition(cc.p(100, 140))
        this.oldMessageView.setContentSize(cc.size(160, 400))
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

        // 更新右侧状态信息
        this.schedule(this.updateStatusLabels, 0.5)
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

    // 新增测试按钮
    // 如果只有一种操作状态，则title直接传字符串，否则传数组
    addTestButton:function (title, handler, position, isSpecialButton) {
    	var button = new ccui.Button()
    	button.loadTextureNormal('resource/test/test_button.png', ccui.Widget.LOCAL_TEXTURE)
        button.setTouchEnabled(true);
        button.setTitleFontName(TestSceneFontName)
        button.setTitleColor(cc.color.BLACK)
        button.setScale9Enabled(true);
        button.setTitleFontSize(14)
        button.setContentSize(cc.size(130, 36))
    	button.setPosition(this.currentTestButtonPosition)
    	button.addTouchEventListener(this.testCall, this)
    	button.setCapInsets(cc.Rect(7, 0, 1, 36))
        button.setScale(0.7)
        button.handler = handler
        button.state = 1
        button.title = title

        // 设置按钮文字
        this.setTestButtonTitle(button)

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

        if (!isSpecialButton) {
            this.buttons.push(button)
        };

        this.addChild(button)

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
            sender.state++
            if (typeof(sender.title) == 'string' || sender.state > sender.title.length) {
                sender.state = 1
            };
            this.setTestButtonTitle(sender)
        };
    },

    printMessage:function (string) {
        if (this.newMessageView.getString().length > 0) {
            this.oldMessageView.setString(this.newMessageView.getString() + "\n" + this.oldMessageView.getString())
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

    updateStatusLabels:function() {
    }
});

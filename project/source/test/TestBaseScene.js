/* 
* @breife: 测试页面基类
* @author: hujian
* @date:   2015-04-01 21:30:04
*/


var TestBaseScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        // 加入背景
        var background = new cc.Sprite("resource/test/test_small_background.png")
        background.setPosition(cc.visibleRect.center)
        Util.spriteTileRepeat(background)
        background.setTextureRect(cc.rect(0, 0, 800, 480))
        this.addChild(background)
        
        // 测试按钮的初始位置
        this.testButtonInitPosition = cc.p(120, 450)
        // 测试按钮的当前位置
        this.currentTestButtonPosition = this.testButtonInitPosition
        // 测试按钮的间隔
        this.testButtonGap = cc.p(100, 60)

        // 所有测试用例按钮
        this.buttons = []

        // 是否需要返回按钮，默认需要
        this.needBackButton = true;

        // 是否要切换button按钮，默认需要
        this.needSwitchButton = true;
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
        button.setTitleFontName('AlNile-Bold')
        button.setScale9Enabled(true);
        button.setTitleFontSize(22)
        button.setContentSize(cc.size(150, 71))
    	button.setPosition(this.currentTestButtonPosition)
    	button.addTouchEventListener(this.testCall, this)
    	button.setCapInsets(cc.Rect(15, 0, 1, 71))
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
    testCall: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            sender.handler.call(this, sender, sender.state)
            sender.state++
            if (typeof(sender.title) == 'string' || sender.state > sender.title.length) {
                sender.state = 1
            };
            this.setTestButtonTitle(sender)
        };
    }
});

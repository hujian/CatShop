/*
* @brief: 测试内容的layer，支持滚动
* @author: Hj
* @date:   2015-07-24
*/

var TestContentCellLayer = GameBaseLayer.extend({
    ctor:function () {
        this._super();

        // layer的margin
        this.margin = cc.size(10, 10);

        // cell的中间间隔
        this.cellMargin = 10;

        // 测试按钮的间隔
        this.testButtonGap = cc.size(100, 30);
        // 测试按钮大小
        this.testButtonSize = cc.size(80, 36);

        // cell的数量
        this.cellCount = 0;

        // content
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setBounceEnabled(false);
        scrollView.setTouchEnabled(true);
        scrollView.setAnchorPoint(cc.p(0, 1));
        scrollView.ignoreAnchorPointForPosition(false);
        this.addChild(scrollView);
        this.scrollView = scrollView;

       this.cells = {};
    },

    createTestButton:function (title, selector, target) {
        var button = new ccui.Button();
        button.loadTextureNormal(gameResource.global.testButton, ccui.Widget.LOCAL_TEXTURE);
        button.setTouchEnabled(true);
        button.setTitleText(title);
        button.setTitleFontName(TestSceneFontName);
        button.setTitleColor(cc.color.BLACK);
        button.setScale9Enabled(true);
        button.setTitleFontSize(14);
        button.setContentSize(this.testButtonSize);
        button.addTouchEventListener(this.testCall, this);
        button.setCapInsets(cc.rect(7, 0, 1, 36));
        button.setScale(0.7);
        button.handler = selector;
        button.target = target;
        return button;
    },

    // 包装函数，转一下
    testCall:function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            sender.handler.call(sender.target, sender, sender.state);
        };
    },

    // 清空所有testButton(返回这种特殊的除外)，和testCell
    clearAllContent:function() {
        this.scrollView.removeAllChildren(true);
        this.cells = {};
        this.resetPosition();
    },

    resetPosition:function() {
        // cell的大小间隔
        this.cellSize = cc.size(this.getContentSize().width / 2 - this.cellMargin / 2 - this.margin.width, 200);
        this.cellCap = cc.size(this.cellSize.width + this.cellMargin, this.cellSize.height + this.cellMargin);

        this.scrollView.setContentSize(this.getContentSize());
        this.scrollView.setPosition(cc.p(0, this.getContentSize().height));

        var size = this.getContentSize();
        size.height = Math.max(this.cellCount * this.cellCap.height + this.margin.height, this.getContentSize().height);
        this.scrollView.setInnerContainerSize(size);

        // cell的初始位置
        this.currentCellPosition = cc.p(this.margin.width, this.scrollView.getInnerContainerSize().height - this.margin.height);
    },

    // name       : cell的名称，用于更新数据
    // description: 任意描述，注意不要太长，用\n换行
    // operations : 是一个字符串数据组，生成一组button，title就是这些字符串
    addCell:function(name, description, operations, handler, target, userData) {
        if (!this.currentCellPosition) {
            this.resetPosition();
        }

        this.cells[name] = this.cells[name] || {};

        // 背景框
        var drawNode = new cc.DrawNode();
        drawNode.drawRect(cc.p(this.currentCellPosition.x, this.currentCellPosition.y - this.cellSize.height),
                          cc.p(this.currentCellPosition.x + this.cellSize.width, this.currentCellPosition.y),
                          null, 1, cc.color.BLACK);
        this.scrollView.addChild(drawNode);

        // 描述
        var text = new ccui.Text(description, TestSceneFontName, 6);
        text.setTextColor(cc.color.BLACK);
        text.setAnchorPoint(cc.p(0, 1));
        text.setPosition(cc.p(this.currentCellPosition.x + 5, this.currentCellPosition.y - 5));
        this.scrollView.addChild(text);
        this.cells[name].description = text;

        // 操作
        var startPosition = cc.p(this.currentCellPosition.x + this.cellSize.width - 110 , this.currentCellPosition.y - 20);
        for (var i in operations) {
            var title = operations[i];
            var button = this.createTestButton(title, handler, target);
            button.setAnchorPoint(cc.p(0, 0.5));
            button.setPosition(startPosition);
            button.setContentSize(cc.size(this.testButtonSize.width, this.testButtonSize.height));
            button.operation = title;
            button.userData = userData;
            startPosition.y -= this.testButtonGap.height;
            if (startPosition.y < this.currentCellPosition.y - this.cellSize.height) {
                startPosition.x = this.currentCellPosition.x + this.testButtonGap.width;
                startPosition.y -= this.currentCellPosition.y - 10;
            }
            this.scrollView.addChild(button);
        }

        // 状态
        text = new ccui.Text("", TestSceneFontName, 10);
        text.setTextColor(cc.color.BLACK);
        text.setAnchorPoint(cc.p(0, 1));
        text.setPosition(cc.p(this.currentCellPosition.x + 5, this.currentCellPosition.y - this.cellSize.height + 30));
        this.scrollView.addChild(text);
        this.cells[name].status = text;


        this.currentCellPosition.x += this.cellCap.width;
        if (this.currentCellPosition.x + this.cellSize.width > this.getContentSize().width) {
            this.currentCellPosition.x = this.margin.width;
            this.currentCellPosition.y -= this.cellCap.height;
        }
    },

    updateCellDescription:function(cellName, text) {
        var cell = this.cells[cellName];
        if (cell) {
            cell.description.setString(text);
        }
    },

    updateCellStatus:function(cellName,  text) {
        var cell = this.cells[cellName];
        if (cell) {
            cell.status.setString(text);
        }
    }
});
var ShopScene = function() {
	this.$id = "shopScene";
}

HelloWorldScene.prototype.init = function() {
	var self = this;
	this.ctor = cc.Scene.extend({
		onEnter: function() {
			this._super();
			self.onEnter(this);
		}
	});
}

HelloWorldScene.prototype.onEnter = function(self) {
}

HelloWorldScene.prototype.get = function() {
	return new this.ctor();
}

bearcat.module(HelloWorldScene, typeof module !== 'undefined' ? module : {});
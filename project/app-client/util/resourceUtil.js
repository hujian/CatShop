var ResourceUtil = function() {
	this.$id = "resourceUtil";
	this.$init = "init";
	this.g_resources = [];
	this.res = {};
}

ResourceUtil.prototype.init = function() {
	var res = {
		HelloWorld_png: "res/HelloWorld.png",
		CloseNormal_png: "res/CloseNormal.png",
		CloseSelected_png: "res/CloseSelected.png"
	};

	this.res = res;

	var g_resources = [];
	for (var i in res) {
		g_resources.push(res[i]);
	}

	this.g_resources = g_resources;
}

ResourceUtil.prototype.getResources = function() {
	return this.g_resources;
}

ResourceUtil.prototype.getRes = function() {
	return this.res;
}

bearcat.module(ResourceUtil, typeof module !== 'undefined' ? module : {});
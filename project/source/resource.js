var game_resource_table = {
    cat_setting: "resource/setting/cat.json",
    baby_cat_setting: "resource/setting/babyCat.json"
};

var game_resource = [];
for (var i in game_resource_table) {
    game_resource.push(game_resource_table[i]);
}

if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0) {
    game_resource.push("resource/test/test_small_background.png")
    game_resource.push("resource/test/test_button.png")
}
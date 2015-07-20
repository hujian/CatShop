var game_resource_table = {
    cat_setting: "res/setting/cat.json",
    baby_cat_setting: "res/setting/babyCat.json",
    item_setting: "res/setting/item.json",
    food_setting: "res/setting/food.json"
};

var game_resource = [];
for (var i in game_resource_table) {
    game_resource.push(game_resource_table[i]);
}

if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0) {
    game_resource.push("res/test/test_button.png")
}
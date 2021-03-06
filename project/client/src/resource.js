/*
* @brief:  游戏内的资源定义文件
* @author: Hj
* @date:   2015-07-21
*/

var gameResource = gameResource || {};

// loading界面的资源
gameResource.loading = {
    loading_logo_img : "res/image/loading_logo.png",
    loading_logo_plist : "res/image/loading_logo.plist"
};

// 游戏一登陆就需要加载的资源
gameResource.global = {
    // 图片
    cat_house_image: "res/image/cat_house.png",
    cat_house_plist: "res/image/cat_house.plist",
    cat_baby_image: "res/image/baby_cat.png",
    cat_baby_plist: "res/image/baby_cat.plist",
    help_image: "res/image/help.png",
    help_plist: "res/image/help.plist",
    cat_image: "res/image/cat.png",
    cat_plist: "res/image/cat.plist",
    shop_image: "res/image/shop.png",
    shop_plist: "res/image/shop.plist",
    food_image: "res/image/food.png",
    food_plist: "res/image/food.plist",
    sell_image: "res/image/sell.png",
    sell_plist: "res/image/sell.plist",
    other_image: "res/image/other.png",
    other_plist: "res/image/other.plist",
    cat_setting: "res/setting/cat.json",
    baby_cat_setting: "res/setting/babyCat.json",

    // 配置文件
    item_setting: "res/setting/item.json",
    food_setting: "res/setting/food.json",

    // 声音
    audio_bgm_main: "res/audio/bgm_main.mp3",  // 主场景背景音
    audio_effect_cat_sold: "res/audio/effect_cat_sold.mp3", // 猫被卖
    audio_effect_cat_sold_fall: "res/audio/effect_cat_sold_fall.mp3", // 猫被卖完成后，弹出掉到底的声音
    audio_effect_food_producing: "res/audio/effect_food_producing.mp3", // 食物生成
    audio_effect_food_select: "res/audio/effect_food_selected.mp3", // 食物被选择
    audio_effect_cat_take_medicine: "res/audio/effect_cat_take_medicine.mp3", // 猫打药
    audio_effect_cat_happy: "res/audio/effect_cat_happy.mp3", // 猫开心
    audio_effect_cat_eat: "res/audio/effect_cat_eat.mp3", // 猫吃饭
    audio_effect_cat_eat_done: "res/audio/effect_cat_eat_done.mp3", // 猫吃完
    audio_effect_cat_sound_1: "res/audio/effect_cat_sound_1.mp3", // 猫叫
    audio_effect_cat_sound_2: "res/audio/effect_cat_sound_2.mp3", // 猫叫
    audio_effect_cat_sound_3: "res/audio/effect_cat_sound_3.mp3", // 猫叫
    audio_effect_cat_sound_4: "res/audio/effect_cat_sound_4.mp3", // 猫叫
    audio_effect_cat_sound_5: "res/audio/effect_cat_sound_5.mp3", // 猫叫
    audio_effect_cat_sound_6: "res/audio/effect_cat_sound_6.mp3", // 猫叫
    audio_effect_coin: "res/audio/effect_coin.mp3", // 金币
    audio_effect_button_click: "res/audio/effect_btn_touch.mp3", // 按钮点击
    audio_effect_cat_hair: "res/audio/effect_cat_hair.mp3" // 猫毛清理
};

// 测试用的资源
if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0) {
    gameResource.global.testButton = "res/test/test_button.png"
};

// loading的logo，为了方便加载转成了base64字符串
gameResource.loadingLogoImg = "data:image/png;base64,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";

// 默认字体
gameResource.defaultFont = "";
if((cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT))
{
    gameResource.defaultFont = 'Dengxian';
}
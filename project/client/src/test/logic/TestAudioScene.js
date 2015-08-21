/* 
* @brief:  测试音效
* @author: Hj
* @date:   2015-08-21
*/

var TestAudioScene = TestBaseScene.extend({
    ctor:function () {
        this._super();

        this.addTestButton(["打开背景音", "关闭背景音"], function(btn, state) {
            App.setNeedBackgroundMusic(state == 1);
            App.flush();
        }, null, null, App.getNeedBackgroundMusic() ? 2 : 1);

        this.addTestButton(["打开音效", "关闭音效"], function(btn, state) {
            App.setNeedAudioEffect(state == 1);
            App.flush();
        }, null, null, App.getNeedAudioEffect() ? 2 : 1);

        this.addBackgroundMusic("主场景背景音", gameResource.global.audio_bgm_main);

        this.addAudioEffect("猫开心音效", gameResource.global.audio_effect_cat_happy);
    },

    addBackgroundMusic:function(text, name) {
        this.addTestButton([text, "关闭" + text], function(btn, state) {
            if (state == 1) {
                Audio.playBackgroundMusic(name);
            } else {
                Audio.stopBackgroundMusic(name);
            }
        })
    },

    addAudioEffect:function(text, name) {
        this.addTestButton([text, "关闭" + text], function(btn, state) {
            if (state == 1) {
                Audio.playAudioEffect(name);
            } else {
                Audio.stopPlayAudioEffect(name);
            }
        })
    }
});
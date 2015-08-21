/*
* @brief:  全局用的button
* @author: Hj
* @date:   2015-08-21
*/

var CommonButton = ccui.Button.extend({
    ctor:function (normalImage, selectedImage, disableImage, texType) {
        this._super(normalImage, selectedImage, disableImage, texType);

        this.addClickEventListener(this.click, this);
    },

    click:function() {
        Audio.playAudioEffect(gameResource.global.audio_effect_button_click);
    }
});
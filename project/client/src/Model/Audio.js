/* 
* @brief:  声音管理
* @author: Hj
* @date:   2015-08-21
*/

var Audio = Audio || {};

// 记录对应的soundId，方便后续操作
Audio.effects = {};

Audio.playBackgroundMusic = function(name, loop) {
    loop = loop || true;
    if (App.getNeedBackgroundMusic()) {
        cc.audioEngine.playMusic(name, loop);
    }
};

Audio.stopBackgroundMusic = function(name, release) {
    release = release || true;
    cc.audioEngine.stopMusic(release);
};

Audio.playAudioEffect = function(name, loop) {
    loop = loop || false;
    if (App.getNeedAudioEffect()) {
        var id = cc.audioEngine.playEffect(name, loop);
        Audio.effects[name] = id;
    }
};

Audio.stopPlayAudioEffect = function(name) {
    cc.audioEngine.stopEffect(Audio.effects[name]);
};

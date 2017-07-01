require.register("lib/surface/MusicPlayer", function(exports, require, module) {
var AudioPlayer, CROSSFADE_LENGTH, CocoClass, MUSIC_VOLUME, MusicPlayer, me,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

AudioPlayer = require('lib/AudioPlayer');

me = require('core/auth').me;

CROSSFADE_LENGTH = 1500;

MUSIC_VOLUME = 0.6;

module.exports = MusicPlayer = (function(superClass) {
  extend(MusicPlayer, superClass);

  MusicPlayer.prototype.currentMusic = null;

  MusicPlayer.prototype.standingBy = null;

  MusicPlayer.prototype.subscriptions = {
    'music-player:play-music': 'onPlayMusic',
    'audio-player:loaded': 'onAudioLoaded',
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded',
    'music-player:enter-menu': 'onEnterMenu',
    'music-player:exit-menu': 'onExitMenu',
    'level:set-volume': 'onSetVolume'
  };

  function MusicPlayer() {
    MusicPlayer.__super__.constructor.apply(this, arguments);
    me.on('change:music', this.onMusicSettingChanged, this);
  }

  MusicPlayer.prototype.onAudioLoaded = function() {
    if (this.standingBy) {
      return this.onPlayMusic(this.standingBy);
    }
  };

  MusicPlayer.prototype.onPlayMusic = function(e) {
    var delay, media, ref, ref1, src;
    if (application.isIPadApp) {
      return;
    }
    if (!me.get('volume')) {
      this.lastMusicEventIgnoredWhileMuted = e;
      return;
    }
    src = e.file;
    src = "/file" + src + AudioPlayer.ext;
    if ((!e.file) || src === ((ref = this.currentMusic) != null ? ref.src : void 0)) {
      if (e.play) {
        this.restartCurrentMusic();
      } else {
        this.fadeOutCurrentMusic();
      }
      return;
    }
    media = AudioPlayer.getStatus(src);
    if (!(media != null ? media.loaded : void 0)) {
      AudioPlayer.preloadSound(src);
      this.standingBy = e;
      return;
    }
    delay = (ref1 = e.delay) != null ? ref1 : 0;
    this.standingBy = null;
    this.fadeOutCurrentMusic();
    if (e.play) {
      return this.startNewMusic(src, delay);
    }
  };

  MusicPlayer.prototype.restartCurrentMusic = function() {
    if (!this.currentMusic) {
      return;
    }
    this.currentMusic.play('none', 0, 0, -1, 0.3);
    return this.updateMusicVolume();
  };

  MusicPlayer.prototype.fadeOutCurrentMusic = function() {
    var f;
    if (!this.currentMusic) {
      return;
    }
    createjs.Tween.removeTweens(this.currentMusic);
    f = function() {
      return this.stop();
    };
    return createjs.Tween.get(this.currentMusic).to({
      volume: 0.0
    }, CROSSFADE_LENGTH).call(f);
  };

  MusicPlayer.prototype.startNewMusic = function(src, delay) {
    if (src) {
      this.currentMusic = createjs.Sound.play(src, 'none', 0, 0, -1, 0.3);
    }
    if (!this.currentMusic) {
      return;
    }
    this.currentMusic.volume = 0.0;
    if (me.get('music', true)) {
      return createjs.Tween.get(this.currentMusic).wait(delay).to({
        volume: MUSIC_VOLUME
      }, CROSSFADE_LENGTH);
    }
  };

  MusicPlayer.prototype.onMusicSettingChanged = function() {
    return this.updateMusicVolume();
  };

  MusicPlayer.prototype.updateMusicVolume = function() {
    if (!this.currentMusic) {
      return;
    }
    createjs.Tween.removeTweens(this.currentMusic);
    return this.currentMusic.volume = me.get('music', true) ? MUSIC_VOLUME : 0.0;
  };

  MusicPlayer.prototype.onRealTimePlaybackStarted = function(e) {
    var trackNumber;
    this.previousMusic = this.currentMusic;
    trackNumber = _.random(0, 2);
    return Backbone.Mediator.publish('music-player:play-music', {
      file: "/music/music_real_time_" + trackNumber,
      play: true
    });
  };

  MusicPlayer.prototype.onRealTimePlaybackEnded = function(e) {
    this.fadeOutCurrentMusic();
    if (this.previousMusic) {
      this.currentMusic = this.previousMusic;
      this.restartCurrentMusic();
      if (this.currentMusic.volume) {
        return createjs.Tween.get(this.currentMusic).wait(5000).to({
          volume: MUSIC_VOLUME
        }, CROSSFADE_LENGTH);
      }
    }
  };

  MusicPlayer.prototype.onEnterMenu = function(e) {
    var file;
    if (this.inMenu) {
      return;
    }
    this.inMenu = true;
    this.previousMusic = this.currentMusic;
    file = "/music/music-menu";
    return Backbone.Mediator.publish('music-player:play-music', {
      file: file,
      play: true,
      delay: 1000
    });
  };

  MusicPlayer.prototype.onExitMenu = function(e) {
    if (!this.inMenu) {
      return;
    }
    this.inMenu = false;
    this.fadeOutCurrentMusic();
    if (this.previousMusic) {
      this.currentMusic = this.previousMusic;
      return this.restartCurrentMusic();
    }
  };

  MusicPlayer.prototype.onSetVolume = function(e) {
    if (!(e.volume && this.lastMusicEventIgnoredWhileMuted)) {
      return;
    }
    this.onPlayMusic(this.lastMusicEventIgnoredWhileMuted);
    return this.lastMusicEventIgnoredWhileMuted = null;
  };

  MusicPlayer.prototype.destroy = function() {
    me.off('change:music', this.onMusicSettingChanged, this);
    this.fadeOutCurrentMusic();
    return MusicPlayer.__super__.destroy.call(this);
  };

  return MusicPlayer;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/MusicPlayer.js.map
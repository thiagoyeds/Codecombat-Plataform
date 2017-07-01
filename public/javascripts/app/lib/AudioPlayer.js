require.register("lib/AudioPlayer", function(exports, require, module) {
var AudioPlayer, CocoClass, Manifest, Media, cache, me, rot13, s, soundPlugins, swears,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

cache = {};

me = require('core/auth').me;

rot13 = function(s) {
  return s.replace(/[A-z]/g, function(c) {
    return String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= 'M' ? 13 : -13));
  });
};

swears = (function() {
  var i, len, ref, results;
  ref = ['nefrubyr', 'nffubyr', 'onfgneq', 'ovgpu', 'oybbql', 'obyybpxf', 'ohttre', 'pbpx', 'penc', 'phag', 'qnza', 'qnea', 'qvpx', 'qbhpur', 'snt', 'shpx', 'cvff', 'chffl', 'fuvg', 'fyhg', 'svqqyrfgvpxf'];
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    s = ref[i];
    results.push(rot13(s));
  }
  return results;
})();

if (createjs.FlashPlugin != null) {
  soundPlugins = [createjs.WebAudioPlugin, createjs.FlashPlugin, createjs.HTMLAudioPlugin];
} else {
  soundPlugins = [createjs.WebAudioPlugin, createjs.HTMLAudioPlugin];
}

createjs.Sound.registerPlugins(soundPlugins);

Manifest = (function() {
  function Manifest() {
    this.storage = {};
  }

  Manifest.prototype.add = function(filename, group) {
    var name;
    if (group == null) {
      group = 'misc';
    }
    name = name || filename;
    if (this.storage[group] == null) {
      this.storage[group] = [];
    }
    if (indexOf.call(this.storage[group], filename) >= 0) {
      return;
    }
    return this.storage[group].push(filename);
  };

  Manifest.prototype.addPrimarySound = function(filename) {
    return this.add(filename, 'primarySounds');
  };

  Manifest.prototype.addSecondarySound = function(filename) {
    return this.add(filename, 'secondarySounds');
  };

  Manifest.prototype.getData = function() {
    return this.storage;
  };

  return Manifest;

})();

Media = (function() {
  function Media(name) {
    if (name) {
      this.name = name;
    }
  }

  Media.prototype.loaded = false;

  Media.prototype.data = null;

  Media.prototype.progress = 0.0;

  Media.prototype.error = null;

  Media.prototype.name = '';

  return Media;

})();

AudioPlayer = (function(superClass) {
  extend(AudioPlayer, superClass);

  AudioPlayer.prototype.subscriptions = {
    'audio-player:play-sound': function(e) {
      return this.playInterfaceSound(e.trigger, e.volume);
    }
  };

  function AudioPlayer() {
    this.onSoundLoadError = bind(this.onSoundLoadError, this);
    this.onSoundLoaded = bind(this.onSoundLoaded, this);
    AudioPlayer.__super__.constructor.call(this);
    this.ext = createjs.Sound.getCapability('mp3') ? '.mp3' : '.ogg';
    this.camera = null;
    this.listenToSound();
    this.createNewManifest();
    this.soundsToPlayWhenLoaded = {};
  }

  AudioPlayer.prototype.createNewManifest = function() {
    return this.manifest = new Manifest();
  };

  AudioPlayer.prototype.listenToSound = function() {
    return createjs.Sound.on('fileload', this.onSoundLoaded);
  };

  AudioPlayer.prototype.applyPanning = function(options, pos) {
    var dst, pan, sup, svp, vol;
    sup = this.camera.worldToSurface(pos);
    svp = this.camera.surfaceViewport;
    pan = Math.max(-1, Math.min(1, ((sup.x - svp.x) - svp.width / 2) / svp.width));
    if (_.isNaN(pan)) {
      pan = 0;
    }
    dst = this.camera.distanceRatioTo(pos);
    if (_.isNaN(dst)) {
      dst = 0.8;
    }
    vol = Math.min(1, options.volume / Math.pow(dst + 0.2, 2));
    return {
      volume: options.volume,
      delay: options.delay,
      pan: pan
    };
  };

  AudioPlayer.prototype.soundForDialogue = function(message, soundTriggers) {
    var defaults, ref, say, sound;
    if (_.isArray(message)) {
      message = message.join(' ');
    }
    if (!_.isString(message)) {
      return message;
    }
    if (!(say = soundTriggers != null ? soundTriggers.say : void 0)) {
      return null;
    }
    message = _.string.slugify(message);
    if (sound = say[message]) {
      return sound;
    }
    if (_.string.startsWith(message, 'attack')) {
      if (sound = say.attack) {
        return sound;
      }
    }
    if (message.indexOf("i-dont-see-anyone") !== -1) {
      if (sound = say['i-dont-see-anyone']) {
        return sound;
      }
    }
    if (message.indexOf("i-see-you") !== -1) {
      if (sound = say['i-see-you']) {
        return sound;
      }
    }
    if (message.indexOf("repeating-loop") !== -1) {
      if (sound = say['repeating-loop']) {
        return sound;
      }
    }
    if (/move(up|down|left|right)/.test(message)) {
      if (sound = say["move-" + message.slice(4)]) {
        return sound;
      }
    }
    defaults = say.defaultSimlish;
    if (((ref = say.swearingSimlish) != null ? ref.length : void 0) && _.find(swears, function(s) {
      return message.search(s) !== -1;
    })) {
      defaults = say.swearingSimlish;
    }
    if (!(defaults != null ? defaults.length : void 0)) {
      return null;
    }
    return defaults[message.length % defaults.length];
  };

  AudioPlayer.prototype.preloadInterfaceSounds = function(names) {
    var filename, i, len, name, results;
    if (!me.get('volume')) {
      return;
    }
    results = [];
    for (i = 0, len = names.length; i < len; i++) {
      name = names[i];
      filename = "/file/interface/" + name + this.ext;
      results.push(this.preloadSound(filename, name));
    }
    return results;
  };

  AudioPlayer.prototype.playInterfaceSound = function(name, volume) {
    var filename;
    if (volume == null) {
      volume = 1;
    }
    if (!(volume && me.get('volume'))) {
      return;
    }
    filename = "/file/interface/" + name + this.ext;
    if (this.hasLoadedSound(filename)) {
      return this.playSound(name, volume);
    } else {
      if (!(filename in cache)) {
        this.preloadInterfaceSounds([name]);
      }
      return this.soundsToPlayWhenLoaded[name] = volume;
    }
  };

  AudioPlayer.prototype.playSound = function(name, volume, delay, pos) {
    var audioOptions, filename, instance;
    if (volume == null) {
      volume = 1;
    }
    if (delay == null) {
      delay = 0;
    }
    if (pos == null) {
      pos = null;
    }
    if (!name) {
      return console.error('Trying to play empty sound?');
    }
    if (!(volume && me.get('volume'))) {
      return;
    }
    audioOptions = {
      volume: volume,
      delay: delay
    };
    filename = _.string.startsWith(name, '/file/') ? name : '/file/' + name;
    if (!this.hasLoadedSound(filename)) {
      this.soundsToPlayWhenLoaded[name] = audioOptions.volume;
    }
    if (this.camera && !this.camera.destroyed && pos) {
      audioOptions = this.applyPanning(audioOptions, pos);
    }
    instance = createjs.Sound.play(name, audioOptions);
    return instance;
  };

  AudioPlayer.prototype.hasLoadedSound = function(filename, name) {
    if (!(filename in cache)) {
      return false;
    }
    if (!createjs.Sound.loadComplete(filename)) {
      return false;
    }
    return true;
  };

  AudioPlayer.prototype.preloadSoundReference = function(sound) {
    var filename, name;
    if (!me.get('volume')) {
      return;
    }
    if (!(name = this.nameForSoundReference(sound))) {
      return;
    }
    filename = '/file/' + name;
    this.preloadSound(filename, name);
    return filename;
  };

  AudioPlayer.prototype.nameForSoundReference = function(sound) {
    return sound[this.ext.slice(1)];
  };

  AudioPlayer.prototype.preloadSound = function(filename, name) {
    var result;
    if (!filename) {
      return;
    }
    if (filename in cache) {
      return;
    }
    if (name == null) {
      name = filename;
    }
    result = createjs.Sound.registerSound(filename, name, 1);
    return cache[filename] = new Media(name);
  };

  AudioPlayer.prototype.onSoundLoaded = function(e) {
    var media, volume;
    media = cache[e.src];
    if (!media) {
      return;
    }
    media.loaded = true;
    media.progress = 1.0;
    if (volume = this.soundsToPlayWhenLoaded[media.name]) {
      this.playSound(media.name, volume);
      this.soundsToPlayWhenLoaded[media.name] = false;
    }
    return this.notifyProgressChanged();
  };

  AudioPlayer.prototype.onSoundLoadError = function(e) {
    return console.error('Could not load sound', e);
  };

  AudioPlayer.prototype.notifyProgressChanged = function() {
    return Backbone.Mediator.publish('audio-player:loaded', {
      sender: this
    });
  };

  AudioPlayer.prototype.getStatus = function(src) {
    return cache[src] || null;
  };

  return AudioPlayer;

})(CocoClass);

module.exports = new AudioPlayer();
});

;
//# sourceMappingURL=/javascripts/app/lib/AudioPlayer.js.map
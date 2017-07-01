require.register("templates/play/level/level-playback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<button id=\"play-button\" title=\"Ctrl/Cmd + P: Toggle level play/pause\" class=\"btn btn-xs btn-inverse paused\"><div class=\"glyphicon glyphicon-play\"></div><div class=\"glyphicon glyphicon-pause\"></div><div class=\"glyphicon glyphicon-repeat\"></div></button><button id=\"volume-button\" title=\"Adjust volume\" class=\"btn btn-xs btn-inverse picoctf-hide\"><div class=\"glyphicon glyphicon-volume-off\"></div><div class=\"glyphicon glyphicon-volume-down\"></div><div class=\"glyphicon glyphicon-volume-up\"></div></button><button id=\"music-button\" title=\"Toggle Music\" class=\"btn btn-xs btn-inverse picoctf-hide\"><span>♫</span></button>");
if ( !view.options.level.isType('game-dev'))
{
buf.push("<div class=\"scrubber\"><div class=\"scrubber-inner\"><div id=\"timeProgress\" class=\"progress secret\"><div class=\"progress-bar\"><div class=\"scrubber-handle\"></div><div id=\"timePopover\" class=\"popover fade top in\"><div class=\"arrow\"></div><h3 class=\"popover-title\"></h3><div class=\"popover-content\"></div></div></div></div></div></div>");
}
buf.push("<div id=\"playback-settings\" class=\"btn-group dropup\"><button title=\"Toggle fullscreen\" class=\"btn btn-xs btn-inverse toggle-fullscreen\"><div class=\"glyphicon glyphicon-fullscreen\"></div></button><button id=\"zoom-in-button\" title=\"Zoom In (or scroll down)\" class=\"btn btn-xs btn-inverse\"><div class=\"glyphicon glyphicon-zoom-in\"></div></button><button id=\"zoom-out-button\" title=\"Zoom Out (or scroll up)\" class=\"btn btn-xs btn-inverse\"><div class=\"glyphicon glyphicon-zoom-out\"></div></button></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/level/LevelPlaybackView", function(exports, require, module) {
var CocoView, HoverPopup, LevelPlaybackView, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/play/level/level-playback-view');

me = require('core/auth').me;

module.exports = LevelPlaybackView = (function(superClass) {
  extend(LevelPlaybackView, superClass);

  LevelPlaybackView.prototype.id = 'playback-view';

  LevelPlaybackView.prototype.template = template;

  LevelPlaybackView.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'level:set-playing': 'onSetPlaying',
    'level:toggle-playing': 'onTogglePlay',
    'level:scrub-forward': 'onScrubForward',
    'level:scrub-back': 'onScrubBack',
    'level:set-volume': 'onSetVolume',
    'surface:frame-changed': 'onFrameChanged',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'level:set-letterbox': 'onSetLetterbox',
    'tome:cast-spells': 'onTomeCast',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded',
    'playback:stop-real-time-playback': 'onStopRealTimePlayback'
  };

  LevelPlaybackView.prototype.events = {
    'click #music-button': 'onToggleMusic',
    'click #zoom-in-button': function() {
      if (!this.shouldIgnore()) {
        return Backbone.Mediator.publish('camera:zoom-in', {});
      }
    },
    'click #zoom-out-button': function() {
      if (!this.shouldIgnore()) {
        return Backbone.Mediator.publish('camera:zoom-out', {});
      }
    },
    'click #volume-button': 'onToggleVolume',
    'click #play-button': 'onTogglePlay',
    'click': function() {
      if (!this.realTime) {
        return Backbone.Mediator.publish('tome:focus-editor', {});
      }
    },
    'mouseenter #timeProgress': 'onProgressEnter',
    'mouseleave #timeProgress': 'onProgressLeave',
    'mousemove #timeProgress': 'onProgressHover',
    'tapstart #timeProgress': 'onProgressTapStart',
    'tapend #timeProgress': 'onProgressTapEnd',
    'tapmove #timeProgress': 'onProgressTapMove'
  };

  LevelPlaybackView.prototype.shortcuts = {
    '⌘+p, p, ctrl+p': 'onTogglePlay',
    '⌘+[, ctrl+[': 'onScrubBack',
    '⌘+⇧+[, ctrl+⇧+[': 'onSingleScrubBack',
    '⌘+], ctrl+]': 'onScrubForward',
    '⌘+⇧+], ctrl+⇧+]': 'onSingleScrubForward'
  };

  function LevelPlaybackView() {
    this.onWindowResize = bind(this.onWindowResize, this);
    this.formatTime = bind(this.formatTime, this);
    LevelPlaybackView.__super__.constructor.apply(this, arguments);
    me.on('change:music', this.updateMusicButton, this);
  }

  LevelPlaybackView.prototype.afterRender = function() {
    var t, ua;
    LevelPlaybackView.__super__.afterRender.call(this);
    this.$progressScrubber = $('.scrubber .progress', this.$el);
    if (!this.options.level.isType('game-dev')) {
      this.hookUpScrubber();
    }
    this.updateMusicButton();
    $(window).on('resize', this.onWindowResize);
    ua = navigator.userAgent.toLowerCase();
    if (/safari/.test(ua) && !/chrome/.test(ua)) {
      this.$el.find('.toggle-fullscreen').hide();
    }
    if (this.timePopup == null) {
      this.timePopup = new HoverPopup;
    }
    t = $.i18n.t;
    this.second = t('units.second');
    this.seconds = t('units.seconds');
    this.minute = t('units.minute');
    this.minutes = t('units.minutes');
    this.goto = t('play_level.time_goto');
    this.current = t('play_level.time_current');
    this.total = t('play_level.time_total');
    if (this.options.level.get('hidesPlayButton')) {
      return this.$el.find('#play-button').css('visibility', 'hidden');
    }
  };

  LevelPlaybackView.prototype.updatePopupContent = function() {
    var ref;
    return (ref = this.timePopup) != null ? ref.updateContent("<h2>" + (this.timeToString(this.newTime)) + "</h2>" + (this.formatTime(this.current, this.currentTime)) + "<br/>" + (this.formatTime(this.total, this.totalTime))) : void 0;
  };

  LevelPlaybackView.prototype.pad2 = function(num) {
    if ((num == null) || num === 0) {
      return '00';
    } else {
      return (num < 10 ? '0' : '') + num;
    }
  };

  LevelPlaybackView.prototype.formatTime = function(text, time) {
    return text + "\t" + (this.timeToString(time));
  };

  LevelPlaybackView.prototype.timeToString = function(time, withUnits) {
    var mins, ret, secs;
    if (time == null) {
      time = 0;
    }
    if (withUnits == null) {
      withUnits = false;
    }
    mins = Math.floor(time / 60);
    secs = (time - mins * 60).toFixed(1);
    if (withUnits) {
      ret = '';
      if (mins > 0) {
        ret = mins + ' ' + (mins === 1 ? this.minute : this.minutes);
      }
      if (secs > 0 || mins === 0) {
        return ret = ret + ' ' + secs + ' ' + (secs === 1 ? this.second : this.seconds);
      }
    } else {
      return mins + ":" + (this.pad2(secs));
    }
  };

  LevelPlaybackView.prototype.updateMusicButton = function() {
    return this.$el.find('#music-button').toggleClass('music-on', me.get('music'));
  };

  LevelPlaybackView.prototype.onSetLetterbox = function(e) {
    if (this.realTime) {
      return;
    }
    this.togglePlaybackControls(!e.on);
    return this.disabled = e.on;
  };

  LevelPlaybackView.prototype.togglePlaybackControls = function(to) {
    var buttons;
    buttons = this.$el.find('#play-button, .scrubber-handle');
    return buttons.css('visibility', to ? 'visible' : 'hidden');
  };

  LevelPlaybackView.prototype.onTomeCast = function(e) {
    if (!e.realTime) {
      return;
    }
    this.realTime = true;
    this.togglePlaybackControls(false);
    Backbone.Mediator.publish('playback:real-time-playback-started', {});
    return this.playSound('real-time-playback-start');
  };

  LevelPlaybackView.prototype.onWindowResize = function() {
    var s;
    s = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.barWidth = $('.progress', this.$el).width();
  };

  LevelPlaybackView.prototype.onNewWorld = function(e) {
    return this.updateBarWidth(e.world.frames.length, e.world.maxTotalFrames, e.world.dt);
  };

  LevelPlaybackView.prototype.updateBarWidth = function(loadedFrameCount, maxTotalFrames, dt) {
    var pct;
    this.totalTime = (loadedFrameCount - 1) * dt;
    pct = parseInt(100 * loadedFrameCount / (maxTotalFrames - 1)) + '%';
    this.barWidth = $('.progress', this.$el).css('width', pct).show().width();
    $('.scrubber .progress', this.$el).slider('enable', true);
    this.newTime = 0;
    this.currentTime = 0;
    return this.lastLoadedFrameCount = loadedFrameCount;
  };

  LevelPlaybackView.prototype.onDisableControls = function(e) {
    var error, error1, ref;
    if (!e.controls || (indexOf.call(e.controls, 'playback') >= 0)) {
      this.disabled = true;
      $('button', this.$el).addClass('disabled');
      try {
        this.$progressScrubber.slider('disable', true);
      } catch (error1) {
        error = error1;
        console.warn('error disabling scrubber', error);
      }
      if ((ref = this.timePopup) != null) {
        ref.disable();
      }
      $('#volume-button', this.$el).removeClass('disabled');
      return this.$el.addClass('controls-disabled');
    }
  };

  LevelPlaybackView.prototype.onEnableControls = function(e) {
    var error, error1, ref;
    if (this.realTime) {
      return;
    }
    if (!e.controls || (indexOf.call(e.controls, 'playback') >= 0)) {
      this.disabled = false;
      $('button', this.$el).removeClass('disabled');
      try {
        this.$progressScrubber.slider('enable', true);
      } catch (error1) {
        error = error1;
        console.warn('error enabling scrubber', error);
      }
      if ((ref = this.timePopup) != null) {
        ref.enable();
      }
      return this.$el.removeClass('controls-disabled');
    }
  };

  LevelPlaybackView.prototype.onSetPlaying = function(e) {
    var bar, button, changed, ended, ref;
    this.playing = (ref = (e != null ? e : {}).playing) != null ? ref : true;
    button = this.$el.find('#play-button');
    ended = button.hasClass('ended');
    changed = button.hasClass('playing') !== this.playing;
    button.toggleClass('playing', this.playing && !ended).toggleClass('paused', !this.playing && !ended);
    if (!this.options.level.isType('game-dev')) {
      this.playSound((this.playing ? 'playback-play' : 'playback-pause'));
    }
    return;
    bar = this.$el.find('.scrubber .progress');
    return bar.toggleClass('progress-striped', this.playing && !ended).toggleClass('active', this.playing && !ended);
  };

  LevelPlaybackView.prototype.onSetVolume = function(e) {
    var button, c, classes, j, len;
    classes = ['vol-off', 'vol-down', 'vol-up'];
    button = $('#volume-button', this.$el);
    for (j = 0, len = classes.length; j < len; j++) {
      c = classes[j];
      button.removeClass(c);
    }
    if (e.volume <= 0.0) {
      button.addClass(classes[0]);
    }
    if (e.volume > 0.0 && e.volume < 1.0) {
      button.addClass(classes[1]);
    }
    if (e.volume >= 1.0) {
      return button.addClass(classes[2]);
    }
  };

  LevelPlaybackView.prototype.onScrub = function(e, options) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    options.scrubDuration = 500;
    return Backbone.Mediator.publish('level:set-time', options);
  };

  LevelPlaybackView.prototype.onScrubForward = function(e) {
    return this.onScrub(e, {
      ratioOffset: 0.05
    });
  };

  LevelPlaybackView.prototype.onSingleScrubForward = function(e) {
    return this.onScrub(e, {
      frameOffset: 1
    });
  };

  LevelPlaybackView.prototype.onScrubBack = function(e) {
    return this.onScrub(e, {
      ratioOffset: -0.05
    });
  };

  LevelPlaybackView.prototype.onSingleScrubBack = function(e) {
    return this.onScrub(e, {
      frameOffset: -1
    });
  };

  LevelPlaybackView.prototype.onFrameChanged = function(e) {
    var ref;
    if (e.progress !== this.lastProgress) {
      this.currentTime = e.frame / e.world.frameRate;
      if ((ref = this.timePopup) != null ? ref.shown : void 0) {
        this.updatePopupContent();
      }
      this.updateProgress(e.progress, e.world);
      this.updatePlayButton(e.progress);
    }
    return this.lastProgress = e.progress;
  };

  LevelPlaybackView.prototype.onProgressEnter = function(e) {
    var ref;
    return (ref = this.timePopup) != null ? ref.enter(this.timePopup) : void 0;
  };

  LevelPlaybackView.prototype.onProgressLeave = function(e) {
    var ref;
    return (ref = this.timePopup) != null ? ref.leave(this.timePopup) : void 0;
  };

  LevelPlaybackView.prototype.onProgressHover = function(e, offsetX) {
    var ref, timeRatio;
    timeRatio = this.$progressScrubber.width() / this.totalTime;
    if (offsetX == null) {
      offsetX = e.clientX - $(e.target).closest('#timeProgress').offset().left;
    }
    offsetX = Math.max(0, offsetX);
    this.newTime = offsetX / timeRatio;
    this.updatePopupContent();
    if ((ref = this.timePopup) != null) {
      ref.onHover(e);
    }
    if (this.timePopup && Math.abs(this.currentTime - this.newTime) < 1 && !this.timePopup.shown) {
      return this.timePopup.show();
    }
  };

  LevelPlaybackView.prototype.onProgressTapStart = function(e, touchData) {
    var offsetX, ref, ref1, screenOffsetX;
    if (!application.isIPadApp) {
      return;
    }
    this.onProgressEnter(e);
    screenOffsetX = (ref = (ref1 = e.clientX) != null ? ref1 : touchData != null ? touchData.position.x : void 0) != null ? ref : 0;
    offsetX = screenOffsetX - $(e.target).closest('#timeProgress').offset().left;
    offsetX = Math.max(offsetX, 0);
    this.scrubTo(offsetX / this.$progressScrubber.width());
    if (this.$el.find('#play-button').hasClass('playing')) {
      return this.onTogglePlay();
    }
  };

  LevelPlaybackView.prototype.onProgressTapEnd = function(e, touchData) {
    if (!application.isIPadApp) {
      return;
    }
    return this.onProgressLeave(e);
  };

  LevelPlaybackView.prototype.onProgressTapMove = function(e, touchData) {
    var offsetX, ref, ref1, screenOffsetX;
    if (!application.isIPadApp) {
      return;
    }
    screenOffsetX = (ref = (ref1 = e.clientX) != null ? ref1 : touchData != null ? touchData.position.x : void 0) != null ? ref : 0;
    offsetX = screenOffsetX - $(e.target).closest('#timeProgress').offset().left;
    offsetX = Math.max(offsetX, 0);
    this.onProgressHover(e, offsetX);
    return this.scrubTo(offsetX / this.$progressScrubber.width());
  };

  LevelPlaybackView.prototype.updateProgress = function(progress, world) {
    var wasLoaded;
    if (world.frames.length !== this.lastLoadedFrameCount) {
      this.updateBarWidth(world.frames.length, world.maxTotalFrames, world.dt);
    }
    wasLoaded = this.worldCompletelyLoaded;
    this.worldCompletelyLoaded = world.frames.length === world.totalFrames;
    if (this.realTime && this.worldCompletelyLoaded && !wasLoaded) {
      Backbone.Mediator.publish('playback:real-time-playback-ended', {});
      Backbone.Mediator.publish('level:set-letterbox', {
        on: false
      });
    }
    return $('.scrubber .progress-bar', this.$el).css('width', (progress * 100) + "%");
  };

  LevelPlaybackView.prototype.updatePlayButton = function(progress) {
    var isEnded, playButton, wasEnded;
    playButton = this.$el.find('#play-button');
    wasEnded = playButton.hasClass('ended');
    if (this.worldCompletelyLoaded && progress >= 0.99 && this.lastProgress < 0.99) {
      playButton.removeClass('playing').removeClass('paused').addClass('ended');
      if (this.realTime) {
        Backbone.Mediator.publish('level:set-letterbox', {
          on: false
        });
      }
      if (this.realTime) {
        Backbone.Mediator.publish('playback:real-time-playback-ended', {});
      }
    }
    if (progress < 0.99 && this.lastProgress >= 0.99) {
      playButton.removeClass('ended');
      playButton.addClass(this.playing ? 'playing' : 'paused');
    }
    isEnded = playButton.hasClass('ended');
    if (wasEnded !== isEnded) {
      return Backbone.Mediator.publish('playback:ended-changed', {
        ended: isEnded
      });
    }
  };

  LevelPlaybackView.prototype.onRealTimePlaybackEnded = function(e) {
    if (!this.realTime) {
      return;
    }
    this.realTime = false;
    this.togglePlaybackControls(true);
    return this.playSound('real-time-playback-end');
  };

  LevelPlaybackView.prototype.onStopRealTimePlayback = function(e) {
    Backbone.Mediator.publish('level:set-letterbox', {
      on: false
    });
    return Backbone.Mediator.publish('playback:real-time-playback-ended', {});
  };

  LevelPlaybackView.prototype.hookUpScrubber = function() {
    this.sliderIncrements = 500;
    return this.$progressScrubber.slider({
      max: this.sliderIncrements,
      animate: 'slow',
      slide: (function(_this) {
        return function(event, ui) {
          var oldRatio, ratioChange, sound;
          if (_this.shouldIgnore()) {
            return;
          }
          ++_this.slideCount;
          oldRatio = _this.getScrubRatio();
          _this.scrubTo(ui.value / _this.sliderIncrements);
          if (ratioChange = _this.getScrubRatio() - oldRatio) {
            sound = "playback-scrub-slide-" + (ratioChange > 0 ? 'forward' : 'back') + "-" + (_this.slideCount % 3);
            if (!/back/.test(sound)) {
              return _this.playSound(sound, Math.min(1, Math.abs(ratioChange * 50)));
            }
          }
        };
      })(this),
      start: (function(_this) {
        return function(event, ui) {
          if (_this.shouldIgnore()) {
            return;
          }
          _this.slideCount = 0;
          _this.wasPlaying = _this.playing && !$('#play-button').hasClass('ended');
          Backbone.Mediator.publish('level:set-playing', {
            playing: false
          });
          return _this.playSound('playback-scrub-start', 0.5);
        };
      })(this),
      stop: (function(_this) {
        return function(event, ui) {
          if (_this.shouldIgnore()) {
            return;
          }
          _this.actualProgress = ui.value / _this.sliderIncrements;
          Backbone.Mediator.publish('playback:manually-scrubbed', {
            ratio: _this.actualProgress
          });
          Backbone.Mediator.publish('level:set-playing', {
            playing: _this.wasPlaying
          });
          if (_this.slideCount < 3) {
            _this.wasPlaying = false;
            Backbone.Mediator.publish('level:set-playing', {
              playing: false
            });
            return _this.$el.find('.scrubber-handle').effect('bounce', {
              times: 2
            });
          } else {
            return _this.playSound('playback-scrub-end', 0.5);
          }
        };
      })(this)
    });
  };

  LevelPlaybackView.prototype.getScrubRatio = function() {
    return this.$progressScrubber.find('.progress-bar').width() / this.$progressScrubber.width();
  };

  LevelPlaybackView.prototype.scrubTo = function(ratio, duration) {
    if (duration == null) {
      duration = 0;
    }
    if (this.shouldIgnore()) {
      return;
    }
    return Backbone.Mediator.publish('level:set-time', {
      ratio: ratio,
      scrubDuration: duration
    });
  };

  LevelPlaybackView.prototype.shouldIgnore = function() {
    return this.disabled || this.realTime;
  };

  LevelPlaybackView.prototype.onTogglePlay = function(e) {
    var button, willPlay;
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    if (this.shouldIgnore()) {
      return;
    }
    button = $('#play-button');
    willPlay = button.hasClass('paused') || button.hasClass('ended');
    Backbone.Mediator.publish('level:set-playing', {
      playing: willPlay
    });
    return $(document.activeElement).blur();
  };

  LevelPlaybackView.prototype.onToggleVolume = function(e) {
    var button, classes, i, j, len, newI, oldClass, volumes;
    button = $(e.target).closest('#volume-button');
    classes = ['vol-off', 'vol-down', 'vol-up'];
    volumes = [0, 0.4, 1.0];
    for (i = j = 0, len = classes.length; j < len; i = ++j) {
      oldClass = classes[i];
      if (button.hasClass(oldClass)) {
        newI = (i + 1) % classes.length;
        break;
      } else if (i === classes.length - 1) {
        newI = 2;
      }
    }
    Backbone.Mediator.publish('level:set-volume', {
      volume: volumes[newI]
    });
    return $(document.activeElement).blur();
  };

  LevelPlaybackView.prototype.onToggleMusic = function(e) {
    if (e != null) {
      e.preventDefault();
    }
    me.set('music', !me.get('music', true));
    me.patch();
    return $(document.activeElement).blur();
  };

  LevelPlaybackView.prototype.destroy = function() {
    me.off('change:music', this.updateMusicButton, this);
    $(window).off('resize', this.onWindowResize);
    this.onWindowResize = null;
    return LevelPlaybackView.__super__.destroy.call(this);
  };

  return LevelPlaybackView;

})(CocoView);

HoverPopup = (function(superClass) {
  extend(HoverPopup, superClass);

  function HoverPopup() {
    this.enabled = true;
    this.shown = false;
    this.type = 'HoverPopup';
    this.options = {
      placement: 'top',
      container: 'body',
      animation: true,
      html: true,
      delay: {
        show: 400
      }
    };
    this.$element = $('#timeProgress');
    this.$tip = $('#timePopover');
    this.content = '';
  }

  HoverPopup.prototype.getContent = function() {
    return this.content;
  };

  HoverPopup.prototype.show = function() {
    if (!this.shown) {
      HoverPopup.__super__.show.call(this);
      return this.shown = true;
    }
  };

  HoverPopup.prototype.updateContent = function(content) {
    this.content = content;
    this.setContent();
    return this.$tip.addClass('fade top in');
  };

  HoverPopup.prototype.onHover = function(e1) {
    var actualHeight, actualWidth, calculatedOffset, pos;
    this.e = e1;
    pos = this.getPosition();
    actualWidth = this.$tip[0].offsetWidth;
    actualHeight = this.$tip[0].offsetHeight;
    calculatedOffset = {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    };
    return this.applyPlacement(calculatedOffset, 'top');
  };

  HoverPopup.prototype.getPosition = function() {
    return {
      top: this.$element.offset().top,
      left: this.e != null ? this.e.pageX : this.$element.offset().left,
      height: 0,
      width: 0
    };
  };

  HoverPopup.prototype.hide = function() {
    HoverPopup.__super__.hide.call(this);
    return this.shown = false;
  };

  HoverPopup.prototype.disable = function() {
    HoverPopup.__super__.disable.call(this);
    return this.hide();
  };

  return HoverPopup;

})($.fn.popover.Constructor);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelPlaybackView.js.map
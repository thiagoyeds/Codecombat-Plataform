require.register("lib/surface/Surface", function(exports, require, module) {
var AudioPlayer, Camera, CameraBorder, CocoClass, CoordinateDisplay, CoordinateGrid, CountdownScreen, DebugDisplay, Dimmer, Dropper, GameUIState, LankBoss, Layer, Letterbox, MusicPlayer, PlaybackOverScreen, PointChooser, RegionChooser, Surface, TrailMaster, me, resizeDelay,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

TrailMaster = require('./TrailMaster');

Dropper = require('./Dropper');

AudioPlayer = require('lib/AudioPlayer');

me = require('core/auth').me;

Camera = require('./Camera');

CameraBorder = require('./CameraBorder');

Layer = require('./LayerAdapter');

Letterbox = require('./Letterbox');

Dimmer = require('./Dimmer');

CountdownScreen = require('./CountdownScreen');

PlaybackOverScreen = require('./PlaybackOverScreen');

DebugDisplay = require('./DebugDisplay');

CoordinateDisplay = require('./CoordinateDisplay');

CoordinateGrid = require('./CoordinateGrid');

LankBoss = require('./LankBoss');

PointChooser = require('./PointChooser');

RegionChooser = require('./RegionChooser');

MusicPlayer = require('./MusicPlayer');

GameUIState = require('models/GameUIState');

resizeDelay = 500;

module.exports = Surface = Surface = (function(superClass) {
  extend(Surface, superClass);

  Surface.prototype.stage = null;

  Surface.prototype.normalLayers = null;

  Surface.prototype.surfaceLayer = null;

  Surface.prototype.surfaceTextLayer = null;

  Surface.prototype.screenLayer = null;

  Surface.prototype.gridLayer = null;

  Surface.prototype.lankBoss = null;

  Surface.prototype.debugDisplay = null;

  Surface.prototype.currentFrame = 0;

  Surface.prototype.lastFrame = null;

  Surface.prototype.totalFramesDrawn = 0;

  Surface.prototype.playing = false;

  Surface.prototype.dead = false;

  Surface.prototype.imagesLoaded = false;

  Surface.prototype.worldLoaded = false;

  Surface.prototype.scrubbing = false;

  Surface.prototype.debug = false;

  Surface.prototype.defaults = {
    paths: true,
    grid: false,
    navigateToSelection: true,
    choosing: false,
    coords: null,
    showInvisible: false,
    frameRate: 30,
    levelType: 'hero'
  };

  Surface.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'level:set-playing': 'onSetPlaying',
    'level:set-debug': 'onSetDebug',
    'level:toggle-debug': 'onToggleDebug',
    'level:toggle-pathfinding': 'onTogglePathFinding',
    'level:set-time': 'onSetTime',
    'camera:set-camera': 'onSetCamera',
    'level:restarted': 'onLevelRestarted',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'tome:cast-spells': 'onCastSpells',
    'level:set-letterbox': 'onSetLetterbox',
    'application:idle-changed': 'onIdleChanged',
    'camera:zoom-updated': 'onZoomUpdated',
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded',
    'level:flag-color-selected': 'onFlagColorSelected',
    'tome:manual-cast': 'onManualCast',
    'playback:stop-real-time-playback': 'onStopRealTimePlayback'
  };

  Surface.prototype.shortcuts = {
    'ctrl+\\, ⌘+\\': 'onToggleDebug',
    'ctrl+o, ⌘+o': 'onTogglePathFinding'
  };

  function Surface(world, normalCanvas, webGLCanvas, givenOptions) {
    var ref;
    this.world = world;
    this.normalCanvas = normalCanvas;
    this.webGLCanvas = webGLCanvas;
    this.onResize = bind(this.onResize, this);
    this.onKeyEvent = bind(this.onKeyEvent, this);
    this.onMouseWheel = bind(this.onMouseWheel, this);
    this.onMouseUp = bind(this.onMouseUp, this);
    this.onSpriteMouseDown = bind(this.onSpriteMouseDown, this);
    this.onMouseDown = bind(this.onMouseDown, this);
    this.onMouseMove = bind(this.onMouseMove, this);
    this.onFramesScrubbed = bind(this.onFramesScrubbed, this);
    this.tick = bind(this.tick, this);
    Surface.__super__.constructor.call(this);
    $(window).on('keydown', this.onKeyEvent);
    $(window).on('keyup', this.onKeyEvent);
    this.normalLayers = [];
    this.options = _.clone(this.defaults);
    if (givenOptions) {
      this.options = _.extend(this.options, givenOptions);
    }
    this.handleEvents = (ref = this.options.handleEvents) != null ? ref : true;
    this.gameUIState = this.options.gameUIState || new GameUIState({
      canDragCamera: true
    });
    this.realTimeInputEvents = this.gameUIState.get('realTimeInputEvents');
    this.listenTo(this.gameUIState, 'sprite:mouse-down', this.onSpriteMouseDown);
    this.onResize = _.debounce(this.onResize, resizeDelay);
    this.initEasel();
    this.initAudio();
    $(window).on('resize', this.onResize);
    if (this.world.ended) {
      _.defer((function(_this) {
        return function() {
          return _this.setWorld(_this.world);
        };
      })(this));
    }
  }

  Surface.prototype.initEasel = function() {
    var canvasHeight, canvasWidth, layer, ref;
    this.normalStage = new createjs.Stage(this.normalCanvas[0]);
    this.webGLStage = new createjs.SpriteStage(this.webGLCanvas[0]);
    this.normalStage.nextStage = this.webGLStage;
    this.camera = new Camera(this.webGLCanvas, {
      gameUIState: this.gameUIState,
      handleEvents: this.handleEvents
    });
    if (!this.options.choosing) {
      AudioPlayer.camera = this.camera;
    }
    this.normalLayers.push(this.surfaceTextLayer = new Layer({
      name: 'Surface Text',
      layerPriority: 1,
      transform: Layer.TRANSFORM_SURFACE_TEXT,
      camera: this.camera
    }));
    this.normalLayers.push(this.gridLayer = new Layer({
      name: 'Grid',
      layerPriority: 2,
      transform: Layer.TRANSFORM_SURFACE,
      camera: this.camera
    }));
    this.normalLayers.push(this.screenLayer = new Layer({
      name: 'Screen',
      layerPriority: 3,
      transform: Layer.TRANSFORM_SCREEN,
      camera: this.camera
    }));
    (ref = this.normalStage).addChild.apply(ref, (function() {
      var i, len, ref, results;
      ref = this.normalLayers;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        results.push(layer.container);
      }
      return results;
    }).call(this));
    canvasWidth = parseInt(this.normalCanvas.attr('width'), 10);
    canvasHeight = parseInt(this.normalCanvas.attr('height'), 10);
    this.screenLayer.addChild(new Letterbox({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    }));
    this.lankBoss = new LankBoss({
      camera: this.camera,
      webGLStage: this.webGLStage,
      surfaceTextLayer: this.surfaceTextLayer,
      world: this.world,
      thangTypes: this.options.thangTypes,
      choosing: this.options.choosing,
      navigateToSelection: this.options.navigateToSelection,
      showInvisible: this.options.showInvisible,
      playerNames: this.options.levelType === 'course-ladder' ? this.options.playerNames : null,
      gameUIState: this.gameUIState,
      handleEvents: this.handleEvents
    });
    this.countdownScreen = new CountdownScreen({
      camera: this.camera,
      layer: this.screenLayer,
      showsCountdown: this.world.showsCountdown
    });
    if (this.options.levelType !== 'game-dev') {
      this.playbackOverScreen = new PlaybackOverScreen({
        camera: this.camera,
        layer: this.screenLayer,
        playerNames: this.options.playerNames
      });
      this.normalStage.addChildAt(this.playbackOverScreen.dimLayer, 0);
    }
    this.initCoordinates();
    this.webGLStage.enableMouseOver(10);
    this.webGLStage.addEventListener('stagemousemove', this.onMouseMove);
    this.webGLStage.addEventListener('stagemousedown', this.onMouseDown);
    this.webGLStage.addEventListener('stagemouseup', this.onMouseUp);
    this.webGLCanvas.on('mousewheel', this.onMouseWheel);
    if (this.options.choosing) {
      this.hookUpChooseControls();
    }
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(this.options.frameRate);
    return this.onResize();
  };

  Surface.prototype.initCoordinates = function() {
    var showCoordinates;
    if (this.coordinateGrid == null) {
      this.coordinateGrid = new CoordinateGrid({
        camera: this.camera,
        layer: this.gridLayer,
        textLayer: this.surfaceTextLayer
      }, this.world.size());
    }
    if (this.world.showGrid || this.options.grid) {
      this.coordinateGrid.showGrid();
    }
    showCoordinates = this.options.coords != null ? this.options.coords : this.world.showCoordinates;
    if (showCoordinates) {
      return this.coordinateDisplay != null ? this.coordinateDisplay : this.coordinateDisplay = new CoordinateDisplay({
        camera: this.camera,
        layer: this.surfaceTextLayer
      });
    }
  };

  Surface.prototype.hookUpChooseControls = function() {
    var chooserOptions, klass;
    chooserOptions = {
      stage: this.webGLStage,
      surfaceLayer: this.surfaceTextLayer,
      camera: this.camera,
      restrictRatio: this.options.choosing === 'ratio-region'
    };
    klass = this.options.choosing === 'point' ? PointChooser : RegionChooser;
    return this.chooser = new klass(chooserOptions);
  };

  Surface.prototype.initAudio = function() {
    return this.musicPlayer = new MusicPlayer();
  };

  Surface.prototype.setWorld = function(world) {
    this.world = world;
    this.worldLoaded = true;
    this.lankBoss.world = this.world;
    if (!this.options.choosing) {
      this.restoreWorldState();
    }
    this.showLevel();
    if (this.loaded) {
      this.updateState(true);
    }
    return this.onFrameChanged();
  };

  Surface.prototype.showLevel = function() {
    if (this.destroyed) {
      return;
    }
    if (this.loaded) {
      return;
    }
    this.loaded = true;
    this.lankBoss.createMarks();
    this.updateState(true);
    this.drawCurrentFrame();
    createjs.Ticker.addEventListener('tick', this.tick);
    return Backbone.Mediator.publish('level:started', {});
  };

  Surface.prototype.tick = function(e) {
    var advanceBy, frameAdvanced, framesDropped, lastFrame, mib, newWorldFrame, oldFrame, oldWorldFrame, worldFrameAdvanced;
    oldFrame = this.currentFrame;
    oldWorldFrame = Math.floor(oldFrame);
    lastFrame = this.world.frames.length - 1;
    framesDropped = 0;
    while (true) {
      Dropper.tick();
      frameAdvanced = (this.playing && this.currentFrame < lastFrame) || this.totalFramesDrawn < 2;
      if (frameAdvanced && this.playing) {
        advanceBy = this.world.frameRate / this.options.frameRate;
        if (this.fastForwardingToFrame && this.currentFrame < this.fastForwardingToFrame - advanceBy) {
          advanceBy = Math.min(this.currentFrame + advanceBy * this.fastForwardingSpeed, this.fastForwardingToFrame) - this.currentFrame;
        } else if (this.fastForwardingToFrame) {
          this.fastForwardingToFrame = this.fastForwardingSpeed = null;
        }
        this.currentFrame += advanceBy;
        this.currentFrame = Math.min(this.currentFrame, lastFrame);
      }
      newWorldFrame = Math.floor(this.currentFrame);
      if (Dropper.drop()) {
        ++framesDropped;
      } else {
        worldFrameAdvanced = newWorldFrame !== oldWorldFrame;
        if (worldFrameAdvanced) {
          this.restoreWorldState();
          oldWorldFrame = newWorldFrame;
        }
        break;
      }
    }
    if (frameAdvanced && !worldFrameAdvanced) {
      this.restoreWorldState();
    }
    this.updateState(this.currentFrame !== oldFrame);
    this.drawCurrentFrame(e);
    this.onFrameChanged();
    Backbone.Mediator.publish('surface:ticked', {
      dt: 1 / this.options.frameRate
    });
    mib = this.webGLStage.mouseInBounds;
    if (this.mouseInBounds !== mib) {
      Backbone.Mediator.publish('surface:mouse-' + (mib ? 'over' : 'out'), {});
      this.mouseInBounds = mib;
      return this.mouseIsDown = false;
    }
  };

  Surface.prototype.restoreWorldState = function() {
    var current, frame, next, ratio;
    frame = this.world.getFrame(this.getCurrentFrame());
    if (!frame) {
      return;
    }
    frame.restoreState();
    current = Math.max(0, Math.min(this.currentFrame, this.world.frames.length - 1));
    if (current - Math.floor(current) > 0.01 && Math.ceil(current) < this.world.frames.length - 1) {
      next = Math.ceil(current);
      ratio = current % 1;
      if (next > 1) {
        this.world.frames[next].restorePartialState(ratio);
      }
    }
    if (parseInt(this.currentFrame) === parseInt(this.lastFrame)) {
      frame.clearEvents();
    }
    if (parseInt(this.currentFrame) !== parseInt(this.lastFrame)) {
      return this.lankBoss.updateSounds();
    }
  };

  Surface.prototype.updateState = function(frameChanged) {
    var ref;
    if (this.handleEvents) {
      if (this.playing && this.currentFrame < this.world.frames.length - 1 && this.heroLank && !this.mouseIsDown && this.camera.newTarget !== this.heroLank.sprite && this.camera.target !== this.heroLank.sprite) {
        this.camera.zoomTo(this.heroLank.sprite, this.camera.zoom, 750);
      }
    }
    this.lankBoss.update(frameChanged);
    this.camera.updateZoom();
    return (ref = this.dimmer) != null ? ref.setSprites(this.lankBoss.lanks) : void 0;
  };

  Surface.prototype.drawCurrentFrame = function(e) {
    ++this.totalFramesDrawn;
    this.normalStage.update(e);
    return this.webGLStage.update(e);
  };

  Surface.prototype.setProgress = function(progress, scrubDuration) {
    var onTweenEnd, t;
    if (scrubDuration == null) {
      scrubDuration = 500;
    }
    progress = Math.max(Math.min(progress, 1), 0.0);
    this.fastForwardingToFrame = null;
    this.scrubbing = true;
    onTweenEnd = (function(_this) {
      return function() {
        _this.scrubbingTo = null;
        _this.scrubbing = false;
        return _this.scrubbingPlaybackSpeed = null;
      };
    })(this);
    if (this.scrubbingTo != null) {
      createjs.Tween.removeTweens(this);
      this.currentFrame = this.scrubbingTo;
    }
    this.scrubbingTo = Math.round(progress * (this.world.frames.length - 1));
    this.scrubbingTo = Math.max(this.scrubbingTo, 1);
    this.scrubbingTo = Math.min(this.scrubbingTo, this.world.frames.length - 1);
    this.scrubbingPlaybackSpeed = Math.sqrt(Math.abs(this.scrubbingTo - this.currentFrame) * this.world.dt / (scrubDuration || 0.5));
    if (scrubDuration) {
      t = createjs.Tween.get(this).to({
        currentFrame: this.scrubbingTo
      }, scrubDuration, createjs.Ease.sineInOut).call(onTweenEnd);
      t.addEventListener('change', this.onFramesScrubbed);
    } else {
      this.currentFrame = this.scrubbingTo;
      this.onFramesScrubbed();
      onTweenEnd();
    }
    if (!this.loaded) {
      return;
    }
    this.updateState(true);
    return this.onFrameChanged();
  };

  Surface.prototype.onFramesScrubbed = function(e) {
    var actualCurrentFrame, frame, i, lank, len, ref, rising, tempFrame, volume;
    if (!this.loaded) {
      return;
    }
    if (e) {
      rising = this.currentFrame > this.lastFrame;
      actualCurrentFrame = this.currentFrame;
      tempFrame = rising ? Math.ceil(this.lastFrame) : Math.floor(this.lastFrame);
      while (true) {
        if (rising && tempFrame > actualCurrentFrame) {
          break;
        }
        if ((!rising) && tempFrame < actualCurrentFrame) {
          break;
        }
        this.currentFrame = tempFrame;
        frame = this.world.getFrame(this.getCurrentFrame());
        frame.restoreState();
        volume = Math.max(0.05, Math.min(1, 1 / this.scrubbingPlaybackSpeed));
        ref = this.lankBoss.lankArray;
        for (i = 0, len = ref.length; i < len; i++) {
          lank = ref[i];
          lank.playSounds(false, volume);
        }
        tempFrame += rising ? 1 : -1;
      }
      this.currentFrame = actualCurrentFrame;
    }
    this.restoreWorldState();
    this.lankBoss.update(true);
    return this.onFrameChanged();
  };

  Surface.prototype.getCurrentFrame = function() {
    return Math.max(0, Math.min(Math.floor(this.currentFrame), this.world.frames.length - 1));
  };

  Surface.prototype.setPaused = function(paused) {
    var performToggle, ref, ref1, ref2, ref3;
    performToggle = (function(_this) {
      return function() {
        createjs.Ticker.setFPS(paused ? 1 : _this.options.frameRate);
        return _this.surfacePauseTimeout = null;
      };
    })(this);
    if (this.surfacePauseTimeout) {
      clearTimeout(this.surfacePauseTimeout);
    }
    if (this.surfaceZoomPauseTimeout) {
      clearTimeout(this.surfaceZoomPauseTimeout);
    }
    this.surfacePauseTimeout = this.surfaceZoomPauseTimeout = null;
    if (paused) {
      this.surfacePauseTimeout = _.delay(performToggle, 2000);
      this.lankBoss.stop();
      if ((ref = this.trailmaster) != null) {
        ref.stop();
      }
      return (ref1 = this.playbackOverScreen) != null ? ref1.show() : void 0;
    } else {
      performToggle();
      this.lankBoss.play();
      if ((ref2 = this.trailmaster) != null) {
        ref2.play();
      }
      return (ref3 = this.playbackOverScreen) != null ? ref3.hide() : void 0;
    }
  };

  Surface.prototype.onFrameChanged = function(force) {
    var progress, ref, ref1;
    this.currentFrame = Math.min(this.currentFrame, this.world.frames.length - 1);
    if ((ref = this.debugDisplay) != null) {
      ref.updateFrame(this.currentFrame);
    }
    if (this.currentFrame === this.lastFrame && !force) {
      return;
    }
    progress = this.getProgress();
    Backbone.Mediator.publish('surface:frame-changed', {
      selectedThang: (ref1 = this.lankBoss.selectedLank) != null ? ref1.thang : void 0,
      progress: progress,
      frame: this.currentFrame,
      world: this.world
    });
    if ((!this.world.indefiniteLength) && this.lastFrame < this.world.frames.length && this.currentFrame >= this.world.totalFrames - 1) {
      this.ended = true;
      this.setPaused(true);
      Backbone.Mediator.publish('surface:playback-ended', {});
      this.updatePaths();
    } else if (this.currentFrame < this.world.totalFrames && this.ended) {
      this.ended = false;
      this.setPaused(false);
      Backbone.Mediator.publish('surface:playback-restarted', {});
    }
    return this.lastFrame = this.currentFrame;
  };

  Surface.prototype.getProgress = function() {
    return this.currentFrame / Math.max(1, this.world.frames.length - 1);
  };

  Surface.prototype.onToggleDebug = function(e) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    return Backbone.Mediator.publish('level:set-debug', {
      debug: !this.debug
    });
  };

  Surface.prototype.onSetDebug = function(e) {
    if (e.debug === this.debug) {
      return;
    }
    this.debug = e.debug;
    if (this.debug && !this.debugDisplay) {
      return this.screenLayer.addChild(this.debugDisplay = new DebugDisplay({
        canvasWidth: this.camera.canvasWidth,
        canvasHeight: this.camera.canvasHeight
      }));
    }
  };

  Surface.prototype.onLevelRestarted = function(e) {
    return this.setProgress(0, 0);
  };

  Surface.prototype.onSetCamera = function(e) {
    var ref, target;
    if (e.thangID) {
      if (!(target = (ref = this.lankBoss.lankFor(e.thangID)) != null ? ref.sprite : void 0)) {
        return;
      }
    } else if (e.pos) {
      target = this.camera.worldToSurface(e.pos);
    } else {
      target = null;
    }
    if (e.bounds) {
      this.camera.setBounds(e.bounds);
    }
    if (this.handleEvents) {
      return this.camera.zoomTo(target, e.zoom, e.duration);
    }
  };

  Surface.prototype.onZoomUpdated = function(e) {
    if (this.ended) {
      this.setPaused(false);
      this.surfaceZoomPauseTimeout = _.delay(((function(_this) {
        return function() {
          return _this.setPaused(true);
        };
      })(this)), 3000);
    }
    this.zoomedIn = e.zoom > e.minZoom * 1.1;
    return this.updateGrabbability();
  };

  Surface.prototype.updateGrabbability = function() {
    return this.webGLCanvas.toggleClass('grabbable', this.zoomedIn && !this.playing && !this.disabled);
  };

  Surface.prototype.onDisableControls = function(e) {
    if (e.controls && !(indexOf.call(e.controls, 'surface') >= 0)) {
      return;
    }
    this.setDisabled(true);
    if (this.dimmer == null) {
      this.dimmer = new Dimmer({
        camera: this.camera,
        layer: this.screenLayer
      });
    }
    return this.dimmer.setSprites(this.lankBoss.lanks);
  };

  Surface.prototype.onEnableControls = function(e) {
    if (e.controls && !(indexOf.call(e.controls, 'surface') >= 0)) {
      return;
    }
    return this.setDisabled(false);
  };

  Surface.prototype.onSetLetterbox = function(e) {
    return this.setDisabled(e.on);
  };

  Surface.prototype.setDisabled = function(disabled) {
    this.disabled = disabled;
    this.lankBoss.disabled = this.disabled;
    return this.updateGrabbability();
  };

  Surface.prototype.onSetPlaying = function(e) {
    var ref;
    this.playing = (ref = (e != null ? e : {}).playing) != null ? ref : true;
    this.setPlayingCalled = true;
    if (this.playing && this.currentFrame >= (this.world.totalFrames - 5)) {
      this.currentFrame = 1;
    }
    if (this.fastForwardingToFrame && !this.playing) {
      this.fastForwardingToFrame = null;
    }
    return this.updateGrabbability();
  };

  Surface.prototype.onSetTime = function(e) {
    var toFrame;
    toFrame = this.currentFrame;
    if (e.time != null) {
      this.worldLifespan = this.world.frames.length / this.world.frameRate;
      e.ratio = e.time / this.worldLifespan;
    }
    if (e.ratio != null) {
      toFrame = this.world.frames.length * e.ratio;
    }
    if (e.frameOffset) {
      toFrame += e.frameOffset;
    }
    if (e.ratioOffset) {
      toFrame += this.world.frames.length * e.ratioOffset;
    }
    if (!(_.isNumber(toFrame) && !_.isNaN(toFrame))) {
      return console.error('set-time event', e, 'produced invalid target frame', toFrame);
    }
    return this.setProgress(toFrame / this.world.frames.length, e.scrubDuration);
  };

  Surface.prototype.onCastSpells = function(e) {
    if (e.preload) {
      return;
    }
    if (this.ended) {
      this.setPaused(false);
    }
    this.casting = true;
    this.setPlayingCalled = false;
    this.frameBeforeCast = this.currentFrame;
    return this.setProgress(0, 0);
  };

  Surface.prototype.onNewWorld = function(event) {
    if (event.world.name !== this.world.name) {
      return;
    }
    return this.onStreamingWorldUpdated(event);
  };

  Surface.prototype.onStreamingWorldUpdated = function(event) {
    var buffer, fastForwardBuffer, ffToFrame, intendedLag, lag;
    this.casting = false;
    this.lankBoss.play();
    if (!(event.firstWorld || this.setPlayingCalled)) {
      Backbone.Mediator.publish('level:set-playing', {
        playing: true
      });
    }
    this.setWorld(event.world);
    this.onFrameChanged(true);
    fastForwardBuffer = 2;
    if (this.playing && !this.realTime && (ffToFrame = Math.min(event.firstChangedFrame, this.frameBeforeCast, this.world.frames.length - 1)) && ffToFrame > this.currentFrame + fastForwardBuffer * this.world.frameRate) {
      this.fastForwardingToFrame = ffToFrame;
      this.fastForwardingSpeed = Math.max(3, 3 * (this.world.maxTotalFrames * this.world.dt) / 60);
    } else if (this.realTime) {
      buffer = this.world.indefiniteLength ? 0 : this.world.realTimeBufferMax;
      lag = (this.world.frames.length - 1) * this.world.dt - this.world.age;
      intendedLag = this.world.dt + buffer;
      if (lag > intendedLag * 1.2) {
        this.fastForwardingToFrame = this.world.frames.length - buffer * this.world.frameRate;
        this.fastForwardingSpeed = lag / intendedLag;
      } else {
        this.fastForwardingToFrame = this.fastForwardingSpeed = null;
      }
    }
    if (event.finished) {
      return this.updatePaths();
    } else {
      return this.hidePaths();
    }
  };

  Surface.prototype.onIdleChanged = function(e) {
    if (!this.ended) {
      return this.setPaused(e.idle);
    }
  };

  Surface.prototype.onMouseMove = function(e) {
    this.mouseScreenPos = {
      x: e.stageX,
      y: e.stageY
    };
    if (this.disabled) {
      return;
    }
    Backbone.Mediator.publish('surface:mouse-moved', {
      x: e.stageX,
      y: e.stageY
    });
    return this.gameUIState.trigger('surface:stage-mouse-move', {
      originalEvent: e
    });
  };

  Surface.prototype.onMouseDown = function(e) {
    var cap, event, onBackground, wop;
    if (this.disabled) {
      return;
    }
    cap = this.camera.screenToCanvas({
      x: e.stageX,
      y: e.stageY
    });
    onBackground = !this.webGLStage._getObjectsUnderPoint(e.stageX, e.stageY, null, true);
    wop = this.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    });
    event = {
      onBackground: onBackground,
      x: e.stageX,
      y: e.stageY,
      originalEvent: e,
      worldPos: wop
    };
    Backbone.Mediator.publish('surface:stage-mouse-down', event);
    Backbone.Mediator.publish('tome:focus-editor', {});
    this.gameUIState.trigger('surface:stage-mouse-down', event);
    return this.mouseIsDown = true;
  };

  Surface.prototype.onSpriteMouseDown = function(e) {
    if (!this.realTime) {
      return;
    }
    return this.realTimeInputEvents.add({
      type: 'mousedown',
      pos: this.camera.screenToWorld({
        x: e.originalEvent.stageX,
        y: e.originalEvent.stageY
      }),
      time: this.world.dt * this.world.frames.length,
      thangID: e.sprite.thang.id
    });
  };

  Surface.prototype.onMouseUp = function(e) {
    var event, onBackground;
    if (this.disabled) {
      return;
    }
    onBackground = !this.webGLStage.hitTest(e.stageX, e.stageY);
    event = {
      onBackground: onBackground,
      x: e.stageX,
      y: e.stageY,
      originalEvent: e
    };
    Backbone.Mediator.publish('surface:stage-mouse-up', event);
    Backbone.Mediator.publish('tome:focus-editor', {});
    this.gameUIState.trigger('surface:stage-mouse-up', event);
    return this.mouseIsDown = false;
  };

  Surface.prototype.onMouseWheel = function(e) {
    var event;
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    event = {
      deltaX: e.deltaX,
      deltaY: e.deltaY,
      canvas: this.webGLCanvas
    };
    if (this.mouseScreenPos) {
      event.screenPos = this.mouseScreenPos;
    }
    if (!this.disabled) {
      Backbone.Mediator.publish('surface:mouse-scrolled', event);
    }
    return this.gameUIState.trigger('surface:mouse-scrolled', event);
  };

  Surface.prototype.onKeyEvent = function(e) {
    var event;
    if (!this.realTime) {
      return;
    }
    event = _.pick(e, 'type', 'keyCode', 'ctrlKey', 'metaKey', 'shiftKey');
    event.time = this.world.dt * this.world.frames.length;
    return this.realTimeInputEvents.add(event);
  };

  Surface.prototype.onResize = function(e) {
    var aspectRatio, availableHeight, newHeight, newWidth, offset, oldHeight, oldWidth, pageHeight, pageWidth, scaleFactor;
    if (this.destroyed || this.options.choosing) {
      return;
    }
    oldWidth = parseInt(this.normalCanvas.attr('width'), 10);
    oldHeight = parseInt(this.normalCanvas.attr('height'), 10);
    aspectRatio = oldWidth / oldHeight;
    pageWidth = $('#page-container').width() - 17;
    if (application.isIPadApp) {
      newWidth = 1024;
      newHeight = newWidth / aspectRatio;
    } else if (this.options.resizeStrategy === 'wrapper-size') {
      newWidth = $('#canvas-wrapper').width();
      newHeight = newWidth / aspectRatio;
    } else if (this.realTime || this.options.spectateGame) {
      pageHeight = window.innerHeight - $('#control-bar-view').outerHeight() - $('#playback-view').outerHeight();
      newWidth = Math.min(pageWidth, pageHeight * aspectRatio);
      newHeight = newWidth / aspectRatio;
    } else if ($('#thangs-tab-view')) {
      newWidth = $('#canvas-wrapper').width();
      newHeight = newWidth / aspectRatio;
    } else {
      newWidth = 0.55 * pageWidth;
      newHeight = newWidth / aspectRatio;
    }
    if (!(newWidth > 0 && newHeight > 0)) {
      return;
    }
    scaleFactor = 1;
    if (this.options.stayVisible) {
      availableHeight = window.innerHeight;
      availableHeight -= $('.ad-container').outerHeight();
      availableHeight -= $('#game-area').outerHeight() - $('#canvas-wrapper').outerHeight();
      if (availableHeight < newHeight) {
        scaleFactor = availableHeight / newHeight;
      }
    }
    newWidth *= scaleFactor;
    newHeight *= scaleFactor;
    if (newWidth === oldWidth && newHeight === oldHeight && !this.options.spectateGame) {
      return;
    }
    if (newWidth < 200 || newHeight < 200) {
      return;
    }
    this.normalCanvas.add(this.webGLCanvas).attr({
      width: newWidth,
      height: newHeight
    });
    this.trigger('resize', {
      width: newWidth,
      height: newHeight
    });
    this.webGLStage.updateViewport(this.webGLCanvas[0].width, this.webGLCanvas[0].height);
    this.normalStage.scaleX *= newWidth / oldWidth;
    this.normalStage.scaleY *= newHeight / oldHeight;
    this.camera.onResize(newWidth, newHeight);
    if (this.options.spectateGame) {
      offset = this.webGLCanvas.offset().left - ($('#page-container').innerWidth() - $('#canvas-wrapper').innerWidth()) / 2;
      return this.normalCanvas.css('left', offset);
    }
  };

  Surface.prototype.focusOnHero = function() {
    var hadHero;
    hadHero = this.heroLank;
    this.heroLank = this.lankBoss.lankFor('Hero Placeholder');
    if (me.team === 'ogres') {
      this.heroLank = this.lankBoss.lankFor('Hero Placeholder 1');
    }
    if (!hadHero) {
      return this.updatePaths();
    }
  };

  Surface.prototype.onRealTimePlaybackStarted = function(e) {
    if (this.realTime) {
      return;
    }
    this.realTimeInputEvents.reset();
    this.realTime = true;
    this.onResize();
    this.playing = false;
    if (this.heroLank) {
      return this.previousCameraZoom = this.camera.zoom;
    }
  };

  Surface.prototype.onRealTimePlaybackEnded = function(e) {
    if (!this.realTime) {
      return;
    }
    this.realTime = false;
    this.onResize();
    _.delay(this.onResize, resizeDelay + 100);
    this.normalCanvas.add(this.webGLCanvas).removeClass('flag-color-selected');
    if (this.handleEvents) {
      if (this.previousCameraZoom) {
        return this.camera.zoomTo(this.camera.newTarget || this.camera.target, this.previousCameraZoom, 3000);
      }
    }
  };

  Surface.prototype.onFlagColorSelected = function(e) {
    this.normalCanvas.add(this.webGLCanvas).toggleClass('flag-color-selected', Boolean(e.color));
    if (this.mouseScreenPos) {
      return e.pos = this.camera.screenToWorld(this.mouseScreenPos);
    }
  };

  Surface.prototype.onManualCast = function() {
    if (this.options.levelType === 'game-dev') {
      console.log("Force resize strategy");
      this.options.originalResizeStrategy = this.options.resizeStrategy;
      return this.options.resizeStrategy = 'wrapper-size';
    }
  };

  Surface.prototype.onStopRealTimePlayback = function() {
    if (this.options.levelType === 'game-dev') {
      console.log("Reset resize strategy");
      return this.options.resizeStrategy = this.options.originalResizeStrategy;
    }
  };

  Surface.prototype.updatePaths = function() {
    var layerAdapter;
    if (!(this.options.paths && this.heroLank)) {
      return;
    }
    this.hidePaths();
    if (this.world.showPaths === 'never') {
      return;
    }
    layerAdapter = this.lankBoss.layerAdapters['Path'];
    if (this.trailmaster == null) {
      this.trailmaster = new TrailMaster(this.camera, layerAdapter);
    }
    this.paths = this.trailmaster.generatePaths(this.world, this.heroLank.thang);
    this.paths.name = 'paths';
    return layerAdapter.addChild(this.paths);
  };

  Surface.prototype.hidePaths = function() {
    if (!this.paths) {
      return;
    }
    if (this.paths.parent) {
      this.paths.parent.removeChild(this.paths);
    }
    return this.paths = null;
  };

  Surface.prototype.screenshot = function(scale, format, quality, zoom) {
    var h, imageData, margin, ref, screenshot, w;
    if (scale == null) {
      scale = 0.25;
    }
    if (format == null) {
      format = 'image/jpeg';
    }
    if (quality == null) {
      quality = 0.8;
    }
    if (zoom == null) {
      zoom = 2;
    }
    ref = [this.camera.canvasWidth * this.camera.canvasScaleFactorX, this.camera.canvasHeight * this.camera.canvasScaleFactorY], w = ref[0], h = ref[1];
    margin = (1 - 1 / zoom) / 2;
    this.webGLStage.cache(margin * w, margin * h, w / zoom, h / zoom, scale * zoom);
    imageData = this.webGLStage.cacheCanvas.toDataURL(format, quality);
    screenshot = document.createElement('img');
    screenshot.src = imageData;
    this.webGLStage.uncache();
    return imageData;
  };

  Surface.prototype.onTogglePathFinding = function(e) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    this.hidePathFinding();
    this.showingPathFinding = !this.showingPathFinding;
    if (this.showingPathFinding) {
      return this.showPathFinding();
    } else {
      return this.hidePathFinding();
    }
  };

  Surface.prototype.hidePathFinding = function() {
    if (this.navRectangles) {
      this.surfaceLayer.removeChild(this.navRectangles);
    }
    if (this.navPaths) {
      this.surfaceLayer.removeChild(this.navPaths);
    }
    return this.navRectangles = this.navPaths = null;
  };

  Surface.prototype.showPathFinding = function() {
    var graph, mesh;
    this.hidePathFinding();
    mesh = _.values(this.world.navMeshes || {})[0];
    if (!mesh) {
      return;
    }
    this.navRectangles = new createjs.Container();
    this.navRectangles.layerPriority = -1;
    this.addMeshRectanglesToContainer(mesh, this.navRectangles);
    this.surfaceLayer.addChild(this.navRectangles);
    this.surfaceLayer.updateLayerOrder();
    graph = _.values(this.world.graphs || {})[0];
    if (!graph) {
      return this.surfaceLayer.updateLayerOrder();
    }
    this.navPaths = new createjs.Container();
    this.navPaths.layerPriority = -1;
    this.addNavPathsToContainer(graph, this.navPaths);
    this.surfaceLayer.addChild(this.navPaths);
    return this.surfaceLayer.updateLayerOrder();
  };

  Surface.prototype.addMeshRectanglesToContainer = function(mesh, container) {
    var dim, i, len, pos, rect, results, shape;
    results = [];
    for (i = 0, len = mesh.length; i < len; i++) {
      rect = mesh[i];
      shape = new createjs.Shape();
      pos = this.camera.worldToSurface({
        x: rect.x,
        y: rect.y
      });
      dim = this.camera.worldToSurface({
        x: rect.width,
        y: rect.height
      });
      shape.graphics.setStrokeStyle(3).beginFill('rgba(0,0,128,0.3)').beginStroke('rgba(0,0,128,0.7)').drawRect(pos.x - dim.x / 2, pos.y - dim.y / 2, dim.x, dim.y);
      results.push(container.addChild(shape));
    }
    return results;
  };

  Surface.prototype.addNavPathsToContainer = function(graph, container) {
    var edgeVertex, i, len, node, ref, results;
    ref = _.values(graph);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      results.push((function() {
        var j, len1, ref1, results1;
        ref1 = node.edges;
        results1 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          edgeVertex = ref1[j];
          results1.push(this.drawLine(node.vertex, edgeVertex, container));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Surface.prototype.drawLine = function(v1, v2, container) {
    var shape;
    shape = new createjs.Shape();
    v1 = this.camera.worldToSurface(v1);
    v2 = this.camera.worldToSurface(v2);
    shape.graphics.setStrokeStyle(1).moveTo(v1.x, v1.y).beginStroke('rgba(128,0,0,0.4)').lineTo(v2.x, v2.y).endStroke();
    return container.addChild(shape);
  };

  Surface.prototype.destroy = function() {
    var i, layer, len, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    if ((ref = this.camera) != null) {
      ref.destroy();
    }
    createjs.Ticker.removeEventListener('tick', this.tick);
    createjs.Sound.stop();
    ref1 = this.normalLayers;
    for (i = 0, len = ref1.length; i < len; i++) {
      layer = ref1[i];
      layer.destroy();
    }
    this.lankBoss.destroy();
    if ((ref2 = this.chooser) != null) {
      ref2.destroy();
    }
    if ((ref3 = this.dimmer) != null) {
      ref3.destroy();
    }
    if ((ref4 = this.countdownScreen) != null) {
      ref4.destroy();
    }
    if ((ref5 = this.playbackOverScreen) != null) {
      ref5.destroy();
    }
    if ((ref6 = this.coordinateDisplay) != null) {
      ref6.destroy();
    }
    if ((ref7 = this.coordinateGrid) != null) {
      ref7.destroy();
    }
    this.normalStage.clear();
    this.webGLStage.clear();
    if ((ref8 = this.musicPlayer) != null) {
      ref8.destroy();
    }
    if ((ref9 = this.trailmaster) != null) {
      ref9.destroy();
    }
    this.normalStage.removeAllChildren();
    this.webGLStage.removeAllChildren();
    this.webGLStage.removeEventListener('stagemousemove', this.onMouseMove);
    this.webGLStage.removeEventListener('stagemousedown', this.onMouseDown);
    this.webGLStage.removeEventListener('stagemouseup', this.onMouseUp);
    this.webGLStage.removeAllEventListeners();
    this.normalStage.enableDOMEvents(false);
    this.webGLStage.enableDOMEvents(false);
    this.webGLStage.enableMouseOver(0);
    this.webGLCanvas.off('mousewheel', this.onMouseWheel);
    $(window).off('resize', this.onResize);
    $(window).off('keydown', this.onKeyEvent);
    $(window).off('keyup', this.onKeyEvent);
    if (this.surfacePauseTimeout) {
      clearTimeout(this.surfacePauseTimeout);
    }
    if (this.surfaceZoomPauseTimeout) {
      clearTimeout(this.surfaceZoomPauseTimeout);
    }
    return Surface.__super__.destroy.call(this);
  };

  return Surface;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Surface.js.map
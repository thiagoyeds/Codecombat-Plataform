require.register("lib/world/world", function(exports, require, module) {
var COUNTDOWN_LEVELS, Component, DESERIALIZATION_INTERVAL, EXISTS_ORIGINAL, Ellipse, ITEM_ORIGINAL, LineSegment, PROGRESS_UPDATE_INTERVAL, REAL_TIME_BUFFERED_WAIT_INTERVAL, REAL_TIME_BUFFER_MAX, REAL_TIME_BUFFER_MIN, REAL_TIME_COUNTDOWN_DELAY, Rand, Rectangle, System, Thang, ThangState, Vector, World, WorldFrame, WorldScriptNote, consolidateThangs, now, ref, typedArraySupport,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

Vector = require('./vector');

Rectangle = require('./rectangle');

Ellipse = require('./ellipse');

LineSegment = require('./line_segment');

WorldFrame = require('./world_frame');

Thang = require('./thang');

ThangState = require('./thang_state');

Rand = require('./rand');

WorldScriptNote = require('./world_script_note');

ref = require('./world_utils'), now = ref.now, consolidateThangs = ref.consolidateThangs, typedArraySupport = ref.typedArraySupport;

Component = require('lib/world/component');

System = require('lib/world/system');

PROGRESS_UPDATE_INTERVAL = 100;

DESERIALIZATION_INTERVAL = 10;

REAL_TIME_BUFFER_MIN = 2 * PROGRESS_UPDATE_INTERVAL;

REAL_TIME_BUFFER_MAX = 3 * PROGRESS_UPDATE_INTERVAL;

REAL_TIME_BUFFERED_WAIT_INTERVAL = 0.5 * PROGRESS_UPDATE_INTERVAL;

REAL_TIME_COUNTDOWN_DELAY = 3000;

ITEM_ORIGINAL = '53e12043b82921000051cdf9';

EXISTS_ORIGINAL = '524b4150ff92f1f4f8000024';

COUNTDOWN_LEVELS = ['sky-span'];

module.exports = World = (function() {
  World.className = 'World';

  World.prototype.age = 0;

  World.prototype.ended = false;

  World.prototype.preloading = false;

  World.prototype.debugging = false;

  World.prototype.headless = false;

  World.prototype.framesSerializedSoFar = 0;

  World.prototype.framesClearedSoFar = 0;

  World.prototype.apiProperties = ['age', 'dt'];

  World.prototype.realTimeBufferMax = REAL_TIME_BUFFER_MAX / 1000;

  function World(userCodeMap, classMap) {
    this.userCodeMap = userCodeMap;
    this.classMap = classMap != null ? classMap : {
      Vector: Vector,
      Rectangle: Rectangle,
      Thang: Thang,
      Ellipse: Ellipse,
      LineSegment: LineSegment
    };
    Thang.resetThangIDs();
    if (this.userCodeMap == null) {
      this.userCodeMap = {};
    }
    this.thangs = [];
    this.thangMap = {};
    this.systems = [];
    this.systemMap = {};
    this.scriptNotes = [];
    this.rand = new Rand(0);
    this.frames = [new WorldFrame(this, 0)];
  }

  World.prototype.destroy = function() {
    var j, key, len, ref1, ref2, thang;
    if ((ref1 = this.goalManager) != null) {
      ref1.destroy();
    }
    ref2 = this.thangs;
    for (j = 0, len = ref2.length; j < len; j++) {
      thang = ref2[j];
      thang.destroy();
    }
    for (key in this) {
      this[key] = void 0;
    }
    this.destroyed = true;
    return this.destroy = function() {};
  };

  World.prototype.getFrame = function(frameIndex) {
    var frame, frames;
    frames = this.frames;
    if (this.ended) {
      frame = frames[frameIndex];
    } else if (frameIndex) {
      frame = frames[frameIndex - 1].getNextFrame();
      frames.push(frame);
    } else {
      frame = frames[0];
    }
    this.age = frameIndex * this.dt;
    return frame;
  };

  World.prototype.getThangByID = function(id) {
    return this.thangMap[id];
  };

  World.prototype.setThang = function(thang) {
    var i, j, len, old, ref1;
    thang.stateChanged = true;
    ref1 = this.thangs;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      old = ref1[i];
      if (old.id === thang.id) {
        this.thangs[i] = thang;
        break;
      }
    }
    return this.thangMap[thang.id] = thang;
  };

  World.prototype.thangDialogueSounds = function(startFrame) {
    var frame, frameIndex, j, ref1, ref2, ref3, ref4, sayMessage, seen, soundKey, sounds, state, thangID;
    if (startFrame == null) {
      startFrame = 0;
    }
    if (!(startFrame < this.frames.length)) {
      return [];
    }
    ref1 = [[], {}], sounds = ref1[0], seen = ref1[1];
    for (frameIndex = j = ref2 = startFrame, ref3 = this.frames.length; ref2 <= ref3 ? j < ref3 : j > ref3; frameIndex = ref2 <= ref3 ? ++j : --j) {
      frame = this.frames[frameIndex];
      ref4 = frame.thangStateMap;
      for (thangID in ref4) {
        state = ref4[thangID];
        if (!(state.thang.say && (sayMessage = state.getStateForProp('sayMessage')))) {
          continue;
        }
        soundKey = state.thang.spriteName + ':' + sayMessage;
        if (!seen[soundKey]) {
          sounds.push([state.thang.spriteName, sayMessage]);
          seen[soundKey] = true;
        }
      }
    }
    return sounds;
  };

  World.prototype.setGoalManager = function(goalManager) {
    this.goalManager = goalManager;
  };

  World.prototype.addError = function(error) {
    (this.runtimeErrors != null ? this.runtimeErrors : this.runtimeErrors = []).push(error);
    return (this.unhandledRuntimeErrors != null ? this.unhandledRuntimeErrors : this.unhandledRuntimeErrors = []).push(error);
  };

  World.prototype.loadFrames = function(loadedCallback, errorCallback, loadProgressCallback, preloadedCallback, skipDeferredLoading, loadUntilFrame) {
    var continueLaterFn, error, error1, frameToLoadUntil, i, j, len, ref1, ref2, ref3, ref4, t1;
    if (this.aborted) {
      return;
    }
    if (this.justBegin) {
      this.totalFrames = 2;
    }
    if (!this.thangs.length) {
      console.log('Warning: loadFrames called on empty World (no thangs).');
    }
    continueLaterFn = (function(_this) {
      return function() {
        if (!_this.destroyed) {
          return _this.loadFrames(loadedCallback, errorCallback, loadProgressCallback, preloadedCallback, skipDeferredLoading, loadUntilFrame);
        }
      };
    })(this);
    if (this.realTime && !this.countdownFinished) {
      this.realTimeSpeedFactor = 1;
      if (!this.showsCountdown) {
        if ((ref1 = this.levelID) === 'woodland-cleaver' || ref1 === 'village-guard' || ref1 === 'shield-rush') {
          this.realTimeSpeedFactor = 2;
        } else if ((ref2 = this.levelID) === 'thornbush-farm' || ref2 === 'back-to-back' || ref2 === 'ogre-encampment' || ref2 === 'peasant-protection' || ref2 === 'munchkin-swarm' || ref2 === 'munchkin-harvest' || ref2 === 'swift-dagger' || ref2 === 'shrapnel' || ref2 === 'arcane-ally' || ref2 === 'touch-of-death' || ref2 === 'bonemender') {
          this.realTimeSpeedFactor = 3;
        }
      }
      if (this.showsCountdown) {
        return setTimeout(this.finishCountdown(continueLaterFn), REAL_TIME_COUNTDOWN_DELAY);
      } else {
        this.finishCountdown(continueLaterFn);
      }
    }
    t1 = now();
    if (this.t0 == null) {
      this.t0 = t1;
    }
    if (this.worldLoadStartTime == null) {
      this.worldLoadStartTime = t1;
    }
    if (this.lastRealTimeUpdate == null) {
      this.lastRealTimeUpdate = 0;
    }
    frameToLoadUntil = loadUntilFrame ? loadUntilFrame + 1 : this.totalFrames;
    i = this.frames.length;
    while (true) {
      if (this.indefiniteLength) {
        if (!this.realTime) {
          break;
        }
        if (this.victory != null) {
          break;
        }
      } else {
        if (i >= frameToLoadUntil) {
          break;
        }
        if (i >= this.totalFrames) {
          break;
        }
      }
      if (!this.shouldContinueLoading(t1, loadProgressCallback, skipDeferredLoading, continueLaterFn)) {
        return;
      }
      if (this.debugging) {
        this.adjustFlowSettings(loadUntilFrame);
      }
      try {
        this.getFrame(i);
        ++i;
      } catch (error1) {
        error = error1;
        this.addError(error);
      }
      if (!(this.preloading || this.debugging)) {
        ref4 = (ref3 = this.unhandledRuntimeErrors) != null ? ref3 : [];
        for (j = 0, len = ref4.length; j < len; j++) {
          error = ref4[j];
          if (!errorCallback(error)) {
            return;
          }
        }
        this.unhandledRuntimeErrors = [];
      }
    }
    return this.finishLoadingFrames(loadProgressCallback, loadedCallback, preloadedCallback);
  };

  World.prototype.finishLoadingFrames = function(loadProgressCallback, loadedCallback, preloadedCallback) {
    var j, len, ref1, system;
    if (!this.debugging) {
      this.ended = true;
      ref1 = this.systems;
      for (j = 0, len = ref1.length; j < len; j++) {
        system = ref1[j];
        system.finish(this.thangs);
      }
    }
    if (this.preloading) {
      return preloadedCallback();
    } else {
      if (typeof loadProgressCallback === "function") {
        loadProgressCallback(1);
      }
      return loadedCallback();
    }
  };

  World.prototype.finishCountdown = function(continueLaterFn) {
    return (function(_this) {
      return function() {
        if (_this.destroyed) {
          return;
        }
        _this.countdownFinished = true;
        return continueLaterFn();
      };
    })(this);
  };

  World.prototype.shouldDelayRealTimeSimulation = function(t) {
    var timeBuffered, timeLoaded, timeSinceStart;
    if (!this.realTime) {
      return false;
    }
    timeSinceStart = (t - this.worldLoadStartTime) * this.realTimeSpeedFactor;
    timeLoaded = this.frames.length * this.dt * 1000;
    timeBuffered = timeLoaded - timeSinceStart;
    if (this.indefiniteLength) {
      return timeBuffered > 0;
    } else {
      return timeBuffered > REAL_TIME_BUFFER_MAX * this.realTimeSpeedFactor;
    }
  };

  World.prototype.shouldUpdateRealTimePlayback = function(t) {
    var remainingBuffer, timeLoaded, timeSinceStart;
    if (!this.realTime) {
      return false;
    }
    if (this.frames.length * this.dt === this.lastRealTimeUpdate) {
      return false;
    }
    timeLoaded = this.frames.length * this.dt * 1000;
    timeSinceStart = (t - this.worldLoadStartTime) * this.realTimeSpeedFactor;
    remainingBuffer = this.lastRealTimeUpdate * 1000 - timeSinceStart;
    if (this.indefiniteLength) {
      return remainingBuffer <= 0;
    } else {
      return remainingBuffer < REAL_TIME_BUFFER_MIN * this.realTimeSpeedFactor;
    }
  };

  World.prototype.shouldContinueLoading = function(t1, loadProgressCallback, skipDeferredLoading, continueLaterFn) {
    var bailoutTime, chunkSize, chunkTime, delay, dt, shouldDelayRealTimeSimulation, shouldUpdateProgress, simedTime, t2;
    t2 = now();
    chunkSize = this.frames.length - this.framesSerializedSoFar;
    simedTime = this.frames.length / this.frameRate;
    chunkTime = (function() {
      switch (false) {
        case !(simedTime > 15):
          return 7;
        case !(simedTime > 10):
          return 5;
        case !(simedTime > 5):
          return 3;
        case !(simedTime > 2):
          return 1;
        default:
          return 0.5;
      }
    })();
    bailoutTime = Math.max(2000 * chunkTime, 10000);
    dt = t2 - t1;
    if (this.realTime) {
      shouldUpdateProgress = this.shouldUpdateRealTimePlayback(t2);
      shouldDelayRealTimeSimulation = !shouldUpdateProgress && this.shouldDelayRealTimeSimulation(t2);
    } else {
      shouldUpdateProgress = dt > PROGRESS_UPDATE_INTERVAL && (chunkSize / this.frameRate >= chunkTime) || dt > bailoutTime;
      shouldDelayRealTimeSimulation = false;
    }
    if (!(shouldUpdateProgress || shouldDelayRealTimeSimulation)) {
      return true;
    }
    if (shouldUpdateProgress) {
      if (this.realTime) {
        this.lastRealTimeUpdate = this.frames.length * this.dt;
      }
      if (!this.preloading) {
        if (typeof loadProgressCallback === "function") {
          loadProgressCallback(this.frames.length / this.totalFrames);
        }
      }
    }
    t1 = t2;
    if (t2 - this.t0 > 1000) {
      if (!this.realTime) {
        console.log('  Loaded', this.frames.length, 'of', this.totalFrames, '(+' + (t2 - this.t0).toFixed(0) + 'ms)');
      }
      this.t0 = t2;
    }
    if (skipDeferredLoading) {
      continueLaterFn();
    } else {
      delay = 0;
      if (shouldDelayRealTimeSimulation) {
        if (this.indefiniteLength) {
          delay = 1000 / 30;
        } else {
          delay = REAL_TIME_BUFFERED_WAIT_INTERVAL;
        }
      }
      setTimeout(continueLaterFn, delay);
    }
    return false;
  };

  World.prototype.adjustFlowSettings = function(loadUntilFrame) {
    var aether, framesToLoadFlowBefore, j, len, methodName, ref1, ref2, results, thang, userCode;
    ref1 = this.thangs;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      thang = ref1[j];
      if (!thang.isProgrammable) {
        continue;
      }
      userCode = (ref2 = this.userCodeMap[thang.id]) != null ? ref2 : {};
      results.push((function() {
        var results1;
        results1 = [];
        for (methodName in userCode) {
          aether = userCode[methodName];
          framesToLoadFlowBefore = methodName === 'plan' || methodName === 'makeBid' ? 200 : 1;
          results1.push(aether._shouldSkipFlow = this.frames.length < loadUntilFrame - framesToLoadFlowBefore);
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  World.prototype.finalizePreload = function(loadedCallback) {
    this.preloading = false;
    if (this.ended) {
      return loadedCallback();
    }
  };

  World.prototype.abort = function() {
    return this.aborted = true;
  };

  World.prototype.addFlagEvent = function(flagEvent) {
    return this.flagHistory.push(flagEvent);
  };

  World.prototype.addRealTimeInputEvent = function(realTimeInputEvent) {
    return this.realTimeInputEvents.push(realTimeInputEvent);
  };

  World.prototype.loadFromLevel = function(level, willSimulate) {
    var j, len, ref1, ref2, ref3, results, system;
    if (willSimulate == null) {
      willSimulate = true;
    }
    this.levelID = level.slug;
    this.levelComponents = level.levelComponents;
    this.thangTypes = level.thangTypes;
    this.loadScriptsFromLevel(level);
    this.loadSystemsFromLevel(level);
    this.loadThangsFromLevel(level, willSimulate);
    this.showsCountdown = (ref1 = this.levelID, indexOf.call(COUNTDOWN_LEVELS, ref1) >= 0) || _.any(this.thangs, function(t) {
      var ref2;
      return (t.programmableProperties && indexOf.call(t.programmableProperties, 'findFlags') >= 0) || ((ref2 = t.inventory) != null ? ref2.flag : void 0);
    });
    if (level.picoCTFProblem) {
      this.picoCTFProblem = level.picoCTFProblem;
    }
    if (((ref2 = this.picoCTFProblem) != null ? ref2.instances : void 0) && !this.picoCTFProblem.flag_sha1) {
      this.picoCTFProblem = _.merge(this.picoCTFProblem, this.picoCTFProblem.instances[0]);
    }
    ref3 = this.systems;
    results = [];
    for (j = 0, len = ref3.length; j < len; j++) {
      system = ref3[j];
      results.push(system.start(this.thangs));
    }
    return results;
  };

  World.prototype.loadSystemsFromLevel = function(level) {
    var config, j, len, levelSystem, ref1, system, systemClass, systemModel;
    this.systems = [];
    this.systemMap = {};
    ref1 = level.systems;
    for (j = 0, len = ref1.length; j < len; j++) {
      levelSystem = ref1[j];
      systemModel = levelSystem.model;
      config = levelSystem.config;
      systemClass = this.loadClassFromCode(systemModel.js, systemModel.name, 'system');
      system = new systemClass(this, config);
      this.addSystems(system);
    }
    return null;
  };

  World.prototype.loadThangsFromLevel = function(level, willSimulate) {
    var j, len, thang, thangConfig, toAdd;
    this.thangs = [];
    this.thangMap = {};
    toAdd = (function() {
      var j, len, ref1, ref2, results;
      ref2 = (ref1 = level.thangs) != null ? ref1 : [];
      results = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        thangConfig = ref2[j];
        results.push(this.loadThangFromLevel(thangConfig, level.levelComponents, level.thangTypes));
      }
      return results;
    }).call(this);
    if (willSimulate) {
      this.extraneousThangs = consolidateThangs(toAdd);
    }
    for (j = 0, len = toAdd.length; j < len; j++) {
      thang = toAdd[j];
      this.addThang(thang);
    }
    return null;
  };

  World.prototype.loadThangFromLevel = function(thangConfig, levelComponents, thangTypes, equipBy) {
    var component, componentClass, componentIndex, componentModel, components, e, error1, existsConfigIndex, isItem, j, len, ref1, ref2, thang, thangTypeModel, thangTypeName, thangTypeOriginal;
    if (equipBy == null) {
      equipBy = null;
    }
    components = [];
    ref1 = thangConfig.components;
    for (componentIndex = j = 0, len = ref1.length; j < len; componentIndex = ++j) {
      component = ref1[componentIndex];
      componentModel = _.find(levelComponents, function(c) {
        var ref2;
        return c.original === component.original && c.version.major === ((ref2 = component.majorVersion) != null ? ref2 : 0);
      });
      componentClass = this.loadClassFromCode(componentModel.js, componentModel.name, 'component');
      components.push([componentClass, component.config]);
      if (component.original === ITEM_ORIGINAL) {
        isItem = true;
        if (equipBy) {
          component.config.ownerID = equipBy;
        }
      } else if (component.original === EXISTS_ORIGINAL) {
        existsConfigIndex = componentIndex;
      }
    }
    if (isItem && (existsConfigIndex != null)) {
      components[existsConfigIndex][1] = {
        exists: false,
        stateless: true
      };
    }
    thangTypeOriginal = thangConfig.thangType;
    thangTypeModel = _.find(thangTypes, function(t) {
      return t.original === thangTypeOriginal;
    });
    if (!thangTypeModel) {
      return console.error((ref2 = thangConfig.id) != null ? ref2 : equipBy, 'could not find ThangType for', thangTypeOriginal);
    }
    thangTypeName = thangTypeModel.name;
    thang = new Thang(this, thangTypeName, thangConfig.id);
    try {
      thang.addComponents.apply(thang, components);
    } catch (error1) {
      e = error1;
      console.error('couldn\'t load components for', thangTypeOriginal, thangConfig.id, 'because', e.toString(), e.stack);
    }
    return thang;
  };

  World.prototype.addThang = function(thang) {
    this.thangs.unshift(thang);
    this.setThang(thang);
    this.updateThangState(thang);
    thang.updateRegistration();
    return thang;
  };

  World.prototype.loadScriptsFromLevel = function(level) {
    this.scriptNotes = [];
    this.scripts = [];
    return this.addScripts.apply(this, level.scripts);
  };

  World.prototype.loadClassFromCode = function(js, name, kind) {
    var c, err, error1, map;
    if (kind == null) {
      kind = 'component';
    }
    if (this.componentCodeClassMap == null) {
      this.componentCodeClassMap = {};
    }
    if (this.systemCodeClassMap == null) {
      this.systemCodeClassMap = {};
    }
    map = kind === 'component' ? this.componentCodeClassMap : this.systemCodeClassMap;
    c = map[js];
    if (c) {
      return c;
    }
    try {
      c = map[js] = eval(js);
    } catch (error1) {
      err = error1;
      console.error("Couldn't compile " + kind + " code:", err, "\n", js);
      c = map[js] = {};
    }
    c.className = name;
    return c;
  };

  World.prototype.updateThangState = function(thang) {
    return this.frames[this.frames.length - 1].thangStateMap[thang.id] = thang.getState();
  };

  World.prototype.size = function() {
    if (!((this.width != null) && (this.height != null))) {
      this.calculateBounds();
    }
    if ((this.width != null) && (this.height != null)) {
      return [this.width, this.height];
    }
  };

  World.prototype.getBounds = function() {
    if (this.bounds == null) {
      this.calculateBounds();
    }
    return this.bounds;
  };

  World.prototype.calculateBounds = function() {
    var bounds, hasLand, j, len, rect, ref1, thang;
    bounds = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    hasLand = _.some(this.thangs, 'isLand');
    ref1 = this.thangs;
    for (j = 0, len = ref1.length; j < len; j++) {
      thang = ref1[j];
      if (!(thang.isLand || (!hasLand && thang.rectangle))) {
        continue;
      }
      rect = thang.rectangle().axisAlignedBoundingBox();
      bounds.left = Math.min(bounds.left, rect.x - rect.width / 2);
      bounds.right = Math.max(bounds.right, rect.x + rect.width / 2);
      bounds.bottom = Math.min(bounds.bottom, rect.y - rect.height / 2);
      bounds.top = Math.max(bounds.top, rect.y + rect.height / 2);
    }
    this.width = bounds.right - bounds.left;
    this.height = bounds.top - bounds.bottom;
    this.bounds = bounds;
    return [this.width, this.height];
  };

  World.prototype.publishNote = function(channel, event) {
    var j, len, ref1, ref2, script, scriptNote;
    if (event == null) {
      event = {};
    }
    channel = 'world:' + channel;
    ref2 = (ref1 = this.scripts) != null ? ref1 : [];
    for (j = 0, len = ref2.length; j < len; j++) {
      script = ref2[j];
      if (script.channel !== channel) {
        continue;
      }
      scriptNote = new WorldScriptNote(script, event);
      if (scriptNote.invalid) {
        continue;
      }
      this.scriptNotes.push(scriptNote);
    }
    if (!this.goalManager) {
      return;
    }
    return this.goalManager.submitWorldGenerationEvent(channel, event, this.frames.length);
  };

  World.prototype.getGoalState = function(goalID) {
    return this.goalManager.getGoalState(goalID);
  };

  World.prototype.setGoalState = function(goalID, status) {
    return this.goalManager.setGoalState(goalID, status);
  };

  World.prototype.endWorld = function(victory, delay, tentative) {
    var status;
    if (victory == null) {
      victory = false;
    }
    if (delay == null) {
      delay = 3;
    }
    if (tentative == null) {
      tentative = false;
    }
    this.totalFrames = Math.min(this.totalFrames, this.frames.length + Math.floor(delay / this.dt));
    this.victory = victory;
    this.victoryIsTentative = tentative;
    status = this.victory ? 'won' : 'lost';
    this.publishNote(status);
    return console.log("The world ended in " + status + " on frame " + this.totalFrames);
  };

  World.prototype.addSystems = function() {
    var j, len, results, system, systems;
    systems = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    this.systems = this.systems.concat(systems);
    results = [];
    for (j = 0, len = systems.length; j < len; j++) {
      system = systems[j];
      results.push(this.systemMap[system.constructor.className] = system);
    }
    return results;
  };

  World.prototype.getSystem = function(systemClassName) {
    var ref1;
    return (ref1 = this.systemMap) != null ? ref1[systemClassName] : void 0;
  };

  World.prototype.addScripts = function() {
    var ref1, scripts;
    scripts = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.scripts = ((ref1 = this.scripts) != null ? ref1 : []).concat(scripts);
  };

  World.prototype.addTrackedProperties = function() {
    var props, ref1;
    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.trackedProperties = ((ref1 = this.trackedProperties) != null ? ref1 : []).concat(props);
  };

  World.prototype.serialize = function() {
    var bytesStored, endFrame, flag, flattened, frameIndex, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, len8, len9, m, method, methodName, methods, nFrames, nontransferableObjects, o, p, prop, propIndex, q, r, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, serializedFlagHistory, serializedMethods, sn, specialValue, startFrame, storage, storageBufferOffset, t, t0, t1, t2, thang, thangID, thangIndex, toClear, trackedPropertiesIndices, trackedPropertiesKeys, trackedPropertiesPerThangValues, trackedPropertiesTypes, trackedPropertiesValues, trackedPropertiesValuesOffsets, transferableObjects, transferableStorageBytesNeeded, type, u, used, v, value, x;
    if (this.ended) {
      this.freeMemoryBeforeFinalSerialization();
    }
    startFrame = this.framesSerializedSoFar;
    endFrame = this.frames.length;
    if (this.indefiniteLength) {
      toClear = Math.max(this.framesSerializedSoFar - 10, 0);
      ref1 = _.range(this.framesClearedSoFar, toClear);
      for (j = 0, len = ref1.length; j < len; j++) {
        i = ref1[j];
        this.frames[i] = null;
      }
      this.framesClearedSoFar = this.framesSerializedSoFar;
    }
    ref2 = [0, 0], transferableObjects = ref2[0], nontransferableObjects = ref2[1];
    serializedFlagHistory = (function() {
      var k, len1, ref3, results;
      ref3 = this.flagHistory;
      results = [];
      for (k = 0, len1 = ref3.length; k < len1; k++) {
        flag = ref3[k];
        results.push(_.omit(_.clone(flag), 'processed'));
      }
      return results;
    }).call(this);
    o = {
      totalFrames: this.totalFrames,
      maxTotalFrames: this.maxTotalFrames,
      frameRate: this.frameRate,
      dt: this.dt,
      victory: this.victory,
      userCodeMap: {},
      trackedProperties: {},
      flagHistory: serializedFlagHistory,
      difficulty: this.difficulty,
      scores: this.getScores(),
      randomSeed: this.randomSeed,
      picoCTFFlag: this.picoCTFFlag
    };
    ref3 = this.trackedProperties || [];
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      prop = ref3[k];
      o.trackedProperties[prop] = this[prop];
    }
    ref4 = this.userCodeMap;
    for (thangID in ref4) {
      methods = ref4[thangID];
      serializedMethods = o.userCodeMap[thangID] = {};
      for (methodName in methods) {
        method = methods[methodName];
        serializedMethods[methodName] = (ref5 = typeof method.serialize === "function" ? method.serialize() : void 0) != null ? ref5 : method;
      }
    }
    t0 = now();
    o.trackedPropertiesThangIDs = [];
    o.trackedPropertiesPerThangIndices = [];
    o.trackedPropertiesPerThangKeys = [];
    o.trackedPropertiesPerThangTypes = [];
    trackedPropertiesPerThangValues = [];
    o.trackedPropertiesPerThangValuesOffsets = [];
    transferableStorageBytesNeeded = 0;
    nFrames = endFrame - startFrame;
    ref6 = this.thangs;
    for (l = 0, len2 = ref6.length; l < len2; l++) {
      thang = ref6[l];
      if (thang.stateless && !_.some(thang.trackedPropertiesUsed, Boolean)) {
        continue;
      }
      o.trackedPropertiesThangIDs.push(thang.id);
      trackedPropertiesIndices = [];
      trackedPropertiesKeys = [];
      trackedPropertiesTypes = [];
      ref7 = thang.trackedPropertiesUsed;
      for (propIndex = m = 0, len3 = ref7.length; m < len3; propIndex = ++m) {
        used = ref7[propIndex];
        if (!used) {
          continue;
        }
        trackedPropertiesIndices.push(propIndex);
        trackedPropertiesKeys.push(thang.trackedPropertiesKeys[propIndex]);
        trackedPropertiesTypes.push(thang.trackedPropertiesTypes[propIndex]);
      }
      o.trackedPropertiesPerThangIndices.push(trackedPropertiesIndices);
      o.trackedPropertiesPerThangKeys.push(trackedPropertiesKeys);
      o.trackedPropertiesPerThangTypes.push(trackedPropertiesTypes);
      trackedPropertiesPerThangValues.push([]);
      o.trackedPropertiesPerThangValuesOffsets.push([]);
      for (p = 0, len4 = trackedPropertiesTypes.length; p < len4; p++) {
        type = trackedPropertiesTypes[p];
        transferableStorageBytesNeeded += ThangState.transferableBytesNeededForType(type, nFrames);
      }
    }
    if (typedArraySupport) {
      o.storageBuffer = new ArrayBuffer(transferableStorageBytesNeeded);
    } else {
      o.storageBuffer = [];
    }
    storageBufferOffset = 0;
    for (thangIndex = q = 0, len5 = trackedPropertiesPerThangValues.length; q < len5; thangIndex = ++q) {
      trackedPropertiesValues = trackedPropertiesPerThangValues[thangIndex];
      trackedPropertiesValuesOffsets = o.trackedPropertiesPerThangValuesOffsets[thangIndex];
      ref8 = o.trackedPropertiesPerThangTypes[thangIndex];
      for (propIndex = r = 0, len6 = ref8.length; r < len6; propIndex = ++r) {
        type = ref8[propIndex];
        ref9 = ThangState.createArrayForType(type, nFrames, o.storageBuffer, storageBufferOffset), storage = ref9[0], bytesStored = ref9[1];
        trackedPropertiesValues.push(storage);
        trackedPropertiesValuesOffsets.push(storageBufferOffset);
        if (bytesStored) {
          ++transferableObjects;
        }
        if (!bytesStored) {
          ++nontransferableObjects;
        }
        if (typedArraySupport) {
          storageBufferOffset += bytesStored;
        } else {
          storageBufferOffset += storage.length;
          o.storageBuffer.push(storage);
        }
      }
    }
    o.specialKeysToValues = [null, Infinity, NaN];
    o.specialValuesToKeys = {};
    ref10 = o.specialKeysToValues;
    for (i = s = 0, len7 = ref10.length; s < len7; i = ++s) {
      specialValue = ref10[i];
      o.specialValuesToKeys[specialValue] = i;
    }
    t1 = now();
    o.frameHashes = [];
    for (frameIndex = u = ref11 = startFrame, ref12 = endFrame; ref11 <= ref12 ? u < ref12 : u > ref12; frameIndex = ref11 <= ref12 ? ++u : --u) {
      o.frameHashes.push(this.frames[frameIndex].serialize(frameIndex - startFrame, o.trackedPropertiesThangIDs, o.trackedPropertiesPerThangIndices, o.trackedPropertiesPerThangTypes, trackedPropertiesPerThangValues, o.specialValuesToKeys, o.specialKeysToValues));
    }
    t2 = now();
    if (!typedArraySupport) {
      flattened = [];
      ref13 = o.storageBuffer;
      for (v = 0, len8 = ref13.length; v < len8; v++) {
        storage = ref13[v];
        for (x = 0, len9 = storage.length; x < len9; x++) {
          value = storage[x];
          flattened.push(value);
        }
      }
      o.storageBuffer = flattened;
    }
    o.thangs = (function() {
      var len10, ref14, ref15, results, y;
      ref15 = this.thangs.concat((ref14 = this.extraneousThangs) != null ? ref14 : []);
      results = [];
      for (y = 0, len10 = ref15.length; y < len10; y++) {
        t = ref15[y];
        results.push(t.serialize());
      }
      return results;
    }).call(this);
    o.scriptNotes = (function() {
      var len10, ref14, results, y;
      ref14 = this.scriptNotes;
      results = [];
      for (y = 0, len10 = ref14.length; y < len10; y++) {
        sn = ref14[y];
        results.push(sn.serialize());
      }
      return results;
    }).call(this);
    if (o.scriptNotes.length > 200) {
      console.log('Whoa, serializing a lot of WorldScriptNotes here:', o.scriptNotes.length);
    }
    if (!this.ended) {
      this.freeMemoryAfterEachSerialization();
    }
    return {
      serializedWorld: o,
      transferableObjects: [o.storageBuffer],
      startFrame: startFrame,
      endFrame: endFrame
    };
  };

  World.deserialize = function(o, classMap, oldSerializedWorldFrames, finishedWorldCallback, startFrame, endFrame, level, streamingWorld) {
    var aetherStateKey, base, base1, clearTo, i, j, k, l, len, len1, len2, len3, len4, len5, m, methodName, methods, nFrames, p, perf, prop, propIndex, q, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, serializedAether, sn, storage, thang, thangConfig, thangID, thangIndex, trackedPropertiesValues, trackedPropertiesValuesOffsets, trackedPropertyTypes, type, val, w;
    perf = {};
    perf.t0 = now();
    nFrames = endFrame - startFrame;
    if (streamingWorld) {
      w = streamingWorld;
      ref1 = o.userCodeMap;
      for (thangID in ref1) {
        methods = ref1[thangID];
        for (methodName in methods) {
          serializedAether = methods[methodName];
          ref2 = ['flow', 'metrics', 'style', 'problems'];
          for (j = 0, len = ref2.length; j < len; j++) {
            aetherStateKey = ref2[j];
            if ((base = w.userCodeMap)[thangID] == null) {
              base[thangID] = {};
            }
            if ((base1 = w.userCodeMap[thangID])[methodName] == null) {
              base1[methodName] = {};
            }
            w.userCodeMap[thangID][methodName][aetherStateKey] = serializedAether[aetherStateKey];
          }
        }
      }
    } else {
      w = new World(o.userCodeMap, classMap);
    }
    ref4 = [o.totalFrames, o.maxTotalFrames, o.frameRate, o.dt, (ref3 = o.scriptNotes) != null ? ref3 : [], o.victory, o.flagHistory, o.difficulty, o.scores, o.randomSeed, o.picoCTFFlag], w.totalFrames = ref4[0], w.maxTotalFrames = ref4[1], w.frameRate = ref4[2], w.dt = ref4[3], w.scriptNotes = ref4[4], w.victory = ref4[5], w.flagHistory = ref4[6], w.difficulty = ref4[7], w.scores = ref4[8], w.randomSeed = ref4[9], w.picoCTFFlag = ref4[10];
    ref5 = o.trackedProperties;
    for (prop in ref5) {
      val = ref5[prop];
      w[prop] = val;
    }
    perf.t1 = now();
    if (w.thangs.length) {
      ref6 = o.thangs;
      for (k = 0, len1 = ref6.length; k < len1; k++) {
        thangConfig = ref6[k];
        if (thang = w.thangMap[thangConfig.id]) {
          ref7 = thangConfig.finalState;
          for (prop in ref7) {
            val = ref7[prop];
            thang[prop] = val;
          }
        } else {
          w.thangs.push(thang = Thang.deserialize(thangConfig, w, classMap, level.levelComponents));
          w.setThang(thang);
        }
      }
    } else {
      w.thangs = (function() {
        var l, len2, ref8, results;
        ref8 = o.thangs;
        results = [];
        for (l = 0, len2 = ref8.length; l < len2; l++) {
          thang = ref8[l];
          results.push(Thang.deserialize(thang, w, classMap, level.levelComponents));
        }
        return results;
      })();
      ref8 = w.thangs;
      for (l = 0, len2 = ref8.length; l < len2; l++) {
        thang = ref8[l];
        w.setThang(thang);
      }
    }
    w.scriptNotes = (function() {
      var len3, m, ref9, results;
      ref9 = o.scriptNotes;
      results = [];
      for (m = 0, len3 = ref9.length; m < len3; m++) {
        sn = ref9[m];
        results.push(WorldScriptNote.deserialize(sn, w, classMap));
      }
      return results;
    })();
    perf.t2 = now();
    o.trackedPropertiesThangs = (function() {
      var len3, m, ref9, results;
      ref9 = o.trackedPropertiesThangIDs;
      results = [];
      for (m = 0, len3 = ref9.length; m < len3; m++) {
        thangID = ref9[m];
        results.push(w.getThangByID(thangID));
      }
      return results;
    })();
    o.trackedPropertiesPerThangValues = [];
    ref9 = o.trackedPropertiesPerThangTypes;
    for (thangIndex = m = 0, len3 = ref9.length; m < len3; thangIndex = ++m) {
      trackedPropertyTypes = ref9[thangIndex];
      o.trackedPropertiesPerThangValues.push((trackedPropertiesValues = []));
      trackedPropertiesValuesOffsets = o.trackedPropertiesPerThangValuesOffsets[thangIndex];
      for (propIndex = p = 0, len4 = trackedPropertyTypes.length; p < len4; propIndex = ++p) {
        type = trackedPropertyTypes[propIndex];
        storage = ThangState.createArrayForType(type, nFrames, o.storageBuffer, trackedPropertiesValuesOffsets[propIndex])[0];
        if (!typedArraySupport) {
          i = trackedPropertiesValuesOffsets[propIndex];
          storage = o.storageBuffer.slice(i, i + storage.length);
        }
        trackedPropertiesValues.push(storage);
      }
    }
    perf.t3 = now();
    perf.batches = 0;
    perf.framesCPUTime = 0;
    if (!streamingWorld) {
      w.frames = [];
    }
    if (this.deserializationTimeout) {
      clearTimeout(this.deserializationTimeout);
    }
    if (w.indefiniteLength) {
      clearTo = Math.max(w.frames.length - 100, 0);
      if (clearTo > w.framesClearedSoFar) {
        ref10 = _.range(w.framesClearedSoFar, clearTo);
        for (q = 0, len5 = ref10.length; q < len5; q++) {
          i = ref10[q];
          w.frames[i] = null;
        }
      }
      w.framesClearedSoFar = clearTo;
    }
    this.deserializationTimeout = _.delay(this.deserializeSomeFrames, 1, o, w, finishedWorldCallback, perf, startFrame, endFrame);
    return w;
  };

  World.deserializeSomeFrames = function(o, w, finishedWorldCallback, perf, startFrame, endFrame) {
    var elapsed, frameIndex, j, ref1, ref2, startTime;
    ++perf.batches;
    startTime = now();
    for (frameIndex = j = ref1 = w.frames.length, ref2 = endFrame; ref1 <= ref2 ? j < ref2 : j > ref2; frameIndex = ref1 <= ref2 ? ++j : --j) {
      w.frames.push(WorldFrame.deserialize(w, frameIndex - startFrame, o.trackedPropertiesThangIDs, o.trackedPropertiesThangs, o.trackedPropertiesPerThangKeys, o.trackedPropertiesPerThangTypes, o.trackedPropertiesPerThangValues, o.specialKeysToValues, o.frameHashes[frameIndex - startFrame], w.dt * frameIndex));
      elapsed = now() - startTime;
      if (elapsed > DESERIALIZATION_INTERVAL && frameIndex < endFrame - 1) {
        perf.framesCPUTime += elapsed;
        World.deserializationTimeout = _.delay(World.deserializeSomeFrames, 1, o, w, finishedWorldCallback, perf, startFrame, endFrame);
        return;
      }
    }
    World.deserializationTimeout = null;
    perf.framesCPUTime += elapsed;
    return World.finishDeserializing(w, finishedWorldCallback, perf, startFrame, endFrame);
  };

  World.finishDeserializing = function(w, finishedWorldCallback, perf, startFrame, endFrame) {
    var nFrames, totalCPUTime;
    perf.t4 = now();
    w.ended = true;
    nFrames = endFrame - startFrame;
    totalCPUTime = perf.t3 - perf.t0 + perf.framesCPUTime;
    if (false) {
      console.log('  Deserializing--constructing new World:', (perf.t1 - perf.t0).toFixed(2) + 'ms');
      console.log('  Deserializing--Thangs and ScriptNotes:', (perf.t2 - perf.t1).toFixed(2) + 'ms');
      console.log('  Deserializing--reallocating memory:', (perf.t3 - perf.t2).toFixed(2) + 'ms');
      console.log('  Deserializing--WorldFrames:', (perf.t4 - perf.t3).toFixed(2) + 'ms wall clock time,', perf.framesCPUTime.toFixed(2) + 'ms CPU time');
    }
    return finishedWorldCallback(w);
  };

  World.prototype.findFirstChangedFrame = function(oldWorld) {
    var firstChangedFrame, i, j, len, newFrame, oldFrame, ref1, ref2;
    if (!oldWorld) {
      return 0;
    }
    ref1 = this.frames;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      newFrame = ref1[i];
      oldFrame = oldWorld.frames[i];
      if (!(oldFrame && ((newFrame.hash === oldFrame.hash) || (newFrame.hash == null) || (oldFrame.hash == null)))) {
        break;
      }
    }
    firstChangedFrame = i;
    if (this.frames.length === this.totalFrames) {
      if (this.frames[i]) {
        console.log('First changed frame is', firstChangedFrame, 'with hash', this.frames[i].hash, 'compared to', (ref2 = oldWorld.frames[i]) != null ? ref2.hash : void 0);
      } else {
        console.log('No frames were changed out of all', this.frames.length);
      }
    }
    return firstChangedFrame;
  };

  World.prototype.freeMemoryBeforeFinalSerialization = function() {
    this.levelComponents = null;
    return this.thangTypes = null;
  };

  World.prototype.freeMemoryAfterEachSerialization = function() {
    var frame, i, j, len, ref1, results;
    ref1 = this.frames;
    results = [];
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      frame = ref1[i];
      if (i < this.frames.length - 1) {
        results.push(this.frames[i] = null);
      }
    }
    return results;
  };

  World.prototype.pointsForThang = function(thangID, camera) {
    var allPoints, cacheKey, frame, frameIndex, j, lastFrameIndex, lastPos, pos, ref1, ref2;
    if (camera == null) {
      camera = null;
    }
    if (this.pointsForThangCache == null) {
      this.pointsForThangCache = {};
    }
    cacheKey = thangID;
    allPoints = this.pointsForThangCache[cacheKey];
    if (!allPoints) {
      allPoints = [];
      lastFrameIndex = this.frames.length - 1;
      lastPos = {
        x: null,
        y: null
      };
      for (frameIndex = j = ref1 = lastFrameIndex; j >= 0; frameIndex = j += -1) {
        frame = this.frames[frameIndex];
        if (!frame) {
          continue;
        }
        if (pos = (ref2 = frame.thangStateMap[thangID]) != null ? ref2.getStateForProp('pos') : void 0) {
          if (camera) {
            pos = camera.worldToSurface({
              x: pos.x,
              y: pos.y
            });
          }
          if ((lastPos.x == null) || (Math.abs(lastPos.x - pos.x) + Math.abs(lastPos.y - pos.y)) > 1) {
            lastPos = pos;
          }
        }
        if (!(lastPos.y === 0 && lastPos.x === 0)) {
          allPoints.push(lastPos.y, lastPos.x);
        }
      }
      allPoints.reverse();
      this.pointsForThangCache[cacheKey] = allPoints;
    }
    return allPoints;
  };

  World.prototype.actionsForThang = function(thangID, keepIdle) {
    var action, actions, cacheKey, cached, frame, i, j, lastAction, len, state, states;
    if (keepIdle == null) {
      keepIdle = false;
    }
    if (this.actionsForThangCache == null) {
      this.actionsForThangCache = {};
    }
    cacheKey = thangID + '_' + Boolean(keepIdle);
    cached = this.actionsForThangCache[cacheKey];
    if (cached) {
      return cached;
    }
    states = (function() {
      var j, len, ref1, results;
      ref1 = this.frames;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        frame = ref1[j];
        results.push(frame.thangStateMap[thangID]);
      }
      return results;
    }).call(this);
    actions = [];
    lastAction = '';
    for (i = j = 0, len = states.length; j < len; i = ++j) {
      state = states[i];
      action = state != null ? state.getStateForProp('action') : void 0;
      if (!(action && (action !== lastAction || state.actionActivated))) {
        continue;
      }
      if (!(state.action !== 'idle' || keepIdle)) {
        continue;
      }
      actions.push({
        frame: i,
        pos: state.pos,
        name: action
      });
      lastAction = action;
    }
    this.actionsForThangCache[cacheKey] = actions;
    return actions;
  };

  World.prototype.getTeamColors = function() {
    var colorConfigs, config, teamConfigs, teamName;
    teamConfigs = this.teamConfigs || {};
    colorConfigs = {};
    for (teamName in teamConfigs) {
      config = teamConfigs[teamName];
      colorConfigs[teamName] = config.color;
    }
    return colorConfigs;
  };

  World.prototype.teamForPlayer = function(n) {
    var playableTeams, ref1;
    playableTeams = (ref1 = this.playableTeams) != null ? ref1 : ['humans'];
    return playableTeams[n % playableTeams.length];
  };

  World.prototype.getScores = function() {
    var ref1, ref2, ref3, ref4;
    return {
      time: this.age,
      'damage-taken': (ref1 = this.getSystem('Combat')) != null ? ref1.damageTakenForTeam('humans') : void 0,
      'damage-dealt': (ref2 = this.getSystem('Combat')) != null ? ref2.damageDealtForTeam('humans') : void 0,
      'gold-collected': (ref3 = this.getSystem('Inventory')) != null ? (ref4 = ref3.teamGold.humans) != null ? ref4.collected : void 0 : void 0,
      'difficulty': this.difficulty
    };
  };

  return World;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/world.js.map
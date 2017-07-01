require.register("lib/Angel", function(exports, require, module) {
var Angel, CocoClass, GoalManager, World, errors, now, reportedLoadErrorAlready, sendContactMessage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

now = require('lib/world/world_utils').now;

World = require('lib/world/world');

CocoClass = require('core/CocoClass');

GoalManager = require('lib/world/GoalManager');

sendContactMessage = require('core/contact').sendContactMessage;

errors = require('core/errors');

reportedLoadErrorAlready = false;

module.exports = Angel = (function(superClass) {
  extend(Angel, superClass);

  Angel.nicks = ['Archer', 'Lana', 'Cyril', 'Pam', 'Cheryl', 'Woodhouse', 'Ray', 'Krieger'];

  Angel.prototype.infiniteLoopIntervalDuration = 10000;

  Angel.prototype.infiniteLoopTimeoutDuration = 7500;

  Angel.prototype.abortTimeoutDuration = 500;

  Angel.prototype.subscriptions = {
    'level:flag-updated': 'onFlagEvent',
    'playback:stop-real-time-playback': 'onStopRealTimePlayback',
    'level:escape-pressed': 'onEscapePressed'
  };

  function Angel(shared) {
    var isIE, slowerSimulations;
    this.shared = shared;
    this.simulateSync = bind(this.simulateSync, this);
    this.fireWorker = bind(this.fireWorker, this);
    this.infinitelyLooped = bind(this.infinitelyLooped, this);
    this.onWorkerMessage = bind(this.onWorkerMessage, this);
    this.testWorker = bind(this.testWorker, this);
    Angel.__super__.constructor.call(this);
    this.say('Got my wings.');
    isIE = window.navigator && (window.navigator.userAgent.search('MSIE') !== -1 || window.navigator.appName === 'Microsoft Internet Explorer');
    slowerSimulations = isIE;
    if (slowerSimulations) {
      this.infiniteLoopIntervalDuration *= 10;
      this.infiniteLoopTimeoutDuration *= 10;
      this.abortTimeoutDuration *= 10;
    }
    this.initialized = false;
    this.running = false;
    this.allLogs = [];
    this.hireWorker();
    this.shared.angels.push(this);
    this.listenTo(this.shared.gameUIState.get('realTimeInputEvents'), 'add', this.onAddRealTimeInputEvent);
  }

  Angel.prototype.destroy = function() {
    this.fireWorker(false);
    _.remove(this.shared.angels, this);
    return Angel.__super__.destroy.call(this);
  };

  Angel.prototype.workIfIdle = function() {
    if (!this.running) {
      return this.doWork();
    }
  };

  Angel.prototype.say = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  };

  Angel.prototype.log = function() {
    var arg, j, len, message;
    message = "|" + this.shared.godNick + "'s " + this.nick + "|";
    for (j = 0, len = arguments.length; j < len; j++) {
      arg = arguments[j];
      message += " " + arg;
    }
    console.info(message);
    return this.allLogs.push(message);
  };

  Angel.prototype.testWorker = function() {
    if (this.destroyed) {
      return;
    }
    clearTimeout(this.condemnTimeout);
    this.condemnTimeout = _.delay(this.infinitelyLooped, this.infiniteLoopTimeoutDuration);
    this.say('Let\'s give it', this.infiniteLoopTimeoutDuration, 'to not loop.');
    return this.worker.postMessage({
      func: 'reportIn'
    });
  };

  Angel.prototype.onWorkerMessage = function(event) {
    var deserializationArgs, progress;
    if (this.aborting && event.data.type !== 'abort') {
      return this.say('Currently aborting old work.');
    }
    switch (event.data.type) {
      case 'worker-initialized':
        if (!this.initialized) {
          this.log("Worker initialized after " + ((new Date()) - this.worker.creationTime) + "ms");
          this.initialized = true;
          return this.doWork();
        }
        break;
      case 'start-load-frames':
        return clearTimeout(this.condemnTimeout);
      case 'report-in':
        this.say('Worker reported in.');
        return clearTimeout(this.condemnTimeout);
      case 'end-load-frames':
        clearTimeout(this.condemnTimeout);
        return this.beholdGoalStates({
          goalStates: event.data.goalStates,
          overallStatus: event.data.overallStatus,
          preload: false,
          totalFrames: event.data.totalFrames,
          lastFrameHash: event.data.lastFrameHash,
          simulationFrameRate: event.data.simulationFrameRate
        });
      case 'end-preload-frames':
        clearTimeout(this.condemnTimeout);
        return this.beholdGoalStates({
          goalStates: event.data.goalStates,
          overallStatus: event.data.overallStatus,
          preload: true,
          simulationFrameRate: event.data.simulationFrameRate
        });
      case 'non-user-code-problem':
        this.publishGodEvent('non-user-code-problem', {
          problem: event.data.problem
        });
        if (this.shared.firstWorld) {
          return this.infinitelyLooped(false, true);
        } else {
          return this.fireWorker();
        }
        break;
      case 'abort':
        this.say('Aborted.', event.data);
        clearTimeout(this.abortTimeout);
        this.aborting = false;
        this.running = false;
        _.remove(this.shared.busyAngels, this);
        return this.doWork();
      case 'console-log':
        return this.log.apply(this, event.data.args);
      case 'user-code-problem':
        return this.publishGodEvent('user-code-problem', {
          problem: event.data.problem
        });
      case 'world-load-progress-changed':
        progress = event.data.progress;
        if (this.work.indefiniteLength) {
          progress = Math.min(progress, 0.9);
        }
        this.publishGodEvent('world-load-progress-changed', {
          progress: progress
        });
        if (!(event.data.progress === 1 || this.work.preload || this.work.headless || this.work.synchronous || this.deserializationQueue.length || (this.shared.firstWorld && !this.shared.spectate))) {
          return this.worker.postMessage({
            func: 'serializeFramesSoFar'
          });
        }
        break;
      case 'some-frames-serialized':
      case 'new-world':
        deserializationArgs = [event.data.serialized, event.data.goalStates, event.data.startFrame, event.data.endFrame, this.streamingWorld];
        this.deserializationQueue.push(deserializationArgs);
        if (this.deserializationQueue.length === 1) {
          return this.beholdWorld.apply(this, deserializationArgs);
        }
        break;
      default:
        return this.log('Received unsupported message:', event.data);
    }
  };

  Angel.prototype.beholdGoalStates = function(arg1) {
    var event, goalStates, lastFrameHash, overallStatus, preload, simulationFrameRate, totalFrames;
    goalStates = arg1.goalStates, overallStatus = arg1.overallStatus, preload = arg1.preload, totalFrames = arg1.totalFrames, lastFrameHash = arg1.lastFrameHash, simulationFrameRate = arg1.simulationFrameRate;
    if (this.aborting) {
      return;
    }
    event = {
      goalStates: goalStates,
      preload: preload != null ? preload : false,
      overallStatus: overallStatus
    };
    if (totalFrames != null) {
      event.totalFrames = totalFrames;
    }
    if (lastFrameHash != null) {
      event.lastFrameHash = lastFrameHash;
    }
    if (simulationFrameRate != null) {
      event.simulationFrameRate = simulationFrameRate;
    }
    this.publishGodEvent('goals-calculated', event);
    if (this.shared.headless) {
      return this.finishWork();
    }
  };

  Angel.prototype.beholdWorld = function(serialized, goalStates, startFrame, endFrame, streamingWorld) {
    if (this.aborting) {
      return;
    }
    window.BOX2D_ENABLED = false;
    if (streamingWorld != null) {
      streamingWorld.indefiniteLength = this.work.indefiniteLength;
    }
    this.streamingWorld = World.deserialize(serialized, this.shared.worldClassMap, this.shared.lastSerializedWorldFrames, this.finishBeholdingWorld(goalStates), startFrame, endFrame, this.work.level, streamingWorld);
    window.BOX2D_ENABLED = true;
    return this.shared.lastSerializedWorldFrames = serialized.frames;
  };

  Angel.prototype.finishBeholdingWorld = function(goalStates) {
    return (function(_this) {
      return function(world) {
        var deserializationArgs, eventType, finished, firstChangedFrame, j, len, ref, ref1, ref2, ref3, scriptNote;
        if (_this.aborting || _this.destroyed) {
          return;
        }
        finished = world.frames.length === world.totalFrames;
        if (((ref = _this.work) != null ? ref.indefiniteLength : void 0) && (world.victory != null)) {
          finished = true;
          world.totalFrames = world.frames.length;
        }
        firstChangedFrame = ((ref1 = _this.work) != null ? ref1.indefiniteLength : void 0) ? 0 : world.findFirstChangedFrame(_this.shared.world);
        eventType = finished ? 'new-world-created' : 'streaming-world-updated';
        if (finished) {
          _this.shared.world = world;
        }
        _this.publishGodEvent(eventType, {
          world: world,
          firstWorld: _this.shared.firstWorld,
          goalStates: goalStates,
          team: me.team,
          firstChangedFrame: firstChangedFrame,
          finished: finished
        });
        if (finished) {
          ref2 = _this.shared.world.scriptNotes;
          for (j = 0, len = ref2.length; j < len; j++) {
            scriptNote = ref2[j];
            Backbone.Mediator.publish(scriptNote.channel, scriptNote.event);
          }
          if ((ref3 = _this.shared.goalManager) != null) {
            ref3.world = world;
          }
          return _this.finishWork();
        } else {
          _this.deserializationQueue.shift();
          if (deserializationArgs = _this.deserializationQueue[0]) {
            return _this.beholdWorld.apply(_this, deserializationArgs);
          }
        }
      };
    })(this);
  };

  Angel.prototype.finishWork = function() {
    this.streamingWorld = null;
    this.shared.firstWorld = false;
    this.deserializationQueue = [];
    this.running = false;
    _.remove(this.shared.busyAngels, this);
    clearTimeout(this.condemnTimeout);
    clearInterval(this.purgatoryTimer);
    this.condemnTimeout = this.purgatoryTimer = null;
    return this.doWork();
  };

  Angel.prototype.finalizePreload = function() {
    this.say('Finalize preload.');
    this.worker.postMessage({
      func: 'finalizePreload'
    });
    return this.work.preload = false;
  };

  Angel.prototype.infinitelyLooped = function(escaped, nonUserCodeProblem) {
    var problem;
    if (escaped == null) {
      escaped = false;
    }
    if (nonUserCodeProblem == null) {
      nonUserCodeProblem = false;
    }
    this.say('On infinitely looped! Aborting?', this.aborting);
    if (this.aborting) {
      return;
    }
    problem = {
      type: 'runtime',
      level: 'error',
      id: 'runtime_InfiniteLoop',
      message: 'Code never finished. It\'s either really slow or has an infinite loop.'
    };
    if (escaped) {
      problem.message = 'Escape pressed; code aborted.';
    }
    this.publishGodEvent('user-code-problem', {
      problem: problem
    });
    this.publishGodEvent('infinite-loop', {
      firstWorld: this.shared.firstWorld,
      nonUserCodeProblem: nonUserCodeProblem
    });
    if (nonUserCodeProblem) {
      this.reportLoadError();
    }
    return this.fireWorker();
  };

  Angel.prototype.publishGodEvent = function(channel, e) {
    this.shared.god.trigger(channel, e);
    e.god = this.shared.god;
    return Backbone.Mediator.publish('god:' + channel, e);
  };

  Angel.prototype.reportLoadError = function() {
    var context, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    if (me.isAdmin() || /dev=true/.test((ref = (ref1 = window.location) != null ? ref1.href : void 0) != null ? ref : '') || reportedLoadErrorAlready) {
      return;
    }
    reportedLoadErrorAlready = true;
    context = {
      email: me.get('email')
    };
    context.message = "Automatic Report - Unable to Load Level\nLogs:\n" + this.allLogs.join('\n');
    if ($.browser) {
      context.browser = $.browser.platform + " " + $.browser.name + " " + $.browser.versionNumber;
    }
    context.screenSize = ((ref2 = typeof screen !== "undefined" && screen !== null ? screen.width : void 0) != null ? ref2 : $(window).width()) + " x " + ((ref3 = typeof screen !== "undefined" && screen !== null ? screen.height : void 0) != null ? ref3 : $(window).height());
    context.subject = "Level Load Error: " + (((ref4 = this.work) != null ? (ref5 = ref4.level) != null ? ref5.name : void 0 : void 0) || 'Unknown Level');
    context.levelSlug = (ref6 = this.work) != null ? (ref7 = ref6.level) != null ? ref7.slug : void 0 : void 0;
    return sendContactMessage(context);
  };

  Angel.prototype.doWork = function() {
    if (this.aborting) {
      return;
    }
    if (!this.initialized) {
      return this.say('Not initialized for work yet.');
    }
    if (this.shared.workQueue.length) {
      this.work = this.shared.workQueue.shift();
      if (this.work.synchronous) {
        return _.defer(this.simulateSync, this.work);
      }
      this.say('Running world...');
      this.running = true;
      this.shared.busyAngels.push(this);
      this.deserializationQueue = [];
      this.worker.postMessage({
        func: 'runWorld',
        args: this.work
      });
      clearTimeout(this.purgatoryTimer);
      this.say('Infinite loop timer started at interval of', this.infiniteLoopIntervalDuration);
      return this.purgatoryTimer = setInterval(this.testWorker, this.infiniteLoopIntervalDuration);
    } else {
      this.say('No work to do.');
      return this.hireWorker();
    }
  };

  Angel.prototype.abort = function() {
    if (!(this.worker && this.running)) {
      return;
    }
    this.say('Aborting...');
    this.running = false;
    this.work = null;
    this.streamingWorld = null;
    this.deserializationQueue = [];
    _.remove(this.shared.busyAngels, this);
    this.abortTimeout = _.delay(this.fireWorker, this.abortTimeoutDuration);
    this.aborting = true;
    return this.worker.postMessage({
      func: 'abort'
    });
  };

  Angel.prototype.fireWorker = function(rehire) {
    var ref, ref1;
    if (rehire == null) {
      rehire = true;
    }
    if (this.destroyed) {
      return;
    }
    this.aborting = false;
    this.running = false;
    _.remove(this.shared.busyAngels, this);
    if ((ref = this.worker) != null) {
      ref.removeEventListener('message', this.onWorkerMessage);
    }
    if ((ref1 = this.worker) != null) {
      ref1.terminate();
    }
    this.worker = null;
    clearTimeout(this.condemnTimeout);
    clearInterval(this.purgatoryTimer);
    this.say('Fired worker.');
    this.initialized = false;
    this.work = null;
    this.streamingWorld = null;
    this.deserializationQueue = [];
    if (rehire) {
      return this.hireWorker();
    }
  };

  Angel.prototype.hireWorker = function() {
    if (typeof Worker === "undefined" || Worker === null) {
      if (!this.initialized) {
        this.initialized = true;
        this.doWork();
      }
      return null;
    }
    if (this.worker) {
      return;
    }
    this.say('Hiring worker.');
    this.worker = new Worker(this.shared.workerCode);
    this.worker.addEventListener('error', errors.onWorkerError);
    this.worker.addEventListener('message', this.onWorkerMessage);
    return this.worker.creationTime = new Date();
  };

  Angel.prototype.onFlagEvent = function(e) {
    if (!(this.running && this.work.realTime)) {
      return;
    }
    return this.worker.postMessage({
      func: 'addFlagEvent',
      args: e
    });
  };

  Angel.prototype.onAddRealTimeInputEvent = function(realTimeInputEvent) {
    if (!(this.running && this.work.realTime)) {
      return;
    }
    return this.worker.postMessage({
      func: 'addRealTimeInputEvent',
      args: realTimeInputEvent.toJSON()
    });
  };

  Angel.prototype.onStopRealTimePlayback = function(e) {
    if (!(this.running && this.work.realTime)) {
      return;
    }
    this.work.realTime = false;
    this.lastRealTimeWork = new Date();
    return this.worker.postMessage({
      func: 'stopRealTimePlayback'
    });
  };

  Angel.prototype.onEscapePressed = function(e) {
    if (!(this.running && !this.work.realTime)) {
      return;
    }
    if ((new Date() - this.lastRealTimeWork) < 1000) {
      return;
    }
    return this.infinitelyLooped(true);
  };

  Angel.prototype.simulateSync = function(work) {
    var goalStates, ref, ref1, serialized, simulationFrameRate, testGM, testWorld;
    if (typeof imitateIE9 !== "undefined" && imitateIE9 !== null) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.profile === "function") {
          console.profile("World Generation " + ((Math.random() * 1000).toFixed(0)));
        }
      }
    }
    work.t0 = now();
    work.world = testWorld = new World(work.userCodeMap);
    work.world.levelSessionIDs = work.levelSessionIDs;
    work.world.submissionCount = work.submissionCount;
    work.world.fixedSeed = work.fixedSeed;
    work.world.flagHistory = (ref = work.flagHistory) != null ? ref : [];
    work.world.difficulty = work.difficulty;
    work.world.loadFromLevel(work.level);
    work.world.preloading = work.preload;
    work.world.headless = work.headless;
    work.world.realTime = work.realTime;
    if (this.shared.goalManager) {
      testGM = new GoalManager(testWorld);
      testGM.setGoals(work.goals);
      testGM.setCode(work.userCodeMap);
      testGM.worldGenerationWillBegin();
      testWorld.setGoalManager(testGM);
    }
    this.doSimulateWorld(work);
    if (typeof imitateIE9 !== "undefined" && imitateIE9 !== null) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.profileEnd === "function") {
          console.profileEnd();
        }
      }
    }
    console.log('Construction:', (work.t1 - work.t0).toFixed(0), 'ms. Simulation:', (work.t2 - work.t1).toFixed(0), 'ms --', ((work.t2 - work.t1) / testWorld.frames.length).toFixed(3), 'ms per frame, profiled.');
    goalStates = testGM != null ? testGM.getGoalStates() : void 0;
    if (work.world.ended) {
      work.world.goalManager.worldGenerationEnded();
    }
    if (work.headless) {
      simulationFrameRate = work.world.frames.length / (work.t2 - work.t1) * 1000 * 30 / work.world.frameRate;
      this.beholdGoalStates({
        goalStates: goalStates,
        overallStatus: testGM.checkOverallStatus(),
        preload: false,
        totalFrames: work.world.totalFrames,
        lastFrameHash: (ref1 = work.world.frames[work.world.totalFrames - 2]) != null ? ref1.hash : void 0,
        simulationFrameRate: simulationFrameRate
      });
      return;
    }
    serialized = world.serialize();
    window.BOX2D_ENABLED = false;
    World.deserialize(serialized.serializedWorld, this.shared.worldClassMap, this.shared.lastSerializedWorldFrames, this.finishBeholdingWorld(goalStates), serialized.startFrame, serialized.endFrame, work.level);
    window.BOX2D_ENABLED = true;
    return this.shared.lastSerializedWorldFrames = serialized.serializedWorld.frames;
  };

  Angel.prototype.doSimulateWorld = function(work) {
    var frame, i, j, key, len, ref, replacedLoDash, system, val;
    work.t1 = now();
    Math.random = work.world.rand.randf;
    Aether.replaceBuiltin('Math', Math);
    replacedLoDash = _.runInContext(window);
    for (key in replacedLoDash) {
      val = replacedLoDash[key];
      _[key] = replacedLoDash[key];
    }
    i = 0;
    while (i < work.world.totalFrames) {
      frame = work.world.getFrame(i++);
    }
    this.publishGodEvent('world-load-progress-changed', {
      progress: 1
    });
    work.world.ended = true;
    ref = work.world.systems;
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      system.finish(work.world.thangs);
    }
    return work.t2 = now();
  };

  return Angel;

})(CocoClass);
});

;require.register("lib/AudioPlayer", function(exports, require, module) {
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

;require.register("lib/Bus", function(exports, require, module) {
var Bus, CHAT_SIZE_LIMIT, CocoClass, me,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

CHAT_SIZE_LIMIT = 500;

module.exports = Bus = Bus = (function(superClass) {
  extend(Bus, superClass);

  Bus.prototype.joined = null;

  Bus.prototype.players = null;

  Bus.get = function(docName) {
    return this.getFromCache || new Bus(docName);
  };

  Bus.getFromCache = function(docName) {
    return Bus.activeBuses[docName];
  };

  Bus.activeBuses = {};

  Bus.fireHost = 'https://codecombat.firebaseio.com';

  function Bus(docName1) {
    this.docName = docName1;
    this.onPlayerChanged = bind(this.onPlayerChanged, this);
    this.onPlayerLeft = bind(this.onPlayerLeft, this);
    this.onPlayerJoined = bind(this.onPlayerJoined, this);
    this.onChatAdded = bind(this.onChatAdded, this);
    this.onFireOpen = bind(this.onFireOpen, this);
    Bus.__super__.constructor.call(this);
    this.players = {};
    Bus.activeBuses[this.docName] = this;
  }

  Bus.prototype.subscriptions = {
    'auth:me-synced': 'onMeSynced'
  };

  Bus.prototype.connect = function() {
    Backbone.Mediator.publish('bus:connecting', {
      bus: this
    });
    Firebase.goOnline();
    this.fireRef = new Firebase(Bus.fireHost + '/' + this.docName);
    return this.fireRef.once('value', this.onFireOpen);
  };

  Bus.prototype.onFireOpen = function(snapshot) {
    if (this.destroyed) {
      console.log("Leaving '" + this.docName + "' because class has been destroyed.");
      return;
    }
    this.init();
    return Backbone.Mediator.publish('bus:connected', {
      bus: this
    });
  };

  Bus.prototype.disconnect = function() {
    var ref, ref1, ref2, ref3;
    if ((ref = this.fireRef) != null) {
      ref.off();
    }
    this.fireRef = null;
    if ((ref1 = this.fireChatRef) != null) {
      ref1.off();
    }
    this.fireChatRef = null;
    if ((ref2 = this.firePlayersRef) != null) {
      ref2.off();
    }
    this.firePlayersRef = null;
    if ((ref3 = this.myConnection) != null) {
      ref3.off();
    }
    this.myConnection = null;
    this.joined = false;
    return Backbone.Mediator.publish('bus:disconnected', {
      bus: this
    });
  };

  Bus.prototype.init = function() {
    "Init happens when we're connected.";
    this.fireChatRef = this.fireRef.child('chat');
    this.firePlayersRef = this.fireRef.child('players');
    this.join();
    this.listenForChanges();
    return this.sendMessage('/me joined.', true);
  };

  Bus.prototype.join = function() {
    this.joined = true;
    this.myConnection = this.firePlayersRef.child(me.id);
    this.myConnection.set({
      id: me.id,
      name: me.get('name'),
      connected: true
    });
    this.onDisconnect = this.myConnection.child('connected').onDisconnect();
    return this.onDisconnect.set(false);
  };

  Bus.prototype.listenForChanges = function() {
    this.fireChatRef.limit(CHAT_SIZE_LIMIT).on('child_added', this.onChatAdded);
    this.firePlayersRef.on('child_added', this.onPlayerJoined);
    this.firePlayersRef.on('child_removed', this.onPlayerLeft);
    return this.firePlayersRef.on('child_changed', this.onPlayerChanged);
  };

  Bus.prototype.onChatAdded = function(snapshot) {
    return Backbone.Mediator.publish('bus:new-message', {
      message: snapshot.val(),
      bus: this
    });
  };

  Bus.prototype.onPlayerJoined = function(snapshot) {
    var player;
    player = snapshot.val();
    if (!player.connected) {
      return;
    }
    this.players[player.id] = player;
    return Backbone.Mediator.publish('bus:player-joined', {
      player: player,
      bus: this
    });
  };

  Bus.prototype.onPlayerLeft = function(snapshot) {
    var player, val;
    val = snapshot.val();
    if (!val) {
      return;
    }
    player = this.players[val.id];
    if (!player) {
      return;
    }
    delete this.players[player.id];
    return Backbone.Mediator.publish('bus:player-left', {
      player: player,
      bus: this
    });
  };

  Bus.prototype.onPlayerChanged = function(snapshot) {
    var player, ref, wasConnected;
    player = snapshot.val();
    wasConnected = (ref = this.players[player.id]) != null ? ref.connected : void 0;
    this.players[player.id] = player;
    if (wasConnected && !player.connected) {
      this.onPlayerLeft(snapshot);
    }
    if (player.connected && !wasConnected) {
      this.onPlayerJoined(snapshot);
    }
    return Backbone.Mediator.publish('bus:player-states-changed', {
      states: this.players,
      bus: this
    });
  };

  Bus.prototype.onMeSynced = function() {
    var ref;
    return (ref = this.myConnection) != null ? ref.child('name').set(me.get('name')) : void 0;
  };

  Bus.prototype.countPlayers = function() {
    return _.size(this.players);
  };

  Bus.prototype.onPoint = function() {
    var ids;
    ids = _.keys(this.players);
    ids.sort();
    return ids[0] === me.id;
  };

  Bus.prototype.sendSystemMessage = function(content) {
    return this.sendMessage(content, true);
  };

  Bus.prototype.sendMessage = function(content, system) {
    var MAX_MESSAGE_LENGTH, message;
    if (system == null) {
      system = false;
    }
    MAX_MESSAGE_LENGTH = 400;
    message = {
      content: content.slice(0, MAX_MESSAGE_LENGTH),
      authorName: me.displayName(),
      authorID: me.id,
      dateMade: new Date()
    };
    if (system) {
      message.system = system;
    }
    return this.fireChatRef.push(message);
  };

  Bus.prototype.destroy = function() {
    if (this.joined) {
      this.sendMessage('/me left.', true);
    }
    if (this.docName in Bus.activeBuses) {
      delete Bus.activeBuses[this.docName];
    }
    this.disconnect();
    return Bus.__super__.destroy.call(this);
  };

  return Bus;

})(CocoClass);
});

;require.register("lib/DefaultScripts", function(exports, require, module) {
module.exports = [
  {
    id: "Introduction",
    channel: "god:new-world-created",
    noteChain: [
      {
        name: "Set camera, start music.",
        surface: {
          focus: {
            bounds: [
              {
                x: 0,
                y: 0
              }, {
                x: 80,
                y: 68
              }
            ],
            target: "Hero Placeholder",
            zoom: 0.5
          }
        },
        sound: {
          music: {
            file: "/music/music_level_2",
            play: true
          }
        },
        script: {
          duration: 1
        },
        playback: {
          playing: false
        }
      }
    ]
  }
];
});

;require.register("lib/God", function(exports, require, module) {
var Angel, CocoClass, GameUIState, God, World, errors, imitateIE9, now,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

now = require('lib/world/world_utils').now;

World = require('lib/world/world');

CocoClass = require('core/CocoClass');

Angel = require('lib/Angel');

GameUIState = require('models/GameUIState');

errors = require('core/errors');

module.exports = God = (function(superClass) {
  extend(God, superClass);

  God.nicks = ['Athena', 'Baldr', 'Crom', 'Dagr', 'Eris', 'Freyja', 'Great Gish', 'Hades', 'Ishtar', 'Janus', 'Khronos', 'Loki', 'Marduk', 'Negafook', 'Odin', 'Poseidon', 'Quetzalcoatl', 'Ra', 'Shiva', 'Thor', 'Umvelinqangi', 'Týr', 'Vishnu', 'Wepwawet', 'Xipe Totec', 'Yahweh', 'Zeus', '上帝', 'Tiamat', '盘古', 'Phoebe', 'Artemis', 'Osiris', '嫦娥', 'Anhur', 'Teshub', 'Enlil', 'Perkele', 'Chaos', 'Hera', 'Iris', 'Theia', 'Uranus', 'Stribog', 'Sabazios', 'Izanagi', 'Ao', 'Tāwhirimātea', 'Tengri', 'Inmar', 'Torngarsuk', 'Centzonhuitznahua', 'Hunab Ku', 'Apollo', 'Helios', 'Thoth', 'Hyperion', 'Alectrona', 'Eos', 'Mitra', 'Saranyu', 'Freyr', 'Koyash', 'Atropos', 'Clotho', 'Lachesis', 'Tyche', 'Skuld', 'Urðr', 'Verðandi', 'Camaxtli', 'Huhetotl', 'Set', 'Anu', 'Allah', 'Anshar', 'Hermes', 'Lugh', 'Brigit', 'Manannan Mac Lir', 'Persephone', 'Mercury', 'Venus', 'Mars', 'Azrael', 'He-Man', 'Anansi', 'Issek', 'Mog', 'Kos', 'Amaterasu Omikami', 'Raijin', 'Susanowo', 'Blind Io', 'The Lady', 'Offler', 'Ptah', 'Anubis', 'Ereshkigal', 'Nergal', 'Thanatos', 'Macaria', 'Angelos', 'Erebus', 'Hecate', 'Hel', 'Orcus', 'Ishtar-Deela Nakh', 'Prometheus', 'Hephaestos', 'Sekhmet', 'Ares', 'Enyo', 'Otrera', 'Pele', 'Hadúr', 'Hachiman', 'Dayisun Tngri', 'Ullr', 'Lua', 'Minerva'];

  God.prototype.subscriptions = {
    'tome:cast-spells': 'onTomeCast',
    'tome:spell-debug-value-request': 'retrieveValueFromFrame',
    'god:new-world-created': 'onNewWorldCreated'
  };

  function God(options) {
    this.onDebugWorkerMessage = bind(this.onDebugWorkerMessage, this);
    this.retrieveValueFromFrame = bind(this.retrieveValueFromFrame, this);
    var angelCount, i, j, ref;
    if (options == null) {
      options = {};
    }
    this.retrieveValueFromFrame = _.throttle(this.retrieveValueFromFrame, 1000);
    if (this.gameUIState == null) {
      this.gameUIState = options.gameUIState || new GameUIState();
    }
    this.indefiniteLength = options.indefiniteLength || false;
    God.__super__.constructor.call(this);
    this.angelsShare = {
      workerCode: options.workerCode || '/javascripts/workers/worker_world.js',
      headless: options.headless,
      spectate: options.spectate,
      god: this,
      godNick: this.nick,
      gameUIState: this.gameUIState,
      workQueue: [],
      firstWorld: true,
      world: void 0,
      goalManager: void 0,
      worldClassMap: void 0,
      angels: [],
      busyAngels: []
    };
    if (options.maxAngels != null) {
      angelCount = options.maxAngels;
    } else if (window.application.isIPadApp) {
      angelCount = 1;
    } else {
      angelCount = 2;
    }
    for (i = j = 0, ref = angelCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      _.delay(((function(_this) {
        return function() {
          if (!_this.destroyed) {
            return new Angel(_this.angelsShare);
          }
        };
      })(this)), 250 * i);
    }
  }

  God.prototype.destroy = function() {
    var angel, j, len, ref, ref1, ref2, ref3;
    ref = this.angelsShare.angels.slice();
    for (j = 0, len = ref.length; j < len; j++) {
      angel = ref[j];
      angel.destroy();
    }
    if ((ref1 = this.angelsShare.goalManager) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.debugWorker) != null) {
      ref2.terminate();
    }
    if ((ref3 = this.debugWorker) != null) {
      ref3.removeEventListener('message', this.onDebugWorkerMessage);
    }
    return God.__super__.destroy.call(this);
  };

  God.prototype.setLevel = function(level) {
    this.level = level;
  };

  God.prototype.setLevelSessionIDs = function(levelSessionIDs) {
    this.levelSessionIDs = levelSessionIDs;
  };

  God.prototype.setGoalManager = function(goalManager) {
    var ref;
    if (this.angelsShare.goalManager !== goalManager) {
      if ((ref = this.angelsShare.goalManager) != null) {
        ref.destroy();
      }
    }
    return this.angelsShare.goalManager = goalManager;
  };

  God.prototype.setWorldClassMap = function(worldClassMap) {
    return this.angelsShare.worldClassMap = worldClassMap;
  };

  God.prototype.onTomeCast = function(e) {
    var flag;
    if (e.god !== this) {
      return;
    }
    this.lastSubmissionCount = e.submissionCount;
    this.lastFixedSeed = e.fixedSeed;
    this.lastFlagHistory = (function() {
      var j, len, ref, results;
      ref = e.flagHistory;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        flag = ref[j];
        if (flag.source !== 'code') {
          results.push(flag);
        }
      }
      return results;
    })();
    this.lastDifficulty = e.difficulty;
    return this.createWorld(e.spells, e.preload, e.realTime, e.justBegin);
  };

  God.prototype.createWorld = function(spells, preload, realTime, justBegin) {
    var angel, hadPreloader, isPreloading, j, k, len, len1, ref, ref1, ref2, userCodeMap, work;
    console.log(this.nick + ": Let there be light upon " + this.level.name + "! (preload: " + preload + ")");
    userCodeMap = this.getUserCodeMap(spells);
    hadPreloader = false;
    ref = this.angelsShare.busyAngels;
    for (j = 0, len = ref.length; j < len; j++) {
      angel = ref[j];
      isPreloading = angel.running && angel.work.preload && _.isEqual(angel.work.userCodeMap, userCodeMap, function(a, b) {
        if (((a != null ? a.raw : void 0) != null) && ((b != null ? b.raw : void 0) != null)) {
          return a.raw === b.raw;
        }
        return void 0;
      });
      if (!hadPreloader && isPreloading && !realTime) {
        angel.finalizePreload();
        hadPreloader = true;
      } else if (preload && angel.running && !angel.work.preload) {
        return;
      } else {
        angel.abort();
      }
    }
    if (hadPreloader) {
      return;
    }
    this.angelsShare.workQueue = [];
    work = {
      userCodeMap: userCodeMap,
      level: this.level,
      levelSessionIDs: this.levelSessionIDs,
      submissionCount: this.lastSubmissionCount,
      fixedSeed: this.lastFixedSeed,
      flagHistory: this.lastFlagHistory,
      difficulty: this.lastDifficulty,
      goals: (ref1 = this.angelsShare.goalManager) != null ? ref1.getGoals() : void 0,
      headless: this.angelsShare.headless,
      preload: preload,
      synchronous: typeof Worker === "undefined" || Worker === null,
      realTime: realTime,
      justBegin: justBegin,
      indefiniteLength: this.indefiniteLength && realTime
    };
    this.angelsShare.workQueue.push(work);
    ref2 = this.angelsShare.angels;
    for (k = 0, len1 = ref2.length; k < len1; k++) {
      angel = ref2[k];
      angel.workIfIdle();
    }
    return work;
  };

  God.prototype.getUserCodeMap = function(spells) {
    var name, spell, spellKey, userCodeMap;
    userCodeMap = {};
    for (spellKey in spells) {
      spell = spells[spellKey];
      (userCodeMap[name = spell.thang.thang.id] != null ? userCodeMap[name] : userCodeMap[name] = {})[spell.name] = spell.thang.aether.serialize();
    }
    return userCodeMap;
  };

  God.prototype.retrieveValueFromFrame = function(args) {
    var ref;
    if (this.destroyed) {
      return;
    }
    if (!(args.thangID && args.spellID && args.variableChain)) {
      return;
    }
    if (!this.currentUserCodeMap) {
      return console.error('Tried to retrieve debug value with no currentUserCodeMap');
    }
    if (this.debugWorker == null) {
      this.debugWorker = this.createDebugWorker();
    }
    if (args.frame == null) {
      args.frame = this.angelsShare.world.age / this.angelsShare.world.dt;
    }
    return this.debugWorker.postMessage({
      func: 'retrieveValueFromFrame',
      args: {
        userCodeMap: this.currentUserCodeMap,
        level: this.level,
        levelSessionIDs: this.levelSessionIDs,
        submissionCount: this.lastSubmissionCount,
        fixedSeed: this.fixedSeed,
        flagHistory: this.lastFlagHistory,
        difficulty: this.lastDifficulty,
        goals: (ref = this.goalManager) != null ? ref.getGoals() : void 0,
        frame: args.frame,
        currentThangID: args.thangID,
        currentSpellID: args.spellID,
        variableChain: args.variableChain
      }
    });
  };

  God.prototype.createDebugWorker = function() {
    var worker;
    worker = new Worker('/javascripts/workers/worker_world.js');
    worker.addEventListener('message', this.onDebugWorkerMessage);
    worker.addEventListener('error', errors.onWorkerError);
    return worker;
  };

  God.prototype.onDebugWorkerMessage = function(event) {
    switch (event.data.type) {
      case 'console-log':
        return console.log.apply(console, ["|" + this.nick + "'s debugger|"].concat(slice.call(event.data.args)));
      case 'debug-value-return':
        return Backbone.Mediator.publish('god:debug-value-return', event.data.serialized, {
          god: this
        });
      case 'debug-world-load-progress-changed':
        return Backbone.Mediator.publish('god:debug-world-load-progress-changed', {
          progress: event.data.progress,
          god: this
        });
    }
  };

  God.prototype.onNewWorldCreated = function(e) {
    return this.currentUserCodeMap = this.filterUserCodeMapWhenFromWorld(e.world.userCodeMap);
  };

  God.prototype.filterUserCodeMapWhenFromWorld = function(worldUserCodeMap) {
    var aether, newUserCodeMap, shallowFilteredObject, spellName, thang, thangName;
    newUserCodeMap = {};
    for (thangName in worldUserCodeMap) {
      thang = worldUserCodeMap[thangName];
      newUserCodeMap[thangName] = {};
      for (spellName in thang) {
        aether = thang[spellName];
        shallowFilteredObject = _.pick(aether, ['raw', 'pure', 'originalOptions']);
        newUserCodeMap[thangName][spellName] = _.cloneDeep(shallowFilteredObject);
        newUserCodeMap[thangName][spellName] = _.defaults(newUserCodeMap[thangName][spellName], {
          flow: {},
          metrics: {},
          problems: {
            errors: [],
            infos: [],
            warnings: []
          },
          style: {}
        });
      }
    }
    return newUserCodeMap;
  };

  return God;

})(CocoClass);

imitateIE9 = false;

if (imitateIE9) {
  window.Worker = null;
  window.Float32Array = null;
}
});

;require.register("lib/HtmlExtractor", function(exports, require, module) {
var dekuify, extractCssLines, extractCssSelectors, extractJQueryLines, extractSelectorsFromCss, extractSelectorsFromJS, extractStylesAndScripts, parseUserHtml, unwrapDekuNodes;

dekuify = function(elem) {
  var c;
  if (elem.type === 'text') {
    return elem.data;
  }
  if (elem.type === 'comment') {
    return null;
  }
  elem.attribs = _.omit(elem.attribs, function(val, attr) {
    return !attr.match(/^[^\s"'<>\\\/=]+$/);
  });
  if (!elem.name) {
    console.log('Failed to dekuify', elem);
    return elem.type;
  }
  return deku.element(elem.name, elem.attribs, (function() {
    var i, len, ref, ref1, results;
    ref1 = (ref = elem.children) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      c = ref1[i];
      results.push(dekuify(c));
    }
    return results;
  })());
};

unwrapDekuNodes = function(dekuNode) {
  var child;
  if (_.isString(dekuNode)) {
    return dekuNode;
  }
  if (_.isArray(dekuNode)) {
    return _.filter(_.flatten((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = dekuNode.length; i < len; i++) {
        child = dekuNode[i];
        results.push(unwrapDekuNodes(child));
      }
      return results;
    })()));
  } else {
    return _.filter(_.flatten([
      dekuNode.nodeValue, (function() {
        var i, len, ref, results;
        ref = dekuNode.children || [];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(unwrapDekuNodes(child));
        }
        return results;
      })()
    ]));
  }
};

parseUserHtml = function(html) {
  var bodyNode, dom, htmlNode, ref, ref1;
  dom = htmlparser2.parseDOM(html, {});
  bodyNode = (ref = _.find(dom, {
    name: 'body'
  })) != null ? ref : {
    name: 'body',
    attribs: null,
    children: dom
  };
  htmlNode = (ref1 = _.find(dom, {
    name: 'html'
  })) != null ? ref1 : {
    name: 'html',
    attribs: null,
    children: [bodyNode]
  };
  return dekuify(htmlNode);
};

extractStylesAndScripts = function(html) {
  var dekuTree, recurse, ref, scripts, styles, virtualDom, wrappedScripts, wrappedStyles;
  dekuTree = parseUserHtml(html);
  recurse = function(dekuTree) {
    var childScripts, childStyles, ref;
    if (dekuTree.type === '#text') {
      return {
        virtualDom: dekuTree,
        styles: [],
        scripts: []
      };
    }
    if (dekuTree.type === 'style') {
      return {
        styles: [dekuTree],
        scripts: []
      };
    }
    if (dekuTree.type === 'script') {
      return {
        styles: [],
        scripts: [dekuTree]
      };
    }
    childStyles = [];
    childScripts = [];
    if ((ref = dekuTree.children) != null) {
      ref.forEach((function(_this) {
        return function(dekuChild, index) {
          var ref1, scripts, styles, virtualDom;
          ref1 = recurse(dekuChild), virtualDom = ref1.virtualDom, styles = ref1.styles, scripts = ref1.scripts;
          dekuTree.children[index] = virtualDom;
          childStyles = childStyles.concat(styles);
          return childScripts = childScripts.concat(scripts);
        };
      })(this));
    }
    dekuTree.children = _.filter(dekuTree.children);
    return {
      virtualDom: dekuTree,
      scripts: childScripts,
      styles: childStyles
    };
  };
  ref = recurse(dekuTree), virtualDom = ref.virtualDom, scripts = ref.scripts, styles = ref.styles;
  wrappedStyles = deku.element('head', {}, styles);
  wrappedScripts = deku.element('head', {}, scripts);
  return {
    virtualDom: virtualDom,
    scripts: wrappedScripts,
    styles: wrappedStyles
  };
};

extractCssSelectors = function(dekuStyles, dekuScripts) {
  var cssSelectors, jQuerySelectors;
  cssSelectors = extractSelectorsFromCss(dekuStyles);
  jQuerySelectors = extractSelectorsFromJS(dekuScripts);
  return cssSelectors.concat(jQuerySelectors);
};

extractSelectorsFromCss = function(styles) {
  var cssSelectors;
  styles = unwrapDekuNodes(styles);
  if (!_.isArray(styles)) {
    styles = [styles];
  }
  cssSelectors = _.flatten(styles.map(function(rawCss) {
    var e, error, parsedCss;
    try {
      parsedCss = parseCss(rawCss);
      return parsedCss.stylesheet.rules.map(function(rule) {
        return rule.selectors.join(', ').trim();
      });
    } catch (error) {
      e = error;
      return [];
    }
  }));
  return cssSelectors;
};

extractSelectorsFromJS = function(scripts) {
  var jQuerySelectors;
  scripts = unwrapDekuNodes(scripts);
  if (!_.isArray(scripts)) {
    scripts = [scripts];
  }
  jQuerySelectors = _.flatten(scripts.map(function(script) {
    return (script.match(/\$\(\s*['"](?!<)(.*?)(?!>)['"]\s*\)/g) || []).map(function(jQueryCall) {
      return jQueryCall.match(/\$\(\s*['"](?!<)(.*?)(?!>)['"]\s*\)/)[1];
    });
  }));
  return jQuerySelectors;
};

extractCssLines = function(dekuStyles) {
  var rawCssLines;
  rawCssLines = [];
  dekuStyles.children.forEach((function(_this) {
    return function(styleNode) {
      var rawCss;
      rawCss = styleNode.children[0].nodeValue;
      return rawCssLines = rawCssLines.concat(rawCss.split('\n'));
    };
  })(this));
  return rawCssLines;
};

extractJQueryLines = function(dekuScripts) {
  return _.flatten(dekuScripts.children.map(function(dekuScript) {
    var rawScript;
    rawScript = dekuScript.children[0].nodeValue;
    return _.filter(rawScript.split('\n').map(function(line) {
      return (line.match(/^.*\$\(\s*['"].*['"]\s*\).*$/g) || [])[0];
    }));
  }));
};

module.exports = {
  dekuify: dekuify,
  unwrapDekuNodes: unwrapDekuNodes,
  parseUserHtml: parseUserHtml,
  extractStylesAndScripts: extractStylesAndScripts,
  extractCssSelectors: extractCssSelectors,
  extractSelectorsFromCss: extractSelectorsFromCss,
  extractSelectorsFromJS: extractSelectorsFromJS,
  extractCssLines: extractCssLines,
  extractJQueryLines: extractJQueryLines
};
});

;require.register("lib/LevelBus", function(exports, require, module) {
var Bus, LevelBus, LevelSession, me, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Bus = require('./Bus');

me = require('core/auth').me;

LevelSession = require('models/LevelSession');

utils = require('core/utils');

module.exports = LevelBus = (function(superClass) {
  extend(LevelBus, superClass);

  LevelBus.get = function(levelID, sessionID) {
    var docName;
    docName = "play/level/" + levelID + "/" + sessionID;
    return Bus.getFromCache(docName) || new LevelBus(docName);
  };

  LevelBus.prototype.subscriptions = {
    'tome:editing-began': 'onEditingBegan',
    'tome:editing-ended': 'onEditingEnded',
    'script:state-changed': 'onScriptStateChanged',
    'script:ended': 'onScriptEnded',
    'script:reset': 'onScriptReset',
    'surface:sprite-selected': 'onSpriteSelected',
    'level:show-victory': 'onVictory',
    'tome:spell-changed': 'onSpellChanged',
    'tome:spell-created': 'onSpellCreated',
    'tome:cast-spells': 'onCastSpells',
    'tome:winnability-updated': 'onWinnabilityUpdated',
    'application:idle-changed': 'onIdleChanged',
    'goal-manager:new-goal-states': 'onNewGoalStates',
    'god:new-world-created': 'onNewWorldCreated'
  };

  function LevelBus() {
    this.onChatAdded = bind(this.onChatAdded, this);
    this.onPlayerJoined = bind(this.onPlayerJoined, this);
    this.onMeSynced = bind(this.onMeSynced, this);
    this.incrementSessionPlaytime = bind(this.incrementSessionPlaytime, this);
    var maxWait, ref, ref1, saveDelay, wait;
    LevelBus.__super__.constructor.apply(this, arguments);
    this.changedSessionProperties = {};
    saveDelay = (ref = window.serverConfig) != null ? ref.sessionSaveDelay : void 0;
    ref1 = (function() {
      switch (false) {
        case !(!application.isProduction || !saveDelay):
          return [1, 5];
        case !me.isAnonymous():
          return [saveDelay.anonymous.min, saveDelay.anonymous.max];
        default:
          return [saveDelay.registered.min, saveDelay.registered.max];
      }
    })(), wait = ref1[0], maxWait = ref1[1];
    this.saveSession = _.debounce(this.reallySaveSession, wait * 1000, {
      maxWait: maxWait * 1000
    });
    this.playerIsIdle = false;
  }

  LevelBus.prototype.init = function() {
    var ref;
    LevelBus.__super__.init.call(this);
    return this.fireScriptsRef = (ref = this.fireRef) != null ? ref.child('scripts') : void 0;
  };

  LevelBus.prototype.setSession = function(session) {
    this.session = session;
    return this.timerIntervalID = setInterval(this.incrementSessionPlaytime, 1000);
  };

  LevelBus.prototype.onIdleChanged = function(e) {
    return this.playerIsIdle = e.idle;
  };

  LevelBus.prototype.incrementSessionPlaytime = function() {
    var ref;
    if (this.playerIsIdle) {
      return;
    }
    this.changedSessionProperties.playtime = true;
    return this.session.set('playtime', ((ref = this.session.get('playtime')) != null ? ref : 0) + 1);
  };

  LevelBus.prototype.onPoint = function() {
    return true;
  };

  LevelBus.prototype.onMeSynced = function() {
    return LevelBus.__super__.onMeSynced.call(this);
  };

  LevelBus.prototype.join = function() {
    return LevelBus.__super__.join.call(this);
  };

  LevelBus.prototype.disconnect = function() {
    var ref;
    if ((ref = this.fireScriptsRef) != null) {
      ref.off();
    }
    this.fireScriptsRef = null;
    return LevelBus.__super__.disconnect.call(this);
  };

  LevelBus.prototype.removeFirebaseData = function(callback) {
    if (!this.myConnection) {
      return typeof callback === "function" ? callback() : void 0;
    }
    this.myConnection.child('connected');
    this.fireRef.remove();
    return this.onDisconnect.cancel(function() {
      return typeof callback === "function" ? callback() : void 0;
    });
  };

  LevelBus.prototype.onEditingBegan = function() {};

  LevelBus.prototype.onEditingEnded = function() {};

  LevelBus.prototype.setSpells = function(spells) {
    var results, spell, spellKey;
    results = [];
    for (spellKey in spells) {
      spell = spells[spellKey];
      results.push(this.onSpellCreated({
        spell: spell
      }));
    }
    return results;
  };

  LevelBus.prototype.onSpellChanged = function(e) {
    var code, name, parts;
    if (!this.onPoint()) {
      return;
    }
    code = this.session.get('code');
    if (code == null) {
      code = {};
    }
    parts = e.spell.spellKey.split('/');
    if (code[name = parts[0]] == null) {
      code[name] = {};
    }
    code[parts[0]][parts[1]] = e.spell.getSource();
    this.changedSessionProperties.code = true;
    this.session.set({
      'code': code
    });
    return this.saveSession();
  };

  LevelBus.prototype.onSpellCreated = function(e) {
    var base, ref, spellTeam;
    if (!this.onPoint()) {
      return;
    }
    spellTeam = e.spell.team;
    if (this.teamSpellMap == null) {
      this.teamSpellMap = {};
    }
    if ((base = this.teamSpellMap)[spellTeam] == null) {
      base[spellTeam] = [];
    }
    if (ref = e.spell.spellKey, indexOf.call(this.teamSpellMap[spellTeam], ref) < 0) {
      this.teamSpellMap[spellTeam].push(e.spell.spellKey);
    }
    this.changedSessionProperties.teamSpells = true;
    this.session.set({
      'teamSpells': this.teamSpellMap
    });
    this.saveSession();
    if (spellTeam === me.team || (e.spell.otherSession && spellTeam !== e.spell.otherSession.get('team'))) {
      return this.onSpellChanged(e);
    }
  };

  LevelBus.prototype.onCastSpells = function(e) {
    if (!(this.onPoint() && e.realTime)) {
      return;
    }
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onWinnabilityUpdated = function(e) {
    var ref, ref1;
    if (!(this.onPoint() && e.winnable)) {
      return;
    }
    if ((ref = e.level.get('slug')) !== 'ace-of-coders' && ref !== 'elemental-wars' && ref !== 'the-battle-of-sky-span') {
      return;
    }
    if ((ref1 = this.session.get('state')) != null ? ref1.complete : void 0) {
      return;
    }
    return this.onVictory();
  };

  LevelBus.prototype.onNewWorldCreated = function(e) {
    var flag, flagHistory, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    flagHistory = (function() {
      var i, len, ref, results;
      ref = e.world.flagHistory;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        flag = ref[i];
        if (flag.source !== 'code') {
          results.push(flag);
        }
      }
      return results;
    })();
    if (_.isEqual(state.flagHistory, flagHistory)) {
      return;
    }
    state.flagHistory = flagHistory;
    this.changedSessionProperties.state = true;
    this.session.set('state', state);
    return this.saveSession();
  };

  LevelBus.prototype.onScriptStateChanged = function(e) {
    var ref, ref1, scripts, state;
    if (!this.onPoint()) {
      return;
    }
    if ((ref = this.fireScriptsRef) != null) {
      ref.update(e);
    }
    state = this.session.get('state');
    scripts = (ref1 = state.scripts) != null ? ref1 : {};
    scripts.currentScript = e.currentScript;
    scripts.currentScriptOffset = e.currentScriptOffset;
    this.changedSessionProperties.state = true;
    this.session.set('state', state);
    return this.saveSession();
  };

  LevelBus.prototype.onScriptEnded = function(e) {
    var index, ref, scripts, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    scripts = state.scripts;
    if (scripts.ended == null) {
      scripts.ended = {};
    }
    if (scripts.ended[e.scriptID] != null) {
      return;
    }
    index = _.keys(scripts.ended).length + 1;
    if ((ref = this.fireScriptsRef) != null) {
      ref.child('ended').child(e.scriptID).set(index);
    }
    scripts.ended[e.scriptID] = index;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onScriptReset = function() {
    var ref, state;
    if (!this.onPoint()) {
      return;
    }
    if ((ref = this.fireScriptsRef) != null) {
      ref.set({});
    }
    state = this.session.get('state');
    state.scripts = {};
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onSpriteSelected = function(e) {
    var ref, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    state.selected = ((ref = e.thang) != null ? ref.id : void 0) || null;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onVictory = function() {
    var state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    state.complete = true;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.reallySaveSession();
  };

  LevelBus.prototype.onNewGoalStates = function(e) {
    var changed, goalKey, goalState, goalStates, newGoalStates, oldGoalStates, ref, ref1, state;
    goalStates = e.goalStates;
    if (_.find(newGoalStates, function(gs) {
      return !gs.status;
    })) {
      return console.error("Somehow trying to save null goal states!", newGoalStates);
    }
    if (e.overallStatus !== 'success') {
      return;
    }
    newGoalStates = goalStates;
    state = this.session.get('state');
    oldGoalStates = state.goalStates || {};
    changed = false;
    for (goalKey in newGoalStates) {
      goalState = newGoalStates[goalKey];
      if (((ref = oldGoalStates[goalKey]) != null ? ref.status : void 0) === 'success' && goalState.status !== 'success') {
        continue;
      }
      if (utils.kindaEqual((ref1 = state.goalStates) != null ? ref1[goalKey] : void 0, goalState)) {
        continue;
      }
      changed = true;
      oldGoalStates[goalKey] = _.cloneDeep(newGoalStates[goalKey]);
    }
    if (changed) {
      state.goalStates = oldGoalStates;
      this.session.set('state', state);
      this.changedSessionProperties.state = true;
      return this.saveSession();
    }
  };

  LevelBus.prototype.onPlayerJoined = function(snapshot) {
    var player, players;
    LevelBus.__super__.onPlayerJoined.apply(this, arguments);
    if (!this.onPoint()) {
      return;
    }
    players = this.session.get('players');
    if (players == null) {
      players = {};
    }
    player = snapshot.val();
    if (players[player.id] != null) {
      return;
    }
    players[player.id] = {};
    this.session.set('players', players);
    this.changedSessionProperties.players = true;
    return this.saveSession();
  };

  LevelBus.prototype.onChatAdded = function(snapshot) {
    var chat, message;
    LevelBus.__super__.onChatAdded.apply(this, arguments);
    chat = this.session.get('chat');
    if (chat == null) {
      chat = [];
    }
    message = snapshot.val();
    if (message.system) {
      return;
    }
    chat.push(message);
    if (chat.length > 50) {
      chat = chat.slice(chat.length - 50);
    }
    this.session.set('chat', chat);
    this.changedSessionProperties.chat = true;
    return this.saveSession();
  };

  LevelBus.prototype.reallySaveSession = function() {
    var patch, prop, tempSession;
    if (_.isEmpty(this.changedSessionProperties)) {
      return;
    }
    if (this.session.get('creator') !== me.id) {
      return;
    }
    if (this.session.fake) {
      return;
    }
    Backbone.Mediator.publish('level:session-will-save', {
      session: this.session
    });
    patch = {};
    for (prop in this.changedSessionProperties) {
      patch[prop] = this.session.get(prop);
    }
    this.changedSessionProperties = {};
    tempSession = new LevelSession({
      _id: this.session.id
    });
    return tempSession.save(patch, {
      patch: true,
      type: 'PUT'
    });
  };

  LevelBus.prototype.destroy = function() {
    clearInterval(this.timerIntervalID);
    return LevelBus.__super__.destroy.call(this);
  };

  return LevelBus;

})(Bus);
});

;require.register("lib/LevelLoader", function(exports, require, module) {
var Article, AudioPlayer, CocoClass, LOG, Level, LevelComponent, LevelLoader, LevelSession, LevelSystem, ThangNamesCollection, ThangType, World, app, reportedLoadErrorAlready, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

Article = require('models/Article');

LevelSession = require('models/LevelSession');

ThangType = require('models/ThangType');

ThangNamesCollection = require('collections/ThangNamesCollection');

CocoClass = require('core/CocoClass');

AudioPlayer = require('lib/AudioPlayer');

app = require('core/application');

World = require('lib/world/world');

utils = require('core/utils');

LOG = me.get('name') === 'Shanakin';

reportedLoadErrorAlready = false;

module.exports = LevelLoader = (function(superClass) {
  extend(LevelLoader, superClass);

  function LevelLoader(options) {
    this.buildLoop = bind(this.buildLoop, this);
    var ref;
    this.t0 = new Date().getTime();
    LevelLoader.__super__.constructor.call(this);
    this.supermodel = options.supermodel;
    this.supermodel.setMaxProgress(0.2);
    this.levelID = options.levelID;
    this.sessionID = options.sessionID;
    this.opponentSessionID = options.opponentSessionID;
    this.team = options.team;
    this.headless = options.headless;
    this.loadArticles = options.loadArticles;
    this.sessionless = options.sessionless;
    this.fakeSessionConfig = options.fakeSessionConfig;
    this.spectateMode = (ref = options.spectateMode) != null ? ref : false;
    this.observing = options.observing;
    this.courseID = options.courseID;
    this.courseInstanceID = options.courseInstanceID;
    this.worldNecessities = [];
    this.listenTo(this.supermodel, 'resource-loaded', this.onWorldNecessityLoaded);
    this.listenTo(this.supermodel, 'failed', this.onWorldNecessityLoadFailed);
    this.loadLevel();
    this.loadAudio();
    this.playJingle();
    if (this.supermodel.finished()) {
      this.onSupermodelLoaded();
    } else {
      this.loadTimeoutID = setTimeout(this.reportLoadError.bind(this), 30000);
      this.listenToOnce(this.supermodel, 'loaded-all', this.onSupermodelLoaded);
    }
  }

  LevelLoader.prototype.loadWorldNecessities = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        if (_this.world) {
          return resolve(_this);
        }
        _this.once('world-necessities-loaded', function() {
          return resolve(_this);
        });
        return _this.once('world-necessity-load-failed', function(arg1) {
          var jqxhr, ref, resource;
          resource = arg1.resource;
          jqxhr = resource.jqxhr;
          return reject({
            message: ((ref = jqxhr.responseJSON) != null ? ref.message : void 0) || jqxhr.responseText || 'Unknown Error'
          });
        });
      };
    })(this));
  };

  LevelLoader.prototype.loadLevel = function() {
    this.level = this.supermodel.getModel(Level, this.levelID) || new Level({
      _id: this.levelID
    });
    if (this.level.loaded) {
      return this.onLevelLoaded();
    } else {
      this.level = this.supermodel.loadModel(this.level, 'level').model;
      return this.listenToOnce(this.level, 'sync', this.onLevelLoaded);
    }
  };

  LevelLoader.prototype.reportLoadError = function() {
    var ref, ref1, ref2;
    if (this.destroyed) {
      return;
    }
    return (ref = window.tracker) != null ? ref.trackEvent('LevelLoadError', {
      category: 'Error',
      levelSlug: (ref1 = this.work) != null ? (ref2 = ref1.level) != null ? ref2.slug : void 0 : void 0,
      unloaded: JSON.stringify(this.supermodel.report().map(function(m) {
        return _.result(m.model, 'url');
      }))
    }) : void 0;
  };

  LevelLoader.prototype.onLevelLoaded = function() {
    var originalGet, realType;
    if (!this.sessionless && this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course')) {
      this.sessionDependenciesRegistered = {};
    }
    if (this.level.isType('web-dev')) {
      this.headless = true;
      if (this.sessionless) {
        originalGet = this.level.get;
        this.level.get = function() {
          if (arguments[0] === 'type') {
            return 'hero';
          }
          if (arguments[0] === 'realType') {
            return 'web-dev';
          }
          return originalGet.apply(this, arguments);
        };
      }
    }
    if ((this.courseID && !this.level.isType('course', 'course-ladder', 'game-dev', 'web-dev')) || window.serverConfig.picoCTF) {
      originalGet = this.level.get;
      realType = this.level.get('type');
      this.level.get = function() {
        if (arguments[0] === 'type') {
          return 'course';
        }
        if (arguments[0] === 'realType') {
          return realType;
        }
        return originalGet.apply(this, arguments);
      };
    }
    if (window.serverConfig.picoCTF) {
      this.supermodel.addRequestResource({
        url: '/picoctf/problems',
        success: (function(_this) {
          return function(picoCTFProblems) {
            var ref;
            return (ref = _this.level) != null ? ref.picoCTFProblem = _.find(picoCTFProblems, {
              pid: _this.level.get('picoCTFProblem')
            }) : void 0;
          };
        })(this)
      }).load();
    }
    if (this.sessionless) {
      null;
    } else if (this.fakeSessionConfig != null) {
      this.loadFakeSession();
    } else {
      this.loadSession();
    }
    return this.populateLevel();
  };

  LevelLoader.prototype.loadFakeSession = function() {
    var base, initVals, j, len, method, ref, ref1;
    initVals = {
      level: {
        original: this.level.get('original'),
        majorVersion: this.level.get('version').major
      },
      creator: me.id,
      state: {
        complete: false,
        scripts: {}
      },
      permissions: [
        {
          target: me.id,
          access: 'owner'
        }, {
          target: 'public',
          access: 'write'
        }
      ],
      codeLanguage: this.fakeSessionConfig.codeLanguage || ((ref = me.get('aceConfig')) != null ? ref.language : void 0) || 'python',
      _id: 'A Fake Session ID'
    };
    this.session = new LevelSession(initVals);
    this.session.loaded = true;
    if (typeof (base = this.fakeSessionConfig).callback === "function") {
      base.callback(this.session, this.level);
    }
    ref1 = ['save', 'patch', 'put'];
    for (j = 0, len = ref1.length; j < len; j++) {
      method = ref1[j];
      this.session[method] = function() {
        return console.error("We shouldn't be doing a session." + method + ", since it's a fake session.");
      };
    }
    this.session.fake = true;
    return this.loadDependenciesForSession(this.session);
  };

  LevelLoader.prototype.loadSession = function() {
    var opponentSession, opponentURL, session, url;
    if (this.sessionID) {
      url = "/db/level.session/" + this.sessionID;
      if (this.spectateMode) {
        url += "?interpret=true";
      }
    } else {
      url = "/db/level/" + this.levelID + "/session";
      if (this.team) {
        url += "?team=" + this.team;
      } else if (this.courseID) {
        url += "?course=" + this.courseID;
        if (this.courseInstanceID) {
          url += "&courseInstance=" + this.courseInstanceID;
        }
      }
    }
    session = new LevelSession().setURL(url);
    if (this.headless && !this.level.isType('web-dev')) {
      session.project = ['creator', 'team', 'heroConfig', 'codeLanguage', 'submittedCodeLanguage', 'state', 'submittedCode', 'submitted'];
    }
    this.sessionResource = this.supermodel.loadModel(session, 'level_session', {
      cache: false
    });
    this.session = this.sessionResource.model;
    if (this.opponentSessionID) {
      opponentURL = "/db/level.session/" + this.opponentSessionID + "?interpret=true";
      opponentSession = new LevelSession().setURL(opponentURL);
      if (this.headless) {
        opponentSession.project = session.project;
      }
      this.opponentSessionResource = this.supermodel.loadModel(opponentSession, 'opponent_session', {
        cache: false
      });
      this.opponentSession = this.opponentSessionResource.model;
    }
    if (this.session.loaded) {
      this.session.setURL('/db/level.session/' + this.session.id);
      this.loadDependenciesForSession(this.session);
    } else {
      this.listenToOnce(this.session, 'sync', function() {
        this.session.setURL('/db/level.session/' + this.session.id);
        return this.loadDependenciesForSession(this.session);
      });
    }
    if (this.opponentSession) {
      if (this.opponentSession.loaded) {
        return this.loadDependenciesForSession(this.opponentSession);
      } else {
        return this.listenToOnce(this.opponentSession, 'sync', this.loadDependenciesForSession);
      }
    }
  };

  LevelLoader.prototype.loadDependenciesForSession = function(session) {
    var code, codeLanguage, compressed, heroConfig, heroResource, heroThangType, itemResource, itemThangType, j, len, ref, ref1, ref2, ref3, ref4, team, uncompressed, url;
    if (LOG) {
      console.log("Loading dependencies for session: ", session);
    }
    if (me.id !== session.get('creator')) {
      session.patch = session.save = function() {
        return console.error("Not saving session, since we didn't create it.");
      };
    } else if (codeLanguage = utils.getQueryVariable('codeLanguage')) {
      session.set('codeLanguage', codeLanguage);
    }
    this.loadCodeLanguagesForSession(session);
    if (compressed = session.get('interpret')) {
      uncompressed = LZString.decompressFromUTF16(compressed);
      code = session.get('code');
      code[session.get('team') === 'humans' ? 'hero-placeholder' : 'hero-placeholder-1'].plan = uncompressed;
      session.set('code', code);
      session.unset('interpret');
    }
    if ((ref = session.get('codeLanguage')) === 'io' || ref === 'clojure') {
      session.set('codeLanguage', 'python');
    }
    if (session === this.session) {
      this.addSessionBrowserInfo(session);
      team = (ref1 = this.team) != null ? ref1 : this.session.get('team');
      Backbone.Mediator.publish('level:loaded', {
        level: this.level,
        team: team
      });
      Backbone.Mediator.publish('level:session-loaded', {
        level: this.level,
        session: this.session
      });
      if ((ref2 = this.opponentSession) != null ? ref2.loaded : void 0) {
        this.consolidateFlagHistory();
      }
    } else if (session === this.opponentSession) {
      if (this.session.loaded) {
        this.consolidateFlagHistory();
      }
    }
    if (this.level.isType('course')) {
      heroThangType = ((ref3 = me.get('heroConfig')) != null ? ref3.thangType : void 0) || ThangType.heroes.captain;
      if (LOG) {
        console.log("Course mode, loading custom hero: ", heroThangType);
      }
      url = "/db/thang.type/" + heroThangType + "/version";
      if (heroResource = this.maybeLoadURL(url, ThangType, 'thang')) {
        if (LOG) {
          console.log("Pushing resource: ", heroResource);
        }
        this.worldNecessities.push(heroResource);
      }
      this.sessionDependenciesRegistered[session.id] = true;
    }
    if (!this.level.isType('hero', 'hero-ladder', 'hero-coop')) {
      if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
        this.onWorldNecessitiesLoaded();
      }
      return;
    }
    heroConfig = session.get('heroConfig');
    if (session === this.session && !this.headless) {
      if (heroConfig == null) {
        heroConfig = me.get('heroConfig');
      }
    }
    if (heroConfig == null) {
      heroConfig = {};
    }
    if (heroConfig.inventory == null) {
      heroConfig.inventory = {
        feet: '53e237bf53457600003e3f05'
      };
    }
    if (heroConfig.thangType == null) {
      heroConfig.thangType = '529ffbf1cf1818f2be000001';
    }
    if (!_.isEqual(heroConfig, session.get('heroConfig'))) {
      session.set('heroConfig', heroConfig);
    }
    url = "/db/thang.type/" + heroConfig.thangType + "/version";
    if (heroResource = this.maybeLoadURL(url, ThangType, 'thang')) {
      this.worldNecessities.push(heroResource);
    } else {
      heroThangType = this.supermodel.getModel(url);
      this.loadDefaultComponentsForThangType(heroThangType);
      this.loadThangsRequiredByThangType(heroThangType);
    }
    ref4 = _.values(heroConfig.inventory);
    for (j = 0, len = ref4.length; j < len; j++) {
      itemThangType = ref4[j];
      url = "/db/thang.type/" + itemThangType + "/version?project=name,components,original,rasterIcon,kind";
      if (itemResource = this.maybeLoadURL(url, ThangType, 'thang')) {
        this.worldNecessities.push(itemResource);
      } else {
        itemThangType = this.supermodel.getModel(url);
        this.loadDefaultComponentsForThangType(itemThangType);
        this.loadThangsRequiredByThangType(itemThangType);
      }
    }
    this.sessionDependenciesRegistered[session.id] = true;
    if (_.size(this.sessionDependenciesRegistered) === 2 && this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.loadCodeLanguagesForSession = function(session) {
    var codeLanguage, codeLanguages, j, len, results;
    codeLanguages = _.uniq(_.filter([session.get('codeLanguage') || 'python', session.get('submittedCodeLanguage')]));
    results = [];
    for (j = 0, len = codeLanguages.length; j < len; j++) {
      codeLanguage = codeLanguages[j];
      if (codeLanguage === 'clojure' || codeLanguage === 'io') {
        continue;
      }
      results.push((function(_this) {
        return function(codeLanguage) {
          var languageModuleResource, modulePath, onModuleLoaded, ref;
          modulePath = "vendor/aether-" + codeLanguage;
          if (!((ref = application.moduleLoader) != null ? ref.load(modulePath) : void 0)) {
            return;
          }
          languageModuleResource = _this.supermodel.addSomethingResource('language_module');
          onModuleLoaded = function(e) {
            if (e.id !== modulePath) {
              return;
            }
            languageModuleResource.markLoaded();
            return this.stopListening(application.moduleLoader, 'loaded', onModuleLoaded);
          };
          return _this.listenTo(application.moduleLoader, 'loaded', onModuleLoaded);
        };
      })(this)(codeLanguage));
    }
    return results;
  };

  LevelLoader.prototype.addSessionBrowserInfo = function(session) {
    var browser;
    if (me.id !== session.get('creator')) {
      return;
    }
    if ($.browser == null) {
      return;
    }
    browser = {};
    if ($.browser.desktop) {
      browser['desktop'] = $.browser.desktop;
    }
    if ($.browser.name) {
      browser['name'] = $.browser.name;
    }
    if ($.browser.platform) {
      browser['platform'] = $.browser.platform;
    }
    if ($.browser.version) {
      browser['version'] = $.browser.version;
    }
    session.set('browser', browser);
    if (!session.fake) {
      return session.patch();
    }
  };

  LevelLoader.prototype.consolidateFlagHistory = function() {
    var myFlagHistory, opponentFlagHistory, ref, ref1, ref2, ref3, state;
    state = (ref = this.session.get('state')) != null ? ref : {};
    myFlagHistory = _.filter((ref1 = state.flagHistory) != null ? ref1 : [], {
      team: this.session.get('team')
    });
    opponentFlagHistory = _.filter((ref2 = (ref3 = this.opponentSession.get('state')) != null ? ref3.flagHistory : void 0) != null ? ref2 : [], {
      team: this.opponentSession.get('team')
    });
    state.flagHistory = myFlagHistory.concat(opponentFlagHistory);
    return this.session.set('state', state);
  };

  LevelLoader.prototype.populateLevel = function() {
    var article, articleVersions, comp, componentVersions, flagThang, indieSprite, indieSprites, j, l, len, len1, len2, len3, len4, len5, len6, len7, n, o, obj, objUniq, p, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, system, systemVersions, thang, thangIDs, u, url, worldNecessities;
    thangIDs = [];
    componentVersions = [];
    systemVersions = [];
    articleVersions = [];
    flagThang = {
      thangType: '53fa25f25bc220000052c2be',
      id: 'Placeholder Flag',
      components: []
    };
    ref = (this.level.get('thangs') || []).concat([flagThang]);
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      thangIDs.push(thang.thangType);
      this.loadThangsRequiredByLevelThang(thang);
      ref1 = thang.components || [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        comp = ref1[l];
        componentVersions.push(_.pick(comp, ['original', 'majorVersion']));
      }
    }
    ref2 = this.level.get('systems') || [];
    for (n = 0, len2 = ref2.length; n < len2; n++) {
      system = ref2[n];
      systemVersions.push(_.pick(system, ['original', 'majorVersion']));
      if (indieSprites = system != null ? (ref3 = system.config) != null ? ref3.indieSprites : void 0 : void 0) {
        for (o = 0, len3 = indieSprites.length; o < len3; o++) {
          indieSprite = indieSprites[o];
          thangIDs.push(indieSprite.thangType);
        }
      }
    }
    if (!(this.headless && !this.loadArticles)) {
      ref5 = ((ref4 = this.level.get('documentation')) != null ? ref4.generalArticles : void 0) || [];
      for (p = 0, len4 = ref5.length; p < len4; p++) {
        article = ref5[p];
        articleVersions.push(_.pick(article, ['original', 'majorVersion']));
      }
    }
    objUniq = function(array) {
      return _.uniq(array, false, function(arg) {
        return JSON.stringify(arg);
      });
    };
    worldNecessities = [];
    this.thangIDs = _.uniq(thangIDs);
    this.thangNames = new ThangNamesCollection(this.thangIDs);
    worldNecessities.push(this.supermodel.loadCollection(this.thangNames, 'thang_names'));
    this.listenToOnce(this.thangNames, 'sync', this.onThangNamesLoaded);
    if ((ref6 = this.sessionResource) != null ? ref6.isLoading : void 0) {
      worldNecessities.push(this.sessionResource);
    }
    if ((ref7 = this.opponentSessionResource) != null ? ref7.isLoading : void 0) {
      worldNecessities.push(this.opponentSessionResource);
    }
    ref8 = objUniq(componentVersions);
    for (q = 0, len5 = ref8.length; q < len5; q++) {
      obj = ref8[q];
      url = "/db/level.component/" + obj.original + "/version/" + obj.majorVersion;
      worldNecessities.push(this.maybeLoadURL(url, LevelComponent, 'component'));
    }
    ref9 = objUniq(systemVersions);
    for (s = 0, len6 = ref9.length; s < len6; s++) {
      obj = ref9[s];
      url = "/db/level.system/" + obj.original + "/version/" + obj.majorVersion;
      worldNecessities.push(this.maybeLoadURL(url, LevelSystem, 'system'));
    }
    ref10 = objUniq(articleVersions);
    for (u = 0, len7 = ref10.length; u < len7; u++) {
      obj = ref10[u];
      url = "/db/article/" + obj.original + "/version/" + obj.majorVersion;
      this.maybeLoadURL(url, Article, 'article');
    }
    if (obj = this.level.get('nextLevel')) {
      url = "/db/level/" + obj.original + "/version/" + obj.majorVersion;
      this.maybeLoadURL(url, Level, 'level');
    }
    return this.worldNecessities = this.worldNecessities.concat(worldNecessities);
  };

  LevelLoader.prototype.loadThangsRequiredByLevelThang = function(levelThang) {
    return this.loadThangsRequiredFromComponentList(levelThang.components);
  };

  LevelLoader.prototype.loadThangsRequiredByThangType = function(thangType) {
    return this.loadThangsRequiredFromComponentList(thangType.get('components'));
  };

  LevelLoader.prototype.loadThangsRequiredFromComponentList = function(components) {
    var component, extantRequiredThangTypes, itemThangType, j, l, len, len1, len2, n, ref, ref1, requiredThangTypes, results, thangType, url;
    if (!components) {
      return;
    }
    requiredThangTypes = [];
    for (j = 0, len = components.length; j < len; j++) {
      component = components[j];
      if (component.config) {
        if (component.original === LevelComponent.EquipsID) {
          ref1 = _.values((ref = component.config.inventory) != null ? ref : {});
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            itemThangType = ref1[l];
            requiredThangTypes.push(itemThangType);
          }
        } else if (component.config.requiredThangTypes) {
          requiredThangTypes = requiredThangTypes.concat(component.config.requiredThangTypes);
        }
      }
    }
    extantRequiredThangTypes = _.filter(requiredThangTypes);
    if (extantRequiredThangTypes.length < requiredThangTypes.length) {
      console.error("Some Thang had a blank required ThangType in components list:", components);
    }
    results = [];
    for (n = 0, len2 = extantRequiredThangTypes.length; n < len2; n++) {
      thangType = extantRequiredThangTypes[n];
      url = "/db/thang.type/" + thangType + "/version?project=name,components,original,rasterIcon,kind,prerenderedSpriteSheetData";
      results.push(this.worldNecessities.push(this.maybeLoadURL(url, ThangType, 'thang')));
    }
    return results;
  };

  LevelLoader.prototype.onThangNamesLoaded = function(thangNames) {
    var j, len, ref, thangType;
    ref = thangNames.models;
    for (j = 0, len = ref.length; j < len; j++) {
      thangType = ref[j];
      this.loadDefaultComponentsForThangType(thangType);
      this.loadThangsRequiredByThangType(thangType);
    }
    this.thangNamesLoaded = true;
    if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.loadDefaultComponentsForThangType = function(thangType) {
    var component, components, j, len, results, url;
    if (!(components = thangType.get('components'))) {
      return;
    }
    results = [];
    for (j = 0, len = components.length; j < len; j++) {
      component = components[j];
      url = "/db/level.component/" + component.original + "/version/" + component.majorVersion;
      results.push(this.worldNecessities.push(this.maybeLoadURL(url, LevelComponent, 'component')));
    }
    return results;
  };

  LevelLoader.prototype.onWorldNecessityLoaded = function(resource) {
    var index, r;
    index = this.worldNecessities.indexOf(resource);
    if (resource.name === 'thang') {
      this.loadDefaultComponentsForThangType(resource.model);
      this.loadThangsRequiredByThangType(resource.model);
    }
    if (!(index >= 0)) {
      return;
    }
    this.worldNecessities.splice(index, 1);
    this.worldNecessities = (function() {
      var j, len, ref, results;
      ref = this.worldNecessities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        r = ref[j];
        if (r != null) {
          results.push(r);
        }
      }
      return results;
    }).call(this);
    if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.onWorldNecessityLoadFailed = function(event) {
    this.reportLoadError();
    return this.trigger('world-necessity-load-failed', event);
  };

  LevelLoader.prototype.checkAllWorldNecessitiesRegisteredAndLoaded = function() {
    var ref;
    if (_.filter(this.worldNecessities).length !== 0) {
      return false;
    }
    if (!this.thangNamesLoaded) {
      return false;
    }
    if (this.sessionDependenciesRegistered && !this.sessionDependenciesRegistered[this.session.id] && !this.sessionless) {
      return false;
    }
    if (this.sessionDependenciesRegistered && this.opponentSession && !this.sessionDependenciesRegistered[this.opponentSession.id] && !this.sessionless) {
      return false;
    }
    if (!(((ref = this.session) != null ? ref.loaded : void 0) || this.sessionless)) {
      return false;
    }
    return true;
  };

  LevelLoader.prototype.onWorldNecessitiesLoaded = function() {
    var nameModelMap, nameModelTuples, t, thangType, thangsToLoad;
    if (LOG) {
      console.log("World necessities loaded.");
    }
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.initWorld();
    this.supermodel.clearMaxProgress();
    this.trigger('world-necessities-loaded');
    if (this.headless) {
      return;
    }
    thangsToLoad = _.uniq((function() {
      var j, len, ref, results;
      ref = this.world.thangs;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        t = ref[j];
        if (t.exists) {
          results.push(t.spriteName);
        }
      }
      return results;
    }).call(this));
    nameModelTuples = (function() {
      var j, len, ref, results;
      ref = this.thangNames.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        thangType = ref[j];
        results.push([thangType.get('name'), thangType]);
      }
      return results;
    }).call(this);
    nameModelMap = _.zipObject(nameModelTuples);
    if (this.spriteSheetsToBuild == null) {
      this.spriteSheetsToBuild = [];
    }
    if (this.spriteSheetsToBuild.length) {
      return this.buildLoopInterval = setInterval(this.buildLoop, 5);
    }
  };

  LevelLoader.prototype.maybeLoadURL = function(url, Model, resourceName) {
    var model;
    if (this.supermodel.getModel(url)) {
      return;
    }
    model = new Model().setURL(url);
    return this.supermodel.loadModel(model, resourceName);
  };

  LevelLoader.prototype.onSupermodelLoaded = function() {
    clearTimeout(this.loadTimeoutID);
    if (this.destroyed) {
      return;
    }
    if (LOG) {
      console.log('SuperModel for Level loaded in', new Date().getTime() - this.t0, 'ms');
    }
    this.loadLevelSounds();
    return this.denormalizeSession();
  };

  LevelLoader.prototype.buildLoop = function() {
    var i, j, keys, len, ref, ref1, someLeft, spriteSheetResource, thangType;
    someLeft = false;
    ref1 = (ref = this.spriteSheetsToBuild) != null ? ref : [];
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      spriteSheetResource = ref1[i];
      if (spriteSheetResource.spriteSheetKeys) {
        continue;
      }
      someLeft = true;
      thangType = spriteSheetResource.thangType;
      if (thangType.loaded && !thangType.loading) {
        keys = this.buildSpriteSheetsForThangType(spriteSheetResource.thangType);
        if (keys && keys.length) {
          this.listenTo(spriteSheetResource.thangType, 'build-complete', this.onBuildComplete);
          spriteSheetResource.spriteSheetKeys = keys;
        } else {
          spriteSheetResource.markLoaded();
        }
      }
    }
    if (!someLeft) {
      return clearInterval(this.buildLoopInterval);
    }
  };

  LevelLoader.prototype.onBuildComplete = function(e) {
    var j, k, len, ref, resource;
    resource = null;
    ref = this.spriteSheetsToBuild;
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (e.thangType === resource.thangType) {
        break;
      }
    }
    if (!resource) {
      return console.error('Did not find spriteSheetToBuildResource for', e);
    }
    resource.spriteSheetKeys = (function() {
      var l, len1, ref1, results;
      ref1 = resource.spriteSheetKeys;
      results = [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        k = ref1[l];
        if (k !== e.key) {
          results.push(k);
        }
      }
      return results;
    })();
    if (resource.spriteSheetKeys.length === 0) {
      return resource.markLoaded();
    }
  };

  LevelLoader.prototype.denormalizeSession = function() {
    var key, patch, tempSession, value;
    if (this.sessionDenormalized || this.spectateMode || this.sessionless || me.isSessionless()) {
      return;
    }
    if (this.headless && !this.level.isType('web-dev')) {
      return;
    }
    if (!this.session.id) {
      return;
    }
    patch = {
      'levelName': this.level.get('name'),
      'levelID': this.level.get('slug') || this.level.id
    };
    if (me.id === this.session.get('creator')) {
      patch.creatorName = me.get('name');
    }
    for (key in patch) {
      value = patch[key];
      if (this.session.get(key) === value) {
        delete patch[key];
      }
    }
    if (!_.isEmpty(patch)) {
      for (key in patch) {
        value = patch[key];
        this.session.set(key, value);
      }
      tempSession = new LevelSession({
        _id: this.session.id
      });
      tempSession.save(patch, {
        patch: true,
        type: 'PUT'
      });
    }
    return this.sessionDenormalized = true;
  };

  LevelLoader.prototype.buildSpriteSheetsForThangType = function(thangType) {
    var color, j, key, keys, len, ref, ref1, ref2, spriteOptions, team;
    if (this.headless) {
      return;
    }
    if (!this.thangTypeTeams) {
      this.grabThangTypeTeams();
    }
    keys = [];
    ref1 = (ref = this.thangTypeTeams[thangType.get('original')]) != null ? ref : [null];
    for (j = 0, len = ref1.length; j < len; j++) {
      team = ref1[j];
      spriteOptions = {
        resolutionFactor: SPRITE_RESOLUTION_FACTOR,
        async: true
      };
      if (thangType.get('kind') === 'Floor') {
        spriteOptions.resolutionFactor = 2;
      }
      if (team && (color = (ref2 = this.teamConfigs[team]) != null ? ref2.color : void 0)) {
        spriteOptions.colorConfig = {
          team: color
        };
      }
      key = this.buildSpriteSheet(thangType, spriteOptions);
      if (_.isString(key)) {
        keys.push(key);
      }
    }
    return keys;
  };

  LevelLoader.prototype.grabThangTypeTeams = function() {
    var base, component, j, l, len, len1, name, ref, ref1, ref2, team, thang;
    this.grabTeamConfigs();
    this.thangTypeTeams = {};
    ref = this.level.get('thangs');
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (this.level.isType('hero', 'course') && thang.id === 'Hero Placeholder') {
        continue;
      }
      ref1 = thang.components;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        component = ref1[l];
        if (team = (ref2 = component.config) != null ? ref2.team : void 0) {
          if ((base = this.thangTypeTeams)[name = thang.thangType] == null) {
            base[name] = [];
          }
          if (indexOf.call(this.thangTypeTeams[thang.thangType], team) < 0) {
            this.thangTypeTeams[thang.thangType].push(team);
          }
          break;
        }
      }
    }
    return this.thangTypeTeams;
  };

  LevelLoader.prototype.grabTeamConfigs = function() {
    var j, len, ref, ref1, system;
    ref = this.level.get('systems');
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      if (this.teamConfigs = (ref1 = system.config) != null ? ref1.teamConfigs : void 0) {
        break;
      }
    }
    if (!this.teamConfigs) {
      this.teamConfigs = {
        'humans': {
          'superteam': 'humans',
          'color': {
            'hue': 0,
            'saturation': 0.75,
            'lightness': 0.5
          },
          'playable': true
        },
        'ogres': {
          'superteam': 'ogres',
          'color': {
            'hue': 0.66,
            'saturation': 0.75,
            'lightness': 0.5
          },
          'playable': false
        },
        'neutral': {
          'superteam': 'neutral',
          'color': {
            'hue': 0.33,
            'saturation': 0.75,
            'lightness': 0.5
          }
        }
      };
    }
    return this.teamConfigs;
  };

  LevelLoader.prototype.buildSpriteSheet = function(thangType, options) {
    var ref;
    if (thangType.get('name') === 'Wizard') {
      options.colorConfig = ((ref = me.get('wizard')) != null ? ref.colorConfig : void 0) || {};
    }
    return thangType.buildSpriteSheet(options);
  };

  LevelLoader.prototype.initWorld = function() {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, serializedLevel;
    if (this.level.isType('web-dev')) {
      return;
    }
    this.world = new World();
    this.world.levelSessionIDs = this.opponentSessionID ? [this.sessionID, this.opponentSessionID] : [this.sessionID];
    this.world.submissionCount = (ref = (ref1 = this.session) != null ? (ref2 = ref1.get('state')) != null ? ref2.submissionCount : void 0 : void 0) != null ? ref : 0;
    this.world.flagHistory = (ref3 = (ref4 = this.session) != null ? (ref5 = ref4.get('state')) != null ? ref5.flagHistory : void 0 : void 0) != null ? ref3 : [];
    this.world.difficulty = (ref6 = (ref7 = this.session) != null ? (ref8 = ref7.get('state')) != null ? ref8.difficulty : void 0 : void 0) != null ? ref6 : 0;
    if (this.observing) {
      this.world.difficulty = Math.max(0, this.world.difficulty - 1);
    }
    serializedLevel = this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      opponentSession: this.opponentSession,
      headless: this.headless,
      sessionless: this.sessionless
    });
    this.world.loadFromLevel(serializedLevel, false);
    if (LOG) {
      return console.log('World has been initialized from level loader.');
    }
  };

  LevelLoader.prototype.playJingle = function() {
    var f, volume;
    if (this.headless || !me.get('volume')) {
      return;
    }
    volume = 0.5;
    if (me.level() < 3) {
      volume = 0.25;
    }
    f = function() {
      var jingles;
      jingles = ['ident_1', 'ident_2'];
      return AudioPlayer.playInterfaceSound(jingles[Math.floor(Math.random() * jingles.length)], volume);
    };
    return setTimeout(f, 500);
  };

  LevelLoader.prototype.loadAudio = function() {
    if (this.headless || !me.get('volume')) {
      return;
    }
    return AudioPlayer.preloadInterfaceSounds(['victory']);
  };

  LevelLoader.prototype.loadLevelSounds = function() {
    var j, l, len, len1, len2, len3, n, noteGroup, o, ref, ref1, ref2, results, script, scripts, sound, sounds, sprite, thangType, thangTypes, trigger;
    if (this.headless || !me.get('volume')) {
      return;
    }
    scripts = this.level.get('scripts');
    if (!scripts) {
      return;
    }
    for (j = 0, len = scripts.length; j < len; j++) {
      script = scripts[j];
      if (script.noteChain) {
        ref = script.noteChain;
        for (l = 0, len1 = ref.length; l < len1; l++) {
          noteGroup = ref[l];
          if (noteGroup.sprites) {
            ref1 = noteGroup.sprites;
            for (n = 0, len2 = ref1.length; n < len2; n++) {
              sprite = ref1[n];
              if ((ref2 = sprite.say) != null ? ref2.sound : void 0) {
                AudioPlayer.preloadSoundReference(sprite.say.sound);
              }
            }
          }
        }
      }
    }
    thangTypes = this.supermodel.getModels(ThangType);
    results = [];
    for (o = 0, len3 = thangTypes.length; o < len3; o++) {
      thangType = thangTypes[o];
      results.push((function() {
        var ref3, results1;
        ref3 = thangType.get('soundTriggers') || {};
        results1 = [];
        for (trigger in ref3) {
          sounds = ref3[trigger];
          if (trigger !== 'say') {
            results1.push((function() {
              var len4, p, results2;
              results2 = [];
              for (p = 0, len4 = sounds.length; p < len4; p++) {
                sound = sounds[p];
                results2.push(AudioPlayer.preloadSoundReference(sound));
              }
              return results2;
            })());
          }
        }
        return results1;
      })());
    }
    return results;
  };

  LevelLoader.prototype.progress = function() {
    return this.supermodel.progress;
  };

  LevelLoader.prototype.destroy = function() {
    if (this.buildLoopInterval) {
      clearInterval(this.buildLoopInterval);
    }
    return LevelLoader.__super__.destroy.call(this);
  };

  return LevelLoader;

})(CocoClass);
});

;require.register("lib/LevelSetupManager", function(exports, require, module) {
var CocoClass, InventoryModal, Level, LevelSession, LevelSetupManager, PlayHeroesModal, SuperModel, ThangType, lastHeroesEarned, lastHeroesPurchased, ref, ref1, ref2, ref3,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

PlayHeroesModal = require('views/play/modal/PlayHeroesModal');

InventoryModal = require('views/play/menu/InventoryModal');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

SuperModel = require('models/SuperModel');

ThangType = require('models/ThangType');

lastHeroesEarned = (ref = (ref1 = me.get('earned')) != null ? ref1.heroes : void 0) != null ? ref : [];

lastHeroesPurchased = (ref2 = (ref3 = me.get('purchased')) != null ? ref3.heroes : void 0) != null ? ref2 : [];

module.exports = LevelSetupManager = (function(superClass) {
  extend(LevelSetupManager, superClass);

  function LevelSetupManager(options) {
    var ref4;
    this.options = options;
    LevelSetupManager.__super__.constructor.call(this);
    this.supermodel = (ref4 = this.options.supermodel) != null ? ref4 : new SuperModel();
    this.session = this.options.session;
    if (!(this.level = this.options.level)) {
      this.loadLevel();
    }
    if (this.session) {
      this.fillSessionWithDefaults();
    } else {
      this.loadSession();
    }
  }

  LevelSetupManager.prototype.loadLevel = function() {
    var levelURL;
    levelURL = "/db/level/" + this.options.levelID;
    this.level = new Level().setURL(levelURL);
    this.level = this.supermodel.loadModel(this.level).model;
    if (this.level.loaded) {
      return this.onLevelSync();
    } else {
      return this.listenToOnce(this.level, 'sync', this.onLevelSync);
    }
  };

  LevelSetupManager.prototype.loadSession = function() {
    var sessionURL;
    sessionURL = "/db/level/" + this.options.levelID + "/session";
    if (this.options.courseID) {
      sessionURL += "?course=" + this.options.courseID;
    }
    this.session = new LevelSession().setURL(sessionURL);
    this.session = this.supermodel.loadModel(this.session).model;
    if (this.session.loaded) {
      return this.onSessionSync();
    } else {
      return this.listenToOnce(this.session, 'sync', this.onSessionSync);
    }
  };

  LevelSetupManager.prototype.onLevelSync = function() {
    if (this.destroyed) {
      return;
    }
    if (this.waitingToLoadModals) {
      this.waitingToLoadModals = false;
      return this.loadModals();
    }
  };

  LevelSetupManager.prototype.onSessionSync = function() {
    if (this.destroyed) {
      return;
    }
    this.session.url = function() {
      return '/db/level.session/' + this.id;
    };
    return this.fillSessionWithDefaults();
  };

  LevelSetupManager.prototype.fillSessionWithDefaults = function() {
    var heroConfig;
    heroConfig = _.merge({}, me.get('heroConfig'), this.session.get('heroConfig'));
    this.session.set('heroConfig', heroConfig);
    if (this.level.loaded) {
      return this.loadModals();
    } else {
      return this.waitingToLoadModals = true;
    }
  };

  LevelSetupManager.prototype.loadModals = function() {
    var goliath, lightseeker, raider, ref4, sorcerer, wizard;
    if (this.level.get('slug') === 'zero-sum') {
      sorcerer = '52fd1524c7e6cf99160e7bc9';
      if (this.session.get('creator') === '532dbc73a622924444b68ed9') {
        sorcerer = '53e126a4e06b897606d38bef';
      }
      this.session.set('heroConfig', {
        "thangType": sorcerer,
        "inventory": {
          "misc-0": "53e2396a53457600003e3f0f",
          "programming-book": "546e266e9df4a17d0d449be5",
          "minion": "54eb5dbc49fa2d5c905ddf56",
          "feet": "53e214f153457600003e3eab",
          "right-hand": "54eab7f52b7506e891ca7202",
          "left-hand": "5463758f3839c6e02811d30f",
          "wrists": "54693797a2b1f53ce79443e9",
          "gloves": "5469425ca2b1f53ce7944421",
          "torso": "546d4a549df4a17d0d449a97",
          "neck": "54693274a2b1f53ce79443c9",
          "eyes": "546941fda2b1f53ce794441d",
          "head": "546d4ca19df4a17d0d449abf"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'the-gauntlet-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "feet": "53e237bf53457600003e3f05",
          "head": "546d38269df4a17d0d4499ff",
          "eyes": "53e238df53457600003e3f0b",
          "torso": "53e22eac53457600003e3efc",
          "right-hand": "53e218d853457600003e3ebe",
          "programming-book": "53e4108204c00d4607a89f78"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'woodland-cleaver-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "eyes": "53e238df53457600003e3f0b",
          "head": "546d38269df4a17d0d4499ff",
          "torso": "545d3f0b2d03e700001b5a5d",
          "right-hand": "544d7d1f8494308424f564a3",
          "wrists": "53e2396a53457600003e3f0f",
          "feet": "53e2384453457600003e3f07",
          "programming-book": "546e25d99df4a17d0d449be1",
          "left-hand": "544c310ae0017993fce214bf"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'crossroads-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "wrists": "53e2396a53457600003e3f0f",
          "eyes": "53e2167653457600003e3eb3",
          "feet": "546d4d589df4a17d0d449ac9",
          "left-hand": "544d7bb88494308424f56493",
          "right-hand": "54694ba3a2b1f53ce794444d",
          "waist": "5437002a7beba4a82024a97d",
          "programming-book": "546e25d99df4a17d0d449be1",
          "gloves": "5469425ca2b1f53ce7944421",
          "head": "546d390b9df4a17d0d449a0b",
          "torso": "546aaf1b3777d6186329285e",
          "neck": "54693140a2b1f53ce79443bc"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if ((ref4 = this.level.get('slug')) === 'ace-of-coders' || ref4 === 'elemental-wars') {
      goliath = '55e1a6e876cb0948c96af9f8';
      this.session.set('heroConfig', {
        "thangType": goliath,
        "inventory": {
          "eyes": "53eb99f41a100989a40ce46e",
          "neck": "54693274a2b1f53ce79443c9",
          "wrists": "54693797a2b1f53ce79443e9",
          "feet": "546d4d8e9df4a17d0d449acd",
          "minion": "54eb5bf649fa2d5c905ddf4a",
          "programming-book": "557871261ff17fef5abee3ee"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'the-battle-of-sky-span') {
      wizard = '52fc1460b2b91c0d5a7b6af3';
      this.session.set('heroConfig', {
        "thangType": wizard,
        "inventory": {
          "eyes": "546941fda2b1f53ce794441d",
          "feet": "546d4d8e9df4a17d0d449acd",
          "torso": "546d4a549df4a17d0d449a97",
          "head": "546d4ca19df4a17d0d449abf",
          "minion": "54eb5d1649fa2d5c905ddf52",
          "neck": "54693240a2b1f53ce79443c5",
          "wrists": "54693830a2b1f53ce79443f1",
          "programming-book": "557871261ff17fef5abee3ee",
          "left-ring": "54692d2aa2b1f53ce794438f"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'assembly-speed') {
      raider = '55527eb0b8abf4ba1fe9a107';
      this.session.set('heroConfig', {
        "thangType": raider,
        "inventory": {}
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.isType('course', 'course-ladder', 'game-dev', 'web-dev') || window.serverConfig.picoCTF) {
      this.onInventoryModalPlayClicked();
      return;
    }
    this.heroesModal = new PlayHeroesModal({
      supermodel: this.supermodel,
      session: this.session,
      confirmButtonI18N: 'play.next',
      level: this.level,
      hadEverChosenHero: this.options.hadEverChosenHero
    });
    this.inventoryModal = new InventoryModal({
      supermodel: this.supermodel,
      session: this.session,
      level: this.level
    });
    this.heroesModalDestroy = this.heroesModal.destroy;
    this.inventoryModalDestroy = this.inventoryModal.destroy;
    this.heroesModal.destroy = this.inventoryModal.destroy = _.noop;
    this.listenTo(this.heroesModal, 'confirm-click', this.onHeroesModalConfirmClicked);
    this.listenToOnce(this.heroesModal, 'hero-loaded', this.onceHeroLoaded);
    this.listenTo(this.inventoryModal, 'choose-hero-click', this.onChooseHeroClicked);
    this.listenTo(this.inventoryModal, 'play-click', this.onInventoryModalPlayClicked);
    this.modalsLoaded = true;
    if (this.waitingToOpen) {
      this.waitingToOpen = false;
      return this.open();
    }
  };

  LevelSetupManager.prototype.open = function() {
    var allowedHeroSlugs, firstModal, ref10, ref11, ref4, ref5, ref6, ref7, ref8, ref9;
    if (!this.modalsLoaded) {
      return this.waitingToOpen = true;
    }
    firstModal = this.options.hadEverChosenHero ? this.inventoryModal : this.heroesModal;
    if (!_.isEqual(lastHeroesEarned, (ref4 = (ref5 = me.get('earned')) != null ? ref5.heroes : void 0) != null ? ref4 : []) || !_.isEqual(lastHeroesPurchased, (ref6 = (ref7 = me.get('purchased')) != null ? ref7.heroes : void 0) != null ? ref6 : [])) {
      console.log('Showing hero picker because heroes earned/purchased has changed.');
      firstModal = this.heroesModal;
    } else if (allowedHeroSlugs = this.level.get('allowedHeroes')) {
      if (!_.find(allowedHeroSlugs, function(slug) {
        var ref8;
        return ThangType.heroes[slug] === ((ref8 = me.get('heroConfig')) != null ? ref8.thangType : void 0);
      })) {
        firstModal = this.heroesModal;
      }
    }
    lastHeroesEarned = (ref8 = (ref9 = me.get('earned')) != null ? ref9.heroes : void 0) != null ? ref8 : [];
    lastHeroesPurchased = (ref10 = (ref11 = me.get('purchased')) != null ? ref11.heroes : void 0) != null ? ref10 : [];
    this.options.parent.openModalView(firstModal);
    return this.trigger('open');
  };

  LevelSetupManager.prototype.onceHeroLoaded = function(e) {
    if (window.currentModal === this.inventoryModal) {
      return this.inventoryModal.setHero(e.hero);
    }
  };

  LevelSetupManager.prototype.onHeroesModalConfirmClicked = function(e) {
    var ref4;
    this.options.parent.openModalView(this.inventoryModal);
    this.inventoryModal.render();
    this.inventoryModal.didReappear();
    this.inventoryModal.onShown();
    if (e.hero) {
      this.inventoryModal.setHero(e.hero);
    }
    return (ref4 = window.tracker) != null ? ref4.trackEvent('Choose Inventory', {
      category: 'Play Level'
    }) : void 0;
  };

  LevelSetupManager.prototype.onChooseHeroClicked = function() {
    var ref4;
    this.options.parent.openModalView(this.heroesModal);
    this.heroesModal.render();
    this.heroesModal.didReappear();
    this.inventoryModal.endHighlight();
    return (ref4 = window.tracker) != null ? ref4.trackEvent('Change Hero', {
      category: 'Play Level'
    }) : void 0;
  };

  LevelSetupManager.prototype.onInventoryModalPlayClicked = function() {
    var LadderView, PlayLevelView, route, viewClass;
    this.navigatingToPlay = true;
    PlayLevelView = 'views/play/level/PlayLevelView';
    LadderView = 'views/ladder/LadderView';
    viewClass = this.options.levelPath === 'ladder' ? LadderView : PlayLevelView;
    route = "/play/" + (this.options.levelPath || 'level') + "/" + this.options.levelID;
    if (this.level.get('primerLanguage')) {
      route += "?codeLanguage=" + this.level.get('primerLanguage');
    }
    return Backbone.Mediator.publish('router:navigate', {
      route: route,
      viewClass: viewClass,
      viewArgs: [
        {
          supermodel: this.supermodel
        }, this.options.levelID
      ]
    });
  };

  LevelSetupManager.prototype.destroy = function() {
    var ref4, ref5, ref6, ref7;
    if (!((ref4 = this.heroesModal) != null ? ref4.destroyed : void 0)) {
      if ((ref5 = this.heroesModalDestroy) != null) {
        ref5.call(this.heroesModal);
      }
    }
    if (!((ref6 = this.inventoryModal) != null ? ref6.destroyed : void 0)) {
      if ((ref7 = this.inventoryModalDestroy) != null) {
        ref7.call(this.inventoryModal);
      }
    }
    return LevelSetupManager.__super__.destroy.call(this);
  };

  return LevelSetupManager;

})(CocoClass);
});

;require.register("lib/LocalMongo", function(exports, require, module) {
var LocalMongo, doQuerySelector, mapred, matchesQuery,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

LocalMongo = module.exports;

mapred = function(left, right, func) {
  return _.reduce(left, (function(result, singleLeft) {
    return result || (_.reduce(_.map(right, function(singleRight) {
      return func(singleLeft, singleRight);
    }), (function(intermediate, value) {
      return intermediate || value;
    }), false));
  }), false);
};

doQuerySelector = function(originalValue, operatorObj) {
  var body, operator, originalBody, trimmedOperator, value;
  value = _.isArray(originalValue) ? originalValue : [originalValue];
  for (operator in operatorObj) {
    originalBody = operatorObj[operator];
    body = _.isArray(originalBody) ? originalBody : [originalBody];
    switch (operator) {
      case '$gt':
        if (!mapred(value, body, function(l, r) {
          return l > r;
        })) {
          return false;
        }
        break;
      case '$gte':
        if (!mapred(value, body, function(l, r) {
          return l >= r;
        })) {
          return false;
        }
        break;
      case '$lt':
        if (!mapred(value, body, function(l, r) {
          return l < r;
        })) {
          return false;
        }
        break;
      case '$lte':
        if (!mapred(value, body, function(l, r) {
          return l <= r;
        })) {
          return false;
        }
        break;
      case '$ne':
        if (mapred(value, body, function(l, r) {
          return l === r;
        })) {
          return false;
        }
        break;
      case '$in':
        if (!_.reduce(value, (function(result, val) {
          return result || indexOf.call(body, val) >= 0;
        }), false)) {
          return false;
        }
        break;
      case '$nin':
        if (_.reduce(value, (function(result, val) {
          return result || indexOf.call(body, val) >= 0;
        }), false)) {
          return false;
        }
        break;
      case '$exists':
        if ((value[0] != null) !== body[0]) {
          return false;
        }
        break;
      default:
        trimmedOperator = _.pick(operatorObj, operator);
        if (!(_.isObject(originalValue) && matchesQuery(originalValue, trimmedOperator))) {
          return false;
        }
    }
  }
  return true;
};

matchesQuery = function(target, queryObj) {
  var i, len, obj, piece, pieces, prop, query;
  if (!queryObj) {
    return true;
  }
  if (!target) {
    throw new Error('Expected an object to match a query against, instead got null');
  }
  for (prop in queryObj) {
    query = queryObj[prop];
    if (prop[0] === '$') {
      switch (prop) {
        case '$or':
          if (!_.reduce(query, (function(res, obj) {
            return res || matchesQuery(target, obj);
          }), false)) {
            return false;
          }
          break;
        case '$and':
          if (!_.reduce(query, (function(res, obj) {
            return res && matchesQuery(target, obj);
          }), true)) {
            return false;
          }
          break;
        default:
          return false;
      }
    } else {
      pieces = prop.split('.');
      obj = target;
      for (i = 0, len = pieces.length; i < len; i++) {
        piece = pieces[i];
        if (!(piece in obj)) {
          obj = null;
          break;
        }
        obj = obj[piece];
      }
      if (typeof query !== 'object' || _.isArray(query)) {
        if (!(obj === query || (_.isArray(obj) ? indexOf.call(obj, query) >= 0 : void 0))) {
          return false;
        }
      } else {
        if (!doQuerySelector(obj, query)) {
          return false;
        }
      }
    }
  }
  return true;
};

LocalMongo.matchesQuery = matchesQuery;
});

;require.register("lib/SolutionConceptTagger", function(exports, require, module) {
var TagSolution, concepts;

concepts = require('schemas/concepts');

module.exports = TagSolution = function(solution) {
  var ast, code, engine, key, result, tkn;
  code = solution.source;
  engine = new esper.Engine();
  engine.load(code);
  ast = engine.evaluator.ast;
  result = [];
  for (key in concepts) {
    tkn = concepts[key].tagger;
    if (!tkn) {
      continue;
    }
    if (typeof tkn === 'function') {
      if (tkn(ast)) {
        result.push(concepts[key].concept);
      }
    } else {
      if (ast.find(tkn).length > 0) {
        result.push(concepts[key].concept);
      }
    }
  }
  console.log(result);
  return result;
};
});

;require.register("lib/aether_utils", function(exports, require, module) {
var functionParameters, utils;

require('aether');

require('esper');

utils = require('core/utils');

Aether.addGlobal('Vector', require('./world/vector'));

Aether.addGlobal('_', _);

module.exports.createAetherOptions = function(options) {
  var aetherOptions, parameters;
  if (!options.functionName) {
    throw new Error('Specify a function name to create an Aether instance');
  }
  if (!options.codeLanguage) {
    throw new Error('Specify a code language to create an Aether instance');
  }
  aetherOptions = {
    functionName: options.functionName,
    protectAPI: !options.skipProtectAPI,
    includeFlow: Boolean(options.includeFlow),
    noVariablesInFlow: true,
    skipDuplicateUserInfoInFlow: true,
    yieldConditionally: options.functionName === 'plan',
    simpleLoops: true,
    whileTrueAutoYield: true,
    globals: ['Vector', '_'],
    problems: {
      jshint_W040: {
        level: 'ignore'
      },
      jshint_W030: {
        level: 'ignore'
      },
      jshint_W038: {
        level: 'ignore'
      },
      jshint_W091: {
        level: 'ignore'
      },
      jshint_E043: {
        level: 'ignore'
      },
      jshint_Unknown: {
        level: 'ignore'
      },
      aether_MissingThis: {
        level: 'error'
      }
    },
    problemContext: options.problemContext,
    executionLimit: 3 * 1000 * 1000,
    language: options.codeLanguage,
    useInterpreter: true
  };
  parameters = functionParameters[options.functionName];
  if (!parameters) {
    console.warn("Unknown method " + options.functionName + ": please add function parameters to lib/aether_utils.coffee.");
    parameters = [];
  }
  if (options.functionParameters && !_.isEqual(options.functionParameters, parameters)) {
    console.error("Update lib/aether_utils.coffee with the right function parameters for " + options.functionName + " (had: " + parameters + " but this gave " + options.functionParameters + ".");
    parameters = options.functionParameters;
  }
  aetherOptions.functionParameters = parameters.slice();
  return aetherOptions;
};

functionParameters = {
  hear: ['speaker', 'message', 'data'],
  makeBid: ['tileGroupLetter'],
  findCentroids: ['centroids'],
  isFriend: ['name'],
  evaluateBoard: ['board', 'player'],
  getPossibleMoves: ['board'],
  minimax_alphaBeta: ['board', 'player', 'depth', 'alpha', 'beta'],
  distanceTo: ['target'],
  chooseAction: [],
  plan: [],
  initializeCentroids: [],
  update: [],
  getNearestEnemy: [],
  die: []
};
});

;require.register("lib/coursesHelper", function(exports, require, module) {
var Levels, progressMixin;

Levels = require('collections/Levels');

module.exports = {
  calculateDots: function(classrooms, courses, courseInstances) {
    var classroom, course, courseIndex, i, instance, len, levelCompletes, levels, ref, results, userID;
    ref = classrooms.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      results.push((function() {
        var j, len1, ref1, results1;
        ref1 = courses.models;
        results1 = [];
        for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
          course = ref1[courseIndex];
          instance = courseInstances.findWhere({
            courseID: course.id,
            classroomID: classroom.id
          });
          if (!instance) {
            continue;
          }
          instance.numCompleted = 0;
          instance.started = false;
          levels = classroom.getLevels({
            courseID: course.id
          });
          levels.remove(levels.filter((function(_this) {
            return function(level) {
              return level.get('practice');
            };
          })(this)));
          results1.push((function() {
            var k, len2, ref2, results2;
            ref2 = instance.get('members');
            results2 = [];
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              userID = ref2[k];
              instance.started || (instance.started = _.any(levels.models, function(level) {
                var session;
                session = _.find(classroom.sessions.models, function(session) {
                  return session.get('creator') === userID && session.get('level').original === level.get('original');
                });
                return session != null;
              }));
              levelCompletes = _.map(levels.models, function(level) {
                var sessions;
                sessions = _.filter(classroom.sessions.models, function(session) {
                  return session.get('creator') === userID && session.get('level').original === level.get('original');
                });
                return _.find(sessions, function(s) {
                  return s.completed();
                });
              });
              if (_.every(levelCompletes)) {
                results2.push(instance.numCompleted += 1);
              } else {
                results2.push(void 0);
              }
            }
            return results2;
          })());
        }
        return results1;
      }).call(this));
    }
    return results;
  },
  calculateEarliestIncomplete: function(classroom, courses, courseInstances, students) {
    var course, courseIndex, i, instance, j, k, len, len1, len2, level, levelIndex, levelNumber, levels, ref, ref1, ref2, sessions, user, userID, userIDs, users;
    ref = courses.models;
    for (courseIndex = i = 0, len = ref.length; i < len; courseIndex = ++i) {
      course = ref[courseIndex];
      instance = courseInstances.findWhere({
        courseID: course.id,
        classroomID: classroom.id
      });
      if (!instance) {
        continue;
      }
      levels = classroom.getLevels({
        courseID: course.id
      });
      ref1 = levels.models;
      for (levelIndex = j = 0, len1 = ref1.length; j < len1; levelIndex = ++j) {
        level = ref1[levelIndex];
        userIDs = [];
        ref2 = students.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          user = ref2[k];
          userID = user.id;
          sessions = _.filter(classroom.sessions.models, function(session) {
            return session.get('creator') === userID && session.get('level').original === level.get('original');
          });
          if (!_.find(sessions, function(s) {
            return s.completed();
          })) {
            userIDs.push(userID);
          }
        }
        if (userIDs.length > 0) {
          users = _.map(userIDs, function(id) {
            return students.get(id);
          });
          levelNumber = classroom.getLevelNumber(level.get('original'), levelIndex + 1);
          return {
            courseName: course.get('name'),
            courseNumber: courseIndex + 1,
            levelNumber: levelNumber,
            levelName: level.get('name'),
            users: users
          };
        }
      }
    }
    return null;
  },
  calculateLatestComplete: function(classroom, courses, courseInstances, students) {
    var course, courseIndex, courseModels, i, instance, j, k, len, len1, len2, level, levelIndex, levelModels, levelNumber, levels, ref, ref1, ref2, sessions, user, userID, userIDs, users;
    courseModels = courses.models.slice();
    ref = courseModels.reverse();
    for (courseIndex = i = 0, len = ref.length; i < len; courseIndex = ++i) {
      course = ref[courseIndex];
      courseIndex = courses.models.length - courseIndex - 1;
      instance = courseInstances.findWhere({
        courseID: course.id,
        classroomID: classroom.id
      });
      if (!instance) {
        continue;
      }
      levels = classroom.getLevels({
        courseID: course.id
      });
      levelModels = levels.models.slice();
      ref1 = levelModels.reverse();
      for (levelIndex = j = 0, len1 = ref1.length; j < len1; levelIndex = ++j) {
        level = ref1[levelIndex];
        levelIndex = levelModels.length - levelIndex - 1;
        userIDs = [];
        ref2 = students.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          user = ref2[k];
          userID = user.id;
          sessions = _.filter(classroom.sessions.models, function(session) {
            return session.get('creator') === userID && session.get('level').original === level.get('original');
          });
          if (_.find(sessions, function(s) {
            return s.completed();
          })) {
            userIDs.push(userID);
          }
        }
        if (userIDs.length > 0) {
          users = _.map(userIDs, function(id) {
            return students.get(id);
          });
          levelNumber = classroom.getLevelNumber(level.get('original'), levelIndex + 1);
          return {
            courseName: course.get('name'),
            courseNumber: courseIndex + 1,
            levelNumber: levelNumber,
            levelName: level.get('name'),
            users: users
          };
        }
      }
    }
    return null;
  },
  calculateConceptsCovered: function(classrooms, courses, campaigns, courseInstances, students) {
    var classroom, concept, conceptData, course, courseIndex, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, len8, level, levelID, levels, m, n, o, p, q, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, sessions, userID;
    conceptData = {};
    ref = classrooms.models;
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      conceptData[classroom.id] = {};
      ref1 = courses.models;
      for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
        course = ref1[courseIndex];
        levels = classroom.getLevels({
          courseID: course.id
        });
        ref2 = levels.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          level = ref2[k];
          levelID = level.get('original');
          ref3 = level.get('concepts');
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            concept = ref3[l];
            if (!conceptData[classroom.id][concept]) {
              conceptData[classroom.id][concept] = {
                completed: true,
                started: false
              };
            }
          }
          ref4 = level.get('concepts');
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            concept = ref4[m];
            ref5 = classroom.get('members');
            for (n = 0, len5 = ref5.length; n < len5; n++) {
              userID = ref5[n];
              sessions = _.filter(classroom.sessions.models, function(session) {
                return session.get('creator') === userID && session.get('level').original === levelID;
              });
              if (_.size(sessions) === 0) {
                ref6 = level.get('concepts');
                for (o = 0, len6 = ref6.length; o < len6; o++) {
                  concept = ref6[o];
                  conceptData[classroom.id][concept].completed = false;
                }
              }
              if (_.size(sessions) > 0) {
                ref7 = level.get('concepts');
                for (p = 0, len7 = ref7.length; p < len7; p++) {
                  concept = ref7[p];
                  conceptData[classroom.id][concept].started = true;
                }
              }
              if (!_.find(sessions, function(s) {
                return s.completed();
              })) {
                ref8 = level.get('concepts');
                for (q = 0, len8 = ref8.length; q < len8; q++) {
                  concept = ref8[q];
                  conceptData[classroom.id][concept].completed = false;
                }
              }
            }
          }
        }
      }
    }
    return conceptData;
  },
  calculateAllProgress: function(classrooms, courses, courseInstances, students) {
    var base, base1, base2, base3, classroom, course, courseIndex, courseProgress, dates, i, instance, isPractice, j, k, l, len, len1, len2, len3, level, levelID, levels, progressData, ref, ref1, ref2, ref3, s, sessions, user, userID;
    progressData = {};
    ref = classrooms.models;
    for (i = 0, len = ref.length; i < len; i++) {
      classroom = ref[i];
      progressData[classroom.id] = {};
      ref1 = courses.models;
      for (courseIndex = j = 0, len1 = ref1.length; j < len1; courseIndex = ++j) {
        course = ref1[courseIndex];
        instance = courseInstances.findWhere({
          courseID: course.id,
          classroomID: classroom.id
        });
        if (!instance) {
          progressData[classroom.id][course.id] = {
            completed: false,
            started: false
          };
          continue;
        }
        progressData[classroom.id][course.id] = {
          completed: true,
          started: false
        };
        levels = classroom.getLevels({
          courseID: course.id
        });
        ref2 = levels.models;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          level = ref2[k];
          levelID = level.get('original');
          progressData[classroom.id][course.id][levelID] = {
            completed: students.size() > 0,
            started: false,
            numStarted: 0
          };
          isPractice = level.get('practice');
          ref3 = students.models;
          for (l = 0, len3 = ref3.length; l < len3; l++) {
            user = ref3[l];
            userID = user.id;
            courseProgress = progressData[classroom.id][course.id];
            if (courseProgress[userID] == null) {
              courseProgress[userID] = {
                completed: true,
                started: false,
                levelsCompleted: 0
              };
            }
            courseProgress[levelID][userID] = {
              completed: true,
              started: false
            };
            sessions = _.filter(classroom.sessions.models, function(session) {
              return session.get('creator') === userID && session.get('level').original === levelID;
            });
            courseProgress[levelID][userID].session = _.find(sessions, function(s) {
              return s.completed();
            }) || _.first(sessions);
            if (_.size(sessions) === 0) {
              if (!isPractice) {
                courseProgress.started || (courseProgress.started = false);
              }
              if (!isPractice) {
                courseProgress.completed = false;
              }
              if (!isPractice) {
                (base = courseProgress[userID]).started || (base.started = false);
              }
              if (!isPractice) {
                courseProgress[userID].completed = false;
              }
              (base1 = courseProgress[levelID]).started || (base1.started = false);
              if (!isPractice) {
                courseProgress[levelID].completed = false;
              }
              courseProgress[levelID][userID].started = false;
              courseProgress[levelID][userID].completed = false;
            }
            if (_.size(sessions) > 0) {
              if (!isPractice) {
                courseProgress.started = true;
              }
              if (!isPractice) {
                courseProgress[userID].started = true;
              }
              courseProgress[levelID].started = true;
              courseProgress[levelID][userID].started = true;
              courseProgress[levelID][userID].lastPlayed = new Date(Math.max(_.map(sessions, 'changed')));
              courseProgress[levelID].numStarted += 1;
            }
            if (_.find(sessions, function(s) {
              return s.completed();
            })) {
              if (!isPractice) {
                courseProgress.completed && (courseProgress.completed = true);
              }
              if (!isPractice) {
                (base2 = courseProgress[userID]).completed && (base2.completed = true);
              }
              if (!isPractice) {
                courseProgress[userID].levelsCompleted += 1;
              }
              (base3 = courseProgress[levelID]).completed && (base3.completed = true);
              courseProgress[levelID][userID].completed = true;
              dates = (function() {
                var len4, m, results;
                results = [];
                for (m = 0, len4 = sessions.length; m < len4; m++) {
                  s = sessions[m];
                  results.push(s.get('dateFirstCompleted') || s.get('changed'));
                }
                return results;
              })();
              courseProgress[levelID][userID].dateFirstCompleted = new Date(Math.max.apply(Math, dates));
            } else {
              if (!isPractice) {
                courseProgress.completed = false;
              }
              if (!isPractice) {
                courseProgress[userID].completed = false;
              }
              if (isPractice) {
                if (courseProgress[levelID][userID].started) {
                  courseProgress[levelID].completed = false;
                }
              } else {
                courseProgress[levelID].completed = false;
              }
              courseProgress[levelID][userID].completed = false;
              courseProgress[levelID].dateFirstCompleted = null;
              courseProgress[levelID][userID].dateFirstCompleted = null;
            }
          }
          if (isPractice && courseProgress && !courseProgress[levelID].started) {
            courseProgress[levelID].completed = false;
          }
        }
      }
    }
    _.assign(progressData, progressMixin);
    return progressData;
  },
  courseLabelsArray: function(courses) {
    var acronym, course, courseLabelIndexes, i, labels, len;
    labels = [];
    courseLabelIndexes = {
      CS: 0,
      GD: 0,
      WD: 0
    };
    for (i = 0, len = courses.length; i < len; i++) {
      course = courses[i];
      acronym = (function() {
        switch (false) {
          case !/game-dev/.test(course.get('slug')):
            return 'GD';
          case !/web-dev/.test(course.get('slug')):
            return 'WD';
          default:
            return 'CS';
        }
      })();
      labels.push(acronym + ++courseLabelIndexes[acronym]);
    }
    return labels;
  }
};

progressMixin = {
  get: function(options) {
    var classroom, course, defaultValue, level, levelID, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, user;
    if (options == null) {
      options = {};
    }
    classroom = options.classroom, course = options.course, level = options.level, user = options.user;
    if (!classroom) {
      throw new Error("You must provide a classroom");
    }
    if (!course) {
      throw new Error("You must provide a course");
    }
    defaultValue = {
      completed: false,
      started: false
    };
    if (options.level) {
      levelID = level.get('original');
      if (options.user) {
        return ((ref = this[classroom.id]) != null ? (ref1 = ref[course.id]) != null ? (ref2 = ref1[levelID]) != null ? ref2[user.id] : void 0 : void 0 : void 0) || defaultValue;
      } else {
        return ((ref3 = this[classroom.id]) != null ? (ref4 = ref3[course.id]) != null ? ref4[levelID] : void 0 : void 0) || defaultValue;
      }
    } else {
      if (options.user) {
        return ((ref5 = this[classroom.id]) != null ? (ref6 = ref5[course.id]) != null ? ref6[user.id] : void 0 : void 0) || defaultValue;
      } else {
        return ((ref7 = this[classroom.id]) != null ? ref7[course.id] : void 0) || defaultValue;
      }
    }
  }
};
});

;require.register("lib/image_filter", function(exports, require, module) {
var Filters, darkenImage, revertImage,
  slice = [].slice;

Filters = {};

Filters.getPixels = function(img) {
  var c, ctx;
  c = this.getCanvas(img.naturalWidth, img.naturalHeight);
  ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function(w, h) {
  var c;
  c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

Filters.filterImage = function() {
  var args, filter, image;
  filter = arguments[0], image = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
  args = [this.getPixels(image)].concat(args);
  return filter.apply(null, args);
};

Filters.brightness = function(pixels, adjustment) {
  var d, i;
  d = pixels.data;
  i = 0;
  while (i < d.length) {
    d[i] *= adjustment;
    d[i + 1] *= adjustment;
    d[i + 2] *= adjustment;
    i += 4;
  }
  return pixels;
};

module.exports.darkenImage = darkenImage = function(img, borderImageSelector, pct) {
  var c, cachedValue, ctx, imageData, jqimg;
  if (pct == null) {
    pct = 0.5;
  }
  jqimg = $(img);
  cachedValue = jqimg.data('darkened');
  if (cachedValue) {
    $(borderImageSelector).css('border-image-source', 'url(' + cachedValue + ')');
    return img.src = cachedValue;
  }
  if (!jqimg.data('original')) {
    jqimg.data('original', img.src);
  }
  if (!(img.naturalWidth > 0 && img.naturalHeight > 0)) {
    console.warn('Tried to darken image', img, 'but it has natural dimensions', img.naturalWidth, img.naturalHeight);
    return img;
  }
  imageData = Filters.filterImage(Filters.brightness, img, pct);
  c = Filters.getCanvas(img.naturalWidth, img.naturalHeight);
  ctx = c.getContext('2d');
  ctx.putImageData(imageData, 0, 0);
  img.src = c.toDataURL();
  $(borderImageSelector).css('border-image-source', 'url(' + img.src + ')');
  return jqimg.data('darkened', img.src);
};

module.exports.revertImage = revertImage = function(img, borderImageSelector) {
  var jqimg;
  jqimg = $(img);
  if (!jqimg.data('original')) {
    return;
  }
  $(borderImageSelector).css('border-image-source', 'url(' + jqimg.data('original') + ')');
  return img.src = jqimg.data('original');
};
});

;require.register("lib/requireUtils", function(exports, require, module) {
module.exports.getParentFolders = function(subPath, urlPrefix) {
  var parts, paths;
  if (urlPrefix == null) {
    urlPrefix = '/test/';
  }
  if (!subPath) {
    return [];
  }
  paths = [];
  parts = subPath.split('/');
  while (parts.length) {
    parts.pop();
    paths.unshift({
      name: parts[parts.length - 1] || 'All',
      url: urlPrefix + parts.join('/')
    });
  }
  return paths;
};

module.exports.parseImmediateChildren = function(allChildren, subPath, baseRequirePath, urlPrefix) {
  var children, f, files, folders, group, i, j, k, len, len1, len2, name, parts, ref, ref1, requirePrefix;
  if (baseRequirePath == null) {
    baseRequirePath = 'test/app/';
  }
  if (urlPrefix == null) {
    urlPrefix = '/test/';
  }
  if (!allChildren) {
    return [];
  }
  folders = {};
  files = {};
  requirePrefix = baseRequirePath + subPath;
  if (requirePrefix[requirePrefix.length - 1] !== '/') {
    requirePrefix += '/';
  }
  for (i = 0, len = allChildren.length; i < len; i++) {
    f = allChildren[i];
    f = f.slice(requirePrefix.length);
    if (!f) {
      continue;
    }
    parts = f.split('/');
    name = parts[0];
    group = parts.length === 1 ? files : folders;
    if (group[name] == null) {
      group[name] = 0;
    }
    group[name] += 1;
  }
  children = [];
  urlPrefix += subPath;
  if (urlPrefix[urlPrefix.length - 1] !== '/') {
    urlPrefix += '/';
  }
  ref = _.keys(folders);
  for (j = 0, len1 = ref.length; j < len1; j++) {
    name = ref[j];
    children.push({
      type: 'folder',
      url: urlPrefix + name,
      name: name + '/',
      size: folders[name]
    });
  }
  ref1 = _.keys(files);
  for (k = 0, len2 = ref1.length; k < len2; k++) {
    name = ref1[k];
    children.push({
      type: 'file',
      url: urlPrefix + name,
      name: name
    });
  }
  return children;
};
});

;require.register("lib/scripts/DOMScriptModule", function(exports, require, module) {
var DOMScriptModule, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = DOMScriptModule = (function(superClass) {
  extend(DOMScriptModule, superClass);

  function DOMScriptModule() {
    return DOMScriptModule.__super__.constructor.apply(this, arguments);
  }

  DOMScriptModule.neededFor = function(noteGroup) {
    return noteGroup.dom != null;
  };

  DOMScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.highlight != null) {
      notes.push(this.highlightNote());
    }
    if (this.noteGroup.dom.lock != null) {
      notes.push(this.lockNote());
    }
    if (this.noteGroup.dom.focus != null) {
      notes.push(this.focusNote());
    }
    if (this.noteGroup.dom.showVictory) {
      notes.push(this.showVictoryNote());
    }
    if (this.noteGroup.dom.letterbox != null) {
      notes.push(this.letterboxNote());
    }
    return notes;
  };

  DOMScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.highlight != null) {
      notes.push({
        'channel': 'level:end-highlight-dom'
      });
    }
    if (this.noteGroup.dom.lock != null) {
      notes.push({
        'channel': 'level:enable-controls'
      });
    }
    return notes;
  };

  DOMScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.showVictory != null) {
      notes.push(this.showVictoryNote(false));
    }
    if (this.noteGroup.dom.letterbox != null) {
      notes.push(this.letterboxNote());
    }
    return notes;
  };

  DOMScriptModule.prototype.highlightNote = function() {
    var dom, note;
    dom = this.noteGroup.dom;
    note = {
      channel: 'level:highlight-dom',
      event: {
        selector: dom.highlight.target,
        delay: dom.highlight.delay,
        sides: dom.highlight.sides,
        offset: dom.highlight.offset,
        rotation: dom.highlight.rotation
      }
    };
    note.event = _.pick(note.event, function(value) {
      return !_.isUndefined(value);
    });
    this.maybeApplyDelayToNote(note);
    return note;
  };

  DOMScriptModule.prototype.focusNote = function() {
    var note;
    note = {
      channel: 'level:focus-dom',
      event: {
        selector: this.noteGroup.dom.focus
      }
    };
    return note;
  };

  DOMScriptModule.prototype.showVictoryNote = function(showModal) {
    var e, note, ref;
    e = {};
    e.showModal = (ref = this.noteGroup.dom.showVictory) === true || ref === 'Done Button And Modal';
    if (showModal != null) {
      e.showModal = showModal;
    }
    note = {
      channel: 'level:show-victory',
      event: e
    };
    return note;
  };

  DOMScriptModule.prototype.lockNote = function() {
    var channel, event, lock;
    event = {};
    lock = this.noteGroup.dom.lock;
    if (_.isArray(lock)) {
      event.controls = lock;
    }
    channel = lock ? 'level:disable-controls' : 'level:enable-controls';
    return {
      channel: channel,
      event: event
    };
  };

  DOMScriptModule.prototype.letterboxNote = function() {
    return {
      channel: 'level:set-letterbox',
      event: {
        on: this.noteGroup.dom.letterbox
      }
    };
  };

  return DOMScriptModule;

})(ScriptModule);
});

;require.register("lib/scripts/PlaybackScriptModule", function(exports, require, module) {
var PlaybackScriptModule, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = PlaybackScriptModule = (function(superClass) {
  extend(PlaybackScriptModule, superClass);

  function PlaybackScriptModule() {
    return PlaybackScriptModule.__super__.constructor.apply(this, arguments);
  }

  PlaybackScriptModule.neededFor = function(noteGroup) {
    return noteGroup.playback != null;
  };

  PlaybackScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.playback.playing != null) {
      notes.push(this.playingNote());
    }
    if (this.noteGroup.playback.scrub != null) {
      notes.push(this.scrubNote());
    }
    return notes;
  };

  PlaybackScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    return notes;
  };

  PlaybackScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.playback.playing != null) {
      notes.push(this.playingNote());
    }
    if (this.noteGroup.playback.scrub != null) {
      notes.push(this.scrubNote(true));
    }
    return notes;
  };

  PlaybackScriptModule.prototype.playingNote = function() {
    var note;
    note = {
      channel: 'level:set-playing',
      event: {
        playing: this.noteGroup.playback.playing
      }
    };
    return note;
  };

  PlaybackScriptModule.prototype.scrubNote = function(instant) {
    var note, scrub;
    if (instant == null) {
      instant = false;
    }
    scrub = this.noteGroup.playback.scrub;
    note = {
      channel: 'level:set-time',
      event: {
        frameOffset: scrub.frameOffset || 2,
        scrubDuration: instant ? 0 : scrub.duration
      }
    };
    if (scrub.toTime != null) {
      note.event.time = scrub.toTime;
    }
    if (scrub.toRatio != null) {
      note.event.ratio = scrub.toRatio;
    }
    return note;
  };

  return PlaybackScriptModule;

})(ScriptModule);
});

;require.register("lib/scripts/ScriptManager", function(exports, require, module) {
var CocoClass, CocoView, DEFAULT_BOT_MOVE_DURATION, DEFAULT_SCRUB_DURATION, ScriptManager, allScriptModules, scriptMatchesEventPrereqs,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

CocoView = require('views/core/CocoView');

scriptMatchesEventPrereqs = require('./../world/script_event_prereqs').scriptMatchesEventPrereqs;

allScriptModules = [];

allScriptModules.push(require('./SpriteScriptModule'));

allScriptModules.push(require('./DOMScriptModule'));

allScriptModules.push(require('./SurfaceScriptModule'));

allScriptModules.push(require('./PlaybackScriptModule'));

allScriptModules.push(require('./SoundScriptModule'));

DEFAULT_BOT_MOVE_DURATION = 500;

DEFAULT_SCRUB_DURATION = 1000;

module.exports = ScriptManager = ScriptManager = (function(superClass) {
  extend(ScriptManager, superClass);

  ScriptManager.prototype.scriptInProgress = false;

  ScriptManager.prototype.currentNoteGroup = null;

  ScriptManager.prototype.currentTimeouts = [];

  ScriptManager.prototype.worldLoading = true;

  ScriptManager.prototype.ignoreEvents = false;

  ScriptManager.prototype.quiet = false;

  ScriptManager.prototype.triggered = [];

  ScriptManager.prototype.ended = [];

  ScriptManager.prototype.noteGroupQueue = [];

  ScriptManager.prototype.originalScripts = [];

  ScriptManager.prototype.subscriptions = {
    'script:end-current-script': 'onEndNoteGroup',
    'level:loading-view-unveiling': function() {
      return this.setWorldLoading(false);
    },
    'level:restarted': 'onLevelRestarted',
    'level:shift-space-pressed': 'onEndNoteGroup',
    'level:escape-pressed': 'onEndAll'
  };

  ScriptManager.prototype.shortcuts = {
    '⇧+space, space, enter': function() {
      return Backbone.Mediator.publish('level:shift-space-pressed', {});
    },
    'escape': function() {
      return Backbone.Mediator.publish('level:escape-pressed', {});
    }
  };

  function ScriptManager(options) {
    this.tick = bind(this.tick, this);
    ScriptManager.__super__.constructor.call(this, options);
    this.originalScripts = options.scripts;
    this.session = options.session;
    this.levelID = options.levelID;
    this.debugScripts = application.isIPadApp || CocoView.getQueryVariable('dev');
    this.initProperties();
    this.addScriptSubscriptions();
    this.beginTicking();
  }

  ScriptManager.prototype.setScripts = function(originalScripts) {
    this.originalScripts = originalScripts;
    this.quiet = true;
    this.initProperties();
    this.loadFromSession();
    this.quiet = false;
    this.addScriptSubscriptions();
    return this.run();
  };

  ScriptManager.prototype.initProperties = function() {
    if (this.scriptInProgress) {
      this.endAll({
        force: true
      });
    }
    this.triggered = [];
    this.ended = [];
    this.noteGroupQueue = [];
    return this.scripts = $.extend(true, [], this.originalScripts);
  };

  ScriptManager.prototype.addScriptSubscriptions = function() {
    var callback, idNum, j, len, makeCallback, ref, results, script;
    idNum = 0;
    makeCallback = (function(_this) {
      return function(channel) {
        return function(event) {
          return _this.onNote(channel, event);
        };
      };
    })(this);
    ref = this.scripts;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      if (!script.id) {
        script.id = (idNum++).toString();
      }
      callback = makeCallback(script.channel);
      results.push(this.addNewSubscription(script.channel, callback));
    }
    return results;
  };

  ScriptManager.prototype.beginTicking = function() {
    return this.tickInterval = setInterval(this.tick, 5000);
  };

  ScriptManager.prototype.tick = function() {
    var j, len, now, ref, ref1, ref2, script, scriptStates, stateEvent;
    scriptStates = {};
    now = new Date();
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      scriptStates[script.id] = {
        timeSinceLastEnded: (script.lastEnded ? now - script.lastEnded : 0) / 1000,
        timeSinceLastTriggered: (script.lastTriggered ? now - script.lastTriggered : 0) / 1000
      };
    }
    stateEvent = {
      scriptRunning: ((ref1 = this.currentNoteGroup) != null ? ref1.scriptID : void 0) || '',
      noteGroupRunning: ((ref2 = this.currentNoteGroup) != null ? ref2.name : void 0) || '',
      scriptStates: scriptStates,
      timeSinceLastScriptEnded: (this.lastScriptEnded ? now - this.lastScriptEnded : 0) / 1000
    };
    return Backbone.Mediator.publish('script:tick', stateEvent);
  };

  ScriptManager.prototype.loadFromSession = function() {
    var j, len, noteGroup, ref, results;
    this.addEndedScriptsFromSession();
    this.addPartiallyEndedScriptFromSession();
    ref = this.noteGroupQueue;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      noteGroup = ref[j];
      results.push(this.processNoteGroup(noteGroup));
    }
    return results;
  };

  ScriptManager.prototype.addPartiallyEndedScriptFromSession = function() {
    var j, len, noteChain, noteGroup, ref, script, scripts;
    scripts = this.session.get('state').scripts;
    if (!(scripts != null ? scripts.currentScript : void 0)) {
      return;
    }
    script = _.find(this.scripts, {
      id: scripts.currentScript
    });
    if (!script) {
      return;
    }
    this.triggered.push(script.id);
    noteChain = this.processScript(script);
    if (!noteChain) {
      return;
    }
    if (scripts.currentScriptOffset) {
      ref = noteChain.slice(0, +(scripts.currentScriptOffset - 1) + 1 || 9e9);
      for (j = 0, len = ref.length; j < len; j++) {
        noteGroup = ref[j];
        noteGroup.skipMe = true;
      }
    }
    return this.addNoteChain(noteChain, false);
  };

  ScriptManager.prototype.addEndedScriptsFromSession = function() {
    var endedObj, j, k, len, len1, noteChain, noteGroup, p, script, scriptID, scripts, scriptsToSkip, sortedPairs;
    scripts = this.session.get('state').scripts;
    if (!scripts) {
      return;
    }
    endedObj = scripts['ended'] || {};
    sortedPairs = _.sortBy(_.pairs(endedObj), function(pair) {
      return pair[1];
    });
    scriptsToSkip = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = sortedPairs.length; j < len; j++) {
        p = sortedPairs[j];
        results.push(p[0]);
      }
      return results;
    })();
    for (j = 0, len = scriptsToSkip.length; j < len; j++) {
      scriptID = scriptsToSkip[j];
      script = _.find(this.scripts, {
        id: scriptID
      });
      if (!script) {
        console.warn('Couldn\'t find script for', scriptID, 'from scripts', this.scripts, 'when restoring session scripts.');
        continue;
      }
      if (script.repeats) {
        continue;
      }
      this.triggered.push(scriptID);
      this.ended.push(scriptID);
      noteChain = this.processScript(script);
      if (!noteChain) {
        return;
      }
      for (k = 0, len1 = noteChain.length; k < len1; k++) {
        noteGroup = noteChain[k];
        noteGroup.skipMe = true;
      }
      this.addNoteChain(noteChain, false);
    }
  };

  ScriptManager.prototype.setWorldLoading = function(worldLoading) {
    this.worldLoading = worldLoading;
    if (!this.worldLoading) {
      return this.run();
    }
  };

  ScriptManager.prototype.initializeCamera = function() {
    var cameraNote, j, k, len, len1, note, ref, ref1, ref2, script, surfaceModule;
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      ref1 = script.noteChain || [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        note = ref1[k];
        if (((ref2 = note.surface) != null ? ref2.focus : void 0) != null) {
          surfaceModule = _.find(note.modules || [], function(module) {
            return module.surfaceCameraNote;
          });
          cameraNote = surfaceModule.surfaceCameraNote(true);
          this.publishNote(cameraNote);
          return;
        }
      }
    }
  };

  ScriptManager.prototype.destroy = function() {
    this.onEndAll();
    clearInterval(this.tickInterval);
    return ScriptManager.__super__.destroy.call(this);
  };

  ScriptManager.prototype.onNote = function(channel, event) {
    var alreadyTriggered, j, k, len, len1, noteChain, ref, ref1, ref2, script, scriptID;
    if (this.ignoreEvents) {
      return;
    }
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      alreadyTriggered = (ref1 = script.id, indexOf.call(this.triggered, ref1) >= 0);
      if (script.channel !== channel) {
        continue;
      }
      if (alreadyTriggered && !script.repeats) {
        continue;
      }
      if ((script.lastTriggered != null) && script.repeats === 'session') {
        continue;
      }
      if ((script.lastTriggered != null) && new Date().getTime() - script.lastTriggered < 1) {
        continue;
      }
      if (script.neverRun) {
        continue;
      }
      if (script.notAfter) {
        ref2 = script.notAfter;
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          scriptID = ref2[k];
          if (indexOf.call(this.triggered, scriptID) >= 0) {
            script.neverRun = true;
            break;
          }
        }
        if (script.neverRun) {
          continue;
        }
      }
      if (!this.scriptPrereqsSatisfied(script)) {
        continue;
      }
      if (!scriptMatchesEventPrereqs(script, event)) {
        continue;
      }
      if (this.debugScripts) {
        console.debug("SCRIPT: Running script '" + script.id + "'");
      }
      script.lastTriggered = new Date().getTime();
      if (!alreadyTriggered) {
        this.triggered.push(script.id);
      }
      noteChain = this.processScript(script);
      if (!noteChain) {
        return this.trackScriptCompletions(script.id);
      }
      this.addNoteChain(noteChain);
      this.run();
    }
  };

  ScriptManager.prototype.scriptPrereqsSatisfied = function(script) {
    return _.every(script.scriptPrereqs || [], (function(_this) {
      return function(prereq) {
        return indexOf.call(_this.triggered, prereq) >= 0;
      };
    })(this));
  };

  ScriptManager.prototype.processScript = function(script) {
    var j, lastNoteGroup, len, noteChain, noteGroup;
    noteChain = script.noteChain;
    if (!(noteChain != null ? noteChain.length : void 0)) {
      return null;
    }
    for (j = 0, len = noteChain.length; j < len; j++) {
      noteGroup = noteChain[j];
      noteGroup.scriptID = script.id;
    }
    lastNoteGroup = noteChain[noteChain.length - 1];
    lastNoteGroup.isLast = true;
    return noteChain;
  };

  ScriptManager.prototype.addNoteChain = function(noteChain, clearYields) {
    var i, j, k, l, len, len1, len2, len3, m, noteGroup, ref;
    if (clearYields == null) {
      clearYields = true;
    }
    for (j = 0, len = noteChain.length; j < len; j++) {
      noteGroup = noteChain[j];
      this.processNoteGroup(noteGroup);
    }
    for (i = k = 0, len1 = noteChain.length; k < len1; i = ++k) {
      noteGroup = noteChain[i];
      noteGroup.index = i;
    }
    if (clearYields) {
      ref = this.noteGroupQueue;
      for (l = 0, len2 = ref.length; l < len2; l++) {
        noteGroup = ref[l];
        if (noteGroup.script.yields) {
          noteGroup.skipMe = true;
        }
      }
    }
    for (m = 0, len3 = noteChain.length; m < len3; m++) {
      noteGroup = noteChain[m];
      this.noteGroupQueue.push(noteGroup);
    }
    return this.endYieldingNote();
  };

  ScriptManager.prototype.processNoteGroup = function(noteGroup) {
    var Module, base, base1, base2, base3, j, len, ref, ref1, sprite;
    if (noteGroup.modules != null) {
      return;
    }
    if (((ref = noteGroup.playback) != null ? ref.scrub : void 0) != null) {
      if ((base = noteGroup.playback.scrub).duration == null) {
        base.duration = DEFAULT_SCRUB_DURATION;
      }
    }
    if (noteGroup.sprites == null) {
      noteGroup.sprites = [];
    }
    ref1 = noteGroup.sprites;
    for (j = 0, len = ref1.length; j < len; j++) {
      sprite = ref1[j];
      if (sprite.move != null) {
        if ((base1 = sprite.move).duration == null) {
          base1.duration = DEFAULT_BOT_MOVE_DURATION;
        }
      }
      if (sprite.id == null) {
        sprite.id = 'Hero Placeholder';
      }
    }
    if (noteGroup.script == null) {
      noteGroup.script = {};
    }
    if ((base2 = noteGroup.script).yields == null) {
      base2.yields = true;
    }
    if ((base3 = noteGroup.script).skippable == null) {
      base3.skippable = true;
    }
    return noteGroup.modules = (function() {
      var k, len1, results;
      results = [];
      for (k = 0, len1 = allScriptModules.length; k < len1; k++) {
        Module = allScriptModules[k];
        if (Module.neededFor(noteGroup)) {
          results.push(new Module(noteGroup));
        }
      }
      return results;
    })();
  };

  ScriptManager.prototype.endYieldingNote = function() {
    var ref;
    if (this.scriptInProgress && ((ref = this.currentNoteGroup) != null ? ref.script.yields : void 0)) {
      this.endNoteGroup();
      return true;
    }
  };

  ScriptManager.prototype.run = function() {
    var f, j, k, len, len1, module, nextNoteGroup, note, ref, ref1, ref2, ref3, ref4, scriptLabel;
    if (this.scriptInProgress) {
      return;
    }
    this.skipAhead();
    if (!this.noteGroupQueue.length) {
      return;
    }
    nextNoteGroup = this.noteGroupQueue[0];
    if (this.worldLoading && nextNoteGroup.skipMe) {
      return;
    }
    if (this.worldLoading && !((ref = nextNoteGroup.script) != null ? ref.beforeLoad : void 0)) {
      return;
    }
    this.noteGroupQueue = this.noteGroupQueue.slice(1);
    this.currentNoteGroup = nextNoteGroup;
    this.notifyScriptStateChanged();
    this.scriptInProgress = true;
    this.currentTimeouts = [];
    scriptLabel = nextNoteGroup.scriptID + " - " + nextNoteGroup.name;
    if ((ref1 = application.tracker) != null) {
      ref1.trackEvent('Script Started', {
        levelID: this.levelID,
        label: scriptLabel,
        ls: (ref2 = this.session) != null ? ref2.get('_id') : void 0
      }, ['Google Analytics']);
    }
    if (this.debugScripts) {
      console.debug("SCRIPT: Starting note group '" + nextNoteGroup.name + "'");
    }
    ref3 = nextNoteGroup.modules;
    for (j = 0, len = ref3.length; j < len; j++) {
      module = ref3[j];
      ref4 = module.startNotes();
      for (k = 0, len1 = ref4.length; k < len1; k++) {
        note = ref4[k];
        this.processNote(note, nextNoteGroup);
      }
    }
    if (nextNoteGroup.script.duration) {
      f = (function(_this) {
        return function() {
          return typeof _this.onNoteGroupTimeout === "function" ? _this.onNoteGroupTimeout(nextNoteGroup) : void 0;
        };
      })(this);
      setTimeout(f, nextNoteGroup.script.duration);
    }
    return Backbone.Mediator.publish('script:note-group-started', {});
  };

  ScriptManager.prototype.skipAhead = function() {
    var i, j, k, l, len, len1, len2, module, note, noteGroup, notes, ref, ref1, ref2;
    if (this.worldLoading) {
      return;
    }
    if (!((ref = this.noteGroupQueue[0]) != null ? ref.skipMe : void 0)) {
      return;
    }
    this.ignoreEvents = true;
    ref1 = this.noteGroupQueue;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      noteGroup = ref1[i];
      if (!noteGroup.skipMe) {
        break;
      }
      if (this.debugScripts) {
        console.debug("SCRIPT: Skipping note group '" + noteGroup.name + "'");
      }
      this.processNoteGroup(noteGroup);
      ref2 = noteGroup.modules;
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        module = ref2[k];
        notes = module.skipNotes();
        for (l = 0, len2 = notes.length; l < len2; l++) {
          note = notes[l];
          this.processNote(note, noteGroup);
        }
      }
      this.trackScriptCompletionsFromNoteGroup(noteGroup);
    }
    this.noteGroupQueue = this.noteGroupQueue.slice(i);
    return this.ignoreEvents = false;
  };

  ScriptManager.prototype.processNote = function(note, noteGroup) {
    var f;
    if (note.event == null) {
      note.event = {};
    }
    if (note.delay) {
      f = (function(_this) {
        return function() {
          return _this.sendDelayedNote(noteGroup, note);
        };
      })(this);
      return this.currentTimeouts.push(setTimeout(f, note.delay));
    } else {
      return this.publishNote(note);
    }
  };

  ScriptManager.prototype.sendDelayedNote = function(noteGroup, note) {
    if (noteGroup !== this.currentNoteGroup) {
      return;
    }
    return this.publishNote(note);
  };

  ScriptManager.prototype.publishNote = function(note) {
    var ref;
    return Backbone.Mediator.publish(note.channel, (ref = note.event) != null ? ref : {});
  };

  ScriptManager.prototype.onLevelRestarted = function() {
    this.quiet = true;
    this.endAll({
      force: true
    });
    this.initProperties();
    this.resetThings();
    Backbone.Mediator.publish('script:reset', {});
    this.quiet = false;
    return this.run();
  };

  ScriptManager.prototype.onEndNoteGroup = function(e) {
    var ref;
    if (!((ref = this.currentNoteGroup) != null ? ref.script.skippable : void 0)) {
      return;
    }
    this.endNoteGroup();
    return this.run();
  };

  ScriptManager.prototype.endNoteGroup = function() {
    var j, k, l, len, len1, len2, module, note, ref, ref1, ref2, ref3, ref4, scriptLabel, timeout;
    if (this.ending) {
      return;
    }
    this.ending = true;
    if (this.currentNoteGroup == null) {
      return;
    }
    scriptLabel = this.currentNoteGroup.scriptID + " - " + this.currentNoteGroup.name;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Script Ended', {
        levelID: this.levelID,
        label: scriptLabel,
        ls: (ref1 = this.session) != null ? ref1.get('_id') : void 0
      }, ['Google Analytics']);
    }
    if (this.debugScripts) {
      console.debug("SCRIPT: Ending note group '" + this.currentNoteGroup.name + "'");
    }
    ref2 = this.currentTimeouts;
    for (j = 0, len = ref2.length; j < len; j++) {
      timeout = ref2[j];
      clearTimeout(timeout);
    }
    ref3 = this.currentNoteGroup.modules;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      module = ref3[k];
      ref4 = module.endNotes();
      for (l = 0, len2 = ref4.length; l < len2; l++) {
        note = ref4[l];
        this.processNote(note, this.currentNoteGroup);
      }
    }
    if (!this.quiet) {
      Backbone.Mediator.publish('script:note-group-ended', {});
    }
    this.scriptInProgress = false;
    this.trackScriptCompletionsFromNoteGroup(this.currentNoteGroup);
    this.currentNoteGroup = null;
    if (!this.noteGroupQueue.length) {
      this.notifyScriptStateChanged();
      this.resetThings();
    }
    return this.ending = false;
  };

  ScriptManager.prototype.onEndAll = function(e) {
    return this.endAll();
  };

  ScriptManager.prototype.endAll = function(options) {
    var i, j, k, l, len, len1, len2, module, note, noteGroup, notes, ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    if (this.scriptInProgress) {
      if ((!this.currentNoteGroup.script.skippable) && (!options.force)) {
        return;
      }
      this.endNoteGroup();
    }
    ref = this.noteGroupQueue;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      noteGroup = ref[i];
      if ((((ref1 = noteGroup.script) != null ? ref1.skippable : void 0) === false) && !options.force) {
        this.noteGroupQueue = this.noteGroupQueue.slice(i);
        this.run();
        this.notifyScriptStateChanged();
        return;
      }
      this.processNoteGroup(noteGroup);
      ref2 = noteGroup.modules;
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        module = ref2[k];
        notes = module.skipNotes();
        if (!this.quiet) {
          for (l = 0, len2 = notes.length; l < len2; l++) {
            note = notes[l];
            this.processNote(note, noteGroup);
          }
        }
      }
      if (!this.quiet) {
        this.trackScriptCompletionsFromNoteGroup(noteGroup);
      }
    }
    this.noteGroupQueue = [];
    this.resetThings();
    return this.notifyScriptStateChanged();
  };

  ScriptManager.prototype.onNoteGroupTimeout = function(noteGroup) {
    if (noteGroup !== this.currentNoteGroup) {
      return;
    }
    this.endNoteGroup();
    return this.run();
  };

  ScriptManager.prototype.resetThings = function() {
    Backbone.Mediator.publish('level:enable-controls', {});
    return Backbone.Mediator.publish('level:set-letterbox', {
      on: false
    });
  };

  ScriptManager.prototype.trackScriptCompletionsFromNoteGroup = function(noteGroup) {
    if (!noteGroup.isLast) {
      return;
    }
    return this.trackScriptCompletions(noteGroup.scriptID);
  };

  ScriptManager.prototype.trackScriptCompletions = function(scriptID) {
    var j, len, ref, script;
    if (this.quiet) {
      return;
    }
    if (indexOf.call(this.ended, scriptID) < 0) {
      this.ended.push(scriptID);
    }
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      if (script.id === scriptID) {
        script.lastEnded = new Date();
      }
    }
    this.lastScriptEnded = new Date();
    return Backbone.Mediator.publish('script:ended', {
      scriptID: scriptID
    });
  };

  ScriptManager.prototype.notifyScriptStateChanged = function() {
    var event, ref, ref1;
    if (this.quiet) {
      return;
    }
    event = {
      currentScript: ((ref = this.currentNoteGroup) != null ? ref.scriptID : void 0) || null,
      currentScriptOffset: ((ref1 = this.currentNoteGroup) != null ? ref1.index : void 0) || 0
    };
    return Backbone.Mediator.publish('script:state-changed', event);
  };

  return ScriptManager;

})(CocoClass);
});

;require.register("lib/scripts/ScriptModule", function(exports, require, module) {
var CocoClass, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoClass = require('core/CocoClass');

module.exports = ScriptModule = (function(superClass) {
  var movementTime, scrubbingTime;

  extend(ScriptModule, superClass);

  scrubbingTime = 0;

  movementTime = 0;

  function ScriptModule(noteGroup) {
    var base;
    this.noteGroup = noteGroup;
    ScriptModule.__super__.constructor.call(this);
    if (!this.noteGroup.prepared) {
      this.analyzeNoteGroup(this.noteGroup);
      if ((base = this.noteGroup).notes == null) {
        base.notes = [];
      }
      this.noteGroup.prepared = true;
    }
  }

  ScriptModule.neededFor = function() {
    return false;
  };

  ScriptModule.prototype.startNotes = function() {
    return [];
  };

  ScriptModule.prototype.endNotes = function() {
    return [];
  };

  ScriptModule.prototype.skipNotes = function() {
    return this.endNotes();
  };

  ScriptModule.prototype.analyzeNoteGroup = function() {
    var ref, ref1;
    this.movementTime = this.calculateMovementMax(this.noteGroup);
    return this.scrubbingTime = ((ref = this.noteGroup.playback) != null ? (ref1 = ref.scrub) != null ? ref1.duration : void 0 : void 0) || 0;
  };

  ScriptModule.prototype.calculateMovementMax = function() {
    var i, k, len, name, ref, sprite, sums;
    sums = {};
    ref = this.noteGroup.sprites;
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (sprite.move == null) {
        continue;
      }
      if (sums[name = sprite.id] == null) {
        sums[name] = 0;
      }
      sums[sprite.id] += sprite.move.duration;
    }
    sums = (function() {
      var results;
      results = [];
      for (k in sums) {
        results.push(sums[k]);
      }
      return results;
    })();
    return Math.max.apply(Math, [0].concat(slice.call(sums)));
  };

  ScriptModule.prototype.maybeApplyDelayToNote = function(note) {
    return note.delay = (this.scrubbingTime + this.movementTime) || 0;
  };

  return ScriptModule;

})(CocoClass);
});

;require.register("lib/scripts/SoundScriptModule", function(exports, require, module) {
var ScriptModule, SoundScriptModule, currentMusic, me, standingBy,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

currentMusic = null;

standingBy = null;

me = require('core/auth').me;

module.exports = SoundScriptModule = (function(superClass) {
  extend(SoundScriptModule, superClass);

  function SoundScriptModule() {
    return SoundScriptModule.__super__.constructor.apply(this, arguments);
  }

  SoundScriptModule.neededFor = function(noteGroup) {
    return noteGroup.sound != null;
  };

  SoundScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.sound.suppressSelectionSounds != null) {
      notes.push(this.addSuppressSelectionSoundsNote());
    }
    if (this.noteGroup.sound.music != null) {
      notes.push(this.addMusicNote());
    }
    return notes;
  };

  SoundScriptModule.prototype.endNotes = function() {
    return [];
  };

  SoundScriptModule.prototype.skipNotes = function() {
    return this.startNotes();
  };

  SoundScriptModule.prototype.addSuppressSelectionSoundsNote = function() {
    var note;
    note = {
      channel: 'level:suppress-selection-sounds',
      event: {
        suppress: this.noteGroup.sound.suppressSelectionSounds
      }
    };
    return note;
  };

  SoundScriptModule.prototype.addMusicNote = function() {
    var note;
    note = {
      channel: 'music-player:play-music',
      event: this.noteGroup.sound.music
    };
    return note;
  };

  return SoundScriptModule;

})(ScriptModule);
});

;require.register("lib/scripts/SpriteScriptModule", function(exports, require, module) {
var ScriptModule, SpritesScriptModule, me, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

me = require('core/auth').me;

utils = require('core/utils');

module.exports = SpritesScriptModule = (function(superClass) {
  extend(SpritesScriptModule, superClass);

  function SpritesScriptModule() {
    return SpritesScriptModule.__super__.constructor.apply(this, arguments);
  }

  SpritesScriptModule.neededFor = function(noteGroup) {
    var ref;
    return (ref = noteGroup.sprites) != null ? ref.length : void 0;
  };

  SpritesScriptModule.prototype.startNotes = function() {
    var i, j, len, len1, n, notes, ref, ref1, sprite;
    notes = [];
    this.moveSums = {};
    this.speakingSprites = {};
    ref = this.noteGroup.sprites || [];
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (sprite.move != null) {
        notes.push(this.spriteMoveNote(sprite));
      }
    }
    ref1 = this.noteGroup.sprites || [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      sprite = ref1[j];
      if (sprite.say != null) {
        notes.push(this.spriteSayNote(sprite, this.noteGroup.script));
      }
      if (sprite.select != null) {
        notes.push(this.spriteSelectNote(sprite));
      }
    }
    return (function() {
      var k, len2, results;
      results = [];
      for (k = 0, len2 = notes.length; k < len2; k++) {
        n = notes[k];
        if (n) {
          results.push(n);
        }
      }
      return results;
    })();
  };

  SpritesScriptModule.prototype.spriteMoveNote = function(sprite, instant) {
    var base, duration, name, note;
    if (instant == null) {
      instant = false;
    }
    duration = instant ? 0 : sprite.move.duration;
    note = {
      channel: 'sprite:move',
      event: {
        pos: sprite.move.target,
        duration: duration,
        spriteID: sprite.id
      }
    };
    if (duration) {
      if ((base = this.moveSums)[name = sprite.id] == null) {
        base[name] = 0;
      }
      note.delay = this.scrubbingTime + this.moveSums[sprite.id];
      this.moveSums[sprite.id] += sprite.move.duration;
    }
    return note;
  };

  SpritesScriptModule.prototype.spriteSayNote = function(sprite, script) {
    var blurb, i, len, note, ref, response, responses, sound, text;
    if (this.speakingSprites[sprite.id]) {
      return;
    }
    responses = sprite.say.responses;
    if (!(script.skippable || responses)) {
      responses = [];
    }
    ref = responses != null ? responses : [];
    for (i = 0, len = ref.length; i < len; i++) {
      response = ref[i];
      response.text = utils.i18n(response, 'text');
    }
    text = utils.i18n(sprite.say, 'text');
    blurb = utils.i18n(sprite.say, 'blurb');
    sound = utils.i18n(sprite.say, 'sound');
    note = {
      channel: 'level:sprite-dialogue',
      event: {
        message: text,
        blurb: blurb,
        mood: sprite.say.mood || 'explain',
        responses: responses,
        spriteID: sprite.id,
        sound: sound
      }
    };
    this.maybeApplyDelayToNote(note);
    return note;
  };

  SpritesScriptModule.prototype.spriteSelectNote = function(sprite) {
    var note;
    note = {
      channel: 'level:select-sprite',
      event: {
        thangID: sprite.select ? sprite.id : null
      }
    };
    return note;
  };

  SpritesScriptModule.prototype.endNotes = function() {
    var i, len, name, noteArray, notes, ref, sprite, spriteID, type;
    notes = {};
    ref = this.noteGroup.sprites || [];
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (notes[name = sprite.id] == null) {
        notes[name] = {};
      }
      if (sprite.move != null) {
        notes[sprite.id]['move'] = this.spriteMoveNote(sprite, true);
      }
      if (sprite.say != null) {
        notes[sprite.id]['say'] = {
          channel: 'level:sprite-clear-dialogue'
        };
      }
    }
    noteArray = [];
    for (spriteID in notes) {
      for (type in notes[spriteID]) {
        noteArray.push(notes[spriteID][type]);
      }
    }
    return noteArray;
  };

  return SpritesScriptModule;

})(ScriptModule);
});

;require.register("lib/scripts/SurfaceScriptModule", function(exports, require, module) {
var ScriptModule, SurfaceScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = SurfaceScriptModule = (function(superClass) {
  extend(SurfaceScriptModule, superClass);

  function SurfaceScriptModule() {
    return SurfaceScriptModule.__super__.constructor.apply(this, arguments);
  }

  SurfaceScriptModule.neededFor = function(noteGroup) {
    return noteGroup.surface != null;
  };

  SurfaceScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote());
    }
    if (this.noteGroup.surface.highlight != null) {
      notes.push(this.surfaceHighlightNote());
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.highlight != null) {
      notes.push({
        channel: 'sprite:highlight-sprites',
        event: {
          thangIDs: []
        }
      });
    }
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote(true));
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote(true));
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.surfaceCameraNote = function(instant) {
    var e, focus;
    if (instant == null) {
      instant = false;
    }
    focus = this.noteGroup.surface.focus;
    e = {};
    if (_.isPlainObject(focus.target)) {
      e.pos = focus.target;
    }
    if (_.isString(focus.target)) {
      e.thangID = focus.target;
    }
    e.zoom = focus.zoom || 2.0;
    e.duration = focus.duration != null ? focus.duration : 1500;
    if (instant) {
      e.duration = 0;
    }
    if (focus.bounds != null) {
      e.bounds = focus.bounds;
    }
    return {
      channel: 'camera:set-camera',
      event: e
    };
  };

  SurfaceScriptModule.prototype.surfaceHighlightNote = function() {
    var highlight, note;
    highlight = this.noteGroup.surface.highlight;
    note = {
      channel: 'sprite:highlight-sprites',
      event: {
        thangIDs: highlight.targets,
        delay: highlight.delay
      }
    };
    this.maybeApplyDelayToNote(note, this.noteGroup);
    return note;
  };

  SurfaceScriptModule.prototype.surfaceLockSelectNote = function() {
    return {
      channel: 'level:lock-select',
      event: {
        lock: this.noteGroup.surface.lockSelect
      }
    };
  };

  return SurfaceScriptModule;

})(ScriptModule);
});

;require.register("lib/simulator/Simulator", function(exports, require, module) {
var CocoClass, GoalManager, God, LevelLoader, SIMULATOR_VERSION, SimulationTask, Simulator, SuperModel, createAetherOptions, simulatorInfo,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SuperModel = require('models/SuperModel');

CocoClass = require('core/CocoClass');

LevelLoader = require('lib/LevelLoader');

GoalManager = require('lib/world/GoalManager');

God = require('lib/God');

createAetherOptions = require('lib/aether_utils').createAetherOptions;

SIMULATOR_VERSION = 4;

simulatorInfo = {};

if ($.browser) {
  if ($.browser.desktop) {
    simulatorInfo['desktop'] = $.browser.desktop;
  }
  if ($.browser.name) {
    simulatorInfo['name'] = $.browser.name;
  }
  if ($.browser.platform) {
    simulatorInfo['platform'] = $.browser.platform;
  }
  if ($.browser.versionNumber) {
    simulatorInfo['version'] = $.browser.versionNumber;
  }
}

module.exports = Simulator = (function(superClass) {
  extend(Simulator, superClass);

  function Simulator(options) {
    var simulatorType;
    this.options = options;
    this.cleanupAndSimulateAnotherTask = bind(this.cleanupAndSimulateAnotherTask, this);
    this.handleTaskResultsTransferError = bind(this.handleTaskResultsTransferError, this);
    this.handleTaskResultsTransferSuccess = bind(this.handleTaskResultsTransferSuccess, this);
    this.setupSimulationAndLoadLevel = bind(this.setupSimulationAndLoadLevel, this);
    this.simulateAnotherTaskAfterDelay = bind(this.simulateAnotherTaskAfterDelay, this);
    this.handleFetchTaskError = bind(this.handleFetchTaskError, this);
    this.fetchAndSimulateTask = bind(this.fetchAndSimulateTask, this);
    this.fetchAndSimulateOneGame = bind(this.fetchAndSimulateOneGame, this);
    if (this.options == null) {
      this.options = {};
    }
    simulatorType = this.options.headlessClient ? 'headless' : 'browser';
    this.simulator = {
      type: simulatorType,
      version: SIMULATOR_VERSION,
      info: simulatorInfo
    };
    _.extend(this, Backbone.Events);
    this.trigger('statusUpdate', 'Starting simulation!');
    this.retryDelayInSeconds = 2;
    this.taskURL = '/queue/scoring';
    this.simulatedByYou = 0;
    this.god = new God({
      maxAngels: 1,
      workerCode: this.options.workerCode,
      headless: true
    });
  }

  Simulator.prototype.destroy = function() {
    var ref;
    this.off();
    this.cleanupSimulation();
    if ((ref = this.god) != null) {
      ref.destroy();
    }
    return Simulator.__super__.destroy.call(this);
  };

  Simulator.prototype.fetchAndSimulateOneGame = function(humanGameID, ogresGameID) {
    if (this.destroyed) {
      return;
    }
    return $.ajax({
      url: '/queue/scoring/getTwoGames',
      type: 'POST',
      parse: true,
      data: {
        humansGameID: humanGameID,
        ogresGameID: ogresGameID,
        simulator: this.simulator,
        background: Boolean(this.options.background),
        levelID: this.options.levelID,
        leagueID: this.options.leagueID
      },
      error: function(errorData) {
        var ref;
        console.warn("There was an error fetching two games! " + (JSON.stringify(errorData)));
        if ((errorData != null ? (ref = errorData.responseText) != null ? ref.indexOf("Old simulator") : void 0 : void 0) !== -1) {
          return noty({
            text: errorData.responseText,
            layout: 'center',
            type: 'error'
          });
        }
      },
      success: (function(_this) {
        return function(taskData) {
          if (_this.destroyed) {
            return;
          }
          if (!taskData) {
            _this.retryDelayInSeconds = 10;
            _this.trigger('statusUpdate', "No games to simulate. Trying another game in " + _this.retryDelayInSeconds + " seconds.");
            _this.simulateAnotherTaskAfterDelay();
            return;
          }
          _this.trigger('statusUpdate', 'Setting up simulation...');
          _this.task = new SimulationTask(taskData);
          if (_this.supermodel == null) {
            _this.supermodel = new SuperModel();
          }
          _this.supermodel.resetProgress();
          _this.stopListening(_this.supermodel, 'loaded-all');
          _this.levelLoader = new LevelLoader({
            supermodel: _this.supermodel,
            levelID: _this.task.getLevelName(),
            sessionID: _this.task.getFirstSessionID(),
            opponentSessionID: _this.task.getSecondSessionID(),
            headless: true
          });
          if (_this.supermodel.finished()) {
            return _this.simulateSingleGame();
          } else {
            return _this.listenToOnce(_this.supermodel, 'loaded-all', _this.simulateSingleGame);
          }
        };
      })(this)
    });
  };

  Simulator.prototype.simulateSingleGame = function() {
    var error, error1;
    if (this.destroyed) {
      return;
    }
    this.assignWorldAndLevelFromLevelLoaderAndDestroyIt();
    this.trigger('statusUpdate', 'Simulating...');
    this.setupGod();
    try {
      return this.commenceSingleSimulation();
    } catch (error1) {
      error = error1;
      return this.handleSingleSimulationError(error);
    }
  };

  Simulator.prototype.commenceSingleSimulation = function() {
    this.listenToOnce(this.god, 'infinite-loop', this.handleSingleSimulationInfiniteLoop);
    this.listenToOnce(this.god, 'goals-calculated', this.processSingleGameResults);
    return this.god.createWorld(this.generateSpellsObject());
  };

  Simulator.prototype.handleSingleSimulationError = function(error) {
    console.error('There was an error simulating a single game!', error);
    if (this.destroyed) {
      return;
    }
    if (this.options.headlessClient && this.options.simulateOnlyOneGame) {
      console.log('GAMERESULT:tie');
      process.exit(0);
    }
    return this.cleanupAndSimulateAnotherTask();
  };

  Simulator.prototype.handleSingleSimulationInfiniteLoop = function(e) {
    console.log('There was an infinite loop in the single game!');
    if (this.destroyed) {
      return;
    }
    if (this.options.headlessClient && this.options.simulateOnlyOneGame) {
      console.log('GAMERESULT:tie');
      process.exit(0);
    }
    return this.cleanupAndSimulateAnotherTask();
  };

  Simulator.prototype.processSingleGameResults = function(simulationResults) {
    var error, error1, humanSessionRank, ogreSessionRank, taskResults;
    try {
      taskResults = this.formTaskResultsObject(simulationResults);
    } catch (error1) {
      error = error1;
      console.log("Failed to form task results:", error);
      return this.cleanupAndSimulateAnotherTask();
    }
    humanSessionRank = taskResults.sessions[0].metrics.rank;
    ogreSessionRank = taskResults.sessions[1].metrics.rank;
    if (this.options.headlessClient && this.options.simulateOnlyOneGame) {
      if (humanSessionRank === ogreSessionRank) {
        console.log('GAMERESULT:tie');
      } else if (humanSessionRank < ogreSessionRank) {
        console.log('GAMERESULT:humans');
      } else if (ogreSessionRank < humanSessionRank) {
        console.log('GAMERESULT:ogres');
      }
      return process.exit(0);
    } else {
      return this.sendSingleGameBackToServer(taskResults);
    }
  };

  Simulator.prototype.sendSingleGameBackToServer = function(results) {
    this.trigger('statusUpdate', 'Simulation completed, sending results back to server!');
    return $.ajax({
      url: '/queue/scoring/recordTwoGames',
      data: results,
      type: 'PUT',
      parse: true,
      success: this.handleTaskResultsTransferSuccess,
      error: this.handleTaskResultsTransferError,
      complete: this.cleanupAndSimulateAnotherTask
    });
  };

  Simulator.prototype.fetchAndSimulateTask = function() {
    if (this.destroyed) {
      return;
    }
    return this.fetchAndSimulateOneGame();
    if (this.options.headlessClient) {
      if (this.dumpThisTime) {
        console.log('Writing snapshot.');
        this.options.heapdump.writeSnapshot();
      }
      if (this.options.heapdump) {
        this.dumpThisTime = true;
      }
      if (this.options.testing) {
        _.delay(this.setupSimulationAndLoadLevel, 0, this.options.testFile, 'Testing...', {
          status: 400
        });
        return;
      }
    }
    this.trigger('statusUpdate', 'Fetching simulation data!');
    return $.ajax({
      url: this.taskURL,
      type: 'GET',
      parse: true,
      error: this.handleFetchTaskError,
      success: this.setupSimulationAndLoadLevel,
      cache: false
    });
  };

  Simulator.prototype.handleFetchTaskError = function(errorData) {
    console.error("There was a horrible Error: " + (JSON.stringify(errorData)));
    this.trigger('statusUpdate', 'There was an error fetching games to simulate. Retrying in 10 seconds.');
    return this.simulateAnotherTaskAfterDelay();
  };

  Simulator.prototype.handleNoGamesResponse = function() {
    var info;
    this.noTasks = true;
    info = 'Finding game to simulate...';
    console.log(info);
    this.trigger('statusUpdate', info);
    return this.fetchAndSimulateOneGame();
  };

  Simulator.prototype.simulateAnotherTaskAfterDelay = function() {
    var retryDelayInMilliseconds;
    console.log("Retrying in " + this.retryDelayInSeconds);
    retryDelayInMilliseconds = this.retryDelayInSeconds * 1000;
    return _.delay(this.fetchAndSimulateTask, retryDelayInMilliseconds);
  };

  Simulator.prototype.setupSimulationAndLoadLevel = function(taskData, textStatus, jqXHR) {
    var err, error1, levelID;
    if (jqXHR.status === 204) {
      return this.handleNoGamesResponse();
    }
    this.trigger('statusUpdate', 'Setting up simulation!');
    this.task = new SimulationTask(taskData);
    try {
      levelID = this.task.getLevelName();
    } catch (error1) {
      err = error1;
      console.error(err);
      this.trigger('statusUpdate', "Error simulating game: " + err + ". Trying another game in " + this.retryDelayInSeconds + " seconds.");
      this.simulateAnotherTaskAfterDelay();
      return;
    }
    if (this.supermodel == null) {
      this.supermodel = new SuperModel();
    }
    this.supermodel.resetProgress();
    this.stopListening(this.supermodel, 'loaded-all');
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: levelID,
      sessionID: this.task.getFirstSessionID(),
      opponentSessionID: this.task.getSecondSessionID(),
      headless: true
    });
    if (this.supermodel.finished()) {
      return this.simulateGame();
    } else {
      return this.listenToOnce(this.supermodel, 'loaded-all', this.simulateGame);
    }
  };

  Simulator.prototype.simulateGame = function() {
    var err, error1, info;
    if (this.destroyed) {
      return;
    }
    info = 'All resources loaded, simulating!';
    console.log(info);
    this.assignWorldAndLevelFromLevelLoaderAndDestroyIt();
    this.trigger('statusUpdate', info, this.task.getSessions());
    this.setupGod();
    try {
      return this.commenceSimulationAndSetupCallback();
    } catch (error1) {
      err = error1;
      console.error('There was an error in simulation:', err, err.stack, "-- trying again in " + this.retryDelayInSeconds + " seconds");
      return this.simulateAnotherTaskAfterDelay();
    }
  };

  Simulator.prototype.assignWorldAndLevelFromLevelLoaderAndDestroyIt = function() {
    this.world = this.levelLoader.world;
    this.task.setWorld(this.world);
    this.level = this.levelLoader.level;
    this.session = this.levelLoader.session;
    this.otherSession = this.levelLoader.opponentSession;
    this.levelLoader.destroy();
    return this.levelLoader = null;
  };

  Simulator.prototype.setupGod = function() {
    var humanFlagHistory, ogreFlagHistory, ref, ref1, ref2, ref3, session;
    this.god.setLevel(this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: this.otherSession,
      headless: true,
      sessionless: false
    }));
    this.god.setLevelSessionIDs((function() {
      var i, len, ref, results1;
      ref = this.task.getSessions();
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        session = ref[i];
        results1.push(session.sessionID);
      }
      return results1;
    }).call(this));
    this.god.setWorldClassMap(this.world.classMap);
    this.god.setGoalManager(new GoalManager(this.world, this.level.get('goals'), null, {
      headless: true
    }));
    humanFlagHistory = _.filter((ref = (ref1 = this.session.get('state')) != null ? ref1.flagHistory : void 0) != null ? ref : [], (function(_this) {
      return function(event) {
        var ref2;
        return event.source !== 'code' && event.team === ((ref2 = _this.session.get('team')) != null ? ref2 : 'humans');
      };
    })(this));
    ogreFlagHistory = _.filter((ref2 = (ref3 = this.otherSession.get('state')) != null ? ref3.flagHistory : void 0) != null ? ref2 : [], (function(_this) {
      return function(event) {
        var ref4;
        return event.source !== 'code' && event.team === ((ref4 = _this.otherSession.get('team')) != null ? ref4 : 'ogres');
      };
    })(this));
    this.god.lastFlagHistory = humanFlagHistory.concat(ogreFlagHistory);
    this.god.lastSubmissionCount = 0;
    return this.god.lastDifficulty = 0;
  };

  Simulator.prototype.commenceSimulationAndSetupCallback = function() {
    var leakcount, maxleakcount;
    this.listenToOnce(this.god, 'infinite-loop', this.onInfiniteLoop);
    this.listenToOnce(this.god, 'goals-calculated', this.processResults);
    this.god.createWorld(this.generateSpellsObject());
    if (this.options.headlessClient && this.options.leakTest && (this.memwatch == null)) {
      leakcount = 0;
      maxleakcount = 0;
      console.log('Setting leak callbacks.');
      this.memwatch = require('memwatch');
      return this.memwatch.on('leak', (function(_this) {
        return function(info) {
          console.warn("LEAK!!\n" + JSON.stringify(info));
          if (_this.hd == null) {
            if (leakcount++ === maxleakcount) {
              _this.hd = new _this.memwatch.HeapDiff();
              return _this.memwatch.on('stats', function(stats) {
                var diff;
                console.warn('stats callback: ' + stats);
                diff = _this.hd.end();
                console.warn("HeapDiff:\n" + JSON.stringify(diff));
                if (_this.options.exitOnLeak) {
                  console.warn('Exiting because of Leak.');
                  process.exit();
                }
                return _this.hd = new _this.memwatch.HeapDiff();
              });
            }
          }
        };
      })(this));
    }
  };

  Simulator.prototype.onInfiniteLoop = function(e) {
    if (this.destroyed) {
      return;
    }
    console.warn('Skipping infinitely looping game.');
    this.trigger('statusUpdate', "Infinite loop detected; grabbing a new game in " + this.retryDelayInSeconds + " seconds.");
    return _.delay(this.cleanupAndSimulateAnotherTask, this.retryDelayInSeconds * 1000);
  };

  Simulator.prototype.processResults = function(simulationResults) {
    var error, error1, taskResults;
    try {
      taskResults = this.formTaskResultsObject(simulationResults);
    } catch (error1) {
      error = error1;
      console.log("Failed to form task results:", error);
      return this.cleanupAndSimulateAnotherTask();
    }
    if (!taskResults.taskID) {
      console.error("*** Error: taskResults has no taskID ***\ntaskResults:", taskResults);
      return this.cleanupAndSimulateAnotherTask();
    } else {
      return this.sendResultsBackToServer(taskResults);
    }
  };

  Simulator.prototype.sendResultsBackToServer = function(results) {
    var i, len, ref, session, states, status;
    status = 'Recording:';
    ref = results.sessions;
    for (i = 0, len = ref.length; i < len; i++) {
      session = ref[i];
      states = [
        'wins', _.find(results.sessions, function(s) {
          return s.metrics.rank === 0;
        }) ? 'loses' : 'draws'
      ];
      status += " " + session.name + " " + states[session.metrics.rank];
    }
    this.trigger('statusUpdate', status);
    console.log('Sending result back to server:');
    console.log(JSON.stringify(results));
    if (this.options.headlessClient && this.options.testing) {
      return this.fetchAndSimulateTask();
    }
    return $.ajax({
      url: '/queue/scoring',
      data: results,
      type: 'PUT',
      parse: true,
      success: this.handleTaskResultsTransferSuccess,
      error: this.handleTaskResultsTransferError,
      complete: this.cleanupAndSimulateAnotherTask
    });
  };

  Simulator.prototype.handleTaskResultsTransferSuccess = function(result) {
    var simulatedBy;
    if (this.destroyed) {
      return;
    }
    console.log("Task registration result: " + (JSON.stringify(result)));
    this.trigger('statusUpdate', 'Results were successfully sent back to server!');
    this.simulatedByYou++;
    if (!this.options.headlessClient) {
      simulatedBy = parseInt($('#simulated-by-you').text(), 10) + 1;
      return $('#simulated-by-you').text(simulatedBy);
    }
  };

  Simulator.prototype.handleTaskResultsTransferError = function(error) {
    if (this.destroyed) {
      return;
    }
    this.trigger('statusUpdate', 'There was an error sending the results back to the server.');
    return console.log("Task registration error: " + (JSON.stringify(error)));
  };

  Simulator.prototype.cleanupAndSimulateAnotherTask = function() {
    if (this.destroyed) {
      return;
    }
    this.cleanupSimulation();
    if (this.options.background || this.noTasks) {
      return this.fetchAndSimulateOneGame();
    } else {
      return this.fetchAndSimulateTask();
    }
  };

  Simulator.prototype.cleanupSimulation = function() {
    this.stopListening(this.god);
    this.world = null;
    return this.level = null;
  };

  Simulator.prototype.formTaskResultsObject = function(simulationResults) {
    var i, len, ref, session, sessionResult, taskResults;
    taskResults = {
      taskID: this.task.getTaskID(),
      receiptHandle: this.task.getReceiptHandle(),
      originalSessionID: this.task.getFirstSessionID(),
      originalSessionRank: -1,
      calculationTime: 500,
      sessions: [],
      simulator: this.simulator,
      randomSeed: this.task.world.randomSeed
    };
    ref = this.task.getSessions();
    for (i = 0, len = ref.length; i < len; i++) {
      session = ref[i];
      sessionResult = {
        sessionID: session.sessionID,
        submitDate: session.submitDate,
        creator: session.creator,
        name: session.creatorName,
        totalScore: session.totalScore,
        metrics: {
          rank: this.calculateSessionRank(session.sessionID, simulationResults.goalStates, this.task.generateTeamToSessionMap())
        },
        shouldUpdateLastOpponentSubmitDateForLeague: session.shouldUpdateLastOpponentSubmitDateForLeague
      };
      if (session.sessionID === taskResults.originalSessionID) {
        taskResults.originalSessionRank = sessionResult.metrics.rank;
        taskResults.originalSessionTeam = session.team;
      }
      taskResults.sessions.push(sessionResult);
    }
    return taskResults;
  };

  Simulator.prototype.calculateSessionRank = function(sessionID, goalStates, teamSessionMap) {
    var goalState, humanGoals, humansWon, key, ogreGoals, ogresWon;
    ogreGoals = (function() {
      var results1;
      results1 = [];
      for (key in goalStates) {
        goalState = goalStates[key];
        if (goalState.team === 'ogres') {
          results1.push(goalState);
        }
      }
      return results1;
    })();
    humanGoals = (function() {
      var results1;
      results1 = [];
      for (key in goalStates) {
        goalState = goalStates[key];
        if (goalState.team === 'humans') {
          results1.push(goalState);
        }
      }
      return results1;
    })();
    ogresWon = _.all(ogreGoals, {
      status: 'success'
    });
    humansWon = _.all(humanGoals, {
      status: 'success'
    });
    if (ogresWon === humansWon) {
      return 0;
    } else if (ogresWon && teamSessionMap['ogres'] === sessionID) {
      return 0;
    } else if (ogresWon && teamSessionMap['ogres'] !== sessionID) {
      return 1;
    } else if (humansWon && teamSessionMap['humans'] === sessionID) {
      return 0;
    } else {
      return 1;
    }
  };

  Simulator.prototype.generateSpellsObject = function() {
    var aether, e, error1, fullSpellName, hero, i, len, ref, ref1, ref2, ref3, ref4, ref5, sessionInfo, spells, submittedCode, submittedCodeLanguage, team;
    spells = {};
    ref = [
      {
        hero: 'Hero Placeholder',
        team: 'humans'
      }, {
        hero: 'Hero Placeholder 1',
        team: 'ogres'
      }
    ];
    for (i = 0, len = ref.length; i < len; i++) {
      ref1 = ref[i], hero = ref1.hero, team = ref1.team;
      sessionInfo = _.filter(this.task.getSessions(), {
        team: team
      })[0];
      fullSpellName = _.string.slugify(hero) + '/plan';
      submittedCodeLanguage = (ref2 = sessionInfo != null ? sessionInfo.submittedCodeLanguage : void 0) != null ? ref2 : 'javascript';
      if (submittedCodeLanguage === 'clojure' || submittedCodeLanguage === 'io') {
        submittedCodeLanguage = 'javascript';
      }
      submittedCode = LZString.decompressFromUTF16((ref3 = sessionInfo != null ? (ref4 = sessionInfo.submittedCode) != null ? (ref5 = ref4[_.string.slugify(hero)]) != null ? ref5.plan : void 0 : void 0 : void 0) != null ? ref3 : '');
      aether = new Aether(createAetherOptions({
        functionName: 'plan',
        codeLanguage: submittedCodeLanguage,
        skipProtectAPI: false
      }));
      try {
        aether.transpile(submittedCode);
      } catch (error1) {
        e = error1;
        console.log("Couldn't transpile " + fullSpellName + ":\n" + submittedCode + "\n", e);
        aether.transpile('');
      }
      spells[fullSpellName] = {
        name: 'plan',
        team: team,
        thang: {
          thang: {
            id: hero
          },
          aether: aether
        }
      };
    }
    return spells;
  };

  return Simulator;

})(CocoClass);

SimulationTask = (function() {
  function SimulationTask(rawData) {
    this.rawData = rawData;
  }

  SimulationTask.prototype.getLevelName = function() {
    var levelName, ref, ref1;
    levelName = (ref = this.rawData.sessions) != null ? (ref1 = ref[0]) != null ? ref1.levelID : void 0 : void 0;
    if (levelName != null) {
      return levelName;
    }
    return this.throwMalformedTaskError('The level name couldn\'t be deduced from the task.');
  };

  SimulationTask.prototype.generateTeamToSessionMap = function() {
    var i, len, ref, session, teamSessionMap;
    teamSessionMap = {};
    ref = this.rawData.sessions;
    for (i = 0, len = ref.length; i < len; i++) {
      session = ref[i];
      if (teamSessionMap[session.team] != null) {
        this.throwMalformedTaskError('Two players share the same team');
      }
      teamSessionMap[session.team] = session.sessionID;
    }
    return teamSessionMap;
  };

  SimulationTask.prototype.throwMalformedTaskError = function(errorString) {
    throw new Error("The task was malformed, reason: " + errorString);
  };

  SimulationTask.prototype.getFirstSessionID = function() {
    return this.rawData.sessions[0].sessionID;
  };

  SimulationTask.prototype.getSecondSessionID = function() {
    return this.rawData.sessions[1].sessionID;
  };

  SimulationTask.prototype.getTaskID = function() {
    return this.rawData.taskID;
  };

  SimulationTask.prototype.getReceiptHandle = function() {
    return this.rawData.receiptHandle;
  };

  SimulationTask.prototype.getSessions = function() {
    return this.rawData.sessions;
  };

  SimulationTask.prototype.setWorld = function(world) {
    this.world = world;
  };

  return SimulationTask;

})();
});

;require.register("lib/sprites/SpriteBuilder", function(exports, require, module) {
var SpriteBuilder, hexToHSL, hslToHex, ref, sum,
  slice = [].slice;

ref = require('core/utils'), hexToHSL = ref.hexToHSL, hslToHex = ref.hslToHex;

module.exports = SpriteBuilder = (function() {
  function SpriteBuilder(thangType, options) {
    var raw;
    this.thangType = thangType;
    this.options = options;
    if (this.options == null) {
      this.options = {};
    }
    raw = this.thangType.get('raw') || {};
    this.shapeStore = raw.shapes;
    this.containerStore = raw.containers;
    this.animationStore = raw.animations;
    this.buildColorMaps();
  }

  SpriteBuilder.prototype.setOptions = function(options) {
    this.options = options;
  };

  SpriteBuilder.prototype.buildMovieClip = function(animationName, mode, startPosition, loops, labels) {
    var anim, animData, args, bounds, func, i, j, len, len1, locals, ref1, stopped, tween, tweenData;
    animData = this.animationStore[animationName];
    if (!animData) {
      console.error('couldn\'t find animData from', this.animationStore, 'for', animationName);
      return null;
    }
    locals = {};
    _.extend(locals, this.buildMovieClipShapes(animData.shapes));
    _.extend(locals, this.buildMovieClipContainers(animData.containers));
    _.extend(locals, this.buildMovieClipAnimations(animData.animations));
    _.extend(locals, this.buildMovieClipGraphics(animData.graphics));
    anim = new createjs.MovieClip();
    if (!labels) {
      labels = {};
      labels[animationName] = 0;
    }
    anim.initialize(mode != null ? mode : createjs.MovieClip.INDEPENDENT, startPosition != null ? startPosition : 0, loops != null ? loops : true, labels);
    ref1 = animData.tweens;
    for (i = 0, len = ref1.length; i < len; i++) {
      tweenData = ref1[i];
      tween = createjs.Tween;
      stopped = false;
      for (j = 0, len1 = tweenData.length; j < len1; j++) {
        func = tweenData[j];
        args = _.cloneDeep(func.a);
        this.dereferenceArgs(args, locals);
        if (tween[func.n]) {
          tween = tween[func.n].apply(tween, args);
        } else {
          stopped = true;
          break;
        }
      }
      if (!stopped) {
        anim.timeline.addTween(tween);
      }
    }
    anim.nominalBounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, animData.bounds, function(){});
    if (animData.frameBounds) {
      anim.frameBounds = (function() {
        var k, len2, ref2, results;
        ref2 = animData.frameBounds;
        results = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          bounds = ref2[k];
          results.push((function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(createjs.Rectangle, bounds, function(){}));
        }
        return results;
      })();
    }
    return anim;
  };

  SpriteBuilder.prototype.dereferenceArgs = function(args, locals) {
    var key, val;
    for (key in args) {
      val = args[key];
      if (locals[val]) {
        args[key] = locals[val];
      } else if (val === null) {
        args[key] = {};
      } else if (_.isString(val) && val.indexOf('createjs.') === 0) {
        args[key] = eval(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        this.dereferenceArgs(val, locals);
      }
    }
    return args;
  };

  SpriteBuilder.prototype.buildMovieClipShapes = function(localShapes) {
    var i, len, localShape, map, shape;
    map = {};
    for (i = 0, len = localShapes.length; i < len; i++) {
      localShape = localShapes[i];
      if (localShape.im) {
        shape = new createjs.Shape();
        shape._off = true;
      } else {
        shape = this.buildShapeFromStore(localShape.gn);
        if (localShape.m) {
          shape.mask = map[localShape.m];
        }
      }
      map[localShape.bn] = shape;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipContainers = function(localContainers) {
    var container, i, len, localContainer, map;
    map = {};
    for (i = 0, len = localContainers.length; i < len; i++) {
      localContainer = localContainers[i];
      container = this.buildContainerFromStore(localContainer.gn);
      container.setTransform.apply(container, localContainer.t);
      if (localContainer.o != null) {
        container._off = localContainer.o;
      }
      if (localContainer.al != null) {
        container.alpha = localContainer.al;
      }
      map[localContainer.bn] = container;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipAnimations = function(localAnimations) {
    var animation, i, len, localAnimation, map;
    map = {};
    for (i = 0, len = localAnimations.length; i < len; i++) {
      localAnimation = localAnimations[i];
      animation = this.buildMovieClip.apply(this, [localAnimation.gn].concat(slice.call(localAnimation.a)));
      animation.setTransform.apply(animation, localAnimation.t);
      map[localAnimation.bn] = animation;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipGraphics = function(localGraphics) {
    var graphic, i, len, localGraphic, map;
    map = {};
    for (i = 0, len = localGraphics.length; i < len; i++) {
      localGraphic = localGraphics[i];
      graphic = new createjs.Graphics().p(localGraphic.p);
      map[localGraphic.bn] = graphic;
    }
    return map;
  };

  SpriteBuilder.prototype.buildShapeFromStore = function(shapeKey, debug) {
    var ref1, ref2, ref3, ref4, ref5, shape, shapeData;
    if (debug == null) {
      debug = false;
    }
    shapeData = this.shapeStore[shapeKey];
    shape = new createjs.Shape();
    if (shapeData.lf != null) {
      (ref1 = shape.graphics).lf.apply(ref1, shapeData.lf);
    } else if (shapeData.fc != null) {
      shape.graphics.f(this.colorMap[shapeKey] || shapeData.fc);
    } else if (shapeData.rf != null) {
      (ref2 = shape.graphics).rf.apply(ref2, shapeData.rf);
    }
    if (shapeData.ls != null) {
      (ref3 = shape.graphics).ls.apply(ref3, shapeData.ls);
    } else if (shapeData.sc != null) {
      shape.graphics.s(shapeData.sc);
    }
    if (shapeData.ss != null) {
      (ref4 = shape.graphics).ss.apply(ref4, shapeData.ss);
    }
    if (shapeData.de != null) {
      (ref5 = shape.graphics).de.apply(ref5, shapeData.de);
    }
    if (shapeData.p != null) {
      shape.graphics.p(shapeData.p);
    }
    shape.setTransform.apply(shape, shapeData.t);
    return shape;
  };

  SpriteBuilder.prototype.buildContainerFromStore = function(containerKey) {
    var child, childData, cont, contData, i, len, ref1;
    if (!containerKey) {
      console.error('Yo we don\'t have no containerKey');
    }
    contData = this.containerStore[containerKey];
    cont = new createjs.Container();
    cont.initialize();
    ref1 = contData.c;
    for (i = 0, len = ref1.length; i < len; i++) {
      childData = ref1[i];
      if (_.isString(childData)) {
        child = this.buildShapeFromStore(childData);
      } else {
        if (!childData.gn) {
          continue;
        }
        child = this.buildContainerFromStore(childData.gn);
        child.setTransform.apply(child, childData.t);
      }
      cont.addChild(child);
    }
    cont.bounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, contData.b, function(){});
    return cont;
  };

  SpriteBuilder.prototype.buildColorMaps = function() {
    var colorConfig, colorGroups, config, group, results;
    this.colorMap = {};
    colorGroups = this.thangType.get('colorGroups');
    if (_.isEmpty(colorGroups)) {
      return;
    }
    if (!_.size(this.shapeStore)) {
      return;
    }
    colorConfig = this.options.colorConfig;
    if (!colorConfig) {
      return;
    }
    results = [];
    for (group in colorConfig) {
      config = colorConfig[group];
      if (!colorGroups[group]) {
        continue;
      }
      results.push(this.buildColorMapForGroup(colorGroups[group], config));
    }
    return results;
  };

  SpriteBuilder.prototype.buildColorMapForGroup = function(shapes, config) {
    var colors;
    if (!shapes.length) {
      return;
    }
    colors = this.initColorMap(shapes);
    this.adjustHuesForColorMap(colors, config.hue);
    this.adjustValueForColorMap(colors, 1, config.saturation);
    this.adjustValueForColorMap(colors, 2, config.lightness);
    return this.applyColorMap(shapes, colors);
  };

  SpriteBuilder.prototype.initColorMap = function(shapes) {
    var colors, hsl, i, len, shape, shapeKey;
    colors = {};
    for (i = 0, len = shapes.length; i < len; i++) {
      shapeKey = shapes[i];
      shape = this.shapeStore[shapeKey];
      if ((shape.fc == null) || colors[shape.fc]) {
        continue;
      }
      hsl = hexToHSL(shape.fc);
      colors[shape.fc] = hsl;
    }
    return colors;
  };

  SpriteBuilder.prototype.adjustHuesForColorMap = function(colors, targetHue) {
    var averageHue, diff, h, hex, hsl, hues, results;
    hues = (function() {
      var results;
      results = [];
      for (hex in colors) {
        hsl = colors[hex];
        results.push(hsl[0]);
      }
      return results;
    })();
    if (Math.max(hues) - Math.min(hues) > 0.5) {
      hues = ((function() {
        var i, len, results;
        if (h < 0.5) {
          return h + 1.0;
        } else {
          results = [];
          for (i = 0, len = hues.length; i < len; i++) {
            h = hues[i];
            results.push(h);
          }
          return results;
        }
      })());
    }
    averageHue = sum(hues) / hues.length;
    averageHue %= 1;
    if (targetHue == null) {
      targetHue = 0;
    }
    diff = targetHue - averageHue;
    results = [];
    for (hex in colors) {
      hsl = colors[hex];
      results.push(hsl[0] = (hsl[0] + diff + 1) % 1);
    }
    return results;
  };

  SpriteBuilder.prototype.adjustValueForColorMap = function(colors, index, targetValue) {
    var averageValue, diff, hex, hsl, results, values;
    values = (function() {
      var results;
      results = [];
      for (hex in colors) {
        hsl = colors[hex];
        results.push(hsl[index]);
      }
      return results;
    })();
    averageValue = sum(values) / values.length;
    if (targetValue == null) {
      targetValue = 0.5;
    }
    diff = targetValue - averageValue;
    results = [];
    for (hex in colors) {
      hsl = colors[hex];
      results.push(hsl[index] = Math.max(0, Math.min(1, hsl[index] + diff)));
    }
    return results;
  };

  SpriteBuilder.prototype.applyColorMap = function(shapes, colors) {
    var i, len, results, shape, shapeKey;
    results = [];
    for (i = 0, len = shapes.length; i < len; i++) {
      shapeKey = shapes[i];
      shape = this.shapeStore[shapeKey];
      if ((shape.fc == null) || !colors[shape.fc]) {
        continue;
      }
      results.push(this.colorMap[shapeKey] = hslToHex(colors[shape.fc]));
    }
    return results;
  };

  return SpriteBuilder;

})();

sum = function(nums) {
  return _.reduce(nums, function(s, num) {
    return s + num;
  });
};
});

;require.register("lib/sprites/SpriteExporter", function(exports, require, module) {
var CocoClass, SpriteBuilder, SpriteExporter, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('./SpriteBuilder');

ThangType = require('models/ThangType');

CocoClass = require('core/CocoClass');

SpriteExporter = (function(superClass) {
  'To be used by the ThangTypeEditView to export ThangTypes to single sprite sheets which can be uploaded to\nGridFS and used in gameplay, avoiding rendering vector images.\n\nCode has been copied and reworked and simplified from LayerAdapter. Some shared code has been refactored into\nThangType, but more work could be done to rethink and reorganize Sprite rendering.';
  extend(SpriteExporter, superClass);

  function SpriteExporter(thangType, options) {
    var action;
    this.thangType = thangType;
    if (options == null) {
      options = {};
    }
    this.colorConfig = options.colorConfig || {};
    this.resolutionFactor = options.resolutionFactor || 1;
    this.actionNames = options.actionNames || ((function() {
      var i, len, ref, results;
      ref = this.thangType.getDefaultActions();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        results.push(action.name);
      }
      return results;
    }).call(this));
    this.spriteType = options.spriteType || this.thangType.get('spriteType') || 'segmented';
    SpriteExporter.__super__.constructor.call(this);
  }

  SpriteExporter.prototype.build = function() {
    var e, error, spriteSheetBuilder;
    spriteSheetBuilder = new createjs.SpriteSheetBuilder();
    if (this.spriteType === 'segmented') {
      this.renderSegmentedThangType(spriteSheetBuilder);
    } else {
      this.renderSingularThangType(spriteSheetBuilder);
    }
    try {
      spriteSheetBuilder.buildAsync();
    } catch (error) {
      e = error;
      this.resolutionFactor *= 0.9;
      return this.build();
    }
    spriteSheetBuilder.on('complete', this.onBuildSpriteSheetComplete, this, true, spriteSheetBuilder);
    return this.asyncBuilder = spriteSheetBuilder;
  };

  SpriteExporter.prototype.renderSegmentedThangType = function(spriteSheetBuilder) {
    var container, containerGlobalName, containersToRender, frame, i, len, results, spriteBuilder;
    containersToRender = this.thangType.getContainersForActions(this.actionNames);
    spriteBuilder = new SpriteBuilder(this.thangType, {
      colorConfig: this.colorConfig
    });
    results = [];
    for (i = 0, len = containersToRender.length; i < len; i++) {
      containerGlobalName = containersToRender[i];
      container = spriteBuilder.buildContainerFromStore(containerGlobalName);
      frame = spriteSheetBuilder.addFrame(container, null, this.resolutionFactor * (this.thangType.get('scale') || 1));
      results.push(spriteSheetBuilder.addAnimation(containerGlobalName, [frame], false));
    }
    return results;
  };

  SpriteExporter.prototype.renderSingularThangType = function(spriteSheetBuilder) {
    var a, action, actionObjects, actions, animationActions, animationGroups, animationName, container, containerActions, containerGroups, containerName, frame, frames, framesMap, i, j, k, len, len1, len2, mc, next, ref, ref1, results, scale, spriteBuilder;
    actionObjects = _.values(this.thangType.getActions());
    animationActions = [];
    for (i = 0, len = actionObjects.length; i < len; i++) {
      a = actionObjects[i];
      if (!a.animation) {
        continue;
      }
      if (ref = a.name, indexOf.call(this.actionNames, ref) < 0) {
        continue;
      }
      animationActions.push(a);
    }
    spriteBuilder = new SpriteBuilder(this.thangType, {
      colorConfig: this.colorConfig
    });
    animationGroups = _.groupBy(animationActions, function(action) {
      return action.animation;
    });
    for (animationName in animationGroups) {
      actions = animationGroups[animationName];
      scale = actions[0].scale || this.thangType.get('scale') || 1;
      mc = spriteBuilder.buildMovieClip(animationName, null, null, null, {
        'temp': 0
      });
      spriteSheetBuilder.addMovieClip(mc, null, scale * this.resolutionFactor);
      frames = spriteSheetBuilder._animations['temp'].frames;
      framesMap = _.zipObject(_.range(frames.length), frames);
      for (j = 0, len1 = actions.length; j < len1; j++) {
        action = actions[j];
        if (action.frames) {
          frames = (function() {
            var k, len2, ref1, results;
            ref1 = action.frames.split(',');
            results = [];
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              frame = ref1[k];
              results.push(framesMap[parseInt(frame)]);
            }
            return results;
          })();
        } else {
          frames = _.sortBy(_.values(framesMap));
        }
        next = this.thangType.nextForAction(action);
        spriteSheetBuilder.addAnimation(action.name, frames, next);
      }
    }
    containerActions = [];
    for (k = 0, len2 = actionObjects.length; k < len2; k++) {
      a = actionObjects[k];
      if (!a.container) {
        continue;
      }
      if (ref1 = a.name, indexOf.call(this.actionNames, ref1) < 0) {
        continue;
      }
      containerActions.push(a);
    }
    containerGroups = _.groupBy(containerActions, function(action) {
      return action.container;
    });
    results = [];
    for (containerName in containerGroups) {
      actions = containerGroups[containerName];
      container = spriteBuilder.buildContainerFromStore(containerName);
      scale = actions[0].scale || this.thangType.get('scale') || 1;
      frame = spriteSheetBuilder.addFrame(container, null, scale * this.resolutionFactor);
      results.push((function() {
        var l, len3, results1;
        results1 = [];
        for (l = 0, len3 = actions.length; l < len3; l++) {
          action = actions[l];
          results1.push(spriteSheetBuilder.addAnimation(action.name, [frame], false));
        }
        return results1;
      })());
    }
    return results;
  };

  SpriteExporter.prototype.onBuildSpriteSheetComplete = function(e, builder) {
    var i, image, index, len, ref, total;
    if (builder.spriteSheet._images.length > 1) {
      total = 0;
      ref = builder.spriteSheet._images;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        image = ref[index];
        total += image.height / builder.maxHeight;
      }
      this.resolutionFactor /= Math.max(1.1, Math.sqrt(total));
      this._renderNewSpriteSheet(e.async);
      return;
    }
    return this.trigger('build', {
      spriteSheet: builder.spriteSheet
    });
  };

  return SpriteExporter;

})(CocoClass);

module.exports = SpriteExporter;
});

;require.register("lib/sprites/SpriteParser", function(exports, require, module) {
var SpriteParser,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = SpriteParser = (function() {
  function SpriteParser(thangTypeModel) {
    var base, base1, base2;
    this.thangTypeModel = thangTypeModel;
    this.thangType = $.extend(true, {}, this.thangTypeModel.attributes.raw);
    if (this.thangType == null) {
      this.thangType = {};
    }
    if ((base = this.thangType).shapes == null) {
      base.shapes = {};
    }
    if ((base1 = this.thangType).containers == null) {
      base1.containers = {};
    }
    if ((base2 = this.thangType).animations == null) {
      base2.animations = {};
    }
    this.shapeLongKeys = {};
    this.containerLongKeys = {};
    this.containerRenamings = {};
    this.animationLongKeys = {};
    this.animationRenamings = {};
    this.populateLongKeys();
  }

  SpriteParser.prototype.populateLongKeys = function() {
    var animation, container, longKey, ref, ref1, ref2, results, shape, shortKey;
    ref = this.thangType.shapes;
    for (shortKey in ref) {
      shape = ref[shortKey];
      longKey = JSON.stringify(_.values(shape));
      this.shapeLongKeys[longKey] = shortKey;
    }
    ref1 = this.thangType.containers;
    for (shortKey in ref1) {
      container = ref1[shortKey];
      longKey = JSON.stringify(_.values(container));
      this.containerLongKeys[longKey] = shortKey;
    }
    ref2 = this.thangType.animations;
    results = [];
    for (shortKey in ref2) {
      animation = ref2[shortKey];
      longKey = JSON.stringify(_.values(animation));
      results.push(this.animationLongKeys[longKey] = shortKey);
    }
    return results;
  };

  SpriteParser.prototype.parse = function(source) {
    var addChildArgs, animation, ast, blocks, bn, bounds, boundsIndex, c, childrenMovieClips, container, containers, gotIt, index, instructions, j, k, l, lastBounds, len, len1, len2, len3, len4, len5, len6, len7, len8, localAnimations, localContainers, localGraphics, localShapes, localTweens, m, mainClip, movieClip, movieClips, n, options, p, properties, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, shape, shapeKeys;
    properties = source.match(/.*lib\.properties = \{\n.*?width: (\d+),\n.*?height: (\d+)/im);
    this.width = parseInt((ref = properties != null ? properties[1] : void 0) != null ? ref : '0', 10);
    this.height = parseInt((ref1 = properties != null ? properties[2] : void 0) != null ? ref1 : '0', 10);
    source = source.replace(/lib\.webfontAvailable = (.|\n)+?};/, '');
    options = {
      loc: false,
      range: true
    };
    ast = esprima.parse(source, options);
    blocks = this.findBlocks(ast, source);
    containers = _.filter(blocks, {
      kind: 'Container'
    });
    movieClips = _.filter(blocks, {
      kind: 'MovieClip'
    });
    mainClip = (ref2 = _.last(movieClips)) != null ? ref2 : _.last(containers);
    this.animationName = mainClip.name;
    for (index = j = 0, len = containers.length; j < len; index = ++j) {
      container = containers[index];
      if (index === containers.length - 1 && !movieClips.length && ((ref3 = container.bounds) != null ? ref3.length : void 0)) {
        container.bounds[0] -= this.width / 2;
        container.bounds[1] -= this.height / 2;
      }
      ref4 = this.getShapesFromBlock(container, source), shapeKeys = ref4[0], localShapes = ref4[1];
      localContainers = this.getContainersFromMovieClip(container, source, true);
      addChildArgs = this.getAddChildCallArguments(container, source);
      instructions = [];
      for (k = 0, len1 = addChildArgs.length; k < len1; k++) {
        bn = addChildArgs[k];
        gotIt = false;
        for (l = 0, len2 = localShapes.length; l < len2; l++) {
          shape = localShapes[l];
          if (shape.bn === bn) {
            instructions.push(shape.gn);
            gotIt = true;
            break;
          }
        }
        if (gotIt) {
          continue;
        }
        for (m = 0, len3 = localContainers.length; m < len3; m++) {
          c = localContainers[m];
          if (c.bn === bn) {
            instructions.push({
              t: c.t,
              gn: c.gn
            });
            break;
          }
        }
      }
      if (!(container.bounds && instructions.length)) {
        continue;
      }
      this.addContainer({
        c: instructions,
        b: container.bounds
      }, container.name);
    }
    childrenMovieClips = [];
    for (index = n = 0, len4 = movieClips.length; n < len4; index = ++n) {
      movieClip = movieClips[index];
      lastBounds = null;
      ref5 = movieClip.frameBounds;
      for (boundsIndex = p = 0, len5 = ref5.length; p < len5; boundsIndex = ++p) {
        bounds = ref5[boundsIndex];
        if (!bounds) {
          movieClip.frameBounds[boundsIndex] = _.clone(lastBounds);
        } else {
          lastBounds = bounds;
        }
      }
      localGraphics = this.getGraphicsFromBlock(movieClip, source);
      ref6 = this.getShapesFromBlock(movieClip, source), shapeKeys = ref6[0], localShapes = ref6[1];
      localContainers = this.getContainersFromMovieClip(movieClip, source, true);
      localAnimations = this.getAnimationsFromMovieClip(movieClip, source, true);
      for (q = 0, len6 = localAnimations.length; q < len6; q++) {
        animation = localAnimations[q];
        childrenMovieClips.push(animation.gn);
      }
      localTweens = this.getTweensFromMovieClip(movieClip, source, localShapes, localContainers, localAnimations);
      this.addAnimation({
        shapes: localShapes,
        containers: localContainers,
        animations: localAnimations,
        tweens: localTweens,
        graphics: localGraphics,
        bounds: movieClip.bounds,
        frameBounds: movieClip.frameBounds
      }, movieClip.name);
    }
    for (r = 0, len7 = movieClips.length; r < len7; r++) {
      movieClip = movieClips[r];
      if (ref7 = movieClip.name, indexOf.call(childrenMovieClips, ref7) < 0) {
        ref8 = movieClip.frameBounds;
        for (s = 0, len8 = ref8.length; s < len8; s++) {
          bounds = ref8[s];
          bounds[0] -= this.width / 2;
          bounds[1] -= this.height / 2;
        }
        movieClip.bounds[0] -= this.width / 2;
        movieClip.bounds[1] -= this.height / 2;
      }
    }
    this.saveToModel();
    return (ref9 = movieClips[0]) != null ? ref9.name : void 0;
  };

  SpriteParser.prototype.saveToModel = function() {
    return this.thangTypeModel.set('raw', this.thangType);
  };

  SpriteParser.prototype.addShape = function(shape) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(shape));
    shortKey = this.shapeLongKeys[longKey];
    if (shortKey == null) {
      shortKey = '' + _.size(this.thangType.shapes);
      while (this.thangType.shapes[shortKey]) {
        shortKey += '+';
      }
      this.thangType.shapes[shortKey] = shape;
      this.shapeLongKeys[longKey] = shortKey;
    }
    return shortKey;
  };

  SpriteParser.prototype.addContainer = function(container, name) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(container));
    shortKey = this.containerLongKeys[longKey];
    if (shortKey == null) {
      shortKey = name;
      if (this.thangType.containers[shortKey] != null) {
        shortKey = this.animationName + ':' + name;
      }
      this.thangType.containers[shortKey] = container;
      this.containerLongKeys[longKey] = shortKey;
    }
    this.containerRenamings[name] = shortKey;
    return shortKey;
  };

  SpriteParser.prototype.addAnimation = function(animation, name) {
    var longKey, shortKey;
    longKey = JSON.stringify(_.values(animation));
    shortKey = this.animationLongKeys[longKey];
    if (shortKey != null) {
      this.animationRenamings[shortKey] = name;
    } else {
      shortKey = name;
      if (this.thangType.animations[shortKey] != null) {
        shortKey = this.animationName + ':' + name;
      }
      this.thangType.animations[shortKey] = animation;
      this.animationLongKeys[longKey] = shortKey;
      this.animationRenamings[name] = shortKey;
    }
    return shortKey;
  };

  SpriteParser.prototype.walk = function(node, parent, fn) {
    var child, grandchild, j, key, len;
    node.parent = parent;
    for (key in node) {
      child = node[key];
      if (key === 'parent') {
        continue;
      }
      if (_.isArray(child)) {
        for (j = 0, len = child.length; j < len; j++) {
          grandchild = child[j];
          if (_.isString(grandchild != null ? grandchild.type : void 0)) {
            this.walk(grandchild, node, fn);
          }
        }
      } else if (_.isString(child != null ? child.type : void 0)) {
        node.parent = parent;
        this.walk(child, node, fn);
      }
    }
    return fn(node);
  };

  SpriteParser.prototype.orphanify = function(node) {
    var child, grandchild, key, results;
    if (node.parent) {
      delete node.parent;
    }
    results = [];
    for (key in node) {
      child = node[key];
      if (key === 'parent') {
        continue;
      }
      if (_.isArray(child)) {
        results.push((function() {
          var j, len, results1;
          results1 = [];
          for (j = 0, len = child.length; j < len; j++) {
            grandchild = child[j];
            if (_.isString(grandchild != null ? grandchild.type : void 0)) {
              results1.push(this.orphanify(grandchild));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      } else if (_.isString(child != null ? child.type : void 0)) {
        if (node.parent) {
          delete node.parent;
        }
        results.push(this.orphanify(child));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpriteParser.prototype.subSourceFromRange = function(range, source) {
    return source.slice(range[0], range[1]);
  };

  SpriteParser.prototype.grabFunctionArguments = function(source, literal) {
    var args;
    if (literal == null) {
      literal = false;
    }
    args = source.replace(/.*?\(/, '[').replace(/\)[^)]*?$/, ']');
    if (literal) {
      return eval(args);
    } else {
      return args;
    }
  };

  SpriteParser.prototype.findBlocks = function(ast, source) {
    var functionExpressions, gatherFunctionExpressions, rectangles;
    functionExpressions = [];
    rectangles = [];
    gatherFunctionExpressions = (function(_this) {
      return function(node) {
        var arg, argSource, bounds, expression, frameBounds, frameBoundsRange, frameBoundsSource, frameBoundsStatement, i, j, kind, lastRect, len, name, nominalBounds, nominalBoundsRange, nominalBoundsSource, nominalBoundsStatement, ref, ref1, ref2, ref3, ref4, ref5, statement, statementIndex;
        if (node.type === 'FunctionExpression') {
          name = (ref = node.parent) != null ? (ref1 = ref.left) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0;
          if (name) {
            expression = node.parent.parent;
            if (!((ref3 = expression.parent) != null ? (ref4 = ref3.right) != null ? ref4.right : void 0 : void 0)) {
              if (/frame_[\d]+/.test(name)) {
                return;
              }
            }
            kind = expression.parent.right.right.callee.property.name;
            statement = node.parent.parent.parent.parent;
            statementIndex = _.indexOf(statement.parent.body, statement);
            nominalBoundsStatement = statement.parent.body[statementIndex + 1];
            nominalBoundsRange = nominalBoundsStatement.expression.right.range;
            nominalBoundsSource = _this.subSourceFromRange(nominalBoundsRange, source);
            nominalBounds = _this.grabFunctionArguments(nominalBoundsSource, true);
            frameBoundsStatement = statement.parent.body[statementIndex + 2];
            if (frameBoundsStatement) {
              frameBoundsRange = frameBoundsStatement.expression.right.range;
              frameBoundsSource = _this.subSourceFromRange(frameBoundsRange, source);
              if (frameBoundsSource.search(/\[rect/) === -1) {
                console.log('Didn\'t have multiframe bounds for this movie clip.');
                frameBounds = [_.clone(nominalBounds)];
              } else {
                lastRect = nominalBounds;
                frameBounds = [];
                ref5 = frameBoundsStatement.expression.right.elements;
                for (i = j = 0, len = ref5.length; j < len; i = ++j) {
                  arg = ref5[i];
                  bounds = null;
                  argSource = _this.subSourceFromRange(arg.range, source);
                  if (arg.type === 'Identifier') {
                    bounds = lastRect;
                  } else if (arg.type === 'NewExpression') {
                    bounds = _this.grabFunctionArguments(argSource, true);
                  } else if (arg.type === 'AssignmentExpression') {
                    bounds = _this.grabFunctionArguments(argSource.replace('rect=', ''), true);
                    lastRect = bounds;
                  } else if (arg.type === 'Literal' && arg.value === null) {
                    bounds = [0, 0, 1, 1];
                  }
                  frameBounds.push(_.clone(bounds));
                }
              }
            } else {
              frameBounds = [_.clone(nominalBounds)];
            }
            return functionExpressions.push({
              name: name,
              bounds: nominalBounds,
              frameBounds: frameBounds,
              expression: node.parent.parent,
              kind: kind
            });
          }
        }
      };
    })(this);
    this.walk(ast, null, gatherFunctionExpressions);
    return functionExpressions;
  };


  /*
    this.shape_1.graphics.f('#605E4A').s().p('AAOD/IgOgaIAEhkIgmgdIgMgBIgPgFIgVgJQA1h9g8jXQAQAHAOASQAQAUAKAeQARAuAJBJQAHA/gBA5IAAADIACAfIAFARIACAGIAEAHIAHAHQAVAXAQAUQAUAaANAUIABACIgsgdIgggXIAAAnIABAwIgBgBg');
    this.shape_1.sett(23.2,30.1);
  
    this.shape.graphics.f().s('#000000').ss(0.1,1,1).p('AAAAAQAAAAAAAA');
    this.shape.sett(3.8,22.4);
   */

  SpriteParser.prototype.getGraphicsFromBlock = function(block, source) {
    var gatherShapeDefinitions, localGraphics;
    block = block.expression.object.right.body;
    localGraphics = [];
    gatherShapeDefinitions = (function(_this) {
      return function(node) {
        var blockName, graphicsString;
        if (!(node.type === 'NewExpression' && node.callee.property.name === 'Graphics')) {
          return;
        }
        blockName = node.parent.parent.parent.id.name;
        graphicsString = node.parent.parent["arguments"][0].value;
        return localGraphics.push({
          p: graphicsString,
          bn: blockName
        });
      };
    })(this);
    this.walk(block, null, gatherShapeDefinitions);
    return localGraphics;
  };

  SpriteParser.prototype.getShapesFromBlock = function(block, source) {
    var gatherShapeDefinitions, localShapes, shapeKeys;
    block = block.expression.object.right.body;
    shapeKeys = [];
    localShapes = [];
    gatherShapeDefinitions = (function(_this) {
      return function(node) {
        var body, callName, drawEllipse, drawEllipseSource, exp, fillCall, fillColor, graphicsStatement, graphicsStatementIndex, j, len, linearGradientFill, linearGradientFillSource, linearGradientStroke, linearGradientStrokeSource, localShape, mask, matchedName, name, path, radialGradientFill, radialGradientFillSource, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref3, ref4, ref5, ref6, ref7, ref8, ref9, shape, shapeKey, statement, strokeCall, strokeColor, strokeStyle, strokeStyleSource, t, tSource;
        if (node.type !== 'MemberExpression') {
          return;
        }
        name = (ref = node.object) != null ? (ref1 = ref.object) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0;
        if (!name) {
          name = (ref3 = node.parent) != null ? (ref4 = ref3.parent) != null ? (ref5 = ref4.id) != null ? ref5.name : void 0 : void 0 : void 0;
          if (!(name && name.indexOf('mask') === 0 && ((ref6 = node.property) != null ? ref6.name : void 0) === 'Shape')) {
            return;
          }
          shape = {
            bn: name,
            im: true
          };
          localShapes.push(shape);
          return;
        }
        if (!(name.search('shape') === 0 && ((ref7 = node.object.property) != null ? ref7.name : void 0) === 'graphics')) {
          return;
        }
        fillCall = node.parent;
        if (fillCall.callee.property.name === 'lf') {
          linearGradientFillSource = _this.subSourceFromRange(fillCall.parent.range, source);
          linearGradientFill = _this.grabFunctionArguments(linearGradientFillSource.replace(/.*?lf\(/, 'lf('), true);
        } else if (fillCall.callee.property.name === 'rf') {
          radialGradientFillSource = _this.subSourceFromRange(fillCall.parent.range, source);
          radialGradientFill = _this.grabFunctionArguments(radialGradientFillSource.replace(/.*?lf\(/, 'lf('), true);
        } else {
          fillColor = (ref8 = (ref9 = fillCall["arguments"][0]) != null ? ref9.value : void 0) != null ? ref8 : null;
          callName = fillCall.callee.property.name;
          if (callName !== 'f') {
            console.error('What is this?! Not a fill!', callName);
          }
        }
        strokeCall = node.parent.parent.parent.parent;
        if (strokeCall.object.callee.property.name === 'ls') {
          linearGradientStrokeSource = _this.subSourceFromRange(strokeCall.parent.range, source);
          linearGradientStroke = _this.grabFunctionArguments(linearGradientStrokeSource.replace(/.*?ls\(/, 'ls(').replace(/\).ss\(.*/, ')'), true);
        } else {
          strokeColor = (ref10 = (ref11 = strokeCall.object["arguments"]) != null ? (ref12 = ref11[0]) != null ? ref12.value : void 0 : void 0) != null ? ref10 : null;
          if (strokeCall.object.callee.property.name !== 's') {
            console.error('What is this?! Not a stroke!');
          }
        }
        strokeStyle = null;
        graphicsStatement = strokeCall.parent;
        if (strokeColor || linearGradientStroke) {
          strokeStyleSource = _this.subSourceFromRange(strokeCall.parent.range, source);
          if (strokeStyleSource.search(/ss\(/) !== -1) {
            strokeStyle = _this.grabFunctionArguments(strokeStyleSource.replace(/.*?ss\(/, 'ss('), true);
            graphicsStatement = strokeCall.parent.parent.parent;
          }
        }
        if (graphicsStatement.callee.property.name === 'de') {
          drawEllipseSource = _this.subSourceFromRange(graphicsStatement.parent.range, source);
          drawEllipse = _this.grabFunctionArguments(drawEllipseSource.replace(/.*?de\(/, 'de('), true);
        } else {
          path = (ref13 = (ref14 = graphicsStatement["arguments"]) != null ? (ref15 = ref14[0]) != null ? ref15.value : void 0 : void 0) != null ? ref13 : null;
          if (graphicsStatement.callee.property.name !== 'p') {
            console.error('What is this?! Not a path!');
          }
        }
        body = graphicsStatement.parent.parent.body;
        graphicsStatementIndex = _.indexOf(body, graphicsStatement.parent);
        t = body[graphicsStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        if (tSource.search('setTransform') === -1) {
          t = [0, 0];
        } else {
          t = _this.grabFunctionArguments(tSource, true);
        }
        ref16 = body.slice(graphicsStatementIndex + 2);
        for (j = 0, len = ref16.length; j < len; j++) {
          statement = ref16[j];
          if (((ref17 = statement.expression) != null ? (ref18 = ref17.left) != null ? (ref19 = ref18.property) != null ? ref19.name : void 0 : void 0 : void 0) !== 'mask') {
            continue;
          }
          exp = statement.expression;
          matchedName = false;
          while (exp) {
            matchedName = matchedName || ((ref20 = exp.left) != null ? (ref21 = ref20.object) != null ? (ref22 = ref21.property) != null ? ref22.name : void 0 : void 0 : void 0) === name;
            mask = exp.name;
            exp = exp.right;
          }
          if (!matchedName) {
            continue;
          }
          break;
        }
        shape = {
          t: t
        };
        if (path) {
          shape.p = path;
        }
        if (drawEllipse) {
          shape.de = drawEllipse;
        }
        if (strokeColor) {
          shape.sc = strokeColor;
        }
        if (strokeStyle) {
          shape.ss = strokeStyle;
        }
        if (fillColor) {
          shape.fc = fillColor;
        }
        if (linearGradientFill) {
          shape.lf = linearGradientFill;
        }
        if (radialGradientFill) {
          shape.rf = radialGradientFill;
        }
        if (linearGradientStroke) {
          shape.ls = linearGradientStroke;
        }
        if (name.search('shape') !== -1 && shape.fc === 'rgba(0,0,0,0.451)' && !shape.ss && !shape.sc) {
          console.log('Skipping a shadow', name, shape, 'because we\'re doing shadows separately now.');
          return;
        }
        shapeKeys.push(shapeKey = _this.addShape(shape));
        localShape = {
          bn: name,
          gn: shapeKey
        };
        if (mask) {
          localShape.m = mask;
        }
        return localShapes.push(localShape);
      };
    })(this);
    this.walk(block, null, gatherShapeDefinitions);
    return [shapeKeys, localShapes];
  };

  SpriteParser.prototype.getContainersFromMovieClip = function(movieClip, source, possibleAnimations) {
    var block, gatherContainerDefinitions, localContainers;
    if (possibleAnimations == null) {
      possibleAnimations = false;
    }
    block = movieClip.expression.object.right.body;
    localContainers = [];
    gatherContainerDefinitions = (function(_this) {
      return function(node) {
        var args, bn, body, expressionStatement, expressionStatementIndex, gn, libName, localContainer, o, ref, ref1, ref2, ref3, ref4, ref5, t, tSource;
        if (!(node.type === 'Identifier' && node.name === 'lib')) {
          return;
        }
        args = node.parent.parent["arguments"];
        libName = node.parent.property.name;
        if (args.length && !possibleAnimations) {
          return;
        }
        gn = _this.containerRenamings[libName];
        if (possibleAnimations && !gn) {
          return;
        }
        bn = node.parent.parent.parent.left.property.name;
        expressionStatement = node.parent.parent.parent.parent;
        body = expressionStatement.parent.body;
        expressionStatementIndex = _.indexOf(body, expressionStatement);
        t = body[expressionStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        t = _this.grabFunctionArguments(tSource, true);
        o = body[expressionStatementIndex + 2].expression;
        localContainer = {
          bn: bn,
          t: t,
          gn: gn
        };
        if (o && ((ref = o.left) != null ? (ref1 = ref.object) != null ? (ref2 = ref1.property) != null ? ref2.name : void 0 : void 0 : void 0) === bn && ((ref3 = o.left.property) != null ? ref3.name : void 0) === '_off') {
          localContainer.o = o.right.value;
        } else if (o && ((ref4 = o.left) != null ? (ref5 = ref4.property) != null ? ref5.name : void 0 : void 0) === 'alpha') {
          localContainer.al = o.right.value;
        }
        return localContainers.push(localContainer);
      };
    })(this);
    this.walk(block, null, gatherContainerDefinitions);
    return localContainers;
  };

  SpriteParser.prototype.getAnimationsFromMovieClip = function(movieClip, source, possibleContainers) {
    var block, gatherAnimationDefinitions, localAnimations;
    if (possibleContainers == null) {
      possibleContainers = false;
    }
    block = movieClip.expression.object.right.body;
    localAnimations = [];
    gatherAnimationDefinitions = (function(_this) {
      return function(node) {
        var args, bn, body, expressionStatement, expressionStatementIndex, gn, libName, localAnimation, ref, t, tSource;
        if (!(node.type === 'Identifier' && node.name === 'lib')) {
          return;
        }
        args = node.parent.parent["arguments"];
        libName = node.parent.property.name;
        if (!(args.length || possibleContainers)) {
          return;
        }
        if (_this.containerRenamings[libName] && !_this.animationRenamings[libName]) {
          return;
        }
        args = _this.grabFunctionArguments(_this.subSourceFromRange(node.parent.parent.range, source), true);
        bn = node.parent.parent.parent.left.property.name;
        expressionStatement = node.parent.parent.parent.parent;
        body = expressionStatement.parent.body;
        expressionStatementIndex = _.indexOf(body, expressionStatement);
        t = body[expressionStatementIndex + 1].expression;
        tSource = _this.subSourceFromRange(t.range, source);
        t = _this.grabFunctionArguments(tSource, true);
        gn = (ref = _this.animationRenamings[libName]) != null ? ref : libName;
        localAnimation = {
          bn: bn,
          t: t,
          gn: gn,
          a: args
        };
        return localAnimations.push(localAnimation);
      };
    })(this);
    this.walk(block, null, gatherAnimationDefinitions);
    return localAnimations;
  };

  SpriteParser.prototype.getTweensFromMovieClip = function(movieClip, source, localShapes, localContainers, localAnimations) {
    var block, gatherTweens, localTweens;
    block = movieClip.expression.object.right.body;
    localTweens = [];
    gatherTweens = (function(_this) {
      return function(node) {
        var callExpressions, gatherCallExpressions, ref, tweenNode;
        if (((ref = node.property) != null ? ref.name : void 0) !== 'addTween') {
          return;
        }
        callExpressions = [];
        tweenNode = node;
        gatherCallExpressions = function(node) {
          var a, args, argsSource, flattenedRanges, name, range, ref1, ref2, ref3, ref4, ref5, ref6, shadowTween;
          if (node.type !== 'CallExpression') {
            return;
          }
          name = (ref1 = node.callee.property) != null ? ref1.name : void 0;
          if (name !== 'get' && name !== 'to' && name !== 'wait') {
            return;
          }
          if (name === 'get' && callExpressions.length) {
            return;
          }
          flattenedRanges = _.flatten([
            (function() {
              var j, len, ref2, results;
              ref2 = node["arguments"];
              results = [];
              for (j = 0, len = ref2.length; j < len; j++) {
                a = ref2[j];
                results.push(a.range);
              }
              return results;
            })()
          ]);
          range = [_.min(flattenedRanges), _.max(flattenedRanges)];
          argsSource = _this.subSourceFromRange(range, source);
          argsSource = argsSource.replace(/mask/g, 'this.mask');
          argsSource = argsSource.replace(/this\.([a-z_0-9]+)/ig, '"$1"');
          argsSource = argsSource.replace(/cjs(.+)\)/, '"createjs$1)"');
          if (argsSource === 'this') {
            argsSource = '{}';
          }
          args = eval("[" + argsSource + "]");
          shadowTween = ((ref2 = args[0]) != null ? typeof ref2.search === "function" ? ref2.search('shape') : void 0 : void 0) === 0 && !_.find(localShapes, {
            bn: args[0]
          });
          shadowTween = shadowTween || ((ref3 = args[0]) != null ? (ref4 = ref3.state) != null ? (ref5 = ref4[0]) != null ? (ref6 = ref5.t) != null ? typeof ref6.search === "function" ? ref6.search('shape') : void 0 : void 0 : void 0 : void 0 : void 0) === 0 && !_.find(localShapes, {
            bn: args[0].state[0].t
          });
          if (shadowTween) {
            console.log('Skipping tween', name, argsSource, args, 'from localShapes', localShapes, 'presumably because it\'s a shadow we skipped.');
            return;
          }
          return callExpressions.push({
            n: name,
            a: args
          });
        };
        _this.walk(node.parent.parent, null, gatherCallExpressions);
        return localTweens.push(callExpressions);
      };
    })(this);
    this.walk(block, null, gatherTweens);
    return localTweens;
  };

  SpriteParser.prototype.getAddChildCallArguments = function(block, source) {
    var gatherAddChildCalls, localArgs;
    block = block.expression.object.right.body;
    localArgs = [];
    gatherAddChildCalls = (function(_this) {
      return function(node) {
        var arg, args, j, len;
        if (!(node.type === 'Identifier' && node.name === 'addChild')) {
          return;
        }
        args = node.parent.parent["arguments"];
        args = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = args.length; j < len; j++) {
            arg = args[j];
            results.push(arg.property.name);
          }
          return results;
        })();
        for (j = 0, len = args.length; j < len; j++) {
          arg = args[j];
          localArgs.push(arg);
        }
      };
    })(this);
    this.walk(block, null, gatherAddChildCalls);
    return localArgs;
  };

  return SpriteParser;

})();


/*

  this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.82,scaleY:0.79,rotation:-10.8,x:98.4,y:-86.5},4).to({scaleY:0.7,rotation:9.3,x:95.6,y:-48.8},1).to({scaleX:0.82,scaleY:0.61,rotation:29.4,x:92.8,y:-11},1).to({regX:7.3,scaleX:0.82,scaleY:0.53,rotation:49.7,x:90.1,y:26.6},1).to({regX:7.2,regY:29.8,scaleY:0.66,rotation:19.3,x:101.2,y:-27.8},2).to({regY:29.9,scaleY:0.79,rotation:-10.8,x:98.4,y:-86.5},2).to({scaleX:0.84,scaleY:0.83,rotation:-30.7,x:68.4,y:-110},2).to({regX:7.3,scaleX:0.84,scaleY:0.84,rotation:-33.9,x:63.5,y:-114},1).wait(1));
 */


/*
simpleSample = """
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.enemy_flying_move_side = function(mode,startPosition,loop) {
  this.initialize(mode,startPosition,loop,{});

  // D_Head
  this.instance = new lib.Dragon_Head();
  this.instance.setTransform(227,200.5,1,1,0,0,0,51.9,42.5);

  this.timeline.addTween(cjs.Tween.get(this.instance).to({y:182.9},7).to({y:200.5},7).wait(1));

  // Layer 7
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#4F6877').s().p('AgsAxQgSgVgB');
  this.shape.setTransform(283.1,146.1);

  // Layer 7 2
  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('rgba(255,255,255,0.4)').s().p('ArTs0QSMB7EbVGQhsBhiGBHQjg1IvVkhg');
  this.shape_1.setTransform(400.2,185.5);

  this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},7).to({state:[]},2).wait(6));

  // Wing
  this.instance_9 = new lib.Wing_Animation('synched',0);
  this.instance_9.setTransform(313.9,145.6,1,1,0,0,0,49,-83.5);

  this.timeline.addTween(cjs.Tween.get(this.instance_9).to({y:128,startPosition:7},7).wait(1));

  // Example hard one with two shapes
  this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},7).to({state:[{t:this.shape_1}]},1).to({state:[]},1).wait(7));


}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7.1,48.9,528.7,431.1);

(lib.Dragon_Head = function() {
  this.initialize();

  // Isolation Mode
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#1D2226').s().p('AgVAwQgUgdgN');
  this.shape.setTransform(75,25.8);

  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('#1D2226').s().p('AgnBXQACABAF');
  this.shape_1.setTransform(80.8,22);

  this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(5.8,0,87.9,85);

(lib.WingPart_01 = function() {
  this.initialize();

  // Layer 1
  this.shape = new cjs.Shape();
  this.shape.graphics.f('#DBDDBC').s().p('Ag3BeQgCgRA');
  this.shape.setTransform(10.6,19.7,1.081,1.081);

  this.shape_1 = new cjs.Shape();
  this.shape_1.graphics.f('#1D2226').s().p('AB4CDQgGg');
  this.shape_1.setTransform(19.9,17.6,1.081,1.081);

  this.shape_2 = new cjs.Shape();
  this.shape_2.graphics.f('#605E4A').s().p('AiECbQgRg');
  this.shape_2.setTransform(19.5,18.4,1.081,1.081);

  this.addChild(this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-3.1,40,41.6);


(lib.Wing_Animation = function(mode,startPosition,loop) {
  this.initialize(mode,startPosition,loop,{});

  // WP_02
  this.instance = new lib.WingPart_01();
  this.instance.setTransform(53.6,-121.9,0.854,0.854,-40.9,0,0,7.2,29.9);

  this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleY:0.7,rotation:9.3,x:95.6,y:-48.8},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.7,-161.6,153.4,156.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
"""
 */
});

;require.register("lib/surface/Camera", function(exports, require, module) {
var Camera, CocoClass, DEFAULT_TARGET, DEFAULT_TIME, DEFAULT_ZOOM, GameUIState, MAX_ZOOM, MIN_ZOOM, STANDARD_ZOOM_HEIGHT, STANDARD_ZOOM_WIDTH, d2r, r2d,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

GameUIState = require('models/GameUIState');

r2d = function(radians) {
  return radians * 180 / Math.PI;
};

d2r = function(degrees) {
  return degrees / 180 * Math.PI;
};

MAX_ZOOM = 8;

MIN_ZOOM = 0.1;

DEFAULT_ZOOM = 2.0;

DEFAULT_TARGET = {
  x: 0,
  y: 0
};

DEFAULT_TIME = 1000;

STANDARD_ZOOM_WIDTH = 924;

STANDARD_ZOOM_HEIGHT = 589;

module.exports = Camera = (function(superClass) {
  extend(Camera, superClass);

  Camera.PPM = 10;

  Camera.MPP = 0.1;

  Camera.prototype.bounds = null;

  Camera.prototype.target = DEFAULT_TARGET;

  Camera.prototype.zoom = DEFAULT_ZOOM;

  Camera.prototype.canvasScaleFactorX = 1;

  Camera.prototype.canvasScaleFactorY = 1;

  Camera.prototype.oldZoom = null;

  Camera.prototype.newZoom = null;

  Camera.prototype.oldTarget = null;

  Camera.prototype.newTarget = null;

  Camera.prototype.tweenProgress = 0.0;

  Camera.prototype.instant = false;

  Camera.prototype.subscriptions = {
    'camera:zoom-in': 'onZoomIn',
    'camera:zoom-out': 'onZoomOut',
    'camera:zoom-to': 'onZoomTo',
    'level:restarted': 'onLevelRestarted'
  };

  function Camera(canvas, options) {
    var angle, hFOV, ref;
    this.canvas = canvas;
    this.options = options != null ? options : {};
    this.finishTween = bind(this.finishTween, this);
    angle = Math.asin(0.75);
    hFOV = d2r(30);
    Camera.__super__.constructor.call(this);
    this.gameUIState = this.options.gameUIState || new GameUIState();
    this.listenTo(this.gameUIState, 'surface:stage-mouse-move', this.onMouseMove);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-down', this.onMouseDown);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-up', this.onMouseUp);
    this.listenTo(this.gameUIState, 'surface:mouse-scrolled', this.onMouseScrolled);
    this.handleEvents = (ref = this.options.handleEvents) != null ? ref : true;
    this.canvasWidth = parseInt(this.canvas.attr('width'), 10);
    this.canvasHeight = parseInt(this.canvas.attr('height'), 10);
    this.offset = {
      x: 0,
      y: 0
    };
    this.calculateViewingAngle(angle);
    this.calculateFieldOfView(hFOV);
    this.calculateAxisConversionFactors();
    this.calculateMinMaxZoom();
    this.updateViewports();
  }

  Camera.prototype.onResize = function(newCanvasWidth, newCanvasHeight) {
    this.canvasScaleFactorX = newCanvasWidth / this.canvasWidth;
    this.canvasScaleFactorY = newCanvasHeight / this.canvasHeight;
    return Backbone.Mediator.publish('camera:zoom-updated', {
      camera: this,
      zoom: this.zoom,
      surfaceViewport: this.surfaceViewport
    });
  };

  Camera.prototype.calculateViewingAngle = function(angle) {
    var epsilon;
    epsilon = 0.000001;
    this.angle = Math.max(Math.min(Math.PI / 2 - epsilon, angle), epsilon);
    if (this.angle !== angle && angle !== 0 && angle !== Math.PI / 2) {
      return console.log("Restricted given camera angle of " + (r2d(angle)) + " to " + (r2d(this.angle)) + ".");
    }
  };

  Camera.prototype.calculateFieldOfView = function(hFOV) {
    var epsilon;
    epsilon = 0.000001;
    this.hFOV = Math.max(Math.min(Math.PI - epsilon, hFOV), epsilon);
    if (this.hFOV !== hFOV && hFOV !== 0 && hFOV !== Math.PI) {
      console.log("Restricted given horizontal field of view to " + (r2d(hFOV)) + " to " + (r2d(this.hFOV)) + ".");
    }
    this.vFOV = 2 * Math.atan(Math.tan(this.hFOV / 2) * this.canvasHeight / this.canvasWidth);
    if (this.vFOV > Math.PI) {
      console.log('Vertical field of view problem: expected canvas not to be taller than it is wide with high field of view.');
      return this.vFOV = Math.PI - epsilon;
    }
  };

  Camera.prototype.calculateAxisConversionFactors = function() {
    this.y2x = Math.sin(this.angle);
    this.z2x = Math.cos(this.angle);
    this.z2y = this.z2x / this.y2x;
    this.x2y = 1 / this.y2x;
    this.x2z = 1 / this.z2x;
    return this.y2z = 1 / this.z2y;
  };

  Camera.prototype.worldToSurface = function(pos) {
    var x, y;
    x = pos.x * Camera.PPM;
    y = -pos.y * this.y2x * Camera.PPM;
    if (pos.z) {
      y -= this.z2y * this.y2x * pos.z * Camera.PPM;
    }
    return {
      x: x,
      y: y
    };
  };

  Camera.prototype.surfaceToCanvas = function(pos) {
    return {
      x: (pos.x - this.surfaceViewport.x) * this.zoom,
      y: (pos.y - this.surfaceViewport.y) * this.zoom
    };
  };

  Camera.prototype.canvasToScreen = function(pos) {
    return {
      x: pos.x * this.canvasScaleFactorX,
      y: pos.y * this.canvasScaleFactorY
    };
  };

  Camera.prototype.screenToCanvas = function(pos) {
    return {
      x: pos.x / this.canvasScaleFactorX,
      y: pos.y / this.canvasScaleFactorY
    };
  };

  Camera.prototype.canvasToSurface = function(pos) {
    return {
      x: pos.x / this.zoom + this.surfaceViewport.x,
      y: pos.y / this.zoom + this.surfaceViewport.y
    };
  };

  Camera.prototype.surfaceToWorld = function(pos) {
    return {
      x: pos.x * Camera.MPP,
      y: -pos.y * Camera.MPP * this.x2y,
      z: 0
    };
  };

  Camera.prototype.canvasToWorld = function(pos) {
    return this.surfaceToWorld(this.canvasToSurface(pos));
  };

  Camera.prototype.worldToCanvas = function(pos) {
    return this.surfaceToCanvas(this.worldToSurface(pos));
  };

  Camera.prototype.worldToScreen = function(pos) {
    return this.canvasToScreen(this.worldToCanvas(pos));
  };

  Camera.prototype.surfaceToScreen = function(pos) {
    return this.canvasToScreen(this.surfaceToCanvas(pos));
  };

  Camera.prototype.screenToSurface = function(pos) {
    return this.canvasToSurface(this.screenToCanvas(pos));
  };

  Camera.prototype.screenToWorld = function(pos) {
    return this.surfaceToWorld(this.screenToSurface(pos));
  };

  Camera.prototype.cameraWorldPos = function() {
    var botDist, botFOV, topFOV, z;
    botFOV = this.x2y * this.vFOV / (this.y2x + this.x2y);
    topFOV = this.y2x * this.vFOV / (this.y2x + this.x2y);
    botDist = this.worldViewport.height / 2 * Math.sin(this.angle) / Math.sin(botFOV);
    z = botDist * Math.sin(this.angle + botFOV);
    return {
      x: this.worldViewport.cx,
      y: this.worldViewport.cy - z * this.z2y,
      z: z
    };
  };

  Camera.prototype.distanceTo = function(pos) {
    var cpos, dx, dy, dz;
    cpos = this.cameraWorldPos();
    dx = pos.x - cpos.x;
    dy = pos.y - cpos.y;
    dz = (pos.z || 0) - cpos.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  Camera.prototype.distanceRatioTo = function(pos) {
    var camDist, cpos, dy;
    cpos = this.cameraWorldPos();
    dy = this.worldViewport.cy - cpos.y;
    camDist = Math.sqrt(dy * dy + cpos.z * cpos.z);
    return this.distanceTo(pos) / camDist;
  };

  Camera.prototype.onZoomIn = function(e) {
    return this.zoomTo(this.target, this.zoom * 1.15, 300);
  };

  Camera.prototype.onZoomOut = function(e) {
    return this.zoomTo(this.target, this.zoom / 1.15, 300);
  };

  Camera.prototype.onMouseDown = function(e) {
    if (this.dragDisabled) {
      return;
    }
    this.lastPos = {
      x: e.originalEvent.rawX,
      y: e.originalEvent.rawY
    };
    return this.mousePressed = true;
  };

  Camera.prototype.onMouseMove = function(e) {
    var newPos, target;
    if (!(this.mousePressed && this.gameUIState.get('canDragCamera'))) {
      return;
    }
    if (this.dragDisabled) {
      return;
    }
    target = this.boundTarget(this.target, this.zoom);
    newPos = {
      x: target.x + (this.lastPos.x - e.originalEvent.rawX) / this.zoom,
      y: target.y + (this.lastPos.y - e.originalEvent.rawY) / this.zoom
    };
    this.zoomTo(newPos, this.zoom, 0);
    this.lastPos = {
      x: e.originalEvent.rawX,
      y: e.originalEvent.rawY
    };
    return Backbone.Mediator.publish('camera:dragged', {});
  };

  Camera.prototype.onMouseUp = function(e) {
    return this.mousePressed = false;
  };

  Camera.prototype.onMouseScrolled = function(e) {
    var mousePoint, newHeight, newTargetX, newTargetY, newWidth, newZoom, ratio, ratioPosX, ratioPosY, target;
    ratio = 1 + 0.05 * Math.sqrt(Math.abs(e.deltaY));
    if (e.deltaY > 0) {
      ratio = 1 / ratio;
    }
    newZoom = this.zoom * ratio;
    if (e.screenPos && !this.focusedOnSprite()) {
      mousePoint = this.screenToSurface(e.screenPos);
      ratioPosX = (mousePoint.x - this.surfaceViewport.x) / this.surfaceViewport.width;
      ratioPosY = (mousePoint.y - this.surfaceViewport.y) / this.surfaceViewport.height;
      newWidth = this.canvasWidth / newZoom;
      newHeight = this.canvasHeight / newZoom;
      newTargetX = mousePoint.x - (newWidth * ratioPosX) + (newWidth / 2);
      newTargetY = mousePoint.y - (newHeight * ratioPosY) + (newHeight / 2);
      target = {
        x: newTargetX,
        y: newTargetY
      };
    } else {
      target = this.target;
    }
    return this.zoomTo(target, newZoom, 0);
  };

  Camera.prototype.onLevelRestarted = function() {
    return this.setBounds(this.firstBounds, false);
  };

  Camera.prototype.setBounds = function(worldBounds, updateZoom) {
    if (updateZoom == null) {
      updateZoom = true;
    }
    if (!this.firstBounds) {
      this.firstBounds = worldBounds;
    }
    this.bounds = this.normalizeBounds(worldBounds);
    this.calculateMinMaxZoom();
    if (updateZoom) {
      this.updateZoom(true);
    }
    if (!this.focusedOnSprite()) {
      return this.target = this.currentTarget;
    }
  };

  Camera.prototype.normalizeBounds = function(worldBounds) {
    var bottom, left, p1, p2, right, top;
    if (!worldBounds) {
      return null;
    }
    top = Math.max(worldBounds[0].y, worldBounds[1].y);
    left = Math.min(worldBounds[0].x, worldBounds[1].x);
    bottom = Math.min(worldBounds[0].y, worldBounds[1].y);
    right = Math.max(worldBounds[0].x, worldBounds[1].x);
    if (top === bottom) {
      bottom -= 1;
    }
    if (left === right) {
      right += 1;
    }
    p1 = this.worldToSurface({
      x: left,
      y: top
    });
    p2 = this.worldToSurface({
      x: right,
      y: bottom
    });
    return {
      x: p1.x,
      y: p1.y,
      width: p2.x - p1.x,
      height: p2.y - p1.y
    };
  };

  Camera.prototype.calculateMinMaxZoom = function() {
    this.maxZoom = MAX_ZOOM;
    if (!this.bounds) {
      return this.minZoom = MIN_ZOOM;
    }
    this.minZoom = Math.max(this.canvasWidth / this.bounds.width, this.canvasHeight / this.bounds.height);
    if (this.zoom) {
      this.zoom = Math.max(this.minZoom, this.zoom);
      return this.zoom = Math.min(this.maxZoom, this.zoom);
    }
  };

  Camera.prototype.zoomTo = function(newTarget, newZoom, time) {
    var ref, ref1, ref2, scale, thangType;
    if (newTarget == null) {
      newTarget = null;
    }
    if (newZoom == null) {
      newZoom = 1.0;
    }
    if (time == null) {
      time = 1500;
    }
    if (this.instant) {
      time = 0;
    }
    if (newTarget == null) {
      newTarget = {
        x: 0,
        y: 0
      };
    }
    if (this.locked) {
      newTarget = this.newTarget || this.target;
    }
    newZoom = Math.max(newZoom, this.minZoom);
    newZoom = Math.min(newZoom, this.maxZoom);
    thangType = (ref = this.target) != null ? (ref1 = ref.sprite) != null ? ref1.thangType : void 0 : void 0;
    if (thangType) {
      this.offset = _.clone(((ref2 = thangType.get('positions')) != null ? ref2.torso : void 0) || {
        x: 0,
        y: 0
      });
      scale = thangType.get('scale') || 1;
      this.offset.x *= scale;
      this.offset.y *= scale;
    } else {
      this.offset = {
        x: 0,
        y: 0
      };
    }
    if (this.zoom === newZoom && newTarget === newTarget.x && newTarget.y === newTarget.y) {
      return;
    }
    this.finishTween(true);
    if (time) {
      this.newTarget = newTarget;
      this.oldTarget = this.boundTarget(this.target, this.zoom);
      this.oldZoom = this.zoom;
      this.newZoom = newZoom;
      this.tweenProgress = 0.01;
      return createjs.Tween.get(this).to({
        tweenProgress: 1.0
      }, time, createjs.Ease.getPowOut(4)).call(this.finishTween);
    } else {
      this.target = newTarget;
      this.zoom = newZoom;
      return this.updateZoom(true);
    }
  };

  Camera.prototype.focusedOnSprite = function() {
    var ref;
    return (ref = this.target) != null ? ref.name : void 0;
  };

  Camera.prototype.finishTween = function(abort) {
    if (abort == null) {
      abort = false;
    }
    createjs.Tween.removeTweens(this);
    if (!this.newTarget) {
      return;
    }
    if (abort !== true) {
      this.target = this.newTarget;
      this.zoom = this.newZoom;
    }
    this.newZoom = this.oldZoom = this.newTarget = this.newTarget = this.tweenProgress = null;
    return this.updateZoom(true);
  };

  Camera.prototype.updateZoom = function(force) {
    var p1, p2, ref, t, target, viewportDifference;
    if (force == null) {
      force = false;
    }
    if ((!force) && (this.locked || (!this.newTarget && !this.focusedOnSprite()))) {
      return;
    }
    if (this.newTarget) {
      t = this.tweenProgress;
      this.zoom = this.oldZoom + t * (this.newZoom - this.oldZoom);
      ref = [this.oldTarget, this.boundTarget(this.newTarget, this.newZoom)], p1 = ref[0], p2 = ref[1];
      target = this.target = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };
    } else {
      target = this.boundTarget(this.target, this.zoom);
      if (!force && _.isEqual(target, this.currentTarget)) {
        return;
      }
    }
    this.currentTarget = target;
    viewportDifference = this.updateViewports(target);
    if (viewportDifference > 0.1) {
      return Backbone.Mediator.publish('camera:zoom-updated', {
        camera: this,
        zoom: this.zoom,
        surfaceViewport: this.surfaceViewport,
        minZoom: this.minZoom
      });
    }
  };

  Camera.prototype.boundTarget = function(pos, zoom) {
    var marginX, marginY, ref, thang, x, y;
    if (!this.bounds) {
      return pos;
    }
    y = pos.y;
    if (thang = (ref = pos.sprite) != null ? ref.thang : void 0) {
      y = this.worldToSurface({
        x: thang.pos.x,
        y: thang.pos.y
      }).y;
    }
    marginX = this.canvasWidth / zoom / 2;
    marginY = this.canvasHeight / zoom / 2;
    x = Math.min(Math.max(marginX + this.bounds.x, pos.x + this.offset.x), this.bounds.x + this.bounds.width - marginX);
    y = Math.min(Math.max(marginY + this.bounds.y, y + this.offset.y), this.bounds.y + this.bounds.height - marginY);
    return {
      x: x,
      y: y
    };
  };

  Camera.prototype.updateViewports = function(target) {
    var sv, viewportDifference, wv;
    if (target == null) {
      target = this.target;
    }
    sv = {
      width: this.canvasWidth / this.zoom,
      height: this.canvasHeight / this.zoom,
      cx: target.x,
      cy: target.y
    };
    sv.x = sv.cx - sv.width / 2;
    sv.y = sv.cy - sv.height / 2;
    if (this.surfaceViewport) {
      viewportDifference = Math.abs(this.surfaceViewport.x - sv.x) + 1.01 * Math.abs(this.surfaceViewport.y - sv.y) + 1.02 * Math.abs(this.surfaceViewport.width - sv.width);
    } else {
      viewportDifference = 9001;
    }
    this.surfaceViewport = sv;
    wv = this.surfaceToWorld(sv);
    wv.width = sv.width * Camera.MPP;
    wv.height = sv.height * Camera.MPP * this.x2y;
    wv.cx = wv.x + wv.width / 2;
    wv.cy = wv.y + wv.height / 2;
    this.worldViewport = wv;
    return viewportDifference;
  };

  Camera.prototype.lock = function() {
    this.target = this.currentTarget;
    return this.locked = true;
  };

  Camera.prototype.unlock = function() {
    return this.locked = false;
  };

  Camera.prototype.destroy = function() {
    createjs.Tween.removeTweens(this);
    return Camera.__super__.destroy.call(this);
  };

  Camera.prototype.onZoomTo = function(e) {
    return this.zoomTo(this.worldToSurface(e.pos), this.zoom, e.duration);
  };

  return Camera;

})(CocoClass);
});

;require.register("lib/surface/CameraBorder", function(exports, require, module) {
var CameraBorder,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = CameraBorder = (function(superClass) {
  extend(CameraBorder, superClass);

  CameraBorder.prototype.layerPriority = 100;

  CameraBorder.prototype.subscriptions = {};

  function CameraBorder(options) {
    var channel, func, ref;
    CameraBorder.__super__.constructor.call(this);
    this.initialize();
    this.mouseEnabled = this.mouseChildren = false;
    this.updateBounds(options.bounds);
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  CameraBorder.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  CameraBorder.prototype.updateBounds = function(bounds) {
    var i, opacity, width;
    if (_.isEqual(bounds, this.bounds)) {
      return;
    }
    this.bounds = bounds;
    if (this.border) {
      this.removeChild(this.border);
      this.border = null;
    }
    if (!this.bounds) {
      return;
    }
    this.addChild(this.border = new createjs.Shape());
    width = 20;
    i = width;
    while (i) {
      opacity = 3 * (1 - (i / width)) / width;
      this.border.graphics.setStrokeStyle(i, 'round').beginStroke("rgba(0,0,0," + opacity + ")").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      i -= 1;
    }
    return this.border.cache(bounds.x, bounds.y, bounds.width, bounds.height);
  };

  return CameraBorder;

})(createjs.Container);
});

;require.register("lib/surface/CoordinateDisplay", function(exports, require, module) {
var CoordinateDisplay,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = CoordinateDisplay = (function(superClass) {
  extend(CoordinateDisplay, superClass);

  CoordinateDisplay.prototype.layerPriority = -10;

  CoordinateDisplay.prototype.subscriptions = {
    'surface:mouse-moved': 'onMouseMove',
    'surface:mouse-out': 'onMouseOut',
    'surface:mouse-over': 'onMouseOver',
    'surface:stage-mouse-down': 'onMouseDown',
    'camera:zoom-updated': 'onZoomUpdated',
    'level:flag-color-selected': 'onFlagColorSelected'
  };

  function CoordinateDisplay(options) {
    this.show = bind(this.show, this);
    var channel, func, ref;
    CoordinateDisplay.__super__.constructor.call(this);
    this.initialize();
    this.camera = options.camera;
    this.layer = options.layer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
    this.performShow = this.show;
    this.show = _.debounce(this.show, 125);
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  CoordinateDisplay.prototype.destroy = function() {
    var channel, func, ref;
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.unsubscribe(channel, this[func], this);
    }
    this.show = null;
    return this.destroyed = true;
  };

  CoordinateDisplay.prototype.toString = function() {
    return '<CoordinateDisplay>';
  };

  CoordinateDisplay.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.addChild(this.background = new createjs.Shape());
    this.addChild(this.label = new createjs.Text('', 'bold 16px Arial', '#FFFFFF'));
    this.addChild(this.pointMarker = new createjs.Shape());
    this.label.name = 'Coordinate Display Text';
    this.label.shadow = new createjs.Shadow('#000000', 1, 1, 0);
    this.background.name = 'Coordinate Display Background';
    this.pointMarker.name = 'Point Marker';
    return this.layer.addChild(this);
  };

  CoordinateDisplay.prototype.onMouseOver = function(e) {
    return this.mouseInBounds = true;
  };

  CoordinateDisplay.prototype.onMouseOut = function(e) {
    return this.mouseInBounds = false;
  };

  CoordinateDisplay.prototype.onMouseMove = function(e) {
    var ref, ref1, wop;
    wop = this.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.x = Math.round(wop.x);
    wop.y = Math.round(wop.y);
    if (wop.x === ((ref = this.lastPos) != null ? ref.x : void 0) && wop.y === ((ref1 = this.lastPos) != null ? ref1.y : void 0)) {
      return;
    }
    this.lastPos = wop;
    this.lastScreenPos = {
      x: e.x,
      y: e.y
    };
    this.hide();
    return this.show();
  };

  CoordinateDisplay.prototype.onMouseDown = function(e) {
    var wop;
    if (!key.shift) {
      return;
    }
    wop = this.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.x = Math.round(wop.x);
    wop.y = Math.round(wop.y);
    Backbone.Mediator.publish('tome:focus-editor', {});
    return Backbone.Mediator.publish('surface:coordinate-selected', wop);
  };

  CoordinateDisplay.prototype.onZoomUpdated = function(e) {
    var wop;
    if (!this.lastPos) {
      return;
    }
    wop = this.camera.screenToWorld(this.lastScreenPos);
    this.lastPos.x = Math.round(wop.x);
    this.lastPos.y = Math.round(wop.y);
    if (this.label.parent) {
      return this.performShow();
    }
  };

  CoordinateDisplay.prototype.onFlagColorSelected = function(e) {
    return this.placingFlag = Boolean(e.color);
  };

  CoordinateDisplay.prototype.hide = function() {
    if (!this.label.parent) {
      return;
    }
    this.removeChild(this.label);
    this.removeChild(this.background);
    this.removeChild(this.pointMarker);
    return this.uncache();
  };

  CoordinateDisplay.prototype.updateSize = function() {
    var contentHeight, contentWidth, contributionsToTotalSize, fullPointMarkerLength, horizontalEdge, margin, pointMarkerLength, pointMarkerStroke, totalHeight, totalWidth, verticalEdge;
    margin = 3;
    contentWidth = this.label.getMeasuredWidth() + (2 * margin);
    contentHeight = this.label.getMeasuredHeight() + (2 * margin);
    this.pointMarker.regY = contentHeight;
    pointMarkerStroke = 2;
    pointMarkerLength = 8;
    fullPointMarkerLength = pointMarkerLength + (pointMarkerStroke / 2);
    contributionsToTotalSize = [];
    contributionsToTotalSize = contributionsToTotalSize.concat(this.updateCoordinates(contentWidth, contentHeight, fullPointMarkerLength));
    contributionsToTotalSize = contributionsToTotalSize.concat(this.updatePointMarker(0, contentHeight, pointMarkerLength, pointMarkerStroke));
    totalWidth = contentWidth + contributionsToTotalSize.reduce(function(a, b) {
      return a + b;
    });
    totalHeight = contentHeight + contributionsToTotalSize.reduce(function(a, b) {
      return a + b;
    });
    if (this.isNearTopEdge()) {
      verticalEdge = {
        startPos: -fullPointMarkerLength,
        posShift: -contentHeight + 4
      };
    } else {
      verticalEdge = {
        startPos: -totalHeight + fullPointMarkerLength,
        posShift: contentHeight
      };
    }
    if (this.isNearRightEdge()) {
      horizontalEdge = {
        startPos: -totalWidth + fullPointMarkerLength,
        posShift: totalWidth
      };
    } else {
      horizontalEdge = {
        startPos: -fullPointMarkerLength,
        posShift: 0
      };
    }
    return this.orient(verticalEdge, horizontalEdge, totalHeight, totalWidth);
  };

  CoordinateDisplay.prototype.isNearTopEdge = function() {
    var yRatio;
    yRatio = 1 - (this.camera.worldViewport.y - this.lastPos.y) / this.camera.worldViewport.height;
    return yRatio > 0.9;
  };

  CoordinateDisplay.prototype.isNearRightEdge = function() {
    var xRatio;
    xRatio = (this.lastPos.x - this.camera.worldViewport.x) / this.camera.worldViewport.width;
    return xRatio > 0.85;
  };

  CoordinateDisplay.prototype.orient = function(verticalEdge, horizontalEdge, totalHeight, totalWidth) {
    this.label.regY = this.background.regY = verticalEdge.posShift;
    this.label.regX = this.background.regX = horizontalEdge.posShift;
    return this.cache(horizontalEdge.startPos, verticalEdge.startPos, totalWidth, totalHeight);
  };

  CoordinateDisplay.prototype.updateCoordinates = function(contentWidth, contentHeight, offset) {
    var backgroundStroke, contributionsToTotalSize, radius;
    this.label.x = contentWidth / 2 - (this.label.getMeasuredWidth() / 2) + offset;
    this.label.y = contentHeight / 2 - (this.label.getMeasuredHeight() / 2) - offset;
    this.background.graphics.clear().beginFill('rgba(0,0,0,0.4)').beginStroke('rgba(0,0,0,0.6)').setStrokeStyle(backgroundStroke = 1).drawRoundRect(offset, -offset, contentWidth, contentHeight, radius = 2.5).endFill().endStroke();
    return contributionsToTotalSize = [offset, backgroundStroke];
  };

  CoordinateDisplay.prototype.updatePointMarker = function(centerX, centerY, length, strokeSize) {
    var contributionsToTotalSize, strokeStyle;
    strokeStyle = 'square';
    this.pointMarker.graphics.beginStroke('rgb(255, 255, 255)').setStrokeStyle(strokeSize, strokeStyle).moveTo(centerX, centerY - length).lineTo(centerX, centerY + length).moveTo(centerX - length, centerY).lineTo(centerX + length, centerY).endStroke();
    return contributionsToTotalSize = [strokeSize, length];
  };

  CoordinateDisplay.prototype.show = function() {
    var sup;
    if (!(this.mouseInBounds && this.lastPos && !this.destroyed)) {
      return;
    }
    this.label.text = "{x: " + this.lastPos.x + ", y: " + this.lastPos.y + "}";
    this.updateSize();
    sup = this.camera.worldToSurface(this.lastPos);
    this.x = sup.x;
    this.y = sup.y;
    this.addChild(this.background);
    this.addChild(this.label);
    if (!this.placingFlag) {
      this.addChild(this.pointMarker);
    }
    this.updateCache();
    return Backbone.Mediator.publish('surface:coordinates-shown', {});
  };

  return CoordinateDisplay;

})(createjs.Container);
});

;require.register("lib/surface/CoordinateGrid", function(exports, require, module) {
var CocoClass, CoordinateGrid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = CoordinateGrid = (function(superClass) {
  extend(CoordinateGrid, superClass);

  CoordinateGrid.prototype.subscriptions = {
    'level:toggle-grid': 'onToggleGrid'
  };

  CoordinateGrid.prototype.shortcuts = {
    'ctrl+g, ⌘+g': 'onToggleGrid'
  };

  function CoordinateGrid(options, worldSize) {
    CoordinateGrid.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.textLayer = options.textLayer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    if (!this.textLayer) {
      console.error(this.toString(), 'needs a textLayer.');
    }
    this.build(worldSize);
  }

  CoordinateGrid.prototype.destroy = function() {
    return CoordinateGrid.__super__.destroy.call(this);
  };

  CoordinateGrid.prototype.toString = function() {
    return '<CoordinateGrid>';
  };

  CoordinateGrid.prototype.build = function(worldSize) {
    var bounds, gridSize, linesDrawn, ref, ref1, sup, supEnd, supStart, t, wop, wopEnd, wopStart, worldHeight, worldWidth;
    worldWidth = worldSize[0] || 80;
    worldHeight = worldSize[1] || 68;
    this.gridContainer = new createjs.Container();
    this.gridShape = new createjs.Shape();
    this.gridContainer.addChild(this.gridShape);
    this.gridContainer.mouseEnabled = false;
    this.gridShape.alpha = 0.125;
    this.gridShape.graphics.setStrokeStyle(1);
    this.gridShape.graphics.beginStroke('blue');
    gridSize = Math.round(worldWidth / 20);
    wopStart = {
      x: 0,
      y: 0
    };
    wopEnd = {
      x: worldWidth,
      y: worldHeight
    };
    supStart = this.camera.worldToSurface(wopStart);
    supEnd = this.camera.worldToSurface(wopEnd);
    wop = {
      x: wopStart.x,
      y: wopStart.y
    };
    this.labels = [];
    linesDrawn = 0;
    while (wop.x <= wopEnd.x) {
      sup = this.camera.worldToSurface(wop);
      this.gridShape.graphics.mt(sup.x, supStart.y).lt(sup.x, supEnd.y);
      if (++linesDrawn % 2) {
        t = new createjs.Text(wop.x.toFixed(0), '16px Arial', 'blue');
        t.textAlign = 'center';
        t.textBaseline = 'bottom';
        t.x = sup.x;
        t.y = supStart.y;
        t.alpha = 0.75;
        this.labels.push(t);
      }
      wop.x += gridSize;
      if ((wopEnd.x < (ref = wop.x) && ref <= wopEnd.x - gridSize / 2)) {
        wop.x = wopEnd.x;
      }
    }
    linesDrawn = 0;
    while (wop.y <= wopEnd.y) {
      sup = this.camera.worldToSurface(wop);
      this.gridShape.graphics.mt(supStart.x, sup.y).lt(supEnd.x, sup.y);
      if (++linesDrawn % 2) {
        t = new createjs.Text(wop.y.toFixed(0), '16px Arial', 'blue');
        t.textAlign = 'left';
        t.textBaseline = 'middle';
        t.x = 0;
        t.y = sup.y;
        t.alpha = 0.75;
        this.labels.push(t);
      }
      wop.y += gridSize;
      if ((wopEnd.y < (ref1 = wop.y) && ref1 <= wopEnd.y - gridSize / 2)) {
        wop.y = wopEnd.y;
      }
    }
    this.gridShape.graphics.endStroke();
    bounds = {
      x: supStart.x,
      y: supEnd.y,
      width: supEnd.x - supStart.x,
      height: supStart.y - supEnd.y
    };
    if (!((bounds != null ? bounds.width : void 0) && bounds.height)) {
      return;
    }
    return this.gridContainer.cache(bounds.x, bounds.y, bounds.width, bounds.height);
  };

  CoordinateGrid.prototype.showGrid = function() {
    var i, label, len, ref, results;
    if (this.gridShowing()) {
      return;
    }
    this.layer.addChild(this.gridContainer);
    ref = this.labels;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      results.push(this.textLayer.addChild(label));
    }
    return results;
  };

  CoordinateGrid.prototype.hideGrid = function() {
    var i, label, len, ref, results;
    if (!this.gridShowing()) {
      return;
    }
    this.layer.removeChild(this.gridContainer);
    ref = this.labels;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      results.push(this.textLayer.removeChild(label));
    }
    return results;
  };

  CoordinateGrid.prototype.gridShowing = function() {
    var ref;
    return ((ref = this.gridContainer) != null ? ref.parent : void 0) != null;
  };

  CoordinateGrid.prototype.onToggleGrid = function(e) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    if (this.gridShowing()) {
      return this.hideGrid();
    } else {
      return this.showGrid();
    }
  };

  return CoordinateGrid;

})(CocoClass);
});

;require.register("lib/surface/CountdownScreen", function(exports, require, module) {
var CocoClass, CountdownScreen,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = CountdownScreen = (function(superClass) {
  extend(CountdownScreen, superClass);

  CountdownScreen.prototype.subscriptions = {
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded'
  };

  function CountdownScreen(options) {
    this.decrementCountdown = bind(this.decrementCountdown, this);
    CountdownScreen.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.showsCountdown = options.showsCountdown;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  CountdownScreen.prototype.destroy = function() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    return CountdownScreen.__super__.destroy.call(this);
  };

  CountdownScreen.prototype.onCastingBegins = function(e) {
    if (!e.preload) {
      return this.show();
    }
  };

  CountdownScreen.prototype.onCastingEnds = function(e) {
    return this.hide();
  };

  CountdownScreen.prototype.toString = function() {
    return '<CountdownScreen>';
  };

  CountdownScreen.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimScreen.graphics.beginFill('rgba(0,0,0,0.5)').rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    this.dimLayer.alpha = 0;
    return this.dimLayer.addChild(this.makeCountdownText());
  };

  CountdownScreen.prototype.makeCountdownText = function() {
    var size, text;
    size = Math.ceil(this.camera.canvasHeight / 2);
    text = new createjs.Text('3...', size + "px Open Sans Condensed", '#F7B42C');
    text.shadow = new createjs.Shadow('#000', Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 120));
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = this.camera.canvasWidth / 2;
    text.y = this.camera.canvasHeight / 2;
    this.text = text;
    return text;
  };

  CountdownScreen.prototype.show = function() {
    if (this.showing) {
      return;
    }
    createjs.Tween.removeTweens(this.dimLayer);
    if (this.showsCountdown) {
      this.dimLayer.alpha = 0;
      this.showing = true;
      createjs.Tween.get(this.dimLayer).to({
        alpha: 1
      }, 500);
      this.secondsRemaining = 3;
      this.countdownInterval = setInterval(this.decrementCountdown, 1000);
      this.updateText();
      return this.layer.addChild(this.dimLayer);
    } else {
      return this.endCountdown();
    }
  };

  CountdownScreen.prototype.hide = function(duration) {
    if (duration == null) {
      duration = 500;
    }
    if (!this.showing) {
      return;
    }
    this.showing = false;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 0
    }, duration).call((function(_this) {
      return function() {
        if (!_this.destroyed) {
          return _this.layer.removeChild(_this.dimLayer);
        }
      };
    })(this));
  };

  CountdownScreen.prototype.decrementCountdown = function() {
    if (this.destroyed) {
      return;
    }
    --this.secondsRemaining;
    this.updateText();
    if (!this.secondsRemaining) {
      return this.endCountdown();
    }
  };

  CountdownScreen.prototype.updateText = function() {
    return this.text.text = this.secondsRemaining ? this.secondsRemaining + "..." : '0!';
  };

  CountdownScreen.prototype.endCountdown = function() {
    console.log('should actually start in 1s');
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = null;
    return this.hide();
  };

  CountdownScreen.prototype.onRealTimePlaybackStarted = function(e) {
    return this.show();
  };

  CountdownScreen.prototype.onRealTimePlaybackEnded = function(e) {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = null;
    return this.hide(Math.max(500, 1000 * (this.secondsRemaining || 0)));
  };

  return CountdownScreen;

})(CocoClass);
});

;require.register("lib/surface/DebugDisplay", function(exports, require, module) {
var DebugDisplay,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = DebugDisplay = (function(superClass) {
  extend(DebugDisplay, superClass);

  DebugDisplay.prototype.layerPriority = 20;

  DebugDisplay.prototype.subscriptions = {
    'level:set-debug': 'onSetDebug'
  };

  function DebugDisplay(options) {
    var channel, func, ref;
    DebugDisplay.__super__.constructor.call(this);
    this.initialize();
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    if (!(this.canvasWidth && this.canvasHeight)) {
      console.error('DebugDisplay needs canvasWidth/Height.');
    }
    this.build();
    this.onSetDebug({
      debug: true
    });
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  DebugDisplay.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  DebugDisplay.prototype.onSetDebug = function(e) {
    if (e.debug === this.on) {
      return;
    }
    this.visible = this.on = e.debug;
    this.fps = null;
    this.framesRenderedThisSecond = 0;
    return this.lastFrameSecondStart = Date.now();
  };

  DebugDisplay.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.addChild(this.frameText = new createjs.Text('...', '20px Arial', '#FFF'));
    this.frameText.name = 'frame text';
    this.frameText.x = this.canvasWidth - 50;
    this.frameText.y = this.canvasHeight - 25;
    return this.frameText.alpha = 0.5;
  };

  DebugDisplay.prototype.updateFrame = function(currentFrame) {
    var diff, time;
    if (!this.on) {
      return;
    }
    ++this.framesRenderedThisSecond;
    time = Date.now();
    diff = (time - this.lastFrameSecondStart) / 1000;
    if (diff > 1) {
      this.fps = Math.round(this.framesRenderedThisSecond / diff);
      this.lastFrameSecondStart = time;
      this.framesRenderedThisSecond = 0;
    }
    this.frameText.text = Math.round(currentFrame) + (this.fps != null ? ' - ' + this.fps + ' fps' : '');
    return this.frameText.x = this.canvasWidth - this.frameText.getMeasuredWidth() - 10;
  };

  return DebugDisplay;

})(createjs.Container);
});

;require.register("lib/surface/Dimmer", function(exports, require, module) {
var CocoClass, Dimmer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

module.exports = Dimmer = (function(superClass) {
  extend(Dimmer, superClass);

  Dimmer.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'sprite:highlight-sprites': 'onHighlightSprites',
    'sprite:speech-updated': 'onSpriteSpeechUpdated',
    'surface:frame-changed': 'onFrameChanged',
    'camera:zoom-updated': 'onZoomUpdated'
  };

  function Dimmer(options) {
    this.updateDimMask = bind(this.updateDimMask, this);
    Dimmer.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
    this.updateDimMask = _.throttle(this.updateDimMask, 10);
    this.highlightedThangIDs = [];
    this.sprites = {};
  }

  Dimmer.prototype.toString = function() {
    return '<Dimmer>';
  };

  Dimmer.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimLayer.addChild(this.dimMask = new createjs.Shape());
    this.dimScreen.graphics.beginFill('rgba(0,0,0,0.5)').rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    this.dimMask.compositeOperation = 'destination-out';
    return this.dimLayer.cache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
  };

  Dimmer.prototype.onDisableControls = function(e) {
    if (this.on || (e.controls && !(indexOf.call(e.controls, 'surface') >= 0))) {
      return;
    }
    return this.dim();
  };

  Dimmer.prototype.onEnableControls = function(e) {
    if (!this.on || (e.controls && !(indexOf.call(e.controls, 'surface') >= 0))) {
      return;
    }
    return this.undim();
  };

  Dimmer.prototype.onSpriteSpeechUpdated = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onFrameChanged = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onZoomUpdated = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onHighlightSprites = function(e) {
    var ref;
    this.highlightedThangIDs = (ref = e.thangIDs) != null ? ref : [];
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.setSprites = function(sprites) {
    this.sprites = sprites;
  };

  Dimmer.prototype.dim = function() {
    var ref, sprite, thangID;
    this.on = true;
    this.layer.addChild(this.dimLayer);
    this.layer.updateLayerOrder();
    ref = this.sprites;
    for (thangID in ref) {
      sprite = ref[thangID];
      sprite.setDimmed(true);
    }
    return this.updateDimMask();
  };

  Dimmer.prototype.undim = function() {
    var ref, results, sprite, thangID;
    this.on = false;
    this.layer.removeChild(this.dimLayer);
    ref = this.sprites;
    results = [];
    for (thangID in ref) {
      sprite = ref[thangID];
      results.push(sprite.setDimmed(false));
    }
    return results;
  };

  Dimmer.prototype.updateDimMask = function() {
    var cap, r, ref, sprite, sup, thangID;
    this.dimMask.graphics.clear();
    ref = this.sprites;
    for (thangID in ref) {
      sprite = ref[thangID];
      if (!((indexOf.call(this.highlightedThangIDs, thangID) >= 0) || (typeof sprite.isTalking === "function" ? sprite.isTalking() : void 0))) {
        continue;
      }
      sup = {
        x: sprite.sprite.x,
        y: sprite.sprite.y
      };
      cap = this.camera.surfaceToCanvas(sup);
      r = 50 * this.camera.zoom;
      this.dimMask.graphics.beginRadialGradientFill(['rgba(0,0,0,1)', 'rgba(0,0,0,0)'], [0.5, 1], cap.x, cap.y, 0, cap.x, cap.y, r).drawCircle(cap.x, cap.y, r);
    }
    return this.dimLayer.updateCache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
  };

  return Dimmer;

})(CocoClass);
});

;require.register("lib/surface/Dropper", function(exports, require, module) {
var Dropper;

Dropper = Dropper = (function() {
  Dropper.prototype.lostFrames = 0.0;

  Dropper.prototype.dropCounter = 0;

  function Dropper() {
    this.listener = (function(_this) {
      return function(e) {
        return _this.tick(e);
      };
    })(this);
  }

  Dropper.prototype.tick = function() {
    var actual, fps;
    if (!this.tickedOnce) {
      this.tickedOnce = true;
      return;
    }
    if (this.dropCounter > 0) {
      --this.dropCounter;
    }
    fps = createjs.Ticker.getFPS();
    actual = createjs.Ticker.getMeasuredFPS(1);
    this.lostFrames += (fps - actual) / fps;
    this.dropCounter += parseInt(this.lostFrames);
    return this.lostFrames = this.lostFrames % 1;
  };

  Dropper.prototype.drop = function() {
    return this.dropCounter > 0;
  };

  return Dropper;

})();

module.exports = new Dropper();
});

;require.register("lib/surface/FlagLank", function(exports, require, module) {
var FlagLank, IndieLank, me,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

IndieLank = require('lib/surface/IndieLank');

me = require('core/auth').me;

module.exports = FlagLank = (function(superClass) {
  extend(FlagLank, superClass);

  FlagLank.prototype.subscriptions = {
    'surface:mouse-moved': 'onMouseMoved'
  };

  FlagLank.prototype.defaultPos = function() {
    return {
      x: 20,
      y: 20,
      z: 1
    };
  };

  function FlagLank(thangType, options) {
    FlagLank.__super__.constructor.call(this, thangType, options);
    this.toggleCursor(options.isCursor);
  }

  FlagLank.prototype.makeIndieThang = function(thangType, options) {
    var thang;
    thang = FlagLank.__super__.makeIndieThang.call(this, thangType, options);
    thang.width = thang.height = thang.depth = 2;
    thang.pos.z = 1;
    thang.isSelectable = false;
    thang.color = options.color;
    thang.team = options.team;
    return thang;
  };

  FlagLank.prototype.onMouseMoved = function(e) {
    var wop;
    if (!this.options.isCursor) {
      return;
    }
    wop = this.options.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    this.thang.pos.x = wop.x;
    return this.thang.pos.y = wop.y;
  };

  FlagLank.prototype.toggleCursor = function(to) {
    this.options.isCursor = to;
    this.thang.alpha = to ? 0.33 : 0.67;
    this.thang.action = 'appear';
    return this.updateAlpha();
  };

  return FlagLank;

})(IndieLank);
});

;require.register("lib/surface/IndieLank", function(exports, require, module) {
var IndieLank, Lank, Thang,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Thang = require('lib/world/thang');

Lank = require('lib/surface/Lank');

module.exports = IndieLank = IndieLank = (function(superClass) {
  extend(IndieLank, superClass);

  IndieLank.prototype.notOfThisWorld = true;

  IndieLank.prototype.subscriptions = {
    'script:note-group-started': 'onNoteGroupStarted',
    'script:note-group-ended': 'onNoteGroupEnded'
  };

  function IndieLank(thangType, options) {
    this.onNoteGroupEnded = bind(this.onNoteGroupEnded, this);
    this.onNoteGroupStarted = bind(this.onNoteGroupStarted, this);
    options.thang = this.makeIndieThang(thangType, options);
    IndieLank.__super__.constructor.call(this, thangType, options);
    this.shadow = this.thang;
  }

  IndieLank.prototype.makeIndieThang = function(thangType, options) {
    var ref, thang;
    this.thang = thang = new Thang(null, thangType.get('name'), options.thangID);
    thang.exists = true;
    thang.width = thang.height = thang.depth = 4;
    thang.pos = (ref = options.pos) != null ? ref : this.defaultPos();
    thang.pos.z = thang.depth / 2;
    thang.shape = 'ellipsoid';
    thang.rotation = 0;
    thang.action = 'idle';
    thang.setAction = function(action) {
      return thang.action = action;
    };
    thang.getActionName = function() {
      return thang.action;
    };
    thang.acts = true;
    thang.isSelectable = true;
    thang.team = options.team;
    thang.teamColors = options.teamColors;
    return thang;
  };

  IndieLank.prototype.onNoteGroupStarted = function() {
    return this.scriptRunning = true;
  };

  IndieLank.prototype.onNoteGroupEnded = function() {
    return this.scriptRunning = false;
  };

  IndieLank.prototype.onMouseEvent = function(e, ourEventName) {
    if (!this.scriptRunning) {
      return IndieLank.__super__.onMouseEvent.call(this, e, ourEventName);
    }
  };

  IndieLank.prototype.defaultPos = function() {
    return {
      x: -20,
      y: 20,
      z: this.thang.depth / 2
    };
  };

  return IndieLank;

})(Lank);
});

;require.register("lib/surface/Label", function(exports, require, module) {
var CocoClass, Label,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoClass = require('core/CocoClass');

module.exports = Label = (function(superClass) {
  extend(Label, superClass);

  Label.STYLE_DIALOGUE = 'dialogue';

  Label.STYLE_SAY = 'say';

  Label.STYLE_NAME = 'name';

  Label.STYLE_VAR = 'variable';

  Label.prototype.subscriptions = {};

  function Label(options) {
    var ref, ref1, ref2;
    Label.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.sprite = options.sprite;
    this.camera = options.camera;
    this.layer = options.layer;
    this.style = (ref = options.style) != null ? ref : ((ref1 = this.sprite) != null ? (ref2 = ref1.thang) != null ? ref2.labelStyle : void 0 : void 0) || Label.STYLE_SAY;
    if (!this.sprite) {
      console.error(this.toString(), 'needs a sprite.');
    }
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    if (options.text) {
      this.setText(options.text);
    }
  }

  Label.prototype.destroy = function() {
    this.setText(null);
    return Label.__super__.destroy.call(this);
  };

  Label.prototype.toString = function() {
    var ref, ref1, ref2, ref3, ref4;
    return "<Label for " + ((ref = (ref1 = this.sprite) != null ? (ref2 = ref1.thang) != null ? ref2.id : void 0 : void 0) != null ? ref : 'None') + ": " + ((ref3 = (ref4 = this.text) != null ? ref4.substring(0, 10) : void 0) != null ? ref3 : '') + ">";
  };

  Label.prototype.setText = function(text) {
    if (text === this.text) {
      return false;
    }
    this.text = text;
    this.build();
    return true;
  };

  Label.prototype.build = function() {
    var o;
    if (this.layer && !this.layer.destroyed) {
      if (this.background) {
        this.layer.removeChild(this.background);
      }
      if (this.label) {
        this.layer.removeChild(this.label);
      }
    }
    this.label = null;
    this.background = null;
    if (!this.text) {
      return;
    }
    o = this.buildLabelOptions();
    this.layer.addChild(this.label = this.buildLabel(o));
    this.layer.addChild(this.background = this.buildBackground(o));
    return this.layer.updateLayerOrder();
  };

  Label.prototype.update = function() {
    var base, offset, ref, rotation;
    if (!(this.text && this.sprite.sprite)) {
      return;
    }
    offset = typeof (base = this.sprite).getOffset === "function" ? base.getOffset(((ref = this.style) === 'dialogue' || ref === 'say' ? 'mouth' : 'aboveHead')) : void 0;
    if (offset == null) {
      offset = {
        x: 0,
        y: 0
      };
    }
    if (this.style === 'variable') {
      offset.y += 10;
    }
    rotation = this.sprite.getRotation();
    if (rotation >= 135 || rotation <= -135) {
      offset.x *= -1;
    }
    this.label.x = this.background.x = this.sprite.sprite.x + offset.x;
    this.label.y = this.background.y = this.sprite.sprite.y + offset.y;
    return null;
  };

  Label.prototype.show = function() {
    if (!this.label) {
      return;
    }
    this.layer.addChild(this.label);
    this.layer.addChild(this.background);
    return this.layer.updateLayerOrder();
  };

  Label.prototype.hide = function() {
    if (!this.label) {
      return;
    }
    this.layer.removeChild(this.background);
    return this.layer.removeChild(this.label);
  };

  Label.prototype.buildLabelOptions = function() {
    var fontFamily, maxLength, maxWidth, multiline, o, ref, ref1, ref2, ref3, st;
    o = {};
    st = {
      dialogue: 'D',
      say: 'S',
      name: 'N',
      variable: 'V'
    }[this.style];
    o.marginX = {
      D: 5,
      S: 6,
      N: 3,
      V: 0
    }[st];
    o.marginY = {
      D: 6,
      S: 4,
      N: 3,
      V: 0
    }[st];
    o.fontWeight = {
      D: 'bold',
      S: 'bold',
      N: 'bold',
      V: 'bold'
    }[st];
    o.shadow = {
      D: false,
      S: true,
      N: true,
      V: true
    }[st];
    o.shadowColor = {
      D: '#FFF',
      S: '#000',
      N: '#000',
      V: "#000"
    }[st];
    o.fontSize = {
      D: 25,
      S: 12,
      N: 24,
      V: 18
    }[st];
    fontFamily = {
      D: 'Arial',
      S: 'Arial',
      N: 'Arial',
      B: 'Arial',
      V: 'Arial'
    }[st];
    o.fontDescriptor = o.fontWeight + " " + o.fontSize + "px " + fontFamily;
    o.fontColor = {
      D: '#000',
      S: '#FFF',
      N: '#6c6',
      V: '#6c6'
    }[st];
    if (this.style === 'name' && ((ref = this.sprite) != null ? (ref1 = ref.thang) != null ? ref1.team : void 0 : void 0) === 'humans') {
      o.fontColor = '#c66';
    } else if (this.style === 'name' && ((ref2 = this.sprite) != null ? (ref3 = ref2.thang) != null ? ref3.team : void 0 : void 0) === 'ogres') {
      o.fontColor = '#66c';
    } else if (this.style === 'variable') {
      o.fontColor = '#fff';
    }
    o.backgroundFillColor = {
      D: 'white',
      S: 'rgba(0,0,0,0.4)',
      N: 'rgba(0,0,0,0.7)',
      V: 'rgba(0,0,0,0.7)'
    }[st];
    o.backgroundStrokeColor = {
      D: 'black',
      S: 'rgba(0,0,0,0.6)',
      N: 'rgba(0,0,0,0)',
      V: 'rgba(0,0,0,0)'
    }[st];
    o.backgroundStrokeStyle = {
      D: 2,
      S: 1,
      N: 1,
      V: 1
    }[st];
    o.backgroundBorderRadius = {
      D: 10,
      S: 3,
      N: 3,
      V: 3
    }[st];
    o.layerPriority = {
      D: 10,
      S: 5,
      N: 5,
      V: 5
    }[st];
    maxWidth = {
      D: 300,
      S: 300,
      N: 180,
      V: 100
    }[st];
    maxWidth = Math.max(this.camera.canvasWidth / 2 - 100, maxWidth);
    maxLength = {
      D: 100,
      S: 100,
      N: 30,
      V: 30
    }[st];
    multiline = this.addNewLinesToText(_.string.prune(this.text, maxLength), o.fontDescriptor, maxWidth);
    o.text = multiline.text;
    o.textWidth = multiline.textWidth;
    return o;
  };

  Label.prototype.buildLabel = function(o) {
    var bounds, label;
    label = new createjs.Text(o.text, o.fontDescriptor, o.fontColor);
    label.lineHeight = o.fontSize + 2;
    label.x = o.marginX;
    label.y = o.marginY;
    if (o.shadow) {
      label.shadow = new createjs.Shadow(o.shadowColor, 1, 1, 0);
    }
    label.layerPriority = o.layerPriority;
    label.name = "Sprite Label - " + this.style;
    bounds = label.getBounds();
    label.cache(bounds.x, bounds.y, bounds.width, bounds.height);
    o.textHeight = label.getMeasuredHeight();
    o.label = label;
    return label;
  };

  Label.prototype.buildBackground = function(o) {
    var background, cap, g, h, hPos, pointerHeight, pointerPos, pointerWidth, radius, sup, vPos, w;
    w = o.textWidth + 2 * o.marginX;
    h = o.textHeight + 2 * o.marginY + 1;
    background = new createjs.Shape();
    background.name = "Sprite Label Background - " + this.style;
    g = background.graphics;
    g.beginFill(o.backgroundFillColor);
    g.beginStroke(o.backgroundStrokeColor);
    g.setStrokeStyle(o.backgroundStrokeStyle);
    if (this.style === 'dialogue') {
      radius = o.backgroundBorderRadius;
      pointerHeight = 10;
      pointerWidth = 8;
      pointerWidth += radius;
      sup = {
        x: this.sprite.sprite.x,
        y: this.sprite.sprite.y
      };
      cap = this.camera.surfaceToCanvas(sup);
      hPos = cap.x / this.camera.canvasWidth > 0.53 ? 'right' : 'left';
      vPos = cap.y / this.camera.canvasHeight > 0.53 ? 'bottom' : 'top';
      pointerPos = vPos + "-" + hPos;
      g.moveTo(radius, 0);
      if (pointerPos === 'top-left') {
        g.lineTo(radius / 2, -pointerHeight);
        g.lineTo(pointerWidth, 0);
      } else if (pointerPos === 'top-right') {
        g.lineTo(w - pointerWidth, 0);
        g.lineTo(w - radius / 2, -pointerHeight);
      }
      g.lineTo(w - radius, 0);
      g.quadraticCurveTo(w, 0, w, radius);
      g.lineTo(w, h - radius);
      g.quadraticCurveTo(w, h, w - radius, h);
      if (pointerPos === 'bottom-right') {
        g.lineTo(w - radius / 2, h + pointerHeight);
        g.lineTo(w - pointerWidth, h);
      } else if (pointerPos === 'bottom-left') {
        g.lineTo(pointerWidth, h);
        g.lineTo(radius / 2, h + pointerHeight);
      }
      g.lineTo(radius, h);
      g.quadraticCurveTo(0, h, 0, h - radius);
      g.lineTo(0, radius);
      g.quadraticCurveTo(0, 0, radius, 0);
      background.regX = hPos === 'left' ? 3 : o.textWidth + 3;
      background.regY = vPos === 'bottom' ? h + pointerHeight : -pointerHeight;
    } else {
      background.regX = w / 2;
      background.regY = h + 2;
      g.drawRoundRect(o.label.x - o.marginX, o.label.y - o.marginY, w, h, o.backgroundBorderRadius);
    }
    o.label.regX = background.regX - o.marginX;
    o.label.regY = background.regY - o.marginY;
    background.cache(-10, -10, w + 20, h + 20);
    g.endStroke();
    g.endFill();
    background.layerPriority = o.layerPriority - 1;
    return background;
  };

  Label.prototype.addNewLinesToText = function(originalText, fontDescriptor, maxWidth) {
    var i, j, k, len, len1, ref, ref1, ref2, row, rows, text, textWidth, width, word, words;
    if (maxWidth == null) {
      maxWidth = 400;
    }
    rows = [];
    row = [];
    words = _.string.words(originalText);
    textWidth = 0;
    for (j = 0, len = words.length; j < len; j++) {
      word = words[j];
      row.push(word);
      text = new createjs.Text((ref = _.string).join.apply(ref, [' '].concat(slice.call(row))), fontDescriptor, '#000');
      width = text.getMeasuredWidth();
      if (width > maxWidth) {
        if (row.length === 1) {
          row[0] = _.string.truncate(row[0], 40);
          text.text = row[0];
          textWidth = Math.max(text.getMeasuredWidth(), textWidth);
          rows.push(row);
          row = [];
        } else {
          row.pop();
          rows.push(row);
          row = [word];
        }
      } else {
        textWidth = Math.max(textWidth, width);
      }
    }
    if (row.length) {
      rows.push(row);
    }
    for (i = k = 0, len1 = rows.length; k < len1; i = ++k) {
      row = rows[i];
      rows[i] = (ref1 = _.string).join.apply(ref1, [' '].concat(slice.call(row)));
    }
    return {
      text: (ref2 = _.string).join.apply(ref2, ["\n"].concat(slice.call(rows))),
      textWidth: textWidth
    };
  };

  return Label;

})(CocoClass);
});

;require.register("lib/surface/Lank", function(exports, require, module) {
var AudioPlayer, Camera, CocoClass, Label, Lank, Mark, ThangType, createProgressBar, healthColors, me,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

createProgressBar = require('./sprite_utils').createProgressBar;

Camera = require('./Camera');

Mark = require('./Mark');

Label = require('./Label');

AudioPlayer = require('lib/AudioPlayer');

me = require('core/auth').me;

ThangType = require('models/ThangType');

healthColors = {
  ogres: [64, 128, 212],
  humans: [255, 0, 0],
  neutral: [64, 212, 128]
};

module.exports = Lank = Lank = (function(superClass) {
  extend(Lank, superClass);

  Lank.prototype.thangType = null;

  Lank.prototype.sprite = null;

  Lank.prototype.healthBar = null;

  Lank.prototype.marks = null;

  Lank.prototype.labels = null;

  Lank.prototype.ranges = null;

  Lank.prototype.options = {
    groundLayer: null,
    textLayer: null,
    floatingLayer: null,
    thang: null,
    camera: null,
    showInvisible: false,
    preloadSounds: true
  };

  Lank.prototype.possessed = false;

  Lank.prototype.flipped = false;

  Lank.prototype.flippedCount = 0;

  Lank.prototype.actionQueue = null;

  Lank.prototype.actions = null;

  Lank.prototype.rotation = 0;

  Lank.prototype.scaleFactorX = 1;

  Lank.prototype.scaleFactorY = 1;

  Lank.prototype.targetScaleFactorX = 1;

  Lank.prototype.targetScaleFactorY = 1;

  Lank.prototype.currentRootAction = null;

  Lank.prototype.currentAction = null;

  Lank.prototype.subscriptions = {
    'level:sprite-dialogue': 'onDialogue',
    'level:sprite-clear-dialogue': 'onClearDialogue',
    'level:set-letterbox': 'onSetLetterbox',
    'surface:ticked': 'onSurfaceTicked',
    'sprite:move': 'onMove'
  };

  function Lank(thangType1, options) {
    var spriteName;
    this.thangType = thangType1;
    if (options == null) {
      options = {};
    }
    this.move = bind(this.move, this);
    this.rotateEffect = bind(this.rotateEffect, this);
    this.playNextAction = bind(this.playNextAction, this);
    Lank.__super__.constructor.call(this);
    spriteName = this.thangType.get('name');
    this.isMissile = /(Missile|Arrow|Spear|Bolt)/.test(spriteName) && !/(Tower|Charge)/.test(spriteName);
    this.options = _.extend($.extend(true, {}, this.options), options);
    this.gameUIState = this.options.gameUIState;
    this.handleEvents = this.options.handleEvents;
    this.setThang(this.options.thang);
    this.setColorConfig();
    if (!this.thangType) {
      console.error(this.toString(), 'has no ThangType!');
    }
    this.sprite = new createjs.Container;
    this.actionQueue = [];
    this.marks = {};
    this.labels = {};
    this.ranges = [];
    this.handledDisplayEvents = {};
    this.age = 0;
    this.stillLoading = true;
    if (this.thangType.isFullyLoaded()) {
      this.onThangTypeLoaded();
    } else {
      this.listenToOnce(this.thangType, 'sync', this.onThangTypeLoaded);
    }
  }

  Lank.prototype.toString = function() {
    var ref;
    return "<Lank: " + ((ref = this.thang) != null ? ref.id : void 0) + ">";
  };

  Lank.prototype.setColorConfig = function() {
    var colorConfig, ref, unlockedLevels;
    if (!(colorConfig = (ref = this.thang) != null ? typeof ref.getLankOptions === "function" ? ref.getLankOptions().colorConfig : void 0 : void 0)) {
      return;
    }
    if (this.thangType.get('original') === ThangType.heroes['code-ninja']) {
      unlockedLevels = me.levels();
      if (indexOf.call(unlockedLevels, '5522b98685fca53105544b53') >= 0) {
        colorConfig.belt = {
          hue: 0.4,
          saturation: 0.75,
          lightness: 0.25
        };
      } else if (indexOf.call(unlockedLevels, '56fc56ac7cd2381f00d758b4') >= 0) {
        colorConfig.belt = {
          hue: 0.067,
          saturation: 0.75,
          lightness: 0.5
        };
      } else {
        colorConfig.belt = {
          hue: 0.167,
          saturation: 0.75,
          lightness: 0.4
        };
      }
    }
    return this.options.colorConfig = colorConfig;
  };

  Lank.prototype.onThangTypeLoaded = function() {
    var i, len, ref, ref1, ref2, ref3, ref4, sound, sounds, trigger;
    this.stillLoading = false;
    if (this.options.preloadSounds) {
      ref = this.thangType.get('soundTriggers') || {};
      for (trigger in ref) {
        sounds = ref[trigger];
        if (trigger !== 'say') {
          for (i = 0, len = sounds.length; i < len; i++) {
            sound = sounds[i];
            if (sound) {
              AudioPlayer.preloadSoundReference(sound);
            }
          }
        }
      }
    }
    if (this.thangType.get('raster')) {
      this.actions = {};
      this.isRaster = true;
    } else {
      this.actions = this.thangType.getActions();
      this.createMarks();
    }
    if (((ref1 = this.thang) != null ? ref1.scaleFactorX : void 0) != null) {
      this.scaleFactorX = this.thang.scaleFactorX;
    }
    if (((ref2 = this.thang) != null ? ref2.scaleFactor : void 0) != null) {
      this.scaleFactorX = this.thang.scaleFactor;
    }
    if (((ref3 = this.thang) != null ? ref3.scaleFactorY : void 0) != null) {
      this.scaleFactorY = this.thang.scaleFactorY;
    }
    if (((ref4 = this.thang) != null ? ref4.scaleFactor : void 0) != null) {
      this.scaleFactorY = this.thang.scaleFactor;
    }
    if (!this.currentAction) {
      return this.updateAction();
    }
  };

  Lank.prototype.setSprite = function(newSprite) {
    var base, i, len, parent, prop, ref;
    if (this.sprite) {
      this.sprite.off('animationend', this.playNextAction);
      if (typeof (base = this.sprite).destroy === "function") {
        base.destroy();
      }
      if (parent = this.sprite.parent) {
        parent.removeChild(this.sprite);
        if (parent.spriteSheet === newSprite.spriteSheet) {
          parent.addChild(newSprite);
        }
      }
    }
    ref = ['lastPos', 'currentRootAction'];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      delete this[prop];
    }
    this.sprite = newSprite;
    if (this.thang && this.thang.stateChanged === false) {
      this.thang.stateChanged = true;
    }
    this.configureMouse();
    this.sprite.on('animationend', this.playNextAction);
    if (this.currentAction && !this.stillLoading) {
      this.playAction(this.currentAction);
    }
    return this.trigger('new-sprite', this.sprite);
  };

  Lank.prototype.queueAction = function(action) {
    var nextAction, ref, ref1, ref2;
    if (_.isString(action)) {
      action = this.actions[action];
    }
    if (action == null) {
      action = this.actions.idle;
    }
    this.actionQueue = [];
    if ((ref = this.currentRootAction) != null ? (ref1 = ref.relatedActions) != null ? ref1.end : void 0 : void 0) {
      this.actionQueue.push(this.currentRootAction.relatedActions.end);
    }
    if ((ref2 = action.relatedActions) != null ? ref2.begin : void 0) {
      this.actionQueue.push(action.relatedActions.begin);
    }
    this.actionQueue.push(action);
    if (action.goesTo && (nextAction = this.actions[action.goesTo])) {
      if (nextAction) {
        this.actionQueue.push(nextAction);
      }
    }
    this.currentRootAction = action;
    return this.playNextAction();
  };

  Lank.prototype.onSurfaceTicked = function(e) {
    return this.age += e.dt;
  };

  Lank.prototype.playNextAction = function() {
    if (this.destroyed) {
      return;
    }
    if (this.actionQueue.length) {
      return this.playAction(this.actionQueue.splice(0, 1)[0]);
    }
  };

  Lank.prototype.playAction = function(action) {
    var base, m;
    if (this.isRaster) {
      return;
    }
    this.currentAction = action;
    if (!(action.animation || action.container || action.relatedActions || action.goesTo)) {
      return this.hide();
    }
    this.show();
    if (!(action.animation || action.container || action.goesTo)) {
      return this.updateActionDirection();
    }
    if (this.sprite.placeholder) {
      return;
    }
    m = action.container ? 'gotoAndStop' : 'gotoAndPlay';
    if (typeof (base = this.sprite)[m] === "function") {
      base[m](action.name);
    }
    this.updateScale();
    return this.updateRotation();
  };

  Lank.prototype.hide = function() {
    this.hiding = true;
    return this.updateAlpha();
  };

  Lank.prototype.show = function() {
    this.hiding = false;
    return this.updateAlpha();
  };

  Lank.prototype.stop = function() {
    var mark, name, ref, ref1;
    if ((ref = this.sprite) != null) {
      if (typeof ref.stop === "function") {
        ref.stop();
      }
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.stop();
    }
    return this.stopped = true;
  };

  Lank.prototype.play = function() {
    var mark, name, ref, ref1;
    if ((ref = this.sprite) != null) {
      if (typeof ref.play === "function") {
        ref.play();
      }
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.play();
    }
    return this.stopped = false;
  };

  Lank.prototype.update = function(frameChanged) {
    var thangUnchanged;
    if (this.stillLoading) {
      return false;
    }
    thangUnchanged = this.thang && this.thang.stateChanged === false;
    if ((frameChanged && !thangUnchanged) || (this.thang && this.thang.bobHeight) || this.notOfThisWorld) {
      this.updatePosition();
    }
    if (thangUnchanged) {
      return false;
    }
    frameChanged = frameChanged || this.targetScaleFactorX !== this.scaleFactorX || this.targetScaleFactorY !== this.scaleFactorY;
    if (frameChanged) {
      this.handledDisplayEvents = {};
      this.updateScale();
      this.updateAlpha();
      this.updateRotation();
      this.updateAction();
      this.updateStats();
      this.updateGold();
      this.showAreaOfEffects();
      this.showTextEvents();
      this.updateHealthBar();
    }
    this.updateMarks();
    this.updateLabels();
    if (this.thang && this.thang.stateChanged === true) {
      this.thang.stateChanged = false;
    }
    return true;
  };

  Lank.prototype.showAreaOfEffects = function() {
    var args, circle, endAngle, event, i, key, layer, layerName, len, pos, radius, ref, ref1, ref2, resFactor, results, startAngle;
    if (!((ref = this.thang) != null ? ref.currentEvents : void 0)) {
      return;
    }
    ref1 = this.thang.currentEvents;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (!_.string.startsWith(event, 'aoe-')) {
        continue;
      }
      if (this.handledDisplayEvents[event]) {
        continue;
      }
      this.handledDisplayEvents[event] = true;
      args = JSON.parse(event.slice(4));
      key = 'aoe-' + JSON.stringify(args.slice(2));
      layerName = (ref2 = args[6]) != null ? ref2 : 'ground';
      if (!(layer = this.options[layerName + 'Layer'])) {
        console.error(this.thang.id + " couldn't find layer " + layerName + "Layer for AOE effect " + key + "; using ground layer.");
        layer = this.options.groundLayer;
      }
      if (indexOf.call(layer.spriteSheet.getAnimations(), key) < 0) {
        circle = new createjs.Shape();
        radius = args[2] * Camera.PPM;
        if (args.length === 4) {
          circle.graphics.beginFill(args[3]).drawCircle(0, 0, radius);
        } else {
          startAngle = args[4] || 0;
          endAngle = args[5] || 2 * Math.PI;
          if (startAngle === endAngle) {
            startAngle = 0;
            endAngle = 2 * Math.PI;
          }
          circle.graphics.beginFill(args[3]).lineTo(0, 0).lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle)).arc(0, 0, radius, startAngle, endAngle).lineTo(0, 0);
        }
        layer.addCustomGraphic(key, circle, [-radius, -radius, radius * 2, radius * 2]);
      }
      circle = new createjs.Sprite(layer.spriteSheet);
      circle.gotoAndStop(key);
      pos = this.options.camera.worldToSurface({
        x: args[0],
        y: args[1]
      });
      circle.x = pos.x;
      circle.y = pos.y;
      resFactor = layer.resolutionFactor;
      circle.scaleY = this.options.camera.y2x * 0.7 / resFactor;
      circle.scaleX = 0.7 / resFactor;
      circle.alpha = 0.2;
      layer.addChild(circle);
      results.push(createjs.Tween.get(circle).to({
        alpha: 0.6,
        scaleY: this.options.camera.y2x / resFactor,
        scaleX: 1 / resFactor
      }, 100, createjs.Ease.circOut).to({
        alpha: 0,
        scaleY: 0,
        scaleX: 0
      }, 700, createjs.Ease.circIn).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          layer.removeChild(circle);
          return delete _this.handledDisplayEvents[event];
        };
      })(this)));
    }
    return results;
  };

  Lank.prototype.showTextEvents = function() {
    var event, i, label, len, offset, options, ref, ref1, ref2, ref3, results, shadowColor;
    if (!((ref = this.thang) != null ? ref.currentEvents : void 0)) {
      return;
    }
    ref1 = this.thang.currentEvents;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (!_.string.startsWith(event, 'text-')) {
        continue;
      }
      if (this.handledDisplayEvents[event]) {
        continue;
      }
      this.handledDisplayEvents[event] = true;
      options = JSON.parse(event.slice(5));
      label = new createjs.Text(options.text, "bold " + (options.size || 16) + "px Arial", options.color || '#FFF');
      shadowColor = (ref2 = {
        humans: '#F00',
        ogres: '#00F',
        neutral: '#0F0',
        common: '#0F0'
      }[this.thang.team]) != null ? ref2 : '#000';
      label.shadow = new createjs.Shadow(shadowColor, 1, 1, 3);
      offset = this.getOffset('aboveHead');
      ref3 = [this.sprite.x + offset.x - label.getMeasuredWidth() / 2, this.sprite.y + offset.y], label.x = ref3[0], label.y = ref3[1];
      this.options.textLayer.addChild(label);
      if (window.labels == null) {
        window.labels = [];
      }
      window.labels.push(label);
      label.alpha = 0;
      results.push(createjs.Tween.get(label).to({
        y: label.y - 2,
        alpha: 1
      }, 200, createjs.Ease.linear).to({
        y: label.y - 12
      }, 1000, createjs.Ease.linear).to({
        y: label.y - 22,
        alpha: 0
      }, 1000, createjs.Ease.linear).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          return _this.options.textLayer.removeChild(label);
        };
      })(this)));
    }
    return results;
  };

  Lank.prototype.getBobOffset = function() {
    if (!this.thang.bobHeight) {
      return 0;
    }
    if (this.stopped) {
      return this.lastBobOffset;
    }
    return this.lastBobOffset = this.thang.bobHeight * (1 + Math.sin(this.age * Math.PI / this.thang.bobTime));
  };

  Lank.prototype.getWorldPosition = function() {
    var bobOffset, p1;
    p1 = this.possessed ? this.shadow.pos : this.thang.pos;
    if (bobOffset = this.getBobOffset()) {
      p1 = (typeof p1.copy === "function" ? p1.copy() : void 0) || _.clone(p1);
      p1.z += bobOffset;
    }
    return {
      x: p1.x,
      y: p1.y,
      z: this.thang.isLand ? 0 : p1.z - this.thang.depth / 2
    };
  };

  Lank.prototype.updatePosition = function(whileLoading) {
    var p0, p1, ref, ref1, ref2, sup, wop;
    if (whileLoading == null) {
      whileLoading = false;
    }
    if (this.stillLoading && !whileLoading) {
      return;
    }
    if (!(((ref = this.thang) != null ? ref.pos : void 0) && (this.options.camera != null))) {
      return;
    }
    ref1 = [this.lastPos, this.thang.pos], p0 = ref1[0], p1 = ref1[1];
    if (p0 && p0.x === p1.x && p0.y === p1.y && p0.z === p1.z && !this.thang.bobHeight) {
      return;
    }
    wop = this.getWorldPosition();
    sup = this.options.camera.worldToSurface(wop);
    ref2 = [sup.x, sup.y], this.sprite.x = ref2[0], this.sprite.y = ref2[1];
    if (!whileLoading) {
      this.lastPos = (typeof p1.copy === "function" ? p1.copy() : void 0) || _.clone(p1);
    }
    this.hasMoved = true;
    if (this.thangType.get('name') === 'Flag' && !this.notOfThisWorld) {
      return _.defer((function(_this) {
        return function() {
          return Backbone.Mediator.publish('surface:flag-appeared', {
            sprite: _this
          });
        };
      })(this));
    }
  };

  Lank.prototype.updateScale = function(force) {
    var angle, bounds, newScaleFactorX, newScaleFactorY, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, scaleX, scaleY;
    if (!this.sprite) {
      return;
    }
    if (this.thangType.get('matchWorldDimensions') && this.thang && this.options.camera) {
      if (force || this.thang.width !== this.lastThangWidth || this.thang.height !== this.lastThangHeight || this.thang.rotation !== this.lastThangRotation) {
        bounds = this.sprite.getBounds();
        if (!bounds) {
          return;
        }
        this.sprite.scaleX = this.thang.width * Camera.PPM / bounds.width * (this.options.camera.y2x + (1 - this.options.camera.y2x) * Math.abs(Math.cos(this.thang.rotation)));
        this.sprite.scaleY = this.thang.height * Camera.PPM / bounds.height * (this.options.camera.y2x + (1 - this.options.camera.y2x) * Math.abs(Math.sin(this.thang.rotation)));
        this.sprite.regX = bounds.width * 3 / 4;
        this.sprite.regY = bounds.height * 3 / 4;
        if (this.thang.spriteName !== 'Beam') {
          this.sprite.scaleX *= (ref = this.thangType.get('scale')) != null ? ref : 1;
          this.sprite.scaleY *= (ref1 = this.thangType.get('scale')) != null ? ref1 : 1;
        }
        ref2 = [this.thang.width, this.thang.height, this.thang.rotation], this.lastThangWidth = ref2[0], this.lastThangHeight = ref2[1], this.lastThangRotation = ref2[2];
      }
      return;
    }
    scaleX = scaleY = 1;
    if (this.isMissile) {
      angle = this.getRotation();
      if (angle < 0) {
        angle = -angle;
      }
      if (angle > 90) {
        angle = 180 - angle;
      }
      scaleX = 0.5 + 0.5 * (90 - angle) / 90;
    }
    this.sprite.scaleX = this.sprite.baseScaleX * this.scaleFactorX * scaleX;
    this.sprite.scaleY = this.sprite.baseScaleY * this.scaleFactorY * scaleY;
    newScaleFactorX = (ref3 = (ref4 = (ref5 = this.thang) != null ? ref5.scaleFactorX : void 0) != null ? ref4 : (ref6 = this.thang) != null ? ref6.scaleFactor : void 0) != null ? ref3 : 1;
    newScaleFactorY = (ref7 = (ref8 = (ref9 = this.thang) != null ? ref9.scaleFactorY : void 0) != null ? ref8 : (ref10 = this.thang) != null ? ref10.scaleFactor : void 0) != null ? ref7 : 1;
    if (((ref11 = this.layer) != null ? ref11.name : void 0) === 'Land' || ((ref12 = this.thang) != null ? ref12.spriteName : void 0) === 'Beam') {
      this.scaleFactorX = newScaleFactorX;
      return this.scaleFactorY = newScaleFactorY;
    } else if (this.thang && (newScaleFactorX !== this.targetScaleFactorX || newScaleFactorY !== this.targetScaleFactorY)) {
      this.targetScaleFactorX = newScaleFactorX;
      this.targetScaleFactorY = newScaleFactorY;
      createjs.Tween.removeTweens(this);
      return createjs.Tween.get(this).to({
        scaleFactorX: this.targetScaleFactorX,
        scaleFactorY: this.targetScaleFactorY
      }, 2000, createjs.Ease.elasticOut);
    }
  };

  Lank.prototype.updateAlpha = function() {
    var mark, name, ref, ref1, ref2;
    this.sprite.alpha = this.hiding ? 0 : 1;
    if (((ref = this.thang) != null ? ref.alpha : void 0) == null) {
      return;
    }
    if (this.sprite.alpha === this.thang.alpha) {
      return;
    }
    this.sprite.alpha = this.thang.alpha;
    if (this.options.showInvisible) {
      this.sprite.alpha = Math.max(0.5, this.sprite.alpha);
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.updateAlpha(this.thang.alpha);
    }
    return (ref2 = this.healthBar) != null ? ref2.alpha = this.thang.alpha : void 0;
  };

  Lank.prototype.updateRotation = function(sprite) {
    var heading, rotation, rotationType, speed, vx, vz, xFactor, zFactor;
    rotationType = this.thangType.get('rotationType');
    if (rotationType === 'fixed') {
      return;
    }
    rotation = this.getRotation();
    if (this.isMissile && this.thang.velocity) {
      vz = this.thang.velocity.z;
      if (vz && (speed = this.thang.velocity.magnitude(true))) {
        vx = this.thang.velocity.x;
        heading = this.thang.velocity.heading();
        xFactor = Math.cos(heading);
        zFactor = vz / Math.sqrt(vz * vz + vx * vx);
        rotation -= xFactor * zFactor * 45;
      }
    }
    if (sprite == null) {
      sprite = this.sprite;
    }
    if (rotationType === 'free' || !rotationType) {
      return sprite.rotation = rotation;
    }
    return this.updateIsometricRotation(rotation, sprite);
  };

  Lank.prototype.getRotation = function() {
    var rotation, thang;
    thang = this.possessed ? this.shadow : this.thang;
    if (!(thang != null ? thang.rotation : void 0)) {
      return this.rotation;
    }
    rotation = thang != null ? thang.rotation : void 0;
    rotation = (360 - (rotation * 180 / Math.PI) % 360) % 360;
    if (rotation > 180) {
      rotation -= 360;
    }
    return rotation;
  };

  Lank.prototype.updateIsometricRotation = function(rotation, sprite) {
    if (!this.currentAction) {
      return;
    }
    if (_.string.endsWith(this.currentAction.name, 'back')) {
      return;
    }
    if (_.string.endsWith(this.currentAction.name, 'fore')) {
      return;
    }
    if (Math.abs(rotation) >= 90) {
      return sprite.scaleX *= -1;
    }
  };

  Lank.prototype.updateAction = function() {
    var action, base, isDifferent, ref, ref1, ref2;
    if (this.isRaster || this.actionLocked) {
      return;
    }
    action = this.determineAction();
    isDifferent = action !== this.currentRootAction || action === null;
    if (!action && ((ref = this.thang) != null ? ref.actionActivated : void 0) && !this.stopLogging) {
      console.error('action is', action, 'for', (ref1 = this.thang) != null ? ref1.id : void 0, 'from', this.currentRootAction, this.thang.action, typeof (base = this.thang).getActionName === "function" ? base.getActionName() : void 0);
      this.stopLogging = true;
    }
    if (action && (isDifferent || (((ref2 = this.thang) != null ? ref2.actionActivated : void 0) && action.name !== 'move'))) {
      this.queueAction(action);
    }
    return this.updateActionDirection();
  };

  Lank.prototype.determineAction = function() {
    var action, thang;
    action = null;
    thang = this.possessed ? this.shadow : this.thang;
    if (thang != null ? thang.acts : void 0) {
      action = thang.action;
    }
    if (this.currentRootAction != null) {
      if (action == null) {
        action = this.currentRootAction.name;
      }
    }
    if (action == null) {
      action = 'idle';
    }
    if (this.actions[action] == null) {
      if (this.warnedFor == null) {
        this.warnedFor = {};
      }
      if (!this.warnedFor[action]) {
        console.warn('Cannot show action', action, 'for', this.thangType.get('name'), 'because it DNE');
      }
      this.warnedFor[action] = true;
      if (this.action === 'idle') {
        return null;
      } else {
        return 'idle';
      }
    }
    if ((this.actions.die != null) && ((thang != null ? thang.health : void 0) != null) && thang.health <= 0) {
      action = 'die';
    }
    return this.actions[action];
  };

  Lank.prototype.updateActionDirection = function(wallGrid) {
    var action;
    this.wallGrid = wallGrid != null ? wallGrid : null;
    if (!(action = this.getActionDirection())) {
      return;
    }
    if (action !== this.currentAction) {
      return this.playAction(action);
    }
  };

  Lank.prototype.lockAction = function() {
    return this.actionLocked = true;
  };

  Lank.prototype.getActionDirection = function(rootAction) {
    var action, direction, gx, gy, i, index, j, keys, len, len1, matchedAction, ref, ref1, ref2, ref3, relatedAction, relatedActions, rotation, tileSize, value, wallThangs, x, y;
    if (rootAction == null) {
      rootAction = null;
    }
    if (rootAction == null) {
      rootAction = this.currentRootAction;
    }
    if (!(relatedActions = (ref = rootAction != null ? rootAction.relatedActions : void 0) != null ? ref : {})) {
      return null;
    }
    rotation = this.getRotation();
    if (relatedActions['111111111111']) {
      if (this.wallGrid) {
        this.hadWallGrid = true;
        action = '';
        tileSize = 4;
        ref1 = [this.thang.pos.x, this.thang.pos.y], gx = ref1[0], gy = ref1[1];
        ref2 = [gy + tileSize, gy, gy - tileSize, gy - tileSize * 2];
        for (i = 0, len = ref2.length; i < len; i++) {
          y = ref2[i];
          ref3 = [gx - tileSize, gx, gx + tileSize];
          for (j = 0, len1 = ref3.length; j < len1; j++) {
            x = ref3[j];
            if (x >= 0 && y >= 0 && x < this.wallGrid.width && y < this.wallGrid.height) {
              wallThangs = this.wallGrid.contents(x, y);
            } else {
              wallThangs = ['outside of the map yo'];
            }
            if (wallThangs.length === 0) {
              if (y === gy && x === gx) {
                action += '1';
              } else {
                action += '0';
              }
            } else if (wallThangs.length === 1) {
              action += '1';
            } else {
              console.error('Overlapping walls at', x, y, '...', wallThangs);
              action += '1';
            }
          }
        }
        matchedAction = '111111111111';
        for (relatedAction in relatedActions) {
          if (action.match(relatedAction.replace(/\?/g, '.'))) {
            matchedAction = relatedAction;
            break;
          }
        }
        return relatedActions[matchedAction];
      } else if (this.hadWallGrid) {
        return null;
      } else {
        keys = _.keys(relatedActions);
        index = Math.max(0, Math.floor((179 + rotation) / 360 * keys.length));
        return relatedActions[keys[index]];
      }
    }
    value = Math.abs(rotation);
    direction = null;
    if (value <= 45 || value >= 135) {
      direction = 'side';
    }
    if ((135 > rotation && rotation > 45)) {
      direction = 'fore';
    }
    if ((-135 < rotation && rotation < -45)) {
      direction = 'back';
    }
    return relatedActions[direction];
  };

  Lank.prototype.updateStats = function() {
    var bar, healthPct;
    if (!(this.thang && this.thang.health !== this.lastHealth)) {
      return;
    }
    this.lastHealth = this.thang.health;
    if (bar = this.healthBar) {
      healthPct = Math.max(this.thang.health / this.thang.maxHealth, 0);
      bar.scaleX = healthPct / this.options.floatingLayer.resolutionFactor;
    }
    if (this.thang.showsName) {
      return this.setNameLabel(this.thang.health <= 0 ? '' : this.thang.id);
    } else if (this.options.playerName) {
      return this.setNameLabel(this.options.playerName);
    }
  };

  Lank.prototype.configureMouse = function() {
    var ref, ref1, ref2;
    if ((ref = this.thang) != null ? ref.isSelectable : void 0) {
      this.sprite.cursor = 'pointer';
    }
    if (!(((ref1 = this.thang) != null ? ref1.isSelectable : void 0) || ((ref2 = this.thang) != null ? ref2.isLand : void 0))) {
      this.sprite.mouseEnabled = this.sprite.mouseChildren = false;
    }
    if (this.sprite.mouseEnabled) {
      this.sprite.on('mousedown', this.onMouseEvent, this, false, 'sprite:mouse-down');
      this.sprite.on('click', this.onMouseEvent, this, false, 'sprite:clicked');
      this.sprite.on('dblclick', this.onMouseEvent, this, false, 'sprite:double-clicked');
      this.sprite.on('pressmove', this.onMouseEvent, this, false, 'sprite:dragged');
      return this.sprite.on('pressup', this.onMouseEvent, this, false, 'sprite:mouse-up');
    }
  };

  Lank.prototype.onMouseEvent = function(e, ourEventName) {
    var newEvent, p;
    if (this.letterboxOn || !this.sprite) {
      return;
    }
    p = this.sprite;
    while (p.parent) {
      p = p.parent;
    }
    newEvent = {
      sprite: this,
      thang: this.thang,
      originalEvent: e,
      canvas: p.canvas
    };
    this.trigger(ourEventName, newEvent);
    Backbone.Mediator.publish(ourEventName, newEvent);
    return this.gameUIState.trigger(ourEventName, newEvent);
  };

  Lank.prototype.addHealthBar = function() {
    var bar, hadHealthBar, healthColor, key, offset, ref, ref1, ref2, ref3, team;
    if (!((((ref = this.thang) != null ? ref.health : void 0) != null) && indexOf.call((ref1 = (ref2 = this.thang) != null ? ref2.hudProperties : void 0) != null ? ref1 : [], 'health') >= 0 && this.options.floatingLayer)) {
      return;
    }
    team = ((ref3 = this.thang) != null ? ref3.team : void 0) || 'neutral';
    key = team + "-health-bar";
    if (indexOf.call(this.options.floatingLayer.spriteSheet.getAnimations(), key) < 0) {
      healthColor = healthColors[team];
      bar = createProgressBar(healthColor);
      this.options.floatingLayer.addCustomGraphic(key, bar, bar.bounds);
    }
    hadHealthBar = this.healthBar;
    this.healthBar = new createjs.Sprite(this.options.floatingLayer.spriteSheet);
    this.healthBar.gotoAndStop(key);
    offset = this.getOffset('aboveHead');
    this.healthBar.scaleX = this.healthBar.scaleY = 1 / this.options.floatingLayer.resolutionFactor;
    this.healthBar.name = 'health bar';
    this.options.floatingLayer.addChild(this.healthBar);
    this.updateHealthBar();
    this.lastHealth = null;
    if (!hadHealthBar) {
      return this.listenTo(this.options.floatingLayer, 'new-spritesheet', this.addHealthBar);
    }
  };

  Lank.prototype.getActionProp = function(prop, subProp, def) {
    var i, len, ref, ref1, val;
    if (def == null) {
      def = null;
    }
    ref1 = [(ref = this.currentAction) != null ? ref[prop] : void 0, this.thangType.get(prop)];
    for (i = 0, len = ref1.length; i < len; i++) {
      val = ref1[i];
      if ((val != null) && subProp) {
        val = val[subProp];
      }
      if (val != null) {
        return val;
      }
    }
    return def;
  };

  Lank.prototype.getOffset = function(prop) {
    var def, pos, ref, ref1, ref2, ref3, scale;
    def = {
      x: 0,
      y: {
        registration: 0,
        torso: -50,
        mouth: -60,
        aboveHead: -100
      }[prop]
    };
    pos = this.getActionProp('positions', prop, def);
    pos = {
      x: pos.x,
      y: pos.y
    };
    if (!this.isRaster) {
      scale = this.getActionProp('scale', null, 1);
      if (prop === 'registration') {
        scale *= this.sprite.parent.resolutionFactor;
      }
      pos.x *= scale;
      pos.y *= scale;
    }
    if (this.thang && prop !== 'registration') {
      pos.x *= (ref = (ref1 = this.thang.scaleFactorX) != null ? ref1 : this.thang.scaleFactor) != null ? ref : 1;
      pos.y *= (ref2 = (ref3 = this.thang.scaleFactorY) != null ? ref3 : this.thang.scaleFactor) != null ? ref2 : 1;
    }
    return pos;
  };

  Lank.prototype.createMarks = function() {
    if (!this.options.camera) {
      return;
    }
    if (this.thang) {
      if (this.thangType.get('shadow') !== 0) {
        return this.addMark('shadow').toggle(true);
      }
    }
  };

  Lank.prototype.updateMarks = function() {
    var i, j, len, len1, mark, name, range, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    if (!this.options.camera) {
      return;
    }
    if ((ref = this.thang) != null ? ref.erroredOut : void 0) {
      this.addMark('repair', null, 'repair');
    }
    if ((ref1 = this.marks.repair) != null) {
      ref1.toggle((ref2 = this.thang) != null ? ref2.erroredOut : void 0);
    }
    if (this.selected) {
      ref3 = this.ranges;
      for (i = 0, len = ref3.length; i < len; i++) {
        range = ref3[i];
        this.marks[range['name']].toggle(true);
      }
    } else {
      ref4 = this.ranges;
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        range = ref4[j];
        this.marks[range['name']].toggle(false);
      }
    }
    if (this.isMissile && this.thang.action === 'die') {
      if ((ref5 = this.marks.shadow) != null) {
        ref5.hide();
      }
    }
    ref6 = this.marks;
    for (name in ref6) {
      mark = ref6[name];
      mark.update();
    }
    if (((ref7 = this.thang) != null ? (ref8 = ref7.effectNames) != null ? ref8.length : void 0 : void 0) || ((ref9 = this.previousEffectNames) != null ? ref9.length : void 0)) {
      return this.updateEffectMarks();
    }
  };

  Lank.prototype.updateEffectMarks = function() {
    var effect, i, j, len, len1, mark, ref, ref1;
    if (_.isEqual(this.thang.effectNames, this.previousEffectNames)) {
      return;
    }
    if (this.stopped) {
      return;
    }
    ref = this.thang.effectNames;
    for (i = 0, len = ref.length; i < len; i++) {
      effect = ref[i];
      mark = this.addMark(effect, this.options.floatingLayer, effect);
      mark.statusEffect = true;
      mark.toggle('on');
      mark.show();
    }
    if (this.previousEffectNames) {
      ref1 = this.previousEffectNames;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        effect = ref1[j];
        if (indexOf.call(this.thang.effectNames, effect) >= 0) {
          continue;
        }
        mark = this.marks[effect];
        mark.toggle(false);
      }
    }
    if (this.thang.effectNames.length > 1 && !this.effectInterval) {
      this.rotateEffect();
      this.effectInterval = setInterval(this.rotateEffect, 1500);
    } else if (this.effectInterval && this.thang.effectNames.length <= 1) {
      clearInterval(this.effectInterval);
      this.effectInterval = null;
    }
    return this.previousEffectNames = this.thang.effectNames;
  };

  Lank.prototype.rotateEffect = function() {
    var effect, effects, i, len, m;
    effects = (function() {
      var i, len, ref, results;
      ref = _.values(this.marks);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        if (m.on && m.statusEffect && m.mark) {
          results.push(m.name);
        }
      }
      return results;
    }).call(this);
    if (!effects.length) {
      return;
    }
    effects.sort();
    if (this.effectIndex == null) {
      this.effectIndex = 0;
    }
    this.effectIndex = (this.effectIndex + 1) % effects.length;
    for (i = 0, len = effects.length; i < len; i++) {
      effect = effects[i];
      this.marks[effect].hide();
    }
    return this.marks[effects[this.effectIndex]].show();
  };

  Lank.prototype.setHighlight = function(to, delay) {
    var ref, ref1;
    if (to) {
      this.addMark('highlight', this.options.floatingLayer, 'highlight');
    }
    if ((ref = this.marks.highlight) != null) {
      ref.highlightDelay = delay;
    }
    return (ref1 = this.marks.highlight) != null ? ref1.toggle(to && !this.dimmed) : void 0;
  };

  Lank.prototype.setDimmed = function(dimmed) {
    var ref;
    this.dimmed = dimmed;
    return (ref = this.marks.highlight) != null ? ref.toggle(this.marks.highlight.on && !this.dimmed) : void 0;
  };

  Lank.prototype.setThang = function(thang1) {
    this.thang = thang1;
    return this.options.thang = this.thang;
  };

  Lank.prototype.setDebug = function(debug) {
    var d, ref;
    if (!(((ref = this.thang) != null ? ref.collides : void 0) && (this.options.camera != null))) {
      return;
    }
    if (debug) {
      this.addMark('debug', this.options.floatingLayer);
    }
    if (d = this.marks.debug) {
      d.toggle(debug);
      return d.updatePosition();
    }
  };

  Lank.prototype.addLabel = function(name, style) {
    var base;
    if ((base = this.labels)[name] == null) {
      base[name] = new Label({
        sprite: this,
        camera: this.options.camera,
        layer: this.options.textLayer,
        style: style
      });
    }
    return this.labels[name];
  };

  Lank.prototype.addMark = function(name, layer, thangType) {
    var base;
    if (thangType == null) {
      thangType = null;
    }
    if ((base = this.marks)[name] == null) {
      base[name] = new Mark({
        name: name,
        lank: this,
        camera: this.options.camera,
        layer: layer != null ? layer : this.options.groundLayer,
        thangType: thangType
      });
    }
    return this.marks[name];
  };

  Lank.prototype.removeMark = function(name) {
    this.marks[name].destroy();
    return delete this.marks[name];
  };

  Lank.prototype.notifySpeechUpdated = function(e) {
    e = _.clone(e);
    e.sprite = this;
    if (e.blurb == null) {
      e.blurb = '...';
    }
    e.thang = this.thang;
    return Backbone.Mediator.publish('sprite:speech-updated', e);
  };

  Lank.prototype.isTalking = function() {
    var ref, ref1;
    return Boolean(((ref = this.labels.dialogue) != null ? ref.text : void 0) || ((ref1 = this.labels.say) != null ? ref1.text : void 0));
  };

  Lank.prototype.onDialogue = function(e) {
    var label, ref, ref1, ref2, ref3, sound;
    if (((ref = this.thang) != null ? ref.id : void 0) !== e.spriteID) {
      return;
    }
    if (((ref1 = this.thang) != null ? ref1.id : void 0) !== 'Hero Placeholder') {
      label = this.addLabel('dialogue', Label.STYLE_DIALOGUE);
      label.setText(e.blurb || '...');
    }
    sound = (ref2 = e.sound) != null ? ref2 : AudioPlayer.soundForDialogue(e.message, this.thangType.get('soundTriggers'));
    if ((ref3 = this.dialogueSoundInstance) != null) {
      ref3.stop();
    }
    if (this.dialogueSoundInstance = this.playSound(sound, false)) {
      this.dialogueSoundInstance.addEventListener('complete', function() {
        return Backbone.Mediator.publish('sprite:dialogue-sound-completed', {});
      });
    }
    return this.notifySpeechUpdated(e);
  };

  Lank.prototype.onClearDialogue = function(e) {
    var ref, ref1, ref2;
    if (!((ref = this.labels.dialogue) != null ? ref.text : void 0)) {
      return;
    }
    if ((ref1 = this.labels.dialogue) != null) {
      ref1.setText(null);
    }
    if ((ref2 = this.dialogueSoundInstance) != null) {
      ref2.stop();
    }
    return this.notifySpeechUpdated({});
  };

  Lank.prototype.onSetLetterbox = function(e) {
    return this.letterboxOn = e.on;
  };

  Lank.prototype.setNameLabel = function(name) {
    var label;
    label = this.addLabel('name', Label.STYLE_NAME);
    return label.setText(name);
  };

  Lank.prototype.updateLabels = function() {
    var blurb, label, labelStyle, ls, name, ref, ref1, ref2, ref3, ref4, results;
    if (!this.thang) {
      return;
    }
    blurb = this.thang.health <= 0 ? null : this.thang.sayMessage;
    if (blurb === 'For Thoktar!' || blurb === 'Bones!' || blurb === 'Behead!' || blurb === 'Destroy!' || blurb === 'Die, humans!') {
      blurb = null;
    }
    if (/Hero Placeholder/.test(this.thang.id)) {
      labelStyle = Label.STYLE_DIALOGUE;
    } else {
      labelStyle = (ref = this.thang.labelStyle) != null ? ref : Label.STYLE_SAY;
    }
    if (blurb) {
      this.addLabel('say', labelStyle);
    }
    if ((ref1 = this.labels.say) != null ? ref1.setText(blurb) : void 0) {
      this.notifySpeechUpdated({
        blurb: blurb
      });
    }
    if (((ref2 = this.thang) != null ? ref2.variableNames : void 0) != null) {
      ls = this.addLabel('variableNames', Label.STYLE_VAR);
      ls.setText((ref3 = this.thang) != null ? ref3.variableNames : void 0);
    } else if (this.labels.variableNames) {
      this.labels.variableNames.destroy();
      delete this.labels.variableNames;
    }
    ref4 = this.labels;
    results = [];
    for (name in ref4) {
      label = ref4[name];
      results.push(label.update());
    }
    return results;
  };

  Lank.prototype.updateGold = function() {
    var gold, ref, ref1;
    if (!this.thang) {
      return;
    }
    if (this.thang.gold === this.lastGold) {
      return;
    }
    gold = Math.floor((ref = this.thang.gold) != null ? ref : 0);
    if (this.thang.world.age === 0) {
      gold = this.thang.world.initialTeamGold[this.thang.team].gold;
    }
    if (gold === this.lastGold) {
      return;
    }
    this.lastGold = gold;
    return Backbone.Mediator.publish('surface:gold-changed', {
      team: this.thang.team,
      gold: gold,
      goldEarned: Math.floor((ref1 = this.thang.goldEarned) != null ? ref1 : 0)
    });
  };

  Lank.prototype.shouldMuteMessage = function(m) {
    var ref, ref1, t0, t1;
    if ((ref = me.getAnnouncesActionAudioGroup()) === 'no-audio' || ref === 'just-take-damage') {
      if (m === 'moveRight' || m === 'moveUp' || m === 'moveDown' || m === 'moveLeft') {
        return true;
      }
      if (/^attack /.test(m)) {
        return true;
      }
      if (/^Repeating loop/.test(m)) {
        return true;
      }
      if (/^findNearestEnemy/.test(m)) {
        return true;
      }
    }
    if (m === 'moveRight' || m === 'moveUp' || m === 'moveDown' || m === 'moveLeft') {
      return false;
    }
    if (this.previouslySaidMessages == null) {
      this.previouslySaidMessages = {};
    }
    t0 = (ref1 = this.previouslySaidMessages[m]) != null ? ref1 : 0;
    t1 = new Date();
    this.previouslySaidMessages[m] = t1;
    if (t1 - t0 < 5 * 1000) {
      return true;
    }
    return false;
  };

  Lank.prototype.playSounds = function(withDelay, volume) {
    var action, event, i, len, offsetFrames, ref, ref1, ref2, sound;
    if (withDelay == null) {
      withDelay = true;
    }
    if (volume == null) {
      volume = 1.0;
    }
    ref1 = (ref = this.thang.currentEvents) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (event === 'take-damage' && ((ref2 = me.getAnnouncesActionAudioGroup()) === 'no-audio' || ref2 === 'without-take-damage')) {
        null;
      } else {
        this.playSound(event, withDelay, volume);
      }
      if (event === 'pay-bounty-gold' && this.thang.bountyGold > 25 && this.thang.team !== me.team) {
        AudioPlayer.playInterfaceSound('coin_1', 0.25);
      }
    }
    if (this.thang.actionActivated && (action = this.thang.getActionName()) !== 'say') {
      this.playSound(action, withDelay, volume);
    }
    if (this.thang.sayMessage && withDelay && !this.thang.silent && !this.shouldMuteMessage(this.thang.sayMessage)) {
      offsetFrames = Math.abs(this.thang.sayStartTime - this.thang.world.age) / this.thang.world.dt;
      if (offsetFrames <= 2) {
        sound = AudioPlayer.soundForDialogue(this.thang.sayMessage, this.thangType.get('soundTriggers'));
        return this.playSound(sound, false, volume);
      }
    }
  };

  Lank.prototype.playSound = function(sound, withDelay, volume) {
    var delay, instance, name, ref;
    if (withDelay == null) {
      withDelay = true;
    }
    if (volume == null) {
      volume = 1.0;
    }
    if (_.isString(sound)) {
      sound = (ref = this.thangType.get('soundTriggers')) != null ? ref[sound] : void 0;
    }
    if (_.isArray(sound)) {
      sound = sound[Math.floor(Math.random() * sound.length)];
    }
    if (!sound) {
      return null;
    }
    delay = withDelay && sound.delay ? 1000 * sound.delay / createjs.Ticker.getFPS() : 0;
    name = AudioPlayer.nameForSoundReference(sound);
    AudioPlayer.preloadSoundReference(sound);
    instance = AudioPlayer.playSound(name, volume, delay, this.getWorldPosition());
    return instance;
  };

  Lank.prototype.onMove = function(e) {
    var args, distance, heading, offset, pos, ref, target;
    if (e.spriteID !== ((ref = this.thang) != null ? ref.id : void 0)) {
      return;
    }
    pos = e.pos;
    if (_.isArray(pos)) {
      pos = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Vector, pos, function(){});
    } else if (_.isString(pos)) {
      if (!(pos in this.options.sprites)) {
        return console.warn('Couldn\'t find target sprite', pos, 'from', this.options.sprites);
      }
      target = this.options.sprites[pos].thang;
      heading = Vector.subtract(target.pos, this.thang.pos).normalize();
      distance = this.thang.pos.distance(target.pos);
      offset = Math.max(target.width, target.height, 2) / 2 + 3;
      pos = Vector.add(this.thang.pos, heading.multiply(distance - offset));
    }
    Backbone.Mediator.publish('level:sprite-clear-dialogue', {});
    this.onClearDialogue();
    args = [pos];
    if (e.duration != null) {
      args.push(e.duration);
    }
    return this.move.apply(this, args);
  };

  Lank.prototype.move = function(pos, duration, endAnimation) {
    var base, ease, endFunc, z;
    if (duration == null) {
      duration = 2000;
    }
    if (endAnimation == null) {
      endAnimation = 'idle';
    }
    this.updateShadow();
    if (!duration) {
      if (this.lastTween) {
        createjs.Tween.removeTweens(this.shadow.pos);
      }
      this.lastTween = null;
      z = this.shadow.pos.z;
      this.shadow.pos = pos;
      this.shadow.pos.z = z;
      if (typeof (base = this.sprite).gotoAndPlay === "function") {
        base.gotoAndPlay(endAnimation);
      }
      return;
    }
    this.shadow.action = 'move';
    this.shadow.actionActivated = true;
    this.pointToward(pos);
    this.possessed = true;
    this.update(true);
    ease = createjs.Ease.getPowInOut(2.2);
    if (this.lastTween) {
      ease = createjs.Ease.getPowOut(1.2);
      createjs.Tween.removeTweens(this.shadow.pos);
    }
    endFunc = (function(_this) {
      return function() {
        _this.lastTween = null;
        if (!_this.stillLoading) {
          _this.sprite.gotoAndPlay(endAnimation);
        }
        _this.shadow.action = 'idle';
        _this.update(true);
        return _this.possessed = false;
      };
    })(this);
    return this.lastTween = createjs.Tween.get(this.shadow.pos).to({
      x: pos.x,
      y: pos.y
    }, duration, ease).call(endFunc);
  };

  Lank.prototype.pointToward = function(pos) {
    this.shadow.rotation = Math.atan2(pos.y - this.shadow.pos.y, pos.x - this.shadow.pos.x);
    if ((this.shadow.rotation * 180 / Math.PI) % 90 === 0) {
      return this.shadow.rotation += 0.01;
    }
  };

  Lank.prototype.updateShadow = function() {
    if (!this.shadow) {
      this.shadow = {};
    }
    this.shadow.pos = this.thang.pos;
    this.shadow.rotation = this.thang.rotation;
    this.shadow.action = this.thang.action;
    return this.shadow.actionActivated = this.thang.actionActivated;
  };

  Lank.prototype.updateHealthBar = function() {
    var bounds, offset;
    if (!this.healthBar) {
      return;
    }
    bounds = this.healthBar.getBounds();
    offset = this.getOffset('aboveHead');
    this.healthBar.x = this.sprite.x - (-offset.x + bounds.width / 2 / this.options.floatingLayer.resolutionFactor);
    return this.healthBar.y = this.sprite.y - (-offset.y + bounds.height / 2 / this.options.floatingLayer.resolutionFactor);
  };

  Lank.prototype.destroy = function() {
    var label, mark, name, p, ref, ref1, ref2, ref3, ref4;
    ref = this.marks;
    for (name in ref) {
      mark = ref[name];
      mark.destroy();
    }
    ref1 = this.labels;
    for (name in ref1) {
      label = ref1[name];
      label.destroy();
    }
    if (p = (ref2 = this.healthBar) != null ? ref2.parent : void 0) {
      p.removeChild(this.healthBar);
    }
    if ((ref3 = this.sprite) != null) {
      ref3.off('animationend', this.playNextAction);
    }
    if (this.effectInterval) {
      clearInterval(this.effectInterval);
    }
    if ((ref4 = this.dialogueSoundInstance) != null) {
      ref4.removeAllEventListeners();
    }
    return Lank.__super__.destroy.call(this);
  };

  return Lank;

})(CocoClass);
});

;require.register("lib/surface/LankBoss", function(exports, require, module) {
var CocoClass, FlagLank, Grid, Lank, LankBoss, LayerAdapter, Mark, me, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

LayerAdapter = require('./LayerAdapter');

FlagLank = require('lib/surface/FlagLank');

Lank = require('lib/surface/Lank');

Mark = require('./Mark');

Grid = require('lib/world/Grid');

utils = require('core/utils');

module.exports = LankBoss = (function(superClass) {
  extend(LankBoss, superClass);

  LankBoss.prototype.subscriptions = {
    'level:set-debug': 'onSetDebug',
    'sprite:highlight-sprites': 'onHighlightSprites',
    'surface:stage-mouse-down': 'onStageMouseDown',
    'level:select-sprite': 'onSelectSprite',
    'level:suppress-selection-sounds': 'onSuppressSelectionSounds',
    'level:lock-select': 'onSetLockSelect',
    'level:restarted': 'onLevelRestarted',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'camera:dragged': 'onCameraDragged',
    'sprite:loaded': function() {
      return this.update(true);
    },
    'level:flag-color-selected': 'onFlagColorSelected',
    'level:flag-updated': 'onFlagUpdated',
    'surface:flag-appeared': 'onFlagAppeared',
    'surface:remove-selected-flag': 'onRemoveSelectedFlag'
  };

  function LankBoss(options1) {
    var base;
    this.options = options1 != null ? options1 : {};
    LankBoss.__super__.constructor.call(this);
    this.handleEvents = this.options.handleEvents;
    this.gameUIState = this.options.gameUIState;
    this.dragged = 0;
    this.camera = this.options.camera;
    this.webGLStage = this.options.webGLStage;
    this.surfaceTextLayer = this.options.surfaceTextLayer;
    this.world = this.options.world;
    if ((base = this.options).thangTypes == null) {
      base.thangTypes = [];
    }
    this.lanks = {};
    this.lankArray = [];
    this.createLayers();
    this.pendingFlags = [];
    if (!this.handleEvents) {
      this.listenTo(this.gameUIState, 'change:selected', this.onChangeSelected);
    }
  }

  LankBoss.prototype.destroy = function() {
    var j, lank, lankLayer, len, ref, ref1, ref2, ref3, thangID;
    ref = this.lanks;
    for (thangID in ref) {
      lank = ref[thangID];
      this.removeLank(lank);
    }
    if ((ref1 = this.targetMark) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.selectionMark) != null) {
      ref2.destroy();
    }
    ref3 = _.values(this.layerAdapters);
    for (j = 0, len = ref3.length; j < len; j++) {
      lankLayer = ref3[j];
      lankLayer.destroy();
    }
    return LankBoss.__super__.destroy.call(this);
  };

  LankBoss.prototype.toString = function() {
    return "<LankBoss: " + this.lankArray.length + " lanks>";
  };

  LankBoss.prototype.thangTypeFor = function(type) {
    return _.find(this.options.thangTypes, function(m) {
      return m.get('original') === type || m.get('name') === type;
    });
  };

  LankBoss.prototype.createLayers = function() {
    var j, lankLayer, len, name, priority, ref, ref1, ref2;
    this.layerAdapters = {};
    ref = [['Land', -40], ['Ground', -30], ['Obstacle', -20], ['Path', -10], ['Default', 0], ['Floating', 10]];
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], name = ref1[0], priority = ref1[1];
      this.layerAdapters[name] = new LayerAdapter({
        name: name,
        webGL: true,
        layerPriority: priority,
        transform: LayerAdapter.TRANSFORM_SURFACE,
        camera: this.camera
      });
    }
    return (ref2 = this.webGLStage).addChild.apply(ref2, (function() {
      var k, len1, ref2, results;
      ref2 = _.values(this.layerAdapters);
      results = [];
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        lankLayer = ref2[k];
        results.push(lankLayer.container);
      }
      return results;
    }).call(this));
  };

  LankBoss.prototype.layerForChild = function(child, lank) {
    var layer, thang;
    if (child.layerPriority == null) {
      if (thang = lank != null ? lank.thang : void 0) {
        child.layerPriority = thang.layerPriority;
        if (thang.isSelectable) {
          if (child.layerPriority == null) {
            child.layerPriority = 0;
          }
        }
        if (thang.isLand) {
          if (child.layerPriority == null) {
            child.layerPriority = -40;
          }
        }
      }
    }
    if (child.layerPriority == null) {
      child.layerPriority = 0;
    }
    if (!child.layerPriority) {
      return this.layerAdapters['Default'];
    }
    layer = _.findLast(this.layerAdapters, function(layer, name) {
      return layer.layerPriority <= child.layerPriority;
    });
    if (child.layerPriority < -40) {
      if (layer == null) {
        layer = this.layerAdapters['Land'];
      }
    }
    return layer != null ? layer : this.layerAdapters['Default'];
  };

  LankBoss.prototype.addLank = function(lank, id, layer) {
    var ref;
    if (id == null) {
      id = null;
    }
    if (layer == null) {
      layer = null;
    }
    if (id == null) {
      id = lank.thang.id;
    }
    if (this.lanks[id]) {
      console.error('Lank collision! Already have:', id);
    }
    this.lanks[id] = lank;
    this.lankArray.push(lank);
    if (((ref = lank.thang) != null ? ref.spriteName.search(/(dungeon|indoor|ice|classroom|vr).wall/i) : void 0) !== -1) {
      if (layer == null) {
        layer = this.layerAdapters['Obstacle'];
      }
    }
    if (layer == null) {
      layer = this.layerForChild(lank.sprite, lank);
    }
    layer.addLank(lank);
    layer.updateLayerOrder();
    return lank;
  };

  LankBoss.prototype.createMarks = function() {
    this.targetMark = new Mark({
      name: 'target',
      camera: this.camera,
      layer: this.layerAdapters['Ground'],
      thangType: 'target'
    });
    return this.selectionMark = new Mark({
      name: 'selection',
      camera: this.camera,
      layer: this.layerAdapters['Ground'],
      thangType: 'selection'
    });
  };

  LankBoss.prototype.createLankOptions = function(options) {
    return _.extend(options, {
      camera: this.camera,
      resolutionFactor: SPRITE_RESOLUTION_FACTOR,
      groundLayer: this.layerAdapters['Ground'],
      textLayer: this.surfaceTextLayer,
      floatingLayer: this.layerAdapters['Floating'],
      showInvisible: this.options.showInvisible,
      gameUIState: this.gameUIState,
      handleEvents: this.handleEvents
    });
  };

  LankBoss.prototype.onSetDebug = function(e) {
    var j, lank, len, ref, results;
    if (e.debug === this.debug) {
      return;
    }
    this.debug = e.debug;
    ref = this.lankArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      results.push(lank.setDebug(this.debug));
    }
    return results;
  };

  LankBoss.prototype.onHighlightSprites = function(e) {
    var highlightedIDs, lank, ref, results, thangID;
    highlightedIDs = e.thangIDs || [];
    ref = this.lanks;
    results = [];
    for (thangID in ref) {
      lank = ref[thangID];
      results.push(typeof lank.setHighlight === "function" ? lank.setHighlight(indexOf.call(highlightedIDs, thangID) >= 0, e.delay) : void 0);
    }
    return results;
  };

  LankBoss.prototype.addThangToLanks = function(thang, layer) {
    var lank, options, thangType;
    if (layer == null) {
      layer = null;
    }
    if (this.lanks[thang.id]) {
      return console.warn('Tried to add Thang to the surface it already has:', thang.id);
    }
    thangType = _.find(this.options.thangTypes, function(m) {
      if (!(m.get('actions') || m.get('raster'))) {
        return false;
      }
      return m.get('name') === thang.spriteName;
    });
    if (thangType == null) {
      thangType = _.find(this.options.thangTypes, function(m) {
        return m.get('name') === thang.spriteName;
      });
    }
    if (!thangType) {
      return console.error("Couldn't find ThangType for", thang);
    }
    options = this.createLankOptions({
      thang: thang
    });
    options.resolutionFactor = thangType.get('kind') === 'Floor' ? 2 : SPRITE_RESOLUTION_FACTOR;
    if (this.options.playerNames && /Hero Placeholder/.test(thang.id)) {
      options.playerName = this.options.playerNames[thang.team];
    }
    lank = new Lank(thangType, options);
    this.listenTo(lank, 'sprite:mouse-up', this.onLankMouseUp);
    this.addLank(lank, null, layer);
    lank.setDebug(this.debug);
    return lank;
  };

  LankBoss.prototype.removeLank = function(lank) {
    var thang;
    lank.layer.removeLank(lank);
    thang = lank.thang;
    delete this.lanks[lank.thang.id];
    this.lankArray.splice(this.lankArray.indexOf(lank), 1);
    this.stopListening(lank);
    lank.destroy();
    return lank.thang = thang;
  };

  LankBoss.prototype.updateSounds = function() {
    var j, lank, len, ref, results;
    ref = this.lankArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      results.push(lank.playSounds());
    }
    return results;
  };

  LankBoss.prototype.update = function(frameChanged) {
    var j, lank, len, ref;
    if (frameChanged) {
      this.adjustLankExistence();
    }
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.update(frameChanged);
    }
    this.updateSelection();
    this.layerAdapters['Default'].updateLayerOrder();
    return this.cacheObstacles();
  };

  LankBoss.prototype.adjustLankExistence = function() {
    var isObstacle, item, itemsJustEquipped, j, k, lank, len, len1, missing, ref, ref1, ref2, thang, thangID, updatedObstacles;
    updatedObstacles = [];
    itemsJustEquipped = [];
    ref = this.world.thangs;
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (!(thang.exists && thang.pos)) {
        continue;
      }
      if (thang.equip) {
        itemsJustEquipped = itemsJustEquipped.concat(this.equipNewItems(thang));
      }
      if (lank = this.lanks[thang.id]) {
        lank.setThang(thang);
      } else {
        lank = this.addThangToLanks(thang);
        Backbone.Mediator.publish('surface:new-thang-added', {
          thang: thang,
          sprite: lank
        });
        if (lank.sprite.parent === this.layerAdapters['Obstacle']) {
          updatedObstacles.push(lank);
        }
        lank.playSounds();
      }
    }
    for (k = 0, len1 = itemsJustEquipped.length; k < len1; k++) {
      item = itemsJustEquipped[k];
      item.modifyStats();
    }
    ref1 = this.lanks;
    for (thangID in ref1) {
      lank = ref1[thangID];
      missing = !(lank.notOfThisWorld || ((ref2 = this.world.thangMap[thangID]) != null ? ref2.exists : void 0));
      isObstacle = lank.sprite.parent === this.layerAdapters['Obstacle'];
      if (isObstacle && (missing || lank.hasMoved)) {
        updatedObstacles.push(lank);
      }
      lank.hasMoved = false;
      if (missing) {
        this.removeLank(lank);
      }
    }
    if (updatedObstacles.length && this.cachedObstacles) {
      this.cacheObstacles(updatedObstacles);
    }
    if (this.willSelectThang && this.lanks[this.willSelectThang[0]]) {
      this.selectThang.apply(this, this.willSelectThang);
    }
    return this.updateScreenReader();
  };

  LankBoss.prototype.updateScreenReader = function() {
    var ascii, availableHeight, availableWidth, fullHeight, fullWidth, grid, lank, scale, thangs;
    if (me.get('name') !== 'zersiax') {
      return;
    }
    ascii = $('#ascii-surface');
    thangs = (function() {
      var j, len, ref, results;
      ref = this.lankArray;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        lank = ref[j];
        results.push(lank.thang);
      }
      return results;
    }).call(this);
    grid = new Grid(thangs, this.world.width, this.world.height, 0, 0, 0, true);
    utils.replaceText(ascii, grid.toString(true));
    ascii.css('transform', 'initial');
    fullWidth = ascii.innerWidth();
    fullHeight = ascii.innerHeight();
    availableWidth = ascii.parent().innerWidth();
    availableHeight = ascii.parent().innerHeight();
    scale = availableWidth / fullWidth;
    scale = Math.min(scale, availableHeight / fullHeight);
    return ascii.css('transform', "scale(" + scale + ")");
  };

  LankBoss.prototype.equipNewItems = function(thang) {
    var item, itemID, itemsJustEquipped, ref, slot;
    itemsJustEquipped = [];
    if (thang.equip && !thang.equipped) {
      thang.equip();
      itemsJustEquipped.push(thang);
    }
    if (thang.inventoryIDs) {
      ref = thang.inventoryIDs;
      for (slot in ref) {
        itemID = ref[slot];
        item = this.world.getThangByID(itemID);
        if (!item.equipped) {
          if (!item.equip) {
            console.log(thang.id, 'equipping', item, 'in', thang.slot, 'Surface-side, but it cannot equip?');
          }
          if (typeof item.equip === "function") {
            item.equip();
          }
          if (item.equip) {
            itemsJustEquipped.push(item);
          }
        }
      }
    }
    return itemsJustEquipped;
  };

  LankBoss.prototype.cacheObstacles = function(updatedObstacles) {
    var j, lank, lankArray, len, possiblyUpdatedWallLanks, s, wallGrid, wallLank, wallLanks, walls;
    if (updatedObstacles == null) {
      updatedObstacles = null;
    }
    if (this.cachedObstacles && !updatedObstacles) {
      return;
    }
    lankArray = this.lankArray;
    wallLanks = (function() {
      var j, len, ref, results;
      results = [];
      for (j = 0, len = lankArray.length; j < len; j++) {
        lank = lankArray[j];
        if (((ref = lank.thangType) != null ? ref.get('name').search(/(dungeon|indoor|ice|classroom|vr).wall/i) : void 0) !== -1) {
          results.push(lank);
        }
      }
      return results;
    })();
    if (_.any((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = wallLanks.length; j < len; j++) {
        s = wallLanks[j];
        results.push(s.stillLoading);
      }
      return results;
    })())) {
      return;
    }
    walls = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = wallLanks.length; j < len; j++) {
        lank = wallLanks[j];
        results.push(lank.thang);
      }
      return results;
    })();
    this.world.calculateBounds();
    wallGrid = new Grid(walls, this.world.width, this.world.height);
    if (updatedObstacles) {
      possiblyUpdatedWallLanks = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = wallLanks.length; j < len; j++) {
          lank = wallLanks[j];
          if (_.find(updatedObstacles, function(w2) {
            return lank === w2 || (Math.abs(lank.thang.pos.x - w2.thang.pos.x) + Math.abs(lank.thang.pos.y - w2.thang.pos.y)) <= 16;
          })) {
            results.push(lank);
          }
        }
        return results;
      })();
    } else {
      possiblyUpdatedWallLanks = wallLanks;
    }
    for (j = 0, len = possiblyUpdatedWallLanks.length; j < len; j++) {
      wallLank = possiblyUpdatedWallLanks[j];
      if (!wallLank.currentRootAction) {
        wallLank.queueAction('idle');
      }
      wallLank.lockAction(false);
      wallLank.updateActionDirection(wallGrid);
      wallLank.lockAction(true);
      wallLank.updateScale();
      wallLank.updatePosition();
    }
    return this.cachedObstacles = true;
  };

  LankBoss.prototype.lankFor = function(thangID) {
    return this.lanks[thangID];
  };

  LankBoss.prototype.onNewWorld = function(e) {
    this.world = this.options.world = e.world;
    if (e.finished && /kithgard-mastery/.test(window.location.href)) {
      return this.cachedObstacles = false;
    }
  };

  LankBoss.prototype.play = function() {
    var j, lank, len, ref, ref1, ref2;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.play();
    }
    if ((ref1 = this.selectionMark) != null) {
      ref1.play();
    }
    return (ref2 = this.targetMark) != null ? ref2.play() : void 0;
  };

  LankBoss.prototype.stop = function() {
    var j, lank, len, ref, ref1, ref2;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.stop();
    }
    if ((ref1 = this.selectionMark) != null) {
      ref1.stop();
    }
    return (ref2 = this.targetMark) != null ? ref2.stop() : void 0;
  };

  LankBoss.prototype.onSuppressSelectionSounds = function(e) {
    return this.suppressSelectionSounds = e.suppress;
  };

  LankBoss.prototype.onSetLockSelect = function(e) {
    return this.selectLocked = e.lock;
  };

  LankBoss.prototype.onLevelRestarted = function(e) {
    this.selectLocked = false;
    return this.selectLank(e, null);
  };

  LankBoss.prototype.onSelectSprite = function(e) {
    return this.selectThang(e.thangID, e.spellName);
  };

  LankBoss.prototype.onCameraDragged = function() {
    return this.dragged += 1;
  };

  LankBoss.prototype.onLankMouseUp = function(e) {
    var lank, ref, ref1;
    if (!this.handleEvents) {
      return;
    }
    if (key.shift) {
      return;
    }
    if (this.dragged > 3) {
      return this.dragged = 0;
    }
    this.dragged = 0;
    lank = ((ref = e.sprite) != null ? (ref1 = ref.thang) != null ? ref1.isSelectable : void 0 : void 0) ? e.sprite : null;
    if (this.flagCursorLank && (lank != null ? lank.thangType.get('name') : void 0) === 'Flag') {
      return;
    }
    return this.selectLank(e, lank);
  };

  LankBoss.prototype.onStageMouseDown = function(e) {
    if (!this.handleEvents) {
      return;
    }
    if (key.shift) {
      return;
    }
    if (e.onBackground) {
      return this.selectLank(e);
    }
  };

  LankBoss.prototype.onChangeSelected = function(gameUIState, selected) {
    var addedLanks, j, k, lank, layer, len, len1, mark, newLanks, oldLanks, removedLanks, results, s;
    oldLanks = (function() {
      var j, len, ref, results;
      ref = gameUIState.previousAttributes().selected || [];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        s = ref[j];
        results.push(s.sprite);
      }
      return results;
    })();
    newLanks = (function() {
      var j, len, ref, results;
      ref = selected || [];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        s = ref[j];
        results.push(s.sprite);
      }
      return results;
    })();
    addedLanks = _.difference(newLanks, oldLanks);
    removedLanks = _.difference(oldLanks, newLanks);
    for (j = 0, len = addedLanks.length; j < len; j++) {
      lank = addedLanks[j];
      layer = lank.sprite.parent !== this.layerAdapters.Default.container ? this.layerAdapters.Default : this.layerAdapters.Ground;
      mark = new Mark({
        name: 'selection',
        camera: this.camera,
        layer: layer,
        thangType: 'selection'
      });
      mark.toggle(true);
      mark.setLank(lank);
      mark.update();
      lank.marks.selection = mark;
    }
    results = [];
    for (k = 0, len1 = removedLanks.length; k < len1; k++) {
      lank = removedLanks[k];
      results.push(typeof lank.removeMark === "function" ? lank.removeMark('selection') : void 0);
    }
    return results;
  };

  LankBoss.prototype.selectThang = function(thangID, spellName, treemaThangSelected) {
    if (spellName == null) {
      spellName = null;
    }
    if (treemaThangSelected == null) {
      treemaThangSelected = null;
    }
    if (!this.lanks[thangID]) {
      return this.willSelectThang = [thangID, spellName];
    }
    return this.selectLank(null, this.lanks[thangID], spellName, treemaThangSelected);
  };

  LankBoss.prototype.selectLank = function(e, lank, spellName, treemaThangSelected) {
    var alive, instance, ref, ref1, ref2, ref3, worldPos;
    if (lank == null) {
      lank = null;
    }
    if (spellName == null) {
      spellName = null;
    }
    if (treemaThangSelected == null) {
      treemaThangSelected = null;
    }
    if (e && (this.disabled || this.selectLocked)) {
      return;
    }
    worldPos = lank != null ? (ref = lank.thang) != null ? ref.pos : void 0 : void 0;
    if (e != null ? e.originalEvent : void 0) {
      if (worldPos == null) {
        worldPos = this.camera.screenToWorld({
          x: e.originalEvent.rawX,
          y: e.originalEvent.rawY
        });
      }
    }
    if (this.handleEvents) {
      if ((!this.reallyStopMoving) && worldPos && (this.options.navigateToSelection || !lank || treemaThangSelected) && (e != null ? (ref1 = e.originalEvent) != null ? (ref2 = ref1.nativeEvent) != null ? ref2.which : void 0 : void 0 : void 0) !== 3) {
        this.camera.zoomTo((lank != null ? lank.sprite : void 0) || this.camera.worldToSurface(worldPos), this.camera.zoom, 1000, true);
      }
    }
    if (this.options.choosing) {
      lank = null;
    }
    if (lank !== this.selectedLank) {
      if ((ref3 = this.selectedLank) != null) {
        ref3.selected = false;
      }
      if (lank != null) {
        lank.selected = true;
      }
      this.selectedLank = lank;
    }
    alive = lank && !(lank.thang.health < 0);
    Backbone.Mediator.publish('surface:sprite-selected', {
      thang: lank ? lank.thang : null,
      sprite: lank,
      spellName: spellName != null ? spellName : e != null ? e.spellName : void 0,
      originalEvent: e,
      worldPos: worldPos
    });
    if (lank) {
      this.willSelectThang = null;
    }
    if (alive && !this.suppressSelectionSounds) {
      instance = lank.playSound('selected');
      if ((instance != null ? instance.playState : void 0) === 'playSucceeded') {
        Backbone.Mediator.publish('sprite:thang-began-talking', {
          thang: lank != null ? lank.thang : void 0
        });
        return instance.addEventListener('complete', function() {
          return Backbone.Mediator.publish('sprite:thang-finished-talking', {
            thang: lank != null ? lank.thang : void 0
          });
        });
      }
    }
  };

  LankBoss.prototype.onFlagColorSelected = function(e) {
    var flagLank, j, len, ref;
    if (this.flagCursorLank) {
      this.removeLank(this.flagCursorLank);
    }
    this.flagCursorLank = null;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      flagLank = ref[j];
      if (flagLank.thangType.get('name') === 'Flag') {
        flagLank.sprite.cursor = e.color ? 'crosshair' : 'pointer';
      }
    }
    if (!e.color) {
      return;
    }
    this.flagCursorLank = new FlagLank(this.thangTypeFor('Flag'), this.createLankOptions({
      thangID: 'Flag Cursor',
      color: e.color,
      team: me.team,
      isCursor: true,
      pos: e.pos
    }));
    return this.addLank(this.flagCursorLank, this.flagCursorLank.thang.id, this.layerAdapters['Floating']);
  };

  LankBoss.prototype.onFlagUpdated = function(e) {
    var pendingFlag;
    if (!e.active) {
      return;
    }
    pendingFlag = new FlagLank(this.thangTypeFor('Flag'), this.createLankOptions({
      thangID: 'Pending Flag ' + Math.random(),
      color: e.color,
      team: e.team,
      isCursor: false,
      pos: e.pos
    }));
    this.addLank(pendingFlag, pendingFlag.thang.id, this.layerAdapters['Floating']);
    return this.pendingFlags.push(pendingFlag);
  };

  LankBoss.prototype.onFlagAppeared = function(e) {
    var foundExactMatch, i, j, matched, matchedType, pending, pendingFlag, ref, ref1, ref2, t1, t2;
    t1 = e.sprite.thang;
    pending = ((ref = this.pendingFlags) != null ? ref : []).slice();
    foundExactMatch = false;
    for (i = j = ref1 = pending.length - 1; j >= 0; i = j += -1) {
      pendingFlag = pending[i];
      t2 = pendingFlag.thang;
      matchedType = t1.color === t2.color && t1.team === t2.team;
      matched = matchedType && (foundExactMatch || Math.abs(t1.pos.x - t2.pos.x) < 0.00001 && Math.abs(t1.pos.y - t2.pos.y) < 0.00001);
      if (matched) {
        foundExactMatch = true;
        this.pendingFlags.splice(i, 1);
        this.removeLank(pendingFlag);
      }
    }
    if ((ref2 = e.sprite.sprite) != null) {
      ref2.cursor = this.flagCursorLank ? 'crosshair' : 'pointer';
    }
    return null;
  };

  LankBoss.prototype.onRemoveSelectedFlag = function(e) {
    var flagLank;
    flagLank = _.find([this.selectedLank].concat(this.lankArray), function(lank) {
      return lank && lank.thangType.get('name') === 'Flag' && lank.thang.team === me.team && (lank.thang.color === e.color || !e.color) && !lank.notOfThisWorld;
    });
    if (!flagLank) {
      return;
    }
    return Backbone.Mediator.publish('surface:remove-flag', {
      color: flagLank.thang.color
    });
  };

  LankBoss.prototype.updateSelection = function() {
    var ref, ref1, thangID;
    if (((ref = this.selectedLank) != null ? ref.thang : void 0) && (!this.selectedLank.thang.exists || !this.world.getThangByID(this.selectedLank.thang.id))) {
      thangID = this.selectedLank.thang.id;
      this.selectedLank = null;
      if ((ref1 = this.selectionMark) != null) {
        ref1.toggle(false);
      }
      this.willSelectThang = [thangID, null];
    }
    this.updateTarget();
    if (!this.selectionMark) {
      return;
    }
    if (this.selectedLank && (this.selectedLank.destroyed || !this.selectedLank.thang)) {
      this.selectedLank = null;
    }
    if (this.selectedLank && this.selectedLank.sprite.parent !== this.layerAdapters.Default.container) {
      this.selectionMark.setLayer(this.layerAdapters.Default);
    } else if (this.selectedLank) {
      this.selectionMark.setLayer(this.layerAdapters.Ground);
    }
    this.selectionMark.toggle(this.selectedLank != null);
    this.selectionMark.setLank(this.selectedLank);
    return this.selectionMark.update();
  };

  LankBoss.prototype.updateTarget = function() {
    var ref, target, targetPos, thang;
    if (!this.targetMark) {
      return;
    }
    thang = (ref = this.selectedLank) != null ? ref.thang : void 0;
    target = thang != null ? thang.target : void 0;
    targetPos = thang != null ? thang.targetPos : void 0;
    if (targetPos != null ? typeof targetPos.isZero === "function" ? targetPos.isZero() : void 0 : void 0) {
      targetPos = null;
    }
    this.targetMark.setLank(target ? this.lanks[target.id] : null);
    this.targetMark.toggle(this.targetMark.lank || targetPos);
    return this.targetMark.update(targetPos ? this.camera.worldToSurface(targetPos) : null);
  };

  return LankBoss;

})(CocoClass);
});

;require.register("lib/surface/LayerAdapter", function(exports, require, module) {

/*
  * SpriteStage (WebGL Canvas)
  ** Land texture
  ** Ground-based selection/target marks, range radii
  ** Walls/obstacles
  ** Paths and target pieces (and ghosts?)
  ** Normal Thangs, bots, wizards (z-indexing based on World-determined sprite.thang.pos.z/y, mainly, instead of sprite-map-determined sprite.z, which we rename to... something)
  ** Above-thang marks (blood, highlight) and health bars

  * Stage (Regular Canvas)
  ** Camera border
  ** surfaceTextLayer (speech, names)
  ** screenLayer
  *** Letterbox
  **** Letterbox top and bottom
  *** FPS display, maybe grid axis labels, coordinate hover

  ** Grid lines--somewhere--we will figure it out, do not really need it at first
 */
var CocoClass, LayerAdapter, NEVER_RENDER_ANYTHING, SegmentedSprite, SingularSprite, SpriteBuilder, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('lib/sprites/SpriteBuilder');

CocoClass = require('core/CocoClass');

SegmentedSprite = require('./SegmentedSprite');

SingularSprite = require('./SingularSprite');

ThangType = require('models/ThangType');

NEVER_RENDER_ANYTHING = false;

module.exports = LayerAdapter = LayerAdapter = (function(superClass) {
  extend(LayerAdapter, superClass);

  LayerAdapter.TRANSFORM_SURFACE = 'surface';

  LayerAdapter.TRANSFORM_SURFACE_TEXT = 'surface_text';

  LayerAdapter.TRANSFORM_SCREEN = 'screen';

  LayerAdapter.prototype.actionRenderState = null;

  LayerAdapter.prototype.needToRerender = false;

  LayerAdapter.prototype.toRenderBundles = null;

  LayerAdapter.prototype.willRender = false;

  LayerAdapter.prototype.buildAutomatically = true;

  LayerAdapter.prototype.buildAsync = true;

  LayerAdapter.prototype.resolutionFactor = SPRITE_RESOLUTION_FACTOR;

  LayerAdapter.prototype.numThingsLoading = 0;

  LayerAdapter.prototype.lanks = null;

  LayerAdapter.prototype.spriteSheet = null;

  LayerAdapter.prototype.container = null;

  LayerAdapter.prototype.customGraphics = null;

  LayerAdapter.prototype.subscriptions = {
    'camera:zoom-updated': 'onZoomUpdated'
  };

  function LayerAdapter(options) {
    var ref, ref1, ref2;
    LayerAdapter.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.name = (ref = options.name) != null ? ref : 'Unnamed';
    this.defaultSpriteType = this.name === 'Default' ? 'segmented' : 'singular';
    this.customGraphics = {};
    this.layerPriority = (ref1 = options.layerPriority) != null ? ref1 : 0;
    this.transformStyle = (ref2 = options.transform) != null ? ref2 : LayerAdapter.TRANSFORM_SURFACE;
    this.camera = options.camera;
    this.updateLayerOrder = _.throttle(this.updateLayerOrder, 1000 / 30);
    this.webGL = !!options.webGL;
    if (this.webGL) {
      this.initializing = true;
      this.spriteSheet = this._renderNewSpriteSheet(false);
      this.container = new createjs.SpriteContainer(this.spriteSheet);
      this.actionRenderState = {};
      this.toRenderBundles = [];
      this.lanks = [];
      this.initializing = false;
    } else {
      this.container = new createjs.Container();
    }
  }

  LayerAdapter.prototype.toString = function() {
    return "<Layer " + this.layerPriority + ": " + this.name + ">";
  };

  LayerAdapter.prototype.updateLayerOrder = function() {
    if (this.destroyed) {
      return;
    }
    return this.container.sortChildren(this.layerOrderComparator);
  };

  LayerAdapter.prototype.layerOrderComparator = function(a, b) {
    var aLank, aPos, aThang, alp, az, bLank, bPos, bThang, blp, bz;
    alp = a.layerPriority || 0;
    blp = b.layerPriority || 0;
    if (alp !== blp) {
      return alp - blp;
    }
    az = a.z || 1000;
    bz = b.z || 1000;
    if (aLank = a.lank) {
      if (aThang = aLank.thang) {
        aPos = aThang.pos;
        if (aThang.health < 0 && aThang.pos.z <= aThang.depth / 2) {
          --az;
        }
      }
    }
    if (bLank = b.lank) {
      if (bThang = bLank.thang) {
        bPos = bThang.pos;
        if (bThang.health < 0 && bThang.pos.z <= bThang.depth / 2) {
          --bz;
        }
      }
    }
    if (az === bz) {
      if (!(aPos && bPos)) {
        return 0;
      }
      return (bPos.y - aPos.y) || (bPos.x - aPos.x);
    }
    return az - bz;
  };

  LayerAdapter.prototype.onZoomUpdated = function(e) {
    var change, child, j, len, ref, ref1, results;
    if (e.camera !== this.camera) {
      return;
    }
    if ((ref = this.transformStyle) === LayerAdapter.TRANSFORM_SURFACE || ref === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      change = this.container.scaleX / e.zoom;
      this.container.scaleX = this.container.scaleY = e.zoom;
      if (this.webGL) {
        this.container.scaleX *= this.camera.canvasScaleFactorX;
        this.container.scaleY *= this.camera.canvasScaleFactorY;
      }
      this.container.regX = e.surfaceViewport.x;
      this.container.regY = e.surfaceViewport.y;
      if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
        ref1 = this.container.children;
        results = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          child = ref1[j];
          if (child.skipScaling) {
            continue;
          }
          child.scaleX *= change;
          results.push(child.scaleY *= change);
        }
        return results;
      }
    }
  };

  LayerAdapter.prototype.addChild = function() {
    var child, children, j, len, ref, results;
    children = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    (ref = this.container).addChild.apply(ref, children);
    if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        if (child.skipScaling) {
          continue;
        }
        child.scaleX /= this.container.scaleX;
        results.push(child.scaleY /= this.container.scaleY);
      }
      return results;
    }
  };

  LayerAdapter.prototype.removeChild = function() {
    var child, children, j, len, ref, results;
    children = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    (ref = this.container).removeChild.apply(ref, children);
    if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.scaleX *= this.container.scaleX;
        results.push(child.scaleY *= this.container.scaleY);
      }
      return results;
    }
  };

  LayerAdapter.prototype.addLank = function(lank) {
    var prerenderedSpriteSheet;
    lank.options.resolutionFactor = this.resolutionFactor;
    lank.layer = this;
    this.listenTo(lank, 'action-needs-render', this.onActionNeedsRender);
    this.lanks.push(lank);
    if (!currentView.getQueryVariable('jitSpritesheets')) {
      lank.thangType.initPrerenderedSpriteSheets();
    }
    prerenderedSpriteSheet = lank.thangType.getPrerenderedSpriteSheet(lank.options.colorConfig, this.defaultSpriteType);
    if (prerenderedSpriteSheet != null) {
      prerenderedSpriteSheet.markToLoad();
    }
    this.loadThangType(lank.thangType);
    this.addDefaultActionsToRender(lank);
    this.setSpriteToLank(lank);
    this.updateLayerOrder();
    return lank.addHealthBar();
  };

  LayerAdapter.prototype.removeLank = function(lank) {
    this.stopListening(lank);
    lank.layer = null;
    this.container.removeChild(lank.sprite);
    return this.lanks = _.without(this.lanks, lank);
  };

  LayerAdapter.prototype.loadThangType = function(thangType) {
    var prerenderedSpriteSheet, startedLoading;
    if (!thangType.isFullyLoaded()) {
      thangType.setProjection(null);
      if (!thangType.loading) {
        thangType.fetch();
      }
      this.numThingsLoading++;
      return this.listenToOnce(thangType, 'sync', this.somethingLoaded);
    } else if (thangType.get('raster') && !thangType.loadedRaster) {
      thangType.loadRasterImage();
      this.listenToOnce(thangType, 'raster-image-loaded', this.somethingLoaded);
      return this.numThingsLoading++;
    } else if (prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheetToLoad()) {
      startedLoading = prerenderedSpriteSheet.loadImage();
      if (!startedLoading) {
        return;
      }
      this.listenToOnce(prerenderedSpriteSheet, 'image-loaded', function() {
        return this.somethingLoaded(thangType);
      });
      return this.numThingsLoading++;
    }
  };

  LayerAdapter.prototype.somethingLoaded = function(thangType) {
    var j, lank, len, ref;
    this.numThingsLoading--;
    this.loadThangType(thangType);
    ref = this.lanks;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      if (lank.thangType === thangType) {
        this.addDefaultActionsToRender(lank);
      }
    }
    return this.renderNewSpriteSheet();
  };

  LayerAdapter.prototype.onActionNeedsRender = function(lank, action) {
    return this.upsertActionToRender(lank.thangType, action.name, lank.options.colorConfig);
  };

  LayerAdapter.prototype.addDefaultActionsToRender = function(lank) {
    var action, j, len, needToRender, ref, results;
    needToRender = false;
    if (lank.thangType.get('raster')) {
      return this.upsertActionToRender(lank.thangType);
    } else {
      ref = _.values(lank.thangType.getActions());
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        action = ref[j];
        if (!_.any(ThangType.defaultActions, function(prefix) {
          return _.string.startsWith(action.name, prefix);
        })) {
          continue;
        }
        results.push(this.upsertActionToRender(lank.thangType, action.name, lank.options.colorConfig));
      }
      return results;
    }
  };

  LayerAdapter.prototype.upsertActionToRender = function(thangType, actionName, colorConfig) {
    var groupKey;
    groupKey = this.renderGroupingKey(thangType, actionName, colorConfig);
    if (this.actionRenderState[groupKey] !== void 0) {
      return false;
    }
    this.actionRenderState[groupKey] = 'need-to-render';
    this.toRenderBundles.push({
      thangType: thangType,
      actionName: actionName,
      colorConfig: colorConfig
    });
    if (this.willRender || !this.buildAutomatically) {
      return true;
    }
    this.willRender = _.defer((function(_this) {
      return function() {
        return _this.renderNewSpriteSheet();
      };
    })(this));
    return true;
  };

  LayerAdapter.prototype.addCustomGraphic = function(key, graphic, bounds) {
    if (this.customGraphics[key]) {
      return false;
    }
    this.customGraphics[key] = {
      graphic: graphic,
      bounds: (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(createjs.Rectangle, bounds, function(){})
    };
    if (this.willRender || !this.buildAutomatically) {
      return true;
    }
    return this._renderNewSpriteSheet(false);
  };

  LayerAdapter.prototype.renderNewSpriteSheet = function() {
    this.willRender = false;
    if (this.numThingsLoading) {
      return;
    }
    return this._renderNewSpriteSheet();
  };

  LayerAdapter.prototype._renderNewSpriteSheet = function(async) {
    var actionNames, args, builder, bundle, bundleGrouping, colorConfig, dimension, e, error, extantGraphics, frame, graphic, groups, j, key, len, placeholder, ref, ref1, ref2, sheet, thangType;
    if (this.asyncBuilder) {
      this.asyncBuilder.stopAsync();
    }
    this.asyncBuilder = null;
    if (async == null) {
      async = this.buildAsync;
    }
    builder = new createjs.SpriteSheetBuilder();
    groups = _.groupBy(this.toRenderBundles, (function(bundle) {
      return this.renderGroupingKey(bundle.thangType, '', bundle.colorConfig);
    }), this);
    placeholder = this.createPlaceholder();
    dimension = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
    placeholder.setBounds(0, 0, dimension, dimension);
    builder.addFrame(placeholder);
    extantGraphics = ((ref = this.spriteSheet) != null ? ref.resolutionFactor : void 0) === this.resolutionFactor ? this.spriteSheet.getAnimations() : [];
    ref1 = this.customGraphics;
    for (key in ref1) {
      graphic = ref1[key];
      if (indexOf.call(extantGraphics, key) >= 0) {
        graphic = new createjs.Sprite(this.spriteSheet);
        graphic.gotoAndStop(key);
        frame = builder.addFrame(graphic);
      } else {
        frame = builder.addFrame(graphic.graphic, graphic.bounds, this.resolutionFactor);
      }
      builder.addAnimation(key, [frame], false);
    }
    if (NEVER_RENDER_ANYTHING) {
      groups = {};
    }
    ref2 = _.values(groups);
    for (j = 0, len = ref2.length; j < len; j++) {
      bundleGrouping = ref2[j];
      thangType = bundleGrouping[0].thangType;
      colorConfig = bundleGrouping[0].colorConfig;
      actionNames = (function() {
        var k, len1, results;
        results = [];
        for (k = 0, len1 = bundleGrouping.length; k < len1; k++) {
          bundle = bundleGrouping[k];
          results.push(bundle.actionName);
        }
        return results;
      })();
      args = [thangType, colorConfig, actionNames, builder];
      if (thangType.get('raw') || thangType.get('prerenderedSpriteSheetData')) {
        if ((thangType.get('spriteType') || this.defaultSpriteType) === 'segmented') {
          this.renderSegmentedThangType.apply(this, args);
        } else {
          this.renderSingularThangType.apply(this, args);
        }
      } else {
        this.renderRasterThangType(thangType, builder);
      }
    }
    if (async) {
      try {
        builder.buildAsync();
      } catch (error) {
        e = error;
        this.resolutionFactor *= 0.9;
        return this._renderNewSpriteSheet(async);
      }
      builder.on('complete', this.onBuildSpriteSheetComplete, this, true, builder);
      return this.asyncBuilder = builder;
    } else {
      sheet = builder.build();
      this.onBuildSpriteSheetComplete({
        async: async
      }, builder);
      return sheet;
    }
  };

  LayerAdapter.prototype.onBuildSpriteSheetComplete = function(e, builder) {
    var image, index, j, k, l, lank, len, len1, len2, len3, m, oldLayer, parent, prop, ref, ref1, ref2, ref3, ref4, total;
    if (this.initializing || this.destroyed) {
      return;
    }
    this.asyncBuilder = null;
    if (builder.spriteSheet._images.length > 1) {
      total = 0;
      ref = builder.spriteSheet._images;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        image = ref[index];
        total += image.height / builder.maxHeight;
      }
      this.resolutionFactor /= Math.max(1.25, Math.sqrt(total));
      this._renderNewSpriteSheet(e.async);
      return;
    }
    this.spriteSheet = builder.spriteSheet;
    this.spriteSheet.resolutionFactor = this.resolutionFactor;
    oldLayer = this.container;
    this.container = new createjs.SpriteContainer(this.spriteSheet);
    ref1 = this.lanks;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      lank = ref1[k];
      if (lank.destroyed) {
        console.log('zombie sprite found on layer', this.name);
      }
      if (lank.destroyed) {
        continue;
      }
      this.setSpriteToLank(lank);
    }
    ref2 = ['scaleX', 'scaleY', 'regX', 'regY'];
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      prop = ref2[l];
      this.container[prop] = oldLayer[prop];
    }
    if (parent = oldLayer.parent) {
      index = parent.getChildIndex(oldLayer);
      parent.removeChildAt(index);
      parent.addChildAt(this.container, index);
    }
    if ((ref3 = this.camera) != null) {
      ref3.updateZoom(true);
    }
    this.updateLayerOrder();
    ref4 = this.lanks;
    for (m = 0, len3 = ref4.length; m < len3; m++) {
      lank = ref4[m];
      lank.options.resolutionFactor = this.resolutionFactor;
      lank.updateScale();
      lank.updateRotation();
    }
    return this.trigger('new-spritesheet');
  };

  LayerAdapter.prototype.resetSpriteSheet = function() {
    var j, lank, len, ref;
    ref = this.lanks.slice(0);
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      this.removeLank(lank);
    }
    this.toRenderBundles = [];
    this.actionRenderState = {};
    this.initializing = true;
    this.spriteSheet = this._renderNewSpriteSheet(false);
    return this.initializing = false;
  };

  LayerAdapter.prototype.createPlaceholder = function() {
    var bounds, color, g, ref, ref1, ref2, width;
    g = new createjs.Graphics();
    g.setStrokeStyle(5);
    color = {
      'Land': [0, 50, 0],
      'Ground': [230, 230, 230],
      'Obstacle': [20, 70, 20],
      'Path': [200, 100, 200],
      'Default': [64, 64, 64],
      'Floating': [100, 100, 200]
    }[this.name] || [0, 0, 0];
    g.beginStroke((ref = createjs.Graphics).getRGB.apply(ref, color));
    color.push(0.7);
    g.beginFill((ref1 = createjs.Graphics).getRGB.apply(ref1, color));
    width = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
    bounds = [0, 0, width, width];
    if ((ref2 = this.name) === 'Default' || ref2 === 'Ground' || ref2 === 'Floating' || ref2 === 'Path') {
      g.drawEllipse.apply(g, bounds);
    } else {
      g.drawRect.apply(g, bounds);
    }
    return new createjs.Shape(g);
  };

  LayerAdapter.prototype.renderSegmentedThangType = function(thangType, colorConfig, actionNames, spriteSheetBuilder) {
    var animations, container, containerGlobalName, containerKey, containersToRender, frame, j, len, prerenderedSpriteSheet, ref, renderedActions, results, scale, spriteBuilder;
    prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheet(colorConfig, 'segmented');
    if (prerenderedSpriteSheet && !prerenderedSpriteSheet.loadedImage) {
      return;
    } else if (prerenderedSpriteSheet) {
      animations = prerenderedSpriteSheet.spriteSheet._animations;
      renderedActions = _.zipObject(animations, _.times(animations.length, function() {
        return true;
      }));
    }
    containersToRender = thangType.getContainersForActions(actionNames);
    spriteBuilder = new SpriteBuilder(thangType, {
      colorConfig: colorConfig
    });
    results = [];
    for (j = 0, len = containersToRender.length; j < len; j++) {
      containerGlobalName = containersToRender[j];
      containerKey = this.renderGroupingKey(thangType, containerGlobalName, colorConfig);
      if (((ref = this.spriteSheet) != null ? ref.resolutionFactor : void 0) === this.resolutionFactor && indexOf.call(this.spriteSheet.getAnimations(), containerKey) >= 0) {
        container = new createjs.Sprite(this.spriteSheet);
        container.gotoAndStop(containerKey);
        frame = spriteSheetBuilder.addFrame(container);
      } else if (prerenderedSpriteSheet && renderedActions[containerGlobalName]) {
        container = new createjs.Sprite(prerenderedSpriteSheet.spriteSheet);
        container.gotoAndStop(containerGlobalName);
        scale = this.resolutionFactor / (prerenderedSpriteSheet.get('resolutionFactor') || 1);
        frame = spriteSheetBuilder.addFrame(container, null, scale);
      } else {
        container = spriteBuilder.buildContainerFromStore(containerGlobalName);
        frame = spriteSheetBuilder.addFrame(container, null, this.resolutionFactor * (thangType.get('scale') || 1));
      }
      results.push(spriteSheetBuilder.addAnimation(containerKey, [frame], false));
    }
    return results;
  };

  LayerAdapter.prototype.renderSingularThangType = function(thangType, colorConfig, actionNames, spriteSheetBuilder) {
    var a, action, actionKeys, actionObjects, actions, animationActions, animationGroups, animationName, container, containerActions, containerGroups, containerName, f, frame, frames, framesMap, framesNeeded, framesToRender, i, index, j, k, key, l, len, len1, len2, len3, len4, len5, len6, len7, len8, m, mc, n, name, next, o, p, prerenderedFrames, prerenderedFramesMap, prerenderedSpriteSheet, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, renderAll, res, results, scale, sprite, spriteBuilder;
    prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheet(colorConfig, 'singular');
    prerenderedFramesMap = {};
    if (prerenderedSpriteSheet) {
      if (!prerenderedSpriteSheet.loadedImage) {
        return;
      }
      scale = this.resolutionFactor / (prerenderedSpriteSheet.get('resolutionFactor') || 1);
      ref = prerenderedSpriteSheet.spriteSheet._frames;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        frame = ref[i];
        sprite = new createjs.Sprite(prerenderedSpriteSheet.spriteSheet);
        sprite.gotoAndStop(i);
        prerenderedFramesMap[i] = spriteSheetBuilder.addFrame(sprite, null, scale);
      }
    }
    actionObjects = _.values(thangType.getActions());
    animationActions = [];
    for (k = 0, len1 = actionObjects.length; k < len1; k++) {
      a = actionObjects[k];
      if (!a.animation) {
        continue;
      }
      if (ref1 = a.name, indexOf.call(actionNames, ref1) < 0) {
        continue;
      }
      animationActions.push(a);
    }
    spriteBuilder = new SpriteBuilder(thangType, {
      colorConfig: colorConfig
    });
    animationGroups = _.groupBy(animationActions, function(action) {
      return action.animation;
    });
    for (animationName in animationGroups) {
      actions = animationGroups[animationName];
      renderAll = _.any(actions, function(action) {
        return action.frames === void 0;
      });
      scale = actions[0].scale || thangType.get('scale') || 1;
      actionKeys = (function() {
        var l, len2, results;
        results = [];
        for (l = 0, len2 = actions.length; l < len2; l++) {
          action = actions[l];
          results.push(this.renderGroupingKey(thangType, action.name, colorConfig));
        }
        return results;
      }).call(this);
      if (((ref2 = this.spriteSheet) != null ? ref2.resolutionFactor : void 0) === this.resolutionFactor && _.all(actionKeys, (function(_this) {
        return function(key) {
          return indexOf.call(_this.spriteSheet.getAnimations(), key) >= 0;
        };
      })(this))) {
        framesNeeded = _.uniq(_.flatten((function() {
          var l, len2, results;
          results = [];
          for (l = 0, len2 = actionKeys.length; l < len2; l++) {
            key = actionKeys[l];
            results.push((this.spriteSheet.getAnimation(key)).frames);
          }
          return results;
        }).call(this)));
        framesMap = {};
        for (l = 0, len2 = framesNeeded.length; l < len2; l++) {
          frame = framesNeeded[l];
          sprite = new createjs.Sprite(this.spriteSheet);
          sprite.gotoAndStop(frame);
          framesMap[frame] = spriteSheetBuilder.addFrame(sprite);
        }
        for (index = m = 0, len3 = actionKeys.length; m < len3; index = ++m) {
          key = actionKeys[index];
          action = actions[index];
          frames = (function() {
            var len4, n, ref3, results;
            ref3 = this.spriteSheet.getAnimation(key).frames;
            results = [];
            for (n = 0, len4 = ref3.length; n < len4; n++) {
              f = ref3[n];
              results.push(framesMap[f]);
            }
            return results;
          }).call(this);
          next = thangType.nextForAction(action);
          spriteSheetBuilder.addAnimation(key, frames, next);
        }
        continue;
      }
      if (prerenderedSpriteSheet) {
        for (n = 0, len4 = actions.length; n < len4; n++) {
          action = actions[n];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          prerenderedFrames = (ref3 = prerenderedSpriteSheet.get('animations')) != null ? (ref4 = ref3[action.name]) != null ? ref4.frames : void 0 : void 0;
          if (!prerenderedFrames) {
            continue;
          }
          frames = (function() {
            var len5, o, results;
            results = [];
            for (o = 0, len5 = prerenderedFrames.length; o < len5; o++) {
              frame = prerenderedFrames[o];
              results.push(prerenderedFramesMap[frame]);
            }
            return results;
          })();
          next = thangType.nextForAction(action);
          spriteSheetBuilder.addAnimation(name, frames, next);
        }
        continue;
      }
      mc = spriteBuilder.buildMovieClip(animationName, null, null, null, {
        'temp': 0
      });
      if (renderAll) {
        res = spriteSheetBuilder.addMovieClip(mc, null, scale * this.resolutionFactor);
        frames = spriteSheetBuilder._animations['temp'].frames;
        framesMap = _.zipObject(_.range(frames.length), frames);
      } else {
        framesMap = {};
        framesToRender = _.uniq(_.flatten((function() {
          var len5, o, results;
          results = [];
          for (o = 0, len5 = actions.length; o < len5; o++) {
            a = actions[o];
            results.push(a.frames.split(','));
          }
          return results;
        })()));
        for (o = 0, len5 = framesToRender.length; o < len5; o++) {
          frame = framesToRender[o];
          frame = parseInt(frame);
          f = _.bind(mc.gotoAndStop, mc, frame);
          framesMap[frame] = spriteSheetBuilder.addFrame(mc, null, scale * this.resolutionFactor, f);
        }
      }
      for (p = 0, len6 = actions.length; p < len6; p++) {
        action = actions[p];
        name = this.renderGroupingKey(thangType, action.name, colorConfig);
        if (action.frames) {
          frames = (function() {
            var len7, q, ref5, results;
            ref5 = action.frames.split(',');
            results = [];
            for (q = 0, len7 = ref5.length; q < len7; q++) {
              frame = ref5[q];
              results.push(framesMap[parseInt(frame)]);
            }
            return results;
          })();
        } else {
          frames = _.sortBy(_.values(framesMap));
        }
        next = thangType.nextForAction(action);
        spriteSheetBuilder.addAnimation(name, frames, next);
      }
    }
    containerActions = [];
    for (q = 0, len7 = actionObjects.length; q < len7; q++) {
      a = actionObjects[q];
      if (!a.container) {
        continue;
      }
      if (ref5 = a.name, indexOf.call(actionNames, ref5) < 0) {
        continue;
      }
      containerActions.push(a);
    }
    containerGroups = _.groupBy(containerActions, function(action) {
      return action.container;
    });
    results = [];
    for (containerName in containerGroups) {
      actions = containerGroups[containerName];
      if (prerenderedSpriteSheet) {
        for (r = 0, len8 = actions.length; r < len8; r++) {
          action = actions[r];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          prerenderedFrames = (ref6 = prerenderedSpriteSheet.get('animations')) != null ? (ref7 = ref6[action.name]) != null ? ref7.frames : void 0 : void 0;
          if (!prerenderedFrames) {
            continue;
          }
          frame = prerenderedFramesMap[prerenderedFrames[0]];
          spriteSheetBuilder.addAnimation(name, [frame], false);
        }
        continue;
      }
      container = spriteBuilder.buildContainerFromStore(containerName);
      scale = actions[0].scale || thangType.get('scale') || 1;
      frame = spriteSheetBuilder.addFrame(container, null, scale * this.resolutionFactor);
      results.push((function() {
        var len9, results1, s;
        results1 = [];
        for (s = 0, len9 = actions.length; s < len9; s++) {
          action = actions[s];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          results1.push(spriteSheetBuilder.addAnimation(name, [frame], false));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  LayerAdapter.prototype.renderRasterThangType = function(thangType, spriteSheetBuilder) {
    var $img, bm, frame, scale;
    if (!thangType.rasterImage) {
      console.error("Cannot render the LayerAdapter SpriteSheet until the raster image for <" + (thangType.get('name')) + "> is loaded.");
    }
    $img = $(thangType.rasterImage[0]);
    $('body').append($img);
    bm = new createjs.Bitmap(thangType.rasterImage[0]);
    scale = thangType.get('scale') || 1;
    frame = spriteSheetBuilder.addFrame(bm, null, scale);
    spriteSheetBuilder.addAnimation(this.renderGroupingKey(thangType), [frame], false);
    return $img.remove();
  };

  LayerAdapter.prototype.setSpriteToLank = function(lank) {
    var SpriteClass, prefix, ref, ref1, ref2, reg, scale, sprite;
    if (!lank.thangType.isFullyLoaded()) {
      sprite = new createjs.Sprite(this.spriteSheet);
      sprite.gotoAndStop(0);
      sprite.placeholder = true;
      sprite.regX = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH / 2;
      sprite.regY = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
      sprite.baseScaleX = sprite.baseScaleY = sprite.scaleX = sprite.scaleY = 10 / (this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH);
    } else if (lank.thangType.get('raster')) {
      sprite = new createjs.Sprite(this.spriteSheet);
      scale = lank.thangType.get('scale') || 1;
      reg = lank.getOffset('registration');
      sprite.regX = -reg.x * scale;
      sprite.regY = -reg.y * scale;
      sprite.gotoAndStop(this.renderGroupingKey(lank.thangType));
      sprite.baseScaleX = sprite.baseScaleY = 1;
    } else {
      SpriteClass = (lank.thangType.get('spriteType') || this.defaultSpriteType) === 'segmented' ? SegmentedSprite : SingularSprite;
      prefix = this.renderGroupingKey(lank.thangType, null, lank.options.colorConfig) + '.';
      sprite = new SpriteClass(this.spriteSheet, lank.thangType, prefix, this.resolutionFactor);
    }
    sprite.lank = lank;
    sprite.camera = this.camera;
    sprite.layerPriority = (ref = (ref1 = lank.thang) != null ? ref1.layerPriority : void 0) != null ? ref : lank.thangType.get('layerPriority');
    sprite.name = ((ref2 = lank.thang) != null ? ref2.spriteName : void 0) || lank.thangType.get('name');
    lank.setSprite(sprite);
    lank.update(true);
    this.container.addChild(sprite);
    if (lank.thangType.get('matchWorldDimensions')) {
      return lank.updateScale(true);
    }
  };

  LayerAdapter.prototype.renderGroupingKey = function(thangType, grouping, colorConfig) {
    var colorKey, colorValue, key, ref;
    key = thangType.get('slug');
    ref = colorConfig != null ? colorConfig : {};
    for (colorKey in ref) {
      colorValue = ref[colorKey];
      key += "(" + colorKey + ":" + colorValue.hue + "," + colorValue.saturation + "," + colorValue.lightness + ")";
    }
    if (grouping) {
      key += '.' + grouping;
    }
    return key;
  };

  LayerAdapter.prototype.destroy = function() {
    var child, j, len, ref;
    ref = this.container.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (typeof child.destroy === "function") {
        child.destroy();
      }
    }
    if (this.asyncBuilder) {
      this.asyncBuilder.stopAsync();
    }
    return LayerAdapter.__super__.destroy.call(this);
  };

  return LayerAdapter;

})(CocoClass);
});

;require.register("lib/surface/Letterbox", function(exports, require, module) {
var Letterbox,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = Letterbox = (function(superClass) {
  extend(Letterbox, superClass);

  Letterbox.prototype.subscriptions = {
    'level:set-letterbox': 'onSetLetterbox'
  };

  function Letterbox(options) {
    var channel, func, ref;
    Letterbox.__super__.constructor.call(this);
    this.initialize();
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    if (!(this.canvasWidth && this.canvasHeight)) {
      console.error('Letterbox needs canvasWidth/Height.');
    }
    this.build();
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  Letterbox.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.matteHeight = 0.10 * this.canvasHeight;
    this.upperMatte = new createjs.Shape();
    this.upperMatte.graphics.beginFill('black').rect(0, 0, this.canvasWidth, this.matteHeight);
    this.lowerMatte = this.upperMatte.clone();
    this.upperMatte.x = this.lowerMatte.x = 0;
    this.upperMatte.y = -this.matteHeight;
    this.lowerMatte.y = this.canvasHeight;
    return this.addChild(this.upperMatte, this.lowerMatte);
  };

  Letterbox.prototype.onSetLetterbox = function(e) {
    var T, ease, interval, lowerY, upperY;
    T = createjs.Tween;
    T.removeTweens(this.upperMatte);
    T.removeTweens(this.lowerMatte);
    upperY = e.on ? 0 : -this.matteHeight;
    lowerY = e.on ? this.canvasHeight - this.matteHeight : this.canvasHeight;
    interval = 700;
    ease = createjs.Ease.cubicOut;
    T.get(this.upperMatte).to({
      y: upperY
    }, interval, ease);
    return T.get(this.lowerMatte).to({
      y: lowerY
    }, interval, ease);
  };

  Letterbox.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  return Letterbox;

})(createjs.Container);
});

;require.register("lib/surface/Mark", function(exports, require, module) {
var Camera, CocoClass, Mark, ThangType, markThangTypes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

Camera = require('./Camera');

ThangType = require('models/ThangType');

markThangTypes = {};

module.exports = Mark = (function(superClass) {
  extend(Mark, superClass);

  Mark.prototype.subscriptions = {};

  Mark.prototype.alpha = 1;

  function Mark(options) {
    Mark.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.name = options.name;
    this.lank = options.lank;
    this.camera = options.camera;
    this.layer = options.layer;
    this.thangType = options.thangType;
    this.listenTo(this.layer, 'new-spritesheet', this.onLayerMadeSpriteSheet);
    if (!this.name) {
      console.error(this.toString(), 'needs a name.');
    }
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  Mark.prototype.destroy = function() {
    var ref, ref1;
    if (this.sprite) {
      createjs.Tween.removeTweens(this.sprite);
    }
    if ((ref = this.sprite) != null) {
      if ((ref1 = ref.parent) != null) {
        ref1.removeChild(this.sprite);
      }
    }
    if (this.markLank) {
      this.layer.removeLank(this.markLank);
      this.markLank.destroy();
    }
    this.lank = null;
    return Mark.__super__.destroy.call(this);
  };

  Mark.prototype.toString = function() {
    var ref, ref1, ref2;
    return "<Mark " + this.name + ": Sprite " + ((ref = (ref1 = this.lank) != null ? (ref2 = ref1.thang) != null ? ref2.id : void 0 : void 0) != null ? ref : 'None') + ">";
  };

  Mark.prototype.onLayerMadeSpriteSheet = function() {
    if (!this.sprite) {
      return;
    }
    if (this.markLank) {
      return this.update();
    }
    this.layer.removeChild(this.sprite);
    this.sprite = null;
    this.build();
    this.layer.addChild(this.sprite);
    this.layer.updateLayerOrder();
    return this.update();
  };

  Mark.prototype.toggle = function(to) {
    to = !!to;
    if (to === this.on) {
      return this;
    }
    if (!this.sprite) {
      return this.toggleTo = to;
    }
    this.on = to;
    delete this.toggleTo;
    if (this.on) {
      if (this.markLank) {
        this.layer.addLank(this.markLank);
      } else {
        this.layer.addChild(this.sprite);
        this.layer.updateLayerOrder();
      }
    } else {
      if (this.markLank) {
        this.layer.removeLank(this.markLank);
      } else {
        this.layer.removeChild(this.sprite);
      }
      if (this.highlightTween) {
        this.highlightDelay = this.highlightTween = null;
        createjs.Tween.removeTweens(this.sprite);
        this.sprite.visible = true;
      }
    }
    return this;
  };

  Mark.prototype.setLayer = function(layer) {
    var wasOn;
    if (layer === this.layer) {
      return;
    }
    wasOn = this.on;
    this.toggle(false);
    this.layer = layer;
    if (wasOn) {
      return this.toggle(true);
    }
  };

  Mark.prototype.setLank = function(lank) {
    if (lank === this.lank) {
      return;
    }
    this.lank = lank;
    this.build();
    return this;
  };

  Mark.prototype.build = function() {
    var ref;
    if (!this.sprite) {
      if (this.name === 'bounds') {
        this.buildBounds();
      } else if (this.name === 'shadow') {
        this.buildShadow();
      } else if (this.name === 'debug') {
        this.buildDebug();
      } else if (this.name.match(/.+(Range|Distance|Radius)$/)) {
        this.buildRadius(this.name);
      } else if (this.thangType) {
        this.buildSprite();
      } else {
        console.error('Don\'t know how to build mark for', this.name);
      }
      if ((ref = this.sprite) != null) {
        ref.mouseEnabled = false;
      }
    }
    return this;
  };

  Mark.prototype.buildBounds = function() {
    var color, colors, h, i, letter, ref, ref1, shape, style, text, w;
    this.sprite = new createjs.Container();
    this.sprite.mouseChildren = false;
    style = this.lank.thang.drawsBoundsStyle;
    this.drawsBoundsIndex = this.lank.thang.drawsBoundsIndex;
    if (style === 'corner-text' && this.lank.thang.world.age === 0) {
      return;
    }
    colors = (function() {
      var j, results;
      results = [];
      for (i = j = 1; j < 4; i = ++j) {
        results.push(128 + Math.floor(('0.' + Math.sin(3 * this.drawsBoundsIndex + i).toString().substr(6)) * 128));
      }
      return results;
    }).call(this);
    color = "rgba(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ", 0.5)";
    ref = [this.lank.thang.width * Camera.PPM, this.lank.thang.height * Camera.PPM * this.camera.y2x], w = ref[0], h = ref[1];
    if (style === 'border-text' || style === 'corner-text') {
      this.drawsBoundsBorderShape = shape = new createjs.Shape();
      shape.graphics.setStrokeStyle(5);
      shape.graphics.beginStroke(color);
      if (style === 'border-text') {
        shape.graphics.beginFill(color.replace('0.5', '0.25'));
      } else {
        shape.graphics.beginFill(color);
      }
      if ((ref1 = this.lank.thang.shape) === 'ellipsoid' || ref1 === 'disc') {
        shape.drawEllipse(0, 0, w, h);
      } else {
        shape.graphics.drawRect(-w / 2, -h / 2, w, h);
      }
      shape.graphics.endStroke();
      shape.graphics.endFill();
      this.sprite.addChild(shape);
    }
    if (style === 'border-text') {
      text = new createjs.Text('' + this.drawsBoundsIndex, '20px Arial', color.replace('0.5', '1'));
      text.regX = text.getMeasuredWidth() / 2;
      text.regY = text.getMeasuredHeight() / 2;
      text.shadow = new createjs.Shadow('#000000', 1, 1, 0);
      this.sprite.addChild(text);
    } else if (style === 'corner-text') {
      if (this.lank.thang.world.age === 0) {
        return;
      }
      letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.drawsBoundsIndex % 26];
      text = new createjs.Text(letter, '14px Arial', '#333333');
      text.x = -w / 2 + 2;
      text.y = -h / 2 + 2;
      this.sprite.addChild(text);
    } else {
      console.warn(this.lank.thang.id, 'didn\'t know how to draw bounds style:', style);
    }
    if (w > 0 && h > 0 && style === 'border-text') {
      this.sprite.cache(-w / 2, -h / 2, w, h, 2);
    }
    this.lastWidth = this.lank.thang.width;
    return this.lastHeight = this.lank.thang.height;
  };

  Mark.prototype.buildShadow = function() {
    var SHADOW_SIZE, actualLongest, alpha, bounds, height, key, longest, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, shape, shapeName, width;
    shapeName = (ref = this.lank.thang.shape) === 'ellipsoid' || ref === 'disc' ? 'ellipse' : 'rect';
    key = shapeName + "-shadow";
    SHADOW_SIZE = 10;
    if (indexOf.call(this.layer.spriteSheet.getAnimations(), key) < 0) {
      shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(0,0,0)");
      bounds = [-SHADOW_SIZE / 2, -SHADOW_SIZE / 2, SHADOW_SIZE, SHADOW_SIZE];
      if (shapeName === 'ellipse') {
        (ref1 = shape.graphics).drawEllipse.apply(ref1, bounds);
      } else {
        (ref2 = shape.graphics).drawRect.apply(ref2, bounds);
      }
      shape.graphics.endFill();
      this.layer.addCustomGraphic(key, shape, bounds);
    }
    alpha = (ref3 = (ref4 = this.lank.thang) != null ? ref4.alpha : void 0) != null ? ref3 : 1;
    width = ((ref5 = (ref6 = this.lank.thang) != null ? ref6.width : void 0) != null ? ref5 : 0) + 0.5;
    height = ((ref7 = (ref8 = this.lank.thang) != null ? ref8.height : void 0) != null ? ref7 : 0) + 0.5;
    longest = Math.max(width, height);
    actualLongest = (ref9 = this.lank.thangType.get('shadow')) != null ? ref9 : longest;
    width = width * actualLongest / longest;
    height = height * actualLongest / longest;
    width *= Camera.PPM;
    height *= Camera.PPM * this.camera.y2x;
    this.sprite = new createjs.Sprite(this.layer.spriteSheet);
    this.sprite.gotoAndStop(key);
    this.sprite.mouseEnabled = false;
    this.sprite.alpha = alpha;
    this.baseScaleX = this.sprite.scaleX = width / (this.layer.resolutionFactor * SHADOW_SIZE);
    return this.baseScaleY = this.sprite.scaleY = height / (this.layer.resolutionFactor * SHADOW_SIZE);
  };

  Mark.prototype.buildRadius = function(range) {
    var alpha, colors, extraColors, fillColor, i, rangeNames, ref, strokeColor;
    alpha = 0.15;
    colors = {
      voiceRange: "rgba(0,145,0," + alpha + ")",
      visualRange: "rgba(0,0,145," + alpha + ")",
      attackRange: "rgba(145,0,0," + alpha + ")"
    };
    extraColors = ["rgba(145,0,145," + alpha + ")", "rgba(0,145,145," + alpha + ")", "rgba(145,105,0," + alpha + ")", "rgba(225,125,0," + alpha + ")"];
    rangeNames = this.lank.ranges.map(function(range, index) {
      return range['name'];
    });
    i = rangeNames.indexOf(range);
    this.sprite = new createjs.Shape();
    fillColor = (ref = colors[range]) != null ? ref : extraColors[i];
    this.sprite.graphics.beginFill(fillColor);
    this.sprite.graphics.drawCircle(0, 0, this.lank.thang[range] * Camera.PPM);
    if (i + 1 < this.lank.ranges.length) {
      this.sprite.graphics.arc(0, 0, this.lank.ranges[i + 1]['radius'], Math.PI * 2, 0, true);
    }
    this.sprite.graphics.endFill();
    strokeColor = fillColor.replace('' + alpha, '0.75');
    this.sprite.graphics.setStrokeStyle(2);
    this.sprite.graphics.beginStroke(strokeColor);
    this.sprite.graphics.arc(0, 0, this.lank.thang[range] * Camera.PPM, Math.PI * 2, 0, true);
    this.sprite.graphics.endStroke();
    return this.sprite.scaleY *= this.camera.y2x;
  };

  Mark.prototype.buildDebug = function() {
    var DEBUG_SIZE, PX, bounds, debugColor, h, key, ref, ref1, ref2, shape, shapeName, w;
    shapeName = (ref = this.lank.thang.shape) === 'ellipsoid' || ref === 'disc' ? 'ellipse' : 'rect';
    key = shapeName + "-debug-" + this.lank.thang.collisionCategory;
    DEBUG_SIZE = 10;
    if (indexOf.call(this.layer.spriteSheet.getAnimations(), key) < 0) {
      shape = new createjs.Shape();
      debugColor = {
        none: 'rgba(224,255,239,0.25)',
        ground: 'rgba(239,171,205,0.5)',
        air: 'rgba(131,205,255,0.5)',
        ground_and_air: 'rgba(2391,140,239,0.5)',
        obstacles: 'rgba(88,88,88,0.5)',
        dead: 'rgba(89,171,100,0.25)'
      }[this.lank.thang.collisionCategory] || 'rgba(171,205,239,0.5)';
      shape.graphics.beginFill(debugColor);
      bounds = [-DEBUG_SIZE / 2, -DEBUG_SIZE / 2, DEBUG_SIZE, DEBUG_SIZE];
      if (shapeName === 'ellipse') {
        (ref1 = shape.graphics).drawEllipse.apply(ref1, bounds);
      } else {
        (ref2 = shape.graphics).drawRect.apply(ref2, bounds);
      }
      shape.graphics.endFill();
      this.layer.addCustomGraphic(key, shape, bounds);
    }
    this.sprite = new createjs.Sprite(this.layer.spriteSheet);
    this.sprite.gotoAndStop(key);
    PX = 3;
    w = Math.max(PX, this.lank.thang.width * Camera.PPM) * (this.camera.y2x + (1 - this.camera.y2x) * Math.abs(Math.cos(this.lank.thang.rotation)));
    h = Math.max(PX, this.lank.thang.height * Camera.PPM) * (this.camera.y2x + (1 - this.camera.y2x) * Math.abs(Math.sin(this.lank.thang.rotation)));
    this.sprite.scaleX = w / (this.layer.resolutionFactor * DEBUG_SIZE);
    this.sprite.scaleY = h / (this.layer.resolutionFactor * DEBUG_SIZE);
    return this.sprite.rotation = -this.lank.thang.rotation * 180 / Math.PI;
  };

  Mark.prototype.buildSprite = function() {
    var Lank, markLank, thangType;
    if (_.isString(this.thangType)) {
      thangType = markThangTypes[this.thangType];
      if (!thangType) {
        return this.loadThangType();
      }
      this.thangType = thangType;
    }
    if (!this.thangType.loaded) {
      return this.listenToOnce(this.thangType, 'sync', this.onLoadedThangType);
    }
    Lank = require('./Lank');
    markLank = new Lank(this.thangType);
    markLank.queueAction('idle');
    this.sprite = markLank.sprite;
    this.markLank = markLank;
    return this.listenTo(this.markLank, 'new-sprite', function(sprite) {
      this.sprite = sprite;
    });
  };

  Mark.prototype.loadThangType = function() {
    var name;
    name = this.thangType;
    this.thangType = new ThangType();
    this.thangType.url = function() {
      return "/db/thang.type/" + name;
    };
    this.listenToOnce(this.thangType, 'sync', this.onLoadedThangType);
    this.thangType.fetch();
    return markThangTypes[name] = this.thangType;
  };

  Mark.prototype.onLoadedThangType = function() {
    this.build();
    if (this.markLank) {
      this.update();
    }
    if (this.toggleTo != null) {
      this.toggle(this.toggleTo);
    }
    return Backbone.Mediator.publish('sprite:loaded', {
      sprite: this
    });
  };

  Mark.prototype.update = function(pos) {
    var ref;
    if (pos == null) {
      pos = null;
    }
    if (!(this.on && this.sprite)) {
      return false;
    }
    if ((this.lank != null) && !this.lank.thangType.isFullyLoaded()) {
      return false;
    }
    this.sprite.visible = !this.hidden;
    this.updatePosition(pos);
    this.updateRotation();
    this.updateScale();
    if (this.name === 'highlight' && this.highlightDelay && !this.highlightTween) {
      this.sprite.visible = false;
      this.highlightTween = createjs.Tween.get(this.sprite).to({}, this.highlightDelay).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          _this.sprite.visible = true;
          return _this.highlightDelay = _this.highlightTween = null;
        };
      })(this));
    }
    if ((ref = this.name) === 'shadow' || ref === 'bounds') {
      this.updateAlpha(this.alpha);
    }
    return true;
  };

  Mark.prototype.updatePosition = function(pos) {
    var offset, ref, ref1, ref2;
    if (((ref = this.lank) != null ? ref.thang : void 0) && ((ref1 = this.name) === 'shadow' || ref1 === 'debug' || ref1 === 'target' || ref1 === 'selection' || ref1 === 'repair')) {
      pos = this.camera.worldToSurface({
        x: this.lank.thang.pos.x,
        y: this.lank.thang.pos.y
      });
    } else {
      if (pos == null) {
        pos = (ref2 = this.lank) != null ? ref2.sprite : void 0;
      }
    }
    if (!pos) {
      return;
    }
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    if (this.statusEffect || this.name === 'highlight') {
      offset = this.lank.getOffset('aboveHead');
      this.sprite.x += offset.x;
      this.sprite.y += offset.y;
      if (this.statusEffect) {
        return this.sprite.y -= 3;
      }
    }
  };

  Mark.prototype.updateAlpha = function(alpha1) {
    var ref, worldZ;
    this.alpha = alpha1;
    if (!this.sprite || this.name === 'debug') {
      return;
    }
    if (this.name === 'shadow') {
      worldZ = this.lank.thang.pos.z - this.lank.thang.depth / 2 + this.lank.getBobOffset();
      return this.sprite.alpha = this.alpha * 0.451 / Math.sqrt(worldZ / 2 + 1);
    } else if (this.name === 'bounds') {
      return (ref = this.drawsBoundsBorderShape) != null ? ref.alpha = Math.floor(this.lank.thang.alpha) : void 0;
    } else {
      return this.sprite.alpha = this.alpha;
    }
  };

  Mark.prototype.updateRotation = function() {
    var ref, ref1;
    if (this.name === 'debug' || (this.name === 'shadow' && ((ref = (ref1 = this.lank.thang) != null ? ref1.shape : void 0) === 'rectangle' || ref === 'box'))) {
      return this.sprite.rotation = -this.lank.thang.rotation * 180 / Math.PI;
    }
  };

  Mark.prototype.updateScale = function() {
    var factor, oldMark, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, thang, width;
    if (this.name === 'bounds' && ((this.lank.thang.width !== this.lastWidth || this.lank.thang.height !== this.lastHeight) || (this.lank.thang.drawsBoundsIndex !== this.drawsBoundsIndex))) {
      oldMark = this.sprite;
      this.buildBounds();
      oldMark.parent.addChild(this.sprite);
      oldMark.parent.swapChildren(oldMark, this.sprite);
      oldMark.parent.removeChild(oldMark);
    }
    if (this.markLank != null) {
      this.markLank.scaleFactor = 1.2;
      this.markLank.updateScale();
    }
    if (this.name === 'shadow' && (thang = this.lank.thang)) {
      this.sprite.scaleX = this.baseScaleX * ((ref = (ref1 = thang.scaleFactor) != null ? ref1 : thang.scaleFactorX) != null ? ref : 1);
      this.sprite.scaleY = this.baseScaleY * ((ref2 = (ref3 = thang.scaleFactor) != null ? ref3 : thang.scaleFactorY) != null ? ref2 : 1);
    }
    if ((ref4 = this.name) !== 'selection' && ref4 !== 'target' && ref4 !== 'repair' && ref4 !== 'highlight') {
      return;
    }
    factor = 0.3;
    if ((ref5 = this.lank) != null ? ref5.sprite : void 0) {
      width = ((ref6 = this.lank.sprite.getBounds()) != null ? ref6.width : void 0) || 0;
      width /= this.lank.options.resolutionFactor;
      factor = width / 100;
      factor *= 1.1;
      factor = Math.max(factor, 0.3);
    }
    this.sprite.scaleX *= factor;
    this.sprite.scaleY *= factor;
    if ((ref7 = this.name) === 'selection' || ref7 === 'target' || ref7 === 'repair') {
      return this.sprite.scaleY *= this.camera.y2x;
    }
  };

  Mark.prototype.stop = function() {
    var ref;
    return (ref = this.markLank) != null ? ref.stop() : void 0;
  };

  Mark.prototype.play = function() {
    var ref;
    return (ref = this.markLank) != null ? ref.play() : void 0;
  };

  Mark.prototype.hide = function() {
    return this.hidden = true;
  };

  Mark.prototype.show = function() {
    return this.hidden = false;
  };

  return Mark;

})(CocoClass);
});

;require.register("lib/surface/MusicPlayer", function(exports, require, module) {
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

;require.register("lib/surface/PlaybackOverScreen", function(exports, require, module) {
var CocoClass, PlaybackOverScreen,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

module.exports = PlaybackOverScreen = (function(superClass) {
  extend(PlaybackOverScreen, superClass);

  PlaybackOverScreen.prototype.subscriptions = {
    'goal-manager:new-goal-states': 'onNewGoalStates'
  };

  function PlaybackOverScreen(options) {
    PlaybackOverScreen.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.playerNames = options.playerNames;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  PlaybackOverScreen.prototype.toString = function() {
    return '<PlaybackOverScreen>';
  };

  PlaybackOverScreen.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimLayer.alpha = 0;
    return this.layer.addChild(this.dimLayer);
  };

  PlaybackOverScreen.prototype.makeVictoryText = function() {
    var s, size, text;
    s = '';
    size = Math.ceil(this.camera.canvasHeight / 6);
    text = new createjs.Text(s, size + "px Open Sans Condensed", '#F7B42C');
    text.shadow = new createjs.Shadow('#000', Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 120));
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = 0.5 * this.camera.canvasWidth;
    text.y = 0.8 * this.camera.canvasHeight;
    this.dimLayer.addChild(text);
    return this.text = text;
  };

  PlaybackOverScreen.prototype.show = function() {
    if (this.showing) {
      return;
    }
    this.showing = true;
    if (!this.color) {
      this.updateColor('rgba(212, 212, 212, 0.4)');
    }
    this.dimLayer.alpha = 0;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 1
    }, 500);
  };

  PlaybackOverScreen.prototype.hide = function() {
    if (!this.showing) {
      return;
    }
    this.showing = false;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 0
    }, 500);
  };

  PlaybackOverScreen.prototype.onNewGoalStates = function(e) {
    var color, failure, incomplete, success, timedOut;
    success = e.overallStatus === 'success';
    failure = e.overallStatus === 'failure';
    timedOut = e.timedOut;
    incomplete = !success && !failure && !timedOut;
    color = failure ? 'rgba(255, 128, 128, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    this.updateColor(color);
    return this.updateText(e);
  };

  PlaybackOverScreen.prototype.updateColor = function(color) {
    if (color === this.color) {
      return;
    }
    this.dimScreen.graphics.clear().beginFill(color).rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    if (this.color) {
      this.dimLayer.updateCache();
    } else {
      this.dimLayer.cache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    }
    return this.color = color;
  };

  PlaybackOverScreen.prototype.updateText = function(goalEvent) {
    var g, goal, goals, i, len, overallStatus, ref, ref1, ref2, statuses, team, teamGoals, teamOverallStatuses;
    if (!_.size(this.playerNames)) {
      return;
    }
    teamOverallStatuses = {};
    goals = goalEvent.goalStates ? _.values(goalEvent.goalStates) : [];
    goals = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = goals.length; i < len; i++) {
        g = goals[i];
        if (!g.optional) {
          results.push(g);
        }
      }
      return results;
    })();
    ref = ['humans', 'ogres'];
    for (i = 0, len = ref.length; i < len; i++) {
      team = ref[i];
      teamGoals = (function() {
        var j, len1, ref1, results;
        results = [];
        for (j = 0, len1 = goals.length; j < len1; j++) {
          g = goals[j];
          if ((ref1 = g.team) === (void 0) || ref1 === team) {
            results.push(g);
          }
        }
        return results;
      })();
      statuses = (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = teamGoals.length; j < len1; j++) {
          goal = teamGoals[j];
          results.push(goal.status);
        }
        return results;
      })();
      if (statuses.length > 0 && _.every(statuses, function(s) {
        return s === 'success';
      })) {
        overallStatus = 'success';
      }
      if (statuses.length > 0 && indexOf.call(statuses, 'failure') >= 0) {
        overallStatus = 'failure';
      }
      teamOverallStatuses[team] = overallStatus;
    }
    if (!this.text) {
      this.makeVictoryText();
    }
    if (teamOverallStatuses.humans === 'success') {
      this.text.color = '#E62B1E';
      this.text.text = (((ref1 = this.playerNames.humans) != null ? ref1 : $.i18n.t('ladder.red_ai')) + ' ' + $.i18n.t('ladder.wins')).toLocaleUpperCase();
    } else if (teamOverallStatuses.ogres === 'success') {
      this.text.color = '#0597FF';
      this.text.text = (((ref2 = this.playerNames.ogres) != null ? ref2 : $.i18n.t('ladder.blue_ai')) + ' ' + $.i18n.t('ladder.wins')).toLocaleUpperCase();
    } else {
      this.text.color = '#F7B42C';
      if (goalEvent.timedOut) {
        this.text.text = 'TIMED OUT';
      } else {
        this.text.text = 'INCOMPLETE';
      }
    }
    return this.dimLayer.updateCache();
  };

  return PlaybackOverScreen;

})(CocoClass);
});

;require.register("lib/surface/PointChooser", function(exports, require, module) {
var CocoClass, PointChooser,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = PointChooser = (function(superClass) {
  extend(PointChooser, superClass);

  function PointChooser(options) {
    this.options = options;
    this.onMouseDown = bind(this.onMouseDown, this);
    PointChooser.__super__.constructor.call(this);
    this.buildShape();
    this.options.stage.addEventListener('stagemousedown', this.onMouseDown);
    this.options.camera.dragDisabled = true;
  }

  PointChooser.prototype.destroy = function() {
    this.options.stage.removeEventListener('stagemousedown', this.onMouseDown);
    return PointChooser.__super__.destroy.call(this);
  };

  PointChooser.prototype.setPoint = function(point) {
    this.point = point;
    return this.updateShape();
  };

  PointChooser.prototype.buildShape = function() {
    this.shape = new createjs.Shape();
    this.shape.alpha = 0.9;
    this.shape.mouseEnabled = false;
    this.shape.graphics.setStrokeStyle(1, 'round').beginStroke('#000000').beginFill('#fedcba');
    return this.shape.graphics.drawCircle(0, 0, 4).endFill();
  };

  PointChooser.prototype.onMouseDown = function(e) {
    if (!key.shift) {
      return;
    }
    this.setPoint(this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    }));
    return Backbone.Mediator.publish('surface:choose-point', {
      point: this.point
    });
  };

  PointChooser.prototype.updateShape = function() {
    var sup;
    sup = this.options.camera.worldToSurface(this.point);
    if (!this.shape.parent) {
      this.options.surfaceLayer.addChild(this.shape);
    }
    this.shape.x = sup.x;
    return this.shape.y = sup.y;
  };

  return PointChooser;

})(CocoClass);
});

;require.register("lib/surface/RegionChooser", function(exports, require, module) {
var Camera, CocoClass, RegionChooser,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

Camera = require('./Camera');

module.exports = RegionChooser = (function(superClass) {
  extend(RegionChooser, superClass);

  function RegionChooser(options) {
    this.options = options;
    this.onMouseUp = bind(this.onMouseUp, this);
    this.onMouseMove = bind(this.onMouseMove, this);
    this.onMouseDown = bind(this.onMouseDown, this);
    RegionChooser.__super__.constructor.call(this);
    this.options.stage.addEventListener('stagemousedown', this.onMouseDown);
    this.options.stage.addEventListener('stagemousemove', this.onMouseMove);
    this.options.stage.addEventListener('stagemouseup', this.onMouseUp);
  }

  RegionChooser.prototype.destroy = function() {
    this.options.stage.removeEventListener('stagemousedown', this.onMouseDown);
    this.options.stage.removeEventListener('stagemousemove', this.onMouseMove);
    this.options.stage.removeEventListener('stagemouseup', this.onMouseUp);
    return RegionChooser.__super__.destroy.call(this);
  };

  RegionChooser.prototype.onMouseDown = function(e) {
    if (!key.shift) {
      return;
    }
    this.firstPoint = this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    });
    return this.options.camera.dragDisabled = true;
  };

  RegionChooser.prototype.onMouseMove = function(e) {
    if (!this.firstPoint) {
      return;
    }
    this.secondPoint = this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    });
    if (this.options.restrictRatio || key.alt) {
      this.restrictRegion();
    }
    return this.updateShape();
  };

  RegionChooser.prototype.onMouseUp = function(e) {
    if (!this.firstPoint) {
      return;
    }
    Backbone.Mediator.publish('surface:choose-region', {
      points: [this.firstPoint, this.secondPoint]
    });
    this.firstPoint = null;
    this.secondPoint = null;
    return this.options.camera.dragDisabled = false;
  };

  RegionChooser.prototype.restrictRegion = function() {
    var RATIO, currentRatio, rect, targetSurfaceHeight, targetSurfaceWidth, targetWorldHeight, targetWorldWidth;
    RATIO = 1.56876;
    rect = this.options.camera.normalizeBounds([this.firstPoint, this.secondPoint]);
    currentRatio = rect.width / rect.height;
    if (currentRatio > RATIO) {
      targetSurfaceHeight = rect.width / RATIO;
      targetWorldHeight = targetSurfaceHeight * Camera.MPP * this.options.camera.x2y;
      if (this.secondPoint.y < this.firstPoint.y) {
        targetWorldHeight *= -1;
      }
      return this.secondPoint.y = this.firstPoint.y + targetWorldHeight;
    } else {
      targetSurfaceWidth = rect.height * RATIO;
      targetWorldWidth = targetSurfaceWidth * Camera.MPP;
      if (this.secondPoint.x < this.firstPoint.x) {
        targetWorldWidth *= -1;
      }
      return this.secondPoint.x = this.firstPoint.x + targetWorldWidth;
    }
  };

  RegionChooser.prototype.setRegion = function(worldPoints) {
    this.firstPoint = worldPoints[0];
    this.secondPoint = worldPoints[1];
    this.updateShape();
    this.firstPoint = null;
    return this.secondPoint = null;
  };

  RegionChooser.prototype.updateShape = function() {
    var rect;
    rect = this.options.camera.normalizeBounds([this.firstPoint, this.secondPoint]);
    if (this.shape) {
      this.options.surfaceLayer.removeChild(this.shape);
    }
    this.shape = new createjs.Shape();
    this.shape.alpha = 0.5;
    this.shape.mouseEnabled = false;
    this.shape.graphics.beginFill('#fedcba').drawRect(rect.x, rect.y, rect.width, rect.height);
    this.shape.graphics.endFill();
    this.shape.skipScaling = true;
    return this.options.surfaceLayer.addChild(this.shape);
  };

  return RegionChooser;

})(CocoClass);
});

;require.register("lib/surface/SegmentedSprite", function(exports, require, module) {
var SegmentedSprite, SpriteBuilder, specialGoToAndStop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

SpriteBuilder = require('lib/sprites/SpriteBuilder');

specialGoToAndStop = function(frame) {
  if (frame === this.currentFrame && this.childrenCopy) {
    return this.addChild.apply(this, this.childrenCopy);
  } else {
    this.gotoAndStop(frame);
    return this.childrenCopy = this.children.slice(0);
  }
};

module.exports = SegmentedSprite = (function(superClass) {
  extend(SegmentedSprite, superClass);

  SegmentedSprite.prototype.childMovieClips = null;

  function SegmentedSprite(spriteSheet, thangType, spriteSheetPrefix, resolutionFactor) {
    var base;
    this.spriteSheet = spriteSheet;
    this.thangType = thangType;
    this.spriteSheetPrefix = spriteSheetPrefix;
    this.resolutionFactor = resolutionFactor != null ? resolutionFactor : SPRITE_RESOLUTION_FACTOR;
    this.handleTick = bind(this.handleTick, this);
    if ((base = this.spriteSheet).mcPool == null) {
      base.mcPool = {};
    }
    SegmentedSprite.__super__.constructor.call(this, this.spriteSheet);
    this.addEventListener('tick', this.handleTick);
  }

  SegmentedSprite.prototype.destroy = function() {
    this.handleTick = void 0;
    if (this.baseMovieClip) {
      this.baseMovieClip.inUse = false;
    }
    return this.removeAllEventListeners();
  };

  SegmentedSprite.prototype.play = function() {
    if (!(this.baseMovieClip && this.animLength > 1)) {
      return this.paused = false;
    }
  };

  SegmentedSprite.prototype.stop = function() {
    return this.paused = true;
  };

  SegmentedSprite.prototype.gotoAndPlay = function(actionName) {
    return this.goto(actionName, false);
  };

  SegmentedSprite.prototype.gotoAndStop = function(actionName) {
    return this.goto(actionName, true);
  };

  SegmentedSprite.prototype.goto = function(actionName, paused) {
    var action, actionScale, bounds, containerName, f, j, k, len, len1, mc, movieClip, randomStart, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reg, scale, sprite;
    this.paused = paused != null ? paused : true;
    this.removeAllChildren();
    this.currentAnimation = actionName;
    if (this.baseMovieClip) {
      this.baseMovieClip.inUse = false;
    }
    if (this.childMovieClips) {
      ref = this.childMovieClips;
      for (j = 0, len = ref.length; j < len; j++) {
        mc = ref[j];
        mc.inUse = false;
      }
    }
    this.childMovieClips = this.baseMovieClip = this.framerate = this.animLength = null;
    this.actionNotSupported = false;
    action = this.thangType.getActions()[actionName];
    randomStart = _.string.startsWith(actionName, 'move');
    reg = ((ref1 = action.positions) != null ? ref1.registration : void 0) || ((ref2 = this.thangType.get('positions')) != null ? ref2.registration : void 0) || {
      x: 0,
      y: 0
    };
    if (action.animation) {
      this.regX = -reg.x;
      this.regY = -reg.y;
      this.framerate = ((ref3 = action.framerate) != null ? ref3 : 20) * ((ref4 = action.speed) != null ? ref4 : 1);
      this.childMovieClips = [];
      this.baseMovieClip = this.buildMovieClip(action.animation);
      this.baseMovieClip.inUse = true;
      this.frames = action.frames;
      if (this.frames) {
        this.frames = (function() {
          var k, len1, ref5, results;
          ref5 = this.frames.split(',');
          results = [];
          for (k = 0, len1 = ref5.length; k < len1; k++) {
            f = ref5[k];
            results.push(parseInt(f));
          }
          return results;
        }).call(this);
      }
      this.animLength = this.frames ? this.frames.length : this.baseMovieClip.timeline.duration;
      if (this.animLength === 1) {
        this.paused = true;
      }
      if (this.frames) {
        if (randomStart) {
          this.currentFrame = this.frames[_.random(this.frames.length - 1)];
        } else {
          this.currentFrame = this.frames[0];
        }
      } else {
        if (randomStart) {
          this.currentFrame = Math.floor(Math.random() * this.animLength);
        } else {
          this.currentFrame = 0;
        }
      }
      this.baseMovieClip.specialGoToAndStop(this.currentFrame);
      ref5 = this.childMovieClips;
      for (k = 0, len1 = ref5.length; k < len1; k++) {
        movieClip = ref5[k];
        if (movieClip.mode === 'single') {
          movieClip.specialGoToAndStop(movieClip.startPosition);
        } else {
          movieClip.specialGoToAndStop(this.currentFrame);
        }
      }
      this.takeChildrenFromMovieClip(this.baseMovieClip, this);
      this.loop = action.loops !== false;
      this.goesTo = action.goesTo;
      if (this.actionNotSupported) {
        this.notifyActionNeedsRender(action);
      }
      this.scaleX = this.scaleY = (ref6 = (ref7 = action.scale) != null ? ref7 : this.thangType.get('scale')) != null ? ref6 : 1;
    } else if (action.container) {
      this.regX = this.regY = 0;
      this.scaleX = this.scaleY = 1;
      this.childMovieClips = [];
      containerName = this.spriteSheetPrefix + action.container;
      sprite = new createjs.Sprite(this.spriteSheet);
      sprite.gotoAndStop(containerName);
      if (sprite.currentFrame === 0 || this.usePlaceholders) {
        sprite.gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = this.thangType.get('raw').containers[action.container].b;
        actionScale = (ref8 = (ref9 = action.scale) != null ? ref9 : this.thangType.get('scale')) != null ? ref8 : 1;
        sprite.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        sprite.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        sprite.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        sprite.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref10 = (ref11 = action.scale) != null ? ref11 : this.thangType.get('scale')) != null ? ref10 : 1);
        sprite.regX = -reg.x * scale;
        sprite.regY = -reg.y * scale;
        sprite.scaleX = sprite.scaleY = 1 / this.resolutionFactor;
      }
      this.children = [];
      this.addChild(sprite);
    } else if (action.goesTo) {
      this.goto(action.goesTo, this.paused);
      return;
    }
    if (action.flipX) {
      this.scaleX *= -1;
    }
    if (action.flipY) {
      this.scaleY *= -1;
    }
    this.baseScaleX = this.scaleX;
    this.baseScaleY = this.scaleY;
  };

  SegmentedSprite.prototype.notifyActionNeedsRender = function(action) {
    var ref;
    return (ref = this.lank) != null ? ref.trigger('action-needs-render', this.lank, action) : void 0;
  };

  SegmentedSprite.prototype.buildMovieClip = function(animationName, mode, startPosition, loops) {
    var anim, animData, args, base, bounds, func, graphic, i, j, k, key, l, len, len1, len2, len3, len4, locals, m, mc, n, raw, ref, ref1, ref2, ref3, shape, stopped, toSkip, tween, tweenData;
    key = JSON.stringify([this.spriteSheetPrefix].concat(arguments));
    if ((base = this.spriteSheet.mcPool)[key] == null) {
      base[key] = [];
    }
    ref = this.spriteSheet.mcPool[key];
    for (j = 0, len = ref.length; j < len; j++) {
      mc = ref[j];
      if (!mc.inUse) {
        mc.gotoAndStop(mc.currentFrame + 0.01);
        this.childMovieClips = mc.childMovieClips;
        return mc;
      }
    }
    raw = this.thangType.get('raw');
    animData = raw.animations[animationName];
    this.lastAnimData = animData;
    locals = {};
    _.extend(locals, this.buildMovieClipContainers(animData.containers));
    _.extend(locals, this.buildMovieClipAnimations(animData.animations));
    toSkip = {};
    ref1 = animData.shapes;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      shape = ref1[k];
      toSkip[shape.bn] = true;
    }
    ref2 = animData.graphics;
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      graphic = ref2[l];
      toSkip[graphic.bn] = true;
    }
    anim = new createjs.MovieClip();
    anim.initialize(mode != null ? mode : createjs.MovieClip.INDEPENDENT, startPosition != null ? startPosition : 0, loops != null ? loops : true);
    anim.specialGoToAndStop = specialGoToAndStop;
    ref3 = animData.tweens;
    for (i = m = 0, len3 = ref3.length; m < len3; i = ++m) {
      tweenData = ref3[i];
      stopped = false;
      tween = createjs.Tween;
      for (n = 0, len4 = tweenData.length; n < len4; n++) {
        func = tweenData[n];
        args = $.extend(true, [], func.a);
        if (this.dereferenceArgs(args, locals, toSkip) === false) {
          stopped = true;
          break;
        }
        if (tween[func.n]) {
          tween = tween[func.n].apply(tween, args);
        } else {
          stopped = true;
          break;
        }
      }
      if (stopped) {
        continue;
      }
      anim.timeline.addTween(tween);
    }
    anim.nominalBounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, animData.bounds, function(){});
    if (animData.frameBounds) {
      anim.frameBounds = (function() {
        var len5, o, ref4, results;
        ref4 = animData.frameBounds;
        results = [];
        for (o = 0, len5 = ref4.length; o < len5; o++) {
          bounds = ref4[o];
          results.push((function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(createjs.Rectangle, bounds, function(){}));
        }
        return results;
      })();
    }
    anim.childMovieClips = this.childMovieClips;
    this.spriteSheet.mcPool[key].push(anim);
    return anim;
  };

  SegmentedSprite.prototype.buildMovieClipContainers = function(localContainers) {
    var bounds, innerContainer, j, len, localContainer, map, outerContainer;
    map = {};
    for (j = 0, len = localContainers.length; j < len; j++) {
      localContainer = localContainers[j];
      outerContainer = new createjs.SpriteContainer(this.spriteSheet);
      innerContainer = new createjs.Sprite(this.spriteSheet);
      innerContainer.gotoAndStop(this.spriteSheetPrefix + localContainer.gn);
      if (innerContainer.currentFrame === 0 || this.usePlaceholders) {
        innerContainer.gotoAndStop(0);
        this.actionNotSupported = true;
        bounds = this.thangType.get('raw').containers[localContainer.gn].b;
        innerContainer.x = bounds[0];
        innerContainer.y = bounds[1];
        innerContainer.scaleX = bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        innerContainer.scaleY = bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
      } else {
        innerContainer.scaleX = innerContainer.scaleY = 1 / (this.resolutionFactor * (this.thangType.get('scale') || 1));
      }
      outerContainer.addChild(innerContainer);
      outerContainer.setTransform.apply(outerContainer, localContainer.t);
      if (localContainer.o != null) {
        outerContainer._off = localContainer.o;
      }
      if (localContainer.al != null) {
        outerContainer.alpha = localContainer.al;
      }
      map[localContainer.bn] = outerContainer;
    }
    return map;
  };

  SegmentedSprite.prototype.buildMovieClipAnimations = function(localAnimations) {
    var animation, j, len, localAnimation, map;
    map = {};
    for (j = 0, len = localAnimations.length; j < len; j++) {
      localAnimation = localAnimations[j];
      animation = this.buildMovieClip.apply(this, [localAnimation.gn].concat(slice.call(localAnimation.a)));
      animation.inUse = true;
      animation.setTransform.apply(animation, localAnimation.t);
      map[localAnimation.bn] = animation;
      this.childMovieClips.push(animation);
    }
    return map;
  };

  SegmentedSprite.prototype.dereferenceArgs = function(args, locals, toSkip) {
    var key, res, val;
    for (key in args) {
      val = args[key];
      if (locals[val]) {
        args[key] = locals[val];
      } else if (val === null) {
        args[key] = {};
      } else if (_.isString(val) && val.indexOf('createjs.') === 0) {
        args[key] = eval(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        res = this.dereferenceArgs(val, locals, toSkip);
        if (res === false) {
          return res;
        }
      } else if (_.isString(val) && toSkip[val]) {
        return false;
      }
    }
    return args;
  };

  SegmentedSprite.prototype.handleTick = function(e) {
    if (this.lastTimeStamp) {
      this.tick(e.timeStamp - this.lastTimeStamp);
    }
    return this.lastTimeStamp = e.timeStamp;
  };

  SegmentedSprite.prototype.tick = function(delta) {
    var j, len, movieClip, newFrame, newFrameIndex, nextFrame, pct, prevFrame, ref, translatedFrame;
    if (this.paused || !this.baseMovieClip) {
      return;
    }
    if (this.animLength === 1) {
      return this.paused = true;
    }
    newFrame = this.currentFrame + this.framerate * delta / 1000;
    if (newFrame > this.animLength) {
      if (this.goesTo) {
        this.gotoAndPlay(this.goesTo);
        return;
      } else if (!this.loop) {
        this.paused = true;
        newFrame = this.animLength - 1;
        _.defer((function(_this) {
          return function() {
            return _this.dispatchEvent('animationend');
          };
        })(this));
      } else {
        newFrame = newFrame % this.animLength;
      }
    }
    translatedFrame = newFrame;
    if (this.frames) {
      prevFrame = Math.floor(newFrame);
      nextFrame = Math.ceil(newFrame);
      if (prevFrame === nextFrame) {
        translatedFrame = this.frames[newFrame];
      } else if (nextFrame === this.frames.length) {
        translatedFrame = this.frames[prevFrame];
      } else {
        pct = newFrame % 1;
        newFrameIndex = this.frames[prevFrame] + (pct * (this.frames[nextFrame] - this.frames[prevFrame]));
        translatedFrame = newFrameIndex;
      }
    }
    this.currentFrame = newFrame;
    if (translatedFrame === this.baseMovieClip.currentFrame) {
      return;
    }
    this.baseMovieClip.specialGoToAndStop(translatedFrame);
    ref = this.childMovieClips;
    for (j = 0, len = ref.length; j < len; j++) {
      movieClip = ref[j];
      movieClip.specialGoToAndStop(movieClip.mode === 'single' ? movieClip.startPosition : newFrame);
    }
    this.children = [];
    return this.takeChildrenFromMovieClip(this.baseMovieClip, this);
  };

  SegmentedSprite.prototype.takeChildrenFromMovieClip = function(movieClip, recipientContainer) {
    var child, childRecipient, j, k, len, len1, prop, ref, ref1, results;
    ref = movieClip.childrenCopy;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (child instanceof createjs.MovieClip) {
        childRecipient = new createjs.SpriteContainer(this.spriteSheet);
        this.takeChildrenFromMovieClip(child, childRecipient);
        ref1 = ['regX', 'regY', 'rotation', 'scaleX', 'scaleY', 'skewX', 'skewY', 'x', 'y'];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          prop = ref1[k];
          childRecipient[prop] = child[prop];
        }
        results.push(recipientContainer.addChild(childRecipient));
      } else {
        results.push(recipientContainer.addChild(child));
      }
    }
    return results;
  };

  return SegmentedSprite;

})(createjs.SpriteContainer);
});

;require.register("lib/surface/SingularSprite", function(exports, require, module) {
var SingularSprite, SpriteBuilder, cliffs, floors,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('lib/sprites/SpriteBuilder');

floors = ['Dungeon Floor', 'Indoor Floor', 'Grass', 'Grass01', 'Grass02', 'Grass03', 'Grass04', 'Grass05', 'Goal Trigger', 'Obstacle', 'Sand 01', 'Sand 02', 'Sand 03', 'Sand 04', 'Sand 05', 'Sand 06', 'Talus 1', 'Talus 2', 'Talus 3', 'Talus 4', 'Talus 5', 'Talus 6', 'Firn 1', 'Firn 2', 'Firn 3', 'Firn 4', 'Firn 5', 'Firn 6', 'Ice Rink 1', 'Ice Rink 2', 'Ice Rink 3', 'Firn Cliff', 'VR Floor', 'Classroom Floor'];

cliffs = ['Dungeon Pit', 'Grass Cliffs'];

module.exports = SingularSprite = (function(superClass) {
  extend(SingularSprite, superClass);

  SingularSprite.prototype.childMovieClips = null;

  function SingularSprite(spriteSheet, thangType, spriteSheetPrefix, resolutionFactor) {
    this.spriteSheet = spriteSheet;
    this.thangType = thangType;
    this.spriteSheetPrefix = spriteSheetPrefix;
    this.resolutionFactor = resolutionFactor != null ? resolutionFactor : SPRITE_RESOLUTION_FACTOR;
    SingularSprite.__super__.constructor.call(this, this.spriteSheet);
  }

  SingularSprite.prototype.destroy = function() {
    return this.removeAllEventListeners();
  };

  SingularSprite.prototype.gotoAndPlay = function(actionName) {
    return this.goto(actionName, false);
  };

  SingularSprite.prototype.gotoAndStop = function(actionName) {
    return this.goto(actionName, true);
  };

  SingularSprite.prototype._gotoAndPlay = createjs.Sprite.prototype.gotoAndPlay;

  SingularSprite.prototype._gotoAndStop = createjs.Sprite.prototype.gotoAndStop;

  SingularSprite.prototype.goto = function(actionName, paused) {
    var action, actionScale, animationName, bounds, frames, func, randomStart, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reg, scale;
    this.paused = paused != null ? paused : true;
    this.actionNotSupported = false;
    action = this.thangType.getActions()[actionName];
    randomStart = _.string.startsWith(actionName, 'move');
    reg = ((ref = action.positions) != null ? ref.registration : void 0) || ((ref1 = this.thangType.get('positions')) != null ? ref1.registration : void 0) || {
      x: 0,
      y: 0
    };
    if (action.animation) {
      this.framerate = ((ref2 = action.framerate) != null ? ref2 : 20) * ((ref3 = action.speed) != null ? ref3 : 1);
      func = this.paused ? '_gotoAndStop' : '_gotoAndPlay';
      animationName = this.spriteSheetPrefix + actionName;
      this[func](animationName);
      if (this.currentFrame === 0 || this.usePlaceholders) {
        this._gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = (ref4 = this.thangType.get('raw')) != null ? (ref5 = ref4.animations) != null ? (ref6 = ref5[action.animation]) != null ? ref6.bounds : void 0 : void 0 : void 0;
        if (bounds == null) {
          bounds = [0, 0, 1, 1];
        }
        actionScale = (ref7 = (ref8 = action.scale) != null ? ref8 : this.thangType.get('scale')) != null ? ref7 : 1;
        this.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        this.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref9 = (ref10 = action.scale) != null ? ref10 : this.thangType.get('scale')) != null ? ref9 : 1);
        this.regX = -reg.x * scale;
        this.regY = -reg.y * scale;
        this.scaleX = this.scaleY = 1 / this.resolutionFactor;
        this.framerate = action.framerate || 20;
        if (randomStart && (frames = (ref11 = this.spriteSheet.getAnimation(animationName)) != null ? ref11.frames : void 0)) {
          this.currentAnimationFrame = Math.floor(Math.random() * frames.length);
        }
      }
    }
    if (action.container) {
      animationName = this.spriteSheetPrefix + actionName;
      this._gotoAndStop(animationName);
      if (this.currentFrame === 0 || this.usePlaceholders) {
        this._gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = this.thangType.get('raw').containers[action.container].b;
        actionScale = (ref12 = (ref13 = action.scale) != null ? ref13 : this.thangType.get('scale')) != null ? ref12 : 1;
        this.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        this.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref14 = (ref15 = action.scale) != null ? ref15 : this.thangType.get('scale')) != null ? ref14 : 1);
        this.regX = -reg.x * scale;
        this.regY = -reg.y * scale;
        this.scaleX = this.scaleY = 1 / this.resolutionFactor;
      }
    }
    if (action.flipX) {
      this.scaleX *= -1;
    }
    if (action.flipY) {
      this.scaleY *= -1;
    }
    this.baseScaleX = this.scaleX;
    this.baseScaleY = this.scaleY;
    if (this.camera && (ref16 = this.thangType.get('name'), indexOf.call(floors, ref16) >= 0)) {
      this.baseScaleY *= this.camera.y2x;
    } else if (this.camera && (ref17 = this.thangType.get('name'), indexOf.call(cliffs, ref17) >= 0)) {
      if (actionName === 'idle_side') {
        this.baseScaleX *= this.camera.x2y;
        this.baseScaleY *= this.camera.y2x * 0.85;
      } else {
        this.baseScaleY *= this.camera.y2x / 0.85;
      }
    }
    this.currentAnimation = actionName;
  };

  SingularSprite.prototype.notifyActionNeedsRender = function(action) {
    var ref;
    return (ref = this.lank) != null ? ref.trigger('action-needs-render', this.lank, action) : void 0;
  };

  return SingularSprite;

})(createjs.Sprite);
});

;require.register("lib/surface/Surface", function(exports, require, module) {
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

;require.register("lib/surface/TrailMaster", function(exports, require, module) {
var Camera, CocoClass, FUTURE_PATH_ALPHA, FUTURE_PATH_INTERVAL_DIVISOR, FUTURE_PATH_WIDTH, PAST_PATH_ALPHA, PAST_PATH_INTERVAL_DIVISOR, PAST_PATH_WIDTH, TARGET_ALPHA, TARGET_WIDTH, TrailMaster,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PAST_PATH_ALPHA = 0.75;

PAST_PATH_WIDTH = 5;

FUTURE_PATH_ALPHA = 0.75;

FUTURE_PATH_WIDTH = 4;

TARGET_ALPHA = 1;

TARGET_WIDTH = 10;

FUTURE_PATH_INTERVAL_DIVISOR = 4;

PAST_PATH_INTERVAL_DIVISOR = 2;

Camera = require('./Camera');

CocoClass = require('core/CocoClass');

module.exports = TrailMaster = (function(superClass) {
  extend(TrailMaster, superClass);

  TrailMaster.prototype.world = null;

  function TrailMaster(camera, layerAdapter) {
    this.camera = camera;
    this.layerAdapter = layerAdapter;
    TrailMaster.__super__.constructor.call(this);
    this.tweenedSprites = [];
    this.tweens = [];
    this.listenTo(this.layerAdapter, 'new-spritesheet', function() {
      return this.generatePaths(this.world, this.thang);
    });
  }

  TrailMaster.prototype.generatePaths = function(world, thang) {
    var pathDisplayObject;
    this.world = world;
    this.thang = thang;
    if (this.generatingPaths) {
      return;
    }
    this.generatingPaths = true;
    this.cleanUp();
    this.createGraphics();
    pathDisplayObject = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    pathDisplayObject.mouseEnabled = pathDisplayObject.mouseChildren = false;
    pathDisplayObject.addChild(this.createFuturePath());
    pathDisplayObject.addChild(this.createTargets());
    this.generatingPaths = false;
    return pathDisplayObject;
  };

  TrailMaster.prototype.cleanUp = function() {
    var j, len, ref, sprite;
    ref = this.tweenedSprites;
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      createjs.Tween.removeTweens(sprite);
    }
    this.tweenedSprites = [];
    return this.tweens = [];
  };

  TrailMaster.prototype.createGraphics = function() {
    this.targetDotKey = this.cachePathDot(TARGET_WIDTH, this.colorForThang(this.thang.team, TARGET_ALPHA), [0, 0, 0, 1]);
    this.pastDotKey = this.cachePathDot(PAST_PATH_WIDTH, this.colorForThang(this.thang.team, PAST_PATH_ALPHA), [0, 0, 0, 1]);
    return this.futureDotKey = this.cachePathDot(FUTURE_PATH_WIDTH, [255, 255, 255, FUTURE_PATH_ALPHA], this.colorForThang(this.thang.team, 1));
  };

  TrailMaster.prototype.cachePathDot = function(width, fillColor, strokeColor) {
    var circle, key, radius, ref, ref1;
    key = "path-dot-" + width + "-" + fillColor + "-" + strokeColor;
    fillColor = (ref = createjs.Graphics).getRGB.apply(ref, fillColor);
    strokeColor = (ref1 = createjs.Graphics).getRGB.apply(ref1, strokeColor);
    if (indexOf.call(this.layerAdapter.spriteSheet.getAnimations(), key) < 0) {
      circle = new createjs.Shape();
      radius = width / 2;
      circle.graphics.setStrokeStyle(width / 5).beginFill(fillColor).beginStroke(strokeColor).drawCircle(0, 0, radius);
      this.layerAdapter.addCustomGraphic(key, circle, [-radius * 1.5, -radius * 1.5, radius * 3, radius * 3]);
    }
    return key;
  };

  TrailMaster.prototype.colorForThang = function(team, alpha) {
    var rgb;
    if (alpha == null) {
      alpha = 1.0;
    }
    rgb = [0, 255, 0];
    if (team === 'humans') {
      rgb = [255, 0, 0];
    }
    if (team === 'ogres') {
      rgb = [0, 0, 255];
    }
    rgb.push(alpha);
    return rgb;
  };

  TrailMaster.prototype.createPastPath = function() {
    var interval, params, points;
    if (!(points = this.world.pointsForThang(this.thang.id, this.camera))) {
      return;
    }
    interval = Math.max(1, parseInt(this.world.frameRate / PAST_PATH_INTERVAL_DIVISOR));
    params = {
      interval: interval,
      frameKey: this.pastDotKey
    };
    return this.createPath(points, params);
  };

  TrailMaster.prototype.createFuturePath = function() {
    var interval, params, points;
    if (!(points = this.world.pointsForThang(this.thang.id, this.camera))) {
      return;
    }
    interval = Math.max(1, parseInt(this.world.frameRate / FUTURE_PATH_INTERVAL_DIVISOR));
    params = {
      interval: interval,
      animate: true,
      frameKey: this.futureDotKey
    };
    return this.createPath(points, params);
  };

  TrailMaster.prototype.createTargets = function() {
    var container, i, j, len, ref, sprite, sup, x, y;
    if (!this.thang.allTargets) {
      return;
    }
    container = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    ref = this.thang.allTargets;
    for (i = j = 0, len = ref.length; j < len; i = j += 2) {
      x = ref[i];
      y = this.thang.allTargets[i + 1];
      sup = this.camera.worldToSurface({
        x: x,
        y: y
      });
      sprite = new createjs.Sprite(this.layerAdapter.spriteSheet);
      sprite.scaleX = sprite.scaleY = 1 / this.layerAdapter.resolutionFactor;
      sprite.scaleY *= this.camera.y2x;
      sprite.gotoAndStop(this.targetDotKey);
      sprite.x = sup.x;
      sprite.y = sup.y;
      container.addChild(sprite);
    }
    return container;
  };

  TrailMaster.prototype.createPath = function(points, options) {
    var container, i, interval, j, key, lastSprite, len, ref, sprite, tween, x, y;
    if (options == null) {
      options = {};
    }
    options = options || {};
    interval = options.interval || 8;
    key = options.frameKey || this.pastDotKey;
    container = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    ref = interval * 2;
    for ((ref > 0 ? (i = j = 0, len = points.length) : i = j = points.length - 1); ref > 0 ? j < len : j >= 0; i = j += ref) {
      x = points[i];
      y = points[i + 1];
      sprite = new createjs.Sprite(this.layerAdapter.spriteSheet);
      sprite.scaleX = sprite.scaleY = 1 / this.layerAdapter.resolutionFactor;
      sprite.scaleY *= this.camera.y2x;
      sprite.gotoAndStop(key);
      sprite.x = x;
      sprite.y = y;
      container.addChild(sprite);
      if (lastSprite && options.animate) {
        tween = createjs.Tween.get(lastSprite, {
          loop: true
        }).to({
          x: x,
          y: y
        }, 1000);
        this.tweenedSprites.push(lastSprite);
        this.tweens.push(tween);
      }
      lastSprite = sprite;
    }
    this.logged = true;
    return container;
  };

  TrailMaster.prototype.play = function() {
    var j, len, ref, results, tween;
    ref = this.tweens;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      tween = ref[j];
      results.push(tween.setPaused(false));
    }
    return results;
  };

  TrailMaster.prototype.stop = function() {
    var j, len, ref, results, tween;
    ref = this.tweens;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      tween = ref[j];
      results.push(tween.setPaused(true));
    }
    return results;
  };

  TrailMaster.prototype.destroy = function() {
    this.cleanUp();
    return TrailMaster.__super__.destroy.call(this);
  };

  return TrailMaster;

})(CocoClass);
});

;require.register("lib/surface/sprite_utils", function(exports, require, module) {
var EDGE, HEIGHT, WIDTH, createProgressBar;

WIDTH = 20;

HEIGHT = 2;

EDGE = 0.3;

module.exports.createProgressBar = createProgressBar = function(color) {
  var g, ref, s;
  g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginFill(createjs.Graphics.getRGB(0, 0, 0));
  g.drawRect(0, -HEIGHT / 2, WIDTH, HEIGHT, HEIGHT);
  g.beginFill((ref = createjs.Graphics).getRGB.apply(ref, color));
  g.drawRoundRect(EDGE, EDGE - HEIGHT / 2, WIDTH - EDGE * 2, HEIGHT - EDGE * 2, HEIGHT - EDGE * 2);
  s = new createjs.Shape(g);
  s.z = 100;
  s.bounds = [0, -HEIGHT / 2, WIDTH, HEIGHT];
  return s;
};
});

;require.register("lib/world/GoalManager", function(exports, require, module) {
var CocoClass, GoalManager, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

utils = require('core/utils');

module.exports = GoalManager = (function(superClass) {
  extend(GoalManager, superClass);

  GoalManager.prototype.nextGoalID = 0;

  GoalManager.prototype.nicks = ['GoalManager'];

  function GoalManager(world, initialGoals, team, options) {
    this.world = world;
    this.initialGoals = initialGoals;
    this.team = team;
    GoalManager.__super__.constructor.call(this);
    this.options = options || {};
    this.init();
  }

  GoalManager.prototype.init = function() {
    var goal, i, len, ref, results;
    this.goals = [];
    this.goalStates = {};
    this.userCodeMap = {};
    this.thangTeams = {};
    this.initThangTeams();
    if (this.initialGoals) {
      ref = this.initialGoals;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        goal = ref[i];
        results.push(this.addGoal(goal));
      }
      return results;
    }
  };

  GoalManager.prototype.initThangTeams = function() {
    var i, len, ref, results, thang;
    if (!this.world) {
      return;
    }
    ref = this.world.thangs;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      if (!(thang.team && thang.isAttackable)) {
        continue;
      }
      if (!thang.team) {
        continue;
      }
      if (!this.thangTeams[thang.team]) {
        this.thangTeams[thang.team] = [];
      }
      results.push(this.thangTeams[thang.team].push(thang.id));
    }
    return results;
  };

  GoalManager.prototype.subscriptions = {
    'god:new-world-created': 'onNewWorldCreated',
    'god:new-html-goal-states': 'onNewHTMLGoalStates',
    'level:restarted': 'onLevelRestarted'
  };

  GoalManager.prototype.backgroundSubscriptions = {
    'world:thang-died': 'onThangDied',
    'world:thang-touched-goal': 'onThangTouchedGoal',
    'world:thang-left-map': 'onThangLeftMap',
    'world:thang-collected-item': 'onThangCollectedItem',
    'world:user-code-problem': 'onUserCodeProblem',
    'world:lines-of-code-counted': 'onLinesOfCodeCounted'
  };

  GoalManager.prototype.onLevelRestarted = function() {
    var goal, i, len, ref, results;
    this.goals = [];
    this.goalStates = {};
    this.userCodeMap = {};
    this.notifyGoalChanges();
    if (this.initialGoals) {
      ref = this.initialGoals;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        goal = ref[i];
        results.push(this.addGoal(goal));
      }
      return results;
    }
  };

  GoalManager.prototype.getGoals = function() {
    return this.goals;
  };

  GoalManager.prototype.setGoals = function(goals1) {
    this.goals = goals1;
  };

  GoalManager.prototype.setCode = function(userCodeMap) {
    this.userCodeMap = userCodeMap;
    return this.updateCodeGoalStates();
  };

  GoalManager.prototype.worldGenerationWillBegin = function() {
    this.initGoalStates();
    return this.checkForInitialUserCodeProblems();
  };

  GoalManager.prototype.submitWorldGenerationEvent = function(channel, event, frameNumber) {
    var func;
    func = this.backgroundSubscriptions[channel];
    func = utils.normalizeFunc(func, this);
    if (!func) {
      return;
    }
    return func.call(this, event, frameNumber);
  };

  GoalManager.prototype.worldGenerationEnded = function(finalFrame) {
    return this.wrapUpGoalStates(finalFrame);
  };

  GoalManager.prototype.getGoalStates = function() {
    return this.goalStates;
  };

  GoalManager.prototype.onNewWorldCreated = function(e) {
    this.world = e.world;
    if (e.goalStates != null) {
      return this.updateGoalStates(e.goalStates);
    }
  };

  GoalManager.prototype.onNewHTMLGoalStates = function(e) {
    if (e.goalStates != null) {
      return this.updateGoalStates(e.goalStates);
    }
  };

  GoalManager.prototype.updateGoalStates = function(newGoalStates) {
    var goalID, goalState;
    for (goalID in newGoalStates) {
      goalState = newGoalStates[goalID];
      if (this.goalStates[goalID] == null) {
        continue;
      }
      this.goalStates[goalID] = goalState;
    }
    return this.notifyGoalChanges();
  };

  GoalManager.prototype.addGoal = function(goal) {
    var channel, f;
    goal = $.extend(true, {}, goal);
    if (!goal.id) {
      goal.id = this.nextGoalID++;
    }
    if (this.goalStates[goal.id] != null) {
      return;
    }
    this.goals.push(goal);
    goal.isPositive = this.goalIsPositive(goal.id);
    this.goalStates[goal.id] = {
      status: 'incomplete',
      keyFrame: 0,
      team: goal.team
    };
    this.notifyGoalChanges();
    if (!goal.notificationGoal) {
      return;
    }
    f = (function(_this) {
      return function(channel) {
        return function(event) {
          return _this.onNote(channel, event);
        };
      };
    })(this);
    channel = goal.notificationGoal.channel;
    return this.addNewSubscription(channel, f(channel));
  };

  GoalManager.prototype.notifyGoalChanges = function() {
    var event, overallStatus;
    if (this.options.headless) {
      return;
    }
    overallStatus = this.checkOverallStatus();
    event = {
      goalStates: this.goalStates,
      goals: this.goals,
      overallStatus: overallStatus,
      timedOut: (this.world != null) && (this.world.totalFrames === this.world.maxTotalFrames && (overallStatus !== 'success' && overallStatus !== 'failure'))
    };
    return Backbone.Mediator.publish('goal-manager:new-goal-states', event);
  };

  GoalManager.prototype.checkOverallStatus = function(ignoreIncomplete) {
    var g, goal, goals, overallStatus, statuses;
    if (ignoreIncomplete == null) {
      ignoreIncomplete = false;
    }
    overallStatus = null;
    goals = this.goalStates ? _.values(this.goalStates) : [];
    goals = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = goals.length; i < len; i++) {
        g = goals[i];
        if (!g.optional) {
          results.push(g);
        }
      }
      return results;
    })();
    if (this.team) {
      goals = (function() {
        var i, len, ref, results;
        results = [];
        for (i = 0, len = goals.length; i < len; i++) {
          g = goals[i];
          if ((ref = g.team) === (void 0) || ref === this.team) {
            results.push(g);
          }
        }
        return results;
      }).call(this);
    }
    statuses = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = goals.length; i < len; i++) {
        goal = goals[i];
        results.push(goal.status);
      }
      return results;
    })();
    if (statuses.length > 0 && _.every(statuses, function(s) {
      return s === 'success' || (ignoreIncomplete && s === null);
    })) {
      overallStatus = 'success';
    }
    if (statuses.length > 0 && indexOf.call(statuses, 'failure') >= 0) {
      overallStatus = 'failure';
    }
    return overallStatus;
  };

  GoalManager.prototype.initGoalStates = function() {
    var getTo, goal, i, j, k, keepFrom, len, len1, len2, ref, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, state;
    this.goalStates = {};
    if (!this.goals) {
      return;
    }
    ref = this.goals;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      goal = ref[i];
      state = {
        status: null,
        keyFrame: 0,
        team: goal.team,
        optional: goal.optional
      };
      this.initGoalState(state, [goal.killThangs, goal.saveThangs], 'killed');
      ref2 = (ref1 = goal.getAllToLocations) != null ? ref1 : [];
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        getTo = ref2[j];
        this.initGoalState(state, [(ref3 = getTo.getToLocation) != null ? ref3.who : void 0, []], 'arrived');
      }
      ref5 = (ref4 = goal.keepAllFromLocations) != null ? ref4 : [];
      for (k = 0, len2 = ref5.length; k < len2; k++) {
        keepFrom = ref5[k];
        this.initGoalState(state, [[], (ref6 = keepFrom.keepFromLocation) != null ? ref6.who : void 0], 'arrived');
      }
      this.initGoalState(state, [(ref7 = goal.getToLocations) != null ? ref7.who : void 0, (ref8 = goal.keepFromLocations) != null ? ref8.who : void 0], 'arrived');
      this.initGoalState(state, [(ref9 = goal.leaveOffSides) != null ? ref9.who : void 0, (ref10 = goal.keepFromLeavingOffSides) != null ? ref10.who : void 0], 'left');
      this.initGoalState(state, [(ref11 = goal.collectThangs) != null ? ref11.targets : void 0, (ref12 = goal.keepFromCollectingThangs) != null ? ref12.targets : void 0], 'collected');
      this.initGoalState(state, [goal.codeProblems], 'problems');
      this.initGoalState(state, [_.keys((ref13 = goal.linesOfCode) != null ? ref13 : {})], 'lines');
      results.push(this.goalStates[goal.id] = state);
    }
    return results;
  };

  GoalManager.prototype.checkForInitialUserCodeProblems = function() {
    var i, len, message, problem, ref, results, thang;
    if (!this.world) {
      return;
    }
    ref = this.world.thangs;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      if (thang.isProgrammable) {
        results.push((function() {
          var ref1, results1;
          ref1 = thang.publishedUserCodeProblems;
          results1 = [];
          for (message in ref1) {
            problem = ref1[message];
            results1.push(this.onUserCodeProblem({
              thang: thang,
              problem: problem
            }, 0));
          }
          return results1;
        }).call(this));
      }
    }
    return results;
  };

  GoalManager.prototype.onThangDied = function(e, frameNumber) {
    var goal, i, len, ref, ref1, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.killThangs != null) {
        this.checkKillThangs(goal.id, goal.killThangs, e.thang, frameNumber);
      }
      if (goal.saveThangs != null) {
        results.push(this.checkKillThangs(goal.id, goal.saveThangs, e.thang, frameNumber));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GoalManager.prototype.checkKillThangs = function(goalID, targets, thang, frameNumber) {
    var ref, ref1;
    if (!((ref = thang.id, indexOf.call(targets, ref) >= 0) || (ref1 = thang.team, indexOf.call(targets, ref1) >= 0))) {
      return;
    }
    return this.updateGoalState(goalID, thang.id, 'killed', frameNumber);
  };

  GoalManager.prototype.onThangTouchedGoal = function(e, frameNumber) {
    var getTo, goal, i, j, keepFrom, len, len1, ref, ref1, ref2, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.getToLocations != null) {
        this.checkArrived(goal.id, goal.getToLocations.who, goal.getToLocations.targets, e.actor, e.touched.id, frameNumber);
      }
      if (goal.getAllToLocations != null) {
        ref2 = goal.getAllToLocations;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          getTo = ref2[j];
          this.checkArrived(goal.id, getTo.getToLocation.who, getTo.getToLocation.targets, e.actor, e.touched.id, frameNumber);
        }
      }
      if (goal.keepFromLocations != null) {
        this.checkArrived(goal.id, goal.keepFromLocations.who, goal.keepFromLocations.targets, e.actor, e.touched.id, frameNumber);
      }
      if (goal.keepAllFromLocations != null) {
        results.push((function() {
          var k, len2, ref3, results1;
          ref3 = goal.keepAllFromLocations;
          results1 = [];
          for (k = 0, len2 = ref3.length; k < len2; k++) {
            keepFrom = ref3[k];
            results1.push(this.checkArrived(goal.id, keepFrom.keepFromLocation.who, keepFrom.keepFromLocation.targets, e.actor, e.touched.id, frameNumber));
          }
          return results1;
        }).call(this));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GoalManager.prototype.checkArrived = function(goalID, who, targets, thang, touchedID, frameNumber) {
    var ref, ref1;
    if (indexOf.call(targets, touchedID) < 0) {
      return;
    }
    if (!((ref = thang.id, indexOf.call(who, ref) >= 0) || (ref1 = thang.team, indexOf.call(who, ref1) >= 0))) {
      return;
    }
    return this.updateGoalState(goalID, thang.id, 'arrived', frameNumber);
  };

  GoalManager.prototype.onThangLeftMap = function(e, frameNumber) {
    var goal, i, len, ref, ref1, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.leaveOffSides != null) {
        this.checkLeft(goal.id, goal.leaveOffSides.who, goal.leaveOffSides.sides, e.thang, e.side, frameNumber);
      }
      if (goal.keepFromLeavingOffSides != null) {
        results.push(this.checkLeft(goal.id, goal.keepFromLeavingOffSides.who, goal.keepFromLeavingOffSides.sides, e.thang, e.side, frameNumber));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GoalManager.prototype.checkLeft = function(goalID, who, sides, thang, side, frameNumber) {
    var ref, ref1;
    if (sides && side && !(indexOf.call(sides, side) >= 0)) {
      return;
    }
    if (!((ref = thang.id, indexOf.call(who, ref) >= 0) || (ref1 = thang.team, indexOf.call(who, ref1) >= 0))) {
      return;
    }
    return this.updateGoalState(goalID, thang.id, 'left', frameNumber);
  };

  GoalManager.prototype.onThangCollectedItem = function(e, frameNumber) {
    var goal, i, len, ref, ref1, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.collectThangs != null) {
        this.checkCollected(goal.id, goal.collectThangs.who, goal.collectThangs.targets, e.actor, e.item.id, frameNumber);
      }
      if (goal.keepFromCollectingThangs != null) {
        results.push(this.checkCollected(goal.id, goal.keepFromCollectingThangs.who, goal.keepFromCollectingThangs.targets, e.actor, e.item.id, frameNumber));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GoalManager.prototype.checkCollected = function(goalID, who, targets, thang, itemID, frameNumber) {
    var ref, ref1;
    if (indexOf.call(targets, itemID) < 0) {
      return;
    }
    if (!((ref = thang.id, indexOf.call(who, ref) >= 0) || (ref1 = thang.team, indexOf.call(who, ref1) >= 0))) {
      return;
    }
    return this.updateGoalState(goalID, itemID, 'collected', frameNumber);
  };

  GoalManager.prototype.onUserCodeProblem = function(e, frameNumber) {
    var goal, i, len, ref, ref1, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.codeProblems) {
        results.push(this.checkCodeProblem(goal.id, goal.codeProblems, e.thang, frameNumber));
      }
    }
    return results;
  };

  GoalManager.prototype.checkCodeProblem = function(goalID, who, thang, frameNumber) {
    var ref, ref1;
    if (!((ref = thang.id, indexOf.call(who, ref) >= 0) || (ref1 = thang.team, indexOf.call(who, ref1) >= 0))) {
      return;
    }
    return this.updateGoalState(goalID, thang.id, 'problems', frameNumber);
  };

  GoalManager.prototype.onLinesOfCodeCounted = function(e, frameNumber) {
    var goal, i, len, ref, ref1, results;
    ref1 = (ref = this.goals) != null ? ref : [];
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      goal = ref1[i];
      if (goal.linesOfCode) {
        results.push(this.checkLinesOfCode(goal.id, goal.linesOfCode, e.thang, e.linesUsed, frameNumber));
      }
    }
    return results;
  };

  GoalManager.prototype.checkLinesOfCode = function(goalID, who, thang, linesUsed, frameNumber) {
    var linesAllowed, ref;
    if (!(linesAllowed = (ref = who[thang.id]) != null ? ref : who[thang.team])) {
      return;
    }
    if (linesUsed > linesAllowed) {
      return this.updateGoalState(goalID, thang.id, 'lines', frameNumber);
    }
  };

  GoalManager.prototype.wrapUpGoalStates = function(finalFrame) {
    var goalID, ref, results, state;
    ref = this.goalStates;
    results = [];
    for (goalID in ref) {
      state = ref[goalID];
      if (state.status === null) {
        if (this.goalIsPositive(goalID)) {
          results.push(state.status = 'incomplete');
        } else {
          state.status = 'success';
          results.push(state.keyFrame = 'end');
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GoalManager.prototype.onNote = function(channel, e) {};

  GoalManager.prototype.initGoalState = function(state, whos, progressObjectName) {
    var array, arrays, i, len, prop, results, t, thang;
    arrays = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = whos.length; i < len; i++) {
        prop = whos[i];
        if (prop != null ? prop.length : void 0) {
          results.push(prop);
        }
      }
      return results;
    })();
    if (!arrays.length) {
      return;
    }
    if (state[progressObjectName] == null) {
      state[progressObjectName] = {};
    }
    results = [];
    for (i = 0, len = arrays.length; i < len; i++) {
      array = arrays[i];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (j = 0, len1 = array.length; j < len1; j++) {
          thang = array[j];
          if (this.thangTeams[thang] != null) {
            results1.push((function() {
              var k, len2, ref, results2;
              ref = this.thangTeams[thang];
              results2 = [];
              for (k = 0, len2 = ref.length; k < len2; k++) {
                t = ref[k];
                results2.push(state[progressObjectName][t] = false);
              }
              return results2;
            }).call(this));
          } else {
            results1.push(state[progressObjectName][thang] = false);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  GoalManager.prototype.getGoalState = function(goalID) {
    return this.goalStates[goalID].status;
  };

  GoalManager.prototype.setGoalState = function(goalID, status) {
    var goalState, matchedGoals, mostEagerGoal, overallStatus, ref, state, tentative, victory;
    state = this.goalStates[goalID];
    state.status = status;
    if (overallStatus = this.checkOverallStatus(true)) {
      matchedGoals = (function() {
        var ref, results;
        ref = this.goalStates;
        results = [];
        for (goalID in ref) {
          goalState = ref[goalID];
          if (goalState.status === overallStatus) {
            results.push(_.find(this.goals, {
              id: goalID
            }));
          }
        }
        return results;
      }).call(this);
      mostEagerGoal = _.min(matchedGoals, 'worldEndsAfter');
      victory = overallStatus === 'success';
      tentative = overallStatus === 'success';
      if (mostEagerGoal !== Infinity) {
        return (ref = this.world) != null ? ref.endWorld(victory, mostEagerGoal.worldEndsAfter, tentative) : void 0;
      }
    }
  };

  GoalManager.prototype.updateGoalState = function(goalID, thangID, progressObjectName, frameNumber) {
    var goal, goalState, matchedGoals, mostEagerGoal, numDone, numNeeded, overallStatus, ref, ref1, ref2, state, stateThangs, success, tentative, victory;
    goal = _.find(this.goals, {
      id: goalID
    });
    state = this.goalStates[goalID];
    stateThangs = state[progressObjectName];
    stateThangs[thangID] = true;
    success = this.goalIsPositive(goalID);
    if (success) {
      numNeeded = (ref = goal.howMany) != null ? ref : Math.max(1, _.size(stateThangs));
    } else {
      numNeeded = _.size(stateThangs) - Math.max((ref1 = goal.howMany) != null ? ref1 : 1, _.size(stateThangs)) + 1;
    }
    numDone = _.filter(stateThangs).length;
    if (!(numDone >= numNeeded)) {
      return;
    }
    if (state.status && !success) {
      return;
    }
    state.status = success ? 'success' : 'failure';
    state.keyFrame = frameNumber;
    if (overallStatus = this.checkOverallStatus(true)) {
      matchedGoals = (function() {
        var ref2, results;
        ref2 = this.goalStates;
        results = [];
        for (goalID in ref2) {
          goalState = ref2[goalID];
          if (goalState.status === overallStatus) {
            results.push(_.find(this.goals, {
              id: goalID
            }));
          }
        }
        return results;
      }).call(this);
      mostEagerGoal = _.min(matchedGoals, 'worldEndsAfter');
      victory = overallStatus === 'success';
      tentative = overallStatus === 'success';
      if (mostEagerGoal !== Infinity) {
        return (ref2 = this.world) != null ? ref2.endWorld(victory, mostEagerGoal.worldEndsAfter, tentative) : void 0;
      }
    }
  };

  GoalManager.prototype.goalIsPositive = function(goalID) {
    var goal, prop, ref;
    goal = (ref = _.find(this.goals, {
      id: goalID
    })) != null ? ref : {};
    for (prop in goal) {
      if (this.positiveGoalMap[prop] === 0) {
        return false;
      }
    }
    return true;
  };

  GoalManager.prototype.positiveGoalMap = {
    killThangs: 1,
    saveThangs: 0,
    getToLocations: 1,
    getAllToLocations: 1,
    keepFromLocations: 0,
    keepAllFromLocations: 0,
    leaveOffSides: 1,
    keepFromLeavingOffSides: 0,
    collectThangs: 1,
    keepFromCollectingThangs: 0,
    linesOfCode: 0,
    codeProblems: 0
  };

  GoalManager.prototype.updateCodeGoalStates = function() {};

  GoalManager.prototype.destroy = function() {
    return GoalManager.__super__.destroy.call(this);
  };

  return GoalManager;

})(CocoClass);
});

;require.register("lib/world/Grid", function(exports, require, module) {
var Grid,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = Grid = (function() {
  function Grid(thangs, width1, height1, padding, left, bottom, rogue1) {
    this.width = width1;
    this.height = height1;
    this.padding = padding != null ? padding : 0;
    this.left = left != null ? left : 0;
    this.bottom = bottom != null ? bottom : 0;
    this.rogue = rogue1 != null ? rogue1 : false;
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    this.left = Math.floor(this.left);
    this.bottom = Math.floor(this.bottom);
    this.update(thangs);
  }

  Grid.prototype.update = function(thangs) {
    var i, j, k, l, len, len1, maxX, maxY, minX, minY, rect, ref, ref1, ref2, ref3, results, t, thang, v, x, y;
    this.grid = [];
    for (y = i = 0, ref = this.height; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
      this.grid.push([]);
      for (x = j = 0, ref1 = this.width; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
        this.grid[y].push([]);
      }
    }
    if (this.rogue) {
      thangs = (function() {
        var k, len, results;
        results = [];
        for (k = 0, len = thangs.length; k < len; k++) {
          t = thangs[k];
          if (t.collides || t.spriteName === 'Gem' && !t.dead) {
            results.push(t);
          }
        }
        return results;
      })();
    } else {
      thangs = (function() {
        var k, len, results;
        results = [];
        for (k = 0, len = thangs.length; k < len; k++) {
          t = thangs[k];
          if (t.collides) {
            results.push(t);
          }
        }
        return results;
      })();
    }
    results = [];
    for (k = 0, len = thangs.length; k < len; k++) {
      thang = thangs[k];
      rect = thang.rectangle();
      ref2 = [9001, -9001, 9001, -9001], minX = ref2[0], maxX = ref2[1], minY = ref2[2], maxY = ref2[3];
      ref3 = rect.vertices();
      for (l = 0, len1 = ref3.length; l < len1; l++) {
        v = ref3[l];
        minX = Math.min(minX, v.x - this.padding);
        minY = Math.min(minY, v.y - this.padding);
        maxX = Math.max(maxX, v.x + this.padding);
        maxY = Math.max(maxY, v.y + this.padding);
      }
      results.push((function() {
        var len2, m, ref4, results1;
        ref4 = this.columns(minY, maxY);
        results1 = [];
        for (m = 0, len2 = ref4.length; m < len2; m++) {
          y = ref4[m];
          results1.push((function() {
            var len3, n, ref5, results2;
            ref5 = this.rows(minX, maxX);
            results2 = [];
            for (n = 0, len3 = ref5.length; n < len3; n++) {
              x = ref5[n];
              results2.push(this.grid[y][x].push(thang));
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Grid.prototype.contents = function(gx, gy, width, height) {
    var i, j, k, len, len1, len2, ref, ref1, ref2, thang, thangs, x, y;
    if (width == null) {
      width = 1;
    }
    if (height == null) {
      height = 1;
    }
    thangs = [];
    ref = this.columns(gy - height / 2, gy + height / 2);
    for (i = 0, len = ref.length; i < len; i++) {
      y = ref[i];
      ref1 = this.rows(gx - width / 2, gx + width / 2);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        x = ref1[j];
        ref2 = this.grid[y][x];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          thang = ref2[k];
          if (thang.collides && !(indexOf.call(thangs, thang) >= 0) && thang.id !== 'Add Thang Phantom') {
            thangs.push(thang);
          }
        }
      }
    }
    return thangs;
  };

  Grid.prototype.clampColumn = function(y) {
    y = Math.max(0, Math.floor(y) - this.bottom);
    return Math.min(this.grid.length, Math.ceil(y) - this.bottom);
  };

  Grid.prototype.clampRow = function(x) {
    var ref;
    x = Math.max(0, Math.floor(x) - this.left);
    return Math.min(((ref = this.grid[0]) != null ? ref.length : void 0) || 0, Math.ceil(x) - this.left);
  };

  Grid.prototype.columns = function(minY, maxY) {
    var i, ref, ref1, results;
    return (function() {
      results = [];
      for (var i = ref = this.clampColumn(minY), ref1 = this.clampColumn(maxY); ref <= ref1 ? i < ref1 : i > ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  };

  Grid.prototype.rows = function(minX, maxX) {
    var i, ref, ref1, results;
    return (function() {
      results = [];
      for (var i = ref = this.clampRow(minX), ref1 = this.clampRow(maxX); ref <= ref1 ? i < ref1 : i > ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  };

  Grid.prototype.toString = function(rogue) {
    var row, thangs, upsideDown;
    if (rogue == null) {
      rogue = false;
    }
    upsideDown = _.clone(this.grid);
    upsideDown.reverse();
    return ((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = upsideDown.length; i < len; i++) {
        row = upsideDown[i];
        results.push(((function() {
          var j, len1, results1;
          results1 = [];
          for (j = 0, len1 = row.length; j < len1; j++) {
            thangs = row[j];
            results1.push(this.charForThangs(thangs, rogue));
          }
          return results1;
        }).call(this)).join(' '));
      }
      return results;
    }).call(this)).join("\n");
  };

  Grid.prototype.charForThangs = function(thangs, rogue) {
    if (!rogue) {
      return thangs.length || ' ';
    }
    if (!thangs.length) {
      return '.';
    }
    if (_.find(thangs, function(t) {
      return /Hero Placeholder/.test(t.id);
    })) {
      return '@';
    }
    if (_.find(thangs, {
      spriteName: 'Spike Walls'
    })) {
      return '>';
    }
    if (_.find(thangs, {
      spriteName: 'Fence Wall'
    })) {
      return 'F';
    }
    if (_.find(thangs, {
      spriteName: 'Fire Trap'
    })) {
      return 'T';
    }
    if (_.find(thangs, {
      spriteName: 'Dungeon Wall'
    })) {
      return ' ';
    }
    if (_.find(thangs, {
      spriteName: 'Gem'
    })) {
      return 'G';
    }
    if (_.find(thangs, {
      spriteName: 'Treasure Chest'
    })) {
      return 'C';
    }
    if (_.find(thangs, {
      spriteName: 'Spear'
    })) {
      return '*';
    }
    if (_.find(thangs, {
      type: 'munchkin'
    })) {
      return 'o';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'ogres';
    })) {
      return 'O';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'humans';
    })) {
      return 'H';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'neutral';
    })) {
      return 'N';
    }
    return '?';
  };

  return Grid;

})();
});

;require.register("lib/world/box2d", function(exports, require, module) {
var box2d;

if (typeof Box2D !== "undefined" && Box2D !== null) {
  module.exports = box2d = {
    b2Vec2: Box2D.Common.Math.b2Vec2,
    b2BodyDef: Box2D.Dynamics.b2BodyDef,
    b2Body: Box2D.Dynamics.b2Body,
    b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
    b2Fixture: Box2D.Dynamics.b2Fixture,
    b2FilterData: Box2D.Dynamics.b2FilterData,
    b2World: Box2D.Dynamics.b2World,
    b2ContactListener: Box2D.Dynamics.b2ContactListener,
    b2MassData: Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape: Box2D.Collision.Shapes.b2CircleShape
  };
  window.BOX2D_ENABLED = true;
} else {
  module.exports = null;
}
});

;require.register("lib/world/component", function(exports, require, module) {
var Component, componentKeywords,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

componentKeywords = ['attach', 'constructor', 'validateArguments', 'toString', 'isComponent'];

module.exports = Component = (function() {
  Component.className = 'Component';

  Component.prototype.isComponent = true;

  function Component(config) {
    var key, value;
    for (key in config) {
      value = config[key];
      this[key] = value;
    }
  }

  Component.prototype.attach = function(thang) {
    var key, oldValue, results, value;
    results = [];
    for (key in this) {
      value = this[key];
      if (!(indexOf.call(componentKeywords, key) < 0 && key[0] !== '_')) {
        continue;
      }
      oldValue = thang[key];
      if (typeof oldValue === 'function') {
        results.push(thang.appendMethod(key, value));
      } else {
        results.push(thang[key] = value);
      }
    }
    return results;
  };

  Component.prototype.validateArguments = {
    additionalProperties: false
  };

  Component.prototype.toString = function() {
    return "<Component: " + this.constructor.className;
  };

  return Component;

})();
});

;require.register("lib/world/ellipse", function(exports, require, module) {
var Ellipse, LineSegment, Rectangle, Vector;

Vector = require('./vector');

LineSegment = require('./line_segment');

Rectangle = require('./rectangle');

Ellipse = (function() {
  Ellipse.className = "Ellipse";

  Ellipse.prototype.isEllipse = true;

  Ellipse.prototype.apiProperties = ['x', 'y', 'width', 'height', 'rotation', 'distanceToPoint', 'distanceSquaredToPoint', 'distanceToRectangle', 'distanceSquaredToRectangle', 'distanceToEllipse', 'distanceSquaredToEllipse', 'distanceToShape', 'distanceSquaredToShape', 'containsPoint', 'intersectsLineSegment', 'intersectsRectangle', 'intersectsEllipse', 'getPos', 'containsPoint', 'copy'];

  function Ellipse(x1, y1, width, height, rotation) {
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.rotation = rotation != null ? rotation : 0;
  }

  Ellipse.prototype.copy = function() {
    return new Ellipse(this.x, this.y, this.width, this.height, this.rotation);
  };

  Ellipse.prototype.getPos = function() {
    return new Vector(this.x, this.y);
  };

  Ellipse.prototype.rectangle = function() {
    return new Rectangle(this.x, this.y, this.width, this.height, this.rotation);
  };

  Ellipse.prototype.axisAlignedBoundingBox = function(rounded) {
    if (rounded == null) {
      rounded = true;
    }
    return this.rectangle().axisAlignedBoundingBox();
  };

  Ellipse.prototype.distanceToPoint = function(p) {
    return this.rectangle().distanceToPoint(p);
  };

  Ellipse.prototype.distanceSquaredToPoint = function(p) {
    return this.rectangle().distanceSquaredToPoint(p);
  };

  Ellipse.prototype.distanceToRectangle = function(other) {
    return Math.sqrt(this.distanceSquaredToRectangle(other));
  };

  Ellipse.prototype.distanceSquaredToRectangle = function(other) {
    return this.rectangle().distanceSquaredToRectangle(other);
  };

  Ellipse.prototype.distanceToEllipse = function(ellipse) {
    return Math.sqrt(this.distanceSquaredToEllipse(ellipse));
  };

  Ellipse.prototype.distanceSquaredToEllipse = function(ellipse) {
    return this.rectangle().distanceSquaredToEllipse(ellipse);
  };

  Ellipse.prototype.distanceToShape = function(shape) {
    return Math.sqrt(this.distanceSquaredToShape(shape));
  };

  Ellipse.prototype.distanceSquaredToShape = function(shape) {
    if (shape.isEllipse) {
      return this.distanceSquaredToEllipse(shape);
    } else {
      return this.distanceSquaredToRectangle(shape);
    }
  };

  Ellipse.prototype.containsPoint = function(p, withRotation) {
    var c, ref, ref1, s, x, y;
    if (withRotation == null) {
      withRotation = true;
    }
    ref = [p.x - this.x, p.y - this.y], x = ref[0], y = ref[1];
    if (withRotation && this.rotation) {
      c = Math.cos(this.rotation);
      s = Math.sin(this.rotation);
      ref1 = [x * c + y * s, y * c - x * s], x = ref1[0], y = ref1[1];
    }
    x = x / this.width * 2;
    y = y / this.height * 2;
    return x * x + y * y <= 1;
  };

  Ellipse.prototype.intersectsLineSegment = function(p1, p2) {
    var a, a2, a4, b, b2, b4, bigX, bigY, c, c2, cos2t, cost, denominator, h, h2, k, k2, littleX, littleY, m, m2, numeratorLeft, numeratorMiddle, numeratorRight, px1, px2, py1, py2, ref, ref1, ref2, ref3, ref4, ref5, sin2t, sint, solution, solution1, solution2, x, x2;
    ref = [p1.x, p1.y, p2.x, p2.y], px1 = ref[0], py1 = ref[1], px2 = ref[2], py2 = ref[3];
    m = (py1 - py2) / (px1 - px2);
    m2 = Math.pow(m, 2);
    c = py1 - (m * px1);
    c2 = Math.pow(c, 2);
    ref1 = [this.width / 2, this.height / 2], a = ref1[0], b = ref1[1];
    ref2 = [this.x, this.y], h = ref2[0], k = ref2[1];
    a2 = Math.pow(a, 2);
    a4 = Math.pow(a, 2);
    b2 = Math.pow(b, 2);
    b4 = Math.pow(b, 4);
    h2 = Math.pow(h, 2);
    k2 = Math.pow(k, 2);
    sint = Math.sin(this.rotation);
    sin2t = Math.sin(2 * this.rotation);
    cost = Math.cos(this.rotation);
    cos2t = Math.cos(2 * this.rotation);
    if ((!isNaN(m)) && m !== Infinity && m !== -Infinity) {
      numeratorLeft = (-a2 * c * m * cos2t) - (a2 * c * m) + (a2 * c * sin2t) - (a2 * h * m * sin2t) - (a2 * h * cos2t) + (a2 * h) + (a2 * k * m * cos2t) + (a2 * k * m) - (a2 * k * sin2t);
      numeratorMiddle = Math.SQRT2 * Math.sqrt((a4 * b2 * m2 * cos2t) + (a4 * b2 * m2) - (2 * a4 * b2 * m * sin2t) - (a4 * b2 * cos2t) + (a4 * b2) - (a2 * b4 * m2 * cos2t) + (a2 * b4 * m2) + (2 * a2 * b4 * m * sin2t) + (a2 * b4 * cos2t) + (a2 * b4) - (2 * a2 * b2 * c2) - (4 * a2 * b2 * c * h * m) + (4 * a2 * b2 * c * k) - (2 * a2 * b2 * h2 * m2) + (4 * a2 * b2 * h * k * m) - (2 * a2 * b2 * k2));
      numeratorRight = (b2 * c * m * cos2t) - (b2 * c * m) - (b2 * c * sin2t) + (b2 * h * m * sin2t) + (b2 * h * cos2t) + (b2 * h) - (b2 * k * m * cos2t) + (b2 * k * m) + (b2 * k * sin2t);
      denominator = (a2 * m2 * cos2t) + (a2 * m2) - (2 * a2 * m * sin2t) - (a2 * cos2t) + a2 - (b2 * m2 * cos2t) + (b2 * m2) + (2 * b2 * m * sin2t) + (b2 * cos2t) + b2;
      solution1 = (-numeratorLeft - numeratorMiddle + numeratorRight) / denominator;
      solution2 = (-numeratorLeft + numeratorMiddle + numeratorRight) / denominator;
      if ((!isNaN(solution1)) && (!isNaN(solution2))) {
        ref3 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref3[0], bigX = ref3[1];
        if ((littleX <= solution1 && bigX >= solution1) || (littleX <= solution2 && bigX >= solution2)) {
          return true;
        }
      }
      if ((!isNaN(solution1)) || (!isNaN(solution2))) {
        solution = !isNaN(solution1) ? solution1 : solution2;
        ref4 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref4[0], bigX = ref4[1];
        if (littleX <= solution && bigX >= solution) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      x = px1;
      x2 = Math.pow(x, 2);
      numeratorLeft = (-a2 * h * sin2t) + (a2 * k * cos2t) + (a2 * k) + (a2 * x * sin2t);
      numeratorMiddle = Math.SQRT2 * Math.sqrt((a4 * b2 * cos2t) + (a4 * b2) - (a2 * b4 * cos2t) + (a2 * b4) - (2 * a2 * b2 * h2) + (4 * a2 * b2 * h * x) - (2 * a2 * b2 * x2));
      numeratorRight = (b2 * h * sin2t) - (b2 * k * cos2t) + (b2 * k) - (b2 * x * sin2t);
      denominator = (a2 * cos2t) + a2 - (b2 * cos2t) + b2;
      solution1 = (numeratorLeft - numeratorMiddle + numeratorRight) / denominator;
      solution2 = (numeratorLeft + numeratorMiddle + numeratorRight) / denominator;
      if ((!isNaN(solution1)) || (!isNaN(solution2))) {
        solution = !isNaN(solution1) ? solution1 : solution2;
        ref5 = py1 < py2 ? [py1, py2] : [py2, py1], littleY = ref5[0], bigY = ref5[1];
        if (littleY <= solution && bigY >= solution) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  };

  Ellipse.prototype.intersectsRectangle = function(rectangle) {
    return rectangle.intersectsEllipse(this);
  };

  Ellipse.prototype.intersectsEllipse = function(ellipse) {
    return this.rectangle().intersectsEllipse(ellipse);
  };

  Ellipse.prototype.intersectsShape = function(shape) {
    if (shape.isEllipse) {
      return this.intersectsEllipse(shape);
    } else {
      return this.intersectsRectangle(shape);
    }
  };

  Ellipse.prototype.toString = function() {
    return "{x: " + (this.x.toFixed(0)) + ", y: " + (this.y.toFixed(0)) + ", w: " + (this.width.toFixed(0)) + ", h: " + (this.height.toFixed(0)) + ", rot: " + (this.rotation.toFixed(3)) + "}";
  };

  Ellipse.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
      r: this.rotation
    };
  };

  Ellipse.deserialize = function(o, world, classMap) {
    return new Ellipse(o.x, o.y, o.w, o.h, o.r);
  };

  Ellipse.prototype.serializeForAether = function() {
    return this.serialize();
  };

  Ellipse.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return Ellipse;

})();

module.exports = Ellipse;
});

;require.register("lib/world/errors", function(exports, require, module) {
var ArgumentError, Vector,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Vector = require('./vector');

module.exports.ArgumentError = ArgumentError = (function(superClass) {
  extend(ArgumentError, superClass);

  ArgumentError.className = 'ArgumentError';

  function ArgumentError(message, functionName, argumentName, intendedType, actualValue, numArguments, hint) {
    this.message = message;
    this.functionName = functionName;
    this.argumentName = argumentName;
    this.intendedType = intendedType;
    this.actualValue = actualValue;
    this.numArguments = numArguments;
    this.hint = hint;
    ArgumentError.__super__.constructor.call(this, this.message);
    this.name = 'ArgumentError';
    if (Error.captureStackTrace != null) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  ArgumentError.prototype.toString = function() {
    var actualType, s, showValue, typeMismatch, v;
    s = "`" + this.functionName + "`";
    if (this.argumentName === 'return') {
      s += "'s return value";
    } else if (this.argumentName === '_excess') {
      s += " takes only " + this.numArguments + " argument" + (this.numArguments > 1 ? 's' : '') + ".";
    } else if (this.argumentName) {
      s += "'s argument `" + this.argumentName + "`";
    } else {
      s += ' takes no arguments.';
    }
    actualType = typeof this.actualValue;
    if (this.actualValue == null) {
      actualType = 'null';
    } else if (_.isArray(this.actualValue)) {
      actualType = 'array';
    }
    typeMismatch = this.intendedType && !this.intendedType.match(actualType);
    if (typeMismatch) {
      v = '';
      if (actualType === 'string') {
        v = "\"" + this.actualValue + "\"";
      } else if (actualType === 'number') {
        if (Math.round(this.actualValue) === this.actualValue) {
          this.actualValue;
        } else {
          this.actualValue.toFixed(2);
        }
      } else if (actualType === 'boolean') {
        v = "" + this.actualValue;
      } else if ((this.actualValue != null) && this.actualValue.id && this.actualValue.trackedPropertiesKeys) {
        v = this.actualValue.toString();
      } else if (this.actualValue instanceof Vector) {
        v = this.actualValue.toString();
      }
      showValue = showValue || this.actualValue instanceof Vector;
      s += " should have type `" + this.intendedType + "`, but got `" + actualType + "`" + (v ? ": `" + v + "`" : '') + ".";
    } else if (this.argumentName && this.argumentName !== '_excess') {
      s += ' has a problem.';
    }
    if (this.message) {
      s += '\n' + this.message;
    }
    return s;
  };

  return ArgumentError;

})(Error);
});

;require.register("lib/world/line_segment", function(exports, require, module) {
var LineSegment;

LineSegment = (function() {
  LineSegment.className = "LineSegment";

  function LineSegment(a, b) {
    this.a = a;
    this.b = b;
    this.slope = (this.a.y - this.b.y) / (this.a.x - this.b.x);
    this.y0 = this.a.y - (this.slope * this.a.x);
    this.left = this.a.x < this.b.x ? this.a : this.b;
    this.right = this.a.x > this.b.x ? this.a : this.b;
    this.bottom = this.a.y < this.b.y ? this.a : this.b;
    this.top = this.a.y > this.b.y ? this.a : this.b;
  }

  LineSegment.prototype.y = function(x) {
    return (this.slope * x) + this.y0;
  };

  LineSegment.prototype.x = function(y) {
    return (y - this.y0) / this.slope;
  };

  LineSegment.prototype.intersectsLineSegment = function(lineSegment) {
    var bottom, left, nonvertical, ref, ref1, right, top, vertical, x, y;
    if (lineSegment.slope === this.slope) {
      if (lineSegment.y0 === this.y0) {
        if (lineSegment.left.x === this.left.x || lineSegment.left.x === this.right.x || lineSegment.right.x === this.right.x || lineSegment.right.x === this.left.x) {
          return true;
        } else {
          ref = lineSegment.left.x < this.left.x ? [lineSegment, this] : [this, lineSegment], left = ref[0], right = ref[1];
          if (left.right.x > right.left.x) {
            return true;
          }
        }
      }
    } else if (Math.abs(this.slope) !== Infinity && Math.abs(lineSegment.slope) !== Infinity) {
      x = (lineSegment.y0 - this.y0) / (this.slope - lineSegment.slope);
      if (x >= this.left.x && x <= this.right.x && x >= lineSegment.left.x && x <= lineSegment.right.x) {
        return true;
      }
    } else if (Math.abs(this.slope) !== Infinity || Math.abs(lineSegment.slope) !== Infinity) {
      ref1 = Math.abs(this.slope) !== Infinity ? [lineSegment, this] : [this, lineSegment], vertical = ref1[0], nonvertical = ref1[1];
      x = vertical.a.x;
      bottom = vertical.bottom.y;
      top = vertical.top.y;
      y = nonvertical.y(x);
      left = nonvertical.left.x;
      right = nonvertical.right.x;
      if (y >= bottom && y <= top && x >= left && x <= right) {
        return true;
      }
    }
    return false;
  };

  LineSegment.prototype.pointOnLine = function(point, segment) {
    var bigY, littleY, ref;
    if (segment == null) {
      segment = true;
    }
    if (point.y === this.y(point.x)) {
      if (segment) {
        ref = this.a.y < this.b.y ? [this.a.y, this.b.y] : [this.b.y, this.a.y], littleY = ref[0], bigY = ref[1];
        if (littleY <= point.y && bigY >= point.y) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  };

  LineSegment.prototype.distanceSquaredToPoint = function(point) {
    var lineMagnitudeSquared, res, t;
    if (this.a.equals(this.b)) {
      return this.a.distanceSquared(point);
    }
    res = Math.min(point.distanceSquared(this.a), point.distanceSquared(this.b));
    lineMagnitudeSquared = this.a.distanceSquared(this.b);
    t = ((point.x - this.a.x) * (this.b.x - this.a.x) + (point.y - this.a.y) * (this.b.y - this.a.y)) / lineMagnitudeSquared;
    if (t < 0) {
      return this.a.distanceSquared(point);
    }
    if (t > 1) {
      return this.b.distanceSquared(point);
    }
    return point.distanceSquared({
      x: this.a.x + t * (this.b.x - this.a.x),
      y: this.a.y + t * (this.b.y - this.a.y)
    });
  };

  LineSegment.prototype.distanceToPoint = function(point) {
    return Math.sqrt(this.distanceSquaredToPoint(point));
  };

  LineSegment.prototype.toString = function() {
    return "lineSegment(a=" + this.a + ", b=" + this.b + ", slope=" + this.slope + ", y0=" + this.y0 + ", left=" + this.left + ", right=" + this.right + ", bottom=" + this.bottom + ", top=" + this.top + ")";
  };

  LineSegment.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      a: this.a,
      b: this.b
    };
  };

  LineSegment.deserialize = function(o, world, classMap) {
    return new LineSegment(o.a, o.b);
  };

  LineSegment.prototype.serializeForAether = function() {
    return this.serialize();
  };

  LineSegment.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return LineSegment;

})();

module.exports = LineSegment;
});

;require.register("lib/world/names", function(exports, require, module) {
var thangNames;

module.exports.thangNames = thangNames = {
  'Ogre Munchkin F': ['Alali', 'Anabel', 'Delma', 'Dosha', 'Gurzunn', 'Hoot', 'Inski', 'Iyert', 'Lacos', 'Merna', 'Palt', 'Paulark', 'Pripp', 'Shmeal', 'Upfish', 'Yugark', 'Shema'],
  'Ogre Munchkin M': ['Blob', 'Brack', 'Cragg', 'Dobo', 'Draff', 'Eugen', 'Gert', 'Godel', 'Goreball', 'Gordok', 'Gorylo', 'Gort', 'Kog', 'Kogpole', 'Kratt', 'Leerer', 'Nerph', 'Oogre', 'Raack', 'Ragtime', 'Raort', 'Rexxar', 'Skoggen', 'Smerk', 'Snortt', 'Thabt', 'Toremon', 'Treg', 'Ursa', 'Vorobun', 'Weeb', 'Yart', 'Zozo', 'Zock'],
  'Ogre Thrower': ['Beebatha', 'Dross', 'Drumbaa', 'Durnath', 'Esha', 'Gragthar', 'Grel', 'Hamedi', 'Jinjin', 'Kraggan', 'Kyrgg', 'Makas', 'Moza', 'Pinakin', 'Rakash', 'Rasha', 'Savatha', 'Vujii', 'Wuda', 'Yetu', 'Zara'],
  'Griffin Rider': ['Aeoldan', 'Bestarius', 'Cristofide', 'Denestorath', 'Letholdus', 'Loretha'],
  'Paladin': ['Illumina', 'Celadia', 'Taric', 'Vaelia', 'Antary', 'Femae'],
  'Ogre Witch': ['Vyrryx', 'Yzzrith', 'Xith'],
  'Ogre Chieftain': ['Zagra Ux', 'Oniko'],
  'Ogre Warlock': ['Gronak', 'Sorgoth', 'Vax', 'Vyrryx', 'Vyjj'],
  'Ogre Scout M': ['Frandar', 'Karnaugh', 'Lanthon', 'Tarjan', 'Yorgalfen'],
  'Ogre Scout F': ['Freesa', 'Ganju', 'Hopper', 'Ralthora', 'Yugorota'],
  'Burl': ['Borlit', 'Burlosh', 'Dorf', 'Teemer'],
  'Sand Yak': ['Arngotho', 'Falthror', 'Girvan', 'Langthok', 'Ofgar', 'Randall'],
  'Raven Pet': ['Nevermore'],
  'Cougar Pet': ['Kitty'],
  'Frog Pet': ['Hypnotoad'],
  'Griffin Pet': [''],
  'Pugicorn Pet': [''],
  'Polar Bear Pet': ['Klondike'],
  'Wolf Pet': [''],
  'Horse': ['Abby', 'Beauty', 'Cinnamon', 'Codasus', 'Ed', 'Fleetfire', 'Hurricane', 'Lovelace', 'Miracle', 'Mirial', 'Powder', 'Silver', 'Wildsilver'],
  'Ogre M': ['Axe Ox', 'Belch', 'Booz', 'Brusentsov', 'Demonik', 'Dronck', 'Gorlog', 'Grumus', 'Gug', 'Gurulax', 'Krogg', 'Kulgor', 'Mak Fod', 'Mokrul', 'Muthyala', 'Oni', 'Polifemo', 'Saltporker', 'Skrungt', 'Steve', 'Stinker', 'Tarlok', 'Trogdor', 'Trung', 'Vargutt', 'Vyle'],
  'Ogre F': ['Alkaz', 'Gar\'ah', 'Glonc', 'Holkam', 'Kriskull', 'Mak\'rah', 'Marghurk', 'Marnag', 'Martha', 'Morthrug', 'Nareng', 'Maleda'],
  'Ogre Brawler': ['Arelt', 'Borgag', 'Boz', 'Burobb', 'Dijkstro', 'Grognar', 'Grul\'thock', 'Grumoll', 'Haggar', 'Heizenburg', 'Ironjaw', 'Mokuhr', 'Muul', 'Ork\'han', 'Roast Beefy', 'Toharg', 'Trod', 'Tuguro', 'Turrok', 'York', 'Zabarek', 'Zagurk', 'Zeredd'],
  'Ogre Fangrider': ['Arizard', 'Bortrok', 'Boruvka', 'Doralt', 'Dreek', 'Flarsho', 'Geggret', 'Gurzthrot', 'Mizzy', 'Morzgret', 'Murgark', 'Muttin', 'Secka'],
  'Ogre Shaman': ['Ahst\'durante', 'Aolian\'Tak', 'Drun', 'Ghuk', 'Gogg', 'Gom', 'Grek', 'Gror', 'Grue', 'Il\'Du\'duka', 'Makas', 'Mogadishu', 'Nazgareth', 'Poult', 'Sham\'uk', 'Torluk', 'Turann', 'Tuzang', 'Tuzell', 'Ugoki', 'Uld\'Mak', 'Varreth', 'Yamizeb', 'Yerong', 'Yugargen', 'Zo\'Goroth', 'Zulabar'],
  'Skeleton': ['Bloody Johnny', 'Bone Daddy', 'Bonejangles', 'Bonesworth', 'Bonette', 'Boneus', 'Doornail', 'Drybones', 'Grim', 'Haskell', 'Indiana Bones', 'James Bone', 'Kate', 'Palatine', 'Ribster', 'Rusty', 'Sacra', 'Scraps', 'Shelly', 'Shishka-Bob', 'Shishka-Joe', 'Shishka-Larry', 'Skeletor', 'Skellington', 'Skulldugger', 'Skully', 'Smitty', 'Sphenoid', 'Sternum', 'Talus', 'Tatava', 'Ulna', 'Yorick'],
  'Ogre Headhunter': ['Bob', 'Deadtooth', 'Ez the Cruel', 'Grroq', 'Mog', 'Mogvar', 'Ral\'thuk', 'Soth', 'Ulxx', 'Ur', 'Veznyr', 'Warlegs', 'Xul Gor'],
  'Trapper': ['Senick', 'John', 'Kyle'],
  'Forest Archer': ['Naria', 'Sylva', 'Archia'],
  'Raider': ['Arryn', 'Thrat'],
  'Goliath': ['Okar', 'Ivan'],
  'Guardian': ['Illia', 'Gaia'],
  'Pixie': ['Zana', 'Eika'],
  'Assassin': ['Blackjack', 'Kha\'Zix', 'Ritic', 'Rengar', 'Shade', 'Talon', 'Zed', 'Sherkey'],
  'Necromancer': ['Krekai', 'Kethum', 'Morcelu', 'Nalfar', 'Drezhul'],
  'Master Wizard': ['Lilith', 'Kuhafas', 'Usara', 'Veigar', 'Voldemort', 'Vallyria'],
  'Archer F': ['Agapi', 'Alden', 'Alleria', 'Atalanta', 'Artemis', 'Beatrice', 'Bachi', 'Beverly', 'Cairn', 'Cecily', 'Clare', 'Erica', 'Gemma', 'Ivy', 'Jensen', 'Katniss', 'Katreena', 'Keturah', 'Kim', 'Korra', 'Lina', 'Luna', 'Mercedes', 'Mira', 'Mirana', 'Natalie', 'Odette', 'Omar', 'Orly', 'Phoebe', 'Prim', 'Rosaline', 'Rowan', 'Tansy', 'Tauriel', 'Vereesa', 'Vesper', 'Yilitha'],
  'Archer M': ['Arty', 'Brian', 'Cole', 'Denin', 'Dev', 'Fidsdale', 'Gimsley', 'Hunter', 'Kikariy', 'Legolas', 'Loco', 'Logos', 'Lycan', 'Mars', 'Odysseos', 'Oliver', 'Quinn', 'Robin', 'Roman', 'Simon', 'Slyvos', 'Vican', 'Warshall', 'Yue Fei', 'Zhou Tong', 'Archy'],
  'Peasant M': ['Azgot', 'Brom', 'Blemmin', 'Carlton', 'Charles', 'Durfkor', 'Duan', 'Fendrel', 'Gawain', 'Hamming', 'Hector', 'Hershell', 'Hingle', 'Hodor', 'Jackson', 'James', 'Lyle', 'Merek', 'Paps', 'Piers', 'Shimron', 'Thad', 'Tybalt', 'Victor', 'Winkler', 'Yorik', 'Yusef', 'Yoltovic'],
  'Peasant F': ['Alexia', 'Alianor', 'Anastas', 'Bernadette', 'Brandy', 'Cristiana', 'Ellyn', 'Giselle', 'Gwendolin', 'Helena', 'Hilda', 'Icey', 'Katelyn', 'Mary', 'Matilda', 'Mertia', 'Millicent', 'Regan', 'Rose', 'Ruth', 'Tabitha', 'Thea', 'Lea'],
  'Soldier M': ['Aaron', 'Adam', 'Addison', 'Alan', 'Albert', 'Alistair', 'Andrew', 'Anthony', 'Antonio', 'Arthur', 'Augustus', 'Barron', 'Benjamin', 'Bill', 'Billy', 'Bobby', 'Bond', 'Brandon', 'Brian', 'Bruce', 'Carl', 'Carlos', 'Cecil', 'Charles', 'Chris', 'Christopher', 'Cid', 'Clarence', 'Craig', 'Daniel', 'Darius', 'David', 'Dax', 'Dennis', 'Donald', 'Douglas', 'Duke', 'Earl', 'Edward', 'Edwin', 'Eric', 'Ernest', 'Eugene', 'Ezra', 'Felix', 'Ferb', 'Frank', 'Fred', 'Gary', 'Gatsby', 'George', 'Gerald', 'Gordon', 'Gregory', 'Guan Yu', 'Halle', 'Harold', 'Harry', 'Henry', 'Hirium', 'Howard', 'Huburt', 'Hugo', 'Ieyasu', 'Jack', 'Jackson', 'James', 'Jason', 'Jax', 'Jeffrey', 'Jeremy', 'Jerry', 'Jesse', 'Jimmy', 'Joe', 'John', 'Johnny', 'Jonah', 'Jonathan', 'Jose', 'Joseph', 'Joshua', 'Juan', 'Jun Fan', 'Justin', 'Keith', 'Kenneth', 'Kevin', 'Kirin', 'Kumar', 'Larry', 'Lawrence', 'Leopold', 'Louis', 'Lucas', 'Lucian', 'Malcolm', 'Marcus', 'Mark', 'Martin', 'Matthew', 'Max', 'Maxwell', 'Michael', 'Miles', 'Mischa', 'Musashi', 'Nicholas', 'Nick', 'Noah', 'Orion', 'Parker', 'Patrick', 'Paul', 'Peter', 'Philip', 'Philippian', 'Phillip', 'Phineas', 'Pierce', 'Ralph', 'Randy', 'Raymond', 'Remy', 'Rex', 'Ricardo', 'Richard', 'Robert', 'Roderick', 'Roger', 'Ronald', 'Ronan', 'Roy', 'Russell', 'Ryan', 'Sage', 'Samson', 'Samuel', 'Scott', 'Sean', 'Shawn', 'Silas', 'Stephen', 'Sterling', 'Steve', 'Steven', 'Stormy', 'Tadakatsu', 'Terry', 'Thelonious', 'Theo', 'Thomas', 'Timothy', 'Todd', 'Tryndamere', 'Tyrone', 'Victor', 'Walter', 'Wayne', 'William', 'Willie', 'Zachary'],
  'Soldier F': ['Ahri', 'Alana', 'Alexandra', 'Alice', 'Allankrita', 'Amanda', 'Amy', 'Andrea', 'Angela', 'Ann', 'Anna', 'Anne', 'Annie', 'Ann-Maria', 'Aphrodite', 'Ashley', 'Barbara', 'Betty', 'Beverly', 'Bonnie', 'Brenda', 'Buffy', 'Carol', 'Carolyn', 'Catherine', 'Cheryl', 'Christina', 'Christine', 'Coco', 'Cynthia', 'Deborah', 'Debra', 'Denise', 'Diana', 'Diane', 'Donna', 'Doris', 'Dorothy', 'Elizabeth', 'Emma', 'Emily', 'Evelyn', 'Fiora', 'Frances', 'Gabrielle', 'Gloria', 'Gorgin', 'Heather', 'Helen', 'Helga', 'Holly', 'Imani', 'Irene', 'Jacqueline', 'Jane', 'Janet', 'Janice', 'Jean', 'Jennifer', 'Jessica', 'Joan', 'Jordan', 'Joyce', 'Judith', 'Judy', 'Julia', 'Julie', 'Karen', 'Katherine', 'Kathleen', 'Kathryn', 'Kathy', 'Kay', 'Kelly', 'Kimberly', 'Kira', 'Lana', 'Laura', 'Lillian', 'Linda', 'Lisa', 'Lois', 'Lori', 'Louise', 'Lukaz', 'Margaret', 'Maria', 'Mariah', 'Marie', 'Marilyn', 'Martha', 'Mary', 'Medusa', 'Melissa', 'Michelle', 'Mildred', 'Mulan', 'Nancy', 'Natasha', 'Nicole', 'Nikita', 'Norma', 'Pamela', 'Patricia', 'Paula', 'Phyllis', 'Rachel', 'Rebecca', 'Robin', 'Ronda', 'Rose', 'Ruby', 'Ruth', 'Sana', 'Sandra', 'Sara', 'Sarah', 'Scarlett', 'Shannon', 'Sharon', 'Shirley', 'Stephanie', 'Susan', 'Tammy', 'Teresa', 'Tess', 'Theresa', 'Tina', 'Trinity', 'Virginia', 'Wanda'],
  'Ogre Peon M': ['Ba Bo', 'Bubbage', 'Durbo', 'Jaro', 'Kurger', 'Mudwich', 'Toe Pod', 'Zugger'],
  'Ogre Peon F': ['Greeke', 'Iblet', 'Lorba', 'Vapa', 'Yamra', 'Zzoya'],
  'Potion Master': ['Amaranth', 'Alchemist', 'Arora', 'Artephius', 'Clause', 'Curie', 'Fluvius', 'Javin', 'Kanada', 'Omar', 'Paracelsus', 'Snake', 'Vanders', 'Warnsdorff', 'Zander'],
  'Librarian': ['Agathe', 'Agnes', 'Hushbaum', 'Mariam', 'Matilda', 'Merilda', 'Nordex', 'Satish', 'Vera', 'Charlotte'],
  'Equestrian': ['Neely', 'Reynaldo', 'Ryder', 'Thoron'],
  'Knight': ['Almeric', 'Alphonse', 'Altair', 'Arthur', 'Bertrand', 'Bronn', 'Bruce', 'Drake', 'Duran', 'Edward', 'Galahad', 'Hank', 'Hunfray', 'Jeph', 'Jorah', 'Lancelot', 'Mace', 'Neville', 'Shug', 'Tharin', 'Vint', 'Wain'],
  'Captain': ['Anya', 'Brigette', 'Dimia', 'Div', 'Hardcastle', 'Helena', 'Isa', 'Jan', 'Jane', 'Jarin', 'Karp', 'Katana', 'Leona', 'Lia', 'Lily', 'Nicks', 'Philips', 'Sarre', 'Sun Tzu'],
  'Ninja': ['Akali', 'Amara', 'Goemon', 'Itachi', 'Kennen', 'Kosaraju', 'Madara', 'Minato', 'Naruto', 'Obito', 'Sakura', 'Sasuke', 'Shen', 'Shigeru', 'Takashi', 'Zed'],
  'Sorcerer': ['Beazer', 'Claude', 'Gandalf', 'Izzrts', 'Kleene', 'Pender', 'Jezebel'],
  'Samurai': ['Hattori', 'Hirosha', 'Ieyasu', 'Izotokogawa', 'Keitaro', 'Miyoshi', 'Nobunaga', 'Yasuo', 'Yi'],
  'Champion': ['Ida', 'Jasmine'],
  'Duelist': ['Alejandro']
};
});

;require.register("lib/world/rand", function(exports, require, module) {
var Rand,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Rand = (function() {
  Rand.className = 'Rand';

  function Rand(seed1) {
    var ref;
    this.seed = seed1;
    this.choice = bind(this.choice, this);
    this.shuffle = bind(this.shuffle, this);
    this.randfRange = bind(this.randfRange, this);
    this.randf2 = bind(this.randf2, this);
    this.rand2 = bind(this.rand2, this);
    this.rand = bind(this.rand, this);
    this.randf = bind(this.randf, this);
    this.randn = bind(this.randn, this);
    this.multiplier = 1664525;
    this.modulo = 4294967296;
    this.offset = 1013904223;
    if (!((this.seed != null) && (0 <= (ref = this.seed) && ref < this.modulo))) {
      this.seed = (new Date().valueOf() * new Date().getMilliseconds()) % this.modulo;
    }
  }

  Rand.prototype.setSeed = function(seed) {
    return this.seed = ((seed % this.modulo) + this.modulo) % this.modulo;
  };

  Rand.prototype.randn = function() {
    return this.seed = (this.multiplier * this.seed + this.offset) % this.modulo;
  };

  Rand.prototype.randf = function() {
    return this.randn() / this.modulo;
  };

  Rand.prototype.rand = function(n) {
    return Math.floor(this.randf() * n);
  };

  Rand.prototype.rand2 = function(min, max) {
    return min + this.rand(max - min);
  };

  Rand.prototype.randf2 = function(min, max) {
    return min + this.randf() * (max - min);
  };

  Rand.prototype.randfRange = function(x, range) {
    return x + (-0.5 + this.randf()) * range;
  };

  Rand.prototype.shuffle = function(arr) {
    var i, j, k, ref, t;
    if (!(arr.length > 2)) {
      return arr;
    }
    for (i = k = ref = arr.length - 1; ref <= 1 ? k <= 1 : k >= 1; i = ref <= 1 ? ++k : --k) {
      j = Math.floor(this.randf() * (i + 1));
      t = arr[j];
      arr[j] = arr[i];
      arr[i] = t;
    }
    return arr;
  };

  Rand.prototype.choice = function(arr) {
    return arr[this.rand(arr.length)];
  };

  return Rand;

})();

module.exports = Rand;
});

;require.register("lib/world/rectangle", function(exports, require, module) {
var LineSegment, Rectangle, Vector;

Vector = require('./vector');

LineSegment = require('./line_segment');

Rectangle = (function() {
  var fn, k, len, name, ref;

  Rectangle.className = 'Rectangle';

  ref = ['add', 'subtract', 'multiply', 'divide'];
  fn = function(name) {
    return Rectangle[name] = function(a, b) {
      return a.copy()[name](b);
    };
  };
  for (k = 0, len = ref.length; k < len; k++) {
    name = ref[k];
    fn(name);
  }

  Rectangle.prototype.isRectangle = true;

  Rectangle.prototype.apiProperties = ['x', 'y', 'width', 'height', 'rotation', 'getPos', 'vertices', 'touchesRect', 'touchesPoint', 'distanceToPoint', 'distanceSquaredToPoint', 'distanceToRectangle', 'distanceSquaredToRectangle', 'distanceToEllipse', 'distanceSquaredToEllipse', 'distanceToShape', 'distanceSquaredToShape', 'containsPoint', 'copy', 'intersectsLineSegment', 'intersectsEllipse', 'intersectsRectangle', 'intersectsShape'];

  function Rectangle(x1, y1, width, height, rotation) {
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.rotation = rotation != null ? rotation : 0;
  }

  Rectangle.prototype.copy = function() {
    return new Rectangle(this.x, this.y, this.width, this.height, this.rotation);
  };

  Rectangle.prototype.getPos = function() {
    return new Vector(this.x, this.y);
  };

  Rectangle.prototype.vertices = function() {
    var cos, h2, ref1, sin, w2;
    ref1 = [this.width / 2, this.height / 2, Math.cos(this.rotation), Math.sin(-this.rotation)], w2 = ref1[0], h2 = ref1[1], cos = ref1[2], sin = ref1[3];
    return [new Vector(this.x - (w2 * cos - h2 * sin), this.y - (w2 * sin + h2 * cos)), new Vector(this.x - (w2 * cos + h2 * sin), this.y - (w2 * sin - h2 * cos)), new Vector(this.x + (w2 * cos - h2 * sin), this.y + (w2 * sin + h2 * cos)), new Vector(this.x + (w2 * cos + h2 * sin), this.y + (w2 * sin - h2 * cos))];
  };

  Rectangle.prototype.lineSegments = function() {
    var lineSegment0, lineSegment1, lineSegment2, lineSegment3, vertices;
    vertices = this.vertices();
    lineSegment0 = new LineSegment(vertices[0], vertices[1]);
    lineSegment1 = new LineSegment(vertices[1], vertices[2]);
    lineSegment2 = new LineSegment(vertices[2], vertices[3]);
    lineSegment3 = new LineSegment(vertices[3], vertices[0]);
    return [lineSegment0, lineSegment1, lineSegment2, lineSegment3];
  };

  Rectangle.prototype.touchesRect = function(other) {
    var bl1, bl2, br1, br2, ref1, ref2, tl1, tl2, tr1, tr2;
    ref1 = this.vertices(), bl1 = ref1[0], tl1 = ref1[1], tr1 = ref1[2], br1 = ref1[3];
    ref2 = other.vertices(), bl2 = ref2[0], tl2 = ref2[1], tr2 = ref2[2], br2 = ref2[3];
    if (tl1.x > tr2.x || tl2.x > tr1.x) {
      return false;
    }
    if (bl1.y > tl2.y || bl2.y > tl1.y) {
      return false;
    }
    if (tl1.x === tr2.x || tl2.x === tr1.x) {
      return true;
    }
    if (tl1.y === bl2.y || tl2.y === bl1.y) {
      return true;
    }
    return false;
  };

  Rectangle.prototype.touchesPoint = function(p) {
    var bl, br, ref1, tl, tr;
    ref1 = this.vertices(), bl = ref1[0], tl = ref1[1], tr = ref1[2], br = ref1[3];
    if (!(p.y >= bl.y && p.y <= tl.y)) {
      return false;
    }
    if (!(p.x >= bl.x && p.x <= br.x)) {
      return false;
    }
    if (p.x === bl.x || p.x === br.x) {
      return true;
    }
    if (p.y === bl.y || p.y === tl.y) {
      return true;
    }
    return false;
  };

  Rectangle.prototype.axisAlignedBoundingBox = function(rounded) {
    var box, l, left, len1, ref1, ref2, ref3, ref4, ref5, top, vertex;
    if (rounded == null) {
      rounded = true;
    }
    box = this.copy();
    if (!this.rotation) {
      return box;
    }
    box.rotation = 0;
    ref1 = [9001, 9001], left = ref1[0], top = ref1[1];
    ref2 = this.vertices();
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      vertex = ref2[l];
      ref3 = [Math.min(left, vertex.x), Math.min(top, vertex.y)], left = ref3[0], top = ref3[1];
    }
    if (rounded) {
      ref4 = [Math.round(left), Math.round(top)], left = ref4[0], top = ref4[1];
    }
    ref5 = [2 * (this.x - left), 2 * (this.y - top)], box.width = ref5[0], box.height = ref5[1];
    return box;
  };

  Rectangle.prototype.distanceToPoint = function(p) {
    var dx, dy;
    p = Vector.subtract(p, this.getPos()).rotate(-this.rotation);
    dx = Math.max(Math.abs(p.x) - this.width / 2, 0);
    dy = Math.max(Math.abs(p.y) - this.height / 2, 0);
    return Math.sqrt(dx * dx + dy * dy);
  };

  Rectangle.prototype.distanceSquaredToPoint = function(p) {
    var dx, dy;
    p = Vector.subtract(p, this.getPos());
    dx = Math.max(Math.abs(p.x) - this.width / 2, 0);
    dy = Math.max(Math.abs(p.y) - this.height / 2, 0);
    return dx * dx + dy * dy;
  };

  Rectangle.prototype.distanceToRectangle = function(other) {
    return Math.sqrt(this.distanceSquaredToRectangle(other));
  };

  Rectangle.prototype.distanceSquaredToRectangle = function(other) {
    var ans, firstEdges, firstVertices, i, j, l, q, r, ref1, ref2, ref3, ref4, secondEdges, secondVertices;
    if (this.intersectsRectangle(other)) {
      return 0;
    }
    ref1 = [this.vertices(), other.vertices()], firstVertices = ref1[0], secondVertices = ref1[1];
    ref2 = [this.lineSegments(), other.lineSegments()], firstEdges = ref2[0], secondEdges = ref2[1];
    ans = Infinity;
    for (i = l = 0; l < 4; i = ++l) {
      for (j = q = 0, ref3 = firstEdges.length; 0 <= ref3 ? q < ref3 : q > ref3; j = 0 <= ref3 ? ++q : --q) {
        ans = Math.min(ans, firstEdges[j].distanceSquaredToPoint(secondVertices[i]));
      }
      for (j = r = 0, ref4 = secondEdges.length; 0 <= ref4 ? r < ref4 : r > ref4; j = 0 <= ref4 ? ++r : --r) {
        ans = Math.min(ans, secondEdges[j].distanceSquaredToPoint(firstVertices[i]));
      }
    }
    return ans;
  };

  Rectangle.prototype.distanceToEllipse = function(ellipse) {
    return Math.sqrt(this.distanceSquaredToEllipse(ellipse));
  };

  Rectangle.prototype.distanceSquaredToEllipse = function(ellipse) {
    return this.distanceSquaredToRectangle(ellipse.rectangle());
  };

  Rectangle.prototype.distanceToShape = function(shape) {
    return Math.sqrt(this.distanceSquaredToShape(shape));
  };

  Rectangle.prototype.distanceSquaredToShape = function(shape) {
    if (shape.isEllipse) {
      return this.distanceSquaredToEllipse(shape);
    } else {
      return this.distanceSquaredToRectangle(shape);
    }
  };

  Rectangle.prototype.containsPoint = function(p, withRotation) {
    var ref1, ref2;
    if (withRotation == null) {
      withRotation = true;
    }
    if (withRotation && this.rotation) {
      return !this.distanceToPoint(p);
    } else {
      return (this.x - this.width / 2 < (ref1 = p.x) && ref1 < this.x + this.width / 2) && (this.y - this.height / 2 < (ref2 = p.y) && ref2 < this.y + this.height / 2);
    }
  };

  Rectangle.prototype.intersectsLineSegment = function(p1, p2) {
    var b, b1, b2, bigX, bigY, l, len1, lineSegment, lineSegments, littleX, littleY, m, m1, m2, px1, px2, py1, py2, ref1, ref2, ref3, ref4, vertices, x, y;
    ref1 = [p1.x, p1.y, p2.x, p2.y], px1 = ref1[0], py1 = ref1[1], px2 = ref1[2], py2 = ref1[3];
    m1 = (py1 - py2) / (px1 - px2);
    b1 = py1 - (m1 * px1);
    vertices = this.vertices();
    lineSegments = [[vertices[0], vertices[1]], [vertices[1], vertices[2]], [vertices[2], vertices[3]], [vertices[3], vertices[0]]];
    for (l = 0, len1 = lineSegments.length; l < len1; l++) {
      lineSegment = lineSegments[l];
      ref2 = [p1.x, p1.y, p2.x, p2.y], px1 = ref2[0], py1 = ref2[1], px2 = ref2[2], py2 = ref2[3];
      m2 = (py1 - py2) / (px1 - px2);
      b2 = py1 - (m * px1);
      if (m1 !== m2) {
        m = m1 - m2;
        b = b2 - b1;
        x = b / m;
        ref3 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref3[0], bigX = ref3[1];
        if (x >= littleX && x <= bigX) {
          y = (m1 * x) + b1;
          ref4 = py1 < py2 ? [py1, py2] : [py2, py1], littleY = ref4[0], bigY = ref4[1];
          if (littleY <= solution && bigY >= solution) {
            return true;
          }
        }
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsRectangle = function(rectangle) {
    var l, len1, len2, q, ref1, ref2, thatLineSegment, thisLineSegment;
    if (this.containsPoint(rectangle.getPos())) {
      return true;
    }
    ref1 = this.lineSegments();
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      thisLineSegment = ref1[l];
      ref2 = rectangle.lineSegments();
      for (q = 0, len2 = ref2.length; q < len2; q++) {
        thatLineSegment = ref2[q];
        if (thisLineSegment.intersectsLineSegment(thatLineSegment)) {
          return true;
        }
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsEllipse = function(ellipse) {
    var l, len1, lineSegment, ref1;
    if (this.containsPoint(ellipse.getPos())) {
      return true;
    }
    ref1 = this.lineSegments();
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      lineSegment = ref1[l];
      if (ellipse.intersectsLineSegment(lineSegment.a, lineSegment.b)) {
        return true;
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsShape = function(shape) {
    if (shape.isEllipse) {
      return this.intersectsEllipse(shape);
    } else {
      return this.intersectsRectangle(shape);
    }
  };

  Rectangle.prototype.subtract = function(point) {
    this.x -= point.x;
    this.y -= point.y;
    this.pos.subtract(point);
    return this;
  };

  Rectangle.prototype.add = function(point) {
    this.x += point.x;
    this.y += point.y;
    this.pos.add(point);
    return this;
  };

  Rectangle.prototype.divide = function(n) {
    var ref1;
    ref1 = [this.width / n, this.height / n], this.width = ref1[0], this.height = ref1[1];
    return this;
  };

  Rectangle.prototype.multiply = function(n) {
    var ref1;
    ref1 = [this.width * n, this.height * n], this.width = ref1[0], this.height = ref1[1];
    return this;
  };

  Rectangle.prototype.isEmpty = function() {
    return this.width === 0 && this.height === 0;
  };

  Rectangle.prototype.invalid = function() {
    return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.width === Infinity || isNaN(this.width) || this.height === Infinity || isNaN(this.height) || this.rotation === Infinity || isNaN(this.rotation);
  };

  Rectangle.prototype.toString = function() {
    return "{x: " + (this.x.toFixed(0)) + ", y: " + (this.y.toFixed(0)) + ", w: " + (this.width.toFixed(0)) + ", h: " + (this.height.toFixed(0)) + ", rot: " + (this.rotation.toFixed(3)) + "}";
  };

  Rectangle.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
      r: this.rotation
    };
  };

  Rectangle.deserialize = function(o, world, classMap) {
    return new Rectangle(o.x, o.y, o.w, o.h, o.r);
  };

  Rectangle.prototype.serializeForAether = function() {
    return this.serialize();
  };

  Rectangle.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return Rectangle;

})();

module.exports = Rectangle;
});

;require.register("lib/world/script_event_prereqs", function(exports, require, module) {
var downTheChain, scriptMatchesEventPrereqs;

downTheChain = require('./world_utils').downTheChain;

module.exports.scriptMatchesEventPrereqs = scriptMatchesEventPrereqs = function(script, event) {
  var ap, i, len, ref, v;
  if (!script.eventPrereqs) {
    return true;
  }
  ref = script.eventPrereqs;
  for (i = 0, len = ref.length; i < len; i++) {
    ap = ref[i];
    v = downTheChain(event, ap.eventProps);
    if ((ap.equalTo != null) && v !== ap.equalTo) {
      return false;
    }
    if ((ap.notEqualTo != null) && v === ap.notEqualTo) {
      return false;
    }
    if ((ap.greaterThan != null) && !(v > ap.greaterThan)) {
      return false;
    }
    if ((ap.greaterThanOrEqualTo != null) && !(v >= ap.greaterThanOrEqualTo)) {
      return false;
    }
    if ((ap.lessThan != null) && !(v < ap.lessThan)) {
      return false;
    }
    if ((ap.lessThanOrEqualTo != null) && !(v <= ap.lessThanOrEqualTo)) {
      return false;
    }
    if ((ap.containingString != null) && (!v || v.search(ap.containingString) === -1)) {
      return false;
    }
    if ((ap.notContainingString != null) && (v != null ? v.search(ap.notContainingString) : void 0) !== -1) {
      return false;
    }
    if ((ap.containingRegexp != null) && (!v || v.search(new RegExp(ap.containingRegexp)) === -1)) {
      return false;
    }
    if ((ap.notContainingRegexp != null) && (v != null ? v.search(new RegExp(ap.notContainingRegexp)) : void 0) !== -1) {
      return false;
    }
  }
  return true;
};
});

;require.register("lib/world/system", function(exports, require, module) {
var System,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = System = (function() {
  System.className = 'System';

  function System(world, config) {
    var key, ref, value;
    this.world = world;
    ref = config != null ? config : {};
    for (key in ref) {
      value = ref[key];
      this[key] = value;
    }
    this.registries = [];
    this.hashes = {};
  }

  System.prototype.start = function(thangs) {};

  System.prototype.update = function(thangs) {
    var hash;
    return hash = 0;
  };

  System.prototype.finish = function(thangs) {};

  System.prototype.addRegistry = function(condition) {
    var registry;
    registry = [];
    this.registries.push([registry, condition]);
    return registry;
  };

  System.prototype.register = function(thang) {
    var condition, j, len, ref, ref1, registry, thangIndex;
    ref = this.registries;
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], registry = ref1[0], condition = ref1[1];
      if (condition(thang)) {
        if (indexOf.call(registry, thang) < 0) {
          registry.push(thang);
        }
      } else {
        thangIndex = registry.indexOf(thang);
        if (thangIndex !== -1) {
          registry.splice(thangIndex, 1);
        }
      }
    }
    return null;
  };

  System.prototype.checkRegistration = function(thang, registry) {};

  System.prototype.hashString = function(s) {
    var hash, i, j, ref;
    if (s in this.hashes) {
      return this.hashes[s];
    }
    hash = 0;
    for (i = j = 0, ref = Math.min(s.length, 100); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      hash = hash * 31 + s.charCodeAt(i);
    }
    hash = this.hashes[s] = hash % 3.141592653589793;
    return hash;
  };

  System.prototype.toString = function() {
    return "<System: " + this.constructor.className;
  };

  return System;

})();
});

;require.register("lib/world/systems/action", function(exports, require, module) {
var MAX_COOLDOWN;

module.exports.MAX_COOLDOWN = MAX_COOLDOWN = 9001;
});

;require.register("lib/world/systems/collision", function(exports, require, module) {
var CollisionCategory;

module.exports.CollisionCategory = CollisionCategory = (function() {
  CollisionCategory.className = 'CollisionCategory';

  function CollisionCategory(name, superteamIndex1, collisionSystem) {
    var otherCat, otherCatName, ref;
    this.superteamIndex = superteamIndex1 != null ? superteamIndex1 : null;
    this.collisionSystem = collisionSystem;
    this.ground = name.search('ground') !== -1;
    this.air = name.search('air') !== -1;
    this.name = CollisionCategory.nameFor(name, this.superteamIndex);
    if (this.ground || this.air) {
      if (this.superteamIndex == null) {
        this.superteamIndex = 0;
      }
    }
    this.number = 1 << this.collisionSystem.totalCategories++;
    if (this.collisionSystem.totalCategories > 16) {
      console.log('There should only be 16 collision categories!');
    }
    this.mask = 0;
    this.collisionSystem.allCategories[this.name] = this;
    ref = this.collisionSystem.allCategories;
    for (otherCatName in ref) {
      otherCat = ref[otherCatName];
      if (this.collidesWith(otherCat)) {
        this.mask = this.mask | otherCat.number;
        otherCat.mask = otherCat.mask | this.number;
      }
    }
  }

  CollisionCategory.prototype.collidesWith = function(cat) {
    var sameTeam;
    if (this.name === 'none' || cat.name === 'none') {
      return false;
    }
    if (cat.name === 'obstacles' || this.name === 'obstacles') {
      return true;
    }
    if (this.name === 'dead') {
      return cat.name === 'obstacles';
    }
    if (cat.name === 'dead') {
      return this.name === 'obstacles';
    }
    sameTeam = this.superteamIndex && cat.superteamIndex === this.superteamIndex;
    if (sameTeam && this.ground && this.air) {
      return false;
    }
    if (this.ground && this.air && cat.ground && cat.air) {
      return false;
    }
    if (cat.ground && this.ground) {
      return true;
    }
    if (cat.air && this.air) {
      return true;
    }
    return false;
  };

  CollisionCategory.nameFor = function(name, superteamIndex) {
    if (superteamIndex == null) {
      superteamIndex = null;
    }
    if (!(name.match('ground') || name.match('air'))) {
      return name;
    }
    return name + '_' + (superteamIndex || 0);
  };

  return CollisionCategory;

})();
});

;require.register("lib/world/systems/movement", function(exports, require, module) {
var AIR_DENSITY, ICE_FRICTION, STANDARD_FRICTION, SWAMP_DENSITY, VACUUM_DENSITY, WATER_DENSITY;

module.exports.WATER_DENSITY = WATER_DENSITY = 1000;

module.exports.AIR_DENSITY = AIR_DENSITY = 1.225;

module.exports.VACUUM_DENSITY = VACUUM_DENSITY = 0.00000000000000129;

module.exports.SWAMP_DENSITY = SWAMP_DENSITY = WATER_DENSITY / 4;

module.exports.STANDARD_FRICTION = STANDARD_FRICTION = 0.7;

module.exports.ICE_FRICTION = ICE_FRICTION = 0.1;
});

;require.register("lib/world/thang", function(exports, require, module) {
var ArgumentError, Rand, Thang, ThangState, thangNames,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ThangState = require('./thang_state');

thangNames = require('./names').thangNames;

ArgumentError = require('./errors').ArgumentError;

Rand = require('./rand');

module.exports = Thang = (function() {
  Thang.className = 'Thang';

  Thang.remainingThangNames = {};

  Thang.nextID = function(spriteName, world) {
    var baseName, extantThang, i, name, originals, remaining;
    originals = thangNames[spriteName] || [spriteName];
    remaining = Thang.remainingThangNames[spriteName];
    if (!(remaining != null ? remaining.length : void 0)) {
      remaining = Thang.remainingThangNames[spriteName] = originals.slice();
    }
    baseName = remaining.splice(world.rand.rand(remaining.length), 1)[0];
    i = 0;
    while (true) {
      name = i ? baseName + " " + i : baseName;
      extantThang = world.thangMap[name];
      if (!extantThang) {
        break;
      }
      i++;
    }
    return name;
  };

  Thang.resetThangIDs = function() {
    return Thang.remainingThangNames = {};
  };

  Thang.prototype.isThang = true;

  Thang.prototype.apiProperties = ['id', 'spriteName', 'health', 'pos', 'team'];

  function Thang(world1, spriteName1, id1) {
    this.world = world1;
    this.spriteName = spriteName1;
    this.id = id1;
    if (this.spriteName == null) {
      this.spriteName = this.constructor.className;
    }
    if (this.id == null) {
      this.id = this.constructor.nextID(this.spriteName, this.world);
    }
    this.addTrackedProperties(['exists', 'boolean']);
  }

  Thang.prototype.destroy = function() {
    var key;
    for (key in this) {
      this[key] = void 0;
    }
    this.destroyed = true;
    return this.destroy = function() {};
  };

  Thang.prototype.updateRegistration = function() {
    var j, len, ref, results, system;
    ref = this.world.systems;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      results.push(system.register(this));
    }
    return results;
  };

  Thang.prototype.publishNote = function(channel, event) {
    event.thang = this;
    return this.world.publishNote(channel, event);
  };

  Thang.prototype.getGoalState = function(goalID) {
    return this.world.getGoalState(goalID);
  };

  Thang.prototype.setGoalState = function(goalID, status) {
    return this.world.setGoalState(goalID, status);
  };

  Thang.prototype.getThangByID = function(id) {
    return this.world.getThangByID(id);
  };

  Thang.prototype.addComponents = function() {
    var base, c, componentClass, componentConfig, components, j, len, name1, ref, ref1, results;
    components = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.components == null) {
      this.components = [];
    }
    results = [];
    for (j = 0, len = components.length; j < len; j++) {
      ref = components[j], componentClass = ref[0], componentConfig = ref[1];
      this.components.push([componentClass, componentConfig]);
      if (_.isString(componentClass)) {
        componentClass = this.world.classMap[componentClass];
      } else {
        if ((ref1 = this.world) != null) {
          if ((base = ref1.classMap)[name1 = componentClass.className] == null) {
            base[name1] = componentClass;
          }
        }
      }
      c = new componentClass(componentConfig != null ? componentConfig : {});
      results.push(c.attach(this));
    }
    return results;
  };

  Thang.prototype.addTrackedProperties = function() {
    var j, len, oldPropIndex, oldType, prop, props, ref, results, type;
    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.trackedPropertiesKeys == null) {
      this.trackedPropertiesKeys = [];
    }
    if (this.trackedPropertiesTypes == null) {
      this.trackedPropertiesTypes = [];
    }
    if (this.trackedPropertiesUsed == null) {
      this.trackedPropertiesUsed = [];
    }
    results = [];
    for (j = 0, len = props.length; j < len; j++) {
      ref = props[j], prop = ref[0], type = ref[1];
      if (indexOf.call(ThangState.trackedPropertyTypes, type) < 0) {
        throw new Error("Type " + type + " for property " + prop + " is not a trackable property type: " + ThangState.trackedPropertyTypes);
      }
      oldPropIndex = this.trackedPropertiesKeys.indexOf(prop);
      if (oldPropIndex === -1) {
        this.trackedPropertiesKeys.push(prop);
        this.trackedPropertiesTypes.push(type);
        results.push(this.trackedPropertiesUsed.push(false));
      } else {
        oldType = this.trackedPropertiesTypes[oldPropIndex];
        if (type !== oldType) {
          throw new Error("Two types were specified for trackable property " + prop + ": " + oldType + " and " + type + ".");
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  };

  Thang.prototype.keepTrackedProperty = function(prop) {
    var propIndex;
    propIndex = this.trackedPropertiesKeys.indexOf(prop);
    if (propIndex !== -1) {
      return this.trackedPropertiesUsed[propIndex] = true;
    }
  };

  Thang.prototype.addTrackedFinalProperties = function() {
    var k, props;
    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.trackedFinalProperties == null) {
      this.trackedFinalProperties = [];
    }
    return this.trackedFinalProperties = this.trackedFinalProperties.concat((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = props.length; j < len; j++) {
        k = props[j];
        if (!(indexOf.call(this.trackedFinalProperties, k) >= 0)) {
          results.push(k);
        }
      }
      return results;
    }).call(this));
  };

  Thang.prototype.getState = function() {
    return this._state = new ThangState(this);
  };

  Thang.prototype.setState = function(state) {
    return this._state = state.restore();
  };

  Thang.prototype.toString = function() {
    return this.id;
  };

  Thang.prototype.createMethodChain = function(methodName) {
    var chain;
    if (this.methodChains == null) {
      this.methodChains = {};
    }
    chain = this.methodChains[methodName];
    if (chain) {
      return chain;
    }
    chain = this.methodChains[methodName] = {
      original: this[methodName],
      user: null,
      components: []
    };
    this[methodName] = _.partial(this.callChainedMethod, methodName);
    return chain;
  };

  Thang.prototype.appendMethod = function(methodName, newMethod) {
    return this.createMethodChain(methodName).components.push(newMethod);
  };

  Thang.prototype.callChainedMethod = function() {
    var args, chain, componentMethod, j, len, methodName, primaryMethod, ref, ret, ret2;
    methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    chain = this.methodChains[methodName];
    primaryMethod = chain.user || chain.original;
    ret = primaryMethod != null ? primaryMethod.apply(this, args) : void 0;
    ref = chain.components;
    for (j = 0, len = ref.length; j < len; j++) {
      componentMethod = ref[j];
      ret2 = componentMethod.apply(this, args);
      ret = ret2 != null ? ret2 : ret;
    }
    return ret;
  };

  Thang.prototype.getMethodSource = function(methodName) {
    var chain, ref, ref1, ref2, source;
    source = {};
    if ((this.methodChains != null) && methodName in this.methodChains) {
      chain = this.methodChains[methodName];
      source.original = chain.original.toString();
      source.user = (ref = chain.user) != null ? ref.toString() : void 0;
    } else {
      source.original = (ref1 = (ref2 = this[methodName]) != null ? ref2.toString() : void 0) != null ? ref1 : '';
    }
    source.original = Aether.getFunctionBody(source.original);
    return source;
  };

  Thang.prototype.serialize = function() {
    var base, componentClass, componentClassName, componentConfig, i, j, l, len, len1, name1, o, propIndex, ref, ref1, ref2, ref3, ref4, trackedFinalProperty, used;
    o = {
      spriteName: this.spriteName,
      id: this.id,
      components: [],
      finalState: {}
    };
    ref1 = (ref = this.components) != null ? ref : [];
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      ref2 = ref1[i], componentClass = ref2[0], componentConfig = ref2[1];
      if (_.isString(componentClass)) {
        componentClassName = componentClass;
      } else {
        componentClassName = componentClass.className;
        if ((base = this.world.classMap)[name1 = componentClass.className] == null) {
          base[name1] = componentClass;
        }
      }
      o.components.push([componentClassName, componentConfig]);
    }
    ref4 = (ref3 = this.trackedFinalProperties) != null ? ref3 : [];
    for (l = 0, len1 = ref4.length; l < len1; l++) {
      trackedFinalProperty = ref4[l];
      o.finalState[trackedFinalProperty] = this[trackedFinalProperty];
    }
    o.unusedTrackedPropertyKeys = (function() {
      var len2, m, ref5, results;
      ref5 = this.trackedPropertiesUsed;
      results = [];
      for (propIndex = m = 0, len2 = ref5.length; m < len2; propIndex = ++m) {
        used = ref5[propIndex];
        if (!used) {
          results.push(this.trackedPropertiesKeys[propIndex]);
        }
      }
      return results;
    }).call(this);
    return o;
  };

  Thang.deserialize = function(o, world, classMap, levelComponents) {
    var componentClass, componentClassName, componentConfig, componentModel, j, len, prop, ref, ref1, ref2, t, val;
    t = new Thang(world, o.spriteName, o.id);
    ref = o.components;
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], componentClassName = ref1[0], componentConfig = ref1[1];
      if (!(componentClass = classMap[componentClassName])) {
        console.debug('Compiling new Component while deserializing:', componentClassName);
        componentModel = _.find(levelComponents, {
          name: componentClassName
        });
        componentClass = world.loadClassFromCode(componentModel.js, componentClassName, 'component');
        world.classMap[componentClassName] = componentClass;
      }
      t.addComponents([componentClass, componentConfig]);
    }
    t.unusedTrackedPropertyKeys = o.unusedTrackedPropertyKeys;
    t.unusedTrackedPropertyValues = (function() {
      var l, len1, ref2, results;
      ref2 = o.unusedTrackedPropertyKeys;
      results = [];
      for (l = 0, len1 = ref2.length; l < len1; l++) {
        prop = ref2[l];
        results.push(t[prop]);
      }
      return results;
    })();
    ref2 = o.finalState;
    for (prop in ref2) {
      val = ref2[prop];
      t[prop] = val;
    }
    return t;
  };

  Thang.prototype.serializeForAether = function() {
    return {
      CN: this.constructor.className,
      id: this.id
    };
  };

  Thang.prototype.getLankOptions = function() {
    var color, colorConfigs, colorType, colorValue, options, ref, ref1, teamColor;
    colorConfigs = this.teamColors || ((ref = this.world) != null ? ref.getTeamColors() : void 0) || {};
    options = {
      colorConfig: {}
    };
    if (this.id === 'Hero Placeholder' && !this.world.getThangByID('Hero Placeholder 1')) {
      return options;
    }
    if (this.team && (teamColor = colorConfigs[this.team])) {
      options.colorConfig.team = teamColor;
    }
    if (this.color && (color = this.grabColorConfig(this.color))) {
      options.colorConfig.color = color;
    }
    if (this.colors) {
      ref1 = this.colors;
      for (colorType in ref1) {
        colorValue = ref1[colorType];
        options.colorConfig[colorType] = colorValue;
      }
    }
    return options;
  };

  Thang.prototype.grabColorConfig = function(color) {
    return {
      green: {
        hue: 0.33,
        saturation: 0.5,
        lightness: 0.5
      },
      black: {
        hue: 0,
        saturation: 0,
        lightness: 0.25
      },
      violet: {
        hue: 0.83,
        saturation: 0.5,
        lightness: 0.5
      }
    }[color];
  };

  return Thang;

})();
});

;require.register("lib/world/thang_state", function(exports, require, module) {
var FloatArrayType, ThangState, Vector, bytesPerFloat, clone, ref, ref1, typedArraySupport;

ref = require('./world_utils'), clone = ref.clone, typedArraySupport = ref.typedArraySupport;

Vector = require('./vector');

if (typedArraySupport) {
  FloatArrayType = Float32Array;
  bytesPerFloat = (ref1 = FloatArrayType.BYTES_PER_ELEMENT) != null ? ref1 : FloatArrayType.prototype.BYTES_PER_ELEMENT;
} else {
  bytesPerFloat = 4;
}

module.exports = ThangState = (function() {
  ThangState.className = 'ThangState';

  ThangState.trackedPropertyTypes = ['boolean', 'number', 'string', 'array', 'object', 'Vector', 'Thang'];

  ThangState.prototype.hasRestored = false;

  function ThangState(thang) {
    var j, len, prop, propIndex, ref2, type, value;
    this.props = [];
    if (!thang) {
      return;
    }
    this.thang = thang;
    ref2 = thang.trackedPropertiesKeys;
    for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
      prop = ref2[propIndex];
      type = thang.trackedPropertiesTypes[propIndex];
      value = thang[prop];
      if (type === 'Vector') {
        this.props.push(value != null ? value.copy() : void 0);
      } else if (type === 'object' || type === 'array') {
        this.props.push(clone(value, true));
      } else {
        this.props.push(value);
      }
    }
  }

  ThangState.prototype.getStoredProp = function(propIndex, type, storage) {
    var specialKey, value, valueString;
    if (!type) {
      type = this.trackedPropertyTypes[propIndex];
      storage = this.trackedPropertyValues[propIndex];
    }
    if (type === 'Vector') {
      value = new Vector(storage[3 * this.frameIndex], storage[3 * this.frameIndex + 1], storage[3 * this.frameIndex + 2]);
    } else if (type === 'string') {
      specialKey = storage[this.frameIndex];
      value = this.specialKeysToValues[specialKey];
    } else if (type === 'Thang') {
      specialKey = storage[this.frameIndex];
      value = this.thang.world.getThangByID(this.specialKeysToValues[specialKey]);
    } else if (type === 'array') {
      specialKey = storage[this.frameIndex];
      valueString = this.specialKeysToValues[specialKey];
      if (valueString && valueString.length > 1) {
        value = valueString.substring(1, valueString.length - 1).split('\x1E');
      } else {
        value = [];
      }
    } else {
      value = storage[this.frameIndex];
    }
    return value;
  };

  ThangState.prototype.getStateForProp = function(prop) {
    var initialPropIndex, propIndex, value;
    propIndex = this.trackedPropertyKeys.indexOf(prop);
    if (propIndex === -1) {
      initialPropIndex = this.thang.unusedTrackedPropertyKeys.indexOf(prop);
      if (initialPropIndex === -1) {
        return null;
      }
      return this.thang.unusedTrackedPropertyValues[initialPropIndex];
    }
    value = this.props[propIndex];
    if (value !== void 0 || this.hasRestored) {
      return value;
    }
    return this.props[propIndex] = this.getStoredProp(propIndex);
  };

  ThangState.prototype.restore = function() {
    var j, k, l, len, len1, len2, len3, m, prop, propIndex, props, ref2, ref3, ref4, ref5, storage, type;
    if (this.thang._state === this && !this.thang.partialState) {
      return this;
    }
    if (!this.hasRestored) {
      ref2 = this.thang.unusedTrackedPropertyKeys;
      for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
        prop = ref2[propIndex];
        if (this.trackedPropertyKeys.indexOf(prop) === -1) {
          this.thang[prop] = this.thang.unusedTrackedPropertyValues[propIndex];
        }
      }
      props = [];
      ref3 = this.trackedPropertyKeys;
      for (propIndex = k = 0, len1 = ref3.length; k < len1; propIndex = ++k) {
        prop = ref3[propIndex];
        type = this.trackedPropertyTypes[propIndex];
        storage = this.trackedPropertyValues[propIndex];
        props.push(this.thang[prop] = this.getStoredProp(propIndex, type, storage));
      }
      this.props = props;
      this.trackedPropertyTypes = this.trackedPropertyValues = this.specialKeysToValues = null;
      this.hasRestored = true;
    } else {
      ref4 = this.thang.unusedTrackedPropertyKeys;
      for (propIndex = l = 0, len2 = ref4.length; l < len2; propIndex = ++l) {
        prop = ref4[propIndex];
        if (this.trackedPropertyKeys.indexOf(prop) === -1) {
          this.thang[prop] = this.thang.unusedTrackedPropertyValues[propIndex];
        }
      }
      ref5 = this.trackedPropertyKeys;
      for (propIndex = m = 0, len3 = ref5.length; m < len3; propIndex = ++m) {
        prop = ref5[propIndex];
        this.thang[prop] = this.props[propIndex];
      }
    }
    this.thang.partialState = false;
    this.thang.stateChanged = true;
    return this;
  };

  ThangState.prototype.restorePartial = function(ratio) {
    var inverse, j, len, prop, propIndex, ref2, storage, type, value;
    inverse = 1 - ratio;
    ref2 = this.trackedPropertyKeys;
    for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
      prop = ref2[propIndex];
      if (!(prop === 'pos' || prop === 'rotation')) {
        continue;
      }
      if (this.hasRestored) {
        value = this.props[propIndex];
      } else {
        type = this.trackedPropertyTypes[propIndex];
        storage = this.trackedPropertyValues[propIndex];
        value = this.getStoredProp(propIndex, type, storage);
      }
      if (prop === 'pos') {
        if ((this.thang.teleport && this.thang.pos.distanceSquared(value) > 900) || (this.thang.pos.x === 0 && this.thang.pos.y === 0)) {
          this.thang.pos = value;
        } else {
          this.thang.pos = this.thang.pos.copy();
          this.thang.pos.x = inverse * this.thang.pos.x + ratio * value.x;
          this.thang.pos.y = inverse * this.thang.pos.y + ratio * value.y;
          this.thang.pos.z = inverse * this.thang.pos.z + ratio * value.z;
        }
      } else if (prop === 'rotation') {
        this.thang.rotation = inverse * this.thang.rotation + ratio * value;
      }
      this.thang.partialState = true;
    }
    this.thang.stateChanged = true;
    return this;
  };

  ThangState.prototype.serialize = function(frameIndex, trackedPropertyIndices, trackedPropertyTypes, trackedPropertyValues, specialValuesToKeys, specialKeysToValues) {
    var element, j, k, len, len1, newPropIndex, originalPropIndex, specialKey, storage, stringPieces, type, value;
    for (newPropIndex = j = 0, len = trackedPropertyTypes.length; j < len; newPropIndex = ++j) {
      type = trackedPropertyTypes[newPropIndex];
      originalPropIndex = trackedPropertyIndices[newPropIndex];
      storage = trackedPropertyValues[newPropIndex];
      value = this.props[originalPropIndex];
      if (value) {
        if (type === 'Vector') {
          storage[3 * frameIndex] = value.x;
          storage[3 * frameIndex + 1] = value.y;
          storage[3 * frameIndex + 2] = value.z;
        } else if (type === 'string') {
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else if (type === 'Thang') {
          value = value.id;
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else if (type === 'array') {
          stringPieces = ['\x1D'];
          for (k = 0, len1 = value.length; k < len1; k++) {
            element = value[k];
            if (element && element.id) {
              element = element.id;
            }
            stringPieces.push(element, '\x1E');
          }
          value = stringPieces.join('');
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else {
          storage[frameIndex] = value;
        }
      }
    }
    return null;
  };

  ThangState.deserialize = function(world, frameIndex, thang, trackedPropertyKeys, trackedPropertyTypes, trackedPropertyValues, specialKeysToValues) {
    var ts;
    ts = new ThangState;
    ts.thang = thang;
    ts.frameIndex = frameIndex;
    ts.trackedPropertyKeys = trackedPropertyKeys;
    ts.trackedPropertyTypes = trackedPropertyTypes;
    ts.trackedPropertyValues = trackedPropertyValues;
    ts.specialKeysToValues = specialKeysToValues;
    return ts;
  };

  ThangState.transferableBytesNeededForType = function(type, nFrames) {
    var bytes;
    bytes = (function() {
      switch (type) {
        case 'boolean':
          return 1;
        case 'number':
          return bytesPerFloat;
        case 'Vector':
          return bytesPerFloat * 3;
        case 'string':
          return 4;
        case 'Thang':
          return 4;
        case 'array':
          return 4;
        default:
          return 0;
      }
    })();
    return bytesPerFloat * Math.ceil(nFrames * bytes / bytesPerFloat);
  };

  ThangState.createArrayForType = function(type, nFrames, buffer, offset) {
    var bytes, storage;
    bytes = this.transferableBytesNeededForType(type, nFrames);
    storage = (function() {
      switch (type) {
        case 'boolean':
          return new Uint8Array(buffer, offset, nFrames);
        case 'number':
          return new FloatArrayType(buffer, offset, nFrames);
        case 'Vector':
          return new FloatArrayType(buffer, offset, nFrames * 3);
        case 'string':
          return new Uint32Array(buffer, offset, nFrames);
        case 'Thang':
          return new Uint32Array(buffer, offset, nFrames);
        case 'array':
          return new Uint32Array(buffer, offset, nFrames);
        default:
          return [];
      }
    })();
    return [storage, bytes];
  };

  return ThangState;

})();

if (!typedArraySupport) {
  ThangState.createArrayForType = function(type, nFrames, buffer, offset) {
    var bytes, elementsPerFrame, i, storage;
    bytes = this.transferableBytesNeededForType(type, nFrames);
    elementsPerFrame = type === 'Vector' ? 3 : 1;
    storage = (function() {
      var j, ref2, results;
      results = [];
      for (i = j = 0, ref2 = nFrames * elementsPerFrame; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
        results.push(0);
      }
      return results;
    })();
    return [storage, bytes];
  };
}
});

;require.register("lib/world/vector", function(exports, require, module) {
var Vector;

Vector = (function() {
  var fn, fn1, i, j, len, len1, name, ref, ref1;

  Vector.className = 'Vector';

  ref = ['add', 'subtract', 'multiply', 'divide', 'limit', 'normalize', 'rotate'];
  fn = function(name) {
    return Vector[name] = function(a, b, useZ) {
      return a.copy()[name](b, useZ);
    };
  };
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    fn(name);
  }

  ref1 = ['magnitude', 'heading', 'distance', 'dot', 'equals', 'copy', 'distanceSquared'];
  fn1 = function(name) {
    return Vector[name] = function(a, b, useZ) {
      return a[name](b, useZ);
    };
  };
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    name = ref1[j];
    fn1(name);
  }

  Vector.prototype.isVector = true;

  Vector.prototype.apiProperties = ['x', 'y', 'z', 'magnitude', 'heading', 'distance', 'dot', 'equals', 'copy', 'distanceSquared', 'add', 'subtract', 'multiply', 'divide', 'limit', 'normalize', 'rotate'];

  function Vector(x, y, z) {
    var ref2;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    if (!(this instanceof Vector)) {
      return new Vector(x, y, z);
    }
    ref2 = [x, y, z], this.x = ref2[0], this.y = ref2[1], this.z = ref2[2];
  }

  Vector.prototype.copy = function() {
    return new Vector(this.x, this.y, this.z);
  };

  Vector.prototype.normalize = function(useZ) {
    var m;
    m = this.magnitude(useZ);
    if (m > 0) {
      this.divide(m, useZ);
    }
    return this;
  };

  Vector.prototype.esper_normalize = function(useZ) {
    return this.copy().normalize(useZ);
  };

  Vector.prototype.limit = function(max) {
    if (this.magnitude() > max) {
      this.normalize();
      return this.multiply(max);
    } else {
      return this;
    }
  };

  Vector.prototype.esper_limit = function(max) {
    return this.copy().limit(max);
  };

  Vector.prototype.subtract = function(other, useZ) {
    this.x -= other.x;
    this.y -= other.y;
    if (useZ) {
      this.z -= other.z;
    }
    return this;
  };

  Vector.prototype.esper_subtract = function(other, useZ) {
    return this.copy().subtract(other, useZ);
  };

  Vector.prototype.add = function(other, useZ) {
    this.x += other.x;
    this.y += other.y;
    if (useZ) {
      this.z += other.z;
    }
    return this;
  };

  Vector.prototype.esper_add = function(other, useZ) {
    return this.copy().add(other, useZ);
  };

  Vector.prototype.divide = function(n, useZ) {
    var ref2;
    ref2 = [this.x / n, this.y / n], this.x = ref2[0], this.y = ref2[1];
    if (useZ) {
      this.z = this.z / n;
    }
    return this;
  };

  Vector.prototype.esper_divide = function(n, useZ) {
    return this.copy().divide(n, useZ);
  };

  Vector.prototype.multiply = function(n, useZ) {
    var ref2;
    ref2 = [this.x * n, this.y * n], this.x = ref2[0], this.y = ref2[1];
    if (useZ) {
      this.z = this.z * n;
    }
    return this;
  };

  Vector.prototype.esper_multiply = function(n, useZ) {
    return this.copy().multiply(n, useZ);
  };

  Vector.prototype.rotate = function(theta) {
    var ref2;
    if (!theta) {
      return this;
    }
    ref2 = [Math.cos(theta) * this.x - Math.sin(theta) * this.y, Math.sin(theta) * this.x + Math.cos(theta) * this.y], this.x = ref2[0], this.y = ref2[1];
    return this;
  };

  Vector.prototype.esper_rotate = function(theta) {
    return this.copy().rotate(theta);
  };

  Vector.prototype.magnitude = function(useZ) {
    var sum;
    sum = this.x * this.x + this.y * this.y;
    if (useZ) {
      sum += this.z * this.z;
    }
    return Math.sqrt(sum);
  };

  Vector.prototype.magnitudeSquared = function(useZ) {
    var sum;
    sum = this.x * this.x + this.y * this.y;
    if (useZ) {
      sum += this.z * this.z;
    }
    return sum;
  };

  Vector.prototype.heading = function() {
    return -1 * Math.atan2(-1 * this.y, this.x);
  };

  Vector.prototype.distance = function(other, useZ) {
    var dx, dy, dz, sum;
    dx = this.x - other.x;
    dy = this.y - other.y;
    sum = dx * dx + dy * dy;
    if (useZ) {
      dz = this.z - other.z;
      sum += dz * dz;
    }
    return Math.sqrt(sum);
  };

  Vector.prototype.distanceSquared = function(other, useZ) {
    var dx, dy, dz, sum;
    dx = this.x - other.x;
    dy = this.y - other.y;
    sum = dx * dx + dy * dy;
    if (useZ) {
      dz = this.z - other.z;
      sum += dz * dz;
    }
    return sum;
  };

  Vector.prototype.dot = function(other, useZ) {
    var sum;
    sum = this.x * other.x + this.y * other.y;
    if (useZ) {
      sum += this.z * other.z;
    }
    return sum;
  };

  Vector.prototype.projectOnto = function(other, useZ) {
    return other.copy().multiply(this.dot(other, useZ), useZ);
  };

  Vector.prototype.isZero = function(useZ) {
    var result;
    result = this.x === 0 && this.y === 0;
    if (useZ) {
      result = result && this.z === 0;
    }
    return result;
  };

  Vector.prototype.equals = function(other, useZ) {
    var result;
    result = other && this.x === other.x && this.y === other.y;
    if (useZ) {
      result = result && this.z === other.z;
    }
    return result;
  };

  Vector.prototype.invalid = function() {
    return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.z === Infinity || isNaN(this.z);
  };

  Vector.prototype.toString = function(precision) {
    if (precision == null) {
      precision = 2;
    }
    return "{x: " + (this.x.toFixed(precision)) + ", y: " + (this.y.toFixed(precision)) + ", z: " + (this.z.toFixed(precision)) + "}";
  };

  Vector.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      x: this.x,
      y: this.y,
      z: this.z
    };
  };

  Vector.deserialize = function(o, world, classMap) {
    return new Vector(o.x, o.y, o.z);
  };

  Vector.prototype.serializeForAether = function() {
    return this.serialize();
  };

  Vector.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return Vector;

})();

module.exports = Vector;
});

;require.register("lib/world/world", function(exports, require, module) {
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

;require.register("lib/world/world_frame", function(exports, require, module) {
var ThangState, WorldFrame;

ThangState = require('./thang_state');

module.exports = WorldFrame = (function() {
  WorldFrame.className = 'WorldFrame';

  function WorldFrame(world1, time) {
    this.world = world1;
    this.time = time != null ? time : 0;
    this.thangStateMap = {};
    if (this.world) {
      this.setState();
    }
  }

  WorldFrame.prototype.getNextFrame = function() {
    var j, len, nextFrame, nextTime, ref, system;
    nextTime = this.time + this.world.dt;
    if (nextTime > this.world.lifespan && !this.world.indefiniteLength) {
      return null;
    }
    this.hash = this.world.rand.seed;
    ref = this.world.systems;
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      this.hash += system.update();
    }
    nextFrame = new WorldFrame(this.world, nextTime);
    return nextFrame;
  };

  WorldFrame.prototype.setState = function() {
    var j, len, ref, results, thang;
    ref = this.world.thangs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (!thang.stateless) {
        results.push(this.thangStateMap[thang.id] = thang.getState());
      }
    }
    return results;
  };

  WorldFrame.prototype.restoreState = function() {
    var j, len, ref, ref1, results, thang, thangID, thangState;
    ref = this.thangStateMap;
    for (thangID in ref) {
      thangState = ref[thangID];
      thangState.restore();
    }
    ref1 = this.world.thangs;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      thang = ref1[j];
      if (!this.thangStateMap[thang.id] && !thang.stateless) {
        results.push(thang.exists = false);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  WorldFrame.prototype.restorePartialState = function(ratio) {
    var ref, results, thangID, thangState;
    ref = this.thangStateMap;
    results = [];
    for (thangID in ref) {
      thangState = ref[thangID];
      results.push(thangState.restorePartial(ratio));
    }
    return results;
  };

  WorldFrame.prototype.restoreStateForThang = function(thang) {
    var thangState;
    thangState = this.thangStateMap[thang.id];
    if (!thangState) {
      if (!thang.stateless) {
        thang.exists = false;
      }
      return;
    }
    return thangState.restore();
  };

  WorldFrame.prototype.clearEvents = function() {
    var j, len, ref, results, thang;
    ref = this.world.thangs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      results.push(thang.currentEvents = []);
    }
    return results;
  };

  WorldFrame.prototype.toString = function() {
    var i, j, k, l, len, map, rect, ref, ref1, ref2, ref3, ref4, symbols, thang, x, xs, y;
    map = (function() {
      var j, ref, results;
      results = [];
      for (y = j = 0, ref = this.world.height; 0 <= ref ? j <= ref : j >= ref; y = 0 <= ref ? ++j : --j) {
        results.push((function() {
          var k, ref1, results1;
          results1 = [];
          for (x = k = 0, ref1 = this.world.width; 0 <= ref1 ? k <= ref1 : k >= ref1; x = 0 <= ref1 ? ++k : --k) {
            results1.push(' ');
          }
          return results1;
        }).call(this));
      }
      return results;
    }).call(this);
    symbols = '.ox@dfga[]/D';
    ref = this.world.thangs;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      thang = ref[i];
      if (!thang.rectangle) {
        continue;
      }
      rect = thang.rectangle().axisAlignedBoundingBox();
      for (y = k = ref1 = Math.floor(rect.y - rect.height / 2), ref2 = Math.ceil(rect.y + rect.height / 2); ref1 <= ref2 ? k < ref2 : k > ref2; y = ref1 <= ref2 ? ++k : --k) {
        for (x = l = ref3 = Math.floor(rect.x - rect.width / 2), ref4 = Math.ceil(rect.x + rect.width / 2); ref3 <= ref4 ? l < ref4 : l > ref4; x = ref3 <= ref4 ? ++l : --l) {
          if ((0 <= y && y < this.world.height) && (0 <= x && x < this.world.width)) {
            map[y][x] = symbols[i % symbols.length];
          }
        }
      }
    }
    return this.time + '\n' + ((function() {
      var len1, m, results;
      results = [];
      for (m = 0, len1 = map.length; m < len1; m++) {
        xs = map[m];
        results.push(xs.join(' '));
      }
      return results;
    })()).join('\n') + '\n';
  };

  WorldFrame.prototype.serialize = function(frameIndex, trackedPropertiesThangIDs, trackedPropertiesPerThangIndices, trackedPropertiesPerThangTypes, trackedPropertiesPerThangValues, specialValuesToKeys, specialKeysToValues) {
    var j, len, thangID, thangIndex, thangState;
    for (thangIndex = j = 0, len = trackedPropertiesThangIDs.length; j < len; thangIndex = ++j) {
      thangID = trackedPropertiesThangIDs[thangIndex];
      thangState = this.thangStateMap[thangID];
      if (thangState) {
        thangState.serialize(frameIndex, trackedPropertiesPerThangIndices[thangIndex], trackedPropertiesPerThangTypes[thangIndex], trackedPropertiesPerThangValues[thangIndex], specialValuesToKeys, specialKeysToValues);
      }
    }
    return this.hash;
  };

  WorldFrame.deserialize = function(world, frameIndex, trackedPropertiesThangIDs, trackedPropertiesThangs, trackedPropertiesPerThangKeys, trackedPropertiesPerThangTypes, trackedPropertiesPerThangValues, specialKeysToValues, hash, age) {
    var j, len, thangID, thangIndex, wf;
    wf = new WorldFrame(null, age);
    wf.world = world;
    wf.hash = hash;
    for (thangIndex = j = 0, len = trackedPropertiesThangIDs.length; j < len; thangIndex = ++j) {
      thangID = trackedPropertiesThangIDs[thangIndex];
      wf.thangStateMap[thangID] = ThangState.deserialize(world, frameIndex, trackedPropertiesThangs[thangIndex], trackedPropertiesPerThangKeys[thangIndex], trackedPropertiesPerThangTypes[thangIndex], trackedPropertiesPerThangValues[thangIndex], specialKeysToValues);
    }
    return wf;
  };

  return WorldFrame;

})();
});

;require.register("lib/world/world_script_note", function(exports, require, module) {
var WorldScriptNote, clone, scriptMatchesEventPrereqs;

clone = require('./world_utils').clone;

scriptMatchesEventPrereqs = require('./script_event_prereqs').scriptMatchesEventPrereqs;

module.exports = WorldScriptNote = (function() {
  WorldScriptNote.className = 'WorldScriptNote';

  function WorldScriptNote(script, event, world) {
    this.event = event;
    if (script == null) {
      return;
    }
    this.invalid = true;
    if (!scriptMatchesEventPrereqs(script, this.event)) {
      return;
    }
    this.invalid = false;
    this.channel = script.channel;
    if (this.event == null) {
      this.event = {};
    }
    this.event.replacedNoteChain = script.noteChain;
  }

  WorldScriptNote.prototype.serialize = function() {
    var i, j, key, len, o, ref, subval, value;
    o = {
      channel: this.channel,
      event: {}
    };
    ref = this.event;
    for (key in ref) {
      value = ref[key];
      if (value != null ? value.isThang : void 0) {
        value = {
          isThang: true,
          id: value.id
        };
      } else if (_.isArray(value)) {
        for (i = j = 0, len = value.length; j < len; i = ++j) {
          subval = value[i];
          if (subval != null ? subval.isThang : void 0) {
            value[i] = {
              isThang: true,
              id: subval.id
            };
          }
        }
      }
      o.event[key] = value;
    }
    return o;
  };

  WorldScriptNote.deserialize = function(o, world, classMap) {
    var i, j, key, len, ref, scriptNote, subval, value;
    scriptNote = new WorldScriptNote;
    scriptNote.channel = o.channel;
    scriptNote.event = {};
    ref = o.event;
    for (key in ref) {
      value = ref[key];
      if ((value != null) && typeof value === 'object' && value.isThang) {
        value = world.getThangByID(value.id);
      } else if (_.isArray(value)) {
        for (i = j = 0, len = value.length; j < len; i = ++j) {
          subval = value[i];
          if ((subval != null) && typeof subval === 'object' && subval.isThang) {
            value[i] = world.getThangByID(subval.id);
          }
        }
      } else if ((value != null) && typeof value === 'object' && value.CN) {
        value = classMap[value.CN].deserialize(value, world, classMap);
      }
      scriptNote.event[key] = value;
    }
    return scriptNote;
  };

  return WorldScriptNote;

})();
});

;require.register("lib/world/world_utils", function(exports, require, module) {
var ArrayBufferView, Ellipse, Grid, LineSegment, Rectangle, Vector, addRect, clone, consolidateThangs, dissectRectangles, downTheChain, occ, occCol, ref, someArray, typedArraySupport;

Vector = require('./vector');

Rectangle = require('./rectangle');

Ellipse = require('./ellipse');

LineSegment = require('./line_segment');

Grid = require('./Grid');

module.exports.typedArraySupport = typedArraySupport = typeof Float32Array !== "undefined" && Float32Array !== null;

if (typeof ArrayBufferView === "undefined" || ArrayBufferView === null) {
  if (typedArraySupport) {
    someArray = new Uint8Array(0);
    if (someArray.__proto__) {
      ArrayBufferView = someArray.__proto__.__proto__.constructor;
    } else {
      ArrayBufferView = Object.getPrototypeOf(Object.getPrototypeOf(someArray)).constructor;
    }
  } else {
    ArrayBufferView = null;
  }
}

module.exports.clone = clone = function(obj, skipThangs) {
  var flags, key, newInstance;
  if (skipThangs == null) {
    skipThangs = false;
  }
  if ((obj == null) || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    flags = '';
    if (obj.global != null) {
      flags += 'g';
    }
    if (obj.ignoreCase != null) {
      flags += 'i';
    }
    if (obj.multiline != null) {
      flags += 'm';
    }
    if (obj.sticky != null) {
      flags += 'y';
    }
    return new RegExp(obj.source, flags);
  }
  if ((obj instanceof Vector) || (obj instanceof Rectangle) || (obj instanceof Ellipse) || (obj instanceof LineSegment)) {
    return obj.copy();
  }
  if (skipThangs && obj.isThang) {
    return obj;
  }
  if (_.isArray(obj)) {
    return obj.slice();
  }
  if (ArrayBufferView && obj instanceof ArrayBufferView) {
    return new obj.constructor(obj);
  }
  newInstance = new obj.constructor();
  for (key in obj) {
    newInstance[key] = clone(obj[key], skipThangs);
  }
  return newInstance;
};

module.exports.downTheChain = downTheChain = function(obj, keyChain, newValue) {
  var value;
  if (newValue == null) {
    newValue = void 0;
  }
  if (!obj) {
    return null;
  }
  if (!_.isArray(keyChain)) {
    return obj[keyChain];
  }
  value = obj;
  while (keyChain.length && value) {
    if (newValue !== void 0 && keyChain.length === 1) {
      value[keyChain[0]] = newValue;
      return newValue;
    }
    value = value[keyChain[0]];
    keyChain = keyChain.slice(1);
  }
  return value;
};

module.exports.now = ((typeof window !== "undefined" && window !== null ? (ref = window.performance) != null ? ref.now : void 0 : void 0) != null ? (function() {
  return window.performance.now();
}) : (function() {
  return new Date();
}));

module.exports.consolidateThangs = consolidateThangs = function(thangs) {
  var addStructuralThang, bottom, bottommost, debug, dissection, grid, height, isStructural, left, leftmost, padding, rightmost, structural, topmost, width;
  debug = false;
  isStructural = function(t) {
    var ref1;
    return t.stateless && t.collides && t.collisionCategory === 'obstacles' && ((ref1 = t.shape) === 'box' || ref1 === 'sheet') && t.spriteName !== 'Ice Wall' && t.restitution === 1.0 && /Wall/.test(t.spriteName) && (t.pos.x - t.width / 2 >= 0) && (t.pos.y - t.height / 2 >= 0);
  };
  structural = _.remove(thangs, isStructural);
  if (!structural.length) {
    return;
  }
  rightmost = _.max(structural, function(t) {
    return t.pos.x + t.width / 2;
  });
  topmost = _.max(structural, function(t) {
    return t.pos.y + t.height / 2;
  });
  leftmost = _.min(structural, function(t) {
    return t.pos.x - t.width / 2;
  });
  bottommost = _.min(structural, function(t) {
    return t.pos.y - t.height / 2;
  });
  if (debug) {
    console.log('got rightmost', rightmost.id, 'topmost', topmost.id, 'lefmostmost', leftmost.id, 'bottommost', bottommost.id, 'out of', structural.length, 'structural thangs');
  }
  left = Math.min(0, leftmost.pos.x - leftmost.width / 2);
  bottom = Math.min(0, bottommost.pos.y - bottommost.height / 2);
  if ((left < 0) || (bottom < 0)) {
    console.error('Negative structural Thangs aren\'t supported, sorry!');
  }
  left = 0;
  bottom = 0;
  width = rightmost.pos.x + rightmost.width / 2 - left;
  height = topmost.pos.y + topmost.height / 2 - bottom;
  padding = 0;
  if (debug) {
    console.log('got max width', width, 'height', height, 'left', left, 'bottom', bottom, 'of thangs', thangs.length, 'structural', structural.length);
  }
  grid = new Grid(structural, width, height, padding, left, bottom);
  dissection = [];
  addStructuralThang = function(rect) {
    var thang;
    thang = structural[dissection.length];
    if (!thang) {
      console.error('Hmm, our dissection has more Thangs than the original structural Thangs?', dissection.length);
    }
    thang.pos.x = rect.x;
    thang.pos.y = rect.y;
    thang.width = rect.width;
    thang.height = rect.height;
    thang.destroyBody();
    thang.createBodyDef();
    thang.createBody();
    return dissection.push(thang);
  };
  dissectRectangles(grid, addStructuralThang, false, debug);
  console.log('Turned', structural.length, 'structural Thangs into', dissection.length, 'dissecting Thangs.');
  thangs.push.apply(thangs, dissection);
  return structural.slice(dissection.length, structural.length);
};

module.exports.dissectRectangles = dissectRectangles = function(grid, rectangleCallback, wantEmpty, debug) {
  var h, i, len, rect, ref1, results, w, x, x2, y, y2;
  if (debug) {
    console.log(grid.toString());
  }
  ref1 = grid.rows(grid.left, grid.left + grid.width);
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    x = ref1[i];
    y = grid.clampColumn(grid.bottom);
    results.push((function() {
      var results1;
      results1 = [];
      while (y < grid.clampColumn(grid.bottom + grid.height)) {
        y2 = y;
        while (!occ(x, y2, grid, wantEmpty)) {
          ++y2;
        }
        if (y2 > y) {
          x2 = x + 1;
          while (!occCol(x2, y, y2, grid, wantEmpty)) {
            ++x2;
          }
          w = x2 - x;
          h = y2 - y;
          rect = addRect(grid, x, y, w, h, wantEmpty);
          rectangleCallback(rect);
          if (debug) {
            console.log(grid.toString());
          }
          y = y2;
        }
        results1.push(++y);
      }
      return results1;
    })());
  }
  return results;
};

occ = function(x, y, grid, wantEmpty) {
  var ref1;
  if (y > grid.bottom + grid.height || x > grid.left + grid.width) {
    return true;
  }
  if (!((ref1 = grid.grid[y]) != null ? ref1[x] : void 0)) {
    console.error('trying to check invalid coordinates', x, y, 'from grid', grid.bottom, grid.left, grid.width, grid.height);
  }
  return Boolean(grid.grid[y][x].length) === wantEmpty;
};

occCol = function(x, y1, y2, grid, wantEmpty) {
  var i, j, ref1, ref2;
  for (j = i = ref1 = y1, ref2 = y2; ref1 <= ref2 ? i < ref2 : i > ref2; j = ref1 <= ref2 ? ++i : --i) {
    if (occ(x, j, grid, wantEmpty)) {
      return true;
    }
  }
  return false;
};

addRect = function(grid, leftX, bottomY, width, height, wantEmpty) {
  var i, k, ref1, ref2, ref3, ref4, x, y;
  for (x = i = ref1 = leftX, ref2 = leftX + width; ref1 <= ref2 ? i < ref2 : i > ref2; x = ref1 <= ref2 ? ++i : --i) {
    for (y = k = ref3 = bottomY, ref4 = bottomY + height; ref3 <= ref4 ? k < ref4 : k > ref4; y = ref3 <= ref4 ? ++k : --k) {
      grid.grid[y][x] = wantEmpty ? [true] : [];
    }
  }
  return new Rectangle(leftX + width / 2, bottomY + height / 2, width, height);
};
});

;
//# sourceMappingURL=/javascripts/app/lib.js.map
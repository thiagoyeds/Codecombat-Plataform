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

;
//# sourceMappingURL=/javascripts/app/lib/Angel.js.map
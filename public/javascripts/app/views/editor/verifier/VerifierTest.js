require.register("views/editor/verifier/VerifierTest", function(exports, require, module) {
var CocoClass, GoalManager, God, LevelLoader, SuperModel, VerifierTest, createAetherOptions, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

SuperModel = require('models/SuperModel');

createAetherOptions = require('lib/aether_utils').createAetherOptions;

God = require('lib/God');

GoalManager = require('lib/world/GoalManager');

LevelLoader = require('lib/LevelLoader');

utils = require('core/utils');

module.exports = VerifierTest = (function(superClass) {
  extend(VerifierTest, superClass);

  function VerifierTest(levelID, updateCallback, supermodel, language, options) {
    this.levelID = levelID;
    this.updateCallback = updateCallback;
    this.supermodel = supermodel;
    this.language = language;
    this.options = options;
    this.cleanup = bind(this.cleanup, this);
    this.configureSession = bind(this.configureSession, this);
    this.onWorldNecessitiesLoaded = bind(this.onWorldNecessitiesLoaded, this);
    VerifierTest.__super__.constructor.call(this);
    if (this.supermodel == null) {
      this.supermodel = new SuperModel();
    }
    if (utils.getQueryVariable('dev') || this.options.devMode) {
      this.supermodel.shouldSaveBackups = function(model) {
        var ref;
        return (ref = model.constructor.className) === 'Level' || ref === 'LevelComponent' || ref === 'LevelSystem' || ref === 'ThangType';
      };
    }
    if (this.language == null) {
      this.language = 'python';
    }
    this.userCodeProblems = [];
    this.load();
  }

  VerifierTest.prototype.load = function() {
    this.loadStartTime = new Date();
    this.god = new God({
      maxAngels: 1,
      headless: true
    });
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      headless: true,
      fakeSessionConfig: {
        codeLanguage: this.language,
        callback: this.configureSession
      }
    });
    return this.listenToOnce(this.levelLoader, 'world-necessities-loaded', function() {
      return _.defer(this.onWorldNecessitiesLoaded);
    });
  };

  VerifierTest.prototype.onWorldNecessitiesLoaded = function() {
    this.grabLevelLoaderData();
    if (!this.solution) {
      this.error = 'No solution present...';
      this.state = 'no-solution';
      if (typeof this.updateCallback === "function") {
        this.updateCallback({
          test: this,
          state: 'no-solution'
        });
      }
      return;
    }
    me.team = this.team = 'humans';
    this.setupGod();
    this.initGoalManager();
    return this.register();
  };

  VerifierTest.prototype.configureSession = function(session, level) {
    var e, error, state;
    try {
      session.solution = _.find(level.getSolutions(), {
        language: session.get('codeLanguage')
      });
      session.set('heroConfig', session.solution.heroConfig);
      session.set('code', {
        'hero-placeholder': {
          plan: session.solution.source
        }
      });
      state = session.get('state');
      state.flagHistory = session.solution.flagHistory;
      state.realTimeInputEvents = session.solution.realTimeInputEvents;
      state.difficulty = session.solution.difficulty || 0;
      if (!_.isNumber(session.solution.seed)) {
        return session.solution.seed = void 0;
      }
    } catch (error) {
      e = error;
      this.state = 'error';
      return this.error = ("Could not load the session solution for " + (level.get('name')) + ": ") + e.toString() + "\n" + e.stack;
    }
  };

  VerifierTest.prototype.grabLevelLoaderData = function() {
    this.world = this.levelLoader.world;
    this.level = this.levelLoader.level;
    this.session = this.levelLoader.session;
    return this.solution = this.levelLoader.session.solution;
  };

  VerifierTest.prototype.setupGod = function() {
    this.god.setLevel(this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: null,
      headless: true,
      sessionless: false
    }));
    this.god.setLevelSessionIDs([this.session.id]);
    this.god.setWorldClassMap(this.world.classMap);
    this.god.lastFlagHistory = this.session.get('state').flagHistory;
    this.god.lastDifficulty = this.session.get('state').difficulty;
    this.god.lastFixedSeed = this.session.solution.seed;
    return this.god.lastSubmissionCount = 0;
  };

  VerifierTest.prototype.initGoalManager = function() {
    this.goalManager = new GoalManager(this.world, this.level.get('goals'), this.team);
    return this.god.setGoalManager(this.goalManager);
  };

  VerifierTest.prototype.register = function() {
    this.listenToOnce(this.god, 'infinite-loop', this.fail);
    this.listenToOnce(this.god, 'user-code-problem', this.onUserCodeProblem);
    this.listenToOnce(this.god, 'goals-calculated', this.processSingleGameResults);
    this.god.createWorld(this.session.generateSpellsObject());
    this.state = 'running';
    return this.reportResults();
  };

  VerifierTest.prototype.extractTestLogs = function() {
    var i, len, log, ref, ref1, ref2, ref3, ref4, ref5;
    this.testLogs = [];
    ref5 = (ref = (ref1 = this.god) != null ? (ref2 = ref1.angelsShare) != null ? (ref3 = ref2.busyAngels) != null ? (ref4 = ref3[0]) != null ? ref4.allLogs : void 0 : void 0 : void 0 : void 0) != null ? ref : [];
    for (i = 0, len = ref5.length; i < len; i++) {
      log = ref5[i];
      if (log.indexOf('[TEST]') === -1) {
        continue;
      }
      this.testLogs.push(log.replace(/\|.*?\| \[TEST\] /, ''));
    }
    return this.testLogs;
  };

  VerifierTest.prototype.reportResults = function() {
    return typeof this.updateCallback === "function" ? this.updateCallback({
      test: this,
      state: this.state,
      testLogs: this.extractTestLogs()
    }) : void 0;
  };

  VerifierTest.prototype.processSingleGameResults = function(e) {
    this.goals = e.goalStates;
    this.frames = e.totalFrames;
    this.lastFrameHash = e.lastFrameHash;
    this.simulationFrameRate = e.simulationFrameRate;
    this.state = 'complete';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.isSuccessful = function(careAboutFrames) {
    var k;
    if (careAboutFrames == null) {
      careAboutFrames = true;
    }
    if (this.solution == null) {
      return false;
    }
    if (!(this.frames === this.solution.frameCount || !careAboutFrames)) {
      return false;
    }
    if (this.simulationFrameRate < 30) {
      return false;
    }
    if (this.goals && this.solution.goals) {
      for (k in this.goals) {
        if (!this.solution.goals[k]) {
          continue;
        }
        if (this.solution.goals[k] !== this.goals[k].status) {
          return false;
        }
      }
    }
    return true;
  };

  VerifierTest.prototype.onUserCodeProblem = function(e) {
    console.warn("Found user code problem:", e);
    this.userCodeProblems.push(e.problem);
    return this.reportResults();
  };

  VerifierTest.prototype.onNonUserCodeProblem = function(e) {
    console.error("Found non-user-code problem:", e);
    this.error = "Failed due to non-user-code problem: " + (JSON.stringify(e));
    this.state = 'error';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.fail = function(e) {
    this.error = 'Failed due to infinite loop.';
    this.state = 'error';
    this.reportResults();
    return this.scheduleCleanup();
  };

  VerifierTest.prototype.scheduleCleanup = function() {
    return setTimeout(this.cleanup, 100);
  };

  VerifierTest.prototype.cleanup = function() {
    if (this.levelLoader) {
      this.stopListening(this.levelLoader);
      this.levelLoader.destroy();
    }
    if (this.god) {
      this.stopListening(this.god);
      this.god.destroy();
    }
    return this.world = null;
  };

  return VerifierTest;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/verifier/VerifierTest.js.map
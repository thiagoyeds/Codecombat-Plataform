require.register("lib/simulator/Simulator", function(exports, require, module) {
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

;
//# sourceMappingURL=/javascripts/app/lib/simulator/Simulator.js.map
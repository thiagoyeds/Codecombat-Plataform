require.register("lib/world/GoalManager", function(exports, require, module) {
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

;
//# sourceMappingURL=/javascripts/app/lib/world/GoalManager.js.map
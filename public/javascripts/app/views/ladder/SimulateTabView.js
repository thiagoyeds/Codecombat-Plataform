require.register("views/ladder/SimulateTabView", function(exports, require, module) {
var CocoClass, CocoView, SimulateTabView, Simulator, SimulatorsLeaderboardCollection, SimulatorsLeaderboardData, me,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

CocoClass = require('core/CocoClass');

SimulatorsLeaderboardCollection = require('collections/SimulatorsLeaderboardCollection');

Simulator = require('lib/simulator/Simulator');

me = require('core/auth').me;

module.exports = SimulateTabView = (function(superClass) {
  extend(SimulateTabView, superClass);

  function SimulateTabView() {
    this.refreshAndContinueSimulating = bind(this.refreshAndContinueSimulating, this);
    return SimulateTabView.__super__.constructor.apply(this, arguments);
  }

  SimulateTabView.prototype.id = 'simulate-tab-view';

  SimulateTabView.prototype.template = require('templates/play/ladder/simulate_tab');

  SimulateTabView.prototype.events = {
    'click #simulate-button': 'onSimulateButtonClick'
  };

  SimulateTabView.prototype.initialize = function() {
    this.simulatorsLeaderboardData = new SimulatorsLeaderboardData(me);
    this.simulatorsLeaderboardDataRes = this.supermodel.addModelResource(this.simulatorsLeaderboardData, 'top_simulators', {
      cache: false
    });
    this.simulatorsLeaderboardDataRes.load();
    require('vendor/aether-javascript');
    require('vendor/aether-python');
    require('vendor/aether-coffeescript');
    require('vendor/aether-lua');
    return require('vendor/aether-java');
  };

  SimulateTabView.prototype.onLoaded = function() {
    SimulateTabView.__super__.onLoaded.call(this);
    this.render();
    if ((document.location.hash === '#simulate' || this.options.level.isType('course-ladder')) && !this.simulator) {
      return this.startSimulating();
    }
  };

  SimulateTabView.prototype.afterRender = function() {
    return SimulateTabView.__super__.afterRender.call(this);
  };

  SimulateTabView.prototype.onSimulateButtonClick = function(e) {
    var ref;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Simulate Button Click');
    }
    return this.startSimulating();
  };

  SimulateTabView.prototype.startSimulating = function() {
    this.simulationPageRefreshTimeout = _.delay(this.refreshAndContinueSimulating, 30 * 60 * 1000);
    this.simulateNextGame();
    $('#simulate-button').prop('disabled', true);
    return $('#simulate-button').text('Simulating...');
  };

  SimulateTabView.prototype.refreshAndContinueSimulating = function() {
    document.location.hash = '#simulate';
    return document.location.reload();
  };

  SimulateTabView.prototype.simulateNextGame = function() {
    var fetchAndSimulateTaskOriginal;
    if (!this.simulator) {
      this.simulator = new Simulator({
        levelID: this.options.level.get('slug'),
        leagueID: this.options.leagueID
      });
      this.listenTo(this.simulator, 'statusUpdate', this.updateSimulationStatus);
      fetchAndSimulateTaskOriginal = this.simulator.fetchAndSimulateTask;
      this.simulator.fetchAndSimulateTask = (function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          if (_this.simulator.simulatedByYou >= 20) {
            console.log('------------------- Destroying  Simulator and making a new one -----------------');
            _this.simulator.destroy();
            _this.simulator = null;
            return _this.simulateNextGame();
          } else {
            return fetchAndSimulateTaskOriginal.apply(_this.simulator);
          }
        };
      })(this);
    }
    return this.simulator.fetchAndSimulateTask();
  };

  SimulateTabView.prototype.refresh = function() {
    var success;
    return;
    success = function(numberOfGamesInQueue) {
      return $('#games-in-queue').text(numberOfGamesInQueue);
    };
    return $.ajax('/queue/messagesInQueueCount', {
      cache: false,
      success: success
    });
  };

  SimulateTabView.prototype.updateSimulationStatus = function(simulationStatus, sessions) {
    var e, error, index, j, len, link, session;
    if (simulationStatus === 'Fetching simulation data!') {
      this.simulationMatchDescription = '';
      this.simulationSpectateLink = '';
    }
    this.simulationStatus = _.string.escapeHTML(simulationStatus);
    try {
      if (sessions != null) {
        this.simulationMatchDescription = '';
        this.simulationSpectateLink = "/play/spectate/" + (this.simulator.level.get('slug')) + "?";
        for (index = j = 0, len = sessions.length; j < len; index = ++j) {
          session = sessions[index];
          this.simulationMatchDescription += "" + (index ? ' vs ' : '') + (session.creatorName || 'Anonymous') + " (" + sessions[index].team + ")";
          this.simulationSpectateLink += "session-" + (index ? 'two' : 'one') + "=" + session.sessionID;
        }
        this.simulationMatchDescription += " on " + (this.simulator.level.get('name'));
      }
    } catch (error) {
      e = error;
      console.log("There was a problem with the named simulation status: " + e);
    }
    link = this.simulationSpectateLink ? "<a href=" + this.simulationSpectateLink + ">" + (_.string.escapeHTML(this.simulationMatchDescription)) + "</a>" : '';
    return $('#simulation-status-text').html("<h3>" + this.simulationStatus + "</h3>" + link);
  };

  SimulateTabView.prototype.destroy = function() {
    var ref;
    clearTimeout(this.simulationPageRefreshTimeout);
    if ((ref = this.simulator) != null) {
      ref.destroy();
    }
    return SimulateTabView.__super__.destroy.call(this);
  };

  return SimulateTabView;

})(CocoView);

SimulatorsLeaderboardData = (function(superClass) {
  extend(SimulatorsLeaderboardData, superClass);


  /*
  Consolidates what you need to load for a leaderboard into a single Backbone Model-like object.
   */

  function SimulatorsLeaderboardData(me1) {
    this.me = me1;
    this.onFail = bind(this.onFail, this);
    this.onLoad = bind(this.onLoad, this);
    SimulatorsLeaderboardData.__super__.constructor.call(this);
  }

  SimulatorsLeaderboardData.prototype.fetch = function() {
    var promises, queueSuccess, score, success;
    this.topSimulators = new SimulatorsLeaderboardCollection({
      order: -1,
      scoreOffset: -1,
      limit: 20
    });
    promises = [];
    promises.push(this.topSimulators.fetch());
    if (!this.me.get('anonymous')) {
      score = this.me.get('simulatedBy') || 0;
      queueSuccess = (function(_this) {
        return function(numberOfGamesInQueue1) {
          _this.numberOfGamesInQueue = numberOfGamesInQueue1;
        };
      })(this);
      promises.push($.ajax('/queue/messagesInQueueCount', {
        success: queueSuccess,
        cache: false
      }));
      this.playersAbove = new SimulatorsLeaderboardCollection({
        order: 1,
        scoreOffset: score,
        limit: 4
      });
      promises.push(this.playersAbove.fetch());
      if (score) {
        this.playersBelow = new SimulatorsLeaderboardCollection({
          order: -1,
          scoreOffset: score,
          limit: 4
        });
        promises.push(this.playersBelow.fetch());
      }
      success = (function(_this) {
        return function(myRank) {
          _this.myRank = myRank;
        };
      })(this);
      promises.push($.ajax("/db/user/me/simulator_leaderboard_rank?scoreOffset=" + score, {
        cache: false,
        success: success
      }));
    }
    this.promise = $.when.apply($, promises);
    this.promise.then(this.onLoad);
    this.promise.fail(this.onFail);
    return this.promise;
  };

  SimulatorsLeaderboardData.prototype.onLoad = function() {
    if (this.destroyed) {
      return;
    }
    this.loaded = true;
    return this.trigger('sync', this);
  };

  SimulatorsLeaderboardData.prototype.onFail = function(resource, jqxhr) {
    if (this.destroyed) {
      return;
    }
    return this.trigger('error', this, jqxhr);
  };

  SimulatorsLeaderboardData.prototype.inTopSimulators = function() {
    var ref, user;
    return ref = me.id, indexOf.call((function() {
      var j, len, ref1, results;
      ref1 = this.topSimulators.models;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        user = ref1[j];
        results.push(user.id);
      }
      return results;
    }).call(this), ref) >= 0;
  };

  SimulatorsLeaderboardData.prototype.nearbySimulators = function() {
    var above, i, j, l, len, ref, startRank, user;
    if (!((ref = this.playersAbove) != null ? ref.models : void 0)) {
      return [];
    }
    l = [];
    above = this.playersAbove.models;
    l = l.concat(above);
    l.reverse();
    l.push(this.me);
    if (this.playersBelow) {
      l = l.concat(this.playersBelow.models);
    }
    if (this.myRank) {
      startRank = this.myRank - 4;
      for (i = j = 0, len = l.length; j < len; i = ++j) {
        user = l[i];
        user.rank = startRank + i;
      }
    }
    return l;
  };

  SimulatorsLeaderboardData.prototype.allResources = function() {
    var r, resources;
    resources = [this.topSimulators, this.playersAbove, this.playersBelow];
    return (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = resources.length; j < len; j++) {
        r = resources[j];
        if (r) {
          results.push(r);
        }
      }
      return results;
    })();
  };

  return SimulatorsLeaderboardData;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/SimulateTabView.js.map
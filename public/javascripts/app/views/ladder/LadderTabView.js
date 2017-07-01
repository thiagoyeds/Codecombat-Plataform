require.register("views/ladder/LadderTabView", function(exports, require, module) {
var CocoClass, CocoCollection, CocoView, HIGHEST_SCORE, LadderTabView, LeaderboardCollection, LeaderboardData, Level, LevelSession, ModelModal, User, teamDataFromLevel,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

CocoClass = require('core/CocoClass');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

CocoCollection = require('collections/CocoCollection');

User = require('models/User');

LeaderboardCollection = require('collections/LeaderboardCollection');

teamDataFromLevel = require('./utils').teamDataFromLevel;

ModelModal = require('views/modal/ModelModal');

require('vendor/d3');

HIGHEST_SCORE = 1000000;

module.exports = LadderTabView = (function(superClass) {
  extend(LadderTabView, superClass);

  function LadderTabView() {
    this.onGPlusFriendSessionsLoaded = bind(this.onGPlusFriendSessionsLoaded, this);
    this.gplusFriendsLoaded = bind(this.gplusFriendsLoaded, this);
    this.onFacebookFriendSessionsLoaded = bind(this.onFacebookFriendSessionsLoaded, this);
    this.onFacebookFriendsLoaded = bind(this.onFacebookFriendsLoaded, this);
    return LadderTabView.__super__.constructor.apply(this, arguments);
  }

  LadderTabView.prototype.id = 'ladder-tab-view';

  LadderTabView.prototype.template = require('templates/play/ladder/ladder-tab-view');

  LadderTabView.prototype.events = {
    'click .connect-facebook': 'onConnectFacebook',
    'click .connect-google-plus': 'onConnectGPlus',
    'click .name-col-cell': 'onClickPlayerName',
    'click .spectate-cell': 'onClickSpectateCell',
    'click .load-more-ladder-entries': 'onLoadMoreLadderEntries'
  };

  LadderTabView.prototype.initialize = function(options, level1, sessions1) {
    this.level = level1;
    this.sessions = sessions1;
    this.teams = teamDataFromLevel(this.level);
    this.leaderboards = [];
    this.refreshLadder();
    return this.capitalize = _.string.capitalize;
  };

  LadderTabView.prototype.checkFriends = function() {
    return;
    if (this.checked || (!window.FB) || (!window.gapi)) {
      return;
    }
    this.checked = true;
    this.fbStatusRes = this.supermodel.addSomethingResource('facebook_status', 0);
    this.fbStatusRes.load();
    FB.getLoginStatus((function(_this) {
      return function(response) {
        if (_this.destroyed) {
          return;
        }
        _this.facebookStatus = response.status;
        _this.onFacebook = view.facebookStatus === 'connected';
        if (_this.onFacebook) {
          _this.loadFacebookFriends();
        }
        return _this.fbStatusRes.markLoaded();
      };
    })(this));
    if (application.gplusHandler.loggedIn === void 0) {
      this.listenToOnce(application.gplusHandler, 'checked-state', this.gplusSessionStateLoaded);
    } else {
      this.gplusSessionStateLoaded();
    }
    return this.socialNetworkRes.markLoaded();
  };

  LadderTabView.prototype.onConnectFacebook = function() {
    this.connecting = true;
    return FB.login();
  };

  LadderTabView.prototype.onConnectedWithFacebook = function() {
    if (this.connecting) {
      return location.reload();
    }
  };

  LadderTabView.prototype.loadFacebookFriends = function() {
    this.fbFriendRes = this.supermodel.addSomethingResource('facebook_friends', 0);
    this.fbFriendRes.load();
    return FB.api('/me/friends', this.onFacebookFriendsLoaded);
  };

  LadderTabView.prototype.onFacebookFriendsLoaded = function(response) {
    this.facebookData = response.data;
    this.loadFacebookFriendSessions();
    return this.fbFriendRes.markLoaded();
  };

  LadderTabView.prototype.loadFacebookFriendSessions = function() {
    var f, levelFrag, url;
    levelFrag = (this.level.get('original')) + "." + (this.level.get('version').major);
    url = "/db/level/" + levelFrag + "/leaderboard_facebook_friends";
    this.fbFriendSessionRes = this.supermodel.addRequestResource('facebook_friend_sessions', {
      url: url,
      data: {
        friendIDs: (function() {
          var j, len, ref, results;
          ref = this.facebookData;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            f = ref[j];
            results.push(f.id);
          }
          return results;
        }).call(this)
      },
      method: 'POST',
      success: this.onFacebookFriendSessionsLoaded
    });
    return this.fbFriendSessionRes.load();
  };

  LadderTabView.prototype.onFacebookFriendSessionsLoaded = function(result) {
    var friend, friendsMap, j, k, len, len1, ref;
    friendsMap = {};
    ref = this.facebookData;
    for (j = 0, len = ref.length; j < len; j++) {
      friend = ref[j];
      friendsMap[friend.id] = friend.name;
    }
    for (k = 0, len1 = result.length; k < len1; k++) {
      friend = result[k];
      friend.name = friendsMap[friend.facebookID];
      friend.otherTeam = friend.team === 'humans' ? 'ogres' : 'humans';
      friend.imageSource = "http://graph.facebook.com/" + friend.facebookID + "/picture";
    }
    this.facebookFriendSessions = result;
    this.friends = this.consolidateFriends();
    return this.render();
  };

  LadderTabView.prototype.onConnectGPlus = function() {
    this.connecting = true;
    this.listenToOnce(application.gplusHandler, 'logged-in', this.onConnectedWithGPlus);
    return application.gplusHandler.reauthorize();
  };

  LadderTabView.prototype.onConnectedWithGPlus = function() {
    if (this.connecting) {
      return location.reload();
    }
  };

  LadderTabView.prototype.gplusSessionStateLoaded = function() {
    if (application.gplusHandler.loggedIn) {
      this.onGPlus = true;
      this.gpFriendRes = this.supermodel.addSomethingResource('gplus_friends', 0);
      this.gpFriendRes.load();
      return application.gplusHandler.loadFriends(this.gplusFriendsLoaded);
    }
  };

  LadderTabView.prototype.gplusFriendsLoaded = function(friends) {
    this.gplusData = friends.items;
    this.loadGPlusFriendSessions();
    return this.gpFriendRes.markLoaded();
  };

  LadderTabView.prototype.loadGPlusFriendSessions = function() {
    var f, levelFrag, url;
    levelFrag = (this.level.get('original')) + "." + (this.level.get('version').major);
    url = "/db/level/" + levelFrag + "/leaderboard_gplus_friends";
    this.gpFriendSessionRes = this.supermodel.addRequestResource('gplus_friend_sessions', {
      url: url,
      data: {
        friendIDs: (function() {
          var j, len, ref, results;
          ref = this.gplusData;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            f = ref[j];
            results.push(f.id);
          }
          return results;
        }).call(this)
      },
      method: 'POST',
      success: this.onGPlusFriendSessionsLoaded
    });
    return this.gpFriendSessionRes.load();
  };

  LadderTabView.prototype.onGPlusFriendSessionsLoaded = function(result) {
    var friend, friendsMap, j, k, len, len1, ref;
    friendsMap = {};
    ref = this.gplusData;
    for (j = 0, len = ref.length; j < len; j++) {
      friend = ref[j];
      friendsMap[friend.id] = friend;
    }
    for (k = 0, len1 = result.length; k < len1; k++) {
      friend = result[k];
      friend.name = friendsMap[friend.gplusID].displayName;
      friend.otherTeam = friend.team === 'humans' ? 'ogres' : 'humans';
      friend.imageSource = friendsMap[friend.gplusID].image.url;
    }
    this.gplusFriendSessions = result;
    this.friends = this.consolidateFriends();
    return this.render();
  };

  LadderTabView.prototype.refreshLadder = function() {
    var j, len, oldLeaderboard, ref, results, team, teamSession;
    if (!this.options.league && (new Date() - 2 * 60 * 1000 < this.lastRefreshTime)) {
      return;
    }
    this.lastRefreshTime = new Date();
    this.supermodel.resetProgress();
    if (this.ladderLimit == null) {
      this.ladderLimit = parseInt(this.getQueryVariable('top_players', this.options.league ? 100 : 20));
    }
    ref = this.teams;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      team = ref[j];
      if (oldLeaderboard = this.leaderboards[team.id]) {
        this.supermodel.removeModelResource(oldLeaderboard);
        oldLeaderboard.destroy();
      }
      teamSession = _.find(this.sessions.models, function(session) {
        return session.get('team') === team.id;
      });
      this.leaderboards[team.id] = new LeaderboardData(this.level, team.id, teamSession, this.ladderLimit, this.options.league);
      team.leaderboard = this.leaderboards[team.id];
      this.leaderboardRes = this.supermodel.addModelResource(this.leaderboards[team.id], 'leaderboard', {
        cache: false
      }, 3);
      results.push(this.leaderboardRes.load());
    }
    return results;
  };

  LadderTabView.prototype.render = function() {
    LadderTabView.__super__.render.call(this);
    return this.$el.find('.histogram-display').each((function(_this) {
      return function(i, el) {
        var histogramData, histogramWrapper, level, team, url;
        histogramWrapper = $(el);
        team = _.find(_this.teams, {
          name: histogramWrapper.data('team-name')
        });
        histogramData = null;
        return $.when(level = (_this.level.get('original')) + "." + (_this.level.get('version').major), url = "/db/level/" + level + "/histogram_data?team=" + (team.name.toLowerCase()), _this.options.league ? url += '&leagues.leagueID=' + _this.options.league.id : void 0, $.get(url, function(data) {
          return histogramData = data;
        })).then(function() {
          if (!_this.destroyed) {
            return _this.generateHistogram(histogramWrapper, histogramData, team.name.toLowerCase());
          }
        });
      };
    })(this));
  };

  LadderTabView.prototype.generateHistogram = function(histogramElement, histogramData, teamName) {
    var bar, barClass, data, formatCount, height, margin, maxX, message, minX, playerScore, rankClass, ref, scorebar, session, svg, width, x, xAxis, y;
    if ($('#' + histogramElement.attr('id')).has('svg').length) {
      return;
    }
    histogramData = histogramData.map(function(d) {
      return d * 100;
    });
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 15
    };
    width = 470 - margin.left - margin.right;
    height = 125 - margin.top - margin.bottom;
    formatCount = d3.format(',.0');
    minX = Math.floor(Math.min.apply(Math, histogramData) / 1000) * 1000;
    maxX = Math.ceil(Math.max.apply(Math, histogramData) / 1000) * 1000;
    x = d3.scale.linear().domain([minX, maxX]).range([0, width]);
    data = d3.layout.histogram().bins(x.ticks(20))(histogramData);
    y = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.y;
      })
    ]).range([height, 10]);
    xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(5).outerTickSize(0);
    svg = d3.select('#' + histogramElement.attr('id')).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
    barClass = 'bar';
    if (teamName.toLowerCase() === 'ogres') {
      barClass = 'ogres-bar';
    }
    if (teamName.toLowerCase() === 'humans') {
      barClass = 'humans-bar';
    }
    bar = svg.selectAll('.bar').data(data).enter().append('g').attr('class', barClass).attr('transform', function(d) {
      return "translate(" + (x(d.x)) + ", " + (y(d.y)) + ")";
    });
    bar.append('rect').attr('x', 1).attr('width', width / 20).attr('height', function(d) {
      return height - y(d.y);
    });
    if (session = this.leaderboards[teamName].session) {
      if (this.options.league) {
        playerScore = (((ref = _.find(session.get('leagues'), {
          leagueID: this.options.league.id
        })) != null ? ref.stats.totalScore : void 0) || 10) * 100;
      } else {
        playerScore = session.get('totalScore') * 100;
      }
      scorebar = svg.selectAll('.specialbar').data([playerScore]).enter().append('g').attr('class', 'specialbar').attr('transform', "translate(" + (x(playerScore)) + ", 0)");
      scorebar.append('rect').attr('x', 1).attr('width', 3).attr('height', height);
    }
    rankClass = 'rank-text';
    if (teamName.toLowerCase() === 'ogres') {
      rankClass = 'rank-text ogres-rank-text';
    }
    if (teamName.toLowerCase() === 'humans') {
      rankClass = 'rank-text humans-rank-text';
    }
    message = histogramData.length + " players";
    if (this.leaderboards[teamName].session != null) {
      if (this.options.league) {
        message = histogramData.length + " players in league";
      } else if (this.leaderboards[teamName].myRank <= histogramData.length) {
        message = "#" + this.leaderboards[teamName].myRank + " of " + histogramData.length;
        if (histogramData.length >= 100000) {
          message += "+";
        }
      } else {
        message = 'Rank your session!';
      }
    }
    svg.append('g').append('text').attr('class', rankClass).attr('y', 0).attr('text-anchor', 'end').attr('x', width).text(message);
    return svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + height + ')').call(xAxis);
  };

  LadderTabView.prototype.consolidateFriends = function() {
    var allFriendSessions, sessions;
    allFriendSessions = (this.facebookFriendSessions || []).concat(this.gplusFriendSessions || []);
    sessions = _.uniq(allFriendSessions, false, function(session) {
      return session._id;
    });
    if (this.options.league) {
      sessions = _.sortBy(sessions, function(session) {
        var ref, ref1;
        return (ref = (ref1 = _.find(session.leagues, {
          leagueID: this.options.league.id
        })) != null ? ref1.stats.totalScore : void 0) != null ? ref : session.totalScore / 2;
      });
    } else {
      sessions = _.sortBy(sessions, 'totalScore');
    }
    sessions.reverse();
    return sessions;
  };

  LadderTabView.prototype.onClickPlayerName = function(e) {
    var player, row, session;
    if (!me.isAdmin()) {
      return;
    }
    row = $(e.target).parent();
    player = new User({
      _id: row.data('player-id')
    });
    session = new LevelSession({
      _id: row.data('session-id')
    });
    return this.openModalView(new ModelModal({
      models: [session, player]
    }));
  };

  LadderTabView.prototype.onClickSpectateCell = function(e) {
    var cell, row, sessionID, table, teamID, wasSelected;
    cell = $(e.target).closest('.spectate-cell');
    row = cell.parent();
    table = row.closest('table');
    wasSelected = cell.hasClass('selected');
    table.find('.spectate-cell.selected').removeClass('selected');
    cell = $(e.target).closest('.spectate-cell').toggleClass('selected', !wasSelected);
    sessionID = row.data('session-id');
    teamID = table.data('team');
    if (this.spectateTargets == null) {
      this.spectateTargets = {};
    }
    this.spectateTargets[teamID] = wasSelected ? null : sessionID;
    return console.log(this.spectateTargets, cell, row, table);
  };

  LadderTabView.prototype.onLoadMoreLadderEntries = function(e) {
    if (this.ladderLimit == null) {
      this.ladderLimit = 100;
    }
    this.ladderLimit += 100;
    this.lastRefreshTime = null;
    return this.refreshLadder();
  };

  return LadderTabView;

})(CocoView);

module.exports.LeaderboardData = LeaderboardData = LeaderboardData = (function(superClass) {
  extend(LeaderboardData, superClass);


  /*
  Consolidates what you need to load for a leaderboard into a single Backbone Model-like object.
   */

  function LeaderboardData(level1, team1, session1, limit, league) {
    this.level = level1;
    this.team = team1;
    this.session = session1;
    this.limit = limit;
    this.league = league;
    this.onFail = bind(this.onFail, this);
    this.onLoad = bind(this.onLoad, this);
    LeaderboardData.__super__.constructor.call(this);
  }

  LeaderboardData.prototype.collectionParameters = function(parameters) {
    parameters.team = this.team;
    if (this.league) {
      parameters['leagues.leagueID'] = this.league.id;
    }
    return parameters;
  };

  LeaderboardData.prototype.fetch = function() {
    var level, loadURL, promises, ref, score, success;
    if (this.topPlayers) {
      console.warn('Already have top players on', this);
    }
    this.topPlayers = new LeaderboardCollection(this.level, this.collectionParameters({
      order: -1,
      scoreOffset: HIGHEST_SCORE,
      limit: this.limit
    }));
    promises = [];
    promises.push(this.topPlayers.fetch({
      cache: false
    }));
    if (this.session) {
      if (this.league) {
        score = (ref = _.find(this.session.get('leagues'), {
          leagueID: this.league.id
        })) != null ? ref.stats.totalScore : void 0;
      } else {
        score = this.session.get('totalScore');
      }
      if (score) {
        this.playersAbove = new LeaderboardCollection(this.level, this.collectionParameters({
          order: 1,
          scoreOffset: score,
          limit: 4
        }));
        promises.push(this.playersAbove.fetch({
          cache: false
        }));
        this.playersBelow = new LeaderboardCollection(this.level, this.collectionParameters({
          order: -1,
          scoreOffset: score,
          limit: 4
        }));
        promises.push(this.playersBelow.fetch({
          cache: false
        }));
        level = (this.level.get('original')) + "." + (this.level.get('version').major);
        success = (function(_this) {
          return function(myRank) {
            _this.myRank = myRank;
          };
        })(this);
        loadURL = "/db/level/" + level + "/leaderboard_rank?scoreOffset=" + score + "&team=" + this.team;
        if (this.league) {
          loadURL += '&leagues.leagueID=' + this.league.id;
        }
        promises.push($.ajax(loadURL, {
          cache: false,
          success: success
        }));
      }
    }
    this.promise = $.when.apply($, promises);
    this.promise.then(this.onLoad);
    this.promise.fail(this.onFail);
    return this.promise;
  };

  LeaderboardData.prototype.onLoad = function() {
    if (this.destroyed || !this.topPlayers.loaded) {
      return;
    }
    this.loaded = true;
    this.loading = false;
    return this.trigger('sync', this);
  };

  LeaderboardData.prototype.onFail = function(resource, jqxhr) {
    if (this.destroyed) {
      return;
    }
    return this.trigger('error', this, jqxhr);
  };

  LeaderboardData.prototype.inTopSessions = function() {
    var ref, session;
    return ref = me.id, indexOf.call((function() {
      var j, len, ref1, results;
      ref1 = this.topPlayers.models;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        session = ref1[j];
        results.push(session.attributes.creator);
      }
      return results;
    }).call(this), ref) >= 0;
  };

  LeaderboardData.prototype.nearbySessions = function() {
    var above, i, j, l, len, ref, ref1, ref2, score, session, startRank;
    if (this.league) {
      score = (ref = _.find((ref1 = this.session) != null ? ref1.get('leagues') : void 0, {
        leagueID: this.league.id
      })) != null ? ref.stats.totalScore : void 0;
    } else {
      score = (ref2 = this.session) != null ? ref2.get('totalScore') : void 0;
    }
    if (!score) {
      return [];
    }
    l = [];
    above = this.playersAbove.models;
    l = l.concat(above);
    l.reverse();
    l.push(this.session);
    l = l.concat(this.playersBelow.models);
    if (this.myRank) {
      startRank = this.myRank - 4;
      for (i = j = 0, len = l.length; j < len; i = ++j) {
        session = l[i];
        session.rank = startRank + i;
      }
    }
    return l;
  };

  LeaderboardData.prototype.allResources = function() {
    var r, resources;
    resources = [this.topPlayers, this.playersAbove, this.playersBelow];
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

  return LeaderboardData;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/LadderTabView.js.map
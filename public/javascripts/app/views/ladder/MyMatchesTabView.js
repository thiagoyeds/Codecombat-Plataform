require.register("views/ladder/MyMatchesTabView", function(exports, require, module) {
var CocoView, LadderSubmissionView, LeaderboardCollection, Level, LevelSession, MyMatchesTabView, teamDataFromLevel,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

LeaderboardCollection = require('collections/LeaderboardCollection');

LadderSubmissionView = require('views/play/common/LadderSubmissionView');

teamDataFromLevel = require('./utils').teamDataFromLevel;

require('vendor/d3');

module.exports = MyMatchesTabView = (function(superClass) {
  extend(MyMatchesTabView, superClass);

  function MyMatchesTabView() {
    this.generateScoreLineChart = bind(this.generateScoreLineChart, this);
    return MyMatchesTabView.__super__.constructor.apply(this, arguments);
  }

  MyMatchesTabView.prototype.id = 'my-matches-tab-view';

  MyMatchesTabView.prototype.template = require('templates/play/ladder/my_matches_tab');

  MyMatchesTabView.prototype.initialize = function(options, level, sessions) {
    this.level = level;
    this.sessions = sessions;
    this.nameMap = {};
    this.previouslyRankingTeams = {};
    return this.refreshMatches(20);
  };

  MyMatchesTabView.prototype.refreshMatches = function(refreshDelay) {
    var convertMatch, j, len, match, ref, ref1, ref2, ref3, s, scoreHistory, stats, team;
    this.refreshDelay = refreshDelay;
    this.teams = teamDataFromLevel(this.level);
    convertMatch = (function(_this) {
      return function(match, submitDate) {
        var fresh, opponent, state;
        opponent = match.opponents[0];
        state = 'win';
        if (match.metrics.rank > opponent.metrics.rank) {
          state = 'loss';
        }
        if (match.metrics.rank === opponent.metrics.rank) {
          state = 'tie';
        }
        fresh = match.date > (new Date(new Date() - _this.refreshDelay * 1000)).toISOString();
        if (fresh) {
          _this.playSound('chat_received');
        }
        return {
          state: state,
          opponentName: _this.nameMap[opponent.userID],
          opponentID: opponent.userID,
          when: moment(match.date).fromNow(),
          sessionID: opponent.sessionID,
          stale: match.date < submitDate,
          fresh: fresh,
          codeLanguage: match.codeLanguage,
          simulator: match.simulator ? JSON.stringify(match.simulator) + ' | seed ' + match.randomSeed : ''
        };
      };
    })(this);
    ref = this.teams;
    for (j = 0, len = ref.length; j < len; j++) {
      team = ref[j];
      team.session = ((function() {
        var k, len1, ref1, results;
        ref1 = this.sessions.models;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          s = ref1[k];
          if (s.get('team') === team.id) {
            results.push(s);
          }
        }
        return results;
      }).call(this))[0];
      stats = this.statsFromSession(team.session);
      team.readyToRank = (ref1 = team.session) != null ? ref1.readyToRank() : void 0;
      team.isRanking = (ref2 = team.session) != null ? ref2.get('isRanking') : void 0;
      team.matches = (function() {
        var k, len1, ref3, results;
        ref3 = (stats != null ? stats.matches : void 0) || [];
        results = [];
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          match = ref3[k];
          results.push(convertMatch(match, team.session.get('submitDate')));
        }
        return results;
      })();
      team.matches.reverse();
      team.score = ((ref3 = stats != null ? stats.totalScore : void 0) != null ? ref3 : 10).toFixed(2);
      team.wins = _.filter(team.matches, {
        state: 'win',
        stale: false
      }).length;
      team.ties = _.filter(team.matches, {
        state: 'tie',
        stale: false
      }).length;
      team.losses = _.filter(team.matches, {
        state: 'loss',
        stale: false
      }).length;
      scoreHistory = stats != null ? stats.scoreHistory : void 0;
      if ((scoreHistory != null ? scoreHistory.length : void 0) > 1) {
        team.scoreHistory = scoreHistory;
      }
      if (!team.isRanking && this.previouslyRankingTeams[team.id]) {
        this.playSound('cast-end');
      }
      this.previouslyRankingTeams[team.id] = team.isRanking;
    }
    return this.loadNames();
  };

  MyMatchesTabView.prototype.loadNames = function() {
    var id, ids, j, k, len, len1, match, matches, ref, session, success, userNamesRequest;
    ids = [];
    ref = this.sessions.models;
    for (j = 0, len = ref.length; j < len; j++) {
      session = ref[j];
      matches = this.statsFromSession(session).matches || [];
      for (k = 0, len1 = matches.length; k < len1; k++) {
        match = matches[k];
        id = match.opponents[0].userID;
        if (!id) {
          console.error('Found bad opponent ID in malformed match:', match, 'from session', session);
          continue;
        }
        if (!this.nameMap[id]) {
          ids.push(id);
        }
      }
    }
    ids = _.uniq(ids);
    if (!ids.length) {
      return;
    }
    success = (function(_this) {
      return function(nameMap) {
        var l, len2, len3, m, name, opponent, opponentUser, ref1;
        if (_this.destroyed) {
          return;
        }
        ref1 = _this.sessions.models;
        for (l = 0, len2 = ref1.length; l < len2; l++) {
          session = ref1[l];
          matches = _this.statsFromSession(session).matches || [];
          for (m = 0, len3 = matches.length; m < len3; m++) {
            match = matches[m];
            opponent = match.opponents[0];
            if (_this.nameMap[opponent.userID]) {
              continue;
            }
            opponentUser = nameMap[opponent.userID];
            name = opponentUser != null ? opponentUser.name : void 0;
            if (opponentUser != null ? opponentUser.firstName : void 0) {
              name || (name = opponentUser.firstName + ' ' + opponentUser.lastName);
            }
            if (opponentUser) {
              name || (name = "Anonymous " + (opponent.userID.substr(18)));
            }
            if (!name) {
              console.log('found', nameMap[opponent.userID], 'for', opponent.userID, "http://codecombat.com/db/user/" + opponent.userID);
            }
            name || (name = '<bad match data>');
            if (name.length > 21) {
              name = name.substr(0, 18) + '...';
            }
            _this.nameMap[opponent.userID] = name;
          }
        }
        if (_this.supermodel.finished()) {
          return _this.render();
        }
      };
    })(this);
    userNamesRequest = this.supermodel.addRequestResource('user_names', {
      url: '/db/user/-/names',
      data: {
        ids: ids
      },
      method: 'POST',
      success: success
    }, 0);
    return userNamesRequest.load();
  };

  MyMatchesTabView.prototype.afterRender = function() {
    var key, ref, subview;
    MyMatchesTabView.__super__.afterRender.call(this);
    ref = this.subviews;
    for (key in ref) {
      subview = ref[key];
      if (subview instanceof LadderSubmissionView) {
        this.removeSubView(subview);
      }
    }
    this.$el.find('.ladder-submission-view').each((function(_this) {
      return function(i, el) {
        var ladderSubmissionView, mirrorSession, placeholder, ref1, s, session, sessionID;
        placeholder = $(el);
        sessionID = placeholder.data('session-id');
        session = _.find(_this.sessions.models, {
          id: sessionID
        });
        if ((ref1 = _this.level.get('slug')) === 'ace-of-coders' || ref1 === 'elemental-wars' || ref1 === 'the-battle-of-sky-span') {
          mirrorSession = ((function() {
            var j, len, ref2, results;
            ref2 = this.sessions.models;
            results = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              s = ref2[j];
              if (s.get('team') !== session.get('team')) {
                results.push(s);
              }
            }
            return results;
          }).call(_this))[0];
        }
        ladderSubmissionView = new LadderSubmissionView({
          session: session,
          level: _this.level,
          mirrorSession: mirrorSession
        });
        return _this.insertSubView(ladderSubmissionView, placeholder);
      };
    })(this));
    this.$el.find('.score-chart-wrapper').each((function(_this) {
      return function(i, el) {
        var scoreWrapper, team;
        scoreWrapper = $(el);
        team = _.find(_this.teams, {
          name: scoreWrapper.data('team-name')
        });
        return _this.generateScoreLineChart(scoreWrapper.attr('id'), team.scoreHistory, team.name);
      };
    })(this));
    return this.$el.find('tr.fresh').removeClass('fresh', 5000);
  };

  MyMatchesTabView.prototype.statsFromSession = function(session) {
    var ref, ref1;
    if (!session) {
      return null;
    }
    if (this.options.league) {
      return (ref = (ref1 = _.find(session.get('leagues') || [], {
        leagueID: this.options.league.id
      })) != null ? ref1.stats : void 0) != null ? ref : {};
    }
    return session.attributes;
  };

  MyMatchesTabView.prototype.generateScoreLineChart = function(wrapperID, scoreHistory, teamName) {
    var data, height, line, lineClass, margin, selector, svg, time, width, x, xAxis, y, yAxis;
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };
    width = 450 - margin.left - margin.right;
    height = 125;
    x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
    xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(4).outerTickSize(0);
    yAxis = d3.svg.axis().scale(y).orient('left').ticks(4).outerTickSize(0);
    line = d3.svg.line().x((function(d) {
      return x(d.date);
    })).y(function(d) {
      return y(d.close);
    });
    selector = '#' + wrapperID;
    svg = d3.select(selector).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
    time = 0;
    data = scoreHistory.map(function(d) {
      time += 1;
      return {
        date: time,
        close: d[1] * 100
      };
    });
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain(d3.extent(data, function(d) {
      return d.close;
    }));
    svg.append('g').attr('class', 'y axis').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 4).attr('dy', '.75em').style('text-anchor', 'end').text('Score');
    lineClass = 'line';
    if (teamName.toLowerCase() === 'ogres') {
      lineClass = 'ogres-line';
    }
    if (teamName.toLowerCase() === 'humans') {
      lineClass = 'humans-line';
    }
    return svg.append('path').datum(data).attr('class', lineClass).attr('d', line);
  };

  return MyMatchesTabView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/MyMatchesTabView.js.map
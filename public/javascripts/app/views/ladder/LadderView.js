require.register("views/ladder/LadderView", function(exports, require, module) {
var Clan, CocoClass, CocoCollection, Course, CourseInstance, HIGHEST_SCORE, LadderPlayModal, LadderTabView, LadderView, Level, LevelSession, LevelSessionsCollection, MyMatchesTabView, RootView, SimulateTabView, application, me, teamDataFromLevel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RootView = require('views/core/RootView');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

CocoCollection = require('collections/CocoCollection');

teamDataFromLevel = require('./utils').teamDataFromLevel;

me = require('core/auth').me;

application = require('core/application');

LadderTabView = require('./LadderTabView');

MyMatchesTabView = require('./MyMatchesTabView');

SimulateTabView = require('./SimulateTabView');

LadderPlayModal = require('./LadderPlayModal');

CocoClass = require('core/CocoClass');

Clan = require('models/Clan');

CourseInstance = require('models/CourseInstance');

Course = require('models/Course');

HIGHEST_SCORE = 1000000;

LevelSessionsCollection = (function(superClass) {
  extend(LevelSessionsCollection, superClass);

  LevelSessionsCollection.prototype.url = '';

  LevelSessionsCollection.prototype.model = LevelSession;

  function LevelSessionsCollection(levelID) {
    LevelSessionsCollection.__super__.constructor.call(this);
    this.url = "/db/level/" + levelID + "/my_sessions";
  }

  return LevelSessionsCollection;

})(CocoCollection);

module.exports = LadderView = (function(superClass) {
  extend(LadderView, superClass);

  function LadderView() {
    this.refreshViews = bind(this.refreshViews, this);
    return LadderView.__super__.constructor.apply(this, arguments);
  }

  LadderView.prototype.id = 'ladder-view';

  LadderView.prototype.template = require('templates/play/ladder/ladder');

  LadderView.prototype.usesSocialMedia = true;

  LadderView.prototype.subscriptions = {
    'application:idle-changed': 'onIdleChanged'
  };

  LadderView.prototype.events = {
    'click .play-button': 'onClickPlayButton',
    'click a:not([data-toggle])': 'onClickedLink',
    'click .spectate-button': 'onClickSpectateButton'
  };

  LadderView.prototype.initialize = function(options, levelID1, leagueType, leagueID) {
    var onLoaded, tournamentEndDate, tournamentStartDate;
    this.levelID = levelID1;
    this.leagueType = leagueType;
    this.leagueID = leagueID;
    this.level = this.supermodel.loadModel(new Level({
      _id: this.levelID
    })).model;
    onLoaded = (function(_this) {
      return function() {
        if (_this.destroyed) {
          return;
        }
        if (_this.level.get('description')) {
          _this.levelDescription = marked(_this.level.get('description'));
        }
        return _this.teams = teamDataFromLevel(_this.level);
      };
    })(this);
    if (this.level.loaded) {
      onLoaded();
    } else {
      this.level.once('sync', onLoaded);
    }
    this.sessions = this.supermodel.loadCollection(new LevelSessionsCollection(this.levelID), 'your_sessions', {
      cache: false
    }).model;
    this.winners = require('./tournament_results')[this.levelID];
    if (tournamentEndDate = {
      greed: 1402444800000,
      'criss-cross': 1410912000000,
      'zero-sum': 1428364800000,
      'ace-of-coders': 1444867200000
    }[this.levelID]) {
      this.tournamentTimeLeft = moment(new Date(tournamentEndDate)).fromNow();
    }
    if (tournamentStartDate = {
      'zero-sum': 1427472000000,
      'ace-of-coders': 1442417400000
    }[this.levelID]) {
      this.tournamentTimeElapsed = moment(new Date(tournamentStartDate)).fromNow();
    }
    return this.loadLeague();
  };

  LadderView.prototype.loadLeague = function() {
    var modelClass, ref;
    if ((ref = this.leagueType) !== 'clan' && ref !== 'course') {
      this.leagueID = this.leagueType = null;
    }
    if (!this.leagueID) {
      return;
    }
    modelClass = this.leagueType === 'clan' ? Clan : CourseInstance;
    this.league = this.supermodel.loadModel(new modelClass({
      _id: this.leagueID
    })).model;
    if (this.leagueType === 'course') {
      if (this.league.loaded) {
        return this.onCourseInstanceLoaded(this.league);
      } else {
        return this.listenToOnce(this.league, 'sync', this.onCourseInstanceLoaded);
      }
    }
  };

  LadderView.prototype.onCourseInstanceLoaded = function(courseInstance) {
    var course;
    if (this.destroyed) {
      return;
    }
    course = new Course({
      _id: courseInstance.get('courseID')
    });
    this.course = this.supermodel.loadModel(course).model;
    return this.listenToOnce(this.course, 'sync', this.render);
  };

  LadderView.prototype.afterRender = function() {
    var hash, highLoad;
    LadderView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.insertSubView(this.ladderTab = new LadderTabView({
      league: this.league
    }, this.level, this.sessions));
    this.insertSubView(this.myMatchesTab = new MyMatchesTabView({
      league: this.league
    }, this.level, this.sessions));
    this.insertSubView(this.simulateTab = new SimulateTabView({
      league: this.league,
      level: this.level,
      leagueID: this.leagueID
    }));
    highLoad = true;
    this.refreshDelay = (function() {
      switch (false) {
        case !!application.isProduction():
          return 10;
        case !this.league:
          return 20;
        case !!highLoad:
          return 30;
        case !!me.isAnonymous():
          return 60;
        default:
          return 300;
      }
    }).call(this);
    this.refreshInterval = setInterval(this.fetchSessionsAndRefreshViews.bind(this), this.refreshDelay * 1000);
    if (document.location.hash) {
      hash = document.location.hash.slice(1);
    }
    if (hash && !(hash === 'my-matches' || hash === 'simulate' || hash === 'ladder' || hash === 'prizes' || hash === 'rules' || hash === 'winners')) {
      if (this.sessions.loaded) {
        return this.showPlayModal(hash);
      }
    }
  };

  LadderView.prototype.fetchSessionsAndRefreshViews = function() {
    if (this.destroyed || application.userIsIdle || (new Date() - 2000 < this.lastRefreshTime) || !this.supermodel.finished()) {
      return;
    }
    return this.sessions.fetch({
      success: this.refreshViews,
      cache: false
    });
  };

  LadderView.prototype.refreshViews = function() {
    if (this.destroyed || application.userIsIdle) {
      return;
    }
    this.lastRefreshTime = new Date();
    this.ladderTab.refreshLadder();
    this.myMatchesTab.refreshMatches(this.refreshDelay);
    return this.simulateTab.refresh();
  };

  LadderView.prototype.onIdleChanged = function(e) {
    if (!e.idle) {
      return this.fetchSessionsAndRefreshViews();
    }
  };

  LadderView.prototype.onClickPlayButton = function(e) {
    return this.showPlayModal($(e.target).closest('.play-button').data('team'));
  };

  LadderView.prototype.onClickSpectateButton = function(e) {
    var humanSession, ogreSession, ref, ref1, url;
    humanSession = (ref = this.ladderTab.spectateTargets) != null ? ref.humans : void 0;
    ogreSession = (ref1 = this.ladderTab.spectateTargets) != null ? ref1.ogres : void 0;
    if (!(humanSession && ogreSession)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    url = "/play/spectate/" + (this.level.get('slug')) + "?session-one=" + humanSession + "&session-two=" + ogreSession;
    if (this.league) {
      url += '&league=' + this.league.id;
    }
    if (key.command) {
      url += '&autoplay=false';
    }
    return window.open(url, key.command ? '_blank' : 'spectate');
  };

  LadderView.prototype.showPlayModal = function(teamID) {
    var modal, s, session;
    session = ((function() {
      var i, len, ref, results;
      ref = this.sessions.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.get('team') === teamID) {
          results.push(s);
        }
      }
      return results;
    }).call(this))[0];
    modal = new LadderPlayModal({
      league: this.league
    }, this.level, session, teamID);
    return this.openModalView(modal);
  };

  LadderView.prototype.onClickedLink = function(e) {
    var link;
    link = $(e.target).closest('a').attr('href');
    if (link && /#rules$/.test(link)) {
      this.$el.find('a[href="#rules"]').tab('show');
    }
    if (link && /#prizes/.test(link)) {
      this.$el.find('a[href="#prizes"]').tab('show');
    }
    if (link && /#winners/.test(link)) {
      return this.$el.find('a[href="#winners"]').tab('show');
    }
  };

  LadderView.prototype.destroy = function() {
    clearInterval(this.refreshInterval);
    return LadderView.__super__.destroy.call(this);
  };

  return LadderView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/ladder/LadderView.js.map
require.register("views/play/SpectateView", function(exports, require, module) {
var Article, AudioPlayer, Camera, ChatView, ControlBarView, DuelStatsView, GoalManager, GoalsView, God, GoldView, HUDView, InfiniteLoopModal, Level, LevelComponent, LevelLoader, LevelSession, LoadingView, PROFILE_ME, PlaybackView, RootView, ScriptManager, SpectateLevelView, Surface, ThangType, TomeView, VictoryModal, World, me, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/play/spectate');

me = require('core/auth').me;

ThangType = require('models/ThangType');

utils = require('core/utils');

World = require('lib/world/world');

Surface = require('lib/surface/Surface');

God = require('lib/God');

GoalManager = require('lib/world/GoalManager');

ScriptManager = require('lib/scripts/ScriptManager');

LevelLoader = require('lib/LevelLoader');

LevelSession = require('models/LevelSession');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

Article = require('models/Article');

Camera = require('lib/surface/Camera');

AudioPlayer = require('lib/AudioPlayer');

LoadingView = require('./level/LevelLoadingView');

TomeView = require('./level/tome/TomeView');

ChatView = require('./level/LevelChatView');

HUDView = require('./level/LevelHUDView');

ControlBarView = require('./level/ControlBarView');

PlaybackView = require('./level/LevelPlaybackView');

GoalsView = require('./level/LevelGoalsView');

GoldView = require('./level/LevelGoldView');

DuelStatsView = require('./level/DuelStatsView');

VictoryModal = require('./level/modal/VictoryModal');

InfiniteLoopModal = require('./level/modal/InfiniteLoopModal');

require('game-libraries');

PROFILE_ME = false;

module.exports = SpectateLevelView = (function(superClass) {
  extend(SpectateLevelView, superClass);

  SpectateLevelView.prototype.id = 'spectate-level-view';

  SpectateLevelView.prototype.template = template;

  SpectateLevelView.prototype.cache = false;

  SpectateLevelView.prototype.isEditorPreview = false;

  SpectateLevelView.prototype.subscriptions = {
    'level:set-volume': function(e) {
      return createjs.Sound.setVolume(e.volume === 1 ? 0.6 : e.volume);
    },
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'god:infinite-loop': 'onInfiniteLoop',
    'level:next-game-pressed': 'onNextGamePressed',
    'level:started': 'onLevelStarted',
    'level:loading-view-unveiled': 'onLoadingViewUnveiled'
  };

  function SpectateLevelView(options, levelID) {
    this.levelID = levelID;
    this.saveScreenshot = bind(this.saveScreenshot, this);
    this.onSupermodelLoadedOne = bind(this.onSupermodelLoadedOne, this);
    if (PROFILE_ME) {
      if (typeof console.profile === "function") {
        console.profile();
      }
    }
    SpectateLevelView.__super__.constructor.call(this, options);
    this.sessionOne = this.getQueryVariable('session-one');
    this.sessionTwo = this.getQueryVariable('session-two');
    if (options.spectateSessions) {
      this.sessionOne = options.spectateSessions.sessionOne;
      this.sessionTwo = options.spectateSessions.sessionTwo;
    }
    if (!this.sessionOne || !this.sessionTwo) {
      this.fetchRandomSessionPair((function(_this) {
        return function(err, data) {
          if (err != null) {
            return console.log("There was an error fetching the random session pair: " + data);
          }
          _this.sessionOne = data[0]._id;
          _this.sessionTwo = data[1]._id;
          return _this.load();
        };
      })(this));
    } else {
      this.load();
    }
  }

  SpectateLevelView.prototype.setLevel = function(level, supermodel) {
    var ref, serializedLevel;
    this.level = level;
    this.supermodel = supermodel;
    serializedLevel = this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: this.otherSession,
      headless: false,
      sessionless: false
    });
    if ((ref = this.god) != null) {
      ref.setLevel(serializedLevel);
    }
    if (this.world) {
      return this.world.loadFromLevel(serializedLevel, false);
    } else {
      return this.load();
    }
  };

  SpectateLevelView.prototype.load = function() {
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      sessionID: this.sessionOne,
      opponentSessionID: this.sessionTwo,
      spectateMode: true,
      team: this.getQueryVariable('team')
    });
    return this.god = new God({
      maxAngels: 1,
      spectate: true
    });
  };

  SpectateLevelView.prototype.getRenderData = function() {
    var c;
    c = SpectateLevelView.__super__.getRenderData.call(this);
    c.world = this.world;
    return c;
  };

  SpectateLevelView.prototype.afterRender = function() {
    var ref, ref1;
    if (typeof window.onPlayLevelViewLoaded === "function") {
      window.onPlayLevelViewLoaded(this);
    }
    this.insertSubView(this.loadingView = new LoadingView({
      autoUnveil: true,
      level: (ref = (ref1 = this.levelLoader) != null ? ref1.level : void 0) != null ? ref : this.level
    }));
    this.$el.find('#level-done-button').hide();
    SpectateLevelView.__super__.afterRender.call(this);
    return $('body').addClass('is-playing');
  };

  SpectateLevelView.prototype.onLoaded = function() {
    return _.defer((function(_this) {
      return function() {
        return _this.onLevelLoaderLoaded();
      };
    })(this));
  };

  SpectateLevelView.prototype.onLevelLoaderLoaded = function() {
    var team;
    this.grabLevelLoaderData();
    team = this.world.teamForPlayer(0);
    this.loadOpponentTeam(team);
    this.god.setLevel(this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: this.otherSession,
      headless: false,
      sessionless: false
    }));
    this.god.setLevelSessionIDs(this.otherSession ? [this.session.id, this.otherSession.id] : [this.session.id]);
    this.god.setWorldClassMap(this.world.classMap);
    this.setTeam(team);
    this.initSurface();
    this.initGoalManager();
    this.initScriptManager();
    this.insertSubviews();
    this.initVolume();
    this.originalSessionState = $.extend(true, {}, this.session.get('state'));
    this.register();
    this.controlBar.setBus(this.bus);
    return this.surface.showLevel();
  };

  SpectateLevelView.prototype.grabLevelLoaderData = function() {
    this.session = this.levelLoader.session;
    this.world = this.levelLoader.world;
    this.level = this.levelLoader.level;
    this.otherSession = this.levelLoader.opponentSession;
    this.levelLoader.destroy();
    return this.levelLoader = null;
  };

  SpectateLevelView.prototype.loadOpponentTeam = function(myTeam) {
    var c, i, len, myCode, opponentCode, opponentSpells, ref, ref1, ref2, ref3, ref4, ref5, ref6, spell, spellTeam, spells, thang;
    opponentSpells = [];
    ref3 = (ref = (ref1 = this.session.get('teamSpells')) != null ? ref1 : (ref2 = this.otherSession) != null ? ref2.get('teamSpells') : void 0) != null ? ref : {};
    for (spellTeam in ref3) {
      spells = ref3[spellTeam];
      if (spellTeam === myTeam || !myTeam) {
        continue;
      }
      opponentSpells = opponentSpells.concat(spells);
    }
    opponentCode = ((ref4 = this.otherSession) != null ? ref4.get('code') : void 0) || {};
    myCode = this.session.get('code') || {};
    for (i = 0, len = opponentSpells.length; i < len; i++) {
      spell = opponentSpells[i];
      ref5 = spell.split('/'), thang = ref5[0], spell = ref5[1];
      c = (ref6 = opponentCode[thang]) != null ? ref6[spell] : void 0;
      if (myCode[thang] == null) {
        myCode[thang] = {};
      }
      if (c) {
        myCode[thang][spell] = c;
      } else {
        delete myCode[thang][spell];
      }
    }
    return this.session.set('code', myCode);
  };

  SpectateLevelView.prototype.onLevelStarted = function(e) {
    var go;
    go = (function(_this) {
      return function() {
        var ref, ref1;
        if ((ref = _this.loadingView) != null) {
          ref.startUnveiling();
        }
        return (ref1 = _this.loadingView) != null ? ref1.unveil(true) : void 0;
      };
    })(this);
    return _.delay(go, 1000);
  };

  SpectateLevelView.prototype.onLoadingViewUnveiled = function(e) {
    Backbone.Mediator.publish('level:set-playing', {
      playing: false
    });
    return Backbone.Mediator.publish('level:set-time', {
      time: 1
    });
  };

  SpectateLevelView.prototype.onSupermodelLoadedOne = function() {
    if (this.modelsLoaded == null) {
      this.modelsLoaded = 0;
    }
    this.modelsLoaded += 1;
    return this.updateInitString();
  };

  SpectateLevelView.prototype.updateInitString = function() {
    var canvas, ctx;
    if (this.surface) {
      return;
    }
    if (this.modelsLoaded == null) {
      this.modelsLoaded = 0;
    }
    canvas = this.$el.find('#surface')[0];
    ctx = canvas.getContext('2d');
    ctx.font = '20px Georgia';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return ctx.fillText("Loaded " + this.modelsLoaded + " thingies", 50, 50);
  };

  SpectateLevelView.prototype.insertSubviews = function() {
    var ref;
    this.insertSubView(this.tome = new TomeView({
      levelID: this.levelID,
      session: this.session,
      otherSession: this.otherSession,
      thangs: this.world.thangs,
      supermodel: this.supermodel,
      spectateView: true,
      spectateOpponentCodeLanguage: (ref = this.otherSession) != null ? ref.get('submittedCodeLanguage') : void 0,
      level: this.level,
      god: this.god
    }));
    this.insertSubView(new PlaybackView({
      session: this.session,
      level: this.level
    }));
    this.insertSubView(new GoldView({}));
    this.insertSubView(new HUDView({
      level: this.level
    }));
    if (this.level.isType('hero-ladder', 'course-ladder')) {
      this.insertSubView(new DuelStatsView({
        level: this.level,
        session: this.session,
        otherSession: this.otherSession,
        supermodel: this.supermodel,
        thangs: this.world.thangs
      }));
    }
    return this.insertSubView(this.controlBar = new ControlBarView({
      worldName: utils.i18n(this.level.attributes, 'name'),
      session: this.session,
      level: this.level,
      supermodel: this.supermodel,
      spectateGame: true
    }));
  };

  SpectateLevelView.prototype.onInfiniteLoop = function(e) {
    var ref;
    if (!(e.firstWorld && e.god === this.god)) {
      return;
    }
    this.openModalView(new InfiniteLoopModal());
    return (ref = window.tracker) != null ? ref.trackEvent('Saw Initial Infinite Loop', {
      level: this.world.name,
      label: this.world.name
    }) : void 0;
  };

  SpectateLevelView.prototype.initSurface = function() {
    var bounds, normalSurface, webGLSurface, worldBounds, zoom;
    webGLSurface = $('canvas#webgl-surface', this.$el);
    normalSurface = $('canvas#normal-surface', this.$el);
    this.surface = new Surface(this.world, normalSurface, webGLSurface, {
      thangTypes: this.supermodel.getModels(ThangType),
      spectateGame: true,
      playerNames: this.findPlayerNames(),
      levelType: this.level.get('type', true)
    });
    worldBounds = this.world.getBounds();
    bounds = [
      {
        x: worldBounds.left,
        y: worldBounds.top
      }, {
        x: worldBounds.right,
        y: worldBounds.bottom
      }
    ];
    this.surface.camera.setBounds(bounds);
    zoom = (function(_this) {
      return function() {
        return _this.surface.camera.zoomTo({
          x: (worldBounds.right - worldBounds.left) / 2,
          y: (worldBounds.top - worldBounds.bottom) / 2
        }, 0.1, 0);
      };
    })(this);
    return _.delay(zoom, 4000);
  };

  SpectateLevelView.prototype.findPlayerNames = function() {
    var i, len, playerNames, ref, session;
    playerNames = {};
    ref = [this.session, this.otherSession];
    for (i = 0, len = ref.length; i < len; i++) {
      session = ref[i];
      if (session != null ? session.get('team') : void 0) {
        playerNames[session.get('team')] = session.get('creatorName') || 'Anonymous';
      }
    }
    return playerNames;
  };

  SpectateLevelView.prototype.initGoalManager = function() {
    this.goalManager = new GoalManager(this.world, this.level.get('goals'));
    return this.god.setGoalManager(this.goalManager);
  };

  SpectateLevelView.prototype.initScriptManager = function() {
    var nonVictoryPlaybackScripts;
    if (this.world.scripts) {
      nonVictoryPlaybackScripts = _.reject(this.world.scripts, function(script) {
        return script.id.indexOf('Set Camera Boundaries') === -1;
      });
    } else {
      console.log('World scripts don\'t exist!');
      nonVictoryPlaybackScripts = [];
    }
    this.scriptManager = new ScriptManager({
      scripts: nonVictoryPlaybackScripts,
      view: this,
      session: this.session
    });
    return this.scriptManager.loadFromSession();
  };

  SpectateLevelView.prototype.initVolume = function() {
    var volume;
    volume = me.get('volume');
    if (volume == null) {
      volume = 1.0;
    }
    return Backbone.Mediator.publish('level:set-volume', {
      volume: volume
    });
  };

  SpectateLevelView.prototype.register = function() {};

  SpectateLevelView.prototype.onSessionWillSave = function(e) {
    return console.log('Session is saving but shouldn\'t save!!!!!!!');
  };

  SpectateLevelView.prototype.saveScreenshot = function(session) {
    var ref, screenshot;
    if (!(screenshot = (ref = this.surface) != null ? ref.screenshot() : void 0)) {
      return;
    }
    return session.save({
      screenshot: screenshot
    }, {
      patch: true,
      type: 'PUT'
    });
  };

  SpectateLevelView.prototype.setTeam = function(team) {
    if (!_.isString(team)) {
      team = team != null ? team.team : void 0;
    }
    if (team == null) {
      team = 'humans';
    }
    me.team = team;
    return Backbone.Mediator.publish('level:team-set', {
      team: team
    });
  };

  SpectateLevelView.prototype.onNewWorld = function(e) {
    var i, len, message, ref, ref1, ref2, results, scripts, sound, spriteName, startFrame, thangType, thangTypes;
    if (this.headless) {
      return;
    }
    scripts = this.world.scripts;
    this.world = e.world;
    this.world.scripts = scripts;
    thangTypes = this.supermodel.getModels(ThangType);
    startFrame = (ref = this.lastWorldFramesLoaded) != null ? ref : 0;
    if (this.world.frames.length === this.world.totalFrames) {
      this.lastWorldFramesLoaded = 0;
      if (this.getQueryVariable('autoplay') !== false) {
        Backbone.Mediator.publish('level:set-playing', {
          playing: true
        });
      }
    } else {
      this.lastWorldFramesLoaded = this.world.frames.length;
    }
    ref1 = this.world.thangDialogueSounds(startFrame);
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      ref2 = ref1[i], spriteName = ref2[0], message = ref2[1];
      if (!(thangType = _.find(thangTypes, function(m) {
        return m.get('name') === spriteName;
      }))) {
        continue;
      }
      if (!(sound = AudioPlayer.soundForDialogue(message, thangType.get('soundTriggers')))) {
        continue;
      }
      results.push(AudioPlayer.preloadSoundReference(sound));
    }
    return results;
  };

  SpectateLevelView.prototype.onNextGamePressed = function(e) {
    return this.fetchRandomSessionPair((function(_this) {
      return function(err, data) {
        var leagueID, url;
        if (_this.destroyed) {
          return;
        }
        if (err != null) {
          return console.log("There was an error fetching the random session pair: " + data);
        }
        _this.sessionOne = data[0]._id;
        _this.sessionTwo = data[1]._id;
        url = "/play/spectate/" + _this.levelID + "?session-one=" + _this.sessionOne + "&session-two=" + _this.sessionTwo;
        if (leagueID = _this.getQueryVariable('league')) {
          url += "&league=" + leagueID;
        }
        Backbone.Mediator.publish('router:navigate', {
          route: url,
          viewClass: SpectateLevelView,
          viewArgs: [
            {
              spectateSessions: {
                sessionOne: _this.sessionOne,
                sessionTwo: _this.sessionTwo
              },
              supermodel: _this.supermodel
            }, _this.levelID
          ]
        });
        return typeof history !== "undefined" && history !== null ? typeof history.pushState === "function" ? history.pushState({}, '', url) : void 0 : void 0;
      };
    })(this));
  };

  SpectateLevelView.prototype.fetchRandomSessionPair = function(cb) {
    var randomSessionPairURL;
    console.log('Fetching random session pair!');
    randomSessionPairURL = "/db/level/" + this.levelID + "/random_session_pair";
    return $.ajax({
      url: randomSessionPairURL,
      type: 'GET',
      cache: false,
      complete: function(jqxhr, textStatus) {
        if (textStatus !== 'success') {
          return cb('error', jqxhr.statusText);
        } else {
          return cb(null, $.parseJSON(jqxhr.responseText));
        }
      }
    });
  };

  SpectateLevelView.prototype.destroy = function() {
    var ref, ref1, ref2, ref3, ref4;
    if ((ref = this.levelLoader) != null) {
      ref.destroy();
    }
    if ((ref1 = this.surface) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.god) != null) {
      ref2.destroy();
    }
    if ((ref3 = this.goalManager) != null) {
      ref3.destroy();
    }
    if ((ref4 = this.scriptManager) != null) {
      ref4.destroy();
    }
    delete window.world;
    if (PROFILE_ME) {
      if (typeof console.profileEnd === "function") {
        console.profileEnd();
      }
    }
    return SpectateLevelView.__super__.destroy.call(this);
  };

  return SpectateLevelView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/SpectateView.js.map
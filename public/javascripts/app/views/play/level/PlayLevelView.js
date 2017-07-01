require.register("views/play/level/PlayLevelView", function(exports, require, module) {
var Article, AudioPlayer, Camera, ChatView, ContactModal, ControlBarView, CourseVictoryModal, DuelStatsView, GameUIState, GoalManager, GoalsView, God, GoldView, HUDView, HeroVictoryModal, HintsState, HintsView, InfiniteLoopModal, Level, LevelBus, LevelComponent, LevelDialogueView, LevelFlagsView, LevelLoader, LevelLoadingView, LevelPlaybackView, LevelSession, LevelSetupManager, PROFILE_ME, PicoCTFVictoryModal, PlayLevelView, ProblemAlertView, RootView, ScriptManager, Simulator, SpellPaletteView, Surface, ThangType, TomeView, VictoryModal, WebSurfaceView, createAetherOptions, me, storage, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/play/play-level-view');

me = require('core/auth').me;

ThangType = require('models/ThangType');

utils = require('core/utils');

storage = require('core/storage');

createAetherOptions = require('lib/aether_utils').createAetherOptions;

Surface = require('lib/surface/Surface');

God = require('lib/God');

GoalManager = require('lib/world/GoalManager');

ScriptManager = require('lib/scripts/ScriptManager');

LevelBus = require('lib/LevelBus');

LevelLoader = require('lib/LevelLoader');

LevelSession = require('models/LevelSession');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

Article = require('models/Article');

Camera = require('lib/surface/Camera');

AudioPlayer = require('lib/AudioPlayer');

Simulator = require('lib/simulator/Simulator');

GameUIState = require('models/GameUIState');

LevelLoadingView = require('./LevelLoadingView');

ProblemAlertView = require('./tome/ProblemAlertView');

TomeView = require('./tome/TomeView');

ChatView = require('./LevelChatView');

HUDView = require('./LevelHUDView');

LevelDialogueView = require('./LevelDialogueView');

ControlBarView = require('./ControlBarView');

LevelPlaybackView = require('./LevelPlaybackView');

GoalsView = require('./LevelGoalsView');

LevelFlagsView = require('./LevelFlagsView');

GoldView = require('./LevelGoldView');

DuelStatsView = require('./DuelStatsView');

VictoryModal = require('./modal/VictoryModal');

HeroVictoryModal = require('./modal/HeroVictoryModal');

CourseVictoryModal = require('./modal/CourseVictoryModal');

PicoCTFVictoryModal = require('./modal/PicoCTFVictoryModal');

InfiniteLoopModal = require('./modal/InfiniteLoopModal');

LevelSetupManager = require('lib/LevelSetupManager');

ContactModal = require('views/core/ContactModal');

HintsView = require('./HintsView');

HintsState = require('./HintsState');

WebSurfaceView = require('./WebSurfaceView');

SpellPaletteView = require('./tome/SpellPaletteView');

require('game-libraries');

PROFILE_ME = false;

module.exports = PlayLevelView = (function(superClass) {
  extend(PlayLevelView, superClass);

  PlayLevelView.prototype.id = 'level-view';

  PlayLevelView.prototype.template = template;

  PlayLevelView.prototype.cache = false;

  PlayLevelView.prototype.shortcutsEnabled = true;

  PlayLevelView.prototype.isEditorPreview = false;

  PlayLevelView.prototype.subscriptions = {
    'level:set-volume': 'onSetVolume',
    'level:show-victory': 'onShowVictory',
    'level:restart': 'onRestartLevel',
    'level:highlight-dom': 'onHighlightDOM',
    'level:end-highlight-dom': 'onEndHighlight',
    'level:focus-dom': 'onFocusDom',
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'god:world-load-progress-changed': 'onWorldLoadProgressChanged',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'god:infinite-loop': 'onInfiniteLoop',
    'level:reload-from-data': 'onLevelReloadFromData',
    'level:reload-thang-type': 'onLevelReloadThangType',
    'level:started': 'onLevelStarted',
    'level:loading-view-unveiling': 'onLoadingViewUnveiling',
    'level:loading-view-unveiled': 'onLoadingViewUnveiled',
    'level:loaded': 'onLevelLoaded',
    'level:session-loaded': 'onSessionLoaded',
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded',
    'ipad:memory-warning': 'onIPadMemoryWarning',
    'store:item-purchased': 'onItemPurchased'
  };

  PlayLevelView.prototype.events = {
    'click #level-done-button': 'onDonePressed',
    'click #stop-real-time-playback-button': function() {
      return Backbone.Mediator.publish('playback:stop-real-time-playback', {});
    },
    'click #fullscreen-editor-background-screen': function(e) {
      return Backbone.Mediator.publish('tome:toggle-maximize', {});
    },
    'click .contact-link': 'onContactClicked'
  };

  PlayLevelView.prototype.shortcuts = {
    'ctrl+s': 'onCtrlS',
    'esc': 'onEscapePressed'
  };

  function PlayLevelView(options, levelID) {
    var f, ref, ref1;
    this.levelID = levelID;
    this.onSubmissionComplete = bind(this.onSubmissionComplete, this);
    this.onWindowResize = bind(this.onWindowResize, this);
    if (PROFILE_ME) {
      if (typeof console.profile === "function") {
        console.profile();
      }
    }
    PlayLevelView.__super__.constructor.call(this, options);
    this.courseID = options.courseID || this.getQueryVariable('course');
    this.courseInstanceID = options.courseInstanceID || this.getQueryVariable('course-instance');
    this.isEditorPreview = this.getQueryVariable('dev');
    this.sessionID = this.getQueryVariable('session');
    this.observing = this.getQueryVariable('observing');
    this.opponentSessionID = this.getQueryVariable('opponent');
    if (this.opponentSessionID == null) {
      this.opponentSessionID = this.options.opponent;
    }
    this.gameUIState = new GameUIState();
    $('flying-focus').remove();
    $(window).on('resize', this.onWindowResize);
    if ((ref = application.tracker) != null) {
      ref.enableInspectletJS(this.levelID);
    }
    if (this.isEditorPreview) {
      this.supermodel.shouldSaveBackups = function(model) {
        var ref1;
        return (ref1 = model.constructor.className) === 'Level' || ref1 === 'LevelComponent' || ref1 === 'LevelSystem' || ref1 === 'ThangType';
      };
      f = (function(_this) {
        return function() {
          if (!_this.levelLoader) {
            return _this.load();
          }
        };
      })(this);
      setTimeout(f, 100);
    } else {
      this.load();
      if (!this.observing) {
        if ((ref1 = application.tracker) != null) {
          ref1.trackEvent('Started Level Load', {
            category: 'Play Level',
            level: this.levelID,
            label: this.levelID
          });
        }
      }
    }
  }

  PlayLevelView.prototype.setLevel = function(level, givenSupermodel) {
    var ref, serializedLevel;
    this.level = level;
    this.supermodel.models = givenSupermodel.models;
    this.supermodel.collections = givenSupermodel.collections;
    this.supermodel.shouldSaveBackups = givenSupermodel.shouldSaveBackups;
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

  PlayLevelView.prototype.load = function() {
    var levelLoaderOptions;
    this.loadStartTime = new Date();
    levelLoaderOptions = {
      supermodel: this.supermodel,
      levelID: this.levelID,
      sessionID: this.sessionID,
      opponentSessionID: this.opponentSessionID,
      team: this.getQueryVariable('team'),
      observing: this.observing,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID
    };
    if (me.isSessionless()) {
      levelLoaderOptions.fakeSessionConfig = {};
    }
    this.levelLoader = new LevelLoader(levelLoaderOptions);
    this.listenToOnce(this.levelLoader, 'world-necessities-loaded', this.onWorldNecessitiesLoaded);
    return this.listenTo(this.levelLoader, 'world-necessity-load-failed', this.onWorldNecessityLoadFailed);
  };

  PlayLevelView.prototype.onLevelLoaded = function(e) {
    if (this.destroyed) {
      return;
    }
    if ((me.isStudent() || me.isTeacher()) && !this.courseID && !e.level.isType('course-ladder')) {
      return _.defer(function() {
        return application.router.redirectHome();
      });
    }
    if (!e.level.isType('web-dev')) {
      this.god = new God({
        gameUIState: this.gameUIState,
        indefiniteLength: e.level.isType('game-dev')
      });
    }
    if (this.waitingToSetUpGod) {
      return this.setupGod();
    }
  };

  PlayLevelView.prototype.trackLevelLoadEnd = function() {
    var ref, ref1;
    if (this.isEditorPreview) {
      return;
    }
    this.loadEndTime = new Date();
    this.loadDuration = this.loadEndTime - this.loadStartTime;
    console.debug("Level unveiled after " + ((this.loadDuration / 1000).toFixed(2)) + "s");
    if (!this.observing) {
      if ((ref = application.tracker) != null) {
        ref.trackEvent('Finished Level Load', {
          category: 'Play Level',
          label: this.levelID,
          level: this.levelID,
          loadDuration: this.loadDuration
        });
      }
      return (ref1 = application.tracker) != null ? ref1.trackTiming(this.loadDuration, 'Level Load Time', this.levelID, this.levelID) : void 0;
    }
  };

  PlayLevelView.prototype.isCourseMode = function() {
    return this.courseID && this.courseInstanceID;
  };

  PlayLevelView.prototype.showAds = function() {
    return false;
    if (application.isProduction() && !me.isPremium() && !me.isTeacher() && !window.serverConfig.picoCTF && !this.isCourseMode()) {
      return me.getCampaignAdsGroup() === 'leaderboard-ads';
    }
    return false;
  };

  PlayLevelView.prototype.getRenderData = function() {
    var c;
    c = PlayLevelView.__super__.getRenderData.call(this);
    c.world = this.world;
    return c;
  };

  PlayLevelView.prototype.toggleSpellPalette = function() {
    this.$el.toggleClass('no-api');
    return $(window).trigger('resize');
  };

  PlayLevelView.prototype.afterRender = function() {
    var ref, ref1, ref2, ref3;
    PlayLevelView.__super__.afterRender.call(this);
    if (typeof window.onPlayLevelViewLoaded === "function") {
      window.onPlayLevelViewLoaded(this);
    }
    this.insertSubView(this.loadingView = new LevelLoadingView({
      autoUnveil: this.options.autoUnveil || this.observing,
      level: (ref = (ref1 = this.levelLoader) != null ? ref1.level : void 0) != null ? ref : this.level,
      session: (ref2 = (ref3 = this.levelLoader) != null ? ref3.session : void 0) != null ? ref2 : this.session
    }));
    this.$el.find('#level-done-button').hide();
    $('body').addClass('is-playing');
    if (this.isIPadApp()) {
      return $('body').bind('touchmove', false);
    }
  };

  PlayLevelView.prototype.afterInsert = function() {
    return PlayLevelView.__super__.afterInsert.call(this);
  };

  PlayLevelView.prototype.onWorldNecessitiesLoaded = function() {
    var ref, ref1, ref2, ref3, team;
    this.grabLevelLoaderData();
    team = (ref = (ref1 = (ref2 = this.getQueryVariable('team')) != null ? ref2 : this.session.get('team')) != null ? ref1 : (ref3 = this.world) != null ? ref3.teamForPlayer(0) : void 0) != null ? ref : 'humans';
    this.loadOpponentTeam(team);
    this.setupGod();
    this.setTeam(team);
    this.initGoalManager();
    this.insertSubviews();
    this.initVolume();
    this.register();
    this.controlBar.setBus(this.bus);
    return this.initScriptManager();
  };

  PlayLevelView.prototype.onWorldNecessityLoadFailed = function(resource) {
    return this.loadingView.onLoadError(resource);
  };

  PlayLevelView.prototype.grabLevelLoaderData = function() {
    var i, percent;
    this.session = this.levelLoader.session;
    this.level = this.levelLoader.level;
    if (this.level.isType('web-dev')) {
      this.$el.addClass('web-dev');
      return;
    }
    this.world = this.levelLoader.world;
    if (this.level.isType('game-dev')) {
      this.$el.addClass('game-dev');
      this.howToPlayText = utils.i18n(this.level.attributes, 'studentPlayInstructions');
      if (this.howToPlayText == null) {
        this.howToPlayText = $.i18n.t('play_game_dev_level.default_student_instructions');
      }
      this.howToPlayText = marked(this.howToPlayText, {
        sanitize: true
      });
      this.renderSelectors('#how-to-play-game-dev-panel');
    }
    if (this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev')) {
      this.$el.addClass('hero');
    }
    if (_.any(this.world.thangs, function(t) {
      var ref;
      return (t.programmableProperties && indexOf.call(t.programmableProperties, 'findFlags') >= 0) || ((ref = t.inventory) != null ? ref.flag : void 0);
    }) || this.level.get('slug') === 'sky-span') {
      this.$el.addClass('flags');
    }
    this.otherSession = this.levelLoader.opponentSession;
    if (!this.level.isType('game-dev')) {
      this.worldLoadFakeResources = [];
      for (percent = i = 1; i <= 100; percent = ++i) {
        this.worldLoadFakeResources.push(this.supermodel.addSomethingResource(1));
      }
    }
    return this.renderSelectors('#stop-real-time-playback-button');
  };

  PlayLevelView.prototype.onWorldLoadProgressChanged = function(e) {
    var i, percent, ref, ref1, worldLoadPercent;
    if (e.god !== this.god) {
      return;
    }
    if (!this.worldLoadFakeResources) {
      return;
    }
    if (this.lastWorldLoadPercent == null) {
      this.lastWorldLoadPercent = 0;
    }
    worldLoadPercent = Math.floor(100 * e.progress);
    for (percent = i = ref = this.lastWorldLoadPercent + 1, ref1 = worldLoadPercent; i <= ref1; percent = i += 1) {
      this.worldLoadFakeResources[percent - 1].markLoaded();
    }
    this.lastWorldLoadPercent = worldLoadPercent;
    if (worldLoadPercent === 100) {
      return this.worldFakeLoadResources = null;
    }
  };

  PlayLevelView.prototype.loadOpponentTeam = function(myTeam) {
    var c, i, len, myCode, opponentCode, opponentSpells, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, spell, spellTeam, spells, thang;
    opponentSpells = [];
    ref3 = (ref = (ref1 = this.session.get('teamSpells')) != null ? ref1 : (ref2 = this.otherSession) != null ? ref2.get('teamSpells') : void 0) != null ? ref : {};
    for (spellTeam in ref3) {
      spells = ref3[spellTeam];
      if (spellTeam === myTeam || !myTeam) {
        continue;
      }
      opponentSpells = opponentSpells.concat(spells);
    }
    if ((!this.session.get('teamSpells')) && ((ref4 = this.otherSession) != null ? ref4.get('teamSpells') : void 0)) {
      this.session.set('teamSpells', this.otherSession.get('teamSpells'));
    }
    opponentCode = ((ref5 = this.otherSession) != null ? ref5.get('code') : void 0) || {};
    myCode = this.session.get('code') || {};
    for (i = 0, len = opponentSpells.length; i < len; i++) {
      spell = opponentSpells[i];
      ref6 = spell.split('/'), thang = ref6[0], spell = ref6[1];
      c = (ref7 = opponentCode[thang]) != null ? ref7[spell] : void 0;
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

  PlayLevelView.prototype.setupGod = function() {
    if (this.level.isType('web-dev')) {
      return;
    }
    if (!this.god) {
      return this.waitingToSetUpGod = true;
    }
    this.waitingToSetUpGod = void 0;
    this.god.setLevel(this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      otherSession: this.otherSession,
      headless: false,
      sessionless: false
    }));
    this.god.setLevelSessionIDs(this.otherSession ? [this.session.id, this.otherSession.id] : [this.session.id]);
    return this.god.setWorldClassMap(this.world.classMap);
  };

  PlayLevelView.prototype.setTeam = function(team) {
    if (!_.isString(team)) {
      team = team != null ? team.team : void 0;
    }
    if (team == null) {
      team = 'humans';
    }
    me.team = team;
    this.session.set('team', team);
    Backbone.Mediator.publish('level:team-set', {
      team: team
    });
    return this.team = team;
  };

  PlayLevelView.prototype.initGoalManager = function() {
    var ref;
    this.goalManager = new GoalManager(this.world, this.level.get('goals'), this.team);
    return (ref = this.god) != null ? ref.setGoalManager(this.goalManager) : void 0;
  };

  PlayLevelView.prototype.updateGoals = function(goals) {
    this.level.set('goals', goals);
    this.goalManager.destroy();
    return this.initGoalManager();
  };

  PlayLevelView.prototype.updateSpellPalette = function(thang, spell) {
    var ref, ref1, useHero;
    if (!(thang && ((ref = this.spellPaletteView) != null ? ref.thang : void 0) !== thang && (thang.programmableProperties || thang.apiProperties || thang.programmableHTMLProperties))) {
      return;
    }
    useHero = /hero/.test(spell.getSource()) || !/(self[\.\:]|this\.|\@)/.test(spell.getSource());
    return this.spellPaletteView = this.insertSubView(new SpellPaletteView({
      thang: thang,
      supermodel: this.supermodel,
      programmable: spell != null ? spell.canRead() : void 0,
      language: (ref1 = spell != null ? spell.language : void 0) != null ? ref1 : this.session.get('codeLanguage'),
      session: this.session,
      level: this.level,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID,
      useHero: useHero
    }));
  };

  PlayLevelView.prototype.insertSubviews = function() {
    var ref, ref1, ref2;
    this.hintsState = new HintsState({
      hidden: true
    }, {
      session: this.session,
      level: this.level,
      supermodel: this.supermodel
    });
    this.insertSubView(this.tome = new TomeView({
      levelID: this.levelID,
      session: this.session,
      otherSession: this.otherSession,
      playLevelView: this,
      thangs: (ref = (ref1 = this.world) != null ? ref1.thangs : void 0) != null ? ref : [],
      supermodel: this.supermodel,
      level: this.level,
      observing: this.observing,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID,
      god: this.god,
      hintsState: this.hintsState
    }));
    if (!this.level.isType('web-dev')) {
      this.insertSubView(new LevelPlaybackView({
        session: this.session,
        level: this.level
      }));
    }
    this.insertSubView(new GoalsView({
      level: this.level
    }));
    if (this.$el.hasClass('flags')) {
      this.insertSubView(new LevelFlagsView({
        levelID: this.levelID,
        world: this.world
      }));
    }
    if (!this.level.isType('web-dev')) {
      if ((ref2 = this.level.get('slug')) !== 'wakka-maul') {
        this.insertSubView(new GoldView({}));
      }
    }
    if (!this.level.isType('web-dev')) {
      this.insertSubView(new HUDView({
        level: this.level
      }));
    }
    this.insertSubView(new LevelDialogueView({
      level: this.level,
      sessionID: this.session.id
    }));
    this.insertSubView(new ChatView({
      levelID: this.levelID,
      sessionID: this.session.id,
      session: this.session
    }));
    this.insertSubView(new ProblemAlertView({
      session: this.session,
      level: this.level,
      supermodel: this.supermodel
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
    this.insertSubView(this.controlBar = new ControlBarView({
      worldName: utils.i18n(this.level.attributes, 'name'),
      session: this.session,
      level: this.level,
      supermodel: this.supermodel,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID
    }));
    this.insertSubView(this.hintsView = new HintsView({
      session: this.session,
      level: this.level,
      hintsState: this.hintsState
    }), this.$('.hints-view'));
    if (this.level.isType('web-dev')) {
      return this.insertSubView(this.webSurface = new WebSurfaceView({
        level: this.level,
        goalManager: this.goalManager
      }));
    }
  };

  PlayLevelView.prototype.initVolume = function() {
    var volume;
    volume = me.get('volume');
    if (volume == null) {
      volume = 1.0;
    }
    return Backbone.Mediator.publish('level:set-volume', {
      volume: volume
    });
  };

  PlayLevelView.prototype.initScriptManager = function() {
    if (this.level.isType('web-dev')) {
      return;
    }
    this.scriptManager = new ScriptManager({
      scripts: this.world.scripts || [],
      view: this,
      session: this.session,
      levelID: this.level.get('slug')
    });
    return this.scriptManager.loadFromSession();
  };

  PlayLevelView.prototype.register = function() {
    this.bus = LevelBus.get(this.levelID, this.session.id);
    this.bus.setSession(this.session);
    return this.bus.setSpells(this.tome.spells);
  };

  PlayLevelView.prototype.onSessionLoaded = function(e) {
    var goliath, lightseeker, raider, ref, ref1, ref2, ref3, ref4, sorcerer, wizard;
    if (this.session) {
      return;
    }
    Backbone.Mediator.publish("ipad:language-chosen", {
      language: (ref = e.session.get('codeLanguage')) != null ? ref : "python"
    });
    if (e.level.get('slug') === 'zero-sum') {
      sorcerer = '52fd1524c7e6cf99160e7bc9';
      if (e.session.get('creator') === '532dbc73a622924444b68ed9') {
        sorcerer = '53e126a4e06b897606d38bef';
      }
      return e.session.set('heroConfig', {
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
    } else if (e.level.get('slug') === 'the-gauntlet-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      return e.session.set('heroConfig', {
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
    } else if (e.level.get('slug') === 'woodland-cleaver-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      return e.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "eyes": "53e238df53457600003e3f0b",
          "head": "546d38269df4a17d0d4499ff",
          "torso": "545d3f0b2d03e700001b5a5d",
          "right-hand": "544d7d1f8494308424f564a3",
          "wrists": "53e2396a53457600003e3f0f",
          "programming-book": "546e25d99df4a17d0d449be1",
          "left-hand": "544c310ae0017993fce214bf"
        }
      });
    } else if (e.level.get('slug') === 'crossroads-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      return e.session.set('heroConfig', {
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
    } else if ((ref1 = e.level.get('slug')) === 'ace-of-coders' || ref1 === 'elemental-wars') {
      goliath = '55e1a6e876cb0948c96af9f8';
      return e.session.set('heroConfig', {
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
    } else if (e.level.get('slug') === 'the-battle-of-sky-span') {
      wizard = '52fc1460b2b91c0d5a7b6af3';
      return e.session.set('heroConfig', {
        "thangType": wizard,
        "inventory": {}
      });
    } else if (e.level.get('slug') === 'assembly-speed') {
      raider = '55527eb0b8abf4ba1fe9a107';
      return e.session.set('heroConfig', {
        "thangType": raider,
        "inventory": {}
      });
    } else if (e.level.isType('hero', 'hero-ladder', 'hero-coop') && !_.size((ref2 = (ref3 = e.session.get('heroConfig')) != null ? ref3.inventory : void 0) != null ? ref2 : {})) {
      if ((ref4 = this.setupManager) != null) {
        ref4.destroy();
      }
      this.setupManager = new LevelSetupManager({
        supermodel: this.supermodel,
        level: e.level,
        levelID: this.levelID,
        parent: this,
        session: e.session,
        courseID: this.courseID,
        courseInstanceID: this.courseInstanceID
      });
      return this.setupManager.open();
    }
  };

  PlayLevelView.prototype.onLoaded = function() {
    return _.defer((function(_this) {
      return function() {
        return _this.onLevelLoaderLoaded();
      };
    })(this));
  };

  PlayLevelView.prototype.onLevelLoaderLoaded = function() {
    var ref;
    if (this.levelLoader.progress() !== 1) {
      return;
    }
    if (!this.observing && !(this.levelLoader.level.isType('ladder', 'ladder-tutorial'))) {
      me.set('lastLevel', this.levelID);
      me.save();
      if ((ref = application.tracker) != null) {
        ref.identify();
      }
    }
    if (this.otherSession) {
      this.saveRecentMatch();
    }
    this.levelLoader.destroy();
    this.levelLoader = null;
    if (this.level.isType('web-dev')) {
      return Backbone.Mediator.publish('level:started', {});
    } else {
      return this.initSurface();
    }
  };

  PlayLevelView.prototype.saveRecentMatch = function() {
    var allRecentlyPlayedMatches, recentlyPlayedMatches, ref, ref1;
    allRecentlyPlayedMatches = (ref = storage.load('recently-played-matches')) != null ? ref : {};
    recentlyPlayedMatches = (ref1 = allRecentlyPlayedMatches[this.levelID]) != null ? ref1 : [];
    allRecentlyPlayedMatches[this.levelID] = recentlyPlayedMatches;
    if (!_.find(recentlyPlayedMatches, {
      otherSessionID: this.otherSession.id
    })) {
      recentlyPlayedMatches.unshift({
        yourTeam: me.team,
        otherSessionID: this.otherSession.id,
        opponentName: this.otherSession.get('creatorName')
      });
    }
    recentlyPlayedMatches.splice(8);
    return storage.save('recently-played-matches', allRecentlyPlayedMatches);
  };

  PlayLevelView.prototype.initSurface = function() {
    var bounds, normalSurface, surfaceOptions, webGLSurface, worldBounds;
    webGLSurface = $('canvas#webgl-surface', this.$el);
    normalSurface = $('canvas#normal-surface', this.$el);
    surfaceOptions = {
      thangTypes: this.supermodel.getModels(ThangType),
      observing: this.observing,
      playerNames: this.findPlayerNames(),
      levelType: this.level.get('type', true),
      stayVisible: this.showAds(),
      gameUIState: this.gameUIState,
      level: this.level
    };
    this.surface = new Surface(this.world, normalSurface, webGLSurface, surfaceOptions);
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
    this.surface.camera.zoomTo({
      x: 0,
      y: 0
    }, 0.1, 0);
    return this.listenTo(this.surface, 'resize', function(arg) {
      var height;
      height = arg.height;
      this.$('#stop-real-time-playback-button').css({
        top: height - 30
      });
      return this.$('#how-to-play-game-dev-panel').css({
        height: height
      });
    });
  };

  PlayLevelView.prototype.findPlayerNames = function() {
    var i, len, playerNames, ref, session;
    if (!this.level.isType('ladder', 'hero-ladder', 'course-ladder')) {
      return {};
    }
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

  PlayLevelView.prototype.onLevelStarted = function() {
    var ref, ref1;
    if (!((this.surface != null) || (this.webSurface != null))) {
      return;
    }
    this.loadingView.showReady();
    this.trackLevelLoadEnd();
    if (window.currentModal && !window.currentModal.destroyed && window.currentModal.constructor !== VictoryModal) {
      return Backbone.Mediator.subscribeOnce('modal:closed', this.onLevelStarted, this);
    }
    if ((ref = this.surface) != null) {
      ref.showLevel();
    }
    Backbone.Mediator.publish('level:set-time', {
      time: 0
    });
    if ((this.isEditorPreview || this.observing) && !this.getQueryVariable('intro')) {
      this.loadingView.startUnveiling();
      return this.loadingView.unveil(true);
    } else {
      return (ref1 = this.scriptManager) != null ? ref1.initializeCamera() : void 0;
    }
  };

  PlayLevelView.prototype.onLoadingViewUnveiling = function(e) {
    return this.selectHero();
  };

  PlayLevelView.prototype.onLoadingViewUnveiled = function(e) {
    var ref, ref1;
    if (this.level.isType('course-ladder', 'hero-ladder') || this.observing) {
      Backbone.Mediator.publish('level:set-playing', {
        playing: true
      });
    }
    this.loadingView.$el.remove();
    this.removeSubView(this.loadingView);
    this.loadingView = null;
    this.playAmbientSound();
    if (!this.observing) {
      if ((ref = application.tracker) != null) {
        ref.trackEvent('Started Level', {
          category: 'Play Level',
          levelID: this.levelID,
          ls: (ref1 = this.session) != null ? ref1.get('_id') : void 0
        });
      }
    }
    $(window).trigger('resize');
    return _.delay(((function(_this) {
      return function() {
        return typeof _this.perhapsStartSimulating === "function" ? _this.perhapsStartSimulating() : void 0;
      };
    })(this)), 10 * 1000);
  };

  PlayLevelView.prototype.onSetVolume = function(e) {
    createjs.Sound.setVolume(e.volume === 1 ? 0.6 : e.volume);
    if (e.volume && !this.ambientSound) {
      return this.playAmbientSound();
    }
  };

  PlayLevelView.prototype.playAmbientSound = function() {
    var file, ref, src;
    if (this.destroyed) {
      return;
    }
    if (this.ambientSound) {
      return;
    }
    if (!me.get('volume')) {
      return;
    }
    if (!(file = {
      Dungeon: 'ambient-dungeon',
      Grass: 'ambient-grass'
    }[this.level.get('terrain')])) {
      return;
    }
    src = "/file/interface/" + file + AudioPlayer.ext;
    if (!((ref = AudioPlayer.getStatus(src)) != null ? ref.loaded : void 0)) {
      AudioPlayer.preloadSound(src);
      Backbone.Mediator.subscribeOnce('audio-player:loaded', this.playAmbientSound, this);
      return;
    }
    this.ambientSound = createjs.Sound.play(src, {
      loop: -1,
      volume: 0.1
    });
    return createjs.Tween.get(this.ambientSound).to({
      volume: 1.0
    }, 10000);
  };

  PlayLevelView.prototype.selectHero = function() {
    var ref;
    Backbone.Mediator.publish('level:suppress-selection-sounds', {
      suppress: true
    });
    Backbone.Mediator.publish('tome:select-primary-sprite', {});
    Backbone.Mediator.publish('level:suppress-selection-sounds', {
      suppress: false
    });
    return (ref = this.surface) != null ? ref.focusOnHero() : void 0;
  };

  PlayLevelView.prototype.perhapsStartSimulating = function() {
    if (!this.shouldSimulate()) {
      return;
    }
    return console.error("Should not auto-simulate until we fix how these languages are loaded");
    return this.simulateNextGame();
  };

  PlayLevelView.prototype.simulateNextGame = function() {
    var fetchAndSimulateOneGameOriginal, simulatorOptions;
    if (this.simulator) {
      return this.simulator.fetchAndSimulateOneGame();
    }
    simulatorOptions = {
      background: true,
      leagueID: this.courseInstanceID
    };
    if (this.level.isType('course-ladder', 'hero-ladder')) {
      simulatorOptions.levelID = this.level.get('slug');
    }
    this.simulator = new Simulator(simulatorOptions);
    fetchAndSimulateOneGameOriginal = this.simulator.fetchAndSimulateOneGame;
    this.simulator.fetchAndSimulateOneGame = (function(_this) {
      return function() {
        if (_this.simulator.simulatedByYou >= 10) {
          console.log('------------------- Destroying Simulator and making a new one -----------------');
          _this.simulator.destroy();
          _this.simulator = null;
          return _this.simulateNextGame();
        } else {
          return fetchAndSimulateOneGameOriginal.apply(_this.simulator);
        }
      };
    })(this);
    return this.simulator.fetchAndSimulateOneGame();
  };

  PlayLevelView.prototype.shouldSimulate = function() {
    var cores, defaultCores, defaultHeapLimit, gamesSimulated, heapLimit, ref, ref1, ref2, ref3, ref4, ref5, ref6, stillBuggy;
    if (this.getQueryVariable('simulate') === true) {
      return true;
    }
    if (this.getQueryVariable('simulate') === false) {
      return false;
    }
    stillBuggy = true;
    defaultCores = 2;
    cores = window.navigator.hardwareConcurrency || defaultCores;
    defaultHeapLimit = 793000000;
    heapLimit = ((ref = window.performance) != null ? (ref1 = ref.memory) != null ? ref1.jsHeapSizeLimit : void 0 : void 0) || defaultHeapLimit;
    gamesSimulated = me.get('simulatedBy');
    console.debug("Should we start simulating? Cores:", window.navigator.hardwareConcurrency, "Heap limit:", (ref2 = window.performance) != null ? (ref3 = ref2.memory) != null ? ref3.jsHeapSizeLimit : void 0 : void 0, "Load duration:", this.loadDuration);
    if (!((ref4 = $.browser) != null ? ref4.desktop : void 0)) {
      return false;
    }
    if (((ref5 = $.browser) != null ? ref5.msie : void 0) || ((ref6 = $.browser) != null ? ref6.msedge : void 0)) {
      return false;
    }
    if ($.browser.linux) {
      return false;
    }
    if (me.level() < 8) {
      return false;
    }
    if (this.level.isType('course', 'game-dev', 'web-dev')) {
      return false;
    } else if (this.level.isType('hero') && gamesSimulated) {
      if (stillBuggy) {
        return false;
      }
      if (cores < 8) {
        return false;
      }
      if (heapLimit < defaultHeapLimit) {
        return false;
      }
      if (this.loadDuration > 10000) {
        return false;
      }
    } else if (this.level.isType('hero-ladder') && gamesSimulated) {
      if (stillBuggy) {
        return false;
      }
      if (cores < 4) {
        return false;
      }
      if (heapLimit < defaultHeapLimit) {
        return false;
      }
      if (this.loadDuration > 15000) {
        return false;
      }
    } else if (this.level.isType('hero-ladder') && !gamesSimulated) {
      if (stillBuggy) {
        return false;
      }
      if (cores < 8) {
        return false;
      }
      if (heapLimit <= defaultHeapLimit) {
        return false;
      }
      if (this.loadDuration > 20000) {
        return false;
      }
    } else if (this.level.isType('course-ladder')) {
      if (cores <= defaultCores) {
        return false;
      }
      if (heapLimit < defaultHeapLimit) {
        return false;
      }
      if (this.loadDuration > 18000) {
        return false;
      }
    } else {
      console.warn("Unwritten level type simulation heuristics; fill these in for new level type " + (this.level.get('type')) + "?");
      if (stillBuggy) {
        return false;
      }
      if (cores < 8) {
        return false;
      }
      if (heapLimit < defaultHeapLimit) {
        return false;
      }
      if (this.loadDuration > 10000) {
        return false;
      }
    }
    console.debug("We should have the power. Begin background ladder simulation.");
    return true;
  };

  PlayLevelView.prototype.onCtrlS = function(e) {
    return e.preventDefault();
  };

  PlayLevelView.prototype.onEscapePressed = function(e) {
    if (!this.$el.hasClass('real-time')) {
      return;
    }
    return Backbone.Mediator.publish('playback:stop-real-time-playback', {});
  };

  PlayLevelView.prototype.onLevelReloadFromData = function(e) {
    var isReload, model, ref, url;
    isReload = Boolean(this.world);
    if (isReload) {
      ref = this.supermodel.models;
      for (url in ref) {
        model = ref[url];
        if (!e.supermodel.models[url]) {
          e.supermodel.registerModel(model);
        }
      }
    }
    this.setLevel(e.level, e.supermodel);
    if (isReload) {
      this.scriptManager.setScripts(e.level.get('scripts'));
      this.updateGoals(e.level.get('goals'));
      return Backbone.Mediator.publish('tome:cast-spell', {});
    }
  };

  PlayLevelView.prototype.onLevelReloadThangType = function(e) {
    var key, model, ref, ref1, tt, url, val;
    tt = e.thangType;
    ref = this.supermodel.models;
    for (url in ref) {
      model = ref[url];
      if (model.id === tt.id) {
        ref1 = tt.attributes;
        for (key in ref1) {
          val = ref1[key];
          model.attributes[key] = val;
        }
        break;
      }
    }
    return Backbone.Mediator.publish('tome:cast-spell', {});
  };

  PlayLevelView.prototype.onWindowResize = function(e) {
    return this.endHighlight();
  };

  PlayLevelView.prototype.onDisableControls = function(e) {
    if (e.controls && !(indexOf.call(e.controls, 'level') >= 0)) {
      return;
    }
    this.shortcutsEnabled = false;
    this.wasFocusedOn = document.activeElement;
    return $('body').focus();
  };

  PlayLevelView.prototype.onEnableControls = function(e) {
    if ((e.controls != null) && !(indexOf.call(e.controls, 'level') >= 0)) {
      return;
    }
    this.shortcutsEnabled = true;
    if (this.wasFocusedOn) {
      $(this.wasFocusedOn).focus();
    }
    return this.wasFocusedOn = null;
  };

  PlayLevelView.prototype.onDonePressed = function() {
    return this.showVictory();
  };

  PlayLevelView.prototype.onShowVictory = function(e) {
    var ref, ref1, ref2, victoryTime;
    if (e == null) {
      e = {};
    }
    if (!this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      $('#level-done-button').show();
    }
    if (e.showModal) {
      this.showVictory(_.pick(e, 'manual'));
    }
    if (this.victorySeen) {
      return;
    }
    this.victorySeen = true;
    victoryTime = (new Date()) - this.loadEndTime;
    if (!this.observing && victoryTime > 10 * 1000) {
      if ((ref = application.tracker) != null) {
        ref.trackEvent('Saw Victory', {
          category: 'Play Level',
          level: this.level.get('name'),
          label: this.level.get('name'),
          levelID: this.levelID,
          ls: (ref1 = this.session) != null ? ref1.get('_id') : void 0
        });
      }
      return (ref2 = application.tracker) != null ? ref2.trackTiming(victoryTime, 'Level Victory Time', this.levelID, this.levelID) : void 0;
    }
  };

  PlayLevelView.prototype.showVictory = function(options) {
    var ModalClass, ref, victoryModal;
    if (options == null) {
      options = {};
    }
    if (this.level.hasLocalChanges()) {
      return;
    }
    if (this.level.isType('game-dev') && this.level.get('shareable') && !options.manual) {
      return;
    }
    this.endHighlight();
    options = {
      level: this.level,
      supermodel: this.supermodel,
      session: this.session,
      hasReceivedMemoryWarning: this.hasReceivedMemoryWarning,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID,
      world: this.world
    };
    ModalClass = this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') ? HeroVictoryModal : VictoryModal;
    if (this.isCourseMode() || me.isSessionless()) {
      ModalClass = CourseVictoryModal;
    }
    if (this.level.isType('course-ladder')) {
      ModalClass = CourseVictoryModal;
      options.courseInstanceID = this.getQueryVariable('course-instance') || this.getQueryVariable('league');
    }
    if (window.serverConfig.picoCTF) {
      ModalClass = PicoCTFVictoryModal;
    }
    victoryModal = new ModalClass(options);
    this.openModalView(victoryModal);
    if (me.get('anonymous')) {
      return window.nextURL = '/play/' + ((ref = this.level.get('campaign')) != null ? ref : '');
    }
  };

  PlayLevelView.prototype.onRestartLevel = function() {
    var ref;
    this.tome.reloadAllCode();
    Backbone.Mediator.publish('level:restarted', {});
    $('#level-done-button', this.$el).hide();
    if (!this.observing) {
      return (ref = application.tracker) != null ? ref.trackEvent('Confirmed Restart', {
        category: 'Play Level',
        level: this.level.get('name'),
        label: this.level.get('name')
      }) : void 0;
    }
  };

  PlayLevelView.prototype.onInfiniteLoop = function(e) {
    var ref;
    if (!(e.firstWorld && e.god === this.god)) {
      return;
    }
    this.openModalView(new InfiniteLoopModal({
      nonUserCodeProblem: e.nonUserCodeProblem
    }));
    if (!this.observing) {
      return (ref = application.tracker) != null ? ref.trackEvent('Saw Initial Infinite Loop', {
        category: 'Play Level',
        level: this.level.get('name'),
        label: this.level.get('name')
      }) : void 0;
    }
  };

  PlayLevelView.prototype.onHighlightDOM = function(e) {
    return this.highlightElement(e.selector, {
      delay: e.delay,
      sides: e.sides,
      offset: e.offset,
      rotation: e.rotation
    });
  };

  PlayLevelView.prototype.onEndHighlight = function() {
    return this.endHighlight();
  };

  PlayLevelView.prototype.onFocusDom = function(e) {
    return $(e.selector).focus();
  };

  PlayLevelView.prototype.onContactClicked = function(e) {
    var body, contactModal, screenshot;
    if (me.isStudent()) {
      console.error("Student clicked contact modal.");
      return;
    }
    Backbone.Mediator.publish('level:contact-button-pressed', {});
    this.openModalView(contactModal = new ContactModal({
      levelID: this.level.get('slug') || this.level.id,
      courseID: this.courseID,
      courseInstanceID: this.courseInstanceID
    }));
    screenshot = this.surface.screenshot(1, 'image/png', 1.0, 1);
    body = {
      b64png: screenshot.replace('data:image/png;base64,', ''),
      filename: "screenshot-" + this.levelID + "-" + (_.string.slugify((new Date()).toString())) + ".png",
      path: "db/user/" + me.id,
      mimetype: 'image/png'
    };
    contactModal.screenshotURL = "http://codecombat.com/file/" + body.path + "/" + body.filename;
    window.screenshot = screenshot;
    window.screenshotURL = contactModal.screenshotURL;
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: function(e) {
        return typeof contactModal.updateScreenshot === "function" ? contactModal.updateScreenshot() : void 0;
      }
    });
  };

  PlayLevelView.prototype.onNewWorld = function(e) {
    var finishedLoading, i, len, message, ref, ref1, ref2, results, scripts, sound, spriteName, startFrame, thangType, thangTypes;
    if (this.headless) {
      return;
    }
    scripts = this.world.scripts;
    this.world = e.world;
    this.world.scripts = scripts;
    thangTypes = this.supermodel.getModels(ThangType);
    startFrame = (ref = this.lastWorldFramesLoaded) != null ? ref : 0;
    finishedLoading = this.world.frames.length === this.world.totalFrames;
    if (finishedLoading) {
      this.lastWorldFramesLoaded = 0;
      if (this.waitingForSubmissionComplete) {
        _.defer(this.onSubmissionComplete);
        this.waitingForSubmissionComplete = false;
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

  PlayLevelView.prototype.onRealTimePlaybackStarted = function(e) {
    this.$el.addClass('real-time').focus();
    if (this.level.isType('game-dev')) {
      this.$('#how-to-play-game-dev-panel').removeClass('hide');
    }
    return this.onWindowResize();
  };

  PlayLevelView.prototype.onRealTimePlaybackEnded = function(e) {
    var ref;
    if (!this.$el.hasClass('real-time')) {
      return;
    }
    if (this.level.isType('game-dev')) {
      this.$('#how-to-play-game-dev-panel').addClass('hide');
    }
    this.$el.removeClass('real-time');
    this.onWindowResize();
    if (this.world.frames.length === this.world.totalFrames && !((ref = this.surface.countdownScreen) != null ? ref.showing : void 0)) {
      return _.delay(this.onSubmissionComplete, 750);
    } else {
      return this.waitingForSubmissionComplete = true;
    }
  };

  PlayLevelView.prototype.onSubmissionComplete = function() {
    var showModalFn;
    if (this.destroyed) {
      return;
    }
    Backbone.Mediator.publish('level:set-time', {
      ratio: 1
    });
    if (this.level.hasLocalChanges()) {
      return;
    }
    if (this.goalManager.checkOverallStatus() === 'success') {
      showModalFn = function() {
        return Backbone.Mediator.publish('level:show-victory', {
          showModal: true
        });
      };
      this.session.recordScores(this.world.scores, this.level);
      if (this.level.get('replayable')) {
        return this.session.increaseDifficulty(showModalFn);
      } else {
        return showModalFn();
      }
    }
  };

  PlayLevelView.prototype.destroy = function() {
    var ambientSound, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
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
    if ((ref5 = this.setupManager) != null) {
      ref5.destroy();
    }
    if ((ref6 = this.simulator) != null) {
      ref6.destroy();
    }
    if (ambientSound = this.ambientSound) {
      createjs.Tween.get(ambientSound).to({
        volume: 0.0
      }, 1500).call(function() {
        return ambientSound.stop();
      });
    }
    $(window).off('resize', this.onWindowResize);
    delete window.world;
    if ((ref7 = this.bus) != null) {
      ref7.destroy();
    }
    delete window.nextURL;
    if (PROFILE_ME) {
      if (typeof console.profileEnd === "function") {
        console.profileEnd();
      }
    }
    if ((ref8 = application.tracker) != null) {
      ref8.disableInspectletJS();
    }
    return PlayLevelView.__super__.destroy.call(this);
  };

  PlayLevelView.prototype.onIPadMemoryWarning = function(e) {
    return this.hasReceivedMemoryWarning = true;
  };

  PlayLevelView.prototype.onItemPurchased = function(e) {
    var heroConfig, inventory, ref, ref1, ref2, slot;
    heroConfig = (ref = this.session.get('heroConfig')) != null ? ref : {};
    inventory = (ref1 = heroConfig.inventory) != null ? ref1 : {};
    slot = e.item.getAllowedSlots()[0];
    if (slot && !inventory[slot]) {
      if ((ref2 = this.setupManager) != null) {
        ref2.destroy();
      }
      this.setupManager = new LevelSetupManager({
        supermodel: this.supermodel,
        level: this.level,
        levelID: this.levelID,
        parent: this,
        session: this.session,
        hadEverChosenHero: true
      });
      return this.setupManager.open();
    }
  };

  return PlayLevelView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/PlayLevelView.js.map
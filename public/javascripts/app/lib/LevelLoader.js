require.register("lib/LevelLoader", function(exports, require, module) {
var Article, AudioPlayer, CocoClass, LOG, Level, LevelComponent, LevelLoader, LevelSession, LevelSystem, ThangNamesCollection, ThangType, World, app, reportedLoadErrorAlready, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

LevelSystem = require('models/LevelSystem');

Article = require('models/Article');

LevelSession = require('models/LevelSession');

ThangType = require('models/ThangType');

ThangNamesCollection = require('collections/ThangNamesCollection');

CocoClass = require('core/CocoClass');

AudioPlayer = require('lib/AudioPlayer');

app = require('core/application');

World = require('lib/world/world');

utils = require('core/utils');

LOG = me.get('name') === 'Shanakin';

reportedLoadErrorAlready = false;

module.exports = LevelLoader = (function(superClass) {
  extend(LevelLoader, superClass);

  function LevelLoader(options) {
    this.buildLoop = bind(this.buildLoop, this);
    var ref;
    this.t0 = new Date().getTime();
    LevelLoader.__super__.constructor.call(this);
    this.supermodel = options.supermodel;
    this.supermodel.setMaxProgress(0.2);
    this.levelID = options.levelID;
    this.sessionID = options.sessionID;
    this.opponentSessionID = options.opponentSessionID;
    this.team = options.team;
    this.headless = options.headless;
    this.loadArticles = options.loadArticles;
    this.sessionless = options.sessionless;
    this.fakeSessionConfig = options.fakeSessionConfig;
    this.spectateMode = (ref = options.spectateMode) != null ? ref : false;
    this.observing = options.observing;
    this.courseID = options.courseID;
    this.courseInstanceID = options.courseInstanceID;
    this.worldNecessities = [];
    this.listenTo(this.supermodel, 'resource-loaded', this.onWorldNecessityLoaded);
    this.listenTo(this.supermodel, 'failed', this.onWorldNecessityLoadFailed);
    this.loadLevel();
    this.loadAudio();
    this.playJingle();
    if (this.supermodel.finished()) {
      this.onSupermodelLoaded();
    } else {
      this.loadTimeoutID = setTimeout(this.reportLoadError.bind(this), 30000);
      this.listenToOnce(this.supermodel, 'loaded-all', this.onSupermodelLoaded);
    }
  }

  LevelLoader.prototype.loadWorldNecessities = function() {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        if (_this.world) {
          return resolve(_this);
        }
        _this.once('world-necessities-loaded', function() {
          return resolve(_this);
        });
        return _this.once('world-necessity-load-failed', function(arg1) {
          var jqxhr, ref, resource;
          resource = arg1.resource;
          jqxhr = resource.jqxhr;
          return reject({
            message: ((ref = jqxhr.responseJSON) != null ? ref.message : void 0) || jqxhr.responseText || 'Unknown Error'
          });
        });
      };
    })(this));
  };

  LevelLoader.prototype.loadLevel = function() {
    this.level = this.supermodel.getModel(Level, this.levelID) || new Level({
      _id: this.levelID
    });
    if (this.level.loaded) {
      return this.onLevelLoaded();
    } else {
      this.level = this.supermodel.loadModel(this.level, 'level').model;
      return this.listenToOnce(this.level, 'sync', this.onLevelLoaded);
    }
  };

  LevelLoader.prototype.reportLoadError = function() {
    var ref, ref1, ref2;
    if (this.destroyed) {
      return;
    }
    return (ref = window.tracker) != null ? ref.trackEvent('LevelLoadError', {
      category: 'Error',
      levelSlug: (ref1 = this.work) != null ? (ref2 = ref1.level) != null ? ref2.slug : void 0 : void 0,
      unloaded: JSON.stringify(this.supermodel.report().map(function(m) {
        return _.result(m.model, 'url');
      }))
    }) : void 0;
  };

  LevelLoader.prototype.onLevelLoaded = function() {
    var originalGet, realType;
    if (!this.sessionless && this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course')) {
      this.sessionDependenciesRegistered = {};
    }
    if (this.level.isType('web-dev')) {
      this.headless = true;
      if (this.sessionless) {
        originalGet = this.level.get;
        this.level.get = function() {
          if (arguments[0] === 'type') {
            return 'hero';
          }
          if (arguments[0] === 'realType') {
            return 'web-dev';
          }
          return originalGet.apply(this, arguments);
        };
      }
    }
    if ((this.courseID && !this.level.isType('course', 'course-ladder', 'game-dev', 'web-dev')) || window.serverConfig.picoCTF) {
      originalGet = this.level.get;
      realType = this.level.get('type');
      this.level.get = function() {
        if (arguments[0] === 'type') {
          return 'course';
        }
        if (arguments[0] === 'realType') {
          return realType;
        }
        return originalGet.apply(this, arguments);
      };
    }
    if (window.serverConfig.picoCTF) {
      this.supermodel.addRequestResource({
        url: '/picoctf/problems',
        success: (function(_this) {
          return function(picoCTFProblems) {
            var ref;
            return (ref = _this.level) != null ? ref.picoCTFProblem = _.find(picoCTFProblems, {
              pid: _this.level.get('picoCTFProblem')
            }) : void 0;
          };
        })(this)
      }).load();
    }
    if (this.sessionless) {
      null;
    } else if (this.fakeSessionConfig != null) {
      this.loadFakeSession();
    } else {
      this.loadSession();
    }
    return this.populateLevel();
  };

  LevelLoader.prototype.loadFakeSession = function() {
    var base, initVals, j, len, method, ref, ref1;
    initVals = {
      level: {
        original: this.level.get('original'),
        majorVersion: this.level.get('version').major
      },
      creator: me.id,
      state: {
        complete: false,
        scripts: {}
      },
      permissions: [
        {
          target: me.id,
          access: 'owner'
        }, {
          target: 'public',
          access: 'write'
        }
      ],
      codeLanguage: this.fakeSessionConfig.codeLanguage || ((ref = me.get('aceConfig')) != null ? ref.language : void 0) || 'python',
      _id: 'A Fake Session ID'
    };
    this.session = new LevelSession(initVals);
    this.session.loaded = true;
    if (typeof (base = this.fakeSessionConfig).callback === "function") {
      base.callback(this.session, this.level);
    }
    ref1 = ['save', 'patch', 'put'];
    for (j = 0, len = ref1.length; j < len; j++) {
      method = ref1[j];
      this.session[method] = function() {
        return console.error("We shouldn't be doing a session." + method + ", since it's a fake session.");
      };
    }
    this.session.fake = true;
    return this.loadDependenciesForSession(this.session);
  };

  LevelLoader.prototype.loadSession = function() {
    var opponentSession, opponentURL, session, url;
    if (this.sessionID) {
      url = "/db/level.session/" + this.sessionID;
      if (this.spectateMode) {
        url += "?interpret=true";
      }
    } else {
      url = "/db/level/" + this.levelID + "/session";
      if (this.team) {
        url += "?team=" + this.team;
      } else if (this.courseID) {
        url += "?course=" + this.courseID;
        if (this.courseInstanceID) {
          url += "&courseInstance=" + this.courseInstanceID;
        }
      }
    }
    session = new LevelSession().setURL(url);
    if (this.headless && !this.level.isType('web-dev')) {
      session.project = ['creator', 'team', 'heroConfig', 'codeLanguage', 'submittedCodeLanguage', 'state', 'submittedCode', 'submitted'];
    }
    this.sessionResource = this.supermodel.loadModel(session, 'level_session', {
      cache: false
    });
    this.session = this.sessionResource.model;
    if (this.opponentSessionID) {
      opponentURL = "/db/level.session/" + this.opponentSessionID + "?interpret=true";
      opponentSession = new LevelSession().setURL(opponentURL);
      if (this.headless) {
        opponentSession.project = session.project;
      }
      this.opponentSessionResource = this.supermodel.loadModel(opponentSession, 'opponent_session', {
        cache: false
      });
      this.opponentSession = this.opponentSessionResource.model;
    }
    if (this.session.loaded) {
      this.session.setURL('/db/level.session/' + this.session.id);
      this.loadDependenciesForSession(this.session);
    } else {
      this.listenToOnce(this.session, 'sync', function() {
        this.session.setURL('/db/level.session/' + this.session.id);
        return this.loadDependenciesForSession(this.session);
      });
    }
    if (this.opponentSession) {
      if (this.opponentSession.loaded) {
        return this.loadDependenciesForSession(this.opponentSession);
      } else {
        return this.listenToOnce(this.opponentSession, 'sync', this.loadDependenciesForSession);
      }
    }
  };

  LevelLoader.prototype.loadDependenciesForSession = function(session) {
    var code, codeLanguage, compressed, heroConfig, heroResource, heroThangType, itemResource, itemThangType, j, len, ref, ref1, ref2, ref3, ref4, team, uncompressed, url;
    if (LOG) {
      console.log("Loading dependencies for session: ", session);
    }
    if (me.id !== session.get('creator')) {
      session.patch = session.save = function() {
        return console.error("Not saving session, since we didn't create it.");
      };
    } else if (codeLanguage = utils.getQueryVariable('codeLanguage')) {
      session.set('codeLanguage', codeLanguage);
    }
    this.loadCodeLanguagesForSession(session);
    if (compressed = session.get('interpret')) {
      uncompressed = LZString.decompressFromUTF16(compressed);
      code = session.get('code');
      code[session.get('team') === 'humans' ? 'hero-placeholder' : 'hero-placeholder-1'].plan = uncompressed;
      session.set('code', code);
      session.unset('interpret');
    }
    if ((ref = session.get('codeLanguage')) === 'io' || ref === 'clojure') {
      session.set('codeLanguage', 'python');
    }
    if (session === this.session) {
      this.addSessionBrowserInfo(session);
      team = (ref1 = this.team) != null ? ref1 : this.session.get('team');
      Backbone.Mediator.publish('level:loaded', {
        level: this.level,
        team: team
      });
      Backbone.Mediator.publish('level:session-loaded', {
        level: this.level,
        session: this.session
      });
      if ((ref2 = this.opponentSession) != null ? ref2.loaded : void 0) {
        this.consolidateFlagHistory();
      }
    } else if (session === this.opponentSession) {
      if (this.session.loaded) {
        this.consolidateFlagHistory();
      }
    }
    if (this.level.isType('course')) {
      heroThangType = ((ref3 = me.get('heroConfig')) != null ? ref3.thangType : void 0) || ThangType.heroes.captain;
      if (LOG) {
        console.log("Course mode, loading custom hero: ", heroThangType);
      }
      url = "/db/thang.type/" + heroThangType + "/version";
      if (heroResource = this.maybeLoadURL(url, ThangType, 'thang')) {
        if (LOG) {
          console.log("Pushing resource: ", heroResource);
        }
        this.worldNecessities.push(heroResource);
      }
      this.sessionDependenciesRegistered[session.id] = true;
    }
    if (!this.level.isType('hero', 'hero-ladder', 'hero-coop')) {
      if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
        this.onWorldNecessitiesLoaded();
      }
      return;
    }
    heroConfig = session.get('heroConfig');
    if (session === this.session && !this.headless) {
      if (heroConfig == null) {
        heroConfig = me.get('heroConfig');
      }
    }
    if (heroConfig == null) {
      heroConfig = {};
    }
    if (heroConfig.inventory == null) {
      heroConfig.inventory = {
        feet: '53e237bf53457600003e3f05'
      };
    }
    if (heroConfig.thangType == null) {
      heroConfig.thangType = '529ffbf1cf1818f2be000001';
    }
    if (!_.isEqual(heroConfig, session.get('heroConfig'))) {
      session.set('heroConfig', heroConfig);
    }
    url = "/db/thang.type/" + heroConfig.thangType + "/version";
    if (heroResource = this.maybeLoadURL(url, ThangType, 'thang')) {
      this.worldNecessities.push(heroResource);
    } else {
      heroThangType = this.supermodel.getModel(url);
      this.loadDefaultComponentsForThangType(heroThangType);
      this.loadThangsRequiredByThangType(heroThangType);
    }
    ref4 = _.values(heroConfig.inventory);
    for (j = 0, len = ref4.length; j < len; j++) {
      itemThangType = ref4[j];
      url = "/db/thang.type/" + itemThangType + "/version?project=name,components,original,rasterIcon,kind";
      if (itemResource = this.maybeLoadURL(url, ThangType, 'thang')) {
        this.worldNecessities.push(itemResource);
      } else {
        itemThangType = this.supermodel.getModel(url);
        this.loadDefaultComponentsForThangType(itemThangType);
        this.loadThangsRequiredByThangType(itemThangType);
      }
    }
    this.sessionDependenciesRegistered[session.id] = true;
    if (_.size(this.sessionDependenciesRegistered) === 2 && this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.loadCodeLanguagesForSession = function(session) {
    var codeLanguage, codeLanguages, j, len, results;
    codeLanguages = _.uniq(_.filter([session.get('codeLanguage') || 'python', session.get('submittedCodeLanguage')]));
    results = [];
    for (j = 0, len = codeLanguages.length; j < len; j++) {
      codeLanguage = codeLanguages[j];
      if (codeLanguage === 'clojure' || codeLanguage === 'io') {
        continue;
      }
      results.push((function(_this) {
        return function(codeLanguage) {
          var languageModuleResource, modulePath, onModuleLoaded, ref;
          modulePath = "vendor/aether-" + codeLanguage;
          if (!((ref = application.moduleLoader) != null ? ref.load(modulePath) : void 0)) {
            return;
          }
          languageModuleResource = _this.supermodel.addSomethingResource('language_module');
          onModuleLoaded = function(e) {
            if (e.id !== modulePath) {
              return;
            }
            languageModuleResource.markLoaded();
            return this.stopListening(application.moduleLoader, 'loaded', onModuleLoaded);
          };
          return _this.listenTo(application.moduleLoader, 'loaded', onModuleLoaded);
        };
      })(this)(codeLanguage));
    }
    return results;
  };

  LevelLoader.prototype.addSessionBrowserInfo = function(session) {
    var browser;
    if (me.id !== session.get('creator')) {
      return;
    }
    if ($.browser == null) {
      return;
    }
    browser = {};
    if ($.browser.desktop) {
      browser['desktop'] = $.browser.desktop;
    }
    if ($.browser.name) {
      browser['name'] = $.browser.name;
    }
    if ($.browser.platform) {
      browser['platform'] = $.browser.platform;
    }
    if ($.browser.version) {
      browser['version'] = $.browser.version;
    }
    session.set('browser', browser);
    if (!session.fake) {
      return session.patch();
    }
  };

  LevelLoader.prototype.consolidateFlagHistory = function() {
    var myFlagHistory, opponentFlagHistory, ref, ref1, ref2, ref3, state;
    state = (ref = this.session.get('state')) != null ? ref : {};
    myFlagHistory = _.filter((ref1 = state.flagHistory) != null ? ref1 : [], {
      team: this.session.get('team')
    });
    opponentFlagHistory = _.filter((ref2 = (ref3 = this.opponentSession.get('state')) != null ? ref3.flagHistory : void 0) != null ? ref2 : [], {
      team: this.opponentSession.get('team')
    });
    state.flagHistory = myFlagHistory.concat(opponentFlagHistory);
    return this.session.set('state', state);
  };

  LevelLoader.prototype.populateLevel = function() {
    var article, articleVersions, comp, componentVersions, flagThang, indieSprite, indieSprites, j, l, len, len1, len2, len3, len4, len5, len6, len7, n, o, obj, objUniq, p, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, s, system, systemVersions, thang, thangIDs, u, url, worldNecessities;
    thangIDs = [];
    componentVersions = [];
    systemVersions = [];
    articleVersions = [];
    flagThang = {
      thangType: '53fa25f25bc220000052c2be',
      id: 'Placeholder Flag',
      components: []
    };
    ref = (this.level.get('thangs') || []).concat([flagThang]);
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      thangIDs.push(thang.thangType);
      this.loadThangsRequiredByLevelThang(thang);
      ref1 = thang.components || [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        comp = ref1[l];
        componentVersions.push(_.pick(comp, ['original', 'majorVersion']));
      }
    }
    ref2 = this.level.get('systems') || [];
    for (n = 0, len2 = ref2.length; n < len2; n++) {
      system = ref2[n];
      systemVersions.push(_.pick(system, ['original', 'majorVersion']));
      if (indieSprites = system != null ? (ref3 = system.config) != null ? ref3.indieSprites : void 0 : void 0) {
        for (o = 0, len3 = indieSprites.length; o < len3; o++) {
          indieSprite = indieSprites[o];
          thangIDs.push(indieSprite.thangType);
        }
      }
    }
    if (!(this.headless && !this.loadArticles)) {
      ref5 = ((ref4 = this.level.get('documentation')) != null ? ref4.generalArticles : void 0) || [];
      for (p = 0, len4 = ref5.length; p < len4; p++) {
        article = ref5[p];
        articleVersions.push(_.pick(article, ['original', 'majorVersion']));
      }
    }
    objUniq = function(array) {
      return _.uniq(array, false, function(arg) {
        return JSON.stringify(arg);
      });
    };
    worldNecessities = [];
    this.thangIDs = _.uniq(thangIDs);
    this.thangNames = new ThangNamesCollection(this.thangIDs);
    worldNecessities.push(this.supermodel.loadCollection(this.thangNames, 'thang_names'));
    this.listenToOnce(this.thangNames, 'sync', this.onThangNamesLoaded);
    if ((ref6 = this.sessionResource) != null ? ref6.isLoading : void 0) {
      worldNecessities.push(this.sessionResource);
    }
    if ((ref7 = this.opponentSessionResource) != null ? ref7.isLoading : void 0) {
      worldNecessities.push(this.opponentSessionResource);
    }
    ref8 = objUniq(componentVersions);
    for (q = 0, len5 = ref8.length; q < len5; q++) {
      obj = ref8[q];
      url = "/db/level.component/" + obj.original + "/version/" + obj.majorVersion;
      worldNecessities.push(this.maybeLoadURL(url, LevelComponent, 'component'));
    }
    ref9 = objUniq(systemVersions);
    for (s = 0, len6 = ref9.length; s < len6; s++) {
      obj = ref9[s];
      url = "/db/level.system/" + obj.original + "/version/" + obj.majorVersion;
      worldNecessities.push(this.maybeLoadURL(url, LevelSystem, 'system'));
    }
    ref10 = objUniq(articleVersions);
    for (u = 0, len7 = ref10.length; u < len7; u++) {
      obj = ref10[u];
      url = "/db/article/" + obj.original + "/version/" + obj.majorVersion;
      this.maybeLoadURL(url, Article, 'article');
    }
    if (obj = this.level.get('nextLevel')) {
      url = "/db/level/" + obj.original + "/version/" + obj.majorVersion;
      this.maybeLoadURL(url, Level, 'level');
    }
    return this.worldNecessities = this.worldNecessities.concat(worldNecessities);
  };

  LevelLoader.prototype.loadThangsRequiredByLevelThang = function(levelThang) {
    return this.loadThangsRequiredFromComponentList(levelThang.components);
  };

  LevelLoader.prototype.loadThangsRequiredByThangType = function(thangType) {
    return this.loadThangsRequiredFromComponentList(thangType.get('components'));
  };

  LevelLoader.prototype.loadThangsRequiredFromComponentList = function(components) {
    var component, extantRequiredThangTypes, itemThangType, j, l, len, len1, len2, n, ref, ref1, requiredThangTypes, results, thangType, url;
    if (!components) {
      return;
    }
    requiredThangTypes = [];
    for (j = 0, len = components.length; j < len; j++) {
      component = components[j];
      if (component.config) {
        if (component.original === LevelComponent.EquipsID) {
          ref1 = _.values((ref = component.config.inventory) != null ? ref : {});
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            itemThangType = ref1[l];
            requiredThangTypes.push(itemThangType);
          }
        } else if (component.config.requiredThangTypes) {
          requiredThangTypes = requiredThangTypes.concat(component.config.requiredThangTypes);
        }
      }
    }
    extantRequiredThangTypes = _.filter(requiredThangTypes);
    if (extantRequiredThangTypes.length < requiredThangTypes.length) {
      console.error("Some Thang had a blank required ThangType in components list:", components);
    }
    results = [];
    for (n = 0, len2 = extantRequiredThangTypes.length; n < len2; n++) {
      thangType = extantRequiredThangTypes[n];
      url = "/db/thang.type/" + thangType + "/version?project=name,components,original,rasterIcon,kind,prerenderedSpriteSheetData";
      results.push(this.worldNecessities.push(this.maybeLoadURL(url, ThangType, 'thang')));
    }
    return results;
  };

  LevelLoader.prototype.onThangNamesLoaded = function(thangNames) {
    var j, len, ref, thangType;
    ref = thangNames.models;
    for (j = 0, len = ref.length; j < len; j++) {
      thangType = ref[j];
      this.loadDefaultComponentsForThangType(thangType);
      this.loadThangsRequiredByThangType(thangType);
    }
    this.thangNamesLoaded = true;
    if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.loadDefaultComponentsForThangType = function(thangType) {
    var component, components, j, len, results, url;
    if (!(components = thangType.get('components'))) {
      return;
    }
    results = [];
    for (j = 0, len = components.length; j < len; j++) {
      component = components[j];
      url = "/db/level.component/" + component.original + "/version/" + component.majorVersion;
      results.push(this.worldNecessities.push(this.maybeLoadURL(url, LevelComponent, 'component')));
    }
    return results;
  };

  LevelLoader.prototype.onWorldNecessityLoaded = function(resource) {
    var index, r;
    index = this.worldNecessities.indexOf(resource);
    if (resource.name === 'thang') {
      this.loadDefaultComponentsForThangType(resource.model);
      this.loadThangsRequiredByThangType(resource.model);
    }
    if (!(index >= 0)) {
      return;
    }
    this.worldNecessities.splice(index, 1);
    this.worldNecessities = (function() {
      var j, len, ref, results;
      ref = this.worldNecessities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        r = ref[j];
        if (r != null) {
          results.push(r);
        }
      }
      return results;
    }).call(this);
    if (this.checkAllWorldNecessitiesRegisteredAndLoaded()) {
      return this.onWorldNecessitiesLoaded();
    }
  };

  LevelLoader.prototype.onWorldNecessityLoadFailed = function(event) {
    this.reportLoadError();
    return this.trigger('world-necessity-load-failed', event);
  };

  LevelLoader.prototype.checkAllWorldNecessitiesRegisteredAndLoaded = function() {
    var ref;
    if (_.filter(this.worldNecessities).length !== 0) {
      return false;
    }
    if (!this.thangNamesLoaded) {
      return false;
    }
    if (this.sessionDependenciesRegistered && !this.sessionDependenciesRegistered[this.session.id] && !this.sessionless) {
      return false;
    }
    if (this.sessionDependenciesRegistered && this.opponentSession && !this.sessionDependenciesRegistered[this.opponentSession.id] && !this.sessionless) {
      return false;
    }
    if (!(((ref = this.session) != null ? ref.loaded : void 0) || this.sessionless)) {
      return false;
    }
    return true;
  };

  LevelLoader.prototype.onWorldNecessitiesLoaded = function() {
    var nameModelMap, nameModelTuples, t, thangType, thangsToLoad;
    if (LOG) {
      console.log("World necessities loaded.");
    }
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.initWorld();
    this.supermodel.clearMaxProgress();
    this.trigger('world-necessities-loaded');
    if (this.headless) {
      return;
    }
    thangsToLoad = _.uniq((function() {
      var j, len, ref, results;
      ref = this.world.thangs;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        t = ref[j];
        if (t.exists) {
          results.push(t.spriteName);
        }
      }
      return results;
    }).call(this));
    nameModelTuples = (function() {
      var j, len, ref, results;
      ref = this.thangNames.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        thangType = ref[j];
        results.push([thangType.get('name'), thangType]);
      }
      return results;
    }).call(this);
    nameModelMap = _.zipObject(nameModelTuples);
    if (this.spriteSheetsToBuild == null) {
      this.spriteSheetsToBuild = [];
    }
    if (this.spriteSheetsToBuild.length) {
      return this.buildLoopInterval = setInterval(this.buildLoop, 5);
    }
  };

  LevelLoader.prototype.maybeLoadURL = function(url, Model, resourceName) {
    var model;
    if (this.supermodel.getModel(url)) {
      return;
    }
    model = new Model().setURL(url);
    return this.supermodel.loadModel(model, resourceName);
  };

  LevelLoader.prototype.onSupermodelLoaded = function() {
    clearTimeout(this.loadTimeoutID);
    if (this.destroyed) {
      return;
    }
    if (LOG) {
      console.log('SuperModel for Level loaded in', new Date().getTime() - this.t0, 'ms');
    }
    this.loadLevelSounds();
    return this.denormalizeSession();
  };

  LevelLoader.prototype.buildLoop = function() {
    var i, j, keys, len, ref, ref1, someLeft, spriteSheetResource, thangType;
    someLeft = false;
    ref1 = (ref = this.spriteSheetsToBuild) != null ? ref : [];
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      spriteSheetResource = ref1[i];
      if (spriteSheetResource.spriteSheetKeys) {
        continue;
      }
      someLeft = true;
      thangType = spriteSheetResource.thangType;
      if (thangType.loaded && !thangType.loading) {
        keys = this.buildSpriteSheetsForThangType(spriteSheetResource.thangType);
        if (keys && keys.length) {
          this.listenTo(spriteSheetResource.thangType, 'build-complete', this.onBuildComplete);
          spriteSheetResource.spriteSheetKeys = keys;
        } else {
          spriteSheetResource.markLoaded();
        }
      }
    }
    if (!someLeft) {
      return clearInterval(this.buildLoopInterval);
    }
  };

  LevelLoader.prototype.onBuildComplete = function(e) {
    var j, k, len, ref, resource;
    resource = null;
    ref = this.spriteSheetsToBuild;
    for (j = 0, len = ref.length; j < len; j++) {
      resource = ref[j];
      if (e.thangType === resource.thangType) {
        break;
      }
    }
    if (!resource) {
      return console.error('Did not find spriteSheetToBuildResource for', e);
    }
    resource.spriteSheetKeys = (function() {
      var l, len1, ref1, results;
      ref1 = resource.spriteSheetKeys;
      results = [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        k = ref1[l];
        if (k !== e.key) {
          results.push(k);
        }
      }
      return results;
    })();
    if (resource.spriteSheetKeys.length === 0) {
      return resource.markLoaded();
    }
  };

  LevelLoader.prototype.denormalizeSession = function() {
    var key, patch, tempSession, value;
    if (this.sessionDenormalized || this.spectateMode || this.sessionless || me.isSessionless()) {
      return;
    }
    if (this.headless && !this.level.isType('web-dev')) {
      return;
    }
    if (!this.session.id) {
      return;
    }
    patch = {
      'levelName': this.level.get('name'),
      'levelID': this.level.get('slug') || this.level.id
    };
    if (me.id === this.session.get('creator')) {
      patch.creatorName = me.get('name');
    }
    for (key in patch) {
      value = patch[key];
      if (this.session.get(key) === value) {
        delete patch[key];
      }
    }
    if (!_.isEmpty(patch)) {
      for (key in patch) {
        value = patch[key];
        this.session.set(key, value);
      }
      tempSession = new LevelSession({
        _id: this.session.id
      });
      tempSession.save(patch, {
        patch: true,
        type: 'PUT'
      });
    }
    return this.sessionDenormalized = true;
  };

  LevelLoader.prototype.buildSpriteSheetsForThangType = function(thangType) {
    var color, j, key, keys, len, ref, ref1, ref2, spriteOptions, team;
    if (this.headless) {
      return;
    }
    if (!this.thangTypeTeams) {
      this.grabThangTypeTeams();
    }
    keys = [];
    ref1 = (ref = this.thangTypeTeams[thangType.get('original')]) != null ? ref : [null];
    for (j = 0, len = ref1.length; j < len; j++) {
      team = ref1[j];
      spriteOptions = {
        resolutionFactor: SPRITE_RESOLUTION_FACTOR,
        async: true
      };
      if (thangType.get('kind') === 'Floor') {
        spriteOptions.resolutionFactor = 2;
      }
      if (team && (color = (ref2 = this.teamConfigs[team]) != null ? ref2.color : void 0)) {
        spriteOptions.colorConfig = {
          team: color
        };
      }
      key = this.buildSpriteSheet(thangType, spriteOptions);
      if (_.isString(key)) {
        keys.push(key);
      }
    }
    return keys;
  };

  LevelLoader.prototype.grabThangTypeTeams = function() {
    var base, component, j, l, len, len1, name, ref, ref1, ref2, team, thang;
    this.grabTeamConfigs();
    this.thangTypeTeams = {};
    ref = this.level.get('thangs');
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (this.level.isType('hero', 'course') && thang.id === 'Hero Placeholder') {
        continue;
      }
      ref1 = thang.components;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        component = ref1[l];
        if (team = (ref2 = component.config) != null ? ref2.team : void 0) {
          if ((base = this.thangTypeTeams)[name = thang.thangType] == null) {
            base[name] = [];
          }
          if (indexOf.call(this.thangTypeTeams[thang.thangType], team) < 0) {
            this.thangTypeTeams[thang.thangType].push(team);
          }
          break;
        }
      }
    }
    return this.thangTypeTeams;
  };

  LevelLoader.prototype.grabTeamConfigs = function() {
    var j, len, ref, ref1, system;
    ref = this.level.get('systems');
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      if (this.teamConfigs = (ref1 = system.config) != null ? ref1.teamConfigs : void 0) {
        break;
      }
    }
    if (!this.teamConfigs) {
      this.teamConfigs = {
        'humans': {
          'superteam': 'humans',
          'color': {
            'hue': 0,
            'saturation': 0.75,
            'lightness': 0.5
          },
          'playable': true
        },
        'ogres': {
          'superteam': 'ogres',
          'color': {
            'hue': 0.66,
            'saturation': 0.75,
            'lightness': 0.5
          },
          'playable': false
        },
        'neutral': {
          'superteam': 'neutral',
          'color': {
            'hue': 0.33,
            'saturation': 0.75,
            'lightness': 0.5
          }
        }
      };
    }
    return this.teamConfigs;
  };

  LevelLoader.prototype.buildSpriteSheet = function(thangType, options) {
    var ref;
    if (thangType.get('name') === 'Wizard') {
      options.colorConfig = ((ref = me.get('wizard')) != null ? ref.colorConfig : void 0) || {};
    }
    return thangType.buildSpriteSheet(options);
  };

  LevelLoader.prototype.initWorld = function() {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, serializedLevel;
    if (this.level.isType('web-dev')) {
      return;
    }
    this.world = new World();
    this.world.levelSessionIDs = this.opponentSessionID ? [this.sessionID, this.opponentSessionID] : [this.sessionID];
    this.world.submissionCount = (ref = (ref1 = this.session) != null ? (ref2 = ref1.get('state')) != null ? ref2.submissionCount : void 0 : void 0) != null ? ref : 0;
    this.world.flagHistory = (ref3 = (ref4 = this.session) != null ? (ref5 = ref4.get('state')) != null ? ref5.flagHistory : void 0 : void 0) != null ? ref3 : [];
    this.world.difficulty = (ref6 = (ref7 = this.session) != null ? (ref8 = ref7.get('state')) != null ? ref8.difficulty : void 0 : void 0) != null ? ref6 : 0;
    if (this.observing) {
      this.world.difficulty = Math.max(0, this.world.difficulty - 1);
    }
    serializedLevel = this.level.serialize({
      supermodel: this.supermodel,
      session: this.session,
      opponentSession: this.opponentSession,
      headless: this.headless,
      sessionless: this.sessionless
    });
    this.world.loadFromLevel(serializedLevel, false);
    if (LOG) {
      return console.log('World has been initialized from level loader.');
    }
  };

  LevelLoader.prototype.playJingle = function() {
    var f, volume;
    if (this.headless || !me.get('volume')) {
      return;
    }
    volume = 0.5;
    if (me.level() < 3) {
      volume = 0.25;
    }
    f = function() {
      var jingles;
      jingles = ['ident_1', 'ident_2'];
      return AudioPlayer.playInterfaceSound(jingles[Math.floor(Math.random() * jingles.length)], volume);
    };
    return setTimeout(f, 500);
  };

  LevelLoader.prototype.loadAudio = function() {
    if (this.headless || !me.get('volume')) {
      return;
    }
    return AudioPlayer.preloadInterfaceSounds(['victory']);
  };

  LevelLoader.prototype.loadLevelSounds = function() {
    var j, l, len, len1, len2, len3, n, noteGroup, o, ref, ref1, ref2, results, script, scripts, sound, sounds, sprite, thangType, thangTypes, trigger;
    if (this.headless || !me.get('volume')) {
      return;
    }
    scripts = this.level.get('scripts');
    if (!scripts) {
      return;
    }
    for (j = 0, len = scripts.length; j < len; j++) {
      script = scripts[j];
      if (script.noteChain) {
        ref = script.noteChain;
        for (l = 0, len1 = ref.length; l < len1; l++) {
          noteGroup = ref[l];
          if (noteGroup.sprites) {
            ref1 = noteGroup.sprites;
            for (n = 0, len2 = ref1.length; n < len2; n++) {
              sprite = ref1[n];
              if ((ref2 = sprite.say) != null ? ref2.sound : void 0) {
                AudioPlayer.preloadSoundReference(sprite.say.sound);
              }
            }
          }
        }
      }
    }
    thangTypes = this.supermodel.getModels(ThangType);
    results = [];
    for (o = 0, len3 = thangTypes.length; o < len3; o++) {
      thangType = thangTypes[o];
      results.push((function() {
        var ref3, results1;
        ref3 = thangType.get('soundTriggers') || {};
        results1 = [];
        for (trigger in ref3) {
          sounds = ref3[trigger];
          if (trigger !== 'say') {
            results1.push((function() {
              var len4, p, results2;
              results2 = [];
              for (p = 0, len4 = sounds.length; p < len4; p++) {
                sound = sounds[p];
                results2.push(AudioPlayer.preloadSoundReference(sound));
              }
              return results2;
            })());
          }
        }
        return results1;
      })());
    }
    return results;
  };

  LevelLoader.prototype.progress = function() {
    return this.supermodel.progress;
  };

  LevelLoader.prototype.destroy = function() {
    if (this.buildLoopInterval) {
      clearInterval(this.buildLoopInterval);
    }
    return LevelLoader.__super__.destroy.call(this);
  };

  return LevelLoader;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/LevelLoader.js.map
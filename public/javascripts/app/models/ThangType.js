require.register("models/ThangType", function(exports, require, module) {
var CocoCollection, CocoModel, LevelComponent, PrerenderedSpriteSheet, PrerenderedSpriteSheets, SpriteBuilder, ThangType, buildQueue, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoModel = require('./CocoModel');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

LevelComponent = require('./LevelComponent');

CocoCollection = require('collections/CocoCollection');

utils = require('core/utils');

buildQueue = [];

module.exports = ThangType = (function(superClass) {
  extend(ThangType, superClass);

  function ThangType() {
    this.onFileUploaded = bind(this.onFileUploaded, this);
    return ThangType.__super__.constructor.apply(this, arguments);
  }

  ThangType.className = 'ThangType';

  ThangType.schema = require('schemas/models/thang_type');

  ThangType.heroes = {
    captain: '529ec584c423d4e83b000014',
    knight: '529ffbf1cf1818f2be000001',
    samurai: '53e12be0d042f23505c3023b',
    raider: '55527eb0b8abf4ba1fe9a107',
    goliath: '55e1a6e876cb0948c96af9f8',
    guardian: '566a058620de41290036a745',
    ninja: '52fc0ed77e01835453bd8f6c',
    'forest-archer': '5466d4f2417c8b48a9811e87',
    trapper: '5466d449417c8b48a9811e83',
    pixie: '',
    assassin: '566a2202e132c81f00f38c81',
    librarian: '52fbf74b7e01835453bd8d8e',
    'potion-master': '52e9adf7427172ae56002172',
    sorcerer: '52fd1524c7e6cf99160e7bc9',
    necromancer: '55652fb3b9effa46a1f775fd',
    'master-wizard': '',
    duelist: '57588f09046caf2e0012ed41',
    champion: '575848b522179b2800efbfbf',
    'code-ninja': '58192d484954d56144a7062f'
  };

  ThangType.heroClasses = {
    Warrior: ['champion', 'duelist', 'captain', 'knight', 'samurai', 'raider', 'goliath', 'guardian', 'code-ninja'],
    Ranger: ['ninja', 'forest-archer', 'trapper', 'pixie', 'assassin'],
    Wizard: ['librarian', 'potion-master', 'sorcerer', 'necromancer', 'master-wizard']
  };

  ThangType.items = {
    'simple-boots': '53e237bf53457600003e3f05'
  };

  ThangType.prototype.urlRoot = '/db/thang.type';

  ThangType.prototype.building = {};

  ThangType.prototype.editableByArtisans = true;

  ThangType.defaultActions = ['idle', 'die', 'move', 'attack', 'trick', 'cast'];

  ThangType.heroConfigStats = {};

  ThangType.prototype.initialize = function() {
    ThangType.__super__.initialize.call(this);
    this.building = {};
    return this.spriteSheets = {};
  };

  ThangType.prototype.resetRawData = function() {
    return this.set('raw', {
      shapes: {},
      containers: {},
      animations: {}
    });
  };

  ThangType.prototype.resetSpriteSheetCache = function() {
    this.buildActions();
    this.spriteSheets = {};
    return this.building = {};
  };

  ThangType.prototype.isFullyLoaded = function() {
    return this.get('actions') || this.get('raster');
  };

  ThangType.prototype.loadRasterImage = function() {
    var raster;
    if (this.loadingRaster || this.loadedRaster) {
      return;
    }
    if (!(raster = this.get('raster'))) {
      return;
    }
    this.rasterImage = $("<img src='/file/" + raster + "' />");
    this.loadingRaster = true;
    this.rasterImage.one('load', (function(_this) {
      return function() {
        _this.loadingRaster = false;
        _this.loadedRaster = true;
        return _this.trigger('raster-image-loaded', _this);
      };
    })(this));
    return this.rasterImage.one('error', (function(_this) {
      return function() {
        _this.loadingRaster = false;
        return _this.trigger('raster-image-load-errored', _this);
      };
    })(this));
  };

  ThangType.prototype.getActions = function() {
    if (!this.isFullyLoaded()) {
      return {};
    }
    return this.actions || this.buildActions();
  };

  ThangType.prototype.getDefaultActions = function() {
    var action, actions, i, len, ref;
    actions = [];
    ref = _.values(this.getActions());
    for (i = 0, len = ref.length; i < len; i++) {
      action = ref[i];
      if (!_.any(ThangType.defaultActions, function(prefix) {
        return _.string.startsWith(action.name, prefix);
      })) {
        continue;
      }
      actions.push(action);
    }
    return actions;
  };

  ThangType.prototype.buildActions = function() {
    var action, name, ref, ref1, ref2, relatedAction, relatedName;
    if (!this.isFullyLoaded()) {
      return null;
    }
    this.actions = $.extend(true, {}, this.get('actions'));
    ref = this.actions;
    for (name in ref) {
      action = ref[name];
      action.name = name;
      ref2 = (ref1 = action.relatedActions) != null ? ref1 : {};
      for (relatedName in ref2) {
        relatedAction = ref2[relatedName];
        relatedAction.name = action.name + '_' + relatedName;
        this.actions[relatedAction.name] = relatedAction;
      }
    }
    return this.actions;
  };

  ThangType.prototype.fillOptions = function(options) {
    if (options == null) {
      options = {};
    }
    options = _.clone(options);
    if (options.resolutionFactor == null) {
      options.resolutionFactor = SPRITE_RESOLUTION_FACTOR;
    }
    if (options.async == null) {
      options.async = false;
    }
    options.thang = null;
    return options;
  };

  ThangType.prototype.buildSpriteSheet = function(options) {
    var key, result, ss;
    if (!(this.isFullyLoaded() && this.get('raw'))) {
      return false;
    }
    this.options = this.fillOptions(options);
    key = this.spriteSheetKey(this.options);
    if (ss = this.spriteSheets[key]) {
      return ss;
    }
    if (this.building[key]) {
      this.options = null;
      return key;
    }
    this.t0 = new Date().getTime();
    this.initBuild(options);
    if (!this.options.portraitOnly) {
      this.addGeneralFrames();
    }
    this.addPortrait();
    this.building[key] = true;
    result = this.finishBuild();
    return result;
  };

  ThangType.prototype.initBuild = function(options) {
    if (!this.actions) {
      this.buildActions();
    }
    this.vectorParser = new SpriteBuilder(this, options);
    this.builder = new createjs.SpriteSheetBuilder();
    this.builder.padding = 2;
    return this.frames = {};
  };

  ThangType.prototype.addPortrait = function() {
    var frame, frames, mc, portrait, pt, rect, ref, s, scale;
    if (!this.actions) {
      return;
    }
    portrait = this.actions.portrait;
    if (!portrait) {
      return;
    }
    scale = portrait.scale || 1;
    pt = (ref = portrait.positions) != null ? ref.registration : void 0;
    rect = new createjs.Rectangle((pt != null ? pt.x : void 0) / scale || 0, (pt != null ? pt.y : void 0) / scale || 0, 100 / scale, 100 / scale);
    if (portrait.animation) {
      mc = this.vectorParser.buildMovieClip(portrait.animation);
      mc.nominalBounds = mc.frameBounds = null;
      this.builder.addMovieClip(mc, rect, scale);
      frames = this.builder._animations[portrait.animation].frames;
      if (portrait.frames != null) {
        frames = this.mapFrames(portrait.frames, frames[0]);
      }
      return this.builder.addAnimation('portrait', frames, true);
    } else if (portrait.container) {
      s = this.vectorParser.buildContainerFromStore(portrait.container);
      frame = this.builder.addFrame(s, rect, scale);
      return this.builder.addAnimation('portrait', [frame], false);
    }
  };

  ThangType.prototype.addGeneralFrames = function() {
    var action, animation, frame, frames, framesMap, i, len, mc, name, next, ref, ref1, ref2, ref3, ref4, results, s, scale;
    framesMap = {};
    ref = this.requiredRawAnimations();
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      name = animation.animation;
      mc = this.vectorParser.buildMovieClip(name);
      if (!mc) {
        continue;
      }
      this.builder.addMovieClip(mc, null, animation.scale * this.options.resolutionFactor);
      framesMap[animation.scale + '_' + name] = this.builder._animations[name].frames;
    }
    ref1 = this.actions;
    for (name in ref1) {
      action = ref1[name];
      if (!action.animation) {
        continue;
      }
      if (name === 'portrait') {
        continue;
      }
      scale = (ref2 = (ref3 = action.scale) != null ? ref3 : this.get('scale')) != null ? ref2 : 1;
      frames = framesMap[scale + '_' + action.animation];
      if (!frames) {
        continue;
      }
      if (action.frames != null) {
        frames = this.mapFrames(action.frames, frames[0]);
      }
      next = true;
      if (action.goesTo) {
        next = action.goesTo;
      }
      if (action.loops === false) {
        next = false;
      }
      this.builder.addAnimation(name, frames, next);
    }
    ref4 = this.actions;
    results = [];
    for (name in ref4) {
      action = ref4[name];
      if (!(action.container && !action.animation)) {
        continue;
      }
      if (name === 'portrait') {
        continue;
      }
      scale = this.options.resolutionFactor * (action.scale || this.get('scale') || 1);
      s = this.vectorParser.buildContainerFromStore(action.container);
      if (!s) {
        continue;
      }
      frame = this.builder.addFrame(s, s.bounds, scale);
      results.push(this.builder.addAnimation(name, [frame], false));
    }
    return results;
  };

  ThangType.prototype.requiredRawAnimations = function() {
    var a, action, allActions, animation, i, len, name, ref, ref1, required, scale;
    required = [];
    ref = this.get('actions');
    for (name in ref) {
      action = ref[name];
      if (name === 'portrait') {
        continue;
      }
      allActions = [action].concat(_.values((ref1 = action.relatedActions) != null ? ref1 : {}));
      for (i = 0, len = allActions.length; i < len; i++) {
        a = allActions[i];
        if (!a.animation) {
          continue;
        }
        scale = name === 'portrait' ? a.scale || 1 : a.scale || this.get('scale') || 1;
        animation = {
          animation: a.animation,
          scale: scale
        };
        animation.portrait = name === 'portrait';
        if (!_.find(required, function(r) {
          return _.isEqual(r, animation);
        })) {
          required.push(animation);
        }
      }
    }
    return required;
  };

  ThangType.prototype.mapFrames = function(frames, frameOffset) {
    var f, i, len, ref, results;
    if (!_.isString(frames)) {
      return frames;
    }
    ref = frames.split(',');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      f = ref[i];
      results.push(parseInt(f, 10) + frameOffset);
    }
    return results;
  };

  ThangType.prototype.finishBuild = function() {
    var key, spriteSheet;
    if (_.isEmpty(this.builder._animations)) {
      return;
    }
    key = this.spriteSheetKey(this.options);
    spriteSheet = null;
    if (this.options.async) {
      buildQueue.push(this.builder);
      this.builder.t0 = new Date().getTime();
      if (!(buildQueue.length > 1)) {
        this.builder.buildAsync();
      }
      this.builder.on('complete', this.onBuildSpriteSheetComplete, this, true, [this.builder, key, this.options]);
      this.builder = null;
      return key;
    }
    spriteSheet = this.builder.build();
    this.logBuild(this.t0, false, this.options.portraitOnly);
    this.spriteSheets[key] = spriteSheet;
    this.building[key] = false;
    this.builder = null;
    this.options = null;
    return spriteSheet;
  };

  ThangType.prototype.onBuildSpriteSheetComplete = function(e, data) {
    var builder, key, options, ref;
    builder = data[0], key = data[1], options = data[2];
    this.logBuild(builder.t0, true, options.portraitOnly);
    buildQueue = buildQueue.slice(1);
    if (buildQueue[0]) {
      buildQueue[0].t0 = new Date().getTime();
    }
    if ((ref = buildQueue[0]) != null) {
      ref.buildAsync();
    }
    this.spriteSheets[key] = e.target.spriteSheet;
    this.building[key] = false;
    this.trigger('build-complete', {
      key: key,
      thangType: this
    });
    return this.vectorParser = null;
  };

  ThangType.prototype.logBuild = function(startTime, async, portrait) {
    var kind, name, time;
    kind = async ? 'Async' : 'Sync ';
    portrait = portrait ? '(Portrait)' : '';
    name = _.string.rpad(this.get('name'), 20);
    time = _.string.lpad('' + new Date().getTime() - startTime, 6);
    return console.debug("Built sheet:  " + name + " " + time + "ms  " + kind + "  " + portrait);
  };

  ThangType.prototype.spriteSheetKey = function(options) {
    var colorConfigs, config, groupName, portraitOnly, ref;
    colorConfigs = [];
    ref = options.colorConfig || {};
    for (groupName in ref) {
      config = ref[groupName];
      colorConfigs.push(groupName + ":" + config.hue + "|" + config.saturation + "|" + config.lightness);
    }
    colorConfigs = colorConfigs.join(',');
    portraitOnly = !!options.portraitOnly;
    return (this.get('name')) + " - " + options.resolutionFactor + " - " + colorConfigs + " - " + portraitOnly;
  };

  ThangType.prototype.getHeroShortName = function() {
    var map;
    map = {
      "Assassin": "Ritic",
      "Captain": "Anya",
      "Champion": "Ida",
      "Master Wizard": "Usara",
      "Duelist": "Alejandro",
      "Forest Archer": "Naria",
      "Goliath": "Okar",
      "Guardian": "Illia",
      "Knight": "Tharin",
      "Librarian": "Hushbaum",
      "Necromancer": "Nalfar",
      "Ninja": "Amara",
      "Pixie": "Zana",
      "Potion Master": "Omarn",
      "Raider": "Arryn",
      "Samurai": "Hattori",
      "Ian Elliott": "Hattori",
      "Sorcerer": "Pender",
      "Trapper": "Senick",
      "Code Ninja": "Code Ninja"
    };
    return map[this.get('name')];
  };

  ThangType.prototype.getPortraitImage = function(spriteOptionsOrKey, size) {
    var src;
    if (size == null) {
      size = 100;
    }
    src = this.getPortraitSource(spriteOptionsOrKey, size);
    if (!src) {
      return null;
    }
    return $('<img />').attr('src', src);
  };

  ThangType.prototype.getPortraitSource = function(spriteOptionsOrKey, size) {
    var stage;
    if (size == null) {
      size = 100;
    }
    if (this.get('rasterIcon') || this.get('raster')) {
      return this.getPortraitURL();
    }
    stage = this.getPortraitStage(spriteOptionsOrKey, size);
    return stage != null ? stage.toDataURL() : void 0;
  };

  ThangType.prototype.getPortraitStage = function(spriteOptionsOrKey, size) {
    var canvas, err, error, key, options, pt, ref, ref1, ref2, ref3, sprite, spriteSheet, stage;
    if (size == null) {
      size = 100;
    }
    canvas = $("<canvas width='" + size + "' height='" + size + "'></canvas>");
    try {
      stage = new createjs.Stage(canvas[0]);
    } catch (error) {
      err = error;
      console.error("Error trying to create " + (this.get('name')) + " avatar stage:", err, "with window as", window);
      return null;
    }
    if (!this.isFullyLoaded()) {
      return stage;
    }
    key = spriteOptionsOrKey;
    key = _.isString(key) ? key : this.spriteSheetKey(this.fillOptions(key));
    spriteSheet = this.spriteSheets[key];
    if (!spriteSheet) {
      options = _.isPlainObject(spriteOptionsOrKey) ? spriteOptionsOrKey : {};
      options.portraitOnly = true;
      spriteSheet = this.buildSpriteSheet(options);
    }
    if (_.isString(spriteSheet)) {
      return;
    }
    if (!spriteSheet) {
      return;
    }
    sprite = new createjs.Sprite(spriteSheet);
    pt = (ref = this.actions.portrait) != null ? (ref1 = ref.positions) != null ? ref1.registration : void 0 : void 0;
    sprite.regX = (pt != null ? pt.x : void 0) || 0;
    sprite.regY = (pt != null ? pt.y : void 0) || 0;
    sprite.framerate = (ref2 = (ref3 = this.actions.portrait) != null ? ref3.framerate : void 0) != null ? ref2 : 20;
    sprite.gotoAndStop('portrait');
    stage.addChild(sprite);
    stage.update();
    stage.startTalking = function() {
      sprite.gotoAndPlay('portrait');
      return;
      if (this.tick) {
        return;
      }
      this.tick = (function(_this) {
        return function(e) {
          return _this.update(e);
        };
      })(this);
      return createjs.Ticker.addEventListener('tick', this.tick);
    };
    stage.stopTalking = function() {
      sprite.gotoAndStop('portrait');
      return;
      this.update();
      createjs.Ticker.removeEventListener('tick', this.tick);
      return this.tick = null;
    };
    return stage;
  };

  ThangType.prototype.getVectorPortraitStage = function(size) {
    var canvas, portrait, pt, ref, scale, sprite, stage, vectorParser;
    if (size == null) {
      size = 100;
    }
    if (!this.actions) {
      return;
    }
    canvas = $("<canvas width='" + size + "' height='" + size + "'></canvas>");
    stage = new createjs.Stage(canvas[0]);
    portrait = this.actions.portrait;
    if (!(portrait && (portrait.animation || portrait.container))) {
      return;
    }
    scale = portrait.scale || 1;
    vectorParser = new SpriteBuilder(this, {});
    if (portrait.animation) {
      sprite = vectorParser.buildMovieClip(portrait.animation);
      sprite.gotoAndStop(0);
    } else if (portrait.container) {
      sprite = vectorParser.buildContainerFromStore(portrait.container);
    }
    pt = (ref = portrait.positions) != null ? ref.registration : void 0;
    sprite.regX = (pt != null ? pt.x : void 0) / scale || 0;
    sprite.regY = (pt != null ? pt.y : void 0) / scale || 0;
    sprite.scaleX = sprite.scaleY = scale * size / 100;
    stage.addChild(sprite);
    stage.update();
    return stage;
  };

  ThangType.prototype.uploadGenericPortrait = function(callback, src) {
    var body;
    if (src == null) {
      src = this.getPortraitSource();
    }
    if (!(src && _.string.startsWith(src, 'data:'))) {
      return typeof callback === "function" ? callback() : void 0;
    }
    src = src.replace('data:image/png;base64,', '').replace(/\ /g, '+');
    body = {
      filename: 'portrait.png',
      mimetype: 'image/png',
      path: "db/thang.type/" + (this.get('original')),
      b64png: src,
      force: 'true'
    };
    return $.ajax('/file', {
      type: 'POST',
      data: body,
      success: callback || this.onFileUploaded
    });
  };

  ThangType.prototype.onFileUploaded = function() {
    return console.log('Image uploaded');
  };

  ThangType.loadUniversalWizard = function() {
    var url, wizOriginal;
    if (this.wizardType) {
      return this.wizardType;
    }
    wizOriginal = '52a00d55cf1818f2be00000b';
    url = "/db/thang.type/" + wizOriginal + "/version";
    this.wizardType = new module.exports();
    this.wizardType.url = function() {
      return url;
    };
    this.wizardType.fetch();
    return this.wizardType;
  };

  ThangType.prototype.getPortraitURL = function() {
    var iconURL, rasterURL;
    if (iconURL = this.get('rasterIcon')) {
      return "/file/" + iconURL;
    }
    if (rasterURL = this.get('raster')) {
      return "/file/" + rasterURL;
    }
    return "/file/db/thang.type/" + (this.get('original')) + "/portrait.png";
  };

  ThangType.prototype.getAllowedSlots = function() {
    var itemComponentRef, ref;
    itemComponentRef = _.find(this.get('components') || [], function(compRef) {
      return compRef.original === LevelComponent.ItemID;
    });
    return (itemComponentRef != null ? (ref = itemComponentRef.config) != null ? ref.slots : void 0 : void 0) || ['right-hand'];
  };

  ThangType.prototype.getAllowedHeroClasses = function() {
    var heroClass;
    if (heroClass = this.get('heroClass')) {
      return [heroClass];
    }
    return ['Warrior', 'Ranger', 'Wizard'];
  };

  ThangType.prototype.getHeroStats = function() {
    var classAverage, className, classSpecificScore, components, equipsConfig, heroClass, i, len, maxSpeed, minSpeed, movesConfig, num, percent, pieces, programmableConfig, prop, rawNumbers, ref, ref1, ref2, ref3, ref4, ref5, skill, speedPoints, speedRange, stat, stats;
    if (!(heroClass = this.get('heroClass'))) {
      return;
    }
    components = this.get('components') || [];
    if (!(equipsConfig = (ref = _.find(components, {
      original: LevelComponent.EquipsID
    })) != null ? ref.config : void 0)) {
      return console.warn(this.get('name'), 'is not an equipping hero, but you are asking for its hero stats. (Did you project away components?)');
    }
    if (!(movesConfig = (ref1 = _.find(components, {
      original: LevelComponent.MovesID
    })) != null ? ref1.config : void 0)) {
      return console.warn(this.get('name'), 'is not a moving hero, but you are asking for its hero stats.');
    }
    if (!(programmableConfig = (ref2 = _.find(components, {
      original: LevelComponent.ProgrammableID
    })) != null ? ref2.config : void 0)) {
      return console.warn(this.get('name'), 'is not a Programmable hero, but you are asking for its hero stats.');
    }
    if (this.classStatAverages == null) {
      this.classStatAverages = {
        attack: {
          Warrior: 7.5,
          Ranger: 5,
          Wizard: 2.5
        },
        health: {
          Warrior: 7.5,
          Ranger: 5,
          Wizard: 3.5
        }
      };
    }
    stats = {};
    rawNumbers = {
      attack: (ref3 = equipsConfig.attackDamageFactor) != null ? ref3 : 1,
      health: (ref4 = equipsConfig.maxHealthFactor) != null ? ref4 : 1,
      speed: movesConfig.maxSpeed
    };
    ref5 = ['attack', 'health'];
    for (i = 0, len = ref5.length; i < len; i++) {
      prop = ref5[i];
      stat = rawNumbers[prop];
      if (stat < 1) {
        classSpecificScore = 10 - 5 / stat;
      } else {
        classSpecificScore = stat * 5;
      }
      classAverage = this.classStatAverages[prop][this.get('heroClass')];
      stats[prop] = {
        relative: Math.round(2 * ((classAverage - 2.5) + classSpecificScore / 2)) / 2 / 10,
        absolute: stat
      };
      pieces = (function() {
        var j, results;
        results = [];
        for (num = j = 1; j <= 3; num = ++j) {
          results.push($.i18n.t("choose_hero." + prop + "_" + num));
        }
        return results;
      })();
      percent = Math.round(stat * 100) + '%';
      className = $.i18n.t("general." + (_.string.slugify(this.get('heroClass'))));
      stats[prop].description = [pieces[0], percent, pieces[1], className, pieces[2]].join(' ');
    }
    minSpeed = 4;
    maxSpeed = 16;
    speedRange = maxSpeed - minSpeed;
    speedPoints = rawNumbers.speed - minSpeed;
    stats.speed = {
      relative: Math.round(20 * speedPoints / speedRange) / 2 / 10,
      absolute: rawNumbers.speed,
      description: ($.i18n.t('choose_hero.speed_1')) + " " + rawNumbers.speed + " " + ($.i18n.t('choose_hero.speed_2'))
    };
    stats.skills = (function() {
      var j, len1, ref6, results;
      ref6 = programmableConfig.programmableProperties;
      results = [];
      for (j = 0, len1 = ref6.length; j < len1; j++) {
        skill = ref6[j];
        if (skill !== 'say' && !/(Range|Pos|Radius|Damage)$/.test(skill)) {
          results.push(_.string.titleize(_.string.humanize(skill)));
        }
      }
      return results;
    })();
    return stats;
  };

  ThangType.prototype.getFrontFacingStats = function() {
    var component, components, config, dps, i, itemConfig, j, k, key, len, len1, len2, modifiers, props, ref, ref1, ref2, ref3, ref4, ref5, ref6, sortedStats, stat, statKeys, stats, value;
    components = this.get('components') || [];
    if (!(itemConfig = (ref = _.find(components, {
      original: LevelComponent.ItemID
    })) != null ? ref.config : void 0)) {
      console.warn(this.get('name'), 'is not an item, but you are asking for its stats.');
      return {
        props: [],
        stats: {}
      };
    }
    stats = {};
    props = (ref1 = itemConfig.programmableProperties) != null ? ref1 : [];
    props = props.concat((ref2 = itemConfig.moreProgrammableProperties) != null ? ref2 : []);
    props = _.without(props, 'canCast', 'spellNames', 'spells');
    ref4 = (ref3 = itemConfig.stats) != null ? ref3 : {};
    for (stat in ref4) {
      modifiers = ref4[stat];
      stats[stat] = this.formatStatDisplay(stat, modifiers);
    }
    ref6 = (ref5 = itemConfig.extraHUDProperties) != null ? ref5 : [];
    for (i = 0, len = ref6.length; i < len; i++) {
      stat = ref6[i];
      if (stats[stat] == null) {
        stats[stat] = null;
      }
    }
    for (j = 0, len1 = components.length; j < len1; j++) {
      component = components[j];
      if (!(config = component.config)) {
        continue;
      }
      for (stat in stats) {
        value = stats[stat];
        if (!(value == null)) {
          continue;
        }
        value = config[stat];
        if (value == null) {
          continue;
        }
        stats[stat] = this.formatStatDisplay(stat, {
          setTo: value
        });
        if (stat === 'attackDamage') {
          dps = (value / (config.cooldown || 0.5)).toFixed(1);
          stats[stat].display += " (" + dps + " DPS)";
        }
      }
      if (config.programmableSnippets) {
        props = props.concat(config.programmableSnippets);
      }
    }
    for (stat in stats) {
      value = stats[stat];
      if (value == null) {
        stats[stat] = {
          name: stat,
          display: '???'
        };
      }
    }
    statKeys = _.keys(stats);
    statKeys.sort();
    props.sort();
    sortedStats = {};
    for (k = 0, len2 = statKeys.length; k < len2; k++) {
      key = statKeys[k];
      sortedStats[key] = stats[key];
    }
    return {
      props: props,
      stats: sortedStats
    };
  };

  ThangType.prototype.formatStatDisplay = function(name, modifiers) {
    var display, format, i18nKey, matchedShortName, value;
    i18nKey = {
      maxHealth: 'health',
      maxSpeed: 'speed',
      healthReplenishRate: 'regeneration',
      attackDamage: 'attack',
      attackRange: 'range',
      shieldDefenseFactor: 'blocks',
      visualRange: 'range',
      throwDamage: 'attack',
      throwRange: 'range',
      bashDamage: 'attack',
      backstabDamage: 'backstab'
    }[name];
    if (i18nKey) {
      name = $.i18n.t('choose_hero.' + i18nKey);
      matchedShortName = true;
    } else {
      name = _.string.humanize(name);
      matchedShortName = false;
    }
    format = '';
    if (/(range|radius|distance|vision)$/i.test(name)) {
      format = 'm';
    }
    if (/cooldown$/i.test(name)) {
      format || (format = 's');
    }
    if (/speed$/i.test(name)) {
      format || (format = 'm/s');
    }
    if (/(regeneration| rate)$/i.test(name)) {
      format || (format = '/s');
    }
    value = modifiers.setTo;
    if (/(blocks)$/i.test(name)) {
      format || (format = '%');
      value = (value * 100).toFixed(1);
    }
    if (_.isArray(value)) {
      value = value.join(', ');
    }
    display = [];
    if (value != null) {
      display.push("" + value + format);
    }
    if (modifiers.addend > 0) {
      display.push("+" + modifiers.addend + format);
    }
    if (modifiers.addend < 0) {
      display.push("" + modifiers.addend + format);
    }
    if ((modifiers.factor != null) && modifiers.factor !== 1) {
      display.push("x" + modifiers.factor);
    }
    display = display.join(', ');
    display = display.replace(/9001m?/, 'Infinity');
    return {
      name: name,
      display: display,
      matchedShortName: matchedShortName
    };
  };

  ThangType.prototype.isSilhouettedItem = function() {
    var expectedTotalGems, points, tier;
    if (!((this.get('gems') != null) || (this.get('tier') != null))) {
      return console.error("Trying to determine whether " + (this.get('name')) + " should be a silhouetted item, but it has no gem cost.");
    }
    if (this.get('tier') == null) {
      console.info("Add (or make sure you have fetched) a tier for " + (this.get('name')) + " to more accurately determine whether it is silhouetted.");
    }
    tier = this.get('tier');
    if (tier != null) {
      return this.levelRequiredForItem() > me.level();
    }
    points = me.get('points');
    expectedTotalGems = (points != null ? points : 0) * 1.5;
    return this.get('gems') > (100 + expectedTotalGems) * 1.2;
  };

  ThangType.prototype.levelRequiredForItem = function() {
    var itemTier, playerLevel, playerTier;
    if (this.get('tier') == null) {
      return console.error("Trying to determine what level is required for " + (this.get('name')) + ", but it has no tier.");
    }
    itemTier = this.get('tier');
    playerTier = itemTier / 2.5;
    playerLevel = me.constructor.levelForTier(playerTier);
    return playerLevel;
  };

  ThangType.prototype.getContainersForAnimation = function(animation, action) {
    var containers, i, len, rawAnimation, ref;
    rawAnimation = this.get('raw').animations[animation];
    if (!rawAnimation) {
      console.error('thang type', this.get('name'), 'is missing animation', animation, 'from action', action);
    }
    containers = rawAnimation.containers;
    ref = this.get('raw').animations[animation].animations;
    for (i = 0, len = ref.length; i < len; i++) {
      animation = ref[i];
      containers = containers.concat(this.getContainersForAnimation(animation.gn, action));
    }
    return containers;
  };

  ThangType.prototype.getContainersForActions = function(actionNames) {
    var action, actionName, actions, animationContainers, container, containersToRender, i, j, len, len1;
    containersToRender = {};
    actions = this.getActions();
    for (i = 0, len = actionNames.length; i < len; i++) {
      actionName = actionNames[i];
      action = _.find(actions, {
        name: actionName
      });
      if (action.container) {
        containersToRender[action.container] = true;
      } else if (action.animation) {
        animationContainers = this.getContainersForAnimation(action.animation, action);
        for (j = 0, len1 = animationContainers.length; j < len1; j++) {
          container = animationContainers[j];
          containersToRender[container.gn] = true;
        }
      }
    }
    return _.keys(containersToRender);
  };

  ThangType.prototype.nextForAction = function(action) {
    var next;
    next = true;
    if (action.goesTo) {
      next = action.goesTo;
    }
    if (action.loops === false) {
      next = false;
    }
    return next;
  };

  ThangType.prototype.noRawData = function() {
    return !this.get('raw');
  };

  ThangType.prototype.initPrerenderedSpriteSheets = function() {
    var data;
    if (this.prerenderedSpriteSheets || !(data = this.get('prerenderedSpriteSheetData'))) {
      return;
    }
    return this.prerenderedSpriteSheets = new PrerenderedSpriteSheets(data);
  };

  ThangType.prototype.getPrerenderedSpriteSheet = function(colorConfig, defaultSpriteType) {
    var spriteType;
    if (!this.prerenderedSpriteSheets) {
      return;
    }
    if (this.noRawData()) {
      return this.prerenderedSpriteSheets.first();
    }
    spriteType = this.get('spriteType') || defaultSpriteType;
    return this.prerenderedSpriteSheets.find(function(pss) {
      var getHue, otherColorConfig;
      if (pss.get('spriteType') !== spriteType) {
        return false;
      }
      otherColorConfig = pss.get('colorConfig');
      if (_.isEmpty(colorConfig) && _.isEmpty(otherColorConfig)) {
        return true;
      }
      getHue = function(config) {
        return _.result(_.result(config, 'team'), 'hue');
      };
      return getHue(colorConfig) === getHue(otherColorConfig);
    });
  };

  ThangType.prototype.getPrerenderedSpriteSheetToLoad = function() {
    if (!this.prerenderedSpriteSheets) {
      return;
    }
    if (this.noRawData()) {
      return this.prerenderedSpriteSheets.first();
    }
    return this.prerenderedSpriteSheets.find(function(pss) {
      return pss.needToLoad && !pss.loadedImage;
    });
  };

  ThangType.prototype.onLoaded = function() {
    var attackableConfig, attacksConfig, components, equipsConfig, health, itemConfig, movesConfig, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, speed, stats;
    ThangType.__super__.onLoaded.call(this);
    if (ThangType.heroConfigStats[this.get('original')]) {
      return;
    }
    components = this.get('components') || [];
    if (!components.length) {
      return;
    }
    if ((this.get('gems') == null) && ((this.project && !/gems/.test(this.project)) || (/project/.test(this.getURL()) && !/gems/.test(this.getURL())) || (((ref = this.collection) != null ? ref.project : void 0) && !/gems/.test((ref1 = this.collection) != null ? ref1.project : void 0)) || (/project/.test((ref2 = this.collection) != null ? ref2.getURL() : void 0) && !/gems/.test((ref3 = this.collection) != null ? ref3.getURL() : void 0)))) {
      return;
    }
    stats = {
      gems: this.get('gems') || 0
    };
    if (itemConfig = (ref4 = _.find(components, {
      original: LevelComponent.ItemID
    })) != null ? ref4.config : void 0) {
      stats.kind = 'item';
      if (speed = (ref5 = itemConfig.stats) != null ? (ref6 = ref5.maxSpeed) != null ? ref6.addend : void 0 : void 0) {
        stats.speed = speed;
      }
      if (health = (ref7 = itemConfig.stats) != null ? (ref8 = ref7.maxHealth) != null ? ref8.addend : void 0 : void 0) {
        stats.health = health;
      }
      if (attacksConfig = (ref9 = _.find(components, {
        original: LevelComponent.AttacksID
      })) != null ? ref9.config : void 0) {
        stats.attack = ((ref10 = attacksConfig.attackDamage) != null ? ref10 : 3) / ((ref11 = attacksConfig.cooldown) != null ? ref11 : 1);
      }
      ThangType.heroConfigStats[this.get('original')] = stats;
    } else if (equipsConfig = (ref12 = _.find(components, {
      original: LevelComponent.EquipsID
    })) != null ? ref12.config : void 0) {
      stats.kind = 'hero';
      stats.attackMultiplier = (ref13 = equipsConfig.attackDamageFactor) != null ? ref13 : 1;
      stats.healthMultiplier = (ref14 = equipsConfig.maxHealthFactor) != null ? ref14 : 1;
      if (movesConfig = (ref15 = _.find(components, {
        original: LevelComponent.MovesID
      })) != null ? ref15.config : void 0) {
        stats.speed = (ref16 = movesConfig.maxSpeed) != null ? ref16 : 3.6;
      }
      if (attackableConfig = (ref17 = _.find(components, {
        original: LevelComponent.AttackableID
      })) != null ? ref17.config : void 0) {
        stats.baseHealth = (ref18 = attackableConfig.maxHealth) != null ? ref18 : 11;
      }
      ThangType.heroConfigStats[this.get('original')] = stats;
    }
    return null;
  };

  ThangType.calculateStatsForHeroConfig = function(heroConfig, callback) {
    var fn, heroOriginal, i, len, original, ref, ref1, stats, thisHeroConfigStats, tt, url;
    thisHeroConfigStats = {};
    heroOriginal = (ref = heroConfig.thangType) != null ? ref : ThangType.heroes.captain;
    ref1 = _.values(heroConfig.inventory).concat([heroOriginal]);
    for (i = 0, len = ref1.length; i < len; i++) {
      original = ref1[i];
      thisHeroConfigStats[original] = ThangType.heroConfigStats[original] || 'loading';
    }
    fn = (function(_this) {
      return function(tt) {
        return tt.on('sync', function() {
          thisHeroConfigStats[tt.get('original')] = ThangType.heroConfigStats[tt.get('original')];
          tt.off('sync');
          tt.destroy();
          return _this.formatStatsForHeroConfig(thisHeroConfigStats, callback);
        });
      };
    })(this);
    for (original in thisHeroConfigStats) {
      stats = thisHeroConfigStats[original];
      if (!(stats === 'loading')) {
        continue;
      }
      url = "/db/thang.type/" + original + "/version?project=original,components,gems";
      tt = new ThangType().setURL(url);
      fn(tt);
      tt.fetch();
    }
    return this.formatStatsForHeroConfig(thisHeroConfigStats, callback);
  };

  ThangType.formatStatsForHeroConfig = function(heroConfigStats, callback) {
    var heroConfigStatValues, heroStats, i, len, ref, stats, totals;
    heroConfigStatValues = _.values(heroConfigStats);
    if (indexOf.call(heroConfigStatValues, 'loading') >= 0) {
      return;
    }
    heroStats = _.find(heroConfigStatValues, {
      kind: 'hero'
    });
    totals = {
      health: (ref = heroStats.baseHealth) != null ? ref : 11,
      speed: 0,
      gems: 0
    };
    for (i = 0, len = heroConfigStatValues.length; i < len; i++) {
      stats = heroConfigStatValues[i];
      if (stats.gems) {
        totals.gems += stats.gems;
      }
      if (stats.health) {
        totals.health += stats.health * (heroStats.healthMultiplier || 1);
      }
      if (stats.attack) {
        totals.attack = stats.attack * (heroStats.attackMultiplier || 1);
      }
      if (stats.speed) {
        totals.speed += stats.speed;
      }
    }
    return callback(totals);
  };

  return ThangType;

})(CocoModel);

PrerenderedSpriteSheet = (function(superClass) {
  extend(PrerenderedSpriteSheet, superClass);

  function PrerenderedSpriteSheet() {
    return PrerenderedSpriteSheet.__super__.constructor.apply(this, arguments);
  }

  PrerenderedSpriteSheet.className = 'PrerenderedSpriteSheet';

  PrerenderedSpriteSheet.prototype.loadImage = function() {
    var imageURL;
    if (this.loadingImage) {
      return true;
    }
    if (this.loadedImage) {
      return false;
    }
    if (!(imageURL = this.get('image'))) {
      return false;
    }
    this.image = $("<img src='/file/" + imageURL + "' />");
    this.loadingImage = true;
    this.image.one('load', (function(_this) {
      return function() {
        _this.loadingImage = false;
        _this.loadedImage = true;
        _this.buildSpriteSheet();
        return _this.trigger('image-loaded', _this);
      };
    })(this));
    this.image.one('error', (function(_this) {
      return function() {
        _this.loadingImage = false;
        return _this.trigger('image-load-error', _this);
      };
    })(this));
    return true;
  };

  PrerenderedSpriteSheet.prototype.buildSpriteSheet = function() {
    return this.spriteSheet = new createjs.SpriteSheet({
      images: [this.image[0]],
      frames: this.get('frames'),
      animations: this.get('animations')
    });
  };

  PrerenderedSpriteSheet.prototype.markToLoad = function() {
    return this.needToLoad = true;
  };

  PrerenderedSpriteSheet.prototype.needToLoad = false;

  PrerenderedSpriteSheet.prototype.loadedImage = false;

  PrerenderedSpriteSheet.prototype.loadingImage = false;

  return PrerenderedSpriteSheet;

})(CocoModel);

PrerenderedSpriteSheets = (function(superClass) {
  extend(PrerenderedSpriteSheets, superClass);

  function PrerenderedSpriteSheets() {
    return PrerenderedSpriteSheets.__super__.constructor.apply(this, arguments);
  }

  PrerenderedSpriteSheets.prototype.model = PrerenderedSpriteSheet;

  return PrerenderedSpriteSheets;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/models/ThangType.js.map
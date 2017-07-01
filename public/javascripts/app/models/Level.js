require.register("models/Level", function(exports, require, module) {
var CocoModel, Level, LevelComponent, LevelSystem, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

CocoModel = require('./CocoModel');

LevelComponent = require('./LevelComponent');

LevelSystem = require('./LevelSystem');

ThangType = require('./ThangType');

module.exports = Level = (function(superClass) {
  extend(Level, superClass);

  function Level() {
    return Level.__super__.constructor.apply(this, arguments);
  }

  Level.className = 'Level';

  Level.schema = require('schemas/models/level');

  Level.levels = {
    'dungeons-of-kithgard': '5411cb3769152f1707be029c',
    'defense-of-plainswood': '541b67f71ccc8eaae19f3c62'
  };

  Level.prototype.urlRoot = '/db/level';

  Level.prototype.editableByArtisans = true;

  Level.prototype.serialize = function(options) {
    var cached, i, j, lc, len, len1, ls, o, otherSession, ref, ref1, ref2, ref3, ref4, ref5, ref6, session, sessionHeroes, supermodel, systemModels, t, tmap, tt;
    supermodel = options.supermodel, session = options.session, otherSession = options.otherSession, this.headless = options.headless, this.sessionless = options.sessionless, cached = (ref = options.cached) != null ? ref : false;
    o = this.denormalize(supermodel, session, otherSession);
    o.levelComponents = cached ? this.getCachedLevelComponents(supermodel) : $.extend(true, [], (function() {
      var i, len, ref1, results;
      ref1 = supermodel.getModels(LevelComponent);
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        lc = ref1[i];
        results.push(lc.attributes);
      }
      return results;
    })());
    this.sortThangComponents(o.thangs, o.levelComponents, 'Level Thang');
    this.fillInDefaultComponentConfiguration(o.thangs, o.levelComponents);
    systemModels = $.extend(true, [], (function() {
      var i, len, ref1, results;
      ref1 = supermodel.getModels(LevelSystem);
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        ls = ref1[i];
        results.push(ls.attributes);
      }
      return results;
    })());
    o.systems = this.sortSystems(o.systems, systemModels);
    this.fillInDefaultSystemConfiguration(o.systems);
    tmap = {};
    ref2 = (ref1 = o.thangs) != null ? ref1 : [];
    for (i = 0, len = ref2.length; i < len; i++) {
      t = ref2[i];
      tmap[t.thangType] = true;
    }
    sessionHeroes = [session != null ? (ref3 = session.get('heroConfig')) != null ? ref3.thangType : void 0 : void 0, otherSession != null ? (ref4 = otherSession.get('heroConfig')) != null ? ref4.thangType : void 0 : void 0];
    o.thangTypes = [];
    ref5 = supermodel.getModels(ThangType);
    for (j = 0, len1 = ref5.length; j < len1; j++) {
      tt = ref5[j];
      if (tmap[tt.get('original')] || (tt.get('kind') !== 'Hero' && (tt.get('kind') != null) && tt.get('components') && !tt.notInLevel) || (tt.get('kind') === 'Hero' && (this.isType('course', 'course-ladder', 'game-dev') || (ref6 = tt.get('original'), indexOf.call(sessionHeroes, ref6) >= 0)))) {
        o.thangTypes.push({
          original: tt.get('original'),
          name: tt.get('name'),
          components: $.extend(true, [], tt.get('components')),
          kind: tt.get('kind')
        });
      }
    }
    this.sortThangComponents(o.thangTypes, o.levelComponents, 'ThangType');
    this.fillInDefaultComponentConfiguration(o.thangTypes, o.levelComponents);
    if (this.picoCTFProblem) {
      o.picoCTFProblem = this.picoCTFProblem;
    }
    return o;
  };

  Level.prototype.cachedLevelComponents = null;

  Level.prototype.getCachedLevelComponents = function(supermodel) {
    var base, i, len, levelComponent, levelComponents, name, newLevelComponents;
    if (this.cachedLevelComponents == null) {
      this.cachedLevelComponents = {};
    }
    levelComponents = supermodel.getModels(LevelComponent);
    newLevelComponents = [];
    for (i = 0, len = levelComponents.length; i < len; i++) {
      levelComponent = levelComponents[i];
      if (levelComponent.hasLocalChanges()) {
        newLevelComponents.push($.extend(true, {}, levelComponent.attributes));
        continue;
      }
      if ((base = this.cachedLevelComponents)[name = levelComponent.id] == null) {
        base[name] = this.cachedLevelComponents[levelComponent.id] = $.extend(true, {}, levelComponent.attributes);
      }
      newLevelComponents.push(this.cachedLevelComponents[levelComponent.id]);
    }
    return newLevelComponents;
  };

  Level.prototype.denormalize = function(supermodel, session, otherSession) {
    var i, len, levelThang, o, ref, thangTypesByOriginal, thangTypesWithComponents, tt;
    o = $.extend(true, {}, this.attributes);
    if (o.thangs && this.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      thangTypesWithComponents = (function() {
        var i, len, ref, results;
        ref = supermodel.getModels(ThangType);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          tt = ref[i];
          if (tt.get('components') != null) {
            results.push(tt);
          }
        }
        return results;
      })();
      thangTypesByOriginal = _.indexBy(thangTypesWithComponents, function(tt) {
        return tt.get('original');
      });
      ref = o.thangs;
      for (i = 0, len = ref.length; i < len; i++) {
        levelThang = ref[i];
        this.denormalizeThang(levelThang, supermodel, session, otherSession, thangTypesByOriginal);
      }
    }
    return o;
  };

  Level.prototype.denormalizeThang = function(levelThang, supermodel, session, otherSession, thangTypesByOriginal) {
    var config, configs, copy, defaultPlaceholderComponent, defaultThangComponent, equips, heroThangType, i, inventory, isHero, j, k, l, len, len1, len2, len3, levelThangComponent, original, placeholderComponent, placeholderConfig, placeholderThangType, placeholders, placeholdersUsed, programmableProperties, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, thangComponent, thangType;
    if (levelThang.components == null) {
      levelThang.components = [];
    }
    isHero = /Hero Placeholder/.test(levelThang.id) && this.isType('hero', 'hero-ladder', 'hero-coop');
    if (isHero && otherSession) {
      if (levelThang.id === 'Hero Placeholder 1' && session.get('team') === 'humans') {
        session = otherSession;
      } else if (levelThang.id === 'Hero Placeholder' && session.get('team') === 'ogres') {
        session = otherSession;
      }
    }
    if (isHero) {
      placeholders = {};
      placeholdersUsed = {};
      placeholderThangType = thangTypesByOriginal[levelThang.thangType];
      if (!placeholderThangType) {
        console.error("Couldn't find placeholder ThangType for the hero!");
        isHero = false;
      } else {
        ref = placeholderThangType.get('components');
        for (i = 0, len = ref.length; i < len; i++) {
          defaultPlaceholderComponent = ref[i];
          placeholders[defaultPlaceholderComponent.original] = defaultPlaceholderComponent;
        }
        ref1 = levelThang.components;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          thangComponent = ref1[j];
          placeholders[thangComponent.original] = thangComponent;
        }
        levelThang.components = [];
        heroThangType = session != null ? (ref2 = session.get('heroConfig')) != null ? ref2.thangType : void 0 : void 0;
        if (heroThangType) {
          levelThang.thangType = heroThangType;
        }
      }
    }
    thangType = thangTypesByOriginal[levelThang.thangType];
    configs = {};
    ref3 = levelThang.components;
    for (k = 0, len2 = ref3.length; k < len2; k++) {
      thangComponent = ref3[k];
      configs[thangComponent.original] = thangComponent;
    }
    ref4 = (thangType != null ? thangType.get('components') : void 0) || [];
    for (l = 0, len3 = ref4.length; l < len3; l++) {
      defaultThangComponent = ref4[l];
      if (levelThangComponent = configs[defaultThangComponent.original]) {
        copy = $.extend(true, {}, defaultThangComponent.config);
        levelThangComponent.config = _.merge(copy, levelThangComponent.config);
      } else {
        levelThangComponent = $.extend(true, {}, defaultThangComponent);
        levelThang.components.push(levelThangComponent);
      }
      if (isHero && (placeholderComponent = placeholders[defaultThangComponent.original])) {
        placeholdersUsed[placeholderComponent.original] = true;
        placeholderConfig = (ref5 = placeholderComponent.config) != null ? ref5 : {};
        if (levelThangComponent.config == null) {
          levelThangComponent.config = {};
        }
        config = levelThangComponent.config;
        if (placeholderConfig.pos) {
          if (config.pos == null) {
            config.pos = {};
          }
          config.pos.x = placeholderConfig.pos.x;
          config.pos.y = placeholderConfig.pos.y;
          config.rotation = placeholderConfig.rotation;
        } else if (placeholderConfig.team) {
          config.team = placeholderConfig.team;
        } else if (placeholderConfig.significantProperty) {
          config.significantProperty = placeholderConfig.significantProperty;
        } else if (placeholderConfig.programmableMethods) {
          copy = $.extend(true, {}, placeholderConfig);
          programmableProperties = (ref6 = config != null ? config.programmableProperties : void 0) != null ? ref6 : [];
          copy.programmableProperties = _.union(programmableProperties, (ref7 = copy.programmableProperties) != null ? ref7 : []);
          levelThangComponent.config = config = _.merge(copy, config);
        } else if (placeholderConfig.extraHUDProperties) {
          config.extraHUDProperties = _.union((ref8 = config.extraHUDProperties) != null ? ref8 : [], placeholderConfig.extraHUDProperties);
        } else if (placeholderConfig.voiceRange) {
          config.voiceRange = placeholderConfig.voiceRange;
          config.cooldown = placeholderConfig.cooldown;
        }
      }
    }
    if (isHero) {
      if (equips = _.find(levelThang.components, {
        original: LevelComponent.EquipsID
      })) {
        inventory = session != null ? (ref9 = session.get('heroConfig')) != null ? ref9.inventory : void 0 : void 0;
        if (equips.config == null) {
          equips.config = {};
        }
        if (inventory) {
          equips.config.inventory = $.extend(true, {}, inventory);
        }
      }
      for (original in placeholders) {
        placeholderComponent = placeholders[original];
        if (!placeholdersUsed[original]) {
          levelThang.components.push(placeholderComponent);
        }
      }
    }
    if (/Hero Placeholder/.test(levelThang.id) && this.isType('course') && !this.headless && !this.sessionless && !window.serverConfig.picoCTF) {
      heroThangType = ((ref10 = me.get('heroConfig')) != null ? ref10.thangType : void 0) || ThangType.heroes.captain;
      if (heroThangType) {
        return levelThang.thangType = heroThangType;
      }
    }
  };

  Level.prototype.sortSystems = function(levelSystems, systemModels) {
    var i, len, originalsSeen, ref, ref1, sorted, system, visit;
    ref = [[], {}], sorted = ref[0], originalsSeen = ref[1];
    visit = function(system) {
      var d, i, len, ref1, system2, systemModel;
      if (system.original in originalsSeen) {
        return;
      }
      systemModel = _.find(systemModels, {
        original: system.original
      });
      if (!systemModel) {
        return console.error('Couldn\'t find model for original', system.original, 'from', systemModels);
      }
      ref1 = systemModel.dependencies || [];
      for (i = 0, len = ref1.length; i < len; i++) {
        d = ref1[i];
        system2 = _.find(levelSystems, {
          original: d.original
        });
        visit(system2);
      }
      sorted.push({
        model: systemModel,
        config: $.extend(true, {}, system.config)
      });
      return originalsSeen[system.original] = true;
    };
    ref1 = levelSystems != null ? levelSystems : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      system = ref1[i];
      visit(system);
    }
    return sorted;
  };

  Level.prototype.sortThangComponents = function(thangs, levelComponents, parentType) {
    var actsComponent, alliedComponent, comp, i, j, len, len1, originalsToComponents, originalsToThangComponents, ref, ref1, results, sorted, thang, visit;
    originalsToComponents = _.indexBy(levelComponents, 'original');
    alliedComponent = _.find(levelComponents, {
      name: 'Allied'
    });
    actsComponent = _.find(levelComponents, {
      name: 'Acts'
    });
    ref = thangs != null ? thangs : [];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      originalsToThangComponents = _.indexBy(thang.components, 'original');
      sorted = [];
      visit = function(c, namesToIgnore) {
        var acts, allied, c2, d, dependent, j, k, l, lc, len1, len2, len3, ref1, ref2, ref3, ref4;
        if (indexOf.call(sorted, c) >= 0) {
          return;
        }
        lc = originalsToComponents[c.original];
        if (!lc) {
          console.error(thang.id || thang.name, 'couldn\'t find lc for', c, 'of', levelComponents);
        }
        if (!lc) {
          return;
        }
        if (namesToIgnore && (ref1 = lc.name, indexOf.call(namesToIgnore, ref1) >= 0)) {
          return;
        }
        if (lc.name === 'Plans') {
          ref2 = thang.components;
          for (j = 0, len1 = ref2.length; j < len1; j++) {
            c2 = ref2[j];
            visit(c2, [lc.name, 'Programmable']);
          }
        } else if (lc.name === 'Programmable') {
          ref3 = thang.components;
          for (k = 0, len2 = ref3.length; k < len2; k++) {
            c2 = ref3[k];
            visit(c2, [lc.name]);
          }
        } else {
          ref4 = lc.dependencies || [];
          for (l = 0, len3 = ref4.length; l < len3; l++) {
            d = ref4[l];
            c2 = originalsToThangComponents[d.original];
            if (!c2) {
              dependent = originalsToComponents[d.original];
              dependent = (dependent != null ? dependent.name : void 0) || d.original;
              console.error(parentType, thang.id || thang.name, 'does not have dependent Component', dependent, 'from', lc.name);
            }
            if (c2) {
              visit(c2);
            }
          }
          if (lc.name === 'Collides' && alliedComponent) {
            if (allied = originalsToThangComponents[alliedComponent.original]) {
              visit(allied);
            }
          }
          if (lc.name === 'Moves' && actsComponent) {
            if (acts = originalsToThangComponents[actsComponent.original]) {
              visit(acts);
            }
          }
        }
        return sorted.push(c);
      };
      ref1 = thang.components;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        comp = ref1[j];
        visit(comp);
      }
      results.push(thang.components = sorted);
    }
    return results;
  };

  Level.prototype.fillInDefaultComponentConfiguration = function(thangs, levelComponents) {
    var cached, cachedConfigs, component, defaultConfiguration, i, isPhysical, lc, len, missed, originalComponent, ref, results, thang;
    if (this.defaultComponentConfigurations == null) {
      this.defaultComponentConfigurations = {};
    }
    cached = 0;
    missed = 0;
    cachedConfigs = 0;
    ref = thangs != null ? thangs : [];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      results.push((function() {
        var base, j, len1, name, ref1, ref2, results1;
        ref1 = thang.components || [];
        results1 = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          component = ref1[j];
          isPhysical = component.original === LevelComponent.PhysicalID;
          if (!isPhysical && (defaultConfiguration = _.find(this.defaultComponentConfigurations[component.original], (function(d) {
            return _.isEqual(component, d.originalComponent);
          })))) {
            component.config = defaultConfiguration.defaultedConfig;
            ++cached;
            continue;
          }
          if (!(lc = _.find(levelComponents, {
            original: component.original
          }))) {
            continue;
          }
          if (!isPhysical) {
            originalComponent = $.extend(true, {}, component);
          }
          if (component.config == null) {
            component.config = {};
          }
          TreemaUtils.populateDefaults(component.config, (ref2 = lc.configSchema) != null ? ref2 : {}, tv4);
          this.lastType = 'component';
          this.lastOriginal = component.original;
          if (!isPhysical) {
            if ((base = this.defaultComponentConfigurations)[name = component.original] == null) {
              base[name] = [];
            }
            this.defaultComponentConfigurations[component.original].push({
              originalComponent: originalComponent,
              defaultedConfig: component.config
            });
            ++cachedConfigs;
          }
          results1.push(++missed);
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Level.prototype.fillInDefaultSystemConfiguration = function(levelSystems) {
    var i, len, ref, results, system;
    ref = levelSystems != null ? levelSystems : [];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      system = ref[i];
      if (system.config == null) {
        system.config = {};
      }
      TreemaUtils.populateDefaults(system.config, system.model.configSchema, tv4);
      this.lastType = 'system';
      results.push(this.lastOriginal = system.model.name);
    }
    return results;
  };

  Level.prototype.dimensions = function() {
    var c, component, height, i, j, len, len1, ref, ref1, thang, width;
    width = 0;
    height = 0;
    ref = this.get('thangs') || [];
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      ref1 = thang.components;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        component = ref1[j];
        c = component.config;
        if (c == null) {
          continue;
        }
        if ((c.width != null) && c.width > width) {
          width = c.width;
        }
        if ((c.height != null) && c.height > height) {
          height = c.height;
        }
      }
    }
    return {
      width: width,
      height: height
    };
  };

  Level.prototype.isLadder = function() {
    var ref;
    return ((ref = this.get('type')) != null ? ref.indexOf('ladder') : void 0) > -1;
  };

  Level.prototype.isProject = function() {
    return this.get('shareable') === 'project';
  };

  Level.prototype.isType = function() {
    var ref, types;
    types = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return ref = this.get('type', true), indexOf.call(types, ref) >= 0;
  };

  Level.prototype.fetchNextForCourse = function(arg, options) {
    var courseID, courseInstanceID, levelOriginalID, sessionID;
    levelOriginalID = arg.levelOriginalID, courseInstanceID = arg.courseInstanceID, courseID = arg.courseID, sessionID = arg.sessionID;
    if (options == null) {
      options = {};
    }
    if (courseInstanceID) {
      options.url = "/db/course_instance/" + courseInstanceID + "/levels/" + levelOriginalID + "/sessions/" + sessionID + "/next";
    } else {
      options.url = "/db/course/" + courseID + "/levels/" + levelOriginalID + "/next";
    }
    return this.fetch(options);
  };

  Level.prototype.getSolutions = function() {
    var e, error, hero, i, len, plan, ref, ref1, ref2, ref3, solution, solutions;
    if (!(hero = _.find((ref = this.get("thangs")) != null ? ref : [], {
      id: 'Hero Placeholder'
    }))) {
      return [];
    }
    if (!(plan = (ref1 = _.find((ref2 = hero.components) != null ? ref2 : [], function(x) {
      var ref3, ref4;
      return (ref3 = x.config) != null ? (ref4 = ref3.programmableMethods) != null ? ref4.plan : void 0 : void 0;
    })) != null ? ref1.config.programmableMethods.plan : void 0)) {
      return [];
    }
    solutions = _.cloneDeep((ref3 = plan.solutions) != null ? ref3 : []);
    for (i = 0, len = solutions.length; i < len; i++) {
      solution = solutions[i];
      try {
        solution.source = _.template(solution.source)(plan.context);
      } catch (error) {
        e = error;
        console.error("Problem with template and solution comments for", this.get('slug'), e);
      }
    }
    return solutions;
  };

  Level.prototype.getSampleCode = function() {
    var code, e, error, hero, language, plan, ref, ref1, ref2, ref3, sampleCode;
    if (!(hero = _.find((ref = this.get("thangs")) != null ? ref : [], {
      id: 'Hero Placeholder'
    }))) {
      return {};
    }
    if (!(plan = (ref1 = _.find((ref2 = hero.components) != null ? ref2 : [], function(x) {
      var ref3, ref4;
      return (ref3 = x.config) != null ? (ref4 = ref3.programmableMethods) != null ? ref4.plan : void 0 : void 0;
    })) != null ? ref1.config.programmableMethods.plan : void 0)) {
      return {};
    }
    sampleCode = _.cloneDeep((ref3 = plan.languages) != null ? ref3 : {});
    sampleCode.javascript = plan.source;
    for (language in sampleCode) {
      code = sampleCode[language];
      try {
        sampleCode[language] = _.template(code)(plan.context);
      } catch (error) {
        e = error;
        console.error("Problem with template and solution comments for", this.get('slug'), e);
      }
    }
    return sampleCode;
  };

  return Level;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Level.js.map
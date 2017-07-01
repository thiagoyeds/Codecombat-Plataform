require.register("views/play/level/tome/TomeView", function(exports, require, module) {
var CastButtonView, CocoView, Spell, SpellPaletteView, TomeView, me, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/tome');

me = require('core/auth').me;

Spell = require('./Spell');

SpellPaletteView = require('./SpellPaletteView');

CastButtonView = require('./CastButtonView');

utils = require('core/utils');

module.exports = TomeView = (function(superClass) {
  extend(TomeView, superClass);

  TomeView.prototype.id = 'tome-view';

  TomeView.prototype.template = template;

  TomeView.prototype.controlsEnabled = true;

  TomeView.prototype.cache = false;

  TomeView.prototype.subscriptions = {
    'tome:spell-loaded': 'onSpellLoaded',
    'tome:cast-spell': 'onCastSpell',
    'tome:change-language': 'updateLanguageForAllSpells',
    'surface:sprite-selected': 'onSpriteSelected',
    'god:new-world-created': 'onNewWorld',
    'tome:comment-my-code': 'onCommentMyCode',
    'tome:select-primary-sprite': 'onSelectPrimarySprite'
  };

  TomeView.prototype.events = {
    'click': 'onClick'
  };

  function TomeView(options) {
    TomeView.__super__.constructor.call(this, options);
    if (!options.god) {
      console.error("TomeView created with no God!");
    }
  }

  TomeView.prototype.afterRender = function() {
    var programmableThangs, ref, warning;
    TomeView.__super__.afterRender.call(this);
    this.worker = this.createWorker();
    programmableThangs = _.filter(this.options.thangs, function(t) {
      return t.isProgrammable && t.programmableMethods;
    });
    if (this.options.level.isType('web-dev')) {
      if (this.fakeProgrammableThang = this.createFakeProgrammableThang()) {
        programmableThangs = [this.fakeProgrammableThang];
      }
    }
    this.createSpells(programmableThangs, (ref = programmableThangs[0]) != null ? ref.world : void 0);
    this.castButton = this.insertSubView(new CastButtonView({
      spells: this.spells,
      level: this.options.level,
      session: this.options.session,
      god: this.options.god
    }));
    this.teamSpellMap = this.generateTeamSpellMap(this.spells);
    if (!programmableThangs.length) {
      this.cast();
      warning = 'Warning: There are no Programmable Thangs in this level, which makes it unplayable.';
      noty({
        text: warning,
        layout: 'topCenter',
        type: 'warning',
        killer: false,
        timeout: 15000,
        dismissQueue: true,
        maxVisible: 3
      });
      console.warn(warning);
    }
    return delete this.options.thangs;
  };

  TomeView.prototype.onNewWorld = function(e) {
    var programmableThangs;
    programmableThangs = _.filter(e.thangs, function(t) {
      return t.isProgrammable && t.programmableMethods && t.inThangList;
    });
    return this.createSpells(programmableThangs, e.world);
  };

  TomeView.prototype.onCommentMyCode = function(e) {
    var commentedSource, ref, spell, spellKey;
    ref = this.spells;
    for (spellKey in ref) {
      spell = ref[spellKey];
      if (!(spell.canWrite())) {
        continue;
      }
      console.log('Commenting out', spellKey);
      commentedSource = spell.view.commentOutMyCode() + 'Commented out to stop infinite loop.\n' + spell.getSource();
      spell.view.updateACEText(commentedSource);
      spell.view.recompile(false);
    }
    return this.cast();
  };

  TomeView.prototype.createWorker = function() {
    if (typeof Worker === "undefined" || Worker === null) {
      return null;
    }
    if (window.application.isIPadApp) {
      return null;
    }
    return new Worker('/javascripts/workers/aether_worker.js');
  };

  TomeView.prototype.generateTeamSpellMap = function(spellObject) {
    var spell, spellName, spellNameElements, teamName, teamSpellMap, thangName;
    teamSpellMap = {};
    for (spellName in spellObject) {
      spell = spellObject[spellName];
      teamName = spell.team;
      if (teamSpellMap[teamName] == null) {
        teamSpellMap[teamName] = [];
      }
      spellNameElements = spellName.split('/');
      thangName = spellNameElements[0];
      spellName = spellNameElements[1];
      if (indexOf.call(teamSpellMap[teamName], thangName) < 0) {
        teamSpellMap[teamName].push(thangName);
      }
    }
    return teamSpellMap;
  };

  TomeView.prototype.createSpells = function(programmableThangs, world) {
    var i, j, k, language, len, len1, len2, method, methodName, pathComponents, pathPrefixComponents, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, skipProtectAPI, spell, spellKey, spellKeys, thang, thangID;
    language = (ref = (ref1 = this.options.session.get('codeLanguage')) != null ? ref1 : (ref2 = me.get('aceConfig')) != null ? ref2.language : void 0) != null ? ref : 'python';
    pathPrefixComponents = ['play', 'level', this.options.levelID, this.options.session.id, 'code'];
    if (this.spells == null) {
      this.spells = {};
    }
    if (this.thangSpells == null) {
      this.thangSpells = {};
    }
    for (i = 0, len = programmableThangs.length; i < len; i++) {
      thang = programmableThangs[i];
      if (this.thangSpells[thang.id] != null) {
        continue;
      }
      this.thangSpells[thang.id] = [];
      ref3 = thang.programmableMethods;
      for (methodName in ref3) {
        method = ref3[methodName];
        pathComponents = [thang.id, methodName];
        pathComponents[0] = _.string.slugify(pathComponents[0]);
        spellKey = pathComponents.join('/');
        this.thangSpells[thang.id].push(spellKey);
        skipProtectAPI = this.getQueryVariable('skip_protect_api', false);
        spell = this.spells[spellKey] = new Spell({
          hintsState: this.options.hintsState,
          programmableMethod: method,
          spellKey: spellKey,
          pathComponents: pathPrefixComponents.concat(pathComponents),
          session: this.options.session,
          otherSession: this.options.otherSession,
          supermodel: this.supermodel,
          skipProtectAPI: skipProtectAPI,
          worker: this.worker,
          language: language,
          spectateView: this.options.spectateView,
          spectateOpponentCodeLanguage: this.options.spectateOpponentCodeLanguage,
          observing: this.options.observing,
          levelID: this.options.levelID,
          level: this.options.level,
          god: this.options.god,
          courseID: this.options.courseID
        });
      }
    }
    ref4 = this.thangSpells;
    for (thangID in ref4) {
      spellKeys = ref4[thangID];
      thang = (ref5 = this.fakeProgrammableThang) != null ? ref5 : world.getThangByID(thangID);
      if (thang) {
        for (j = 0, len1 = spellKeys.length; j < len1; j++) {
          spellKey = spellKeys[j];
          this.spells[spellKey].addThang(thang);
        }
      } else {
        delete this.thangSpells[thangID];
        ref6 = this.spells;
        for (k = 0, len2 = ref6.length; k < len2; k++) {
          spell = ref6[k];
          spell.removeThangID(thangID);
        }
      }
    }
    ref7 = this.spells;
    for (spellKey in ref7) {
      spell = ref7[spellKey];
      if (!(!spell.canRead())) {
        continue;
      }
      spell.transpile();
      spell.loaded = true;
    }
    return null;
  };

  TomeView.prototype.onSpellLoaded = function(e) {
    var justBegin, ref, spell, spellID;
    if (me.get('name') === 'Shanakin') {
      console.log('onSpellLoaded', e);
    }
    ref = this.spells;
    for (spellID in ref) {
      spell = ref[spellID];
      if (!spell.loaded) {
        return;
      }
    }
    if (me.get('name') === 'Shanakin') {
      console.log('... all loaded, let us begin');
    }
    justBegin = this.options.level.isType('game-dev');
    return this.cast(false, false, justBegin);
  };

  TomeView.prototype.onCastSpell = function(e) {
    return this.cast(e != null ? e.preload : void 0, e != null ? e.realTime : void 0, e != null ? e.justBegin : void 0);
  };

  TomeView.prototype.cast = function(preload, realTime, justBegin) {
    var difficulty, ref, ref1, ref2, ref3, ref4, ref5, sessionState;
    if (preload == null) {
      preload = false;
    }
    if (realTime == null) {
      realTime = false;
    }
    if (justBegin == null) {
      justBegin = false;
    }
    if (this.options.level.isType('web-dev')) {
      return;
    }
    sessionState = (ref = this.options.session.get('state')) != null ? ref : {};
    if (realTime) {
      sessionState.submissionCount = ((ref1 = sessionState.submissionCount) != null ? ref1 : 0) + 1;
      sessionState.flagHistory = _.filter((ref2 = sessionState.flagHistory) != null ? ref2 : [], (function(_this) {
        return function(event) {
          var ref3;
          return event.team !== ((ref3 = _this.options.session.get('team')) != null ? ref3 : 'humans');
        };
      })(this));
      if (this.options.level.get('replayable')) {
        sessionState.lastUnsuccessfulSubmissionTime = new Date();
      }
      this.options.session.set('state', sessionState);
    }
    difficulty = (ref3 = sessionState.difficulty) != null ? ref3 : 0;
    if (this.options.observing) {
      difficulty = Math.max(0, difficulty - 1);
    }
    Backbone.Mediator.publish('level:set-playing', {
      playing: false
    });
    return Backbone.Mediator.publish('tome:cast-spells', {
      spells: this.spells,
      preload: preload,
      realTime: realTime,
      justBegin: justBegin,
      difficulty: difficulty,
      submissionCount: (ref4 = sessionState.submissionCount) != null ? ref4 : 0,
      flagHistory: (ref5 = sessionState.flagHistory) != null ? ref5 : [],
      god: this.options.god,
      fixedSeed: this.options.fixedSeed
    });
  };

  TomeView.prototype.onClick = function(e) {
    if (!$(e.target).parents('.popover').length) {
      return Backbone.Mediator.publish('tome:focus-editor', {});
    }
  };

  TomeView.prototype.onSpriteSelected = function(e) {
    var ref, spell;
    if (this.spellView && ((ref = this.options.level.get('type', true)) === 'hero' || ref === 'hero-ladder' || ref === 'hero-coop' || ref === 'course' || ref === 'course-ladder' || ref === 'game-dev' || ref === 'web-dev')) {
      return;
    }
    spell = this.spellFor(e.thang, e.spellName);
    if (spell != null ? spell.canRead() : void 0) {
      return this.setSpellView(spell, e.thang);
    }
  };

  TomeView.prototype.setSpellView = function(spell, thang) {
    var ref, ref1;
    if (spell.view !== this.spellView) {
      this.spellView = spell.view;
      this.spellTopBarView = spell.topBarView;
      this.$el.find('#' + this.spellView.id).after(this.spellView.el).remove();
      this.$el.find('#' + this.spellTopBarView.id).after(this.spellTopBarView.el).remove();
      if ((ref = this.castButton) != null) {
        ref.attachTo(this.spellView);
      }
    }
    this.updateSpellPalette(thang, spell);
    return (ref1 = this.spellView) != null ? ref1.setThang(thang) : void 0;
  };

  TomeView.prototype.updateSpellPalette = function(thang, spell) {
    return this.options.playLevelView.updateSpellPalette(thang, spell);
  };

  TomeView.prototype.spellFor = function(thang, spellName) {
    var selectedThangSpells, spell, spellKey;
    if (!(thang != null ? thang.isProgrammable : void 0)) {
      return null;
    }
    if (!this.thangSpells[thang.id]) {
      return;
    }
    selectedThangSpells = (function() {
      var i, len, ref, results;
      ref = this.thangSpells[thang.id];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        spellKey = ref[i];
        results.push(this.spells[spellKey]);
      }
      return results;
    }).call(this);
    if (spellName) {
      spell = _.find(selectedThangSpells, {
        name: spellName
      });
    } else {
      spell = _.find(selectedThangSpells, function(spell) {
        return spell.canWrite();
      });
      if (spell == null) {
        spell = _.find(selectedThangSpells, function(spell) {
          return spell.canRead();
        });
      }
    }
    return spell;
  };

  TomeView.prototype.reloadAllCode = function() {
    var ref, ref1, spell, spellKey;
    if (utils.getQueryVariable('dev')) {
      this.options.playLevelView.spellPaletteView.destroy();
      this.updateSpellPalette(this.spellView.thang, this.spellView.spell);
    }
    ref = this.spells;
    for (spellKey in ref) {
      spell = ref[spellKey];
      if (spell.view && (spell.team === me.team || ((ref1 = spell.team) === 'common' || ref1 === 'neutral' || ref1 === null))) {
        spell.view.reloadCode(false);
      }
    }
    return this.cast(false, false);
  };

  TomeView.prototype.updateLanguageForAllSpells = function(e) {
    var ref, spell, spellKey;
    ref = this.spells;
    for (spellKey in ref) {
      spell = ref[spellKey];
      if (spell.canWrite()) {
        spell.updateLanguageAether(e.language);
      }
    }
    if (e.reload) {
      return this.reloadAllCode();
    } else {
      return this.cast();
    }
  };

  TomeView.prototype.onSelectPrimarySprite = function(e) {
    if (this.options.level.isType('web-dev')) {
      this.setSpellView(this.spells['hero-placeholder/plan'], this.fakeProgrammableThang);
      return;
    }
    if (this.options.session.get('team') === 'ogres') {
      return Backbone.Mediator.publish('level:select-sprite', {
        thangID: 'Hero Placeholder 1'
      });
    } else {
      return Backbone.Mediator.publish('level:select-sprite', {
        thangID: 'Hero Placeholder'
      });
    }
  };

  TomeView.prototype.createFakeProgrammableThang = function() {
    var hero, programmableConfig, ref, ref1, thang, usesHTMLConfig, usesJQueryConfig, usesWebJavaScriptConfig;
    if (!(hero = _.find(this.options.level.get('thangs'), {
      id: 'Hero Placeholder'
    }))) {
      return null;
    }
    if (!(programmableConfig = _.find(hero.components, function(component) {
      var ref;
      return (ref = component.config) != null ? ref.programmableMethods : void 0;
    }).config)) {
      return null;
    }
    usesHTMLConfig = _.find(hero.components, function(component) {
      var ref;
      return (ref = component.config) != null ? ref.programmableHTMLProperties : void 0;
    }).config;
    usesWebJavaScriptConfig = (ref = _.find(hero.components, function(component) {
      var ref1;
      return (ref1 = component.config) != null ? ref1.programmableWebJavaScriptProperties : void 0;
    })) != null ? ref.config : void 0;
    usesJQueryConfig = (ref1 = _.find(hero.components, function(component) {
      var ref2;
      return (ref2 = component.config) != null ? ref2.programmableJQueryProperties : void 0;
    })) != null ? ref1.config : void 0;
    if (!usesHTMLConfig) {
      console.warn("Couldn't find usesHTML config; is it presented and not defaulted on the Hero Placeholder?");
    }
    thang = {
      id: 'Hero Placeholder',
      isProgrammable: true
    };
    thang = _.merge(thang, programmableConfig, usesHTMLConfig, usesWebJavaScriptConfig, usesJQueryConfig);
    return thang;
  };

  TomeView.prototype.destroy = function() {
    var ref, ref1, spell, spellKey;
    ref = this.spells;
    for (spellKey in ref) {
      spell = ref[spellKey];
      spell.destroy();
    }
    if ((ref1 = this.worker) != null) {
      ref1.terminate();
    }
    return TomeView.__super__.destroy.call(this);
  };

  return TomeView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/TomeView.js.map
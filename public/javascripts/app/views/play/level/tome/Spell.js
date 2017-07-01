require.register("templates/play/level/tome/spell", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<img src=\"/images/level/code_editor_background.png\" class=\"code-background\"/><span class=\"code-background\"></span><div class=\"ace\"></div><div data-i18n=\"play_level.code_saved\" class=\"save-status\"></div><div class=\"programming-language-container\">");
if ( view.spell.level.isType('web-dev'))
{
var campaign = view.spell.level.get('campaign') || '';
if ( campaign.indexOf('web-dev-1') >= 0)
{
buf.push("<span data-i18n=\"teacher.language\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language\">HTML</span>");
}
else
{
buf.push("<span data-i18n=\"play_level.languages\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language spr\">HTML</span><span class=\"programming-language-label spr\">/</span><span class=\"programming-language\">JavaScript</span>");
}
}
else
{
buf.push("<span data-i18n=\"play_level.programming_language\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language\">" + (jade.escape(null == (jade.interp = view.spell.displayCodeLanguage) ? "" : jade.interp)) + "</span>");
}
buf.push("</div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/level/tome/Spell", function(exports, require, module) {
var Spell, SpellTopBarView, SpellView, createAetherOptions, me, utils,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpellView = require('./SpellView');

SpellTopBarView = require('./SpellTopBarView');

me = require('core/auth').me;

createAetherOptions = require('lib/aether_utils').createAetherOptions;

utils = require('core/utils');

module.exports = Spell = (function() {
  Spell.prototype.loaded = false;

  Spell.prototype.view = null;

  Spell.prototype.topBarView = null;

  function Spell(options) {
    this.spellKey = options.spellKey;
    this.pathComponents = options.pathComponents;
    this.session = options.session;
    this.otherSession = options.otherSession;
    this.spectateView = options.spectateView;
    this.spectateOpponentCodeLanguage = options.spectateOpponentCodeLanguage;
    this.observing = options.observing;
    this.supermodel = options.supermodel;
    this.skipProtectAPI = options.skipProtectAPI;
    this.worker = options.worker;
    this.level = options.level;
    this.createFromProgrammableMethod(options.programmableMethod, options.language);
    if (this.canRead()) {
      this.view = new SpellView({
        spell: this,
        level: options.level,
        session: this.session,
        otherSession: this.otherSession,
        worker: this.worker,
        god: options.god,
        supermodel: this.supermodel,
        levelID: options.levelID
      });
      this.view.render();
      this.topBarView = new SpellTopBarView({
        hintsState: options.hintsState,
        spell: this,
        supermodel: this.supermodel,
        codeLanguage: this.language,
        level: options.level,
        session: options.session,
        courseID: options.courseID
      });
      this.topBarView.render();
    }
    Backbone.Mediator.publish('tome:spell-created', {
      spell: this
    });
  }

  Spell.prototype.createFromProgrammableMethod = function(programmableMethod, codeLanguage) {
    var base, p, ref, ref1, ref2, ref3, ref4, ref5, sessionSource;
    p = programmableMethod;
    this.commentI18N = p.i18n;
    this.commentContext = p.context;
    this.languages = (ref = p.languages) != null ? ref : {};
    if ((base = this.languages).javascript == null) {
      base.javascript = p.source;
    }
    this.name = p.name;
    this.permissions = {
      read: (ref1 = (ref2 = p.permissions) != null ? ref2.read : void 0) != null ? ref1 : [],
      readwrite: (ref3 = (ref4 = p.permissions) != null ? ref4.readwrite : void 0) != null ? ref3 : ['humans']
    };
    this.team = (ref5 = this.permissions.readwrite[0]) != null ? ref5 : 'common';
    if (this.canWrite()) {
      this.setLanguage(codeLanguage);
    } else if (this.otherSession && this.team === this.otherSession.get('team')) {
      this.setLanguage(this.otherSession.get('submittedCodeLanguage') || this.otherSession.get('codeLanguage'));
    } else {
      this.setLanguage('javascript');
    }
    this.source = this.originalSource;
    this.parameters = p.parameters;
    if (this.permissions.readwrite.length && (sessionSource = this.session.getSourceFor(this.spellKey))) {
      if (sessionSource !== '// Should fill in some default source\n') {
        this.source = sessionSource;
      }
    }
    if (p.aiSource && !this.otherSession && !this.canWrite()) {
      this.source = this.originalSource = p.aiSource;
      return this.isAISource = true;
    }
  };

  Spell.prototype.destroy = function() {
    var ref, ref1;
    if ((ref = this.view) != null) {
      ref.destroy();
    }
    if ((ref1 = this.topBarView) != null) {
      ref1.destroy();
    }
    this.thang = null;
    return this.worker = null;
  };

  Spell.prototype.setLanguage = function(language) {
    var context, e, error, fallingBack, playerCode, ref, ref1, spokenLanguage, spokenLanguageContext;
    this.language = language;
    if (this.level.isType('web-dev')) {
      this.language = 'html';
    }
    this.displayCodeLanguage = utils.capitalLanguages[this.language];
    this.originalSource = (ref = this.languages[this.language]) != null ? ref : this.languages.javascript;
    if (window.serverConfig.picoCTF) {
      this.originalSource = this.addPicoCTFProblem();
    }
    if (this.level.isType('web-dev')) {
      playerCode = utils.extractPlayerCodeTag(this.originalSource);
      this.wrapperCode = this.originalSource.replace(/<playercode>[\s\S]*<\/playercode>/, '☃');
      this.originalSource = playerCode;
    }
    if (!this.commentContext) {
      return;
    }
    context = $.extend(true, {}, this.commentContext);
    if (this.commentI18N) {
      spokenLanguage = me.get('preferredLanguage');
      while (spokenLanguage) {
        if (typeof fallingBack !== "undefined" && fallingBack !== null) {
          spokenLanguage = spokenLanguage.substr(0, spokenLanguage.lastIndexOf('-'));
        }
        if (spokenLanguageContext = (ref1 = this.commentI18N[spokenLanguage]) != null ? ref1.context : void 0) {
          context = _.merge(context, spokenLanguageContext);
          break;
        }
        fallingBack = true;
      }
    }
    try {
      this.originalSource = _.template(this.originalSource, context);
      this.wrapperCode = _.template(this.wrapperCode, context);
    } catch (error) {
      e = error;
      console.error("Couldn't create example code template of", this.originalSource, "\nwith context", context, "\nError:", e);
    }
    if (/loop/.test(this.originalSource) && this.level.isType('course', 'course-ladder')) {
      return this.originalSource = (function() {
        switch (this.language) {
          case 'python':
            return this.originalSource.replace(/loop:/, 'while True:');
          case 'javascript':
            return this.originalSource.replace(/loop {/, 'while (true) {');
          case 'lua':
            return this.originalSource.replace(/loop\n/, 'while true then\n');
          case 'coffeescript':
            return this.originalSource;
          default:
            return this.originalSource;
        }
      }).call(this);
    }
  };

  Spell.prototype.constructHTML = function(source) {
    return this.wrapperCode.replace('☃', source);
  };

  Spell.prototype.addPicoCTFProblem = function() {
    var description, line, problem;
    if (!(problem = this.level.picoCTFProblem)) {
      return this.originalSource;
    }
    description = ("-- " + problem.name + " --\n" + problem.description).replace(/<p>(.*?)<\/p>/gi, '$1');
    return ((function() {
      var i, len, ref, results;
      ref = description.split('\n');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        line = ref[i];
        results.push("// " + line);
      }
      return results;
    })()).join('\n') + '\n' + this.originalSource;
  };

  Spell.prototype.addThang = function(thang) {
    var ref;
    if (((ref = this.thang) != null ? ref.thang.id : void 0) === thang.id) {
      return this.thang.thang = thang;
    } else {
      return this.thang = {
        thang: thang,
        aether: this.createAether(thang),
        castAether: null
      };
    }
  };

  Spell.prototype.removeThangID = function(thangID) {
    var ref;
    if (((ref = this.thang) != null ? ref.thang.id : void 0) === thangID) {
      return this.thang = null;
    }
  };

  Spell.prototype.canRead = function(team) {
    var ref, ref1;
    return (ref = team != null ? team : me.team, indexOf.call(this.permissions.read, ref) >= 0) || (ref1 = team != null ? team : me.team, indexOf.call(this.permissions.readwrite, ref1) >= 0);
  };

  Spell.prototype.canWrite = function(team) {
    var ref;
    return ref = team != null ? team : me.team, indexOf.call(this.permissions.readwrite, ref) >= 0;
  };

  Spell.prototype.getSource = function() {
    var ref, ref1;
    return (ref = (ref1 = this.view) != null ? ref1.getSource() : void 0) != null ? ref : this.source;
  };

  Spell.prototype.transpile = function(source) {
    var ref;
    if (source) {
      this.source = source;
    } else {
      source = this.getSource();
    }
    if (this.language !== 'html') {
      if ((ref = this.thang) != null) {
        ref.aether.transpile(source);
      }
    }
    return null;
  };

  Spell.prototype.hasChanged = function(newSource, currentSource) {
    if (newSource == null) {
      newSource = null;
    }
    if (currentSource == null) {
      currentSource = null;
    }
    return (newSource != null ? newSource : this.originalSource) !== (currentSource != null ? currentSource : this.source);
  };

  Spell.prototype.hasChangedSignificantly = function(newSource, currentSource, cb) {
    var aether, ref, workerMessage;
    if (newSource == null) {
      newSource = null;
    }
    if (currentSource == null) {
      currentSource = null;
    }
    if (!(aether = (ref = this.thang) != null ? ref.aether : void 0)) {
      console.error(this.toString(), 'couldn\'t find a spellThang with aether', this.thang);
      cb(false);
    }
    if (this.worker) {
      workerMessage = {
        "function": 'hasChangedSignificantly',
        a: newSource != null ? newSource : this.originalSource,
        spellKey: this.spellKey,
        b: currentSource != null ? currentSource : this.source,
        careAboutLineNumbers: true,
        careAboutLint: true
      };
      this.worker.addEventListener('message', (function(_this) {
        return function(e) {
          var workerData;
          workerData = JSON.parse(e.data);
          if (workerData["function"] === 'hasChangedSignificantly' && workerData.spellKey === _this.spellKey) {
            _this.worker.removeEventListener('message', arguments.callee, false);
            return cb(workerData.hasChanged);
          }
        };
      })(this));
      return this.worker.postMessage(JSON.stringify(workerMessage));
    } else {
      return cb(aether.hasChangedSignificantly(newSource != null ? newSource : this.originalSource, currentSource != null ? currentSource : this.source, true, true));
    }
  };

  Spell.prototype.createAether = function(thang) {
    var aether, aetherOptions, includeFlow, problemContext, skipProtectAPI, workerMessage, writable;
    writable = this.permissions.readwrite.length > 0 && !this.isAISource;
    skipProtectAPI = this.skipProtectAPI || !writable || this.level.isType('game-dev');
    problemContext = this.createProblemContext(thang);
    includeFlow = this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev') && !skipProtectAPI;
    aetherOptions = createAetherOptions({
      functionName: this.name,
      codeLanguage: this.language,
      functionParameters: this.parameters,
      skipProtectAPI: skipProtectAPI,
      includeFlow: includeFlow,
      problemContext: problemContext,
      useInterpreter: true
    });
    aether = new Aether(aetherOptions);
    if (this.worker) {
      workerMessage = {
        "function": 'createAether',
        spellKey: this.spellKey,
        options: aetherOptions
      };
      this.worker.postMessage(JSON.stringify(workerMessage));
    }
    return aether;
  };

  Spell.prototype.updateLanguageAether = function(language) {
    var ref, ref1, ref2, workerMessage;
    this.language = language;
    if ((ref = this.thang) != null) {
      if ((ref1 = ref.aether) != null) {
        ref1.setLanguage(this.language);
      }
    }
    if ((ref2 = this.thang) != null) {
      ref2.castAether = null;
    }
    Backbone.Mediator.publish('tome:spell-changed-language', {
      spell: this,
      language: this.language
    });
    if (this.worker) {
      workerMessage = {
        "function": 'updateLanguageAether',
        newLanguage: this.language
      };
      this.worker.postMessage(JSON.stringify(workerMessage));
    }
    return this.transpile();
  };

  Spell.prototype.toString = function() {
    return "<Spell: " + this.spellKey + ">";
  };

  Spell.prototype.createProblemContext = function(thang) {
    var i, key, len, prop, ref, ref1, ref2, ref3, value;
    if (this.problemContext != null) {
      return this.problemContext;
    }
    this.problemContext = {
      stringReferences: [],
      thisMethods: [],
      thisProperties: []
    };
    this.problemContext.commonThisMethods = ['moveRight', 'moveLeft', 'moveUp', 'moveDown', 'attack', 'findNearestEnemy', 'buildXY', 'moveXY', 'say', 'move', 'distance', 'findEnemies', 'findFriends', 'addFlag', 'findFlag', 'removeFlag', 'findFlags', 'attackRange', 'cast', 'buildTypes', 'jump', 'jumpTo', 'attackXY'];
    if (thang == null) {
      return this.problemContext;
    }
    ref1 = (ref = thang.world) != null ? ref.thangMap : void 0;
    for (key in ref1) {
      value = ref1[key];
      if ((value.isAttackable || value.isSelectable) && (ref2 = value.id, indexOf.call(this.problemContext.stringReferences, ref2) < 0)) {
        this.problemContext.stringReferences.push(value.id);
      }
    }
    if (thang.programmableProperties != null) {
      ref3 = thang.programmableProperties;
      for (i = 0, len = ref3.length; i < len; i++) {
        prop = ref3[i];
        if (_.isFunction(thang[prop])) {
          this.problemContext.thisMethods.push(prop);
        } else {
          this.problemContext.thisProperties.push(prop);
        }
      }
    }
    return this.problemContext;
  };

  Spell.prototype.reloadCode = function() {
    var programmableMethod, ref, ref1, ref2;
    if (!(programmableMethod = (ref = this.thang) != null ? (ref1 = ref.thang) != null ? (ref2 = ref1.programmableMethods) != null ? ref2[this.name] : void 0 : void 0 : void 0)) {
      return;
    }
    return this.createFromProgrammableMethod(programmableMethod, this.language);
  };

  return Spell;

})();
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/Spell.js.map
require.register("views/play/level/tome/DocFormatter", function(exports, require, module) {
var DocFormatter, downTheChain, popoverTemplate, safeJSONStringify, utils;

popoverTemplate = require('templates/play/level/tome/spell_palette_entry_popover');

downTheChain = require('lib/world/world_utils').downTheChain;

window.Vector = require('lib/world/vector');

utils = require('core/utils');

safeJSONStringify = function(input, maxDepth) {
  var output, recursion, refs, refsPaths;
  recursion = function(input, path, depth) {
    var output, p, pPath, refIdx;
    output = {};
    pPath = void 0;
    refIdx = void 0;
    path = path || '';
    depth = depth || 0;
    depth++;
    if (maxDepth && depth > maxDepth) {
      return '{depth over ' + maxDepth + '}';
    }
    for (p in input) {
      pPath = (path ? path + '.' : '') + p;
      if (typeof input[p] === 'function') {
        output[p] = '{function}';
      } else if (typeof input[p] === 'object') {
        refIdx = refs.indexOf(input[p]);
        if (-1 !== refIdx) {
          output[p] = '{reference to ' + refsPaths[refIdx] + '}';
        } else {
          refs.push(input[p]);
          refsPaths.push(pPath);
          output[p] = recursion(input[p], pPath, depth);
        }
      } else {
        output[p] = input[p];
      }
    }
    return output;
  };
  refs = [];
  refsPaths = [];
  maxDepth = maxDepth || 5;
  if (typeof input === 'object') {
    output = recursion(input);
  } else {
    output = input;
  }
  return JSON.stringify(output, null, 1);
};

module.exports = DocFormatter = (function() {
  function DocFormatter(options) {
    this.options = options;
    this.doc = _.cloneDeep(this.options.doc);
    this.fillOutDoc();
  }

  DocFormatter.prototype.fillOutDoc = function() {
    var arg, argNames, argString, args, base, context, docName, e, error, fallingBack, i, j, k, len, len1, len2, obj, originalVal, ownerName, prop, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, spokenLanguage, spokenLanguageContext, thisToken, toTranslate, translatedName, val, valByCodeLanguage;
    if (_.isString(this.doc)) {
      this.doc = {
        name: this.doc,
        type: typeof this.options.thang[this.doc]
      };
    }
    if (this.options.isSnippet) {
      this.doc.type = 'snippet';
      this.doc.owner = 'snippets';
      this.doc.shortName = this.doc.shorterName = this.doc.title = this.doc.name;
    } else if ((ref = this.doc.owner) === 'HTML' || ref === 'CSS' || ref === 'WebJavaScript' || ref === 'jQuery') {
      this.doc.shortName = this.doc.shorterName = this.doc.title = this.doc.name;
    } else {
      if ((base = this.doc).owner == null) {
        base.owner = 'this';
      }
      ownerName = this.doc.ownerName = (function() {
        if (this.doc.owner !== 'this') {
          return this.doc.owner;
        } else {
          switch (this.options.language) {
            case 'python':
            case 'lua':
              if (this.options.useHero) {
                return 'hero';
              } else {
                return 'self';
              }
            case 'java':
              return 'hero';
            case 'coffeescript':
              return '@';
            default:
              if (this.options.useHero) {
                return 'hero';
              } else {
                return 'this';
              }
          }
        }
      }).call(this);
      if (this.options.level.isType('game-dev')) {
        ownerName = 'game';
      }
      if (this.doc.type === 'function') {
        ref1 = this.getDocNameAndArguments(), docName = ref1[0], args = ref1[1];
        argNames = args.join(', ');
        argString = argNames ? '__ARGS__' : '';
        this.doc.shortName = (function() {
          switch (this.options.language) {
            case 'coffeescript':
              return "" + ownerName + (ownerName === '@' ? '' : '.') + docName + (argString ? ' ' + argString : '()');
            case 'python':
              return ownerName + "." + docName + "(" + argString + ")";
            case 'lua':
              return ownerName + ":" + docName + "(" + argString + ")";
            default:
              return ownerName + "." + docName + "(" + argString + ");";
          }
        }).call(this);
      } else {
        this.doc.shortName = (function() {
          switch (this.options.language) {
            case 'coffeescript':
              return "" + ownerName + (ownerName === '@' ? '' : '.') + this.doc.name;
            case 'python':
              return ownerName + "." + this.doc.name;
            case 'lua':
              return ownerName + "." + this.doc.name;
            default:
              return ownerName + "." + this.doc.name + ";";
          }
        }).call(this);
      }
      this.doc.shorterName = this.doc.shortName;
      if (this.doc.type === 'function' && argString) {
        this.doc.shortName = this.doc.shorterName.replace(argString, argNames);
        this.doc.shorterName = this.doc.shorterName.replace(argString, (!/cast[A-Z]/.test(this.doc.name) && argNames.length > 6 ? '...' : argNames));
      }
      if (this.doc.type === 'event') {
        this.doc.shortName = this.doc.name;
        this.doc.shorterName = this.doc.name;
      }
      if (this.options.language === 'javascript') {
        this.doc.shorterName = this.doc.shortName.replace(';', '');
        if (this.doc.owner === 'this' || this.options.tabbify || ownerName === 'game') {
          this.doc.shorterName = this.doc.shorterName.replace(/^(this|hero)\./, '');
        }
      } else if (((ref2 = this.options.language) === 'python' || ref2 === 'lua') && (this.doc.owner === 'this' || this.options.tabbify || ownerName === 'game')) {
        this.doc.shorterName = this.doc.shortName.replace(/^(self|hero|game)[:.]/, '');
      }
      this.doc.title = this.options.shortenize ? this.doc.shorterName : this.doc.shortName;
      translatedName = utils.i18n(this.doc, 'name');
      if (translatedName !== this.doc.name) {
        this.doc.translatedShortName = this.doc.shortName.replace(this.doc.name, translatedName);
      }
    }
    toTranslate = [
      {
        obj: this.doc,
        prop: 'description'
      }, {
        obj: this.doc,
        prop: 'example'
      }
    ];
    ref4 = (ref3 = this.doc.args) != null ? ref3 : [];
    for (i = 0, len = ref4.length; i < len; i++) {
      arg = ref4[i];
      toTranslate.push({
        obj: arg,
        prop: 'example'
      }, {
        obj: arg,
        prop: 'description'
      });
    }
    if (this.doc.returns) {
      toTranslate.push({
        obj: this.doc.returns,
        prop: 'example'
      }, {
        obj: this.doc.returns,
        prop: 'description'
      });
    }
    for (j = 0, len1 = toTranslate.length; j < len1; j++) {
      ref5 = toTranslate[j], obj = ref5.obj, prop = ref5.prop;
      if (val = (ref6 = obj[prop]) != null ? ref6[this.options.language] : void 0) {
        obj[prop] = val;
      } else if (!_.isString(obj[prop])) {
        obj[prop] = null;
      }
      if (val = originalVal = obj[prop]) {
        context = this.doc.context;
        obj[prop] = val = utils.i18n(obj, prop);
        if (_.isObject(val)) {
          if (valByCodeLanguage = (ref7 = obj[prop]) != null ? ref7[this.options.language] : void 0) {
            obj[prop] = val = valByCodeLanguage;
          } else {
            obj[prop] = originalVal;
          }
        }
        if (this.doc.i18n) {
          spokenLanguage = me.get('preferredLanguage');
          while (spokenLanguage) {
            if (typeof fallingBack !== "undefined" && fallingBack !== null) {
              spokenLanguage = spokenLanguage.substr(0, spokenLanguage.lastIndexOf('-'));
            }
            if (spokenLanguageContext = (ref8 = this.doc.i18n[spokenLanguage]) != null ? ref8.context : void 0) {
              context = _.merge(context, spokenLanguageContext);
              break;
            }
            fallingBack = true;
          }
        }
        if (context) {
          try {
            obj[prop] = _.template(val, context);
          } catch (error) {
            e = error;
            console.error("Couldn't create docs template of", val, "\nwith context", context, "\nError:", e);
          }
        }
        obj[prop] = this.replaceSpriteName(obj[prop]);
      }
    }
    if (this.options.useHero) {
      thisToken = {
        'python': /self/g,
        'javascript': /this/g,
        'lua': /self/g
      };
      if (thisToken[this.options.language]) {
        if (this.doc.example) {
          this.doc.example = this.doc.example.replace(thisToken[this.options.language], 'hero');
        }
        if ((ref9 = this.doc.snippets) != null ? (ref10 = ref9[this.options.language]) != null ? ref10.code : void 0 : void 0) {
          this.doc.snippets[this.options.language].code.replace(thisToken[this.options.language], 'hero');
        }
        if (this.doc.args) {
          ref11 = this.doc.args;
          for (k = 0, len2 = ref11.length; k < len2; k++) {
            arg = ref11[k];
            if (arg.example) {
              arg.example = arg.example.replace(thisToken[this.options.language], 'hero');
            }
          }
        }
      }
    }
    if (this.doc.shortName === 'loop' && this.options.level.isType('course', 'course-ladder')) {
      return this.replaceSimpleLoops();
    }
  };

  DocFormatter.prototype.replaceSimpleLoops = function() {
    var field, i, len, ref, ref1, results, simpleLoop, whileLoop;
    this.doc.shortName = this.doc.shorterName = this.doc.title = this.doc.name = (function() {
      switch (this.options.language) {
        case 'coffeescript':
          return "loop";
        case 'python':
          return "while True:";
        case 'lua':
          return "while true do";
        default:
          return "while (true)";
      }
    }).call(this);
    ref = ['example', 'description'];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      field = ref[i];
      ref1 = (function() {
        switch (this.options.language) {
          case 'coffeescript':
            return [/loop/g, "loop"];
          case 'python':
            return [/loop:/g, "while True:"];
          case 'lua':
            return [/loop/g, "while true do"];
          default:
            return [/loop/g, "while (true)"];
        }
      }).call(this), simpleLoop = ref1[0], whileLoop = ref1[1];
      results.push(this.doc[field] = this.doc[field].replace(simpleLoop, whileLoop));
    }
    return results;
  };

  DocFormatter.prototype.formatPopover = function() {
    var arg, args, argumentExamples, content, docName, owner, ref;
    ref = this.getDocNameAndArguments(), docName = ref[0], args = ref[1];
    argumentExamples = (function() {
      var i, len, ref1, ref2, results;
      ref2 = (ref1 = this.doc.args) != null ? ref1 : [];
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        arg = ref2[i];
        results.push(arg.example || arg["default"] || arg.name);
      }
      return results;
    }).call(this);
    if (args.length > argumentExamples.length) {
      argumentExamples.unshift(args[0]);
    }
    content = popoverTemplate({
      doc: this.doc,
      docName: docName,
      language: this.options.language,
      value: this.formatValue(),
      marked: marked,
      argumentExamples: argumentExamples,
      writable: this.options.writable,
      selectedMethod: this.options.selectedMethod,
      cooldowns: this.inferCooldowns(),
      item: this.options.item,
      _: _
    });
    owner = this.doc.owner === 'this' ? this.options.thang : window[this.doc.owner];
    content = this.replaceSpriteName(content);
    content = content.replace(/\#\{(.*?)\}/g, (function(_this) {
      return function(s, properties) {
        return _this.formatValue(downTheChain(owner, properties.split('.')));
      };
    })(this));
    return content = content.replace(/{([a-z]+)}([^]*?){\/\1}/g, (function(_this) {
      return function(s, language, text) {
        if (language === _this.options.language) {
          return text;
        }
        return '';
      };
    })(this));
  };

  DocFormatter.prototype.replaceSpriteName = function(s) {
    var name, ref;
    name = (ref = this.options.thang.type) != null ? ref : this.options.thang.spriteName;
    if (/Hero Placeholder/.test(this.options.thang.id)) {
      name = 'hero';
    }
    return s.replace(/#{spriteName}/g, name);
  };

  DocFormatter.prototype.getDocNameAndArguments = function() {
    var arg, args, docName;
    if (this.doc.type !== 'function') {
      return [this.doc.name, []];
    }
    docName = this.doc.name;
    args = (function() {
      var i, len, ref, ref1, results;
      ref1 = (ref = this.doc.args) != null ? ref : [];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        arg = ref1[i];
        results.push(arg.name);
      }
      return results;
    }).call(this);
    if (/cast[A-Z]/.test(docName)) {
      docName = 'cast';
      args.unshift('"' + _.string.dasherize(this.doc.name).replace('cast-', '') + '"');
    }
    return [docName, args];
  };

  DocFormatter.prototype.formatValue = function(v) {
    var v2;
    if (this.options.level.isType('web-dev')) {
      return null;
    }
    if (this.doc.type === 'snippet') {
      return null;
    }
    if (this.doc.name === 'now') {
      return this.options.thang.now();
    }
    if (!v && this.doc.type === 'function') {
      return '[Function]';
    }
    if (v == null) {
      if (this.doc.owner === 'this') {
        v = this.options.thang[this.doc.name];
      } else {
        v = window[this.doc.owner][this.doc.name];
      }
    }
    if (this.doc.type === 'number' && !_.isNaN(v)) {
      if (v === Math.round(v)) {
        return v;
      }
      if (_.isNumber(v)) {
        return v.toFixed(2);
      }
      if (!v) {
        return 'null';
      }
      return '' + v;
    }
    if (_.isString(v)) {
      return "\"" + v + "\"";
    }
    if (v != null ? v.id : void 0) {
      return v.id;
    }
    if (v != null ? v.name : void 0) {
      return v.name;
    }
    if (_.isArray(v)) {
      return '[' + ((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = v.length; i < len; i++) {
          v2 = v[i];
          results.push(this.formatValue(v2));
        }
        return results;
      }).call(this)).join(', ') + ']';
    }
    if (_.isPlainObject(v)) {
      return safeJSONStringify(v, 2);
    }
    return v;
  };

  DocFormatter.prototype.inferCooldowns = function() {
    var action, actionName, cooldowns, i, len, owner, prop, ref, ref1, ref2, spellName, type, v;
    if (!(this.doc.type === 'function' && this.doc.owner === 'this')) {
      return null;
    }
    owner = this.options.thang;
    cooldowns = null;
    spellName = this.doc.name.match(/^cast(.+)$/);
    if (spellName) {
      actionName = _.string.slugify(_.string.underscored(spellName[1]));
      action = (ref = owner.spells) != null ? ref[actionName] : void 0;
      type = 'spell';
    } else {
      actionName = _.string.slugify(_.string.underscored(this.doc.name));
      action = (ref1 = owner.actions) != null ? ref1[actionName] : void 0;
      type = 'action';
    }
    if (!action) {
      return null;
    }
    cooldowns = {
      cooldown: action.cooldown,
      specificCooldown: action.specificCooldown,
      name: actionName,
      type: type
    };
    ref2 = ['range', 'radius', 'duration', 'damage'];
    for (i = 0, len = ref2.length; i < len; i++) {
      prop = ref2[i];
      v = owner[_.string.camelize(actionName + _.string.capitalize(prop))];
      if (prop === 'range' && v <= 5) {
        continue;
      }
      cooldowns[prop] = v;
      if (_.isNumber(v) && v !== Math.round(v)) {
        cooldowns[prop] = v.toFixed(2);
      }
    }
    return cooldowns;
  };

  return DocFormatter;

})();
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/DocFormatter.js.map
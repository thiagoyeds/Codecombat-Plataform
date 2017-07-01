require.register("views/play/level/tome/editor/autocomplete", function(exports, require, module) {
var Autocomplete, ace, defaults, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

utils = require('core/utils');

ace = require('ace');

defaults = {
  autoLineEndings: {},
  basic: true,
  snippetsLangDefaults: true,
  liveCompletion: true,
  language: 'javascript',
  languagePrefixes: 'this.,@,self.',
  completers: {
    snippets: true
  }
};

module.exports = Autocomplete = (function() {
  var BackgroundTokenizer, Tokenizer;

  Tokenizer = '';

  BackgroundTokenizer = '';

  function Autocomplete(aceEditor, options) {
    this.doLiveCompletion = bind(this.doLiveCompletion, this);
    var config, defaultsCopy;
    Tokenizer = ace.require('ace/tokenizer').Tokenizer;
    BackgroundTokenizer = ace.require('ace/background_tokenizer').BackgroundTokenizer;
    this.editor = aceEditor;
    config = ace.require('ace/config');
    if (options == null) {
      options = {};
    }
    defaultsCopy = _.extend({}, defaults);
    this.options = _.merge(defaultsCopy, options);
    ace.config.loadModule('ace/ext/language_tools', (function(_this) {
      return function() {
        var aceDocument, highlightRules, tokenizer;
        _this.snippetManager = ace.require('ace/snippets').snippetManager;
        _this.snippetManager.expandWithTab = function() {
          return false;
        };
        highlightRules = new (_this.editor.getSession().getMode().HighlightRules)();
        tokenizer = new Tokenizer(highlightRules.getRules());
        _this.bgTokenizer = new BackgroundTokenizer(tokenizer, _this.editor);
        aceDocument = _this.editor.getSession().getDocument();
        _this.bgTokenizer.setDocument(aceDocument);
        _this.bgTokenizer.start(0);
        _this.setAceOptions();
        _this.copyCompleters();
        _this.activateCompleter();
        return _this.editor.commands.on('afterExec', _this.doLiveCompletion);
      };
    })(this));
  }

  Autocomplete.prototype.setAceOptions = function() {
    var aceOptions, ref;
    aceOptions = {
      'enableLiveAutocompletion': this.options.liveCompletion,
      'enableBasicAutocompletion': this.options.basic,
      'enableSnippets': this.options.completers.snippets
    };
    this.editor.setOptions(aceOptions);
    return (ref = this.editor.completer) != null ? ref.autoSelect = true : void 0;
  };

  Autocomplete.prototype.copyCompleters = function() {
    var ref;
    this.completers = {
      snippets: {},
      text: {},
      keywords: {}
    };
    if (this.editor.completers != null) {
      ref = this.editor.completers, this.completers.snippets.comp = ref[0], this.completers.text.comp = ref[1], this.completers.keywords.comp = ref[2];
    }
    if (this.options.completers.snippets) {
      this.completers.snippets = {
        pos: 0
      };
      return this.completers.snippets.comp = require('./snippets')(this.snippetManager, this.options.autoLineEndings);
    }
  };

  Autocomplete.prototype.activateCompleter = function(comp) {
    var comparator, ref, results, type;
    if (Array.isArray(comp)) {
      return this.editor.completers = comp;
    } else if (typeof comp === 'string') {
      if ((this.completers[comp] != null) && this.editor.completers[this.completers[comp].pos] !== this.completers[comp].comp) {
        return this.editor.completers.splice(this.completers[comp].pos, 0, this.completers[comp].comp);
      }
    } else {
      this.editor.completers = [];
      ref = this.completers;
      results = [];
      for (type in ref) {
        comparator = ref[type];
        if (this.options.completers[type] === true) {
          results.push(this.activateCompleter(type));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  Autocomplete.prototype.addSnippets = function(snippets, language) {
    this.options.language = language;
    return ace.config.loadModule('ace/ext/language_tools', (function(_this) {
      return function() {
        var snippetModulePath;
        _this.snippetManager = ace.require('ace/snippets').snippetManager;
        snippetModulePath = 'ace/snippets/' + language;
        return ace.config.loadModule(snippetModulePath, function(m) {
          var i, len, ref, s;
          if (m != null) {
            _this.snippetManager.files[language] = m;
            if (((ref = m.snippets) != null ? ref.length : void 0) > 0) {
              _this.snippetManager.unregister(m.snippets);
            }
            if (_this.oldSnippets != null) {
              _this.snippetManager.unregister(_this.oldSnippets);
            }
            m.snippets = _this.options.snippetsLangDefaults ? _this.snippetManager.parseSnippetFile(m.snippetText) : [];
            for (i = 0, len = snippets.length; i < len; i++) {
              s = snippets[i];
              m.snippets.push(s);
            }
            _this.snippetManager.register(m.snippets);
            return _this.oldSnippets = m.snippets;
          }
        });
      };
    })(this));
  };

  Autocomplete.prototype.setLiveCompletion = function(val) {
    if (val === true || val === false) {
      this.options.liveCompletion = val;
      return this.setAceOptions();
    }
  };

  Autocomplete.prototype.set = function(setting, value) {
    switch (setting) {
      case 'snippets' || 'completers.snippets':
        if (typeof value !== 'boolean') {
          return;
        }
        this.options.completers.snippets = value;
        this.setAceOptions();
        this.activateCompleter('snippets');
        break;
      case 'basic':
        if (typeof value !== 'boolean') {
          return;
        }
        this.options.basic = value;
        this.setAceOptions();
        this.activateCompleter();
        break;
      case 'liveCompletion':
        if (typeof value !== 'boolean') {
          return;
        }
        this.options.liveCompletion = value;
        this.setAceOptions();
        this.activateCompleter();
        break;
      case 'language':
        if (typeof value !== 'string') {
          return;
        }
        this.options.language = value;
        this.setAceOptions();
        this.activateCompleter();
        break;
      case 'completers.keywords':
        if (typeof value !== 'boolean') {
          return;
        }
        this.options.completers.keywords = value;
        this.activateCompleter();
        break;
      case 'completers.text':
        if (typeof value !== 'boolean') {
          return;
        }
        this.options.completers.text = value;
        this.activateCompleter();
    }
  };

  Autocomplete.prototype.on = function() {
    return this.paused = false;
  };

  Autocomplete.prototype.off = function() {
    return this.paused = true;
  };

  Autocomplete.prototype.doLiveCompletion = function(e) {
    var TokenIterator, base, editor, exitAndReturn, hasCompleter, pos, prefix, ref, ref1, ref2, ref3, ref4, ref5, ref6, text, token;
    if (!(this.options.basic || this.options.liveCompletion || this.options.completers.snippets)) {
      return;
    }
    if (this.paused) {
      return;
    }
    TokenIterator = TokenIterator || ace.require('ace/token_iterator').TokenIterator;
    editor = e.editor;
    text = e.args || "";
    hasCompleter = editor.completer && editor.completer.activated;
    if (e.command.name === "backspace" || e.command.name === "insertstring") {
      pos = editor.getCursorPosition();
      token = (new TokenIterator(editor.getSession(), pos.row, pos.column)).getCurrentToken();
      if ((token != null) && ((ref = token.type) !== 'comment' && ref !== 'string')) {
        prefix = this.getCompletionPrefix(editor);
        if (hasCompleter) {
          if ((ref1 = editor.completer) != null) {
            ref1.detach();
          }
        }
        if (/^x$|^y$/i.test(prefix)) {
          return;
        }
        if (prefix) {
          if (!editor.completer) {
            Autocomplete = ace.require('ace/autocomplete').Autocomplete;
            if ((Autocomplete != null ? (ref2 = Autocomplete.prototype) != null ? ref2.commands : void 0 : void 0) != null) {
              exitAndReturn = (function(_this) {
                return function(editor) {
                  editor.completer.detach();
                  return _this.editor.insert("\n");
                };
              })(this);
              Autocomplete.prototype.commands["Shift-Return"] = exitAndReturn;
            }
            editor.completer = new Autocomplete();
          }
          editor.completer.autoSelect = true;
          editor.completer.autoInsert = false;
          editor.completer.showPopup(editor);
          if (((ref3 = editor.completer) != null ? (ref4 = ref3.completions) != null ? (ref5 = ref4.filtered) != null ? ref5.length : void 0 : void 0 : void 0) > 20) {
            editor.completer.detach();
          } else if (editor.completer.popup != null) {
            $('.ace_autocomplete').find('.ace_content').css('cursor', 'pointer');
            if (this.options.popupFontSizePx != null) {
              $('.ace_autocomplete').css('font-size', this.options.popupFontSizePx + 'px');
            }
            if (this.options.popupLineHeightPx != null) {
              $('.ace_autocomplete').css('line-height', this.options.popupLineHeightPx + 'px');
            }
            if (this.options.popupWidthPx != null) {
              $('.ace_autocomplete').css('width', this.options.popupWidthPx + 'px');
            }
            if (typeof (base = editor.completer.popup).resize === "function") {
              base.resize();
            }
          }
        }
      }
    }
    if (this.options.completers.text && ((ref6 = e.command.name) === 'backspace' || ref6 === 'del' || ref6 === 'insertstring' || ref6 === 'removetolinestart' || ref6 === 'Enter' || ref6 === 'Return' || ref6 === 'Space' || ref6 === 'Tab')) {
      return this.bgTokenizer.fireUpdateEvent(0, this.editor.getSession().getLength());
    }
  };

  Autocomplete.prototype.getCompletionPrefix = function(editor) {
    var line, pos, prefix, ref, util;
    util = util || ace.require('ace/autocomplete/util');
    pos = editor.getCursorPosition();
    line = editor.session.getLine(pos.row);
    prefix = null;
    if ((ref = editor.completers) != null) {
      ref.forEach(function(completer) {
        if (completer != null ? completer.identifierRegexps : void 0) {
          return completer.identifierRegexps.forEach(function(identifierRegex) {
            if (!prefix && identifierRegex) {
              return prefix = util.retrievePrecedingIdentifier(line, pos.column, identifierRegex);
            }
          });
        }
      });
    }
    if (prefix == null) {
      prefix = util.retrievePrecedingIdentifier(line, pos.column);
    }
    return prefix;
  };

  Autocomplete.prototype.addCodeCombatSnippets = function(level, spellView, e) {
    var attackEntry, content, doc, entry, group, haveFindNearest, haveFindNearestEnemy, i, j, lang, len, len1, name, owner, prop, props, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, snippetEntries, source, thisToken, varName;
    snippetEntries = [];
    source = spellView.getSource();
    haveFindNearestEnemy = false;
    haveFindNearest = false;
    ref = e.propGroups;
    for (group in ref) {
      props = ref[group];
      for (i = 0, len = props.length; i < len; i++) {
        prop = props[i];
        if (_.isString(prop)) {
          owner = group;
        } else {
          owner = prop.owner;
          prop = prop.prop;
        }
        doc = _.find((ref1 = e.allDocs['__' + prop]) != null ? ref1 : [], function(doc) {
          if (doc.owner === owner) {
            return true;
          }
          return (owner === 'this' || owner === 'more') && ((doc.owner == null) || doc.owner === 'this');
        });
        if (doc != null ? (ref2 = doc.snippets) != null ? ref2[e.language] : void 0 : void 0) {
          name = doc.name;
          content = doc.snippets[e.language].code;
          if (/loop/.test(content) && level.get('moveRightLoopSnippet')) {
            content = (function() {
              switch (e.language) {
                case 'python':
                  return 'loop:\n    self.moveRight()\n    ${1:}';
                case 'javascript':
                  return 'loop {\n    this.moveRight();\n    ${1:}\n}';
                default:
                  return content;
              }
            })();
          }
          if (/loop/.test(content) && level.isType('course', 'course-ladder')) {
            content = (function() {
              switch (e.language) {
                case 'python':
                  return content.replace(/loop:/, 'while True:');
                case 'javascript':
                  return content.replace(/loop/, 'while (true)');
                case 'lua':
                  return content.replace(/loop/, 'while true then');
                case 'coffeescript':
                  return content;
                default:
                  return content;
              }
            })();
            name = (function() {
              switch (e.language) {
                case 'python':
                  return 'while True';
                case 'coffeescript':
                  return 'loop';
                default:
                  return 'while true';
              }
            })();
          }
          if (/hero/.test(source) || !/(self[\.\:]|this\.|\@)/.test(source)) {
            thisToken = {
              'python': /self/,
              'javascript': /this/,
              'lua': /self/
            };
            if (thisToken[e.language] && thisToken[e.language].test(content)) {
              content = content.replace(thisToken[e.language], 'hero');
            }
          }
          entry = {
            content: content,
            meta: $.i18n.t('keyboard_shortcuts.press_enter', {
              defaultValue: 'press enter'
            }),
            name: name,
            tabTrigger: doc.snippets[e.language].tab,
            importance: (ref3 = doc.autoCompletePriority) != null ? ref3 : 1.0
          };
          haveFindNearestEnemy || (haveFindNearestEnemy = name === 'findNearestEnemy');
          haveFindNearest || (haveFindNearest = name === 'findNearest');
          if (name === 'attack') {
            attackEntry = entry;
          } else {
            snippetEntries.push(entry);
          }
          if (doc.userShouldCaptureReturn) {
            varName = (ref4 = doc.userShouldCaptureReturn.variableName) != null ? ref4 : 'result';
            entry.captureReturn = (function() {
              switch (e.language) {
                case 'javascript':
                  return 'var ' + varName + ' = ';
                default:
                  return varName + ' = ';
              }
            })();
          }
        }
      }
    }
    if (attackEntry != null) {
      if (!(haveFindNearestEnemy || haveFindNearest || ((ref5 = level.get('slug')) === 'known-enemy' || ref5 === 'course-known-enemy'))) {
        attackEntry.content = attackEntry.content.replace('${1:enemy}', '"${1:Enemy Name}"');
      }
      snippetEntries.push(attackEntry);
    }
    for (j = 0, len1 = snippetEntries.length; j < len1; j++) {
      entry = snippetEntries[j];
      if (((ref6 = entry.content) != null ? ref6.indexOf('hero.') : void 0) === 0 && ((ref7 = entry.name) != null ? ref7.indexOf('hero.') : void 0) < 0) {
        entry.name = "hero." + entry.name;
      } else if (((ref8 = entry.content) != null ? ref8.indexOf('game.') : void 0) === 0 && ((ref9 = entry.name) != null ? ref9.indexOf('game.') : void 0) < 0) {
        entry.name = "game." + entry.name;
      }
    }
    if (haveFindNearest && !haveFindNearestEnemy) {
      spellView.translateFindNearest();
    }
    lang = utils.aceEditModes[e.language].substr('ace/mode/'.length);
    this.addSnippets(snippetEntries, lang);
    return spellView.editorLang = lang;
  };

  return Autocomplete;

})();
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/editor/autocomplete.js.map
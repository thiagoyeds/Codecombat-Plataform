require.register("views/play/level/tome/SpellView", function(exports, require, module) {
var Autocomplete, CocoView, CodeLog, LevelComponent, Problem, Range, SpellDebugView, SpellToolbarView, SpellTranslationView, SpellView, TokenIterator, UndoManager, UserCodeProblem, ace, commentStarts, filters, me, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/spell');

me = require('core/auth').me;

filters = require('lib/image_filter');

ace = require('ace');

Range = ace.require('ace/range').Range;

UndoManager = ace.require('ace/undomanager').UndoManager;

Problem = require('./Problem');

SpellDebugView = require('./SpellDebugView');

SpellTranslationView = require('./SpellTranslationView');

SpellToolbarView = require('./SpellToolbarView');

LevelComponent = require('models/LevelComponent');

UserCodeProblem = require('models/UserCodeProblem');

utils = require('core/utils');

CodeLog = require('models/CodeLog');

Autocomplete = require('./editor/autocomplete');

TokenIterator = ace.require('ace/token_iterator').TokenIterator;

module.exports = SpellView = (function(superClass) {
  extend(SpellView, superClass);

  SpellView.prototype.id = 'spell-view';

  SpellView.prototype.className = 'shown';

  SpellView.prototype.template = template;

  SpellView.prototype.controlsEnabled = true;

  SpellView.prototype.eventsSuppressed = true;

  SpellView.prototype.writable = true;

  SpellView.prototype.languagesThatUseWorkers = ['html'];

  SpellView.prototype.keyBindings = {
    'default': null,
    'vim': 'ace/keyboard/vim',
    'emacs': 'ace/keyboard/emacs'
  };

  SpellView.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'surface:frame-changed': 'onFrameChanged',
    'surface:coordinate-selected': 'onCoordinateSelected',
    'god:new-world-created': 'onNewWorld',
    'god:user-code-problem': 'onUserCodeProblem',
    'god:non-user-code-problem': 'onNonUserCodeProblem',
    'tome:manual-cast': 'onManualCast',
    'tome:spell-changed': 'onSpellChanged',
    'level:session-will-save': 'onSessionWillSave',
    'modal:closed': 'focus',
    'tome:focus-editor': 'focus',
    'tome:spell-statement-index-updated': 'onStatementIndexUpdated',
    'tome:change-language': 'onChangeLanguage',
    'tome:change-config': 'onChangeEditorConfig',
    'tome:update-snippets': 'addAutocompleteSnippets',
    'tome:insert-snippet': 'onInsertSnippet',
    'tome:spell-beautify': 'onSpellBeautify',
    'tome:maximize-toggled': 'onMaximizeToggled',
    'tome:problems-updated': 'onProblemsUpdated',
    'script:state-changed': 'onScriptStateChange',
    'playback:ended-changed': 'onPlaybackEndedChanged',
    'level:contact-button-pressed': 'onContactButtonPressed',
    'level:show-victory': 'onShowVictory',
    'web-dev:error': 'onWebDevError'
  };

  SpellView.prototype.events = {
    'mouseout': 'onMouseOut'
  };

  function SpellView(options) {
    this.checkSuspectCode = bind(this.checkSuspectCode, this);
    this.checkRequiredCode = bind(this.checkRequiredCode, this);
    this.onWindowResize = bind(this.onWindowResize, this);
    this.toggleBackground = bind(this.toggleBackground, this);
    this.onGutterClick = bind(this.onGutterClick, this);
    this.highlightCurrentLine = bind(this.highlightCurrentLine, this);
    this.onAceMouseMove = bind(this.onAceMouseMove, this);
    this.updateAether = bind(this.updateAether, this);
    this.updateHTML = bind(this.updateHTML, this);
    this.onCursorActivity = bind(this.onCursorActivity, this);
    this.saveSpade = bind(this.saveSpade, this);
    this.updateLines = bind(this.updateLines, this);
    this.notifyEditingBegan = bind(this.notifyEditingBegan, this);
    this.notifyEditingEnded = bind(this.notifyEditingEnded, this);
    this.notifySpellChanged = bind(this.notifySpellChanged, this);
    this.onAllLoaded = bind(this.onAllLoaded, this);
    var ref;
    this.supermodel = options.supermodel;
    SpellView.__super__.constructor.call(this, options);
    this.worker = options.worker;
    this.session = options.session;
    this.spell = options.spell;
    this.problems = [];
    this.savedProblems = {};
    if (ref = me.team, indexOf.call(this.spell.permissions.readwrite, ref) < 0) {
      this.writable = false;
    }
    this.highlightCurrentLine = _.throttle(this.highlightCurrentLine, 100);
    $(window).on('resize', this.onWindowResize);
    this.observing = this.session.get('creator') !== me.id;
  }

  SpellView.prototype.afterRender = function() {
    SpellView.__super__.afterRender.call(this);
    this.createACE();
    this.createACEShortcuts();
    this.hookACECustomBehavior();
    this.fillACE();
    this.createOnCodeChangeHandlers();
    this.lockDefaultCode();
    return _.defer(this.onAllLoaded);
  };

  SpellView.prototype.createACE = function() {
    var aceConfig, ref, ref1, ref2, ref3, saveSpadeDelay;
    aceConfig = (ref = me.get('aceConfig')) != null ? ref : {};
    this.destroyAceEditor(this.ace);
    this.ace = ace.edit(this.$el.find('.ace')[0]);
    this.aceSession = this.ace.getSession();
    this.reallySetAnnotations = this.aceSession.setAnnotations.bind(this.aceSession);
    this.aceSession.setAnnotations = (function(_this) {
      return function(annotations) {
        var newAnnotations, previousAnnotations;
        previousAnnotations = _this.aceSession.getAnnotations();
        newAnnotations = _.filter(previousAnnotations, function(annotation) {
          return annotation.createdBy != null;
        }).concat(_.reject(annotations, function(annotation) {
          return annotation.text === 'Start tag seen without seeing a doctype first. Expected e.g. <!DOCTYPE html>.';
        }));
        return _this.reallySetAnnotations(newAnnotations);
      };
    })(this);
    this.aceDoc = this.aceSession.getDocument();
    this.aceSession.setUseWorker((ref1 = this.spell.language, indexOf.call(this.languagesThatUseWorkers, ref1) >= 0));
    this.aceSession.setMode(utils.aceEditModes[this.spell.language]);
    this.aceSession.setWrapLimitRange(null);
    this.aceSession.setUseWrapMode(true);
    this.aceSession.setNewLineMode('unix');
    this.aceSession.setUseSoftTabs(true);
    this.ace.setTheme('ace/theme/textmate');
    this.ace.setDisplayIndentGuides(false);
    this.ace.setShowPrintMargin(false);
    this.ace.setShowInvisibles(aceConfig.invisibles);
    this.ace.setBehavioursEnabled(aceConfig.behaviors);
    this.ace.setAnimatedScroll(true);
    this.ace.setShowFoldWidgets(false);
    this.ace.setKeyboardHandler(this.keyBindings[(ref2 = aceConfig.keyBindings) != null ? ref2 : 'default']);
    this.ace.$blockScrolling = Infinity;
    this.ace.on('mousemove', this.onAceMouseMove);
    this.ace.on('mouseout', this.onAceMouseOut);
    this.toggleControls(null, this.writable);
    this.aceSession.selection.on('changeCursor', this.onCursorActivity);
    $(this.ace.container).find('.ace_gutter').on('click mouseenter', '.ace_error, .ace_warning, .ace_info', this.onAnnotationClick);
    $(this.ace.container).find('.ace_gutter').on('click', this.onGutterClick);
    this.initAutocomplete((ref3 = aceConfig.liveCompletion) != null ? ref3 : true);
    if (this.session.get('creator') !== me.id || this.session.fake) {
      return;
    }
    this.spade = new Spade();
    this.spade.track(this.ace);
    saveSpadeDelay = 10 * 60 * 1000;
    return this.saveSpadeTimeout = setTimeout(this.saveSpade, saveSpadeDelay);
  };

  SpellView.prototype.createACEShortcuts = function() {
    var aceCommands, addCommand;
    this.aceCommands = aceCommands = [];
    addCommand = (function(_this) {
      return function(c) {
        _this.ace.commands.addCommand(c);
        return aceCommands.push(c.name);
      };
    })(this);
    addCommand({
      name: 'run-code',
      bindKey: {
        win: 'Shift-Enter|Ctrl-Enter',
        mac: 'Shift-Enter|Command-Enter|Ctrl-Enter'
      },
      exec: (function(_this) {
        return function() {
          return Backbone.Mediator.publish('tome:manual-cast', {
            realTime: _this.options.level.isType('game-dev')
          });
        };
      })(this)
    });
    if (!this.observing) {
      addCommand({
        name: 'run-code-real-time',
        bindKey: {
          win: 'Ctrl-Shift-Enter',
          mac: 'Command-Shift-Enter|Ctrl-Shift-Enter'
        },
        exec: (function(_this) {
          return function() {
            var doneButton, timeUntilResubmit;
            doneButton = _this.$('.done-button:visible');
            if (doneButton.length) {
              return doneButton.trigger('click');
            } else if (_this.options.level.get('replayable') && (timeUntilResubmit = _this.session.timeUntilResubmit()) > 0) {
              return Backbone.Mediator.publish('tome:manual-cast-denied', {
                timeUntilResubmit: timeUntilResubmit
              });
            } else {
              return Backbone.Mediator.publish('tome:manual-cast', {
                realTime: true
              });
            }
          };
        })(this)
      });
    }
    addCommand({
      name: 'no-op',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S|Ctrl-S'
      },
      exec: function() {}
    });
    addCommand({
      name: 'toggle-playing',
      bindKey: {
        win: 'Ctrl-P',
        mac: 'Command-P|Ctrl-P'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:toggle-playing', {});
      }
    });
    addCommand({
      name: 'end-current-script',
      bindKey: {
        win: 'Shift-Space',
        mac: 'Shift-Space'
      },
      readOnly: true,
      exec: (function(_this) {
        return function() {
          if (_this.scriptRunning) {
            return Backbone.Mediator.publish('level:shift-space-pressed', {});
          } else {
            return _this.ace.insert(' ');
          }
        };
      })(this)
    });
    addCommand({
      name: 'end-all-scripts',
      bindKey: {
        win: 'Escape',
        mac: 'Escape'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:escape-pressed', {});
      }
    });
    addCommand({
      name: 'toggle-grid',
      bindKey: {
        win: 'Ctrl-G',
        mac: 'Command-G|Ctrl-G'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:toggle-grid', {});
      }
    });
    addCommand({
      name: 'toggle-debug',
      bindKey: {
        win: 'Ctrl-\\',
        mac: 'Command-\\|Ctrl-\\'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:toggle-debug', {});
      }
    });
    addCommand({
      name: 'toggle-pathfinding',
      bindKey: {
        win: 'Ctrl-O',
        mac: 'Command-O|Ctrl-O'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:toggle-pathfinding', {});
      }
    });
    addCommand({
      name: 'level-scrub-forward',
      bindKey: {
        win: 'Ctrl-]',
        mac: 'Command-]|Ctrl-]'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:scrub-forward', {});
      }
    });
    addCommand({
      name: 'level-scrub-back',
      bindKey: {
        win: 'Ctrl-[',
        mac: 'Command-[|Ctrl-]'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('level:scrub-back', {});
      }
    });
    addCommand({
      name: 'spell-step-forward',
      bindKey: {
        win: 'Ctrl-Alt-]',
        mac: 'Command-Alt-]|Ctrl-Alt-]'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('tome:spell-step-forward', {});
      }
    });
    addCommand({
      name: 'spell-step-backward',
      bindKey: {
        win: 'Ctrl-Alt-[',
        mac: 'Command-Alt-[|Ctrl-Alt-]'
      },
      readOnly: true,
      exec: function() {
        return Backbone.Mediator.publish('tome:spell-step-backward', {});
      }
    });
    addCommand({
      name: 'spell-beautify',
      bindKey: {
        win: 'Ctrl-Shift-B',
        mac: 'Command-Shift-B|Ctrl-Shift-B'
      },
      exec: function() {
        return Backbone.Mediator.publish('tome:spell-beautify', {});
      }
    });
    addCommand({
      name: 'prevent-line-jump',
      bindKey: {
        win: 'Ctrl-L',
        mac: 'Command-L'
      },
      passEvent: true,
      exec: function() {}
    });
    addCommand({
      name: 'open-fullscreen-editor',
      bindKey: {
        win: 'Ctrl-Shift-M',
        mac: 'Command-Shift-M|Ctrl-Shift-M'
      },
      exec: function() {
        return Backbone.Mediator.publish('tome:toggle-maximize', {});
      }
    });
    addCommand({
      name: 'enter-skip-delimiters',
      bindKey: 'Enter|Return',
      exec: (function(_this) {
        return function() {
          var cursor, delimMatch, line, newRange;
          if (_this.aceSession.selection.isEmpty()) {
            cursor = _this.ace.getCursorPosition();
            line = _this.aceDoc.getLine(cursor.row);
            if (delimMatch = line.substring(cursor.column).match(/^(["|']?\)+;?)/)) {
              newRange = _this.ace.getSelectionRange();
              newRange.setStart(newRange.start.row, newRange.start.column + delimMatch[1].length);
              newRange.setEnd(newRange.end.row, newRange.end.column + delimMatch[1].length);
              _this.aceSession.selection.setSelectionRange(newRange);
            }
          }
          return _this.ace.execCommand('insertstring', '\n');
        };
      })(this)
    });
    addCommand({
      name: 'disable-spaces',
      bindKey: 'Space',
      exec: (function(_this) {
        return function() {
          var aceConfig, disableSpaces, line, ref, ref1;
          disableSpaces = _this.options.level.get('disableSpaces') || false;
          aceConfig = (ref = me.get('aceConfig')) != null ? ref : {};
          if (aceConfig.keyBindings && aceConfig.keyBindings !== 'default') {
            disableSpaces = false;
          }
          if ((ref1 = _this.spell.language) === 'lua' || ref1 === 'java' || ref1 === 'coffeescript' || ref1 === 'html') {
            disableSpaces = false;
          }
          if (!disableSpaces || (_.isNumber(disableSpaces) && disableSpaces < me.level())) {
            return _this.ace.execCommand('insertstring', ' ');
          }
          line = _this.aceDoc.getLine(_this.ace.getCursorPosition().row);
          if (_this.singleLineCommentRegex().test(line)) {
            return _this.ace.execCommand('insertstring', ' ');
          }
        };
      })(this)
    });
    if (this.options.level.get('backspaceThrottle')) {
      return addCommand({
        name: 'throttle-backspaces',
        bindKey: 'Backspace',
        exec: (function(_this) {
          return function() {
            var cursor, line, nowDate;
            nowDate = Date.now();
            if (_this.aceSession.selection.isEmpty()) {
              cursor = _this.ace.getCursorPosition();
              line = _this.aceDoc.getLine(cursor.row);
              if (/^\s*$/.test(line.substring(0, cursor.column))) {
                if (_this.backspaceThrottleMs == null) {
                  _this.backspaceThrottleMs = 500;
                }
                if ((_this.lastBackspace == null) || nowDate - _this.lastBackspace > _this.backspaceThrottleMs) {
                  _this.backspaceThrottleMs = 100;
                  _this.lastBackspace = nowDate;
                  _this.ace.remove("left");
                }
                return;
              }
            }
            _this.backspaceThrottleMs = null;
            _this.lastBackspace = nowDate;
            return _this.ace.remove("left");
          };
        })(this)
      });
    }
  };

  SpellView.prototype.hookACECustomBehavior = function() {
    var aceConfig, ensureLineStartsBlock, language, ref;
    aceConfig = (ref = me.get('aceConfig')) != null ? ref : {};
    this.ace.commands.on('exec', (function(_this) {
      return function(e) {
        var selection;
        if (e.command.name === 'enter-skip-delimiters') {
          selection = _this.ace.selection.getRange();
          if (!(selection.start.column === selection.end.column && selection.start.row === selection.end.row)) {
            e.editor.execCommand('gotolineend');
            return true;
          }
        }
      };
    })(this));
    language = this.spell.language;
    ensureLineStartsBlock = function(line) {
      var match;
      if (language !== "python") {
        return false;
      }
      match = /^\s*([^#]+)/.exec(line);
      if (match == null) {
        return false;
      }
      return /:\s*$/.test(match[1]);
    };
    return this.aceSession.addDynamicMarker({
      update: (function(_this) {
        return function(html, markerLayer, session, config) {
          var bw, color, colors, crow, docRange, error, error1, foldWidgets, fw, guess, h, j, k, l, level, lines, range, ref1, ref2, ref3, rend, requiredIndent, results, row, rstart, startOfRow, t, to, w, xstart;
          Range = ace.require('ace/range').Range;
          foldWidgets = _this.aceSession.foldWidgets;
          if (foldWidgets == null) {
            return;
          }
          lines = _this.aceDoc.getAllLines();
          startOfRow = function(r) {
            var ar, str;
            str = lines[r];
            ar = str.match(/^\s*/);
            return ar.pop().length;
          };
          colors = [
            {
              border: '74,144,226',
              fill: '108,162,226'
            }, {
              border: '132,180,235',
              fill: '230,237,245'
            }
          ];
          results = [];
          for (row = j = 0, ref1 = _this.aceSession.getLength(); 0 <= ref1 ? j <= ref1 : j >= ref1; row = 0 <= ref1 ? ++j : --j) {
            if (foldWidgets[row] == null) {
              foldWidgets[row] = _this.aceSession.getFoldWidget(row);
            }
            if (!((foldWidgets != null) && foldWidgets[row] === "start")) {
              continue;
            }
            try {
              docRange = _this.aceSession.getFoldWidgetRange(row);
            } catch (error1) {
              error = error1;
              console.warn("Couldn't find fold widget docRange for row " + row + ":", error);
            }
            if (docRange == null) {
              guess = startOfRow(row);
              docRange = new Range(row, guess, row, guess + 4);
            }
            if (!ensureLineStartsBlock(lines[row])) {
              continue;
            }
            if (/^\s+$/.test(lines[docRange.end.row + 1])) {
              docRange.end.row += 1;
            }
            xstart = startOfRow(row);
            if (language === 'python') {
              requiredIndent = new RegExp('^' + new Array(Math.floor(xstart / 4 + 1)).join('(    |\t)') + '(    |\t)+(\\S|\\s*$)');
              for (crow = k = ref2 = docRange.start.row + 1, ref3 = docRange.end.row; ref2 <= ref3 ? k <= ref3 : k >= ref3; crow = ref2 <= ref3 ? ++k : --k) {
                if (!requiredIndent.test(lines[crow])) {
                  docRange.end.row = crow - 1;
                  break;
                }
              }
            }
            rstart = _this.aceSession.documentToScreenPosition(docRange.start.row, docRange.start.column);
            rend = _this.aceSession.documentToScreenPosition(docRange.end.row, docRange.end.column);
            range = new Range(rstart.row, rstart.column, rend.row, rend.column);
            level = Math.floor(xstart / 4);
            color = colors[level % colors.length];
            bw = 3;
            to = markerLayer.$getTop(range.start.row, config);
            t = markerLayer.$getTop(range.start.row + 1, config);
            h = config.lineHeight * (range.end.row - range.start.row);
            l = markerLayer.$padding + xstart * config.characterWidth;
            w = 4 * config.characterWidth;
            fw = config.characterWidth * (_this.aceSession.getScreenLastRowColumn(range.start.row) - xstart);
            results.push(html.push("<div style=\n  \"position: absolute; top: " + to + "px; left: " + l + "px; width: " + (fw + bw) + "px; height: " + config.lineHeight + "px;\n   border: " + bw + "px solid rgba(" + color.border + ",1); border-left: none;\"\n></div>\n<div style=\n  \"position: absolute; top: " + t + "px; left: " + l + "px; width: " + w + "px; height: " + h + "px; background-color: rgba(" + color.fill + ",0.5);\n   border-right: " + bw + "px solid rgba(" + color.border + ",1); border-bottom: " + bw + "px solid rgba(" + color.border + ",1);\"\n></div>"));
          }
          return results;
        };
      })(this)
    });
  };

  SpellView.prototype.fillACE = function() {
    this.ace.setValue(this.spell.source);
    this.aceSession.setUndoManager(new UndoManager());
    return this.ace.clearSelection();
  };

  SpellView.prototype.lockDefaultCode = function(force) {
    var aceConfig, finishRange, interceptCommand, intersects, intersectsLeft, intersectsRight, j, k, lastRow, len, len1, len2, line, lines, lockDefaultCode, m, marker, preventReadonly, pulseLockedCode, range, ref, ref1, ref2, ref3, row;
    if (force == null) {
      force = false;
    }
    lockDefaultCode = this.options.level.get('lockDefaultCode') || false;
    if (!lockDefaultCode || (_.isNumber(lockDefaultCode) && lockDefaultCode < me.level())) {
      return;
    }
    if (!(this.spell.source === this.spell.originalSource || force)) {
      return;
    }
    if (this.isIE()) {
      return;
    }
    aceConfig = (ref = me.get('aceConfig')) != null ? ref : {};
    if (aceConfig.keyBindings && aceConfig.keyBindings !== 'default') {
      return;
    }
    console.info('Locking down default code.');
    intersects = (function(_this) {
      return function() {
        var j, len, range, ref1;
        ref1 = _this.readOnlyRanges;
        for (j = 0, len = ref1.length; j < len; j++) {
          range = ref1[j];
          if (_this.ace.getSelectionRange().intersects(range)) {
            return true;
          }
        }
        return false;
      };
    })(this);
    intersectsLeft = (function(_this) {
      return function() {
        var j, leftRange, len, range, ref1;
        leftRange = _this.ace.getSelectionRange().clone();
        if (leftRange.start.column > 0) {
          leftRange.setStart(leftRange.start.row, leftRange.start.column - 1);
        } else if (leftRange.start.row > 0) {
          leftRange.setStart(leftRange.start.row - 1, 0);
        }
        ref1 = _this.readOnlyRanges;
        for (j = 0, len = ref1.length; j < len; j++) {
          range = ref1[j];
          if (leftRange.intersects(range)) {
            return true;
          }
        }
        return false;
      };
    })(this);
    intersectsRight = (function(_this) {
      return function() {
        var j, len, range, ref1, rightRange;
        rightRange = _this.ace.getSelectionRange().clone();
        if (rightRange.end.column < _this.aceDoc.getLine(rightRange.end.row).length) {
          rightRange.setEnd(rightRange.end.row, rightRange.end.column + 1);
        } else if (rightRange.start.row < _this.aceDoc.getLength() - 1) {
          rightRange.setEnd(rightRange.end.row + 1, 0);
        }
        ref1 = _this.readOnlyRanges;
        for (j = 0, len = ref1.length; j < len; j++) {
          range = ref1[j];
          if (rightRange.intersects(range)) {
            return true;
          }
        }
        return false;
      };
    })(this);
    pulseLockedCode = function() {
      return $('.locked-code').finish().addClass('pulsating').effect('shake', {
        times: 1,
        distance: 2,
        direction: 'down'
      }).removeClass('pulsating');
    };
    preventReadonly = function(next) {
      if (intersects()) {
        pulseLockedCode();
        return true;
      }
      return typeof next === "function" ? next() : void 0;
    };
    interceptCommand = function(obj, method, wrapper) {
      var orig;
      orig = obj[method];
      obj[method] = function() {
        var args;
        args = Array.prototype.slice.call(arguments);
        return wrapper((function(_this) {
          return function() {
            return orig.apply(obj, args);
          };
        })(this));
      };
      return obj[method];
    };
    finishRange = (function(_this) {
      return function(row, startRow, startColumn) {
        var range;
        range = new Range(startRow, startColumn, row, _this.aceSession.getLine(row).length - 1);
        range.start = _this.aceDoc.createAnchor(range.start);
        range.end = _this.aceDoc.createAnchor(range.end);
        range.end.$insertRight = true;
        return _this.readOnlyRanges.push(range);
      };
    })(this);
    if (this.lockedCodeMarkerIDs != null) {
      ref1 = this.lockedCodeMarkerIDs;
      for (j = 0, len = ref1.length; j < len; j++) {
        marker = ref1[j];
        this.aceSession.removeMarker(marker);
      }
    }
    this.lockedCodeMarkerIDs = [];
    this.readOnlyRanges = [];
    if ((ref2 = this.spell.language) === 'python' || ref2 === 'coffeescript') {
      lines = this.aceDoc.getAllLines();
      for (row = k = 0, len1 = lines.length; k < len1; row = ++k) {
        line = lines[row];
        if (!/^\s*$/.test(line)) {
          lastRow = row;
        }
      }
      if (lastRow != null) {
        this.readOnlyRanges.push(new Range(0, 0, lastRow, lines[lastRow].length - 1));
      }
    }
    ref3 = this.readOnlyRanges;
    for (m = 0, len2 = ref3.length; m < len2; m++) {
      range = ref3[m];
      this.lockedCodeMarkerIDs.push(this.aceSession.addMarker(range, 'locked-code', 'fullLine'));
    }
    interceptCommand(this.ace, 'onPaste', preventReadonly);
    interceptCommand(this.ace, 'onCut', preventReadonly);
    return this.ace.commands.on('exec', (function(_this) {
      return function(e) {
        var ref10, ref11, ref12, ref4, ref5, ref6, ref7, ref8, ref9;
        e.stopPropagation();
        e.preventDefault();
        if ((e.command.name === 'insertstring' && intersects()) || (((ref4 = e.command.name) === 'Backspace' || ref4 === 'throttle-backspaces') && intersectsLeft()) || (e.command.name === 'del' && intersectsRight())) {
          if ((ref5 = _this.autocomplete) != null) {
            if (typeof ref5.off === "function") {
              ref5.off();
            }
          }
          pulseLockedCode();
          return false;
        } else if ((ref6 = e.command.name) === 'enter-skip-delimiters' || ref6 === 'Enter' || ref6 === 'Return') {
          if (intersects()) {
            e.editor.navigateDown(1);
            e.editor.navigateLineStart();
            return false;
          } else if (((ref7 = e.command.name) === 'Enter' || ref7 === 'Return') && !((ref8 = e.editor) != null ? (ref9 = ref8.completer) != null ? (ref10 = ref9.popup) != null ? ref10.isOpen : void 0 : void 0 : void 0)) {
            if ((ref11 = _this.autocomplete) != null) {
              if (typeof ref11.on === "function") {
                ref11.on();
              }
            }
            return e.editor.execCommand('enter-skip-delimiters');
          }
        }
        if ((ref12 = _this.autocomplete) != null) {
          if (typeof ref12.on === "function") {
            ref12.on();
          }
        }
        return e.command.exec(e.editor, e.args || {});
      };
    })(this));
  };

  SpellView.prototype.initAutocomplete = function(autocompleteOn) {
    var popupFontSizePx, ref;
    this.autocompleteOn = autocompleteOn;
    if (this.spell.language === 'html') {
      return;
    }
    popupFontSizePx = (ref = this.options.level.get('autocompleteFontSizePx')) != null ? ref : 16;
    return this.autocomplete = new Autocomplete(this.ace, {
      basic: false,
      liveCompletion: false,
      snippetsLangDefaults: false,
      completers: {
        keywords: false,
        snippets: this.autocompleteOn
      },
      autoLineEndings: {
        javascript: ';'
      },
      popupFontSizePx: popupFontSizePx,
      popupLineHeightPx: 1.5 * popupFontSizePx,
      popupWidthPx: 380
    });
  };

  SpellView.prototype.updateAutocomplete = function(autocompleteOn) {
    var ref;
    this.autocompleteOn = autocompleteOn;
    return (ref = this.autocomplete) != null ? ref.set('snippets', this.autocompleteOn) : void 0;
  };

  SpellView.prototype.addAutocompleteSnippets = function(e) {
    if (!(this.autocomplete && this.autocompleteOn)) {
      return;
    }
    return this.autocomplete.addCodeCombatSnippets(this.options.level, this, e);
  };

  SpellView.prototype.translateFindNearest = function() {
    var newSource, oldSource;
    oldSource = this.getSource();
    newSource = oldSource.replace(/(self:|self.|this.|@)findNearestEnemy\(\)/g, "$1findNearest($1findEnemies())");
    newSource = newSource.replace(/(self:|self.|this.|@)findNearestItem\(\)/g, "$1findNearest($1findItems())");
    if (oldSource === newSource) {
      return;
    }
    this.spell.originalSource = newSource;
    this.updateACEText(newSource);
    return _.delay(((function(_this) {
      return function() {
        return typeof _this.recompile === "function" ? _this.recompile() : void 0;
      };
    })(this)), 1000);
  };

  SpellView.prototype.createFirepad = function() {
    var fireURL, firepadOptions;
    if (this.firepadLoading) {
      return;
    }
    this.eventsSuppressed = true;
    this.loaded = false;
    this.previousSource = this.ace.getValue();
    this.ace.setValue('');
    this.aceSession.setUndoManager(new UndoManager());
    fireURL = 'https://codecombat.firebaseio.com/' + this.spell.pathComponents.join('/');
    this.fireRef = new Firebase(fireURL);
    firepadOptions = {
      userId: me.id
    };
    this.firepad = Firepad.fromACE(this.fireRef, this.ace, firepadOptions);
    this.firepadLoading = true;
    return this.firepad.on('ready', (function(_this) {
      return function() {
        var firepadSource;
        if (_this.destroyed) {
          return;
        }
        _this.firepadLoading = false;
        firepadSource = _this.ace.getValue();
        if (firepadSource) {
          _this.spell.source = firepadSource;
        } else {
          _this.ace.setValue(_this.previousSource);
          _this.aceSession.setUndoManager(new UndoManager());
          _this.ace.clearSelection();
        }
        return _this.onAllLoaded();
      };
    })(this));
  };

  SpellView.prototype.onAllLoaded = function() {
    this.spell.transpile(this.spell.source);
    this.spell.loaded = true;
    Backbone.Mediator.publish('tome:spell-loaded', {
      spell: this.spell
    });
    this.eventsSuppressed = false;
    this.createToolbarView();
    if (this.options.level.isType('web-dev')) {
      return this.updateHTML({
        create: true
      });
    }
  };

  SpellView.prototype.createDebugView = function() {
    if (this.options.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      return;
    }
    this.debugView = new SpellDebugView({
      ace: this.ace,
      thang: this.thang,
      spell: this.spell
    });
    return this.$el.append(this.debugView.render().$el.hide());
  };

  SpellView.prototype.createTranslationView = function() {
    this.translationView = new SpellTranslationView({
      ace: this.ace,
      supermodel: this.supermodel
    });
    return this.$el.append(this.translationView.render().$el.hide());
  };

  SpellView.prototype.createToolbarView = function() {
    this.toolbarView = new SpellToolbarView({
      ace: this.ace
    });
    return this.$el.append(this.toolbarView.render().$el);
  };

  SpellView.prototype.onMouseOut = function(e) {
    var ref;
    return (ref = this.debugView) != null ? ref.onMouseOut(e) : void 0;
  };

  SpellView.prototype.onContactButtonPressed = function(e) {
    return this.saveSpade();
  };

  SpellView.prototype.getSource = function() {
    return this.ace.getValue();
  };

  SpellView.prototype.setThang = function(thang) {
    var ref, ref1, ref2;
    this.focus();
    this.lastScreenLineCount = null;
    this.updateLines();
    if (thang.id === ((ref = this.thang) != null ? ref.id : void 0)) {
      return;
    }
    this.thang = thang;
    this.spellThang = this.spell.thang;
    if (!this.debugView) {
      this.createDebugView();
    }
    if ((ref1 = this.debugView) != null) {
      ref1.thang = this.thang;
    }
    if (!this.translationView) {
      this.createTranslationView();
    }
    if ((ref2 = this.toolbarView) != null) {
      ref2.toggleFlow(false);
    }
    this.updateAether(false, false);
    return this.highlightCurrentLine();
  };

  SpellView.prototype.cast = function(preload, realTime, justBegin) {
    if (preload == null) {
      preload = false;
    }
    if (realTime == null) {
      realTime = false;
    }
    if (justBegin == null) {
      justBegin = false;
    }
    return Backbone.Mediator.publish('tome:cast-spell', {
      spell: this.spell,
      thang: this.thang,
      preload: preload,
      realTime: realTime,
      justBegin: justBegin
    });
  };

  SpellView.prototype.notifySpellChanged = function() {
    if (this.destroyed) {
      return;
    }
    return Backbone.Mediator.publish('tome:spell-changed', {
      spell: this.spell
    });
  };

  SpellView.prototype.notifyEditingEnded = function() {
    if (this.destroyed || this.aceDoc.undergoingFirepadOperation) {
      return;
    }
    return Backbone.Mediator.publish('tome:editing-ended', {});
  };

  SpellView.prototype.notifyEditingBegan = function() {
    if (this.destroyed || this.aceDoc.undergoingFirepadOperation) {
      return;
    }
    return Backbone.Mediator.publish('tome:editing-began', {});
  };

  SpellView.prototype.updateLines = function() {
    var cursorPosition, lastLine, lineCount, lineHeight, lines, linesAtMaxHeight, maxHeight, minHeight, newTop, ref, ref1, screenLineCount, spellPaletteAllowedHeight, spellToolbarHeight, spellTopBarHeight, tomeHeight, wasAtEnd;
    if (this.destroyed) {
      return;
    }
    lineCount = this.aceDoc.getLength();
    lastLine = this.aceDoc.$lines[lineCount - 1];
    if (lastLine !== '') {
      cursorPosition = this.ace.getCursorPosition();
      wasAtEnd = cursorPosition.row === lineCount - 1 && cursorPosition.column === lastLine.length;
      this.aceDoc.insertNewLine({
        row: lineCount,
        column: 0
      });
      if (wasAtEnd) {
        this.ace.navigateLeft(1);
      }
      ++lineCount;
      if ((ref = this.ace) != null) {
        if ((ref1 = ref.completer) != null) {
          ref1.showPopup(this.ace);
        }
      }
    }
    screenLineCount = this.aceSession.getScreenLength();
    if (screenLineCount !== this.lastScreenLineCount) {
      this.lastScreenLineCount = screenLineCount;
      lineHeight = this.ace.renderer.lineHeight || 20;
      tomeHeight = $('#tome-view').innerHeight();
      spellTopBarHeight = $('#spell-top-bar-view').outerHeight();
      spellToolbarHeight = $('.spell-toolbar-view').outerHeight();
      if (this.spellPaletteHeight == null) {
        this.spellPaletteHeight = 75;
      }
      spellPaletteAllowedHeight = Math.min(this.spellPaletteHeight, tomeHeight / 3);
      maxHeight = tomeHeight - spellTopBarHeight - spellToolbarHeight - spellPaletteAllowedHeight;
      minHeight = Math.max(8, (Math.min($("#canvas-wrapper").outerHeight(), $("#level-view").innerHeight() - 175) / lineHeight) - 2);
      linesAtMaxHeight = Math.floor(maxHeight / lineHeight);
      lines = Math.max(minHeight, Math.min(screenLineCount + 2, linesAtMaxHeight));
      this.ace.setOptions({
        minLines: lines,
        maxLines: lines
      });
      return newTop = 185 + lineHeight * lines;
    }
  };

  SpellView.prototype.hideProblemAlert = function() {
    if (this.destroyed) {
      return;
    }
    return Backbone.Mediator.publish('tome:hide-problem-alert', {});
  };

  SpellView.prototype.saveSpade = function() {
    var codeLog, compressedEvents, condensedEvents, spadeEvents;
    if (this.destroyed || !this.spade) {
      return;
    }
    spadeEvents = this.spade.compile();
    condensedEvents = this.spade.condense(spadeEvents);
    if (!condensedEvents.length) {
      return;
    }
    compressedEvents = LZString.compressToUTF16(JSON.stringify(condensedEvents));
    codeLog = new CodeLog({
      sessionID: this.options.session.id,
      level: {
        original: this.options.level.get('original'),
        majorVersion: (this.options.level.get('version')).major
      },
      levelSlug: this.options.level.get('slug'),
      userID: this.options.session.get('creator'),
      log: compressedEvents
    });
    return codeLog.save();
  };

  SpellView.prototype.onShowVictory = function(e) {
    if (this.saveSpadeTimeout != null) {
      window.clearTimeout(this.saveSpadeTimeout);
      return this.saveSpadeTimeout = null;
    }
  };

  SpellView.prototype.onManualCast = function(e) {
    var cast;
    cast = this.$el.parent().length;
    this.recompile(cast, e.realTime);
    if (cast) {
      this.focus();
    }
    if (this.options.level.isType('web-dev')) {
      this.sourceAtLastCast = this.getSource();
      this.ace.setStyle('spell-cast');
      return this.updateHTML({
        create: true
      });
    }
  };

  SpellView.prototype.reloadCode = function(cast) {
    if (cast == null) {
      cast = true;
    }
    if (cast) {
      this.spell.reloadCode();
    }
    this.thang = this.spell.thang.thang;
    this.updateACEText(this.spell.originalSource);
    this.lockDefaultCode(true);
    this.recompile(cast);
    Backbone.Mediator.publish('tome:spell-loaded', {
      spell: this.spell
    });
    return this.updateLines();
  };

  SpellView.prototype.recompile = function(cast, realTime) {
    var hasChanged;
    if (cast == null) {
      cast = true;
    }
    if (realTime == null) {
      realTime = false;
    }
    hasChanged = this.spell.source !== this.getSource();
    if (hasChanged) {
      this.spell.transpile(this.getSource());
      this.updateAether(true, false);
    }
    if (cast) {
      this.cast(false, realTime);
    }
    if (hasChanged) {
      return this.notifySpellChanged();
    }
  };

  SpellView.prototype.updateACEText = function(source) {
    var error, error1;
    this.eventsSuppressed = true;
    if (this.firepad) {
      this.firepad.setText(source);
    } else {
      this.ace.setValue(source);
      this.aceSession.setUndoManager(new UndoManager());
    }
    this.eventsSuppressed = false;
    try {
      return this.ace.resize(true);
    } catch (error1) {
      error = error1;
      return console.warn('Error resizing ACE after an update:', error);
    }
  };

  SpellView.prototype.createOnCodeChangeHandlers = function() {
    var onAnyChange, onSignificantChange;
    if (this.onCodeChangeMetaHandler) {
      this.aceDoc.removeListener('change', this.onCodeChangeMetaHandler);
    }
    onSignificantChange = [];
    onAnyChange = [_.debounce(this.updateAether, this.options.level.isType('game-dev') ? 10 : 500), _.debounce(this.notifyEditingEnded, 1000), _.throttle(this.notifyEditingBegan, 250), _.throttle(this.notifySpellChanged, 300), _.throttle(this.updateLines, 500), _.throttle(this.hideProblemAlert, 500)];
    if (this.options.level.get('requiredCode')) {
      onSignificantChange.push(_.debounce(this.checkRequiredCode, 750));
    }
    if (this.options.level.get('suspectCode')) {
      onSignificantChange.push(_.debounce(this.checkSuspectCode, 750));
    }
    if (this.options.level.isType('web-dev')) {
      onAnyChange.push(_.throttle(this.updateHTML, 10));
    }
    this.onCodeChangeMetaHandler = (function(_this) {
      return function() {
        if (_this.eventsSuppressed) {
          return;
        }
        if (_this.spellThang) {
          return _this.spell.hasChangedSignificantly(_this.getSource(), _this.spellThang.aether.raw, function(hasChanged) {
            var callback, j, k, len, len1, results;
            if (!_this.spellThang || hasChanged) {
              for (j = 0, len = onSignificantChange.length; j < len; j++) {
                callback = onSignificantChange[j];
                callback();
              }
            }
            results = [];
            for (k = 0, len1 = onAnyChange.length; k < len1; k++) {
              callback = onAnyChange[k];
              results.push(callback());
            }
            return results;
          });
        }
      };
    })(this);
    return this.aceDoc.on('change', this.onCodeChangeMetaHandler);
  };

  SpellView.prototype.onCursorActivity = function() {};

  SpellView.prototype.updateHTML = function(options) {
    if (options == null) {
      options = {};
    }
    if (this.spell.hasChanged(this.spell.getSource(), this.sourceAtLastCast)) {
      this.ace.unsetStyle('spell-cast');
    }
    this.clearWebDevErrors();
    return Backbone.Mediator.publish('tome:html-updated', {
      html: this.spell.constructHTML(this.getSource()),
      create: Boolean(options.create)
    });
  };

  SpellView.prototype.updateAether = function(force, fromCodeChange) {
    var aether, ref, source;
    if (force == null) {
      force = false;
    }
    if (fromCodeChange == null) {
      fromCodeChange = true;
    }
    if (!(aether = (ref = this.spellThang) != null ? ref.aether : void 0)) {
      return;
    }
    source = this.getSource();
    return this.spell.hasChangedSignificantly(source, aether.raw, (function(_this) {
      return function(hasChanged) {
        var castAether, codeHasChangedSignificantly, codeIsAsCast, finishUpdatingAether, needsUpdate, workerMessage;
        codeHasChangedSignificantly = force || hasChanged;
        needsUpdate = codeHasChangedSignificantly || _this.spellThang !== _this.lastUpdatedAetherSpellThang;
        if (!needsUpdate && aether === _this.displayedAether) {
          return;
        }
        castAether = _this.spellThang.castAether;
        codeIsAsCast = castAether && source === castAether.raw;
        if (codeIsAsCast) {
          aether = castAether;
        }
        if (!needsUpdate && aether === _this.displayedAether) {
          return;
        }
        finishUpdatingAether = function(aether) {
          _this.clearAetherDisplay();
          _this.displayAether(aether, codeIsAsCast);
          _this.lastUpdatedAetherSpellThang = _this.spellThang;
          if (fromCodeChange) {
            return _this.guessWhetherFinished(aether);
          }
        };
        _this.clearAetherDisplay();
        if (codeHasChangedSignificantly && !codeIsAsCast) {
          if (_this.worker) {
            workerMessage = {
              "function": 'transpile',
              spellKey: _this.spell.spellKey,
              source: source
            };
            _this.worker.addEventListener('message', function(e) {
              var workerData;
              workerData = JSON.parse(e.data);
              if (workerData["function"] === 'transpile' && workerData.spellKey === _this.spell.spellKey) {
                _this.worker.removeEventListener('message', arguments.callee, false);
                aether.problems = workerData.problems;
                aether.raw = source;
                return finishUpdatingAether(aether);
              }
            });
            return _this.worker.postMessage(JSON.stringify(workerMessage));
          } else {
            aether.transpile(source);
            return finishUpdatingAether(aether);
          }
        } else {
          return finishUpdatingAether(aether);
        }
      };
    })(this));
  };

  SpellView.prototype.clearAetherDisplay = function() {
    this.clearProblemsCreatedBy('aether');
    return this.highlightCurrentLine({});
  };

  SpellView.prototype.clearWebDevErrors = function() {
    return this.clearProblemsCreatedBy('web-dev-iframe');
  };

  SpellView.prototype.clearProblemsCreatedBy = function(createdBy) {
    var nonAetherAnnotations, problemsToClear;
    nonAetherAnnotations = _.reject(this.aceSession.getAnnotations(), function(annotation) {
      return annotation.createdBy === createdBy;
    });
    this.reallySetAnnotations(nonAetherAnnotations);
    problemsToClear = _.filter(this.problems, function(p) {
      return p.createdBy === createdBy;
    });
    problemsToClear.forEach(function(problem) {
      return problem.destroy();
    });
    this.problems = _.difference(this.problems, problemsToClear);
    return Backbone.Mediator.publish('tome:problems-updated', {
      spell: this.spell,
      problems: this.problems,
      isCast: false
    });
  };

  SpellView.prototype.convertAetherProblems = function(aether, aetherProblems, isCast) {
    return _.unique(aetherProblems, function(p) {
      var ref;
      return (ref = p.userInfo) != null ? ref.key : void 0;
    }).map((function(_this) {
      return function(aetherProblem) {
        return new Problem({
          aether: aether,
          aetherProblem: aetherProblem,
          ace: _this.ace,
          isCast: isCast,
          levelID: _this.options.levelID
        });
      };
    })(this));
  };

  SpellView.prototype.displayAether = function(aether, isCast) {
    var annotations, j, k, len, len1, newProblems, problem;
    if (isCast == null) {
      isCast = false;
    }
    this.displayedAether = aether;
    isCast = isCast || !_.isEmpty(aether.metrics) || _.some(aether.getAllProblems(), {
      type: 'runtime'
    });
    annotations = this.aceSession.getAnnotations();
    newProblems = this.convertAetherProblems(aether, aether.getAllProblems(), isCast);
    for (j = 0, len = newProblems.length; j < len; j++) {
      problem = newProblems[j];
      if (problem.annotation) {
        annotations.push(problem.annotation);
      }
    }
    if (isCast) {
      if (newProblems[0]) {
        this.displayProblemBanner(newProblems[0]);
      }
      for (k = 0, len1 = newProblems.length; k < len1; k++) {
        problem = newProblems[k];
        this.saveUserCodeProblem(aether, problem.aetherProblem);
      }
    }
    this.problems = this.problems.concat(newProblems);
    this.aceSession.setAnnotations(annotations);
    if (!_.isEmpty(aether.flow)) {
      this.highlightCurrentLine(aether.flow);
    }
    Backbone.Mediator.publish('tome:problems-updated', {
      spell: this.spell,
      problems: this.problems,
      isCast: isCast
    });
    return this.ace.resize();
  };

  SpellView.prototype.displayProblemBanner = function(problem) {
    var i, j, lineOffsetPx, ref;
    lineOffsetPx = 0;
    if (problem.row != null) {
      for (i = j = 0, ref = problem.row; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        lineOffsetPx += this.aceSession.getRowLength(i) * this.ace.renderer.lineHeight;
      }
      lineOffsetPx -= this.ace.session.getScrollTop();
    }
    return Backbone.Mediator.publish('tome:show-problem-alert', {
      problem: problem,
      lineOffsetPx: Math.max(lineOffsetPx, 0)
    });
  };

  SpellView.prototype.linesBeforeScript = function(html) {
    return _.size(html.split('<script>')[0].match(/\n/g));
  };

  SpellView.prototype.addAnnotation = function(annotation) {
    var annotations;
    annotations = this.aceSession.getAnnotations();
    annotations.push(annotation);
    return this.reallySetAnnotations(annotations);
  };

  SpellView.prototype.onWebDevError = function(error) {
    var offsetError, problem, userCodeHasChangedSinceLastCast;
    offsetError = _.merge({}, error, {
      line: error.line + this.linesBeforeScript(this.getSource())
    });
    userCodeHasChangedSinceLastCast = this.spell.hasChanged(this.spell.getSource(), this.sourceAtLastCast);
    problem = new Problem({
      error: offsetError,
      ace: this.ace,
      levelID: this.options.levelID,
      userCodeHasChangedSinceLastCast: userCodeHasChangedSinceLastCast
    });
    if (_.any(this.problems, function(preexistingProblem) {
      return problem.isEqual(preexistingProblem);
    })) {
      return problem.destroy();
    } else {
      this.problems.push(problem);
      this.displayProblemBanner(problem);
      if (problem.annotation) {
        this.addAnnotation(problem.annotation);
      }
      return Backbone.Mediator.publish('tome:problems-updated', {
        spell: this.spell,
        problems: this.problems,
        isCast: false
      });
    }
  };

  SpellView.prototype.onProblemsUpdated = function(arg) {
    var isCast, problems, spell;
    spell = arg.spell, problems = arg.problems, isCast = arg.isCast;
    this.ace[problems.length ? 'setStyle' : 'unsetStyle']('user-code-problem');
    return this.ace[isCast ? 'setStyle' : 'unsetStyle']('spell-cast');
  };

  SpellView.prototype.saveUserCodeProblem = function(aether, aetherProblem) {
    var errorLines, hashValue, lineInfoMatch, messageNoLineInfo, rawLines, ref;
    hashValue = aether.raw + aetherProblem.message;
    if (hashValue in this.savedProblems) {
      return;
    }
    this.savedProblems[hashValue] = true;
    if (!(Math.random() < 0.01)) {
      return;
    }
    this.userCodeProblem = new UserCodeProblem();
    this.userCodeProblem.set('code', aether.raw);
    if (aetherProblem.range) {
      rawLines = aether.raw.split('\n');
      errorLines = rawLines.slice(aetherProblem.range[0].row, aetherProblem.range[1].row + 1);
      this.userCodeProblem.set('codeSnippet', errorLines.join('\n'));
    }
    if (aetherProblem.hint) {
      this.userCodeProblem.set('errHint', aetherProblem.hint);
    }
    if (aetherProblem.id) {
      this.userCodeProblem.set('errId', aetherProblem.id);
    }
    if (aetherProblem.level) {
      this.userCodeProblem.set('errLevel', aetherProblem.level);
    }
    if (aetherProblem.message) {
      this.userCodeProblem.set('errMessage', aetherProblem.message);
      messageNoLineInfo = aetherProblem.message;
      if (lineInfoMatch = messageNoLineInfo.match(/^Line [0-9]+\: /)) {
        messageNoLineInfo = messageNoLineInfo.slice(lineInfoMatch[0].length);
      }
      this.userCodeProblem.set('errMessageNoLineInfo', messageNoLineInfo);
    }
    if (aetherProblem.range) {
      this.userCodeProblem.set('errRange', aetherProblem.range);
    }
    if (aetherProblem.type) {
      this.userCodeProblem.set('errType', aetherProblem.type);
    }
    if ((ref = aether.language) != null ? ref.id : void 0) {
      this.userCodeProblem.set('language', aether.language.id);
    }
    if (this.options.levelID) {
      this.userCodeProblem.set('levelID', this.options.levelID);
    }
    this.userCodeProblem.save();
    return null;
  };

  SpellView.prototype.guessWhetherFinished = function(aether) {
    var beginningOfLine, currentLine, cursorPosition, endOfLine, incompleteThis, valid;
    valid = !aether.getAllProblems().length;
    if (!valid) {
      return;
    }
    cursorPosition = this.ace.getCursorPosition();
    currentLine = _.string.rtrim(this.aceDoc.$lines[cursorPosition.row].replace(this.singleLineCommentRegex(), ''));
    endOfLine = cursorPosition.column >= currentLine.length;
    beginningOfLine = !currentLine.substr(0, cursorPosition.column).trim().length;
    incompleteThis = /^(s|se|sel|self|t|th|thi|this)$/.test(currentLine.trim());
    if (!incompleteThis && this.options.level.isType('game-dev')) {
      this.spell.transpile(this.getSource());
      return this.cast(false, false, true);
    } else if ((endOfLine || beginningOfLine) && !incompleteThis) {
      return this.preload();
    }
  };

  SpellView.prototype.singleLineCommentRegex = function() {
    var commentStart;
    if (this._singleLineCommentRegex) {
      this._singleLineCommentRegex.lastIndex = 0;
      return this._singleLineCommentRegex;
    }
    if (this.spell.language === 'html') {
      commentStart = commentStarts.html + "|" + commentStarts.css + "|" + commentStarts.javascript;
    } else {
      commentStart = commentStarts[this.spell.language] || '//';
    }
    this._singleLineCommentRegex = new RegExp("[ \t]*(" + commentStart + ")[^\"'\n]*");
    return this._singleLineCommentRegex;
  };

  SpellView.prototype.singleLineCommentOnlyRegex = function() {
    if (this._singleLineCommentOnlyRegex) {
      this._singleLineCommentOnlyRegex.lastIndex = 0;
      return this._singleLineCommentOnlyRegex;
    }
    this._singleLineCommentOnlyRegex = new RegExp('^' + this.singleLineCommentRegex().source);
    return this._singleLineCommentOnlyRegex;
  };

  SpellView.prototype.commentOutMyCode = function() {
    var comment, prefix;
    prefix = this.spell.language === 'javascript' ? 'return;  ' : 'return  ';
    return comment = prefix + commentStarts[this.spell.language];
  };

  SpellView.prototype.preload = function() {
    var key, oldSource, oldSpellThangAether, ref, ref1, ref2, ref3, results, value;
    if (this.spell.source.indexOf('while') !== -1) {
      return;
    }
    if (this.spell.source.length > 500) {
      return;
    }
    if (((ref = this.spellThang) != null ? (ref1 = ref.castAether) != null ? (ref2 = ref1.metrics) != null ? ref2.statementsExecuted : void 0 : void 0 : void 0) > 2000) {
      return;
    }
    if (this.options.level.isType('web-dev')) {
      return;
    }
    oldSource = this.spell.source;
    oldSpellThangAether = (ref3 = this.spell.thang) != null ? ref3.aether.serialize() : void 0;
    this.spell.transpile(this.getSource());
    this.cast(true);
    this.spell.source = oldSource;
    results = [];
    for (key in oldSpellThangAether) {
      value = oldSpellThangAether[key];
      results.push(this.spell.thang.aether[key] = value);
    }
    return results;
  };

  SpellView.prototype.onSpellChanged = function(e) {
    return this.spellHasChanged = true;
  };

  SpellView.prototype.onAceMouseOut = function(e) {
    return Backbone.Mediator.publish("web-dev:stop-hovering-line");
  };

  SpellView.prototype.onAceMouseMove = function(e) {
    var line, row;
    if (this.destroyed) {
      return;
    }
    row = e.getDocumentPosition().row;
    if (row === this.lastRowHovered) {
      return;
    }
    this.lastRowHovered = row;
    line = this.aceSession.getLine(row);
    Backbone.Mediator.publish("web-dev:hover-line", {
      row: row,
      line: line
    });
    return null;
  };

  SpellView.prototype.onSessionWillSave = function(e) {
    if (!(this.spellHasChanged && me.isAdmin())) {
      return;
    }
    setTimeout((function(_this) {
      return function() {
        if (!(_this.destroyed || _this.spellHasChanged)) {
          return _this.$el.find('.save-status').finish().show().fadeOut(2000);
        }
      };
    })(this), 1000);
    return this.spellHasChanged = false;
  };

  SpellView.prototype.onUserCodeProblem = function(e) {
    var ref;
    if (e.god !== this.options.god) {
      return;
    }
    if (e.problem.id === 'runtime_InfiniteLoop') {
      return this.onInfiniteLoop(e);
    }
    if (e.problem.userInfo.methodName !== this.spell.name) {
      return;
    }
    if (((ref = this.spell.thang) != null ? ref.thang.id : void 0) !== e.problem.userInfo.thangID) {
      return;
    }
    return this.spell.hasChangedSignificantly(this.getSource(), null, (function(_this) {
      return function(hasChanged) {
        if (hasChanged) {
          return;
        }
        _this.spell.thang.aether.addProblem(e.problem);
        _this.lastUpdatedAetherSpellThang = null;
        return _this.updateAether(false, false);
      };
    })(this));
  };

  SpellView.prototype.onNonUserCodeProblem = function(e) {
    var problem, ref;
    if (e.god !== this.options.god) {
      return;
    }
    if (!this.spellThang) {
      return;
    }
    problem = this.spellThang.aether.createUserCodeProblem({
      type: 'runtime',
      kind: 'Unhandled',
      message: "Unhandled error: " + e.problem.message
    });
    this.spellThang.aether.addProblem(problem);
    if ((ref = this.spellThang.castAether) != null) {
      ref.addProblem(problem);
    }
    this.lastUpdatedAetherSpellThang = null;
    return this.updateAether(false, false);
  };

  SpellView.prototype.onInfiniteLoop = function(e) {
    var ref;
    if (!this.spellThang) {
      return;
    }
    this.spellThang.aether.addProblem(e.problem);
    if ((ref = this.spellThang.castAether) != null) {
      ref.addProblem(e.problem);
    }
    this.lastUpdatedAetherSpellThang = null;
    return this.updateAether(false, false);
  };

  SpellView.prototype.onNewWorld = function(e) {
    var aether, ref, ref1, thang;
    if (thang = e.world.getThangByID((ref = this.spell.thang) != null ? ref.thang.id : void 0)) {
      aether = (ref1 = e.world.userCodeMap[thang.id]) != null ? ref1[this.spell.name] : void 0;
      this.spell.thang.castAether = aether;
      this.spell.thang.aether = this.spell.createAether(thang);
    } else {
      this.spell.thang = null;
    }
    this.spell.transpile();
    return this.updateAether(false, false);
  };

  SpellView.prototype.focus = function() {
    if (!(this.controlsEnabled && this.writable && $('.modal:visible').length === 0)) {
      return;
    }
    if (this.ace.isFocused()) {
      return;
    }
    this.ace.focus();
    return this.ace.clearSelection();
  };

  SpellView.prototype.onFrameChanged = function(e) {
    var ref, ref1;
    if (!(this.spellThang && ((ref = e.selectedThang) != null ? ref.id : void 0) === ((ref1 = this.spellThang) != null ? ref1.thang.id : void 0))) {
      return;
    }
    this.thang = e.selectedThang;
    return this.highlightCurrentLine();
  };

  SpellView.prototype.onCoordinateSelected = function(e) {
    if (!(this.ace.isFocused() && (e.x != null) && (e.y != null))) {
      return;
    }
    if (this.spell.language === 'python') {
      this.ace.insert("{\"x\": " + e.x + ", \"y\": " + e.y + "}");
    } else if (this.spell.language === 'lua') {
      this.ace.insert("{x=" + e.x + ", y=" + e.y + "}");
    } else {
      this.ace.insert("{x: " + e.x + ", y: " + e.y + "}");
    }
    return this.highlightCurrentLine();
  };

  SpellView.prototype.onStatementIndexUpdated = function(e) {
    if (e.ace !== this.ace) {
      return;
    }
    return this.highlightCurrentLine();
  };

  SpellView.prototype.highlightCurrentLine = function(flow) {
    var callNumber, callState, clazz, currentCallIndex, end, executed, executedRows, gotVariableStates, i, j, k, lastExecuted, len, len1, len2, len3, m, marked, markerRange, markerType, matched, n, o, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, row, showToolbarView, start, state, statementIndex, statementNumber, states;
    if (!this.destroyed) {
      this.highlightEntryPoints();
    }
    if (flow == null) {
      flow = (ref = this.spellThang) != null ? (ref1 = ref.castAether) != null ? ref1.flow : void 0 : void 0;
    }
    if (!(flow && this.thang)) {
      return;
    }
    executed = [];
    executedRows = {};
    matched = false;
    states = (ref2 = flow.states) != null ? ref2 : [];
    currentCallIndex = null;
    for (callNumber = j = 0, len = states.length; j < len; callNumber = ++j) {
      callState = states[callNumber];
      if ((currentCallIndex == null) && ((ref3 = callState.userInfo) != null ? ref3.time : void 0) > this.thang.world.age) {
        currentCallIndex = callNumber - 1;
      }
      if (matched) {
        executed.pop();
        break;
      }
      executed.push([]);
      ref4 = callState.statements;
      for (statementNumber = k = 0, len1 = ref4.length; k < len1; statementNumber = ++k) {
        state = ref4[statementNumber];
        if (((ref5 = state.userInfo) != null ? ref5.time : void 0) > this.thang.world.age) {
          matched = true;
          break;
        }
        _.last(executed).push(state);
        executedRows[state.range[0].row] = true;
      }
    }
    if (currentCallIndex == null) {
      currentCallIndex = callNumber - 1;
    }
    this.decoratedGutter = this.decoratedGutter || {};
    ref6 = (this.markerRanges != null ? this.markerRanges : this.markerRanges = []);
    for (m = 0, len2 = ref6.length; m < len2; m++) {
      markerRange = ref6[m];
      markerRange.start.detach();
      markerRange.end.detach();
      this.aceSession.removeMarker(markerRange.id);
    }
    this.markerRanges = [];
    for (row = n = 0, ref7 = this.aceSession.getLength(); 0 <= ref7 ? n < ref7 : n > ref7; row = 0 <= ref7 ? ++n : --n) {
      if (!executedRows[row]) {
        this.aceSession.removeGutterDecoration(row, 'executing');
        this.aceSession.removeGutterDecoration(row, 'executed');
        this.decoratedGutter[row] = '';
      }
    }
    lastExecuted = _.last(executed);
    showToolbarView = executed.length && this.spellThang.castAether.metrics.statementsExecuted > 3 && !this.options.level.get('hidesCodeToolbar');
    showToolbarView = false;
    if (showToolbarView) {
      statementIndex = Math.max(0, lastExecuted.length - 1);
      if ((ref8 = this.toolbarView) != null) {
        ref8.toggleFlow(true);
      }
      if ((ref9 = this.toolbarView) != null) {
        ref9.setCallState(states[currentCallIndex], statementIndex, currentCallIndex, this.spellThang.castAether.metrics);
      }
      if (((ref10 = this.toolbarView) != null ? ref10.statementIndex : void 0) != null) {
        lastExecuted = lastExecuted.slice(0, +this.toolbarView.statementIndex + 1 || 9e9);
      }
    } else {
      if ((ref11 = this.toolbarView) != null) {
        ref11.toggleFlow(false);
      }
      if ((ref12 = this.debugView) != null) {
        ref12.setVariableStates({});
      }
    }
    marked = {};
    gotVariableStates = false;
    ref13 = lastExecuted != null ? lastExecuted : [];
    for (i = o = 0, len3 = ref13.length; o < len3; i = ++o) {
      state = ref13[i];
      ref14 = state.range, start = ref14[0], end = ref14[1];
      clazz = i === lastExecuted.length - 1 ? 'executing' : 'executed';
      if (clazz === 'executed') {
        if (marked[start.row]) {
          continue;
        }
        marked[start.row] = true;
        markerType = 'fullLine';
      } else {
        if ((ref15 = this.debugView) != null) {
          ref15.setVariableStates(state.variables);
        }
        gotVariableStates = true;
        markerType = 'text';
      }
      markerRange = new Range(start.row, start.col, end.row, end.col);
      markerRange.start = this.aceDoc.createAnchor(markerRange.start);
      markerRange.end = this.aceDoc.createAnchor(markerRange.end);
      markerRange.id = this.aceSession.addMarker(markerRange, clazz, markerType);
      this.markerRanges.push(markerRange);
      if (executedRows[start.row] && this.decoratedGutter[start.row] !== clazz) {
        if (this.decoratedGutter[start.row] !== '') {
          this.aceSession.removeGutterDecoration(start.row, this.decoratedGutter[start.row]);
        }
        this.aceSession.addGutterDecoration(start.row, clazz);
        this.decoratedGutter[start.row] = clazz;
        if (application.isIPadApp) {
          Backbone.Mediator.publish("tome:highlight-line", {
            line: start.row
          });
        }
      }
    }
    if (!gotVariableStates) {
      if ((ref16 = this.debugView) != null) {
        ref16.setVariableStates({});
      }
    }
    return null;
  };

  SpellView.prototype.highlightEntryPoints = function() {
    var commentStart, i, indent, index, isEntryPoint, j, k, len, len1, line, lineHasChanged, lineHasCode, lineHasComment, lineHasExplicitMarker, lineIsBlank, lines, movedIndex, originalLine, originalLines, pastIntroComments, previousLine, previousLineHadCode, previousLineHadComment, previousLineWasBlank, ref, results, seenAnEntryPoint, session;
    lines = this.aceDoc.$lines;
    originalLines = this.spell.originalSource.split('\n');
    session = this.aceSession;
    commentStart = commentStarts[this.spell.language] || '//';
    seenAnEntryPoint = false;
    previousLine = null;
    previousLineHadComment = false;
    previousLineHadCode = false;
    previousLineWasBlank = false;
    pastIntroComments = false;
    results = [];
    for (index = j = 0, len = lines.length; j < len; index = ++j) {
      line = lines[index];
      session.removeGutterDecoration(index, 'entry-point');
      session.removeGutterDecoration(index, 'next-entry-point');
      ref = [0, 4, 8, 12, 16];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        i = ref[k];
        session.removeGutterDecoration(index, "entry-point-indent-" + i);
      }
      lineHasComment = this.singleLineCommentRegex().test(line);
      lineHasCode = line.trim()[0] && !this.singleLineCommentOnlyRegex().test(line);
      lineIsBlank = /^[ \t]*$/.test(line);
      lineHasExplicitMarker = line.indexOf('∆') !== -1;
      originalLine = originalLines[index];
      lineHasChanged = line !== originalLine;
      isEntryPoint = lineIsBlank && previousLineHadComment && !previousLineHadCode && pastIntroComments;
      if (isEntryPoint && lineHasChanged) {
        movedIndex = originalLines.indexOf(previousLine);
        if (movedIndex !== -1 && line === originalLines[movedIndex + 1]) {
          lineHasChanged = false;
        } else {
          isEntryPoint = false;
        }
      }
      if (lineHasExplicitMarker) {
        if (lineHasChanged) {
          if (originalLines.indexOf(line) !== -1) {
            lineHasChanged = false;
            isEntryPoint = true;
          }
        } else {
          isEntryPoint = true;
        }
      }
      if (isEntryPoint) {
        session.addGutterDecoration(index, 'entry-point');
        if (!seenAnEntryPoint) {
          session.addGutterDecoration(index, 'next-entry-point');
          seenAnEntryPoint = true;
        }
        indent = 0;
        while (/\s/.test(line[indent])) {
          indent++;
        }
        indent = Math.min(16, Math.floor(indent / 4) * 4);
        session.addGutterDecoration(index, "entry-point-indent-" + indent);
      }
      previousLine = line;
      previousLineHadComment = lineHasComment;
      previousLineHadCode = lineHasCode;
      previousLineWasBlank = lineIsBlank;
      results.push(pastIntroComments || (pastIntroComments = lineHasCode || previousLineWasBlank));
    }
    return results;
  };

  SpellView.prototype.onAnnotationClick = function() {
    return Backbone.Mediator.publish('tome:jiggle-problem-alert', {});
  };

  SpellView.prototype.onGutterClick = function() {
    return this.ace.clearSelection();
  };

  SpellView.prototype.onDisableControls = function(e) {
    return this.toggleControls(e, false);
  };

  SpellView.prototype.onEnableControls = function(e) {
    return this.toggleControls(e, this.writable);
  };

  SpellView.prototype.toggleControls = function(e, enabled) {
    var disabled, wasFocused;
    if (this.destroyed) {
      return;
    }
    if ((e != null ? e.controls : void 0) && !(indexOf.call(e.controls, 'editor') >= 0)) {
      return;
    }
    if (enabled === this.controlsEnabled) {
      return;
    }
    this.controlsEnabled = enabled && this.writable;
    disabled = !enabled;
    wasFocused = this.ace.isFocused();
    this.ace.setReadOnly(disabled);
    this.ace[disabled ? 'setStyle' : 'unsetStyle']('disabled');
    this.toggleBackground();
    if (disabled && wasFocused) {
      return $('body').focus();
    }
  };

  SpellView.prototype.toggleBackground = function() {
    var background;
    background = this.$el.find('img.code-background')[0];
    if (background.naturalWidth === 0) {
      return _.delay(this.toggleBackground, 100);
    }
    if (this.controlsEnabled) {
      filters.revertImage(background, 'span.code-background');
    }
    if (!this.controlsEnabled) {
      return filters.darkenImage(background, 'span.code-background', 0.8);
    }
  };

  SpellView.prototype.onSpellBeautify = function(e) {
    var pretty, ugly;
    if (!(this.spellThang && (this.ace.isFocused() || e.spell === this.spell))) {
      return;
    }
    ugly = this.getSource();
    pretty = this.spellThang.aether.beautify(ugly.replace(/\bloop\b/g, 'while (__COCO_LOOP_CONSTRUCT__)')).replace(/while \(__COCO_LOOP_CONSTRUCT__\)/g, 'loop');
    return this.ace.setValue(pretty);
  };

  SpellView.prototype.onMaximizeToggled = function(e) {
    return _.delay(((function(_this) {
      return function() {
        return _this.resize();
      };
    })(this)), 500 + 100);
  };

  SpellView.prototype.onWindowResize = function(e) {
    this.spellPaletteHeight = null;
    return _.delay(((function(_this) {
      return function() {
        return typeof _this.resize === "function" ? _this.resize() : void 0;
      };
    })(this)), 500 + 100);
  };

  SpellView.prototype.resize = function() {
    var ref;
    if ((ref = this.ace) != null) {
      ref.resize(true);
    }
    this.lastScreenLineCount = null;
    return this.updateLines();
  };

  SpellView.prototype.onChangeEditorConfig = function(e) {
    var aceConfig, ref, ref1, ref2;
    aceConfig = (ref = me.get('aceConfig')) != null ? ref : {};
    this.ace.setDisplayIndentGuides(aceConfig.indentGuides);
    this.ace.setShowInvisibles(aceConfig.invisibles);
    this.ace.setKeyboardHandler(this.keyBindings[(ref1 = aceConfig.keyBindings) != null ? ref1 : 'default']);
    return this.updateAutocomplete((ref2 = aceConfig.liveCompletion) != null ? ref2 : false);
  };

  SpellView.prototype.onChangeLanguage = function(e) {
    var ref, wasDefault;
    if (!this.spell.canWrite()) {
      return;
    }
    this.aceSession.setMode(utils.aceEditModes[e.language]);
    if ((ref = this.autocomplete) != null) {
      ref.set('language', utils.aceEditModes[e.language].substr('ace/mode/'));
    }
    wasDefault = this.getSource() === this.spell.originalSource;
    this.spell.setLanguage(e.language);
    if (wasDefault) {
      return this.reloadCode(true);
    }
  };

  SpellView.prototype.onInsertSnippet = function(e) {
    var ref, ref1, snippetCode, snippetManager;
    snippetCode = null;
    if ((ref = e.doc.snippets) != null ? (ref1 = ref[e.language]) != null ? ref1.code : void 0 : void 0) {
      snippetCode = e.doc.snippets[e.language].code;
    } else if ((e.formatted.type !== 'snippet') && (e.formatted.shortName != null)) {
      snippetCode = e.formatted.shortName;
    }
    if (snippetCode == null) {
      return;
    }
    snippetManager = ace.require('ace/snippets').snippetManager;
    snippetManager.insertSnippet(this.ace, snippetCode);
  };

  SpellView.prototype.dismiss = function() {
    return this.spell.hasChangedSignificantly(this.getSource(), null, (function(_this) {
      return function(hasChanged) {
        if (hasChanged) {
          return _this.recompile();
        }
      };
    })(this));
  };

  SpellView.prototype.onScriptStateChange = function(e) {
    return this.scriptRunning = e.currentScript === null ? false : true;
  };

  SpellView.prototype.onPlaybackEndedChanged = function(e) {
    var ref;
    return $((ref = this.ace) != null ? ref.container : void 0).toggleClass('playback-ended', e.ended);
  };

  SpellView.prototype.checkRequiredCode = function() {
    var j, len, requiredCodeFragment, requiredCodeFragments, results, source;
    if (this.destroyed) {
      return;
    }
    source = this.getSource().replace(this.singleLineCommentRegex(), '');
    requiredCodeFragments = this.options.level.get('requiredCode');
    results = [];
    for (j = 0, len = requiredCodeFragments.length; j < len; j++) {
      requiredCodeFragment = requiredCodeFragments[j];
      if (source.indexOf(requiredCodeFragment) === -1) {
        if (this.warnedCodeFragments == null) {
          this.warnedCodeFragments = {};
        }
        if (!this.warnedCodeFragments[requiredCodeFragment]) {
          Backbone.Mediator.publish('tome:required-code-fragment-deleted', {
            codeFragment: requiredCodeFragment
          });
        }
        results.push(this.warnedCodeFragments[requiredCodeFragment] = true);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SpellView.prototype.checkSuspectCode = function() {
    var detectedSuspectCodeFragmentNames, j, k, lastDetectedSuspectCodeFragmentName, len, len1, pattern, ref, ref1, source, suspectCodeFragment, suspectCodeFragments;
    if (this.destroyed) {
      return;
    }
    source = this.getSource().replace(this.singleLineCommentRegex(), '');
    suspectCodeFragments = this.options.level.get('suspectCode');
    detectedSuspectCodeFragmentNames = [];
    for (j = 0, len = suspectCodeFragments.length; j < len; j++) {
      suspectCodeFragment = suspectCodeFragments[j];
      pattern = new RegExp(suspectCodeFragment.pattern, 'm');
      if (pattern.test(source)) {
        if (this.warnedCodeFragments == null) {
          this.warnedCodeFragments = {};
        }
        if (!this.warnedCodeFragments[suspectCodeFragment.name]) {
          Backbone.Mediator.publish('tome:suspect-code-fragment-added', {
            codeFragment: suspectCodeFragment.name,
            codeLanguage: this.spell.language
          });
        }
        this.warnedCodeFragments[suspectCodeFragment.name] = true;
        detectedSuspectCodeFragmentNames.push(suspectCodeFragment.name);
      }
    }
    ref1 = (ref = this.lastDetectedSuspectCodeFragmentNames) != null ? ref : [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      lastDetectedSuspectCodeFragmentName = ref1[k];
      if (indexOf.call(detectedSuspectCodeFragmentNames, lastDetectedSuspectCodeFragmentName) < 0) {
        Backbone.Mediator.publish('tome:suspect-code-fragment-deleted', {
          codeFragment: lastDetectedSuspectCodeFragmentName,
          codeLanguage: this.spell.language
        });
      }
    }
    return this.lastDetectedSuspectCodeFragmentNames = detectedSuspectCodeFragmentNames;
  };

  SpellView.prototype.destroy = function() {
    var command, j, len, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    $((ref = this.ace) != null ? ref.container : void 0).find('.ace_gutter').off('click', '.ace_error, .ace_warning, .ace_info', this.onAnnotationClick);
    $((ref1 = this.ace) != null ? ref1.container : void 0).find('.ace_gutter').off('click', this.onGutterClick);
    if ((ref2 = this.firepad) != null) {
      ref2.dispose();
    }
    ref3 = this.aceCommands;
    for (j = 0, len = ref3.length; j < len; j++) {
      command = ref3[j];
      if ((ref4 = this.ace) != null) {
        ref4.commands.removeCommand(command);
      }
    }
    if ((ref5 = this.ace) != null) {
      ref5.destroy();
    }
    if ((ref6 = this.aceDoc) != null) {
      ref6.off('change', this.onCodeChangeMetaHandler);
    }
    if ((ref7 = this.aceSession) != null) {
      ref7.selection.off('changeCursor', this.onCursorActivity);
    }
    this.destroyAceEditor(this.ace);
    if ((ref8 = this.debugView) != null) {
      ref8.destroy();
    }
    if ((ref9 = this.translationView) != null) {
      ref9.destroy();
    }
    if ((ref10 = this.toolbarView) != null) {
      ref10.destroy();
    }
    if (this.editorLang != null) {
      if ((ref11 = this.autocomplete) != null) {
        ref11.addSnippets([], this.editorLang);
      }
    }
    $(window).off('resize', this.onWindowResize);
    window.clearTimeout(this.saveSpadeTimeout);
    this.saveSpadeTimeout = null;
    return SpellView.__super__.destroy.call(this);
  };

  return SpellView;

})(CocoView);

commentStarts = {
  javascript: '//',
  python: '#',
  coffeescript: '#',
  lua: '--',
  java: '//',
  html: '<!--',
  css: '/\\*'
};
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellView.js.map
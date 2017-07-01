require.register("lib/scripts/ScriptManager", function(exports, require, module) {
var CocoClass, CocoView, DEFAULT_BOT_MOVE_DURATION, DEFAULT_SCRUB_DURATION, ScriptManager, allScriptModules, scriptMatchesEventPrereqs,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

CocoView = require('views/core/CocoView');

scriptMatchesEventPrereqs = require('./../world/script_event_prereqs').scriptMatchesEventPrereqs;

allScriptModules = [];

allScriptModules.push(require('./SpriteScriptModule'));

allScriptModules.push(require('./DOMScriptModule'));

allScriptModules.push(require('./SurfaceScriptModule'));

allScriptModules.push(require('./PlaybackScriptModule'));

allScriptModules.push(require('./SoundScriptModule'));

DEFAULT_BOT_MOVE_DURATION = 500;

DEFAULT_SCRUB_DURATION = 1000;

module.exports = ScriptManager = ScriptManager = (function(superClass) {
  extend(ScriptManager, superClass);

  ScriptManager.prototype.scriptInProgress = false;

  ScriptManager.prototype.currentNoteGroup = null;

  ScriptManager.prototype.currentTimeouts = [];

  ScriptManager.prototype.worldLoading = true;

  ScriptManager.prototype.ignoreEvents = false;

  ScriptManager.prototype.quiet = false;

  ScriptManager.prototype.triggered = [];

  ScriptManager.prototype.ended = [];

  ScriptManager.prototype.noteGroupQueue = [];

  ScriptManager.prototype.originalScripts = [];

  ScriptManager.prototype.subscriptions = {
    'script:end-current-script': 'onEndNoteGroup',
    'level:loading-view-unveiling': function() {
      return this.setWorldLoading(false);
    },
    'level:restarted': 'onLevelRestarted',
    'level:shift-space-pressed': 'onEndNoteGroup',
    'level:escape-pressed': 'onEndAll'
  };

  ScriptManager.prototype.shortcuts = {
    '⇧+space, space, enter': function() {
      return Backbone.Mediator.publish('level:shift-space-pressed', {});
    },
    'escape': function() {
      return Backbone.Mediator.publish('level:escape-pressed', {});
    }
  };

  function ScriptManager(options) {
    this.tick = bind(this.tick, this);
    ScriptManager.__super__.constructor.call(this, options);
    this.originalScripts = options.scripts;
    this.session = options.session;
    this.levelID = options.levelID;
    this.debugScripts = application.isIPadApp || CocoView.getQueryVariable('dev');
    this.initProperties();
    this.addScriptSubscriptions();
    this.beginTicking();
  }

  ScriptManager.prototype.setScripts = function(originalScripts) {
    this.originalScripts = originalScripts;
    this.quiet = true;
    this.initProperties();
    this.loadFromSession();
    this.quiet = false;
    this.addScriptSubscriptions();
    return this.run();
  };

  ScriptManager.prototype.initProperties = function() {
    if (this.scriptInProgress) {
      this.endAll({
        force: true
      });
    }
    this.triggered = [];
    this.ended = [];
    this.noteGroupQueue = [];
    return this.scripts = $.extend(true, [], this.originalScripts);
  };

  ScriptManager.prototype.addScriptSubscriptions = function() {
    var callback, idNum, j, len, makeCallback, ref, results, script;
    idNum = 0;
    makeCallback = (function(_this) {
      return function(channel) {
        return function(event) {
          return _this.onNote(channel, event);
        };
      };
    })(this);
    ref = this.scripts;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      if (!script.id) {
        script.id = (idNum++).toString();
      }
      callback = makeCallback(script.channel);
      results.push(this.addNewSubscription(script.channel, callback));
    }
    return results;
  };

  ScriptManager.prototype.beginTicking = function() {
    return this.tickInterval = setInterval(this.tick, 5000);
  };

  ScriptManager.prototype.tick = function() {
    var j, len, now, ref, ref1, ref2, script, scriptStates, stateEvent;
    scriptStates = {};
    now = new Date();
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      scriptStates[script.id] = {
        timeSinceLastEnded: (script.lastEnded ? now - script.lastEnded : 0) / 1000,
        timeSinceLastTriggered: (script.lastTriggered ? now - script.lastTriggered : 0) / 1000
      };
    }
    stateEvent = {
      scriptRunning: ((ref1 = this.currentNoteGroup) != null ? ref1.scriptID : void 0) || '',
      noteGroupRunning: ((ref2 = this.currentNoteGroup) != null ? ref2.name : void 0) || '',
      scriptStates: scriptStates,
      timeSinceLastScriptEnded: (this.lastScriptEnded ? now - this.lastScriptEnded : 0) / 1000
    };
    return Backbone.Mediator.publish('script:tick', stateEvent);
  };

  ScriptManager.prototype.loadFromSession = function() {
    var j, len, noteGroup, ref, results;
    this.addEndedScriptsFromSession();
    this.addPartiallyEndedScriptFromSession();
    ref = this.noteGroupQueue;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      noteGroup = ref[j];
      results.push(this.processNoteGroup(noteGroup));
    }
    return results;
  };

  ScriptManager.prototype.addPartiallyEndedScriptFromSession = function() {
    var j, len, noteChain, noteGroup, ref, script, scripts;
    scripts = this.session.get('state').scripts;
    if (!(scripts != null ? scripts.currentScript : void 0)) {
      return;
    }
    script = _.find(this.scripts, {
      id: scripts.currentScript
    });
    if (!script) {
      return;
    }
    this.triggered.push(script.id);
    noteChain = this.processScript(script);
    if (!noteChain) {
      return;
    }
    if (scripts.currentScriptOffset) {
      ref = noteChain.slice(0, +(scripts.currentScriptOffset - 1) + 1 || 9e9);
      for (j = 0, len = ref.length; j < len; j++) {
        noteGroup = ref[j];
        noteGroup.skipMe = true;
      }
    }
    return this.addNoteChain(noteChain, false);
  };

  ScriptManager.prototype.addEndedScriptsFromSession = function() {
    var endedObj, j, k, len, len1, noteChain, noteGroup, p, script, scriptID, scripts, scriptsToSkip, sortedPairs;
    scripts = this.session.get('state').scripts;
    if (!scripts) {
      return;
    }
    endedObj = scripts['ended'] || {};
    sortedPairs = _.sortBy(_.pairs(endedObj), function(pair) {
      return pair[1];
    });
    scriptsToSkip = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = sortedPairs.length; j < len; j++) {
        p = sortedPairs[j];
        results.push(p[0]);
      }
      return results;
    })();
    for (j = 0, len = scriptsToSkip.length; j < len; j++) {
      scriptID = scriptsToSkip[j];
      script = _.find(this.scripts, {
        id: scriptID
      });
      if (!script) {
        console.warn('Couldn\'t find script for', scriptID, 'from scripts', this.scripts, 'when restoring session scripts.');
        continue;
      }
      if (script.repeats) {
        continue;
      }
      this.triggered.push(scriptID);
      this.ended.push(scriptID);
      noteChain = this.processScript(script);
      if (!noteChain) {
        return;
      }
      for (k = 0, len1 = noteChain.length; k < len1; k++) {
        noteGroup = noteChain[k];
        noteGroup.skipMe = true;
      }
      this.addNoteChain(noteChain, false);
    }
  };

  ScriptManager.prototype.setWorldLoading = function(worldLoading) {
    this.worldLoading = worldLoading;
    if (!this.worldLoading) {
      return this.run();
    }
  };

  ScriptManager.prototype.initializeCamera = function() {
    var cameraNote, j, k, len, len1, note, ref, ref1, ref2, script, surfaceModule;
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      ref1 = script.noteChain || [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        note = ref1[k];
        if (((ref2 = note.surface) != null ? ref2.focus : void 0) != null) {
          surfaceModule = _.find(note.modules || [], function(module) {
            return module.surfaceCameraNote;
          });
          cameraNote = surfaceModule.surfaceCameraNote(true);
          this.publishNote(cameraNote);
          return;
        }
      }
    }
  };

  ScriptManager.prototype.destroy = function() {
    this.onEndAll();
    clearInterval(this.tickInterval);
    return ScriptManager.__super__.destroy.call(this);
  };

  ScriptManager.prototype.onNote = function(channel, event) {
    var alreadyTriggered, j, k, len, len1, noteChain, ref, ref1, ref2, script, scriptID;
    if (this.ignoreEvents) {
      return;
    }
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      alreadyTriggered = (ref1 = script.id, indexOf.call(this.triggered, ref1) >= 0);
      if (script.channel !== channel) {
        continue;
      }
      if (alreadyTriggered && !script.repeats) {
        continue;
      }
      if ((script.lastTriggered != null) && script.repeats === 'session') {
        continue;
      }
      if ((script.lastTriggered != null) && new Date().getTime() - script.lastTriggered < 1) {
        continue;
      }
      if (script.neverRun) {
        continue;
      }
      if (script.notAfter) {
        ref2 = script.notAfter;
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          scriptID = ref2[k];
          if (indexOf.call(this.triggered, scriptID) >= 0) {
            script.neverRun = true;
            break;
          }
        }
        if (script.neverRun) {
          continue;
        }
      }
      if (!this.scriptPrereqsSatisfied(script)) {
        continue;
      }
      if (!scriptMatchesEventPrereqs(script, event)) {
        continue;
      }
      if (this.debugScripts) {
        console.debug("SCRIPT: Running script '" + script.id + "'");
      }
      script.lastTriggered = new Date().getTime();
      if (!alreadyTriggered) {
        this.triggered.push(script.id);
      }
      noteChain = this.processScript(script);
      if (!noteChain) {
        return this.trackScriptCompletions(script.id);
      }
      this.addNoteChain(noteChain);
      this.run();
    }
  };

  ScriptManager.prototype.scriptPrereqsSatisfied = function(script) {
    return _.every(script.scriptPrereqs || [], (function(_this) {
      return function(prereq) {
        return indexOf.call(_this.triggered, prereq) >= 0;
      };
    })(this));
  };

  ScriptManager.prototype.processScript = function(script) {
    var j, lastNoteGroup, len, noteChain, noteGroup;
    noteChain = script.noteChain;
    if (!(noteChain != null ? noteChain.length : void 0)) {
      return null;
    }
    for (j = 0, len = noteChain.length; j < len; j++) {
      noteGroup = noteChain[j];
      noteGroup.scriptID = script.id;
    }
    lastNoteGroup = noteChain[noteChain.length - 1];
    lastNoteGroup.isLast = true;
    return noteChain;
  };

  ScriptManager.prototype.addNoteChain = function(noteChain, clearYields) {
    var i, j, k, l, len, len1, len2, len3, m, noteGroup, ref;
    if (clearYields == null) {
      clearYields = true;
    }
    for (j = 0, len = noteChain.length; j < len; j++) {
      noteGroup = noteChain[j];
      this.processNoteGroup(noteGroup);
    }
    for (i = k = 0, len1 = noteChain.length; k < len1; i = ++k) {
      noteGroup = noteChain[i];
      noteGroup.index = i;
    }
    if (clearYields) {
      ref = this.noteGroupQueue;
      for (l = 0, len2 = ref.length; l < len2; l++) {
        noteGroup = ref[l];
        if (noteGroup.script.yields) {
          noteGroup.skipMe = true;
        }
      }
    }
    for (m = 0, len3 = noteChain.length; m < len3; m++) {
      noteGroup = noteChain[m];
      this.noteGroupQueue.push(noteGroup);
    }
    return this.endYieldingNote();
  };

  ScriptManager.prototype.processNoteGroup = function(noteGroup) {
    var Module, base, base1, base2, base3, j, len, ref, ref1, sprite;
    if (noteGroup.modules != null) {
      return;
    }
    if (((ref = noteGroup.playback) != null ? ref.scrub : void 0) != null) {
      if ((base = noteGroup.playback.scrub).duration == null) {
        base.duration = DEFAULT_SCRUB_DURATION;
      }
    }
    if (noteGroup.sprites == null) {
      noteGroup.sprites = [];
    }
    ref1 = noteGroup.sprites;
    for (j = 0, len = ref1.length; j < len; j++) {
      sprite = ref1[j];
      if (sprite.move != null) {
        if ((base1 = sprite.move).duration == null) {
          base1.duration = DEFAULT_BOT_MOVE_DURATION;
        }
      }
      if (sprite.id == null) {
        sprite.id = 'Hero Placeholder';
      }
    }
    if (noteGroup.script == null) {
      noteGroup.script = {};
    }
    if ((base2 = noteGroup.script).yields == null) {
      base2.yields = true;
    }
    if ((base3 = noteGroup.script).skippable == null) {
      base3.skippable = true;
    }
    return noteGroup.modules = (function() {
      var k, len1, results;
      results = [];
      for (k = 0, len1 = allScriptModules.length; k < len1; k++) {
        Module = allScriptModules[k];
        if (Module.neededFor(noteGroup)) {
          results.push(new Module(noteGroup));
        }
      }
      return results;
    })();
  };

  ScriptManager.prototype.endYieldingNote = function() {
    var ref;
    if (this.scriptInProgress && ((ref = this.currentNoteGroup) != null ? ref.script.yields : void 0)) {
      this.endNoteGroup();
      return true;
    }
  };

  ScriptManager.prototype.run = function() {
    var f, j, k, len, len1, module, nextNoteGroup, note, ref, ref1, ref2, ref3, ref4, scriptLabel;
    if (this.scriptInProgress) {
      return;
    }
    this.skipAhead();
    if (!this.noteGroupQueue.length) {
      return;
    }
    nextNoteGroup = this.noteGroupQueue[0];
    if (this.worldLoading && nextNoteGroup.skipMe) {
      return;
    }
    if (this.worldLoading && !((ref = nextNoteGroup.script) != null ? ref.beforeLoad : void 0)) {
      return;
    }
    this.noteGroupQueue = this.noteGroupQueue.slice(1);
    this.currentNoteGroup = nextNoteGroup;
    this.notifyScriptStateChanged();
    this.scriptInProgress = true;
    this.currentTimeouts = [];
    scriptLabel = nextNoteGroup.scriptID + " - " + nextNoteGroup.name;
    if ((ref1 = application.tracker) != null) {
      ref1.trackEvent('Script Started', {
        levelID: this.levelID,
        label: scriptLabel,
        ls: (ref2 = this.session) != null ? ref2.get('_id') : void 0
      }, ['Google Analytics']);
    }
    if (this.debugScripts) {
      console.debug("SCRIPT: Starting note group '" + nextNoteGroup.name + "'");
    }
    ref3 = nextNoteGroup.modules;
    for (j = 0, len = ref3.length; j < len; j++) {
      module = ref3[j];
      ref4 = module.startNotes();
      for (k = 0, len1 = ref4.length; k < len1; k++) {
        note = ref4[k];
        this.processNote(note, nextNoteGroup);
      }
    }
    if (nextNoteGroup.script.duration) {
      f = (function(_this) {
        return function() {
          return typeof _this.onNoteGroupTimeout === "function" ? _this.onNoteGroupTimeout(nextNoteGroup) : void 0;
        };
      })(this);
      setTimeout(f, nextNoteGroup.script.duration);
    }
    return Backbone.Mediator.publish('script:note-group-started', {});
  };

  ScriptManager.prototype.skipAhead = function() {
    var i, j, k, l, len, len1, len2, module, note, noteGroup, notes, ref, ref1, ref2;
    if (this.worldLoading) {
      return;
    }
    if (!((ref = this.noteGroupQueue[0]) != null ? ref.skipMe : void 0)) {
      return;
    }
    this.ignoreEvents = true;
    ref1 = this.noteGroupQueue;
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      noteGroup = ref1[i];
      if (!noteGroup.skipMe) {
        break;
      }
      if (this.debugScripts) {
        console.debug("SCRIPT: Skipping note group '" + noteGroup.name + "'");
      }
      this.processNoteGroup(noteGroup);
      ref2 = noteGroup.modules;
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        module = ref2[k];
        notes = module.skipNotes();
        for (l = 0, len2 = notes.length; l < len2; l++) {
          note = notes[l];
          this.processNote(note, noteGroup);
        }
      }
      this.trackScriptCompletionsFromNoteGroup(noteGroup);
    }
    this.noteGroupQueue = this.noteGroupQueue.slice(i);
    return this.ignoreEvents = false;
  };

  ScriptManager.prototype.processNote = function(note, noteGroup) {
    var f;
    if (note.event == null) {
      note.event = {};
    }
    if (note.delay) {
      f = (function(_this) {
        return function() {
          return _this.sendDelayedNote(noteGroup, note);
        };
      })(this);
      return this.currentTimeouts.push(setTimeout(f, note.delay));
    } else {
      return this.publishNote(note);
    }
  };

  ScriptManager.prototype.sendDelayedNote = function(noteGroup, note) {
    if (noteGroup !== this.currentNoteGroup) {
      return;
    }
    return this.publishNote(note);
  };

  ScriptManager.prototype.publishNote = function(note) {
    var ref;
    return Backbone.Mediator.publish(note.channel, (ref = note.event) != null ? ref : {});
  };

  ScriptManager.prototype.onLevelRestarted = function() {
    this.quiet = true;
    this.endAll({
      force: true
    });
    this.initProperties();
    this.resetThings();
    Backbone.Mediator.publish('script:reset', {});
    this.quiet = false;
    return this.run();
  };

  ScriptManager.prototype.onEndNoteGroup = function(e) {
    var ref;
    if (!((ref = this.currentNoteGroup) != null ? ref.script.skippable : void 0)) {
      return;
    }
    this.endNoteGroup();
    return this.run();
  };

  ScriptManager.prototype.endNoteGroup = function() {
    var j, k, l, len, len1, len2, module, note, ref, ref1, ref2, ref3, ref4, scriptLabel, timeout;
    if (this.ending) {
      return;
    }
    this.ending = true;
    if (this.currentNoteGroup == null) {
      return;
    }
    scriptLabel = this.currentNoteGroup.scriptID + " - " + this.currentNoteGroup.name;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Script Ended', {
        levelID: this.levelID,
        label: scriptLabel,
        ls: (ref1 = this.session) != null ? ref1.get('_id') : void 0
      }, ['Google Analytics']);
    }
    if (this.debugScripts) {
      console.debug("SCRIPT: Ending note group '" + this.currentNoteGroup.name + "'");
    }
    ref2 = this.currentTimeouts;
    for (j = 0, len = ref2.length; j < len; j++) {
      timeout = ref2[j];
      clearTimeout(timeout);
    }
    ref3 = this.currentNoteGroup.modules;
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      module = ref3[k];
      ref4 = module.endNotes();
      for (l = 0, len2 = ref4.length; l < len2; l++) {
        note = ref4[l];
        this.processNote(note, this.currentNoteGroup);
      }
    }
    if (!this.quiet) {
      Backbone.Mediator.publish('script:note-group-ended', {});
    }
    this.scriptInProgress = false;
    this.trackScriptCompletionsFromNoteGroup(this.currentNoteGroup);
    this.currentNoteGroup = null;
    if (!this.noteGroupQueue.length) {
      this.notifyScriptStateChanged();
      this.resetThings();
    }
    return this.ending = false;
  };

  ScriptManager.prototype.onEndAll = function(e) {
    return this.endAll();
  };

  ScriptManager.prototype.endAll = function(options) {
    var i, j, k, l, len, len1, len2, module, note, noteGroup, notes, ref, ref1, ref2;
    if (options == null) {
      options = {};
    }
    if (this.scriptInProgress) {
      if ((!this.currentNoteGroup.script.skippable) && (!options.force)) {
        return;
      }
      this.endNoteGroup();
    }
    ref = this.noteGroupQueue;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      noteGroup = ref[i];
      if ((((ref1 = noteGroup.script) != null ? ref1.skippable : void 0) === false) && !options.force) {
        this.noteGroupQueue = this.noteGroupQueue.slice(i);
        this.run();
        this.notifyScriptStateChanged();
        return;
      }
      this.processNoteGroup(noteGroup);
      ref2 = noteGroup.modules;
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        module = ref2[k];
        notes = module.skipNotes();
        if (!this.quiet) {
          for (l = 0, len2 = notes.length; l < len2; l++) {
            note = notes[l];
            this.processNote(note, noteGroup);
          }
        }
      }
      if (!this.quiet) {
        this.trackScriptCompletionsFromNoteGroup(noteGroup);
      }
    }
    this.noteGroupQueue = [];
    this.resetThings();
    return this.notifyScriptStateChanged();
  };

  ScriptManager.prototype.onNoteGroupTimeout = function(noteGroup) {
    if (noteGroup !== this.currentNoteGroup) {
      return;
    }
    this.endNoteGroup();
    return this.run();
  };

  ScriptManager.prototype.resetThings = function() {
    Backbone.Mediator.publish('level:enable-controls', {});
    return Backbone.Mediator.publish('level:set-letterbox', {
      on: false
    });
  };

  ScriptManager.prototype.trackScriptCompletionsFromNoteGroup = function(noteGroup) {
    if (!noteGroup.isLast) {
      return;
    }
    return this.trackScriptCompletions(noteGroup.scriptID);
  };

  ScriptManager.prototype.trackScriptCompletions = function(scriptID) {
    var j, len, ref, script;
    if (this.quiet) {
      return;
    }
    if (indexOf.call(this.ended, scriptID) < 0) {
      this.ended.push(scriptID);
    }
    ref = this.scripts;
    for (j = 0, len = ref.length; j < len; j++) {
      script = ref[j];
      if (script.id === scriptID) {
        script.lastEnded = new Date();
      }
    }
    this.lastScriptEnded = new Date();
    return Backbone.Mediator.publish('script:ended', {
      scriptID: scriptID
    });
  };

  ScriptManager.prototype.notifyScriptStateChanged = function() {
    var event, ref, ref1;
    if (this.quiet) {
      return;
    }
    event = {
      currentScript: ((ref = this.currentNoteGroup) != null ? ref.scriptID : void 0) || null,
      currentScriptOffset: ((ref1 = this.currentNoteGroup) != null ? ref1.index : void 0) || 0
    };
    return Backbone.Mediator.publish('script:state-changed', event);
  };

  return ScriptManager;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/ScriptManager.js.map
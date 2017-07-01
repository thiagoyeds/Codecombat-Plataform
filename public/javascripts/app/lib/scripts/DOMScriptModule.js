require.register("lib/scripts/DOMScriptModule", function(exports, require, module) {
var DOMScriptModule, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = DOMScriptModule = (function(superClass) {
  extend(DOMScriptModule, superClass);

  function DOMScriptModule() {
    return DOMScriptModule.__super__.constructor.apply(this, arguments);
  }

  DOMScriptModule.neededFor = function(noteGroup) {
    return noteGroup.dom != null;
  };

  DOMScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.highlight != null) {
      notes.push(this.highlightNote());
    }
    if (this.noteGroup.dom.lock != null) {
      notes.push(this.lockNote());
    }
    if (this.noteGroup.dom.focus != null) {
      notes.push(this.focusNote());
    }
    if (this.noteGroup.dom.showVictory) {
      notes.push(this.showVictoryNote());
    }
    if (this.noteGroup.dom.letterbox != null) {
      notes.push(this.letterboxNote());
    }
    return notes;
  };

  DOMScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.highlight != null) {
      notes.push({
        'channel': 'level:end-highlight-dom'
      });
    }
    if (this.noteGroup.dom.lock != null) {
      notes.push({
        'channel': 'level:enable-controls'
      });
    }
    return notes;
  };

  DOMScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.dom.showVictory != null) {
      notes.push(this.showVictoryNote(false));
    }
    if (this.noteGroup.dom.letterbox != null) {
      notes.push(this.letterboxNote());
    }
    return notes;
  };

  DOMScriptModule.prototype.highlightNote = function() {
    var dom, note;
    dom = this.noteGroup.dom;
    note = {
      channel: 'level:highlight-dom',
      event: {
        selector: dom.highlight.target,
        delay: dom.highlight.delay,
        sides: dom.highlight.sides,
        offset: dom.highlight.offset,
        rotation: dom.highlight.rotation
      }
    };
    note.event = _.pick(note.event, function(value) {
      return !_.isUndefined(value);
    });
    this.maybeApplyDelayToNote(note);
    return note;
  };

  DOMScriptModule.prototype.focusNote = function() {
    var note;
    note = {
      channel: 'level:focus-dom',
      event: {
        selector: this.noteGroup.dom.focus
      }
    };
    return note;
  };

  DOMScriptModule.prototype.showVictoryNote = function(showModal) {
    var e, note, ref;
    e = {};
    e.showModal = (ref = this.noteGroup.dom.showVictory) === true || ref === 'Done Button And Modal';
    if (showModal != null) {
      e.showModal = showModal;
    }
    note = {
      channel: 'level:show-victory',
      event: e
    };
    return note;
  };

  DOMScriptModule.prototype.lockNote = function() {
    var channel, event, lock;
    event = {};
    lock = this.noteGroup.dom.lock;
    if (_.isArray(lock)) {
      event.controls = lock;
    }
    channel = lock ? 'level:disable-controls' : 'level:enable-controls';
    return {
      channel: channel,
      event: event
    };
  };

  DOMScriptModule.prototype.letterboxNote = function() {
    return {
      channel: 'level:set-letterbox',
      event: {
        on: this.noteGroup.dom.letterbox
      }
    };
  };

  return DOMScriptModule;

})(ScriptModule);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/DOMScriptModule.js.map
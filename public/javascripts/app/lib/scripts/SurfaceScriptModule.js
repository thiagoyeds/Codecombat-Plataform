require.register("lib/scripts/SurfaceScriptModule", function(exports, require, module) {
var ScriptModule, SurfaceScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = SurfaceScriptModule = (function(superClass) {
  extend(SurfaceScriptModule, superClass);

  function SurfaceScriptModule() {
    return SurfaceScriptModule.__super__.constructor.apply(this, arguments);
  }

  SurfaceScriptModule.neededFor = function(noteGroup) {
    return noteGroup.surface != null;
  };

  SurfaceScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote());
    }
    if (this.noteGroup.surface.highlight != null) {
      notes.push(this.surfaceHighlightNote());
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.highlight != null) {
      notes.push({
        channel: 'sprite:highlight-sprites',
        event: {
          thangIDs: []
        }
      });
    }
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote(true));
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.surface.focus != null) {
      notes.push(this.surfaceCameraNote(true));
    }
    if (this.noteGroup.surface.lockSelect != null) {
      notes.push(this.surfaceLockSelectNote());
    }
    return notes;
  };

  SurfaceScriptModule.prototype.surfaceCameraNote = function(instant) {
    var e, focus;
    if (instant == null) {
      instant = false;
    }
    focus = this.noteGroup.surface.focus;
    e = {};
    if (_.isPlainObject(focus.target)) {
      e.pos = focus.target;
    }
    if (_.isString(focus.target)) {
      e.thangID = focus.target;
    }
    e.zoom = focus.zoom || 2.0;
    e.duration = focus.duration != null ? focus.duration : 1500;
    if (instant) {
      e.duration = 0;
    }
    if (focus.bounds != null) {
      e.bounds = focus.bounds;
    }
    return {
      channel: 'camera:set-camera',
      event: e
    };
  };

  SurfaceScriptModule.prototype.surfaceHighlightNote = function() {
    var highlight, note;
    highlight = this.noteGroup.surface.highlight;
    note = {
      channel: 'sprite:highlight-sprites',
      event: {
        thangIDs: highlight.targets,
        delay: highlight.delay
      }
    };
    this.maybeApplyDelayToNote(note, this.noteGroup);
    return note;
  };

  SurfaceScriptModule.prototype.surfaceLockSelectNote = function() {
    return {
      channel: 'level:lock-select',
      event: {
        lock: this.noteGroup.surface.lockSelect
      }
    };
  };

  return SurfaceScriptModule;

})(ScriptModule);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/SurfaceScriptModule.js.map
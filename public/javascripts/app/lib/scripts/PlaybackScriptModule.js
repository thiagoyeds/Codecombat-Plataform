require.register("lib/scripts/PlaybackScriptModule", function(exports, require, module) {
var PlaybackScriptModule, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

module.exports = PlaybackScriptModule = (function(superClass) {
  extend(PlaybackScriptModule, superClass);

  function PlaybackScriptModule() {
    return PlaybackScriptModule.__super__.constructor.apply(this, arguments);
  }

  PlaybackScriptModule.neededFor = function(noteGroup) {
    return noteGroup.playback != null;
  };

  PlaybackScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.playback.playing != null) {
      notes.push(this.playingNote());
    }
    if (this.noteGroup.playback.scrub != null) {
      notes.push(this.scrubNote());
    }
    return notes;
  };

  PlaybackScriptModule.prototype.endNotes = function() {
    var notes;
    notes = [];
    return notes;
  };

  PlaybackScriptModule.prototype.skipNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.playback.playing != null) {
      notes.push(this.playingNote());
    }
    if (this.noteGroup.playback.scrub != null) {
      notes.push(this.scrubNote(true));
    }
    return notes;
  };

  PlaybackScriptModule.prototype.playingNote = function() {
    var note;
    note = {
      channel: 'level:set-playing',
      event: {
        playing: this.noteGroup.playback.playing
      }
    };
    return note;
  };

  PlaybackScriptModule.prototype.scrubNote = function(instant) {
    var note, scrub;
    if (instant == null) {
      instant = false;
    }
    scrub = this.noteGroup.playback.scrub;
    note = {
      channel: 'level:set-time',
      event: {
        frameOffset: scrub.frameOffset || 2,
        scrubDuration: instant ? 0 : scrub.duration
      }
    };
    if (scrub.toTime != null) {
      note.event.time = scrub.toTime;
    }
    if (scrub.toRatio != null) {
      note.event.ratio = scrub.toRatio;
    }
    return note;
  };

  return PlaybackScriptModule;

})(ScriptModule);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/PlaybackScriptModule.js.map
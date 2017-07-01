require.register("lib/scripts/SoundScriptModule", function(exports, require, module) {
var ScriptModule, SoundScriptModule, currentMusic, me, standingBy,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

currentMusic = null;

standingBy = null;

me = require('core/auth').me;

module.exports = SoundScriptModule = (function(superClass) {
  extend(SoundScriptModule, superClass);

  function SoundScriptModule() {
    return SoundScriptModule.__super__.constructor.apply(this, arguments);
  }

  SoundScriptModule.neededFor = function(noteGroup) {
    return noteGroup.sound != null;
  };

  SoundScriptModule.prototype.startNotes = function() {
    var notes;
    notes = [];
    if (this.noteGroup.sound.suppressSelectionSounds != null) {
      notes.push(this.addSuppressSelectionSoundsNote());
    }
    if (this.noteGroup.sound.music != null) {
      notes.push(this.addMusicNote());
    }
    return notes;
  };

  SoundScriptModule.prototype.endNotes = function() {
    return [];
  };

  SoundScriptModule.prototype.skipNotes = function() {
    return this.startNotes();
  };

  SoundScriptModule.prototype.addSuppressSelectionSoundsNote = function() {
    var note;
    note = {
      channel: 'level:suppress-selection-sounds',
      event: {
        suppress: this.noteGroup.sound.suppressSelectionSounds
      }
    };
    return note;
  };

  SoundScriptModule.prototype.addMusicNote = function() {
    var note;
    note = {
      channel: 'music-player:play-music',
      event: this.noteGroup.sound.music
    };
    return note;
  };

  return SoundScriptModule;

})(ScriptModule);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/SoundScriptModule.js.map
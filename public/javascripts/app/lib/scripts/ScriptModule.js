require.register("lib/scripts/ScriptModule", function(exports, require, module) {
var CocoClass, ScriptModule,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

CocoClass = require('core/CocoClass');

module.exports = ScriptModule = (function(superClass) {
  var movementTime, scrubbingTime;

  extend(ScriptModule, superClass);

  scrubbingTime = 0;

  movementTime = 0;

  function ScriptModule(noteGroup) {
    var base;
    this.noteGroup = noteGroup;
    ScriptModule.__super__.constructor.call(this);
    if (!this.noteGroup.prepared) {
      this.analyzeNoteGroup(this.noteGroup);
      if ((base = this.noteGroup).notes == null) {
        base.notes = [];
      }
      this.noteGroup.prepared = true;
    }
  }

  ScriptModule.neededFor = function() {
    return false;
  };

  ScriptModule.prototype.startNotes = function() {
    return [];
  };

  ScriptModule.prototype.endNotes = function() {
    return [];
  };

  ScriptModule.prototype.skipNotes = function() {
    return this.endNotes();
  };

  ScriptModule.prototype.analyzeNoteGroup = function() {
    var ref, ref1;
    this.movementTime = this.calculateMovementMax(this.noteGroup);
    return this.scrubbingTime = ((ref = this.noteGroup.playback) != null ? (ref1 = ref.scrub) != null ? ref1.duration : void 0 : void 0) || 0;
  };

  ScriptModule.prototype.calculateMovementMax = function() {
    var i, k, len, name, ref, sprite, sums;
    sums = {};
    ref = this.noteGroup.sprites;
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (sprite.move == null) {
        continue;
      }
      if (sums[name = sprite.id] == null) {
        sums[name] = 0;
      }
      sums[sprite.id] += sprite.move.duration;
    }
    sums = (function() {
      var results;
      results = [];
      for (k in sums) {
        results.push(sums[k]);
      }
      return results;
    })();
    return Math.max.apply(Math, [0].concat(slice.call(sums)));
  };

  ScriptModule.prototype.maybeApplyDelayToNote = function(note) {
    return note.delay = (this.scrubbingTime + this.movementTime) || 0;
  };

  return ScriptModule;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/ScriptModule.js.map
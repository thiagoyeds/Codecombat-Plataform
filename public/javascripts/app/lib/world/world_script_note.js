require.register("lib/world/world_script_note", function(exports, require, module) {
var WorldScriptNote, clone, scriptMatchesEventPrereqs;

clone = require('./world_utils').clone;

scriptMatchesEventPrereqs = require('./script_event_prereqs').scriptMatchesEventPrereqs;

module.exports = WorldScriptNote = (function() {
  WorldScriptNote.className = 'WorldScriptNote';

  function WorldScriptNote(script, event, world) {
    this.event = event;
    if (script == null) {
      return;
    }
    this.invalid = true;
    if (!scriptMatchesEventPrereqs(script, this.event)) {
      return;
    }
    this.invalid = false;
    this.channel = script.channel;
    if (this.event == null) {
      this.event = {};
    }
    this.event.replacedNoteChain = script.noteChain;
  }

  WorldScriptNote.prototype.serialize = function() {
    var i, j, key, len, o, ref, subval, value;
    o = {
      channel: this.channel,
      event: {}
    };
    ref = this.event;
    for (key in ref) {
      value = ref[key];
      if (value != null ? value.isThang : void 0) {
        value = {
          isThang: true,
          id: value.id
        };
      } else if (_.isArray(value)) {
        for (i = j = 0, len = value.length; j < len; i = ++j) {
          subval = value[i];
          if (subval != null ? subval.isThang : void 0) {
            value[i] = {
              isThang: true,
              id: subval.id
            };
          }
        }
      }
      o.event[key] = value;
    }
    return o;
  };

  WorldScriptNote.deserialize = function(o, world, classMap) {
    var i, j, key, len, ref, scriptNote, subval, value;
    scriptNote = new WorldScriptNote;
    scriptNote.channel = o.channel;
    scriptNote.event = {};
    ref = o.event;
    for (key in ref) {
      value = ref[key];
      if ((value != null) && typeof value === 'object' && value.isThang) {
        value = world.getThangByID(value.id);
      } else if (_.isArray(value)) {
        for (i = j = 0, len = value.length; j < len; i = ++j) {
          subval = value[i];
          if ((subval != null) && typeof subval === 'object' && subval.isThang) {
            value[i] = world.getThangByID(subval.id);
          }
        }
      } else if ((value != null) && typeof value === 'object' && value.CN) {
        value = classMap[value.CN].deserialize(value, world, classMap);
      }
      scriptNote.event[key] = value;
    }
    return scriptNote;
  };

  return WorldScriptNote;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/world_script_note.js.map
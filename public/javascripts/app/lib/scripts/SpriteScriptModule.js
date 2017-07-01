require.register("lib/scripts/SpriteScriptModule", function(exports, require, module) {
var ScriptModule, SpritesScriptModule, me, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScriptModule = require('./ScriptModule');

me = require('core/auth').me;

utils = require('core/utils');

module.exports = SpritesScriptModule = (function(superClass) {
  extend(SpritesScriptModule, superClass);

  function SpritesScriptModule() {
    return SpritesScriptModule.__super__.constructor.apply(this, arguments);
  }

  SpritesScriptModule.neededFor = function(noteGroup) {
    var ref;
    return (ref = noteGroup.sprites) != null ? ref.length : void 0;
  };

  SpritesScriptModule.prototype.startNotes = function() {
    var i, j, len, len1, n, notes, ref, ref1, sprite;
    notes = [];
    this.moveSums = {};
    this.speakingSprites = {};
    ref = this.noteGroup.sprites || [];
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (sprite.move != null) {
        notes.push(this.spriteMoveNote(sprite));
      }
    }
    ref1 = this.noteGroup.sprites || [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      sprite = ref1[j];
      if (sprite.say != null) {
        notes.push(this.spriteSayNote(sprite, this.noteGroup.script));
      }
      if (sprite.select != null) {
        notes.push(this.spriteSelectNote(sprite));
      }
    }
    return (function() {
      var k, len2, results;
      results = [];
      for (k = 0, len2 = notes.length; k < len2; k++) {
        n = notes[k];
        if (n) {
          results.push(n);
        }
      }
      return results;
    })();
  };

  SpritesScriptModule.prototype.spriteMoveNote = function(sprite, instant) {
    var base, duration, name, note;
    if (instant == null) {
      instant = false;
    }
    duration = instant ? 0 : sprite.move.duration;
    note = {
      channel: 'sprite:move',
      event: {
        pos: sprite.move.target,
        duration: duration,
        spriteID: sprite.id
      }
    };
    if (duration) {
      if ((base = this.moveSums)[name = sprite.id] == null) {
        base[name] = 0;
      }
      note.delay = this.scrubbingTime + this.moveSums[sprite.id];
      this.moveSums[sprite.id] += sprite.move.duration;
    }
    return note;
  };

  SpritesScriptModule.prototype.spriteSayNote = function(sprite, script) {
    var blurb, i, len, note, ref, response, responses, sound, text;
    if (this.speakingSprites[sprite.id]) {
      return;
    }
    responses = sprite.say.responses;
    if (!(script.skippable || responses)) {
      responses = [];
    }
    ref = responses != null ? responses : [];
    for (i = 0, len = ref.length; i < len; i++) {
      response = ref[i];
      response.text = utils.i18n(response, 'text');
    }
    text = utils.i18n(sprite.say, 'text');
    blurb = utils.i18n(sprite.say, 'blurb');
    sound = utils.i18n(sprite.say, 'sound');
    note = {
      channel: 'level:sprite-dialogue',
      event: {
        message: text,
        blurb: blurb,
        mood: sprite.say.mood || 'explain',
        responses: responses,
        spriteID: sprite.id,
        sound: sound
      }
    };
    this.maybeApplyDelayToNote(note);
    return note;
  };

  SpritesScriptModule.prototype.spriteSelectNote = function(sprite) {
    var note;
    note = {
      channel: 'level:select-sprite',
      event: {
        thangID: sprite.select ? sprite.id : null
      }
    };
    return note;
  };

  SpritesScriptModule.prototype.endNotes = function() {
    var i, len, name, noteArray, notes, ref, sprite, spriteID, type;
    notes = {};
    ref = this.noteGroup.sprites || [];
    for (i = 0, len = ref.length; i < len; i++) {
      sprite = ref[i];
      if (notes[name = sprite.id] == null) {
        notes[name] = {};
      }
      if (sprite.move != null) {
        notes[sprite.id]['move'] = this.spriteMoveNote(sprite, true);
      }
      if (sprite.say != null) {
        notes[sprite.id]['say'] = {
          channel: 'level:sprite-clear-dialogue'
        };
      }
    }
    noteArray = [];
    for (spriteID in notes) {
      for (type in notes[spriteID]) {
        noteArray.push(notes[spriteID][type]);
      }
    }
    return noteArray;
  };

  return SpritesScriptModule;

})(ScriptModule);
});

;
//# sourceMappingURL=/javascripts/app/lib/scripts/SpriteScriptModule.js.map
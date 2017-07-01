require.register("models/LevelSession", function(exports, require, module) {
var CocoModel, LevelSession,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = LevelSession = (function(superClass) {
  extend(LevelSession, superClass);

  function LevelSession() {
    return LevelSession.__super__.constructor.apply(this, arguments);
  }

  LevelSession.className = 'LevelSession';

  LevelSession.schema = require('schemas/models/level_session');

  LevelSession.prototype.urlRoot = '/db/level.session';

  LevelSession.prototype.initialize = function() {
    LevelSession.__super__.initialize.call(this);
    return this.on('sync', (function(_this) {
      return function(e) {
        var state;
        state = _this.get('state') || {};
        if (state.scripts == null) {
          state.scripts = {};
        }
        return _this.set('state', state);
      };
    })(this));
  };

  LevelSession.prototype.updatePermissions = function() {
    var p, permissions;
    permissions = this.get('permissions', true);
    permissions = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = permissions.length; i < len; i++) {
        p = permissions[i];
        if (p.target !== 'public') {
          results.push(p);
        }
      }
      return results;
    })();
    return this.set('permissions', permissions);
  };

  LevelSession.prototype.getSourceFor = function(spellKey) {
    var code, parts, ref;
    code = this.get('code');
    parts = spellKey.split('/');
    return code != null ? (ref = code[parts[0]]) != null ? ref[parts[1]] : void 0 : void 0;
  };

  LevelSession.prototype.readyToRank = function() {
    var c1, c2, i, item, len, ref, s, spell, team, thang, thangSpellArr;
    if (!this.get('levelID')) {
      return false;
    }
    if (!(c1 = this.get('code'))) {
      return false;
    }
    if (!(team = this.get('team'))) {
      return false;
    }
    if (!(c2 = this.get('submittedCode'))) {
      return true;
    }
    thangSpellArr = (function() {
      var i, len, ref, results;
      ref = this.get('teamSpells')[team];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        results.push(s.split('/'));
      }
      return results;
    }).call(this);
    for (i = 0, len = thangSpellArr.length; i < len; i++) {
      item = thangSpellArr[i];
      thang = item[0];
      spell = item[1];
      if (c1[thang][spell] !== ((ref = c2[thang]) != null ? ref[spell] : void 0)) {
        return true;
      }
    }
    return false;
  };

  LevelSession.prototype.isMultiplayer = function() {
    return (this.get('submittedCodeLanguage') != null) && (this.get('team') != null);
  };

  LevelSession.prototype.completed = function() {
    var ref;
    return ((ref = this.get('state')) != null ? ref.complete : void 0) || this.get('submitted') || false;
  };

  LevelSession.prototype.shouldAvoidCorruptData = function(attrs) {
    var ref, ref1, ref2, ref3;
    if (me.team !== 'humans') {
      return false;
    }
    if (_.string.startsWith((ref = (ref1 = (ref2 = attrs != null ? attrs.code : void 0) != null ? ref2 : this.get('code')) != null ? (ref3 = ref1.anya) != null ? ref3.makeBid : void 0 : void 0) != null ? ref : '', 'var __interceptThis')) {
      noty({
        text: "Not saving session--it's trying to overwrite Anya's code with transpiled output. Please let us know and help us reproduce this bug!",
        layout: 'topCenter',
        type: 'error',
        killer: false,
        timeout: 120000
      });
      return true;
    }
    return false;
  };

  LevelSession.prototype.save = function(attrs, options) {
    if (this.shouldAvoidCorruptData(attrs)) {
      return;
    }
    return LevelSession.__super__.save.call(this, attrs, options);
  };

  LevelSession.prototype.increaseDifficulty = function(callback) {
    var ref, ref1, state;
    state = (ref = this.get('state')) != null ? ref : {};
    state.difficulty = ((ref1 = state.difficulty) != null ? ref1 : 0) + 1;
    delete state.lastUnsuccessfulSubmissionTime;
    this.set('state', state);
    this.trigger('change-difficulty');
    return this.save(null, {
      success: callback
    });
  };

  LevelSession.prototype.timeUntilResubmit = function() {
    var last, ref, state, wait;
    state = (ref = this.get('state')) != null ? ref : {};
    if (!(last = state.lastUnsuccessfulSubmissionTime)) {
      return 0;
    }
    if (_.isString(last)) {
      last = new Date(last);
    }
    wait = (last - new Date()) + 22 * 60 * 60 * 1000;
    if (wait > 24 * 60 * 60 * 1000) {
      wait = 24 * 60 * 60 * 1000;
      state.lastUnsuccessfulSubmissionTime = new Date();
      this.set('state', state);
    }
    return wait;
  };

  LevelSession.prototype.recordScores = function(scores, level) {
    var i, len, newScore, newTopScores, now, oldTopScore, oldTopScores, ref, ref1, ref2, scoreType, state;
    if (!scores) {
      return;
    }
    state = this.get('state');
    oldTopScores = (ref = state.topScores) != null ? ref : [];
    newTopScores = [];
    now = new Date();
    ref2 = (ref1 = level.get('scoreTypes')) != null ? ref1 : [];
    for (i = 0, len = ref2.length; i < len; i++) {
      scoreType = ref2[i];
      oldTopScore = _.find(oldTopScores, {
        type: scoreType
      });
      newScore = scores[scoreType];
      if (newScore == null) {
        newTopScores.push(oldTopScore);
        continue;
      }
      if (scoreType === 'time' || scoreType === 'damage-taken') {
        newScore *= -1;
      }
      if ((oldTopScore == null) || newScore > oldTopScore.score) {
        newTopScores.push({
          type: scoreType,
          date: now,
          score: newScore
        });
      } else {
        newTopScores.push(oldTopScore);
      }
    }
    state.topScores = newTopScores;
    return this.set('state', state);
  };

  LevelSession.prototype.generateSpellsObject = function(options) {
    var aetherOptions, createAetherOptions, e, error, level, ref, ref1, ref2, ref3, source, spellThang, spells;
    if (options == null) {
      options = {};
    }
    level = options.level;
    createAetherOptions = require('lib/aether_utils').createAetherOptions;
    aetherOptions = createAetherOptions({
      functionName: 'plan',
      codeLanguage: this.get('codeLanguage'),
      skipProtectAPI: (ref = options.level) != null ? ref.isType('game-dev') : void 0
    });
    spellThang = {
      thang: {
        id: 'Hero Placeholder'
      },
      aether: new Aether(aetherOptions)
    };
    spells = {
      "hero-placeholder/plan": {
        thang: spellThang,
        name: 'plan'
      }
    };
    source = (ref1 = (ref2 = this.get('code')) != null ? (ref3 = ref2['hero-placeholder']) != null ? ref3.plan : void 0 : void 0) != null ? ref1 : '';
    try {
      spellThang.aether.transpile(source);
    } catch (error) {
      e = error;
      console.log("Couldn't transpile!\n" + source + "\n", e);
      spellThang.aether.transpile('');
    }
    return spells;
  };

  LevelSession.prototype.isFake = function() {
    return this.id === 'A Fake Session ID';
  };

  return LevelSession;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/LevelSession.js.map
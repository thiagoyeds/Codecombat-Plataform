require.register("lib/LevelBus", function(exports, require, module) {
var Bus, LevelBus, LevelSession, me, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Bus = require('./Bus');

me = require('core/auth').me;

LevelSession = require('models/LevelSession');

utils = require('core/utils');

module.exports = LevelBus = (function(superClass) {
  extend(LevelBus, superClass);

  LevelBus.get = function(levelID, sessionID) {
    var docName;
    docName = "play/level/" + levelID + "/" + sessionID;
    return Bus.getFromCache(docName) || new LevelBus(docName);
  };

  LevelBus.prototype.subscriptions = {
    'tome:editing-began': 'onEditingBegan',
    'tome:editing-ended': 'onEditingEnded',
    'script:state-changed': 'onScriptStateChanged',
    'script:ended': 'onScriptEnded',
    'script:reset': 'onScriptReset',
    'surface:sprite-selected': 'onSpriteSelected',
    'level:show-victory': 'onVictory',
    'tome:spell-changed': 'onSpellChanged',
    'tome:spell-created': 'onSpellCreated',
    'tome:cast-spells': 'onCastSpells',
    'tome:winnability-updated': 'onWinnabilityUpdated',
    'application:idle-changed': 'onIdleChanged',
    'goal-manager:new-goal-states': 'onNewGoalStates',
    'god:new-world-created': 'onNewWorldCreated'
  };

  function LevelBus() {
    this.onChatAdded = bind(this.onChatAdded, this);
    this.onPlayerJoined = bind(this.onPlayerJoined, this);
    this.onMeSynced = bind(this.onMeSynced, this);
    this.incrementSessionPlaytime = bind(this.incrementSessionPlaytime, this);
    var maxWait, ref, ref1, saveDelay, wait;
    LevelBus.__super__.constructor.apply(this, arguments);
    this.changedSessionProperties = {};
    saveDelay = (ref = window.serverConfig) != null ? ref.sessionSaveDelay : void 0;
    ref1 = (function() {
      switch (false) {
        case !(!application.isProduction || !saveDelay):
          return [1, 5];
        case !me.isAnonymous():
          return [saveDelay.anonymous.min, saveDelay.anonymous.max];
        default:
          return [saveDelay.registered.min, saveDelay.registered.max];
      }
    })(), wait = ref1[0], maxWait = ref1[1];
    this.saveSession = _.debounce(this.reallySaveSession, wait * 1000, {
      maxWait: maxWait * 1000
    });
    this.playerIsIdle = false;
  }

  LevelBus.prototype.init = function() {
    var ref;
    LevelBus.__super__.init.call(this);
    return this.fireScriptsRef = (ref = this.fireRef) != null ? ref.child('scripts') : void 0;
  };

  LevelBus.prototype.setSession = function(session) {
    this.session = session;
    return this.timerIntervalID = setInterval(this.incrementSessionPlaytime, 1000);
  };

  LevelBus.prototype.onIdleChanged = function(e) {
    return this.playerIsIdle = e.idle;
  };

  LevelBus.prototype.incrementSessionPlaytime = function() {
    var ref;
    if (this.playerIsIdle) {
      return;
    }
    this.changedSessionProperties.playtime = true;
    return this.session.set('playtime', ((ref = this.session.get('playtime')) != null ? ref : 0) + 1);
  };

  LevelBus.prototype.onPoint = function() {
    return true;
  };

  LevelBus.prototype.onMeSynced = function() {
    return LevelBus.__super__.onMeSynced.call(this);
  };

  LevelBus.prototype.join = function() {
    return LevelBus.__super__.join.call(this);
  };

  LevelBus.prototype.disconnect = function() {
    var ref;
    if ((ref = this.fireScriptsRef) != null) {
      ref.off();
    }
    this.fireScriptsRef = null;
    return LevelBus.__super__.disconnect.call(this);
  };

  LevelBus.prototype.removeFirebaseData = function(callback) {
    if (!this.myConnection) {
      return typeof callback === "function" ? callback() : void 0;
    }
    this.myConnection.child('connected');
    this.fireRef.remove();
    return this.onDisconnect.cancel(function() {
      return typeof callback === "function" ? callback() : void 0;
    });
  };

  LevelBus.prototype.onEditingBegan = function() {};

  LevelBus.prototype.onEditingEnded = function() {};

  LevelBus.prototype.setSpells = function(spells) {
    var results, spell, spellKey;
    results = [];
    for (spellKey in spells) {
      spell = spells[spellKey];
      results.push(this.onSpellCreated({
        spell: spell
      }));
    }
    return results;
  };

  LevelBus.prototype.onSpellChanged = function(e) {
    var code, name, parts;
    if (!this.onPoint()) {
      return;
    }
    code = this.session.get('code');
    if (code == null) {
      code = {};
    }
    parts = e.spell.spellKey.split('/');
    if (code[name = parts[0]] == null) {
      code[name] = {};
    }
    code[parts[0]][parts[1]] = e.spell.getSource();
    this.changedSessionProperties.code = true;
    this.session.set({
      'code': code
    });
    return this.saveSession();
  };

  LevelBus.prototype.onSpellCreated = function(e) {
    var base, ref, spellTeam;
    if (!this.onPoint()) {
      return;
    }
    spellTeam = e.spell.team;
    if (this.teamSpellMap == null) {
      this.teamSpellMap = {};
    }
    if ((base = this.teamSpellMap)[spellTeam] == null) {
      base[spellTeam] = [];
    }
    if (ref = e.spell.spellKey, indexOf.call(this.teamSpellMap[spellTeam], ref) < 0) {
      this.teamSpellMap[spellTeam].push(e.spell.spellKey);
    }
    this.changedSessionProperties.teamSpells = true;
    this.session.set({
      'teamSpells': this.teamSpellMap
    });
    this.saveSession();
    if (spellTeam === me.team || (e.spell.otherSession && spellTeam !== e.spell.otherSession.get('team'))) {
      return this.onSpellChanged(e);
    }
  };

  LevelBus.prototype.onCastSpells = function(e) {
    if (!(this.onPoint() && e.realTime)) {
      return;
    }
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onWinnabilityUpdated = function(e) {
    var ref, ref1;
    if (!(this.onPoint() && e.winnable)) {
      return;
    }
    if ((ref = e.level.get('slug')) !== 'ace-of-coders' && ref !== 'elemental-wars' && ref !== 'the-battle-of-sky-span') {
      return;
    }
    if ((ref1 = this.session.get('state')) != null ? ref1.complete : void 0) {
      return;
    }
    return this.onVictory();
  };

  LevelBus.prototype.onNewWorldCreated = function(e) {
    var flag, flagHistory, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    flagHistory = (function() {
      var i, len, ref, results;
      ref = e.world.flagHistory;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        flag = ref[i];
        if (flag.source !== 'code') {
          results.push(flag);
        }
      }
      return results;
    })();
    if (_.isEqual(state.flagHistory, flagHistory)) {
      return;
    }
    state.flagHistory = flagHistory;
    this.changedSessionProperties.state = true;
    this.session.set('state', state);
    return this.saveSession();
  };

  LevelBus.prototype.onScriptStateChanged = function(e) {
    var ref, ref1, scripts, state;
    if (!this.onPoint()) {
      return;
    }
    if ((ref = this.fireScriptsRef) != null) {
      ref.update(e);
    }
    state = this.session.get('state');
    scripts = (ref1 = state.scripts) != null ? ref1 : {};
    scripts.currentScript = e.currentScript;
    scripts.currentScriptOffset = e.currentScriptOffset;
    this.changedSessionProperties.state = true;
    this.session.set('state', state);
    return this.saveSession();
  };

  LevelBus.prototype.onScriptEnded = function(e) {
    var index, ref, scripts, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    scripts = state.scripts;
    if (scripts.ended == null) {
      scripts.ended = {};
    }
    if (scripts.ended[e.scriptID] != null) {
      return;
    }
    index = _.keys(scripts.ended).length + 1;
    if ((ref = this.fireScriptsRef) != null) {
      ref.child('ended').child(e.scriptID).set(index);
    }
    scripts.ended[e.scriptID] = index;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onScriptReset = function() {
    var ref, state;
    if (!this.onPoint()) {
      return;
    }
    if ((ref = this.fireScriptsRef) != null) {
      ref.set({});
    }
    state = this.session.get('state');
    state.scripts = {};
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onSpriteSelected = function(e) {
    var ref, state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    state.selected = ((ref = e.thang) != null ? ref.id : void 0) || null;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.saveSession();
  };

  LevelBus.prototype.onVictory = function() {
    var state;
    if (!this.onPoint()) {
      return;
    }
    state = this.session.get('state');
    state.complete = true;
    this.session.set('state', state);
    this.changedSessionProperties.state = true;
    return this.reallySaveSession();
  };

  LevelBus.prototype.onNewGoalStates = function(e) {
    var changed, goalKey, goalState, goalStates, newGoalStates, oldGoalStates, ref, ref1, state;
    goalStates = e.goalStates;
    if (_.find(newGoalStates, function(gs) {
      return !gs.status;
    })) {
      return console.error("Somehow trying to save null goal states!", newGoalStates);
    }
    if (e.overallStatus !== 'success') {
      return;
    }
    newGoalStates = goalStates;
    state = this.session.get('state');
    oldGoalStates = state.goalStates || {};
    changed = false;
    for (goalKey in newGoalStates) {
      goalState = newGoalStates[goalKey];
      if (((ref = oldGoalStates[goalKey]) != null ? ref.status : void 0) === 'success' && goalState.status !== 'success') {
        continue;
      }
      if (utils.kindaEqual((ref1 = state.goalStates) != null ? ref1[goalKey] : void 0, goalState)) {
        continue;
      }
      changed = true;
      oldGoalStates[goalKey] = _.cloneDeep(newGoalStates[goalKey]);
    }
    if (changed) {
      state.goalStates = oldGoalStates;
      this.session.set('state', state);
      this.changedSessionProperties.state = true;
      return this.saveSession();
    }
  };

  LevelBus.prototype.onPlayerJoined = function(snapshot) {
    var player, players;
    LevelBus.__super__.onPlayerJoined.apply(this, arguments);
    if (!this.onPoint()) {
      return;
    }
    players = this.session.get('players');
    if (players == null) {
      players = {};
    }
    player = snapshot.val();
    if (players[player.id] != null) {
      return;
    }
    players[player.id] = {};
    this.session.set('players', players);
    this.changedSessionProperties.players = true;
    return this.saveSession();
  };

  LevelBus.prototype.onChatAdded = function(snapshot) {
    var chat, message;
    LevelBus.__super__.onChatAdded.apply(this, arguments);
    chat = this.session.get('chat');
    if (chat == null) {
      chat = [];
    }
    message = snapshot.val();
    if (message.system) {
      return;
    }
    chat.push(message);
    if (chat.length > 50) {
      chat = chat.slice(chat.length - 50);
    }
    this.session.set('chat', chat);
    this.changedSessionProperties.chat = true;
    return this.saveSession();
  };

  LevelBus.prototype.reallySaveSession = function() {
    var patch, prop, tempSession;
    if (_.isEmpty(this.changedSessionProperties)) {
      return;
    }
    if (this.session.get('creator') !== me.id) {
      return;
    }
    if (this.session.fake) {
      return;
    }
    Backbone.Mediator.publish('level:session-will-save', {
      session: this.session
    });
    patch = {};
    for (prop in this.changedSessionProperties) {
      patch[prop] = this.session.get(prop);
    }
    this.changedSessionProperties = {};
    tempSession = new LevelSession({
      _id: this.session.id
    });
    return tempSession.save(patch, {
      patch: true,
      type: 'PUT'
    });
  };

  LevelBus.prototype.destroy = function() {
    clearInterval(this.timerIntervalID);
    return LevelBus.__super__.destroy.call(this);
  };

  return LevelBus;

})(Bus);
});

;
//# sourceMappingURL=/javascripts/app/lib/LevelBus.js.map
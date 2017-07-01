require.register("lib/Bus", function(exports, require, module) {
var Bus, CHAT_SIZE_LIMIT, CocoClass, me,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

CHAT_SIZE_LIMIT = 500;

module.exports = Bus = Bus = (function(superClass) {
  extend(Bus, superClass);

  Bus.prototype.joined = null;

  Bus.prototype.players = null;

  Bus.get = function(docName) {
    return this.getFromCache || new Bus(docName);
  };

  Bus.getFromCache = function(docName) {
    return Bus.activeBuses[docName];
  };

  Bus.activeBuses = {};

  Bus.fireHost = 'https://codecombat.firebaseio.com';

  function Bus(docName1) {
    this.docName = docName1;
    this.onPlayerChanged = bind(this.onPlayerChanged, this);
    this.onPlayerLeft = bind(this.onPlayerLeft, this);
    this.onPlayerJoined = bind(this.onPlayerJoined, this);
    this.onChatAdded = bind(this.onChatAdded, this);
    this.onFireOpen = bind(this.onFireOpen, this);
    Bus.__super__.constructor.call(this);
    this.players = {};
    Bus.activeBuses[this.docName] = this;
  }

  Bus.prototype.subscriptions = {
    'auth:me-synced': 'onMeSynced'
  };

  Bus.prototype.connect = function() {
    Backbone.Mediator.publish('bus:connecting', {
      bus: this
    });
    Firebase.goOnline();
    this.fireRef = new Firebase(Bus.fireHost + '/' + this.docName);
    return this.fireRef.once('value', this.onFireOpen);
  };

  Bus.prototype.onFireOpen = function(snapshot) {
    if (this.destroyed) {
      console.log("Leaving '" + this.docName + "' because class has been destroyed.");
      return;
    }
    this.init();
    return Backbone.Mediator.publish('bus:connected', {
      bus: this
    });
  };

  Bus.prototype.disconnect = function() {
    var ref, ref1, ref2, ref3;
    if ((ref = this.fireRef) != null) {
      ref.off();
    }
    this.fireRef = null;
    if ((ref1 = this.fireChatRef) != null) {
      ref1.off();
    }
    this.fireChatRef = null;
    if ((ref2 = this.firePlayersRef) != null) {
      ref2.off();
    }
    this.firePlayersRef = null;
    if ((ref3 = this.myConnection) != null) {
      ref3.off();
    }
    this.myConnection = null;
    this.joined = false;
    return Backbone.Mediator.publish('bus:disconnected', {
      bus: this
    });
  };

  Bus.prototype.init = function() {
    "Init happens when we're connected.";
    this.fireChatRef = this.fireRef.child('chat');
    this.firePlayersRef = this.fireRef.child('players');
    this.join();
    this.listenForChanges();
    return this.sendMessage('/me joined.', true);
  };

  Bus.prototype.join = function() {
    this.joined = true;
    this.myConnection = this.firePlayersRef.child(me.id);
    this.myConnection.set({
      id: me.id,
      name: me.get('name'),
      connected: true
    });
    this.onDisconnect = this.myConnection.child('connected').onDisconnect();
    return this.onDisconnect.set(false);
  };

  Bus.prototype.listenForChanges = function() {
    this.fireChatRef.limit(CHAT_SIZE_LIMIT).on('child_added', this.onChatAdded);
    this.firePlayersRef.on('child_added', this.onPlayerJoined);
    this.firePlayersRef.on('child_removed', this.onPlayerLeft);
    return this.firePlayersRef.on('child_changed', this.onPlayerChanged);
  };

  Bus.prototype.onChatAdded = function(snapshot) {
    return Backbone.Mediator.publish('bus:new-message', {
      message: snapshot.val(),
      bus: this
    });
  };

  Bus.prototype.onPlayerJoined = function(snapshot) {
    var player;
    player = snapshot.val();
    if (!player.connected) {
      return;
    }
    this.players[player.id] = player;
    return Backbone.Mediator.publish('bus:player-joined', {
      player: player,
      bus: this
    });
  };

  Bus.prototype.onPlayerLeft = function(snapshot) {
    var player, val;
    val = snapshot.val();
    if (!val) {
      return;
    }
    player = this.players[val.id];
    if (!player) {
      return;
    }
    delete this.players[player.id];
    return Backbone.Mediator.publish('bus:player-left', {
      player: player,
      bus: this
    });
  };

  Bus.prototype.onPlayerChanged = function(snapshot) {
    var player, ref, wasConnected;
    player = snapshot.val();
    wasConnected = (ref = this.players[player.id]) != null ? ref.connected : void 0;
    this.players[player.id] = player;
    if (wasConnected && !player.connected) {
      this.onPlayerLeft(snapshot);
    }
    if (player.connected && !wasConnected) {
      this.onPlayerJoined(snapshot);
    }
    return Backbone.Mediator.publish('bus:player-states-changed', {
      states: this.players,
      bus: this
    });
  };

  Bus.prototype.onMeSynced = function() {
    var ref;
    return (ref = this.myConnection) != null ? ref.child('name').set(me.get('name')) : void 0;
  };

  Bus.prototype.countPlayers = function() {
    return _.size(this.players);
  };

  Bus.prototype.onPoint = function() {
    var ids;
    ids = _.keys(this.players);
    ids.sort();
    return ids[0] === me.id;
  };

  Bus.prototype.sendSystemMessage = function(content) {
    return this.sendMessage(content, true);
  };

  Bus.prototype.sendMessage = function(content, system) {
    var MAX_MESSAGE_LENGTH, message;
    if (system == null) {
      system = false;
    }
    MAX_MESSAGE_LENGTH = 400;
    message = {
      content: content.slice(0, MAX_MESSAGE_LENGTH),
      authorName: me.displayName(),
      authorID: me.id,
      dateMade: new Date()
    };
    if (system) {
      message.system = system;
    }
    return this.fireChatRef.push(message);
  };

  Bus.prototype.destroy = function() {
    if (this.joined) {
      this.sendMessage('/me left.', true);
    }
    if (this.docName in Bus.activeBuses) {
      delete Bus.activeBuses[this.docName];
    }
    this.disconnect();
    return Bus.__super__.destroy.call(this);
  };

  return Bus;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/Bus.js.map
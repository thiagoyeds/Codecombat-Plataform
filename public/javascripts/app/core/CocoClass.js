require.register("core/CocoClass", function(exports, require, module) {
var CocoClass, classCount, doNothing, makeScopeName, utils;

utils = require('./../core/utils');

classCount = 0;

makeScopeName = function() {
  return "class-scope-" + (classCount++);
};

doNothing = function() {};

module.exports = CocoClass = (function() {
  CocoClass.nicks = [];

  CocoClass.nicksUsed = {};

  CocoClass.remainingNicks = [];

  CocoClass.nextNick = function() {
    var baseNick, i, nick;
    if (!this.nicks.length) {
      return (this.name || 'CocoClass') + ' ' + classCount;
    }
    this.remainingNicks = this.remainingNicks.length ? this.remainingNicks : this.nicks.slice();
    baseNick = this.remainingNicks.splice(Math.floor(Math.random() * this.remainingNicks.length), 1)[0];
    i = 0;
    while (true) {
      nick = i ? baseNick + " " + i : baseNick;
      if (!this.nicksUsed[nick]) {
        break;
      }
      i++;
    }
    this.nicksUsed[nick] = true;
    return nick;
  };

  CocoClass.prototype.subscriptions = {};

  CocoClass.prototype.shortcuts = {};

  function CocoClass() {
    this.nick = this.constructor.nextNick();
    this.subscriptions = utils.combineAncestralObject(this, 'subscriptions');
    this.shortcuts = utils.combineAncestralObject(this, 'shortcuts');
    this.listenToSubscriptions();
    this.scope = makeScopeName();
    this.listenToShortcuts();
    if (typeof Backbone !== "undefined" && Backbone !== null) {
      _.extend(this, Backbone.Events);
    }
  }

  CocoClass.prototype.destroy = function() {
    var key;
    if (typeof this.stopListening === "function") {
      this.stopListening();
    }
    if (typeof this.off === "function") {
      this.off();
    }
    this.unsubscribeAll();
    this.stopListeningToShortcuts();
    this.constructor.nicksUsed[this.nick] = false;
    for (key in this) {
      this[key] = void 0;
    }
    this.destroyed = true;
    this.off = doNothing;
    return this.destroy = doNothing;
  };

  CocoClass.prototype.listenToSubscriptions = function() {
    var channel, func, ref, results;
    if ((typeof Backbone !== "undefined" && Backbone !== null ? Backbone.Mediator : void 0) == null) {
      return;
    }
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      func = utils.normalizeFunc(func, this);
      results.push(Backbone.Mediator.subscribe(channel, func, this));
    }
    return results;
  };

  CocoClass.prototype.addNewSubscription = function(channel, func) {
    if ((typeof Backbone !== "undefined" && Backbone !== null ? Backbone.Mediator : void 0) == null) {
      return;
    }
    if (this.destroyed) {
      return;
    }
    if (this.subscriptions[channel] !== void 0) {
      return;
    }
    func = utils.normalizeFunc(func, this);
    this.subscriptions[channel] = func;
    return Backbone.Mediator.subscribe(channel, func, this);
  };

  CocoClass.prototype.unsubscribeAll = function() {
    var channel, func, ref, results;
    if ((typeof Backbone !== "undefined" && Backbone !== null ? Backbone.Mediator : void 0) == null) {
      return;
    }
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      func = utils.normalizeFunc(func, this);
      results.push(Backbone.Mediator.unsubscribe(channel, func, this));
    }
    return results;
  };

  CocoClass.prototype.listenToShortcuts = function() {
    var func, ref, results, shortcut;
    if (typeof key === "undefined" || key === null) {
      return;
    }
    ref = this.shortcuts;
    results = [];
    for (shortcut in ref) {
      func = ref[shortcut];
      func = utils.normalizeFunc(func, this);
      results.push(key(shortcut, this.scope, _.bind(func, this)));
    }
    return results;
  };

  CocoClass.prototype.stopListeningToShortcuts = function() {
    if (typeof key === "undefined" || key === null) {
      return;
    }
    return key.deleteScope(this.scope);
  };

  CocoClass.prototype.playSound = function(trigger, volume) {
    if (volume == null) {
      volume = 1;
    }
    return Backbone.Mediator.publish('audio-player:play-sound', {
      trigger: trigger,
      volume: volume
    });
  };

  CocoClass.prototype.wait = function(event) {
    return new Promise((function(_this) {
      return function(resolve) {
        return _this.once(event, resolve);
      };
    })(this));
  };

  return CocoClass;

})();
});

;
//# sourceMappingURL=/javascripts/app/core/CocoClass.js.map
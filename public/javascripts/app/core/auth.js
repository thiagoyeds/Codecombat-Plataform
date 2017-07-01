require.register("core/auth", function(exports, require, module) {
var BEEN_HERE_BEFORE_KEY, User, backboneFailure, genericFailure, init, onSetVolume, parseServerError, ref, storage, trackFirstArrival;

ref = require('core/errors'), backboneFailure = ref.backboneFailure, genericFailure = ref.genericFailure, parseServerError = ref.parseServerError;

User = require('models/User');

storage = require('core/storage');

BEEN_HERE_BEFORE_KEY = 'beenHereBefore';

init = function() {
  module.exports.me = window.me = new User(window.userObject);
  module.exports.me.onLoaded();
  trackFirstArrival();
  if (me && (me.get('testGroupNumber') == null)) {
    me.set('testGroupNumber', Math.floor(Math.random() * 256));
    me.patch();
  }
  return Backbone.listenTo(me, 'sync', function() {
    return Backbone.Mediator.publish('auth:me-synced', {
      me: me
    });
  });
};

module.exports.logoutUser = function() {
  var callback, res;
  if (typeof FB !== "undefined" && FB !== null) {
    if (typeof FB.logout === "function") {
      FB.logout();
    }
  }
  callback = function() {
    var location;
    location = _.result(currentView, 'logoutRedirectURL');
    if (location) {
      return window.location = location;
    } else {
      return window.location.reload();
    }
  };
  res = $.post('/auth/logout', {}, callback);
  return res.fail(genericFailure);
};

module.exports.sendRecoveryEmail = function(email, options) {
  if (options == null) {
    options = {};
  }
  options = _.merge(options, {
    method: 'POST',
    url: '/auth/reset',
    data: {
      email: email
    }
  });
  return $.ajax(options);
};

onSetVolume = function(e) {
  if (e.volume === me.get('volume')) {
    return;
  }
  me.set('volume', e.volume);
  return me.save();
};

Backbone.Mediator.subscribe('level:set-volume', onSetVolume, module.exports);

trackFirstArrival = function() {
  var beenHereBefore, ref1;
  beenHereBefore = storage.load(BEEN_HERE_BEFORE_KEY);
  if (beenHereBefore) {
    return;
  }
  if ((ref1 = window.tracker) != null) {
    ref1.trackEvent('First Arrived');
  }
  return storage.save(BEEN_HERE_BEFORE_KEY, true);
};

init();
});

;
//# sourceMappingURL=/javascripts/app/core/auth.js.map
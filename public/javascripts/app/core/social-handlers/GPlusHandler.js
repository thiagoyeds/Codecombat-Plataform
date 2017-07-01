require.register("core/social-handlers/GPlusHandler", function(exports, require, module) {
var CocoClass, GPLUS_TOKEN_KEY, GPlusHandler, backboneFailure, clientID, fieldsToFetch, me, plusURL, revokeUrl, scope, storage, userPropsToSave,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

backboneFailure = require('core/errors').backboneFailure;

storage = require('core/storage');

GPLUS_TOKEN_KEY = 'gplusToken';

userPropsToSave = {
  'name.givenName': 'firstName',
  'name.familyName': 'lastName',
  'gender': 'gender',
  'id': 'gplusID'
};

fieldsToFetch = 'displayName,gender,image,name(familyName,givenName),id';

plusURL = '/plus/v1/people/me?fields=' + fieldsToFetch;

revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=';

clientID = '800329290710-j9sivplv2gpcdgkrsis9rff3o417mlfa.apps.googleusercontent.com';

scope = 'https://www.googleapis.com/auth/plus.login email';

module.exports = GPlusHandler = GPlusHandler = (function(superClass) {
  extend(GPlusHandler, superClass);

  function GPlusHandler() {
    this.accessToken = storage.load(GPLUS_TOKEN_KEY, false);
    GPlusHandler.__super__.constructor.call(this);
  }

  GPlusHandler.prototype.token = function() {
    var ref;
    return (ref = this.accessToken) != null ? ref.access_token : void 0;
  };

  GPlusHandler.prototype.startedLoading = false;

  GPlusHandler.prototype.apiLoaded = false;

  GPlusHandler.prototype.connected = false;

  GPlusHandler.prototype.person = null;

  GPlusHandler.prototype.fakeAPI = function() {
    window.gapi = {
      client: {
        load: function(api, version, cb) {
          return cb();
        },
        plus: {
          people: {
            get: function() {
              return {
                execute: function(cb) {
                  return cb({
                    name: {
                      givenName: 'Mr',
                      familyName: 'Bean'
                    },
                    id: 'abcd',
                    emails: [
                      {
                        value: 'some@email.com'
                      }
                    ]
                  });
                }
              };
            }
          }
        }
      },
      auth: {
        authorize: function(opts, cb) {
          return cb({
            access_token: '1234'
          });
        }
      }
    };
    this.startedLoading = true;
    return this.apiLoaded = true;
  };

  GPlusHandler.prototype.fakeConnect = function() {
    this.accessToken = {
      access_token: '1234'
    };
    return this.trigger('connect');
  };

  GPlusHandler.prototype.loadAPI = function(options) {
    var po, s;
    if (options == null) {
      options = {};
    }
    if (options.success == null) {
      options.success = _.noop;
    }
    if (options.context == null) {
      options.context = options;
    }
    if (this.apiLoaded) {
      options.success.bind(options.context)();
    } else {
      this.once('load-api', options.success, options.context);
    }
    if (!this.startedLoading) {
      po = document.createElement('script');
      po.type = 'text/javascript';
      po.async = true;
      po.src = 'https://apis.google.com/js/client:platform.js?onload=onGPlusLoaded';
      s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(po, s);
      this.startedLoading = true;
      return window.onGPlusLoaded = (function(_this) {
        return function() {
          var session_state;
          _this.apiLoaded = true;
          if (_this.accessToken && me.get('gplusID')) {
            gapi.auth.setToken('token', _this.accessToken);
            session_state = _this.accessToken.session_state;
            return gapi.auth.checkSessionState({
              client_id: clientID,
              session_state: session_state
            }, function(connected) {
              _this.connected = connected;
              return _this.trigger('load-api');
            });
          } else {
            _this.connected = false;
            return _this.trigger('load-api');
          }
        };
      })(this);
    }
  };

  GPlusHandler.prototype.connect = function(options) {
    var authOptions;
    if (options == null) {
      options = {};
    }
    if (options.success == null) {
      options.success = _.noop;
    }
    if (options.context == null) {
      options.context = options;
    }
    authOptions = {
      client_id: clientID,
      scope: 'https://www.googleapis.com/auth/plus.login email'
    };
    return gapi.auth.authorize(authOptions, (function(_this) {
      return function(e) {
        var d, error;
        if (!e.access_token) {
          return;
        }
        _this.connected = true;
        try {
          d = _.omit(e, 'g-oauth-window');
          storage.save(GPLUS_TOKEN_KEY, d, 0);
        } catch (error) {
          e = error;
          console.error('Unable to save G+ token key', e);
        }
        _this.accessToken = e;
        _this.trigger('connect');
        return options.success.bind(options.context)();
      };
    })(this));
  };

  GPlusHandler.prototype.loadPerson = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.success == null) {
      options.success = _.noop;
    }
    if (options.context == null) {
      options.context = options;
    }
    return gapi.client.load('plus', 'v1', (function(_this) {
      return function() {
        return gapi.client.plus.people.get({
          userId: 'me'
        }).execute(function(r) {
          var attrs, gpProp, i, key, keys, len, ref, userProp, value;
          attrs = {};
          for (gpProp in userPropsToSave) {
            userProp = userPropsToSave[gpProp];
            keys = gpProp.split('.');
            value = r;
            for (i = 0, len = keys.length; i < len; i++) {
              key = keys[i];
              value = value[key];
            }
            if (value) {
              attrs[userProp] = value;
            }
          }
          if ((ref = r.emails) != null ? ref.length : void 0) {
            attrs.email = r.emails[0].value;
          }
          _this.trigger('load-person', attrs);
          return options.success.bind(options.context)(attrs);
        });
      };
    })(this));
  };

  GPlusHandler.prototype.renderButtons = function() {
    var base;
    if ((typeof gapi !== "undefined" && gapi !== null ? gapi.plusone : void 0) == null) {
      return false;
    }
    return typeof (base = gapi.plusone).go === "function" ? base.go() : void 0;
  };

  GPlusHandler.prototype.loadFriends = function(friendsCallback) {
    var expiresIn, onReauthorized;
    if (!this.loggedIn) {
      return friendsCallback();
    }
    expiresIn = this.accessToken ? parseInt(this.accessToken.expires_at) - new Date().getTime() / 1000 : -1;
    onReauthorized = (function(_this) {
      return function() {
        return gapi.client.request({
          path: '/plus/v1/people/me/people/visible',
          callback: friendsCallback
        });
      };
    })(this);
    if (expiresIn < 0) {
      this.reauthorize();
      return this.listenToOnce(this, 'logged-in', onReauthorized);
    } else {
      return onReauthorized();
    }
  };

  GPlusHandler.prototype.reauthorize = function() {
    var params;
    params = {
      'client_id': clientID,
      'scope': scope
    };
    return gapi.auth.authorize(params, this.onGPlusLogin);
  };

  return GPlusHandler;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/core/social-handlers/GPlusHandler.js.map
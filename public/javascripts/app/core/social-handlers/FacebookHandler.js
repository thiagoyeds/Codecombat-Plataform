require.register("core/social-handlers/FacebookHandler", function(exports, require, module) {
var CocoClass, FacebookHandler, backboneFailure, me, storage, userPropsToSave,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

backboneFailure = require('core/errors').backboneFailure;

storage = require('core/storage');

userPropsToSave = {
  'first_name': 'firstName',
  'last_name': 'lastName',
  'gender': 'gender',
  'email': 'email',
  'id': 'facebookID'
};

module.exports = FacebookHandler = FacebookHandler = (function(superClass) {
  extend(FacebookHandler, superClass);

  function FacebookHandler() {
    return FacebookHandler.__super__.constructor.apply(this, arguments);
  }

  FacebookHandler.prototype.token = function() {
    var ref1;
    return (ref1 = this.authResponse) != null ? ref1.accessToken : void 0;
  };

  FacebookHandler.prototype.startedLoading = false;

  FacebookHandler.prototype.apiLoaded = false;

  FacebookHandler.prototype.connected = false;

  FacebookHandler.prototype.person = null;

  FacebookHandler.prototype.fakeAPI = function() {
    window.FB = {
      login: function(cb, options) {
        return cb({
          status: 'connected',
          authResponse: {
            accessToken: '1234'
          }
        });
      },
      api: function(url, options, cb) {
        return cb({
          first_name: 'Mr',
          last_name: 'Bean',
          id: 'abcd',
          email: 'some@email.com'
        });
      }
    };
    this.startedLoading = true;
    return this.apiLoaded = true;
  };

  FacebookHandler.prototype.loadAPI = function(options) {
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
      this.startedLoading = true;
      (function(d) {
        var id, js, ref;
        js = void 0;
        id = 'facebook-jssdk';
        ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        ref.parentNode.insertBefore(js, ref);
      })(document);
      return window.fbAsyncInit = (function(_this) {
        return function() {
          FB.init({
            appId: (document.location.origin === 'http://localhost:3000' ? '607435142676437' : '148832601965463'),
            channelUrl: document.location.origin + '/channel.html',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
          });
          return FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              _this.connected = true;
              _this.authResponse = response.authResponse;
              _this.trigger('connect', {
                response: response
              });
            }
            _this.apiLoaded = true;
            return _this.trigger('load-api');
          });
        };
      })(this);
    }
  };

  FacebookHandler.prototype.connect = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.success == null) {
      options.success = _.noop;
    }
    if (options.context == null) {
      options.context = options;
    }
    return FB.login(((function(_this) {
      return function(response) {
        if (response.status === 'connected') {
          _this.connected = true;
          _this.authResponse = response.authResponse;
          _this.trigger('connect', {
            response: response
          });
          return options.success.bind(options.context)();
        }
      };
    })(this)), {
      scope: 'email'
    });
  };

  FacebookHandler.prototype.loadPerson = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.success == null) {
      options.success = _.noop;
    }
    if (options.context == null) {
      options.context = options;
    }
    return FB.api('/me', {
      fields: 'email,last_name,first_name,gender'
    }, (function(_this) {
      return function(person) {
        var attrs, fbProp, userProp, value;
        attrs = {};
        for (fbProp in userPropsToSave) {
          userProp = userPropsToSave[fbProp];
          value = person[fbProp];
          if (value) {
            attrs[userProp] = value;
          }
        }
        _this.trigger('load-person', attrs);
        return options.success.bind(options.context)(attrs);
      };
    })(this));
  };

  FacebookHandler.prototype.renderButtons = function() {
    var ref1;
    if (typeof FB !== "undefined" && FB !== null ? (ref1 = FB.XFBML) != null ? ref1.parse : void 0 : void 0) {
      return setTimeout(FB.XFBML.parse, 10);
    }
  };

  return FacebookHandler;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/core/social-handlers/FacebookHandler.js.map
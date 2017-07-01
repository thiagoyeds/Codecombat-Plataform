require.register("core/initialize", function(exports, require, module) {
var app, channelSchemas, definitionSchemas, handleNormalUrls, init, loadOfflineFonts, seen, serializeForIOS, setUpBackboneMediator, setUpIOSLogging, setUpMoment, setupConsoleLogging, utils, watchForErrors,
  slice = [].slice,
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Backbone.Mediator.setValidationEnabled(false);

app = null;

utils = require('./utils');

channelSchemas = {
  'auth': require('schemas/subscriptions/auth'),
  'bus': require('schemas/subscriptions/bus'),
  'editor': require('schemas/subscriptions/editor'),
  'errors': require('schemas/subscriptions/errors'),
  'ipad': require('schemas/subscriptions/ipad'),
  'misc': require('schemas/subscriptions/misc'),
  'play': require('schemas/subscriptions/play'),
  'surface': require('schemas/subscriptions/surface'),
  'tome': require('schemas/subscriptions/tome'),
  'god': require('schemas/subscriptions/god'),
  'scripts': require('schemas/subscriptions/scripts'),
  'web-dev': require('schemas/subscriptions/web-dev'),
  'world': require('schemas/subscriptions/world')
};

definitionSchemas = {
  'bus': require('schemas/definitions/bus'),
  'misc': require('schemas/definitions/misc')
};

init = function() {
  var options, path;
  if (app) {
    return;
  }
  if (!window.userObject._id) {
    options = {
      cache: false
    };
    options.data = _.pick(utils.getQueryVariables(), 'preferredLanguage');
    $.ajax('/auth/whoami', options).then(function(res) {
      window.userObject = res;
      return init();
    });
    return;
  }
  app = require('core/application');
  setupConsoleLogging();
  watchForErrors();
  setUpIOSLogging();
  path = document.location.pathname;
  app.testing = _.string.startsWith(path, '/test');
  app.demoing = _.string.startsWith(path, '/demo');
  setUpBackboneMediator();
  app.initialize();
  if (!app.isProduction()) {
    loadOfflineFonts();
  }
  Backbone.history.start({
    pushState: true
  });
  handleNormalUrls();
  return setUpMoment();
};

module.exports.init = init;

handleNormalUrls = function() {
  return $(document).on('click', "a[href^='/']", function(event) {
    var href, passThrough, url;
    href = $(event.currentTarget).attr('href');
    passThrough = href.indexOf('sign_out') >= 0;
    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      url = href.replace(/^\//, '').replace('\#\!\/', '');
      app.router.navigate(url, {
        trigger: true
      });
      return false;
    }
  });
};

setUpBackboneMediator = function() {
  var channel, definition, originalPublish, schemas;
  for (definition in definitionSchemas) {
    schemas = definitionSchemas[definition];
    Backbone.Mediator.addDefSchemas(schemas);
  }
  for (channel in channelSchemas) {
    schemas = channelSchemas[channel];
    Backbone.Mediator.addChannelSchemas(schemas);
  }
  Backbone.Mediator.setValidationEnabled(document.location.href.search(/codecombat.com/) === -1);
  if (false) {
    originalPublish = Backbone.Mediator.publish;
    return Backbone.Mediator.publish = function() {
      if (!/(tick|frame-changed)/.test(arguments[0])) {
        console.log.apply(console, ['Publishing event:'].concat(slice.call(arguments)));
      }
      return originalPublish.apply(Backbone.Mediator, arguments);
    };
  }
};

setUpMoment = function() {
  var me;
  me = require('core/auth').me;
  moment.lang(me.get('preferredLanguage', true), {});
  return me.on('change:preferredLanguage', function(me) {
    return moment.lang(me.get('preferredLanguage', true), {});
  });
};

setupConsoleLogging = function() {
  if (typeof console === "undefined" || console === null) {
    window.console = {
      info: function() {},
      log: function() {},
      error: function() {},
      debug: function() {}
    };
  }
  if (!console.debug) {
    return console.debug = console.log;
  }
};

watchForErrors = function() {
  var currentErrors, oldOnError;
  currentErrors = 0;
  oldOnError = window.onerror;
  return window.onerror = function(msg, url, line, col, error) {
    var message;
    if (oldOnError) {
      oldOnError.apply(window, arguments);
    }
    if (currentErrors >= 3) {
      return;
    }
    if (!(me.isAdmin() || document.location.href.search(/codecombat.com/) === -1 || document.location.href.search(/\/editor\//) !== -1)) {
      return;
    }
    ++currentErrors;
    message = "Error: " + msg + "<br>Check the JS console for more.";
    if (!(typeof webkit !== "undefined" && webkit !== null ? webkit.messageHandlers : void 0)) {
      noty({
        text: message,
        layout: 'topCenter',
        type: 'error',
        killer: false,
        timeout: 5000,
        dismissQueue: true,
        maxVisible: 3,
        callback: {
          onClose: function() {
            return --currentErrors;
          }
        }
      });
    }
    return Backbone.Mediator.publish('application:error', {
      message: "Line " + line + " of " + url + ":\n" + msg
    });
  };
};

window.addIPadSubscription = function(channel) {
  return window.iPadSubscriptions[channel] = true;
};

window.removeIPadSubscription = function(channel) {
  return window.iPadSubscriptions[channel] = false;
};

setUpIOSLogging = function() {
  var i, len, level, ref, results;
  if (!(typeof webkit !== "undefined" && webkit !== null ? webkit.messageHandlers : void 0)) {
    return;
  }
  ref = ['debug', 'log', 'info', 'warn', 'error'];
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    level = ref[i];
    results.push((function(level) {
      var originalLog;
      originalLog = console[level];
      return console[level] = function() {
        var a, e, error1, ref1, ref2, ref3, ref4;
        originalLog.apply(console, arguments);
        try {
          return typeof webkit !== "undefined" && webkit !== null ? (ref1 = webkit.messageHandlers) != null ? (ref2 = ref1.consoleLogHandler) != null ? ref2.postMessage({
            level: level,
            "arguments": (function() {
              var j, len1, ref3, results1;
              results1 = [];
              for (j = 0, len1 = arguments.length; j < len1; j++) {
                a = arguments[j];
                results1.push((ref3 = a != null ? typeof a.toString === "function" ? a.toString() : void 0 : void 0) != null ? ref3 : '' + a);
              }
              return results1;
            }).apply(this, arguments)
          }) : void 0 : void 0 : void 0;
        } catch (error1) {
          e = error1;
          return typeof webkit !== "undefined" && webkit !== null ? (ref3 = webkit.messageHandlers) != null ? (ref4 = ref3.consoleLogHandler) != null ? ref4.postMessage({
            level: level,
            "arguments": ['could not post log: ' + e]
          }) : void 0 : void 0 : void 0;
        }
      };
    })(level));
  }
  return results;
};

loadOfflineFonts = function() {
  $('head').prepend('<link rel="stylesheet" type="text/css" href="/fonts/openSansCondensed.css">');
  return $('head').prepend('<link rel="stylesheet" type="text/css" href="/fonts/openSans.css">');
};

seen = null;

window.serializeForIOS = serializeForIOS = function(obj, depth) {
  var child, clone, key, keysHandled, root, value;
  if (depth == null) {
    depth = 3;
  }
  if (!depth) {
    return {};
  }
  root = seen == null;
  if (seen == null) {
    seen = [];
  }
  clone = {};
  keysHandled = 0;
  for (key in obj) {
    if (!hasProp.call(obj, key)) continue;
    value = obj[key];
    if (++keysHandled > 50) {
      continue;
    }
    if (!value) {
      clone[key] = value;
    } else if (value === window || value.firstElementChild || value.preventDefault) {
      null;
    } else if (indexOf.call(seen, value) >= 0) {
      null;
    } else if (_.isArray(value)) {
      clone[key] = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = value.length; i < len; i++) {
          child = value[i];
          results.push(serializeForIOS(child, depth - 1));
        }
        return results;
      })();
      seen.push(value);
    } else if (_.isObject(value)) {
      if (value.id && value.attributes) {
        value = value.attributes;
      }
      clone[key] = serializeForIOS(value, depth - 1);
      seen.push(value);
    } else {
      clone[key] = value;
    }
  }
  if (root) {
    seen = null;
  }
  return clone;
};

window.onbeforeunload = function(e) {
  var leavingMessage;
  leavingMessage = _.result(window.currentView, 'onLeaveMessage');
  if (leavingMessage) {
    return leavingMessage;
  } else {

  }
};

$(function() {
  return init();
});
});

;
//# sourceMappingURL=/javascripts/app/core/initialize.js.map
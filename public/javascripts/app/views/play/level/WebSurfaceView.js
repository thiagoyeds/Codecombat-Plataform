require.register("templates/play/level/web-surface-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),fullUnsafeContentHostname = locals_.fullUnsafeContentHostname;buf.push("<iframe" + (jade.attrs({ 'src':("//" + fullUnsafeContentHostname + "/web-dev-iframe.html") }, {"src":true})) + "></iframe>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/level/WebSurfaceView", function(exports, require, module) {
var CocoView, HtmlExtractor, WebSurfaceView, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/web-surface-view');

HtmlExtractor = require('lib/HtmlExtractor');

module.exports = WebSurfaceView = (function(superClass) {
  extend(WebSurfaceView, superClass);

  function WebSurfaceView() {
    this.onIframeMessage = bind(this.onIframeMessage, this);
    return WebSurfaceView.__super__.constructor.apply(this, arguments);
  }

  WebSurfaceView.prototype.id = 'web-surface-view';

  WebSurfaceView.prototype.template = template;

  WebSurfaceView.prototype.subscriptions = {
    'tome:html-updated': 'onHTMLUpdated',
    'web-dev:hover-line': 'onHoverLine',
    'web-dev:stop-hovering-line': 'onStopHoveringLine'
  };

  WebSurfaceView.prototype.initialize = function(options) {
    var goal;
    this.goals = (function() {
      var i, len, ref, ref1, ref2, results;
      ref2 = (ref = (ref1 = options.goalManager) != null ? ref1.goals : void 0) != null ? ref : [];
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        goal = ref2[i];
        if (goal.html) {
          results.push(goal);
        }
      }
      return results;
    })();
    return WebSurfaceView.__super__.initialize.call(this, options);
  };

  WebSurfaceView.prototype.getRenderData = function() {
    return _.merge(WebSurfaceView.__super__.getRenderData.call(this), {
      fullUnsafeContentHostname: serverConfig.fullUnsafeContentHostname
    });
  };

  WebSurfaceView.prototype.afterRender = function() {
    WebSurfaceView.__super__.afterRender.call(this);
    this.iframe = this.$('iframe')[0];
    return $(this.iframe).on('load', (function(_this) {
      return function(e) {
        window.addEventListener('message', _this.onIframeMessage);
        _this.iframeLoaded = true;
        if (typeof _this.onIframeLoaded === "function") {
          _this.onIframeLoaded();
        }
        return _this.onIframeLoaded = null;
      };
    })(this));
  };

  WebSurfaceView.prototype.onHTMLUpdated = function(e) {
    var messageType, ref, scripts, styles;
    if (!this.iframeLoaded) {
      return this.onIframeLoaded = (function(_this) {
        return function() {
          if (!_this.destroyed) {
            return _this.onHTMLUpdated(e);
          }
        };
      })(this);
    }
    ref = HtmlExtractor.extractStylesAndScripts(e.html), this.virtualDom = ref.virtualDom, styles = ref.styles, scripts = ref.scripts;
    this.cssSelectors = HtmlExtractor.extractCssSelectors(styles, scripts);
    this.rawCssLines = HtmlExtractor.extractCssLines(styles);
    this.rawJQueryLines = HtmlExtractor.extractJQueryLines(scripts);
    messageType = e.create || !this.virtualDom ? 'create' : 'update';
    return this.iframe.contentWindow.postMessage({
      type: messageType,
      dom: this.virtualDom,
      styles: styles,
      scripts: scripts,
      goals: this.goals
    }, '*');
  };

  WebSurfaceView.prototype.combineNodes = function(type, nodes) {
    var children;
    if (_.any(nodes, function(node) {
      return node.type !== type;
    })) {
      throw new Error("Can't combine nodes of different types. (Got " + (nodes.map(function(n) {
        return n.type;
      })) + ")");
    }
    children = nodes.map(function(n) {
      return n.children;
    }).reduce((function(a, b) {
      return a.concat(b);
    }), []);
    if (_.isEmpty(children)) {
      return deku.element(type, {});
    } else {
      return deku.element(type, {}, children);
    }
  };

  WebSurfaceView.prototype.onStopHoveringLine = function() {
    return this.iframe.contentWindow.postMessage({
      type: 'highlight-css-selector',
      selector: ''
    }, '*');
  };

  WebSurfaceView.prototype.onHoverLine = function(arg) {
    var hoveredCssSelector, line, ref, ref1, row, trimLine;
    row = arg.row, line = arg.line;
    if (_.contains(this.rawCssLines, line)) {
      trimLine = (((ref = line.match(/\s(.*)\s*{/)) != null ? ref[1] : void 0) || line).trim().split(/ +/).join(' ');
      hoveredCssSelector = _.find(this.cssSelectors, function(selector) {
        return trimLine === selector;
      });
    } else if (_.contains(this.rawJQueryLines, line)) {
      trimLine = (((ref1 = line.match(/\$\(\s*['"](.*)['"]\s*\)/)) != null ? ref1[1] : void 0) || '').trim();
      hoveredCssSelector = _.find(this.cssSelectors, function(selector) {
        return trimLine === selector;
      });
    } else {
      hoveredCssSelector = '';
    }
    this.iframe.contentWindow.postMessage({
      type: 'highlight-css-selector',
      selector: hoveredCssSelector
    }, '*');
    return null;
  };

  WebSurfaceView.prototype.onIframeMessage = function(event) {
    var origin;
    origin = event.origin || event.originalEvent.origin;
    if (!new RegExp("^https?:\/\/" + serverConfig.fullUnsafeContentHostname + "$").test(origin)) {
      return console.log('Ignoring message from bad origin:', origin);
    }
    if (event.source !== this.iframe.contentWindow) {
      return console.log('Ignoring message from somewhere other than our iframe:', event.source);
    }
    switch (event.data.type) {
      case 'goals-updated':
        return Backbone.Mediator.publish('god:new-html-goal-states', {
          goalStates: event.data.goalStates,
          overallStatus: event.data.overallStatus
        });
      case 'error':
        return Backbone.Mediator.publish('web-dev:error', _.pick(event.data, ['message', 'line', 'column', 'url']));
      default:
        return console.warn('Unknown message type', event.data.type, 'for message', event, 'from origin', origin);
    }
  };

  WebSurfaceView.prototype.destroy = function() {
    window.removeEventListener('message', this.onIframeMessage);
    return WebSurfaceView.__super__.destroy.call(this);
  };

  return WebSurfaceView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/WebSurfaceView.js.map
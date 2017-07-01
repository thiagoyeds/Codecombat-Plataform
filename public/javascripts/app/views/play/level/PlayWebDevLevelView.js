require.register("templates/play/level/play-web-dev-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div id=\"web-surface-view\"></div><div id=\"info-bar\" class=\"style-flat\">");
if ( !view.supermodel.finished())
{
buf.push("<h1 data-i18n=\"common.loading\"></h1>");
}
else
{
buf.push("<h1><span data-i18n=\"game_dev.creator\"></span><span>" + (jade.escape(null == (jade.interp = ': ') ? "" : jade.interp)) + "</span>" + (jade.escape((jade.interp = view.session.get('creatorName')) == null ? '' : jade.interp)) + "</h1>");
}
buf.push("</div>");;return buf.join("");
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

;require.register("views/play/level/PlayWebDevLevelView", function(exports, require, module) {
var Level, LevelSession, PlayWebDevLevelView, RootView, WebSurfaceView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

WebSurfaceView = require('./WebSurfaceView');

require('game-libraries');

module.exports = PlayWebDevLevelView = (function(superClass) {
  extend(PlayWebDevLevelView, superClass);

  function PlayWebDevLevelView() {
    return PlayWebDevLevelView.__super__.constructor.apply(this, arguments);
  }

  PlayWebDevLevelView.prototype.id = 'play-web-dev-level-view';

  PlayWebDevLevelView.prototype.template = require('templates/play/level/play-web-dev-level-view');

  PlayWebDevLevelView.prototype.initialize = function(options, levelID, sessionID) {
    this.options = options;
    this.levelID = levelID;
    this.sessionID = sessionID;
    this.courseID = this.getQueryVariable('course');
    this.level = this.supermodel.loadModel(new Level({
      _id: this.levelID
    })).model;
    return this.session = this.supermodel.loadModel(new LevelSession({
      _id: this.sessionID
    })).model;
  };

  PlayWebDevLevelView.prototype.onLoaded = function() {
    var ref, ref1;
    PlayWebDevLevelView.__super__.onLoaded.call(this);
    this.insertSubView(this.webSurface = new WebSurfaceView({
      level: this.level
    }));
    Backbone.Mediator.publish('tome:html-updated', {
      html: (ref = this.getHTML()) != null ? ref : '<h1>Player has no HTML</h1>',
      create: true
    });
    this.$el.find('#info-bar').delay(4000).fadeOut(2000);
    $('body').css('overflow', 'hidden');
    this.eventProperties = {
      category: 'Play WebDev Level',
      courseID: this.courseID,
      sessionID: this.session.id,
      levelID: this.level.id,
      levelSlug: this.level.get('slug')
    };
    return (ref1 = window.tracker) != null ? ref1.trackEvent('Play WebDev Level - Load', this.eventProperties) : void 0;
  };

  PlayWebDevLevelView.prototype.showError = function(jqxhr) {
    return $('h1').text(jqxhr.statusText);
  };

  PlayWebDevLevelView.prototype.getHTML = function() {
    var hero, playerHTML, programmableConfig, ref, ref1;
    playerHTML = (ref = this.session.get('code')) != null ? (ref1 = ref['hero-placeholder']) != null ? ref1.plan : void 0 : void 0;
    if (!(hero = _.find(this.level.get('thangs'), {
      id: 'Hero Placeholder'
    }))) {
      return playerHTML;
    }
    if (!(programmableConfig = _.find(hero.components, function(component) {
      var ref2;
      return (ref2 = component.config) != null ? ref2.programmableMethods : void 0;
    }).config)) {
      return playerHTML;
    }
    return programmableConfig.programmableMethods.plan.languages.html.replace(/<playercode>[\s\S]*<\/playercode>/, playerHTML);
  };

  PlayWebDevLevelView.prototype.destroy = function() {
    var ref;
    if ((ref = this.webSurface) != null) {
      ref.destroy();
    }
    $('body').css('overflow', 'initial');
    return PlayWebDevLevelView.__super__.destroy.call(this);
  };

  return PlayWebDevLevelView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/PlayWebDevLevelView.js.map
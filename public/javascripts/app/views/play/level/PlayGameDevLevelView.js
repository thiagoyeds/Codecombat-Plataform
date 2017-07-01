require.register("templates/play/level/play-game-dev-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;var ready = !(view.state.get('errorMessage') || view.state.get('loading'))
buf.push("<div class=\"container-fluid style-flat\"><div id=\"game-row\" class=\"row\"><div class=\"col-xs-9\"><div id=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas></div></div><div id=\"info-col\" class=\"col-xs-3\"><div class=\"panel panel-default\"><div class=\"panel-body text-center\">");
if ( view.state.get('errorMessage'))
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = view.state.get('errorMessage')) ? "" : jade.interp)) + "</div>");
}
if ( view.level.id && view.session.id)
{
buf.push("<h3 class=\"m-y-1\">" + (jade.escape(null == (jade.interp = view.level.get('name')) ? "" : jade.interp)) + "</h3><h4>" + (jade.escape(null == (jade.interp = view.state.get('creatorString')) ? "" : jade.interp)) + "</h4><hr/>");
}
if ( view.state.get('loading'))
{
buf.push("<h1 data-i18n=\"common.loading\" class=\"m-y-1\"></h1><div class=\"progress\"><div" + (jade.attrs({ 'style':("width: " + (view.state.get('progress')) + ""), "class": [('progress-bar')] }, {"style":true})) + "></div></div>");
}
if ( ready)
{
buf.push("<h3><span data-i18n=\"play_level.directions\"></span>:</h3><p>" + (null == (jade.interp = view.howToPlayText) ? "" : jade.interp) + "</p><hr/>");
}
buf.push("</div>");
if ( ready)
{
buf.push("<div class=\"panel-footer\">");
var playing = view.state.get('playing')
if ( playing)
{
buf.push("<button id=\"play-btn\" data-i18n=\"play_game_dev_level.restart\" class=\"btn btn-lg btn-burgandy btn-block\"></button>");
}
else
{
buf.push("<button id=\"play-btn\" data-i18n=\"play_game_dev_level.play\" class=\"btn btn-lg btn-forest btn-block\"></button>");
}
if ( view.state.get('isOwner'))
{
buf.push("<br/><button id=\"edit-level-btn\" data-i18n=\"play_level.edit_level\" class=\"btn btn-lg btn-warning btn-block\"></button>");
}
buf.push("</div>");
}
buf.push("</div></div></div><div id=\"share-row\" class=\"m-t-3\">");
if ( ready)
{
buf.push("<div class=\"panel panel-default\"><div id=\"share-panel-body\" class=\"panel-body\"><div id=\"share-text-div\" class=\"text-right\"><b data-i18n=\"sharing.share_game\"></b></div><input" + (jade.attrs({ 'id':('copy-url-input'), 'value':(view.state.get('shareURL')), "class": [('text-h4'),('semibold'),('form-control'),('input-lg')] }, {"value":true})) + "/><div id=\"copy-url-div\"><button id=\"copy-url-btn\" class=\"btn btn-lg btn-navy-alt\"><span data-i18n=\"sharing.copy_url\"></span></button></div></div>");
if ( !view.state.get('isOwner'))
{
buf.push("<div class=\"panel-body\"><a id=\"play-more-codecombat-btn\" href=\"/\" data-i18n=\"play_game_dev_level.play_more_codecombat\" class=\"btn btn-lg btn-navy-alt pull-right\"></a></div>");
}
buf.push("</div>");
}
buf.push("</div></div>");;return buf.join("");
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

;require.register("views/play/level/PlayGameDevLevelView", function(exports, require, module) {
var Course, GameDevVictoryModal, GameUIState, GoalManager, God, Level, LevelLoader, LevelSession, PlayGameDevLevelView, RootView, ScriptManager, State, Surface, TEAM, ThangType, urls, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

GameUIState = require('models/GameUIState');

God = require('lib/God');

LevelLoader = require('lib/LevelLoader');

GoalManager = require('lib/world/GoalManager');

ScriptManager = require('lib/scripts/ScriptManager');

Surface = require('lib/surface/Surface');

ThangType = require('models/ThangType');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

State = require('models/State');

utils = require('core/utils');

urls = require('core/urls');

Course = require('models/Course');

GameDevVictoryModal = require('./modal/GameDevVictoryModal');

require('game-libraries');

TEAM = 'humans';

module.exports = PlayGameDevLevelView = (function(superClass) {
  extend(PlayGameDevLevelView, superClass);

  function PlayGameDevLevelView() {
    return PlayGameDevLevelView.__super__.constructor.apply(this, arguments);
  }

  PlayGameDevLevelView.prototype.id = 'play-game-dev-level-view';

  PlayGameDevLevelView.prototype.template = require('templates/play/level/play-game-dev-level-view');

  PlayGameDevLevelView.prototype.subscriptions = {
    'god:new-world-created': 'onNewWorld'
  };

  PlayGameDevLevelView.prototype.events = {
    'click #edit-level-btn': 'onEditLevelButton',
    'click #play-btn': 'onClickPlayButton',
    'click #copy-url-btn': 'onClickCopyURLButton',
    'click #play-more-codecombat-btn': 'onClickPlayMoreCodeCombatButton'
  };

  PlayGameDevLevelView.prototype.initialize = function(options, levelID, sessionID) {
    this.options = options;
    this.levelID = levelID;
    this.sessionID = sessionID;
    this.state = new State({
      loading: true,
      progress: 0,
      creatorString: '',
      isOwner: false
    });
    this.supermodel.on('update-progress', (function(_this) {
      return function(progress) {
        return _this.state.set({
          progress: (progress * 100).toFixed(1) + '%'
        });
      };
    })(this));
    this.level = new Level();
    this.session = new LevelSession();
    this.gameUIState = new GameUIState();
    this.courseID = this.getQueryVariable('course');
    this.god = new God({
      gameUIState: this.gameUIState,
      indefiniteLength: true
    });
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      sessionID: this.sessionID,
      observing: true,
      team: TEAM,
      courseID: this.courseID
    });
    this.supermodel.setMaxProgress(1);
    this.listenTo(this.state, 'change', _.debounce(this.renderAllButCanvas));
    return this.levelLoader.loadWorldNecessities().then((function(_this) {
      return function(levelLoader) {
        _this.level = levelLoader.level, _this.session = levelLoader.session, _this.world = levelLoader.world;
        _this.god.setLevel(_this.level.serialize({
          supermodel: _this.supermodel,
          session: _this.session
        }));
        _this.god.setWorldClassMap(_this.world.classMap);
        _this.goalManager = new GoalManager(_this.world, _this.level.get('goals'), _this.team);
        _this.god.setGoalManager(_this.goalManager);
        _this.god.angelsShare.firstWorld = false;
        me.team = TEAM;
        _this.session.set('team', TEAM);
        _this.scriptManager = new ScriptManager({
          scripts: _this.world.scripts || [],
          view: _this,
          session: _this.session,
          levelID: _this.level.get('slug')
        });
        _this.scriptManager.loadFromSession();
        _this.howToPlayText = utils.i18n(_this.level.attributes, 'studentPlayInstructions');
        if (_this.howToPlayText == null) {
          _this.howToPlayText = $.i18n.t('play_game_dev_level.default_student_instructions');
        }
        _this.howToPlayText = marked(_this.howToPlayText, {
          sanitize: true
        });
        _this.renderAllButCanvas();
        return _this.supermodel.finishLoading();
      };
    })(this)).then((function(_this) {
      return function(supermodel) {
        var bounds, course, goal, goalNames, normalSurface, ref, shareURL, webGLSurface, worldBounds;
        _this.levelLoader.destroy();
        _this.levelLoader = null;
        webGLSurface = _this.$('canvas#webgl-surface');
        normalSurface = _this.$('canvas#normal-surface');
        _this.surface = new Surface(_this.world, normalSurface, webGLSurface, {
          thangTypes: _this.supermodel.getModels(ThangType),
          levelType: _this.level.get('type', true),
          gameUIState: _this.gameUIState,
          resizeStrategy: 'wrapper-size'
        });
        _this.listenTo(_this.surface, 'resize', _this.onSurfaceResize);
        worldBounds = _this.world.getBounds();
        bounds = [
          {
            x: worldBounds.left,
            y: worldBounds.top
          }, {
            x: worldBounds.right,
            y: worldBounds.bottom
          }
        ];
        _this.surface.camera.setBounds(bounds);
        _this.surface.camera.zoomTo({
          x: 0,
          y: 0
        }, 0.1, 0);
        _this.surface.setWorld(_this.world);
        _this.scriptManager.initializeCamera();
        _this.renderSelectors('#info-col');
        _this.spells = _this.session.generateSpellsObject({
          level: _this.level
        });
        goalNames = (function() {
          var i, len, ref, results;
          ref = this.goalManager.goals;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            goal = ref[i];
            results.push(utils.i18n(goal, 'name'));
          }
          return results;
        }).call(_this);
        course = _this.courseID ? new Course({
          _id: _this.courseID
        }) : null;
        shareURL = urls.playDevLevel({
          level: _this.level,
          session: _this.session,
          course: course
        });
        _this.state.set({
          loading: false,
          goalNames: goalNames,
          shareURL: shareURL,
          creatorString: $.i18n.t('play_game_dev_level.created_by').replace('{{name}}', _this.session.get('creatorName')),
          isOwner: me.id === _this.session.get('creator')
        });
        _this.eventProperties = {
          category: 'Play GameDev Level',
          courseID: _this.courseID,
          sessionID: _this.session.id,
          levelID: _this.level.id,
          levelSlug: _this.level.get('slug')
        };
        if ((ref = window.tracker) != null) {
          ref.trackEvent('Play GameDev Level - Load', _this.eventProperties, ['Mixpanel']);
        }
        return _this.god.createWorld(_this.spells, false, false, true);
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        if (e.stack) {
          throw e;
        }
        return _this.state.set('errorMessage', e.message);
      };
    })(this));
  };

  PlayGameDevLevelView.prototype.onEditLevelButton = function() {
    var route, viewClass;
    viewClass = 'views/play/level/PlayLevelView';
    route = "/play/level/" + (this.level.get('slug'));
    return Backbone.Mediator.publish('router:navigate', {
      route: route,
      viewClass: viewClass,
      viewArgs: [{}, this.levelID]
    });
  };

  PlayGameDevLevelView.prototype.onClickPlayButton = function() {
    var action, ref;
    this.god.createWorld(this.spells, false, true);
    Backbone.Mediator.publish('playback:real-time-playback-started', {});
    Backbone.Mediator.publish('level:set-playing', {
      playing: true
    });
    action = this.state.get('playing') ? 'Play GameDev Level - Restart Level' : 'Play GameDev Level - Start Level';
    if ((ref = window.tracker) != null) {
      ref.trackEvent(action, this.eventProperties, ['Mixpanel']);
    }
    return this.state.set('playing', true);
  };

  PlayGameDevLevelView.prototype.onClickCopyURLButton = function() {
    var ref;
    this.$('#copy-url-input').val(this.state.get('shareURL')).select();
    this.tryCopy();
    return (ref = window.tracker) != null ? ref.trackEvent('Play GameDev Level - Copy URL', this.eventProperties, ['Mixpanel']) : void 0;
  };

  PlayGameDevLevelView.prototype.onClickPlayMoreCodeCombatButton = function() {
    var ref;
    return (ref = window.tracker) != null ? ref.trackEvent('Play GameDev Level - Click Play More CodeCombat', this.eventProperties, ['Mixpanel']) : void 0;
  };

  PlayGameDevLevelView.prototype.onSurfaceResize = function(arg) {
    var height;
    height = arg.height;
    return this.state.set('surfaceHeight', height);
  };

  PlayGameDevLevelView.prototype.renderAllButCanvas = function() {
    var height;
    this.renderSelectors('#info-col', '#share-row');
    height = this.state.get('surfaceHeight');
    if (height) {
      return this.$el.find('#info-col').css('height', this.state.get('surfaceHeight'));
    }
  };

  PlayGameDevLevelView.prototype.onNewWorld = function(e) {
    var modal;
    if (this.goalManager.checkOverallStatus() === 'success') {
      modal = new GameDevVictoryModal({
        shareURL: this.state.get('shareURL'),
        eventProperties: this.eventProperties
      });
      this.openModalView(modal);
      return modal.once('replay', this.onClickPlayButton, this);
    }
  };

  PlayGameDevLevelView.prototype.destroy = function() {
    var ref, ref1, ref2, ref3, ref4;
    if ((ref = this.levelLoader) != null) {
      ref.destroy();
    }
    if ((ref1 = this.surface) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.god) != null) {
      ref2.destroy();
    }
    if ((ref3 = this.goalManager) != null) {
      ref3.destroy();
    }
    if ((ref4 = this.scriptManager) != null) {
      ref4.destroy();
    }
    delete window.world;
    return PlayGameDevLevelView.__super__.destroy.call(this);
  };

  return PlayGameDevLevelView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/PlayGameDevLevelView.js.map
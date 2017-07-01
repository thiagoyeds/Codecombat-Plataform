require.register("templates/play/level/control-bar-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),homeLink = locals_.homeLink,me = locals_.me,ladderGame = locals_.ladderGame,view = locals_.view,i18n = locals_.i18n,difficultyTitle = locals_.difficultyTitle,worldName = locals_.worldName,levelDifficulty = locals_.levelDifficulty,observing = locals_.observing,spectateGame = locals_.spectateGame;buf.push("<div class=\"left-cap\"></div><div class=\"right-cap\"></div><div class=\"center-chain\"></div><div class=\"right-chain\"></div><div class=\"wood-background\"></div><div class=\"levels-link-area\"><a" + (jade.attrs({ 'href':(homeLink || "/"), "class": [('levels-link')] }, {"href":true})) + "><div class=\"glyphicon glyphicon-play\"></div><span" + (jade.attrs({ 'data-i18n':(me.isSessionless() ? "nav.courses" : (ladderGame ? "general.ladder" : "nav.play")), "class": [('home-text')] }, {"data-i18n":true})) + "></span></a></div><div class=\"level-name-area-container\"><div class=\"level-name-area\">");
if ( view.course)
{
buf.push("<div class=\"level-label\">" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("<div" + (jade.attrs({ 'title':(difficultyTitle || ""), "class": [('level-name')] }, {"title":true})) + "><span>" + (jade.escape((jade.interp = view.levelNumber ? view.levelNumber + '. ' : '') == null ? '' : jade.interp)) + "" + (jade.escape((jade.interp = worldName.replace('Course: ', '')) == null ? '' : jade.interp)) + "</span>");
if ( levelDifficulty)
{
buf.push("<sup class=\"level-difficulty\">" + (jade.escape(null == (jade.interp = levelDifficulty) ? "" : jade.interp)) + "</sup>");
}
buf.push("</div></div></div><div class=\"buttons-area\">");
if ( !observing)
{
buf.push("<button id=\"game-menu-button\" data-i18n=\"[title]play_level.show_menu\" title=\"Show game menu\" class=\"btn btn-inverse\"><div class=\"hamburger\"><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></div><span data-i18n=\"play_level.game_menu\" class=\"game-menu-text\">Game Menu</span></button>");
}
if ( spectateGame)
{
buf.push("<button id=\"next-game-button\" data-i18n=\"play_level.next_game\" class=\"btn btn-xs btn-inverse banner\">Next game</button>");
}
if ( !observing)
{
buf.push("<button id=\"level-done-button\" data-i18n=\"play_level.done\" class=\"btn btn-xs btn-primary banner\">Done</button>");
}
if ( me.get('anonymous'))
{
buf.push("<button id=\"control-bar-sign-up-button\" data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\" data-i18n=\"signup.sign_up\" class=\"btn btn-xs btn-primary banner\"></button>");
}
if ( me.isAdmin())
{
var otherVersion = view.course ? 'Home' : 'Classroom'
buf.push("<button id=\"version-switch-button\" class=\"btn btn-xs btn-inverse banner\"><span>" + (jade.escape(null == (jade.interp = otherVersion) ? "" : jade.interp)) + "</span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span data-code-language=\"javascript\" class=\"code-language-selector\">JS</span><span>" + (jade.escape(null == (jade.interp = ' | ') ? "" : jade.interp)) + "</span><span data-code-language=\"python\" class=\"code-language-selector\">PY</span></button>");
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

;require.register("views/play/level/ControlBarView", function(exports, require, module) {
var Campaign, Classroom, CocoView, ControlBarView, Course, CourseInstance, GameMenuModal, LevelSetupManager, me, storage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

storage = require('core/storage');

CocoView = require('views/core/CocoView');

template = require('templates/play/level/control-bar-view');

me = require('core/auth').me;

Campaign = require('models/Campaign');

Classroom = require('models/Classroom');

Course = require('models/Course');

CourseInstance = require('models/CourseInstance');

GameMenuModal = require('views/play/menu/GameMenuModal');

LevelSetupManager = require('lib/LevelSetupManager');

module.exports = ControlBarView = (function(superClass) {
  extend(ControlBarView, superClass);

  ControlBarView.prototype.id = 'control-bar-view';

  ControlBarView.prototype.template = template;

  ControlBarView.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'ipad:memory-warning': 'onIPadMemoryWarning'
  };

  ControlBarView.prototype.events = {
    'click #next-game-button': function() {
      return Backbone.Mediator.publish('level:next-game-pressed', {});
    },
    'click #game-menu-button': 'showGameMenuModal',
    'click': function() {
      return Backbone.Mediator.publish('tome:focus-editor', {});
    },
    'click .levels-link-area': 'onClickHome',
    'click .home a': 'onClickHome',
    'click #control-bar-sign-up-button': 'onClickSignupButton',
    'click #version-switch-button': 'onClickVersionSwitchButton',
    'click #version-switch-button .code-language-selector': 'onClickVersionSwitchButton'
  };

  function ControlBarView(options) {
    var jqxhr, ref;
    this.supermodel = options.supermodel;
    this.courseID = options.courseID;
    this.courseInstanceID = options.courseInstanceID;
    this.worldName = options.worldName;
    this.session = options.session;
    this.level = options.level;
    this.levelSlug = this.level.get('slug');
    this.levelID = this.levelSlug || this.level.id;
    this.spectateGame = (ref = options.spectateGame) != null ? ref : false;
    this.observing = options.session.get('creator') !== me.id;
    this.levelNumber = '';
    if (this.level.isType('course', 'game-dev', 'web-dev') && (this.level.get('campaignIndex') != null)) {
      this.levelNumber = this.level.get('campaignIndex') + 1;
    }
    if (this.courseInstanceID) {
      this.courseInstance = new CourseInstance({
        _id: this.courseInstanceID
      });
      jqxhr = this.courseInstance.fetch();
      this.supermodel.trackRequest(jqxhr);
      new Promise(jqxhr.then).then((function(_this) {
        return function() {
          _this.classroom = new Classroom({
            _id: _this.courseInstance.get('classroomID')
          });
          return _this.supermodel.trackRequest(_this.classroom.fetch());
        };
      })(this));
    } else if (this.courseID) {
      this.course = new Course({
        _id: this.courseID
      });
      jqxhr = this.course.fetch();
      this.supermodel.trackRequest(jqxhr);
      new Promise(jqxhr.then).then((function(_this) {
        return function() {
          _this.campaign = new Campaign({
            _id: _this.course.get('campaignID')
          });
          return _this.supermodel.trackRequest(_this.campaign.fetch());
        };
      })(this));
    }
    ControlBarView.__super__.constructor.call(this, options);
    if (this.level.get('replayable')) {
      this.listenTo(this.session, 'change-difficulty', this.onSessionDifficultyChanged);
    }
  }

  ControlBarView.prototype.onLoaded = function() {
    if (this.classroom) {
      this.levelNumber = this.classroom.getLevelNumber(this.level.get('original'), this.levelNumber);
    } else if (this.campaign) {
      this.levelNumber = this.campaign.getLevelNumber(this.level.get('original'), this.levelNumber);
    }
    return ControlBarView.__super__.onLoaded.call(this);
  };

  ControlBarView.prototype.setBus = function(bus) {
    this.bus = bus;
  };

  ControlBarView.prototype.getRenderData = function(c) {
    var campaign, gameDevHoc, leagueID, leagueType, levelID, ref, ref1, ref2;
    if (c == null) {
      c = {};
    }
    ControlBarView.__super__.getRenderData.call(this, c);
    c.worldName = this.worldName;
    c.ladderGame = this.level.isType('ladder', 'hero-ladder', 'course-ladder');
    if (this.level.get('replayable')) {
      c.levelDifficulty = (ref = (ref1 = this.session.get('state')) != null ? ref1.difficulty : void 0) != null ? ref : 0;
      if (this.observing) {
        c.levelDifficulty = Math.max(0, c.levelDifficulty - 1);
      }
      c.difficultyTitle = "" + ($.i18n.t('play.level_difficulty')) + c.levelDifficulty;
      this.lastDifficulty = c.levelDifficulty;
    }
    c.spectateGame = this.spectateGame;
    c.observing = this.observing;
    this.homeViewArgs = [
      {
        supermodel: this.hasReceivedMemoryWarning ? null : this.supermodel
      }
    ];
    gameDevHoc = storage.load('should-return-to-game-dev-hoc');
    if (gameDevHoc) {
      this.homeLink = "/play/game-dev-hoc";
      this.homeViewClass = 'views/play/CampaignView';
      this.homeViewArgs.push('game-dev-hoc');
    } else if (me.isSessionless()) {
      this.homeLink = "/teachers/courses";
      this.homeViewClass = "views/courses/TeacherCoursesView";
    } else if (this.level.isType('ladder', 'ladder-tutorial', 'hero-ladder', 'course-ladder')) {
      levelID = ((ref2 = this.level.get('slug')) != null ? ref2.replace(/\-tutorial$/, '') : void 0) || this.level.id;
      this.homeLink = "/play/ladder/" + levelID;
      this.homeViewClass = 'views/ladder/LadderView';
      this.homeViewArgs.push(levelID);
      if (leagueID = this.getQueryVariable('league') || this.getQueryVariable('course-instance')) {
        leagueType = this.level.isType('course-ladder') ? 'course' : 'clan';
        this.homeViewArgs.push(leagueType);
        this.homeViewArgs.push(leagueID);
        this.homeLink += "/" + leagueType + "/" + leagueID;
      }
    } else if (this.level.isType('course') || this.courseID) {
      this.homeLink = '/students';
      this.homeViewClass = 'views/courses/CoursesView';
      if (this.courseID) {
        this.homeLink += "/" + this.courseID;
        this.homeViewArgs.push(this.courseID);
        this.homeViewClass = 'views/courses/CourseDetailsView';
        if (this.courseInstanceID) {
          this.homeLink += "/" + this.courseInstanceID;
          this.homeViewArgs.push(this.courseInstanceID);
        }
      }
    } else if (this.level.isType('hero', 'hero-coop', 'game-dev', 'web-dev') || window.serverConfig.picoCTF) {
      this.homeLink = '/play';
      this.homeViewClass = 'views/play/CampaignView';
      campaign = this.level.get('campaign');
      this.homeLink += '/' + campaign;
      this.homeViewArgs.push(campaign);
    } else {
      this.homeLink = '/';
      this.homeViewClass = 'views/HomeView';
    }
    c.editorLink = "/editor/level/" + (this.level.get('slug') || this.level.id);
    c.homeLink = this.homeLink;
    return c;
  };

  ControlBarView.prototype.showGameMenuModal = function(e, tab) {
    var gameMenuModal;
    if (tab == null) {
      tab = null;
    }
    gameMenuModal = new GameMenuModal({
      level: this.level,
      session: this.session,
      supermodel: this.supermodel,
      showTab: tab
    });
    this.openModalView(gameMenuModal);
    return this.listenToOnce(gameMenuModal, 'change-hero', function() {
      var ref;
      if ((ref = this.setupManager) != null) {
        ref.destroy();
      }
      this.setupManager = new LevelSetupManager({
        supermodel: this.supermodel,
        level: this.level,
        levelID: this.levelID,
        parent: this,
        session: this.session,
        courseID: this.courseID,
        courseInstanceID: this.courseInstanceID
      });
      return this.setupManager.open();
    });
  };

  ControlBarView.prototype.onClickHome = function(e) {
    var category, ref;
    if (this.level.isType('course')) {
      category = me.isTeacher() ? 'Teachers' : 'Students';
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Play Level Back To Levels', {
          category: category,
          levelSlug: this.levelSlug
        }, ['Mixpanel']);
      }
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    return Backbone.Mediator.publish('router:navigate', {
      route: this.homeLink,
      viewClass: this.homeViewClass,
      viewArgs: this.homeViewArgs
    });
  };

  ControlBarView.prototype.onClickSignupButton = function(e) {
    var ref;
    return (ref = window.tracker) != null ? ref.trackEvent('Started Signup', {
      category: 'Play Level',
      label: 'Control Bar',
      level: this.levelID
    }) : void 0;
  };

  ControlBarView.prototype.onClickVersionSwitchButton = function(e) {
    var codeLanguage, otherVersionLink;
    if (this.destroyed) {
      return;
    }
    otherVersionLink = "/play/level/" + (this.level.get('slug')) + "?dev=true";
    if (!this.course) {
      otherVersionLink += '&course=560f1a9f22961295f9427742';
    }
    if (codeLanguage = $(e.target).data('code-language')) {
      otherVersionLink += "&codeLanguage=" + codeLanguage;
    }
    return document.location.href = otherVersionLink;
  };

  ControlBarView.prototype.onDisableControls = function(e) {
    return this.toggleControls(e, false);
  };

  ControlBarView.prototype.onEnableControls = function(e) {
    return this.toggleControls(e, true);
  };

  ControlBarView.prototype.toggleControls = function(e, enabled) {
    if (e.controls && !(indexOf.call(e.controls, 'level') >= 0)) {
      return;
    }
    if (enabled === this.controlsEnabled) {
      return;
    }
    this.controlsEnabled = enabled;
    return this.$el.toggleClass('controls-disabled', !enabled);
  };

  ControlBarView.prototype.onIPadMemoryWarning = function(e) {
    return this.hasReceivedMemoryWarning = true;
  };

  ControlBarView.prototype.onSessionDifficultyChanged = function() {
    var ref;
    if (((ref = this.session.get('state')) != null ? ref.difficulty : void 0) === this.lastDifficulty) {
      return;
    }
    return this.render();
  };

  ControlBarView.prototype.destroy = function() {
    var ref;
    if ((ref = this.setupManager) != null) {
      ref.destroy();
    }
    return ControlBarView.__super__.destroy.call(this);
  };

  return ControlBarView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/ControlBarView.js.map
require.register("templates/editor/level/level-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),level = locals_.level,view = locals_.view,authorized = locals_.authorized,recentlyPlayedOpponents = locals_.recentlyPlayedOpponents,anonymous = locals_.anonymous,me = locals_.me;if ( level.loading)
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#thangs-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_thangs\">Thangs</a></li><li><a href=\"#editor-level-scripts-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_scripts\">Scripts</a></li><li><a href=\"#editor-level-settings-tab-view\" data-toggle=\"tab\" data-i18n=\"play.settings\">Settings</a></li><li><a href=\"#editor-level-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\" id=\"components-tab\">Components</a></li><li><a href=\"#systems-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_systems\">Systems</a></li><li><a href=\"#editor-level-tasks-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_tasks\" id=\"tasks-tab\">" + (jade.escape(null == (jade.interp = "Tasks" + " " + view.getTaskCompletionRatio()) ? "" : jade.interp)) + "</a></li><li><a href=\"#editor-level-patches\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = level.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li><li><a href=\"#related-achievements-view\" data-toggle=\"tab\" data-i18n=\"user.achievements_title\">Achievements</a></li><li><a href=\"#editor-level-documentation\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_docs\">Documentation</a></li><li><a href=\"#level-feedback-view\" data-toggle=\"tab\"><div class=\"glyphicon glyphicon-star\"></div></a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = level.attributes.name) == null ? '' : jade.interp)) + "<span id=\"completion-rate\" class=\"spl\"></span></span></div><ul class=\"nav navbar-nav navbar-right\"><li id=\"undo-button\"><a><span class=\"glyphicon-arrow-left glyphicon\"></span></a></li><li id=\"redo-button\"><a><span class=\"glyphicon-arrow-right glyphicon\"></span></a></li><li id=\"artisan-guide-button\"><a><span class=\"glyphicon-book glyphicon\"></span></a></li>");
if ( authorized)
{
buf.push("<li id=\"commit-level-start-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
else
{
buf.push("<li id=\"level-patch-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
if ( level.isType('ladder'))
{
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-team-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play As Which Team?</li><li>");
// iterate ['humans', 'ogres']
;(function(){
  var $$obj = ['humans', 'ogres'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

// iterate recentlyPlayedOpponents
;(function(){
  var $$obj = recentlyPlayedOpponents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</li></ul></li>");
}
else
{
buf.push("<li data-i18n=\"[title]general.play_preview\" title=\"Play preview of current level\" id=\"play-button\"><a><span class=\"glyphicon-play glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"level-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li>");
if ( me.isAdmin() || me.isArtisan())
{
buf.push("<!-- DNT--><li><a id=\"save-branch\">Save/Stash Branch</a></li><li><a id=\"load-branch\">Load/Unstash Branch</a></li>");
}
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(anonymous), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("editor/level/modals/GenerateTerrainModal"), 'data-i18n':("editor.generate_terrain"), 'disabled':(anonymous), "class": [('generate-terrain-button')] }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Generate Terrain</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( view.courseID)
{
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"javascript\" class=\"play-classroom-level\">Play Classroom JavaScript</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"python\" class=\"play-classroom-level\">Play Classroom Python</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"home\" data-code-language=\"\" class=\"play-classroom-level\">Play Home</a></li>");
}
if ( me.isAdmin())
{
buf.push("<li><a" + (jade.attrs({ 'href':("/editor/verifier/" + (level.get('slug')) + "?dev=true") }, {"href":true})) + ">Verifier</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"level-history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"level-editor-tabs\" class=\"tab-content\"><div id=\"thangs-tab-view\" class=\"tab-pane active\"></div><div id=\"editor-level-scripts-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-settings-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-components-tab-view\" class=\"tab-pane\"></div><div id=\"systems-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-tasks-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-patches\" class=\"tab-pane nano\"><div class=\"nano-content\"><div class=\"patches-view\"></div></div></div><div id=\"related-achievements-view\" class=\"tab-pane\"></div><div id=\"editor-level-documentation\" class=\"tab-pane\"><div class=\"tab-content\"><ul class=\"nav nav-pills nav-justified\"><li><a href=\"#components-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.components\">Components</a></li><li><a href=\"#systems-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.systems\">Systems</a></li></ul><div id=\"components-documentation-view\" class=\"tab-pane\"></div><div id=\"systems-documentation-view\" class=\"tab-pane\"></div></div></div><div id=\"level-feedback-view\" class=\"tab-pane\"></div></div></div>");;return buf.join("");
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

;require.register("views/editor/level/LevelEditView", function(exports, require, module) {
var ArtisanGuideModal, Campaigns, CocoCollection, ComponentsDocumentationView, ComponentsTabView, Course, DocumentFiles, ForkModal, Level, LevelComponent, LevelComponents, LevelEditView, LevelFeedbackView, LevelLoader, LevelSystem, LevelSystems, LoadBranchModal, PatchesView, RelatedAchievementsView, RootView, SaveBranchModal, SaveLevelModal, SaveVersionModal, ScriptsTabView, SettingsTabView, SystemsDocumentationView, SystemsTabView, TasksTabView, ThangsTabView, VersionHistoryView, World, storage, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/editor/level/level-edit-view');

Level = require('models/Level');

LevelSystem = require('models/LevelSystem');

LevelComponent = require('models/LevelComponent');

LevelSystems = require('collections/LevelSystems');

LevelComponents = require('collections/LevelComponents');

World = require('lib/world/world');

DocumentFiles = require('collections/DocumentFiles');

LevelLoader = require('lib/LevelLoader');

Campaigns = require('collections/Campaigns');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

require('views/modal/RevertModal');

require('views/editor/level/modals/GenerateTerrainModal');

ThangsTabView = require('./thangs/ThangsTabView');

SettingsTabView = require('./settings/SettingsTabView');

ScriptsTabView = require('./scripts/ScriptsTabView');

ComponentsTabView = require('./components/ComponentsTabView');

SystemsTabView = require('./systems/SystemsTabView');

TasksTabView = require('./tasks/TasksTabView');

SaveLevelModal = require('./modals/SaveLevelModal');

ArtisanGuideModal = require('./modals/ArtisanGuideModal');

ForkModal = require('views/editor/ForkModal');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

SaveBranchModal = require('views/editor/level/modals/SaveBranchModal');

LoadBranchModal = require('views/editor/level/modals/LoadBranchModal');

PatchesView = require('views/editor/PatchesView');

RelatedAchievementsView = require('views/editor/level/RelatedAchievementsView');

VersionHistoryView = require('./modals/LevelVersionsModal');

ComponentsDocumentationView = require('views/editor/docs/ComponentsDocumentationView');

SystemsDocumentationView = require('views/editor/docs/SystemsDocumentationView');

LevelFeedbackView = require('views/editor/level/LevelFeedbackView');

storage = require('core/storage');

utils = require('core/utils');

require('vendor/coffeescript');

require('vendor/treema');

require('vendor/aether-javascript');

require('vendor/aether-python');

require('vendor/aether-coffeescript');

require('vendor/aether-lua');

require('vendor/aether-java');

require('vendor/aether-html');

require('game-libraries');

module.exports = LevelEditView = (function(superClass) {
  extend(LevelEditView, superClass);

  LevelEditView.prototype.id = 'editor-level-view';

  LevelEditView.prototype.className = 'editor';

  LevelEditView.prototype.template = template;

  LevelEditView.prototype.cache = false;

  LevelEditView.prototype.events = {
    'click #play-button': 'onPlayLevel',
    'click .play-with-team-button': 'onPlayLevel',
    'click .play-with-team-parent': 'onPlayLevelTeamSelect',
    'click .play-classroom-level': 'onPlayLevel',
    'click #commit-level-start-button': 'startCommittingLevel',
    'click li:not(.disabled) > #fork-start-button': 'startForking',
    'click #level-history-button': 'showVersionHistory',
    'click #undo-button': 'onUndo',
    'mouseenter #undo-button': 'showUndoDescription',
    'click #redo-button': 'onRedo',
    'mouseenter #redo-button': 'showRedoDescription',
    'click #patches-tab': function() {
      return this.patchesView.load();
    },
    'click #components-tab': function() {
      return this.subviews.editor_level_components_tab_view.refreshLevelThangsTreema(this.level.get('thangs'));
    },
    'click #artisan-guide-button': 'showArtisanGuide',
    'click #level-patch-button': 'startPatchingLevel',
    'click #level-watch-button': 'toggleWatchLevel',
    'click li:not(.disabled) > #pop-level-i18n-button': 'onPopulateI18N',
    'click a[href="#editor-level-documentation"]': 'onClickDocumentationTab',
    'click #save-branch': 'onClickSaveBranch',
    'click #load-branch': 'onClickLoadBranch',
    'mouseup .nav-tabs > li a': 'toggleTab'
  };

  function LevelEditView(options, levelID1) {
    this.levelID = levelID1;
    this.incrementBuildTime = bind(this.incrementBuildTime, this);
    LevelEditView.__super__.constructor.call(this, options);
    this.supermodel.shouldSaveBackups = function(model) {
      var ref;
      return (ref = model.constructor.className) === 'Level' || ref === 'LevelComponent' || ref === 'LevelSystem' || ref === 'ThangType';
    };
    this.levelLoader = new LevelLoader({
      supermodel: this.supermodel,
      levelID: this.levelID,
      headless: true,
      sessionless: true,
      loadArticles: true
    });
    this.level = this.levelLoader.level;
    this.files = new DocumentFiles(this.levelLoader.level);
    this.supermodel.loadCollection(this.files, 'file_names');
    this.campaigns = new Campaigns();
    this.supermodel.trackRequest(this.campaigns.fetchByType('course', {
      data: {
        project: 'levels'
      }
    }));
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  LevelEditView.prototype.destroy = function() {
    clearInterval(this.timerIntervalID);
    return LevelEditView.__super__.destroy.call(this);
  };

  LevelEditView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('.outer-content');
    }
    return LevelEditView.__super__.showLoading.call(this, $el);
  };

  LevelEditView.prototype.getTitle = function() {
    return "LevelEditor - " + (this.level.get('name') || '...');
  };

  LevelEditView.prototype.onLoaded = function() {
    var campaign, campaignCourseMap, course, i, j, len, len1, level, levelID, ref, ref1, ref2;
    _.defer((function(_this) {
      return function() {
        _this.world = _this.levelLoader.world;
        _this.render();
        return _this.timerIntervalID = setInterval(_this.incrementBuildTime, 1000);
      };
    })(this));
    campaignCourseMap = {};
    ref = this.courses.models;
    for (i = 0, len = ref.length; i < len; i++) {
      course = ref[i];
      campaignCourseMap[course.get('campaignID')] = course.id;
    }
    ref1 = this.campaigns.models;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      campaign = ref1[j];
      ref2 = campaign.get('levels');
      for (levelID in ref2) {
        level = ref2[levelID];
        if (levelID === this.level.get('original')) {
          this.courseID = campaignCourseMap[campaign.id];
        }
      }
      if (this.courseID) {
        break;
      }
    }
    if (!this.courseID && me.isAdmin()) {
      this.courseID = '560f1a9f22961295f9427742';
    }
    return this.getLevelCompletionRate();
  };

  LevelEditView.prototype.getRenderData = function(context) {
    var ref, ref1;
    if (context == null) {
      context = {};
    }
    context = LevelEditView.__super__.getRenderData.call(this, context);
    context.level = this.level;
    context.authorized = me.isAdmin() || this.level.hasWriteAccess(me);
    context.anonymous = me.get('anonymous');
    context.recentlyPlayedOpponents = (ref = (ref1 = storage.load('recently-played-matches')) != null ? ref1[this.levelID] : void 0) != null ? ref : [];
    return context;
  };

  LevelEditView.prototype.afterRender = function() {
    LevelEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', (function(_this) {
      return function(e) {
        return Backbone.Mediator.publish('editor:view-switched', {
          targetURL: $(e.target).attr('href')
        });
      };
    })(this));
    this.listenTo(this.level, 'change:tasks', (function(_this) {
      return function() {
        return _this.renderSelectors('#tasks-tab');
      };
    })(this));
    this.insertSubView(new ThangsTabView({
      world: this.world,
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new SettingsTabView({
      supermodel: this.supermodel
    }));
    this.insertSubView(new ScriptsTabView({
      world: this.world,
      supermodel: this.supermodel,
      files: this.files
    }));
    this.insertSubView(new ComponentsTabView({
      supermodel: this.supermodel
    }));
    this.insertSubView(new SystemsTabView({
      supermodel: this.supermodel,
      world: this.world
    }));
    this.insertSubView(new TasksTabView({
      world: this.world,
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new RelatedAchievementsView({
      supermodel: this.supermodel,
      level: this.level
    }));
    this.insertSubView(new ComponentsDocumentationView({
      lazy: true
    }));
    this.insertSubView(new SystemsDocumentationView({
      lazy: true
    }));
    this.insertSubView(new LevelFeedbackView({
      level: this.level
    }));
    Backbone.Mediator.publish('editor:level-loaded', {
      level: this.level
    });
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    this.patchesView = this.insertSubView(new PatchesView(this.level), this.$el.find('.patches-view'));
    this.listenTo(this.patchesView, 'accepted-patch', function() {
      if (!key.shift) {
        return location.reload();
      }
    });
    if (this.level.watching()) {
      return this.$el.find('#level-watch-button').find('> span').toggleClass('secret');
    }
  };

  LevelEditView.prototype.onPlayLevelTeamSelect = function(e) {
    if (this.childWindow && !this.childWindow.closed) {
      e.stopImmediatePropagation();
      return this.onPlayLevel(e);
    }
  };

  LevelEditView.prototype.onPlayLevel = function(e) {
    var newClassLanguage, newClassMode, opponentSessionID, ref, scratchLevelID, sendLevel, team;
    team = $(e.target).data('team');
    opponentSessionID = $(e.target).data('opponent');
    if ($(e.target).data('classroom') === 'home') {
      newClassMode = this.lastNewClassMode = void 0;
    } else if ($(e.target).data('classroom')) {
      newClassMode = this.lastNewClassMode = true;
    } else {
      newClassMode = this.lastNewClassMode;
    }
    newClassLanguage = this.lastNewClassLanguage = ((ref = $(e.target).data('code-language')) != null ? ref : this.lastNewClassLanguage) || void 0;
    sendLevel = (function(_this) {
      return function() {
        return _this.childWindow.Backbone.Mediator.publish('level:reload-from-data', {
          level: _this.level,
          supermodel: _this.supermodel
        });
      };
    })(this);
    if (this.childWindow && !this.childWindow.closed && this.playClassMode === newClassMode && this.playClassLanguage === newClassLanguage) {
      sendLevel();
    } else {
      scratchLevelID = this.level.get('slug') + '?dev=true';
      if (team) {
        scratchLevelID += "&team=" + team;
      }
      if (opponentSessionID) {
        scratchLevelID += "&opponent=" + opponentSessionID;
      }
      this.playClassMode = newClassMode;
      this.playClassLanguage = newClassLanguage;
      if (this.playClassMode) {
        scratchLevelID += "&course=" + this.courseID;
        scratchLevelID += "&codeLanguage=" + this.playClassLanguage;
      }
      if (me.get('name') === 'Nick') {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=2560,height=1080,left=0,top=-1600,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
      } else {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=1280,height=640,left=10,top=10,location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0', true);
      }
      this.childWindow.onPlayLevelViewLoaded = (function(_this) {
        return function(e) {
          return sendLevel();
        };
      })(this);
    }
    return this.childWindow.focus();
  };

  LevelEditView.prototype.onUndo = function() {
    var ref;
    return (ref = TreemaNode.getLastTreemaWithFocus()) != null ? ref.undo() : void 0;
  };

  LevelEditView.prototype.onRedo = function() {
    var ref;
    return (ref = TreemaNode.getLastTreemaWithFocus()) != null ? ref.redo() : void 0;
  };

  LevelEditView.prototype.showUndoDescription = function() {
    var undoDescription;
    undoDescription = TreemaNode.getLastTreemaWithFocus().getUndoDescription();
    return this.$el.find('#undo-button').attr('title', $.i18n.t("general.undo_prefix") + " " + undoDescription + " " + $.i18n.t("general.undo_shortcut"));
  };

  LevelEditView.prototype.showRedoDescription = function() {
    var redoDescription;
    redoDescription = TreemaNode.getLastTreemaWithFocus().getRedoDescription();
    return this.$el.find('#redo-button').attr('title', $.i18n.t("general.redo_prefix") + " " + redoDescription + " " + $.i18n.t("general.redo_shortcut"));
  };

  LevelEditView.prototype.getCurrentView = function() {
    var currentViewID;
    currentViewID = this.$el.find('.tab-pane.active').attr('id');
    if (currentViewID === 'editor-level-patches') {
      return this.patchesView;
    }
    if (currentViewID === 'editor-level-documentation') {
      currentViewID = 'components-documentation-view';
    }
    return this.subviews[_.string.underscored(currentViewID)];
  };

  LevelEditView.prototype.startPatchingLevel = function(e) {
    this.openModalView(new SaveVersionModal({
      model: this.level
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.startCommittingLevel = function(e) {
    this.openModalView(new SaveLevelModal({
      level: this.level,
      supermodel: this.supermodel,
      buildTime: this.levelBuildTime
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.showArtisanGuide = function(e) {
    this.openModalView(new ArtisanGuideModal({
      level: this.level
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.startForking = function(e) {
    this.openModalView(new ForkModal({
      model: this.level,
      editorPath: 'level'
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.showVersionHistory = function(e) {
    var versionHistoryView;
    versionHistoryView = new VersionHistoryView({
      level: this.level
    }, this.levelID);
    this.openModalView(versionHistoryView);
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.toggleWatchLevel = function() {
    var button;
    button = this.$el.find('#level-watch-button');
    this.level.watch(button.find('.watch').is(':visible'));
    return button.find('> span').toggleClass('secret');
  };

  LevelEditView.prototype.onPopulateI18N = function() {
    var component, configSchema, f, i, j, len, len1, levelComponentMap, path, ref, ref1, thang, thangComponent, thangComponentIndex, thangIndex, totalChanges;
    totalChanges = this.level.populateI18N();
    levelComponentMap = _(currentView.supermodel.getModels(LevelComponent)).map(function(c) {
      return [c.get('original'), c];
    }).object().value();
    ref = this.level.get('thangs');
    for (thangIndex = i = 0, len = ref.length; i < len; thangIndex = ++i) {
      thang = ref[thangIndex];
      ref1 = thang.components;
      for (thangComponentIndex = j = 0, len1 = ref1.length; j < len1; thangComponentIndex = ++j) {
        thangComponent = ref1[thangComponentIndex];
        component = levelComponentMap[thangComponent.original];
        configSchema = component.get('configSchema');
        path = "/thangs/" + thangIndex + "/components/" + thangComponentIndex + "/config";
        totalChanges += this.level.populateI18N(thangComponent.config, configSchema, path);
      }
    }
    if (totalChanges) {
      f = function() {
        return document.location.reload();
      };
      return setTimeout(f, 500);
    } else {
      return noty({
        timeout: 2000,
        text: 'No changes.',
        type: 'information',
        layout: 'topRight'
      });
    }
  };

  LevelEditView.prototype.onClickSaveBranch = function() {
    var components, systems;
    components = new LevelComponents(this.supermodel.getModels(LevelComponent));
    systems = new LevelSystems(this.supermodel.getModels(LevelSystem));
    this.openModalView(new SaveBranchModal({
      components: components,
      systems: systems
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.onClickLoadBranch = function() {
    var components, systems;
    components = new LevelComponents(this.supermodel.getModels(LevelComponent));
    systems = new LevelSystems(this.supermodel.getModels(LevelSystem));
    this.openModalView(new LoadBranchModal({
      components: components,
      systems: systems
    }));
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  LevelEditView.prototype.toggleTab = function(e) {
    var li;
    this.renderScrollbar();
    if (!($(document).width() <= 800)) {
      return;
    }
    li = $(e.target).closest('li');
    if (li.hasClass('active')) {
      li.parent().find('li').show();
    } else {
      li.parent().find('li').hide();
      li.show();
    }
    return console.log(li.hasClass('active'));
  };

  LevelEditView.prototype.onClickDocumentationTab = function(e) {
    if (this.initializedDocs) {
      return;
    }
    this.initializedDocs = true;
    return this.$el.find('a[href="#components-documentation-view"]').click();
  };

  LevelEditView.prototype.incrementBuildTime = function() {
    var ref;
    if (application.userIsIdle) {
      return;
    }
    if (this.levelBuildTime == null) {
      this.levelBuildTime = (ref = this.level.get('buildTime')) != null ? ref : 0;
    }
    return ++this.levelBuildTime;
  };

  LevelEditView.prototype.getTaskCompletionRatio = function() {
    if (this.level.get('tasks') == null) {
      return '0/0';
    } else {
      return _.filter(this.level.get('tasks'), function(_elem) {
        return _elem.complete;
      }).length + '/' + this.level.get('tasks').length;
    }
  };

  LevelEditView.prototype.getLevelCompletionRate = function() {
    var endDay, endDayDashed, request, startDay, startDayDashed, success;
    if (!me.isAdmin()) {
      return;
    }
    startDay = utils.getUTCDay(-14);
    startDayDashed = startDay.slice(0, 4) + "-" + startDay.slice(4, 6) + "-" + startDay.slice(6, 8);
    endDay = utils.getUTCDay(-1);
    endDayDashed = endDay.slice(0, 4) + "-" + endDay.slice(4, 6) + "-" + endDay.slice(6, 8);
    success = (function(_this) {
      return function(data) {
        var day, finished, i, len, rate, rateDisplay, ref, ref1, started;
        if (_this.destroyed) {
          return;
        }
        started = 0;
        finished = 0;
        for (i = 0, len = data.length; i < len; i++) {
          day = data[i];
          started += (ref = day.started) != null ? ref : 0;
          finished += (ref1 = day.finished) != null ? ref1 : 0;
        }
        rate = finished / started;
        rateDisplay = (rate * 100).toFixed(1) + '%';
        return _this.$('#completion-rate').text(rateDisplay);
      };
    })(this);
    request = this.supermodel.addRequestResource('level_completions', {
      url: '/db/analytics_perday/-/level_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.level.get('slug')
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return LevelEditView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/LevelEditView.js.map
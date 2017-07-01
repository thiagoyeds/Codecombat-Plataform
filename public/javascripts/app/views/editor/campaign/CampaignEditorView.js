require.register("templates/editor/campaign/campaign-editor-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,anonymous = locals_.anonymous;if ( view.campaign.loading)
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav navbar-right\">");
if ( me.isAdmin())
{
buf.push("<li id=\"analytics-button\"><a><span class=\"glyphicon-stats glyphicon\"></span></a></li>");
}
if ( me.isAdmin())
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-toggle=\"coco-modal\" data-target=\"modal/RevertModal\" data-i18n=\"editor.revert\" id=\"revert-button\">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( me.isAdmin())
{
buf.push("<li id=\"patches-button\"><a><span class=\"spr glyphicon-wrench glyphicon\"></span><span data-i18n=\"resources.patches\">Patches</span></a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li></ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"left-column\"><div id=\"campaign-treema\"></div></div><div id=\"right-column\"><div id=\"campaign-view\"></div><div id=\"campaign-level-view\" class=\"hidden\"></div><div class=\"patches-view hidden\"></div></div></div>");;return buf.join("");
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

;require.register("views/editor/campaign/CampaignEditorView", function(exports, require, module) {
var Achievement, AchievementNode, Campaign, CampaignAnalyticsModal, CampaignEditorView, CampaignLevelView, CampaignNode, CampaignView, CampaignsNode, CocoCollection, Level, LevelNode, LevelsNode, PatchesView, RelatedAchievementsCollection, RewardsNode, RootView, SaveCampaignModal, ThangType, achievementProject, addAchievementEditorLink, thangTypeProject, treemaExt, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

RootView = require('views/core/RootView');

Campaign = require('models/Campaign');

Level = require('models/Level');

Achievement = require('models/Achievement');

ThangType = require('models/ThangType');

CampaignView = require('views/play/CampaignView');

CocoCollection = require('collections/CocoCollection');

treemaExt = require('core/treema-ext');

utils = require('core/utils');

RelatedAchievementsCollection = require('collections/RelatedAchievementsCollection');

CampaignAnalyticsModal = require('./CampaignAnalyticsModal');

CampaignLevelView = require('./CampaignLevelView');

SaveCampaignModal = require('./SaveCampaignModal');

PatchesView = require('views/editor/PatchesView');

require('game-libraries');

achievementProject = ['related', 'rewards', 'name', 'slug'];

thangTypeProject = ['name', 'original'];

module.exports = CampaignEditorView = (function(superClass) {
  extend(CampaignEditorView, superClass);

  CampaignEditorView.prototype.id = "campaign-editor-view";

  CampaignEditorView.prototype.template = require('templates/editor/campaign/campaign-editor-view');

  CampaignEditorView.prototype.className = 'editor';

  CampaignEditorView.prototype.events = {
    'click #analytics-button': 'onClickAnalyticsButton',
    'click #save-button': 'onClickSaveButton',
    'click #patches-button': 'onClickPatches'
  };

  CampaignEditorView.prototype.subscriptions = {
    'editor:campaign-analytics-modal-closed': 'onAnalyticsModalClosed'
  };

  function CampaignEditorView(options, campaignHandle) {
    this.campaignHandle = campaignHandle;
    this.onAchievementUpdated = bind(this.onAchievementUpdated, this);
    this.onTreemaDoubleClicked = bind(this.onTreemaDoubleClicked, this);
    this.onTreemaSelectionChanged = bind(this.onTreemaSelectionChanged, this);
    this.onTreemaChanged = bind(this.onTreemaChanged, this);
    CampaignEditorView.__super__.constructor.call(this, options);
    this.campaign = new Campaign({
      _id: this.campaignHandle
    });
    this.supermodel.loadModel(this.campaign);
    this.listenToOnce(this.campaign, 'sync', function(model, response, jqXHR) {
      this.campaign.set('_id', response._id);
      return this.campaign.url = function() {
        return '/db/campaign/' + this.id;
      };
    });
    this.campaignAnalytics = {};
    this.levels = new CocoCollection([], {
      model: Level,
      url: "/db/campaign/" + this.campaignHandle + "/levels",
      project: Campaign.denormalizedLevelProperties
    });
    this.supermodel.loadCollection(this.levels, 'levels');
    this.achievements = new CocoCollection([], {
      model: Achievement,
      url: "/db/campaign/" + this.campaignHandle + "/achievements",
      project: achievementProject
    });
    this.supermodel.loadCollection(this.achievements, 'achievements');
    this.toSave = new Backbone.Collection();
    this.listenToOnce(this.campaign, 'sync', this.loadThangTypeNames);
    this.listenToOnce(this.campaign, 'sync', this.onFundamentalLoaded);
    this.listenToOnce(this.levels, 'sync', this.onFundamentalLoaded);
    this.listenToOnce(this.achievements, 'sync', this.onFundamentalLoaded);
  }

  CampaignEditorView.prototype.onLeaveMessage = function() {
    var diff, i, len, model, ref;
    ref = this.toSave.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      diff = model.getDelta();
      if (_.size(diff)) {
        console.log('model, diff', model, diff);
        return 'You have changes!';
      }
    }
  };

  CampaignEditorView.prototype.loadThangTypeNames = function() {
    var i, j, len, len1, level, original, originals, ref, results, thangType;
    originals = [];
    ref = _.values(this.campaign.get('levels'));
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if (level.requiredGear) {
        originals = originals.concat(_.values(level.requiredGear));
      }
      if (level.restrictedGear) {
        originals = originals.concat(_.values(level.restrictedGear));
      }
    }
    originals = _.uniq(_.flatten(originals));
    results = [];
    for (j = 0, len1 = originals.length; j < len1; j++) {
      original = originals[j];
      thangType = new ThangType();
      thangType.setProjection(thangTypeProject);
      thangType.setURL("/db/thang.type/" + original + "/version");
      results.push(this.supermodel.loadModel(thangType));
    }
    return results;
  };

  CampaignEditorView.prototype.onFundamentalLoaded = function() {
    if (!(this.campaign.loaded && this.levels.loaded && this.achievements.loaded)) {
      return;
    }
    return this.loadMissingLevelsAndRelatedModels();
  };

  CampaignEditorView.prototype.loadMissingLevelsAndRelatedModels = function() {
    var achievements, achievementsResource, i, len, level, levelResource, model, promises, ref;
    promises = [];
    ref = _.values(this.campaign.get('levels'));
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      if (model = this.levels.findWhere({
        original: level.original
      })) {
        continue;
      }
      model = new Level({});
      model.setProjection(Campaign.denormalizedLevelProperties);
      model.setURL("/db/level/" + level.original + "/version");
      levelResource = this.supermodel.loadModel(model);
      this.levels.add(levelResource.model);
      if (levelResource.jqxhr) {
        levelResource.model.once('sync', function() {
          this.setURL("/db/level/" + this.id);
          return this.markToRevert();
        });
        promises.push(levelResource.jqxhr);
      }
      achievements = new RelatedAchievementsCollection(level.original);
      achievements.setProjection(achievementProject);
      achievementsResource = this.supermodel.loadCollection(achievements);
      promises.push(achievementsResource.jqxhr);
      this.listenToOnce(achievements, 'sync', function(achievementsLoaded) {
        return this.achievements.add(achievementsLoaded.models);
      });
    }
    return Promise.resolve($.when.apply($, promises));
  };

  CampaignEditorView.prototype.onLoaded = function() {
    this.updateCampaignLevels();
    this.campaignView.render();
    return CampaignEditorView.__super__.onLoaded.call(this);
  };

  CampaignEditorView.prototype.updateCampaignLevels = function() {
    var campaignLevel, campaignLevels, i, j, k, key, len, len1, len2, level, levelIndex, levelOriginal, model, propsToPropagate, ref, ref1, results;
    if (this.campaign.hasLocalChanges()) {
      this.toSave.add(this.campaign);
    }
    campaignLevels = $.extend({}, this.campaign.get('levels'));
    ref = this.levels.models;
    for (levelIndex = i = 0, len = ref.length; i < len; levelIndex = ++i) {
      level = ref[levelIndex];
      levelOriginal = level.get('original');
      campaignLevel = campaignLevels[levelOriginal];
      if (!campaignLevel) {
        continue;
      }
      $.extend(campaignLevel, _.pick(level.attributes, Campaign.denormalizedLevelProperties));
      if (!level.attributes.requiredGear) {
        delete campaignLevel.requiredGear;
      }
      if (!level.attributes.restrictedGear) {
        delete campaignLevel.restrictedGear;
      }
      campaignLevel.rewards = this.formatRewards(level);
      if (this.campaign.get('type') === 'hero') {
        campaignLevel.campaign = this.campaign.get('slug');
      }
      if (this.campaign.get('type', true) === 'course') {
        campaignLevel.campaignIndex = this.levels.models.length - levelIndex - 1;
      }
      campaignLevels[levelOriginal] = campaignLevel;
    }
    this.campaign.set('levels', campaignLevels);
    ref1 = _.values(campaignLevels);
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      level = ref1[j];
      if (/test/.test(this.campaign.get('slug'))) {
        continue;
      }
      model = this.levels.findWhere({
        original: level.original
      });
      propsToPropagate = Campaign.denormalizedLevelProperties;
      if (this.campaign.get('type') !== 'course') {
        propsToPropagate = _.without(propsToPropagate, 'campaignIndex');
      }
      for (k = 0, len2 = propsToPropagate.length; k < len2; k++) {
        key = propsToPropagate[k];
        if (model.get(key) !== level[key]) {
          model.set(key, level[key]);
        }
      }
      if (model.hasLocalChanges()) {
        results.push(this.toSave.add(model));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  CampaignEditorView.prototype.formatRewards = function(level) {
    var achievement, achievements, i, j, len, len1, ref, reward, rewardArray, rewardObject, rewardType, rewards, thangType;
    achievements = this.achievements.where({
      related: level.get('original')
    });
    rewards = [];
    for (i = 0, len = achievements.length; i < len; i++) {
      achievement = achievements[i];
      ref = achievement.get('rewards');
      for (rewardType in ref) {
        rewardArray = ref[rewardType];
        for (j = 0, len1 = rewardArray.length; j < len1; j++) {
          reward = rewardArray[j];
          rewardObject = {
            achievement: achievement.id
          };
          if (rewardType === 'heroes') {
            rewardObject.hero = reward;
            thangType = new ThangType({}, {
              project: thangTypeProject
            });
            thangType.setURL("/db/thang.type/" + reward + "/version");
            this.supermodel.loadModel(thangType);
          }
          if (rewardType === 'levels') {
            rewardObject.level = reward;
            if (!this.levels.findWhere({
              original: reward
            })) {
              level = new Level({}, {
                project: Campaign.denormalizedLevelProperties
              });
              level.setURL("/db/level/" + reward + "/version");
              this.supermodel.loadModel(level);
            }
          }
          if (rewardType === 'items') {
            rewardObject.item = reward;
            thangType = new ThangType({}, {
              project: thangTypeProject
            });
            thangType.setURL("/db/thang.type/" + reward + "/version");
            this.supermodel.loadModel(thangType);
          }
          rewards.push(rewardObject);
        }
      }
    }
    return rewards;
  };

  CampaignEditorView.prototype.propagateCampaignIndexes = function() {
    var campaignLevel, campaignLevels, index, level, levelOriginal, results;
    campaignLevels = $.extend({}, this.campaign.get('levels'));
    index = 0;
    results = [];
    for (levelOriginal in campaignLevels) {
      campaignLevel = campaignLevels[levelOriginal];
      if (this.campaign.get('type') === 'course') {
        level = this.levels.findWhere({
          original: levelOriginal
        });
        if (level && level.get('campaignIndex') !== index) {
          level.set('campaignIndex', index);
        }
      }
      campaignLevel.campaignIndex = index;
      index += 1;
      results.push(this.campaign.set('levels', campaignLevels));
    }
    return results;
  };

  CampaignEditorView.prototype.onClickPatches = function(e) {
    this.patchesView = this.insertSubView(new PatchesView(this.campaign), this.$el.find('.patches-view'));
    this.patchesView.load();
    return this.patchesView.$el.removeClass('hidden');
  };

  CampaignEditorView.prototype.onClickAnalyticsButton = function() {
    return this.openModalView(new CampaignAnalyticsModal({}, this.campaignHandle, this.campaignAnalytics));
  };

  CampaignEditorView.prototype.onAnalyticsModalClosed = function(options) {
    var level, original, ref, ref1, ref2, ref3, results;
    if ((options.targetLevelSlug != null) && (((ref = this.treema.childrenTreemas) != null ? (ref1 = ref.levels) != null ? ref1.childrenTreemas : void 0 : void 0) != null)) {
      ref2 = this.treema.childrenTreemas.levels.childrenTreemas;
      results = [];
      for (original in ref2) {
        level = ref2[original];
        if (((ref3 = level.data) != null ? ref3.slug : void 0) === options.targetLevelSlug) {
          this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, original));
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  CampaignEditorView.prototype.onClickSaveButton = function(e) {
    if (this.openingModal) {
      return;
    }
    this.openingModal = true;
    return this.loadMissingLevelsAndRelatedModels().then((function(_this) {
      return function() {
        _this.openingModal = false;
        _this.propagateCampaignIndexes();
        _this.updateCampaignLevels();
        _this.toSave.set(_this.toSave.filter(function(m) {
          return m.hasLocalChanges();
        }));
        return _this.openModalView(new SaveCampaignModal({}, _this.toSave));
      };
    })(this));
  };

  CampaignEditorView.prototype.afterRender = function() {
    var ref, treemaOptions;
    CampaignEditorView.__super__.afterRender.call(this);
    treemaOptions = {
      schema: Campaign.schema,
      data: $.extend({}, this.campaign.attributes),
      filePath: "db/campaign/" + (this.campaign.get('_id')),
      callbacks: {
        change: this.onTreemaChanged,
        select: this.onTreemaSelectionChanged,
        dblclick: this.onTreemaDoubleClicked,
        achievementUpdated: this.onAchievementUpdated
      },
      nodeClasses: {
        levels: LevelsNode,
        level: LevelNode,
        campaigns: CampaignsNode,
        campaign: CampaignNode,
        achievement: AchievementNode,
        rewards: RewardsNode
      },
      supermodel: this.supermodel
    };
    this.treema = this.$el.find('#campaign-treema').treema(treemaOptions);
    this.treema.build();
    this.treema.open();
    if ((ref = this.treema.childrenTreemas.levels) != null) {
      ref.open();
    }
    this.campaignView = new CampaignView({
      editorMode: true,
      supermodel: this.supermodel
    }, this.campaignHandle);
    this.campaignView.highlightElement = _.noop;
    this.listenTo(this.campaignView, 'level-moved', this.onCampaignLevelMoved);
    this.listenTo(this.campaignView, 'adjacent-campaign-moved', this.onAdjacentCampaignMoved);
    this.listenTo(this.campaignView, 'level-clicked', this.onCampaignLevelClicked);
    this.listenTo(this.campaignView, 'level-double-clicked', this.onCampaignLevelDoubleClicked);
    this.listenTo(this.campaign, 'change:i18n', (function(_this) {
      return function() {
        _this.campaign.updateI18NCoverage();
        _this.treema.set('/i18n', _this.campaign.get('i18n'));
        return _this.treema.set('/i18nCoverage', _this.campaign.get('i18nCoverage'));
      };
    })(this));
    return this.insertSubView(this.campaignView);
  };

  CampaignEditorView.prototype.onTreemaChanged = function(e, nodes) {
    var campaignLevel, i, j, key, len, len1, level, node, original, parts, path, ref, ref1, value;
    if (!/test/.test(this.campaign.get('slug'))) {
      for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        path = node.getPath();
        if (_.string.startsWith(path, '/levels/')) {
          parts = path.split('/');
          original = parts[2];
          level = this.supermodel.getModelByOriginal(Level, original);
          campaignLevel = this.treema.get("/levels/" + original);
          ref = Campaign.denormalizedLevelProperties;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            key = ref[j];
            level.set(key, campaignLevel[key]);
          }
          if (level.hasLocalChanges()) {
            this.toSave.add(level);
          }
        }
      }
    }
    this.toSave.add(this.campaign);
    ref1 = this.treema.data;
    for (key in ref1) {
      value = ref1[key];
      this.campaign.set(key, value);
    }
    return this.campaignView.setCampaign(this.campaign);
  };

  CampaignEditorView.prototype.onTreemaSelectionChanged = function(e, node) {
    var elem, ref, ref1;
    if (((ref = node[0]) != null ? (ref1 = ref.data) != null ? ref1.original : void 0 : void 0) == null) {
      return;
    }
    elem = this.$("div[data-level-original='" + node[0].data.original + "']");
    elem.toggle('pulsate');
    return setTimeout(function() {
      return elem.toggle('pulsate');
    }, 1000);
  };

  CampaignEditorView.prototype.onTreemaDoubleClicked = function(e, node) {
    var original, path;
    path = node.getPath();
    if (!_.string.startsWith(path, '/levels/')) {
      return;
    }
    original = path.split('/')[2];
    return this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, original));
  };

  CampaignEditorView.prototype.onAchievementUpdated = function(e, node) {
    var level, levelOriginal, rewardsPath;
    this.supermodel.registerModel(e.achievement);
    this.achievements.findWhere({
      _id: e.achievement.id
    }).set('rewards', e.achievement.get('rewards'));
    this.updateCampaignLevels();
    levelOriginal = node.getPath().split('/')[2];
    level = this.levels.findWhere({
      original: levelOriginal
    });
    rewardsPath = "/levels/" + levelOriginal + "/rewards";
    this.treema.set(rewardsPath, this.formatRewards(level));
    return this.campaignView.setCampaign(this.campaign);
  };

  CampaignEditorView.prototype.onCampaignLevelMoved = function(e) {
    var path;
    path = "levels/" + e.levelOriginal + "/position";
    return this.treema.set(path, e.position);
  };

  CampaignEditorView.prototype.onAdjacentCampaignMoved = function(e) {
    var path;
    path = "adjacentCampaigns/" + e.campaignID + "/position";
    return this.treema.set(path, e.position);
  };

  CampaignEditorView.prototype.onCampaignLevelClicked = function(levelOriginal) {
    var levelTreema, ref, ref1, ref2, url;
    if (!(levelTreema = (ref = this.treema.childrenTreemas) != null ? (ref1 = ref.levels) != null ? (ref2 = ref1.childrenTreemas) != null ? ref2[levelOriginal] : void 0 : void 0 : void 0)) {
      return;
    }
    if (key.ctrl || key.command) {
      url = "/editor/level/" + levelTreema.data.slug;
      window.open(url, '_blank');
    }
    return levelTreema.select();
  };

  CampaignEditorView.prototype.onCampaignLevelDoubleClicked = function(levelOriginal) {
    return this.openCampaignLevelView(this.supermodel.getModelByOriginal(Level, levelOriginal));
  };

  CampaignEditorView.prototype.openCampaignLevelView = function(level) {
    var campaignLevelView;
    this.insertSubView(campaignLevelView = new CampaignLevelView({}, level));
    this.listenToOnce(campaignLevelView, 'hidden', (function(_this) {
      return function() {
        return _this.$el.find('#campaign-view').show();
      };
    })(this));
    return this.$el.find('#campaign-view').hide();
  };

  CampaignEditorView.prototype.onClickLoginButton = function() {};

  CampaignEditorView.prototype.onClickSignupButton = function() {};

  return CampaignEditorView;

})(RootView);

LevelsNode = (function(superClass) {
  extend(LevelsNode, superClass);

  function LevelsNode() {
    this.childSource = bind(this.childSource, this);
    return LevelsNode.__super__.constructor.apply(this, arguments);
  }

  LevelsNode.prototype.valueClass = 'treema-levels';

  LevelsNode.levels = {};

  LevelsNode.prototype.ordered = true;

  LevelsNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, '' + _.size(data));
  };

  LevelsNode.prototype.childPropertiesAvailable = function() {
    return this.childSource;
  };

  LevelsNode.prototype.childSource = function(req, res) {
    var s;
    s = new Backbone.Collection([], {
      model: Level
    });
    s.url = '/db/level';
    s.fetch({
      data: {
        term: req.term,
        project: Campaign.denormalizedLevelProperties.join(',')
      }
    });
    return s.once('sync', (function(_this) {
      return function(collection) {
        var hasTerm, i, len, level, lowerPriority, lowerTerm, mapped, r, ref, sorted, startsWithTerm;
        ref = collection.models;
        for (i = 0, len = ref.length; i < len; i++) {
          level = ref[i];
          LevelsNode.levels[level.get('original')] = level;
          _this.settings.supermodel.registerModel(level);
        }
        mapped = (function() {
          var j, len1, ref1, results;
          ref1 = collection.models;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            r = ref1[j];
            results.push({
              label: r.get('name'),
              value: r.get('original')
            });
          }
          return results;
        })();
        lowerPriority = _.clone(mapped);
        lowerTerm = req.term.toLowerCase();
        startsWithTerm = _.filter(lowerPriority, function(item) {
          return _.string.startsWith(item.label.toLowerCase(), lowerTerm);
        });
        _.pull.apply(_, [lowerPriority].concat(slice.call(startsWithTerm)));
        hasTerm = _.filter(lowerPriority, function(item) {
          return _.string.contains(item.label.toLowerCase(), lowerTerm);
        });
        _.pull.apply(_, [lowerPriority].concat(slice.call(hasTerm)));
        sorted = _.flatten([startsWithTerm, hasTerm, lowerPriority]);
        return res(sorted);
      };
    })(this));
  };

  return LevelsNode;

})(TreemaObjectNode);

LevelNode = (function(superClass) {
  extend(LevelNode, superClass);

  function LevelNode() {
    return LevelNode.__super__.constructor.apply(this, arguments);
  }

  LevelNode.prototype.valueClass = 'treema-level';

  LevelNode.prototype.buildValueForDisplay = function(valEl, data) {
    var completion, el, name, status;
    name = data.name;
    if (data.requiresSubscription) {
      name = "[P] " + name;
    }
    status = '';
    el = 'strong';
    if (data.adminOnly) {
      status += " (disabled)";
      el = 'span';
    } else if (data.adventurer) {
      status += " (adventurer)";
    }
    completion = '';
    valEl.append($("<a href='/editor/level/" + (_.string.slugify(data.name)) + "' class='spr'>(e)</a>"));
    valEl.append($("<" + el + "></" + el + ">").addClass('treema-shortened').text(name));
    if (status) {
      valEl.append($('<em class="spl"></em>').text(status));
    }
    if (completion) {
      return valEl.append($('<span class="completion"></span>').text(completion));
    }
  };

  LevelNode.prototype.populateData = function() {
    var data;
    if (this.data.name != null) {
      return;
    }
    data = _.pick(LevelsNode.levels[this.keyForParent].attributes, Campaign.denormalizedLevelProperties);
    return _.extend(this.data, data);
  };

  return LevelNode;

})(TreemaObjectNode);

CampaignsNode = (function(superClass) {
  extend(CampaignsNode, superClass);

  function CampaignsNode() {
    this.childSource = bind(this.childSource, this);
    return CampaignsNode.__super__.constructor.apply(this, arguments);
  }

  CampaignsNode.prototype.valueClass = 'treema-campaigns';

  CampaignsNode.campaigns = {};

  CampaignsNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, '' + _.size(data));
  };

  CampaignsNode.prototype.childPropertiesAvailable = function() {
    return this.childSource;
  };

  CampaignsNode.prototype.childSource = function(req, res) {
    var s;
    s = new Backbone.Collection([], {
      model: Campaign
    });
    s.url = '/db/campaign';
    s.fetch({
      data: {
        term: req.term,
        project: Campaign.denormalizedCampaignProperties
      }
    });
    return s.once('sync', function(collection) {
      var campaign, i, len, mapped, r, ref;
      ref = collection.models;
      for (i = 0, len = ref.length; i < len; i++) {
        campaign = ref[i];
        CampaignsNode.campaigns[campaign.id] = campaign;
      }
      mapped = (function() {
        var j, len1, ref1, results;
        ref1 = collection.models;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          r = ref1[j];
          results.push({
            label: r.get('name'),
            value: r.id
          });
        }
        return results;
      })();
      return res(mapped);
    });
  };

  return CampaignsNode;

})(TreemaObjectNode);

CampaignNode = (function(superClass) {
  extend(CampaignNode, superClass);

  function CampaignNode() {
    return CampaignNode.__super__.constructor.apply(this, arguments);
  }

  CampaignNode.prototype.valueClass = 'treema-campaign';

  CampaignNode.prototype.buildValueForDisplay = function(valEl, data) {
    return this.buildValueForDisplaySimply(valEl, data.name);
  };

  CampaignNode.prototype.populateData = function() {
    var data;
    if (this.data.name != null) {
      return;
    }
    data = _.pick(CampaignsNode.campaigns[this.keyForParent].attributes, Campaign.denormalizedCampaignProperties);
    return _.extend(this.data, data);
  };

  return CampaignNode;

})(TreemaObjectNode);

AchievementNode = (function(superClass) {
  extend(AchievementNode, superClass);

  function AchievementNode() {
    return AchievementNode.__super__.constructor.apply(this, arguments);
  }

  AchievementNode.prototype.buildSearchURL = function(term) {
    return this.url + "?term=" + term + "&project=" + (achievementProject.join(','));
  };

  AchievementNode.prototype.buildValueForDisplay = function(valEl, data) {
    AchievementNode.__super__.buildValueForDisplay.call(this, valEl, data);
    return addAchievementEditorLink(this, valEl, data);
  };

  return AchievementNode;

})(treemaExt.IDReferenceNode);

RewardsNode = (function(superClass) {
  extend(RewardsNode, superClass);

  function RewardsNode() {
    return RewardsNode.__super__.constructor.apply(this, arguments);
  }

  RewardsNode.prototype.buildValueForDisplay = function(valEl, data) {
    var achievements, mainAchievement;
    RewardsNode.__super__.buildValueForDisplay.call(this, valEl, data);
    achievements = window.currentView.achievements.where({
      related: this.parent.data.original
    });
    achievements = _.sortBy(achievements, function(a) {
      var ref, ref1, ref2;
      return (ref = (ref1 = a.get('rewards')) != null ? (ref2 = ref1.levels) != null ? ref2.length : void 0 : void 0) != null ? ref : 0;
    });
    mainAchievement = achievements[0];
    if (!mainAchievement) {
      return;
    }
    return addAchievementEditorLink(this, valEl, mainAchievement.id);
  };

  return RewardsNode;

})(TreemaArrayNode);

addAchievementEditorLink = function(node, valEl, achievementId) {
  var anchor;
  anchor = $('<a class="spl">(e)</a>');
  anchor.on('click', function(event) {
    var childWindow;
    childWindow = window.open("/editor/achievement/" + achievementId, achievementId, 'width=1040,height=900,left=1600,top=0,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
    childWindow.achievementSavedCallback = function(event) {
      return node.callbacks.achievementUpdated({
        achievement: event.achievement
      }, node);
    };
    childWindow.focus();
    return event.stopPropagation();
  });
  return valEl.find('.treema-shortened').append(anchor);
};
});

;
//# sourceMappingURL=/javascripts/app/views/editor/campaign/CampaignEditorView.js.map
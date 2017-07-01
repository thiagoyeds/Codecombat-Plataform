require.register("templates/play/modal/leaderboard-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),levelName = locals_.levelName,submenus = locals_.submenus;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/leaderboard-background.png\" draggable=\"false\" id=\"leaderboard-background\"/><h1 class=\"level-title\">" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><ul id=\"leaderboard-nav\" class=\"nav nav-pills nav-stacked\">");
var lastScoreType = null;
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

if ( lastScoreType && submenu.scoreType != lastScoreType)
{
buf.push("<br/>");
}
buf.push("<li" + (jade.attrs({ "class": [(index ? "" : "active")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu.scoreType + '-' + submenu.timespan + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + ">");
if ( submenu.scoreType != lastScoreType)
{
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.scoreType.replace('-', '_')), "class": [('scoreType')] }, {"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = submenu.scoreType) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"scoreType\">&nbsp;</div>");
}
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.timespan), "class": [('timespan')] }, {"data-i18n":true})) + "></div>");
lastScoreType = submenu.scoreType;
buf.push("</a></li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

if ( lastScoreType && submenu.scoreType != lastScoreType)
{
buf.push("<br/>");
}
buf.push("<li" + (jade.attrs({ "class": [(index ? "" : "active")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu.scoreType + '-' + submenu.timespan + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + ">");
if ( submenu.scoreType != lastScoreType)
{
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.scoreType.replace('-', '_')), "class": [('scoreType')] }, {"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = submenu.scoreType) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"scoreType\">&nbsp;</div>");
}
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.timespan), "class": [('timespan')] }, {"data-i18n":true})) + "></div>");
lastScoreType = submenu.scoreType;
buf.push("</a></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"tab-content leaderboard-tab-content\">");
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu.scoreType + '-' + submenu.timespan + '-view'), "class": [('tab-pane')] }, {"id":true})) + "><div class=\"leaderboard-tab-view\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu.scoreType + '-' + submenu.timespan + '-view'), "class": [('tab-pane')] }, {"id":true})) + "><div class=\"leaderboard-tab-view\"></div></div>");
    }

  }
}).call(this);

buf.push("</div></div></div>");;return buf.join("");
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

;require.register("views/play/modal/LeaderboardModal", function(exports, require, module) {
var LeaderboardModal, LeaderboardTabView, Level, ModalView, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/leaderboard-modal');

LeaderboardTabView = require('views/play/modal/LeaderboardTabView');

Level = require('models/Level');

utils = require('core/utils');

module.exports = LeaderboardModal = (function(superClass) {
  extend(LeaderboardModal, superClass);

  LeaderboardModal.prototype.id = 'leaderboard-modal';

  LeaderboardModal.prototype.template = template;

  LeaderboardModal.prototype.instant = true;

  LeaderboardModal.prototype.timespans = ['day', 'week', 'all'];

  LeaderboardModal.prototype.subscriptions = {};

  LeaderboardModal.prototype.events = {
    'shown.bs.tab #leaderboard-nav a': 'onTabShown',
    'click #close-modal': 'hide'
  };

  function LeaderboardModal(options) {
    var level;
    LeaderboardModal.__super__.constructor.call(this, options);
    this.levelSlug = this.options.levelSlug;
    level = new Level({
      _id: this.levelSlug
    });
    level.project = ['name', 'i18n', 'scoreType', 'original'];
    this.level = this.supermodel.loadModel(level).model;
  }

  LeaderboardModal.prototype.getRenderData = function(c) {
    var i, j, len, len1, ref, ref1, ref2, scoreType, timespan;
    c = LeaderboardModal.__super__.getRenderData.call(this, c);
    c.submenus = [];
    ref1 = (ref = this.level.get('scoreTypes')) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      scoreType = ref1[i];
      ref2 = this.timespans;
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        timespan = ref2[j];
        c.submenus.push({
          scoreType: scoreType,
          timespan: timespan
        });
      }
    }
    c.levelName = utils.i18n(this.level.attributes, 'name');
    return c;
  };

  LeaderboardModal.prototype.afterRender = function() {
    var i, j, len, len1, ref, ref1, ref2, scoreType, scoreTypeIndex, submenuView, timespan, timespanIndex;
    LeaderboardModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    ref1 = (ref = this.level.get('scoreTypes')) != null ? ref : [];
    for (scoreTypeIndex = i = 0, len = ref1.length; i < len; scoreTypeIndex = ++i) {
      scoreType = ref1[scoreTypeIndex];
      ref2 = this.timespans;
      for (timespanIndex = j = 0, len1 = ref2.length; j < len1; timespanIndex = ++j) {
        timespan = ref2[timespanIndex];
        submenuView = new LeaderboardTabView({
          scoreType: scoreType,
          timespan: timespan,
          level: this.level
        });
        this.insertSubView(submenuView, this.$el.find("#" + scoreType + "-" + timespan + "-view .leaderboard-tab-view"));
        if (scoreTypeIndex + timespanIndex === 0) {
          submenuView.$el.parent().addClass('active');
          if (typeof submenuView.onShown === "function") {
            submenuView.onShown();
          }
        }
      }
    }
    this.playSound('game-menu-open');
    return this.$el.find('.nano:visible').nanoScroller();
  };

  LeaderboardModal.prototype.onTabShown = function(e) {
    var otherSubview, ref, results, scoreType, subview, subviewKey, tabChunks, timespan;
    this.playSound('game-menu-tab-switch');
    tabChunks = e.target.hash.substring(1).split('-');
    scoreType = tabChunks.slice(0, tabChunks.length - 2).join('-');
    timespan = tabChunks[tabChunks.length - 2];
    subview = _.find(this.subviews, {
      scoreType: scoreType,
      timespan: timespan
    });
    if (typeof subview.onShown === "function") {
      subview.onShown();
    }
    ref = this.subviews;
    results = [];
    for (subviewKey in ref) {
      otherSubview = ref[subviewKey];
      if (otherSubview !== subview) {
        results.push(typeof otherSubview.onHidden === "function" ? otherSubview.onHidden() : void 0);
      }
    }
    return results;
  };

  LeaderboardModal.prototype.onHidden = function() {
    var ref, subview, subviewKey;
    LeaderboardModal.__super__.onHidden.call(this);
    ref = this.subviews;
    for (subviewKey in ref) {
      subview = ref[subviewKey];
      if (typeof subview.onHidden === "function") {
        subview.onHidden();
      }
    }
    return this.playSound('game-menu-close');
  };

  return LeaderboardModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/LeaderboardModal.js.map
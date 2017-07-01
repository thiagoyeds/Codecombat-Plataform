require.register("templates/artisans/level-tasks-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;var levelRow_mixin = function(level, slug){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<tr><td class=\"taskOwner\"><a" + (jade.attrs({ 'href':('/editor/level/' + slug) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = level.name) ? "" : jade.interp)) + "</a></td><td class=\"tasks\"><table class=\"table-striped table-hover tasksTable\">");
// iterate (level.tasks || [])
;(function(){
  var $$obj = (level.tasks || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

if ( !task.complete)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</td></tr>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

if ( !task.complete)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</td></tr>");
}
    }

  }
}).call(this);

buf.push("</table></td></tr>");
};
buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div id=\"level-tasks-view\"><div><a href=\"/artisans\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span>Artisans Home</span></a></div><br/><input id=\"name-search\" placeholder=\"Filter: Level Name\" class=\"searchInput\"/><br/><input id=\"desc-search\" placeholder=\"Filter: Task Description\" class=\"searchInput\"/><hr/><div id=\"level-table\">");
if ( view.processedLevels)
{
buf.push("<table class=\"table table-striped\"><tr><th>Level Name</th><th>Task List</th></tr>");
// iterate view.processedLevels
;(function(){
  var $$obj = view.processedLevels;
  if ('number' == typeof $$obj.length) {

    for (var slug = 0, $$l = $$obj.length; slug < $$l; slug++) {
      var level = $$obj[slug];

if ( view.hasIncompleteTasks(level))
{
levelRow_mixin(level, slug);
}
    }

  } else {
    var $$l = 0;
    for (var slug in $$obj) {
      $$l++;      var level = $$obj[slug];

if ( view.hasIncompleteTasks(level))
{
levelRow_mixin(level, slug);
}
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<div>No view.processedLevels</div>");
}
buf.push("</div></div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("views/artisans/LevelTasksView", function(exports, require, module) {
var Campaign, Campaigns, LevelTasksView, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/artisans/level-tasks-view');

Campaigns = require('collections/Campaigns');

Campaign = require('models/Campaign');

module.exports = LevelTasksView = (function(superClass) {
  var excludedCampaigns;

  extend(LevelTasksView, superClass);

  function LevelTasksView() {
    return LevelTasksView.__super__.constructor.apply(this, arguments);
  }

  LevelTasksView.prototype.template = template;

  LevelTasksView.prototype.id = 'level-tasks-view';

  LevelTasksView.prototype.events = {
    'input .searchInput': 'processLevels',
    'change .searchInput': 'processLevels'
  };

  excludedCampaigns = ['picoctf', 'auditions', 'dungeon-branching-test', 'forest-branching-test', 'desert-branching-test'];

  LevelTasksView.prototype.initialize = function() {
    this.levels = {};
    this.campaigns = new Campaigns();
    return this.supermodel.trackRequest(this.campaigns.fetchCampaignsAndRelatedLevels({
      excludes: excludedCampaigns
    }));
  };

  LevelTasksView.prototype.onLoaded = function() {
    var campaign, i, j, len, len1, level, levelSlug, ref, ref1;
    ref = this.campaigns.models;
    for (i = 0, len = ref.length; i < len; i++) {
      campaign = ref[i];
      ref1 = campaign.levels.models;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        level = ref1[j];
        levelSlug = level.get('slug');
        this.levels[levelSlug] = level;
      }
    }
    this.processLevels();
    return LevelTasksView.__super__.onLoaded.call(this);
  };

  LevelTasksView.prototype.processLevels = function() {
    var filteredTasks, key, level, name, ref, tasks;
    this.processedLevels = {};
    ref = this.levels;
    for (key in ref) {
      level = ref[key];
      tasks = level.get('tasks');
      name = level.get('name');
      if (this.processedLevels[key]) {
        continue;
      }
      if (!RegExp("" + ($('#name-search')[0].value), "i").test(name)) {
        continue;
      }
      filteredTasks = (tasks != null ? tasks : []).filter(function(elem) {
        return RegExp("" + ($('#desc-search')[0].value), "i").test(elem.name);
      });
      this.processedLevels[key] = {
        tasks: filteredTasks,
        name: name
      };
    }
    return this.renderSelectors('#level-table');
  };

  LevelTasksView.prototype.hasIncompleteTasks = function(level) {
    return level.tasks && level.tasks.filter(function(_elem) {
      return !_elem.complete;
    }).length > 0;
  };

  return LevelTasksView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/artisans/LevelTasksView.js.map
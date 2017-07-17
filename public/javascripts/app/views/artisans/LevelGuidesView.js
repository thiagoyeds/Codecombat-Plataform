require.register("templates/artisans/level-guides-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div><a href=\"/artisans\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span>Artisans Home</span></a></div><button id=\"overview-button\">Show Overviews</button><br/><button id=\"intro-button\">Show Intros</button><table id=\"level-table\" class=\"table\">");
// iterate (view.levels || [])
;(function(){
  var $$obj = (view.levels || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var levelObj = $$obj[$index];

var level = levelObj.level
buf.push("<tr><td class=\"level-details\"><a" + (jade.attrs({ 'href':('/editor/level/'+level.get('slug')), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</a><div><ul>");
// iterate levelObj.problems
;(function(){
  var $$obj = levelObj.problems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var problem = $$obj[$index];

buf.push("<li class=\"problem\">" + (jade.escape(null == (jade.interp = problem) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var problem = $$obj[$index];

buf.push("<li class=\"problem\">" + (jade.escape(null == (jade.interp = problem) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ul></div></td><td style=\"width:90%\">");
if ( levelObj.overview)
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h2 class=\"panel-title\"><a" + (jade.attrs({ 'data-toggle':('collapse'), 'href':('#'+level.get('slug')+'-overview-collapse') }, {"data-toggle":true,"href":true})) + ">Overview</a></h2></div><div" + (jade.attrs({ 'id':(level.get('slug')+'-overview-collapse'), "class": [('panel-collapse'),('collapse'),('overview')] }, {"id":true})) + "><pre>" + (jade.escape(null == (jade.interp = levelObj.overview.body) ? "" : jade.interp)) + "</pre></div></div>");
}
if ( levelObj.intro)
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h2 class=\"panel-title\"><a" + (jade.attrs({ 'data-toggle':('collapse'), 'href':('#'+level.get('slug')+'-intro-collapse') }, {"data-toggle":true,"href":true})) + ">Intro</a></h2></div><div" + (jade.attrs({ 'id':(level.get('slug')+'-intro-collapse'), "class": [('panel-collapse'),('collapse'),('intro')] }, {"id":true})) + "><pre>" + (jade.escape(null == (jade.interp = levelObj.intro.body) ? "" : jade.interp)) + "</pre></div></div>");
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var levelObj = $$obj[$index];

var level = levelObj.level
buf.push("<tr><td class=\"level-details\"><a" + (jade.attrs({ 'href':('/editor/level/'+level.get('slug')), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</a><div><ul>");
// iterate levelObj.problems
;(function(){
  var $$obj = levelObj.problems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var problem = $$obj[$index];

buf.push("<li class=\"problem\">" + (jade.escape(null == (jade.interp = problem) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var problem = $$obj[$index];

buf.push("<li class=\"problem\">" + (jade.escape(null == (jade.interp = problem) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ul></div></td><td style=\"width:90%\">");
if ( levelObj.overview)
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h2 class=\"panel-title\"><a" + (jade.attrs({ 'data-toggle':('collapse'), 'href':('#'+level.get('slug')+'-overview-collapse') }, {"data-toggle":true,"href":true})) + ">Overview</a></h2></div><div" + (jade.attrs({ 'id':(level.get('slug')+'-overview-collapse'), "class": [('panel-collapse'),('collapse'),('overview')] }, {"id":true})) + "><pre>" + (jade.escape(null == (jade.interp = levelObj.overview.body) ? "" : jade.interp)) + "</pre></div></div>");
}
if ( levelObj.intro)
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h2 class=\"panel-title\"><a" + (jade.attrs({ 'data-toggle':('collapse'), 'href':('#'+level.get('slug')+'-intro-collapse') }, {"data-toggle":true,"href":true})) + ">Intro</a></h2></div><div" + (jade.attrs({ 'id':(level.get('slug')+'-intro-collapse'), "class": [('panel-collapse'),('collapse'),('intro')] }, {"id":true})) + "><pre>" + (jade.escape(null == (jade.interp = levelObj.intro.body) ? "" : jade.interp)) + "</pre></div></div>");
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</table></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("views/artisans/LevelGuidesView", function(exports, require, module) {
var Campaign, Campaigns, Level, LevelGuidesView, Levels, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/artisans/level-guides-view');

Campaigns = require('collections/Campaigns');

Campaign = require('models/Campaign');

Levels = require('collections/Levels');

Level = require('models/Level');

module.exports = LevelGuidesView = (function(superClass) {
  var excludedCampaigns, includedCampaigns;

  extend(LevelGuidesView, superClass);

  function LevelGuidesView() {
    return LevelGuidesView.__super__.constructor.apply(this, arguments);
  }

  LevelGuidesView.prototype.template = template;

  LevelGuidesView.prototype.id = 'level-guides-view';

  LevelGuidesView.prototype.events = {
    'click #overview-button': 'onOverviewButtonClicked',
    'click #intro-button': 'onIntroButtonClicked'
  };

  excludedCampaigns = ['pico-ctf', 'auditions'];

  includedCampaigns = ['intro', 'course-2', 'course-3', 'course-4', 'course-5', 'course-6', 'web-dev-1', 'web-dev-2', 'game-dev-1', 'game-dev-2'];

  LevelGuidesView.prototype.levels = [];

  LevelGuidesView.prototype.onOverviewButtonClicked = function(e) {
    return this.$('.overview').toggleClass('in');
  };

  LevelGuidesView.prototype.onIntroButtonClicked = function(e) {
    return this.$('.intro').toggleClass('in');
  };

  LevelGuidesView.prototype.initialize = function() {
    this.campaigns = new Campaigns();
    this.listenTo(this.campaigns, 'sync', this.onCampaignsLoaded);
    return this.supermodel.trackRequest(this.campaigns.fetch({
      data: {
        project: 'name,slug,levels'
      }
    }));
  };

  LevelGuidesView.prototype.onCampaignsLoaded = function(campCollection) {
    var camp, campaignSlug, i, len, levels, ref, results;
    ref = campCollection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      camp = ref[i];
      campaignSlug = camp.get('slug');
      if (indexOf.call(excludedCampaigns, campaignSlug) >= 0) {
        continue;
      }
      if (indexOf.call(includedCampaigns, campaignSlug) < 0) {
        continue;
      }
      levels = camp.get('levels');
      levels = new Levels();
      this.listenTo(levels, 'sync', this.onLevelsLoaded);
      results.push(levels.fetchForCampaign(campaignSlug));
    }
    return results;
  };

  LevelGuidesView.prototype.onLevelsLoaded = function(lvlCollection) {
    var i, intro, jsIndex, len, level, levelSlug, overview, problems, pyIndex, ref, ref1, ref2;
    lvlCollection.models.reverse();
    ref = lvlCollection.models;
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      levelSlug = level.get('slug');
      overview = _.find(level.get('documentation').specificArticles, {
        name: 'Overview'
      });
      intro = _.find(level.get('documentation').specificArticles, {
        name: 'Intro'
      });
      problems = [];
      if (!overview) {
        problems.push('No Overview');
      } else {
        if (!overview.i18n) {
          problems.push('Overview doesn\'t have i18n field');
        }
        if (!overview.body) {
          problems.push('Overview doesn\'t have a body');
        } else {
          if (((ref1 = level.get('campaign')) != null ? ref1.indexOf('web') : void 0) === -1) {
            jsIndex = overview.body.indexOf('```javascript');
            pyIndex = overview.body.indexOf('```python');
            if (jsIndex === -1 && pyIndex !== -1 || jsIndex !== -1 && pyIndex === -1) {
              problems.push('Overview is missing a language example.');
            }
          }
        }
      }
      if (!intro) {
        problems.push('No Intro');
      } else {
        if (!intro.i18n) {
          problems.push('Intro doesn\'t have i18n field');
        }
        if (!intro.body) {
          problems.push('Intro doesn\'t have a body');
        } else {
          if (intro.body.indexOf('file/db') === -1) {
            problems.push('Intro is missing image');
          }
          if (((ref2 = level.get('campaign')) != null ? ref2.indexOf('web') : void 0) === -1) {
            jsIndex = intro.body.indexOf('```javascript');
            pyIndex = intro.body.indexOf('```python');
            if (jsIndex === -1 && pyIndex !== -1 || jsIndex !== -1 && pyIndex === -1) {
              problems.push('Intro is missing a language example.');
            }
          }
        }
      }
      this.levels.push({
        level: level,
        overview: overview,
        intro: intro,
        problems: problems
      });
      this.levels.sort(function(a, b) {
        return b.problems.length - a.problems.length;
      });
    }
    return this.renderSelectors('#level-table');
  };

  return LevelGuidesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/artisans/LevelGuidesView.js.map
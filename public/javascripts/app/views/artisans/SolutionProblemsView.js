require.register("templates/artisans/solution-problems-view", function(exports, require, module) {
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div id=\"solution-problems-view\"><div><a href=\"/artisans\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span>Artisans Home</span></a></div><br/><div>Total number of problems: " + (jade.escape((jade.interp = view.problemCount) == null ? '' : jade.interp)) + "</div><hr/><table id=\"level-table\" class=\"table table-striped\"><tr><th>Level Name</th><th>Solution Problems</th></tr>");
// iterate (view.parsedLevels || [])
;(function(){
  var $$obj = (view.parsedLevels || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

if ( (level.problems || []).length != 0)
{
buf.push("<tr><td style=\"width:10%\">" + (jade.escape(null == (jade.interp = level.level.get('name')) ? "" : jade.interp)) + "</td><td><table class=\"table-striped table-hover problemsTable\">");
// iterate (level.problems || [])
;(function(){
  var $$obj = (level.problems || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var problem = $$obj[$index];

buf.push("<tr style=\"width:100%\"><td class=\"problemValue\">" + (jade.escape(null == (jade.interp = problem.value) ? "" : jade.interp)) + "</td><td class=\"problemType\">" + (jade.escape(null == (jade.interp = problem.type) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var problem = $$obj[$index];

buf.push("<tr style=\"width:100%\"><td class=\"problemValue\">" + (jade.escape(null == (jade.interp = problem.value) ? "" : jade.interp)) + "</td><td class=\"problemType\">" + (jade.escape(null == (jade.interp = problem.type) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table></td></tr>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

if ( (level.problems || []).length != 0)
{
buf.push("<tr><td style=\"width:10%\">" + (jade.escape(null == (jade.interp = level.level.get('name')) ? "" : jade.interp)) + "</td><td><table class=\"table-striped table-hover problemsTable\">");
// iterate (level.problems || [])
;(function(){
  var $$obj = (level.problems || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var problem = $$obj[$index];

buf.push("<tr style=\"width:100%\"><td class=\"problemValue\">" + (jade.escape(null == (jade.interp = problem.value) ? "" : jade.interp)) + "</td><td class=\"problemType\">" + (jade.escape(null == (jade.interp = problem.type) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var problem = $$obj[$index];

buf.push("<tr style=\"width:100%\"><td class=\"problemValue\">" + (jade.escape(null == (jade.interp = problem.value) ? "" : jade.interp)) + "</td><td class=\"problemType\">" + (jade.escape(null == (jade.interp = problem.type) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table></td></tr>");
}
    }

  }
}).call(this);

buf.push("</table></div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("views/artisans/SolutionProblemsView", function(exports, require, module) {
var Campaign, Campaigns, CocoCollection, Level, Levels, RootView, SolutionProblemsView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/artisans/solution-problems-view');

Level = require('models/Level');

Campaign = require('models/Campaign');

CocoCollection = require('collections/CocoCollection');

Campaigns = require('collections/Campaigns');

Levels = require('collections/Levels');

module.exports = SolutionProblemsView = (function(superClass) {
  var excludedCampaigns, excludedLanguages, excludedLevelSnippets, excludedSimulationLevels, excludedSolutionLevels, includedLanguages, simulationRequirements;

  extend(SolutionProblemsView, superClass);

  function SolutionProblemsView() {
    return SolutionProblemsView.__super__.constructor.apply(this, arguments);
  }

  SolutionProblemsView.prototype.template = template;

  SolutionProblemsView.prototype.id = 'solution-problems-view';

  excludedCampaigns = ['picoctf', 'auditions', 'dungeon-branching-test', 'forest-branching-test', 'desert-branching-test'];

  excludedSimulationLevels = ['wakka-maul', 'cross-bones'];

  excludedSolutionLevels = ['cavern-survival', 'dueling-grounds', 'multiplayer-treasure-grove', 'harrowland', 'zero-sum', 'ace-of-coders', 'capture-their-flag'];

  simulationRequirements = ['seed', 'succeeds', 'heroConfig', 'frameCount', 'goals'];

  includedLanguages = ['python', 'javascript', 'java', 'lua', 'coffeescript'];

  excludedLanguages = ['java', 'lua', 'coffeescript'];

  excludedLevelSnippets = ['treasure', 'brawl', 'siege'];

  SolutionProblemsView.prototype.unloadedCampaigns = 0;

  SolutionProblemsView.prototype.campaignLevels = {};

  SolutionProblemsView.prototype.loadedLevels = {};

  SolutionProblemsView.prototype.parsedLevels = [];

  SolutionProblemsView.prototype.problemCount = 0;

  SolutionProblemsView.prototype.initialize = function() {
    this.campaigns = new Campaigns([]);
    this.listenTo(this.campaigns, 'sync', this.onCampaignsLoaded);
    return this.supermodel.trackRequest(this.campaigns.fetch({
      data: {
        project: 'slug'
      }
    }));
  };

  SolutionProblemsView.prototype.onCampaignsLoaded = function(campCollection) {
    var campaign, campaignSlug, i, len, ref, results;
    ref = campCollection.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      campaign = ref[i];
      campaignSlug = campaign.get('slug');
      if (indexOf.call(excludedCampaigns, campaignSlug) >= 0) {
        continue;
      }
      this.unloadedCampaigns++;
      this.campaignLevels[campaignSlug] = new Levels();
      this.listenTo(this.campaignLevels[campaignSlug], 'sync', this.onLevelsLoaded);
      results.push(this.supermodel.trackRequest(this.campaignLevels[campaignSlug].fetchForCampaign(campaignSlug, {
        data: {
          project: 'thangs,name,slug,campaign'
        }
      })));
    }
    return results;
  };

  SolutionProblemsView.prototype.onLevelsLoaded = function(lvlCollection) {
    var i, len, level, ref;
    ref = lvlCollection.models;
    for (i = 0, len = ref.length; i < len; i++) {
      level = ref[i];
      this.loadedLevels[level.get('slug')] = level;
    }
    if (--this.unloadedCampaigns === 0) {
      return this.onAllLevelsLoaded();
    }
  };

  SolutionProblemsView.prototype.onAllLevelsLoaded = function() {
    var component, i, isBad, j, len, len1, level, levelSlug, plan, problems, ref, solution, solutions, thangs, word;
    ref = this.loadedLevels;
    for (levelSlug in ref) {
      level = ref[levelSlug];
      if (level == null) {
        console.error('Level Slug doesn\'t have associated Level', levelSlug);
        continue;
      }
      if (indexOf.call(excludedSolutionLevels, levelSlug) >= 0) {
        continue;
      }
      isBad = false;
      for (i = 0, len = excludedLevelSnippets.length; i < len; i++) {
        word = excludedLevelSnippets[i];
        if (levelSlug.indexOf(word) !== -1) {
          isBad = true;
        }
      }
      if (isBad) {
        continue;
      }
      thangs = level.get('thangs');
      component = null;
      thangs = _.filter(thangs, function(elem) {
        return _.findWhere(elem.components, function(elem2) {
          var ref1;
          if (((ref1 = elem2.config) != null ? ref1.programmableMethods : void 0) != null) {
            component = elem2;
            return true;
          }
        });
      });
      if (thangs.length > 1) {
        if (indexOf.call(excludedSimulationLevels, levelSlug) < 0) {
          console.warn('Level has more than 1 programmableMethod Thangs', levelSlug);
        }
        continue;
      }
      if (component == null) {
        console.error('Level doesn\'t have programmableMethod Thang', levelSlug);
        continue;
      }
      plan = component.config.programmableMethods.plan;
      solutions = plan.solutions || [];
      problems = [];
      problems = problems.concat(this.findMissingSolutions(solutions));
      if (indexOf.call(excludedSimulationLevels, levelSlug) < 0) {
        for (j = 0, len1 = solutions.length; j < len1; j++) {
          solution = solutions[j];
          problems = problems.concat(this.findSimulationProblems(solution));
          problems = problems.concat(this.findPass(solution));
          problems = problems.concat(this.findIdenticalToSource(solution, plan));
          problems = problems.concat(this.findTemplateProblems(solution, plan));
        }
      }
      this.problemCount += problems.length;
      this.parsedLevels.push({
        level: level,
        problems: problems
      });
    }
    return this.renderSelectors('#level-table');
  };

  SolutionProblemsView.prototype.findMissingSolutions = function(solutions) {
    var i, lang, len, problems;
    problems = [];
    for (i = 0, len = includedLanguages.length; i < len; i++) {
      lang = includedLanguages[i];
      if (_.findWhere(solutions, function(elem) {
        return elem.language === lang;
      })) {

      } else if (indexOf.call(excludedLanguages, lang) < 0) {
        problems.push({
          type: 'Missing solution language',
          value: lang
        });
      }
    }
    return problems;
  };

  SolutionProblemsView.prototype.findSimulationProblems = function(solution) {
    var i, len, problems, req;
    problems = [];
    for (i = 0, len = simulationRequirements.length; i < len; i++) {
      req = simulationRequirements[i];
      if (solution[req] == null) {
        problems.push({
          type: 'Solution is not simulatable',
          value: solution.language
        });
        break;
      }
    }
    return problems;
  };

  SolutionProblemsView.prototype.findPass = function(solution) {
    var problems;
    problems = [];
    if (solution.source.search(/pass\n/) !== -1) {
      problems.push({
        type: 'Solution contains pass',
        value: solution.language
      });
    }
    return problems;
  };

  SolutionProblemsView.prototype.findIdenticalToSource = function(solution, plan) {
    var problems, source;
    problems = [];
    source = solution.lang === 'javascript' ? plan.source : plan.languages[solution.language];
    if (solution.source === source) {
      problems.push({
        type: 'Solution matches sample code',
        value: solution.language
      });
    }
    return problems;
  };

  SolutionProblemsView.prototype.findTemplateProblems = function(solution, plan) {
    var context, error, error1, problems, source;
    problems = [];
    source = solution.lang === 'javascript' ? plan.source : plan.languages[solution.language];
    context = plan.context;
    try {
      _.template(source, context);
    } catch (error1) {
      error = error1;
      console.log(source, context, error);
      problems.push({
        type: 'Solution template syntax error',
        value: error.message
      });
    }
    return problems;
  };

  return SolutionProblemsView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/artisans/SolutionProblemsView.js.map
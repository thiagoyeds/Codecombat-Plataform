require.register("templates/teachers/teacher-course-solution-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,document = locals_.document,i18n = locals_.i18n;var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li><li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
};
buf.push("<div class=\"style-flat\"><nav id=\"main-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"navbar-header\"><button data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\"><span data-i18n=\"nav.toggle_nav\" class=\"sr-only\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">");
if ( serverConfig.codeNinjas)
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\" class=\"code-ninjas-powered-by\"/><img src=\"/images/pages/base/code-ninjas-logo-right.png\" class=\"code-ninjas-logo\"/>");
}
else
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\"/>");
}
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
if ( (!me.isStudent() && !me.isTeacher()))
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li>");
}
buf.push("<li><a href=\"play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
buf.push("<li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li></ul>");
if ( me.isAnonymous())
{
buf.push("<ul class=\"nav navbar-nav\"><li><a id=\"create-account-link\" data-i18n=\"login.sign_up\" class=\"signup-button\"></a></li><li><a id=\"login-link\" data-i18n=\"login.log_in\" class=\"login-button\"></a></li></ul>");
}
else
{
buf.push("<ul class=\"nav navbar-nav hidden-md hidden-lg\"><li class=\"disabled\"><a><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = me.displayName()) ? "" : jade.interp)) + "</span></a></li>");
accountLinks_mixin();
buf.push("</ul><ul class=\"nav navbar-nav\"><li class=\"dropdown hidden-xs hidden-sm\"><a href=\"#\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle\"><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span data-i18n=\"nav.my_account\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-dropdown-header text-center\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/></a><h5>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h5></li>");
accountLinks_mixin();
buf.push("</ul></li></ul>");
}
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav>");
var path = document.location.pathname
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div><div class=\"do-not-print container\"><span class=\"backlink\"><a href=\"/teachers/courses\">&lt; Back to Course Guides</a></span><div class=\"print\"><div class=\"btn btn-md btn-navy\"><a href=\"javascript:window.print()\"><span class=\"glyphicon glyphicon-print\">&#160;</span>Print this guide</a></div></div></div><div id=\"site-content-area\">");
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><h2 data-i18n=\"teacher.teacher_account_required\" class=\"text-center\"></h2>");
}
else
{
buf.push("<div class=\"text-center\"><img src=\"http://direct.codecombat.com/images/pages/base/logo.png\"/>");
if ( view.course.loaded)
{
buf.push("<h1>" + (jade.escape((jade.interp = i18n(view.course.attributes, 'name')) == null ? '' : jade.interp)) + "</h1><h3>" + (jade.escape((jade.interp = view.prettyLanguage) == null ? '' : jade.interp)) + "</h3><i>" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'description')) ? "" : jade.interp)) + "</i>");
}
buf.push("<br/><br/></div>");
if ( view.levels)
{
// iterate view.levels.models
;(function(){
  var $$obj = view.levels.models;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

buf.push("<h2 class=\"page-break-before\">#" + (jade.escape((jade.interp = view.levelNumberMap[level.get('original')]) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name')) == null ? '' : jade.interp)) + "</h2><h3 data-i18n=\"teacher.level_overview_solutions\"></h3><i>" + (jade.escape((jade.interp = i18n(level.attributes, 'description')) == null ? '' : jade.interp)) + "</i><div><h4 data-i18n=\"common.intro\" class=\"text-center\"></h4>");
if ( level.get('intro'))
{
buf.push("<p>" + (null == (jade.interp = level.get('intro')) ? "" : jade.interp) + "</p>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("<h4 data-i18n=\"common.default_code\" class=\"text-center\"></h4>");
if ( level.get('begin'))
{
buf.push("<pre><code>" + (jade.escape(null == (jade.interp = level.get('begin')) ? "" : jade.interp)) + "</code></pre>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("</div><div class=\"overview\"><br/><h4 data-i18n=\"common.overview\" class=\"text-center\"></h4>");
if ( level.get('guide'))
{
buf.push("<p>" + (null == (jade.interp = level.get('guide')) ? "" : jade.interp) + "</p>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("<h4 class=\"text-center\"><span>" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</span><span data-i18n=\"common.solution\" class=\"spl\"></span></h4>");
if ( level.get('solution'))
{
buf.push("<pre><code>" + (jade.escape(null == (jade.interp = level.get('solution')) ? "" : jade.interp)) + "</code></pre>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("</div><hr/><br/>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

buf.push("<h2 class=\"page-break-before\">#" + (jade.escape((jade.interp = view.levelNumberMap[level.get('original')]) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name')) == null ? '' : jade.interp)) + "</h2><h3 data-i18n=\"teacher.level_overview_solutions\"></h3><i>" + (jade.escape((jade.interp = i18n(level.attributes, 'description')) == null ? '' : jade.interp)) + "</i><div><h4 data-i18n=\"common.intro\" class=\"text-center\"></h4>");
if ( level.get('intro'))
{
buf.push("<p>" + (null == (jade.interp = level.get('intro')) ? "" : jade.interp) + "</p>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("<h4 data-i18n=\"common.default_code\" class=\"text-center\"></h4>");
if ( level.get('begin'))
{
buf.push("<pre><code>" + (jade.escape(null == (jade.interp = level.get('begin')) ? "" : jade.interp)) + "</code></pre>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("</div><div class=\"overview\"><br/><h4 data-i18n=\"common.overview\" class=\"text-center\"></h4>");
if ( level.get('guide'))
{
buf.push("<p>" + (null == (jade.interp = level.get('guide')) ? "" : jade.interp) + "</p>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("<h4 class=\"text-center\"><span>" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</span><span data-i18n=\"common.solution\" class=\"spl\"></span></h4>");
if ( level.get('solution'))
{
buf.push("<pre><code>" + (jade.escape(null == (jade.interp = level.get('solution')) ? "" : jade.interp)) + "</code></pre>");
}
else
{
buf.push("<div class=\"text-center\"><i data-i18n=\"common.coming_soon\"></i></div>");
}
buf.push("</div><hr/><br/>");
    }

  }
}).call(this);

}
}
buf.push("</div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
if ( !me.isStudent())
{
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.schools\"></strong></li><li><a href=\"/teachers/resources/faq\" data-i18n=\"teacher.educator_faq\"></a></li><li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li><li><a href=\"/teachers/resources\" data-i18n=\"nav.resource_hub\"></a></li><li><a href=\"/teachers/demo\" data-i18n=\"new_home.request_demo\"></a></li></ul></div>");
}
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.get_involved\"></strong></li><li><a href=\"/community\" data-i18n=\"nav.community\"></a></li><li><a href=\"/contribute\" data-i18n=\"nav.contribute\"></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("<li><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li><li><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"nav.open_source\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.support\"></strong></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div></div><div id=\"final-footer\" class=\"small text-center\">Copyright ©2016 CodeCombat. All Rights Reserved.<br class=\"hidden-lg hidden-md\"/><img src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><br class=\"hidden-lg hidden-md\"/>");
if ( !me.isStudent())
{
buf.push("<span data-i18n=\"nav.help_pref\" class=\"spr\"></span>");
var supportEmail = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl' ? 'klantenservice@codecombat.nl' : 'team@codecombat.com';
buf.push("<a" + (jade.attrs({ 'href':("mailto:" + supportEmail) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = supportEmail) ? "" : jade.interp)) + "</a><span data-i18n=\"nav.help_suff\" class=\"spl\"></span>");
}
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

;require.register("views/teachers/TeacherCourseSolutionView", function(exports, require, module) {
var CocoCollection, Course, Level, RootView, TeacherCourseSolutionView, ace, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

utils = require('core/utils');

RootView = require('views/core/RootView');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

Level = require('models/Level');

utils = require('core/utils');

ace = require('ace');

module.exports = TeacherCourseSolutionView = (function(superClass) {
  extend(TeacherCourseSolutionView, superClass);

  function TeacherCourseSolutionView() {
    return TeacherCourseSolutionView.__super__.constructor.apply(this, arguments);
  }

  TeacherCourseSolutionView.prototype.id = 'teacher-course-solution-view';

  TeacherCourseSolutionView.prototype.template = require('templates/teachers/teacher-course-solution-view');

  TeacherCourseSolutionView.prototype.getTitle = function() {
    return $.i18n.t('teacher.course_solution');
  };

  TeacherCourseSolutionView.prototype.initialize = function(options, courseID, language1) {
    this.courseID = courseID;
    this.language = language1;
    if (me.isTeacher() || me.isAdmin()) {
      this.prettyLanguage = this.camelCaseLanguage(this.language);
      this.course = new Course({
        _id: this.courseID
      });
      this.supermodel.trackRequest(this.course.fetch());
      this.levels = new CocoCollection([], {
        url: "/db/course/" + this.courseID + "/level-solutions",
        model: Level
      });
      this.supermodel.loadCollection(this.levels, 'levels', {
        cache: false
      });
      this.levelNumberMap = {};
    }
    return TeacherCourseSolutionView.__super__.initialize.call(this, options);
  };

  TeacherCourseSolutionView.prototype.camelCaseLanguage = function(language) {
    if (_.isEmpty(language)) {
      return language;
    }
    if (language === 'javascript') {
      return 'JavaScript';
    }
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  TeacherCourseSolutionView.prototype.hideWrongLanguage = function(s) {
    if (!s) {
      return '';
    }
    return s.replace(/```([a-z]+)[^`]+```/gm, (function(_this) {
      return function(a, l) {
        if (l !== _this.language) {
          return '';
        }
        return a;
      };
    })(this));
  };

  TeacherCourseSolutionView.prototype.onLoaded = function() {
    var articles, comp, error, error1, finalDefaultCode, finalSolutionCode, guide, heroPlaceholder, i, intro, j, len, len1, level, levels, playerCodeTag, programmableMethod, ref, ref1, ref2, ref3, ref4, ref5, solution, solutionPlayerCodeTag, solutionText, translatedDefaultCode;
    ref1 = (ref = this.levels) != null ? ref.models : void 0;
    for (i = 0, len = ref1.length; i < len; i++) {
      level = ref1[i];
      articles = (ref2 = level.get('documentation')) != null ? ref2.specificArticles : void 0;
      if (articles) {
        guide = articles.filter((function(_this) {
          return function(x) {
            return x.name === "Overview";
          };
        })(this)).pop();
        if (guide) {
          level.set('guide', marked(this.hideWrongLanguage(guide.body)));
        }
        intro = articles.filter((function(_this) {
          return function(x) {
            return x.name === "Intro";
          };
        })(this)).pop();
        if (intro) {
          level.set('intro', marked(this.hideWrongLanguage(intro.body)));
        }
      }
      heroPlaceholder = level.get('thangs').filter((function(_this) {
        return function(x) {
          return x.id === 'Hero Placeholder';
        };
      })(this)).pop();
      comp = heroPlaceholder != null ? heroPlaceholder.components.filter((function(_this) {
        return function(x) {
          return x.original.toString() === '524b7b5a7fc0f6d51900000e';
        };
      })(this)).pop() : void 0;
      programmableMethod = comp != null ? comp.config.programmableMethods.plan : void 0;
      if (programmableMethod) {
        translatedDefaultCode = _.template(programmableMethod.languages[level.get('primerLanguage') || this.language] || programmableMethod.source)(programmableMethod.context);
        playerCodeTag = utils.extractPlayerCodeTag(translatedDefaultCode);
        finalDefaultCode = playerCodeTag ? playerCodeTag : translatedDefaultCode;
        level.set('begin', finalDefaultCode);
        solution = _.find(programmableMethod.solutions, (function(_this) {
          return function(x) {
            return x.language === (level.get('primerLanguage') || _this.language);
          };
        })(this));
        try {
          solutionText = _.template(solution != null ? solution.source : void 0)(programmableMethod.context);
        } catch (error1) {
          error = error1;
          solutionText = solution != null ? solution.source : void 0;
          console.error("Couldn't create solution template of", solution != null ? solution.source : void 0, "\nwith context", programmableMethod.context, "\nError:", error);
        }
        solutionPlayerCodeTag = utils.extractPlayerCodeTag(solutionText);
        finalSolutionCode = solutionPlayerCodeTag ? solutionPlayerCodeTag : solutionText;
        level.set('solution', finalSolutionCode);
      }
    }
    levels = [];
    ref4 = (ref3 = this.levels) != null ? ref3.models : void 0;
    for (j = 0, len1 = ref4.length; j < len1; j++) {
      level = ref4[j];
      if (!(level.get('original'))) {
        continue;
      }
      if ((this.language != null) && level.get('primerLanguage') === this.language) {
        continue;
      }
      levels.push({
        key: level.get('original'),
        practice: (ref5 = level.get('practice')) != null ? ref5 : false
      });
    }
    this.levelNumberMap = utils.createLevelNumberMap(levels);
    return typeof this.render === "function" ? this.render() : void 0;
  };

  TeacherCourseSolutionView.prototype.afterRender = function() {
    var lang;
    TeacherCourseSolutionView.__super__.afterRender.call(this);
    lang = this.language;
    return this.$el.find('pre>code').each(function() {
      var aceEditor, c, els;
      els = $(this);
      c = els.parent();
      aceEditor = utils.initializeACE(c[0], lang);
      aceEditor.setShowInvisibles(false);
      aceEditor.setBehavioursEnabled(false);
      aceEditor.setAnimatedScroll(false);
      return aceEditor.$blockScrolling = Infinity;
    });
  };

  return TeacherCourseSolutionView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/TeacherCourseSolutionView.js.map
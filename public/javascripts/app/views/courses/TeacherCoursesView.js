require.register("templates/courses/teacher-courses-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document;var course_info_mixin = function(course){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
var campaign = view.campaigns.get(course.get('campaignID'));
buf.push("<div class=\"course-info\"><div class=\"text-h4 semibold\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><p>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'description')) ? "" : jade.interp)) + "</p><p class=\"concepts semibold\"><span data-i18n=\"courses.concepts_covered\"></span>:");
// iterate course.get('concepts')
;(function(){
  var $$obj = course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></span>");
if ( course.get('concepts').indexOf(concept) !== course.get('concepts').length - 1)
{
buf.push("<span class=\"spr\">,</span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></span>");
if ( course.get('concepts').indexOf(concept) !== course.get('concepts').length - 1)
{
buf.push("<span class=\"spr\">,</span>");
}
    }

  }
}).call(this);

buf.push("</p>");
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<p><i data-i18n=\"courses.web_dev_language_transition\"></i></p>");
}
if ( me.isTeacher() || view.ownedClassrooms.size() || me.isAdmin())
{
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_1)
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/html")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; HTML</a>");
}
else if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/html")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; HTML / JavaScript</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/javascript")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide JavaScript"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; JavaScript</a><a" + (jade.attrs({ 'href':(("/teachers/course-solution/" + course.id + "/python")), 'data-course-id':(course.id), 'data-course-name':(course.get('name')), 'data-event-action':("Classes Guides Guide Python"), "class": [('guide-btn'),('btn'),('btn-primary'),((me.isTeacher() || me.isAdmin() ? '': 'disabled'))] }, {"class":true,"href":true,"data-course-id":true,"data-course-name":true,"data-event-action":true})) + "><span data-i18n=\"courses.view_guide_online\"></span> &mdash; Python</a>");
}
}
buf.push("</div>");
};
var accountLinks_mixin = function(){
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
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div><div id=\"site-content-area\">");
if ( !me.isTeacher() && view.ownedClassrooms.size() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><a href=\"/teachers/update-account\" class=\"btn btn-primary btn-lg\">Upgrade to teacher account</a></div></div>");
}
buf.push("<div class=\"container\"><h1 data-i18n=\"nav.courses\"></h1><h2 data-i18n=\"courses.subtitle\"></h2></div><div class=\"courses container\">");
var courses = view.courses.models;
var courseIndex = 0;
while (courseIndex < courses.length)
{
var course = courses[courseIndex];
courseIndex++;
buf.push("<div class=\"course row\"><div class=\"col-sm-9\">");
course_info_mixin(course);
buf.push("</div>");
if ( me.isTeacher() || me.isAdmin())
{
buf.push("<div class=\"col-sm-3\"><div" + (jade.attrs({ 'data-course-id':(course.id), "class": [('play-level-form')] }, {"data-course-id":true})) + "><div class=\"form-group\"><label class=\"control-label\"><span data-i18n=\"courses.select_language\"></span>:<select class=\"language-select form-control\">");
if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_1)
{
buf.push("<option value=\"javascript\">HTML</option>");
}
else if ( course.id === view.utils.courseIDs.WEB_DEVELOPMENT_2)
{
buf.push("<option value=\"javascript\">HTML / JavaScript</option>");
}
else
{
buf.push("<option value=\"python\">Python</option><option value=\"javascript\">JavaScript</option>");
}
buf.push("</select></label></div><div class=\"form-group\"><label class=\"control-label\"><span data-i18n=\"courses.select_level\"></span>:<select class=\"level-select form-control\">");
if ( view.campaigns.loaded)
{
var campaign = view.campaigns.get(course.get('campaignID'))
if ( campaign)
{
// iterate campaign.getLevels().models
;(function(){
  var $$obj = campaign.getLevels().models;
  if ('number' == typeof $$obj.length) {

    for (var levelIndex = 0, $$l = $$obj.length; levelIndex < $$l; levelIndex++) {
      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<option" + (jade.attrs({ 'value':(level.get('slug')) }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">.</span><span>" + (jade.escape(null == (jade.interp = level.get('name').replace('Course: ', '')) ? "" : jade.interp)) + "</span></option>");
    }

  } else {
    var $$l = 0;
    for (var levelIndex in $$obj) {
      $$l++;      var level = $$obj[levelIndex];

var levelNumber = campaign.getLevelNumber(level.get('original'), levelIndex + 1)
buf.push("<option" + (jade.attrs({ 'value':(level.get('slug')) }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">.</span><span>" + (jade.escape(null == (jade.interp = level.get('name').replace('Course: ', '')) ? "" : jade.interp)) + "</span></option>");
    }

  }
}).call(this);

}
}
buf.push("</select></label></div><a class=\"play-level-button btn btn-lg btn-primary\"><span data-i18n=\"courses.play_level\"></span></a></div><div class=\"clearfix\"></div></div>");
}
buf.push("</div>");
}
buf.push("</div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("views/courses/TeacherCoursesView", function(exports, require, module) {
var Campaigns, Classroom, Classrooms, CocoCollection, CocoModel, CourseInstance, Courses, HeroSelectModal, RootView, TeacherCoursesView, User, app, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CocoCollection = require('collections/CocoCollection');

CocoModel = require('models/CocoModel');

Courses = require('collections/Courses');

Campaigns = require('collections/Campaigns');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

User = require('models/User');

CourseInstance = require('models/CourseInstance');

RootView = require('views/core/RootView');

template = require('templates/courses/teacher-courses-view');

HeroSelectModal = require('views/courses/HeroSelectModal');

module.exports = TeacherCoursesView = (function(superClass) {
  extend(TeacherCoursesView, superClass);

  function TeacherCoursesView() {
    return TeacherCoursesView.__super__.constructor.apply(this, arguments);
  }

  TeacherCoursesView.prototype.id = 'teacher-courses-view';

  TeacherCoursesView.prototype.template = template;

  TeacherCoursesView.prototype.events = {
    'click .guide-btn': 'onClickGuideButton',
    'click .play-level-button': 'onClickPlayLevel'
  };

  TeacherCoursesView.prototype.getTitle = function() {
    return $.i18n.t('teacher.courses');
  };

  TeacherCoursesView.prototype.initialize = function(options) {
    var ref;
    TeacherCoursesView.__super__.initialize.call(this, options);
    this.utils = require('core/utils');
    this.ownedClassrooms = new Classrooms();
    this.ownedClassrooms.fetchMine({
      data: {
        project: '_id'
      }
    });
    this.supermodel.trackCollection(this.ownedClassrooms);
    this.courses = new Courses();
    if (me.isAdmin()) {
      this.supermodel.trackRequest(this.courses.fetch());
    } else {
      this.supermodel.trackRequest(this.courses.fetchReleased());
    }
    this.campaigns = new Campaigns();
    this.supermodel.trackRequest(this.campaigns.fetchByType('course', {
      data: {
        project: 'levels,levelsUpdated'
      }
    }));
    return (ref = window.tracker) != null ? ref.trackEvent('Classes Guides Loaded', {
      category: 'Teachers'
    }, ['Mixpanel']) : void 0;
  };

  TeacherCoursesView.prototype.onClickGuideButton = function(e) {
    var courseID, courseName, eventAction, ref;
    courseID = $(e.currentTarget).data('course-id');
    courseName = $(e.currentTarget).data('course-name');
    eventAction = $(e.currentTarget).data('event-action');
    return (ref = window.tracker) != null ? ref.trackEvent(eventAction, {
      category: 'Teachers',
      courseID: courseID,
      courseName: courseName
    }, ['Mixpanel']) : void 0;
  };

  TeacherCoursesView.prototype.onClickPlayLevel = function(e) {
    var courseID, firstLevelSlug, form, language, levelSlug, ref, url;
    form = $(e.currentTarget).closest('.play-level-form');
    levelSlug = form.find('.level-select').val();
    courseID = form.data('course-id');
    language = form.find('.language-select').val() || 'javascript';
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Classes Guides Play Level', {
        category: 'Teachers',
        courseID: courseID,
        language: language,
        levelSlug: levelSlug
      }, ['Mixpanel']);
    }
    url = "/play/level/" + levelSlug + "?course=" + courseID + "&codeLanguage=" + language;
    firstLevelSlug = this.campaigns.get(this.courses.at(0).get('campaignID')).getLevels().at(0).get('slug');
    if (levelSlug === firstLevelSlug) {
      return this.listenToOnce(this.openModalView(new HeroSelectModal()), {
        'hidden': function() {
          return application.router.navigate(url, {
            trigger: true
          });
        }
      });
    } else {
      return application.router.navigate(url, {
        trigger: true
      });
    }
  };

  return TeacherCoursesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/TeacherCoursesView.js.map
require.register("templates/courses/teacher-classes-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),courseInstance = locals_.courseInstance,view = locals_.view,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document,_ = locals_._;var archivedClassRow_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"class row\"><div class=\"col-xs-10\"><span>" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</span></div><div class=\"col-xs-2\"><div class=\"class-links pull-right\"><a" + (jade.attrs({ 'data-i18n':('teacher.unarchive_class'), 'data-classroom-id':(classroom.id), "class": [('unarchive-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true})) + "></a></div></div></div>");
};
var progressDotLabel_mixin = function(label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"dot-label text-h6\">" + (jade.escape(null == (jade.interp = label) ? "" : jade.interp)) + "</div>");
};
var progressDot_mixin = function(classroom, course, label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
courseInstance = view.courseInstances.findWhere({ courseID: course.id, classroomID: classroom.id })
var total = classroom.get('members').length
var complete = 0;
var dotClass = '';
var started = 0;
if ( courseInstance)
{
complete = courseInstance.numCompleted
started = courseInstance.started
dotClass = complete === total ? 'forest' : started ? 'gold' : '';
}
var progressDotContext = {total: total, complete: complete};
buf.push("<div" + (jade.attrs({ 'data-title':(view.progressDotTemplate(progressDotContext)), "class": [('progress-dot'),(dotClass)] }, {"class":true,"data-title":true})) + ">");
progressDotLabel_mixin(label);
buf.push("</div>");
};
var createClassButton_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"create-class\"><div class=\"text-center\"><a data-i18n=\"teacher.create_new_class\" class=\"create-classroom-btn btn btn-lg btn-primary\"></a></div></div>");
};
var addStudentsButton_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"add-students\"><div class=\"text-center\"><div data-i18n=\"teacher.no_students_yet_view_class\" class=\"small-details\"></div></div></div>");
};
var classRow_mixin = function(classroom){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"class row\"><div class=\"class-details-col\"><div class=\"text-h4 semibold\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"language small\"><span data-i18n=\"teacher.language\"></span>:&nbsp;<span class=\"language-name\">" + (jade.escape(null == (jade.interp = classroom.capitalLanguage) ? "" : jade.interp)) + "</span></div><div class=\"student-count small\"><span data-i18n=\"courses.students\"></span>:&nbsp;<span>" + (jade.escape(null == (jade.interp = classroom.get('members').length) ? "" : jade.interp)) + "</span></div><div class=\"class-links\"><a" + (jade.attrs({ 'data-i18n':('teacher.view_class'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes View Class Link"), "class": [('view-class-btn'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a><a" + (jade.attrs({ 'data-i18n':('teacher.edit_class_settings'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes Edit Class Started"), "class": [('edit-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a><a" + (jade.attrs({ 'data-i18n':('teacher.archive_class'), 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes Archive Class"), "class": [('archive-classroom'),('text-h6')] }, {"data-i18n":true,"data-classroom-id":true,"data-event-action":true})) + "></a></div></div><div class=\"flex-right\"><div class=\"progress-col\">");
if ( classroom.get('members').length == 0)
{
addStudentsButton_mixin(classroom);
}
else
{
var courses = classroom.getSortedCourses().map(function(c) { return view.courses.get(c._id); });
var courseLabelsArray = view.helper.courseLabelsArray(courses);
// iterate classroom.get('courses') || []
;(function(){
  var $$obj = classroom.get('courses') || [];
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
if ( view.courseInstances.findWhere({ classroomID: classroom.id, courseID: course.id }))
{
var label = courseLabelsArray[index];
progressDot_mixin(classroom, course, label);
}
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var trimCourse = $$obj[index];

var course = view.courses.get(trimCourse._id);
if ( view.courseInstances.findWhere({ classroomID: classroom.id, courseID: course.id }))
{
var label = courseLabelsArray[index];
progressDot_mixin(classroom, course, label);
}
    }

  }
}).call(this);

}
buf.push("</div><div class=\"view-class-arrow\"><a" + (jade.attrs({ 'data-classroom-id':(classroom.id), 'data-event-action':("Teachers Classes View Class Chevron"), "class": [('view-class-arrow-inner'),('glyphicon'),('glyphicon-chevron-right'),('view-class-btn')] }, {"data-classroom-id":true,"data-event-action":true})) + "></a></div></div></div>");
};
var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
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
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
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
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("</ul>");
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
if ( (!me.isTeacher() && !view.classrooms.size()) || me.isAnonymous())
{
buf.push("<div class=\"access-restricted container text-center m-y-3\"><h5 data-i18n=\"teacher.access_restricted\"></h5><p data-i18n=\"teacher.teacher_account_required\"></p>");
if ( me.isAnonymous())
{
buf.push("<div data-i18n=\"login.log_in\" class=\"login-button btn btn-lg btn-primary\"></div><button data-event-action=\"Teachers Classes Create Teacher Account\" data-i18n=\"teacher.create_teacher_account\" class=\"btn btn-lg btn-primary-alt create-teacher-btn\"></button>");
}
else
{
buf.push("<button data-event-action=\"Teachers Classes Convert Teacher Account\" data-i18n=\"teachers_quote.convert_account_title\" class=\"btn btn-lg btn-primary update-teacher-btn\"></button><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
buf.push("</div><div class=\"container\"><div class=\"teacher-account-blurb text-center col-xs-6 col-xs-offset-3 m-y-3\"><h5 data-i18n=\"teacher.what_is_a_teacher_account\"></h5><p data-i18n=\"teacher.teacher_account_explanation\"></p></div></div>");
}
else
{
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><button data-event-action=\"Teachers Classes Convert Teacher Account Temp\" class=\"btn btn-primary btn-lg update-teacher-btn\">Upgrade to teacher account</button></div></div>");
}
buf.push("<div class=\"container\"><h3 data-i18n=\"teacher.current_classes\"></h3></div><div class=\"classes container\"><!-- Loop each class-->");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

if (!( classroom.get('archived')))
{
classRow_mixin(classroom);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

if (!( classroom.get('archived')))
{
classRow_mixin(classroom);
}
    }

  }
}).call(this);

buf.push("</div>");
createClassButton_mixin();
}
var archivedClassrooms = view.classrooms.where({archived: true});
if ( _.size(archivedClassrooms))
{
buf.push("<div class=\"container\"><h3 data-i18n=\"teacher.archived_classes\"></h3><p data-i18n=\"teacher.archived_classes_blurb\"></p></div><div class=\"classes container\">");
// iterate archivedClassrooms
;(function(){
  var $$obj = archivedClassrooms;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

archivedClassRow_mixin(classroom);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

archivedClassRow_mixin(classroom);
    }

  }
}).call(this);

buf.push("</div>");
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

;require.register("views/courses/TeacherClassesView", function(exports, require, module) {
var Campaign, Campaigns, Classroom, ClassroomSettingsModal, Classrooms, CourseInstance, CourseInstances, Courses, InviteToClassroomModal, LevelSessions, RootView, TeacherClassesView, User, helper, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/courses/teacher-classes-view');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

Courses = require('collections/Courses');

Campaign = require('models/Campaign');

Campaigns = require('collections/Campaigns');

LevelSessions = require('collections/LevelSessions');

CourseInstance = require('models/CourseInstance');

CourseInstances = require('collections/CourseInstances');

ClassroomSettingsModal = require('views/courses/ClassroomSettingsModal');

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

User = require('models/User');

utils = require('core/utils');

helper = require('lib/coursesHelper');

module.exports = TeacherClassesView = (function(superClass) {
  extend(TeacherClassesView, superClass);

  function TeacherClassesView() {
    return TeacherClassesView.__super__.constructor.apply(this, arguments);
  }

  TeacherClassesView.prototype.id = 'teacher-classes-view';

  TeacherClassesView.prototype.template = template;

  TeacherClassesView.prototype.helper = helper;

  TeacherClassesView.prototype.events = {
    'click .edit-classroom': 'onClickEditClassroom',
    'click .archive-classroom': 'onClickArchiveClassroom',
    'click .unarchive-classroom': 'onClickUnarchiveClassroom',
    'click .add-students-btn': 'onClickAddStudentsButton',
    'click .create-classroom-btn': 'onClickCreateClassroomButton',
    'click .create-teacher-btn': 'onClickCreateTeacherButton',
    'click .update-teacher-btn': 'onClickUpdateTeacherButton',
    'click .view-class-btn': 'onClickViewClassButton'
  };

  TeacherClassesView.prototype.getTitle = function() {
    return $.i18n.t('teacher.my_classes');
  };

  TeacherClassesView.prototype.initialize = function(options) {
    var ref;
    TeacherClassesView.__super__.initialize.call(this, options);
    this.classrooms = new Classrooms();
    this.classrooms.comparator = function(a, b) {
      return b.id.localeCompare(a.id);
    };
    this.classrooms.fetchMine();
    this.supermodel.trackCollection(this.classrooms);
    this.listenTo(this.classrooms, 'sync', function() {
      var classroom, j, jqxhrs, len, ref, results;
      ref = this.classrooms.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        classroom = ref[j];
        classroom.sessions = new LevelSessions();
        jqxhrs = classroom.sessions.fetchForAllClassroomMembers(classroom);
        if (jqxhrs.length > 0) {
          results.push(this.supermodel.trackCollection(classroom.sessions));
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Loaded', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.courses = new Courses();
    this.courses.fetch();
    this.supermodel.trackCollection(this.courses);
    this.courseInstances = new CourseInstances();
    this.courseInstances.fetchByOwner(me.id);
    this.supermodel.trackCollection(this.courseInstances);
    return this.progressDotTemplate = require('templates/teachers/hovers/progress-dot-whole-course');
  };

  TeacherClassesView.prototype.afterRender = function() {
    TeacherClassesView.__super__.afterRender.call(this);
    return $('.progress-dot').each(function(i, el) {
      var dot;
      dot = $(el);
      return dot.tooltip({
        html: true,
        container: dot
      });
    });
  };

  TeacherClassesView.prototype.onLoaded = function() {
    helper.calculateDots(this.classrooms, this.courses, this.courseInstances);
    return TeacherClassesView.__super__.onLoaded.call(this);
  };

  TeacherClassesView.prototype.onClickEditClassroom = function(e) {
    var classroom, classroomID, modal, ref;
    classroomID = $(e.target).data('classroom-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers',
        classroomID: classroomID
      }, ['Mixpanel']);
    }
    classroom = this.classrooms.get(classroomID);
    modal = new ClassroomSettingsModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassesView.prototype.onClickCreateClassroomButton = function(e) {
    var classroom, modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Create New Class Started', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    classroom = new Classroom({
      ownerID: me.id
    });
    modal = new ClassroomSettingsModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal.classroom, 'sync', function() {
      var ref1;
      if ((ref1 = window.tracker) != null) {
        ref1.trackEvent('Teachers Classes Create New Class Finished', {
          category: 'Teachers'
        }, ['Mixpanel']);
      }
      this.classrooms.add(modal.classroom);
      this.addFreeCourseInstances();
      return this.render();
    });
  };

  TeacherClassesView.prototype.onClickCreateTeacherButton = function(e) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/signup", {
      trigger: true
    });
  };

  TeacherClassesView.prototype.onClickUpdateTeacherButton = function(e) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/update-account", {
      trigger: true
    });
  };

  TeacherClassesView.prototype.onClickAddStudentsButton = function(e) {
    var classroom, classroomID, modal, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Classes Add Students Started', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    modal = new InviteToClassroomModal({
      classroom: classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hide', this.render);
  };

  TeacherClassesView.prototype.onClickArchiveClassroom = function(e) {
    var classroom, classroomID;
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    classroom.set('archived', true);
    return classroom.save({}, {
      success: (function(_this) {
        return function() {
          var ref;
          if ((ref = window.tracker) != null) {
            ref.trackEvent('Teachers Classes Archived Class', {
              category: 'Teachers'
            }, ['Mixpanel']);
          }
          return _this.render();
        };
      })(this)
    });
  };

  TeacherClassesView.prototype.onClickUnarchiveClassroom = function(e) {
    var classroom, classroomID;
    classroomID = $(e.currentTarget).data('classroom-id');
    classroom = this.classrooms.get(classroomID);
    classroom.set('archived', false);
    return classroom.save({}, {
      success: (function(_this) {
        return function() {
          var ref;
          if ((ref = window.tracker) != null) {
            ref.trackEvent('Teachers Classes Unarchived Class', {
              category: 'Teachers'
            }, ['Mixpanel']);
          }
          return _this.render();
        };
      })(this)
    });
  };

  TeacherClassesView.prototype.onClickViewClassButton = function(e) {
    var classroomID, ref;
    classroomID = $(e.target).data('classroom-id');
    if ((ref = window.tracker) != null) {
      ref.trackEvent($(e.target).data('event-action'), {
        category: 'Teachers',
        classroomID: classroomID
      }, ['Mixpanel']);
    }
    return application.router.navigate("/teachers/classes/" + classroomID, {
      trigger: true
    });
  };

  TeacherClassesView.prototype.addFreeCourseInstances = function() {
    var classroom, course, courseInstance, j, k, len, len1, ref, ref1;
    ref = this.classrooms.models;
    for (j = 0, len = ref.length; j < len; j++) {
      classroom = ref[j];
      ref1 = this.courses.models;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        course = ref1[k];
        if (!course.get('free')) {
          continue;
        }
        courseInstance = this.courseInstances.findWhere({
          classroomID: classroom.id,
          courseID: course.id
        });
        if (!courseInstance) {
          courseInstance = new CourseInstance({
            classroomID: classroom.id,
            courseID: course.id
          });
          courseInstance.save(null, {
            validate: false
          });
          this.courseInstances.add(courseInstance);
          this.listenToOnce(courseInstance, 'sync', this.addFreeCourseInstances);
          return;
        }
      }
    }
  };

  return TeacherClassesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/TeacherClassesView.js.map
require.register("templates/courses/student-courses-view", function(exports, require, module) {
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><p data-i18n=\"courses.to_join_ask\"></p><div id=\"join-classroom-form\" class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-sm-2\"><button" + (jade.attrs({ 'id':('join-class-btn'), 'disabled':(view.state==='enrolling'), 'data-i18n':("courses.join_this_class"), "class": [('btn'),('btn-default'),('btn-block')] }, {"disabled":true,"data-i18n":true})) + "></button></div><div class=\"col-sm-6\"><input" + (jade.attrs({ 'id':('classroom-code-input'), 'data-i18n':("[placeholder]courses.enter_here"), 'placeholder':('<enter unlock code here>'), 'value':(view.classCode), 'disabled':(view.state==='enrolling'), "class": [('form-control')] }, {"data-i18n":true,"placeholder":true,"value":true,"disabled":true})) + "/></div></div>");
if ( view.state === 'enrolling')
{
buf.push("<div class=\"progress progress-striped active\"><div style=\"width: 100%\" data-i18n=\"courses.joining\" class=\"progress-bar\"></div></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</div>");
}
var justJoinedCourseInstance = view.courseInstances.find(function(ci) { return ci.justJoined; });
if ( justJoinedCourseInstance)
{
var course = view.courses.get(justJoinedCourseInstance.get('courseID'));
var classroom = view.classrooms.get(justJoinedCourseInstance.get('classroomID'));
if ( course && classroom)
{
buf.push("<div class=\"alert alert-info\"><span data-i18n=\"courses.successfully_joined\" class=\"spr\"></span><span class=\"spr\">\"" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "\"!</span><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (justJoinedCourseInstance.id) + "") }, {"href":true})) + "><strong><span data-i18n=\"courses.click_to_start\" class=\"spr\"></span><span>\"" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "\".</span></strong></a></div>");
}
}
buf.push("</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"courses.my_courses\" class=\"panel-title\"></div></div><div class=\"list-group\"><div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\"><strong data-i18n=\"courses.classroom\"></strong></div><div class=\"col-sm-3\"><strong data-i18n=\"courses.course\"></strong></div></div></div>");
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var classroom = view.classrooms.get(courseInstance.get('classroomID'))
var course = view.courses.get(courseInstance.get('courseID'))
if ( !(classroom && course))
{
continue;
}
buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">");
if ( classroom)
{
buf.push("" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-3\">");
if ( course)
{
buf.push("" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-6\"><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (courseInstance.id) + ""), 'data-i18n':("courses.enter"), "class": [('btn'),('btn-default'),('btn-sm')] }, {"href":true,"data-i18n":true})) + "></a></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var classroom = view.classrooms.get(courseInstance.get('classroomID'))
var course = view.courses.get(courseInstance.get('courseID'))
if ( !(classroom && course))
{
continue;
}
buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">");
if ( classroom)
{
buf.push("" + (jade.escape((jade.interp = classroom.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-3\">");
if ( course)
{
buf.push("" + (jade.escape((jade.interp = course.get('name')) == null ? '' : jade.interp)) + "");
}
buf.push("</div><div class=\"col-sm-6\"><a" + (jade.attrs({ 'href':("/students/" + (course.id) + "/" + (courseInstance.id) + ""), 'data-i18n':("courses.enter"), "class": [('btn'),('btn-default'),('btn-sm')] }, {"href":true,"data-i18n":true})) + "></a></div></div></div>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><div data-i18n=\"courses.my_classes\" class=\"panel-title\"></div></div><div class=\"list-group\">");
// iterate view.classrooms.models
;(function(){
  var $$obj = view.classrooms.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var classroom = $$obj[$index];

buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">" + (jade.escape(null == (jade.interp = classroom.get('description')) ? "" : jade.interp)) + "</div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var classroom = $$obj[$index];

buf.push("<div class=\"list-group-item\"><div class=\"row\"><div class=\"col-sm-3\">" + (jade.escape(null == (jade.interp = classroom.get('name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">" + (jade.escape(null == (jade.interp = classroom.get('description')) ? "" : jade.interp)) + "</div></div></div>");
    }

  }
}).call(this);

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

;require.register("views/courses/StudentCoursesView", function(exports, require, module) {
var Classroom, CocoCollection, Course, CourseInstance, CreateAccountModal, RootView, StudentCoursesView, User, app, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = require('core/application');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

Classroom = require('models/Classroom');

User = require('models/User');

CourseInstance = require('models/CourseInstance');

RootView = require('views/core/RootView');

template = require('templates/courses/student-courses-view');

utils = require('core/utils');

module.exports = StudentCoursesView = (function(superClass) {
  extend(StudentCoursesView, superClass);

  StudentCoursesView.prototype.id = 'student-courses-view';

  StudentCoursesView.prototype.template = template;

  StudentCoursesView.prototype.events = {
    'click #join-class-btn': 'onClickJoinClassButton'
  };

  function StudentCoursesView(options) {
    StudentCoursesView.__super__.constructor.call(this, options);
    this.courseInstances = new CocoCollection([], {
      url: "/db/user/" + me.id + "/course_instances",
      model: CourseInstance
    });
    this.courseInstances.comparator = function(ci) {
      return ci.get('classroomID') + ci.get('courseID');
    };
    this.supermodel.loadCollection(this.courseInstances, 'course_instances');
    this.classrooms = new CocoCollection([], {
      url: "/db/classroom",
      model: Classroom
    });
    this.supermodel.loadCollection(this.classrooms, 'classrooms', {
      data: {
        memberID: me.id
      }
    });
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.supermodel.loadCollection(this.courses, 'courses');
  }

  StudentCoursesView.prototype.onLoaded = function() {
    if ((this.classCode = utils.getQueryVariable('_cc', false)) && !me.isAnonymous()) {
      this.joinClass();
    }
    return StudentCoursesView.__super__.onLoaded.call(this);
  };

  StudentCoursesView.prototype.onClickJoinClassButton = function(e) {
    if (me.isAnonymous()) {
      return this.openModalView(new CreateAccountModal());
    }
    this.classCode = this.$('#classroom-code-input').val();
    return this.joinClass();
  };

  StudentCoursesView.prototype.joinClass = function() {
    this.state = 'enrolling';
    this.renderSelectors('#join-classroom-form');
    return $.ajax({
      method: 'POST',
      url: '/db/classroom/-/members',
      data: {
        code: this.classCode
      },
      context: this,
      success: this.onJoinClassroomSuccess,
      error: function(jqxhr, textStatus, errorThrown) {
        var ref;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Failed to join classroom with code', {
            status: textStatus
          });
        }
        this.state = 'unknown_error';
        if (jqxhr.status === 422) {
          this.stateMessage = 'Please enter a code.';
        } else if (jqxhr.status === 404) {
          this.stateMessage = 'Code not found.';
        } else {
          this.stateMessage = "" + jqxhr.responseText;
        }
        return this.renderSelectors('#join-classroom-form');
      }
    });
  };

  StudentCoursesView.prototype.onJoinClassroomSuccess = function(data, textStatus, jqxhr) {
    var classroom, classroomCourseInstances, ref;
    classroom = new Classroom(data);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Joined classroom', {
        classroomID: classroom.id,
        classroomName: classroom.get('name'),
        ownerID: classroom.get('ownerID')
      });
    }
    this.classrooms.add(classroom);
    this.render();
    classroomCourseInstances = new CocoCollection([], {
      url: "/db/course_instance",
      model: CourseInstance
    });
    classroomCourseInstances.fetch({
      data: {
        classroomID: classroom.id
      }
    });
    return this.listenToOnce(classroomCourseInstances, 'sync', function() {
      var course, courseInstance, i, jqxhrs, len, ref1;
      jqxhrs = [];
      ref1 = classroomCourseInstances.models;
      for (i = 0, len = ref1.length; i < len; i++) {
        courseInstance = ref1[i];
        course = this.courses.get(courseInstance.get('courseID'));
        if (course.get('free')) {
          jqxhrs.push($.ajax({
            method: 'POST',
            url: _.result(courseInstance, 'url') + '/members',
            data: {
              userID: me.id
            },
            context: this,
            success: function(data) {
              this.courseInstances.add(data);
              return this.courseInstances.get(data._id).justJoined = true;
            }
          }));
        }
      }
      return $.when.apply($, jqxhrs).done((function(_this) {
        return function() {
          _this.state = '';
          return _this.render();
        };
      })(this));
    });
  };

  return StudentCoursesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/StudentCoursesView.js.map
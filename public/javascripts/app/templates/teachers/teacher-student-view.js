require.register("templates/teachers/teacher-student-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,dotClass = locals_.dotClass,levelName = locals_.levelName,moment = locals_.moment,link = locals_.link,labelText = locals_.labelText,translate = locals_.translate,me = locals_.me,serverConfig = locals_.serverConfig,document = locals_.document,_ = locals_._;var breadcrumbs_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"breadcrumbs\"><a data-i18n=\"teacher.my_classes\" href=\"/teachers/classes\"></a><span class=\"spl spr\">></span><a" + (jade.attrs({ 'href':('/teachers/classes/'+view.classroom.id) }, {"href":true})) + "><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span></a><span class=\"spl spr\">></span><span>" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "</span></div>");
};
var progressDotLabel_mixin = function(label){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"dot-label text-center\"><div class=\"dot-label-inner\">" + (jade.escape(null == (jade.interp = label) ? "" : jade.interp)) + "</div></div>");
};
var studentLevelProgressDot_mixin = function(levelProgress, level, levelNumber, course){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
dotClass = levelProgress == 'complete' ? 'forest' : (levelProgress == 'started' ? 'gold' : '');
levelName = level.get('name')
var context = { levelName: levelName, levelNumber: levelNumber, moment: moment , started: levelProgress == 'started', completed: levelProgress == 'complete'}; 
if ( view.levelSessionMap && view.levelSessionMap[level.get('original')])
{
context.session = view.levelSessionMap[level.get('original')];
}
link = null;
labelText = levelNumber;
if ( level.isLadder())
{
var courseInstance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id });
if ( courseInstance)
{
link = view.urls.courseArenaLadder({level: level, courseInstance: courseInstance});
labelText = translate('courses.arena');
}
else
{
labelText = translate('courses.arena');
}
dotClass += ' progress-dot-lg';
}
else if ( level.isProject())
{
if ( levelProgress == 'started' || levelProgress == 'complete')
{
if ( view.levelSessionMap && view.levelSessionMap[level.get('original')])
{
link = view.urls.playDevLevel({level: level, session: view.levelSessionMap[level.get('original')], course: course});
}
labelText = translate('teacher.view_student_project');
dotClass = 'navy';
}
else
{
labelText = translate('teacher.project');
}
dotClass += ' progress-dot-lg';
}
buf.push("<div" + (jade.attrs({ 'data-html':('true'), 'data-title':(view.singleStudentLevelProgressDotTemplate(context)), "class": [('progress-dot'),('level-progress-dot'),(dotClass)] }, {"class":true,"data-html":true,"data-title":true})) + ">");
if ( link)
{
buf.push("<a" + (jade.attrs({ 'href':(link) }, {"href":true})) + ">");
progressDotLabel_mixin(labelText);
buf.push("</a>");
}
else
{
progressDotLabel_mixin(labelText);
}
buf.push("</div>");
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
if ( !view.user)
{
buf.push("<div>Loading</div>");
}
else
{
buf.push("<div class=\"container\">");
breadcrumbs_mixin();
if ( !me.isAnonymous() && me.isTeacher())
var isOwner = view.classroom ? view.classroom.get('ownerID') === me.id : false;
if ( isOwner)
{
buf.push("<h3 class=\"m-t-2\"><span data-i18n=\"teacher.student_profile\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "</span></h3><div class=\"performance col-md-7\"><h4 class=\"student-details\"><span data-i18n=\"teacher.student_state\" class=\"spr\"></span><span class=\"spr\">" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "</span><span data-i18n=\"teacher.student_state_2\"></span><!-- TODO: if no other students, this area is blank. Display something better. --></h4><div style=\"width:100%\" class=\"recommendation\">");
if ( view.courseComparisonMap && view.lastPlayedCourse)
{
var lastCoursePerf = _.find(view.courseComparisonMap, { courseID: view.lastPlayedCourse.id })
if ( (Math.abs(lastCoursePerf.performance)) <= 1)
{
buf.push("<div class=\"glyphicon glyphicon-thumbs-up\"></div><div class=\"small-details\"><div class=\"good\">" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "<span class=\"spr\"></span><span data-i18n=\"teacher.student_good\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = lastCoursePerf.courseModel.getTranslatedName()) ? "" : jade.interp)) + "</span><div data-i18n=\"teacher.student_good_detail\" class=\"status\"> </div></div></div>");
}
else if ( (lastCoursePerf.performance) >= 2)
{
buf.push("<div class=\"glyphicon glyphicon-star\"></div><div class=\"small-details\"><div class=\"great\">" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "<span class=\"spr\"></span><span data-i18n=\"teacher.student_great\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = lastCoursePerf.courseModel.getTranslatedName()) ? "" : jade.interp)) + "</span><div data-i18n=\"teacher.student_great_detail\" class=\"status\"></div></div></div>");
}
else if ( (lastCoursePerf.performance) <= -2 )
{
buf.push("<div class=\"glyphicon glyphicon-exclamation-sign\"></div><div class=\"small-details\"><div class=\"warn\">" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "<span class=\"spr\"></span><span data-i18n=\"teacher.student_warn\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = lastCoursePerf.courseModel.getTranslatedName()) ? "" : jade.interp)) + "</span><div data-i18n=\"teacher.student_warn_detail\" class=\"status\"> </div></div></div>");
}
}
buf.push("</div><div class=\"additional-progress\">");
var warn = []
var great = []
var good = []
// iterate view.courseComparisonMap || []
;(function(){
  var $$obj = view.courseComparisonMap || [];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

if ( !view.lastPlayedCourse || course.courseID != view.lastPlayedCourse)
{
if ( Math.abs(course.performance) <= 1)
{
good.push(course.courseModel.getTranslatedName())
}
else if ( course.performance >= 2)
{
great.push(course.courseModel.getTranslatedName())
}
else if ( course.performance <= -2 )
{
warn.push(course.courseModel.getTranslatedName())
}
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

if ( !view.lastPlayedCourse || course.courseID != view.lastPlayedCourse)
{
if ( Math.abs(course.performance) <= 1)
{
good.push(course.courseModel.getTranslatedName())
}
else if ( course.performance >= 2)
{
great.push(course.courseModel.getTranslatedName())
}
else if ( course.performance <= -2 )
{
warn.push(course.courseModel.getTranslatedName())
}
}
    }

  }
}).call(this);

if ( warn.length > 0)
{
buf.push("<div class=\"warn\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span><span class=\"spr\"></span><span class=\"small-details\">" + (jade.escape(null == (jade.interp = warn.join(', ')) ? "" : jade.interp)) + "</span></div>");
}
if ( great.length > 0)
{
buf.push("<div class=\"great\"><span class=\"glyphicon glyphicon-star\"></span><span class=\"spr\"></span><span class=\"small-details\">" + (jade.escape(null == (jade.interp = great.join(', ')) ? "" : jade.interp)) + "</span></div>");
}
if ( good.length > 0)
{
buf.push("<div class=\"good\"><span class=\"glyphicon glyphicon-thumbs-up\"></span><span class=\"spr\"></span><span class=\"small-details\">" + (jade.escape(null == (jade.interp = good.join(', ')) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div></div><div class=\"classroom-info-row container-fluid row\"><div class=\"overview col-md-5\"><h4 data-i18n=\"teacher.student_overview\" class=\"student-details\"></h4><div class=\"small-details\"> <span data-i18n=\"teacher.student_name\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('firstName') && view.user.get('lastName')))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.user.get('firstName')) ? "" : jade.interp)) + "</span><span class=\"spl\">" + (jade.escape(null == (jade.interp = view.user.get('lastName')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_name\"></i>");
}
buf.push("</div><div class=\"small-details\"> <span data-i18n=\"general.username\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('name')))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.user.get('name')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_username\"></i>");
}
buf.push("</div><div class=\"small-details\"> <span data-i18n=\"general.email\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('email')))
{
buf.push("<a" + (jade.attrs({ 'href':("mailto:"+view.user.get('email')) }, {"href":true})) + "><span>" + (jade.escape(null == (jade.interp = view.user.get('email')) ? "" : jade.interp)) + "</span></a>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_email\"></i>");
}
buf.push("</div><div class=\"small-details\"><span data-i18n=\"user.last_played\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = view.lastPlayedString()) ? "" : jade.interp)) + "</span></div><div class=\"small-details\"> ");
var status = view.user.prepaidStatus()
buf.push("<span data-i18n=\"view.user.status\"></span><span class=\"spr\"></span><span data-i18n=\"teacher.license_status\"></span><span class=\"spr\">: </span><strong" + (jade.attrs({ "class": [(status === 'expired' ? 'text-danger' : '')] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = view.studentStatusString()) ? "" : jade.interp)) + "</strong></div></div></div><div class=\"playtime-charts\"><h4 data-i18n=\"teacher.playtime_detail\"></h4><div class=\"graphsSelector\"><span data-i18n=\"teacher.select_course\"></span><span>:</span><span class=\"spr\"></span><select id=\"course-dropdown\" class=\"text-navy\">");
// iterate (view.classroom.get('courses') || [])
;(function(){
  var $$obj = (view.classroom.get('courses') || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
buf.push("<!-- TODO: make sure this doesn't happen when data is loaded. -->");
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if (instance && instance.hasMember(view.user))
{
buf.push("<option" + (jade.attrs({ 'value':(course.id) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.getTranslatedName()) ? "" : jade.interp)) + "</option>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
buf.push("<!-- TODO: make sure this doesn't happen when data is loaded. -->");
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if (instance && instance.hasMember(view.user))
{
buf.push("<option" + (jade.attrs({ 'value':(course.id) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.getTranslatedName()) ? "" : jade.interp)) + "</option>");
}
    }

  }
}).call(this);

buf.push("</select><div class=\"legend\"><svg width=\"15\" height=\"15\" style=\"margin: 0 5px 0 0\"><rect width=\"15\" height=\"15\" fill=\"rgb(32, 87, 43)\"></rect></svg><span data-i18n=\"teacher.student_completed\"> </span><svg width=\"15\" height=\"15\" style=\"margin: 0 5px 0 15px\"><rect width=\"15\" height=\"15\" fill=\"rgb(242, 190, 25)\"></rect></svg><span data-i18n=\"teacher.student_in_progress\"> </span><svg width=\"15\" height=\"15\" style=\"margin: 0 5px 0 15px\"><rect width=\"15\" height=\"15\" fill=\"rgb(92, 180, 208)\"></rect></svg><span data-i18n=\"teacher.class_average\"> </span></div></div><div class=\"graphs\">");
// iterate (view.classroom.get('courses') || [])
;(function(){
  var $$obj = (view.classroom.get('courses') || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if ((instance && instance.hasMember(view.user)))
{
buf.push("<svg" + (jade.attrs({ 'id':("visualisation-"+versionedCourse._id), 'width':("1142"), 'height':("600"), "class": [("visualisation")] }, {"id":true,"width":true,"height":true,"class":true})) + "></svg>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if ((instance && instance.hasMember(view.user)))
{
buf.push("<svg" + (jade.attrs({ 'id':("visualisation-"+versionedCourse._id), 'width':("1142"), 'height':("600"), "class": [("visualisation")] }, {"id":true,"width":true,"height":true,"class":true})) + "></svg>");
}
    }

  }
}).call(this);

buf.push("</div></div><div class=\"student-levels\"> <h4 data-i18n=\"teacher.course_progress\"></h4><div class=\"student-levels-progress\">");
// iterate (view.classroom.get('courses') || [])
;(function(){
  var $$obj = (view.classroom.get('courses') || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if (instance && instance.hasMember(view.user))
{
if ( course)
{
buf.push("<div class=\"course-row alternating-background\"><div class=\"course-info\">" + (jade.escape(null == (jade.interp = course.getTranslatedName()) ? "" : jade.interp)) + "</div>");
var levels = view.classroom.getLevels({courseID: course.id}).models
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
var levelProgress = view.levelProgressMap[level.get('original')]
studentLevelProgressDot_mixin(levelProgress, level, levelNumber, course);
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
var levelProgress = view.levelProgressMap[level.get('original')]
studentLevelProgressDot_mixin(levelProgress, level, levelNumber, course);
    }

  }
}).call(this);

buf.push("</div>");
}
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var versionedCourse = $$obj[$index];

var course = _.find(view.courses.models, function(c) {return c.id === versionedCourse._id;});
if ( !course)
{
continue;
}
var instance = view.courseInstances.findWhere({ courseID: course.id, classroomID: view.classroom.id })
if (instance && instance.hasMember(view.user))
{
if ( course)
{
buf.push("<div class=\"course-row alternating-background\"><div class=\"course-info\">" + (jade.escape(null == (jade.interp = course.getTranslatedName()) ? "" : jade.interp)) + "</div>");
var levels = view.classroom.getLevels({courseID: course.id}).models
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
var levelProgress = view.levelProgressMap[level.get('original')]
studentLevelProgressDot_mixin(levelProgress, level, levelNumber, course);
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

var levelNumber = view.classroom.getLevelNumber(level.get('original'), index + 1)
var levelProgress = view.levelProgressMap[level.get('original')]
studentLevelProgressDot_mixin(levelProgress, level, levelNumber, course);
    }

  }
}).call(this);

buf.push("</div>");
}
}
    }

  }
}).call(this);

buf.push("</div></div>");
}
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

;
//# sourceMappingURL=/javascripts/app/templates/teachers/teacher-student-view.js.map
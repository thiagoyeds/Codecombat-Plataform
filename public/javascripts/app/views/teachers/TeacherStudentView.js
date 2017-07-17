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

;require.register("views/teachers/TeacherStudentView", function(exports, require, module) {
var Campaigns, Classroom, CourseInstances, Courses, LevelSession, LevelSessions, Levels, RootView, TeacherStudentView, User, Users, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

Campaigns = require('collections/Campaigns');

Classroom = require('models/Classroom');

Courses = require('collections/Courses');

Levels = require('collections/Levels');

LevelSession = require('models/LevelSession');

LevelSessions = require('collections/LevelSessions');

User = require('models/User');

Users = require('collections/Users');

CourseInstances = require('collections/CourseInstances');

require('vendor/d3');

utils = require('core/utils');

module.exports = TeacherStudentView = (function(superClass) {
  extend(TeacherStudentView, superClass);

  function TeacherStudentView() {
    return TeacherStudentView.__super__.constructor.apply(this, arguments);
  }

  TeacherStudentView.prototype.id = 'teacher-student-view';

  TeacherStudentView.prototype.template = require('templates/teachers/teacher-student-view');

  TeacherStudentView.prototype.events = {
    'change #course-dropdown': 'onChangeCourseChart'
  };

  TeacherStudentView.prototype.getTitle = function() {
    var ref;
    return (ref = this.user) != null ? ref.broadName() : void 0;
  };

  TeacherStudentView.prototype.initialize = function(options, classroomID, studentID) {
    this.studentID = studentID;
    this.classroom = new Classroom({
      _id: classroomID
    });
    this.listenToOnce(this.classroom, 'sync', this.onClassroomSync);
    this.supermodel.trackRequest(this.classroom.fetch());
    this.courses = new Courses();
    this.supermodel.trackRequest(this.courses.fetch({
      data: {
        project: 'name,i18n'
      }
    }));
    this.courseInstances = new CourseInstances();
    this.supermodel.trackRequest(this.courseInstances.fetchForClassroom(classroomID));
    this.levels = new Levels();
    this.supermodel.trackRequest(this.levels.fetchForClassroom(classroomID, {
      data: {
        project: 'name,original'
      }
    }));
    this.urls = require('core/urls');
    this.singleStudentLevelProgressDotTemplate = require('templates/teachers/hovers/progress-dot-single-student-level');
    this.levelProgressMap = {};
    return TeacherStudentView.__super__.initialize.call(this, options);
  };

  TeacherStudentView.prototype.onLoaded = function() {
    if (this.students.loaded && !this.destroyed) {
      this.user = _.find(this.students.models, (function(_this) {
        return function(s) {
          return s.id === _this.studentID;
        };
      })(this));
      this.updateLastPlayedInfo();
      this.updateLevelProgressMap();
      this.updateLevelDataMap();
      this.calculateStandardDev();
      this.render();
    }
    return TeacherStudentView.__super__.onLoaded.call(this);
  };

  TeacherStudentView.prototype.afterRender = function() {
    TeacherStudentView.__super__.afterRender.apply(this, arguments);
    $('.progress-dot, .btn-view-project-level').each(function(i, el) {
      var dot;
      dot = $(el);
      return dot.tooltip({
        html: true,
        container: dot
      }).delegate('.tooltip', 'mousemove', function() {
        return dot.tooltip('hide');
      });
    });
    this.drawBarGraph();
    return this.onChangeCourseChart();
  };

  TeacherStudentView.prototype.onChangeCourseChart = function(e) {
    var selected;
    if (e) {
      selected = '#visualisation-' + e.currentTarget.value;
      $("[id|='visualisation']").hide();
      return $(selected).show();
    }
  };

  TeacherStudentView.prototype.calculateStandardDev = function() {
    var StandardDev, course, diffSum, j, k, l, len, len1, len2, len3, m, mean, member, memberPlayed, members, number, numbers, perf, playedLevel, ref, ref1, ref2, ref3, ref4, results, session, studentCourseTotal, sum, variance, versionedCourse, versionedLevel;
    if (!(this.courses.loaded && this.levels.loaded && ((ref = this.sessions) != null ? ref.loaded : void 0) && this.levelData)) {
      return;
    }
    this.courseComparisonMap = [];
    ref1 = this.classroom.get('courses') || [];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      versionedCourse = ref1[j];
      course = this.courses.get(versionedCourse._id);
      numbers = [];
      studentCourseTotal = 0;
      members = 0;
      ref2 = this.classroom.get('members');
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        member = ref2[k];
        number = 0;
        memberPlayed = 0;
        ref3 = versionedCourse.levels;
        for (l = 0, len2 = ref3.length; l < len2; l++) {
          versionedLevel = ref3[l];
          ref4 = this.sessions.models;
          for (m = 0, len3 = ref4.length; m < len3; m++) {
            session = ref4[m];
            if (session.get('level').original === versionedLevel.original && session.get('creator') === member) {
              playedLevel = _.findWhere(this.levelData, {
                levelID: session.get('level').original
              });
              if (playedLevel.levelProgress === 'complete' || playedLevel.levelProgress === 'started') {
                number += session.get('playtime') || 0;
                memberPlayed += 1;
              }
              if (session.get('creator') === this.studentID) {
                studentCourseTotal += session.get('playtime') || 0;
              }
            }
          }
        }
        if (memberPlayed > 0) {
          members += 1;
        }
        numbers.push(number);
      }
      sum = numbers.reduce(function(a, b) {
        return a + b;
      });
      mean = sum / members;
      diffSum = numbers.map(function(num) {
        return Math.pow(num - mean, 2);
      }).reduce(function(a, b) {
        return a + b;
      });
      variance = diffSum / members;
      StandardDev = Math.sqrt(variance);
      perf = -(studentCourseTotal - mean) / StandardDev;
      perf = perf > 0 ? Math.ceil(perf) : Math.floor(perf);
      results.push(this.courseComparisonMap.push({
        courseModel: course,
        courseID: course.get('_id'),
        studentCourseTotal: studentCourseTotal,
        standardDev: StandardDev,
        mean: mean,
        performance: perf
      }));
    }
    return results;
  };

  TeacherStudentView.prototype.drawBarGraph = function() {
    var HEIGHT, MARGINS, WIDTH, chart, course, courseLevelData, j, k, labels, len, len1, level, levels, ref, ref1, ref2, results, versionedCourse, vis, xAxis, xRange, yAxis, yRange;
    if (!(this.courses.loaded && this.levels.loaded && ((ref = this.sessions) != null ? ref.loaded : void 0) && this.levelData && this.courseComparisonMap)) {
      return;
    }
    WIDTH = 1142;
    HEIGHT = 600;
    MARGINS = {
      top: 50,
      right: 20,
      bottom: 50,
      left: 70
    };
    ref1 = this.classroom.get('courses') || [];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      versionedCourse = ref1[j];
      vis = d3.select('#visualisation-' + versionedCourse._id);
      courseLevelData = [];
      ref2 = this.levelData;
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        level = ref2[k];
        if (level.courseID === versionedCourse._id) {
          courseLevelData.push(level);
        }
      }
      course = this.courses.get(versionedCourse._id);
      levels = this.classroom.getLevels({
        courseID: course.id
      }).models;
      xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(courseLevelData.map(function(d) {
        return d.levelIndex;
      }));
      yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
        0, d3.max(courseLevelData, function(d) {
          if (d.classAvg > d.studentTime) {
            return d.classAvg;
          } else {
            return d.studentTime;
          }
        })
      ]);
      xAxis = d3.svg.axis().scale(xRange).tickSize(1).tickSubdivide(true);
      yAxis = d3.svg.axis().scale(yRange).tickSize(1).orient('left').tickSubdivide(true);
      vis.append('svg:g').attr('class', 'x axis').attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')').call(xAxis);
      vis.append('svg:g').attr('class', 'y axis').attr('transform', 'translate(' + MARGINS.left + ',0)').call(yAxis);
      chart = vis.selectAll('rect').data(courseLevelData).enter();
      chart.append('rect').attr('class', 'classroom-bar').attr('x', (function(d) {
        return xRange(d.levelIndex) + (xRange.rangeBand()) / 2;
      })).attr('y', function(d) {
        return yRange(d.classAvg);
      }).attr('width', (xRange.rangeBand()) / 2).attr('height', function(d) {
        return HEIGHT - MARGINS.bottom - yRange(d.classAvg);
      }).attr('fill', '#5CB4D0');
      chart.append('text').attr('x', (function(d) {
        return xRange(d.levelIndex) + (xRange.rangeBand()) / 2;
      })).attr('y', (function(d) {
        return yRange(d.classAvg) - 3;
      })).text(function(d) {
        if (d.classAvg !== 0) {
          return d.classAvg;
        }
      }).attr('class', 'label');
      chart.append('rect').attr('class', 'student-bar').attr('x', (function(d) {
        return xRange(d.levelIndex);
      })).attr('y', function(d) {
        return yRange(d.studentTime);
      }).attr('width', (xRange.rangeBand()) / 2).attr('height', function(d) {
        return HEIGHT - MARGINS.bottom - yRange(d.studentTime);
      }).attr('fill', function(d) {
        if (d.levelProgress === 'complete') {
          return '#20572B';
        } else {
          return '#F2BE19';
        }
      });
      chart.append('text').attr('x', (function(d) {
        return xRange(d.levelIndex);
      })).attr('y', (function(d) {
        return yRange(d.studentTime) - 3;
      })).text(function(d) {
        if (d.studentTime !== 0) {
          return d.studentTime;
        }
      }).attr('class', 'label');
      labels = vis.append("g").attr("class", "labels");
      labels.append("text").attr("transform", "rotate(-90)").attr("y", 20).attr("x", -HEIGHT / 2).attr("dy", ".71em").style("text-anchor", "middle").text($.i18n.t("teacher.playtime_axis"));
      results.push(labels.append("text").attr("x", WIDTH / 2).attr("y", HEIGHT - 10).text($.i18n.t("teacher.levels_axis") + " " + course.getTranslatedName()).style("text-anchor", "middle"));
    }
    return results;
  };

  TeacherStudentView.prototype.onClassroomSync = function() {
    var jqxhrs;
    this.sessions = new LevelSessions();
    this.sessions.comparator = 'changed';
    this.listenTo(this.sessions, 'sync', this.onSessionsSync);
    this.supermodel.trackRequests(this.sessions.fetchForAllClassroomMembers(this.classroom));
    this.students = new Users();
    jqxhrs = this.students.fetchForClassroom(this.classroom, {
      removeDeleted: true
    });
    return this.supermodel.trackRequests(jqxhrs);
  };

  TeacherStudentView.prototype.onSessionsSync = function() {
    if (this.destroyed) {
      return;
    }
    this.updateLastPlayedInfo();
    this.updateLevelProgressMap();
    return this.updateLevelDataMap();
  };

  TeacherStudentView.prototype.updateLastPlayedInfo = function() {
    var course, j, k, len, len1, level, ref, ref1, ref2, ref3, session, versionedCourse;
    if (!(this.courses.loaded && this.levels.loaded && ((ref = this.sessions) != null ? ref.loaded : void 0) && ((ref1 = this.user) != null ? ref1.loaded : void 0))) {
      return;
    }
    session = _.findLast(this.sessions.models, (function(_this) {
      return function(s) {
        return s.get('creator') === _this.user.id;
      };
    })(this));
    if (!session) {
      return;
    }
    ref2 = this.classroom.get('courses') || [];
    for (j = 0, len = ref2.length; j < len; j++) {
      versionedCourse = ref2[j];
      ref3 = versionedCourse.levels;
      for (k = 0, len1 = ref3.length; k < len1; k++) {
        level = ref3[k];
        if (level.original === session.get('level').original) {
          course = this.courses.get(versionedCourse._id);
          break;
        }
      }
    }
    level = this.levels.findWhere({
      original: session.get('level').original
    });
    this.lastPlayedCourse = course;
    this.lastPlayedLevel = level;
    return this.lastPlayedSession = session;
  };

  TeacherStudentView.prototype.lastPlayedString = function() {
    var lastPlayedString;
    lastPlayedString = "";
    if (this.lastPlayedCourse) {
      lastPlayedString += this.lastPlayedCourse.getTranslatedName();
    }
    if (this.lastPlayedCourse && this.lastPlayedLevel) {
      lastPlayedString += ": ";
    }
    if (this.lastPlayedLevel) {
      lastPlayedString += this.lastPlayedLevel.get('name');
    }
    if (this.lastPlayedCourse || this.lastPlayedLevel) {
      lastPlayedString += ", on ";
    }
    if (this.lastPlayedSession) {
      lastPlayedString += moment(this.lastPlayedSession.get('changed')).format("LLLL");
    }
    return lastPlayedString;
  };

  TeacherStudentView.prototype.updateLevelProgressMap = function() {
    var j, k, len, len1, ref, ref1, ref2, ref3, results, session, versionedCourse, versionedLevel;
    if (!(this.courses.loaded && this.levels.loaded && ((ref = this.sessions) != null ? ref.loaded : void 0) && ((ref1 = this.user) != null ? ref1.loaded : void 0))) {
      return;
    }
    this.levelSessionMap = {};
    ref2 = this.sessions.models;
    for (j = 0, len = ref2.length; j < len; j++) {
      session = ref2[j];
      if (session.get('creator') === this.studentID) {
        this.levelSessionMap[session.get('level').original] = session;
      }
    }
    this.levelProgressMap = {};
    ref3 = this.classroom.get('courses') || [];
    results = [];
    for (k = 0, len1 = ref3.length; k < len1; k++) {
      versionedCourse = ref3[k];
      results.push((function() {
        var l, len2, ref4, ref5, results1;
        ref4 = versionedCourse.levels;
        results1 = [];
        for (l = 0, len2 = ref4.length; l < len2; l++) {
          versionedLevel = ref4[l];
          session = this.levelSessionMap[versionedLevel.original];
          if (session) {
            if ((ref5 = session.get('state')) != null ? ref5.complete : void 0) {
              results1.push(this.levelProgressMap[versionedLevel.original] = 'complete');
            } else {
              results1.push(this.levelProgressMap[versionedLevel.original] = 'started');
            }
          } else {
            results1.push(this.levelProgressMap[versionedLevel.original] = 'not started');
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  TeacherStudentView.prototype.updateLevelDataMap = function() {
    var classAvg, course, j, len, levelProgress, playTime, ref, ref1, results, session, studentTime, timesPlayed, versionedCourse, versionedLevel;
    if (!(this.courses.loaded && this.levels.loaded && ((ref = this.sessions) != null ? ref.loaded : void 0))) {
      return;
    }
    this.levelData = [];
    ref1 = this.classroom.get('courses') || [];
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      versionedCourse = ref1[j];
      course = this.courses.get(versionedCourse._id);
      results.push((function() {
        var k, l, len1, len2, ref2, ref3, results1;
        ref2 = versionedCourse.levels;
        results1 = [];
        for (k = 0, len1 = ref2.length; k < len1; k++) {
          versionedLevel = ref2[k];
          playTime = 0;
          timesPlayed = 0;
          studentTime = 0;
          levelProgress = 'not started';
          ref3 = this.sessions.models;
          for (l = 0, len2 = ref3.length; l < len2; l++) {
            session = ref3[l];
            if (session.get('level').original === versionedLevel.original) {
              playTime += session.get('playtime') || 0;
              timesPlayed += 1;
              if (session.get('creator') === this.studentID) {
                studentTime = session.get('playtime') || 0;
                if (this.levelProgressMap[versionedLevel.original] === 'complete') {
                  levelProgress = 'complete';
                } else if (this.levelProgressMap[versionedLevel.original] === 'started') {
                  levelProgress = 'started';
                }
              }
            }
          }
          classAvg = timesPlayed > 0 ? Math.round(playTime / timesPlayed) : 0;
          results1.push(this.levelData.push({
            levelID: versionedLevel.original,
            levelIndex: this.classroom.getLevelNumber(versionedLevel.original),
            levelName: versionedLevel.name,
            courseModel: course,
            courseID: course.get('_id'),
            classAvg: classAvg,
            studentTime: studentTime ? studentTime : 0,
            levelProgress: levelProgress
          }));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  TeacherStudentView.prototype.studentStatusString = function() {
    var expires, ref, status, string;
    status = this.user.prepaidStatus();
    if (!this.user.get('coursePrepaid')) {
      return "";
    }
    expires = (ref = this.user.get('coursePrepaid')) != null ? ref.endDate : void 0;
    string = (function() {
      switch (status) {
        case 'not-enrolled':
          return $.i18n.t('teacher.status_not_enrolled');
        case 'enrolled':
          if (expires) {
            return $.i18n.t('teacher.status_enrolled');
          } else {
            return '-';
          }
        case 'expired':
          return $.i18n.t('teacher.status_expired');
      }
    })();
    if (expires) {
      return string.replace('{{date}}', moment(expires).utc().format('l'));
    } else {
      return string.replace('{{date}}', "Never");
    }
  };

  return TeacherStudentView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/TeacherStudentView.js.map
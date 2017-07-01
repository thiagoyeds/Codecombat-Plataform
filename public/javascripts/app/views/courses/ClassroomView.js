require.register("templates/courses/classroom-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,_ = locals_._,i18n = locals_.i18n,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<div class=\"alert alert-danger text-center\"><!-- DNT: Temporary--><h3>ATTENTION TEACHERS:</h3><p>We are transitioning to a new classroom management system; this page will soon be student-only.</p><a href=\"/teachers/classes\">Go to teachers area.</a></div>");
}
var isOwner = view.classroom ? view.classroom.get('ownerID') === me.id : false;
if ( isOwner)
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"courses.back_classrooms\"></a>");
}
else
{
buf.push("<a href=\"/students\" data-i18n=\"courses.back_courses\"></a>");
}
if ( !me.isAnonymous())
{
buf.push("<h1><span class=\"spr\">" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span>");
if ( isOwner)
{
buf.push("<a id=\"edit-class-details-link\"><small data-i18n=\"courses.edit_details\"></small></a>");
}
buf.push("</h1>");
if ( view.classroom.get('description'))
{
buf.push("<p>" + (jade.escape(null == (jade.interp = view.classroom.get('description')) ? "" : jade.interp)) + "</p>");
}
buf.push("<h3 data-i18n=\"courses.stats\"></h3><table class=\"progress-stats-container\">");
var stats = view.classStats()
buf.push("<tr><td data-i18n=\"courses.total_students\"></td><td><span class=\"spr\">" + (jade.escape(null == (jade.interp = _.size(view.classroom.get('members'))) ? "" : jade.interp)) + "</span></td></tr><tr><td data-i18n=\"courses.average_time\"></td><td>" + (jade.escape(null == (jade.interp = stats.averagePlaytime) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.total_time\"></td><td>" + (jade.escape(null == (jade.interp = stats.totalPlaytime) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.average_levels\"></td><td>" + (jade.escape(null == (jade.interp = stats.averageLevelsComplete) ? "" : jade.interp)) + "</td></tr><tr><td data-i18n=\"courses.total_levels\"></td><td>" + (jade.escape(null == (jade.interp = stats.totalLevelsComplete) ? "" : jade.interp)) + "</td></tr></table><h1><span data-i18n=\"courses.students\"></span>");
if ( view.teacherMode)
{
buf.push("<div id=\"main-button-area\" class=\"pull-right\"><button id=\"add-students-btn\" data-i18n=\"courses.add_students\" class=\"btn btn-primary text-uppercase\"></button><button id=\"activate-licenses-btn\" data-i18n=\"courses.enroll_paid\" class=\"btn btn-info text-uppercase\"></button><a" + (jade.attrs({ 'href':("/courses/purchase?from-classroom="+view.classroom.id), 'data-i18n':("courses.purchase_enrollments"), "class": [('btn'),('btn-success'),('text-uppercase')] }, {"href":true,"data-i18n":true})) + "></a></div>");
}
buf.push("</h1><hr/>");
// iterate view.users.models
;(function(){
  var $$obj = view.users.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

buf.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</div></div><div class=\"col-md-6\">");
if ( view.teacherMode)
{
buf.push("<a" + (jade.attrs({ 'data-user-id':(user.id), "class": [('remove-student-link'),('pull-right'),('text-uppercase')] }, {"data-user-id":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span data-i18n=\"courses.remove_student\" class=\"spl\"></span></a>");
}
buf.push("</div></div>");
var lastPlayedString = view.userLastPlayedString(user);
var playtime = view.userPlaytimeString(user);
if ( lastPlayedString || playtime)
{
buf.push("<div id=\"student-stats-row\" class=\"row\">");
if ( lastPlayedString)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"user.last_played\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = lastPlayedString) ? "" : jade.interp)) + "</span></div>");
}
if ( playtime)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"clans.playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = playtime) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div>");
}
var paidFor = user.isEnrolled();
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  }
}).call(this);

if ( view.teacherMode && !paidFor)
{
buf.push("<div class=\"text-center\"><p><em><span data-i18n=\"courses.enroll\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</strong><span data-i18n=\"courses.to_assign\" class=\"spl\"></span></em></p><p><button" + (jade.attrs({ 'data-user-id':(user.id), "class": [('activate-single-license-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true})) + "><span data-i18n=\"courses.enroll\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></button></p></div>");
}
buf.push("<hr/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

buf.push("<div class=\"row\"><div class=\"col-md-6\"><div class=\"student-name\">" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</div></div><div class=\"col-md-6\">");
if ( view.teacherMode)
{
buf.push("<a" + (jade.attrs({ 'data-user-id':(user.id), "class": [('remove-student-link'),('pull-right'),('text-uppercase')] }, {"data-user-id":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span data-i18n=\"courses.remove_student\" class=\"spl\"></span></a>");
}
buf.push("</div></div>");
var lastPlayedString = view.userLastPlayedString(user);
var playtime = view.userPlaytimeString(user);
if ( lastPlayedString || playtime)
{
buf.push("<div id=\"student-stats-row\" class=\"row\">");
if ( lastPlayedString)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"user.last_played\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = lastPlayedString) ? "" : jade.interp)) + "</span></div>");
}
if ( playtime)
{
buf.push("<div class=\"col-sm-6\"><span data-i18n=\"clans.playtime\"></span><span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = playtime) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div>");
}
var paidFor = user.isEnrolled();
// iterate view.courseInstances.models
;(function(){
  var $$obj = view.courseInstances.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var courseInstance = $$obj[$index];

var inCourse = _.contains(courseInstance.get('members'), user.id);
if ( !(inCourse || view.teacherMode))
{
continue;
}
var course = view.courses.get(courseInstance.get('courseID'));
var sessions = courseInstance.sessionsByUser[user.id] || [];
if ( !(course.get('free') || paidFor))
{
continue;
}
if ( inCourse)
{
buf.push("<div class=\"row\"><div class=\"col-sm-3 text-right\">" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</div><div class=\"col-sm-9\">");
if ( inCourse)
{
var levels = view.classroom.getLevels({courseID: course.id});
var numLevels = levels.size();
var sessionMap = _.zipObject(_.map(sessions, function(s) { return s.get('level').original; }), sessions);
var levelCellWidth = 100.00;
if ( numLevels > 0)
{
levelCellWidth = 100.00 / numLevels;
}
var css = "width:"+levelCellWidth+"%;"
var i = 0;
buf.push("<div class=\"progress\">");
// iterate levels.models
;(function(){
  var $$obj = levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var trimModel = $$obj[$index];

var level = view.levels.get(trimModel.get('original')); // get the level loaded through the db
var levelNumber = view.classroom.getLevelNumber(level.get('original'), i + 1)
i++
var session = sessionMap[level.get('original')];
buf.push("<a" + (jade.attrs({ 'href':(view.getLevelURL(level, course, courseInstance, session)) }, {"href":true})) + ">");
var content = view.levelPopoverContent(level, session, levelNumber);
if ( session && session.get('state') && session.get('state').complete)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-complete')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else if ( session)
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-started')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div" + (jade.attrs({ 'style':(css), 'data-content':(content), 'data-toggle':('popover'), "class": [('progress-bar'),('progress-bar-default')] }, {"style":true,"data-content":true,"data-toggle":true})) + ">" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</div>");
}
buf.push("</a>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div></div>");
}
else if ( paidFor)
{
buf.push("<div class=\"text-center\"><button" + (jade.attrs({ 'data-user-id':(user.id), 'data-course-instance-cid':(courseInstance.cid), "class": [('enable-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true,"data-course-instance-cid":true})) + "><span data-i18n=\"courses.assign\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = i18n(course.attributes, 'name')) ? "" : jade.interp)) + "</span></button></div>");
}
    }

  }
}).call(this);

if ( view.teacherMode && !paidFor)
{
buf.push("<div class=\"text-center\"><p><em><span data-i18n=\"courses.enroll\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</strong><span data-i18n=\"courses.to_assign\" class=\"spl\"></span></em></p><p><button" + (jade.attrs({ 'data-user-id':(user.id), "class": [('activate-single-license-btn'),('btn'),('btn-info'),('btn-sm'),('text-uppercase')] }, {"data-user-id":true})) + "><span data-i18n=\"courses.enroll\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = user.broadName()) ? "" : jade.interp)) + "</span></button></p></div>");
}
buf.push("<hr/>");
    }

  }
}).call(this);

}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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

;require.register("views/courses/ClassroomView", function(exports, require, module) {
var ActivateLicensesModal, Campaign, Classroom, ClassroomSettingsModal, ClassroomView, Classrooms, CocoCollection, Course, CourseInstance, InviteToClassroomModal, LevelSession, Levels, Prepaid, Prepaids, RemoveStudentModal, RootView, User, popoverTemplate, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Campaign = require('models/Campaign');

CocoCollection = require('collections/CocoCollection');

Course = require('models/Course');

CourseInstance = require('models/CourseInstance');

Classroom = require('models/Classroom');

Classrooms = require('collections/Classrooms');

LevelSession = require('models/LevelSession');

Prepaids = require('collections/Prepaids');

Levels = require('collections/Levels');

RootView = require('views/core/RootView');

template = require('templates/courses/classroom-view');

User = require('models/User');

utils = require('core/utils');

Prepaid = require('models/Prepaid');

ClassroomSettingsModal = require('views/courses/ClassroomSettingsModal');

ActivateLicensesModal = require('views/courses/ActivateLicensesModal');

InviteToClassroomModal = require('views/courses/InviteToClassroomModal');

RemoveStudentModal = require('views/courses/RemoveStudentModal');

popoverTemplate = require('templates/courses/classroom-level-popover');

module.exports = ClassroomView = (function(superClass) {
  extend(ClassroomView, superClass);

  function ClassroomView() {
    return ClassroomView.__super__.constructor.apply(this, arguments);
  }

  ClassroomView.prototype.id = 'classroom-view';

  ClassroomView.prototype.template = template;

  ClassroomView.prototype.teacherMode = false;

  ClassroomView.prototype.events = {
    'click #edit-class-details-link': 'onClickEditClassDetailsLink',
    'click #activate-licenses-btn': 'onClickActivateLicensesButton',
    'click .activate-single-license-btn': 'onClickActivateSingleLicenseButton',
    'click #add-students-btn': 'onClickAddStudentsButton',
    'click .enable-btn': 'onClickEnableButton',
    'click .remove-student-link': 'onClickRemoveStudentLink'
  };

  ClassroomView.prototype.initialize = function(options, classroomID) {
    var ref;
    if (me.isAnonymous()) {
      return;
    }
    this.classroom = new Classroom({
      _id: classroomID
    });
    this.supermodel.loadModel(this.classroom);
    this.courses = new CocoCollection([], {
      url: "/db/course",
      model: Course
    });
    this.courses.comparator = '_id';
    this.supermodel.loadCollection(this.courses);
    this.courses.comparator = '_id';
    this.courseInstances = new CocoCollection([], {
      url: "/db/course_instance",
      model: CourseInstance
    });
    this.courseInstances.comparator = 'courseID';
    this.supermodel.loadCollection(this.courseInstances, {
      data: {
        classroomID: classroomID
      }
    });
    this.prepaids = new Prepaids();
    this.prepaids.comparator = '_id';
    this.prepaids.fetchByCreator(me.id);
    this.supermodel.loadCollection(this.prepaids);
    this.users = new CocoCollection([], {
      url: "/db/classroom/" + classroomID + "/members?memberLimit=100",
      model: User
    });
    this.users.comparator = (function(_this) {
      return function(user) {
        return user.broadName().toLowerCase();
      };
    })(this);
    this.supermodel.loadCollection(this.users);
    this.listenToOnce(this.courseInstances, 'sync', this.onCourseInstancesSync);
    this.sessions = new CocoCollection([], {
      model: LevelSession
    });
    this.ownedClassrooms = new Classrooms();
    this.ownedClassrooms.fetchMine({
      data: {
        project: '_id'
      }
    });
    this.supermodel.trackCollection(this.ownedClassrooms);
    this.levels = new Levels();
    this.levels.fetchForClassroom(classroomID, {
      data: {
        project: 'name,original,practice,slug'
      }
    });
    this.levels.on('add', function(model) {
      return this._byId[model.get('original')] = model;
    });
    this.supermodel.trackCollection(this.levels);
    return (ref = window.tracker) != null ? ref.trackEvent('Students Class Loaded', {
      category: 'Students',
      classroomID: classroomID
    }, ['Mixpanel']) : void 0;
  };

  ClassroomView.prototype.onCourseInstancesSync = function() {
    var course, courseInstance, j, k, len, len1, query, ref, ref1, results, sessions;
    this.sessions = new CocoCollection([], {
      model: LevelSession
    });
    ref = this.courseInstances.models;
    for (j = 0, len = ref.length; j < len; j++) {
      courseInstance = ref[j];
      sessions = new CocoCollection([], {
        url: "/db/course_instance/" + courseInstance.id + "/level_sessions",
        model: LevelSession
      });
      this.supermodel.loadCollection(sessions, {
        data: {
          project: ['level', 'playtime', 'creator', 'changed', 'state.complete'].join(' ')
        }
      });
      courseInstance.sessions = sessions;
      sessions.courseInstance = courseInstance;
      courseInstance.sessionsByUser = {};
      this.listenToOnce(sessions, 'sync', function(sessions) {
        var k, len1, ref1, results;
        this.sessions.add(sessions.slice());
        ref1 = this.courseInstances.models;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          courseInstance = ref1[k];
          results.push(courseInstance.sessionsByUser = courseInstance.sessions.groupBy('creator'));
        }
        return results;
      });
    }
    ref1 = this.courses.models;
    results = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      course = ref1[k];
      query = {
        courseID: course.id,
        classroomID: this.classroom.id
      };
      courseInstance = this.courseInstances.findWhere(query);
      if (!courseInstance) {
        courseInstance = new CourseInstance(query);
        this.courseInstances.add(courseInstance);
        courseInstance.sessions = new CocoCollection([], {
          model: LevelSession
        });
        sessions.courseInstance = courseInstance;
        results.push(courseInstance.sessionsByUser = {});
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ClassroomView.prototype.onLoaded = function() {
    var course, courseID, courseInstance, j, k, len, len1, ref, ref1, user, userSessions;
    this.teacherMode = me.isAdmin() || this.classroom.get('ownerID') === me.id;
    userSessions = this.sessions.groupBy('creator');
    ref = this.users.models;
    for (j = 0, len = ref.length; j < len; j++) {
      user = ref[j];
      user.sessions = new CocoCollection(userSessions[user.id], {
        model: LevelSession
      });
      user.sessions.comparator = 'changed';
      user.sessions.sort();
    }
    ref1 = this.courseInstances.models;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      courseInstance = ref1[k];
      courseID = courseInstance.get('courseID');
      course = this.courses.get(courseID);
      courseInstance.sessions.course = course;
    }
    return ClassroomView.__super__.onLoaded.call(this);
  };

  ClassroomView.prototype.afterRender = function() {
    this.$('[data-toggle="popover"]').popover({
      html: true,
      trigger: 'hover',
      placement: 'top'
    });
    return ClassroomView.__super__.afterRender.call(this);
  };

  ClassroomView.prototype.onClickActivateLicensesButton = function() {
    var modal, ref;
    modal = new ActivateLicensesModal({
      classroom: this.classroom,
      users: this.users
    });
    this.openModalView(modal);
    modal.once('redeem-users', function() {
      return document.location.reload();
    });
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom started enroll students', {
      category: 'Courses'
    }) : void 0;
  };

  ClassroomView.prototype.onClickActivateSingleLicenseButton = function(e) {
    var modal, prepaid, ref, user, userID;
    userID = $(e.target).closest('.btn').data('user-id');
    if (this.prepaids.totalMaxRedeemers() - this.prepaids.totalRedeemers() > 0) {
      prepaid = this.prepaids.find(function(prepaid) {
        return prepaid.status() === 'available';
      });
      return $.ajax({
        method: 'POST',
        url: _.result(prepaid, 'url') + '/redeemers',
        data: {
          userID: userID
        },
        success: (function(_this) {
          return function() {
            var ref;
            if ((ref = application.tracker) != null) {
              ref.trackEvent('Classroom finished enroll student', {
                category: 'Courses',
                userID: userID
              });
            }
            return document.location.reload();
          };
        })(this),
        error: function(jqxhr, textStatus, errorThrown) {
          var message;
          if (jqxhr.status === 402) {
            message = arguments[2];
          } else {
            message = jqxhr.status + ": " + jqxhr.responseText;
          }
          return console.err(message);
        }
      });
    } else {
      user = this.users.get(userID);
      modal = new ActivateLicensesModal({
        classroom: this.classroom,
        users: this.users,
        user: user
      });
      this.openModalView(modal);
      modal.once('redeem-users', function() {
        return document.location.reload();
      });
      return (ref = application.tracker) != null ? ref.trackEvent('Classroom started enroll student', {
        category: 'Courses',
        userID: userID
      }) : void 0;
    }
  };

  ClassroomView.prototype.onClickEditClassDetailsLink = function() {
    var modal;
    modal = new ClassroomSettingsModal({
      classroom: this.classroom
    });
    this.openModalView(modal);
    return this.listenToOnce(modal, 'hidden', this.render);
  };

  ClassroomView.prototype.userLastPlayedString = function(user) {
    var course, lastPlayed, level, levelOriginal, session;
    if (user.sessions == null) {
      return '';
    }
    session = user.sessions.last();
    if (!session) {
      return '';
    }
    course = session.collection.course;
    levelOriginal = session.get('level').original;
    level = this.levels.findWhere({
      original: levelOriginal
    });
    lastPlayed = "";
    if (course) {
      lastPlayed += course.get('name');
    }
    if (level) {
      lastPlayed += ", " + (level.get('name'));
    }
    return lastPlayed;
  };

  ClassroomView.prototype.userPlaytimeString = function(user) {
    var playtime;
    if (user.sessions == null) {
      return '';
    }
    playtime = _.reduce(user.sessions.pluck('playtime'), function(s1, s2) {
      return (s1 || 0) + (s2 || 0);
    });
    if (!playtime) {
      return '';
    }
    return moment.duration(playtime, 'seconds').humanize();
  };

  ClassroomView.prototype.classStats = function() {
    var completeSessions, enrolledUsers, j, k, len, len1, level, levelPracticeMap, playtime, pt, ref, ref1, ref2, session, stats, total;
    stats = {};
    playtime = 0;
    total = 0;
    ref = this.sessions.models;
    for (j = 0, len = ref.length; j < len; j++) {
      session = ref[j];
      pt = session.get('playtime') || 0;
      playtime += pt;
      total += 1;
    }
    stats.averagePlaytime = playtime && total ? moment.duration(playtime / total, "seconds").humanize() : 0;
    stats.totalPlaytime = playtime ? moment.duration(playtime, "seconds").humanize() : 0;
    levelPracticeMap = {};
    ref1 = this.levels.models;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      level = ref1[k];
      levelPracticeMap[level.id] = (ref2 = level.get('practice')) != null ? ref2 : false;
    }
    completeSessions = this.sessions.filter(function(s) {
      var ref3;
      return ((ref3 = s.get('state')) != null ? ref3.complete : void 0) && !levelPracticeMap[s.get('levelID')];
    });
    stats.averageLevelsComplete = this.users.size() ? (_.size(completeSessions) / this.users.size()).toFixed(1) : 'N/A';
    stats.totalLevelsComplete = _.size(completeSessions);
    enrolledUsers = this.users.filter(function(user) {
      return user.isEnrolled();
    });
    stats.enrolledUsers = _.size(enrolledUsers);
    return stats;
  };

  ClassroomView.prototype.onClickAddStudentsButton = function(e) {
    var modal, ref;
    modal = new InviteToClassroomModal({
      classroom: this.classroom
    });
    this.openModalView(modal);
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom started add students', {
      category: 'Courses',
      classroomID: this.classroom.id
    }) : void 0;
  };

  ClassroomView.prototype.onClickEnableButton = function(e) {
    var $button, courseInstance, onCourseInstanceCreated, ref, userID;
    $button = $(e.target).closest('.btn');
    courseInstance = this.courseInstances.get($button.data('course-instance-cid'));
    console.log('looking for course instance', courseInstance, 'for', $button.data('course-instance-cid'), 'out of', this.courseInstances);
    userID = $button.data('user-id');
    $button.attr('disabled', true);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Course assign student', {
        category: 'Courses',
        courseInstanceID: courseInstance.id,
        userID: userID
      });
    }
    onCourseInstanceCreated = (function(_this) {
      return function() {
        courseInstance.addMember(userID);
        return _this.listenToOnce(courseInstance, 'sync', _this.render);
      };
    })(this);
    if (courseInstance.isNew()) {
      if (!courseInstance.saving) {
        courseInstance.save(null, {
          validate: false
        });
        courseInstance.saving = true;
      }
      return courseInstance.once('sync', onCourseInstanceCreated);
    } else {
      return onCourseInstanceCreated();
    }
  };

  ClassroomView.prototype.onClickRemoveStudentLink = function(e) {
    var modal, user;
    user = this.users.get($(e.target).closest('a').data('user-id'));
    modal = new RemoveStudentModal({
      classroom: this.classroom,
      user: user,
      courseInstances: this.courseInstances
    });
    this.openModalView(modal);
    return modal.once('remove-student', this.onStudentRemoved, this);
  };

  ClassroomView.prototype.onStudentRemoved = function(e) {
    var ref;
    this.users.remove(e.user);
    this.render();
    return (ref = application.tracker) != null ? ref.trackEvent('Classroom removed student', {
      category: 'Courses',
      classroomID: this.classroom.id,
      userID: e.user.id
    }) : void 0;
  };

  ClassroomView.prototype.levelPopoverContent = function(level, session, i) {
    var context;
    if (!level) {
      return null;
    }
    context = {
      moment: moment,
      level: level,
      session: session,
      i: i,
      canViewSolution: this.teacherMode
    };
    return popoverTemplate(context);
  };

  ClassroomView.prototype.getLevelURL = function(level, course, courseInstance, session) {
    if (!(this.teacherMode && _.all(arguments))) {
      return null;
    }
    return "/play/level/" + (level.get('slug')) + "?course=" + course.id + "&course-instance=" + courseInstance.id + "&session=" + session.id + "&observing=true";
  };

  return ClassroomView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/ClassroomView.js.map
require.register("templates/admin/admin-classrooms-progress", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,lastTeacherId = locals_.lastTeacherId;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\">");
if ( !me.isAdmin())
{
buf.push("<div class=\"text-center\">You must be logged in as an admin to view this page.</div>");
}
else
{
buf.push("<h1>Classroom progress vs. available content</h1><div class=\"small\">Classroom progress vs. available content is against individual classroom version of content</div><div class=\"small\">Licenses with end dates between now and " + (jade.escape((jade.interp = view.licenseEndMonths) == null ? '' : jade.interp)) + " months, with at least one redeemer</div><div class=\"small\">Reduce licenseEndMonths query variable if page doesn't load</div><div class=\"small\">Progress rows are per-license for a given classroom owner</div><div class=\"small\">Hover mouse over little dashes, vertical bars, etc. for more info</div><div class=\"small\">Users column is number of students for classroom details row, and number of redeemed licenses for colorful per-license progress row</div><div class=\"small\"><table class=\"table table-condensed\"><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"completed-background\"></span><span style=\"left:0%; width:100%;\" class=\"course-cell\"><div class=\"course-cell-text\">CS1</div></span></td><td>&nbsp; completed course</td></tr><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"completed-background\"></span><span style=\"left:0%; width:100%;\" class=\"course-cell\"><div class=\"course-cell-text\">CS1</div></span><span style=\"height:5px; left:70px; width:6px;\" title=\"level\" class=\"level-cell\"></span><span style=\"height:5px; left:76px; width:6px;\" title=\"level\" class=\"level-cell\"></span></td><td>&nbsp; level</td></tr><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"completed-background\"></span><span style=\"left:0%; width:100%;\" class=\"course-cell\"><div class=\"course-cell-text\">CS1</div></span><span style=\"height:20px; left:30%; width:6px;\" title=\"student\" class=\"student-cell\"></span><span style=\"height:5px; left:30%; width:6px;\" title=\"level\" class=\"level-cell\"></span></td><td>&nbsp; furthest level for an individual student</td></tr><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"remaining-background\"></span><span style=\"left:0%; width:100%;\" class=\"course-cell\"><div class=\"course-cell-text\">CS2</div></span></td><td>&nbsp; remaining course in classroom</td></tr><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"remaining-background\"></span><span style=\"left:0%; width:100%;\" class=\"course-cell\"><div class=\"course-cell-text\">CS2</div></span><span style=\"height:20px; left:70%; width:6px;\" title=\"student\" class=\"missing-level-cell\"></span><span style=\"height:5px; left:70%; width:6px;\" title=\"level\" class=\"level-cell\"></span></td><td>&nbsp; released level, but not available in classroom</td></tr><tr><td style=\"height: 20px; width:100px;\" class=\"range-container\"><span style=\"height:20px; width: 100%;\" class=\"available-background\"></span><span style=\"left:0%; width:100%;\" class=\"missing-course-cell\"><div class=\"course-cell-text\">CS3</div></span></td><td>&nbsp; released course, but not available in classroom</td></tr></table></div>");
if ( !view.classroomProgress)
{
buf.push("<h1 class=\"text-center\">Loading..</h1>");
}
else
{
buf.push("<div class=\"small\"><table class=\"table table-striped table-condensed\"><tr><td></td><td>Teacher name, email, id</td><td></td><td></td><td>Class</td><td>Latest Activity</td><td class=\"text-center\">Users</td><td class=\"text-center\">Start</td><td class=\"text-center\">End</td></tr>");
lastTeacherId = null;
// iterate view.classroomProgress || []
;(function(){
  var $$obj = view.classroomProgress || [];
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var classroomData = $$obj[index];

buf.push("<tr><td>" + (jade.escape((jade.interp = index + 1) == null ? '' : jade.interp)) + ".</td><td>" + (jade.escape((jade.interp = view.teacherMap[classroomData.classroom.ownerID].name || 'Anonymous') == null ? '' : jade.interp)) + "</td>");
if ( lastTeacherId !== classroomData.classroom.ownerID)
{
buf.push("<td>" + (jade.escape((jade.interp = view.teacherMap[classroomData.classroom.ownerID].emailLower) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroomData.classroom.ownerID) == null ? '' : jade.interp)) + "</td>");
lastTeacherId = classroomData.classroom.ownerID;
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("<td><a" + (jade.attrs({ 'href':('/teachers/classes/' + (classroomData.classroom._id) + '') }, {"href":true})) + ">" + (jade.escape((jade.interp = classroomData.classroom.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = classroomData.latestActivity ? classroomData.latestActivity.substring(0, 10) : 'n/a') == null ? '' : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape((jade.interp = classroomData.classroom.members.length) == null ? '' : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape((jade.interp = new Date(parseInt(classroomData.classroom._id.substring(0, 8), 16) * 1000).toISOString().substring(0, 10)) == null ? '' : jade.interp)) + "</td><td class=\"text-center\">n/a</td></tr>");
// iterate classroomData.licenses
;(function(){
  var $$obj = classroomData.licenses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var licenseData = $$obj[$index];

var totalLevels = licenseData.levels.length;
var numMissingCourseLevels = 0
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  }
}).call(this);

var completedRatio = (licenseData.furthestLevelIndex + 1) / totalLevels;
var remainingRatio = (licenseData.levels.length - licenseData.furthestLevelIndex - 1) / totalLevels;
var availableRatio = numMissingCourseLevels / totalLevels;
var levelCellWidth = 100 / (totalLevels);
buf.push("<tr><td colspan=\"6\" class=\"range-container\"><span" + (jade.attrs({ 'style':("width:" + (completedRatio * 100) + "%;"), "class": [('completed-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio) * 100) + "%; width:" + (remainingRatio * 100) + "%;"), "class": [('remaining-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio + remainingRatio) * 100) + "%; width:" + (availableRatio * 100) + "%;"), "class": [('available-background')] }, {"style":true})) + "></span>");
// iterate licenseData.courseLastLevelIndexes
;(function(){
  var $$obj = licenseData.courseLastLevelIndexes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  }
}).call(this);

var missingCourseLastIndex = licenseData.levels.length;
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  }
}).call(this);

// iterate licenseData.levels
;(function(){
  var $$obj = licenseData.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

buf.push("</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.redeemers.length) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.startDate.substring(0, 10)) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.endDate.substring(0, 10)) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var licenseData = $$obj[$index];

var totalLevels = licenseData.levels.length;
var numMissingCourseLevels = 0
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  }
}).call(this);

var completedRatio = (licenseData.furthestLevelIndex + 1) / totalLevels;
var remainingRatio = (licenseData.levels.length - licenseData.furthestLevelIndex - 1) / totalLevels;
var availableRatio = numMissingCourseLevels / totalLevels;
var levelCellWidth = 100 / (totalLevels);
buf.push("<tr><td colspan=\"6\" class=\"range-container\"><span" + (jade.attrs({ 'style':("width:" + (completedRatio * 100) + "%;"), "class": [('completed-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio) * 100) + "%; width:" + (remainingRatio * 100) + "%;"), "class": [('remaining-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio + remainingRatio) * 100) + "%; width:" + (availableRatio * 100) + "%;"), "class": [('available-background')] }, {"style":true})) + "></span>");
// iterate licenseData.courseLastLevelIndexes
;(function(){
  var $$obj = licenseData.courseLastLevelIndexes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  }
}).call(this);

var missingCourseLastIndex = licenseData.levels.length;
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  }
}).call(this);

// iterate licenseData.levels
;(function(){
  var $$obj = licenseData.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

buf.push("</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.redeemers.length) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.startDate.substring(0, 10)) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.endDate.substring(0, 10)) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var classroomData = $$obj[index];

buf.push("<tr><td>" + (jade.escape((jade.interp = index + 1) == null ? '' : jade.interp)) + ".</td><td>" + (jade.escape((jade.interp = view.teacherMap[classroomData.classroom.ownerID].name || 'Anonymous') == null ? '' : jade.interp)) + "</td>");
if ( lastTeacherId !== classroomData.classroom.ownerID)
{
buf.push("<td>" + (jade.escape((jade.interp = view.teacherMap[classroomData.classroom.ownerID].emailLower) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = classroomData.classroom.ownerID) == null ? '' : jade.interp)) + "</td>");
lastTeacherId = classroomData.classroom.ownerID;
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("<td><a" + (jade.attrs({ 'href':('/teachers/classes/' + (classroomData.classroom._id) + '') }, {"href":true})) + ">" + (jade.escape((jade.interp = classroomData.classroom.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = classroomData.latestActivity ? classroomData.latestActivity.substring(0, 10) : 'n/a') == null ? '' : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape((jade.interp = classroomData.classroom.members.length) == null ? '' : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape((jade.interp = new Date(parseInt(classroomData.classroom._id.substring(0, 8), 16) * 1000).toISOString().substring(0, 10)) == null ? '' : jade.interp)) + "</td><td class=\"text-center\">n/a</td></tr>");
// iterate classroomData.licenses
;(function(){
  var $$obj = classroomData.licenses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var licenseData = $$obj[$index];

var totalLevels = licenseData.levels.length;
var numMissingCourseLevels = 0
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  }
}).call(this);

var completedRatio = (licenseData.furthestLevelIndex + 1) / totalLevels;
var remainingRatio = (licenseData.levels.length - licenseData.furthestLevelIndex - 1) / totalLevels;
var availableRatio = numMissingCourseLevels / totalLevels;
var levelCellWidth = 100 / (totalLevels);
buf.push("<tr><td colspan=\"6\" class=\"range-container\"><span" + (jade.attrs({ 'style':("width:" + (completedRatio * 100) + "%;"), "class": [('completed-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio) * 100) + "%; width:" + (remainingRatio * 100) + "%;"), "class": [('remaining-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio + remainingRatio) * 100) + "%; width:" + (availableRatio * 100) + "%;"), "class": [('available-background')] }, {"style":true})) + "></span>");
// iterate licenseData.courseLastLevelIndexes
;(function(){
  var $$obj = licenseData.courseLastLevelIndexes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  }
}).call(this);

var missingCourseLastIndex = licenseData.levels.length;
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  }
}).call(this);

// iterate licenseData.levels
;(function(){
  var $$obj = licenseData.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

buf.push("</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.redeemers.length) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.startDate.substring(0, 10)) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.endDate.substring(0, 10)) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var licenseData = $$obj[$index];

var totalLevels = licenseData.levels.length;
var numMissingCourseLevels = 0
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var missingCourse = $$obj[$index];

totalLevels += missingCourse.levels.length;
numMissingCourseLevels += missingCourse.levels.length;
    }

  }
}).call(this);

var completedRatio = (licenseData.furthestLevelIndex + 1) / totalLevels;
var remainingRatio = (licenseData.levels.length - licenseData.furthestLevelIndex - 1) / totalLevels;
var availableRatio = numMissingCourseLevels / totalLevels;
var levelCellWidth = 100 / (totalLevels);
buf.push("<tr><td colspan=\"6\" class=\"range-container\"><span" + (jade.attrs({ 'style':("width:" + (completedRatio * 100) + "%;"), "class": [('completed-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio) * 100) + "%; width:" + (remainingRatio * 100) + "%;"), "class": [('remaining-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + ((completedRatio + remainingRatio) * 100) + "%; width:" + (availableRatio * 100) + "%;"), "class": [('available-background')] }, {"style":true})) + "></span>");
// iterate licenseData.courseLastLevelIndexes
;(function(){
  var $$obj = licenseData.courseLastLevelIndexes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var data = $$obj[index];

var courseCellOffest = (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index + 1 : 0) / totalLevels * 100;
var courseCellWidth = (data.index - (index > 0 ? licenseData.courseLastLevelIndexes[index - 1].index : -1)) / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('course-cell')] }, {"style":true})) + ">");
if ( view.latestCourseMap[data.courseId])
{
buf.push("<div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div>");
}
else
{
console.log('no course?', data);
}
buf.push("</span>");
    }

  }
}).call(this);

var missingCourseLastIndex = licenseData.levels.length;
// iterate licenseData.missingCourses
;(function(){
  var $$obj = licenseData.missingCourses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

var courseCellOffest = (missingCourseLastIndex) / totalLevels * 100;
var courseCellWidth = data.levels.length / totalLevels * 100;
buf.push("<span" + (jade.attrs({ 'style':("left:" + (courseCellOffest) + "%; width:" + (courseCellWidth) + "%;"), "class": [('missing-course-cell')] }, {"style":true})) + "><div class=\"course-cell-text\">" + (jade.escape((jade.interp = (view.courseAcronymMap[data.courseId] || view.latestCourseMap[data.courseId].slug)) == null ? '' : jade.interp)) + "</div></span>");
// iterate data.levels
;(function(){
  var $$obj = data.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var levelOriginal = $$obj[index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth + courseCellOffest) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[levelOriginal] || levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

missingCourseLastIndex += data.levels.length;
    }

  }
}).call(this);

// iterate licenseData.levels
;(function(){
  var $$obj = licenseData.levels;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var level = $$obj[index];

if ( level.numUsers > 0)
{
var title = level.numUsers + " students on level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal);
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("" + (title) + ""), "class": [('student-cell')] }, {"style":true,"title":true})) + "></span>");
}
else if ( level.missing)
{
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%;width:" + (levelCellWidth) + "%"), 'title':("level " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + " is released but not available in this classroom version"), "class": [('missing-level-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("<span" + (jade.attrs({ 'style':("left:" + (index * levelCellWidth) + "%; width:" + (levelCellWidth) + "%"), 'title':("" + (index + 1) + ". " + (view.latestLevelSlugMap[level.levelOriginal] || level.levelOriginal) + ""), "class": [('level-cell')] }, {"style":true,"title":true})) + "></span>");
    }

  }
}).call(this);

buf.push("</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.redeemers.length) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.startDate.substring(0, 10)) ? "" : jade.interp)) + "</td><td class=\"text-center\">" + (jade.escape(null == (jade.interp = licenseData.license.endDate.substring(0, 10)) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</table></div>");
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

;
//# sourceMappingURL=/javascripts/app/templates/admin/admin-classrooms-progress.js.map
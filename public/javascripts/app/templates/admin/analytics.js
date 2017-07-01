require.register("templates/admin/analytics", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
if ( me.isAdmin())
{
buf.push("<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-5 big-stat active-classes\"><div class=\"description\">Monthly Active Classes</div>");
if ( view.activeClasses.length > 0)
{
buf.push("<div class=\"count\">" + (jade.escape(null == (jade.interp = view.activeClasses[0].groups[view.activeClasses[0].groups.length - 1]) ? "" : jade.interp)) + "</div>");
}
buf.push("</div><div class=\"col-md-5 big-stat recurring-revenue\"><div class=\"description\">Home Monthly Recurring Revenue</div><div class=\"count\">$" + (jade.escape((jade.interp = Math.round((view.yearMonthMrrMap[new Date().toISOString().substring(0, 7)] || 0) / 100)) == null ? '' : jade.interp)) + "</div></div><div class=\"col-md-5 big-stat classroom-active-users\"><div class=\"description\">Classroom Monthly Active Users</div>");
if ( view.activeUsers.length > 0)
{
var classroomBigMAU = 0;
// iterate view.activeUsers[0].events
;(function(){
  var $$obj = view.activeUsers[0].events;
  if ('number' == typeof $$obj.length) {

    for (var event = 0, $$l = $$obj.length; event < $$l; event++) {
      var count = $$obj[event];

if ( event.indexOf('MAU classroom') >= 0)
{
classroomBigMAU += count;
}
    }

  } else {
    var $$l = 0;
    for (var event in $$obj) {
      $$l++;      var count = $$obj[event];

if ( event.indexOf('MAU classroom') >= 0)
{
classroomBigMAU += count;
}
    }

  }
}).call(this);

buf.push("<div class=\"count\">" + (jade.escape(null == (jade.interp = classroomBigMAU) ? "" : jade.interp)) + "</div>");
}
buf.push("</div><div class=\"col-md-5 big-stat campaign-active-users\"><div class=\"description\">Home Monthly Active Users</div>");
if ( view.activeUsers.length > 0)
{
var homeBigMAU = 0;
// iterate view.activeUsers[0].events
;(function(){
  var $$obj = view.activeUsers[0].events;
  if ('number' == typeof $$obj.length) {

    for (var event = 0, $$l = $$obj.length; event < $$l; event++) {
      var count = $$obj[event];

if ( event.indexOf('MAU campaign') >= 0)
{
homeBigMAU += count;
}
    }

  } else {
    var $$l = 0;
    for (var event in $$obj) {
      $$l++;      var count = $$obj[event];

if ( event.indexOf('MAU campaign') >= 0)
{
homeBigMAU += count;
}
    }

  }
}).call(this);

buf.push("<div class=\"count\">" + (jade.escape(null == (jade.interp = homeBigMAU) ? "" : jade.interp)) + "</div>");
}
buf.push("</div></div></div><ul class=\"nav nav-tabs\"><li class=\"active\"><a data-target=\"#tab_kpis\" data-toggle=\"tab\">KPIs</a></li><li><a data-target=\"#tab_active_classes\" data-toggle=\"tab\">Active Classes</a></li><li><a data-target=\"#tab_revenue\" data-toggle=\"tab\">Revenue</a></li><li><a data-target=\"#tab_classroom\" data-toggle=\"tab\">Classroom</a></li><li><a data-target=\"#tab_campaign\" data-toggle=\"tab\">Home</a></li><li><a data-target=\"#tab_campaign_vs_classroom\" data-toggle=\"tab\">Home vs Classroom</a></li></ul><div class=\"tab-content\"><div id=\"tab_kpis\" class=\"tab-pane active\"><h3>KPI 60 days</h3><div class=\"kpi-recent-chart line-chart-container\"></div><h3>KPI 365 days</h3><div class=\"kpi-chart line-chart-container\"></div></div><div id=\"tab_active_classes\" class=\"tab-pane\"><h3>Active Classes 90 days</h3><div class=\"small\">Active class: 12+ students in a classroom, with 6+ who played in last 30 days. Played == 'Started Level' analytics event.</div><div class=\"small\">Paid student: user.coursePrepaid set and prepaid.properties.trialRequestID NOT set</div><div class=\"small\">Trial student: user.coursePrepaid set and prepaid.properties.trialRequestID set</div><div class=\"small\">Paid class: at least one paid student in the classroom</div><div class=\"small\">Trial class: not paid, at least one trial student in classroom</div><div class=\"small\">Free class: not paid, not trial</div><div class=\"active-classes-chart-90 line-chart-container\"></div><h3>Active Classes 365 days</h3><div class=\"active-classes-chart-365 line-chart-container\"></div><h1>Active Classes</h1><table class=\"table table-striped table-condensed\"><tr><th>Day</th>");
// iterate view.activeClassGroups
;(function(){
  var $$obj = view.activeClassGroups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var group = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = group.replace('Active classes', '')) ? "" : jade.interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var group = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = group.replace('Active classes', '')) ? "" : jade.interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr>");
// iterate view.activeClasses
;(function(){
  var $$obj = view.activeClasses;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var activeClass = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeClass.day) ? "" : jade.interp)) + "</td>");
// iterate activeClass.groups
;(function(){
  var $$obj = activeClass.groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = val) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = val) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var activeClass = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeClass.day) ? "" : jade.interp)) + "</td>");
// iterate activeClass.groups
;(function(){
  var $$obj = activeClass.groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = val) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = val) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table></div><div id=\"tab_revenue\" class=\"tab-pane\"><br/><ul><li><a href=\"#revenueHomeDaily90\">Home Daily Revenue 90 days</a></li><li><a href=\"#revenueHomeMonthly90\">Home Monthly Revenue 90 days</a></li><li><a href=\"#revenueHomDaily365\">Home Daily Revenue 365 days</a></li><li><a href=\"#revenueHomeMonthly365\">Home Monthly Revenue 365 days</a></li><li><a href=\"#revenueSchoolSales\">School Sales</a></li><li><a href=\"#revenueHomeMrr\">Home MRR</a></li><li><a href=\"#revenueHomeRevenue\">Home Revenue</a></li></ul><a name=\"revenueHomeDaily90\"></a><h3>Home Daily Revenue 90 days</h3><div class=\"recurring-daily-revenue-chart-90 line-chart-container\"></div><a name=\"revenueHomeMonthly90\"></a><h3>Home Monthly Revenue 90 days</h3><div class=\"recurring-monthly-revenue-chart-90 line-chart-container\"></div><a name=\"revenueHomDaily365\"></a><h3>Home Daily Revenue 365 days</h3><div class=\"recurring-daily-revenue-chart-365 line-chart-container\"></div><a name=\"revenueHomeMonthly365\"></a><h3>Home Monthly Revenue 365 days</h3><div class=\"recurring-monthly-revenue-chart-365 line-chart-container\"></div><a name=\"revenueSchoolSales\"></a><div class=\"school-sales\"><h3>School Sales</h3>");
if ( view.schoolSales)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Amount</th><th style=\"min-width:85px;\">Created</th><th>PaymentID</th><th>PrepaidID</th><th>Description</th><th>Email</th><th>School</th></tr>");
// iterate view.schoolSales
;(function(){
  var $$obj = view.schoolSales;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var val = $$obj[i];

buf.push("<tr><td>$" + (jade.escape((jade.interp = val.amount / 100) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = new Date(val.created).toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.prepaidID) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.description) ? "" : jade.interp)) + "</td>");
if ( val.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = val.user.emailLower) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.user.schoolName) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var val = $$obj[i];

buf.push("<tr><td>$" + (jade.escape((jade.interp = val.amount / 100) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = new Date(val.created).toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.prepaidID) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.description) ? "" : jade.interp)) + "</td>");
if ( val.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = val.user.emailLower) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.user.schoolName) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<div>Loading ...</div>");
}
buf.push("</div><a name=\"revenueHomeMrr\"></a><h1>Home MRR</h1><div class=\"small\">MRR = yearly subs + monthly subs + terminal subs + gems</div><div class=\"small\">Yearly sub purchase values not spread across timeframe.</div><div class=\"small\">Terminal sub purchase values not spread across timeframe.</div><table class=\"table table-striped table-condensed\"><tr><th>Month</th><th>Gems</th><th>Monthly subs</th><th>Yearly subs</th><th>MRR</th></tr>");
// iterate view.monthMrrMap
;(function(){
  var $$obj = view.monthMrrMap;
  if ('number' == typeof $$obj.length) {

    for (var month = 0, $$l = $$obj.length; month < $$l; month++) {
      var revenue = $$obj[month];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = month) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.gems / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.monthly / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.yearly / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.total / 100)) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var month in $$obj) {
      $$l++;      var revenue = $$obj[month];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = month) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.gems / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.monthly / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.yearly / 100)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = Math.round(revenue.total / 100)) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table><a name=\"revenueHomeRevenue\"></a><h1>Home Revenue</h1><table class=\"table table-striped table-condensed\"><tr><th style=\"min-width:85px;\">Day</th>");
// iterate view.revenueGroups
;(function(){
  var $$obj = view.revenueGroups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var group = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = group.replace('DRR ', 'Daily ').replace('MRR ', 'Monthly ')) ? "" : jade.interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var group = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = group.replace('DRR ', 'Daily ').replace('MRR ', 'Monthly ')) ? "" : jade.interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr>");
// iterate view.revenue
;(function(){
  var $$obj = view.revenue;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var entry = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = entry.day) ? "" : jade.interp)) + "</td>");
// iterate entry.groups
;(function(){
  var $$obj = entry.groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<td>$" + (jade.escape((jade.interp = (val / 100).toFixed(2)) == null ? '' : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<td>$" + (jade.escape((jade.interp = (val / 100).toFixed(2)) == null ? '' : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var entry = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = entry.day) ? "" : jade.interp)) + "</td>");
// iterate entry.groups
;(function(){
  var $$obj = entry.groups;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<td>$" + (jade.escape((jade.interp = (val / 100).toFixed(2)) == null ? '' : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<td>$" + (jade.escape((jade.interp = (val / 100).toFixed(2)) == null ? '' : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table></div><div id=\"tab_classroom\" class=\"tab-pane\"><h3>Classroom Daily Active Users 90 days</h3><div class=\"small\">Paid student: user.coursePrepaid set and prepaid.properties.trialRequestID NOT set</div><div class=\"small\">Trial student: user.coursePrepaid set and prepaid.properties.trialRequestID set</div><div class=\"small\">Free student: not paid, not trial</div><div class=\"classroom-daily-active-users-chart-90 line-chart-container\"></div><h3>Classroom Monthly Active Users 90 days</h3><div class=\"classroom-monthly-active-users-chart-90 line-chart-container\"></div><h3>Classroom Daily Active Users 365 days</h3><div class=\"classroom-daily-active-users-chart-365 line-chart-container\"></div><h3>Classroom Monthly Active Users 365 days</h3><div class=\"classroom-monthly-active-users-chart-365 line-chart-container\"></div><h3>Licenses Issued and Redeemed 90 days</h3><div class=\"paid-courses-chart line-chart-container\"></div><div id=\"furthest-course\"><h3>Furthest Course in last " + (jade.escape((jade.interp = view.furthestCourseDayRangeRecent) == null ? '' : jade.interp)) + " days</h3><div class=\"small\">Restricted to courses instances from last " + (jade.escape((jade.interp = view.furthestCourseDayRangeRecent) == null ? '' : jade.interp)) + " days</div><div class=\"small\">Teacher: owner of a course instance</div><div class=\"small\">Student: member of a course instance (assigned to course)</div><div class=\"small\">Only course.releasePhase == 'released'</div><div class=\"small\">For course instances != Single Player, hourOfCode != true</div><div class=\"small\">Counts are not summed.  I.e. a student or teacher only contributes to the count of one course</div><div class=\"small\">Paid student: user.coursePrepaid set and prepaid.properties.trialRequestID NOT set</div><div class=\"small\">Trial student: user.coursePrepaid set and prepaid.properties.trialRequestID set</div><div class=\"small\">Free student: not paid, not trial</div><div class=\"small\">Paid teacher: at least one paid student in course instance</div><div class=\"small\">Trial teacher: at least one trial student in course instance, and no paid students</div><div class=\"small\">Free teacher: no paid students, no trial students</div><div class=\"small\">Paid status takes precedent over furthest course, so teacher furthest course is furthest course of highest paid status student</div>");
if ( view.courseDistributionsRecent)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Course</th><th>Paid Teachers</th><th>Trial Teachers</th><th>Free Teachers</th><th>Total Teachers</th><th>Paid Students</th><th>Trial Students</th><th>Free Students</th><th>Total Students</th></tr>");
// iterate view.courseDistributionsRecent
;(function(){
  var $$obj = view.courseDistributionsRecent;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var row = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = row.courseName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Students'] || 0) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var row = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = row.courseName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Students'] || 0) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<br/><p>Loading ...</p>");
}
buf.push("<h3>Furthest Course in last " + (jade.escape((jade.interp = view.furthestCourseDayRange) == null ? '' : jade.interp)) + " days</h3>");
if ( view.courseDistributions)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Course</th><th>Paid Teachers</th><th>Trial Teachers</th><th>Free Teachers</th><th>Total Teachers</th><th>Paid Students</th><th>Trial Students</th><th>Free Students</th><th>Total Students</th></tr>");
// iterate view.courseDistributions
;(function(){
  var $$obj = view.courseDistributions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var row = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = row.courseName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Students'] || 0) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var row = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = row.courseName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Teachers'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Paid Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Trial Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Free Students'] || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = row.totals['Total Students'] || 0) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<br/><p>Loading ...</p>");
}
buf.push("</div><div class=\"school-sales\"><h3>School Sales</h3>");
if ( view.schoolSales)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Amount</th><th style=\"min-width:85px;\">Created</th><th>PaymentID</th><th>PrepaidID</th><th>Description</th><th>Email</th><th>School</th></tr>");
// iterate view.schoolSales
;(function(){
  var $$obj = view.schoolSales;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var val = $$obj[i];

buf.push("<tr><td>$" + (jade.escape((jade.interp = val.amount / 100) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = new Date(val.created).toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.prepaidID) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.description) ? "" : jade.interp)) + "</td>");
if ( val.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = val.user.emailLower) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.user.schoolName) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var val = $$obj[i];

buf.push("<tr><td>$" + (jade.escape((jade.interp = val.amount / 100) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = new Date(val.created).toISOString().substring(0, 10)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.prepaidID) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.description) ? "" : jade.interp)) + "</td>");
if ( val.user)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = val.user.emailLower) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.user.schoolName) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td><td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<p>Loading ...</p>");
}
buf.push("</div><div id=\"school-counts\"><h3>School Counts</h3><div class=\"small\">Only including schools with " + (jade.escape((jade.interp = view.minSchoolCount) == null ? '' : jade.interp)) + "+ counts</div>");
if ( view.schoolCounts)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th></th><th>School Name</th><th>User Count</th></tr>");
// iterate view.schoolCounts
;(function(){
  var $$obj = view.schoolCounts;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var val = $$obj[i];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = i + 1) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.schoolName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.count) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var val = $$obj[i];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = i + 1) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.schoolName) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = val.count) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<p>Loading ...</p>");
}
buf.push("</div><h1>Active Users</h1>");
if ( view.activeUsers.length > 0)
{
var eventNames = [];
{
// iterate view.activeUserEventNames
;(function(){
  var $$obj = view.activeUserEventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var event = $$obj[$index];

if ( event.indexOf('classroom') >= 0)
{
eventNames.push(event);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var event = $$obj[$index];

if ( event.indexOf('classroom') >= 0)
{
eventNames.push(event);
}
    }

  }
}).call(this);

}
eventNames.sort(function (a, b) {return a.localeCompare(b);});
buf.push("<table class=\"table table-striped table-condensed\"><tr><th style=\"min-width:85px;\">Day</th>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName) ? "" : jade.interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName) ? "" : jade.interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr>");
// iterate view.activeUsers
;(function(){
  var $$obj = view.activeUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("<h1 id=\"enrollments-table\">Licenses</h1><table class=\"table table-striped table-condensed\"><tr><th>Day</th><th>Paid Licenses Issued</th><th>Paid Licenses Redeemed</th><th>Trial Licenses Issued</th><th>Trial Licenses Redeemed</th></tr>");
// iterate view.enrollmentDays
;(function(){
  var $$obj = view.enrollmentDays;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var day = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = day) ? "" : jade.interp)) + "</td>");
if ( view.dayEnrollmentsMap[day])
{
buf.push("<td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].paidIssued || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].paidRedeemed || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].trialIssued || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].trialRedeemed || 0) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>0</td><td>0</td><td>0</td><td>0</td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var day = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = day) ? "" : jade.interp)) + "</td>");
if ( view.dayEnrollmentsMap[day])
{
buf.push("<td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].paidIssued || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].paidRedeemed || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].trialIssued || 0) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = view.dayEnrollmentsMap[day].trialRedeemed || 0) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>0</td><td>0</td><td>0</td><td>0</td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table></div><div id=\"tab_campaign\" class=\"tab-pane\"><h3>Home Daily Active Users 90 days</h3><div class=\"small\">Paid user: had monthly or yearly sub on given day</div><div class=\"small\">Free user: not paid</div><div class=\"campaign-daily-active-users-chart-90 line-chart-container\"></div><h3>Home Monthly Active Users 90 days</h3><div class=\"campaign-monthly-active-users-chart-90 line-chart-container\"></div><h3>Home Daily Active Users 365 days</h3><div class=\"campaign-daily-active-users-chart-365 line-chart-container\"></div><h3>Home Monthly Active Users 365 days</h3><div class=\"campaign-monthly-active-users-chart-365 line-chart-container\"></div><h1>Active Users</h1>");
if ( view.activeUsers.length > 0)
{
var eventNames = [];
{
// iterate view.activeUserEventNames
;(function(){
  var $$obj = view.activeUserEventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var event = $$obj[$index];

if ( event.indexOf('campaign') >= 0)
{
eventNames.push(event);
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var event = $$obj[$index];

if ( event.indexOf('campaign') >= 0)
{
eventNames.push(event);
}
    }

  }
}).call(this);

}
eventNames.sort(function (a, b) {return a.localeCompare(b);});
buf.push("<table class=\"table table-striped table-condensed\"><tr><th style=\"min-width:85px;\">Day</th>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName.replace('campaign', 'home')) ? "" : jade.interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName.replace('campaign', 'home')) ? "" : jade.interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr>");
// iterate view.activeUsers
;(function(){
  var $$obj = view.activeUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate eventNames
;(function(){
  var $$obj = eventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div><div id=\"tab_campaign_vs_classroom\" class=\"tab-pane\"><h3>Home vs Classroom Paid Monthly Active Users 90 days</h3><div class=\"campaign-vs-classroom-monthly-active-users-recent-chart line-chart-container\"></div><h3>Home vs Classroom Paid Monthly Active Users 365 days</h3><div class=\"campaign-vs-classroom-monthly-active-users-chart line-chart-container\"></div><h1>Active Users</h1>");
if ( view.activeUsers.length > 0)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th style=\"min-width:85px;\">Day</th>");
// iterate view.activeUserEventNames
;(function(){
  var $$obj = view.activeUserEventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName.replace('campaign', 'home')) ? "" : jade.interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<th>" + (jade.escape(null == (jade.interp = eventName.replace('campaign', 'home')) ? "" : jade.interp)) + "</th>");
    }

  }
}).call(this);

buf.push("</tr>");
// iterate view.activeUsers
;(function(){
  var $$obj = view.activeUsers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate view.activeUserEventNames
;(function(){
  var $$obj = view.activeUserEventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var activeUser = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = activeUser.day) ? "" : jade.interp)) + "</td>");
// iterate view.activeUserEventNames
;(function(){
  var $$obj = view.activeUserEventNames;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var eventName = $$obj[$index];

buf.push("<td>" + (jade.escape(null == (jade.interp = activeUser.events[eventName] || 0) ? "" : jade.interp)) + "</td>");
    }

  }
}).call(this);

buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div></div>");
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

;
//# sourceMappingURL=/javascripts/app/templates/admin/analytics.js.map
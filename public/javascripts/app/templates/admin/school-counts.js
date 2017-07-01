require.register("templates/admin/school-counts", function(exports, require, module) {
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
if ( !me.isAdmin())
{
buf.push("<div>You must be logged in as an admin to view this page.</div>");
}
else if ( !view.countryGraphs || !view.countryGraphs['USA'])
{
buf.push("<h3>Loading...</h3>");
}
else
{
buf.push("<p><div>CodeCombat is now in " + (jade.escape((jade.interp = view.countryGraphs['USA'].totalSchools) == null ? '' : jade.interp)) + " schools with " + (jade.escape((jade.interp = view.countryGraphs['USA'].totalStudents) == null ? '' : jade.interp)) + " students [and " + (jade.escape((jade.interp = view.countryGraphs['USA'].totalTeachers) == null ? '' : jade.interp)) + " teachers] [in " + (jade.escape((jade.interp = view.countryGraphs['USA'].totalStates) == null ? '' : jade.interp)) + " states] in the USA</div></p><p><div>Untriaged students: " + (jade.escape((jade.interp = view.untriagedStudents) == null ? '' : jade.interp)) + "</div><div>Untriaged teachers: " + (jade.escape((jade.interp = view.untriagedTeachers) == null ? '' : jade.interp)) + "</div></p><div class=\"small\">Teacher: teacherish role or owns a classroom</div><div class=\"small\">Student: student role or member of a classroom or has schoolName set, not in HoC course instance</div><div class=\"small\">School: trial request data or teacher with 10+ students</div><div class=\"small\">+3 USA states are GU, PR, DC</div><p><ul><li><a href=\"#usaStates\">USA States</a></li><li><a href=\"#usaDistrictsByState\">USA Districts by State</a></li><li><a href=\"#countries\">Countries</a></li></ul></p><a name=\"usaStates\"></a><h2>USA States</h2>");
if ( view.countryGraphs['USA'].stateCounts)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>State</th><th>Districts</th><th>Schools</th><th>Teachers</th><th>Students</th></tr>");
// iterate view.countryGraphs['USA'].stateCounts
;(function(){
  var $$obj = view.countryGraphs['USA'].stateCounts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stateCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = stateCount.state) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.districts) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stateCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = stateCount.state) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.districts) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = stateCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("<a name=\"usaDistrictsByState\"></a><h2>USA Districts by State</h2>");
if ( view.countryGraphs['USA'].districtCounts)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>State</th><th>District</th><th>Schools</th><th>Teachers</th><th>Students</th></tr>");
// iterate view.countryGraphs['USA'].districtCounts
;(function(){
  var $$obj = view.countryGraphs['USA'].districtCounts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var districtCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = districtCount.state) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.district) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var districtCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = districtCount.state) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.district) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = districtCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("<a name=\"countries\"></a><h2>Countries</h2>");
if ( view.countryCounts)
{
buf.push("<table class=\"table table-striped table-condensed\"><tr><th>Country</th><th>Schools</th><th>Teachers</th><th>Students</th></tr>");
// iterate view.countryCounts
;(function(){
  var $$obj = view.countryCounts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var countryCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = countryCount.country) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var countryCount = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = countryCount.country) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.schools) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.teachers) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = countryCount.students) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
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
//# sourceMappingURL=/javascripts/app/templates/admin/school-counts.js.map
require.register("templates/courses/course-enroll", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;var trial_and_questions_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<h3 data-i18n=\"courses.questions\"></h3><p><span class=\"spr\">Please contact</span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></p>");
};
buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div><span>*UNDER CONSTRUCTION, send feedback to</span><a href=\"mailto:team@codecombat.com\" class=\"spl\">team@codecombat.com</a></div><div style=\"border-bottom: 1px solid black\"></div>");
if ( view.state === 'declined' || view.state === 'unknown_error')
{
buf.push("<p><div class=\"alert alert-danger\"><span data-i18n=\"loading_error.error\" class=\"spr\"></span><span>" + (jade.escape((jade.interp = view.stateMessage) == null ? '' : jade.interp)) + "</span></div></p>");
}
if ( view.state === 'creating')
{
buf.push("<p><div data-i18n=\"courses.creating_class\" class=\"alert alert-info\"></div></p>");
}
else if ( view.state === 'purchasing')
{
buf.push("<p><div data-i18n=\"courses.purchasing_course\" class=\"alert alert-info\"></div></p>");
}
else
{
buf.push("<div class=\"well well-lg enroll-container\">");
if ( view.price > 0)
{
buf.push("<h1 data-i18n=\"courses.buy_course\" class=\"center\"></h1>");
}
else
{
buf.push("<h1 data-i18n=\"courses.create_class\" class=\"center\"></h1>");
}
buf.push("<h3><span>1.</span><span data-i18n=\"courses.course\" class=\"spl\"></span></h3>");
if ( view.courses.size() > 2)
{
buf.push("<p data-i18n=\"courses.select_all_courses\"></p>");
}
buf.push("<div class=\"form-group\"><select class=\"form-control course-select\">");
// iterate view.courses.models
;(function(){
  var $$obj = view.courses.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':("" + (course.id) + "") }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':("" + (course.id) + "") }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

if ( view.courses.size() > 1)
{
buf.push("<option value=\"All Courses\" data-i18n=\"courses.all_courses\"></option>");
}
buf.push("</select></div><div class=\"form-group\"><label data-i18n=\"choose_hero.programming_language\"></label><select id=\"programming-language-select\" class=\"form-control\"><option" + (jade.attrs({ 'value':("python"), 'selected':(view.selectedLanguage==='python') }, {"value":true,"selected":true})) + ">Python</option><option" + (jade.attrs({ 'value':("javascript"), 'selected':(view.selectedLanguage==='javascript') }, {"value":true,"selected":true})) + ">JavaScript</option></select></div>");
if ( view.price > 0)
{
buf.push("<h3><span>2.</span><span data-i18n=\"courses.number_students\" class=\"spl\"></span></h3><p data-i18n=\"courses.enter_number_students\"></p><input" + (jade.attrs({ 'type':('text'), 'value':("" + (view.seats) + ""), "class": [('input-seats')] }, {"type":true,"value":true})) + "/>");
}
buf.push("<h3>");
if ( view.price > 0)
{
buf.push("<span>3.</span>");
}
else
{
buf.push("<span>2.</span>");
}
buf.push("<span data-i18n=\"courses.name_class\" class=\"spl\"></span></h3><p data-i18n=\"courses.displayed_course_page\"></p><input" + (jade.attrs({ 'type':('text'), 'placeholder':("Mrs. Smith's 4th Period"), 'value':("" + (view.className ? view.className : '') + ""), "class": [('class-name')] }, {"type":true,"placeholder":true,"value":true})) + "/>");
if ( view.price > 0)
{
buf.push("<h3><span>4.</span><span data-i18n=\"courses.buy\" class=\"spl\">Buy</span></h3>");
}
else
{
buf.push("<h3><span>3.</span><span data-i18n=\"courses.create_class\" class=\"spl\"></span></h3>");
}
buf.push("<p>");
if ( view.price > 0)
{
buf.push("<span data-i18n=\"courses.purchasing_for\" class=\"spr\"></span>");
}
else
{
buf.push("<span data-i18n=\"courses.creating_for\" class=\"spr\"></span>");
}
buf.push("<strong class=\"spr\">" + (jade.escape((jade.interp = view.selectedCourseTitle) == null ? '' : jade.interp)) + "</strong>");
if ( view.price > 0)
{
buf.push("<span data-i18n=\"courses.for\" class=\"spr\"></span><strong><span>" + (jade.escape((jade.interp = view.seats) == null ? '' : jade.interp)) + "</span><span data-i18n=\"courses.students1\" class=\"spl\"></span></strong><span>" + (jade.escape((jade.interp = '.') == null ? '' : jade.interp)) + "</span>");
}
buf.push("</p><p data-i18n=\"courses.receive_code\"></p><p class=\"center\">");
if ( view.price > 0)
{
buf.push("<button class=\"btn btn-success btn-lg btn-buy\">$" + (jade.escape((jade.interp = (view.price / 100.0).toFixed(2)) == null ? '' : jade.interp)) + "</button>");
}
else
{
buf.push("<button data-i18n=\"courses.create_class\" class=\"btn btn-success btn-lg btn-buy\"></button>");
}
buf.push("</p>");
trial_and_questions_mixin();
buf.push("</div>");
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
//# sourceMappingURL=/javascripts/app/templates/courses/course-enroll.js.map
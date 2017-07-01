require.register("templates/teachers/starter-license-upsell-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,document = locals_.document;var accountLinks_mixin = function(){
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
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div><div id=\"site-content-area\"><div class=\"bg-forest\"><div class=\"container text-center\"><div class=\"m-t-1 m-b-1\"><b data-i18n=\"special_offer.special_offer\" class=\"small-details text-uppercase\"></b><h3 data-i18n=\"special_offer.student_starter_license\"></h3><div class=\"small-details\"><i" + (jade.attrs({ 'data-i18n':("special_offer.purchase_starter_licenses_to_grant"), 'data-i18n-options':(JSON.stringify(view.i18nData())) }, {"data-i18n":true,"data-i18n-options":true})) + "></i></div></div></div></div><div class=\"container\"><div class=\"row tall-margin\"><div class=\"checkmark-blurb col-xs-4 text-center\"><span aria-hidden=\"aria-hidden\" class=\"fa fa-check\"></span><h5 data-i18n=\"special_offer.project_based_title\"> </h5><p data-i18n=\"special_offer.project_based_description\" class=\"small\"></p></div><div class=\"checkmark-blurb col-xs-4 text-center\"><span aria-hidden=\"aria-hidden\" class=\"fa fa-check\"></span><h5 data-i18n=\"special_offer.great_for_clubs_title\"></h5><p" + (jade.attrs({ 'data-i18n':("special_offer.great_for_clubs_description"), 'data-i18n-options':(JSON.stringify(view.i18nData())), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p></div><div class=\"checkmark-blurb col-xs-4 text-center\"><span aria-hidden=\"aria-hidden\" class=\"fa fa-check\"></span><h5" + (jade.attrs({ 'data-i18n':('special_offer.low_price_title'), 'data-i18n-options':(JSON.stringify({ starterLicensePrice: '$' + view.state.get('dollarsPerStudent') })) }, {"data-i18n":true,"data-i18n-options":true})) + "></h5><p" + (jade.attrs({ 'data-i18n':("special_offer.low_price_description"), 'data-i18n-options':(JSON.stringify(view.i18nData())), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p></div></div><div class=\"row text-center tall-margin-top\"><h2><span data-i18n=\"special_offer.three_great_courses\"></span></h2></div><div class=\"row tall-margin-bottom m-t-2\"><div class=\"col-xs-4\"><div class=\"text-center\"><img src=\"/images/pages/home/computer-science-2.png\" width=\"147\" height=\"147\"/></div><b data-i18n=\"teacher.cs2\"></b>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "<span data-i18n=\"special_offer.cs2_description\"></span></div><div class=\"col-xs-4\"><div class=\"text-center\"><img src=\"/images/pages/home/web-development-1.png\" width=\"147\" height=\"147\"/></div><b data-i18n=\"special_offer.wd1\"></b>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "<span data-i18n=\"special_offer.wd1_description\"></span></div><div class=\"col-xs-4\"><div class=\"text-center\"><img src=\"/images/pages/home/game-development-1.png\" width=\"147\" height=\"147\"/></div><b data-i18n=\"special_offer.gd1\"></b>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "<span data-i18n=\"special_offer.gd1_description\"></span></div></div><div class=\"row text-center tall-margin\"><h2 class=\"m-b-2\"><span data-i18n=\"special_offer.get_started_today\"></span></h2><a class=\"purchase-btn btn btn-lg btn-navy\"><span data-i18n=\"special_offer.purchase_starter_licenses\"></span></a><div class=\"m-t-3\"><span data-i18n=\"special_offer.want_all_the_courses\"></span></div><a class=\"contact-us-btn btn btn-forest\"><span data-i18n=\"general.contact_us\"></span></a></div><div class=\"row text-center tall-margin\"><h2 class=\"m-b-3\"><span data-i18n=\"special_offer.compare_license_types\"></span></h2><table class=\"feature-comparison-table\"><tr><th></th><th></th><th class=\"special-offer-col\"><i><b>Special Offer</b></i></th><th></th></tr><tr><th></th><th data-i18n=\"teacher.trial\"></th><th data-i18n=\"teacher.starter_license\" class=\"special-offer-col\"></th><th data-i18n=\"teacher.full_license\"></th></tr><tr><th data-i18n=\"special_offer.cs\"></th><td><span data-i18n=\"special_offer.course_prefix\" class=\"spl\"></span>" + (jade.escape(null == (jade.interp = " 1 ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.course_suffix\" class=\"spr\"></span></td><td class=\"special-offer-col\"><span data-i18n=\"special_offer.courses_prefix\" class=\"spl\"></span>" + (jade.escape(null == (jade.interp = " 1–2 ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.courses_suffix\" class=\"spr\"></span></td><td><span data-i18n=\"special_offer.courses_prefix\" class=\"spl\"></span>" + (jade.escape(null == (jade.interp = " 1–5+ ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.courses_suffix\" class=\"spr\"></span></td></tr><tr><th data-i18n=\"special_offer.gd\"></th><td>x</td><td class=\"special-offer-col\"><span data-i18n=\"special_offer.course_prefix\"></span>" + (jade.escape(null == (jade.interp = " 1 ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.course_suffix\"></span></td><td><span data-i18n=\"special_offer.courses_prefix\" class=\"spl\"></span>" + (jade.escape(null == (jade.interp = " 1–2+ ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.courses_suffix\" class=\"spr\"></span></td></tr><tr><th data-i18n=\"special_offer.wd\"></th><td>x</td><td class=\"special-offer-col\"><span data-i18n=\"special_offer.course_prefix\"></span>" + (jade.escape(null == (jade.interp = " 1 ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.course_suffix\"></span></td><td><span data-i18n=\"special_offer.courses_prefix\" class=\"spl\"></span>" + (jade.escape(null == (jade.interp = " 1–2+ ") ? "" : jade.interp)) + "<span data-i18n=\"special_offer.courses_suffix\" class=\"spr\"></span></td></tr><tr><th data-i18n=\"special_offer.maximum_students\"></th><td data-i18n=\"special_offer.unlimited\"></td><td class=\"special-offer-col\">75</td><td data-i18n=\"special_offer.unlimited\"></td></tr><tr><th data-i18n=\"special_offer.priority_support\"></th><td>x</td><td class=\"special-offer-col\">x</td><td data-i18n=\"special_offer.yes\"></td></tr><tr><th data-i18n=\"special_offer.pricing\"></th><td data-i18n=\"special_offer.free\"></td><td class=\"special-offer-col\"><span" + (jade.attrs({ 'data-i18n':("special_offer.price_per_student"), 'data-i18n-options':(JSON.stringify({ price: '$' + view.state.get('dollarsPerStudent') })) }, {"data-i18n":true,"data-i18n-options":true})) + "></span></td><td data-i18n=\"general.contact_us\"></td></tr><tr><th></th><th></th><th class=\"special-offer-col\"><a class=\"purchase-btn btn btn-navy\"><b data-i18n=\"special_offer.purchase\"></b></a></th><th><a class=\"contact-us-btn btn btn-forest\"><b data-i18n=\"general.contact_us\"></b></a></th></tr></table></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/starter-license-upsell-view.js.map
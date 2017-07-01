require.register("templates/courses/enrollments-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,moment = locals_.moment,serverConfig = locals_.serverConfig,view = locals_.view,document = locals_.document,_ = locals_._;var addCredits_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"text-center m-b-3 m-t-3\"><h5 data-i18n=\"courses.get_enrollments\"></h5>");
if ( me.get('enrollmentRequestSent'))
{
buf.push("<div id=\"enrollment-request-sent-blurb\" class=\"small\"><p data-i18n=\"teacher.enroll_request_sent_blurb1\"></p><p data-i18n=\"teacher.enroll_request_sent_blurb2\"></p><p data-i18n=\"[html]teacher.enroll_request_sent_blurb3\"></p></div><button id=\"request-sent-btn\" disabled=\"disabled\" data-i18n=\"teacher.request_sent\" class=\"btn-lg btn btn-forest\"></button>");
}
else
{
buf.push("<p data-i18n=\"teacher.get_enrollments_blurb\" class=\"m-y-2\"></p><button id=\"contact-us-btn\" data-i18n=\"contribute.contact_us_url\" class=\"btn-lg btn btn-forest\"></button>");
}
buf.push("</div>");
};
var prepaidCard_mixin = function(prepaid, className){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div" + (jade.attrs({ "class": [('prepaid-card'),('bg-navy'),('text-center'),('m-b-2'),('p-a-2'),(className)] }, {"class":true})) + "><h1 class=\"m-t-2 m-b-0\">" + (jade.escape(null == (jade.interp = prepaid.openSpots()) ? "" : jade.interp)) + "</h1>");
if ( prepaid.get('type') === 'starter_license')
{
buf.push("<div data-i18n=\"teacher.starter_licenses\"></div>");
}
else
{
buf.push("<div data-i18n=\"teacher.credits\"></div>");
}
buf.push("<hr/><em class=\"small-details\"><div data-i18n=\"teacher.start_date\" class=\"pull-left\"></div><div class=\"pull-right\">" + (jade.escape(null == (jade.interp = moment(prepaid.get('startDate')).utc().format('l')) ? "" : jade.interp)) + "</div><div class=\"clearfix\"></div><div data-i18n=\"teacher.end_date\" class=\"pull-left\"></div><div class=\"pull-right\">" + (jade.escape(null == (jade.interp = moment(prepaid.get('endDate')).utc().format('l')) ? "" : jade.interp)) + "</div><div class=\"clearfix\"></div></em></div>");
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
if ( me.isAnonymous() || (!me.isTeacher() && !view.classrooms.size()))
{
buf.push("<div class=\"container\"><div class=\"access-restricted container text-center m-y-3\"><h5 data-i18n=\"teacher.access_restricted\"></h5><p data-i18n=\"teacher.teacher_account_required\"></p>");
if ( me.isAnonymous())
{
buf.push("<div data-i18n=\"login.log_in\" class=\"login-button btn btn-lg btn-primary\"></div><a href=\"/teachers/signup\" data-i18n=\"teacher.create_teacher_account\" class=\"btn btn-lg btn-primary-alt\"></a>");
}
else
{
buf.push("<a href=\"/teachers/update-account\" data-i18n=\"teachers_quote.convert_account_title\" class=\"btn btn-lg btn-primary\"></a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-lg btn-primary-alt\"></button>");
}
buf.push("</div><div class=\"container\"><div class=\"teacher-account-blurb text-center col-xs-6 col-xs-offset-3 m-y-3\"><h5 data-i18n=\"teacher.what_is_a_teacher_account\"></h5><p data-i18n=\"teacher.teacher_account_explanation\"></p></div></div></div>");
}
else
{
if ( !me.isTeacher() && !me.isAdmin())
{
buf.push("<div class=\"alert alert-danger text-center\"><div class=\"container\"><!-- DNT: Temporary--><h3>ATTENTION: Please upgrade your account to a Teacher Account.</h3><p>We are transitioning to a new improved classroom management system for instructors.\nPlease convert your account to ensure you retain access to your classrooms.</p><a href=\"/teachers/update-account\" class=\"btn btn-primary btn-lg\">Upgrade to teacher account</a></div></div>");
}
if ( view.state.get('shouldUpsell'))
{
buf.push("<div class=\"bg-forest\"><div class=\"container\"><div class=\"row\"><div class=\"col-xs-9 m-t-1\"><b><span data-i18n=\"special_offer.special_offer\" class=\"text-uppercase\"></span>" + (jade.escape(null == (jade.interp = ': ') ? "" : jade.interp)) + "<span data-i18n=\"special_offer.student_starter_license\"></span></b><div class=\"small-details\"><i" + (jade.attrs({ 'data-i18n':("special_offer.purchase_starter_licenses_to_grant"), 'data-i18n-options':(JSON.stringify(view.i18nData())) }, {"data-i18n":true,"data-i18n-options":true})) + "></i></div></div><div class=\"col-xs-3\"><a href=\"/teachers/starter-licenses\" class=\"btn btn-lg btn-forest-alt m-t-2 m-b-2\"><b data-i18n=\"general.learn_more\"></b></a></div></div></div></div>");
}
buf.push("<div class=\"container m-t-5\"><h3 data-i18n=\"teacher.enrollments\"></h3><h4 id=\"enrollments-blurb\" data-i18n=\"teacher.enrollments_blurb\"> </h4>");
var available = view.state.get('prepaidGroups').available
var pending = view.state.get('prepaidGroups').pending
var anyPrepaids = available || pending
buf.push("<div class=\"text-center m-t-3\"><span class=\"glyphicon glyphicon-question-sign\"></span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "<a id=\"how-to-enroll-link\" data-i18n=\"teacher.how_to_apply_licenses\"></a></div><div class=\"row m-t-3\">");
if ( anyPrepaids)
{
buf.push("<div id=\"prepaids-col\" class=\"col-md-9\">");
if ( _.size(available) > 0)
{
buf.push("<h5 data-i18n=\"teacher.available_credits\" class=\"m-b-1\"></h5><div class=\"row\">");
// iterate available
;(function(){
  var $$obj = available;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid);
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid);
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
if ( _.size(pending) > 0)
{
buf.push("<h5 data-i18n=\"teacher.pending_credits\" class=\"m-b-1 m-t-3\"></h5><div class=\"row\">");
// iterate pending
;(function(){
  var $$obj = pending;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid, 'pending-prepaid-card');
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<div class=\"col-sm-4 col-xs-6\">");
prepaidCard_mixin(prepaid, 'pending-prepaid-card');
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div><div id=\"actions-col\" class=\"col-md-3\">");
addCredits_mixin();
buf.push("</div>");
}
else
{
buf.push("<!-- no prepaids--><div class=\"col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4\">");
addCredits_mixin();
buf.push("</div>");
}
buf.push("</div></div>");
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
//# sourceMappingURL=/javascripts/app/templates/courses/enrollments-view.js.map
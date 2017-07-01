require.register("templates/teachers/request-quote-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
var showDone = !view.trialRequest.isNew() && me.isAnonymous();
buf.push("<div id=\"learn-more-modal\" class=\"modal fade\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content style-flat\"><div class=\"modal-header\"><div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div></div><div data-i18n=\"teachers_quote.learn_more_modal\" class=\"modal-body\"></div></div></div></div><div class=\"container\"><form" + (jade.attrs({ 'id':('request-form'), "class": [(showDone ? 'hide' : '')] }, {"class":true})) + "><div class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><h3 data-i18n=\"new_home.request_demo\" class=\"text-center\"></h3><h4 data-i18n=\"[html]teachers_quote.subtitle\" class=\"text-center\"></h4></div></div>");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><div class=\"alert alert-info text-center\"><div><span data-i18n=\"teachers_quote.not\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</strong>?<a id=\"logout-link\" data-i18n=\"login.log_out\" class=\"spl\"></a></div>");
if ( me.get('role') === 'student')
{
buf.push("<div id=\"conversion-warning\"><span data-i18n=\"[html]teachers_quote.conversion_warning\" class=\"spr\"></span><a data-i18n=\"new_home.learn_more\" data-toggle=\"modal\" data-target=\"#learn-more-modal\"></a></div>");
}
buf.push("</div></div></div>");
}
buf.push("<div id=\"form-teacher-info\">");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"general.username\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span>");
var name = me.get('name') || '';
buf.push("<input" + (jade.attrs({ 'name':("name"), 'value':(name), 'disabled':(!!name), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"share_progress_modal.form_label\" class=\"control-label\"></span>");
var email = me.get('email') || '';
buf.push("<input" + (jade.attrs({ 'name':("email"), 'value':(email), 'disabled':(!!email), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div></div>");
}
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.first_name\" class=\"control-label\"></span>");
var firstName = me.get('firstName') || '';
buf.push("<input" + (jade.attrs({ 'name':("firstName"), 'value':(firstName), 'disabled':(!!firstName), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.last_name\" class=\"control-label\"></span>");
var lastName = me.get('lastName') || '';
buf.push("<input" + (jade.attrs({ 'name':("lastName"), 'value':(lastName), 'disabled':(!!lastName), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div></div>");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.phone_number\" class=\"control-label\"></span><input name=\"phoneNumber\" data-i18n=\"[placeholder]teachers_quote.phone_number_help\" class=\"form-control\"/></div></div></div>");
}
if ( me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div id=\"email-form-group\" class=\"form-group\"><span data-i18n=\"general.email\" class=\"control-label\"></span>");
var email = me.get('email') || '';
buf.push("<input" + (jade.attrs({ 'name':("email"), 'type':("email"), 'value':(email), 'disabled':(!!email), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.phone_number\"></span></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.phone_number_help\" class=\"text-info\"></em></div><input name=\"phoneNumber\" class=\"form-control\"/></div></div></div>");
}
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.primary_role_label\" class=\"control-label\"></span><select name=\"role\" class=\"form-control\"><option data-i18n=\"teachers_quote.primary_role_default\" ,=\",\" value=\"\"></option><option data-i18n=\"courses.teacher\" value=\"Teacher\"></option><option data-i18n=\"teachers_quote.tech_coordinator\" value=\"Technology coordinator\"></option><option data-i18n=\"teachers_quote.advisor\" value=\"Advisor\"></option><option data-i18n=\"teachers_quote.principal\" value=\"Principal\"></option><option data-i18n=\"teachers_quote.superintendent\" value=\"Superintendent\"></option><option data-i18n=\"teachers_quote.parent\" value=\"Parent\"></option></select></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.purchaser_role_label\" class=\"control-label\"></span><select name=\"purchaserRole\" class=\"form-control\"><option data-i18n=\"teachers_quote.purchaser_role_default\" ,=\",\" value=\"\"></option><option data-i18n=\"teachers_quote.influence_advocate\" value=\"Influence/Advocate\"></option><option data-i18n=\"teachers_quote.evaluate_recommend\" value=\"Evaluate/Recommend\"></option><option data-i18n=\"teachers_quote.approve_funds\" value=\"Approve Funds\"></option><option data-i18n=\"teachers_quote.no_purchaser_role\" value=\"No role in purchase decisions\"></option></select></div></div></div></div><div id=\"form-school-info\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.organization_label\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><input id=\"organization-control\" name=\"organization\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.district_label\" class=\"control-label form-control nullify-form-control\"></span><input id=\"district-control\" name=\"district\" data-i18n=\"[placeholder]teachers_quote.district_na\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.city\" class=\"control-label\"></span><input name=\"city\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.state\" class=\"control-label\"></span><input name=\"state\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.country\" class=\"control-labelspan control-label\"></span><input name=\"country\" class=\"form-control\"/></div></div></div></div><div id=\"form-students-info\"><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"courses.number_programming_students\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.num_students_help\" class=\"text-info\"></em></div><select name=\"numStudents\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-10</option><option>11-50</option><option>51-100</option><option>101-200</option><option>201-500</option><option>501-1000</option><option>1000+</option></select></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"courses.number_total_students\" class=\"control-label\"></span><select name=\"numStudentsTotal\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-500</option><option>500-1,000</option><option>1,000-5,000</option><option>5,000-10,000</option><option>10,000+</option></select></div></div></div><div class=\"form-group\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4\"><span data-i18n=\"teachers_quote.education_level_label\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.education_level_help\" class=\"text-info\"></em></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Elementary\"/><span data-i18n=\"teachers_quote.elementary_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Middle\"/><span data-i18n=\"teachers_quote.middle_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"High\"/><span data-i18n=\"teachers_quote.high_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"College+\"/><span data-i18n=\"teachers_quote.college_plus\"></span></label></div><div class=\"checkbox\"><label><input id=\"other-education-level-checkbox\" type=\"checkbox\"/><span data-i18n=\"nav.other\" class=\"spr\"></span><span data-i18n=\"teachers_quote.please_explain\"></span></label></div><input id=\"other-education-level-input\" class=\"form-control\"/></div></div></div></div><div id=\"anything-else-row\" class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.anything_else\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><textarea rows=\"8\" name=\"notes\" class=\"form-control\"></textarea><input type=\"hidden\" name=\"nces_id\"/><input type=\"hidden\" name=\"nces_name\"/><input type=\"hidden\" name=\"nces_district\"/><input type=\"hidden\" name=\"nces_district_id\"/><input type=\"hidden\" name=\"nces_district_schools\"/><input type=\"hidden\" name=\"nces_district_students\"/><input type=\"hidden\" name=\"nces_students\"/><input type=\"hidden\" name=\"nces_phone\"/></div></div><div id=\"buttons-row\" class=\"row m-y-2 text-center\"><input id=\"submit-request-btn\" type=\"submit\" data-i18n=\"[value]new_home.request_demo\" class=\"btn btn-lg btn-primary\"/></div></form><div" + (jade.attrs({ 'id':('form-submit-success'), "class": [('text-center'),(showDone ? '' : 'hide')] }, {"class":true})) + "><h3 data-i18n=\"teachers_quote.thanks_header\"></h3><h4 data-i18n=\"teachers_quote.thanks_sub_header\"></h4><p><span data-i18n=\"teachers_quote.thanks_p\" class=\"spr\"></span><a href=\"mailto:team@codecombat.com\" class=\"spl\">team@codecombat.com</a></p>");
if (!( me.isAnonymous()))
{
buf.push("<a href=\"/teachers/classes\" class=\"btn btn-lg btn-navy\"><span data-i18n=\"teachers_quote.back_to_classes\"></span></a>");
}
if ( me.isAnonymous())
{
buf.push("<h5 data-i18n=\"teachers_quote.finish_signup\"></h5><p data-i18n=\"teachers_quote.finish_signup_p\"></p><div id=\"social-network-signups\"><button id=\"facebook-signup-btn\" class=\"btn btn-facebook btn-lg m-x-1\"><span data-i18n=\"teachers_quote.signup_with\" class=\"spr\"></span>Facebook<img src=\"/images/pages/community/logo_facebook.png\" class=\"m-l-1\"/></button><button id=\"gplus-signup-btn\" class=\"btn btn-gplus btn-lg spr\"><span data-i18n=\"teachers_quote.signup_with\" class=\"spr\"></span>G+<img src=\"/images/pages/community/logo_g+.png\" class=\"m-l-1\"/></button></div><div data-i18n=\"general.or\" class=\"text-h1 text-uppercase\"></div><form id=\"signup-form\" class=\"text-left\"><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.username\" class=\"control-label\"></span><input name=\"name\" class=\"form-control\"/></div></div></div><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.password\" class=\"control-label\"></span><input name=\"password1\" type=\"password\" class=\"form-control\"/></div></div><div class=\"col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.confirm_password\" class=\"control-label\"></span><input name=\"password2\" type=\"password\" class=\"form-control\"/></div></div></div><div class=\"text-center\"><button data-i18n=\"login.sign_up\" class=\"btn btn-lg btn-navy\"></button></div></form>");
}
buf.push("</div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/request-quote-view.js.map
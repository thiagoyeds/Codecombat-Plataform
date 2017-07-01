require.register("templates/teachers/resource-hub-view", function(exports, require, module) {
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
buf.push("<div id=\"teacher-dashboard-nav\"><nav class=\"navbar\"><div class=\"container-fluid container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#teacher-dashboard-nav-collapse\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><span data-i18n=\"teacher.teacher_dashboard\" class=\"navbar-brand text-h4\"></span></div><div id=\"teacher-dashboard-nav-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\"><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/classes') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/classes\"><small data-i18n=\"teacher.my_classes\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/courses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/courses\"><small data-i18n=\"teacher.courses\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/licenses') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/licenses\"><small data-i18n=\"teacher.enrollments\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources') === 0 && path.indexOf('/teachers/resources/faq') !== 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources\"><small data-i18n=\"teacher.resource_hub\" class=\"label\"></small></a></li><li" + (jade.attrs({ "class": [(path.indexOf('/teachers/resources/faq') === 0 ? 'active' : '')] }, {"class":true})) + "><a href=\"/teachers/resources/faq\"><small data-i18n=\"teacher.educator_faq\" class=\"label\"></small></a></li></ul></div></div></nav></div><div id=\"site-content-area\"><div class=\"container\"><div class=\"content\">");
if ( me.attributes.hourOfCode && me.isAnonymous())
{
buf.push("<div id=\"hour-of-code\"><h3><span data-i18n=\"teacher.hoc_welcome\"></span>!</h3><p><span data-i18n=\"teacher.hoc_intro\"></span>:</p><ol class=\"small\"><li><strong data-i18n=\"teacher.hoc_self_led\" class=\"spr\"> </strong>- <span data-i18n=\"teacher.hoc_self_led_desc\" class=\"spl spr\"> </span>- <a href=\"/play/game-dev-hoc?hour_of_code=true\"><span data-i18n=\"teacher.hoc_game_dev\"></span></a><span data-i18n=\"teacher.hoc_and\" class=\"spl spr\"></span><a href=\"/play?hour_of_code=true\"> <span data-i18n=\"teacher.hoc_programming\"></span></a>.</li><li><strong data-i18n=\"teacher.hoc_teacher_led\" class=\"spr\"></strong>- <span data-i18n=\"teacher.hoc_teacher_led_desc1\" class=\"spr\"></span><a href=\"/teachers/resources/cs1\"><span data-i18n=\"teacher.hoc_teacher_led_link\"></span></a><span data-i18n=\"teacher.hoc_teacher_led_desc2\" class=\"spl\"></span>.</li><li><strong data-i18n=\"teacher.hoc_group\" class=\"spr\"></strong>- <span data-i18n=\"teacher.hoc_group_desc_1\" class=\"spr\"> </span><a href=\"/teachers/resources/getting-started\"><span data-i18n=\"teacher.hoc_group_link\"></span></a><span data-i18n=\"teacher.hoc_group_desc_2\" class=\"spl\"></span>.</li></ol><p class=\"small\"><span data-i18n=\"teacher.hoc_additional_desc1\" class=\"spr\"></span><a href=\"/teachers/resources/\"><span data-i18n=\"teacher.resource_hub\"></span></a><span>. </span><span data-i18n=\"teacher.hoc_additional_desc2\"></span><span class=\"spr\">?</span><a href=\"mailto:schools@codecombat.com\"><span data-i18n=\"teacher.hoc_additional_contact\"></span></a>.  </p></div>");
}
buf.push("<h1 data-i18n=\"teacher.resource_hub\"></h1><h4 data-i18n=\"teacher.getting_started\"></h4><ul><li><a href=\"/teachers/resources/faq\"><span data-i18n=\"teacher.educator_faq\"></span></a><p data-i18n=\"teacher.educator_faq_desc\"></p></li><li><a href=\"/teachers/resources/getting-started\"><span data-i18n=\"teacher.teacher_getting_started\"></span></a><p data-i18n=\"teacher.teacher_getting_started_desc\"></p></li><li><a href=\"http://files.codecombat.com/docs/resources/StudentQuickStartGuide.pdf\" target=\"blank\"><span data-i18n=\"teacher.student_getting_started\"></span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.student_getting_started_desc\"></p></li><li><a href=\"http://files.codecombat.com/docs/resources/ProgressJournal.pdf\" target=\"blank\"><span data-i18n=\"teacher.progress_journal\"></span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.progress_journal_desc\"></p></li></ul><h4 data-i18n=\"teacher.cs1\"></h4><ul><li><a href=\"/teachers/resources/cs1\" target=\"blank\"><span data-i18n=\"teacher.cs1_curriculum\"></span></a><p data-i18n=\"teacher.cs1_curriculum_desc\"></p></li><li><a href=\"http://files.codecombat.com/docs/resources/Course1PythonSyntaxGuide.pdf\" target=\"blank\"><span data-i18n=\"teacher.cs1_syntax_python\"></span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.cs1_syntax_python_desc\"></p></li><li><a href=\"http://files.codecombat.com/docs/resources/Course1JavaScriptSyntaxGuide.pdf\" target=\"blank\"><span data-i18n=\"teacher.cs1_syntax_javascript\"></span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.cs1_syntax_javascript_desc\"></p></li><li><a href=\"http://files.codecombat.com/docs/resources/EngineeringCycleWorksheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.engineering_cycle_worksheet\"></span><span class=\"spl\">[PDF]</span></a><a href=\"http://files.codecombat.com/docs/resources/WorksheetExample.pdf\" target=\"blank\"><i data-i18n=\"teacher.engineering_cycle_worksheet_link\" class=\"span spl\"></i></a><p data-i18n=\"teacher.engineering_cycle_worksheet_desc\"></p></li><li><a href=\"/teachers/resources/pair-programming\"><span data-i18n=\"teacher.cs1_pairprogramming\"></span></a><p data-i18n=\"teacher.cs1_pairprogramming_desc\"></p></li></ul><h4 data-i18n=\"teacher.cs2\"></h4><ul><li><a href=\"/teachers/resources/cs2\" target=\"blank\"><span data-i18n=\"teacher.cs2_curriculum\"></span></a><p data-i18n=\"teacher.cs2_curriculum_desc\"></p></li></ul><h4 data-i18n=\"teacher.wd1\"></h4><ul>       <li> <a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/WD1-HeadlinesWorksheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.wd1_headlines\"> </span><span class=\"spl\">[PDF]</span></a><a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/WD1-HeadlinesExample.pdf\" target=\"blank\"><i data-i18n=\"teacher.wd1_headlines_example\" class=\"span spl\"> </i></a><p data-i18n=\"teacher.wd1_headlines_desc\"> </p></li><li> <a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/WD1-HTMLCheatsheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.wd1_html_syntax\"> </span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.wd1_html_syntax_desc\"> </p></li><li> <a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/WD1-CSSCheatsheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.wd1_css_syntax\"> </span><span class=\"spl\">[PDF]        </span></a><p data-i18n=\"teacher.wd1_css_syntax_desc\"> </p></li></ul><h4 data-i18n=\"teacher.cs3\"></h4><ul><li><a href=\"/teachers/resources/cs3\" target=\"blank\"><span data-i18n=\"teacher.cs3_curriculum\"></span></a><p data-i18n=\"teacher.cs3_curriculum_desc\"></p></li></ul><h4 data-i18n=\"teacher.wd2\"> </h4><ul>       <li> <a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/WD2-jQueryFunctionsCheatsheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.wd2_jquery_syntax\"> </span><span class=\"spl\">[PDF]</span></a><p data-i18n=\"teacher.wd2_jquery_syntax_desc\"> </p></li><li> <a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/QuizletPlanningWorksheet.pdf\" target=\"blank\"><span data-i18n=\"teacher.wd2_quizlet_worksheet\"> </span><span class=\"spl\">[PDF]</span></a><a href=\"http://files.codecombat.com.s3.amazonaws.com/docs/resources/QuizletPlanningInstructions.pdf\" target=\"blank\"><i data-i18n=\"teacher.wd2_quizlet_worksheet_instructions\" class=\"span spl\"> </i></a><p data-i18n=\"teacher.wd2_quizlet_worksheet_desc\"> </p></li></ul><h4 data-i18n=\"teacher.cs4\"></h4><ul><li><a href=\"/teachers/resources/cs4\" target=\"blank\"><span data-i18n=\"teacher.cs4_curriculum\"></span></a><p data-i18n=\"teacher.cs4_curriculum_desc\"></p></li></ul><h4 class=\"coming-soon\"><i data-i18n=\"teacher.coming_soon\"></i></h4></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/resource-hub-view.js.map
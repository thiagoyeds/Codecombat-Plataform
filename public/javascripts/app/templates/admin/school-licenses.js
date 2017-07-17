require.register("templates/admin/school-licenses", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\">");
if ( !me.isAdmin())
{
buf.push("<div>You must be logged in as an admin to view this page.</div>");
}
else if ( !view.schools)
{
buf.push("<h3>Loading...</h3>");
}
else
{
buf.push("<h3>School Active Licenses</h3><div class=\"small\">Max: total licenses</div><div class=\"small\">Used: licenses redeemed</div><div class=\"small\">Activity: level sessions created in last 30 days</div><table class=\"table table-condensed\"><thead><th>School</th><th>Max</th><th>Used&nbsp;</th><th>Activity</th></thead><tr><td style=\"height:26px;\" class=\"range-container\">");
// iterate view.rangeKeys
;(function(){
  var $$obj = view.rangeKeys;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var rangeKey = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (rangeKey.startScale) + "%;width:" + (rangeKey.width) + "%;background-color:" + (rangeKey.color) + ""), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (rangeKey.startScale) + "%;width:" + (rangeKey.width) + "%;"), "class": [('range-dates')] }, {"style":true})) + ">" + (jade.escape((jade.interp = rangeKey.name) == null ? '' : jade.interp)) + "</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var rangeKey = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':("left:" + (rangeKey.startScale) + "%;width:" + (rangeKey.width) + "%;background-color:" + (rangeKey.color) + ""), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (rangeKey.startScale) + "%;width:" + (rangeKey.width) + "%;"), "class": [('range-dates')] }, {"style":true})) + ">" + (jade.escape((jade.interp = rangeKey.name) == null ? '' : jade.interp)) + "</span>");
    }

  }
}).call(this);

buf.push("</td><td colspan=\"3\"></td></tr>");
// iterate view.schools
;(function(){
  var $$obj = view.schools;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var school = $$obj[$index];

// iterate school.prepaids
;(function(){
  var $$obj = school.prepaids;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<tr><td class=\"range-container\"><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;width:" + (prepaid.rangeScale) + "%;"), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;"), "class": [('range-dates')] }, {"style":true})) + "><span class=\"spr\">" + (jade.escape((jade.interp = prepaid.startDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span><strong class=\"spr\">" + (jade.escape((jade.interp = school.name) == null ? '' : jade.interp)) + "</strong><span>" + (jade.escape((jade.interp = prepaid.endDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span></span></td><td>" + (jade.escape((jade.interp = prepaid.max) == null ? '' : jade.interp)) + "&nbsp;</td><td>" + (jade.escape((jade.interp = prepaid.used) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = school.activity) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<tr><td class=\"range-container\"><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;width:" + (prepaid.rangeScale) + "%;"), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;"), "class": [('range-dates')] }, {"style":true})) + "><span class=\"spr\">" + (jade.escape((jade.interp = prepaid.startDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span><strong class=\"spr\">" + (jade.escape((jade.interp = school.name) == null ? '' : jade.interp)) + "</strong><span>" + (jade.escape((jade.interp = prepaid.endDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span></span></td><td>" + (jade.escape((jade.interp = prepaid.max) == null ? '' : jade.interp)) + "&nbsp;</td><td>" + (jade.escape((jade.interp = prepaid.used) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = school.activity) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var school = $$obj[$index];

// iterate school.prepaids
;(function(){
  var $$obj = school.prepaids;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prepaid = $$obj[$index];

buf.push("<tr><td class=\"range-container\"><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;width:" + (prepaid.rangeScale) + "%;"), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;"), "class": [('range-dates')] }, {"style":true})) + "><span class=\"spr\">" + (jade.escape((jade.interp = prepaid.startDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span><strong class=\"spr\">" + (jade.escape((jade.interp = school.name) == null ? '' : jade.interp)) + "</strong><span>" + (jade.escape((jade.interp = prepaid.endDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span></span></td><td>" + (jade.escape((jade.interp = prepaid.max) == null ? '' : jade.interp)) + "&nbsp;</td><td>" + (jade.escape((jade.interp = prepaid.used) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = school.activity) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prepaid = $$obj[$index];

buf.push("<tr><td class=\"range-container\"><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;width:" + (prepaid.rangeScale) + "%;"), "class": [('range-background')] }, {"style":true})) + "></span><span" + (jade.attrs({ 'style':("left:" + (prepaid.startScale) + "%;"), "class": [('range-dates')] }, {"style":true})) + "><span class=\"spr\">" + (jade.escape((jade.interp = prepaid.startDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span><strong class=\"spr\">" + (jade.escape((jade.interp = school.name) == null ? '' : jade.interp)) + "</strong><span>" + (jade.escape((jade.interp = prepaid.endDate.substring(0, 10)) == null ? '' : jade.interp)) + "</span></span></td><td>" + (jade.escape((jade.interp = prepaid.max) == null ? '' : jade.interp)) + "&nbsp;</td><td>" + (jade.escape((jade.interp = prepaid.used) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = school.activity) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</table>");
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
//# sourceMappingURL=/javascripts/app/templates/admin/school-licenses.js.map
require.register("templates/artisans/student-solutions-view", function(exports, require, module) {
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><div><a href=\"/artisans\"><span class=\"glyphicon glyphicon-chevron-left\"></span><span>Artisans Home</span></a></div><h1>Common Student Solutions</h1><div class=\"row well\"><form><div class=\"col-xs-2 form-group\"><label for=\"levelSlug\">Level Slug:</label><input" + (jade.attrs({ 'id':('levelSlug'), 'type':("text"), 'value':(view.levelSlug), "class": [('form-control')] }, {"type":true,"value":true})) + "/></div><div class=\"col-xs-2 form-group\"><label for=\"languageSelect\">Language:</label><p><select id=\"languageSelect\"><option" + (jade.attrs({ 'value':("all"), 'selected':((view.languages=="all")) }, {"value":true,"selected":true})) + ">js / py</option><option" + (jade.attrs({ 'value':("javascript"), 'selected':((view.languages=="javascript") ? true : false) }, {"value":true,"selected":true})) + ">Javascript</option><option" + (jade.attrs({ 'value':("python"), 'selected':((view.languages=="python") ? true : false) }, {"value":true,"selected":true})) + ">Python</option></select></p></div><div class=\"col-xs-2 form-group\"><label for=\"sessionNum\">Sessions:</label><input" + (jade.attrs({ 'id':('sessionNum'), 'type':("number"), 'min':(100), 'max':(100000), 'step':(10), 'value':(view.limit), "class": [('form-control')] }, {"type":true,"min":true,"max":true,"step":true,"value":true})) + "/></div><div class=\"col-xs-3 go-button\"><button id=\"go-button\" class=\"btn btn-primary\">Go</button></div></form></div><div class=\"row\"><div class=\"col-xs-12 well\"><div class=\"row\"><div class=\"col-xs-3\">Language: javascript</div><div class=\"col-xs-3\">Sessions: " + (jade.escape((jade.interp = view.stats.javascript.total) == null ? '' : jade.interp)) + "</div><div class=\"col-xs-3\">Errors: " + (jade.escape((jade.interp = view.stats.javascript.errors) == null ? '' : jade.interp)) + "</div></div><div class=\"row\"><div class=\"col-xs-3\">Language: python</div><div class=\"col-xs-3\">Sessions: " + (jade.escape((jade.interp = view.stats.python.total) == null ? '' : jade.interp)) + "</div><div class=\"col-xs-3\">Errors: " + (jade.escape((jade.interp = view.stats.python.errors) == null ? '' : jade.interp)) + "</div></div></div></div><div class=\"row\">");
if ( view.errorMessage)
{
buf.push("<div class=\"col-xs-6 col-xs-offset-3\"><span class=\"center-block\">Error: " + (jade.escape((jade.interp = view.errorMessage) == null ? '' : jade.interp)) + "</span></div>");
}
if ( view.sortedTallyCounts && view.sortedTallyCounts.length > 0)
{
buf.push("<div class=\"col-xs-6 col-xs-offset-3\"><span class=\"center-block\">Viewing " + (jade.escape((jade.interp = view.limit) == null ? '' : jade.interp)) + " recent sessions from " + (jade.escape((jade.interp = view.levelSlug) == null ? '' : jade.interp)) + "</span></div>");
}
buf.push("</div>");
// iterate (view.sortedTallyCounts || [])
;(function(){
  var $$obj = (view.sortedTallyCounts || []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var num = $$obj[$index];

var hashes = view.talliedHashes[num]
// iterate hashes
;(function(){
  var $$obj = hashes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var num = $$obj[$index];

var hashes = view.talliedHashes[num]
// iterate hashes
;(function(){
  var $$obj = hashes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hash = $$obj[$index];

var session = view.solutions[hash][0]
var lang = session.codeLanguage
var isComplete = session.state && session.state.complete
var isDefault = (hash == view.defaultcode[lang].hash)
var isIntended = (hash == view.intended[lang].hash)
buf.push("<div class=\"row solutions-row\"><div class=\"col-xs-2 well solution-info\"><p> <b>Count: </b>" + (jade.escape((jade.interp = num) == null ? '' : jade.interp)) + "</p>");
if ( view.doLanguages.length > 1)
{
buf.push("<p><b>Language:</b> " + (jade.escape((jade.interp = lang) == null ? '' : jade.interp)) + "</p>");
}
if ( isDefault)
{
buf.push("<p><b>Status:</b> Default Code</p>");
}
else if ( isIntended)
{
buf.push("<p><b>Status:</b> Intended Code</p>");
}
else if ( isComplete)
{
buf.push("<p><b>Status:</b> Success</p>");
}
else
{
buf.push("<p><b>Status:</b> Failure</p>");
}
buf.push("<p class=\"is-breakable\"><b>Fingerprint:</b> " + (jade.escape((jade.interp = hash) == null ? '' : jade.interp)) + "</p></div><div class=\"col-xs-10\">");
if ( session.code && session.code['hero-placeholder'])
{
buf.push("<div" + (jade.attrs({ 'data-language':(lang), "class": [('ace')] }, {"data-language":true})) + ">" + (jade.escape((jade.interp = session.code['hero-placeholder'].plan) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/artisans/student-solutions-view.js.map
require.register("templates/courses/course-details", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,i18n = locals_.i18n;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container m-t-3\"><p><a href=\"/students\" data-i18n=\"courses.back_courses\"></a></p><p><strong>");
if ( view.courseInstance.get('name'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.courseInstance.get('name')) ? "" : jade.interp)) + "</span>");
}
else if ( view.classroom.get('name'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<span data-i18n=\"courses.unnamed_class\"></span>");
}
buf.push("</strong>");
if ( !view.owner.isNew() && view.getOwnerName() && view.courseInstance.get('name') != 'Single Player')
{
buf.push("<span class=\"spl\">-</span><span data-i18n=\"courses.teacher\" class=\"spl\"></span><span class=\"spr\">:</span><span><strong>" + (jade.escape(null == (jade.interp = view.getOwnerName()) ? "" : jade.interp)) + "</strong></span>");
}
buf.push("</p><h1>" + (jade.escape((jade.interp = i18n(view.course.attributes, 'name')) == null ? '' : jade.interp)) + "");
if ( view.courseComplete)
{
buf.push("<span class=\"spl\">-</span><span data-i18n=\"clans.complete_2\" class=\"spl\"></span><span>!</span>");
}
buf.push("</h1><p>");
if ( view.courseInstance.get('description'))
{
// iterate view.courseInstance.get('description').split('\n')
;(function(){
  var $$obj = view.courseInstance.get('description').split('\n');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<div>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</div>");
    }

  }
}).call(this);

}
buf.push("</p><div data-i18n=\"courses.available_levels\" class=\"available-courses-title\"></div><table class=\"table table-striped table-condensed\"><thead><tr><th></th><th data-i18n=\"clans.status\"></th><th data-i18n=\"editor.level_components_type\"></th><th data-i18n=\"resources.level\"></th><th data-i18n=\"courses.concepts\"></th></tr></thead><tbody>");
var previousLevelCompleted = true;
var lastLevelCompleted = view.getLastLevelCompleted();
var passedLastCompletedLevel = !lastLevelCompleted;
var levelCount = 0;
// iterate view.levels.models
;(function(){
  var $$obj = view.levels.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

var levelStatus = null;
var levelNumber = view.classroom.getLevelNumber(level.get('original'), ++levelCount);
if ( view.userLevelStateMap[me.id])
{
levelStatus = view.userLevelStateMap[me.id][level.get('original')]
}
buf.push("<tr><td>");
if ( previousLevelCompleted || !passedLastCompletedLevel || levelStatus)
{
var i18nTag = level.isType('course-ladder') ? 'play.compete' : 'common.play';
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.get('slug')), 'data-i18n':(i18nTag), 'data-level-id':(level.get('original')), "class": [('btn'),('btn-forest'),('btn-play-level')] }, {"data-level-slug":true,"data-i18n":true,"data-level-id":true})) + "></button>");
if ( level.get('shareable'))
{
var levelOriginal = level.get('original');
var session = view.levelSessions.find(function(session) { return session.get('level').original === levelOriginal });
if ( session)
{
var url = '/play/' + level.get('type') + '-level/' + level.get('slug') + '/' + session.id + '?course=' + view.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), "class": [('btn'),('btn-gold'),('btn-view-project-level')] }, {"href":true})) + ">");
if ( level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.webpage\"></span>");
}
buf.push("</a>");
}
}
}
buf.push("</td><td>");
if ( view.userLevelStateMap[me.id])
{
buf.push("<div>" + (jade.escape(null == (jade.interp = view.userLevelStateMap[me.id][level.get('original')]) ? "" : jade.interp)) + "</div>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = level.get('practice') ? 'practice' : 'required') == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = levelNumber) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</td><td>");
if ( view.levelConceptMap[level.get('original')])
{
// iterate view.course.get('concepts')
;(function(){
  var $$obj = view.course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

}
buf.push("</td>");
if ( level.get('original') === lastLevelCompleted)
{
passedLastCompletedLevel = true
}
if ( !level.get('practice'))
{
if ( view.userLevelStateMap[me.id])
{
previousLevelCompleted = view.userLevelStateMap[me.id][level.get('original')] === 'complete'
}
else
{
previousLevelCompleted = false
}
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

var levelStatus = null;
var levelNumber = view.classroom.getLevelNumber(level.get('original'), ++levelCount);
if ( view.userLevelStateMap[me.id])
{
levelStatus = view.userLevelStateMap[me.id][level.get('original')]
}
buf.push("<tr><td>");
if ( previousLevelCompleted || !passedLastCompletedLevel || levelStatus)
{
var i18nTag = level.isType('course-ladder') ? 'play.compete' : 'common.play';
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.get('slug')), 'data-i18n':(i18nTag), 'data-level-id':(level.get('original')), "class": [('btn'),('btn-forest'),('btn-play-level')] }, {"data-level-slug":true,"data-i18n":true,"data-level-id":true})) + "></button>");
if ( level.get('shareable'))
{
var levelOriginal = level.get('original');
var session = view.levelSessions.find(function(session) { return session.get('level').original === levelOriginal });
if ( session)
{
var url = '/play/' + level.get('type') + '-level/' + level.get('slug') + '/' + session.id + '?course=' + view.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), "class": [('btn'),('btn-gold'),('btn-view-project-level')] }, {"href":true})) + ">");
if ( level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.game\"></span>");
}
else
{
buf.push("<span data-i18n=\"sharing.webpage\"></span>");
}
buf.push("</a>");
}
}
}
buf.push("</td><td>");
if ( view.userLevelStateMap[me.id])
{
buf.push("<div>" + (jade.escape(null == (jade.interp = view.userLevelStateMap[me.id][level.get('original')]) ? "" : jade.interp)) + "</div>");
}
buf.push("</td><td>" + (jade.escape((jade.interp = level.get('practice') ? 'practice' : 'required') == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = levelNumber) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = i18n(level.attributes, 'name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</td><td>");
if ( view.levelConceptMap[level.get('original')])
{
// iterate view.course.get('concepts')
;(function(){
  var $$obj = view.course.get('concepts');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( view.levelConceptMap[level.get('original')][concept])
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('concept')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

}
buf.push("</td>");
if ( level.get('original') === lastLevelCompleted)
{
passedLastCompletedLevel = true
}
if ( !level.get('practice'))
{
if ( view.userLevelStateMap[me.id])
{
previousLevelCompleted = view.userLevelStateMap[me.id][level.get('original')] === 'complete'
}
else
{
previousLevelCompleted = false
}
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</tbody></table></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/courses/course-details.js.map
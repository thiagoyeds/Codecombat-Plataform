require.register("templates/editor/level/level-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),level = locals_.level,view = locals_.view,authorized = locals_.authorized,recentlyPlayedOpponents = locals_.recentlyPlayedOpponents,anonymous = locals_.anonymous,me = locals_.me;if ( level.loading)
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"level-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/level\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#thangs-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_thangs\">Thangs</a></li><li><a href=\"#editor-level-scripts-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_scripts\">Scripts</a></li><li><a href=\"#editor-level-settings-tab-view\" data-toggle=\"tab\" data-i18n=\"play.settings\">Settings</a></li><li><a href=\"#editor-level-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\" id=\"components-tab\">Components</a></li><li><a href=\"#systems-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_systems\">Systems</a></li><li><a href=\"#editor-level-tasks-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_tasks\" id=\"tasks-tab\">" + (jade.escape(null == (jade.interp = "Tasks" + " " + view.getTaskCompletionRatio()) ? "" : jade.interp)) + "</a></li><li><a href=\"#editor-level-patches\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = level.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li><li><a href=\"#related-achievements-view\" data-toggle=\"tab\" data-i18n=\"user.achievements_title\">Achievements</a></li><li><a href=\"#editor-level-documentation\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_docs\">Documentation</a></li><li><a href=\"#level-feedback-view\" data-toggle=\"tab\"><div class=\"glyphicon glyphicon-star\"></div></a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = level.attributes.name) == null ? '' : jade.interp)) + "<span id=\"completion-rate\" class=\"spl\"></span></span></div><ul class=\"nav navbar-nav navbar-right\"><li id=\"undo-button\"><a><span class=\"glyphicon-arrow-left glyphicon\"></span></a></li><li id=\"redo-button\"><a><span class=\"glyphicon-arrow-right glyphicon\"></span></a></li><li id=\"artisan-guide-button\"><a><span class=\"glyphicon-book glyphicon\"></span></a></li>");
if ( authorized)
{
buf.push("<li id=\"commit-level-start-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
else
{
buf.push("<li id=\"level-patch-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
if ( level.isType('ladder'))
{
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-team-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play As Which Team?</li><li>");
// iterate ['humans', 'ogres']
;(function(){
  var $$obj = ['humans', 'ogres'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var team = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(team), "class": [('play-with-team-button')] }, {"data-team":true})) + ">" + (jade.escape(null == (jade.interp = team + ' vs. AI') ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

// iterate recentlyPlayedOpponents
;(function(){
  var $$obj = recentlyPlayedOpponents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var match = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-team':(match.yourTeam), 'data-opponent':(match.opponentSessionID), "class": [('play-with-team-button')] }, {"data-team":true,"data-opponent":true})) + ">" + (jade.escape(null == (jade.interp = match.yourTeam + ' vs. ' + match.opponentName) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("</li></ul></li>");
}
else
{
buf.push("<li data-i18n=\"[title]general.play_preview\" title=\"Play preview of current level\" id=\"play-button\"><a><span class=\"glyphicon-play glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"level-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li>");
if ( me.isAdmin() || me.isArtisan())
{
buf.push("<!-- DNT--><li><a id=\"save-branch\">Save/Stash Branch</a></li><li><a id=\"load-branch\">Load/Unstash Branch</a></li>");
}
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(anonymous), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("editor/level/modals/GenerateTerrainModal"), 'data-i18n':("editor.generate_terrain"), 'disabled':(anonymous), "class": [('generate-terrain-button')] }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Generate Terrain</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( view.courseID)
{
buf.push("<li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"javascript\" class=\"play-classroom-level\">Play Classroom JavaScript</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"classroom\" data-code-language=\"python\" class=\"play-classroom-level\">Play Classroom Python</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-classroom=\"home\" data-code-language=\"\" class=\"play-classroom-level\">Play Home</a></li>");
}
if ( me.isAdmin())
{
buf.push("<li><a" + (jade.attrs({ 'href':("/editor/verifier/" + (level.get('slug')) + "?dev=true") }, {"href":true})) + ">Verifier</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"level-history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"level-editor-tabs\" class=\"tab-content\"><div id=\"thangs-tab-view\" class=\"tab-pane active\"></div><div id=\"editor-level-scripts-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-settings-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-components-tab-view\" class=\"tab-pane\"></div><div id=\"systems-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-tasks-tab-view\" class=\"tab-pane\"></div><div id=\"editor-level-patches\" class=\"tab-pane nano\"><div class=\"nano-content\"><div class=\"patches-view\"></div></div></div><div id=\"related-achievements-view\" class=\"tab-pane\"></div><div id=\"editor-level-documentation\" class=\"tab-pane\"><div class=\"tab-content\"><ul class=\"nav nav-pills nav-justified\"><li><a href=\"#components-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.components\">Components</a></li><li><a href=\"#systems-documentation-view\" data-toggle=\"pill\" data-i18n=\"resources.systems\">Systems</a></li></ul><div id=\"components-documentation-view\" class=\"tab-pane\"></div><div id=\"systems-documentation-view\" class=\"tab-pane\"></div></div></div><div id=\"level-feedback-view\" class=\"tab-pane\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/level-edit-view.js.map
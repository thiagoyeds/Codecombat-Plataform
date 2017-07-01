require.register("templates/editor/level/system/level-system-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view;buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#system-code\" data-toggle=\"tab\" data-i18n=\"general.code\" id=\"system-code-tab\">Code</a></li><li><a href=\"#system-config-schema\" data-toggle=\"tab\" data-i18n=\"editor.level_component_config_schema\" id=\"system-config-schema-tab\">Config Schema</a></li><li><a href=\"#system-settings\" data-toggle=\"tab\" data-i18n=\"play.settings\" id=\"system-settings-tab\">Settings</a></li><li><a href=\"#system-patches\" data-toggle=\"tab\" data-i18n=\"resources.patches\" id=\"system-patches-tab\">Patches</a></li></ul><ul class=\"nav navbar-nav navbar-right\">");
if ( !me.isAdmin() && !me.isArtisan())
{
buf.push("<li id=\"patch-system-button\"><a data-i18n=\"[title]common.submit_patch\"><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"system-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li>");
if ( me.isAdmin())
{
buf.push("<li id=\"create-new-system\"><a data-i18n=\"editor.level_system_btn_new\">Create New System</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"system-history-button\"><a data-i18n=\"general.version_history\">Version History</a></li></ul></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape(null == (jade.interp = view.levelSystem.get('name')) ? "" : jade.interp)) + "</span></div></nav><div class=\"tab-content\"><div id=\"system-code\" class=\"tab-pane active\"><div id=\"system-code-editor\"></div></div><div id=\"system-config-schema\" class=\"tab-pane\"><div id=\"config-schema-treema\"></div></div><div id=\"system-settings\" class=\"tab-pane\"><div id=\"edit-system-treema\"></div></div><div id=\"system-patches\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/system/level-system-edit-view.js.map
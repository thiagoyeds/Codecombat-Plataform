require.register("templates/editor/level/component/level-component-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),editTitle = locals_.editTitle,component = locals_.component,me = locals_.me;buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#component-code\" data-toggle=\"tab\" data-i18n=\"general.code\" id=\"component-code-tab\">Code</a></li><li><a href=\"#component-config-schema\" data-toggle=\"tab\" data-i18n=\"editor.level_component_config_schema\" id=\"component-config-schema-tab\">Config Schema</a></li><li><a href=\"#component-settings\" data-toggle=\"tab\" data-i18n=\"play.settings\" id=\"component-settings-tab\">Settings</a></li><li><a href=\"#component-patches\" data-toggle=\"tab\" data-i18n=\"resources.patches\" id=\"component-patches-tab\">Patches</a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape(null == (jade.interp = editTitle) ? "" : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\">");
if ( !component.hasWriteAccess())
{
buf.push("<li id=\"patch-component-button\"><a data-i18n=\"[title]common.submit_patch\"><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li><a id=\"component-watch-button\"><span class=\"watch\"><span class=\"glyphicon glyphicon-eye-open\"></span><span data-i18n=\"common.watch\" class=\"spl\">Watch</span></span><span class=\"unwatch secret\"><span class=\"glyphicon glyphicon-eye-close\"></span><span data-i18n=\"common.unwatch\" class=\"spl\">Unwatch</span></span></a></li>");
if ( !me.get('anonymous'))
{
buf.push("<li id=\"create-new-component-button\"><a data-i18n=\"editor.level_component_btn_new\">Create New Component</a></li><li><a data-i18n=\"editor.pop_i18n\" id=\"pop-component-i18n-button\">Populate i18n</a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"component-history-button\"><a data-i18n=\"general.version_history\">Version History</a></li></ul></li></ul></nav><div class=\"tab-content\"><div id=\"component-code\" class=\"tab-pane active\"><div id=\"component-code-editor\"></div></div><div id=\"component-config-schema\" class=\"tab-pane\"><div id=\"config-schema-treema\"></div></div><div id=\"component-settings\" class=\"tab-pane\"><div id=\"edit-component-treema\"></div></div><div id=\"component-patches\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/component/level-component-edit-view.js.map
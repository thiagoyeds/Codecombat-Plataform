require.register("templates/editor/level/systems-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;buf.push("<div class=\"systems-container\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#systems-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><h3 data-i18n=\"editor.level_systems_tab_title\">Current Systems</h3><div class=\"editor-nano-container nano\"><div id=\"systems-treema\" class=\"nano-content\"></div></div></div><div class=\"edit-system-container\">");
if ( me.isAdmin())
{
buf.push("<button id=\"create-new-system-button\" class=\"btn btn-primary\"><span class=\"icon-file\"></span><span data-i18n=\"editor.level_systems_btn_new\" class=\"text\">Create New System</span></button>");
}
buf.push("<div id=\"level-system-edit-view\"></div></div><button id=\"add-system-button\" class=\"btn btn-primary\"><span class=\"icon-plus\"></span><span data-i18n=\"editor.level_systems_btn_add\" class=\"text\">Add System</span></button>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/systems-tab-view.js.map
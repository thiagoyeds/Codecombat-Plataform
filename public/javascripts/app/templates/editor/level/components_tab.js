require.register("templates/editor/level/components_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;buf.push("<div class=\"components-container\"><h3 data-i18n=\"editor.level_component_tab_title\">Current Components</h3><button type=\"button\" data-toggle=\"collapse\" data-target=\"#components-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><div class=\"editor-nano-container nano\"><div id=\"components-treema\" class=\"nano-content\"></div></div></div><div class=\"edit-component-container\">");
if ( !me.get('anonymous'))
{
buf.push("<button id=\"create-new-component-button-no-select\" class=\"btn btn-primary\"><span class=\"icon-plus\"></span><span data-i18n=\"editor.level_component_btn_new\" class=\"text\">Create New Component</span></button>");
}
buf.push("<div id=\"level-component-edit-view\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/components_tab.js.map
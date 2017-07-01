require.register("templates/editor/component/thang-components-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"thang-components-column\" class=\"column\"><h3 data-i18n=\"editor.level_tab_components\">Components</h3><button id=\"add-components-button\" data-i18n=\"editor.add_components\" class=\"btn\">Add Components</button><div class=\"treema\"></div></div><div id=\"thang-components-config-column\" class=\"column\"><h3 data-i18n=\"editor.component_configs\">Component Configurations</h3><div id=\"thang-component-configs\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/component/thang-components-edit-view.js.map
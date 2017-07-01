require.register("templates/editor/level/scripts_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button type=\"button\" data-toggle=\"collapse\" data-target=\"#scripts-treema\" class=\"navbar-toggle toggle btn-primary\"><span class=\"icon-list\"></span></button><div class=\"editor-nano-container nano\"><div id=\"scripts-treema\" class=\"nano-content\"></div></div><div class=\"editor-nano-container nano\"><div id=\"script-treema\" class=\"nano-content\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/scripts_tab.js.map
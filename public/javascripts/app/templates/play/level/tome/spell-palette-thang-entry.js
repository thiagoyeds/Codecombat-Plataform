require.register("templates/play/level/tome/spell-palette-thang-entry", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<!--span.doc-title(data-property-name=view.doc.name)= view.doc.title--><img" + (jade.attrs({ 'src':(view.thang.getPortraitURL()) }, {"src":true})) + "/>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell-palette-thang-entry.js.map
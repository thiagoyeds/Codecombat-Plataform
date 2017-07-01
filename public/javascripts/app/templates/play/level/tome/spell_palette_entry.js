require.register("templates/play/level/tome/spell_palette_entry", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<span" + (jade.attrs({ 'data-property-name':(view.doc.name), "class": [('doc-title')] }, {"data-property-name":true})) + ">" + (jade.escape(null == (jade.interp = view.doc.title) ? "" : jade.interp)) + "</span>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell_palette_entry.js.map
require.register("templates/editor/level/thang/level-thang-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"well\"><a data-i18n=\"editor.level_components_title\" id=\"all-thangs-link\">Back To All Thangs</a><span id=\"thang-props\"><a id=\"thang-name-link\"><span>" + (jade.escape(null == (jade.interp = view.thangData.id) ? "" : jade.interp)) + "</span><input" + (jade.attrs({ 'value':(view.thangData.id), "class": [('secret')] }, {"value":true})) + "/></a> ( <span data-i18n=\"editor.level_components_type\">Type</span>: <a id=\"thang-type-link\"><span>" + (jade.escape(null == (jade.interp = view.thangData.thangType) ? "" : jade.interp)) + "</span><input" + (jade.attrs({ 'value':(view.thangData.thangType), "class": [('secret')] }, {"value":true})) + "/></a> ) </span></div><div id=\"thang-components-edit-view\"></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/thang/level-thang-edit-view.js.map
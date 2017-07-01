require.register("templates/editor/component/thang-component-config-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"panel panel-default\"><div" + (jade.attrs({ "class": [('panel-heading'),(view.isDefaultComponent ? "is-default-component" : "")] }, {"class":true})) + "><em>" + (jade.escape((jade.interp = view.component.attributes.system) == null ? '' : jade.interp)) + ".</em><strong class=\"panel-title spr\">" + (jade.escape(null == (jade.interp = view.component.attributes.name) ? "" : jade.interp)) + "</strong><span id=\"description\" class=\"text-muted\">" + (jade.escape(null == (jade.interp = view.component.attributes.description) ? "" : jade.interp)) + "</span></div><div class=\"panel-body\"><div class=\"treema\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/component/thang-component-config-view.js.map
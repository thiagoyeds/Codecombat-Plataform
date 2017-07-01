require.register("templates/editor/level/thang/available_component", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),component = locals_.component;buf.push("<li" + (jade.attrs({ 'title':("" + (component.description) + ""), 'data-component-id':("" + (component._id) + "") }, {"title":true,"data-component-id":true})) + "><strong class=\"component-system\">" + (jade.escape((jade.interp = component.system) == null ? '' : jade.interp)) + ": </strong><a class=\"component-name\">" + (jade.escape((jade.interp = component.name) == null ? '' : jade.interp)) + "</a></li>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/thang/available_component.js.map
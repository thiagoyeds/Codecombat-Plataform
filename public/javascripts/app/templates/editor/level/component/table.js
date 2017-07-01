require.register("templates/editor/level/component/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),components = locals_.components;buf.push("<table class=\"table components-table\"><tr><th colspan=\"3\">Results: " + (jade.escape((jade.interp = components.length) == null ? '' : jade.interp)) + "</th></tr><tr><th>Name</th><th>Description</th><th>Version</th><th></th></tr>");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = component.system + "." + component.name) ? "" : jade.interp)) + "</td><td class=\"body-row\">" + (jade.escape((jade.interp = component.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = component.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-system':(component.system), 'data-name':(component.name), "class": [('icon-pencil'),('edit-component-button')] }, {"data-system":true,"data-name":true})) + "></i></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<tr><td>" + (jade.escape(null == (jade.interp = component.system + "." + component.name) ? "" : jade.interp)) + "</td><td class=\"body-row\">" + (jade.escape((jade.interp = component.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = component.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = component.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-system':(component.system), 'data-name':(component.name), "class": [('icon-pencil'),('edit-component-button')] }, {"data-system":true,"data-name":true})) + "></i></td></tr>");
    }

  }
}).call(this);

buf.push("</table>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/component/table.js.map
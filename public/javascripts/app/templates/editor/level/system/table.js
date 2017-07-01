require.register("templates/editor/level/system/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),systems = locals_.systems;buf.push("<table class=\"table systems-table\"><tr><th colspan=\"3\">Results: " + (jade.escape((jade.interp = systems.length) == null ? '' : jade.interp)) + "</th></tr><tr><th>Name</th><th>Description</th><th>Version</th><th></th></tr>");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<tr><td class=\"body-row\">" + (jade.escape((jade.interp = system.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = system.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = system.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-name':(system.name), "class": [('icon-pencil'),('edit-system-button')] }, {"data-name":true})) + "></i></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<tr><td class=\"body-row\">" + (jade.escape((jade.interp = system.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = system.version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = system.version.minor) == null ? '' : jade.interp)) + "</td><td><i" + (jade.attrs({ 'data-name':(system.name), "class": [('icon-pencil'),('edit-system-button')] }, {"data-name":true})) + "></i></td></tr>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/system/table.js.map
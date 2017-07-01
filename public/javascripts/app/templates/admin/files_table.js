require.register("templates/admin/files_table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),files = locals_.files;buf.push("<table id=\"file-table\" class=\"table\"><tr><th>Filename</th></tr>");
// iterate files
;(function(){
  var $$obj = files;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var file = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("/file/" + (file.metadata.path) + "/" + (file.filename) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape((jade.interp = file.filename) == null ? '' : jade.interp)) + "</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var file = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("/file/" + (file.metadata.path) + "/" + (file.filename) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">" + (jade.escape((jade.interp = file.filename) == null ? '' : jade.interp)) + "</a></td></tr>");
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
//# sourceMappingURL=/javascripts/app/templates/admin/files_table.js.map
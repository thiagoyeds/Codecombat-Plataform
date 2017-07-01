require.register("templates/editor/achievement/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents;buf.push("<table class=\"table\"><tr><th colspan=\"3\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.collection\">Collection</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.collection) == null ? '' : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var data = $$obj[$index];

data = data.attributes;
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (data.slug || data._id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = data.name) == null ? '' : jade.interp)) + "</a></td><td>" + (jade.escape((jade.interp = data.description) == null ? '' : jade.interp)) + "</td><td>" + (jade.escape((jade.interp = data.collection) == null ? '' : jade.interp)) + "</td></tr>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/achievement/table.js.map
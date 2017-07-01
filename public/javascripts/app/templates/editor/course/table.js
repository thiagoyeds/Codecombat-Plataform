require.register("templates/editor/course/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents,me = locals_.me,page = locals_.page;buf.push("<table class=\"table\"><tr><th colspan=\"4\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th></tr>");
// iterate documents
;(function(){
  var $$obj = documents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var course = $$obj[$index];

buf.push("<tr" + (jade.attrs({ "class": [(course.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(course.get('name')), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (course.get('slug') || course.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(course.get('description')), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var course = $$obj[$index];

buf.push("<tr" + (jade.attrs({ "class": [(course.get('creator') == me.id ? 'mine' : '')] }, {"class":true})) + "><td" + (jade.attrs({ 'title':(course.get('name')), "class": [('name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/" + (page) + "/" + (course.get('slug') || course.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = course.get('name')) ? "" : jade.interp)) + "</a></td><td" + (jade.attrs({ 'title':(course.get('description')), "class": [('description-row')] }, {"title":true})) + ">" + (jade.escape(null == (jade.interp = course.get('description')) ? "" : jade.interp)) + "</td></tr>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/course/table.js.map
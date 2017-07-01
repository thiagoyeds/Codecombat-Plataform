require.register("templates/editor/thang/table", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),documents = locals_.documents;buf.push("<table class=\"table\"><tr><th colspan=\"4\"><span data-i18n=\"general.results\">Results</span><span>: " + (jade.escape((jade.interp = documents.length) == null ? '' : jade.interp)) + "</span></th></tr><tr><th id=\"portrait-col\"></th><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th data-i18n=\"general.version\">Version</th><th data-i18n=\"editor.tasks\">Tasks</th></tr>");
// iterate documents 
;(function(){
  var $$obj = documents ;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var thang = $$obj[$index];

buf.push("<tr><td>");
var name = thang.get('name');
buf.push("<img" + (jade.attrs({ 'title':("Add " + (name) + ""), 'src':(thang.getPortraitURL()), 'alt':(""), "class": [('portrait')] }, {"title":true,"src":true,"alt":true})) + "/></td><td" + (jade.attrs({ 'title':(name), "class": [('small-name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/thang/" + (thang.get('slug') || thang.id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "</a></td>");
var description = thang.get('description');
buf.push("<td" + (jade.attrs({ 'title':(description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = description) == null ? '' : jade.interp)) + "</td>");
var version = thang.get('version')
buf.push("<td>" + (jade.escape((jade.interp = version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = version.minor) == null ? '' : jade.interp)) + "</td>");
var tasks = thang.get('tasks');
if ( tasks && tasks.length)
{
var completed = tasks.filter(function(t) { return t.complete; });
buf.push("<td>" + (jade.escape((jade.interp = completed.length) == null ? '' : jade.interp)) + "/" + (jade.escape((jade.interp = tasks.length) == null ? '' : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var thang = $$obj[$index];

buf.push("<tr><td>");
var name = thang.get('name');
buf.push("<img" + (jade.attrs({ 'title':("Add " + (name) + ""), 'src':(thang.getPortraitURL()), 'alt':(""), "class": [('portrait')] }, {"title":true,"src":true,"alt":true})) + "/></td><td" + (jade.attrs({ 'title':(name), "class": [('small-name-row')] }, {"title":true})) + "><a" + (jade.attrs({ 'href':("/editor/thang/" + (thang.get('slug') || thang.id) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = name) == null ? '' : jade.interp)) + "</a></td>");
var description = thang.get('description');
buf.push("<td" + (jade.attrs({ 'title':(description), "class": [('body-row')] }, {"title":true})) + ">" + (jade.escape((jade.interp = description) == null ? '' : jade.interp)) + "</td>");
var version = thang.get('version')
buf.push("<td>" + (jade.escape((jade.interp = version.major) == null ? '' : jade.interp)) + "." + (jade.escape((jade.interp = version.minor) == null ? '' : jade.interp)) + "</td>");
var tasks = thang.get('tasks');
if ( tasks && tasks.length)
{
var completed = tasks.filter(function(t) { return t.complete; });
buf.push("<td>" + (jade.escape((jade.interp = completed.length) == null ? '' : jade.interp)) + "/" + (jade.escape((jade.interp = tasks.length) == null ? '' : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/thang/table.js.map
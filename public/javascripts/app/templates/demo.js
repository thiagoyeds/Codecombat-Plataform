require.register("templates/demo", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),parentFolders = locals_.parentFolders,currentFolder = locals_.currentFolder,children = locals_.children;buf.push("<h2>Demo Page</h2><ol class=\"breadcrumb\">");
// iterate parentFolders
;(function(){
  var $$obj = parentFolders;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var path = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'href':(path.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = path.name) ? "" : jade.interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var path = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'href':(path.url) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = path.name) ? "" : jade.interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("<li class=\"active\">" + (jade.escape(null == (jade.interp = currentFolder) ? "" : jade.interp)) + "</li></ol><div id=\"demo-wrapper\" class=\"well pull-left\"><div id=\"demo-area\"></div></div><div id=\"demo-nav\" class=\"nav nav-pills nav-stacked pull-right well\">");
// iterate children
;(function(){
  var $$obj = children;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var child = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [(child.type)] }, {"class":true})) + "><a" + (jade.attrs({ 'href':(child.url), "class": [('small')] }, {"href":true})) + ">");
if ( child.type == 'folder')
{
buf.push("<span class=\"glyphicon glyphicon-folder-close\"></span>");
}
else
{
buf.push("<span class=\"glyphicon glyphicon-file\"></span>");
}
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = child.name) ? "" : jade.interp)) + "</span>");
if ( child.type == 'folder')
{
buf.push("<strong>(" + (jade.escape((jade.interp = child.size) == null ? '' : jade.interp)) + ")</strong>");
}
buf.push("</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var child = $$obj[$index];

buf.push("<li" + (jade.attrs({ "class": [(child.type)] }, {"class":true})) + "><a" + (jade.attrs({ 'href':(child.url), "class": [('small')] }, {"href":true})) + ">");
if ( child.type == 'folder')
{
buf.push("<span class=\"glyphicon glyphicon-folder-close\"></span>");
}
else
{
buf.push("<span class=\"glyphicon glyphicon-file\"></span>");
}
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = child.name) ? "" : jade.interp)) + "</span>");
if ( child.type == 'folder')
{
buf.push("<strong>(" + (jade.escape((jade.interp = child.size) == null ? '' : jade.interp)) + ")</strong>");
}
buf.push("</a></li>");
    }

  }
}).call(this);

buf.push("</div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/demo.js.map
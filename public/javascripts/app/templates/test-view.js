require.register("templates/test-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),parentFolders = locals_.parentFolders,currentFolder = locals_.currentFolder,view = locals_.view,children = locals_.children;buf.push("<div id=\"demo-area\"></div><h2 id=\"test-h2\">Testing Page</h2><ol class=\"breadcrumb\">");
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

buf.push("<li class=\"active\">" + (jade.escape(null == (jade.interp = currentFolder) ? "" : jade.interp)) + "</li></ol><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-8\"><div id=\"failure-reports\">");
// iterate view.failureReports
;(function(){
  var $$obj = view.failureReports;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var report = $$obj[$index];

buf.push("<div class=\"alert alert-danger alert-report\"><ul class=\"suite-list\">");
// iterate report.suiteDescriptions
;(function(){
  var $$obj = report.suiteDescriptions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("<li><strong>... " + (jade.escape((jade.interp = report.testDescription) == null ? '' : jade.interp)) + "</strong></li></ul><hr/><ol class=\"error-list\">");
// iterate report.failMessages
;(function(){
  var $$obj = report.failMessages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  }
}).call(this);

buf.push("</ol></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var report = $$obj[$index];

buf.push("<div class=\"alert alert-danger alert-report\"><ul class=\"suite-list\">");
// iterate report.suiteDescriptions
;(function(){
  var $$obj = report.suiteDescriptions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var description = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</li>");
    }

  }
}).call(this);

buf.push("<li><strong>... " + (jade.escape((jade.interp = report.testDescription) == null ? '' : jade.interp)) + "</strong></li></ul><hr/><ol class=\"error-list\">");
// iterate report.failMessages
;(function(){
  var $$obj = report.failMessages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var message = $$obj[$index];

buf.push("<li><strong>" + (jade.escape(null == (jade.interp = message) ? "" : jade.interp)) + "</strong></li>");
    }

  }
}).call(this);

buf.push("</ol></div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"test-wrapper\" class=\"well\"><div id=\"testing-area\"></div></div></div><div class=\"col-md-4 hidden-sm hidden-xs\"><div id=\"test-nav\" class=\"nav nav-pills nav-stacked well\">");
if ( view.demosOn)
{
buf.push("<button id=\"hide-demos-btn\" class=\"btn btn-danger btn-block\">Hide Demos</button>");
}
else
{
buf.push("<button id=\"show-demos-btn\" class=\"btn btn-info btn-block\">Show Demos</button>");
}
buf.push("<hr/>");
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

buf.push("</div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/test-view.js.map
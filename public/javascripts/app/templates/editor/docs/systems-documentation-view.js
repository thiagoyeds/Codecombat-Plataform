require.register("templates/editor/docs/systems-documentation-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),systems = locals_.systems;buf.push("<div class=\"container\"><div class=\"pull-right\"><button id=\"toggle-all-system-code\" class=\"btn btn-primary\">Toggle all code</button></div><div class=\"clearfix\"></div><div class=\"row\"><div class=\"col-xs-3 index-column nano\"><ul class=\"nav nav-list list-group nano-content\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (system.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = system.get('name')) ? "" : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (system.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = system.get('name')) ? "" : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></div><div class=\"col-xs-9 documentation-column nano\"><ul class=\"nano-content\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (system.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\">" + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</div><div class=\"panel-body\">" + (jade.escape((jade.interp = system.get('description')) == null ? '' : jade.interp)) + "</div><ul><li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (system.get('name')) + ""), 'href':("#" + (system.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (system.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = system.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (system.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\">" + (jade.escape((jade.interp = system.get('name')) == null ? '' : jade.interp)) + "</div><div class=\"panel-body\">" + (jade.escape((jade.interp = system.get('description')) == null ? '' : jade.interp)) + "</div><ul><li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (system.get('name')) + ""), 'href':("#" + (system.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (system.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = system.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/docs/systems-documentation-view.js.map
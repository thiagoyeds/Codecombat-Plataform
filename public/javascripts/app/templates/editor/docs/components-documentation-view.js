require.register("templates/editor/docs/components-documentation-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),components = locals_.components,codeLanguage = locals_.codeLanguage,marked = locals_.marked;buf.push("<div class=\"container\"><div class=\"pull-right\"><button id=\"toggle-all-component-code\" class=\"btn btn-primary\">Toggle all code</button></div><div class=\"clearfix\"></div><div class=\"row\"><div class=\"col-xs-3 index-column nano\"><ul class=\"nav nav-list list-group nano-content\">");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</li><ul><!-- .list-group for different layout-->");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + ""), "class": [('doc-name')] }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</li><ul><!-- .list-group for different layout-->");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':("#" + (component.get('name')) + "" + (doc.name) + "") }, {"href":true})) + "><li class=\"list-group-item\">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</li></a>");
    }

  }
}).call(this);

buf.push("</ul></a>");
    }

  }
}).call(this);

buf.push("</ul></div><div class=\"col-xs-9 documentation-column nano\"><ul class=\"nano-content\">");
// iterate components
;(function(){
  var $$obj = components;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (component.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\"><strong>" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</strong></div><div class=\"panel-body\">" + (jade.escape((jade.interp = component.get('description')) == null ? '' : jade.interp)) + "</div><ul>");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("<li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (component.get('name')) + ""), 'href':("#" + (component.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (component.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = component.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("" + (component.get('name')) + ""), "class": [("panel panel-defalt")] }, {"id":true,"class":true})) + "><div class=\"panel-heading\"><strong>" + (jade.escape(null == (jade.interp = component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</strong></div><div class=\"panel-body\">" + (jade.escape((jade.interp = component.get('description')) == null ? '' : jade.interp)) + "</div><ul>");
// iterate (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : [])
;(function(){
  var $$obj = (component.attributes.propertyDocumentation ? component.attributes.propertyDocumentation : []);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li" + (jade.attrs({ 'id':("" + (component.get('name')) + "" + (doc.name) + ""), "class": [('list-group-item')] }, {"id":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "<ul class=\"special-list\">");
if ( doc.description[codeLanguage])
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description[codeLanguage])) ? "" : jade.interp) + "</li>");
}
else
{
buf.push("<li>" + (null == (jade.interp = marked(doc.description)) ? "" : jade.interp) + "</li>");
}
buf.push("</ul></li>");
    }

  }
}).call(this);

buf.push("<li class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#" + (component.get('name')) + ""), 'href':("#" + (component.get('name')) + "Code"), "class": [('code-block')] }, {"data-toggle":true,"data-parent":true,"href":true})) + ">Code</a></li></ul><div" + (jade.attrs({ 'id':("" + (component.get('name')) + "Code"), "class": [("panel-collapse collapse")] }, {"id":true,"class":true})) + "><div class=\"panel-body\"><pre>" + (jade.escape((jade.interp = component.attributes.code) == null ? '' : jade.interp)) + "</pre></div></div></div>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/docs/components-documentation-view.js.map
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

;require.register("views/editor/docs/ComponentsDocumentationView", function(exports, require, module) {
var CocoCollection, CocoView, ComponentDocsCollection, ComponentsDocumentationView, LevelComponent, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/docs/components-documentation-view');

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

ComponentDocsCollection = (function(superClass) {
  extend(ComponentDocsCollection, superClass);

  function ComponentDocsCollection() {
    return ComponentDocsCollection.__super__.constructor.apply(this, arguments);
  }

  ComponentDocsCollection.prototype.url = '/db/level.component?project=system,name,description,dependencies,propertyDocumentation,code';

  ComponentDocsCollection.prototype.model = LevelComponent;

  ComponentDocsCollection.prototype.comparator = 'system';

  return ComponentDocsCollection;

})(CocoCollection);

module.exports = ComponentsDocumentationView = (function(superClass) {
  extend(ComponentsDocumentationView, superClass);

  ComponentsDocumentationView.prototype.id = 'components-documentation-view';

  ComponentsDocumentationView.prototype.template = template;

  ComponentsDocumentationView.prototype.className = 'tab-pane';

  ComponentsDocumentationView.prototype.collapsed = true;

  ComponentsDocumentationView.prototype.events = {
    'click #toggle-all-component-code': 'onToggleAllCode'
  };

  ComponentsDocumentationView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function ComponentsDocumentationView(options) {
    ComponentsDocumentationView.__super__.constructor.call(this, options);
    this.componentDocs = new ComponentDocsCollection();
    if (!options.lazy) {
      this.loadDocs();
    }
  }

  ComponentsDocumentationView.prototype.loadDocs = function() {
    if (this.loadingDocs) {
      return;
    }
    this.supermodel.loadCollection(this.componentDocs, 'components');
    this.loadingDocs = true;
    return this.render();
  };

  ComponentsDocumentationView.prototype.getRenderData = function() {
    var c, ref, ref1;
    c = ComponentsDocumentationView.__super__.getRenderData.call(this);
    c.components = this.componentDocs.models;
    c.marked = marked;
    c.codeLanguage = (ref = (ref1 = me.get('aceConfig')) != null ? ref1.language : void 0) != null ? ref : 'python';
    return c;
  };

  ComponentsDocumentationView.prototype.onToggleAllCode = function(e) {
    this.collapsed = !this.collapsed;
    this.$el.find('.collapse').collapse(this.collapsed ? 'hide' : 'show');
    return this.$el.find('#toggle-all-component-code').toggleClass('active', !this.collapsed);
  };

  ComponentsDocumentationView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#editor-level-documentation') {
      return;
    }
    return this.loadDocs();
  };

  return ComponentsDocumentationView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/docs/ComponentsDocumentationView.js.map
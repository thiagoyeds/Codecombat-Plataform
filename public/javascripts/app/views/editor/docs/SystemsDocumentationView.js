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

;require.register("views/editor/docs/SystemsDocumentationView", function(exports, require, module) {
var CocoCollection, CocoView, LevelSystem, SystemDocsCollection, SystemsDocumentationView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/docs/systems-documentation-view');

CocoCollection = require('collections/CocoCollection');

LevelSystem = require('models/LevelSystem');

SystemDocsCollection = (function(superClass) {
  extend(SystemDocsCollection, superClass);

  function SystemDocsCollection() {
    return SystemDocsCollection.__super__.constructor.apply(this, arguments);
  }

  SystemDocsCollection.prototype.url = '/db/level.system?project=name,description,code';

  SystemDocsCollection.prototype.model = LevelSystem;

  SystemDocsCollection.prototype.comparator = 'name';

  return SystemDocsCollection;

})(CocoCollection);

module.exports = SystemsDocumentationView = (function(superClass) {
  extend(SystemsDocumentationView, superClass);

  SystemsDocumentationView.prototype.id = 'systems-documentation-view';

  SystemsDocumentationView.prototype.template = template;

  SystemsDocumentationView.prototype.className = 'tab-pane';

  SystemsDocumentationView.prototype.collapsed = true;

  SystemsDocumentationView.prototype.events = {
    'click #toggle-all-system-code': 'onToggleAllCode'
  };

  SystemsDocumentationView.prototype.subscriptions = {
    'editor:view-switched': 'onViewSwitched'
  };

  function SystemsDocumentationView(options) {
    SystemsDocumentationView.__super__.constructor.call(this, options);
    this.systemDocs = new SystemDocsCollection();
    if (!options.lazy) {
      this.loadDocs();
    }
  }

  SystemsDocumentationView.prototype.loadDocs = function() {
    if (this.loadingDocs) {
      return;
    }
    this.supermodel.loadCollection(this.systemDocs, 'systems');
    this.loadingDocs = true;
    return this.render();
  };

  SystemsDocumentationView.prototype.getRenderData = function() {
    var c, ref, ref1;
    c = SystemsDocumentationView.__super__.getRenderData.call(this);
    c.systems = this.systemDocs.models;
    c.marked = marked;
    c.codeLanguage = (ref = (ref1 = me.get('aceConfig')) != null ? ref1.language : void 0) != null ? ref : 'python';
    return c;
  };

  SystemsDocumentationView.prototype.onToggleAllCode = function(e) {
    this.collapsed = !this.collapsed;
    this.$el.find('.collapse').collapse(this.collapsed ? 'hide' : 'show');
    return this.$el.find('#toggle-all-system-code').toggleClass('active', !this.collapsed);
  };

  SystemsDocumentationView.prototype.onViewSwitched = function(e) {
    if (e.targetURL !== '#editor-level-documentation') {
      return;
    }
    return this.loadDocs();
  };

  return SystemsDocumentationView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/docs/SystemsDocumentationView.js.map
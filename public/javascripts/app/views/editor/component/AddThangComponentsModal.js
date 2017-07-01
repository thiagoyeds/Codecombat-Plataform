require.register("templates/editor/component/add-thang-components-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,systems = locals_.systems,nameLists = locals_.nameLists,components = locals_.components;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h1 data-i18n=\"editor.add_components\">Add Components</h1></div><div class=\"modal-body\"><form><ul class=\"list-group\">");
// iterate systems
;(function(){
  var $$obj = systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<li class=\"list-group-item\"><div" + (jade.attrs({ 'data-toggle':("collapse"), 'data-target':("#" + (system) + ""), "class": [('item-title'),('collapsed')] }, {"data-toggle":true,"data-target":true})) + "><span class=\"glyphicon glyphicon-chevron-down text-muted spr\"></span><span class=\"glyphicon glyphicon-chevron-up text-muted spr\"></span><a>" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</a><span class=\"spl text-muted\">" + (jade.escape(null == (jade.interp = nameLists[system]) ? "" : jade.interp)) + "</span></div><div" + (jade.attrs({ 'id':(system), "class": [('collapse-panel'),('collapse')] }, {"id":true})) + ">");
// iterate components[system]
;(function(){
  var $$obj = components[system];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<li class=\"list-group-item\"><div" + (jade.attrs({ 'data-toggle':("collapse"), 'data-target':("#" + (system) + ""), "class": [('item-title'),('collapsed')] }, {"data-toggle":true,"data-target":true})) + "><span class=\"glyphicon glyphicon-chevron-down text-muted spr\"></span><span class=\"glyphicon glyphicon-chevron-up text-muted spr\"></span><a>" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</a><span class=\"spl text-muted\">" + (jade.escape(null == (jade.interp = nameLists[system]) ? "" : jade.interp)) + "</span></div><div" + (jade.attrs({ 'id':(system), "class": [('collapse-panel'),('collapse')] }, {"id":true})) + ">");
// iterate components[system]
;(function(){
  var $$obj = components[system];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':('checkbox'), 'value':(component.id) }, {"type":true,"value":true})) + "/><span class=\"spr\">" + (jade.escape((jade.interp = component.get('name')) == null ? '' : jade.interp)) + ":</span><span class=\"text-muted\">" + (jade.escape(null == (jade.interp = component.get('description')) ? "" : jade.interp)) + "</span></label></div>");
    }

  }
}).call(this);

buf.push("</div></li>");
    }

  }
}).call(this);

buf.push("</ul></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/editor/component/AddThangComponentsModal", function(exports, require, module) {
var CocoCollection, LevelComponent, ModalView, UnnamedView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

template = require('templates/editor/component/add-thang-components-modal');

CocoCollection = require('collections/CocoCollection');

LevelComponent = require('models/LevelComponent');

module.exports = UnnamedView = (function(superClass) {
  extend(UnnamedView, superClass);

  function UnnamedView() {
    return UnnamedView.__super__.constructor.apply(this, arguments);
  }

  UnnamedView.prototype.id = 'add-thang-components-modal';

  UnnamedView.prototype.template = template;

  UnnamedView.prototype.plain = true;

  UnnamedView.prototype.modalWidthPercent = 80;

  UnnamedView.prototype.events = {
    'click .footer button': 'onDonePressed'
  };

  UnnamedView.prototype.initialize = function(options) {
    UnnamedView.__super__.initialize.call(this);
    this.skipOriginals = options.skipOriginals || [];
    this.components = new CocoCollection([], {
      model: LevelComponent
    });
    this.components.url = "/db/level.component?term=&project=name,system,original,version,description";
    return this.supermodel.loadCollection(this.components, 'components');
  };

  UnnamedView.prototype.getRenderData = function() {
    var c, comp, componentList, ref, system;
    c = UnnamedView.__super__.getRenderData.call(this);
    c.components = (function() {
      var i, len, ref, ref1, results;
      ref = this.components.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        comp = ref[i];
        if (!(ref1 = comp.get('original'), indexOf.call(this.skipOriginals, ref1) >= 0)) {
          results.push(comp);
        }
      }
      return results;
    }).call(this);
    c.components = _.groupBy(c.components, function(comp) {
      return comp.get('system');
    });
    c.nameLists = {};
    ref = c.components;
    for (system in ref) {
      componentList = ref[system];
      c.components[system] = _.sortBy(componentList, function(comp) {
        return comp.get('name');
      });
      c.nameLists[system] = ((function() {
        var i, len, ref1, results;
        ref1 = c.components[system];
        results = [];
        for (i = 0, len = ref1.length; i < len; i++) {
          comp = ref1[i];
          results.push(comp.get('name'));
        }
        return results;
      })()).join(', ');
    }
    c.systems = _.keys(c.components);
    c.systems.sort();
    return c;
  };

  UnnamedView.prototype.getSelectedComponents = function() {
    var c, components, el, selected, vals;
    selected = this.$el.find('input[type="checkbox"]:checked');
    vals = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = selected.length; i < len; i++) {
        el = selected[i];
        results.push($(el).val());
      }
      return results;
    })();
    components = (function() {
      var i, len, ref, ref1, results;
      ref = this.components.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (ref1 = c.id, indexOf.call(vals, ref1) >= 0) {
          results.push(c);
        }
      }
      return results;
    }).call(this);
    return components;
  };

  return UnnamedView;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/component/AddThangComponentsModal.js.map
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

;
//# sourceMappingURL=/javascripts/app/templates/editor/component/add-thang-components-modal.js.map
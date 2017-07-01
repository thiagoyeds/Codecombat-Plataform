require.register("templates/editor/thang/export-thang-type-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h4 class=\"modal-title\">Export " + (jade.escape((jade.interp = view.thangType.get('name')) == null ? '' : jade.interp)) + " SpriteSheet</h4></div><div class=\"modal-body\"><div class=\"form-horizontal\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Team Color</label><div class=\"col-sm-9\"><select id=\"color-config-select\" class=\"form-control\"><option value=\"\">None</option><option value=\"red\">Red</option><option value=\"blue\">Blue</option><option value=\"green\">Green</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Resolution Factor</label><div class=\"col-sm-9\"><input id=\"resolution-input\" value=\"3\" class=\"form-control\"/></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Sprite Type</label><div class=\"col-sm-9\">");
var spriteType = view.thangType.get('spriteType') || 'segmented'
buf.push("<label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("segmented"), 'checked':(spriteType==='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Segmented</label><label class=\"radio-inline\"><input" + (jade.attrs({ 'type':("radio"), 'name':("sprite-type"), 'value':("singular"), 'checked':(spriteType!=='segmented') }, {"type":true,"name":true,"value":true,"checked":true})) + "/>Singular</label></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">Actions</label><div class=\"col-sm-9\">");
var defaultActionNames = _.pluck(view.thangType.getDefaultActions(), 'name')
var actions = view.thangType.getActions()
// iterate actions
;(function(){
  var $$obj = actions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var action = $$obj[$index];

buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'type':("checkbox"), 'name':("action"), 'value':(action.name), 'checked':(_.contains(defaultActionNames, action.name)) }, {"type":true,"name":true,"value":true,"checked":true})) + "/>" + (jade.escape((jade.interp = action.name) == null ? '' : jade.interp)) + "</label></div>");
    }

  }
}).call(this);

buf.push("</div></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" class=\"btn btn-default\">Cancel</button><button id=\"save-btn\" class=\"btn btn-primary\">Save</button><div class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/thang/export-thang-type-modal.js.map
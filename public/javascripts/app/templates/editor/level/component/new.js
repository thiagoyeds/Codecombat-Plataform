require.register("templates/editor/level/component/new", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.new_component_title\">Create New Component</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"level-component-system\" data-i18n=\"editor.new_component_field_system\" class=\"control-label\">System</label><select id=\"level-component-system\" name=\"system\" class=\"form-control\">");
// iterate view.systems
;(function(){
  var $$obj = view.systems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(system) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(system) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = system) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div><div class=\"form-group\"><label for=\"level-component-name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"level-component-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" id=\"new-level-component-submit\" class=\"btn btn-primary\">Create</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/component/new.js.map
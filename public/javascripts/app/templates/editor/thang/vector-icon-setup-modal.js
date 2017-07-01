require.register("templates/editor/thang/vector-icon-setup-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Choose Container for Vector Icon</h3></div><div class=\"modal-body\">");
if ( view.container)
{
buf.push("<form class=\"form\"><div class=\"form-group\"><select id=\"container-select\" class=\"form-control\">");
// iterate view.containers
;(function(){
  var $$obj = view.containers;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var container = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(container), 'selected':(container === view.container) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = container) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></form><canvas" + (jade.attrs({ 'width':(view.demoSize), 'height':(view.demoSize), 'id':('resulting-icon') }, {"width":true,"height":true})) + "></canvas><div class=\"alert alert-info\">Arrow keys to move, Shift-Plus/Minus to scale.</div>");
}
else
{
buf.push("<div>forgetting something?</div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"center\" class=\"btn pull-left btn-info\"><span class=\"glyphicon glyphicon-cutlery\"></span><span class=\"spl\">Center</span></button><button id=\"done-button\" class=\"btn btn-primary\">Done</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/thang/vector-icon-setup-modal.js.map
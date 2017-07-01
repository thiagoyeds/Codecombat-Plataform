require.register("templates/editor/level/modal/world-select-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,selectingPoint = locals_.selectingPoint,flexibleRegion = locals_.flexibleRegion;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3> ");
if ( selectingPoint)
{
buf.push("Select Point");
}
else
{
buf.push("Select Region");
}
buf.push("</h3></div><div class=\"modal-body\"><div class=\"instructions\"><div class=\"alert alert-info\"> <strong>Click</strong> to pan</div><div class=\"alert alert-info\"> <strong>Scroll</strong> to zoom</div>");
if ( selectingPoint)
{
buf.push("<div class=\"alert alert-info\"><strong>Shift-click </strong> to select</div>");
}
else
{
buf.push("<div class=\"alert alert-info\"><strong>Shift-drag</strong> to select</div>");
}
if ( flexibleRegion)
{
buf.push("<div class=\"alert alert-info\"><strong>Alt-shift-drag</strong> to select ratio</div>");
}
else
{
buf.push("<div class=\"alert alert-info\"><strong>Enter</strong> to confirm</div>");
}
buf.push("</div><div class=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" class=\"webgl-canvas\"></canvas><canvas width=\"924\" height=\"589\" class=\"normal-canvas\"></canvas></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><a id=\"done-button\" class=\"btn btn-primary\">Done</a></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/modal/world-select-modal.js.map
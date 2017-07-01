require.register("templates/play/level/hints-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<button class=\"close-hint-btn btn btn-illustrated btn-danger\"><span class=\"glyphicon glyphicon-remove\"></span></button><h1 class=\"text-center hint-title\"><span>" + (jade.escape(null == (jade.interp = view.state.get('hintsTitle')) ? "" : jade.interp)) + "</span></h1><div class=\"hint-body\">" + (null == (jade.interp = view.getProcessedHint()) ? "" : jade.interp) + "</div><div class=\"row btn-area\"><div class=\"col-md-4\">");
if ( view.state.get('hintIndex') > 0)
{
buf.push("<button data-i18n=\"about.previous\" class=\"previous-btn btn btn-illustrated pull-left\"></button>");
}
buf.push("</div><div class=\"col-md-4\"><h2 class=\"text-center hint-pagination\">" + (jade.escape((jade.interp = view.state.get('hintIndex')+1) == null ? '' : jade.interp)) + " / " + (jade.escape((jade.interp = view.hintsState.get('total')) == null ? '' : jade.interp)) + "</h2></div><div class=\"col-md-4\">");
if ( view.state.get('hintIndex') < view.hintsState.get('total') - 1)
{
buf.push("<button data-i18n=\"play.next\" class=\"next-btn btn btn-illustrated pull-right\"></button>");
}
buf.push("</div></div><div class=\"clearfix\"></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/hints-view.js.map
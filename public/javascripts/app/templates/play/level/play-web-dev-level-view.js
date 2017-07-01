require.register("templates/play/level/play-web-dev-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div id=\"web-surface-view\"></div><div id=\"info-bar\" class=\"style-flat\">");
if ( !view.supermodel.finished())
{
buf.push("<h1 data-i18n=\"common.loading\"></h1>");
}
else
{
buf.push("<h1><span data-i18n=\"game_dev.creator\"></span><span>" + (jade.escape(null == (jade.interp = ': ') ? "" : jade.interp)) + "</span>" + (jade.escape((jade.interp = view.session.get('creatorName')) == null ? '' : jade.interp)) + "</h1>");
}
buf.push("</div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/play-web-dev-level-view.js.map
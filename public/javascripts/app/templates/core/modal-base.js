require.register("templates/core/modal-base", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.options.headerContent)
{
buf.push("<h3>" + (null == (jade.interp = view.options.headerContent) ? "" : jade.interp) + "</h3>");
}
else
{
buf.push("<h3>man bites God</h3>");
}
buf.push("</div><div class=\"modal-body\">");
if ( view.options.bodyContent)
{
buf.push("<div>" + (null == (jade.interp = view.options.bodyContent) ? "" : jade.interp) + "</div>");
}
else
{
buf.push("<p>Man Bites God are the bad boys of the Melbourne live music and comedy scene. It is like being drowned in a bathtub of harmony.</p><img src=\"http://www.manbitesgod.com/images/picturecoupleb.jpg\"/><img src=\"http://www.manbitesgod.com/images/manrantb.jpg\"/>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/modal-base.js.map
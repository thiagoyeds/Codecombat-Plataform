require.register("templates/editor/patch_modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,patch = locals_.patch,deltaWorked = locals_.deltaWorked,isPatchCreator = locals_.isPatchCreator,status = locals_.status,isPatchRecipient = locals_.isPatchRecipient;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"modal-header-content\"><h3 data-i18n=\"resources.patch\"></h3></div></div><div class=\"modal-body\"><div class=\"modal-body\"><p>" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</p>");
if ( deltaWorked)
{
buf.push("<div class=\"changes-stub\"></div>");
}
else
{
buf.push("<div class=\"alert alert-danger\">Could not apply this delta to the current version.</div>");
}
buf.push("</div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\"></button>");
if ( isPatchCreator)
{
if ( status != 'withdrawn')
{
buf.push("<button id=\"withdraw-button\" data-i18n=\"general.withdraw\" class=\"btn btn-danger\"></button>");
}
}
if ( isPatchRecipient)
{
if ( status != 'accepted')
{
buf.push("<button id=\"accept-button\" data-i18n=\"general.accept\" class=\"btn btn-primary\"></button>");
}
if ( status != 'rejected')
{
buf.push("<button id=\"reject-button\" data-i18n=\"general.reject\" class=\"btn btn-danger\"></button>");
}
}
buf.push("</div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/patch_modal.js.map
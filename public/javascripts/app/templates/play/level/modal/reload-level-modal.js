require.register("templates/play/level/modal/reload-level-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"play_level.reload_title\">Reload All Code?</h3></div><div class=\"modal-body\"><p data-i18n=\"play_level.reload_really\">Are you sure you want to reload this level back to the beginning?</p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.close\" class=\"btn\">Close</a><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.reload_confirm\" id=\"restart-level-confirm-button\" class=\"btn btn-primary\">Reload All</a></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/reload-level-modal.js.map
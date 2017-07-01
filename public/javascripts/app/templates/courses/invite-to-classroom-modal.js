require.register("templates/courses/invite-to-classroom-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("</div><div class=\"modal-body\"><h3 data-i18n=\"courses.option1_header\"></h3><div class=\"form\"><div class=\"form-group\"><p data-i18n=\"courses.enter_emails\" class=\"small help-block\"></p><textarea id=\"invite-emails-textarea\" rows=\"10\" class=\"form-control\"></textarea></div><div class=\"form-group\"><div class=\"text-center\"><button id=\"send-invites-btn\" data-i18n=\"courses.send_invites\" class=\"btn btn-lg btn-primary\"></button><div id=\"invite-emails-sending-alert\" data-i18n=\"common.sending\" class=\"alert alert-info hide\"></div><div id=\"invite-emails-success-alert\" data-i18n=\"play_level.done\" class=\"alert alert-success hide\"></div></div></div></div><br/><p data-i18n=\"courses.option1_body\" class=\"small\"></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/invite-to-classroom-modal.js.map
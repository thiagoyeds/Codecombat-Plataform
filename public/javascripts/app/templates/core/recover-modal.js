require.register("templates/core/recover-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"recover.recover_account_title\">Recover Account</h3></div><div class=\"modal-body\"><div class=\"form\"><div class=\"form-group\"><label for=\"recover-email\" data-i18n=\"general.email\" class=\"control-label\">Email     </label><input id=\"recover-email\" name=\"email\" type=\"email\" class=\"input-large form-control\"/></div></div></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"common.sending\">Sending...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"recover-button\" data-i18n=\"recover.send_password\" class=\"btn btn-primary btn-large\">Send Recovery Password</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/recover-modal.js.map
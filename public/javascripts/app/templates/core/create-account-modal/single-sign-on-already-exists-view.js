require.register("templates/core/create-account-modal/single-sign-on-already-exists-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-body\"><div class=\"modal-body-content\">");
if ( view.signupState.get('ssoUsed'))
{
buf.push("<h4><span data-i18n=\"signup.account_exists\"></span></h4><div class=\"small\"><b><span>" + (jade.escape(null == (jade.interp = view.signupState.get('email')) ? "" : jade.interp)) + "</span></b></div><div class=\"hr-text\"><hr/><span data-i18n=\"common.continue\"></span></div><button class=\"login-link btn btn-lg btn-navy\"><span data-i18n=\"login.log_in\"></span></button>");
}
buf.push("</div><div class=\"history-nav-buttons just-one\"><button type=\"button\" class=\"back-button btn btn-lg btn-navy-alt\"><span data-i18n=\"common.back\"></span></button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/single-sign-on-already-exists-view.js.map
require.register("templates/core/auth-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),showRequiredError = locals_.showRequiredError,view = locals_.view,translate = locals_.translate;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/modal/auth/login-background.png\" draggable=\"false\" class=\"auth-modal-background\"/><h1 data-i18n=\"login.log_in\"></h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div></div><div class=\"auth-form-content\">");
if ( showRequiredError)
{
buf.push("<div class=\"alert alert-success\"><span data-i18n=\"signup.required\"></span></div>");
}
buf.push("<div id=\"unknown-error-alert\" data-i18n=\"loading_error.unknown\" class=\"alert alert-danger hide\"></div><form class=\"form\"><div class=\"form-group\"><label for=\"username-or-email-input\" class=\"control-label\"><span data-i18n=\"login.email_or_username\"></span>:</label><div class=\"input-border\"><input" + (jade.attrs({ 'id':('username-or-email-input'), 'name':("emailOrUsername"), 'value':(view.previousFormInputs.email), "class": [('input-large'),('form-control')] }, {"name":true,"value":true})) + "/></div></div><div class=\"form-group\"><div id=\"recover-account-wrapper\"><a id=\"link-to-recover\" data-toggle=\"coco-modal\" data-target=\"core/RecoverModal\" data-i18n=\"login.forgot_password\"></a></div><label for=\"password\" class=\"control-label\"><span data-i18n=\"general.password\"></span>:</label><div class=\"input-border\"><input" + (jade.attrs({ 'id':('password-input'), 'name':("password"), 'type':("password"), 'value':(view.previousFormInputs.password), "class": [('input-large'),('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div></div><input" + (jade.attrs({ 'id':('login-btn'), 'value':(translate("login.log_in")), 'type':("submit"), "class": [('btn'),('btn-lg'),('btn-illustrated'),('btn-block'),('btn-success')] }, {"value":true,"type":true})) + "/></form><div class=\"wait secret\"><h3 data-i18n=\"login.logging_in\"></h3></div></div><div class=\"auth-network-logins\"><!-- GitHub login complete, but the button does not fit in with the design yet. Hidden for now--><!--div.network-login--><!--  btn.btn.btn-sm.github-login-button#github-login-button--><!--    img(src=\"/images/pages/modal/auth/github_icon.png\")--><!--    | GitHub--><button id=\"facebook-login-btn\" disabled=\"disabled\" class=\"btn btn-primary btn-lg btn-illustrated network-login\"><img src=\"/images/pages/community/logo_facebook.png\" draggable=\"false\" class=\"network-logo\"/><span data-i18n=\"login.sign_in_with_facebook\" class=\"sign-in-blurb\"></span></button><button id=\"gplus-login-btn\" disabled=\"disabled\" class=\"btn btn-danger btn-lg btn-illustrated network-login\"><img src=\"/images/pages/community/logo_g+.png\" draggable=\"false\" class=\"network-logo\"/><span data-i18n=\"login.sign_in_with_gplus\" class=\"sign-in-blurb\"></span><div class=\"gplus-login-wrapper\"><div class=\"gplus-login-button\"></div></div></button></div><div class=\"extra-pane\"><div data-i18n=\"login.signup_switch\" class=\"switch-explanation\"></div><div id=\"switch-to-signup-btn\" data-i18n=\"login.sign_up\" class=\"btn btn-lg btn-illustrated btn-warning\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/auth-modal.js.map
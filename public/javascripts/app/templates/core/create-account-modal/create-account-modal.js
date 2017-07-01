require.register("templates/core/create-account-modal/create-account-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;var modal_footer_content_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( view.signupState.get('screen') !== 'confirmation')
{
buf.push("<div class=\"modal-footer-content\"><div class=\"small-details\"><span data-i18n=\"signup.login_switch\" class=\"spr\"></span><a class=\"login-link\"><span data-i18n=\"signup.sign_in\"></span></a></div></div>");
}
};
var modal_header_content_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<h3>");
switch (view.signupState.get('path')){
case 'student':
buf.push("<span data-i18n=\"signup.create_student_header\"></span>");
  break;
case 'teacher':
buf.push("<span data-i18n=\"signup.create_teacher_header\"></span>");
  break;
case 'individual':
buf.push("<span data-i18n=\"signup.create_individual_header\"></span>");
  break;
default:
buf.push("<span data-i18n=\"login.sign_up\"></span>");
  break;
}
buf.push("</h3>");
};
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div" + (jade.attrs({ "class": [('modal-header'),(view.signupState.get('path'))] }, {"class":true})) + "><span data-dismiss=\"modal\" aria-hidden=\"true\" class=\"glyphicon glyphicon-remove button close\"></span>");
modal_header_content_mixin();
buf.push("</div>");
switch (view.signupState.get('screen')){
case 'choose-account-type':
buf.push("<div id=\"choose-account-type-view\"></div>");
  break;
case 'segment-check':
buf.push("<div id=\"segment-check-view\"></div>");
  break;
case 'basic-info':
buf.push("<div id=\"basic-info-view\"></div>");
  break;
case 'coppa-deny':
buf.push("<div id=\"coppa-deny-view\"></div>");
  break;
case 'sso-already-exists':
buf.push("<div id=\"single-sign-on-already-exists-view\"></div>");
  break;
case 'sso-confirm':
buf.push("<div id=\"single-sign-on-confirm-view\"></div>");
  break;
case 'extras':
buf.push("<div id=\"extras-view\"></div>");
  break;
case 'confirmation':
buf.push("<div id=\"confirmation-view\"></div>");
  break;
}
buf.push("<div" + (jade.attrs({ "class": [('modal-footer'),(view.signupState.get('path'))] }, {"class":true})) + ">");
modal_footer_content_mixin();
buf.push("</div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/create-account-modal.js.map
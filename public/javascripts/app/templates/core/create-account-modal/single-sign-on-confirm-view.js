require.register("templates/core/create-account-modal/single-sign-on-confirm-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<form id=\"basic-info-form\" class=\"modal-body\"><div class=\"modal-body-content\"><h4><span data-i18n=\"signup.sso_connected\"></span></h4><div class=\"small m-y-1\">");
var ssoUsed = view.signupState.get('ssoUsed');
if ( ssoUsed === 'facebook')
{
buf.push("<img src=\"/images/pages/modal/auth/facebook_small.png\"/>");
}
if ( ssoUsed === 'gplus')
{
buf.push("<img src=\"/images/pages/modal/auth/gplus_small.png\"/>");
}
buf.push("<b class=\"m-x-1\"><span>" + (jade.escape(null == (jade.interp = view.signupState.get('email')) ? "" : jade.interp)) + "</span></b><span class=\"glyphicon glyphicon-ok-circle class-code-valid-icon\"></span></div><div class=\"hr-text m-y-3\"><hr/><span data-i18n=\"common.continue\"></span></div><div class=\"form-container\"><input" + (jade.attrs({ 'name':("email"), 'value':(view.signupState.get('email')), "class": [('hidden')] }, {"name":true,"value":true})) + "/><div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-7 col-xs-offset-3\"><label for=\"username-input\" class=\"control-label\"><span data-i18n=\"general.username\"></span></label></div><div class=\"col-xs-5 col-xs-offset-3\"><input id=\"username-input\" name=\"name\" class=\"form-control input-lg\"/></div><div class=\"col-xs-4 name-check\">");
var checkNameState = view.state.get('checkNameState');
if ( checkNameState === 'checking')
{
buf.push("<span data-i18n=\"signup.checking\" class=\"small\"></span>");
}
if ( checkNameState === 'exists')
{
buf.push("<span class=\"small\"><span class=\"text-burgandy glyphicon glyphicon-remove-circle\"></span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span>" + (jade.escape(null == (jade.interp = view.state.get('suggestedNameText')) ? "" : jade.interp)) + "</span></span>");
}
if ( checkNameState === 'available')
{
buf.push("<span class=\"small\"><span class=\"text-forest glyphicon glyphicon-ok-circle\"></span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span data-i18n=\"signup.name_available\"></span></span>");
}
buf.push("</div></div></div><div class=\"form-group subscribe\"><div class=\"row\"><div class=\"col-xs-7 col-xs-offset-3\"><div class=\"checkbox\"><label><input id=\"subscribe-input\" type=\"checkbox\" checked=\"checked\" name=\"subscribe\"/><span data-i18n=\"signup.email_announcements\"></span></label></div></div></div></div></div></div><!-- In reverse order for tabbing purposes--><div class=\"history-nav-buttons\"><button type=\"submit\" class=\"next-button btn btn-lg btn-navy\"><span data-i18n=\"login.sign_up\"></span></button><button type=\"button\" class=\"back-button btn btn-lg btn-navy-alt\"><span data-i18n=\"common.back\"></span></button></div></form>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/single-sign-on-confirm-view.js.map
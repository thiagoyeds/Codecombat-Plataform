require.register("templates/core/create-account-modal/basic-info-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<form id=\"basic-info-form\" class=\"modal-body basic-info\"><div class=\"modal-body-content\"><div class=\"form-container\">");
if ( ['student', 'teacher'].indexOf(view.signupState.get('path')) !== -1)
{
buf.push("<div class=\"row full-name\"><div class=\"col-xs-offset-3 col-xs-5\"><div class=\"form-group\"><label for=\"first-name-input\" class=\"control-label\"><span data-i18n=\"general.first_name\"></span></label><input id=\"first-name-input\" name=\"firstName\" class=\"form-control input-lg\"/></div></div><div class=\"col-xs-4\"><div class=\"last-initial form-group\"><label for=\"last-name-input\" class=\"control-label\"><span data-i18n=\"general.last_initial\"></span></label><input id=\"last-name-input\" name=\"lastName\" maxlength=\"1\" class=\"form-control input-lg\"/></div></div></div>");
}
buf.push("<div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-5 col-xs-offset-3\"><label for=\"email-input\" class=\"control-label\"><span data-i18n=\"share_progress_modal.form_label\"></span></label>");
if ( view.signupState.get('path') === 'student')
{
buf.push("<div class=\"help-block optional-help-block pull-right\"><span data-i18n=\"signup.optional\"></span></div>");
}
buf.push("<input id=\"email-input\" name=\"email\" type=\"email\" class=\"form-control input-lg\"/></div><div class=\"col-xs-4 email-check fancy-error\">");
var checkEmailState = view.state.get('checkEmailState');
if ( checkEmailState === 'checking')
{
buf.push("<span data-i18n=\"signup.checking\" class=\"small\"></span>");
}
if ( checkEmailState === 'exists')
{
buf.push("<span class=\"small\"><span class=\"text-burgandy glyphicon glyphicon-remove-circle\"></span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span data-i18n=\"signup.account_exists\"></span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<a data-i18n=\"signup.sign_in\" class=\"login-link\"></a></span>");
}
if ( checkEmailState === 'available')
{
buf.push("<span class=\"small\"><span class=\"text-forest glyphicon glyphicon-ok-circle\"></span>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<span data-i18n=\"signup.email_good\"></span></span>");
}
buf.push("</div></div></div><div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-5 col-xs-offset-3\"><label for=\"username-input\" class=\"control-label\"><span data-i18n=\"general.username\"></span></label><input id=\"username-input\" name=\"name\" class=\"form-control input-lg\"/></div><div class=\"col-xs-4 name-check fancy-error\">");
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
buf.push("</div></div></div><div class=\"form-group\"><div class=\"row\"><div class=\"col-xs-5 col-xs-offset-3\"><label for=\"password-input\" class=\"control-label\"><span data-i18n=\"general.password\"></span></label><input id=\"password-input\" name=\"password\" type=\"password\" class=\"form-control input-lg\"/></div></div></div><div class=\"form-group checkbox subscribe\"><div class=\"row\"><div class=\"col-xs-7 col-xs-offset-3\"><div class=\"checkbox\"><label><input id=\"subscribe-input\" type=\"checkbox\" checked=\"checked\" name=\"subscribe\"/><span data-i18n=\"signup.email_announcements\"></span></label></div></div></div></div><div class=\"error-area\">");
var error = view.state.get('error');
if ( error)
{
buf.push("<div class=\"row\"><div class=\"col-xs-7 col-xs-offset-3\"></div></div><div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = error) ? "" : jade.interp)) + "</div>");
}
buf.push("</div></div></div><!-- In reverse order for tabbing purposes--><div class=\"history-nav-buttons\"><button id=\"create-account-btn\" type=\"submit\" class=\"next-button btn btn-lg btn-navy\"><span data-i18n=\"login.sign_up\"></span></button><button type=\"button\" class=\"back-button btn btn-lg btn-navy-alt\"><span data-i18n=\"common.back\"></span></button></div></form>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/basic-info-view.js.map
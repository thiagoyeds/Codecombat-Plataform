require.register("templates/core/create-account-modal/confirmation-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-body\"><div class=\"modal-body-content\"><h4 data-i18n=\"signup.account_created\" class=\"m-y-1\"></h4><div class=\"confirm_container text-center m-y-1\">");
if ( view.signupState.get('path') === 'student')
{
buf.push("<p data-i18n=\"signup.confirm_student_blurb\"></p>");
}
else
{
buf.push("<p data-i18n=\"signup.confirm_individual_blurb\"></p>");
}
buf.push("</div><div class=\"signup-info-box-wrapper\"><div data-i18n=\"signup.write_this_down\" class=\"text-burgandy\"></div><div class=\"signup-info-box text-center\">");
if ( me.get('name'))
{
buf.push("<h4><b><span data-i18n=\"general.username\"></span>: " + (jade.escape((jade.interp = me.get('name')) == null ? '' : jade.interp)) + "</b></h4>");
}
if ( me.get('email'))
{
buf.push("<h5><b>");
var ssoUsed = view.signupState.get('ssoUsed');
if ( ssoUsed === 'facebook')
{
buf.push("<img src=\"/images/pages/modal/auth/facebook_small.png\" class=\"m-r-1\"/>" + (jade.escape(null == (jade.interp = me.get('email')) ? "" : jade.interp)));
}
else if ( ssoUsed === 'gplus')
{
buf.push("<img src=\"/images/pages/modal/auth/gplus_small.png\" class=\"m-r-1\"/>" + (jade.escape(null == (jade.interp = me.get('email')) ? "" : jade.interp)));
}
else
{
buf.push("<span data-i18n=\"general.email\"></span>: " + (jade.escape((jade.interp = me.get('email')) == null ? '' : jade.interp)) + "");
}
buf.push("</b></h5>");
}
buf.push("</div></div><button id=\"start-btn\" data-i18n=\"signup.start_playing\" class=\"btn btn-navy btn-lg m-t-3\"></button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/confirmation-view.js.map
require.register("templates/contribute/contributor_signup_anonymous", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me;if ( me.attributes.anonymous)
{
buf.push("<div id=\"sign-up\" class=\"alert alert-info\"><strong data-i18n=\"contribute.alert_account_message_intro\">Hey there!</strong><span> </span><span data-i18n=\"contribute.alert_account_message\"> \nTo subscribe for class emails, you'll need to be logged in first.</span><strong class=\"spl\"><a class=\"signup-button\"><span data-i18n=\"login.log_in\">Log In</span><span class=\"spr spl\">/</span><span data-i18n=\"login.sign_up\">Create Account</span></a></strong></div>");
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/contribute/contributor_signup_anonymous.js.map
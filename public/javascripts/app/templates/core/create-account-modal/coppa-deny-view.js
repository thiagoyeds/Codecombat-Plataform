require.register("templates/core/create-account-modal/coppa-deny-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state,translate = locals_.translate;buf.push("<form class=\"modal-body coppa-deny\"><div class=\"modal-body-content\"><div class=\"parent-email-input-group form-group\">");
if ( !view.state.get('parentEmailSent'))
{
buf.push("<label for=\"parent-email-input\" class=\"control-label text-h4\"><span data-i18n=\"signup.enter_parent_email\"></span></label><input" + (jade.attrs({ 'id':('parent-email-input'), 'type':("email"), 'name':("parentEmail"), 'value':(state.get('parentEmail')) }, {"type":true,"name":true,"value":true})) + "/>");
if ( state.get('error'))
{
buf.push("<p class=\"small error\"><span data-i18n=\"signup.parent_email_error\"></span></p>");
}
buf.push("<p class=\"small parent-email-blurb render\"><span>" + (null == (jade.interp = translate('signup.parent_email_blurb').replace('{{email_link}}', '<a href="mailto:team@codecombat.com">team@codecombat.com</a>')) ? "" : jade.interp) + "</span></p>");
}
if ( view.state.get('parentEmailSent'))
{
buf.push("<p class=\"small parent-email-blurb\"><span data-i18n=\"signup.parent_email_sent\"></span></p><a href=\"/play\" data-dismiss=\"modal\" class=\"btn btn-navy btn-lg\">Play without saving</a>");
}
buf.push("</div></div><!-- In reverse order for tabbing purposes--><div class=\"history-nav-buttons\"><button" + (jade.attrs({ 'type':('submit'), 'disabled':(state.get('parentEmailSent') || state.get('parentEmailSending')), "class": [('send-parent-email-button'),('btn'),('btn-lg'),('btn-navy')] }, {"type":true,"disabled":true})) + ">");
if ( state.get('parentEmailSent'))
{
buf.push("<span data-i18n=\"common.sent\"></span>");
}
else
{
buf.push("<span data-i18n=\"common.send\"></span>");
}
buf.push("</button><button type=\"button\" class=\"back-btn btn btn-lg btn-navy-alt\"><span data-i18n=\"common.back\"></span></button></div></form>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/coppa-deny-view.js.map
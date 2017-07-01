require.register("templates/courses/courses-not-assigned-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h2 data-i18n=\"teacher.not_assigned_modal_title\"></h2></div><div class=\"modal-body\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
else
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("[html]teacher.not_assigned_modal_full_body_3"), 'data-i18n-options':(JSON.stringify({ supportEmail: "<a href='mailto:support@codecombat.com'>support@codecombat.com</a>" })), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<div class=\"text-center\"><a data-i18n=\"about.learn_more\" href=\"/teachers/starter-licenses\" class=\"btn btn-navy btn-lg\"></a></div>");
}
else
{
buf.push("<button class=\"btn btn-forest btn-lg pull-left\"><span data-i18n=\"general.contact_us\"></span></button><button data-dismiss=\"modal\" class=\"btn btn-navy btn-lg pull-right\"><span data-i18n=\"general.close_window\"></span></button>");
}
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
//# sourceMappingURL=/javascripts/app/templates/courses/courses-not-assigned-modal.js.map
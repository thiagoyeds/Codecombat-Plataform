require.register("templates/core/loading-error", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),jqxhr = locals_.jqxhr,me = locals_.me,view = locals_.view;buf.push("<div id=\"loading-error\" class=\"text-center\">");
if ( !jqxhr)
{
buf.push("<h1 data-i18n=\"loading_error.unknown\"></h1>");
}
else if ( jqxhr.status === 401)
{
buf.push("<h1><span class=\"spr\">401:</span><span data-i18n=\"loading_error.login_required\"></span></h1><p data-i18n=\"loading_error.login_required_desc\"></p><button data-i18n=\"login.log_in\" class=\"login-btn btn btn-primary\"></button><button id=\"create-account-btn\" data-i18n=\"login.sign_up\" class=\"btn btn-primary\"></button><!-- 402 currently not in use. TODO: Set it up-->");
}
else if ( jqxhr.status === 402)
{
buf.push("<h2>402: Payment Required</h2>");
}
else if ( jqxhr.status === 403)
{
buf.push("<h1><span class=\"spr\">403:</span><span data-i18n=\"loading_error.forbidden\">Forbidden</span></h1><p data-i18n=\"loading_error.forbidden_desc\"></p><!-- this should make no diff... but sometimes the server returns 403 when it should return 401-->");
if ( !me.isAnonymous())
{
buf.push("<button id=\"logout-btn\" data-i18n=\"login.log_out\" class=\"btn btn-primary\"></button>");
}
}
else if ( jqxhr.status === 404)
{
buf.push("<h1><span class=\"spr\">404:</span><span data-i18n=\"loading_error.not_found\"></span></h1>");
var num = Math.floor(Math.random() * 3) + 1;
buf.push("<img" + (jade.attrs({ 'id':('not-found-img'), 'src':("/images/pages/not_found/404_" + (num) + ".png") }, {"src":true})) + "/><p data-i18n=\"loading_error.not_found_desc\"></p>");
}
else if ( !jqxhr.status)
{
buf.push("<h1 data-i18n=\"loading_error.connection_failure\"></h1><p data-i18n=\"loading_error.connection_failure_desc\"></p>");
}
else
{
if ( jqxhr.status === 408)
{
buf.push("<h1><span class=\"spr\">408:</span><span data-i18n=\"loading_error.timeout\"></span></h1>");
}
else if ( jqxhr.status >= 500 && jqxhr.status <= 599)
{
buf.push("<h1><span class=\"spr\">" + (jade.escape((jade.interp = jqxhr.status) == null ? '' : jade.interp)) + ":</span><span data-i18n=\"loading_error.server_error\"></span></h1>");
}
else
{
buf.push("<h1 data-i18n=\"loading_error.unknown\"></h1>");
}
buf.push("<p data-i18n=\"loading_error.general_desc\"></p>");
}
buf.push("<div id=\"links-row\" class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"common.help\"></strong></li><li><a href=\"/\" data-i18n=\"nav.home\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"/community\" data-i18n=\"nav.community\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"courses.students\"></strong></li><li><a href=\"/students\" data-i18n=\"nav.learn_to_code\"></a></li>");
if ( me.isAnonymous())
{
buf.push("<li><a data-i18n=\"login.log_in\" class=\"login-btn\"></a></li>");
}
buf.push("<li><a href=\"/students\" data-i18n=\"courses.join_class\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\">");
if ( me.isAnonymous())
{
buf.push("<li><a data-i18n=\"login.log_in\" class=\"login-btn\"></a></li>");
}
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.create_a_class\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.other\"></strong></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/loading-error.js.map
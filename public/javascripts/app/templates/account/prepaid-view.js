require.register("templates/account/prepaid-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
if ( me.get('anonymous'))
{
buf.push("<p data-i18n=\"account_settings.not_logged_in\">Log in or create an account to change your settings.</p>");
}
else
{
buf.push("<ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"account.prepaid_codes\" class=\"active\"></li></ol><div class=\"row\"><div class=\"col-md-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#purchasepanel\"><span data-i18n=\"account_prepaid.purchase_code\"></span></a></div></div><div" + (jade.attrs({ 'id':('purchasepanel'), "class": [('panel-collapse'),('collapse'),(view.ppcQuery ? "": "in")] }, {"class":true})) + "><div class=\"panel-body\"><p data-i18n=\"account_prepaid.purchase_code1\"></p><p data-i18n=\"account_prepaid.purchase_code2\"></p><p data-i18n=\"account_prepaid.purchase_code3\"></p><strong><p data-i18n=\"account_prepaid.purchase_code4\"></p><p><span data-i18n=\"account_prepaid.purchase_code5\" class=\"spl\"></span><span>: </span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></p></strong><div class=\"form-horizontal\"><div class=\"form-group\"><label for=\"users\" data-i18n=\"account_prepaid.users\" class=\"control-label col-md-2\"></label><div class=\"col-md-2\"><input" + (jade.attrs({ 'id':('users-input'), 'name':("users"), 'type':("number"), 'value':("" + (view.purchase.users) + ""), 'min':(1), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"min":true})) + "/></div></div><div class=\"form-group\"><label for=\"months\" data-i18n=\"account_prepaid.months\" class=\"control-label col-md-2\"></label><div class=\"col-md-2\"><input" + (jade.attrs({ 'id':('months-input'), 'name':("months"), 'type':("number"), 'value':("" + (view.purchase.months) + ""), 'min':(1), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"min":true})) + "/></div></div><div class=\"form-group\"><label data-i18n=\"account_prepaid.purchase_total\" class=\"control-label col-md-2\"></label><div class=\"col-md-10\"><p class=\"form-control-static\">$<span id=\"total\">" + (jade.escape((jade.interp = (view.purchase.total/100).toFixed(2)) == null ? '' : jade.interp)) + "</span></p></div></div><button id=\"purchase-btn\" data-i18n=\"account_prepaid.purchase_button\" class=\"btn btn-success pull-right\"></button></div></div></div></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#redeempanel\"><span data-i18n=\"account_prepaid.redeem_codes\"></span></a></div></div><div id=\"redeempanel\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><p><span data-i18n=\"account_prepaid.prepaid_code\"></span><span class=\"spr\">:</span><input" + (jade.attrs({ 'name':("ppc"), 'type':("text"), 'value':("" + (view.ppc) + ""), 'required':(true), "class": [('input-ppc')] }, {"name":true,"type":true,"value":true,"required":false})) + "/></p>");
if ( view.ppcInfo && view.ppcInfo.length > 0)
{
buf.push("<p>");
// iterate view.ppcInfo
;(function(){
  var $$obj = view.ppcInfo;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var info = $$obj[$index];

buf.push("<div>" + (null == (jade.interp = info) ? "" : jade.interp) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var info = $$obj[$index];

buf.push("<div>" + (null == (jade.interp = info) ? "" : jade.interp) + "</div>");
    }

  }
}).call(this);

buf.push("</p>");
}
buf.push("<p><span class=\"spr\"><button id=\"lookup-code-btn\" data-i18n=\"account_prepaid.lookup_code\" class=\"btn btn-info\"></button></span><span><button id=\"redeem-code-btn\" data-i18n=\"account_prepaid.apply_account\" class=\"btn btn-success\"></button></span></p></div></div></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div id=\"codes-panel\" class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#codeslist\"><span data-i18n=\"account_prepaid.your_codes\"></span></a></div></div><div id=\"codeslist\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">");
if ( view.codes && view.codes.length)
{
buf.push("<table class=\"table table-striped\"><tr><th> <span data-i18n=\"[title]account_prepaid.copy_link;general.code\" title=\"You can copy the code's link and send it to someone.\" class=\"spr\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-question-sign\"></span></span></th><th data-i18n=\"account_prepaid.months\"></th><th>Remaining Users</th><th>Total Users</th><th data-i18n=\"user.status\"></th></tr>");
// iterate view.codes.models
;(function(){
  var $$obj = view.codes.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var code = $$obj[$index];

if ( code.get('type') === 'terminal_subscription')
{
var owner = (code.get('creator') == me.id ? true : false)
var properties = code.get('properties')
var redeemers = code.get('redeemers')
var redeemed = redeemers ? redeemers.length : 0
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/account/prepaid?_ppc=" + (code.get('code')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = code.get('code')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = properties.months || '-') ? "" : jade.interp)) + "</td>");
if ( owner)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers') - redeemed) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers')) ? "" : jade.interp)) + "</td><td data-i18n=\"account.purchased\"></td>");
}
else
{
buf.push("<td>-</td><td>-</td><td data-i18n=\"account_prepaid.redeemed\"></td>");
}
buf.push("</tr>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var code = $$obj[$index];

if ( code.get('type') === 'terminal_subscription')
{
var owner = (code.get('creator') == me.id ? true : false)
var properties = code.get('properties')
var redeemers = code.get('redeemers')
var redeemed = redeemers ? redeemers.length : 0
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/account/prepaid?_ppc=" + (code.get('code')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = code.get('code')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = properties.months || '-') ? "" : jade.interp)) + "</td>");
if ( owner)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers') - redeemed) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers')) ? "" : jade.interp)) + "</td><td data-i18n=\"account.purchased\"></td>");
}
else
{
buf.push("<td>-</td><td>-</td><td data-i18n=\"account_prepaid.redeemed\"></td>");
}
buf.push("</tr>");
}
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<p data-i18n=\"account_prepaid.no_codes\"></p>");
}
buf.push("</div></div></div></div></div>");
}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/account/prepaid-view.js.map
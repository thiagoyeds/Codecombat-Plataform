require.register("templates/account/subscription-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,moment = locals_.moment,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"account.subscription\" class=\"active\"></li></ol>");
if ( me.get('anonymous'))
{
buf.push("<p data-i18n=\"subscribe.must_be_logged\" class=\"logged-out-blurb\"></p>");
}
else
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"subscribe.personal_sub\"></h3>");
if ( view.personalSub.prepaidCode && !view.personalSub.usingPrepaidCode)
{
buf.push("<div><span data-i18n=\"subscribe.subscribe_prepaid\"></span><span class=\"spl spr\">" + (jade.escape(null == (jade.interp = view.personalSub.prepaidCode) ? "" : jade.interp)) + "</span></div>");
}
buf.push("</div><div class=\"panel-body\">");
if ( view.personalSub.state === 'loading')
{
buf.push("<div data-i18n=\"subscribe.loading_info\" class=\"alert alert-info\"></div>");
}
else if ( view.personalSub.state === 'subscribing')
{
buf.push("<div data-i18n=\"subscribe.subscribing\" class=\"alert alert-info\"></div>");
}
else if ( view.personalSub.sponsor)
{
buf.push("<div><span data-i18n=\"subscribe.managed_by\" class=\"spr\"></span><span>" + (jade.escape((jade.interp = view.personalSub.sponsorName) == null ? '' : jade.interp)) + " (" + (jade.escape((jade.interp = view.personalSub.sponsorEmail) == null ? '' : jade.interp)) + ")</span></div>");
if ( view.personalSub.endDate)
{
buf.push("<div><span data-i18n=\"subscribe.will_be_cancelled\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = moment(view.personalSub.endDate).format('l')) ? "" : jade.interp)) + "</span></div>");
}
}
else if ( view.personalSub.usingPrepaidCode)
{
buf.push("<div data-i18n=\"subscribe.using_prepaid\"></div>");
}
else if ( view.personalSub.self)
{
if ( view.personalSub.state === 'declined')
{
buf.push("<div class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div><br/>");
}
else if ( view.personalSub.state === 'unknown_error')
{
buf.push("<div class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.personalSub.stateMessage) ? "" : jade.interp)) + "</p></div><br/>");
}
if ( !view.personalSub.subscribed || view.personalSub.prepaidCode)
{
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\"></button>");
}
else
{
buf.push("<button data-i18n=\"subscribe.unsubscribe\" class=\"end-subscription-button btn btn-lg btn-warning\"></button>");
}
buf.push("<div class=\"unsubscribe-feedback row secret\"><div class=\"col-lg-7\"><h3>");
if ( view.personalSub.monthsSubscribed > 1)
{
buf.push("<span data-i18n=\"subscribe.thank_you_months_prefix\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.personalSub.monthsSubscribed) ? "" : jade.interp)) + "</span><span data-i18n=\"subscribe.thank_you_months_suffix\" class=\"spl\"></span>");
}
else
{
buf.push("<span data-i18n=\"subscribe.thank_you\"></span>");
}
buf.push("</h3><div data-i18n=\"subscribe.sorry_to_see_you_go\"></div><textarea rows=\"3\" data-i18n=\"[placeholder]subscribe.unsubscribe_feedback_placeholder\"></textarea></div><div class=\"col-lg-5\"><button data-i18n=\"subscribe.never_mind\" class=\"cancel-end-subscription-button btn btn-lg btn-default\"></button><button data-i18n=\"subscribe.confirm_unsubscribe\" class=\"confirm-end-subscription-button btn btn-lg btn-warning\"></button></div></div><table class=\"table table-striped table-condensed\"><tr><th data-i18n=\"user.status\"></th><td>");
if ( view.personalSub.subscribed)
{
buf.push("<strong data-i18n=\"account.subscribed\"></strong>");
}
else
{
if ( view.personalSub.active)
{
buf.push("<strong data-i18n=\"account.active\"></strong><div data-i18n=\"account.status_unsubscribed_active\" class=\"text-muted\"></div>");
}
else
{
buf.push("<strong data-i18n=\"account.unsubscribed\"></strong><div data-i18n=\"account.status_unsubscribed\" class=\"text-muted\"></div>");
}
}
buf.push("</td></tr>");
if ( view.personalSub.activeUntil)
{
buf.push("<tr><th data-i18n=\"account.active_until\"></th><td>" + (jade.escape(null == (jade.interp = moment(view.personalSub.activeUntil).format('l')) ? "" : jade.interp)) + "</td></tr>");
}
if ( view.personalSub.nextPaymentDate)
{
buf.push("<tr><th data-i18n=\"account.next_payment\"></th><td>" + (jade.escape(null == (jade.interp = moment(view.personalSub.nextPaymentDate).format('l')) ? "" : jade.interp)) + "</td></tr>");
}
if ( view.personalSub.cost)
{
buf.push("<tr><th data-i18n=\"account.cost\"></th><td>" + (jade.escape(null == (jade.interp = view.personalSub.cost) ? "" : jade.interp)) + "</td></tr>");
if ( view.personalSub.card)
{
buf.push("<tr><th data-i18n=\"account.card\"></th><td>" + (jade.escape(null == (jade.interp = view.personalSub.card) ? "" : jade.interp)) + "</td></tr>");
}
}
buf.push("</table>");
}
else
{
if ( view.personalSub.free === true)
{
buf.push("<div data-i18n=\"subscribe.currently_free\"></div>");
}
else if ( typeof view.personalSub.free === 'string')
{
if ( new Date() < new Date(view.personalSub.free))
{
buf.push("<div><span data-i18n=\"subscribe.currently_free_until\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = moment(new Date(view.personalSub.free)).format('l')) ? "" : jade.interp)) + "</span></div>");
}
else
{
buf.push("<span data-i18n=\"subscribe.was_free_until\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = moment(new Date(view.personalSub.free)).format('l')) ? "" : jade.interp)) + "</span>");
}
}
else
{
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\"></button>");
}
}
buf.push("</div></div><!-- - Prepaid Codes--><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"account.prepaid_codes\"></h3></div><div class=\"panel-body\"><p><span data-i18n=\"account_prepaid.you_can1\" class=\"spr\"></span><a href=\"/account/prepaid\" data-i18n=\"account_prepaid.you_can2\"></a><span data-i18n=\"account_prepaid.you_can3\" class=\"spl\"></span></p></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"subscribe.managed_subs\"></h3><p><span class=\"spr\">Managed subscriptions are discontinued. Please contact</span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a><span class=\"spl\">for more information.</span></p></div><div class=\"panel-body\">");
if ( view.recipientSubs.nextPaymentAmount > 0 && view.recipientSubs.sponsorSub)
{
buf.push("<h4 data-i18n=\"account.next_payment\"></h4><p>" + (jade.escape(null == (jade.interp = moment(new Date(view.recipientSubs.sponsorSub.current_period_end * 1000)).format('l')) ? "" : jade.interp)) + "</p><p>$" + (jade.escape((jade.interp = view.recipientSubs.nextPaymentAmount / 100) == null ? '' : jade.interp)) + "</p><p>" + (jade.escape(null == (jade.interp = view.recipientSubs.card) ? "" : jade.interp)) + "</p>");
}
buf.push("<h4 data-i18n=\"subscribe.current_recipients\"></h4>");
if ( view.recipientSubs.unsubscribingRecipients && view.recipientSubs.unsubscribingRecipients.length > 0)
{
buf.push("<div class=\"alert alert-info\"><span data-i18n=\"subscribe.unsubscribing\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.recipientSubs.unsubscribingRecipients[0]) ? "" : jade.interp)) + "</span></div>");
}
else
{
buf.push("<table class=\"table table-striped table-condensed recipients-table\"><tr><th data-i18n=\"general.email\"></th><th data-i18n=\"general.name\"></th><th></th></tr>");
// iterate view.recipientSubs.recipients
;(function(){
  var $$obj = view.recipientSubs.recipients;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var recipient = $$obj[$index];

buf.push("<tr><td class=\"recipient-email\">" + (jade.escape(null == (jade.interp = recipient.emailLower) ? "" : jade.interp)) + "</td><td class=\"recipient-name\">" + (jade.escape(null == (jade.interp = recipient.name) ? "" : jade.interp)) + "</td><td class=\"recipient-unsubscribe\">");
if ( recipient.cancel_at_period_end)
{
buf.push("<div>Ends " + (jade.escape((jade.interp = moment(recipient.cancel_at_period_end).format('l')) == null ? '' : jade.interp)) + "</div>");
}
else
{
buf.push("<button data-i18n=\"subscribe.unsubscribe\" class=\"recipient-unsubscribe-button btn btn-sm btn-warning\"></button><button data-i18n=\"play.confirm\" class=\"confirm-recipient-unsubscribe-button btn btn-sm btn-primary hide\"></button>");
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var recipient = $$obj[$index];

buf.push("<tr><td class=\"recipient-email\">" + (jade.escape(null == (jade.interp = recipient.emailLower) ? "" : jade.interp)) + "</td><td class=\"recipient-name\">" + (jade.escape(null == (jade.interp = recipient.name) ? "" : jade.interp)) + "</td><td class=\"recipient-unsubscribe\">");
if ( recipient.cancel_at_period_end)
{
buf.push("<div>Ends " + (jade.escape((jade.interp = moment(recipient.cancel_at_period_end).format('l')) == null ? '' : jade.interp)) + "</div>");
}
else
{
buf.push("<button data-i18n=\"subscribe.unsubscribe\" class=\"recipient-unsubscribe-button btn btn-sm btn-warning\"></button><button data-i18n=\"play.confirm\" class=\"confirm-recipient-unsubscribe-button btn btn-sm btn-primary hide\"></button>");
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
buf.push("</div></div>");
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
//# sourceMappingURL=/javascripts/app/templates/account/subscription-view.js.map
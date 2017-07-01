require.register("templates/core/subscribe-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\">");
if ( view.state === 'purchasing')
{
buf.push("<div data-i18n=\"buy_gems.purchasing\" class=\"alert alert-info\"></div>");
}
else if ( view.state === 'retrying')
{
buf.push("<div id=\"retrying-alert\" data-i18n=\"buy_gems.retrying\" class=\"alert alert-danger\"></div>");
}
else
{
buf.push("<img id=\"subscribe-background\" src=\"/images/pages/play/modal/subscribe-background-blank.png\"/><h1 data-i18n=\"subscribe.subscribe_modal_title\"></h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><div data-i18n=\"[html]subscribe.comparison_blurb\" class=\"comparison-blurb\"></div><table class=\"table table-condensed table-bordered comparison-table\"><thead><tr>");
if ( me.isOnPremiumServer())
{
buf.push("<th></th>");
}
else
{
buf.push("<th data-i18n=\"subscribe.free\" colspan=\"2\" class=\"free-cell\"></th>");
}
buf.push("<th data-i18n=\"subscribe.premium\"></th></tr></thead><tbody><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature1"), 'data-i18n-options':('{"levelsCount": ' + view.i18nData.levelsCount + ', "worldsCount": ' + view.i18nData.worldsCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + "></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"center-ok free-cell\"><span class=\"glyphicon glyphicon-ok\"></span></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature3"), 'data-i18n-options':('{"bonusLevelsCount": ' + view.i18nData.bonusLevelsCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + ">)</span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><!-- Could try testing out things like features 6-8 in a new design with more space--><!--tr--><!--  td.feature-description--><!--    span(data-i18n=\"[html]subscribe.feature7\")--><!--  if !me.isOnPremiumServer()--><!--    td.free-cell--><!--  td.center-ok--><!--    span.glyphicon.glyphicon-ok--><!--tr--><!--  td.feature-description--><!--    span(data-i18n=\"subscribe.feature6\")--><!--  if !me.isOnPremiumServer()--><!--    td.free-cell--><!--  td.center-ok--><!--    span.glyphicon.glyphicon-ok--><!--if me.getCampaignAdsGroup() === 'leaderboard-ads'--><!--  tr--><!--    td.feature-description--><!--      span(data-i18n=\"[html]subscribe.feature8\")--><!--    if !me.isOnPremiumServer()--><!--      td.free-cell--><!--    td.center-ok--><!--      span.glyphicon.glyphicon-ok--><tr><td class=\"feature-description\"><span data-i18n=\"[html]subscribe.feature_game_dev\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span data-i18n=\"[html]subscribe.feature_web_dev\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature2"), 'data-i18n-options':('{"heroesCount": ' + view.i18nData.heroesCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + "></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description gem-amount\"><span data-i18n=\"[html]subscribe.feature4\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr></tbody></table>");
if ( view.basicProduct)
{
buf.push("<div class=\"premium-pricing\"><span data-i18n=\"subscribe.premium_pricing_prefix\"></span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span>$" + (jade.escape((jade.interp = (view.basicProduct.get('amount') / 100)) == null ? '' : jade.interp)) + "/</span><span data-i18n=\"subscribe.month\"></span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span data-i18n=\"subscribe.premium_pricing_suffix\"></span></div><div id=\"parents-info\" data-i18n=\"subscribe.parents\"></div><div id=\"payment-methods-info\" data-i18n=\"subscribe.payment_methods\"></div>");
}
buf.push("<div class=\"subscribe-actions\">");
if ( !me.isOnPremiumServer())
{
buf.push("<button data-i18n=\"subscribe.parent_button\" class=\"btn btn-lg btn-illustrated parent-button\"></button>");
}
if ( view.yearProduct)
{
buf.push("<button data-i18n=\"subscribe.sale_button\" class=\"btn btn-lg btn-illustrated sale-button\"></button>");
}
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"btn btn-lg btn-illustrated purchase-button\"></button></div>");
if ( view.state === 'declined')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div id=\"error-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
}
buf.push("<div class=\"parent-button-popover-content hidden\"><div class=\"email-parent-form\"><p data-i18n=\"subscribe.parent_email_description\"></p><form><div class=\"form-group\"><label data-i18n=\"subscribe.parent_email_input_label\"></label><input type=\"email\" data-i18n=\"[placeholder]subscribe.parent_email_input_placeholder\" class=\"parent-input form-control\"/><div data-i18n=\"subscribe.parent_email_input_invalid\" class=\"parent-email-validator email_invalid\"></div></div><button type=\"submit\" data-i18n=\"subscribe.parent_email_send\" class=\"parent-send btn btn-default\"></button></form></div><div class=\"email-parent-complete\"><p data-i18n=\"subscribe.parent_email_sent\"></p><button type=\"button\" onclick=\"$('.parent-button').popover('hide');\" data-i18n=\"modal.close\" class=\"btn\"></button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/subscribe-modal.js.map
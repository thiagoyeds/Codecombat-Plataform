require.register("templates/play/modal/buy-gems-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"> ");
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
if ( (me.get('preferredLanguage',true) || 'en-US').split('-')[0] == 'nl')
{
buf.push("<img src=\"/images/pages/play/modal/lang-nl/buy-gems-background-NL.png\" id=\"buy-gems-background\"/>");
}
else
{
buf.push("<img src=\"/images/pages/play/modal/buy-gems-background.png\" id=\"buy-gems-background\"/>");
}
buf.push("<h1 data-i18n=\"play.buy_gems\"> </h1><div id=\"products\">");
if ( view.supermodel.finished())
{
// iterate view.products.models
;(function(){
  var $$obj = view.products.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var product = $$obj[$index];

buf.push("<div class=\"product\"><h4>x" + (jade.escape((jade.interp = product.get('gems')) == null ? '' : jade.interp)) + "</h4><h3" + (jade.attrs({ 'data-i18n':(product.get('i18n')) }, {"data-i18n":true})) + "></h3><button" + (jade.attrs({ 'value':(product.get('name')), "class": [('btn'),('btn-illustrated'),('btn-lg')] }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = product.get('priceString')) ? "" : jade.interp)) + "</span></button></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var product = $$obj[$index];

buf.push("<div class=\"product\"><h4>x" + (jade.escape((jade.interp = product.get('gems')) == null ? '' : jade.interp)) + "</h4><h3" + (jade.attrs({ 'data-i18n':(product.get('i18n')) }, {"data-i18n":true})) + "></h3><button" + (jade.attrs({ 'value':(product.get('name')), "class": [('btn'),('btn-illustrated'),('btn-lg')] }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = product.get('priceString')) ? "" : jade.interp)) + "</span></button></div>");
    }

  }
}).call(this);

if ( (me.get('preferredLanguage',true) || 'en-US').split('-')[0] == 'nl')
{
buf.push("<div class=\"product\"><h4 class=\"subscription-gem-amount\">x{{gems}} / mo</h4><h3> \n1, 3, 6 OF 12 <br/>MAANDEN</h3><a href=\"http://www.codecombat.nl/kopen\" target=\"_blank\"><button class=\"btn btn-ideal btn-illustrated btn-lg btn-succes\">PREPAID CODES</button></a></div>");
}
buf.push("<div class=\"product\"><h4 class=\"subscription-gem-amount\">x{{gems}} / mo</h4><h3 data-i18n=\"account.subscription\"></h3>");
if ( me.hasSubscription())
{
buf.push("<button class=\"disabled start-subscription-button btn btn-lg btn-illustrated btn-success\">✓ <span data-i18n=\"account.subscribed\"></span></button>");
}
else
{
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-illustrated btn-success\">Subscribe</button>");
}
buf.push("</div>");
}
buf.push("</div>");
if ( view.state === 'declined')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;      </span></button></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div id=\"error-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
if ( view.state === 'recovered_charge')
{
buf.push("<div id=\"recovered-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.recovered\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");
}
buf.push("<div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div>");
}
buf.push("</div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/buy-gems-modal.js.map
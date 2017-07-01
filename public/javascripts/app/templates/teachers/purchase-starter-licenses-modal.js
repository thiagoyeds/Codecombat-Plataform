require.register("templates/teachers/purchase-starter-licenses-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3 data-i18n=\"special_offer.purchase_starter_licenses\"></h3></div></div><div class=\"modal-body\"><p data-i18n=\"special_offer.starter_licenses_can_be_used\"></p><div class=\"text-center input-row m-t-3 m-b-3\"><input" + (jade.attrs({ 'name':("quantity"), 'type':("number"), 'min':(0), 'max':(state.get('quantityAllowedToPurchase')), 'value':(state.get('quantityToBuy')) }, {"name":true,"type":true,"min":true,"max":true,"value":true})) + "/><span>x</span><span class=\"dollar-value render\">" + (jade.escape(null == (jade.interp = view.getDollarsPerStudentString()) ? "" : jade.interp)) + "</span><span>=</span><span class=\"dollar-value render\">" + (jade.escape(null == (jade.interp = view.getTotalPriceString()) ? "" : jade.interp)) + "</span></div><div class=\"text-center render\">");
var quantityIsValid = (state.get('quantityToBuy') > 0)
buf.push("<button" + (jade.attrs({ 'disabled':(!quantityIsValid), 'className':((quantityIsValid ? 'disabled' : '')), "class": [('pay-now-btn'),('btn-lg'),('btn-navy')] }, {"disabled":true,"className":true})) + "><span data-i18n=\"special_offer.pay_now\"></span></button></div><p data-i18n=\"special_offer.we_accept_all_major_credit_cards\" class=\"text-center m-t-1\"></p><p class=\"text-center purchase-progress-message render\">" + (jade.escape(null == (jade.interp = state.get('purchaseProgressMessage')) ? "" : jade.interp)) + "</p><p class=\"small m-t-5\"><span" + (jade.attrs({ 'data-i18n':("[html]special_offer.license_limit_description"), 'data-i18n-options':(JSON.stringify(view.i18nData())) }, {"data-i18n":true,"data-i18n-options":true})) + "></span></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/purchase-starter-licenses-modal.js.map
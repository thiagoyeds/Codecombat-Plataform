require.register("models/AnalyticsStripeInvoice", function(exports, require, module) {
var AnalyticsStripeInvoice, CocoModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = AnalyticsStripeInvoice = (function(superClass) {
  extend(AnalyticsStripeInvoice, superClass);

  function AnalyticsStripeInvoice() {
    return AnalyticsStripeInvoice.__super__.constructor.apply(this, arguments);
  }

  AnalyticsStripeInvoice.className = 'AnalyticsStripeInvoice';

  AnalyticsStripeInvoice.schema = require('schemas/models/analytics_stripe_invoice');

  AnalyticsStripeInvoice.prototype.urlRoot = '/db/analytics.stripe.invoice';

  return AnalyticsStripeInvoice;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/AnalyticsStripeInvoice.js.map
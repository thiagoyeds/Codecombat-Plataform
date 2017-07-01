require.register("collections/Payments", function(exports, require, module) {
var CocoCollection, Payment, Payments,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Payment = require('models/Payment');

CocoCollection = require('collections/CocoCollection');

module.exports = Payments = (function(superClass) {
  extend(Payments, superClass);

  function Payments() {
    return Payments.__super__.constructor.apply(this, arguments);
  }

  Payments.prototype.model = Payment;

  Payments.prototype.url = '/db/payment';

  return Payments;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Payments.js.map
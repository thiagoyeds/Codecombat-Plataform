require.register("models/Payment", function(exports, require, module) {
var CocoModel, Payment,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = Payment = (function(superClass) {
  extend(Payment, superClass);

  function Payment() {
    return Payment.__super__.constructor.apply(this, arguments);
  }

  Payment.className = "Payment";

  Payment.prototype.urlRoot = "/db/payment";

  return Payment;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Payment.js.map
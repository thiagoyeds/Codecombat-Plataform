require.register("models/Purchase", function(exports, require, module) {
var CocoModel, Purchase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = Purchase = (function(superClass) {
  extend(Purchase, superClass);

  function Purchase() {
    return Purchase.__super__.constructor.apply(this, arguments);
  }

  Purchase.className = "Purchase";

  Purchase.prototype.urlRoot = "/db/purchase";

  Purchase.schema = require('schemas/models/purchase.schema');

  Purchase.makeFor = function(toPurchase) {
    var purchase;
    return purchase = new Purchase({
      recipient: me.id,
      purchaser: me.id,
      purchased: {
        original: toPurchase.get('original'),
        collection: _.string.underscored(toPurchase.constructor.className)
      }
    });
  };

  return Purchase;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Purchase.js.map
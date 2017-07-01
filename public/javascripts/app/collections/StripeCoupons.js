require.register("collections/StripeCoupons", function(exports, require, module) {
var CocoCollection, StripeCoupon, StripeCoupons,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StripeCoupon = require('models/StripeCoupon');

CocoCollection = require('collections/CocoCollection');

module.exports = StripeCoupons = (function(superClass) {
  extend(StripeCoupons, superClass);

  function StripeCoupons() {
    return StripeCoupons.__super__.constructor.apply(this, arguments);
  }

  StripeCoupons.prototype.model = StripeCoupon;

  StripeCoupons.prototype.url = '/stripe/coupons';

  return StripeCoupons;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/StripeCoupons.js.map
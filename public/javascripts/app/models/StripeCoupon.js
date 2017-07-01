require.register("models/StripeCoupon", function(exports, require, module) {
var CocoModel, StripeCoupon,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = StripeCoupon = (function(superClass) {
  extend(StripeCoupon, superClass);

  function StripeCoupon() {
    return StripeCoupon.__super__.constructor.apply(this, arguments);
  }

  StripeCoupon.className = 'StripeCoupon';

  StripeCoupon.schema = {};

  StripeCoupon.prototype.urlRoot = '/stripe/coupons';

  StripeCoupon.prototype.idAttribute = 'id';

  StripeCoupon.prototype.formatString = function() {
    var bits;
    bits = [this.id];
    if (this.get('percent_off')) {
      bits.push("(" + (this.get('percent_off')) + "% off)");
    } else if (this.get('amount_off')) {
      bits.push("($" + (this.get('amount_off')) + " off)");
    }
    if (this.get('duration')) {
      bits.push("(duration: " + (this.get('duration')) + ")");
    }
    if (this.redeem_by) {
      bits.push("(redeem by: " + (moment(this.get('redeem_by')).format('lll')));
    }
    return bits.join(' ');
  };

  return StripeCoupon;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/StripeCoupon.js.map
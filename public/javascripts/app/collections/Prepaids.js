require.register("collections/Prepaids", function(exports, require, module) {
var CocoCollection, Prepaid, Prepaids, sum,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Prepaid = require('models/Prepaid');

sum = function(numbers) {
  return _.reduce(numbers, function(a, b) {
    return a + b;
  });
};

module.exports = Prepaids = (function(superClass) {
  extend(Prepaids, superClass);

  function Prepaids() {
    return Prepaids.__super__.constructor.apply(this, arguments);
  }

  Prepaids.prototype.model = Prepaid;

  Prepaids.prototype.url = "/db/prepaid";

  Prepaids.prototype.initialize = function() {
    return Prepaids.__super__.initialize.apply(this, arguments);
  };

  Prepaids.prototype.comparator = function(prepaid) {
    return [prepaid.get('type') === 'course' ? 'C' : 'S', prepaid.get('endDate')].toString();
  };

  Prepaids.prototype.totalMaxRedeemers = function() {
    var prepaid;
    return sum((function() {
      var i, len, ref, results;
      ref = this.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        prepaid = ref[i];
        results.push(prepaid.get('maxRedeemers'));
      }
      return results;
    }).call(this)) || 0;
  };

  Prepaids.prototype.totalRedeemers = function() {
    var prepaid;
    return sum((function() {
      var i, len, ref, results;
      ref = this.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        prepaid = ref[i];
        results.push(_.size(prepaid.get('redeemers')));
      }
      return results;
    }).call(this)) || 0;
  };

  Prepaids.prototype.totalAvailable = function() {
    return Math.max(this.totalMaxRedeemers() - this.totalRedeemers(), 0);
  };

  Prepaids.prototype.fetchByCreator = function(creatorID, opts) {
    if (opts == null) {
      opts = {};
    }
    if (opts.data == null) {
      opts.data = {};
    }
    opts.data.creator = creatorID;
    return this.fetch(opts);
  };

  return Prepaids;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Prepaids.js.map
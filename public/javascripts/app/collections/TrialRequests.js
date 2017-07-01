require.register("collections/TrialRequests", function(exports, require, module) {
var CocoCollection, TrialRequest, TrialRequestCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

TrialRequest = require('models/TrialRequest');

module.exports = TrialRequestCollection = (function(superClass) {
  extend(TrialRequestCollection, superClass);

  function TrialRequestCollection() {
    return TrialRequestCollection.__super__.constructor.apply(this, arguments);
  }

  TrialRequestCollection.prototype.url = '/db/trial.request';

  TrialRequestCollection.prototype.model = TrialRequest;

  TrialRequestCollection.prototype.fetchOwn = function(options) {
    options = _.extend({
      data: {}
    }, options);
    options.data.applicant = me.id;
    return this.fetch(options);
  };

  return TrialRequestCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/TrialRequests.js.map
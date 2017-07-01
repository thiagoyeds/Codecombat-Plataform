require.register("models/TrialRequest", function(exports, require, module) {
var CocoModel, TrialRequest, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/trial_request.schema');

module.exports = TrialRequest = (function(superClass) {
  extend(TrialRequest, superClass);

  function TrialRequest() {
    return TrialRequest.__super__.constructor.apply(this, arguments);
  }

  TrialRequest.className = 'TrialRequest';

  TrialRequest.schema = schema;

  TrialRequest.prototype.urlRoot = '/db/trial.request';

  TrialRequest.prototype.nameString = function() {
    var props, values;
    props = this.get('properties');
    values = _.filter(_.at(props, 'name', 'email'));
    return values.join(' / ');
  };

  TrialRequest.prototype.locationString = function() {
    var props, values;
    props = this.get('properties');
    values = _.filter(_.at(props, 'city', 'state', 'country'));
    return values.join(' ');
  };

  TrialRequest.prototype.educationLevelString = function() {
    var levels;
    levels = this.get('properties').educationLevel || [];
    return levels.join(', ');
  };

  return TrialRequest;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/TrialRequest.js.map
require.register("models/AnalyticsLogEvent", function(exports, require, module) {
var AnalyticsLogEvent, CocoModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = AnalyticsLogEvent = (function(superClass) {
  extend(AnalyticsLogEvent, superClass);

  function AnalyticsLogEvent() {
    return AnalyticsLogEvent.__super__.constructor.apply(this, arguments);
  }

  AnalyticsLogEvent.className = 'AnalyticsLogEvent';

  AnalyticsLogEvent.schema = require('schemas/models/analytics_log_event');

  AnalyticsLogEvent.prototype.urlRoot = '/db/analytics.log.event';

  return AnalyticsLogEvent;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/AnalyticsLogEvent.js.map
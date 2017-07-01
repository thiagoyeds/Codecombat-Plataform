require.register("schemas/models/analytics_log_event", function(exports, require, module) {
var AnalyticsLogEventSchema, c;

c = require('./../schemas');

AnalyticsLogEventSchema = c.object({
  title: 'Analytics Log Event',
  description: 'Analytics event logs.'
});

_.extend(AnalyticsLogEventSchema.properties, {
  u: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  e: {
    type: 'integer'
  },
  p: {
    type: 'object'
  },
  user: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  event: {
    type: 'string'
  },
  properties: {
    type: 'object'
  }
});

c.extendBasicProperties(AnalyticsLogEventSchema, 'analytics.log.event');

module.exports = AnalyticsLogEventSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/analytics_log_event.js.map
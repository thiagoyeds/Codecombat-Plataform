require.register("schemas/models/analytics_perday", function(exports, require, module) {
var AnalyticsPerDaySchema, c;

c = require('./../schemas');

AnalyticsPerDaySchema = c.object({
  title: 'Analytics per-day data',
  description: 'Analytics data aggregated into per-day chunks.'
});

_.extend(AnalyticsPerDaySchema.properties, {
  d: {
    type: 'string'
  },
  e: {
    type: 'integer'
  },
  l: {
    type: 'integer'
  },
  f: {
    type: 'integer'
  },
  fv: {
    type: 'integer'
  },
  c: {
    type: 'integer'
  }
});

c.extendBasicProperties(AnalyticsPerDaySchema, 'analytics.perday');

module.exports = AnalyticsPerDaySchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/analytics_perday.js.map
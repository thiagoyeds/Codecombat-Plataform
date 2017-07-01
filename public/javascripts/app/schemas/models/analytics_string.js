require.register("schemas/models/analytics_string", function(exports, require, module) {
var AnalyticsStringSchema, c;

c = require('./../schemas');

AnalyticsStringSchema = c.object({
  title: 'Analytics String',
  description: 'Maps strings to number IDs for improved performance.'
});

_.extend(AnalyticsStringSchema.properties, {
  v: {
    type: 'string'
  }
});

c.extendBasicProperties(AnalyticsStringSchema, 'analytics.string');

module.exports = AnalyticsStringSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/analytics_string.js.map
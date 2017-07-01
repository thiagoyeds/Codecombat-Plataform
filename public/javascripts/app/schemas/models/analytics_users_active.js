require.register("schemas/models/analytics_users_active", function(exports, require, module) {
var AnalyticsUsersActiveSchema, c;

c = require('./../schemas');

AnalyticsUsersActiveSchema = c.object({
  title: 'Analytics Users Active',
  description: 'Active users data.'
});

_.extend(AnalyticsUsersActiveSchema.properties, {
  creator: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  created: c.date({
    title: 'Created',
    readOnly: true
  }),
  event: {
    type: 'string'
  }
});

c.extendBasicProperties(AnalyticsUsersActiveSchema, 'analytics.users.active');

module.exports = AnalyticsUsersActiveSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/analytics_users_active.js.map
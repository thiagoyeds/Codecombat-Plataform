require.register("schemas/models/clan.schema", function(exports, require, module) {
var ClanSchema, c;

c = require('./../schemas');

ClanSchema = c.object({
  title: 'Clan',
  required: ['name', 'type']
});

c.extendNamedProperties(ClanSchema);

_.extend(ClanSchema.properties, {
  description: {
    type: 'string'
  },
  members: c.array({
    title: 'Members'
  }, c.objectId()),
  ownerID: c.objectId(),
  type: {
    type: 'string',
    'enum': ['public', 'private'],
    description: 'Controls clan general visibility.'
  },
  dashboardType: {
    type: 'string',
    'enum': ['basic', 'premium']
  }
});

c.extendBasicProperties(ClanSchema, 'Clan');

module.exports = ClanSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/clan.schema.js.map
require.register("schemas/models/user-polls-record.schema", function(exports, require, module) {
var UserPollsRecordSchema, c;

c = require('./../schemas');

UserPollsRecordSchema = c.object({
  title: 'UserPollsRecord'
});

_.extend(UserPollsRecordSchema.properties, {
  user: c.stringID({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  polls: {
    type: 'object',
    additionalProperties: c.shortString({
      pattern: '^[a-z0-9-]+$'
    })
  },
  rewards: {
    type: 'object',
    additionalProperties: c.object({}, {
      random: {
        type: 'number',
        minimum: 0,
        maximum: 1
      },
      level: {
        type: 'integer',
        minimum: 1
      }
    })
  },
  level: {
    type: 'integer',
    minimum: 1,
    description: 'The player level when last saved.'
  },
  changed: c.date({
    title: 'Changed',
    readOnly: true
  })
});

c.extendBasicProperties(UserPollsRecordSchema, 'user-polls-record');

module.exports = UserPollsRecordSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/user-polls-record.schema.js.map
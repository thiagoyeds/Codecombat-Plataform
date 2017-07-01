require.register("schemas/models/patch", function(exports, require, module) {
var PatchSchema, c, patchables;

c = require('./../schemas');

patchables = ['achievement', 'article', 'campaign', 'course', 'level', 'level_component', 'level_system', 'poll', 'thang_type'];

PatchSchema = c.object({
  title: 'Patch',
  required: ['target', 'delta', 'commitMessage']
}, {
  delta: {
    title: 'Delta',
    type: ['array', 'object']
  },
  commitMessage: c.shortString({
    maxLength: 500,
    minLength: 1
  }),
  creator: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  acceptor: c.objectId({
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
  status: {
    "enum": ['pending', 'accepted', 'rejected', 'withdrawn']
  },
  target: c.object({
    title: 'Target',
    required: ['collection', 'id']
  }, {
    collection: {
      "enum": patchables
    },
    id: c.objectId({
      title: 'Target ID'
    }),
    original: c.objectId({
      title: 'Target Original'
    }),
    version: {
      properties: {
        major: {
          type: 'number',
          minimum: 0
        },
        minor: {
          type: 'number',
          minimum: 0
        }
      }
    }
  }),
  wasPending: {
    type: 'boolean'
  },
  newlyAccepted: {
    type: 'boolean'
  },
  reasonNotAutoAccepted: {
    type: 'string'
  }
});

c.extendBasicProperties(PatchSchema, 'patch');

module.exports = PatchSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/patch.js.map
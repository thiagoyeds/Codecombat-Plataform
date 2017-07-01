require.register("schemas/models/branch.schema", function(exports, require, module) {
var BranchSchema, c;

c = require('./../schemas');

BranchSchema = {
  type: 'object',
  properties: {
    patches: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    updated: c.stringDate(),
    updatedBy: c.objectId(),
    updatedByName: {
      type: 'string'
    }
  }
};

c.extendBasicProperties(BranchSchema, 'branches');

c.extendNamedProperties(BranchSchema);

module.exports = BranchSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/branch.schema.js.map
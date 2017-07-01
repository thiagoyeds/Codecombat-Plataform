require.register("schemas/models/skipped_contact.schema", function(exports, require, module) {
var SkippedContactSchema, c;

c = require('./../schemas');

SkippedContactSchema = c.object({
  title: 'Skipped Contact'
});

_.extend(SkippedContactSchema, {
  additionalProperties: true
});

c.extendBasicProperties(SkippedContactSchema, 'skipped.contacts');

module.exports = SkippedContactSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/skipped_contact.schema.js.map
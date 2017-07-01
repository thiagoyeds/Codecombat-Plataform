require.register("schemas/definitions/misc", function(exports, require, module) {
module.exports = {
  jQueryEvent: {
    title: 'jQuery Event',
    id: 'jQueryEvent',
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'A standard jQuery Event',
    type: 'object',
    properties: {
      altKey: {
        type: 'boolean'
      }
    },
    required: [],
    additionalProperties: true
  }
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/definitions/misc.js.map
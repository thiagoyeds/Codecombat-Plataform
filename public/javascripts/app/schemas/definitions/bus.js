require.register("schemas/definitions/bus", function(exports, require, module) {
module.exports = {
  bus: {
    title: 'Bus',
    id: 'bus',
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'Bus',
    type: 'object',
    properties: {
      joined: {
        type: ['boolean', 'null']
      },
      players: {
        type: 'object'
      }
    },
    required: ['joined', 'players'],
    additionalProperties: true
  }
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/definitions/bus.js.map
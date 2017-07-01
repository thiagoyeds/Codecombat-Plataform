require.register("schemas/subscriptions/errors", function(exports, require, module) {
var c;

c = require('schemas/schemas');

module.exports = {
  'errors:server-error': c.object({
    required: ['response']
  }, {
    response: {
      type: 'object'
    }
  })
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/subscriptions/errors.js.map
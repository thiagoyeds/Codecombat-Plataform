require.register("schemas/subscriptions/ipad", function(exports, require, module) {
var c;

c = require('schemas/schemas');

module.exports = {
  'ipad:products': c.object({
    required: ['products']
  }, {
    products: c.array({}, c.object({}, {
      price: {
        type: 'string'
      },
      id: {
        type: 'string'
      }
    }))
  }),
  'ipad:language-chosen': c.object({}, {
    language: {
      type: 'string'
    }
  }),
  'ipad:iap-complete': c.object({}, {
    productID: {
      type: 'string'
    }
  }),
  'ipad:memory-warning': c.object({})
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/subscriptions/ipad.js.map
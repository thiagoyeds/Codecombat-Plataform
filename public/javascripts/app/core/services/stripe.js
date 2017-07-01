require.register("core/services/stripe", function(exports, require, module) {
var handler, publishableKey;

publishableKey = application.isProduction() ? 'pk_live_27jQZozjDGN1HSUTnSuM578g' : 'pk_test_zG5UwVu6Ww8YhtE9ZYh0JO6a';

if (me.isAnonymous()) {
  module.exports = {};
} else if (typeof StripeCheckout === "undefined" || StripeCheckout === null) {
  module.exports = {};
  console.error("Failure loading StripeCheckout API, returning empty object.");
} else {
  module.exports = handler = StripeCheckout.configure({
    key: publishableKey,
    name: 'CodeCombat',
    email: me.get('email'),
    image: "https://codecombat.com/images/pages/base/logo_square_250.png",
    token: function(token) {
      handler.trigger('received-token', {
        token: token
      });
      return Backbone.Mediator.publish('stripe:received-token', {
        token: token
      });
    },
    locale: 'auto'
  });
  _.extend(handler, Backbone.Events);
}
});

;
//# sourceMappingURL=/javascripts/app/core/services/stripe.js.map
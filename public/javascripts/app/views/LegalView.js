require.register("views/LegalView", function(exports, require, module) {
var LegalView, Products, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/legal');

Products = require('collections/Products');

module.exports = LegalView = (function(superClass) {
  extend(LegalView, superClass);

  function LegalView() {
    return LegalView.__super__.constructor.apply(this, arguments);
  }

  LegalView.prototype.id = 'legal-view';

  LegalView.prototype.template = template;

  LegalView.prototype.initialize = function() {
    this.products = new Products();
    return this.supermodel.loadCollection(this.products, 'products');
  };

  LegalView.prototype.afterRender = function() {
    var basicSub, text;
    LegalView.__super__.afterRender.call(this);
    basicSub = this.products.findWhere({
      name: 'basic_subscription'
    });
    if (!basicSub) {
      return;
    }
    text = $.i18n.t('legal.cost_description');
    text = text.replace('{{price}}', (basicSub.get('amount') / 100).toFixed(2));
    text = text.replace('{{gems}}', basicSub.get('gems'));
    return this.$('#cost-description').text(text);
  };

  return LegalView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/LegalView.js.map
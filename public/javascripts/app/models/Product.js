require.register("models/Product", function(exports, require, module) {
var CocoModel, ProductModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = ProductModel = (function(superClass) {
  extend(ProductModel, superClass);

  function ProductModel() {
    return ProductModel.__super__.constructor.apply(this, arguments);
  }

  ProductModel.className = 'Product';

  ProductModel.schema = require('schemas/models/product.schema');

  ProductModel.prototype.urlRoot = '/db/products';

  return ProductModel;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Product.js.map
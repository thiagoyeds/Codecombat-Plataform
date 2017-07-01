require.register("collections/Products", function(exports, require, module) {
var CocoCollection, Product, Products,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('./CocoCollection');

Product = require('models/Product');

module.exports = Products = (function(superClass) {
  extend(Products, superClass);

  function Products() {
    return Products.__super__.constructor.apply(this, arguments);
  }

  Products.prototype.model = Product;

  Products.prototype.url = '/db/products';

  Products.prototype.getByName = function(name) {
    return this.findWhere({
      name: name
    });
  };

  return Products;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Products.js.map
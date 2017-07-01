require.register("collections/ThangTypes", function(exports, require, module) {
var CocoCollection, ThangType, ThangTypeCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

ThangType = require('models/ThangType');

module.exports = ThangTypeCollection = (function(superClass) {
  extend(ThangTypeCollection, superClass);

  function ThangTypeCollection() {
    return ThangTypeCollection.__super__.constructor.apply(this, arguments);
  }

  ThangTypeCollection.prototype.url = '/db/thang.type';

  ThangTypeCollection.prototype.model = ThangType;

  ThangTypeCollection.prototype.fetchHeroes = function() {
    return this.fetch({
      url: '/db/thang.type?view=heroes'
    });
  };

  return ThangTypeCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/ThangTypes.js.map
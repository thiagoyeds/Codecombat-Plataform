require.register("collections/ThangNamesCollection", function(exports, require, module) {
var CocoCollection, ThangNamesCollection, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

module.exports = ThangNamesCollection = (function(superClass) {
  extend(ThangNamesCollection, superClass);

  ThangNamesCollection.prototype.url = '/db/thang.type/names';

  ThangNamesCollection.prototype.model = ThangType;

  ThangNamesCollection.prototype.isCachable = false;

  function ThangNamesCollection(ids) {
    this.ids = ids;
    ThangNamesCollection.__super__.constructor.call(this);
    this.ids.sort();
    if (this.ids.length > 55) {
      console.error('Too many ids, we\'ll likely go over the GET url kind-of-limit of 2000 characters.');
    }
  }

  ThangNamesCollection.prototype.fetch = function(options) {
    if (options == null) {
      options = {};
    }
    _.extend(options, {
      data: {
        ids: this.ids
      }
    });
    return ThangNamesCollection.__super__.fetch.call(this, options);
  };

  return ThangNamesCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/ThangNamesCollection.js.map
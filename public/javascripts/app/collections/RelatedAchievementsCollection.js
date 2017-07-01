require.register("collections/RelatedAchievementsCollection", function(exports, require, module) {
var Achievement, CocoCollection, RelatedAchievementCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Achievement = require('models/Achievement');

RelatedAchievementCollection = (function(superClass) {
  extend(RelatedAchievementCollection, superClass);

  function RelatedAchievementCollection() {
    return RelatedAchievementCollection.__super__.constructor.apply(this, arguments);
  }

  RelatedAchievementCollection.prototype.model = Achievement;

  RelatedAchievementCollection.prototype.initialize = function(relatedID) {
    return this.url = "/db/achievement?related=" + relatedID;
  };

  return RelatedAchievementCollection;

})(CocoCollection);

module.exports = RelatedAchievementCollection;
});

;
//# sourceMappingURL=/javascripts/app/collections/RelatedAchievementsCollection.js.map
require.register("collections/EarnedAchievementCollection", function(exports, require, module) {
var CocoCollection, EarnedAchievement, EarnedAchievementCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

EarnedAchievement = require('models/EarnedAchievement');

module.exports = EarnedAchievementCollection = (function(superClass) {
  extend(EarnedAchievementCollection, superClass);

  function EarnedAchievementCollection() {
    return EarnedAchievementCollection.__super__.constructor.apply(this, arguments);
  }

  EarnedAchievementCollection.prototype.model = EarnedAchievement;

  EarnedAchievementCollection.prototype.initialize = function(userID) {
    this.url = "/db/user/" + userID + "/achievements";
    return EarnedAchievementCollection.__super__.initialize.call(this);
  };

  return EarnedAchievementCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/EarnedAchievementCollection.js.map
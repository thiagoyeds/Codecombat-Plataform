require.register("collections/Achievements", function(exports, require, module) {
var Achievement, AchievementCollection, CocoCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Achievement = require('models/Achievement');

module.exports = AchievementCollection = (function(superClass) {
  extend(AchievementCollection, superClass);

  function AchievementCollection() {
    return AchievementCollection.__super__.constructor.apply(this, arguments);
  }

  AchievementCollection.prototype.url = '/db/achievement';

  AchievementCollection.prototype.model = Achievement;

  AchievementCollection.prototype.fetchRelatedToLevel = function(levelOriginal, options) {
    options = _.extend({
      data: {}
    }, options);
    options.data.related = levelOriginal;
    return this.fetch(options);
  };

  AchievementCollection.prototype.fetchForCampaign = function(campaignHandle, options) {
    options = _.extend({
      data: {}
    }, options);
    options.url = "/db/campaign/" + campaignHandle + "/achievements";
    return this.fetch(options);
  };

  return AchievementCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Achievements.js.map
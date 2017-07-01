require.register("collections/LeaderboardCollection", function(exports, require, module) {
var CocoCollection, LeaderboardCollection, LevelSession,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

LevelSession = require('models/LevelSession');

module.exports = LeaderboardCollection = (function(superClass) {
  extend(LeaderboardCollection, superClass);

  LeaderboardCollection.prototype.url = '';

  LeaderboardCollection.prototype.model = LevelSession;

  function LeaderboardCollection(level, options) {
    LeaderboardCollection.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.url = "/db/level/" + (level.get('original')) + "." + (level.get('version').major) + "/leaderboard?" + ($.param(options));
  }

  return LeaderboardCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/LeaderboardCollection.js.map
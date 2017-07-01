require.register("collections/SimulatorsLeaderboardCollection", function(exports, require, module) {
var CocoCollection, SimulatorsLeaderboardCollection, User,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

User = require('models/User');

module.exports = SimulatorsLeaderboardCollection = (function(superClass) {
  extend(SimulatorsLeaderboardCollection, superClass);

  SimulatorsLeaderboardCollection.prototype.url = '';

  SimulatorsLeaderboardCollection.prototype.model = User;

  function SimulatorsLeaderboardCollection(options) {
    SimulatorsLeaderboardCollection.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.url = "/db/user/me/simulatorLeaderboard?" + ($.param(options));
  }

  return SimulatorsLeaderboardCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/SimulatorsLeaderboardCollection.js.map
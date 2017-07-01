require.register("collections/RecentlyPlayedCollection", function(exports, require, module) {
var CocoCollection, LevelSession, RecentlyPlayedCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('./CocoCollection');

LevelSession = require('models/LevelSession');

module.exports = RecentlyPlayedCollection = (function(superClass) {
  extend(RecentlyPlayedCollection, superClass);

  RecentlyPlayedCollection.prototype.model = LevelSession;

  function RecentlyPlayedCollection(userID, options) {
    this.url = "/db/user/" + userID + "/recently_played";
    RecentlyPlayedCollection.__super__.constructor.call(this, options);
  }

  return RecentlyPlayedCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/RecentlyPlayedCollection.js.map
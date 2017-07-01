require.register("collections/Levels", function(exports, require, module) {
var CocoCollection, Level, LevelCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Level = require('models/Level');

module.exports = LevelCollection = (function(superClass) {
  extend(LevelCollection, superClass);

  function LevelCollection() {
    return LevelCollection.__super__.constructor.apply(this, arguments);
  }

  LevelCollection.prototype.url = '/db/level';

  LevelCollection.prototype.model = Level;

  LevelCollection.prototype.fetchForClassroom = function(classroomID, options) {
    if (options == null) {
      options = {};
    }
    options.url = "/db/classroom/" + classroomID + "/levels";
    return this.fetch(options);
  };

  LevelCollection.prototype.fetchForClassroomAndCourse = function(classroomID, courseID, options) {
    if (options == null) {
      options = {};
    }
    options.url = "/db/classroom/" + classroomID + "/courses/" + courseID + "/levels";
    return this.fetch(options);
  };

  LevelCollection.prototype.fetchForCampaign = function(campaignSlug, options) {
    if (options == null) {
      options = {};
    }
    options.url = "/db/campaign/" + campaignSlug + "/levels";
    return this.fetch(options);
  };

  return LevelCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Levels.js.map
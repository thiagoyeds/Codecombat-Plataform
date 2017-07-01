require.register("collections/LevelSessions", function(exports, require, module) {
var CocoCollection, LevelSession, LevelSessionCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

LevelSession = require('models/LevelSession');

module.exports = LevelSessionCollection = (function(superClass) {
  extend(LevelSessionCollection, superClass);

  function LevelSessionCollection() {
    return LevelSessionCollection.__super__.constructor.apply(this, arguments);
  }

  LevelSessionCollection.prototype.url = '/db/level.session';

  LevelSessionCollection.prototype.model = LevelSession;

  LevelSessionCollection.prototype.fetchForCourseInstance = function(courseInstanceID, options) {
    options = _.extend({
      url: "/db/course_instance/" + courseInstanceID + "/my-course-level-sessions"
    }, options);
    return this.fetch(options);
  };

  LevelSessionCollection.prototype.fetchForClassroomMembers = function(classroomID, options) {
    options = _.extend({
      url: "/db/classroom/" + classroomID + "/member-sessions"
    }, options);
    return this.fetch(options);
  };

  LevelSessionCollection.prototype.fetchForAllClassroomMembers = function(classroom, options) {
    var jqxhrs, limit, size, skip;
    if (options == null) {
      options = {};
    }
    limit = 10;
    skip = 0;
    size = _.size(classroom.get('members'));
    if (options.data == null) {
      options.data = {};
    }
    options.data.memberLimit = limit;
    options.remove = false;
    jqxhrs = [];
    while (skip < size) {
      options = _.cloneDeep(options);
      options.data.memberSkip = skip;
      jqxhrs.push(this.fetchForClassroomMembers(classroom.id, options));
      skip += limit;
    }
    return jqxhrs;
  };

  LevelSessionCollection.prototype.fetchRecentSessions = function(options) {
    if (options == null) {
      options = {};
    }
    options = _.extend({
      url: "/db/level.session/-/recent"
    }, options);
    return this.fetch(options);
  };

  return LevelSessionCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/LevelSessions.js.map
require.register("collections/CourseInstances", function(exports, require, module) {
var CocoCollection, CourseInstance, CourseInstances,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CourseInstance = require('models/CourseInstance');

CocoCollection = require('collections/CocoCollection');

module.exports = CourseInstances = (function(superClass) {
  extend(CourseInstances, superClass);

  function CourseInstances() {
    return CourseInstances.__super__.constructor.apply(this, arguments);
  }

  CourseInstances.prototype.model = CourseInstance;

  CourseInstances.prototype.url = '/db/course_instance';

  CourseInstances.prototype.fetchByOwner = function(ownerID, options) {
    if (options == null) {
      options = {};
    }
    ownerID = ownerID.id || ownerID;
    if (options.data == null) {
      options.data = {};
    }
    options.data.ownerID = ownerID;
    return this.fetch(options);
  };

  CourseInstances.prototype.fetchForClassroom = function(classroomID, options) {
    if (options == null) {
      options = {};
    }
    classroomID = classroomID.id || classroomID;
    if (options.data == null) {
      options.data = {};
    }
    options.data.classroomID = classroomID;
    return this.fetch(options);
  };

  return CourseInstances;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/CourseInstances.js.map
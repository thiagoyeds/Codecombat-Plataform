require.register("collections/Courses", function(exports, require, module) {
var CocoCollection, Course, Courses,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Course = require('models/Course');

CocoCollection = require('collections/CocoCollection');

module.exports = Courses = (function(superClass) {
  extend(Courses, superClass);

  function Courses() {
    return Courses.__super__.constructor.apply(this, arguments);
  }

  Courses.prototype.model = Course;

  Courses.prototype.url = '/db/course';

  Courses.prototype.fetchReleased = function(options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.releasePhase = 'released';
    return this.fetch(options);
  };

  return Courses;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Courses.js.map
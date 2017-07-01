require.register("models/Course", function(exports, require, module) {
var CocoModel, Course, schema, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/course.schema');

utils = require('core/utils');

module.exports = Course = (function(superClass) {
  extend(Course, superClass);

  function Course() {
    return Course.__super__.constructor.apply(this, arguments);
  }

  Course.className = 'Course';

  Course.schema = schema;

  Course.prototype.urlRoot = '/db/course';

  Course.prototype.fetchForCourseInstance = function(courseInstanceID, opts) {
    var options;
    options = {
      url: "/db/course_instance/" + courseInstanceID + "/course"
    };
    _.extend(options, opts);
    return this.fetch(options);
  };

  Course.prototype.getTranslatedName = function() {
    return utils.i18n(this.attributes, 'name');
  };

  return Course;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Course.js.map
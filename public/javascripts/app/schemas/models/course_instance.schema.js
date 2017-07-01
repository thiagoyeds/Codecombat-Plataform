require.register("schemas/models/course_instance.schema", function(exports, require, module) {
var CourseInstanceSchema, c;

c = require('./../schemas');

CourseInstanceSchema = c.object({
  title: 'Course Instance'
});

_.extend(CourseInstanceSchema.properties, {
  courseID: c.objectId(),
  classroomID: c.objectId(),
  description: {
    type: 'string'
  },
  members: c.array({
    title: 'Members'
  }, c.objectId()),
  name: {
    type: 'string'
  },
  ownerID: c.objectId(),
  prepaidID: c.objectId(),
  aceConfig: {
    language: {
      type: 'string',
      'enum': ['python', 'javascript']
    }
  },
  hourOfCode: {
    type: 'boolean',
    description: 'Deprecated, do not use.'
  }
});

c.extendBasicProperties(CourseInstanceSchema, 'CourseInstance');

module.exports = CourseInstanceSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/course_instance.schema.js.map
require.register("schemas/models/course.schema", function(exports, require, module) {
var CourseSchema, c;

c = require('./../schemas');

CourseSchema = c.object({
  title: 'Course',
  required: ['name']
});

c.extendNamedProperties(CourseSchema);

_.extend(CourseSchema.properties, {
  i18n: {
    type: 'object',
    title: 'i18n',
    format: 'i18n',
    props: ['name', 'description']
  },
  campaignID: c.objectId(),
  concepts: c.array({
    title: 'Programming Concepts',
    uniqueItems: true
  }, c.concept),
  description: {
    type: 'string'
  },
  duration: {
    type: 'number',
    description: 'Approximate hours of content'
  },
  pricePerSeat: {
    type: 'number',
    description: 'Price per seat in USD cents.'
  },
  free: {
    type: 'boolean'
  },
  screenshot: c.path({
    title: 'URL',
    description: 'Link to course screenshot.'
  }),
  adminOnly: {
    type: 'boolean',
    description: 'Deprecated in favor of releasePhase.'
  },
  releasePhase: {
    "enum": ['beta', 'released'],
    description: "How far along the course's development is, determining who sees it."
  }
});

c.extendBasicProperties(CourseSchema, 'Course');

c.extendTranslationCoverageProperties(CourseSchema);

c.extendPatchableProperties(CourseSchema);

module.exports = CourseSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/course.schema.js.map
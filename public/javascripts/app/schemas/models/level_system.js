require.register("schemas/models/level_system", function(exports, require, module) {
var DependencySchema, LevelSystemSchema, c, jitterSystemCode, metaschema;

c = require('./../schemas');

metaschema = require('./../metaschema');

jitterSystemCode = "class Jitter extends System\n  constructor: (world, config) ->\n    super world, config\n    @idlers = @addRegistry (thang) -> thang.exists and thang.acts and thang.moves and thang.action is 'idle'\n\n  update: ->\n    # We return a simple numeric hash that will combine to a frame hash\n    # help us determine whether this frame has changed in resimulations.\n    hash = 0\n    for thang in @idlers\n      hash += thang.pos.x += 0.5 - Math.random()\n      hash += thang.pos.y += 0.5 - Math.random()\n      thang.hasMoved = true\n    return hash";

DependencySchema = c.object({
  title: 'System Dependency',
  description: 'A System upon which this System depends.',
  required: ['original', 'majorVersion'],
  format: 'latest-version-reference',
  links: [
    {
      rel: 'db',
      href: '/db/level.system/{(original)}/version/{(majorVersion)}'
    }
  ]
}, {
  original: c.objectId({
    title: 'Original',
    description: 'A reference to another System upon which this System depends.'
  }),
  majorVersion: {
    title: 'Major Version',
    description: 'Which major version of the System this System needs.',
    type: 'integer',
    minimum: 0
  }
});

LevelSystemSchema = c.object({
  title: 'System',
  description: 'A System which can affect Level behavior.',
  required: ['name', 'code'],
  "default": {
    name: 'JitterSystem',
    description: 'This System makes all idle, movable Thangs jitter around.',
    code: jitterSystemCode,
    codeLanguage: 'coffeescript',
    dependencies: [],
    configSchema: {}
  }
});

c.extendNamedProperties(LevelSystemSchema);

LevelSystemSchema.properties.name.pattern = c.classNamePattern;

_.extend(LevelSystemSchema.properties, {
  description: {
    title: 'Description',
    description: 'A short explanation of what this System does.',
    type: 'string',
    maxLength: 2000
  },
  codeLanguage: {
    type: 'string',
    title: 'Language',
    description: 'Which programming language this System is written in.',
    'enum': ['coffeescript']
  },
  code: {
    title: 'Code',
    description: 'The code for this System, as a CoffeeScript class. TODO: add link to documentation for how to write these.',
    type: 'string',
    format: 'coffee'
  },
  js: {
    title: 'JavaScript',
    description: 'The transpiled JavaScript code for this System',
    type: 'string',
    format: 'hidden'
  },
  dependencies: c.array({
    title: 'Dependencies',
    description: 'An array of Systems upon which this System depends.',
    uniqueItems: true
  }, DependencySchema),
  configSchema: _.extend(metaschema, {
    title: 'Configuration Schema',
    description: 'A schema for validating the arguments that can be passed to this System as configuration.',
    "default": {
      type: 'object',
      additionalProperties: false
    }
  }),
  official: {
    type: 'boolean',
    title: 'Official',
    description: 'Whether this is an official CodeCombat System.'
  }
});

c.extendBasicProperties(LevelSystemSchema, 'level.system');

c.extendSearchableProperties(LevelSystemSchema);

c.extendVersionedProperties(LevelSystemSchema, 'level.system');

c.extendPermissionsProperties(LevelSystemSchema);

c.extendPatchableProperties(LevelSystemSchema);

module.exports = LevelSystemSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/level_system.js.map
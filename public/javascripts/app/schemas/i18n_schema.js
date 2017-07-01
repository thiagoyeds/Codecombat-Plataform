require.register("schemas/i18n_schema", function(exports, require, module) {
var ExampleSchema, c, languageCodeArrayRegex;

c = require('./schemas');

languageCodeArrayRegex = c.generateLanguageCodeArrayRegex();

ExampleSchema = {
  title: 'Example Schema',
  description: 'An example schema',
  type: 'object',
  properties: {
    text: {
      title: 'Text',
      description: 'A short message to display in the dialogue area. Markdown okay.',
      type: 'string',
      maxLength: 400
    },
    i18n: {
      '$ref': '#/definitions/i18n'
    }
  },
  definitions: {
    i18n: {
      title: 'i18n',
      description: 'The internationalization object',
      type: 'object',
      patternProperties: {
        languageCodeArrayRegex: {
          additionalProperties: false,
          properties: {
            properties: {
              '$ref': '#/properties'
            }
          },
          "default": {
            title: 'LanguageCode',
            description: 'LanguageDescription'
          }
        }
      }
    }
  }
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/i18n_schema.js.map
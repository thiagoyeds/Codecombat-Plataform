require.register("schemas/models/campaign.schema", function(exports, require, module) {
var CampaignSchema, LevelSchema, c, hiddenLevelProperties, hiddenProp, i, j, len, len1, prop, ref;

c = require('./../schemas');

LevelSchema = require('./level');

CampaignSchema = c.object({
  "default": {
    type: 'hero'
  }
});

c.extendNamedProperties(CampaignSchema);

_.extend(CampaignSchema.properties, {
  i18n: {
    type: 'object',
    title: 'i18n',
    format: 'i18n',
    props: ['name', 'fullName', 'description']
  },
  fullName: {
    type: 'string',
    title: 'Full Name',
    description: 'Ex.: "Kithgard Dungeon"'
  },
  description: {
    type: 'string',
    format: 'string',
    description: 'How long it takes and what players learn.'
  },
  type: c.shortString({
    title: 'Type',
    description: 'What kind of campaign this is.',
    'enum': ['hero', 'course', 'hidden']
  }),
  ambientSound: c.object({}, {
    mp3: {
      type: 'string',
      format: 'sound-file'
    },
    ogg: {
      type: 'string',
      format: 'sound-file'
    }
  }),
  backgroundImage: c.array({}, {
    type: 'object',
    additionalProperties: false,
    properties: {
      image: {
        type: 'string',
        format: 'image-file'
      },
      width: {
        type: 'number'
      }
    }
  }),
  backgroundColor: {
    type: 'string'
  },
  backgroundColorTransparent: {
    type: 'string'
  },
  adjacentCampaigns: {
    type: 'object',
    format: 'campaigns',
    additionalProperties: {
      title: 'Campaign',
      type: 'object',
      format: 'campaign',
      properties: {
        id: {
          type: 'string',
          format: 'hidden'
        },
        name: {
          type: 'string',
          format: 'hidden'
        },
        description: {
          type: 'string',
          format: 'hidden'
        },
        i18n: {
          type: 'object',
          format: 'hidden'
        },
        slug: {
          type: 'string',
          format: 'hidden'
        },
        position: c.point2d(),
        rotation: {
          type: 'number',
          format: 'degrees'
        },
        color: {
          type: 'string'
        },
        showIfUnlocked: {
          oneOf: [
            {
              type: 'string',
              links: [
                {
                  rel: 'db',
                  href: '/db/level/{($)}/version'
                }
              ],
              format: 'latest-version-original-reference'
            }, {
              type: 'array',
              items: {
                type: 'string',
                links: [
                  {
                    rel: 'db',
                    href: '/db/level/{($)}/version'
                  }
                ],
                format: 'latest-version-original-reference'
              }
            }
          ]
        }
      }
    }
  },
  levelsUpdated: c.date(),
  levels: {
    type: 'object',
    format: 'levels',
    additionalProperties: {
      title: 'Level',
      type: 'object',
      format: 'level',
      additionalProperties: false,
      properties: {
        rewards: {
          format: 'rewards',
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              achievement: {
                type: 'string',
                links: [
                  {
                    rel: 'db',
                    href: '/db/achievement/{{$}}'
                  }
                ],
                format: 'achievement'
              },
              item: {
                type: 'string',
                links: [
                  {
                    rel: 'db',
                    href: '/db/thang.type/{($)}/version'
                  }
                ],
                format: 'latest-version-original-reference'
              },
              hero: {
                type: 'string',
                links: [
                  {
                    rel: 'db',
                    href: '/db/thang.type/{($)}/version'
                  }
                ],
                format: 'latest-version-original-reference'
              },
              level: {
                type: 'string',
                links: [
                  {
                    rel: 'db',
                    href: '/db/level/{($)}/version'
                  }
                ],
                format: 'latest-version-original-reference'
              },
              type: {
                "enum": ['heroes', 'items', 'levels']
              }
            }
          }
        },
        position: c.point2d()
      }
    }
  }
});

CampaignSchema.denormalizedLevelProperties = ['name', 'description', 'i18n', 'requiresSubscription', 'replayable', 'type', 'kind', 'slug', 'original', 'adventurer', 'practice', 'practiceThresholdMinutes', 'primerLanguage', 'shareable', 'adminOnly', 'disableSpaces', 'hidesSubmitUntilRun', 'hidesPlayButton', 'hidesRunShortcut', 'hidesHUD', 'hidesSay', 'hidesCodeToolbar', 'hidesRealTimePlayback', 'backspaceThrottle', 'lockDefaultCode', 'moveRightLoopSnippet', 'realTimeSpeedFactor', 'autocompleteFontSizePx', 'requiredGear', 'restrictedGear', 'requiredProperties', 'restrictedProperties', 'recommendedHealth', 'concepts', 'primaryConcepts', 'picoCTFProblem', 'campaign', 'campaignIndex', 'scoreTypes'];

hiddenLevelProperties = ['name', 'description', 'i18n', 'replayable', 'slug', 'original', 'primerLanguage', 'shareable', 'concepts', 'scoreTypes'];

ref = CampaignSchema.denormalizedLevelProperties;
for (i = 0, len = ref.length; i < len; i++) {
  prop = ref[i];
  CampaignSchema.properties.levels.additionalProperties.properties[prop] = _.cloneDeep(LevelSchema.properties[prop]);
}

for (j = 0, len1 = hiddenLevelProperties.length; j < len1; j++) {
  hiddenProp = hiddenLevelProperties[j];
  CampaignSchema.properties.levels.additionalProperties.properties[hiddenProp].format = 'hidden';
}

c.extendBasicProperties(CampaignSchema, 'campaign');

c.extendTranslationCoverageProperties(CampaignSchema);

c.extendPatchableProperties(CampaignSchema);

module.exports = CampaignSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/campaign.schema.js.map
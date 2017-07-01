require.register("schemas/models/earned_achievement", function(exports, require, module) {
var EarnedAchievementSchema, c;

c = require('./../schemas');

module.exports = EarnedAchievementSchema = {
  type: 'object',
  "default": {
    previouslyAchievedAmount: 0
  },
  properties: {
    user: c.objectId({
      links: [
        {
          rel: 'extra',
          href: '/db/user/{($)}'
        }
      ]
    }),
    achievement: c.objectId({
      links: [
        {
          rel: 'extra',
          href: '/db/achievement/{($)}'
        }
      ]
    }),
    collection: {
      type: 'string'
    },
    triggeredBy: c.objectId(),
    achievementName: {
      type: 'string'
    },
    created: {
      type: ['date', 'string', 'number']
    },
    changed: {
      type: ['date', 'string', 'number']
    },
    achievedAmount: {
      type: 'number'
    },
    earnedPoints: {
      type: 'number'
    },
    previouslyAchievedAmount: {
      type: 'number'
    },
    earnedRewards: c.RewardSchema('awarded by this achievement to this user'),
    notified: {
      type: 'boolean'
    }
  }
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/earned_achievement.js.map
require.register("models/Campaign", function(exports, require, module) {
var Campaign, CocoCollection, CocoModel, Level, Levels, schema, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/campaign.schema');

Level = require('models/Level');

Levels = require('collections/Levels');

CocoCollection = require('collections/CocoCollection');

utils = require('../core/utils');

module.exports = Campaign = (function(superClass) {
  extend(Campaign, superClass);

  function Campaign() {
    return Campaign.__super__.constructor.apply(this, arguments);
  }

  Campaign.className = 'Campaign';

  Campaign.schema = schema;

  Campaign.prototype.urlRoot = '/db/campaign';

  Campaign.denormalizedLevelProperties = _.keys(_.omit(schema.properties.levels.additionalProperties.properties, ['position', 'rewards']));

  Campaign.denormalizedCampaignProperties = ['name', 'i18n', 'slug'];

  Campaign.prototype.getLevels = function() {
    var levels;
    levels = new Levels(_.values(this.get('levels')));
    levels.comparator = 'campaignIndex';
    levels.sort();
    return levels;
  };

  Campaign.prototype.getNonLadderLevels = function() {
    var levels;
    levels = new Levels(_.values(this.get('levels')));
    levels.reset(levels.reject(function(level) {
      return level.isLadder();
    }));
    levels.comparator = 'campaignIndex';
    levels.sort();
    return levels;
  };

  Campaign.prototype.getLevelNumber = function(levelID, defaultNumber) {
    var i, len, level, levels, practice, ref, ref1;
    if (!this.levelNumberMap) {
      levels = [];
      ref = this.getLevels().models;
      for (i = 0, len = ref.length; i < len; i++) {
        level = ref[i];
        if (!(level.get('original'))) {
          continue;
        }
        practice = this.levelIsPractice(level);
        levels.push({
          key: level.get('original'),
          practice: practice
        });
      }
      this.levelNumberMap = utils.createLevelNumberMap(levels);
    }
    return (ref1 = this.levelNumberMap[levelID]) != null ? ref1 : defaultNumber;
  };

  Campaign.prototype.levelIsPractice = function(level) {
    if (level.attributes) {
      level = level.attributes;
    }
    if (this.get('type') === 'course') {
      return level.practice;
    } else {
      return level.practice && / [ABCD]$/.test(level.name);
    }
  };

  return Campaign;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Campaign.js.map
require.register("models/EarnedAchievement", function(exports, require, module) {
var CocoModel, EarnedAchievement, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

utils = require('../core/utils');

module.exports = EarnedAchievement = (function(superClass) {
  extend(EarnedAchievement, superClass);

  function EarnedAchievement() {
    return EarnedAchievement.__super__.constructor.apply(this, arguments);
  }

  EarnedAchievement.className = 'EarnedAchievement';

  EarnedAchievement.schema = require('schemas/models/earned_achievement');

  EarnedAchievement.prototype.urlRoot = '/db/earned_achievement';

  EarnedAchievement.prototype.save = function() {
    if (this.get('earnedRewards') === null) {
      this.unset('earnedRewards');
    }
    return EarnedAchievement.__super__.save.apply(this, arguments);
  };

  return EarnedAchievement;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/EarnedAchievement.js.map
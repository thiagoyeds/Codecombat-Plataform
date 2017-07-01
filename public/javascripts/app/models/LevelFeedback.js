require.register("models/LevelFeedback", function(exports, require, module) {
var CocoModel, LevelFeedback,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = LevelFeedback = (function(superClass) {
  extend(LevelFeedback, superClass);

  function LevelFeedback() {
    return LevelFeedback.__super__.constructor.apply(this, arguments);
  }

  LevelFeedback.className = 'LevelFeedback';

  LevelFeedback.schema = require('schemas/models/level_feedback');

  LevelFeedback.prototype.urlRoot = '/db/level.feedback';

  return LevelFeedback;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/LevelFeedback.js.map
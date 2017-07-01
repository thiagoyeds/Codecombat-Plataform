require.register("collections/LevelSystems", function(exports, require, module) {
var CocoCollection, LevelSystem, LevelSystems,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LevelSystem = require('models/LevelSystem');

CocoCollection = require('collections/CocoCollection');

module.exports = LevelSystems = (function(superClass) {
  extend(LevelSystems, superClass);

  function LevelSystems() {
    return LevelSystems.__super__.constructor.apply(this, arguments);
  }

  LevelSystems.prototype.url = '/db/level.system';

  LevelSystems.prototype.model = LevelSystem;

  return LevelSystems;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/LevelSystems.js.map
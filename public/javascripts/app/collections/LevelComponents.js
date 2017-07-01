require.register("collections/LevelComponents", function(exports, require, module) {
var CocoCollection, LevelComponent, LevelComponents,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LevelComponent = require('models/LevelComponent');

CocoCollection = require('collections/CocoCollection');

module.exports = LevelComponents = (function(superClass) {
  extend(LevelComponents, superClass);

  function LevelComponents() {
    return LevelComponents.__super__.constructor.apply(this, arguments);
  }

  LevelComponents.prototype.url = '/db/level.component';

  LevelComponents.prototype.model = LevelComponent;

  return LevelComponents;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/LevelComponents.js.map
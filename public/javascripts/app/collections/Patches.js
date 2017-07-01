require.register("collections/Patches", function(exports, require, module) {
var CocoCollection, PatchModel, Patches,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PatchModel = require('models/Patch');

CocoCollection = require('collections/CocoCollection');

module.exports = Patches = (function(superClass) {
  extend(Patches, superClass);

  function Patches() {
    return Patches.__super__.constructor.apply(this, arguments);
  }

  Patches.prototype.model = PatchModel;

  Patches.prototype.fetchMineFor = function(targetModel, options) {
    if (options == null) {
      options = {};
    }
    options.url = (_.result(targetModel, 'url')) + "/patches";
    if (options.data == null) {
      options.data = {};
    }
    options.data.creator = me.id;
    return this.fetch(options);
  };

  return Patches;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Patches.js.map
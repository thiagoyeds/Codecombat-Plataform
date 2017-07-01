require.register("collections/PatchesCollection", function(exports, require, module) {
var CocoCollection, PatchModel, PatchesCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PatchModel = require('models/Patch');

CocoCollection = require('collections/CocoCollection');

module.exports = PatchesCollection = (function(superClass) {
  extend(PatchesCollection, superClass);

  function PatchesCollection() {
    return PatchesCollection.__super__.constructor.apply(this, arguments);
  }

  PatchesCollection.prototype.model = PatchModel;

  PatchesCollection.prototype.initialize = function(models, options, forModel, status) {
    var identifier;
    this.status = status != null ? status : 'pending';
    PatchesCollection.__super__.initialize.apply(this, arguments);
    identifier = !forModel.get('original') ? '_id' : 'original';
    return this.url = forModel.urlRoot + "/" + (forModel.get(identifier)) + "/patches?status=" + this.status;
  };

  return PatchesCollection;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/PatchesCollection.js.map
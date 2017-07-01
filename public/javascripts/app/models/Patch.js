require.register("models/Patch", function(exports, require, module) {
var CocoModel, PatchModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = PatchModel = (function(superClass) {
  extend(PatchModel, superClass);

  function PatchModel() {
    return PatchModel.__super__.constructor.apply(this, arguments);
  }

  PatchModel.className = 'Patch';

  PatchModel.schema = require('schemas/models/patch');

  PatchModel.prototype.urlRoot = '/db/patch';

  PatchModel.prototype.setStatus = function(status, options) {
    if (options == null) {
      options = {};
    }
    options.url = "/db/patch/" + this.id + "/status";
    options.type = 'PUT';
    return this.save({
      status: status
    }, options);
  };

  PatchModel.setStatus = function(id, status) {
    return $.ajax("/db/patch/" + id + "/status", {
      type: 'PUT',
      data: {
        status: status
      }
    });
  };

  return PatchModel;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Patch.js.map
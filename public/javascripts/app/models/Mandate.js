require.register("models/Mandate", function(exports, require, module) {
var CocoModel, MandateModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = MandateModel = (function(superClass) {
  extend(MandateModel, superClass);

  function MandateModel() {
    return MandateModel.__super__.constructor.apply(this, arguments);
  }

  MandateModel.className = 'Mandate';

  MandateModel.schema = require('schemas/models/mandate.schema');

  MandateModel.prototype.urlRoot = '/db/mandates';

  return MandateModel;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Mandate.js.map
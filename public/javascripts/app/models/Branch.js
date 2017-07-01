require.register("models/Branch", function(exports, require, module) {
var Branch, CocoCollection, CocoModel, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/branch.schema');

CocoCollection = require('collections/CocoCollection');

module.exports = Branch = (function(superClass) {
  extend(Branch, superClass);

  function Branch() {
    return Branch.__super__.constructor.apply(this, arguments);
  }

  Branch.className = 'Branch';

  Branch.schema = schema;

  Branch.prototype.urlRoot = '/db/branches';

  return Branch;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Branch.js.map
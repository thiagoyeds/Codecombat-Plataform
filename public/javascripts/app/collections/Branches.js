require.register("collections/Branches", function(exports, require, module) {
var Branch, Branches, CocoCollection,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoCollection = require('collections/CocoCollection');

Branch = require('models/Branch');

module.exports = Branches = (function(superClass) {
  extend(Branches, superClass);

  function Branches() {
    return Branches.__super__.constructor.apply(this, arguments);
  }

  Branches.prototype.url = '/db/branches';

  Branches.prototype.model = Branch;

  Branches.prototype.comparator = function(branch1, branch2) {
    var iUpdatedB1, iUpdatedB2;
    iUpdatedB1 = branch1.get('updatedBy') === me.id;
    iUpdatedB2 = branch2.get('updatedBy') === me.id;
    if (iUpdatedB1 && !iUpdatedB2) {
      return -1;
    }
    if (iUpdatedB2 && !iUpdatedB1) {
      return 1;
    }
    return new Date(branch2.get('updated')).getTime() - new Date(branch1.get('updated')).getTime();
  };

  return Branches;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/Branches.js.map
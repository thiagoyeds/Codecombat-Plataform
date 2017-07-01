require.register("models/Clan", function(exports, require, module) {
var Clan, CocoModel, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/clan.schema');

module.exports = Clan = (function(superClass) {
  extend(Clan, superClass);

  function Clan() {
    return Clan.__super__.constructor.apply(this, arguments);
  }

  Clan.className = 'Clan';

  Clan.schema = schema;

  Clan.prototype.urlRoot = '/db/clan';

  return Clan;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Clan.js.map
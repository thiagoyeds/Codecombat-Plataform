require.register("models/SkippedContact", function(exports, require, module) {
var CocoModel, SkippedContact,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

module.exports = SkippedContact = (function(superClass) {
  extend(SkippedContact, superClass);

  function SkippedContact() {
    return SkippedContact.__super__.constructor.apply(this, arguments);
  }

  SkippedContact.className = "SkippedContact";

  SkippedContact.prototype.urlRoot = "/db/skipped-contact";

  return SkippedContact;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/SkippedContact.js.map
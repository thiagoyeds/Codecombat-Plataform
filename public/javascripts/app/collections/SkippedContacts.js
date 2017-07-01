require.register("collections/SkippedContacts", function(exports, require, module) {
var CocoCollection, SkippedContact, SkippedContacts,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SkippedContact = require('models/SkippedContact');

CocoCollection = require('collections/CocoCollection');

module.exports = SkippedContacts = (function(superClass) {
  extend(SkippedContacts, superClass);

  function SkippedContacts() {
    return SkippedContacts.__super__.constructor.apply(this, arguments);
  }

  SkippedContacts.prototype.model = SkippedContact;

  SkippedContacts.prototype.url = '/db/skipped-contact';

  return SkippedContacts;

})(CocoCollection);
});

;
//# sourceMappingURL=/javascripts/app/collections/SkippedContacts.js.map
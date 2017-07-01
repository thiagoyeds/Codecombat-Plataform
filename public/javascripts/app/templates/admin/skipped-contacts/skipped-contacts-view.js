require.register("templates/admin/skipped-contacts/skipped-contacts-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"container\"><div><label><input type=\"checkbox\" v-model=\"showArchived\"/>Show archived users\n({{ numArchivedUsers }})</label></div><div>Sort by:<select v-model=\"sortOrder\"><option value=\"date (ascending)\">date (ascending)</option><option value=\"date (descending)\">date (descending)</option><option value=\"email\">email address</option><option value=\"archived\">archived</option><option value=\"unarchived\">unarchived</option></select></div><ol class=\"skipped-contacts\"><li is=\"skipped-contact-info\" v-for=\"skippedContact in sortedContacts\" v-if=\"showArchived || !skippedContact.archived\" :key=\"skippedContact._id\" :skippedContact=\"skippedContact\" :user=\"users[skippedContact._id]\"></li></ol></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=/javascripts/app/templates/admin/skipped-contacts/skipped-contacts-view.js.map
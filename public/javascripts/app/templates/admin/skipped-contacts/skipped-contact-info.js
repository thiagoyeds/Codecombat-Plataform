require.register("templates/admin/skipped-contacts/skipped-contact-info", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<li v-if=\"skippedContact\" class=\"skipped-contact-info\"><h2 v-if=\"skippedContact.trialRequest\">{{ skippedContact.trialRequest.properties.email }}</h2><button :data-contact-id=\"skippedContact._id\" v-if=\"skippedContact.archived\" @click.prevent=\"onClickUnarchiveContact\" class=\"unarchive-contact\">Unarchive</button><button :data-contact-id=\"skippedContact._id\" v-else=\"v-else\" @click.prevent=\"onClickArchiveContact\" class=\"archive-contact\">Archive</button><div v-if=\"!skippedContact.archived\"><h2>Reason skipped:\n{{ skippedContact.reasonSkipped }}</h2><div v-if=\"queryString\">Search string we tried to use:<pre><a :href=\"queryURL\">{{ queryString }}</a></pre></div><div class=\"row\"><div class=\"col-md-6\"><h4>Trial request data:</h4><pre>{{ JSON.stringify(skippedContact.trialRequest.properties, null, 4) }}</pre></div><div class=\"col-md-6\"><div v-if=\"noteData\"><h4>Note info:</h4><pre>{{ noteData }}</pre></div></div></div></div></li>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/admin/skipped-contacts/skipped-contact-info.js.map
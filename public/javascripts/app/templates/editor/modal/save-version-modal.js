require.register("templates/editor/modal/save-version-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"common.submit_patch\">Submit Patch</h3>");
}
else
{
buf.push("<h3 data-i18n=\"versions.save_version_title\">Save New Version</h3>");
}
buf.push("</div><div class=\"modal-body\">");
if ( view.hasChanges)
{
buf.push("<div class=\"changes-stub\"></div><form class=\"form-inline\"><div class=\"form-group commit-message\"><input id=\"commit-message\" name=\"commitMessage\" type=\"text\" class=\"form-control\"/></div>");
if ( !view.isPatch && !view.options.noNewMajorVersions)
{
buf.push("<div class=\"checkbox\"><label><input id=\"major-version\" name=\"version-is-major\" type=\"checkbox\"/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
}
else
{
buf.push("<div data-i18n=\"delta.no_changes\" class=\"alert alert-danger\">No changes</div>");
}
buf.push("</div><div class=\"modal-body wait secret\">");
if ( view.hasChanges)
{
if ( view.isPatch)
{
buf.push("<h3 data-i18n=\"versions.submitting_patch\">Submitting Patch...</h3>");
}
else
{
buf.push("<h3 data-i18n=\"common.saving\">Saving...</h3>");
}
}
buf.push("<div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.hasChanges)
{
buf.push("<div id=\"accept-cla-wrapper\" class=\"alert alert-info\"><span data-i18n=\"versions.cla_prefix\" class=\"spr\">To save changes, first you must agree to our</span><strong id=\"cla-link\" data-i18n=\"versions.cla_url\">CLA</strong><span data-i18n=\"versions.cla_suffix\"></span><button id=\"agreement-button\" data-i18n=\"versions.cla_agree\" class=\"btn btn-sm\">I AGREE</button></div>");
if ( view.isPatch)
{
buf.push("<div data-i18n=\"versions.owner_approve\" class=\"alert alert-info\">An owner will need to approve it before your changes will become visible.</div>");
}
buf.push("<div class=\"save-error-area\">");
if ( view.savingPatchError)
{
buf.push("<div class=\"alert alert-danger\">Unable to save patch: " + (jade.escape((jade.interp = view.savingPatchError) == null ? '' : jade.interp)) + "</div>");
}
buf.push("</div>");
}
buf.push("<div class=\"buttons\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button>");
if ( view.hasChanges && !view.isPatch)
{
buf.push("<button id=\"save-version-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button>");
}
if ( view.hasChanges && view.isPatch)
{
buf.push("<button id=\"submit-patch-button\" data-i18n=\"common.submit_patch\" class=\"btn btn-primary\">Submit Patch</button>");
}
buf.push("</div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/modal/save-version-modal.js.map
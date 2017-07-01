require.register("templates/editor/level/save-level-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,level = locals_.level,levelNeedsSave = locals_.levelNeedsSave,modifiedComponents = locals_.modifiedComponents,modifiedSystems = locals_.modifiedSystems,me = locals_.me,_ = locals_._;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
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
buf.push("</div><div class=\"modal-body\"><h3><span data-i18n=\"resources.level\">Level</span><span>" + (jade.escape(null == (jade.interp = ": " + level.get('name') + " - ") ? "" : jade.interp)) + "</span>");
if ( levelNeedsSave)
{
buf.push("<span data-i18n=\"delta.modified\">Modified</span>");
}
else
{
buf.push("<span data-i18n=\"delta.not_modified\">Not Modified</span>");
}
buf.push("</h3>");
if ( levelNeedsSave)
{
buf.push("<div class=\"changes-stub\"></div><form id=\"save-level-form\" class=\"form-inline\"><div class=\"form-group commit-message\"><input id=\"level-commit-message\" name=\"commit-message\" type=\"text\" class=\"form-control\"/></div>");
if ( level.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input id=\"level-version-is-major\" name=\"version-is-major\" type=\"checkbox\"/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
if ( !level.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input id=\"level-publish\" name=\"publish\" type=\"checkbox\"/><span data-i18n=\"common.publish\">Publish</span></label></div>");
}
buf.push("</form>");
}
if ( modifiedComponents.length)
{
buf.push("<hr/>");
}
// iterate modifiedComponents
;(function(){
  var $$obj = modifiedComponents;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var component = $$obj[$index];

var id = component.get('_id')
buf.push("<h4><span data-i18n=\"resources.component\">Component</span><span>" + (jade.escape(null == (jade.interp = ": " + component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-component-" + id + "-form"), "class": [('form-inline'),('component-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("component-original"), 'type':("hidden"), 'value':(component.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("component-parent-major-version"), 'type':("hidden"), 'value':(component.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), "class": [('form-control')] }, {"id":true,"name":true,"type":true})) + "/></div>");
if ( component.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var component = $$obj[$index];

var id = component.get('_id')
buf.push("<h4><span data-i18n=\"resources.component\">Component</span><span>" + (jade.escape(null == (jade.interp = ": " + component.get('system') + '.' + component.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-component-" + id + "-form"), "class": [('form-inline'),('component-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("component-original"), 'type':("hidden"), 'value':(component.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("component-parent-major-version"), 'type':("hidden"), 'value':(component.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), "class": [('form-control')] }, {"id":true,"name":true,"type":true})) + "/></div>");
if ( component.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  }
}).call(this);

if ( modifiedSystems.length)
{
buf.push("<hr/>");
}
// iterate modifiedSystems
;(function(){
  var $$obj = modifiedSystems;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var system = $$obj[$index];

var id = system.get('_id')
buf.push("<h4><span data-i18n=\"resources.system\">System</span><span>" + (jade.escape(null == (jade.interp = ": " + system.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-system-" + id + "-form"), "class": [('form-inline'),('system-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("system-original"), 'type':("hidden"), 'value':(system.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("system-parent-major-version"), 'type':("hidden"), 'value':(system.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), 'placeholder':("Commit Message"), "class": [('form-control')] }, {"id":true,"name":true,"type":true,"placeholder":true})) + "/></div>");
if ( system.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var system = $$obj[$index];

var id = system.get('_id')
buf.push("<h4><span data-i18n=\"resources.system\">System</span><span>" + (jade.escape(null == (jade.interp = ": " + system.get('name')) ? "" : jade.interp)) + "</span></h4><div class=\"changes-stub\"></div><form" + (jade.attrs({ 'id':("save-system-" + id + "-form"), "class": [('form-inline'),('system-form')] }, {"id":true})) + "><input" + (jade.attrs({ 'name':("system-original"), 'type':("hidden"), 'value':(system.get('original')) }, {"name":true,"type":true,"value":true})) + "/><input" + (jade.attrs({ 'name':("system-parent-major-version"), 'type':("hidden"), 'value':(system.get('version').major) }, {"name":true,"type":true,"value":true})) + "/><div class=\"form-group commit-message\"><input" + (jade.attrs({ 'id':(id + "-commit-message"), 'name':("commit-message"), 'type':("text"), 'placeholder':("Commit Message"), "class": [('form-control')] }, {"id":true,"name":true,"type":true,"placeholder":true})) + "/></div>");
if ( system.isPublished())
{
buf.push("<div class=\"checkbox\"><label><input" + (jade.attrs({ 'id':(id + "-version-is-major"), 'name':("version-is-major"), 'type':("checkbox") }, {"id":true,"name":true,"type":true})) + "/><span data-i18n=\"versions.new_major_version\">New Major Version</span></label></div>");
}
buf.push("</form>");
    }

  }
}).call(this);

if ( me.isAdmin())
{
buf.push("<div id=\"verifier-stub\"><h3>Verifying...</h3><div id=\"verifier-tests\">");
// iterate ['waiting', 'running', 'problems', 'failed', 'passedExceptFrames', 'passed']
;(function(){
  var $$obj = ['waiting', 'running', 'problems', 'failed', 'passedExceptFrames', 'passed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var state = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':(view[state] ? "font-weight: bold" : "") }, {"style":true})) + "> " + (jade.escape((jade.interp = _.string.humanize(state)) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = view[state]) == null ? '' : jade.interp)) + " |</span>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var state = $$obj[$index];

buf.push("<span" + (jade.attrs({ 'style':(view[state] ? "font-weight: bold" : "") }, {"style":true})) + "> " + (jade.escape((jade.interp = _.string.humanize(state)) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = view[state]) == null ? '' : jade.interp)) + " |</span>");
    }

  }
}).call(this);

buf.push("<span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/editor/verifier/" + (level.get('slug')) + "?dev=true"), 'target':("_blank") }, {"href":true,"target":true})) + ">Details</a></div></div>");
}
buf.push("<div id=\"errors-wrapper\" class=\"alert alert-danger hide\"><strong>Validation Error! Save failed.</strong><p class=\"errors\"></p></div></div><div class=\"modal-body wait secret\">");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/save-level-modal.js.map
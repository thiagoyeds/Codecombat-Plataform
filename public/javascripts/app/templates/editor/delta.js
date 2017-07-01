require.register("templates/editor/delta", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;var i = 0
var counter = view.constructor.deltaCounter;
var deltaPanel_mixin = function(delta, conflict){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
delta.index = i++
buf.push("<div" + (jade.attrs({ 'data-index':(i), "class": [('delta'),('panel'),('panel-default'),('delta-'+delta.action)] }, {"class":true,"data-index":true})) + "><div class=\"panel-heading\">");
if ( delta.action === 'added')
{
buf.push("<strong data-i18n=\"delta.added\">Added</strong>");
}
if ( delta.action === 'modified')
{
buf.push("<strong data-i18n=\"delta.modified\">Modified</strong>");
}
if ( delta.action === 'deleted')
{
buf.push("<strong data-i18n=\"delta.deleted\">Deleted</strong>");
}
if ( delta.action === 'moved-index')
{
buf.push("<strong data-i18n=\"delta.moved_index\">Moved Index</strong>");
}
if ( delta.action === 'text-diff')
{
buf.push("<strong data-i18n=\"delta.text_diff\">Text Diff</strong>");
}
buf.push("<span> </span><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#delta-accordion"+(counter)), 'href':("#collapse-"+(i+counter)) }, {"data-toggle":true,"data-parent":true,"href":true})) + "><span>" + (jade.escape(null == (jade.interp = delta.humanPath) ? "" : jade.interp)) + "</span></a></div><div" + (jade.attrs({ 'id':("collapse-"+(i+counter)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div" + (jade.attrs({ "class": [('panel-body'),('row'),(conflict ? "conflict-details" : "details")] }, {"class":true})) + ">");
if ( delta.action === 'added')
{
buf.push("<div class=\"new-value col-md-12\">" + (jade.escape(null == (jade.interp = delta.right) ? "" : jade.interp)) + "</div>");
}
if ( delta.action === 'modified')
{
buf.push("<div class=\"old-value col-md-6\">" + (jade.escape(null == (jade.interp = delta.left) ? "" : jade.interp)) + "</div><div class=\"new-value col-md-6\">" + (jade.escape(null == (jade.interp = delta.right) ? "" : jade.interp)) + "</div>");
}
if ( delta.action === 'deleted')
{
buf.push("<div class=\"col-md-12\"><div class=\"old-value\">" + (jade.escape(null == (jade.interp = delta.left) ? "" : jade.interp)) + "</div></div>");
}
if ( delta.action === 'text-diff')
{
buf.push("<div class=\"col-md-12\"><div class=\"text-diff\"></div></div>");
}
if ( delta.action === 'moved-index')
{
buf.push("<div class=\"col-md-12\"><span>Moved array value " + (jade.escape((jade.interp = delta.hash) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = delta.originalIndex) == null ? '' : jade.interp)) + " ➜ " + (jade.escape((jade.interp = delta.destinationIndex) == null ? '' : jade.interp)) + "</span></div>");
}
buf.push("</div></div>");
if ( delta.conflict && !conflict)
{
buf.push("<div class=\"panel-body\"><strong data-i18n=\"delta.merge_conflict_with\">MERGE CONFLICT WITH</strong>");
deltaPanel_mixin(delta.conflict, true);
buf.push("</div>");
}
buf.push("</div>");
};
buf.push("<div" + (jade.attrs({ 'id':('delta-accordion-'+(counter)), "class": [('panel-group')] }, {"id":true})) + ">");
// iterate view.expandedDeltas
;(function(){
  var $$obj = view.expandedDeltas;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var delta = $$obj[$index];

deltaPanel_mixin(delta);
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var delta = $$obj[$index];

deltaPanel_mixin(delta);
    }

  }
}).call(this);

if ( !view.expandedDeltas.length)
{
buf.push("<alert data-i18n=\"delta.no_changes\" class=\"alert-warning\">No changes</alert>");
}
else
{
buf.push("<div class=\"delta panel panel-default\"><div class=\"panel-heading\"><a" + (jade.attrs({ 'data-toggle':("collapse"), 'data-parent':("#delta-accordion-expert"), 'href':("#collapse-expert-"+(counter)) }, {"data-toggle":true,"data-parent":true,"href":true})) + "><span>Expert View</span></a></div><div" + (jade.attrs({ 'id':("collapse-expert-"+(counter)), "class": [('panel-collapse'),('collapse')] }, {"id":true})) + "><div class=\"panel-body row\"><div class=\"expert-view\"></div></div></div></div>");
}
buf.push("</div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/delta.js.map
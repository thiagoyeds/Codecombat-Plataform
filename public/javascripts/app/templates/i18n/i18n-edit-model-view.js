require.register("templates/i18n/i18n-edit-model-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),model = locals_.model,me = locals_.me,translationList = locals_.translationList,view = locals_.view,moment = locals_.moment;if ( model.loading)
{
buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/i18n\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/i18n\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = model.get('name')) == null ? '' : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\"><li><button" + (jade.attrs({ 'id':('patch-submit'), 'disabled':(model.hasLocalChanges() ? null : 'disabled'), 'value':(model.id), 'data-i18n':("common.submit_changes"), "class": [('btn'),('btn-info'),('btn-sm'),('pull-right')] }, {"disabled":true,"value":true,"data-i18n":true})) + ">Submit Changes</button></li><li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/diplomat\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content container-fluid\"><select id=\"language-select\" class=\"form-control\"></select><div class=\"row\"><div class=\"col-sm-6\">");
// iterate translationList
;(function(){
  var $$obj = translationList;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var row = $$obj[$index];

buf.push("<table class=\"table translation-table\"><tr><th>" + (jade.escape(null == (jade.interp = row.title) ? "" : jade.interp)) + "</th></tr><tr" + (jade.attrs({ 'data-format':(row.format || '') }, {"data-format":true})) + "><td class=\"english-value-row\"><div>" + (jade.escape(null == (jade.interp = row.enValue) ? "" : jade.interp)) + "</div></td></tr><tr" + (jade.attrs({ 'data-format':(row.format || '') }, {"data-format":true})) + "><td class=\"to-value-row\">");
if ( row.format === 'markdown')
{
buf.push("<div" + (jade.attrs({ 'data-index':(row.index.toString()) }, {"data-index":true})) + ">" + (jade.escape(null == (jade.interp = row.toValue) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<input" + (jade.attrs({ 'data-index':(row.index.toString()), 'value':(row.toValue), "class": [('input-sm'),('form-control'),('translation-input')] }, {"data-index":true,"value":true})) + "/>");
}
buf.push("</td></tr></table>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var row = $$obj[$index];

buf.push("<table class=\"table translation-table\"><tr><th>" + (jade.escape(null == (jade.interp = row.title) ? "" : jade.interp)) + "</th></tr><tr" + (jade.attrs({ 'data-format':(row.format || '') }, {"data-format":true})) + "><td class=\"english-value-row\"><div>" + (jade.escape(null == (jade.interp = row.enValue) ? "" : jade.interp)) + "</div></td></tr><tr" + (jade.attrs({ 'data-format':(row.format || '') }, {"data-format":true})) + "><td class=\"to-value-row\">");
if ( row.format === 'markdown')
{
buf.push("<div" + (jade.attrs({ 'data-index':(row.index.toString()) }, {"data-index":true})) + ">" + (jade.escape(null == (jade.interp = row.toValue) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<input" + (jade.attrs({ 'data-index':(row.index.toString()), 'value':(row.toValue), "class": [('input-sm'),('form-control'),('translation-input')] }, {"data-index":true,"value":true})) + "/>");
}
buf.push("</td></tr></table>");
    }

  }
}).call(this);

buf.push("</div><div id=\"patches-col\" class=\"col-sm-6\">");
if ( view.patches)
{
buf.push("<div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Patches Submitted</h3></div><table class=\"table\"><tr><th>Description</th><th>Submitted</th><th>Status</th></tr>");
// iterate view.patches.models
;(function(){
  var $$obj = view.patches.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var patch = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('open-patch-link')] }, {"data-patch-id":true})) + ">" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(patch.created()).format('LLLL')) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [(patch.get('status'))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = patch.get('status')) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var patch = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'data-patch-id':(patch.id), "class": [('open-patch-link')] }, {"data-patch-id":true})) + ">" + (jade.escape(null == (jade.interp = patch.get('commitMessage')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(patch.created()).format('LLLL')) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [(patch.get('status'))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = patch.get('status')) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table></div>");
}
buf.push("</div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/i18n/i18n-edit-model-view.js.map
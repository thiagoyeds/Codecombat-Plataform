require.register("templates/editor/campaign/campaign-editor-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,anonymous = locals_.anonymous;if ( view.campaign.loading)
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"campaign-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav navbar-right\">");
if ( me.isAdmin())
{
buf.push("<li id=\"analytics-button\"><a><span class=\"glyphicon-stats glyphicon\"></span></a></li>");
}
if ( me.isAdmin())
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-toggle=\"coco-modal\" data-target=\"modal/RevertModal\" data-i18n=\"editor.revert\" id=\"revert-button\">Revert</a></li><li" + (jade.attrs({ "class": [(anonymous ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li>");
if ( me.isAdmin())
{
buf.push("<li id=\"patches-button\"><a><span class=\"spr glyphicon-wrench glyphicon\"></span><span data-i18n=\"resources.patches\">Patches</span></a></li>");
}
buf.push("<li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li></ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div id=\"left-column\"><div id=\"campaign-treema\"></div></div><div id=\"right-column\"><div id=\"campaign-view\"></div><div id=\"campaign-level-view\" class=\"hidden\"></div><div class=\"patches-view hidden\"></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/campaign/campaign-editor-view.js.map
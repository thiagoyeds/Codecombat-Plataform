require.register("templates/play/level/tome/spell-top-bar-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,maximizeShortcutVerbose = locals_.maximizeShortcutVerbose,codeLanguage = locals_.codeLanguage,beautifyShortcutVerbose = locals_.beautifyShortcutVerbose,view = locals_.view,i18nName = locals_.i18nName,translate = locals_.translate;if ( features.codePlay)
{
buf.push("<img id=\"codeplay-powered-by-banner\" src=\"/images/common/codeplay/CodePlay.png\"/>");
}
buf.push("<div class=\"hinge hinge-0\"></div><div class=\"hinge hinge-1\"></div><div class=\"hinge hinge-2\"></div><div class=\"hinge hinge-3\"></div><div class=\"spell-tool-buttons\"><div data-i18n=\"[title]play_level.tome_reload_method\" class=\"btn btn-small btn-illustrated btn-warning reload-code\"><div class=\"glyphicon glyphicon-repeat\"></div>");
if ( !features.codePlay)
{
buf.push("<span data-i18n=\"play_level.restart\" class=\"spl\"></span>");
}
buf.push("</div>");
if ( me.level() >= 15)
{
buf.push("<div" + (jade.attrs({ 'title':(maximizeShortcutVerbose), "class": [('btn'),('btn-small'),('btn-illustrated'),('fullscreen-code')] }, {"title":true})) + "><div class=\"glyphicon glyphicon-fullscreen\"></div><div class=\"glyphicon glyphicon-resize-small\"></div></div>");
}
if ( codeLanguage === 'javascript' && me.level() >= 15)
{
buf.push("<div" + (jade.attrs({ 'title':(beautifyShortcutVerbose), "class": [('btn'),('btn-small'),('btn-illustrated'),('beautify-code')] }, {"title":true})) + "><div class=\"glyphicon glyphicon-magnet\"></div></div>");
}
if ( view.hintsState && view.hintsState.get('total') > 0)
{
buf.push("<div class=\"btn btn-small btn-illustrated hints-button\"><span data-i18n=\"play_level.hints\"></span></div>");
}
if ( view.options.level.isType('web-dev'))
{
buf.push("<div class=\"btn btn-small btn-illustrated image-gallery-button\"><span data-i18n=\"web_dev.image_gallery_title\"></span></div>");
}
if ( view.options.level.get('shareable'))
{
i18nName = view.options.level.isType('game-dev') ? 'sharing.game' : 'sharing.webpage'
if ( view.options.session.isFake())
{
buf.push("<button" + (jade.attrs({ 'data-i18n':(i18nName), 'data-toggle':("popover"), 'data-placement':("bottom"), 'data-content':(translate('sharing.your_students_preview')), 'data-trigger':("hover"), "class": [('btn'),('btn-small'),('btn-illustrated')] }, {"data-i18n":true,"data-toggle":true,"data-placement":true,"data-content":true,"data-trigger":true})) + "></button>");
}
else
{
var url = '/play/' + view.options.level.get('type') + '-level/' + view.options.level.get('slug') + '/' + view.options.session.id;
if (view.options.courseID) url += '?course=' + view.options.courseID;
buf.push("<a" + (jade.attrs({ 'href':(url), 'data-i18n':(i18nName), "class": [('btn'),('btn-small'),('btn-illustrated')] }, {"href":true,"data-i18n":true})) + "></a>");
}
}
buf.push("<div class=\"clearfix\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell-top-bar-view.js.map
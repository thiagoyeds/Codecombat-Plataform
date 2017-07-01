require.register("templates/play/level/play-game-dev-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;var ready = !(view.state.get('errorMessage') || view.state.get('loading'))
buf.push("<div class=\"container-fluid style-flat\"><div id=\"game-row\" class=\"row\"><div class=\"col-xs-9\"><div id=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas></div></div><div id=\"info-col\" class=\"col-xs-3\"><div class=\"panel panel-default\"><div class=\"panel-body text-center\">");
if ( view.state.get('errorMessage'))
{
buf.push("<div class=\"alert alert-danger\">" + (jade.escape(null == (jade.interp = view.state.get('errorMessage')) ? "" : jade.interp)) + "</div>");
}
if ( view.level.id && view.session.id)
{
buf.push("<h3 class=\"m-y-1\">" + (jade.escape(null == (jade.interp = view.level.get('name')) ? "" : jade.interp)) + "</h3><h4>" + (jade.escape(null == (jade.interp = view.state.get('creatorString')) ? "" : jade.interp)) + "</h4><hr/>");
}
if ( view.state.get('loading'))
{
buf.push("<h1 data-i18n=\"common.loading\" class=\"m-y-1\"></h1><div class=\"progress\"><div" + (jade.attrs({ 'style':("width: " + (view.state.get('progress')) + ""), "class": [('progress-bar')] }, {"style":true})) + "></div></div>");
}
if ( ready)
{
buf.push("<h3><span data-i18n=\"play_level.directions\"></span>:</h3><p>" + (null == (jade.interp = view.howToPlayText) ? "" : jade.interp) + "</p><hr/>");
}
buf.push("</div>");
if ( ready)
{
buf.push("<div class=\"panel-footer\">");
var playing = view.state.get('playing')
if ( playing)
{
buf.push("<button id=\"play-btn\" data-i18n=\"play_game_dev_level.restart\" class=\"btn btn-lg btn-burgandy btn-block\"></button>");
}
else
{
buf.push("<button id=\"play-btn\" data-i18n=\"play_game_dev_level.play\" class=\"btn btn-lg btn-forest btn-block\"></button>");
}
if ( view.state.get('isOwner'))
{
buf.push("<br/><button id=\"edit-level-btn\" data-i18n=\"play_level.edit_level\" class=\"btn btn-lg btn-warning btn-block\"></button>");
}
buf.push("</div>");
}
buf.push("</div></div></div><div id=\"share-row\" class=\"m-t-3\">");
if ( ready)
{
buf.push("<div class=\"panel panel-default\"><div id=\"share-panel-body\" class=\"panel-body\"><div id=\"share-text-div\" class=\"text-right\"><b data-i18n=\"sharing.share_game\"></b></div><input" + (jade.attrs({ 'id':('copy-url-input'), 'value':(view.state.get('shareURL')), "class": [('text-h4'),('semibold'),('form-control'),('input-lg')] }, {"value":true})) + "/><div id=\"copy-url-div\"><button id=\"copy-url-btn\" class=\"btn btn-lg btn-navy-alt\"><span data-i18n=\"sharing.copy_url\"></span></button></div></div>");
if ( !view.state.get('isOwner'))
{
buf.push("<div class=\"panel-body\"><a id=\"play-more-codecombat-btn\" href=\"/\" data-i18n=\"play_game_dev_level.play_more_codecombat\" class=\"btn btn-lg btn-navy-alt pull-right\"></a></div>");
}
buf.push("</div>");
}
buf.push("</div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/play-game-dev-level-view.js.map
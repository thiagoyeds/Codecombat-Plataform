require.register("templates/play/level/modal/picoctf-victory-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\"><div id=\"close-modal\" data-dismiss=\"modal\" class=\"well well-sm well-parchment\"><span class=\"glyphicon glyphicon-remove\"></span></div><div id=\"victory-header\"><div id=\"victory-title\">");
if ( !me.get('preferredLanguage') || me.get('preferredLanguage').split('-')[0] == 'en')
{
buf.push("<img src=\"/images/pages/play/level/modal/victory_word.png\" draggable=\"false\"/>");
}
else
{
buf.push("<h1 data-i18n=\"play_level.victory\">Victory</h1>");
}
buf.push("</div></div></div><div class=\"modal-body\"><div class=\"container-fluid\"><div class=\"row\">");
var victoryText = view.level.get('victory');
if ( victoryText && victoryText.body)
{
buf.push("<div class=\"well well-sm well-parchment\"><h3>" + (jade.escape(null == (jade.interp = victoryText.body) ? "" : jade.interp)) + "</h3></div>");
}
buf.push("</div><div class=\"row\">");
if ( view.nextLevel && view.nextLevel.get('slug'))
{
buf.push("<div class=\"col-sm-5 col-sm-offset-2\"><a href=\"/play/picoctf\" id=\"done-btn\" class=\"btn btn-illustrated btn-primary btn-block btn-lg text-uppercase\">Done</a></div><div class=\"col-sm-5\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.nextLevel.get('slug')) + ""), 'id':('continue-button'), "class": [('btn'),('btn-illustrated'),('btn-success'),('btn-block'),('btn-lg'),('text-uppercase')] }, {"href":true})) + ">Continue</a></div>");
}
else
{
buf.push("<div class=\"col-sm-5 col-sm-offset-2\"></div><div class=\"col-sm-5\"><a href=\"/play/picoctf\" id=\"done-btn\" class=\"btn btn-illustrated btn-primary btn-block btn-lg text-uppercase\">Done</a></div>");
}
buf.push("</div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/picoctf-victory-modal.js.map
require.register("templates/play/play-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,features = locals_.features,document = locals_.document,me = locals_.me;if ( view.showAds())
{
buf.push("<!-- TODO: loading this multiple times yields script error:--><!-- Uncaught TagError: adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them.--><div class=\"ad-container\"><script async=\"async\" src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script><ins style=\"display:inline-block;width:728px;height:90px\" data-ad-client=\"ca-pub-6640930638193614\" data-ad-slot=\"5527096883\" class=\"adsbygoogle\"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});\n</script></div>");
}
buf.push("<div class=\"game-container\"><div id=\"level-loading-view\"></div><div class=\"level-content\"><div id=\"control-bar-view\"></div><div id=\"fullscreen-editor-background-screen\" title=\"Click to minimize the code editor\"></div><div id=\"code-area\"><div id=\"code-area-gradient\" class=\"gradient\"></div><div id=\"tome-view\"></div></div><div id=\"spell-palette-view\"></div><div id=\"problem-alert-view\"></div><div id=\"game-area\"><div id=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas><div id=\"web-surface-view\"></div><div id=\"ascii-surface\"></div><div id=\"canvas-left-gradient\" class=\"gradient\"></div><div id=\"canvas-top-gradient\" class=\"gradient\"></div><div id=\"goals-view\"></div></div><div id=\"level-flags-view\"></div><div id=\"gold-view\"></div><div id=\"level-chat-view\"></div><div id=\"multiplayer-status-view\"></div><div id=\"duel-stats-view\"></div><div id=\"playback-view\"></div><div id=\"thang-hud\"></div><div id=\"level-dialogue-view\"></div></div>");
if ( features.codePlay)
{
buf.push("<a" + (jade.attrs({ 'href':(document.location.protocol+"//lenovogamestate.com/pages/products/") }, {"href":true})) + ">");
var url = "/images/common/codeplay/NA_InLevelPage_Y700_1132X283_ingameProduct.png"
if ( me.isFromUk())
{
url = "/images/common/codeplay/UK_InLevelPage_Y700_1132X283_ingameProduct.png"
}
buf.push("<img" + (jade.attrs({ 'id':('codeplay-product-banner'), 'src':(url) }, {"src":true})) + "/></a>");
}
buf.push("<button id=\"stop-real-time-playback-button\" title=\"Stop real-time playback\" class=\"btn btn-lg btn-warning banner header-font\">");
if ( view.level && view.level.isType('game-dev'))
{
buf.push("<span data-i18n=\"play_level.edit_level\"></span>");
}
else
{
buf.push("<span data-i18n=\"play_level.skip\"></span>");
}
buf.push("</button><div id=\"how-to-play-game-dev-panel\" class=\"panel panel-default hide style-flat\"><div class=\"panel-heading\"><h3 class=\"panel-title\"><span data-i18n=\"play_level.directions\"></span>:</h3></div><div class=\"panel-body\">" + (null == (jade.interp = view.howToPlayText) ? "" : jade.interp) + "</div></div><div class=\"hints-view hide\"></div></div><div id=\"level-footer-shadow\"></div><div id=\"level-footer-background\"></div>");
if ( !me.get('anonymous') && !me.isStudent() && !features.codePlay)
{
buf.push("<div" + (jade.attrs({ 'id':('play-footer'), "class": [(me.isPremium() ? "premium" : "")] }, {"class":true})) + "><p class=\"footer-link-text picoctf-hide\"><a title=\"Send CodeCombat a message\" tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-link\"></a></p></div>");
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
//# sourceMappingURL=/javascripts/app/templates/play/play-level-view.js.map
require.register("templates/play/level/control-bar-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),homeLink = locals_.homeLink,me = locals_.me,ladderGame = locals_.ladderGame,view = locals_.view,i18n = locals_.i18n,difficultyTitle = locals_.difficultyTitle,worldName = locals_.worldName,levelDifficulty = locals_.levelDifficulty,observing = locals_.observing,spectateGame = locals_.spectateGame;buf.push("<div class=\"left-cap\"></div><div class=\"right-cap\"></div><div class=\"center-chain\"></div><div class=\"right-chain\"></div><div class=\"wood-background\"></div><div class=\"levels-link-area\"><a" + (jade.attrs({ 'href':(homeLink || "/"), "class": [('levels-link')] }, {"href":true})) + "><div class=\"glyphicon glyphicon-play\"></div><span" + (jade.attrs({ 'data-i18n':(me.isSessionless() ? "nav.courses" : (ladderGame ? "general.ladder" : "nav.play")), "class": [('home-text')] }, {"data-i18n":true})) + "></span></a></div><div class=\"level-name-area-container\"><div class=\"level-name-area\">");
if ( view.course)
{
buf.push("<div class=\"level-label\">" + (jade.escape(null == (jade.interp = i18n(view.course.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("<div" + (jade.attrs({ 'title':(difficultyTitle || ""), "class": [('level-name')] }, {"title":true})) + "><span>" + (jade.escape((jade.interp = view.levelNumber ? view.levelNumber + '. ' : '') == null ? '' : jade.interp)) + "" + (jade.escape((jade.interp = worldName.replace('Course: ', '')) == null ? '' : jade.interp)) + "</span>");
if ( levelDifficulty)
{
buf.push("<sup class=\"level-difficulty\">" + (jade.escape(null == (jade.interp = levelDifficulty) ? "" : jade.interp)) + "</sup>");
}
buf.push("</div></div></div><div class=\"buttons-area\">");
if ( !observing)
{
buf.push("<button id=\"game-menu-button\" data-i18n=\"[title]play_level.show_menu\" title=\"Show game menu\" class=\"btn btn-inverse\"><div class=\"hamburger\"><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></div><span data-i18n=\"play_level.game_menu\" class=\"game-menu-text\">Game Menu</span></button>");
}
if ( spectateGame)
{
buf.push("<button id=\"next-game-button\" data-i18n=\"play_level.next_game\" class=\"btn btn-xs btn-inverse banner\">Next game</button>");
}
if ( !observing)
{
buf.push("<button id=\"level-done-button\" data-i18n=\"play_level.done\" class=\"btn btn-xs btn-primary banner\">Done</button>");
}
if ( me.get('anonymous'))
{
buf.push("<button id=\"control-bar-sign-up-button\" data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\" data-i18n=\"signup.sign_up\" class=\"btn btn-xs btn-primary banner\"></button>");
}
if ( me.isAdmin())
{
var otherVersion = view.course ? 'Home' : 'Classroom'
buf.push("<button id=\"version-switch-button\" class=\"btn btn-xs btn-inverse banner\"><span>" + (jade.escape(null == (jade.interp = otherVersion) ? "" : jade.interp)) + "</span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span data-code-language=\"javascript\" class=\"code-language-selector\">JS</span><span>" + (jade.escape(null == (jade.interp = ' | ') ? "" : jade.interp)) + "</span><span data-code-language=\"python\" class=\"code-language-selector\">PY</span></button>");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/control-bar-view.js.map
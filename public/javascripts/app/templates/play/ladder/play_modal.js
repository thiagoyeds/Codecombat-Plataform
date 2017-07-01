require.register("templates/play/ladder/play_modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"ladder.choose_opponent\">Choose an Opponent</h3></div><div class=\"modal-body\">");
if ( !view.level.isType('course-ladder'))
{
buf.push("<h4 data-i18n=\"ladder.select_your_language\" class=\"language-selection\">Select your language!</h4><div class=\"form-group select-group\"><select id=\"tome-language\" name=\"language\">");
// iterate view.languages
;(function(){
  var $$obj = view.languages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':((view.language === option.id)) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':((view.language === option.id)) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div>");
}
buf.push("<div id=\"noob-view\" class=\"secret\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "-tutorial" + (view.options.league ? "?league=" + view.options.league.id : "")), "class": [('btn'),('btn-success'),('btn-block'),('btn-lg')] }, {"href":true})) + "><p><strong data-i18n=\"ladder.tutorial_play\">Play Tutorial</strong></p><span data-i18n=\"ladder.tutorial_recommended\">Recommended if you've never played before</span></a><span id=\"skip-tutorial-button\" data-i18n=\"ladder.tutorial_skip\" class=\"btn btn-primary btn-block btn-lg\">Skip Tutorial</span></div><div id=\"normal-view\">");
if ( view.tutorialLevelExists)
{
buf.push("<p class=\"tutorial-suggestion\"><strong data-i18n=\"ladder.tutorial_not_sure\">Not sure what's going on?</strong> <a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "-tutorial" + (view.options.league ? "?league=" + view.options.league.id : "")), 'data-i18n':("ladder.tutorial_play_first") }, {"href":true,"data-i18n":true})) + ">Play the tutorial first.</a></p>");
}
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "?team=" + (view.team) + "" + (view.options.league ? "&league=" + view.options.league.id : "")) }, {"href":true})) + "><div class=\"play-option\"><img" + (jade.attrs({ 'src':(view.myPortrait), "class": [('my-icon'),('only-one')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.team) + "_ladder_tutorial.png"), 'style':("border: 1px solid " + (view.teamColor) + "; background: " + (view.teamBackgroundColor) + ""), "class": [('my-team-icon'),('img-circle'),('only-one')] }, {"src":true,"style":true})) + "/><img" + (jade.attrs({ 'src':(view.genericPortrait), "class": [('opponent-icon')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.otherTeam) + "_ladder_tutorial.png"), 'style':("border: 1px solid " + (view.opponentTeamColor) + "; background: " + (view.opponentTeamBackgroundColor) + ""), "class": [('opponent-team-icon'),('img-circle')] }, {"src":true,"style":true})) + "/><div class=\"my-name name-label only-one\"><span>" + (jade.escape(null == (jade.interp = view.myName) ? "" : jade.interp)) + "</span></div><div class=\"opponent-name name-label\"><span data-i18n=\"ladder.simple_ai\"></span><!--span.code-language(style=\"background-image: url(/images/common/code_languages/javascript_small.png)\")--></div><div class=\"difficulty\"><span data-i18n=\"ladder.warmup\">Warmup</span></div></div></a>");
if ( view.challengers && view.challengers.easy)
{
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "?team=" + (view.team) + "&opponent=" + (view.challengers.easy.sessionID) + "" + (view.options.league ? "&league=" + view.options.league.id : "")) }, {"href":true})) + "><div class=\"play-option easy-option\"><img" + (jade.attrs({ 'src':(view.myPortrait), "class": [('my-icon'),('only-one')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.team) + "_ladder_easy.png"), 'style':("border: 1px solid " + (view.teamColor) + "; background: " + (view.teamBackgroundColor) + ""), "class": [('my-team-icon'),('img-circle'),('only-one')] }, {"src":true,"style":true})) + "/><img" + (jade.attrs({ 'src':(view.challengers.easy.opponentImageSource||view.genericPortrait), "class": [('opponent-icon')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.otherTeam) + "_ladder_easy.png"), 'style':("border: 1px solid " + (view.opponentTeamColor) + "; background: " + (view.opponentTeamBackgroundColor) + ""), "class": [('opponent-team-icon'),('img-circle')] }, {"src":true,"style":true})) + "/><div class=\"my-name name-label only-one\"><span>" + (jade.escape(null == (jade.interp = view.myName) ? "" : jade.interp)) + "</span></div><div class=\"opponent-name name-label\"><span>" + (jade.escape(null == (jade.interp = view.challengers.easy.opponentName) ? "" : jade.interp)) + "</span>");
if ( view.challengers.easy.codeLanguage)
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (view.challengers.easy.codeLanguage) + "_small.png)"), "class": [('code-language')] }, {"style":true})) + "></span>");
}
buf.push("</div><div class=\"difficulty\"><span data-i18n=\"general.easy\">Easy</span></div></div></a>");
}
if ( view.challengers && view.challengers.medium)
{
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "?team=" + (view.team) + "&opponent=" + (view.challengers.medium.sessionID) + "" + (view.options.league ? "&league=" + view.options.league.id : "")) }, {"href":true})) + "><div class=\"play-option medium-option\"><img" + (jade.attrs({ 'src':(view.myPortrait), "class": [('my-icon'),('only-one')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.team) + "_ladder_medium.png"), 'style':("border: 1px solid " + (view.teamColor) + "; background: " + (view.teamBackgroundColor) + ""), "class": [('my-team-icon'),('img-circle'),('only-one')] }, {"src":true,"style":true})) + "/><img" + (jade.attrs({ 'src':(view.challengers.medium.opponentImageSource||view.genericPortrait), "class": [('opponent-icon')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.otherTeam) + "_ladder_medium.png"), 'style':("border: 1px solid " + (view.opponentTeamColor) + "; background: " + (view.opponentTeamBackgroundColor) + ""), "class": [('opponent-team-icon'),('img-circle')] }, {"src":true,"style":true})) + "/><div class=\"my-name name-label only-one\"><span>" + (jade.escape(null == (jade.interp = view.myName) ? "" : jade.interp)) + "</span></div><div class=\"opponent-name name-label\"><span>" + (jade.escape(null == (jade.interp = view.challengers.medium.opponentName) ? "" : jade.interp)) + "</span>");
if ( view.challengers.medium.codeLanguage)
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (view.challengers.medium.codeLanguage) + "_small.png)"), "class": [('code-language')] }, {"style":true})) + "></span>");
}
buf.push("</div><div class=\"difficulty\"><span data-i18n=\"general.medium\">Medium</span></div></div></a>");
}
if ( view.challengers && view.challengers.hard)
{
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (view.levelID) + "?team=" + (view.team) + "&opponent=" + (view.challengers.hard.sessionID) + "" + (view.options.league ? "&league=" + view.options.league.id : "")) }, {"href":true})) + "><div class=\"play-option hard-option\"><img" + (jade.attrs({ 'src':(view.myPortrait), "class": [('my-icon'),('only-one')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.team) + "_ladder_hard.png"), 'style':("border: 1px solid " + (view.teamColor) + "; background: " + (view.teamBackgroundColor) + ""), "class": [('my-team-icon'),('img-circle'),('only-one')] }, {"src":true,"style":true})) + "/><img" + (jade.attrs({ 'src':(view.challengers.hard.opponentImageSource||view.genericPortrait), "class": [('opponent-icon')] }, {"src":true})) + "/><img" + (jade.attrs({ 'src':("/images/pages/play/ladder/" + (view.otherTeam) + "_ladder_hard.png"), 'style':("border: 1px solid " + (view.opponentTeamColor) + "; background: " + (view.opponentTeamBackgroundColor) + ""), "class": [('opponent-team-icon'),('img-circle')] }, {"src":true,"style":true})) + "/><div class=\"my-name name-label only-one\"><span>" + (jade.escape(null == (jade.interp = view.myName) ? "" : jade.interp)) + "</span></div><div class=\"opponent-name name-label\"><span>" + (jade.escape(null == (jade.interp = view.challengers.hard.opponentName) ? "" : jade.interp)) + "</span>");
if ( view.challengers.hard.codeLanguage)
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (view.challengers.hard.codeLanguage) + "_small.png)"), "class": [('code-language')] }, {"style":true})) + "></span>");
}
buf.push("</div><div class=\"difficulty\"><span data-i18n=\"general.hard\">Hard</span></div></div></a>");
}
buf.push("</div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/ladder/play_modal.js.map
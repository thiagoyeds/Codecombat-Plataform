require.register("templates/play/modal/leaderboard-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),scoreType = locals_.scoreType,timespan = locals_.timespan,topScores = locals_.topScores,me = locals_.me,_ = locals_._,loading = locals_.loading;buf.push("<h1><span data-i18n=\"leaderboard.top_players\" class=\"spr\">Top Players by</span><span" + (jade.attrs({ 'data-i18n':("leaderboard." + (scoreType.replace('-', '_')) + "") }, {"data-i18n":true})) + "></span><span class=\"spr\">,</span><span" + (jade.attrs({ 'data-i18n':("leaderboard." + (timespan) + "") }, {"data-i18n":true})) + "></span></h1>");
if ( topScores)
{
buf.push("<table class=\"table table-bordered table-condensed table-hover\"><thead><tr><th colspan=\"4\" data-i18n=\"general.player\"></th><th data-i18n=\"general.score\"></th><th data-i18n=\"general.when\"></th><th></th></tr></thead><tbody>");
// iterate topScores
;(function(){
  var $$obj = topScores;
  if ('number' == typeof $$obj.length) {

    for (var rank = 0, $$l = $$obj.length; rank < $$l; rank++) {
      var row = $$obj[rank];

var isMyRow = row.creator == me.id
var viewable = rank >= 5 || me.isAdmin();
buf.push("<tr" + (jade.attrs({ 'data-player-id':(row.creator), 'data-session-id':(row.session), 'title':(viewable ? "View solution" : "Can't view top 5 solutions"), "class": [(isMyRow ? "success" : "" + (viewable ? " viewable" : ""))] }, {"class":true,"data-player-id":true,"data-session-id":true,"title":true})) + "><td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (row.codeLanguage) + "_small.png)"), 'title':(_.string.capitalize(row.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td><td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + (row.hero) + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = row.creatorName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = row.score) ? "" : jade.interp)) + "</td><td class=\"ago-cell\">" + (jade.escape(null == (jade.interp = row.ago) ? "" : jade.interp)) + "</td><td class=\"viewable-cell\">");
if ( viewable)
{
if ( (me.get('preferredLanguage', true) || 'en-US').substr(0, 2) == 'en')
{
buf.push("<div class=\"btn btn-xs btn-info\">Watch</div>");
}
else
{
buf.push("<div class=\"glyphicon glyphicon-eye-open\"></div>");
}
}
else
{
buf.push("<div class=\"glyphicon glyphicon-eye-close\"></div>");
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var rank in $$obj) {
      $$l++;      var row = $$obj[rank];

var isMyRow = row.creator == me.id
var viewable = rank >= 5 || me.isAdmin();
buf.push("<tr" + (jade.attrs({ 'data-player-id':(row.creator), 'data-session-id':(row.session), 'title':(viewable ? "View solution" : "Can't view top 5 solutions"), "class": [(isMyRow ? "success" : "" + (viewable ? " viewable" : ""))] }, {"class":true,"data-player-id":true,"data-session-id":true,"title":true})) + "><td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (row.codeLanguage) + "_small.png)"), 'title':(_.string.capitalize(row.codeLanguage)), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td><td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + (row.hero) + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = row.creatorName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = row.score) ? "" : jade.interp)) + "</td><td class=\"ago-cell\">" + (jade.escape(null == (jade.interp = row.ago) ? "" : jade.interp)) + "</td><td class=\"viewable-cell\">");
if ( viewable)
{
if ( (me.get('preferredLanguage', true) || 'en-US').substr(0, 2) == 'en')
{
buf.push("<div class=\"btn btn-xs btn-info\">Watch</div>");
}
else
{
buf.push("<div class=\"glyphicon glyphicon-eye-open\"></div>");
}
}
else
{
buf.push("<div class=\"glyphicon glyphicon-eye-close\"></div>");
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
else if ( loading)
{
buf.push("<h3 data-i18n=\"common.loading\"></h3>");
}
else
{
buf.push("<h3>No scores yet.</h3>");
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/leaderboard-tab-view.js.map
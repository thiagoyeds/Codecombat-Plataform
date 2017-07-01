require.register("templates/play/ladder/my_matches_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"row\">");
// iterate view.teams
;(function(){
  var $$obj = view.teams;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var team = $$obj[$index];

buf.push("<div class=\"matches-column col-md-6\"><table class=\"table table-bordered table-condensed my-matches-table\"><tr><th" + (jade.attrs({ 'colspan':(5), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><span data-i18n=\"ladder.summary_your\">Your </span>" + (jade.escape((jade.interp = team.displayName) == null ? '' : jade.interp)) + "\n <span data-i18n=\"ladder.summary_matches\">Matches - </span>" + (jade.escape((jade.interp = team.wins) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.summary_wins\"> Wins, </span>" + (jade.escape((jade.interp = team.losses) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.summary_losses\"> Losses </span></th></tr>");
if ( team.session)
{
buf.push("<tr><th colspan=\"5\"><div" + (jade.attrs({ 'data-session-id':(team.session.id), "class": [('ladder-submission-view')] }, {"data-session-id":true})) + "></div></th></tr>");
}
if ( team.scoreHistory)
{
buf.push("<tr><th" + (jade.attrs({ 'colspan':(5), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><div" + (jade.attrs({ 'data-team-name':(team.name), 'id':("score-chart-" + (team.name) + ""), "class": [("score-chart-wrapper")] }, {"class":true,"data-team-name":true,"id":true})) + "></div></th></tr>");
}
buf.push("<tr><th data-i18n=\"general.result\">Result</th><th></th><th data-i18n=\"general.opponent\">Opponent</th><th data-i18n=\"general.when\">When</th><th></th></tr>");
// iterate team.matches
;(function(){
  var $$obj = team.matches;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var match = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'title':(match.simulator), "class": [((match.stale ? "stale " : "") + (match.fresh ? "fresh " : "") + match.state)] }, {"class":true,"title":true})) + "><td class=\"state-cell\">");
if ( match.state === 'win')
{
buf.push("<span data-i18n=\"general.win\" class=\"win\">Win</span>");
}
if ( match.state === 'loss')
{
buf.push("<span data-i18n=\"general.loss\" class=\"loss\">Loss</span>");
}
if ( match.state === 'tie')
{
buf.push("<span data-i18n=\"general.tie\" class=\"tie\">Tie</span>");
}
buf.push("</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + match.codeLanguage +  "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td><td class=\"name-cell\">" + (jade.escape(null == (jade.interp = match.opponentName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"time-cell\">" + (jade.escape(null == (jade.interp = match.when) ? "" : jade.interp)) + "</td><td class=\"battle-cell\">");
var levelID = view.level.get('slug') || view.level.id
var league = view.options.league
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (levelID) + "?team=" + (team.id) + "&opponent=" + (match.sessionID) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + ">");
if ( (match.state === 'win'))
{
buf.push("<span data-i18n=\"ladder.watch_victory\">Watch your victory</span>");
}
else
{
buf.push("<span data-i18n=\"ladder.defeat_the\">Defeat the</span> \n" + (jade.escape((jade.interp = team.otherTeamDisplayName) == null ? '' : jade.interp)) + "");
}
buf.push("</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var match = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'title':(match.simulator), "class": [((match.stale ? "stale " : "") + (match.fresh ? "fresh " : "") + match.state)] }, {"class":true,"title":true})) + "><td class=\"state-cell\">");
if ( match.state === 'win')
{
buf.push("<span data-i18n=\"general.win\" class=\"win\">Win</span>");
}
if ( match.state === 'loss')
{
buf.push("<span data-i18n=\"general.loss\" class=\"loss\">Loss</span>");
}
if ( match.state === 'tie')
{
buf.push("<span data-i18n=\"general.tie\" class=\"tie\">Tie</span>");
}
buf.push("</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + match.codeLanguage +  "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td><td class=\"name-cell\">" + (jade.escape(null == (jade.interp = match.opponentName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"time-cell\">" + (jade.escape(null == (jade.interp = match.when) ? "" : jade.interp)) + "</td><td class=\"battle-cell\">");
var levelID = view.level.get('slug') || view.level.id
var league = view.options.league
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (levelID) + "?team=" + (team.id) + "&opponent=" + (match.sessionID) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + ">");
if ( (match.state === 'win'))
{
buf.push("<span data-i18n=\"ladder.watch_victory\">Watch your victory</span>");
}
else
{
buf.push("<span data-i18n=\"ladder.defeat_the\">Defeat the</span> \n" + (jade.escape((jade.interp = team.otherTeamDisplayName) == null ? '' : jade.interp)) + "");
}
buf.push("</a></td></tr>");
    }

  }
}).call(this);

if ( !team.matches.length)
{
buf.push("<tr>");
if ( team.isRanking)
{
buf.push("<td colspan=\"4\" class=\"alert alert-info\"><span data-i18n=\"ladder.code_being_simulated\">Your new code is being simulated by other players for ranking.\nThis will refresh as new matches come in.</span></td>");
}
else
{
buf.push("<td colspan=\"4\" class=\"alert alert-warning\"><span data-i18n=\"ladder.no_ranked_matches_pre\">No ranked matches for the</span>" + (jade.escape((jade.interp = team.name) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.no_ranked_matches_post\">team! Play against some competitors and then come back here to get your game ranked.</span></td>");
}
buf.push("</tr>");
}
buf.push("</table></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var team = $$obj[$index];

buf.push("<div class=\"matches-column col-md-6\"><table class=\"table table-bordered table-condensed my-matches-table\"><tr><th" + (jade.attrs({ 'colspan':(5), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><span data-i18n=\"ladder.summary_your\">Your </span>" + (jade.escape((jade.interp = team.displayName) == null ? '' : jade.interp)) + "\n <span data-i18n=\"ladder.summary_matches\">Matches - </span>" + (jade.escape((jade.interp = team.wins) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.summary_wins\"> Wins, </span>" + (jade.escape((jade.interp = team.losses) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.summary_losses\"> Losses </span></th></tr>");
if ( team.session)
{
buf.push("<tr><th colspan=\"5\"><div" + (jade.attrs({ 'data-session-id':(team.session.id), "class": [('ladder-submission-view')] }, {"data-session-id":true})) + "></div></th></tr>");
}
if ( team.scoreHistory)
{
buf.push("<tr><th" + (jade.attrs({ 'colspan':(5), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><div" + (jade.attrs({ 'data-team-name':(team.name), 'id':("score-chart-" + (team.name) + ""), "class": [("score-chart-wrapper")] }, {"class":true,"data-team-name":true,"id":true})) + "></div></th></tr>");
}
buf.push("<tr><th data-i18n=\"general.result\">Result</th><th></th><th data-i18n=\"general.opponent\">Opponent</th><th data-i18n=\"general.when\">When</th><th></th></tr>");
// iterate team.matches
;(function(){
  var $$obj = team.matches;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var match = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'title':(match.simulator), "class": [((match.stale ? "stale " : "") + (match.fresh ? "fresh " : "") + match.state)] }, {"class":true,"title":true})) + "><td class=\"state-cell\">");
if ( match.state === 'win')
{
buf.push("<span data-i18n=\"general.win\" class=\"win\">Win</span>");
}
if ( match.state === 'loss')
{
buf.push("<span data-i18n=\"general.loss\" class=\"loss\">Loss</span>");
}
if ( match.state === 'tie')
{
buf.push("<span data-i18n=\"general.tie\" class=\"tie\">Tie</span>");
}
buf.push("</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + match.codeLanguage +  "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td><td class=\"name-cell\">" + (jade.escape(null == (jade.interp = match.opponentName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"time-cell\">" + (jade.escape(null == (jade.interp = match.when) ? "" : jade.interp)) + "</td><td class=\"battle-cell\">");
var levelID = view.level.get('slug') || view.level.id
var league = view.options.league
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (levelID) + "?team=" + (team.id) + "&opponent=" + (match.sessionID) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + ">");
if ( (match.state === 'win'))
{
buf.push("<span data-i18n=\"ladder.watch_victory\">Watch your victory</span>");
}
else
{
buf.push("<span data-i18n=\"ladder.defeat_the\">Defeat the</span> \n" + (jade.escape((jade.interp = team.otherTeamDisplayName) == null ? '' : jade.interp)) + "");
}
buf.push("</a></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var match = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'title':(match.simulator), "class": [((match.stale ? "stale " : "") + (match.fresh ? "fresh " : "") + match.state)] }, {"class":true,"title":true})) + "><td class=\"state-cell\">");
if ( match.state === 'win')
{
buf.push("<span data-i18n=\"general.win\" class=\"win\">Win</span>");
}
if ( match.state === 'loss')
{
buf.push("<span data-i18n=\"general.loss\" class=\"loss\">Loss</span>");
}
if ( match.state === 'tie')
{
buf.push("<span data-i18n=\"general.tie\" class=\"tie\">Tie</span>");
}
buf.push("</td><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + match.codeLanguage +  "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td><td class=\"name-cell\">" + (jade.escape(null == (jade.interp = match.opponentName || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"time-cell\">" + (jade.escape(null == (jade.interp = match.when) ? "" : jade.interp)) + "</td><td class=\"battle-cell\">");
var levelID = view.level.get('slug') || view.level.id
var league = view.options.league
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (levelID) + "?team=" + (team.id) + "&opponent=" + (match.sessionID) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + ">");
if ( (match.state === 'win'))
{
buf.push("<span data-i18n=\"ladder.watch_victory\">Watch your victory</span>");
}
else
{
buf.push("<span data-i18n=\"ladder.defeat_the\">Defeat the</span> \n" + (jade.escape((jade.interp = team.otherTeamDisplayName) == null ? '' : jade.interp)) + "");
}
buf.push("</a></td></tr>");
    }

  }
}).call(this);

if ( !team.matches.length)
{
buf.push("<tr>");
if ( team.isRanking)
{
buf.push("<td colspan=\"4\" class=\"alert alert-info\"><span data-i18n=\"ladder.code_being_simulated\">Your new code is being simulated by other players for ranking.\nThis will refresh as new matches come in.</span></td>");
}
else
{
buf.push("<td colspan=\"4\" class=\"alert alert-warning\"><span data-i18n=\"ladder.no_ranked_matches_pre\">No ranked matches for the</span>" + (jade.escape((jade.interp = team.name) == null ? '' : jade.interp)) + "<span data-i18n=\"ladder.no_ranked_matches_post\">team! Play against some competitors and then come back here to get your game ranked.</span></td>");
}
buf.push("</tr>");
}
buf.push("</table></div>");
    }

  }
}).call(this);

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
//# sourceMappingURL=/javascripts/app/templates/play/ladder/my_matches_tab.js.map
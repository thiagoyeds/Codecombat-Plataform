require.register("templates/play/ladder/ladder-tab-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,_ = locals_._,moment = locals_.moment,onFacebook = locals_.onFacebook,onGPlus = locals_.onGPlus;var league = view.options.league
buf.push("<div class=\"row\">");
// iterate view.teams
;(function(){
  var $$obj = view.teams;
  if ('number' == typeof $$obj.length) {

    for (var teamIndex = 0, $$l = $$obj.length; teamIndex < $$l; teamIndex++) {
      var team = $$obj[teamIndex];

buf.push("<div class=\"column col-md-6\"><div" + (jade.attrs({ 'id':("histogram-display-" + (team.name) + ""), 'data-team-name':(team.name), "class": [("histogram-display")] }, {"id":true,"class":true,"data-team-name":true})) + "></div><table" + (jade.attrs({ 'data-team':(team.id), "class": [('table'),('table-bordered'),('table-condensed'),('table-hover'),('ladder-table')] }, {"data-team":true})) + ">");
var levelType = view.level.get('type', true)
var topSessions = team.leaderboard.topPlayers.models;
var showJustTop = team.leaderboard.inTopSessions() || me.get('anonymous');
if(!showJustTop && topSessions.length == 20) topSessions = topSessions.slice(0, 10);
buf.push("<thead><tr><th" + (jade.attrs({ 'colspan':(levelType == 'hero-ladder' ? 3 : 2) }, {"colspan":true})) + "></th><th" + (jade.attrs({ 'colspan':(4), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><span>" + (jade.escape(null == (jade.interp = team.displayName) ? "" : jade.interp)) + "</span><span data-i18n=\"ladder.leaderboard\" class=\"spl\">Leaderboard</span></th></tr><tr><th" + (jade.attrs({ 'colspan':(levelType == 'hero-ladder' ? 3 : 2) }, {"colspan":true})) + "></th><th data-i18n=\"general.score\">Score</th><th data-i18n=\"general.name\" class=\"name-col-cell\">Name</th><th data-i18n=\"general.when\">When</th><th></th><th class=\"iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></th></tr></thead><tbody>         ");
// iterate topSessions
;(function(){
  var $$obj = topSessions;
  if ('number' == typeof $$obj.length) {

    for (var rank = 0, $$l = $$obj.length; rank < $$l; rank++) {
      var session = $$obj[rank];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues') || [], {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), 'title':(view.capitalize(session.get('submittedCodeLanguage'))), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var rank in $$obj) {
      $$l++;      var session = $$obj[rank];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues') || [], {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), 'title':(view.capitalize(session.get('submittedCodeLanguage'))), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  }
}).call(this);

if ( !showJustTop && team.leaderboard.nearbySessions().length)
{
buf.push("<tr class=\"active\"><td colspan=\"4\" class=\"ellipsis-row\">...</td></tr>");
// iterate team.leaderboard.nearbySessions()
;(function(){
  var $$obj = team.leaderboard.nearbySessions();
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var session = $$obj[$index];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues'), {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = session.rank) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var session = $$obj[$index];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues'), {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = session.rank) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  }
}).call(this);

}
buf.push("</tbody></table>");
if ( teamIndex == 1)
{
buf.push("<div data-i18n=\"editor.more\" class=\"btn btn-sm load-more-ladder-entries\">More</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var teamIndex in $$obj) {
      $$l++;      var team = $$obj[teamIndex];

buf.push("<div class=\"column col-md-6\"><div" + (jade.attrs({ 'id':("histogram-display-" + (team.name) + ""), 'data-team-name':(team.name), "class": [("histogram-display")] }, {"id":true,"class":true,"data-team-name":true})) + "></div><table" + (jade.attrs({ 'data-team':(team.id), "class": [('table'),('table-bordered'),('table-condensed'),('table-hover'),('ladder-table')] }, {"data-team":true})) + ">");
var levelType = view.level.get('type', true)
var topSessions = team.leaderboard.topPlayers.models;
var showJustTop = team.leaderboard.inTopSessions() || me.get('anonymous');
if(!showJustTop && topSessions.length == 20) topSessions = topSessions.slice(0, 10);
buf.push("<thead><tr><th" + (jade.attrs({ 'colspan':(levelType == 'hero-ladder' ? 3 : 2) }, {"colspan":true})) + "></th><th" + (jade.attrs({ 'colspan':(4), 'style':("color: " + (team.primaryColor) + "") }, {"colspan":true,"style":true})) + "><span>" + (jade.escape(null == (jade.interp = team.displayName) ? "" : jade.interp)) + "</span><span data-i18n=\"ladder.leaderboard\" class=\"spl\">Leaderboard</span></th></tr><tr><th" + (jade.attrs({ 'colspan':(levelType == 'hero-ladder' ? 3 : 2) }, {"colspan":true})) + "></th><th data-i18n=\"general.score\">Score</th><th data-i18n=\"general.name\" class=\"name-col-cell\">Name</th><th data-i18n=\"general.when\">When</th><th></th><th class=\"iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></th></tr></thead><tbody>         ");
// iterate topSessions
;(function(){
  var $$obj = topSessions;
  if ('number' == typeof $$obj.length) {

    for (var rank = 0, $$l = $$obj.length; rank < $$l; rank++) {
      var session = $$obj[rank];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues') || [], {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), 'title':(view.capitalize(session.get('submittedCodeLanguage'))), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var rank in $$obj) {
      $$l++;      var session = $$obj[rank];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues') || [], {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), 'title':(view.capitalize(session.get('submittedCodeLanguage'))), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  }
}).call(this);

if ( !showJustTop && team.leaderboard.nearbySessions().length)
{
buf.push("<tr class=\"active\"><td colspan=\"4\" class=\"ellipsis-row\">...</td></tr>");
// iterate team.leaderboard.nearbySessions()
;(function(){
  var $$obj = team.leaderboard.nearbySessions();
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var session = $$obj[$index];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues'), {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = session.rank) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var session = $$obj[$index];

var myRow = session.get('creator') == me.id
var sessionStats = league ? (_.find(session.get('leagues'), {leagueID: league.id}) || {}).stats || {} : session.attributes;
buf.push("<tr" + (jade.attrs({ 'data-player-id':(session.get('creator')), 'data-session-id':(session.id), "class": [(myRow ? "success" : "")] }, {"class":true,"data-player-id":true,"data-session-id":true})) + "><td" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + session.get('submittedCodeLanguage') + "_icon.png)"), "class": [('code-language-cell')] }, {"style":true})) + "></td>");
if ( levelType == 'hero-ladder')
{
buf.push("<td" + (jade.attrs({ 'style':("background-image: url(/file/db/thang.type/" + ((session.get('heroConfig') || {}).thangType || '529ffbf1cf1818f2be000001') + "/portrait.png)"), "class": [('hero-portrait-cell')] }, {"style":true})) + "></td>");
}
buf.push("<td class=\"rank-cell\">" + (jade.escape(null == (jade.interp = session.rank) ? "" : jade.interp)) + "</td><td class=\"score-cell\">" + (jade.escape(null == (jade.interp = Math.round((sessionStats.totalScore || session.get('totalScore') / 2) * 100)) ? "" : jade.interp)) + "</td><td" + (jade.attrs({ "class": [('name-col-cell' + ((new RegExp('(Simple|Shaman|Brawler|Chieftain|Thoktar) CPU')).test(session.get('creatorName')) ? ' ai' : ''))] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = session.get('creatorName') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"age-cell\">" + (jade.escape(null == (jade.interp = moment(session.get('submitDate')).fromNow().replace('a few ', '')) ? "" : jade.interp)) + "</td><td class=\"fight-cell\"><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "?team=" + (team.otherTeam) + "&opponent=" + (session.id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></td><td class=\"spectate-cell iconic-cell\"><div class=\"glyphicon glyphicon-eye-open\"></div></td></tr>");
    }

  }
}).call(this);

}
buf.push("</tbody></table>");
if ( teamIndex == 1)
{
buf.push("<div data-i18n=\"editor.more\" class=\"btn btn-sm load-more-ladder-entries\">More</div>");
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("<div class=\"column col-md-4 secret\"><h4 data-i18n=\"ladder.friends_playing\" class=\"friends-header\">Friends Playing</h4>");
if ( me.get('anonymous'))
{
buf.push("<div class=\"alert alert-info\"><a data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\" data-i18n=\"ladder.log_in_for_friends\">Log in to play with your friends!</a></div>");
}
else
{
if ( !onFacebook || !onGPlus)
{
buf.push("<div class=\"connect-buttons\"><span data-i18n=\"ladder.social_connect_blurb\">Connect and play against your friends!</span><br/>");
if ( !onFacebook)
{
buf.push("<button data-i18n=\"community.facebook\" class=\"btn btn-sm connect-facebook\">Facebook</button>");
}
if ( !onGPlus)
{
buf.push("<button data-i18n=\"community.gplus\" class=\"btn btn-sm connect-google-plus\">Google+</button>");
}
buf.push("</div>");
}
if ( view.friends)
{
// iterate view.friends
;(function(){
  var $$obj = view.friends;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var friend = $$obj[$index];

buf.push("<p class=\"friend-entry\"><img" + (jade.attrs({ 'src':(friend.imageSource), "class": [('img-thumbnail')] }, {"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = friend.creatorName + ' (' + friend.name + ')') ? "" : jade.interp)) + "</span><br/><span>" + (jade.escape(null == (jade.interp = Math.round(friend.totalScore * 100)) ? "" : jade.interp)) + "</span><span>: </span><span>" + (jade.escape(null == (jade.interp = friend.team) ? "" : jade.interp)) + "</span><br/><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "/?team=" + (friend.otherTeam) + "&opponent=" + (friend._id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var friend = $$obj[$index];

buf.push("<p class=\"friend-entry\"><img" + (jade.attrs({ 'src':(friend.imageSource), "class": [('img-thumbnail')] }, {"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = friend.creatorName + ' (' + friend.name + ')') ? "" : jade.interp)) + "</span><br/><span>" + (jade.escape(null == (jade.interp = Math.round(friend.totalScore * 100)) ? "" : jade.interp)) + "</span><span>: </span><span>" + (jade.escape(null == (jade.interp = friend.team) ? "" : jade.interp)) + "</span><br/><a" + (jade.attrs({ 'href':("/play/level/" + (view.level.get('slug') || view.level.id) + "/?team=" + (friend.otherTeam) + "&opponent=" + (friend._id) + "" + (league ? "&league=" + league.id : "")) }, {"href":true})) + "><span data-i18n=\"ladder.fight\">Fight!</span></a></p>");
    }

  }
}).call(this);

}
else if ( onFacebook || onGPlus)
{
buf.push("<p data-i18n=\"ladder.invite_friends_to_battle\">Invite your friends to join you in battle!</p>");
}
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
//# sourceMappingURL=/javascripts/app/templates/play/ladder/ladder-tab-view.js.map
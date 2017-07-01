require.register("templates/play/ladder/simulate_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<p id=\"simulation-status-text\">");
if ( view.simulationStatus)
{
buf.push("" + (jade.escape((jade.interp = view.simulationStatus) == null ? '' : jade.interp)) + "");
}
else
{
buf.push("<span data-i18n=\"ladder.simulation_explanation\">By simulating games you can get your game ranked faster!</span><span data-i18n=\"ladder.simulation_explanation_leagues\" class=\"spl\">You will mainly help simulate games for allied players in your clans and courses.</span>");
}
buf.push("</p><p><button data-i18n=\"ladder.simulate_games\" id=\"simulate-button\" class=\"btn btn-warning btn-lg highlight\">Simulate Games!</button></p><p class=\"simulation-count\"><span data-i18n=\"ladder.games_simulated_by\" class=\"spr\">Games simulated by you:</span><span id=\"simulated-by-you\">" + (jade.escape(null == (jade.interp = me.get('simulatedBy') || 0) ? "" : jade.interp)) + "</span></p><!--p.simulation-count--><!--  span.spr(data-i18n=\"ladder.games_simulated_for\") Games simulated for you:--><!--  span#simulated-for-you= me.get('simulatedFor') || 0--><!--p.simulation-count--><!--  span.spr(data-i18n=\"ladder.games_in_queue\") Games currently in the queue:--><!--  span#games-in-queue= view.simulatorsLeaderboardData.numberOfGamesInQueue || 0-->");
if ( view.simulatorsLeaderboardData)
{
var topSimulators = view.simulatorsLeaderboardData.topSimulators.models;
var showJustTop = view.simulatorsLeaderboardData.inTopSimulators() || me.get('anonymous');
if(!showJustTop) topSimulators = topSimulators.slice(0, 10);
buf.push("<table class=\"table table-bordered table-condensed table-hover\"><thead><tr><th></th><th data-i18n=\"general.player\" class=\"name-col-cell\">Player</th><th data-i18n=\"ladder.games_simulated\">Games simulated</th><!--th(data-i18n=\"ladder.games_played\") Games played--><!--th(data-i18n=\"ladder.ratio\") Ratio--></tr></thead><tbody>");
// iterate topSimulators
;(function(){
  var $$obj = topSimulators;
  if ('number' == typeof $$obj.length) {

    for (var rank = 0, $$l = $$obj.length; rank < $$l; rank++) {
      var user = $$obj[rank];

var myRow = user.id == me.id
buf.push("<tr" + (jade.attrs({ "class": [(myRow ? "success" : "")] }, {"class":true})) + "><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = user.get('name') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.get('simulatedBy')) ? "" : jade.interp)) + "</td><!--td.simulator-leaderboard-cell= user.get('simulatedFor')--><!--td.simulator-leaderboard-cell= Math.round((user.get('simulatedBy') / user.get('simulatedFor')) * 10) / 10--></tr>");
    }

  } else {
    var $$l = 0;
    for (var rank in $$obj) {
      $$l++;      var user = $$obj[rank];

var myRow = user.id == me.id
buf.push("<tr" + (jade.attrs({ "class": [(myRow ? "success" : "")] }, {"class":true})) + "><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = rank + 1) ? "" : jade.interp)) + "</td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = user.get('name') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.get('simulatedBy')) ? "" : jade.interp)) + "</td><!--td.simulator-leaderboard-cell= user.get('simulatedFor')--><!--td.simulator-leaderboard-cell= Math.round((user.get('simulatedBy') / user.get('simulatedFor')) * 10) / 10--></tr>");
    }

  }
}).call(this);

var nearbySimulators = view.simulatorsLeaderboardData.nearbySimulators()
if ( !showJustTop && nearbySimulators)
{
buf.push("<tr class=\"active\"><td colspan=\"5\" class=\"ellipsis-row\">...</td></tr>");
// iterate nearbySimulators
;(function(){
  var $$obj = nearbySimulators;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var user = $$obj[$index];

var myRow = user.id == me.id
var ratio = user.get('simulatedBy') / user.get('simulatedFor');
buf.push("<tr" + (jade.attrs({ "class": [(myRow ? "success" : "")] }, {"class":true})) + "><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.rank) ? "" : jade.interp)) + "</td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = user.get('name') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.get('simulatedBy')) ? "" : jade.interp)) + "</td><!--td.simulator-leaderboard-cell= user.get('simulatedFor')--><!--td.simulator-leaderboard-cell= _.isNaN(ratio) || ratio == Infinity ? '' : ratio.toFixed(1)--></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var user = $$obj[$index];

var myRow = user.id == me.id
var ratio = user.get('simulatedBy') / user.get('simulatedFor');
buf.push("<tr" + (jade.attrs({ "class": [(myRow ? "success" : "")] }, {"class":true})) + "><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.rank) ? "" : jade.interp)) + "</td><td class=\"name-col-cell\">" + (jade.escape(null == (jade.interp = user.get('name') || "Anonymous") ? "" : jade.interp)) + "</td><td class=\"simulator-leaderboard-cell\">" + (jade.escape(null == (jade.interp = user.get('simulatedBy')) ? "" : jade.interp)) + "</td><!--td.simulator-leaderboard-cell= user.get('simulatedFor')--><!--td.simulator-leaderboard-cell= _.isNaN(ratio) || ratio == Infinity ? '' : ratio.toFixed(1)--></tr>");
    }

  }
}).call(this);

}
buf.push("</tbody></table>");
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
//# sourceMappingURL=/javascripts/app/templates/play/ladder/simulate_tab.js.map
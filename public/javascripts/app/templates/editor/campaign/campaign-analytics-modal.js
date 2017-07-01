require.register("templates/editor/campaign/campaign-analytics-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,campaignCompletions = locals_.campaignCompletions,showLeftGame = locals_.showLeftGame,showSubscriptions = locals_.showSubscriptions;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3>Campaign Analytics</h3>");
if ( campaignCompletions.startDay && campaignCompletions.endDay)
{
buf.push("<div class=\"input-group input-group-sm\"><input" + (jade.attrs({ 'id':('input-startday'), 'type':('text'), 'style':('width:100px;'), 'value':(campaignCompletions.startDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><input" + (jade.attrs({ 'id':('input-endday'), 'type':('text'), 'style':('width:100px;'), 'value':(campaignCompletions.endDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><button id=\"reload-button\" style=\"margin-left:10px;\" class=\"btn btn-default btn-sm\">Reload</button></div>");
}
buf.push("<label style=\"font-size:10px;font-weight:normal;\"><span>Double-click row to open level details.</span><span>&nbsp;&nbsp;</span><input" + (jade.attrs({ 'id':('option-show-left-game'), 'type':('checkbox'), 'checked':(showLeftGame) }, {"type":true,"checked":true})) + "/><span>Show Left Game</span><span>&nbsp;&nbsp;</span><input" + (jade.attrs({ 'id':('option-show-subscriptions'), 'type':('checkbox'), 'checked':(showSubscriptions) }, {"type":true,"checked":true})) + "/><span>Show Subscriptions</span></label></div><div class=\"modal-body\">");
if ( campaignCompletions && campaignCompletions.levels)
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td class=\"level\">Level</td><td>Started</td><td>Finished</td><td class=\"completion-rate\">Completion %</td><td>Playtime (s)</td>");
if ( showLeftGame)
{
buf.push("<td>Left Game</td><td>LG %</td><td>LG/s</td>");
}
if ( showSubscriptions)
{
buf.push("<td>Sub Shown</td><td>Sub Purchased</td>");
}
buf.push("</tr></thead><tbody>");
for (var i = 0; i < campaignCompletions.levels.length; i++)
{
buf.push("<tr" + (jade.attrs({ 'data-level-slug':(campaignCompletions.levels[i].level), "class": [('level')] }, {"data-level-slug":true})) + "><td class=\"level-name-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].level) ? "" : jade.interp)) + "<span" + (jade.attrs({ 'style':("width:" + (campaignCompletions.levels[i].usersRemaining || 0) + "%;"), "class": [('level-name-background')] }, {"style":true})) + "></span></td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].finished) ? "" : jade.interp)) + "</td>");
if ( campaignCompletions.levels[i].completionRate)
{
if ( campaignCompletions.top3 && campaignCompletions.top3.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:lightblue;\" class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
else if ( campaignCompletions.bottom3 && campaignCompletions.bottom3.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\" class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
else
{
buf.push("<td class=\"level-completion-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].completionRate.toFixed(2)) ? "" : jade.interp)) + "<svg" + (jade.attrs({ 'id':("background" + (campaignCompletions.levels[i].level) + ""), "class": [('level-completion-background')] }, {"id":true})) + "></svg></td>");
}
}
else
{
buf.push("<td class=\"completion-rate\"></td>");
}
if ( campaignCompletions.levels[i].averagePlaytime)
{
buf.push("<td class=\"level-playtime-container\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].averagePlaytime.toFixed(2)) ? "" : jade.interp)) + "<span" + (jade.attrs({ 'style':("width:" + (campaignCompletions.levels[i].playtimePercentage || 0) + "%;"), "class": [('level-playtime-background')] }, {"style":true})) + "></span></td>");
}
else
{
buf.push("<td></td>");
}
if ( showLeftGame)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropped) ? "" : jade.interp)) + "</td>");
if ( campaignCompletions.levels[i].dropPercentage)
{
if ( campaignCompletions.top3DropPercentage && campaignCompletions.top3DropPercentage.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropPercentage.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].dropPercentage.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
}
else
{
buf.push("<td></td>");
}
if ( campaignCompletions.levels[i].droppedPerSecond)
{
if ( campaignCompletions.top3DropPerSecond && campaignCompletions.top3DropPerSecond.indexOf(campaignCompletions.levels[i].level) >= 0)
{
buf.push("<td style=\"background-color:pink;\">" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].droppedPerSecond.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].droppedPerSecond.toFixed(2)) ? "" : jade.interp)) + "</td>");
}
}
else
{
buf.push("<td></td>");
}
}
if ( showSubscriptions)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].subsShown) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = campaignCompletions.levels[i].subsPurchased) ? "" : jade.interp)) + "</td>");
}
buf.push("</tr>");
}
buf.push("</tbody></table>");
}
else
{
buf.push("<div>Loading...</div>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/campaign/campaign-analytics-modal.js.map
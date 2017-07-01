require.register("templates/editor/campaign/campaign-level-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),level = locals_.level,analytics = locals_.analytics;buf.push("<div class=\"jumbotron\"><div type=\"button\" aria-hidden=\"true\" class=\"button close\">&times;</div><h1><span class=\"spr\">" + (jade.escape(null == (jade.interp = level.get('name')) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/editor/level/" + (level.get('slug')) + ""), 'target':("_blank") }, {"href":true,"target":true})) + ">(edit)</a></h1><p>" + (jade.escape(null == (jade.interp = level.get('description')) ? "" : jade.interp)) + "</p>");
if ( analytics.startDay && analytics.endDay)
{
buf.push("<div class=\"input-group input-group-sm\"><input" + (jade.attrs({ 'id':('input-startday'), 'type':('text'), 'style':('width:100px;'), 'value':(analytics.startDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><input" + (jade.attrs({ 'id':('input-endday'), 'type':('text'), 'style':('width:100px;'), 'value':(analytics.endDay), "class": [('form-control')] }, {"type":true,"style":true,"value":true})) + "/><button id=\"reload-button\" style=\"margin-left:10px;\" class=\"btn btn-default btn-sm\">Reload</button></div>");
}
// iterate analytics.graphs
;(function(){
  var $$obj = analytics.graphs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var graph = $$obj[$index];

// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  }
}).call(this);

buf.push("<div class=\"line-graph-container\">");
// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var graph = $$obj[$index];

// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<label class=\"line-graph-label\"><input" + (jade.attrs({ 'data-lineid':("" + (line.lineID) + ""), 'type':('checkbox'), 'checked':(line.enabled), "class": [('line-graph-checkbox')] }, {"data-lineid":true,"type":true,"checked":true})) + "/><span>" + (jade.escape((jade.interp = line.description) == null ? '' : jade.interp)) + "</span><span>&nbsp;&nbsp;</span></label>");
    }

  }
}).call(this);

buf.push("<div class=\"line-graph-container\">");
// iterate graph.lines
;(function(){
  var $$obj = graph.lines;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

// iterate line.points
;(function(){
  var $$obj = line.points;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var point = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-pointid':("" + (point.pointID) + ""), "class": [('graph-point-info-container')] }, {"data-pointid":true})) + "><div style=\"font-weight:bold;\">" + (jade.escape((jade.interp = point.day) == null ? '' : jade.interp)) + "</div>");
// iterate point.values
;(function(){
  var $$obj = point.values;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var value = $$obj[$index];

buf.push("<div>" + (jade.escape((jade.interp = value) == null ? '' : jade.interp)) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

buf.push("<h4>Common Problems</h4>");
if ( analytics.commonProblems.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Language</td><td>Error Message</td><td>Error Hint</td><td>Count</td></tr></thead><tbody>");
for (var i = 0; i < analytics.commonProblems.data.length && i < 20; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].language) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].message) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].hint) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.commonProblems.data[i].count) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Recent Sessions</h4>");
if ( analytics.recentSessions.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<div style=\"font-size:10pt\">Latest " + (jade.escape((jade.interp = analytics.recentSessions.data.length) == null ? '' : jade.interp)) + " sessions for this level</div><div style=\"font-size:10pt\">Double-click row to open player and session</div><table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Session ID</td><td>Player</td><td>Code Language</td><td>Playtime</td><td>Complete</td><td>Changed</td><td>Replay</td></tr></thead><tbody>");
for (var i = 0; i < analytics.recentSessions.data.length; i++)
{
buf.push("<tr" + (jade.attrs({ 'data-player-id':(analytics.recentSessions.data[i].creator), 'data-session-id':(analytics.recentSessions.data[i]._id), "class": [('recent-session')] }, {"data-player-id":true,"data-session-id":true})) + "><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i]._id) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].creatorName || analytics.recentSessions.data[i].creator) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].codeLanguage) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].playtime) ? "" : jade.interp)) + "</td>");
if ( analytics.recentSessions.data[i].state && analytics.recentSessions.data[i].state.complete)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].state.complete) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td>false</td>");
}
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.recentSessions.data[i].changed) ? "" : jade.interp)) + "</td><td><button class=\"btn replay-button btn-xs\"><div class=\"glyphicon glyphicon-eye-open\"></div></button></td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Completion Rates</h4>");
if ( analytics.levelCompletions.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Date</td><td>Started</td><td>Finished</td><td>Completion %</td>");
if ( analytics.levelHelps.data.length === analytics.levelCompletions.data.length)
{
buf.push("<td>Helps Clicked</td><td>Helps / Started</td><td>Help Videos</td><td>Videos / Started</td>");
}
buf.push("</tr></thead><tbody>");
for (var i = 0; i < analytics.levelCompletions.data.length; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].created) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].started) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].finished) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelCompletions.data[i].rate) ? "" : jade.interp)) + "</td>");
if ( analytics.levelHelps.data.length === analytics.levelCompletions.data.length && analytics.levelCompletions.data[i].created == analytics.levelHelps.data[i].day)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = analytics.levelHelps.data[i].alertHelps + analytics.levelHelps.data[i].paletteHelps) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = ((analytics.levelHelps.data[i].alertHelps + analytics.levelHelps.data[i].paletteHelps) / analytics.levelCompletions.data[i].started).toFixed(2)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelHelps.data[i].videoStarts) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = (analytics.levelHelps.data[i].videoStarts / analytics.levelCompletions.data[i].started).toFixed(2)) ? "" : jade.interp)) + "</td>");
}
buf.push("</tr>");
}
buf.push("</tbody></table>");
}
buf.push("<h4>Average Playtimes</h4>");
if ( analytics.levelPlaytimes.loading)
{
buf.push("<div>Loading...</div>");
}
else
{
buf.push("<table style=\"font-size:10pt\" class=\"table table-bordered table-condensed table-hover\"><thead><tr><td>Date</td><td>Average (s)</td></tr></thead><tbody>");
for (var i = 0; i < analytics.levelPlaytimes.data.length; i++)
{
buf.push("<tr><td>" + (jade.escape(null == (jade.interp = analytics.levelPlaytimes.data[i].created) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = analytics.levelPlaytimes.data[i].average.toFixed(2)) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</tbody></table>");
}
buf.push("</div>");
if ( level.get('tasks'))
{
buf.push("<div class=\"tasks\"><h3>Tasks (read only)</h3><ul class=\"list-unstyled\">");
// iterate level.get('tasks')
;(function(){
  var $$obj = level.get('tasks');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var task = $$obj[$index];

buf.push("<li><input" + (jade.attrs({ 'type':('checkbox'), 'checked':(task.complete) }, {"type":true,"checked":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var task = $$obj[$index];

buf.push("<li><input" + (jade.attrs({ 'type':('checkbox'), 'checked':(task.complete) }, {"type":true,"checked":true})) + "/><span class=\"spl\">" + (jade.escape(null == (jade.interp = task.name) ? "" : jade.interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul></div>");
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
//# sourceMappingURL=/javascripts/app/templates/editor/campaign/campaign-level-view.js.map
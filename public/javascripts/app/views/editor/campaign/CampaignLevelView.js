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

;require.register("views/editor/campaign/CampaignLevelView", function(exports, require, module) {
var CampaignLevelView, CocoView, Level, LevelSession, ModelModal, User, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

ModelModal = require('views/modal/ModelModal');

User = require('models/User');

utils = require('core/utils');

module.exports = CampaignLevelView = (function(superClass) {
  extend(CampaignLevelView, superClass);

  CampaignLevelView.prototype.id = 'campaign-level-view';

  CampaignLevelView.prototype.template = require('templates/editor/campaign/campaign-level-view');

  CampaignLevelView.prototype.events = {
    'change .line-graph-checkbox': 'updateGraphCheckbox',
    'click .close': 'onClickClose',
    'click #reload-button': 'onClickReloadButton',
    'dblclick .recent-session': 'onDblClickRecentSession',
    'mouseenter .graph-point': 'onMouseEnterPoint',
    'mouseleave .graph-point': 'onMouseLeavePoint',
    'click .replay-button': 'onClickReplay'
  };

  function CampaignLevelView(options, level) {
    this.level = level;
    this.getAnalytics = bind(this.getAnalytics, this);
    this.onClickReloadButton = bind(this.onClickReloadButton, this);
    CampaignLevelView.__super__.constructor.call(this, options);
    this.fullLevel = new Level({
      _id: this.level.id
    });
    this.fullLevel.fetch();
    this.listenToOnce(this.fullLevel, 'sync', (function(_this) {
      return function() {
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.levelSlug = this.level.get('slug');
    this.getAnalytics();
  }

  CampaignLevelView.prototype.getRenderData = function() {
    var c;
    c = CampaignLevelView.__super__.getRenderData.call(this);
    c.level = this.fullLevel.loaded ? this.fullLevel : this.level;
    c.analytics = this.analytics;
    return c;
  };

  CampaignLevelView.prototype.afterRender = function() {
    CampaignLevelView.__super__.afterRender.call(this);
    $("#input-startday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    $("#input-endday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    return this.updateAnalyticsGraphs();
  };

  CampaignLevelView.prototype.updateGraphCheckbox = function(e) {
    var checked, graph, j, k, len, len1, line, lineID, ref, ref1;
    lineID = $(e.target).data('lineid');
    checked = $(e.target).prop('checked');
    ref = this.analytics.graphs;
    for (j = 0, len = ref.length; j < len; j++) {
      graph = ref[j];
      ref1 = graph.lines;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        line = ref1[k];
        if (line.lineID === lineID) {
          line.enabled = checked;
          return this.render();
        }
      }
    }
  };

  CampaignLevelView.prototype.onClickClose = function() {
    this.$el.addClass('hidden');
    return this.trigger('hidden');
  };

  CampaignLevelView.prototype.onClickReloadButton = function() {
    var endDay, startDay;
    startDay = $('#input-startday').val();
    endDay = $('#input-endday').val();
    return this.getAnalytics(startDay, endDay);
  };

  CampaignLevelView.prototype.onDblClickRecentSession = function(e) {
    var player, row, session;
    if (!me.isAdmin()) {
      return;
    }
    row = $(e.target).parent();
    player = new User({
      _id: row.data('player-id')
    });
    session = new LevelSession({
      _id: row.data('session-id')
    });
    return this.openModalView(new ModelModal({
      models: [session, player]
    }));
  };

  CampaignLevelView.prototype.onMouseEnterPoint = function(e) {
    var container, height, margin, pointID, width;
    pointID = $(e.target).data('pointid');
    container = this.$el.find(".graph-point-info-container[data-pointid=" + pointID + "]").show();
    margin = 20;
    width = container.outerWidth();
    height = container.outerHeight();
    container.css('left', e.offsetX - width / 2);
    return container.css('top', e.offsetY - height - margin);
  };

  CampaignLevelView.prototype.onMouseLeavePoint = function(e) {
    var pointID;
    pointID = $(e.target).data('pointid');
    return this.$el.find(".graph-point-info-container[data-pointid=" + pointID + "]").hide();
  };

  CampaignLevelView.prototype.onClickReplay = function(e) {
    var sessionID, url;
    sessionID = $(e.target).closest('tr').data('session-id');
    url = "/play/level/" + (this.level.get('slug')) + "?session=" + sessionID + "&observing=true";
    return window.open(url, '_blank');
  };

  CampaignLevelView.prototype.updateAnalyticsGraphData = function() {
    var avg, clickRate, completionLineID, currentDate, currentDay, currentIndex, day, dayStartedMap, days, helpCount, helpPoints, helpsLineID, i, j, k, l, lastDay, len, len1, len2, len3, len4, len5, len6, len7, len8, levelPoints, lineMetadata, m, n, o, p, playtimeLineID, playtimePoints, q, r, rate, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref3, ref4, ref5, ref6, ref7, ref8, ref9, started, videoPoints, videoRate, videosLineID;
    this.analytics.graphs = [
      {
        graphID: 'level-completions',
        lines: []
      }
    ];
    completionLineID = 'level-completions';
    playtimeLineID = 'level-playtime';
    helpsLineID = 'helps-clicked';
    videosLineID = 'help-videos';
    lineMetadata = {};
    lineMetadata[completionLineID] = {
      description: 'Level Completion (%)',
      color: 'red'
    };
    lineMetadata[playtimeLineID] = {
      description: 'Average Playtime (s)',
      color: 'green'
    };
    lineMetadata[helpsLineID] = {
      description: 'Help click rate (%)',
      color: 'blue'
    };
    lineMetadata[videosLineID] = {
      description: 'Help video rate (%)',
      color: 'purple'
    };
    days = {};
    if (((ref = this.analytics) != null ? (ref1 = ref.levelCompletions) != null ? ref1.data : void 0 : void 0) != null) {
      ref2 = this.analytics.levelCompletions.data;
      for (j = 0, len = ref2.length; j < len; j++) {
        day = ref2[j];
        days[day.created.slice(0, 4) + "-" + day.created.slice(4, 6) + "-" + day.created.slice(6, 8)] = true;
      }
    }
    if (((ref3 = this.analytics) != null ? (ref4 = ref3.levelPlaytimes) != null ? ref4.data : void 0 : void 0) != null) {
      ref5 = this.analytics.levelPlaytimes.data;
      for (k = 0, len1 = ref5.length; k < len1; k++) {
        day = ref5[k];
        days[day.created] = true;
      }
    }
    if (((ref6 = this.analytics) != null ? (ref7 = ref6.levelHelps) != null ? ref7.data : void 0 : void 0) != null) {
      ref8 = this.analytics.levelHelps.data;
      for (l = 0, len2 = ref8.length; l < len2; l++) {
        day = ref8[l];
        days[day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8)] = true;
      }
    }
    days = Object.keys(days).sort(function(a, b) {
      if (a < b) {
        return -1;
      } else {
        return 1;
      }
    });
    if (days.length > 0) {
      currentIndex = 0;
      currentDay = days[currentIndex];
      currentDate = new Date(currentDay + "T00:00:00.000Z");
      lastDay = days[days.length - 1];
      while (currentDay !== lastDay) {
        if (days[currentIndex] !== currentDay) {
          days.splice(currentIndex, 0, currentDay);
        }
        currentIndex++;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        currentDay = currentDate.toISOString().substr(0, 10);
      }
    }
    dayStartedMap = {};
    if (((ref9 = this.analytics) != null ? (ref10 = ref9.levelCompletions) != null ? (ref11 = ref10.data) != null ? ref11.length : void 0 : void 0 : void 0) > 0) {
      levelPoints = [];
      ref12 = this.analytics.levelCompletions.data;
      for (i = m = 0, len3 = ref12.length; m < len3; i = ++m) {
        day = ref12[i];
        dayStartedMap[day.created] = day.started;
        rate = parseFloat(day.rate);
        levelPoints.push({
          x: i,
          y: rate,
          started: day.started,
          day: day.created.slice(0, 4) + "-" + day.created.slice(4, 6) + "-" + day.created.slice(6, 8),
          pointID: "" + completionLineID + i,
          values: ["Started: " + day.started, "Finished: " + day.finished, "Completion rate: " + (rate.toFixed(2)) + "%"]
        });
      }
      for (i = n = 0, len4 = days.length; n < len4; i = ++n) {
        day = days[i];
        if (levelPoints.length <= i || levelPoints[i].day !== day) {
          levelPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        levelPoints[i].x = i;
        levelPoints[i].pointID = "" + completionLineID + i;
      }
      this.analytics.graphs[0].lines.push({
        lineID: completionLineID,
        enabled: true,
        points: levelPoints,
        description: lineMetadata[completionLineID].description,
        lineColor: lineMetadata[completionLineID].color,
        min: 0,
        max: 100.0
      });
    }
    if (((ref13 = this.analytics) != null ? (ref14 = ref13.levelPlaytimes) != null ? (ref15 = ref14.data) != null ? ref15.length : void 0 : void 0 : void 0) > 0) {
      playtimePoints = [];
      ref16 = this.analytics.levelPlaytimes.data;
      for (i = o = 0, len5 = ref16.length; o < len5; i = ++o) {
        day = ref16[i];
        avg = parseFloat(day.average);
        playtimePoints.push({
          x: i,
          y: avg,
          day: day.created,
          pointID: "" + playtimeLineID + i,
          values: ["Average playtime: " + (avg.toFixed(2)) + "s"]
        });
      }
      for (i = p = 0, len6 = days.length; p < len6; i = ++p) {
        day = days[i];
        if (playtimePoints.length <= i || playtimePoints[i].day !== day) {
          playtimePoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        playtimePoints[i].x = i;
        playtimePoints[i].pointID = "" + playtimeLineID + i;
      }
      this.analytics.graphs[0].lines.push({
        lineID: playtimeLineID,
        enabled: true,
        points: playtimePoints,
        description: lineMetadata[playtimeLineID].description,
        lineColor: lineMetadata[playtimeLineID].color,
        min: 0,
        max: d3.max(playtimePoints, function(d) {
          return d.y;
        })
      });
    }
    if (((ref17 = this.analytics) != null ? (ref18 = ref17.levelHelps) != null ? (ref19 = ref18.data) != null ? ref19.length : void 0 : void 0 : void 0) > 0) {
      helpPoints = [];
      videoPoints = [];
      ref20 = this.analytics.levelHelps.data;
      for (i = q = 0, len7 = ref20.length; q < len7; i = ++q) {
        day = ref20[i];
        helpCount = day.alertHelps + day.paletteHelps;
        started = (ref21 = dayStartedMap[day.day]) != null ? ref21 : 0;
        clickRate = started > 0 ? helpCount / started * 100 : 0;
        videoRate = day.videoStarts / helpCount * 100;
        helpPoints.push({
          x: i,
          y: clickRate,
          day: day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8),
          pointID: "" + helpsLineID + i,
          values: ["Helps clicked: " + helpCount, "Helps click clickRate: " + (clickRate.toFixed(2)) + "%"]
        });
        videoPoints.push({
          x: i,
          y: videoRate,
          day: day.day.slice(0, 4) + "-" + day.day.slice(4, 6) + "-" + day.day.slice(6, 8),
          pointID: "" + videosLineID + i,
          values: ["Help videos started: " + day.videoStarts, "Help videos start rate: " + (videoRate.toFixed(2)) + "%"]
        });
      }
      for (i = r = 0, len8 = days.length; r < len8; i = ++r) {
        day = days[i];
        if (helpPoints.length <= i || helpPoints[i].day !== day) {
          helpPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        helpPoints[i].x = i;
        helpPoints[i].pointID = "" + helpsLineID + i;
        if (videoPoints.length <= i || videoPoints[i].day !== day) {
          videoPoints.splice(i, 0, {
            y: 0.0,
            day: day,
            values: []
          });
        }
        videoPoints[i].x = i;
        videoPoints[i].pointID = "" + videosLineID + i;
      }
      if (d3.max(helpPoints, function(d) {
        return d.y;
      }) > 0) {
        this.analytics.graphs[0].lines.push({
          lineID: helpsLineID,
          enabled: true,
          points: helpPoints,
          description: lineMetadata[helpsLineID].description,
          lineColor: lineMetadata[helpsLineID].color,
          min: 0,
          max: 100.0
        });
      }
      if (d3.max(videoPoints, function(d) {
        return d.y;
      }) > 0) {
        return this.analytics.graphs[0].lines.push({
          lineID: videosLineID,
          enabled: true,
          points: videoPoints,
          description: lineMetadata[videosLineID].description,
          lineColor: lineMetadata[videosLineID].color,
          min: 0,
          max: 100.0
        });
      }
    }
  };

  CampaignLevelView.prototype.updateAnalyticsGraphs = function() {
    var containerHeight, containerSelector, containerWidth, currentLine, d3line, endDay, graph, graphLineCount, height, j, keyHeight, len, line, margin, ref, ref1, ref2, results, startDay, svg, width, xAxis, xAxisHeight, xAxisRange, xRange, yAxis, yAxisRange, yAxisWidth, yRange;
    if (!(((ref = this.analytics) != null ? (ref1 = ref.graphs) != null ? ref1.length : void 0 : void 0) > 0)) {
      return;
    }
    containerSelector = '.line-graph-container';
    margin = 20;
    keyHeight = 20;
    xAxisHeight = 20;
    yAxisWidth = 40;
    containerWidth = $(containerSelector).width();
    containerHeight = $(containerSelector).height();
    ref2 = this.analytics.graphs;
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      graph = ref2[j];
      graphLineCount = _.reduce(graph.lines, (function(sum, item) {
        if (item.enabled) {
          return sum + 1;
        } else {
          return sum;
        }
      }), 0);
      svg = d3.select(containerSelector).append("svg").attr("width", containerWidth).attr("height", containerHeight);
      width = containerWidth - margin * 2 - yAxisWidth * graphLineCount;
      height = containerHeight - margin * 2 - xAxisHeight - keyHeight * graphLineCount;
      currentLine = 0;
      results.push((function() {
        var k, len1, ref3, results1;
        ref3 = graph.lines;
        results1 = [];
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          line = ref3[k];
          if (!line.enabled) {
            continue;
          }
          xRange = d3.scale.linear().range([0, width]).domain([
            d3.min(line.points, function(d) {
              return d.x;
            }), d3.max(line.points, function(d) {
              return d.x;
            })
          ]);
          yRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
          if (currentLine === 0) {
            startDay = new Date(line.points[0].day);
            endDay = new Date(line.points[line.points.length - 1].day);
            xAxisRange = d3.time.scale().domain([startDay, endDay]).range([0, width]);
            xAxis = d3.svg.axis().scale(xAxisRange);
            svg.append("g").attr("class", "x axis").call(xAxis).selectAll("text").attr("dy", ".35em").attr("transform", "translate(" + (margin + yAxisWidth * (graphLineCount - 1)) + "," + (height + margin) + ")").style("text-anchor", "start");
            svg.selectAll(".line").data([10, 30, 50, 70, 90]).enter().append("line").attr("x1", margin + yAxisWidth * graphLineCount).attr("y1", function(d) {
              return margin + yRange(d);
            }).attr("x2", margin + yAxisWidth * graphLineCount + width).attr("y2", function(d) {
              return margin + yRange(d);
            }).attr("stroke", line.lineColor).style("opacity", "0.5");
          }
          yAxisRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
          yAxis = d3.svg.axis().scale(yRange).orient("left");
          svg.append("g").attr("class", "y axis").attr("transform", "translate(" + (margin + yAxisWidth * currentLine) + "," + margin + ")").style("color", line.lineColor).call(yAxis).selectAll("text").attr("y", 0).attr("x", 0).attr("fill", line.lineColor).style("text-anchor", "start");
          svg.append("line").attr("x1", margin).attr("y1", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("x2", margin + 40).attr("y2", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("stroke", line.lineColor).attr("class", "key-line");
          svg.append("text").attr("x", margin + 40 + 10).attr("y", margin + height + xAxisHeight + keyHeight * currentLine + (keyHeight + 10) / 2).attr("fill", line.lineColor).attr("class", "key-text").text(line.description);
          svg.selectAll(".circle").data(line.points).enter().append("circle").attr("transform", "translate(" + (margin + yAxisWidth * graphLineCount) + "," + margin + ")").attr("cx", function(d) {
            return xRange(d.x);
          }).attr("cy", function(d) {
            return yRange(d.y);
          }).attr("r", function(d) {
            if (d.started) {
              return Math.max(3, Math.min(10, Math.log(parseInt(d.started)))) + 2;
            } else {
              return 6;
            }
          }).attr("fill", line.lineColor).attr("stroke-width", 1).attr("class", "graph-point").attr("data-pointid", function(d) {
            return "" + line.lineID + d.x;
          });
          d3line = d3.svg.line().x(function(d) {
            return xRange(d.x);
          }).y(function(d) {
            return yRange(d.y);
          }).interpolate("linear");
          svg.append("path").attr("d", d3line(line.points)).attr("transform", "translate(" + (margin + yAxisWidth * graphLineCount) + "," + margin + ")").style("stroke-width", 1).style("stroke", line.lineColor).style("fill", "none");
          results1.push(currentLine++);
        }
        return results1;
      })());
    }
    return results;
  };

  CampaignLevelView.prototype.getAnalytics = function(startDay, endDay) {
    var endDayDashed, makeFinishDataFetch, startDayDashed;
    if (startDay != null) {
      startDayDashed = startDay;
      startDay = startDay.replace(/-/g, '');
    } else {
      startDay = utils.getUTCDay(-14);
      startDayDashed = startDay.slice(0, 4) + "-" + startDay.slice(4, 6) + "-" + startDay.slice(6, 8);
    }
    if (endDay != null) {
      endDayDashed = endDay;
      endDay = endDay.replace(/-/g, '');
    } else {
      endDay = utils.getUTCDay(-1);
      endDayDashed = endDay.slice(0, 4) + "-" + endDay.slice(4, 6) + "-" + endDay.slice(6, 8);
    }
    this.analytics = {
      startDay: startDayDashed,
      endDay: endDayDashed,
      commonProblems: {
        data: [],
        loading: true
      },
      levelCompletions: {
        data: [],
        loading: true
      },
      levelHelps: {
        data: [],
        loading: true
      },
      levelPlaytimes: {
        data: [],
        loading: true
      },
      recentSessions: {
        data: [],
        loading: true
      },
      graphs: []
    };
    this.render();
    makeFinishDataFetch = (function(_this) {
      return function(data) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          _this.updateAnalyticsGraphData();
          data.loading = false;
          return _this.render();
        };
      };
    })(this);
    this.getCommonLevelProblems(startDayDashed, endDayDashed, makeFinishDataFetch(this.analytics.commonProblems));
    this.getLevelCompletions(startDay, endDay, makeFinishDataFetch(this.analytics.levelCompletions));
    this.getLevelHelps(startDay, endDay, makeFinishDataFetch(this.analytics.levelHelps));
    this.getLevelPlaytimes(startDayDashed, endDayDashed, makeFinishDataFetch(this.analytics.levelPlaytimes));
    return this.getRecentSessions(makeFinishDataFetch(this.analytics.recentSessions));
  };

  CampaignLevelView.prototype.getCommonLevelProblems = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.commonProblems.data = data;
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('common_problems', {
      url: '/db/user.code.problem/-/common_problems',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.levelSlug
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelCompletions = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        var mapFn;
        if (_this.destroyed) {
          return doneCallback();
        }
        data.sort(function(a, b) {
          if (a.created < b.created) {
            return -1;
          } else {
            return 1;
          }
        });
        mapFn = function(item) {
          item.rate = item.started > 0 ? item.finished / item.started * 100 : 0;
          return item;
        };
        _this.analytics.levelCompletions.data = _.map(data, mapFn, _this);
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_completions', {
      url: '/db/analytics_perday/-/level_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.levelSlug
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelHelps = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.levelHelps.data = data.sort(function(a, b) {
          if (a.day < b.day) {
            return -1;
          } else {
            return 1;
          }
        });
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_helps', {
      url: '/db/analytics_perday/-/level_helps',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: [this.levelSlug]
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getLevelPlaytimes = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.levelPlaytimes.data = data.sort(function(a, b) {
          if (a.created < b.created) {
            return -1;
          } else {
            return 1;
          }
        });
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('playtime_averages', {
      url: '/db/level/-/playtime_averages',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: [this.levelSlug]
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignLevelView.prototype.getRecentSessions = function(doneCallback) {
    var limit, request, success;
    limit = 100;
    success = (function(_this) {
      return function(data) {
        if (_this.destroyed) {
          return doneCallback();
        }
        _this.analytics.recentSessions.data = data;
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('level_sessions_recent', {
      url: "/db/level.session/-/recent",
      data: {
        slug: this.levelSlug,
        limit: limit
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return CampaignLevelView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/campaign/CampaignLevelView.js.map
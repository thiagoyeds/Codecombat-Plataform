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

;require.register("views/editor/campaign/CampaignAnalyticsModal", function(exports, require, module) {
var CampaignAnalyticsModal, ModalView, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

template = require('templates/editor/campaign/campaign-analytics-modal');

utils = require('core/utils');

require('vendor/d3');

ModalView = require('views/core/ModalView');

module.exports = CampaignAnalyticsModal = (function(superClass) {
  extend(CampaignAnalyticsModal, superClass);

  CampaignAnalyticsModal.prototype.id = 'campaign-analytics-modal';

  CampaignAnalyticsModal.prototype.template = template;

  CampaignAnalyticsModal.prototype.plain = true;

  CampaignAnalyticsModal.prototype.events = {
    'click #reload-button': 'onClickReloadButton',
    'dblclick .level': 'onDblClickLevel',
    'change #option-show-left-game': 'updateShowLeftGame',
    'change #option-show-subscriptions': 'updateShowSubscriptions'
  };

  function CampaignAnalyticsModal(options, campaignHandle, campaignCompletions) {
    this.campaignHandle = campaignHandle;
    this.campaignCompletions = campaignCompletions;
    this.getCampaignLevelSubscriptions = bind(this.getCampaignLevelSubscriptions, this);
    this.getCompaignLevelDrops = bind(this.getCompaignLevelDrops, this);
    this.getCampaignLevelCompletions = bind(this.getCampaignLevelCompletions, this);
    this.getCampaignAveragePlaytimes = bind(this.getCampaignAveragePlaytimes, this);
    this.getCampaignAnalytics = bind(this.getCampaignAnalytics, this);
    this.onClickReloadButton = bind(this.onClickReloadButton, this);
    CampaignAnalyticsModal.__super__.constructor.call(this, options);
    this.showLeftGame = true;
    this.showSubscriptions = true;
    if (me.isAdmin()) {
      this.getCampaignAnalytics();
    }
  }

  CampaignAnalyticsModal.prototype.getRenderData = function() {
    var c;
    c = CampaignAnalyticsModal.__super__.getRenderData.call(this);
    c.showLeftGame = this.showLeftGame;
    c.showSubscriptions = this.showSubscriptions;
    c.campaignCompletions = this.campaignCompletions;
    return c;
  };

  CampaignAnalyticsModal.prototype.afterRender = function() {
    CampaignAnalyticsModal.__super__.afterRender.call(this);
    $("#input-startday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    $("#input-endday").datepicker({
      dateFormat: "yy-mm-dd"
    });
    return this.addCompletionLineGraphs();
  };

  CampaignAnalyticsModal.prototype.updateShowLeftGame = function() {
    this.showLeftGame = this.$el.find('#option-show-left-game').prop('checked');
    return this.render();
  };

  CampaignAnalyticsModal.prototype.updateShowSubscriptions = function() {
    this.showSubscriptions = this.$el.find('#option-show-subscriptions').prop('checked');
    return this.render();
  };

  CampaignAnalyticsModal.prototype.onClickReloadButton = function() {
    var endDay, startDay;
    startDay = $('#input-startday').val();
    endDay = $('#input-endday').val();
    delete this.campaignCompletions.levels;
    this.campaignCompletions.startDay = startDay;
    this.campaignCompletions.endDay = endDay;
    this.render();
    return this.getCampaignAnalytics(startDay, endDay);
  };

  CampaignAnalyticsModal.prototype.onDblClickLevel = function(e) {
    var row;
    row = $(e.target).parents('.level');
    Backbone.Mediator.publish('editor:campaign-analytics-modal-closed', {
      targetLevelSlug: row.data('level-slug')
    });
    return this.hide();
  };

  CampaignAnalyticsModal.prototype.addCompletionLineGraphs = function() {
    var data, day, days, i, j, k, len, level, ref, ref1, results;
    if (!this.campaignCompletions.levels) {
      return;
    }
    ref = this.campaignCompletions.levels;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      level = ref[j];
      days = [];
      for (day in level['days']) {
        if (!(level['days'][day].started > 0)) {
          continue;
        }
        days.push({
          day: day,
          rate: level['days'][day].finished / level['days'][day].started,
          count: level['days'][day].started
        });
      }
      days.sort(function(a, b) {
        return a.day - b.day;
      });
      data = [];
      for (i = k = 0, ref1 = days.length; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
        data.push({
          x: i,
          y: days[i].rate,
          c: days[i].count
        });
      }
      results.push(this.addLineGraph('#background' + level.level, data));
    }
    return results;
  };

  CampaignAnalyticsModal.prototype.addLineGraph = function(containerSelector, lineData, lineColor, min, max) {
    var height, i, j, lines, ref, vis, width, xRange, yRange;
    if (lineColor == null) {
      lineColor = 'green';
    }
    if (min == null) {
      min = 0;
    }
    if (max == null) {
      max = 1.0;
    }
    vis = d3.select(containerSelector);
    width = $(containerSelector).width();
    height = $(containerSelector).height();
    xRange = d3.scale.linear().range([0, width]).domain([
      d3.min(lineData, function(d) {
        return d.x;
      }), d3.max(lineData, function(d) {
        return d.x;
      })
    ]);
    yRange = d3.scale.linear().range([height, 0]).domain([min, max]);
    lines = [];
    for (i = j = 0, ref = lineData.length - 1; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      lines.push({
        x1: xRange(lineData[i].x),
        y1: yRange(lineData[i].y),
        x2: xRange(lineData[i + 1].x),
        y2: yRange(lineData[i + 1].y),
        strokeWidth: Math.min(3, Math.max(0.3, Math.log(lineData[i].c / 10) / 2))
      });
    }
    return vis.selectAll('.line').data(lines).enter().append("line").attr("x1", function(d) {
      return d.x1;
    }).attr("y1", function(d) {
      return d.y1;
    }).attr("x2", function(d) {
      return d.x2;
    }).attr("y2", function(d) {
      return d.y2;
    }).style("stroke-width", function(d) {
      return d.strokeWidth;
    }).style("stroke", lineColor);
  };

  CampaignAnalyticsModal.prototype.getCampaignAnalytics = function(startDay, endDay) {
    var endDayDashed, startDayDashed;
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
    this.campaignCompletions.startDay = startDayDashed;
    this.campaignCompletions.endDay = endDayDashed;
    return this.getCampaignLevelCompletions(startDay, endDay, (function(_this) {
      return function() {
        if (typeof _this.render === "function") {
          _this.render();
        }
        return _this.getCompaignLevelDrops(startDay, endDay, function() {
          if (typeof _this.render === "function") {
            _this.render();
          }
          return _this.getCampaignAveragePlaytimes(startDayDashed, endDayDashed, function() {
            if (typeof _this.render === "function") {
              _this.render();
            }
            return _this.getCampaignLevelSubscriptions(startDay, endDay, function() {
              return typeof _this.render === "function" ? _this.render() : void 0;
            });
          });
        });
      };
    })(this));
  };

  CampaignAnalyticsModal.prototype.getCampaignAveragePlaytimes = function(startDay, endDay, doneCallback) {
    var levelSlugs, request, success;
    success = (function(_this) {
      return function(data) {
        var addPlaytimePercentage, item, j, k, len, len1, level, levelAverages, maxPlaytime, name, ref, sortedLevels, total;
        if (_this.destroyed) {
          return doneCallback();
        }
        levelAverages = {};
        maxPlaytime = 0;
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          if (levelAverages[name = item.level] == null) {
            levelAverages[name] = [];
          }
          levelAverages[item.level].push(item.average);
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          if (levelAverages[level.level]) {
            if (levelAverages[level.level].length > 0) {
              total = _.reduce(levelAverages[level.level], (function(sum, num) {
                return sum + num;
              }));
              level.averagePlaytime = total / levelAverages[level.level].length;
              if (maxPlaytime < level.averagePlaytime) {
                maxPlaytime = level.averagePlaytime;
              }
              if (level.averagePlaytime > 0 && level.dropped > 0) {
                level.droppedPerSecond = level.dropped / level.averagePlaytime;
              }
            } else {
              level.averagePlaytime = 0.0;
            }
          }
        }
        addPlaytimePercentage = function(item) {
          if (maxPlaytime !== 0) {
            item.playtimePercentage = Math.round(item.averagePlaytime / maxPlaytime * 100.0);
          }
          return item;
        };
        _this.campaignCompletions.levels = _.map(_this.campaignCompletions.levels, addPlaytimePercentage, _this);
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.droppedPerSecond > 0;
        }), _this);
        sortedLevels.sort(function(a, b) {
          return b.droppedPerSecond - a.droppedPerSecond;
        });
        _this.campaignCompletions.top3DropPerSecond = _.pluck(sortedLevels.slice(0, 3), 'level');
        return doneCallback();
      };
    })(this);
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('playtime_averages', {
      url: '/db/level/-/playtime_averages',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCampaignLevelCompletions = function(startDay, endDay, doneCallback) {
    var request, success;
    success = (function(_this) {
      return function(data) {
        var addUserRemaining, countCompletions, maxStarted, sortedLevels;
        if (_this.destroyed) {
          return doneCallback();
        }
        countCompletions = function(item) {
          item.started = _.reduce(item.days, (function(result, current) {
            return result + current.started;
          }), 0);
          item.finished = _.reduce(item.days, (function(result, current) {
            return result + current.finished;
          }), 0);
          item.completionRate = item.started > 0 ? item.finished / item.started * 100 : 0.0;
          return item;
        };
        addUserRemaining = function(item) {
          if (maxStarted !== 0) {
            item.usersRemaining = Math.round(item.started / maxStarted * 100.0);
          }
          return item;
        };
        _this.campaignCompletions.levels = _.map(data, countCompletions, _this);
        if (_this.campaignCompletions.levels.length > 0) {
          maxStarted = (_.max(_this.campaignCompletions.levels, (function(a) {
            return a.started;
          }))).started;
        } else {
          maxStarted = 0;
        }
        _this.campaignCompletions.levels = _.map(_this.campaignCompletions.levels, addUserRemaining, _this);
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.finished >= 10;
        }), _this);
        if (sortedLevels.length >= 3) {
          sortedLevels.sort(function(a, b) {
            return b.completionRate - a.completionRate;
          });
          _this.campaignCompletions.top3 = _.pluck(sortedLevels.slice(0, 3), 'level');
          _this.campaignCompletions.bottom3 = _.pluck(sortedLevels.slice(sortedLevels.length - 4, sortedLevels.length - 1), 'level');
        }
        return doneCallback();
      };
    })(this);
    request = this.supermodel.addRequestResource('campaign_completions', {
      url: '/db/analytics_perday/-/campaign_completions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slug: this.campaignHandle
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCompaignLevelDrops = function(startDay, endDay, doneCallback) {
    var levelSlugs, ref, request, success;
    success = (function(_this) {
      return function(data) {
        var item, j, k, len, len1, level, levelDrops, name, ref, ref1, sortedLevels;
        if (_this.destroyed) {
          return;
        }
        levelDrops = {};
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          if (levelDrops[name = item.level] == null) {
            levelDrops[name] = item.dropped;
          }
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          level.dropped = (ref1 = levelDrops[level.level]) != null ? ref1 : 0;
          level.dropPercentage = level.started > 0 ? level.dropped / level.started * 100 : 0.0;
        }
        sortedLevels = _.cloneDeep(_this.campaignCompletions.levels);
        sortedLevels = _.filter(sortedLevels, (function(a) {
          return a.dropPercentage > 0;
        }), _this);
        if (sortedLevels.length >= 3) {
          sortedLevels.sort(function(a, b) {
            return b.dropPercentage - a.dropPercentage;
          });
          _this.campaignCompletions.top3DropPercentage = _.pluck(sortedLevels.slice(0, 3), 'level');
        }
        return doneCallback();
      };
    })(this);
    if (((ref = this.campaignCompletions) != null ? ref.levels : void 0) == null) {
      return doneCallback();
    }
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('level_drops', {
      url: '/db/analytics_perday/-/level_drops',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  CampaignAnalyticsModal.prototype.getCampaignLevelSubscriptions = function(startDay, endDay, doneCallback) {
    var levelSlugs, ref, request, success;
    success = (function(_this) {
      return function(data) {
        var item, j, k, len, len1, level, levelSubs, ref, ref1, ref2;
        if (_this.destroyed) {
          return doneCallback();
        }
        levelSubs = {};
        for (j = 0, len = data.length; j < len; j++) {
          item = data[j];
          levelSubs[item.level] = {
            shown: item.shown,
            purchased: item.purchased
          };
        }
        ref = _this.campaignCompletions.levels;
        for (k = 0, len1 = ref.length; k < len1; k++) {
          level = ref[k];
          level.subsShown = (ref1 = levelSubs[level.level]) != null ? ref1.shown : void 0;
          level.subsPurchased = (ref2 = levelSubs[level.level]) != null ? ref2.purchased : void 0;
        }
        return doneCallback();
      };
    })(this);
    if (((ref = this.campaignCompletions) != null ? ref.levels : void 0) == null) {
      return doneCallback();
    }
    levelSlugs = _.pluck(this.campaignCompletions.levels, 'level');
    request = this.supermodel.addRequestResource('campaign_subscriptions', {
      url: '/db/analytics_perday/-/level_subscriptions',
      data: {
        startDay: startDay,
        endDay: endDay,
        slugs: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return request.load();
  };

  return CampaignAnalyticsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/campaign/CampaignAnalyticsModal.js.map
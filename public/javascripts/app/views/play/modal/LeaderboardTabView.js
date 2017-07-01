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

;require.register("views/play/modal/LeaderboardTabView", function(exports, require, module) {
var CocoCollection, CocoView, LeaderboardTabView, LevelSession, TopScoresCollection, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/modal/leaderboard-tab-view');

CocoCollection = require('collections/CocoCollection');

LevelSession = require('models/LevelSession');

TopScoresCollection = (function(superClass) {
  extend(TopScoresCollection, superClass);

  TopScoresCollection.prototype.url = '';

  TopScoresCollection.prototype.model = LevelSession;

  function TopScoresCollection(level, scoreType, timespan) {
    this.level = level;
    this.scoreType = scoreType;
    this.timespan = timespan;
    TopScoresCollection.__super__.constructor.call(this);
    this.url = "/db/level/" + (this.level.get('original')) + "/top_scores/" + this.scoreType + "/" + this.timespan;
  }

  return TopScoresCollection;

})(CocoCollection);

module.exports = LeaderboardTabView = (function(superClass) {
  extend(LeaderboardTabView, superClass);

  LeaderboardTabView.prototype.template = template;

  LeaderboardTabView.prototype.className = 'leaderboard-tab-view';

  LeaderboardTabView.prototype.events = {
    'click tbody tr.viewable': 'onClickRow'
  };

  function LeaderboardTabView(options) {
    var ref;
    LeaderboardTabView.__super__.constructor.call(this, options);
    this.level = this.options.level;
    this.scoreType = (ref = this.options.scoreType) != null ? ref : 'time';
    this.timespan = this.options.timespan;
  }

  LeaderboardTabView.prototype.destroy = function() {
    return LeaderboardTabView.__super__.destroy.call(this);
  };

  LeaderboardTabView.prototype.getRenderData = function() {
    var c;
    c = LeaderboardTabView.__super__.getRenderData.call(this);
    c.scoreType = this.scoreType;
    c.timespan = this.timespan;
    c.topScores = this.formatTopScores();
    c.loading = !this.sessions || this.sessions.loading;
    c._ = _;
    return c;
  };

  LeaderboardTabView.prototype.afterRender = function() {
    return LeaderboardTabView.__super__.afterRender.call(this);
  };

  LeaderboardTabView.prototype.formatTopScores = function() {
    var i, len, ref, ref1, ref2, ref3, row, rows, s, score;
    if (!((ref = this.sessions) != null ? ref.models : void 0)) {
      return [];
    }
    rows = [];
    ref1 = this.sessions.models;
    for (i = 0, len = ref1.length; i < len; i++) {
      s = ref1[i];
      row = {};
      score = _.find(s.get('state').topScores, {
        type: this.scoreType
      });
      row.ago = moment(new Date(score.date)).fromNow();
      row.score = this.formatScore(score);
      row.creatorName = s.get('creatorName');
      row.creator = s.get('creator');
      row.session = s.id;
      row.codeLanguage = s.get('codeLanguage');
      row.hero = (ref2 = s.get('heroConfig')) != null ? ref2.thangType : void 0;
      row.inventory = (ref3 = s.get('heroConfig')) != null ? ref3.inventory : void 0;
      rows.push(row);
    }
    return rows;
  };

  LeaderboardTabView.prototype.formatScore = function(score) {
    switch (score.type) {
      case 'time':
        return -score.score.toFixed(2) + 's';
      case 'damage-taken':
        return -Math.round(score.score);
      case 'damage-dealt':
      case 'gold-collected':
      case 'difficulty':
        return Math.round(score.score);
      default:
        return score.score;
    }
  };

  LeaderboardTabView.prototype.onShown = function() {
    var topScores;
    if (this.hasShown) {
      return;
    }
    this.hasShown = true;
    topScores = new TopScoresCollection(this.level, this.scoreType, this.timespan);
    return this.sessions = this.supermodel.loadCollection(topScores, 'sessions', {
      cache: false
    }, 0).model;
  };

  LeaderboardTabView.prototype.onClickRow = function(e) {
    var sessionID, url;
    sessionID = $(e.target).closest('tr').data('session-id');
    url = "/play/level/" + (this.level.get('slug')) + "?session=" + sessionID + "&observing=true";
    return window.open(url, '_blank');
  };

  return LeaderboardTabView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/LeaderboardTabView.js.map
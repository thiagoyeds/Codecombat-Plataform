require.register("views/play/level/LevelGoldView", function(exports, require, module) {
var CocoView, LevelGoldView, teamTemplate, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/gold');

teamTemplate = require('templates/play/level/team_gold');

module.exports = LevelGoldView = (function(superClass) {
  extend(LevelGoldView, superClass);

  LevelGoldView.prototype.id = 'gold-view';

  LevelGoldView.prototype.template = template;

  LevelGoldView.prototype.subscriptions = {
    'surface:gold-changed': 'onGoldChanged',
    'level:set-letterbox': 'onSetLetterbox'
  };

  function LevelGoldView(options) {
    LevelGoldView.__super__.constructor.call(this, options);
    this.teamGold = {};
    this.teamGoldEarned = {};
    this.shownOnce = false;
  }

  LevelGoldView.prototype.onGoldChanged = function(e) {
    var goldEl, teamEl, text;
    if (this.teamGold[e.team] === e.gold && this.teamGoldEarned[e.team] === e.goldEarned) {
      return;
    }
    this.teamGold[e.team] = e.gold;
    this.teamGoldEarned[e.team] = e.goldEarned;
    goldEl = this.$el.find('.gold-amount.team-' + e.team);
    if (!goldEl.length) {
      teamEl = teamTemplate({
        team: e.team
      });
      this.$el[e.team === 'humans' ? 'prepend' : 'append'](teamEl);
      goldEl = this.$el.find('.gold-amount.team-' + e.team);
    }
    text = '' + e.gold;
    if (e.goldEarned && e.goldEarned > e.gold) {
      text += " (" + e.goldEarned + ")";
    }
    goldEl.text(text);
    this.updateTitle();
    this.$el.show();
    return this.shownOnce = true;
  };

  LevelGoldView.prototype.updateTitle = function() {
    var gold, ref, strings, team;
    strings = [];
    ref = this.teamGold;
    for (team in ref) {
      gold = ref[team];
      if (this.teamGoldEarned[team]) {
        strings.push("Team '" + team + "' has " + gold + " now of " + this.teamGoldEarned[team] + " gold earned.");
      } else {
        strings.push("Team '" + team + "' has " + gold + " gold.");
      }
    }
    return this.$el.attr('title', strings.join(' '));
  };

  LevelGoldView.prototype.onSetLetterbox = function(e) {
    if (this.shownOnce) {
      return this.$el.toggle(!e.on);
    }
  };

  return LevelGoldView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelGoldView.js.map
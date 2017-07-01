require.register("templates/play/level/duel-stats-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;// iterate view.players
;(function(){
  var $$obj = view.players;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("player-container team-" + player.team)] }, {"class":true})) + "><div class=\"player-portrait\"><div class=\"thang-avatar-placeholder\"></div></div><div class=\"player-info\"><div class=\"name-and-power\">");
if ( view.showsPower)
{
buf.push("<div class=\"player-power\"><div class=\"power-icon\"></div><div class=\"power-value\"></div></div>");
}
if ( view.showsGold)
{
buf.push("<div class=\"player-gold\"><div class=\"gold-icon\"></div><div class=\"gold-value\"></div></div>");
}
buf.push("<div class=\"player-name\">" + (jade.escape(null == (jade.interp = player.name || 'Anonymous') ? "" : jade.interp)) + "</div></div><div class=\"player-health\"><div class=\"health-icon\"></div><div class=\"health-bar-container\"><div class=\"health-bar\"></div></div><div class=\"health-value\"></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("player-container team-" + player.team)] }, {"class":true})) + "><div class=\"player-portrait\"><div class=\"thang-avatar-placeholder\"></div></div><div class=\"player-info\"><div class=\"name-and-power\">");
if ( view.showsPower)
{
buf.push("<div class=\"player-power\"><div class=\"power-icon\"></div><div class=\"power-value\"></div></div>");
}
if ( view.showsGold)
{
buf.push("<div class=\"player-gold\"><div class=\"gold-icon\"></div><div class=\"gold-value\"></div></div>");
}
buf.push("<div class=\"player-name\">" + (jade.escape(null == (jade.interp = player.name || 'Anonymous') ? "" : jade.interp)) + "</div></div><div class=\"player-health\"><div class=\"health-icon\"></div><div class=\"health-bar-container\"><div class=\"health-bar\"></div></div><div class=\"health-value\"></div></div></div></div>");
    }

  }
}).call(this);
;return buf.join("");
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

;require.register("views/play/level/DuelStatsView", function(exports, require, module) {
var CocoView, DuelStatsView, ThangAvatarView, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/duel-stats-view');

ThangAvatarView = require('views/play/level/ThangAvatarView');

utils = require('core/utils');

module.exports = DuelStatsView = (function(superClass) {
  extend(DuelStatsView, superClass);

  DuelStatsView.prototype.id = 'duel-stats-view';

  DuelStatsView.prototype.template = template;

  DuelStatsView.prototype.subscriptions = {
    'surface:gold-changed': 'onGoldChanged',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'surface:frame-changed': 'onFrameChanged'
  };

  function DuelStatsView(options) {
    var ref, ref1, team;
    DuelStatsView.__super__.constructor.call(this, options);
    options.thangs = _.filter(options.thangs, 'inThangList');
    if (!options.otherSession) {
      options.otherSession = {
        get: function(prop) {
          return {
            creatorName: $.i18n.t('ladder.simple_ai'),
            team: options.session.get('team') === 'humans' ? 'ogres' : 'humans',
            heroConfig: options.session.get('heroConfig')
          }[prop];
        }
      };
    }
    this.showsGold = (ref = options.level.get('slug')) === 'wakka-maul';
    this.showsPower = (ref1 = options.level.get('slug')) !== 'wakka-maul' && ref1 !== 'dueling-grounds' && ref1 !== 'cavern-survival' && ref1 !== 'multiplayer-treasure-grove';
    this.teamGold = {};
    this.players = (function() {
      var i, len, ref2, results;
      ref2 = ['humans', 'ogres'];
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        team = ref2[i];
        results.push(this.formatPlayer(team));
      }
      return results;
    }).call(this);
  }

  DuelStatsView.prototype.formatPlayer = function(team) {
    var p, ref, session;
    p = {
      team: team
    };
    session = _.find([this.options.session, this.options.otherSession], function(s) {
      return s.get('team') === team;
    });
    p.name = session.get('creatorName');
    p.heroThangType = ((ref = session.get('heroConfig')) != null ? ref : {}).thangType || '529ffbf1cf1818f2be000001';
    p.heroID = team === 'ogres' ? 'Hero Placeholder 1' : 'Hero Placeholder';
    return p;
  };

  DuelStatsView.prototype.afterRender = function() {
    var i, len, player, ref;
    DuelStatsView.__super__.afterRender.call(this);
    ref = this.players;
    for (i = 0, len = ref.length; i < len; i++) {
      player = ref[i];
      this.buildAvatar(player.heroID, player.team);
    }
    return this.$el.css('display', 'flex');
  };

  DuelStatsView.prototype.buildAvatar = function(heroID, team) {
    var avatar, thang;
    if (this.avatars == null) {
      this.avatars = {};
    }
    if (this.avatars[team]) {
      return;
    }
    thang = _.find(this.options.thangs, {
      id: heroID
    });
    this.avatars[team] = avatar = new ThangAvatarView({
      thang: thang,
      includeName: false,
      supermodel: this.supermodel
    });
    this.$find(team, '.thang-avatar-placeholder').replaceWith(avatar.$el);
    return avatar.render();
  };

  DuelStatsView.prototype.onNewWorld = function(e) {
    return this.options.thangs = _.filter(e.world.thangs, 'inThangList');
  };

  DuelStatsView.prototype.onFrameChanged = function(e) {
    return this.update();
  };

  DuelStatsView.prototype.update = function() {
    var i, len, player, ref, thang;
    ref = this.players;
    for (i = 0, len = ref.length; i < len; i++) {
      player = ref[i];
      thang = _.find(this.options.thangs, {
        id: this.avatars[player.team].thang.id
      });
      this.updateHealth(thang);
    }
    if (this.showsPower) {
      return this.updatePower();
    }
  };

  DuelStatsView.prototype.updateHealth = function(thang) {
    var $health;
    $health = this.$find(thang.team, '.player-health');
    $health.find('.health-bar').css('width', Math.max(0, Math.min(100, 100 * thang.health / thang.maxHealth)) + '%');
    return utils.replaceText($health.find('.health-value'), Math.round(thang.health));
  };

  DuelStatsView.prototype.updatePower = function() {
    var i, j, len, len1, player, powers, ref, ref1, results, thang;
    if (this.costTable == null) {
      this.costTable = {
        soldier: 20,
        archer: 25,
        decoy: 25,
        'griffin-rider': 50,
        paladin: 80,
        artillery: 75,
        'arrow-tower': 100,
        palisade: 10,
        peasant: 50,
        thrower: 9,
        scout: 18
      };
    }
    powers = {
      humans: 0,
      ogres: 0
    };
    ref = this.options.thangs;
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      if (thang.health > 0 && thang.exists) {
        if (powers[thang.team] != null) {
          powers[thang.team] += this.costTable[thang.type] || 0;
        }
      }
    }
    ref1 = this.players;
    results = [];
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      player = ref1[j];
      results.push(utils.replaceText(this.$find(player.team, '.power-value'), powers[player.team]));
    }
    return results;
  };

  DuelStatsView.prototype.$find = function(team, selector) {
    return this.$el.find((".player-container.team-" + team + " ") + selector);
  };

  DuelStatsView.prototype.destroy = function() {
    var avatar, ref, ref1, team;
    ref1 = (ref = this.avatars) != null ? ref : {};
    for (team in ref1) {
      avatar = ref1[team];
      avatar.destroy();
    }
    return DuelStatsView.__super__.destroy.call(this);
  };

  DuelStatsView.prototype.onGoldChanged = function(e) {
    if (!this.showsGold) {
      return;
    }
    if (this.teamGold[e.team] === e.gold) {
      return;
    }
    this.teamGold[e.team] = e.gold;
    return utils.replaceText(this.$find(e.team, '.gold-value'), '' + e.gold);
  };

  return DuelStatsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/DuelStatsView.js.map
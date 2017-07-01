require.register("templates/play/modal/play-achievements-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment,rewards = locals_.rewards,worth = locals_.worth;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"play.achievements\">Achievements</h3></div><div class=\"modal-body\">");
// iterate view.achievements.models
;(function(){
  var $$obj = view.achievements.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var achievement = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [('panel'),(achievement.earned ? 'earned' : '')] }, {"class":true})) + "><div class=\"panel-body\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'draggable':("false"), "class": [('icon')] }, {"src":true,"draggable":true})) + "/><h3>" + (jade.escape(null == (jade.interp = achievement.name + (achievement.earned && achievement.earned.get('achievedAmount') ? (' - ' + achievement.earned.get('achievedAmount') + 'x') : '')) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</p></div>");
if ( achievement.earnedDate)
{
buf.push("<div class=\"created\">" + (jade.escape(null == (jade.interp = moment(achievement.earnedDate).fromNow()) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div data-i18n=\"user.status_unfinished\" class=\"created\"></div>");
}
buf.push("<div class=\"rewards\">");
rewards = achievement.get('rewards');
if ( rewards && rewards.gems)
{
buf.push("<span class=\"gems label label-default\"><span>" + (jade.escape(null == (jade.interp = achievement.earnedGems || rewards.gems) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\" class=\"gem\"/></span>");
}
worth = achievement.get('worth');
if ( worth)
{
buf.push("<span class=\"worth label label-default\"><span>" + (jade.escape((jade.interp = achievement.earnedPoints || worth) == null ? '' : jade.interp)) + "xp</span></span>");
}
buf.push("<!-- maybe add more icons/numbers for items, heroes, levels, xp?--></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var achievement = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [('panel'),(achievement.earned ? 'earned' : '')] }, {"class":true})) + "><div class=\"panel-body\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'draggable':("false"), "class": [('icon')] }, {"src":true,"draggable":true})) + "/><h3>" + (jade.escape(null == (jade.interp = achievement.name + (achievement.earned && achievement.earned.get('achievedAmount') ? (' - ' + achievement.earned.get('achievedAmount') + 'x') : '')) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</p></div>");
if ( achievement.earnedDate)
{
buf.push("<div class=\"created\">" + (jade.escape(null == (jade.interp = moment(achievement.earnedDate).fromNow()) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div data-i18n=\"user.status_unfinished\" class=\"created\"></div>");
}
buf.push("<div class=\"rewards\">");
rewards = achievement.get('rewards');
if ( rewards && rewards.gems)
{
buf.push("<span class=\"gems label label-default\"><span>" + (jade.escape(null == (jade.interp = achievement.earnedGems || rewards.gems) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\" class=\"gem\"/></span>");
}
worth = achievement.get('worth');
if ( worth)
{
buf.push("<span class=\"worth label label-default\"><span>" + (jade.escape((jade.interp = achievement.earnedPoints || worth) == null ? '' : jade.interp)) + "xp</span></span>");
}
buf.push("<!-- maybe add more icons/numbers for items, heroes, levels, xp?--></div></div>");
    }

  }
}).call(this);

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

;require.register("views/play/modal/PlayAchievementsModal", function(exports, require, module) {
var Achievement, CocoCollection, EarnedAchievement, ModalView, PAGE_SIZE, PlayAchievementsModal, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/play-achievements-modal');

CocoCollection = require('collections/CocoCollection');

Achievement = require('models/Achievement');

EarnedAchievement = require('models/EarnedAchievement');

utils = require('core/utils');

PAGE_SIZE = 200;

module.exports = PlayAchievementsModal = (function(superClass) {
  extend(PlayAchievementsModal, superClass);

  PlayAchievementsModal.prototype.className = 'modal fade play-modal';

  PlayAchievementsModal.prototype.template = template;

  PlayAchievementsModal.prototype.id = 'play-achievements-modal';

  PlayAchievementsModal.prototype.plain = true;

  PlayAchievementsModal.prototype.earnedMap = {};

  function PlayAchievementsModal(options) {
    this.onEverythingLoaded = bind(this.onEverythingLoaded, this);
    var achievementsFetcher, earnedAchievementsFetcher, earnedMap;
    PlayAchievementsModal.__super__.constructor.call(this, options);
    this.achievements = new Backbone.Collection();
    earnedMap = {};
    achievementsFetcher = new CocoCollection([], {
      url: '/db/achievement',
      model: Achievement
    });
    achievementsFetcher.setProjection(['name', 'description', 'icon', 'worth', 'i18n', 'rewards', 'collection', 'function', 'query']);
    earnedAchievementsFetcher = new CocoCollection([], {
      url: '/db/earned_achievement',
      model: EarnedAchievement
    });
    earnedAchievementsFetcher.setProjection(['achievement', 'achievedAmount']);
    achievementsFetcher.skip = 0;
    achievementsFetcher.fetch({
      cache: false,
      data: {
        skip: 0,
        limit: PAGE_SIZE
      }
    });
    earnedAchievementsFetcher.skip = 0;
    earnedAchievementsFetcher.fetch({
      cache: false,
      data: {
        skip: 0,
        limit: PAGE_SIZE
      }
    });
    this.listenTo(achievementsFetcher, 'sync', this.onAchievementsLoaded);
    this.listenTo(earnedAchievementsFetcher, 'sync', this.onEarnedAchievementsLoaded);
    this.stopListening(this.supermodel, 'loaded-all');
    this.supermodel.loadCollection(achievementsFetcher, 'achievement');
    this.supermodel.loadCollection(earnedAchievementsFetcher, 'achievement');
    this.onEverythingLoaded = _.after(2, this.onEverythingLoaded);
  }

  PlayAchievementsModal.prototype.onAchievementsLoaded = function(fetcher) {
    var needMore;
    needMore = fetcher.models.length === PAGE_SIZE;
    this.achievements.add(fetcher.models);
    if (needMore) {
      fetcher.skip += PAGE_SIZE;
      return fetcher.fetch({
        cache: false,
        data: {
          skip: fetcher.skip,
          limit: PAGE_SIZE
        }
      });
    } else {
      this.stopListening(fetcher);
      return this.onEverythingLoaded();
    }
  };

  PlayAchievementsModal.prototype.onEarnedAchievementsLoaded = function(fetcher) {
    var earned, i, len, needMore, ref;
    needMore = fetcher.models.length === PAGE_SIZE;
    ref = fetcher.models;
    for (i = 0, len = ref.length; i < len; i++) {
      earned = ref[i];
      this.earnedMap[earned.get('achievement')] = earned;
    }
    if (needMore) {
      fetcher.skip += PAGE_SIZE;
      return fetcher.fetch({
        cache: false,
        data: {
          skip: fetcher.skip,
          limit: PAGE_SIZE
        }
      });
    } else {
      this.stopListening(fetcher);
      return this.onEverythingLoaded();
    }
  };

  PlayAchievementsModal.prototype.onEverythingLoaded = function() {
    var a, achievement, achievementsByDescription, b, earned, expFunction, holder, i, j, k, len, len1, len2, nextInSet, ref, ref1, ref2, ref3, ref4, ref5, shouldKeep;
    this.achievements.set(this.achievements.filter(function(m) {
      var ref;
      return m.get('collection') !== 'level.sessions' || ((ref = m.get('query')) != null ? ref.team : void 0);
    }));
    achievementsByDescription = {
      earned: {},
      unearned: {}
    };
    ref = this.achievements.models;
    for (i = 0, len = ref.length; i < len; i++) {
      achievement = ref[i];
      if (earned = this.earnedMap[achievement.id]) {
        achievement.earned = earned;
        achievement.earnedDate = earned.getCreationDate();
        expFunction = achievement.getExpFunction();
        achievement.earnedGems = Math.round((((ref1 = achievement.get('rewards')) != null ? ref1.gems : void 0) || 0) * expFunction(earned.get('achievedAmount')));
        achievement.earnedPoints = Math.round((achievement.get('worth', true) || 0) * expFunction(earned.get('achievedAmount')));
      }
      if (achievement.earnedDate == null) {
        achievement.earnedDate = '';
      }
    }
    ref2 = this.achievements.models;
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      achievement = ref2[j];
      if (achievement.earned) {
        holder = achievementsByDescription.earned;
      } else {
        holder = achievementsByDescription.unearned;
      }
      nextInSet = holder[achievement.get('description')];
      ref4 = [achievement.get('worth', true), (ref3 = nextInSet != null ? nextInSet.get('worth', true) : void 0) != null ? ref3 : 0], a = ref4[0], b = ref4[1];
      if (achievement.earned) {
        shouldKeep = !nextInSet || a > b;
      } else {
        shouldKeep = !nextInSet || a < b;
      }
      if (shouldKeep) {
        holder[achievement.get('description')] = achievement;
      }
    }
    this.achievements.set(_.values(achievementsByDescription.earned).concat(_.values(achievementsByDescription.unearned)));
    this.achievements.comparator = function(m) {
      return m.earnedDate;
    };
    this.achievements.sort();
    this.achievements.set(this.achievements.models.reverse());
    ref5 = this.achievements.models;
    for (k = 0, len2 = ref5.length; k < len2; k++) {
      achievement = ref5[k];
      achievement.name = utils.i18n(achievement.attributes, 'name');
      achievement.description = utils.i18n(achievement.attributes, 'description');
    }
    return this.render();
  };

  PlayAchievementsModal.prototype.afterRender = function() {
    PlayAchievementsModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    return this.playSound('game-menu-open');
  };

  PlayAchievementsModal.prototype.onHidden = function() {
    PlayAchievementsModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  return PlayAchievementsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PlayAchievementsModal.js.map
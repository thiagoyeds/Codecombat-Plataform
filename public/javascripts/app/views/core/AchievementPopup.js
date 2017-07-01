require.register("templates/core/achievement-popup", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),style = locals_.style,locked = locals_.locked,imgURL = locals_.imgURL,title = locals_.title,description = locals_.description,popup = locals_.popup,level = locals_.level,$ = locals_.$,currentXP = locals_.currentXP,newXP = locals_.newXP,leftXP = locals_.leftXP,oldXPWidth = locals_.oldXPWidth,newXPWidth = locals_.newXPWidth,leftXPWidth = locals_.leftXPWidth;var addedClass = style + (locked === true ? ' locked' : '')
buf.push("<div" + (jade.attrs({ "class": [('clearfix'),('achievement-body'),(addedClass)] }, {"class":true})) + "><div class=\"achievement-icon\"><div class=\"achievement-image\"><img" + (jade.attrs({ 'src':(imgURL) }, {"src":true})) + "/></div></div><div class=\"achievement-content\"><div class=\"achievement-title\">" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</div><p class=\"achievement-description\">" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</p>");
if ( popup)
{
buf.push("<div class=\"progress-wrapper\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</span><div class=\"progress-bar-wrapper\"><div class=\"progress\">");
var currentTitle = $.i18n.t('achievements.current_xp_prefix') + currentXP + ' XP' + $.i18n.t('achievements.current_xp_postfix');
var newTitle = $.i18n.t('achievements.new_xp_prefix') + newXP + ' XP' + $.i18n.t('achievements.new_xp_postfix');
var leftTitle = $.i18n.t('achievements.left_xp_prefix') + leftXP + ' XP' + $.i18n.t('achievements.left_xp_infix') + (level+1) + $.i18n.t('achievements.left_xp_postfix');
buf.push("<div" + (jade.attrs({ 'style':("width:" + (oldXPWidth) + "%"), 'data-toggle':("tooltip"), 'data-placement':("top"), 'title':("" + (currentTitle) + ""), "class": [('progress-bar'),('xp-bar-old')] }, {"style":true,"data-toggle":true,"data-placement":true,"title":true})) + "></div><div" + (jade.attrs({ 'style':("width:" + (newXPWidth) + "%"), 'data-toggle':("tooltip"), 'title':("" + (newTitle) + ""), "class": [('progress-bar'),('xp-bar-new')] }, {"style":true,"data-toggle":true,"title":true})) + "></div><div" + (jade.attrs({ 'style':("width:" + (leftXPWidth) + "%"), 'data-toggle':("tooltip"), 'title':("" + (leftTitle) + ""), "class": [('progress-bar'),('xp-bar-left')] }, {"style":true,"data-toggle":true,"title":true})) + "></div></div></div><div class=\"progress-bar-border\"></div></div>");
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

;require.register("views/core/AchievementPopup", function(exports, require, module) {
var Achievement, AchievementPopup, CocoView, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/core/achievement-popup');

User = require('../../models/User');

Achievement = require('../../models/Achievement');

module.exports = AchievementPopup = (function(superClass) {
  extend(AchievementPopup, superClass);

  AchievementPopup.prototype.className = 'achievement-popup';

  AchievementPopup.prototype.template = template;

  function AchievementPopup(options) {
    this.achievement = options.achievement;
    this.earnedAchievement = options.earnedAchievement;
    this.container = options.container || this.getContainer();
    this.popup = options.container;
    if (this.popup == null) {
      this.popup = true;
    }
    if (this.popup) {
      this.className += ' popup';
    }
    AchievementPopup.__super__.constructor.call(this, options);
    this.render();
  }

  AchievementPopup.prototype.calculateData = function() {
    var achievedXP, alreadyAchievedPercentage, currentLevel, currentLevelXP, currentXP, data, expFunction, leveledUp, newlyAchievedPercentage, nextLevel, nextLevelXP, previousXP, totalXPNeeded;
    currentLevel = me.level();
    nextLevel = currentLevel + 1;
    currentLevelXP = User.expForLevel(currentLevel);
    nextLevelXP = User.expForLevel(nextLevel);
    totalXPNeeded = nextLevelXP - currentLevelXP;
    expFunction = this.achievement.getExpFunction();
    currentXP = me.get('points', true);
    if (this.achievement.isRepeatable()) {
      if (this.achievement.isRepeatable()) {
        achievedXP = expFunction(this.earnedAchievement.get('previouslyAchievedAmount')) * this.achievement.get('worth');
      }
    } else {
      achievedXP = this.achievement.get('worth', true);
    }
    previousXP = currentXP - achievedXP;
    leveledUp = currentXP - achievedXP < currentLevelXP;
    alreadyAchievedPercentage = 100 * (previousXP - currentLevelXP) / totalXPNeeded;
    if (alreadyAchievedPercentage < 0) {
      alreadyAchievedPercentage = 0;
    }
    newlyAchievedPercentage = leveledUp ? 100 * (currentXP - currentLevelXP) / totalXPNeeded : 100 * achievedXP / totalXPNeeded;
    return data = {
      title: this.achievement.i18nName(),
      imgURL: this.achievement.getImageURL(),
      description: this.achievement.i18nDescription(),
      level: currentLevel,
      currentXP: currentXP,
      newXP: achievedXP,
      leftXP: nextLevelXP - currentXP,
      oldXPWidth: alreadyAchievedPercentage,
      newXPWidth: newlyAchievedPercentage,
      leftXPWidth: 100 - newlyAchievedPercentage - alreadyAchievedPercentage
    };
  };

  AchievementPopup.prototype.getRenderData = function() {
    var c;
    c = AchievementPopup.__super__.getRenderData.call(this);
    _.extend(c, this.calculateData());
    c.style = this.achievement.getStyle();
    c.popup = true;
    c.$ = $;
    return c;
  };

  AchievementPopup.prototype.render = function() {
    var hide;
    AchievementPopup.__super__.render.call(this);
    this.container.prepend(this.$el);
    if (this.popup) {
      hide = (function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          return _this.$el.animate({
            left: -600
          }, function() {
            _this.$el.remove();
            return _this.destroy();
          });
        };
      })(this);
      this.$el.animate({
        left: 0
      });
      this.$el.on('click', hide);
      if (!$('#editor-achievement-edit-view').length) {
        return _.delay(hide, 10000);
      }
    }
  };

  AchievementPopup.prototype.getContainer = function() {
    if (!this.container) {
      this.container = $('.achievement-popup-container');
      if (!this.container.length) {
        $('body').append('<div class="achievement-popup-container"></div>');
        this.container = $('.achievement-popup-container');
      }
    }
    return this.container;
  };

  AchievementPopup.prototype.afterRender = function() {
    AchievementPopup.__super__.afterRender.call(this);
    return _.delay(this.initializeTooltips, 1000);
  };

  AchievementPopup.prototype.initializeTooltips = function() {
    return $('.progress-bar').addClass('has-tooltip').tooltip();
  };

  return AchievementPopup;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/AchievementPopup.js.map
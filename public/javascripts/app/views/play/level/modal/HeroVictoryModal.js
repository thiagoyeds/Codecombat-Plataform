require.register("templates/play/level/modal/hero-victory-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me,victoryText = locals_.victoryText,isCourseLevel = locals_.isCourseLevel,currentCourseName = locals_.currentCourseName,currentLevelName = locals_.currentLevelName,nextLevelName = locals_.nextLevelName,level = locals_.level,achievements = locals_.achievements,thangTypes = locals_.thangTypes,i18n = locals_.i18n,features = locals_.features,readyToRank = locals_.readyToRank,showHourOfCodeDoneButton = locals_.showHourOfCodeDoneButton,showLeaderboard = locals_.showLeaderboard,showReturnToCourse = locals_.showReturnToCourse,document = locals_.document;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div id=\"victory-header\" class=\"out\"><div id=\"victory-title\">");
if ( !me.get('preferredLanguage') || me.get('preferredLanguage').split('-')[0] == 'en')
{
buf.push("<img src=\"/images/pages/play/level/modal/victory_word.png\" draggable=\"false\"/>");
}
else
{
buf.push("<h1 data-i18n=\"play_level.victory\">Victory</h1>");
}
buf.push("</div></div></div><div class=\"modal-body\">");
if ( victoryText)
{
buf.push("<div id=\"victory-text\">" + (jade.escape(null == (jade.interp = victoryText) ? "" : jade.interp)) + "</div>");
}
if ( isCourseLevel)
{
buf.push("<div class=\"course-name-container\">");
if ( currentCourseName)
{
buf.push("<p><span data-i18n=\"play_level.course\" class=\"spr level-title\"></span><span class=\"level-name\">" + (jade.escape(null == (jade.interp = currentCourseName) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-6\">");
if ( currentLevelName)
{
buf.push("<div data-i18n=\"play_level.completed_level\" class=\"level-title\"></div><div class=\"level-name\">" + (jade.escape(null == (jade.interp = currentLevelName.replace('Course: ', '')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div><div class=\"col-md-6\">");
if ( nextLevelName)
{
buf.push("<div data-i18n=\"play_level.next_level\" class=\"level-title\"></div><div class=\"level-name\">" + (jade.escape(null == (jade.interp = nextLevelName.replace('Course: ', '')) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div data-i18n=\"play_level.course\" class=\"level-title\"></div><div data-i18n=\"play_level.victory_title_suffix\" class=\"level-name\"></div>");
}
buf.push("</div></div></div><br/>");
}
buf.push("<div id=\"level-feedback\"><div class=\"rating secret\"><div data-i18n=\"play_level.victory_rate_the_level\" class=\"rating-label\">Rate the level:</div><i class=\"glyphicon glyphicon-star-empty\"></i><i class=\"glyphicon glyphicon-star-empty\"></i><i class=\"glyphicon glyphicon-star-empty\"></i><i class=\"glyphicon glyphicon-star-empty\"></i><i class=\"glyphicon glyphicon-star-empty\"></i></div>");
if ( !me.get('anonymous'))
{
buf.push("<span data-i18n=\"play_level.victory_review\" class=\"review-label secret\">Tell us more!</span><div class=\"review secret\"><br/><textarea data-i18n=\"[placeholder]play_level.victory_review_placeholder\"></textarea></div>");
}
buf.push("<div class=\"clearfix\"></div></div>");
if ( level.isType('hero', 'hero-ladder', 'game-dev', 'web-dev'))
{
// iterate achievements
;(function(){
  var $$obj = achievements;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var achievement = $$obj[$index];

if ( achievement.get('hidden'))
{
continue;
}
var animate = achievement.completed && !achievement.completedAWhileAgo
buf.push("<div" + (jade.attrs({ 'data-achievement-id':(achievement.id), 'data-animate':(animate), "class": [('achievement-panel'),(achievement.completedAWhileAgo ? 'earned' : '')] }, {"class":true,"data-achievement-id":true,"data-animate":true})) + ">");
var rewards = achievement.get('rewards') || {};
buf.push("<div class=\"achievement-description\">" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</div><div class=\"achievement-rewards\">");
var worth = achievement.worth;
var previousWorth = achievement.previousWorth;
var gems = achievement.gems;
var previousGems = achievement.previousGems;
if ( worth)
{
buf.push("<div" + (jade.attrs({ 'data-number':(worth), 'data-number-unit':('xp'), 'data-previous-number':(previousWorth || 0), "class": [('reward-panel'),('numerical'),('xp')] }, {"data-number":true,"data-number-unit":true,"data-previous-number":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img src=\"/images/pages/play/level/modal/reward_icon_xp.png\"/></div><div class=\"reward-text\">" + (jade.escape(null == (jade.interp = animate ? '+0' : '+'+worth) ? "" : jade.interp)) + "</div></div>");
}
if ( gems)
{
buf.push("<div" + (jade.attrs({ 'data-number':(gems), 'data-number-unit':('gem'), 'data-previous-number':(previousGems || 0), "class": [('reward-panel'),('numerical'),('gems')] }, {"data-number":true,"data-number-unit":true,"data-previous-number":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img src=\"/images/pages/play/level/modal/reward_icon_gems.png\"/></div><div class=\"reward-text\">" + (jade.escape(null == (jade.interp = animate ? '+0' : '+'+gems) ? "" : jade.interp)) + "</div></div>");
}
if ( rewards.heroes)
{
// iterate rewards.heroes
;(function(){
  var $$obj = rewards.heroes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hero = $$obj[$index];

var hero = thangTypes[hero];
buf.push("<div" + (jade.attrs({ 'data-hero-thang-type':(hero.get('original')), "class": [('reward-panel'),('hero')] }, {"data-hero-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(hero.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_hero\" class=\"reward-text\">New Hero</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(hero.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hero = $$obj[$index];

var hero = thangTypes[hero];
buf.push("<div" + (jade.attrs({ 'data-hero-thang-type':(hero.get('original')), "class": [('reward-panel'),('hero')] }, {"data-hero-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(hero.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_hero\" class=\"reward-text\">New Hero</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(hero.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  }
}).call(this);

}
if ( rewards.items)
{
// iterate rewards.items
;(function(){
  var $$obj = rewards.items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

var item = thangTypes[item];
buf.push("<div" + (jade.attrs({ 'data-item-thang-type':(item.get('original')), "class": [('reward-panel'),('item')] }, {"data-item-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(item.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_item\" class=\"reward-text\">New Item</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(item.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

var item = thangTypes[item];
buf.push("<div" + (jade.attrs({ 'data-item-thang-type':(item.get('original')), "class": [('reward-panel'),('item')] }, {"data-item-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(item.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_item\" class=\"reward-text\">New Item</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(item.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var achievement = $$obj[$index];

if ( achievement.get('hidden'))
{
continue;
}
var animate = achievement.completed && !achievement.completedAWhileAgo
buf.push("<div" + (jade.attrs({ 'data-achievement-id':(achievement.id), 'data-animate':(animate), "class": [('achievement-panel'),(achievement.completedAWhileAgo ? 'earned' : '')] }, {"class":true,"data-achievement-id":true,"data-animate":true})) + ">");
var rewards = achievement.get('rewards') || {};
buf.push("<div class=\"achievement-description\">" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</div><div class=\"achievement-rewards\">");
var worth = achievement.worth;
var previousWorth = achievement.previousWorth;
var gems = achievement.gems;
var previousGems = achievement.previousGems;
if ( worth)
{
buf.push("<div" + (jade.attrs({ 'data-number':(worth), 'data-number-unit':('xp'), 'data-previous-number':(previousWorth || 0), "class": [('reward-panel'),('numerical'),('xp')] }, {"data-number":true,"data-number-unit":true,"data-previous-number":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img src=\"/images/pages/play/level/modal/reward_icon_xp.png\"/></div><div class=\"reward-text\">" + (jade.escape(null == (jade.interp = animate ? '+0' : '+'+worth) ? "" : jade.interp)) + "</div></div>");
}
if ( gems)
{
buf.push("<div" + (jade.attrs({ 'data-number':(gems), 'data-number-unit':('gem'), 'data-previous-number':(previousGems || 0), "class": [('reward-panel'),('numerical'),('gems')] }, {"data-number":true,"data-number-unit":true,"data-previous-number":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img src=\"/images/pages/play/level/modal/reward_icon_gems.png\"/></div><div class=\"reward-text\">" + (jade.escape(null == (jade.interp = animate ? '+0' : '+'+gems) ? "" : jade.interp)) + "</div></div>");
}
if ( rewards.heroes)
{
// iterate rewards.heroes
;(function(){
  var $$obj = rewards.heroes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hero = $$obj[$index];

var hero = thangTypes[hero];
buf.push("<div" + (jade.attrs({ 'data-hero-thang-type':(hero.get('original')), "class": [('reward-panel'),('hero')] }, {"data-hero-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(hero.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_hero\" class=\"reward-text\">New Hero</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(hero.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hero = $$obj[$index];

var hero = thangTypes[hero];
buf.push("<div" + (jade.attrs({ 'data-hero-thang-type':(hero.get('original')), "class": [('reward-panel'),('hero')] }, {"data-hero-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(hero.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_hero\" class=\"reward-text\">New Hero</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(hero.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  }
}).call(this);

}
if ( rewards.items)
{
// iterate rewards.items
;(function(){
  var $$obj = rewards.items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

var item = thangTypes[item];
buf.push("<div" + (jade.attrs({ 'data-item-thang-type':(item.get('original')), "class": [('reward-panel'),('item')] }, {"data-item-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(item.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_item\" class=\"reward-text\">New Item</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(item.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

var item = thangTypes[item];
buf.push("<div" + (jade.attrs({ 'data-item-thang-type':(item.get('original')), "class": [('reward-panel'),('item')] }, {"data-item-thang-type":true})) + "><div" + (jade.attrs({ "class": [('reward-image-container'),(animate ? 'pending-reward-image' : 'show')] }, {"class":true})) + "><img" + (jade.attrs({ 'src':(item.getPortraitURL()) }, {"src":true})) + "/></div>");
if ( animate)
{
buf.push("<div data-i18n=\"play_level.victory_new_item\" class=\"reward-text\">New Item</div>");
}
else
{
buf.push("<div class=\"reward-text\">" + (jade.escape(null == (jade.interp = i18n(item.attributes, 'name')) ? "" : jade.interp)) + "</div>");
}
buf.push("</div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  }
}).call(this);

}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div id=\"totals\"><div id=\"xp-wrapper\" class=\"total-wrapper\"><div id=\"xp-total\" class=\"total-count\">0</div><div class=\"total-label\"><span data-i18n=\"play_level.victory_experience_gained\" class=\"spr\">XP Gained</span>-<span data-i18n=\"general.player_level\" class=\"spl spr\">Level</span><span class=\"level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span></div><div class=\"xp-bar-outer\"><div class=\"xp-bar-already-achieved\"></div><div class=\"xp-bar-total\"></div></div></div><div id=\"gem-wrapper\" class=\"total-wrapper\"><div id=\"gem-total\" class=\"total-count\">0</div><div data-i18n=\"play_level.victory_gems_gained\" class=\"total-label\">Gems Gained</div></div></div>");
if ( view.shareURL)
{
buf.push("<div id=\"share-level-container\"><span class=\"share-level-label\"><span data-i18n=\"sharing.victory_share_prefix\">Share this link to invite your friends & family to</span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':(view.shareURL), 'target':('_blank') }, {"href":true,"target":true})) + ">");
if ( view.level.isType('game-dev'))
{
buf.push("<span data-i18n=\"sharing.victory_share_game\">play your game level</span>");
}
else
{
buf.push("<span data-i18n=\"sharing.victory_share_web\">view your webpage</span>");
}
buf.push("</a><span data-i18n=\"sharing.victory_share_suffix\"></span></span><div class=\"row\"><div class=\"col-sm-9\"><input" + (jade.attrs({ 'id':('share-level-input'), 'value':(view.shareURL), "class": [('text-h4'),('semibold'),('form-control'),('input-md')] }, {"value":true})) + "/></div><div class=\"col-sm-3\"><button id=\"share-level-btn\" class=\"btn btn-md btn-success btn-illustrated\"><span data-i18n=\"sharing.copy_url\">Copy URL</span></button></div></div></div>");
}
if ( features.codePlay)
{
buf.push("<img id=\"sweepstakes-entry\" src=\"/images/common/codeplay/SweepstakesEntry.png\"/>");
}
if ( me.get('anonymous'))
{
buf.push("<div class=\"sign-up-poke hide\"><div data-i18n=\"play_level.victory_sign_up_poke\" class=\"sign-up-blurb\">Want to save your code? Create a free account!</div><button data-dismiss=\"modal\" data-i18n=\"play_level.victory_sign_up\" class=\"btn btn-illustrated btn-warning sign-up-button btn-lg\">Sign Up to Save Progress</button></div>");
}
buf.push("<button id=\"saving-progress-label\" disabled=\"disabled\" data-i18n=\"play_level.victory_saving_progress\" class=\"btn btn-illustrated btn-lg btn-warning hide\">Saving Progress</button><div class=\"next-level-buttons\">");
if ( view.showHoc2016ExploreButton)
{
buf.push("<button id=\"continue-button\" data-i18n=\"play_level.explore_codecombat\" class=\"btn btn-illustrated btn-success btn-lg world-map-button next-level-button hide\"></button>");
}
else if ( readyToRank)
{
buf.push("<div class=\"ladder-submission-view\"></div>");
}
else if ( level.isType('hero-ladder'))
{
buf.push("<button" + (jade.attrs({ 'data-href':("/play/ladder/" + (level.get('slug')) + "#my-matches"), 'data-dismiss':("modal"), 'data-i18n':("play_level.victory_return_to_ladder"), "class": [('btn'),('btn-illustrated'),('btn-primary'),('btn-lg'),('return-to-ladder-button')] }, {"data-href":true,"data-dismiss":true,"data-i18n":true})) + ">Return to Ladder</button>");
}
else
{
buf.push("<button id=\"continue-button\" data-i18n=\"common.continue\" class=\"btn btn-illustrated btn-success btn-lg world-map-button next-level-button hide\">Continue</button>");
}
buf.push("</div>");
if ( !me.get('anonymous') && !showHourOfCodeDoneButton && !features.codePlay && showLeaderboard)
{
buf.push("<button data-dismiss=\"modal\" data-i18n=\"leaderboard.view_other_solutions\" class=\"btn btn-illustrated btn-success leaderboard-button btn-lg\">View Other Solutions</button>");
}
else if ( showReturnToCourse)
{
buf.push("<button data-dismiss=\"modal\" data-i18n=\"play_level.victory_go_home\" class=\"btn btn-illustrated btn-warning return-to-course-button btn-lg\">Go Home</button>");
}
if ( showHourOfCodeDoneButton)
{
buf.push("<div class=\"hour-of-code-done\"><div data-i18n=\"play_level.get_certificate\" class=\"hoc-label\"></div><a href=\"https://code.org/api/hour/finish\" data-i18n=\"play_level.finished_hoc\" class=\"btn btn-md btn-illustrated\"></a></div>");
}
if ( view.level.get('slug') == 'lost-viking')
{
buf.push("<div class=\"offer lost-viking\"><p><img src=\"/file/db/level/55144b509f0c4854051769c1/viking1.png\" class=\"pull-left\"/><img src=\"/file/db/level/55144b509f0c4854051769c1/viking_2.png\" class=\"pull-right\"/><span data-i18n=\"play_level.victory_viking_code_school\"></span></p><button data-i18n=\"play_level.victory_become_a_viking\" class=\"btn btn-illustrated btn-primary btn-lg world-map-button continue-from-offer-button\">Become a Viking</button></div>");
}
if ( features.codePlay)
{
buf.push("<a" + (jade.attrs({ 'href':(document.location.protocol + "//lenovogamestate.com/pages/products/") }, {"href":true})) + ">");
var url = "/images/common/codeplay/NA_VictoryPage_Y710_735x100_VictoryPage.png"
if ( me.isFromUk())
{
url = "/images/common/codeplay/UK_VictoryPage_Miix510_735x100_VictoryPage.png"
}
buf.push("<img" + (jade.attrs({ 'id':('lenovo-link'), 'src':(url) }, {"src":true})) + "/></a>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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

;require.register("views/play/level/modal/HeroVictoryModal", function(exports, require, module) {
var Achievement, AudioPlayer, CocoCollection, Course, CreateAccountModal, EarnedAchievement, HeroVictoryModal, LadderSubmissionView, Level, LevelFeedback, LocalMongo, ModalView, ThangType, User, campaignEndLevels, storage, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

CreateAccountModal = require('views/core/CreateAccountModal');

template = require('templates/play/level/modal/hero-victory-modal');

Achievement = require('models/Achievement');

EarnedAchievement = require('models/EarnedAchievement');

CocoCollection = require('collections/CocoCollection');

LocalMongo = require('lib/LocalMongo');

utils = require('core/utils');

ThangType = require('models/ThangType');

LadderSubmissionView = require('views/play/common/LadderSubmissionView');

AudioPlayer = require('lib/AudioPlayer');

User = require('models/User');

utils = require('core/utils');

Course = require('models/Course');

Level = require('models/Level');

LevelFeedback = require('models/LevelFeedback');

storage = require('core/storage');

module.exports = HeroVictoryModal = (function(superClass) {
  extend(HeroVictoryModal, superClass);

  HeroVictoryModal.prototype.id = 'hero-victory-modal';

  HeroVictoryModal.prototype.template = template;

  HeroVictoryModal.prototype.closeButton = false;

  HeroVictoryModal.prototype.closesOnClickOutside = false;

  HeroVictoryModal.prototype.subscriptions = {
    'ladder:game-submitted': 'onGameSubmitted'
  };

  HeroVictoryModal.prototype.events = {
    'click #continue-button': 'onClickContinue',
    'click .leaderboard-button': 'onClickLeaderboard',
    'click .return-to-course-button': 'onClickReturnToCourse',
    'click .return-to-ladder-button': 'onClickReturnToLadder',
    'click .sign-up-button': 'onClickSignupButton',
    'click .continue-from-offer-button': 'onClickContinueFromOffer',
    'click .skip-offer-button': 'onClickSkipOffer',
    'click #share-level-btn': 'onClickShareLevelButton',
    'mouseover .rating i': function(e) {
      return this.showStars(this.starNum($(e.target)));
    },
    'mouseout .rating i': function() {
      return this.showStars();
    },
    'click .rating i': function(e) {
      this.setStars(this.starNum($(e.target)));
      return this.$el.find('.review, .review-label').show();
    },
    'keypress .review textarea': function() {
      return this.saveReviewEventually();
    }
  };

  function HeroVictoryModal(options) {
    this.tickSequentialAnimation = bind(this.tickSequentialAnimation, this);
    var achievements;
    HeroVictoryModal.__super__.constructor.call(this, options);
    this.courseID = options.courseID;
    this.courseInstanceID = options.courseInstanceID;
    this.session = options.session;
    this.level = options.level;
    this.thangTypes = {};
    if (this.level.isType('hero', 'hero-ladder', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      achievements = new CocoCollection([], {
        url: "/db/achievement?related=" + (this.session.get('level').original),
        model: Achievement
      });
      this.achievements = this.supermodel.loadCollection(achievements, 'achievements').model;
      this.listenToOnce(this.achievements, 'sync', this.onAchievementsLoaded);
      this.readyToContinue = false;
      this.waitingToContinueSince = new Date();
      this.previousXP = me.get('points', true);
      this.previousLevel = me.level();
    } else {
      this.readyToContinue = true;
    }
    this.playSound('victory');
    if (this.level.isType('course', 'course-ladder')) {
      this.saveReviewEventually = _.debounce(this.saveReviewEventually, 2000);
      this.loadExistingFeedback();
    }
    if (this.level.get('shareable') === 'project') {
      this.shareURL = window.location.origin + "/play/" + (this.level.get('type')) + "-level/" + (this.level.get('slug')) + "/" + this.session.id;
    }
  }

  HeroVictoryModal.prototype.destroy = function() {
    var ref;
    clearInterval(this.sequentialAnimationInterval);
    if (this.$el.find('.review textarea').val()) {
      this.saveReview();
    }
    if ((ref = this.feedback) != null) {
      ref.off();
    }
    return HeroVictoryModal.__super__.destroy.call(this);
  };

  HeroVictoryModal.prototype.onHidden = function() {
    Backbone.Mediator.publish('music-player:exit-menu', {});
    return HeroVictoryModal.__super__.onHidden.call(this);
  };

  HeroVictoryModal.prototype.loadExistingFeedback = function() {
    var url;
    url = "/db/level/" + this.level.id + "/feedback";
    this.feedback = new LevelFeedback();
    this.feedback.setURL(url);
    this.feedback.fetch({
      cache: false
    });
    this.listenToOnce(this.feedback, 'sync', function() {
      return this.onFeedbackLoaded();
    });
    return this.listenToOnce(this.feedback, 'error', function() {
      return this.onFeedbackNotFound();
    });
  };

  HeroVictoryModal.prototype.onFeedbackLoaded = function() {
    this.feedback.url = function() {
      return '/db/level.feedback/' + this.id;
    };
    this.$el.find('.review textarea').val(this.feedback.get('review'));
    this.$el.find('.review, .review-label').show();
    return this.showStars();
  };

  HeroVictoryModal.prototype.onFeedbackNotFound = function() {
    this.feedback = new LevelFeedback();
    this.feedback.set('levelID', this.level.get('slug') || this.level.id);
    this.feedback.set('levelName', this.level.get('name') || '');
    this.feedback.set('level', {
      majorVersion: this.level.get('version').major,
      original: this.level.get('original')
    });
    return this.showStars();
  };

  HeroVictoryModal.prototype.onAchievementsLoaded = function() {
    var achievement, achievementIDs, ea, hadOneCompleted, i, j, k, len, len1, len2, ref, ref1, rewards, thangType, thangTypeOriginal, thangTypeOriginals;
    this.achievements.models = _.filter(this.achievements.models, function(m) {
      var ref;
      return !((ref = m.get('query')) != null ? ref.ladderAchievementDifficulty : void 0);
    });
    this.$el.toggleClass('full-achievements', this.achievements.models.length === 3);
    thangTypeOriginals = [];
    achievementIDs = [];
    ref = this.achievements.models;
    for (i = 0, len = ref.length; i < len; i++) {
      achievement = ref[i];
      rewards = achievement.get('rewards') || {};
      thangTypeOriginals.push(rewards.heroes || []);
      thangTypeOriginals.push(rewards.items || []);
      achievement.completed = LocalMongo.matchesQuery(this.session.attributes, achievement.get('query'));
      if (achievement.completed) {
        achievementIDs.push(achievement.id);
      }
    }
    thangTypeOriginals = _.uniq(_.flatten(thangTypeOriginals));
    for (j = 0, len1 = thangTypeOriginals.length; j < len1; j++) {
      thangTypeOriginal = thangTypeOriginals[j];
      thangType = new ThangType();
      thangType.url = "/db/thang.type/" + thangTypeOriginal + "/version";
      thangType.project = ['original', 'rasterIcon', 'name', 'slug', 'soundTriggers', 'featureImages', 'gems', 'heroClass', 'description', 'components', 'extendedName', 'unlockLevelName', 'i18n'];
      this.thangTypes[thangTypeOriginal] = this.supermodel.loadModel(thangType).model;
    }
    this.newEarnedAchievements = [];
    hadOneCompleted = false;
    ref1 = this.achievements.models;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      achievement = ref1[k];
      if (!achievement.completed) {
        continue;
      }
      hadOneCompleted = true;
      ea = new EarnedAchievement({
        collection: achievement.get('collection'),
        triggeredBy: this.session.id,
        achievement: achievement.id
      });
      ea.save();
      this.newEarnedAchievements.push(ea);
      this.listenToOnce(ea, 'sync', function() {
        if (_.all((function() {
          var l, len3, ref2, results;
          ref2 = this.newEarnedAchievements;
          results = [];
          for (l = 0, len3 = ref2.length; l < len3; l++) {
            ea = ref2[l];
            results.push(ea.id);
          }
          return results;
        }).call(this))) {
          this.newEarnedAchievementsResource.markLoaded();
          this.listenToOnce(me, 'sync', function() {
            this.readyToContinue = true;
            return this.updateSavingProgressStatus();
          });
          if (!me.loading) {
            return me.fetch({
              cache: false
            });
          }
        }
      });
    }
    if (!hadOneCompleted) {
      this.readyToContinue = true;
    }
    if (this.newEarnedAchievements.length) {
      return this.newEarnedAchievementsResource = this.supermodel.addSomethingResource('earned achievements');
    }
  };

  HeroVictoryModal.prototype.getRenderData = function() {
    var achievedAmount, achievement, c, earnedAchievement, earnedAchievementMap, elapsed, enough, func, gameDevHoc, i, j, lastLevel, lastLevelOriginal, len, len1, pixelCode, previousAmount, proportionalTo, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, rewards, showDone, tooMuch;
    c = HeroVictoryModal.__super__.getRenderData.call(this);
    c.levelName = utils.i18n(this.level.attributes, 'name');
    if (this.level.isType('hero', 'game-dev', 'web-dev')) {
      c.victoryText = utils.i18n((ref = this.level.get('victory')) != null ? ref : {}, 'body');
    }
    earnedAchievementMap = _.indexBy(this.newEarnedAchievements || [], function(ea) {
      return ea.get('achievement');
    });
    ref2 = ((ref1 = this.achievements) != null ? ref1.models : void 0) || [];
    for (i = 0, len = ref2.length; i < len; i++) {
      achievement = ref2[i];
      earnedAchievement = earnedAchievementMap[achievement.id];
      if (earnedAchievement) {
        achievement.completedAWhileAgo = new Date().getTime() - Date.parse(earnedAchievement.attributes.changed) > 30 * 1000;
      }
      achievement.worth = achievement.get('worth', true);
      achievement.gems = (ref3 = achievement.get('rewards')) != null ? ref3.gems : void 0;
    }
    c.achievements = ((ref4 = this.achievements) != null ? ref4.models.slice() : void 0) || [];
    ref5 = c.achievements;
    for (j = 0, len1 = ref5.length; j < len1; j++) {
      achievement = ref5[j];
      achievement.description = utils.i18n(achievement.attributes, 'description');
      if (!(this.supermodel.finished() && (proportionalTo = achievement.get('proportionalTo')))) {
        continue;
      }
      achievedAmount = utils.getByPath(this.session.attributes, proportionalTo);
      previousAmount = Math.max(0, achievedAmount - 1);
      func = achievement.getExpFunction();
      achievement.previousWorth = ((ref6 = achievement.get('worth')) != null ? ref6 : 0) * func(previousAmount);
      achievement.worth = ((ref7 = achievement.get('worth')) != null ? ref7 : 0) * func(achievedAmount);
      rewards = achievement.get('rewards');
      if (rewards != null ? rewards.gems : void 0) {
        achievement.gems = (rewards != null ? rewards.gems : void 0) * func(achievedAmount);
      }
      if (rewards != null ? rewards.gems : void 0) {
        achievement.previousGems = (rewards != null ? rewards.gems : void 0) * func(previousAmount);
      }
    }
    c.thangTypes = this.thangTypes;
    c.me = me;
    c.readyToRank = this.level.isType('hero-ladder', 'course-ladder') && this.session.readyToRank();
    c.level = this.level;
    c.i18n = utils.i18n;
    elapsed = new Date() - new Date(me.get('dateCreated'));
    if (me.get('hourOfCode')) {
      gameDevHoc = storage.load('should-return-to-game-dev-hoc');
      lastLevelOriginal = gameDevHoc ? '57ee6f5786cf4e1f00afca2c' : '541c9a30c6362edfb0f34479';
      lastLevel = this.level.get('original') === lastLevelOriginal;
      enough = elapsed >= 20 * 60 * 1000 || lastLevel;
      tooMuch = elapsed > 120 * 60 * 1000;
      showDone = (elapsed >= 30 * 60 * 1000 && !tooMuch) || lastLevel;
      if (enough && !tooMuch && !me.get('hourOfCodeComplete')) {
        pixelCode = gameDevHoc ? 'code_combat_gamedev' : 'code_combat';
        $('body').append($("<img src='https://code.org/api/hour/finish_" + pixelCode + ".png' style='visibility: hidden;'>"));
        me.set('hourOfCodeComplete', true);
        me.patch();
        if ((ref8 = window.tracker) != null) {
          ref8.trackEvent('Hour of Code Finish');
        }
      }
      c.showHourOfCodeDoneButton = showDone;
      this.showHoc2016ExploreButton = gameDevHoc && lastLevel;
    }
    c.showLeaderboard = ((ref9 = this.level.get('scoreTypes')) != null ? ref9.length : void 0) > 0 && !this.level.isType('course');
    c.showReturnToCourse = !c.showLeaderboard && !me.get('anonymous') && this.level.isType('course', 'course-ladder');
    c.isCourseLevel = this.level.isType('course');
    c.currentCourseName = (ref10 = this.course) != null ? ref10.get('name') : void 0;
    c.currentLevelName = (ref11 = this.level) != null ? ref11.get('name') : void 0;
    c.nextLevelName = (ref12 = this.nextLevel) != null ? ref12.get('name') : void 0;
    return c;
  };

  HeroVictoryModal.prototype.afterRender = function() {
    var hero, original, ref;
    HeroVictoryModal.__super__.afterRender.call(this);
    this.$el.toggleClass('with-achievements', this.level.isType('hero', 'hero-ladder', 'game-dev', 'web-dev'));
    if (!this.supermodel.finished()) {
      return;
    }
    ref = this.thangTypes;
    for (original in ref) {
      hero = ref[original];
      this.playSelectionSound(hero, true);
    }
    this.updateSavingProgressStatus();
    this.initializeAnimations();
    if (this.level.isType('hero-ladder', 'course-ladder')) {
      this.ladderSubmissionView = new LadderSubmissionView({
        session: this.session,
        level: this.level
      });
      return this.insertSubView(this.ladderSubmissionView, this.$el.find('.ladder-submission-view'));
    }
  };

  HeroVictoryModal.prototype.initializeAnimations = function() {
    var complete, i, len, panel, panels;
    if (!this.level.isType('hero', 'hero-ladder', 'game-dev', 'web-dev')) {
      return this.endSequentialAnimations();
    }
    this.updateXPBars(0);
    this.$el.find('#victory-header').delay(250).queue(function() {
      return $(this).removeClass('out').dequeue();
    });
    complete = _.once(_.bind(this.beginSequentialAnimations, this));
    this.animatedPanels = $();
    panels = this.$el.find('.achievement-panel');
    for (i = 0, len = panels.length; i < len; i++) {
      panel = panels[i];
      panel = $(panel);
      if (!panel.data('animate')) {
        continue;
      }
      this.animatedPanels = this.animatedPanels.add(panel);
      panel.delay(500);
      panel.queue(function() {
        $(this).addClass('earned');
        return $(this).dequeue();
      });
      panel.delay(500);
      panel.queue(function() {
        $(this).find('.reward-image-container').addClass('show');
        return $(this).dequeue();
      });
      panel.delay(500);
      panel.queue(function() {
        return complete();
      });
    }
    this.animationComplete = !this.animatedPanels.length;
    if (this.animationComplete) {
      return complete();
    }
  };

  HeroVictoryModal.prototype.beginSequentialAnimations = function() {
    var i, j, len, len1, panel, ref, ref1;
    if (this.destroyed) {
      return;
    }
    if (!this.level.isType('hero', 'hero-ladder', 'game-dev', 'web-dev')) {
      return;
    }
    this.sequentialAnimatedPanels = _.map(this.animatedPanels.find('.reward-panel'), function(panel) {
      return {
        number: $(panel).data('number'),
        previousNumber: $(panel).data('previous-number'),
        textEl: $(panel).find('.reward-text'),
        rootEl: $(panel),
        unit: $(panel).data('number-unit'),
        hero: $(panel).data('hero-thang-type'),
        item: $(panel).data('item-thang-type')
      };
    });
    this.totalXP = 0;
    ref = this.sequentialAnimatedPanels;
    for (i = 0, len = ref.length; i < len; i++) {
      panel = ref[i];
      if (panel.unit === 'xp') {
        this.totalXP += panel.number;
      }
    }
    this.totalGems = 0;
    ref1 = this.sequentialAnimatedPanels;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      panel = ref1[j];
      if (panel.unit === 'gem') {
        this.totalGems += panel.number;
      }
    }
    this.gemEl = $('#gem-total');
    this.XPEl = $('#xp-total');
    this.totalXPAnimated = this.totalGemsAnimated = this.lastTotalXP = this.lastTotalGems = 0;
    this.sequentialAnimationStart = new Date();
    return this.sequentialAnimationInterval = setInterval(this.tickSequentialAnimation, 1000 / 60);
  };

  HeroVictoryModal.prototype.tickSequentialAnimation = function() {
    var duration, gemTrigger, newGems, newXP, panel, ratio, thangType, totalGems, totalXP, xpTrigger;
    if (!(panel = this.sequentialAnimatedPanels[0])) {
      return this.endSequentialAnimations();
    }
    if (panel.number) {
      duration = Math.log(panel.number + 1) / Math.LN10 * 1000;
    } else {
      duration = 1000;
    }
    ratio = this.getEaseRatio(new Date() - this.sequentialAnimationStart, duration);
    if (panel.unit === 'xp') {
      newXP = Math.floor(ratio * (panel.number - panel.previousNumber));
      totalXP = this.totalXPAnimated + newXP;
      if (totalXP !== this.lastTotalXP) {
        panel.textEl.text('+' + newXP);
        this.XPEl.text(totalXP);
        this.updateXPBars(totalXP);
        xpTrigger = 'xp-' + (totalXP % 6);
        this.playSound(xpTrigger, 0.5 + ratio / 2);
        if (totalXP >= 1000 && this.lastTotalXP < 1000) {
          this.XPEl.addClass('four-digits');
        }
        if (totalXP >= 10000 && this.lastTotalXP < 10000) {
          this.XPEl.addClass('five-digits');
        }
        this.lastTotalXP = totalXP;
      }
    } else if (panel.unit === 'gem') {
      newGems = Math.floor(ratio * (panel.number - panel.previousNumber));
      totalGems = this.totalGemsAnimated + newGems;
      if (totalGems !== this.lastTotalGems) {
        panel.textEl.text('+' + newGems);
        this.gemEl.text(totalGems);
        gemTrigger = 'gem-' + (parseInt(panel.number * ratio) % 4);
        this.playSound(gemTrigger, 0.5 + ratio / 2);
        if (totalGems >= 1000 && this.lastTotalGems < 1000) {
          this.gemEl.addClass('four-digits');
        }
        if (totalGems >= 10000 && this.lastTotalGems < 10000) {
          this.gemEl.addClass('five-digits');
        }
        this.lastTotalGems = totalGems;
      }
    } else if (panel.item) {
      thangType = this.thangTypes[panel.item];
      panel.textEl.text(utils.i18n(thangType.attributes, 'name'));
      if ((0.5 < ratio && ratio < 0.6)) {
        this.playSound('item-unlocked');
      }
    } else if (panel.hero) {
      thangType = this.thangTypes[panel.hero];
      panel.textEl.text(utils.i18n(thangType.attributes, 'name'));
      if ((0.5 < ratio && ratio < 0.6)) {
        this.playSelectionSound(thangType);
      }
    }
    if (ratio === 1) {
      panel.rootEl.removeClass('animating').find('.reward-image-container img').removeClass('pulse');
      this.sequentialAnimationStart = new Date();
      if (panel.unit === 'xp') {
        this.totalXPAnimated += panel.number - panel.previousNumber;
      } else if (panel.unit === 'gem') {
        this.totalGemsAnimated += panel.number - panel.previousNumber;
      }
      this.sequentialAnimatedPanels.shift();
      return;
    }
    return panel.rootEl.addClass('animating').find('.reward-image-container').removeClass('pending-reward-image').find('img').addClass('pulse');
  };

  HeroVictoryModal.prototype.getEaseRatio = function(timeSinceStart, duration) {
    var t;
    timeSinceStart = Math.min(timeSinceStart, duration);
    t = 2 * timeSinceStart / duration;
    if (t < 1) {
      return 0.5 * t * t;
    }
    --t;
    return -0.5 * (t * (t - 2) - 1);
  };

  HeroVictoryModal.prototype.updateXPBars = function(achievedXP) {
    var alreadyAchievedPercentage, currentLevel, currentLevelXP, currentXP, levelLabel, leveledUp, newlyAchievedPercentage, nextLevel, nextLevelXP, previousLevel, previousXP, totalXPNeeded, xpBarJustEarned, xpBarTotal, xpEl;
    previousXP = this.previousXP;
    if (me.isInGodMode()) {
      previousXP = previousXP + 1000000;
    }
    previousLevel = this.previousLevel;
    currentXP = previousXP + achievedXP;
    currentLevel = User.levelFromExp(currentXP);
    currentLevelXP = User.expForLevel(currentLevel);
    nextLevel = currentLevel + 1;
    nextLevelXP = User.expForLevel(nextLevel);
    leveledUp = currentLevel > previousLevel;
    totalXPNeeded = nextLevelXP - currentLevelXP;
    alreadyAchievedPercentage = 100 * (previousXP - currentLevelXP) / totalXPNeeded;
    if (alreadyAchievedPercentage < 0) {
      alreadyAchievedPercentage = 0;
    }
    if (leveledUp) {
      newlyAchievedPercentage = 100 * (currentXP - currentLevelXP) / totalXPNeeded;
    } else {
      newlyAchievedPercentage = 100 * achievedXP / totalXPNeeded;
    }
    xpEl = $('#xp-wrapper');
    xpBarJustEarned = xpEl.find('.xp-bar-already-achieved').css('width', alreadyAchievedPercentage + '%');
    xpBarTotal = xpEl.find('.xp-bar-total').css('width', (alreadyAchievedPercentage + newlyAchievedPercentage) + '%');
    levelLabel = xpEl.find('.level');
    utils.replaceText(levelLabel, currentLevel);
    if (leveledUp && (!this.displayedLevel || currentLevel > this.displayedLevel)) {
      this.playSound('level-up');
    }
    return this.displayedLevel = currentLevel;
  };

  HeroVictoryModal.prototype.endSequentialAnimations = function() {
    clearInterval(this.sequentialAnimationInterval);
    this.animationComplete = true;
    this.updateSavingProgressStatus();
    return Backbone.Mediator.publish('music-player:enter-menu', {
      terrain: this.level.get('terrain', true) || 'forest'
    });
  };

  HeroVictoryModal.prototype.updateSavingProgressStatus = function() {
    this.$el.find('#saving-progress-label').toggleClass('hide', this.readyToContinue);
    this.$el.find('.next-level-button').toggleClass('hide', !this.readyToContinue);
    return this.$el.find('.sign-up-poke').toggleClass('hide', !this.readyToContinue);
  };

  HeroVictoryModal.prototype.onGameSubmitted = function(e) {
    return this.returnToLadder();
  };

  HeroVictoryModal.prototype.returnToLadder = function() {
    var ladderURL, leagueID, leagueType, viewArgs;
    viewArgs = [
      {
        supermodel: this.options.hasReceivedMemoryWarning ? null : this.supermodel
      }, this.level.get('slug')
    ];
    ladderURL = "/play/ladder/" + (this.level.get('slug') || this.level.id);
    if (leagueID = this.courseInstanceID || this.getQueryVariable('league')) {
      leagueType = this.level.isType('course-ladder') ? 'course' : 'clan';
      viewArgs.push(leagueType);
      viewArgs.push(leagueID);
      ladderURL += "/" + leagueType + "/" + leagueID;
    }
    ladderURL += '#my-matches';
    return Backbone.Mediator.publish('router:navigate', {
      route: ladderURL,
      viewClass: 'views/ladder/LadderView',
      viewArgs: viewArgs
    });
  };

  HeroVictoryModal.prototype.playSelectionSound = function(hero, preload) {
    var name, ref, sound, sounds;
    if (preload == null) {
      preload = false;
    }
    if (!(sounds = (ref = hero.get('soundTriggers')) != null ? ref.selected : void 0)) {
      return;
    }
    if (!(sound = sounds[Math.floor(Math.random() * sounds.length)])) {
      return;
    }
    name = AudioPlayer.nameForSoundReference(sound);
    if (preload) {
      return AudioPlayer.preloadSoundReference(sound);
    } else {
      return AudioPlayer.playSound(name, 1);
    }
  };

  HeroVictoryModal.prototype.getNextLevelCampaign = function() {
    var campaign, ref, ref1;
    campaign = this.level.get('campaign');
    if (ref = this.level.get('slug'), indexOf.call(campaignEndLevels, ref) >= 0) {
      campaign = '';
    }
    if ((campaign === 'dungeon' || ((ref1 = this.level.get('slug')) === 'kithgard-gates' || ref1 === 'game-grove')) && storage.load('should-return-to-game-dev-hoc')) {
      campaign = 'game-dev-hoc';
    }
    return campaign;
  };

  HeroVictoryModal.prototype.getNextLevelLink = function(returnToCourse) {
    var link, nextCampaign;
    if (returnToCourse == null) {
      returnToCourse = false;
    }
    if (this.level.isType('course')) {
      link = "/students";
      if (this.courseID) {
        link += "/" + this.courseID;
        if (this.courseInstanceID) {
          link += "/" + this.courseInstanceID;
        }
      }
    } else {
      link = '/play';
      nextCampaign = this.getNextLevelCampaign();
      link += '/' + nextCampaign;
    }
    return link;
  };

  HeroVictoryModal.prototype.onClickContinue = function(e, extraOptions) {
    var leagueID, navigationEvent, nextLevelLink, options, ref, ref1, viewArgs, viewClass;
    if (extraOptions == null) {
      extraOptions = null;
    }
    this.playSound('menu-button-click');
    nextLevelLink = this.getNextLevelLink(extraOptions != null ? extraOptions.returnToCourse : void 0);
    options = {
      justBeatLevel: this.level,
      supermodel: this.options.hasReceivedMemoryWarning ? null : this.supermodel
    };
    if (extraOptions) {
      _.merge(options, extraOptions);
    }
    if (this.showHoc2016ExploreButton) {
      nextLevelLink = '/play';
      viewClass = 'views/play/CampaignView';
      viewArgs = [options];
    } else if (this.level.isType('course') && this.nextLevel && !options.returnToCourse) {
      viewClass = 'views/play/level/PlayLevelView';
      options.courseID = this.courseID;
      options.courseInstanceID = this.courseInstanceID;
      viewArgs = [options, this.nextLevel.get('slug')];
    } else if (this.level.isType('course')) {
      viewClass = 'views/courses/CoursesView';
      viewArgs = [options];
      if (this.courseID) {
        viewClass = 'views/courses/CourseDetailsView';
        viewArgs.push(this.courseID);
        if (this.courseInstanceID) {
          viewArgs.push(this.courseInstanceID);
        }
      }
    } else if (this.level.isType('course-ladder')) {
      leagueID = this.courseInstanceID || this.getQueryVariable('league');
      nextLevelLink = "/play/ladder/" + (this.level.get('slug'));
      if (leagueID) {
        nextLevelLink += "/course/" + leagueID;
      }
      viewClass = 'views/ladder/LadderView';
      viewArgs = [options, this.level.get('slug')];
      if (leagueID) {
        viewArgs = viewArgs.concat(['course', leagueID]);
      }
    } else {
      if (ref = this.level.get('slug'), indexOf.call(campaignEndLevels, ref) >= 0) {
        options.worldComplete = this.level.get('campaign') || true;
      }
      viewClass = 'views/play/CampaignView';
      viewArgs = [options, this.getNextLevelCampaign()];
    }
    navigationEvent = {
      route: nextLevelLink,
      viewClass: viewClass,
      viewArgs: viewArgs
    };
    if (this.level.get('slug') === 'lost-viking' && !((ref1 = me.get('age')) === '0-13' || ref1 === '14-17')) {
      return this.showOffer(navigationEvent);
    } else {
      return Backbone.Mediator.publish('router:navigate', navigationEvent);
    }
  };

  HeroVictoryModal.prototype.onClickLeaderboard = function(e) {
    return this.onClickContinue(e, {
      showLeaderboard: true
    });
  };

  HeroVictoryModal.prototype.onClickReturnToCourse = function(e) {
    return this.onClickContinue(e, {
      returnToCourse: true
    });
  };

  HeroVictoryModal.prototype.onClickReturnToLadder = function(e) {
    this.playSound('menu-button-click');
    e.preventDefault();
    return this.returnToLadder();
  };

  HeroVictoryModal.prototype.onClickSignupButton = function(e) {
    var ref;
    e.preventDefault();
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Started Signup', {
        category: 'Play Level',
        label: 'Hero Victory Modal',
        level: this.level.get('slug')
      });
    }
    return this.openModalView(new CreateAccountModal());
  };

  HeroVictoryModal.prototype.showOffer = function(navigationEventUponCompletion) {
    this.navigationEventUponCompletion = navigationEventUponCompletion;
    this.$el.find('.modal-footer > *').hide();
    return this.$el.find(".modal-footer > .offer." + (this.level.get('slug'))).show();
  };

  HeroVictoryModal.prototype.onClickContinueFromOffer = function(e) {
    var url;
    url = {
      'lost-viking': 'http://www.vikingcodeschool.com/codecombat?utm_source=codecombat&utm_medium=viking_level&utm_campaign=affiliate&ref=Code+Combat+Elite'
    }[this.level.get('slug')];
    Backbone.Mediator.publish('router:navigate', this.navigationEventUponCompletion);
    if (url) {
      return window.open(url, '_blank');
    }
  };

  HeroVictoryModal.prototype.onClickSkipOffer = function(e) {
    return Backbone.Mediator.publish('router:navigate', this.navigationEventUponCompletion);
  };

  HeroVictoryModal.prototype.onClickShareLevelButton = function() {
    this.$('#share-level-input').val(this.shareURL).select();
    return this.tryCopy();
  };

  HeroVictoryModal.prototype.starNum = function(starEl) {
    return starEl.prevAll('i').length + 1;
  };

  HeroVictoryModal.prototype.showStars = function(num) {
    var ref, stars;
    this.$el.find('.rating').show();
    if (num == null) {
      num = ((ref = this.feedback) != null ? ref.get('rating') : void 0) || 0;
    }
    stars = this.$el.find('.rating i');
    stars.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
    return stars.slice(0, num).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
  };

  HeroVictoryModal.prototype.setStars = function(num) {
    this.feedback.set('rating', num);
    return this.feedback.save();
  };

  HeroVictoryModal.prototype.saveReviewEventually = function() {
    return this.saveReview();
  };

  HeroVictoryModal.prototype.saveReview = function() {
    this.feedback.set('review', this.$el.find('.review textarea').val());
    return this.feedback.save();
  };

  return HeroVictoryModal;

})(ModalView);

campaignEndLevels = ['kithgard-gates', 'kithgard-mastery', 'tabula-rasa', 'wanted-poster', 'siege-of-stonehold', 'go-fetch', 'palimpsest', 'quizlet', 'clash-of-clones', 'summits-gate'];
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/modal/HeroVictoryModal.js.map
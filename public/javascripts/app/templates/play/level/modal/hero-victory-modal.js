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

;
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/hero-victory-modal.js.map
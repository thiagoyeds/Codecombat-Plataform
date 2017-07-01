require.register("templates/user/main-user-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,moment = locals_.moment,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div class=\"clearfix\">");
if ( view.userData && view.viewName)
{
buf.push("<ol class=\"breadcrumb\"><li><a" + (jade.attrs({ 'href':("/user/" + (view.userData.getSlugOrID()) + "") }, {"href":true})) + ">" + (jade.escape((jade.interp = view.userData.displayName()) == null ? '' : jade.interp)) + "</a></li><li class=\"active\">" + (jade.escape((jade.interp = view.viewName) == null ? '' : jade.interp)) + "</li></ol>");
}
if ( !view.userData || view.userData.loading)
{
buf.push("LOADING");
}
buf.push("</div><ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"nav.profile\" class=\"active\"></li></ol>");
if ( view.user)
{
var playerLevel = view.user.level()
var emails = view.user.getEnabledEmails()
buf.push("<div class=\"vertical-buffer\"></div><div class=\"row\"><div class=\"left-column\"><div class=\"profile-wrapper\"><img" + (jade.attrs({ 'src':("" + (view.user.getPhotoURL(150)) + ""), 'alt':(""), "class": [('picture')] }, {"src":true,"alt":true})) + "/><div class=\"profile-info\"><h3 class=\"name\">" + (jade.escape(null == (jade.interp = view.user.get('name')) ? "" : jade.interp)) + "</h3>");
if ( view.favoriteLanguage)
{
buf.push("<div class=\"extra-info\"><span data-i18n=\"user.favorite_prefix\">Favorite language is</span><strong class=\"favorite-language\">" + (jade.escape(null == (jade.interp = view.favoriteLanguage) ? "" : jade.interp)) + "</strong><span data-i18n=\"user.favorite_postfix\">.            </span></div>");
}
if ( playerLevel)
{
buf.push("<div class=\"extra-info\"><span data-i18n=\"general.player_level\" class=\"spr\">Level</span><strong>" + (jade.escape(null == (jade.interp = playerLevel        ) ? "" : jade.interp)) + "</strong></div>");
}
buf.push("</div></div><!-- TODO: fix this, use some other method for finding contributor classes other than email settings, since they're private... Maybe achievements?-->");
if ( emails)
{
buf.push("<ul class=\"contributor-categories\"><!--li.contributor-category<img src=\"/images/pages/user/general.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\">CodeCombateer</h4>-->");
if ( emails.adventurerNews)
{
buf.push("<li class=\"contributor-category\"><img src=\"/images/pages/user/adventurer.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\"><a href=\"/contribute#adventurer\" data-i18n=\"classes.adventurer_title\">Adventurer</a></h4></li>");
}
if ( emails.ambassadorNews)
{
buf.push("<li class=\"contributor-category\"><img src=\"/images/pages/user/ambassador.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\"><a href=\"/contribute#ambassador\" data-i18n=\"classes.ambassador_title\">Ambassador</a></h4></li>");
}
if ( emails.archmageNews)
{
buf.push("<li class=\"contributor-category\"><img src=\"/images/pages/user/archmage.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\"><a href=\"/contribute#archmage\" data-i18n=\"classes.archmage_title\">Archmage</a></h4></li>");
}
if ( emails.artisanNews)
{
buf.push("<li class=\"contributor-category\"><img src=\"/images/pages/user/artisan.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\"><a href=\"/contribute#artisan\" data-i18n=\"classes.artisan_title\">Artisan</a></h4></li>");
}
if ( emails.scribeNews)
{
buf.push("<li class=\"contributor-category\"><img src=\"/images/pages/user/scribe.png\" class=\"contributor-image\"/><h4 class=\"contributor-title\"><a href=\"/contribute#scribe\" data-i18n=\"classes.scribe_title\">Scribe</a></h4></li>");
}
buf.push("</ul>");
}
buf.push("</div><div class=\"right-column\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"clans.clans\" class=\"panel-title\">Clans</h3></div>");
if ( (!view.clanModels))
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"common.loading\"></p></div>");
}
else if ( (view.clanModels.length))
{
buf.push("<table class=\"table\"><tr><th data-i18n=\"clans.name\" class=\"col-xs-4\">Name</th><th data-i18n=\"clans.chieftain\" class=\"col-xs-4\">Chieftain</th><th data-i18n=\"play.heroes\" class=\"col-xs-4\">Heroes</th></tr>");
// iterate view.clanModels
;(function(){
  var $$obj = view.clanModels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var clan = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("/clans/" + (clan.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = clan.get('name')) ? "" : jade.interp)) + "</a></td><td>");
if ( view.idNameMap && view.idNameMap[clan.get('ownerID')])
{
buf.push("<a" + (jade.attrs({ 'href':("/user/" + (clan.get('ownerID')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = view.idNameMap[clan.get('ownerID')]) ? "" : jade.interp)) + "</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':("/user/" + (clan.get('ownerID')) + "") }, {"href":true})) + ">Anonymous</a>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = clan.get('members').length) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var clan = $$obj[$index];

buf.push("<tr><td><a" + (jade.attrs({ 'href':("/clans/" + (clan.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = clan.get('name')) ? "" : jade.interp)) + "</a></td><td>");
if ( view.idNameMap && view.idNameMap[clan.get('ownerID')])
{
buf.push("<a" + (jade.attrs({ 'href':("/user/" + (clan.get('ownerID')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = view.idNameMap[clan.get('ownerID')]) ? "" : jade.interp)) + "</a>");
}
else
{
buf.push("<a" + (jade.attrs({ 'href':("/user/" + (clan.get('ownerID')) + "") }, {"href":true})) + ">Anonymous</a>");
}
buf.push("</td><td>" + (jade.escape(null == (jade.interp = clan.get('members').length) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"user.not_member_of_clans\">Not a member of any clans yet.</p></div>");
}
buf.push("</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"user.singleplayer_title\" class=\"panel-title\">Singleplayer Levels</h3></div>");
if ( (!view.singlePlayerSessions))
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"common.loading\">Loading...</p></div>");
}
else if ( (view.singlePlayerSessions.length))
{
buf.push("<table class=\"table\"><tr><th data-i18n=\"resources.level\" class=\"col-xs-4\">Level</th><th data-i18n=\"user.last_played\" class=\"col-xs-4\">Last Played</th><th data-i18n=\"user.status\" class=\"col-xs-4\">Status</th></tr>");
var count = 0
// iterate view.singlePlayerSessions
;(function(){
  var $$obj = view.singlePlayerSessions;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var session = $$obj[index];

if ( session.get('levelName'))
{
buf.push("<tr" + (jade.attrs({ "class": [(count > 4 ? 'hide' : '')] }, {"class":true})) + ">");
count++;
buf.push("<td><a" + (jade.attrs({ 'href':("/play/level/" + (session.get('levelID')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = session.get('levelName')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(session.get('changed')).fromNow()) ? "" : jade.interp)) + "</td>");
if ( session.get('state') && session.get('state').complete === true)
{
buf.push("<td data-i18n=\"user.status_completed\">Completed</td>");
}
else
{
buf.push("<td data-i18n=\"user.status_unfinished\">Unfinished</td>");
}
buf.push("</tr>");
}
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var session = $$obj[index];

if ( session.get('levelName'))
{
buf.push("<tr" + (jade.attrs({ "class": [(count > 4 ? 'hide' : '')] }, {"class":true})) + ">");
count++;
buf.push("<td><a" + (jade.attrs({ 'href':("/play/level/" + (session.get('levelID')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = session.get('levelName')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(session.get('changed')).fromNow()) ? "" : jade.interp)) + "</td>");
if ( session.get('state') && session.get('state').complete === true)
{
buf.push("<td data-i18n=\"user.status_completed\">Completed</td>");
}
else
{
buf.push("<td data-i18n=\"user.status_unfinished\">Unfinished</td>");
}
buf.push("</tr>");
}
    }

  }
}).call(this);

buf.push("</table>");
if ( count > 4)
{
buf.push("<div class=\"panel-footer\"><button data-i18n=\"editor.more\" class=\"btn btn-info btn-sm more-button\"></button></div>");
}
}
else
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"user.no_singleplayer\">No Singleplayer games played yet.</p></div>");
}
buf.push("</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"user.multiplayer_title\" class=\"panel-title\">Multiplayer Levels</h3></div>");
if ( (!view.multiPlayerSessions))
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"common.loading\">Loading...</p></div>");
}
else if ( (view.multiPlayerSessions.length))
{
buf.push("<table class=\"table\"><tr><th data-i18n=\"resources.level\" class=\"col-xs-4\">Level</th><th data-i18n=\"user.last_played\" class=\"col-xs-4\">Last Played</th><th data-i18n=\"general.score\" class=\"col-xs-4\">Score</th></tr>");
// iterate view.multiPlayerSessions
;(function(){
  var $$obj = view.multiPlayerSessions;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var session = $$obj[index];

buf.push("<tr" + (jade.attrs({ "class": [(index > 4 ? 'hide' : '')] }, {"class":true})) + "><td>");
var posturl = ''
if (session.get('team')) posturl = '?team=' + session.get('team')
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (session.get('levelID') + posturl) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = session.get('levelName') + (session.get('team') ? ' (' + session.get('team') + ')' : '')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(session.get('changed')).fromNow()) ? "" : jade.interp)) + "</td>");
if ( session.get('totalScore'))
{
buf.push("<td>" + (jade.escape(null == (jade.interp = parseInt(session.get('totalScore') * 100)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td data-i18n=\"user.status_unfinished\">Unfinished</td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var session = $$obj[index];

buf.push("<tr" + (jade.attrs({ "class": [(index > 4 ? 'hide' : '')] }, {"class":true})) + "><td>");
var posturl = ''
if (session.get('team')) posturl = '?team=' + session.get('team')
buf.push("<a" + (jade.attrs({ 'href':("/play/level/" + (session.get('levelID') + posturl) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = session.get('levelName') + (session.get('team') ? ' (' + session.get('team') + ')' : '')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = moment(session.get('changed')).fromNow()) ? "" : jade.interp)) + "</td>");
if ( session.get('totalScore'))
{
buf.push("<td>" + (jade.escape(null == (jade.interp = parseInt(session.get('totalScore') * 100)) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td data-i18n=\"user.status_unfinished\">Unfinished</td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
if ( view.multiPlayerSessions.length > 4)
{
buf.push("<div class=\"panel-footer\"><button data-i18n=\"editor.more\" class=\"btn btn-info btn-sm more-button\"></button></div>");
}
}
else
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"user.no_multiplayer\">No Multiplayer games played yet.</p></div>");
}
buf.push("</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 data-i18n=\"user.achievements_title\" class=\"panel-title\">Achievements</h3></div>");
if ( ! view.earnedAchievements)
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"common.loading\">Loading...</p></div>");
}
else if ( ! view.earnedAchievements.length)
{
buf.push("<div class=\"panel-body\"><p data-i18n=\"user.no_achievements\">No achievements earned so far.</p></div>");
}
else
{
buf.push("<table class=\"table\"><tr><th data-i18n=\"achievements.achievement\" class=\"col-xs-4\">Achievement</th><th data-i18n=\"achievements.last_earned\" class=\"col-xs-4\">Last Earned</th><th data-i18n=\"achievements.amount_achieved\" class=\"col-xs-4\">Amount</th></tr>");
// iterate view.earnedAchievements.models
;(function(){
  var $$obj = view.earnedAchievements.models;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var achievement = $$obj[index];

buf.push("<tr" + (jade.attrs({ "class": [(index > 4 ? 'hide' : '')] }, {"class":true})) + "><td>" + (jade.escape(null == (jade.interp = achievement.get('achievementName')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(achievement.get('changed')).format("MMMM Do YYYY")) ? "" : jade.interp)) + "</td>");
if ( achievement.get('achievedAmount'))
{
buf.push("<td>" + (jade.escape(null == (jade.interp = achievement.get('achievedAmount')) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var achievement = $$obj[index];

buf.push("<tr" + (jade.attrs({ "class": [(index > 4 ? 'hide' : '')] }, {"class":true})) + "><td>" + (jade.escape(null == (jade.interp = achievement.get('achievementName')) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = moment(achievement.get('changed')).format("MMMM Do YYYY")) ? "" : jade.interp)) + "</td>");
if ( achievement.get('achievedAmount'))
{
buf.push("<td>" + (jade.escape(null == (jade.interp = achievement.get('achievedAmount')) ? "" : jade.interp)) + "</td>");
}
else
{
buf.push("<td></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table>");
if ( view.earnedAchievements.length > 4)
{
buf.push("<div class=\"panel-footer\"><button data-i18n=\"editor.more\" class=\"btn btn-info btn-sm more-button\"></button></div>");
}
}
buf.push("</div></div></div>");
}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("views/user/MainUserView", function(exports, require, module) {
var Clan, CocoCollection, EarnedAchievementCollection, LevelSession, LevelSessionsCollection, MainUserView, UserView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

UserView = require('views/common/UserView');

CocoCollection = require('collections/CocoCollection');

LevelSession = require('models/LevelSession');

template = require('templates/user/main-user-view');

me = require('core/auth').me;

Clan = require('models/Clan');

EarnedAchievementCollection = require('collections/EarnedAchievementCollection');

LevelSessionsCollection = (function(superClass) {
  extend(LevelSessionsCollection, superClass);

  LevelSessionsCollection.prototype.model = LevelSession;

  function LevelSessionsCollection(userID) {
    this.url = "/db/user/" + userID + "/level.sessions?project=state.complete,levelID,levelName,changed,team,codeLanguage,submittedCodeLanguage,totalScore&order=-1";
    LevelSessionsCollection.__super__.constructor.call(this);
  }

  return LevelSessionsCollection;

})(CocoCollection);

module.exports = MainUserView = (function(superClass) {
  extend(MainUserView, superClass);

  MainUserView.prototype.id = 'user-home';

  MainUserView.prototype.template = template;

  MainUserView.prototype.events = {
    'click .more-button': 'onClickMoreButton'
  };

  function MainUserView(userID, options) {
    MainUserView.__super__.constructor.call(this, options);
  }

  MainUserView.prototype.destroy = function() {
    return typeof this.stopListening === "function" ? this.stopListening() : void 0;
  };

  MainUserView.prototype.onLoaded = function() {
    var sortClanList;
    if (this.user.loaded) {
      if (!this.levelSessions) {
        this.levelSessions = new LevelSessionsCollection(this.user.getSlugOrID());
        this.listenTo(this.levelSessions, 'sync', (function(_this) {
          return function() {
            var ref;
            _this.onSyncLevelSessions((ref = _this.levelSessions) != null ? ref.models : void 0);
            return _this.render();
          };
        })(this));
        this.supermodel.loadCollection(this.levelSessions, 'levelSessions', {
          cache: false
        });
      }
      if (!this.earnedAchievements) {
        this.earnedAchievements = new EarnedAchievementCollection(this.user.getSlugOrID());
        this.listenTo(this.earnedAchievements, 'sync', (function(_this) {
          return function() {
            return _this.render();
          };
        })(this));
        this.supermodel.loadCollection(this.earnedAchievements, 'earnedAchievements', {
          cache: false
        });
      }
    }
    sortClanList = function(a, b) {
      if (a.get('members').length !== b.get('members').length) {
        if (a.get('members').length < b.get('members').length) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return b.id.localeCompare(a.id);
      }
    };
    this.clans = new CocoCollection([], {
      url: "/db/user/" + this.userID + "/clans",
      model: Clan,
      comparator: sortClanList
    });
    this.listenTo(this.clans, 'sync', (function(_this) {
      return function() {
        var ref;
        _this.onSyncClans((ref = _this.clans) != null ? ref.models : void 0);
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.supermodel.loadCollection(this.clans, 'clans', {
      cache: false
    });
    return MainUserView.__super__.onLoaded.call(this);
  };

  MainUserView.prototype.onSyncClans = function(clans) {
    var options;
    if (clans == null) {
      return;
    }
    this.idNameMap = [];
    this.clanModels = clans;
    options = {
      url: '/db/user/-/names',
      method: 'POST',
      data: {
        ids: _.map(clans, function(clan) {
          return clan.get('ownerID');
        })
      },
      success: (function(_this) {
        return function(models, response, options) {
          var userID;
          for (userID in models) {
            _this.idNameMap[userID] = models[userID].name;
          }
          return typeof _this.render === "function" ? _this.render() : void 0;
        };
      })(this)
    };
    return this.supermodel.addRequestResource('user_names', options, 0).load();
  };

  MainUserView.prototype.onSyncLevelSessions = function(levelSessions) {
    var count, i, language, languageCounts, len, levelSession, mostUsedCount, results;
    if (levelSessions == null) {
      return;
    }
    this.multiPlayerSessions = [];
    this.singlePlayerSessions = [];
    languageCounts = [];
    mostUsedCount = 0;
    for (i = 0, len = levelSessions.length; i < len; i++) {
      levelSession = levelSessions[i];
      if (levelSession.isMultiplayer()) {
        this.multiPlayerSessions.push(levelSession);
      } else {
        this.singlePlayerSessions.push(levelSession);
      }
      language = levelSession.get('codeLanguage') || levelSession.get('submittedCodeLanguage');
      if (language) {
        languageCounts[language] = (languageCounts[language] || 0) + 1;
      }
    }
    results = [];
    for (language in languageCounts) {
      count = languageCounts[language];
      if (count > mostUsedCount) {
        mostUsedCount = count;
        results.push(this.favoriteLanguage = language);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  MainUserView.prototype.onClickMoreButton = function(e) {
    var panel;
    panel = $(e.target).closest('.panel');
    panel.find('tr.hide').removeClass('hide');
    return panel.find('.panel-footer').remove();
  };

  return MainUserView;

})(UserView);
});

;
//# sourceMappingURL=/javascripts/app/views/user/MainUserView.js.map
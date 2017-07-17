require.register("templates/play/ladder_home", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
// iterate view.campaigns
;(function(){
  var $$obj = view.campaigns;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaign = $$obj[$index];

buf.push("<div class=\"campaign-container\"><h1><a" + (jade.attrs({ 'href':("/play/" + (campaign.levels[0].levelPath || 'level') + "/" + (campaign.levels[0].id) + ""), 'data-i18n':("play.campaign_" + (campaign.id) + "") }, {"href":true,"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</a></h1><p" + (jade.attrs({ 'data-i18n':("[html]play.campaign_" + (campaign.id) + "_description"), "class": [('campaign-description')] }, {"data-i18n":true})) + ">" + (null == (jade.interp = campaign.description) ? "" : jade.interp) + "</p>");
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

if ( level.id === 'ace-of-coders' || level.id === 'zero-sum' || level.id === 'cavern-survival')
{
buf.push("<a" + (jade.attrs({ 'href':(level.disabled ? "/play/ladder" : "/play/ladder/" + (level.id) + ""), 'disabled':(level.disabled), 'title':(level.description), "class": [(view.levelStatusMap[level.id] || '')] }, {"href":true,"disabled":true,"class":true,"title":true})) + "><div class=\"level\">");
if ( level.image)
{
buf.push("<img" + (jade.attrs({ 'src':("" + (level.image) + ""), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<img" + (jade.attrs({ 'src':("/images/pages/play/ladder/multiplayer_notext.jpg"), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/><h3 class=\"dynamic-level-name\">" + (jade.escape(null == (jade.interp = level.name + (level.disabled ? " (Coming soon!)" : "")) ? "" : jade.interp)) + "</h3>");
}
buf.push("<div class=\"overlay-text level-difficulty\"><span data-i18n=\"play.level_difficulty\">Difficulty: </span>");
// iterate Array(level.difficulty)
;(function(){
  var $$obj = Array(level.difficulty);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("★");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("★");
    }

  }
}).call(this);

var playCount = view.levelPlayCountMap[level.id]
if ( playCount)
{
buf.push("<span class=\"spl spr\">- " + (jade.escape((jade.interp = playCount.sessions) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span>");
if ( (view.levelStatusMap[level.id]=='complete'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.complete_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
else if ( (view.levelStatusMap[level.id]=='started'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.started_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
}
buf.push("</div><div class=\"play-text-container\"><div data-i18n=\"common.play\" class=\"overlay-text play-text\">Play</div></div></div></a>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

if ( level.id === 'ace-of-coders' || level.id === 'zero-sum' || level.id === 'cavern-survival')
{
buf.push("<a" + (jade.attrs({ 'href':(level.disabled ? "/play/ladder" : "/play/ladder/" + (level.id) + ""), 'disabled':(level.disabled), 'title':(level.description), "class": [(view.levelStatusMap[level.id] || '')] }, {"href":true,"disabled":true,"class":true,"title":true})) + "><div class=\"level\">");
if ( level.image)
{
buf.push("<img" + (jade.attrs({ 'src':("" + (level.image) + ""), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<img" + (jade.attrs({ 'src':("/images/pages/play/ladder/multiplayer_notext.jpg"), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/><h3 class=\"dynamic-level-name\">" + (jade.escape(null == (jade.interp = level.name + (level.disabled ? " (Coming soon!)" : "")) ? "" : jade.interp)) + "</h3>");
}
buf.push("<div class=\"overlay-text level-difficulty\"><span data-i18n=\"play.level_difficulty\">Difficulty: </span>");
// iterate Array(level.difficulty)
;(function(){
  var $$obj = Array(level.difficulty);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("★");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("★");
    }

  }
}).call(this);

var playCount = view.levelPlayCountMap[level.id]
if ( playCount)
{
buf.push("<span class=\"spl spr\">- " + (jade.escape((jade.interp = playCount.sessions) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span>");
if ( (view.levelStatusMap[level.id]=='complete'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.complete_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
else if ( (view.levelStatusMap[level.id]=='started'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.started_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
}
buf.push("</div><div class=\"play-text-container\"><div data-i18n=\"common.play\" class=\"overlay-text play-text\">Play</div></div></div></a>");
}
    }

  }
}).call(this);

buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaign = $$obj[$index];

buf.push("<div class=\"campaign-container\"><h1><a" + (jade.attrs({ 'href':("/play/" + (campaign.levels[0].levelPath || 'level') + "/" + (campaign.levels[0].id) + ""), 'data-i18n':("play.campaign_" + (campaign.id) + "") }, {"href":true,"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</a></h1><p" + (jade.attrs({ 'data-i18n':("[html]play.campaign_" + (campaign.id) + "_description"), "class": [('campaign-description')] }, {"data-i18n":true})) + ">" + (null == (jade.interp = campaign.description) ? "" : jade.interp) + "</p>");
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

if ( level.id === 'ace-of-coders' || level.id === 'zero-sum' || level.id === 'cavern-survival')
{
buf.push("<a" + (jade.attrs({ 'href':(level.disabled ? "/play/ladder" : "/play/ladder/" + (level.id) + ""), 'disabled':(level.disabled), 'title':(level.description), "class": [(view.levelStatusMap[level.id] || '')] }, {"href":true,"disabled":true,"class":true,"title":true})) + "><div class=\"level\">");
if ( level.image)
{
buf.push("<img" + (jade.attrs({ 'src':("" + (level.image) + ""), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<img" + (jade.attrs({ 'src':("/images/pages/play/ladder/multiplayer_notext.jpg"), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/><h3 class=\"dynamic-level-name\">" + (jade.escape(null == (jade.interp = level.name + (level.disabled ? " (Coming soon!)" : "")) ? "" : jade.interp)) + "</h3>");
}
buf.push("<div class=\"overlay-text level-difficulty\"><span data-i18n=\"play.level_difficulty\">Difficulty: </span>");
// iterate Array(level.difficulty)
;(function(){
  var $$obj = Array(level.difficulty);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("★");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("★");
    }

  }
}).call(this);

var playCount = view.levelPlayCountMap[level.id]
if ( playCount)
{
buf.push("<span class=\"spl spr\">- " + (jade.escape((jade.interp = playCount.sessions) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span>");
if ( (view.levelStatusMap[level.id]=='complete'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.complete_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
else if ( (view.levelStatusMap[level.id]=='started'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.started_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
}
buf.push("</div><div class=\"play-text-container\"><div data-i18n=\"common.play\" class=\"overlay-text play-text\">Play</div></div></div></a>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

if ( level.id === 'ace-of-coders' || level.id === 'zero-sum' || level.id === 'cavern-survival')
{
buf.push("<a" + (jade.attrs({ 'href':(level.disabled ? "/play/ladder" : "/play/ladder/" + (level.id) + ""), 'disabled':(level.disabled), 'title':(level.description), "class": [(view.levelStatusMap[level.id] || '')] }, {"href":true,"disabled":true,"class":true,"title":true})) + "><div class=\"level\">");
if ( level.image)
{
buf.push("<img" + (jade.attrs({ 'src':("" + (level.image) + ""), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<img" + (jade.attrs({ 'src':("/images/pages/play/ladder/multiplayer_notext.jpg"), 'alt':("" + (level.name) + ""), "class": [('level-image'),('img-rounded')] }, {"src":true,"alt":true})) + "/><h3 class=\"dynamic-level-name\">" + (jade.escape(null == (jade.interp = level.name + (level.disabled ? " (Coming soon!)" : "")) ? "" : jade.interp)) + "</h3>");
}
buf.push("<div class=\"overlay-text level-difficulty\"><span data-i18n=\"play.level_difficulty\">Difficulty: </span>");
// iterate Array(level.difficulty)
;(function(){
  var $$obj = Array(level.difficulty);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("★");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("★");
    }

  }
}).call(this);

var playCount = view.levelPlayCountMap[level.id]
if ( playCount)
{
buf.push("<span class=\"spl spr\">- " + (jade.escape((jade.interp = playCount.sessions) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span>");
if ( (view.levelStatusMap[level.id]=='complete'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.complete_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
else if ( (view.levelStatusMap[level.id]=='started'))
{
buf.push("<span class=\"spl spr\">-</span><span" + (jade.attrs({ 'data-i18n':("clans.started_2"), "class": [("level-status-" + (view.levelStatusMap[level.id]) + "")] }, {"class":true,"data-i18n":true})) + "></span>");
}
}
buf.push("</div><div class=\"play-text-container\"><div data-i18n=\"common.play\" class=\"overlay-text play-text\">Play</div></div></div></a>");
}
    }

  }
}).call(this);

buf.push("</div>");
    }

  }
}).call(this);

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

;
//# sourceMappingURL=/javascripts/app/templates/play/ladder_home.js.map
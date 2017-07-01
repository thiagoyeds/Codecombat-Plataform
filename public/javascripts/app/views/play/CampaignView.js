require.register("templates/play/campaign-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,campaign = locals_.campaign,features = locals_.features,serverConfig = locals_.serverConfig,levels = locals_.levels,i18n = locals_.i18n,translate = locals_.translate,levelStatusMap = locals_.levelStatusMap,editorMode = locals_.editorMode,levelDifficultyMap = locals_.levelDifficultyMap,levelPlayCountMap = locals_.levelPlayCountMap,marked = locals_.marked,picoCTF = locals_.picoCTF,me = locals_.me,adjacentCampaigns = locals_.adjacentCampaigns,_ = locals_._,campaigns = locals_.campaigns,isIPadApp = locals_.isIPadApp,levelsCompleted = locals_.levelsCompleted,levelsTotal = locals_.levelsTotal;if ( view.showAds())
{
buf.push("<!-- TODO: loading this multiple times yields script error:--><!-- Uncaught TagError: adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them.--><div class=\"ad-container\">");
if ( campaign)
{
buf.push("<script async=\"async\" src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script><ins style=\"display:inline-block;width:728px;height:90px\" data-ad-client=\"ca-pub-6640930638193614\" data-ad-slot=\"4924994487\" class=\"adsbygoogle\"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>");
}
else
{
buf.push("<script async=\"async\" src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script><ins style=\"display:inline-block;width:728px;height:90px\" data-ad-client=\"ca-pub-6640930638193614\" data-ad-slot=\"4469166082\" class=\"adsbygoogle\"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});\n</script>");
}
buf.push("</div>");
}
buf.push("<!-- TODO: .gameplay-container causes world map buttons to briefly appear in top left of screen--><div class=\"gameplay-container\">");
if ( features.codePlay)
{
buf.push("<img src=\"/images/common/codeplay/CodePlay_Lockup.png\" class=\"small-nav-logo codeplay-logo\"/>");
}
else
{
buf.push("<a href=\"/\" class=\"picoctf-hide\"><img src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\" class=\"small-nav-logo\"/></a><div class=\"picoctf-show\"><a href=\"http://staging.picoctf.com\" class=\"picoctf-logo\"><img src=\"/images/pages/play/picoctf-logo-white.png\" title=\"picoCTF home\" alt=\"picoCTF home\" class=\"small-nav-logo\"/></a><a href=\"http://codecombat.com\" class=\"picoctf-powered-by\"><em class=\"spr\">powered by</em><img src=\"/images/pages/base/logo.png\" title=\"Powered by CodeCombat - Learn how to code by playing a game \" alt=\"Powered by CodeCombat\"/></a></div>");
}
if ( serverConfig.codeNinjas)
{
buf.push("<a href=\"https://code.ninja\"><img src=\"/images/pages/base/code-ninjas-logo-right.png\" title=\"Code Ninjas home\" alt=\"Code Ninjas home\" class=\"small-nav-logo code-ninjas-logo\"/></a>");
}
if ( campaign)
{
buf.push("<div class=\"map\"><div class=\"gradient horizontal-gradient top-gradient\"></div><div class=\"gradient vertical-gradient right-gradient\"></div><div class=\"gradient horizontal-gradient bottom-gradient\"></div><div class=\"gradient vertical-gradient left-gradient\"></div><div alt=\"\" draggable=\"false\" class=\"map-background\"></div>");
// iterate levels
;(function(){
  var $$obj = levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

if ((campaign.levelIsPractice(level) || !level.unlockedInSameCampaign) && level.hidden)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'style':("left: " + (level.position.x) + "%; bottom: " + (level.position.y) + "%; background-color: " + (level.color) + ""), 'data-level-slug':(level.slug), 'data-level-original':(level.original), 'title':(i18n(level, 'name') + (level.disabled ? " (" + translate('common.coming_soon') + ")" : '')), "class": [("level" + (level.next ? " next" : "") + (level.disabled ? " disabled" : "") + (level.locked ? " locked" : "") + " " + (levelStatusMap[level.slug] || ""))] }, {"style":true,"class":true,"data-level-slug":true,"data-level-original":true,"title":true})) + ">");
if ( level.unlocksHero && (!level.purchasedHero || editorMode) && (level.hidden || levelStatusMap[level.slug] === 'complete'))
{
buf.push("<img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksHero) + "/portrait.png"), "class": [('hero-portrait')] }, {"src":true})) + "/>");
}
buf.push("<a" + (jade.attrs({ 'href':(level.type == 'hero' ? '#' : level.disabled ? "/play" : "/play/" + (level.levelPath || 'level') + "/" + (level.slug) + ""), 'disabled':(level.disabled), 'data-level-slug':(level.slug), 'data-level-path':(level.levelPath || 'level'), 'data-level-name':(level.name) }, {"href":true,"disabled":true,"data-level-slug":true,"data-level-path":true,"data-level-name":true})) + "></a>");
if ( levelStatusMap[level.slug] === 'complete')
{
buf.push("<img src=\"/images/pages/play/star.png\" class=\"star\"/>");
}
if ( editorMode)
{
var kindKey = ((level.kind && level.kind[0]) || "").toUpperCase();
buf.push("<!--if kindKey--><div" + (jade.attrs({ "class": [("level-kind " + level.kind)] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = kindKey) ? "" : jade.interp)) + "</div>");
var acronym = level.name.replace(/(A |The )/g, '').replace(/[^A-Z]/g, '');
buf.push("<div class=\"level-acronym\">" + (jade.escape(null == (jade.interp = acronym) ? "" : jade.interp)) + "</div>");
}
if ( !level.hidden)
{
if ( level.replayable)
{
buf.push("<img src=\"/images/pages/play/level-banner-replayable.png\" class=\"banner\"/>");
}
else if ( level.type === 'hero-ladder' || level.type === 'course-ladder')
{
buf.push("<img src=\"/images/pages/play/level-banner-multiplayer.png\" class=\"banner\"/>");
}
else if ( ['kithgard-gates', 'siege-of-stonehold', 'clash-of-clones', 'summits-gate', 'kithgard-mastery'].indexOf(level.slug) !== -1 && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-special.png\" class=\"banner\"/>");
}
else if ( level.unlocksHero && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unlock.png\" class=\"banner\"/><img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksHero) + "/portrait.png"), "class": [('hero-portrait'),('hero-portrait-on-banner')] }, {"src":true})) + "/>");
}
else if ( level.unlocksItem && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unlock.png\" class=\"banner\"/><img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksItem) + "/portrait.png"), "class": [('item-portrait'),('item-portrait-on-banner')] }, {"src":true})) + "/>");
}
else if ( levelStatusMap[level.slug] === 'started')
{
buf.push("<img src=\"/images/pages/play/level-banner-started.png\" class=\"banner\"/>");
}
else if ( levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unstarted.png\" class=\"banner\"/>");
}
if ( levelDifficultyMap[level.slug])
{
buf.push("<div class=\"level-difficulty-banner-text\">" + (jade.escape(null == (jade.interp = levelDifficultyMap[level.slug]) ? "" : jade.interp)) + "</div>");
}
}
buf.push("</div><div" + (jade.attrs({ 'style':("left: " + (level.position.x) + "%; bottom: " + (level.position.y) + "%"), "class": [("level-shadow" + (level.next ? " next" : "") + (level.locked ? " locked" : "") + " " + (levelStatusMap[level.slug] || ""))] }, {"style":true,"class":true})) + "></div><div" + (jade.attrs({ 'data-level-slug':(level.slug), 'data-level-path':(level.levelPath || 'level'), 'data-level-name':(level.name), "class": [('level-info-container')] }, {"data-level-slug":true,"data-level-path":true,"data-level-name":true})) + ">");
var playCount = levelPlayCountMap[level.slug]
buf.push("<div class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div>");
var showsLeaderboard = levelStatusMap[level.slug] === 'complete' && ((level.scoreTypes && level.scoreTypes.length) || ['hero-ladder', 'course-ladder'].indexOf(level.type) !== -1);
buf.push("<div" + (jade.attrs({ "class": [("level-info " + (levelStatusMap[level.slug] || "") + (level.requiresSubscription ? " premium" : "") + (showsLeaderboard ? " shows-leaderboard" : ""))] }, {"class":true})) + "><div class=\"level-status\"></div><h3>" + (jade.escape(null == (jade.interp = i18n(level, 'name') + (level.disabled ? " (" + translate('common.coming_soon') + ")" : (level.locked ? " (" + translate('play.locked') + ")" : ""))) ? "" : jade.interp)) + "</h3>");
var description = i18n(level, 'description') || level.description || ""
buf.push("<div class=\"level-description\">" + (null == (jade.interp = marked(description, {sanitize: !picoCTF})) ? "" : jade.interp) + "</div>");
if ( level.disabled)
{
buf.push("<p><span data-i18n=\"play.awaiting_levels_adventurer_prefix\" class=\"spr\">We release five levels per week.</span><a href=\"/contribute/adventurer\" class=\"spr\"><strong data-i18n=\"play.awaiting_levels_adventurer\">Sign up as an Adventurer</strong></a><span data-i18n=\"play.awaiting_levels_adventurer_suffix\" class=\"spl\">to be the first to play new levels.</span></p>");
}
if ( level.displayConcepts && level.displayConcepts.length)
{
buf.push("<p>");
// iterate level.displayConcepts
;(function(){
  var $$obj = level.displayConcepts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

buf.push("<kbd" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></kbd>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

buf.push("<kbd" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></kbd>");
    }

  }
}).call(this);

buf.push("</p>");
}
if ( !level.disabled && !level.locked)
{
if ( playCount && playCount.sessions)
{
buf.push("<div class=\"play-counts hidden\"><span class=\"spl spr\">" + (jade.escape(null == (jade.interp = playCount.sessions) ? "" : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span><span class=\"spr\">, " + (jade.escape((jade.interp = Math.round(playCount.playtime / 3600)) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.hours_played\">hours played</span></div>");
}
if ( showsLeaderboard)
{
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.slug), "class": [('btn'),('btn-warning'),('btn'),('btn-lg'),('btn-illustrated'),('view-solutions')] }, {"data-level-slug":true})) + "><span data-i18n=\"leaderboard.scores\"></span></button>");
}
buf.push("<button data-i18n=\"common.play\" class=\"btn btn-success btn btn-lg btn-illustrated start-level\">Play</button>");
if ( me.get('courseInstances') && me.get('courseInstances').length)
{
buf.push("<div" + (jade.attrs({ 'data-level-original':(level.original), "class": [('course-version'),('hidden')] }, {"data-level-original":true})) + "><em data-i18n=\"general.or\"></em>...<br/><button class=\"btn btn-primary btn btn-lg btn-illustrated\"><span data-i18n=\"play.play_classroom_version\">Play Classroom Version</span></button></div>");
}
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

if ((campaign.levelIsPractice(level) || !level.unlockedInSameCampaign) && level.hidden)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'style':("left: " + (level.position.x) + "%; bottom: " + (level.position.y) + "%; background-color: " + (level.color) + ""), 'data-level-slug':(level.slug), 'data-level-original':(level.original), 'title':(i18n(level, 'name') + (level.disabled ? " (" + translate('common.coming_soon') + ")" : '')), "class": [("level" + (level.next ? " next" : "") + (level.disabled ? " disabled" : "") + (level.locked ? " locked" : "") + " " + (levelStatusMap[level.slug] || ""))] }, {"style":true,"class":true,"data-level-slug":true,"data-level-original":true,"title":true})) + ">");
if ( level.unlocksHero && (!level.purchasedHero || editorMode) && (level.hidden || levelStatusMap[level.slug] === 'complete'))
{
buf.push("<img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksHero) + "/portrait.png"), "class": [('hero-portrait')] }, {"src":true})) + "/>");
}
buf.push("<a" + (jade.attrs({ 'href':(level.type == 'hero' ? '#' : level.disabled ? "/play" : "/play/" + (level.levelPath || 'level') + "/" + (level.slug) + ""), 'disabled':(level.disabled), 'data-level-slug':(level.slug), 'data-level-path':(level.levelPath || 'level'), 'data-level-name':(level.name) }, {"href":true,"disabled":true,"data-level-slug":true,"data-level-path":true,"data-level-name":true})) + "></a>");
if ( levelStatusMap[level.slug] === 'complete')
{
buf.push("<img src=\"/images/pages/play/star.png\" class=\"star\"/>");
}
if ( editorMode)
{
var kindKey = ((level.kind && level.kind[0]) || "").toUpperCase();
buf.push("<!--if kindKey--><div" + (jade.attrs({ "class": [("level-kind " + level.kind)] }, {"class":true})) + ">" + (jade.escape(null == (jade.interp = kindKey) ? "" : jade.interp)) + "</div>");
var acronym = level.name.replace(/(A |The )/g, '').replace(/[^A-Z]/g, '');
buf.push("<div class=\"level-acronym\">" + (jade.escape(null == (jade.interp = acronym) ? "" : jade.interp)) + "</div>");
}
if ( !level.hidden)
{
if ( level.replayable)
{
buf.push("<img src=\"/images/pages/play/level-banner-replayable.png\" class=\"banner\"/>");
}
else if ( level.type === 'hero-ladder' || level.type === 'course-ladder')
{
buf.push("<img src=\"/images/pages/play/level-banner-multiplayer.png\" class=\"banner\"/>");
}
else if ( ['kithgard-gates', 'siege-of-stonehold', 'clash-of-clones', 'summits-gate', 'kithgard-mastery'].indexOf(level.slug) !== -1 && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-special.png\" class=\"banner\"/>");
}
else if ( level.unlocksHero && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unlock.png\" class=\"banner\"/><img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksHero) + "/portrait.png"), "class": [('hero-portrait'),('hero-portrait-on-banner')] }, {"src":true})) + "/>");
}
else if ( level.unlocksItem && levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unlock.png\" class=\"banner\"/><img" + (jade.attrs({ 'src':("/file/db/thang.type/" + (level.unlocksItem) + "/portrait.png"), "class": [('item-portrait'),('item-portrait-on-banner')] }, {"src":true})) + "/>");
}
else if ( levelStatusMap[level.slug] === 'started')
{
buf.push("<img src=\"/images/pages/play/level-banner-started.png\" class=\"banner\"/>");
}
else if ( levelStatusMap[level.slug] !== 'complete')
{
buf.push("<img src=\"/images/pages/play/level-banner-unstarted.png\" class=\"banner\"/>");
}
if ( levelDifficultyMap[level.slug])
{
buf.push("<div class=\"level-difficulty-banner-text\">" + (jade.escape(null == (jade.interp = levelDifficultyMap[level.slug]) ? "" : jade.interp)) + "</div>");
}
}
buf.push("</div><div" + (jade.attrs({ 'style':("left: " + (level.position.x) + "%; bottom: " + (level.position.y) + "%"), "class": [("level-shadow" + (level.next ? " next" : "") + (level.locked ? " locked" : "") + " " + (levelStatusMap[level.slug] || ""))] }, {"style":true,"class":true})) + "></div><div" + (jade.attrs({ 'data-level-slug':(level.slug), 'data-level-path':(level.levelPath || 'level'), 'data-level-name':(level.name), "class": [('level-info-container')] }, {"data-level-slug":true,"data-level-path":true,"data-level-name":true})) + ">");
var playCount = levelPlayCountMap[level.slug]
buf.push("<div class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div>");
var showsLeaderboard = levelStatusMap[level.slug] === 'complete' && ((level.scoreTypes && level.scoreTypes.length) || ['hero-ladder', 'course-ladder'].indexOf(level.type) !== -1);
buf.push("<div" + (jade.attrs({ "class": [("level-info " + (levelStatusMap[level.slug] || "") + (level.requiresSubscription ? " premium" : "") + (showsLeaderboard ? " shows-leaderboard" : ""))] }, {"class":true})) + "><div class=\"level-status\"></div><h3>" + (jade.escape(null == (jade.interp = i18n(level, 'name') + (level.disabled ? " (" + translate('common.coming_soon') + ")" : (level.locked ? " (" + translate('play.locked') + ")" : ""))) ? "" : jade.interp)) + "</h3>");
var description = i18n(level, 'description') || level.description || ""
buf.push("<div class=\"level-description\">" + (null == (jade.interp = marked(description, {sanitize: !picoCTF})) ? "" : jade.interp) + "</div>");
if ( level.disabled)
{
buf.push("<p><span data-i18n=\"play.awaiting_levels_adventurer_prefix\" class=\"spr\">We release five levels per week.</span><a href=\"/contribute/adventurer\" class=\"spr\"><strong data-i18n=\"play.awaiting_levels_adventurer\">Sign up as an Adventurer</strong></a><span data-i18n=\"play.awaiting_levels_adventurer_suffix\" class=\"spl\">to be the first to play new levels.</span></p>");
}
if ( level.displayConcepts && level.displayConcepts.length)
{
buf.push("<p>");
// iterate level.displayConcepts
;(function(){
  var $$obj = level.displayConcepts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

buf.push("<kbd" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></kbd>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

buf.push("<kbd" + (jade.attrs({ 'data-i18n':("concepts." + concept) }, {"data-i18n":true})) + "></kbd>");
    }

  }
}).call(this);

buf.push("</p>");
}
if ( !level.disabled && !level.locked)
{
if ( playCount && playCount.sessions)
{
buf.push("<div class=\"play-counts hidden\"><span class=\"spl spr\">" + (jade.escape(null == (jade.interp = playCount.sessions) ? "" : jade.interp)) + "</span><span data-i18n=\"play.players\">players</span><span class=\"spr\">, " + (jade.escape((jade.interp = Math.round(playCount.playtime / 3600)) == null ? '' : jade.interp)) + "</span><span data-i18n=\"play.hours_played\">hours played</span></div>");
}
if ( showsLeaderboard)
{
buf.push("<button" + (jade.attrs({ 'data-level-slug':(level.slug), "class": [('btn'),('btn-warning'),('btn'),('btn-lg'),('btn-illustrated'),('view-solutions')] }, {"data-level-slug":true})) + "><span data-i18n=\"leaderboard.scores\"></span></button>");
}
buf.push("<button data-i18n=\"common.play\" class=\"btn btn-success btn btn-lg btn-illustrated start-level\">Play</button>");
if ( me.get('courseInstances') && me.get('courseInstances').length)
{
buf.push("<div" + (jade.attrs({ 'data-level-original':(level.original), "class": [('course-version'),('hidden')] }, {"data-level-original":true})) + "><em data-i18n=\"general.or\"></em>...<br/><button class=\"btn btn-primary btn btn-lg btn-illustrated\"><span data-i18n=\"play.play_classroom_version\">Play Classroom Version</span></button></div>");
}
}
buf.push("</div></div>");
    }

  }
}).call(this);

// iterate adjacentCampaigns
;(function(){
  var $$obj = adjacentCampaigns;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var adjacentCampaign = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':((editorMode ? "/editor/campaign/" : "/play/") + adjacentCampaign.slug) }, {"href":true})) + "><span" + (jade.attrs({ 'style':(adjacentCampaign.style), 'title':(adjacentCampaign.name), 'data-campaign-id':(adjacentCampaign.id), 'data-campaign-slug':(adjacentCampaign.slug), "class": [('glyphicon'),('glyphicon-share-alt'),('campaign-switch')] }, {"style":true,"title":true,"data-campaign-id":true,"data-campaign-slug":true})) + "></span></a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var adjacentCampaign = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'href':((editorMode ? "/editor/campaign/" : "/play/") + adjacentCampaign.slug) }, {"href":true})) + "><span" + (jade.attrs({ 'style':(adjacentCampaign.style), 'title':(adjacentCampaign.name), 'data-campaign-id':(adjacentCampaign.id), 'data-campaign-slug':(adjacentCampaign.slug), "class": [('glyphicon'),('glyphicon-share-alt'),('campaign-switch')] }, {"style":true,"title":true,"data-campaign-id":true,"data-campaign-slug":true})) + "></span></a>");
    }

  }
}).call(this);

buf.push("</div>");
}
else
{
buf.push("<div class=\"portal\"><div class=\"portals\">");
// iterate features.campaignSlugs || ['dungeon', 'beta-campaigns-1', 'forest', 'beta-campaigns-2', 'desert', 'mountain', 'glacier', 'volcano']
;(function(){
  var $$obj = features.campaignSlugs || ['dungeon', 'beta-campaigns-1', 'forest', 'beta-campaigns-2', 'desert', 'mountain', 'glacier', 'volcano'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaignSlug = $$obj[$index];

if ( campaignSlug === 'beta-campaigns-1' || campaignSlug === 'beta-campaigns-2')
{
if (features.freeOnly) continue;
var betaSlugs = campaignSlug === 'beta-campaigns-1' ? _.shuffle(['campaign-game-dev-1', 'campaign-web-dev-1']) : _.shuffle(['campaign-game-dev-2', 'campaign-web-dev-2']);
buf.push("<div class=\"beta-container\">");
// iterate betaSlugs
;(function(){
  var $$obj = betaSlugs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaignSlug = $$obj[$index];

var campaign = campaigns[campaignSlug];
if ( !campaign)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("beta-campaign" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div" + (jade.attrs({ "class": [('background-container'),("" + (campaignSlug) + "")] }, {"class":true})) + "></div><div class=\"campaign-label\"><h3 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
if ( campaign.levelsTotal)
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span>");
}
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h3>");
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h4 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h4>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-primary play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaignSlug = $$obj[$index];

var campaign = campaigns[campaignSlug];
if ( !campaign)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("beta-campaign" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div" + (jade.attrs({ "class": [('background-container'),("" + (campaignSlug) + "")] }, {"class":true})) + "></div><div class=\"campaign-label\"><h3 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
if ( campaign.levelsTotal)
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span>");
}
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h3>");
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h4 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h4>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-primary play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

buf.push("</div>");
}
else
{
var campaign = campaigns[campaignSlug];
var godmode = me.get('permissions', true).indexOf('godmode') != -1;
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("campaign " + (campaignSlug) + "" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div class=\"campaign-label\"><h2 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h2>");
if ( campaign && campaign.levelsTotal)
{
buf.push("<h3 class=\"levels-completed\"><span>" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span></h3>");
}
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h3 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h3>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-success play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaignSlug = $$obj[$index];

if ( campaignSlug === 'beta-campaigns-1' || campaignSlug === 'beta-campaigns-2')
{
if (features.freeOnly) continue;
var betaSlugs = campaignSlug === 'beta-campaigns-1' ? _.shuffle(['campaign-game-dev-1', 'campaign-web-dev-1']) : _.shuffle(['campaign-game-dev-2', 'campaign-web-dev-2']);
buf.push("<div class=\"beta-container\">");
// iterate betaSlugs
;(function(){
  var $$obj = betaSlugs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaignSlug = $$obj[$index];

var campaign = campaigns[campaignSlug];
if ( !campaign)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("beta-campaign" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div" + (jade.attrs({ "class": [('background-container'),("" + (campaignSlug) + "")] }, {"class":true})) + "></div><div class=\"campaign-label\"><h3 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
if ( campaign.levelsTotal)
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span>");
}
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h3>");
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h4 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h4>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-primary play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaignSlug = $$obj[$index];

var campaign = campaigns[campaignSlug];
if ( !campaign)
{
continue;
}
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("beta-campaign" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div" + (jade.attrs({ "class": [('background-container'),("" + (campaignSlug) + "")] }, {"class":true})) + "></div><div class=\"campaign-label\"><h3 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
if ( campaign.levelsTotal)
{
buf.push("<span class=\"spl\">" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span>");
}
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h3>");
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h4 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h4>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-primary play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
    }

  }
}).call(this);

buf.push("</div>");
}
else
{
var campaign = campaigns[campaignSlug];
var godmode = me.get('permissions', true).indexOf('godmode') != -1;
buf.push("<div" + (jade.attrs({ 'data-campaign-slug':(campaignSlug), "class": [("campaign " + (campaignSlug) + "" + (campaign ? "" : " silhouette") + (campaign && campaign.locked && !godmode ? " locked" : ""))] }, {"class":true,"data-campaign-slug":true})) + "><div class=\"campaign-label\"><h2 class=\"campaign-name\">");
if ( campaign)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<span>???</span>");
}
buf.push("</h2>");
if ( campaign && campaign.levelsTotal)
{
buf.push("<h3 class=\"levels-completed\"><span>" + (jade.escape(null == (jade.interp = campaign.levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = campaign.levelsTotal) ? "" : jade.interp)) + "</span></h3>");
}
if ( campaign && campaign.locked && !godmode)
{
buf.push("<h3 data-i18n=\"play.locked\" class=\"campaign-locked\">Locked</h3>");
}
else if ( campaign)
{
buf.push("<btn data-i18n=\"common.play\" class=\"btn btn-illustrated btn-lg btn-success play-button\"></btn>");
}
if ( campaign && campaign.get('description'))
{
buf.push("<p class=\"campaign-description\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'description')) ? "" : jade.interp)) + "</span></p>");
}
buf.push("</div></div>");
}
    }

  }
}).call(this);

buf.push("</div></div>");
}
buf.push("<div class=\"game-controls header-font picoctf-hide\"><button data-i18n=\"[title]play.poll\" class=\"btn poll hidden\"></button>");
if ( !features.codePlay)
{
buf.push("<a href=\"/clans\" data-i18n=\"[title]clans.clans\" class=\"btn clans\"></a>");
}
buf.push("<button data-toggle=\"coco-modal\" data-target=\"play/modal/PlayItemsModal\" data-i18n=\"[title]play.items\" class=\"btn items\"></button><button data-toggle=\"coco-modal\" data-target=\"play/modal/PlayHeroesModal\" data-i18n=\"[title]play.heroes\" class=\"btn heroes\"></button><button data-toggle=\"coco-modal\" data-target=\"play/modal/PlayAchievementsModal\" data-i18n=\"[title]play.achievements\" class=\"btn achievements\"></button>");
if ( (me.get('anonymous') === false || me.get('iosIdentifierForVendor') || isIPadApp) && !features.freeOnly)
{
buf.push("<button data-toggle=\"coco-modal\" data-target=\"play/modal/BuyGemsModal\" data-i18n=\"[title]play.buy_gems\" class=\"btn gems\"></button>");
}
if ( !me.get('anonymous', true) && !features.codePlay)
{
buf.push("<button data-toggle=\"coco-modal\" data-target=\"play/modal/PlayAccountModal\" data-i18n=\"[title]nav.account\" class=\"btn account\"></button>");
}
buf.push("<!--if me.isAdmin()--><!--  button.btn.settings(data-toggle='coco-modal', data-target='play/modal/PlaySettingsModal', data-i18n=\"[title]play.settings\")-->");
if ( me.get('anonymous', true))
{
buf.push("<button data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\" data-i18n=\"[title]play.settings\" class=\"btn settings\"></button>");
}
buf.push("</div><div class=\"user-status header-font picoctf-hide\"><div class=\"user-status-line\"><span class=\"gem gem-30\"></span><span id=\"gems-count\" class=\"spr\">" + (jade.escape(null == (jade.interp = me.gems()) ? "" : jade.interp)) + "</span><span data-i18n=\"general.player_level\" class=\"level-indicator\"></span><span class=\"player-level spr\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><span class=\"player-hero-icon\"></span>");
if ( me.get('anonymous'))
{
buf.push("<span data-i18n=\"play.anonymous\" class=\"player-name spr\">Anonymous Player</span><button data-i18n=\"login.log_in\" class=\"btn btn-illustrated login-button btn-warning\"></button><button data-i18n=\"signup.sign_up\" class=\"btn btn-illustrated signup-button btn-danger\"></button>");
}
else
{
buf.push("<a data-toggle=\"coco-modal\" data-target=\"play/modal/PlayAccountModal\" class=\"player-name spr\">" + (jade.escape(null == (jade.interp = me.get('name')) ? "" : jade.interp)) + "</a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-illustrated btn-warning\">Log Out</button>");
if ( me.isPremium())
{
buf.push("<button data-i18n=\"nav.contact\" data-toggle=\"coco-modal\" data-target=\"core/ContactModal\" class=\"btn btn-illustrated btn-primary\">Contact</button>");
}
}
buf.push("</div></div><button id=\"volume-button\" data-i18n=\"[title]play.adjust_volume\" title=\"Adjust volume\" class=\"btn btn-lg btn-inverse campaign-control-button picoctf-hide\"><div class=\"glyphicon glyphicon-volume-off\"></div><div class=\"glyphicon glyphicon-volume-down\"></div><div class=\"glyphicon glyphicon-volume-up\"></div></button>");
if ( campaign && !editorMode)
{
buf.push("<button id=\"back-button\" data-i18n=\"[title]resources.campaigns\" title=\"Campaigns\" class=\"btn btn-lg btn-inverse campaign-control-button picoctf-hide\"><div class=\"glyphicon glyphicon-globe\"></div></button>");
}
if ( editorMode)
{
buf.push("<button id=\"clear-storage-button\" data-i18n=\"[title]editor.clear_storage\" title=\"Clear your local changes\" class=\"btn btn-lg btn-inverse campaign-control-button\"><div class=\"glyphicon glyphicon-refresh\"></div></button>");
}
if ( campaign && campaign.loaded)
{
buf.push("<h1 id=\"campaign-status\" class=\"picoctf-hide\"><div class=\"campaign-status-background\"><div class=\"campaign-name\"><span>" + (jade.escape(null == (jade.interp = i18n(campaign.attributes, 'fullName')) ? "" : jade.interp)) + "</span></div><div class=\"levels-completed\"><span>" + (jade.escape(null == (jade.interp = levelsCompleted) ? "" : jade.interp)) + "</span>/<span>" + (jade.escape(null == (jade.interp = levelsTotal) ? "" : jade.interp)) + "</span></div></div></h1>");
}
buf.push("</div>");
if ( campaign && !me.finishedAnyLevels() && serverConfig.showCodePlayAds)
{
buf.push("<a href=\"https://lenovogamestate.com/\">");
var url = "/images/common/codeplay/NA_LevelsPage_Cube_160x480.png"
if ( me.isFromUk())
{
url = "/images/common/codeplay/UK_LevelsPage_Cube_160x480.png"
}
buf.push("<img" + (jade.attrs({ 'id':('codeplay-ad'), 'src':(url) }, {"src":true})) + "/></a>");
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

;require.register("views/play/CampaignView", function(exports, require, module) {
var AudioPlayer, Campaign, CampaignView, CampaignsCollection, CocoCollection, CourseInstance, CreateAccountModal, EarnedAchievement, LeaderboardModal, Level, LevelSession, LevelSessionsCollection, LevelSetupManager, MusicPlayer, ParticleMan, Poll, PollModal, RootView, ShareProgressModal, SubscribeModal, ThangType, UserPollsRecord, storage, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

RootView = require('views/core/RootView');

template = require('templates/play/campaign-view');

LevelSession = require('models/LevelSession');

EarnedAchievement = require('models/EarnedAchievement');

CocoCollection = require('collections/CocoCollection');

Campaign = require('models/Campaign');

AudioPlayer = require('lib/AudioPlayer');

LevelSetupManager = require('lib/LevelSetupManager');

ThangType = require('models/ThangType');

MusicPlayer = require('lib/surface/MusicPlayer');

storage = require('core/storage');

CreateAccountModal = require('views/core/CreateAccountModal');

SubscribeModal = require('views/core/SubscribeModal');

LeaderboardModal = require('views/play/modal/LeaderboardModal');

Level = require('models/Level');

utils = require('core/utils');

require('vendor/three');

ParticleMan = require('core/ParticleMan');

ShareProgressModal = require('views/play/modal/ShareProgressModal');

UserPollsRecord = require('models/UserPollsRecord');

Poll = require('models/Poll');

PollModal = require('views/play/modal/PollModal');

CourseInstance = require('models/CourseInstance');

require('game-libraries');

LevelSessionsCollection = (function(superClass) {
  extend(LevelSessionsCollection, superClass);

  LevelSessionsCollection.prototype.url = '';

  LevelSessionsCollection.prototype.model = LevelSession;

  function LevelSessionsCollection(model) {
    LevelSessionsCollection.__super__.constructor.call(this);
    this.url = "/db/user/" + me.id + "/level.sessions?project=state.complete,levelID,state.difficulty,playtime";
  }

  return LevelSessionsCollection;

})(CocoCollection);

CampaignsCollection = (function(superClass) {
  extend(CampaignsCollection, superClass);

  function CampaignsCollection() {
    return CampaignsCollection.__super__.constructor.apply(this, arguments);
  }

  CampaignsCollection.prototype.url = '/db/campaign/-/overworld?project=slug,adjacentCampaigns,name,fullName,description,i18n,color,levels';

  CampaignsCollection.prototype.model = Campaign;

  return CampaignsCollection;

})(CocoCollection);

module.exports = CampaignView = (function(superClass) {
  extend(CampaignView, superClass);

  CampaignView.prototype.id = 'campaign-view';

  CampaignView.prototype.template = template;

  CampaignView.prototype.subscriptions = {
    'subscribe-modal:subscribed': 'onSubscribed'
  };

  CampaignView.prototype.events = {
    'click .map-background': 'onClickMap',
    'click .level a': 'onClickLevel',
    'dblclick .level a': 'onDoubleClickLevel',
    'click .level-info-container .start-level': 'onClickStartLevel',
    'click .level-info-container .view-solutions': 'onClickViewSolutions',
    'click .level-info-container .course-version button': 'onClickCourseVersion',
    'click #volume-button': 'onToggleVolume',
    'click #back-button': 'onClickBack',
    'click #clear-storage-button': 'onClickClearStorage',
    'click .portal .campaign': 'onClickPortalCampaign',
    'click .portal .beta-campaign': 'onClickPortalCampaign',
    'click a .campaign-switch': 'onClickCampaignSwitch',
    'mouseenter .portals': 'onMouseEnterPortals',
    'mouseleave .portals': 'onMouseLeavePortals',
    'mousemove .portals': 'onMouseMovePortals',
    'click .poll': 'showPoll'
  };

  CampaignView.prototype.shortcuts = {
    'shift+s': 'onShiftS'
  };

  function CampaignView(options, terrain1) {
    var musicDelay, pixelCode, ref, ref1, shouldReturnToGameDevHoc;
    this.terrain = terrain1;
    this.onWindowResize = bind(this.onWindowResize, this);
    this.onMouseMovePortals = bind(this.onMouseMovePortals, this);
    CampaignView.__super__.constructor.call(this, options);
    if (window.serverConfig.picoCTF) {
      this.terrain = 'picoctf';
    }
    this.editorMode = options != null ? options.editorMode : void 0;
    this.requiresSubscription = !me.isPremium();
    if (this.editorMode) {
      if (this.terrain == null) {
        this.terrain = 'dungeon';
      }
    }
    this.levelStatusMap = {};
    this.levelPlayCountMap = {};
    this.levelDifficultyMap = {};
    if (utils.getQueryVariable('hour_of_code')) {
      me.set('hourOfCode', true);
      me.patch();
      pixelCode = this.terrain === 'game-dev-hoc' ? 'code_combat_gamedev' : 'code_combat';
      $('body').append($("<img src='https://code.org/api/hour/begin_" + pixelCode + ".png' style='visibility: hidden;'>"));
    }
    shouldReturnToGameDevHoc = this.terrain === 'game-dev-hoc';
    storage.save('should-return-to-game-dev-hoc', shouldReturnToGameDevHoc);
    if (window.serverConfig.picoCTF) {
      this.supermodel.addRequestResource({
        url: '/picoctf/problems',
        success: (function(_this) {
          return function(picoCTFProblems) {
            _this.picoCTFProblems = picoCTFProblems;
          };
        })(this)
      }).load();
    } else {
      if (!this.editorMode) {
        this.sessions = this.supermodel.loadCollection(new LevelSessionsCollection(), 'your_sessions', {
          cache: false
        }, 0).model;
        this.listenToOnce(this.sessions, 'sync', this.onSessionsLoaded);
      }
      if (!this.terrain) {
        this.campaigns = this.supermodel.loadCollection(new CampaignsCollection(), 'campaigns', null, 1).model;
        this.listenToOnce(this.campaigns, 'sync', this.onCampaignsLoaded);
        return;
      }
    }
    this.campaign = new Campaign({
      _id: this.terrain
    });
    this.campaign = this.supermodel.loadModel(this.campaign).model;
    this.earnedAchievements = new CocoCollection([], {
      url: '/db/earned_achievement',
      model: EarnedAchievement,
      project: ['earnedRewards']
    });
    this.listenToOnce(this.earnedAchievements, 'sync', function() {
      var earned, group, j, len, loadedEarned, m, ref, results, reward;
      earned = me.get('earned');
      ref = this.earnedAchievements.models;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        m = ref[j];
        if (!(loadedEarned = m.get('earnedRewards'))) {
          continue;
        }
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = ['heroes', 'levels', 'items'];
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            group = ref1[k];
            if (!loadedEarned[group]) {
              continue;
            }
            results1.push((function() {
              var len2, n, ref2, results2;
              ref2 = loadedEarned[group];
              results2 = [];
              for (n = 0, len2 = ref2.length; n < len2; n++) {
                reward = ref2[n];
                if (indexOf.call(earned[group], reward) < 0) {
                  console.warn('Filling in a gap for reward', group, reward);
                  results2.push(earned[group].push(reward));
                } else {
                  results2.push(void 0);
                }
              }
              return results2;
            })());
          }
          return results1;
        })());
      }
      return results;
    });
    this.supermodel.loadCollection(this.earnedAchievements, 'achievements', {
      cache: false
    });
    this.listenToOnce(this.campaign, 'sync', this.getLevelPlayCounts);
    $(window).on('resize', this.onWindowResize);
    this.probablyCachedMusic = storage.load("loaded-menu-music");
    musicDelay = this.probablyCachedMusic ? 1000 : 10000;
    this.playMusicTimeout = _.delay(((function(_this) {
      return function() {
        if (!_this.destroyed) {
          return _this.playMusic();
        }
      };
    })(this)), musicDelay);
    this.hadEverChosenHero = (ref = me.get('heroConfig')) != null ? ref.thangType : void 0;
    this.listenTo(me, 'change:purchased', function() {
      return this.renderSelectors('#gems-count');
    });
    this.listenTo(me, 'change:spent', function() {
      return this.renderSelectors('#gems-count');
    });
    this.listenTo(me, 'change:earned', function() {
      return this.renderSelectors('#gems-count');
    });
    this.listenTo(me, 'change:heroConfig', function() {
      return this.updateHero();
    });
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent('Loaded World Map', {
        category: 'World Map',
        label: this.terrain
      });
    }
  }

  CampaignView.prototype.destroy = function() {
    var ambientSound, ref, ref1, ref2;
    if ((ref = this.setupManager) != null) {
      ref.destroy();
    }
    this.$el.find('.ui-draggable').off().draggable('destroy');
    $(window).off('resize', this.onWindowResize);
    if (ambientSound = this.ambientSound) {
      createjs.Tween.get(ambientSound).to({
        volume: 0.0
      }, 1500).call(function() {
        return ambientSound.stop();
      });
    }
    if ((ref1 = this.musicPlayer) != null) {
      ref1.destroy();
    }
    clearTimeout(this.playMusicTimeout);
    if ((ref2 = this.particleMan) != null) {
      ref2.destroy();
    }
    clearInterval(this.portalScrollInterval);
    return CampaignView.__super__.destroy.call(this);
  };

  CampaignView.prototype.showLoading = function($el) {
    if (!this.campaign) {
      this.$el.find('.game-controls, .user-status').addClass('hidden');
      return this.$el.find('.portal .campaign-name span').text($.i18n.t('common.loading'));
    }
  };

  CampaignView.prototype.hideLoading = function() {
    if (!this.campaign) {
      return this.$el.find('.game-controls, .user-status').removeClass('hidden');
    }
  };

  CampaignView.prototype.getLevelPlayCounts = function() {
    var level, levelID, levelPlayCountsRequest, levelSlugs, success;
    if (!me.isAdmin()) {
      return;
    }
    return;
    success = (function(_this) {
      return function(levelPlayCounts) {
        var j, len, level;
        if (_this.destroyed) {
          return;
        }
        for (j = 0, len = levelPlayCounts.length; j < len; j++) {
          level = levelPlayCounts[j];
          _this.levelPlayCountMap[level._id] = {
            playtime: level.playtime,
            sessions: level.sessions
          };
        }
        if (_this.fullyRendered) {
          return _this.render();
        }
      };
    })(this);
    levelSlugs = (function() {
      var ref, results;
      ref = this.campaign.get('levels');
      results = [];
      for (levelID in ref) {
        level = ref[levelID];
        results.push(level.slug);
      }
      return results;
    }).call(this);
    levelPlayCountsRequest = this.supermodel.addRequestResource('play_counts', {
      url: '/db/level/-/play_counts',
      data: {
        ids: levelSlugs
      },
      method: 'POST',
      success: success
    }, 0);
    return levelPlayCountsRequest.load();
  };

  CampaignView.prototype.onLoaded = function() {
    var ref, ref1, ref2;
    if (this.fullyRendered) {
      return;
    }
    this.fullyRendered = true;
    this.render();
    if (!((ref = me.get('heroConfig')) != null ? ref.thangType : void 0)) {
      this.preloadTopHeroes();
    }
    if (this.terrain !== 'dungeon') {
      this.$el.find('#campaign-status').delay(4000).animate({
        top: "-=58"
      }, 1000);
    }
    if (!me.get('hourOfCode') && this.terrain) {
      if (me.get('anonymous') && me.get('lastLevel') === 'shadow-guard' && me.level() < 4) {
        return this.openModalView(new CreateAccountModal({
          supermodel: this.supermodel,
          showSignupRationale: true
        }));
      } else if (me.get('name') && ((ref1 = me.get('lastLevel')) === 'forgetful-gemsmith' || ref1 === 'signs-and-portents') && me.level() < 5 && !((ref2 = me.get('ageRange')) === '18-24' || ref2 === '25-34' || ref2 === '35-44' || ref2 === '45-100') && !storage.load('sent-parent-email') && !me.isPremium()) {
        return this.openModalView(new ShareProgressModal());
      }
    }
  };

  CampaignView.prototype.setCampaign = function(campaign1) {
    this.campaign = campaign1;
    return this.render();
  };

  CampaignView.prototype.onSubscribed = function() {
    this.requiresSubscription = false;
    return this.render();
  };

  CampaignView.prototype.getRenderData = function(context) {
    var ac, acID, campaign, count, j, k, len, len1, levels, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reject;
    if (context == null) {
      context = {};
    }
    context = CampaignView.__super__.getRenderData.call(this, context);
    context.campaign = this.campaign;
    context.levels = _.values($.extend(true, {}, (ref = (ref1 = this.campaign) != null ? ref1.get('levels') : void 0) != null ? ref : {}));
    if (me.level() < 12 && this.terrain === 'dungeon' && !this.editorMode) {
      reject = me.getFourthLevelGroup() === 'signs-and-portents' ? 'forgetful-gemsmith' : 'signs-and-portents';
      context.levels = _.reject(context.levels, {
        slug: reject
      });
    }
    if (features.freeOnly) {
      context.levels = _.reject(context.levels, 'requiresSubscription');
    }
    this.annotateLevels(context.levels);
    count = this.countLevels(context.levels);
    context.levelsCompleted = count.completed;
    context.levelsTotal = count.total;
    if (((ref2 = this.sessions) != null ? ref2.loaded : void 0) || this.editorMode) {
      this.determineNextLevel(context.levels);
    }
    context.levels = (_.sortBy(context.levels, function(l) {
      return l.position.y;
    })).reverse();
    if (this.campaign) {
      this.campaign.renderedLevels = context.levels;
    }
    context.levelStatusMap = this.levelStatusMap;
    context.levelDifficultyMap = this.levelDifficultyMap;
    context.levelPlayCountMap = this.levelPlayCountMap;
    context.isIPadApp = application.isIPadApp;
    context.picoCTF = window.serverConfig.picoCTF;
    context.requiresSubscription = this.requiresSubscription;
    context.editorMode = this.editorMode;
    context.adjacentCampaigns = _.filter(_.values(_.cloneDeep(((ref3 = this.campaign) != null ? ref3.get('adjacentCampaigns') : void 0) || {})), (function(_this) {
      return function(ac) {
        var ref4, styles;
        if (ac.showIfUnlocked && !_this.editorMode) {
          if (_.isString(ac.showIfUnlocked) && (ref4 = ac.showIfUnlocked, indexOf.call(me.levels(), ref4) < 0)) {
            return false;
          }
          if (_.isArray(ac.showIfUnlocked) && _.intersection(ac.showIfUnlocked, me.levels()).length <= 0) {
            return false;
          }
        }
        ac.name = utils.i18n(ac, 'name');
        styles = [];
        if (ac.color) {
          styles.push("color: " + ac.color);
        }
        if (ac.rotation) {
          styles.push("transform: rotate(" + ac.rotation + "deg)");
        }
        if (ac.position == null) {
          ac.position = {
            x: 10,
            y: 10
          };
        }
        styles.push("left: " + ac.position.x + "%");
        styles.push("top: " + ac.position.y + "%");
        ac.style = styles.join('; ');
        return true;
      };
    })(this));
    context.marked = marked;
    context.i18n = utils.i18n;
    if (this.campaigns) {
      context.campaigns = {};
      ref4 = this.campaigns.models;
      for (j = 0, len = ref4.length; j < len; j++) {
        campaign = ref4[j];
        if (!(campaign.get('slug') !== 'auditions')) {
          continue;
        }
        context.campaigns[campaign.get('slug')] = campaign;
        if ((ref5 = this.sessions) != null ? ref5.loaded : void 0) {
          levels = _.values($.extend(true, {}, (ref6 = campaign.get('levels')) != null ? ref6 : {}));
          count = this.countLevels(levels);
          campaign.levelsTotal = count.total;
          campaign.levelsCompleted = count.completed;
          if (campaign.get('slug') === 'dungeon') {
            campaign.locked = false;
          } else if (!campaign.levelsTotal) {
            campaign.locked = true;
          } else {
            campaign.locked = true;
          }
        }
      }
      ref7 = this.campaigns.models;
      for (k = 0, len1 = ref7.length; k < len1; k++) {
        campaign = ref7[k];
        ref9 = (ref8 = campaign.get('adjacentCampaigns')) != null ? ref8 : {};
        for (acID in ref9) {
          ac = ref9[acID];
          if (_.isString(ac.showIfUnlocked)) {
            if (ref10 = ac.showIfUnlocked, indexOf.call(me.levels(), ref10) >= 0) {
              if ((ref11 = _.find(this.campaigns.models, {
                id: acID
              })) != null) {
                ref11.locked = false;
              }
            }
          } else if (_.isArray(ac.showIfUnlocked)) {
            if (_.intersection(ac.showIfUnlocked, me.levels()).length > 0) {
              if ((ref12 = _.find(this.campaigns.models, {
                id: acID
              })) != null) {
                ref12.locked = false;
              }
            }
          }
        }
      }
    }
    return context;
  };

  CampaignView.prototype.afterRender = function() {
    var ref, view;
    CampaignView.__super__.afterRender.call(this);
    this.onWindowResize();
    if (!application.isIPadApp) {
      _.defer((function(_this) {
        return function() {
          var ref;
          return (ref = _this.$el) != null ? ref.find('.game-controls .btn:not(.poll)').addClass('has-tooltip').tooltip() : void 0;
        };
      })(this));
      view = this;
      this.$el.find('.level, .campaign-switch').addClass('has-tooltip').tooltip().each(function() {
        if (!(me.isAdmin() && view.editorMode)) {
          return;
        }
        return $(this).draggable().on('dragstop', function() {
          var bg, e, x, y;
          bg = $('.map-background');
          x = ($(this).offset().left - bg.offset().left + $(this).outerWidth() / 2) / bg.width();
          y = 1 - ($(this).offset().top - bg.offset().top + $(this).outerHeight() / 2) / bg.height();
          e = {
            position: {
              x: 100 * x,
              y: 100 * y
            },
            levelOriginal: $(this).data('level-original'),
            campaignID: $(this).data('campaign-id')
          };
          if (e.levelOriginal) {
            view.trigger('level-moved', e);
          }
          if (e.campaignID) {
            return view.trigger('adjacent-campaign-moved', e);
          }
        });
      });
    }
    this.updateVolume();
    this.updateHero();
    if (!(window.currentModal || !this.fullyRendered)) {
      this.highlightElement('.level.next', {
        delay: 500,
        duration: 60000,
        rotation: 0,
        sides: ['top']
      });
      if (this.editorMode) {
        this.createLines();
      }
      if (this.options.showLeaderboard) {
        this.showLeaderboard((ref = this.options.justBeatLevel) != null ? ref.get('slug') : void 0);
      }
    }
    this.applyCampaignStyles();
    return this.testParticles();
  };

  CampaignView.prototype.onShiftS = function(e) {
    if (this.editorMode) {
      return this.generateCompletionRates();
    }
  };

  CampaignView.prototype.generateCompletionRates = function() {
    var endDay, j, len, level, ref, ref1, ref2, request, results, startDay;
    if (!me.isAdmin()) {
      return;
    }
    startDay = utils.getUTCDay(-14);
    endDay = utils.getUTCDay(-1);
    $(".map-background").css('background-image', 'none');
    $(".gradient").remove();
    $("#campaign-view").css("background-color", "black");
    ref2 = (ref = (ref1 = this.campaign) != null ? ref1.renderedLevels : void 0) != null ? ref : [];
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      level = ref2[j];
      $("div[data-level-slug=" + level.slug + "] .level-kind").text("Loading...");
      request = this.supermodel.addRequestResource('level_completions', {
        url: '/db/analytics_perday/-/level_completions',
        data: {
          startDay: startDay,
          endDay: endDay,
          slug: level.slug
        },
        method: 'POST',
        success: this.onLevelCompletionsLoaded.bind(this, level)
      }, 0);
      results.push(request.load());
    }
    return results;
  };

  CampaignView.prototype.onLevelCompletionsLoaded = function(level, data) {
    var color, day, finished, j, len, offset, rateDisplay, ratio, ref, ref1, started;
    if (this.destroyed) {
      return;
    }
    started = 0;
    finished = 0;
    for (j = 0, len = data.length; j < len; j++) {
      day = data[j];
      started += (ref = day.started) != null ? ref : 0;
      finished += (ref1 = day.finished) != null ? ref1 : 0;
    }
    if (started === 0) {
      ratio = 0;
    } else {
      ratio = finished / started;
    }
    rateDisplay = (ratio * 100).toFixed(1) + '%';
    $("div[data-level-slug=" + level.slug + "] .level-kind").html((started < 1000 ? started : (started / 1000).toFixed(1) + "k") + "<br>" + rateDisplay);
    if (ratio <= 0.5) {
      color = "rgb(255, 0, 0)";
    } else if (ratio > 0.5 && ratio <= 0.85) {
      offset = (ratio - 0.5) / 0.35;
      color = "rgb(255, " + (Math.round(256 * offset)) + ", 0)";
    } else if (ratio > 0.85 && ratio <= 0.95) {
      offset = (ratio - 0.85) / 0.1;
      color = "rgb(" + (Math.round(256 * (1 - offset))) + ", 256, 0)";
    } else {
      color = "rgb(0, 256, 0)";
    }
    $("div[data-level-slug=" + level.slug + "] .level-kind").css({
      "color": color,
      "width": 256 + "px",
      "transform": "translateX(-50%) translateX(15px)"
    });
    return $("div[data-level-slug=" + level.slug + "]").css("background-color", color);
  };

  CampaignView.prototype.afterInsert = function() {
    var campaignSlug;
    CampaignView.__super__.afterInsert.call(this);
    if (this.getQueryVariable('signup') && !me.get('email')) {
      return this.promptForSignup();
    }
    if (!me.isPremium() && (this.isPremiumCampaign() || (this.options.worldComplete && !features.freeOnly))) {
      if (!me.get('email')) {
        return this.promptForSignup();
      }
      campaignSlug = window.location.pathname.split('/')[2];
      return this.promptForSubscription(campaignSlug, 'premium campaign visited');
    }
  };

  CampaignView.prototype.promptForSignup = function() {
    var authModal;
    this.endHighlight();
    authModal = new CreateAccountModal({
      supermodel: this.supermodel
    });
    authModal.mode = 'signup';
    return this.openModalView(authModal);
  };

  CampaignView.prototype.promptForSubscription = function(slug, label) {
    var ref;
    this.endHighlight();
    this.openModalView(new SubscribeModal());
    return (ref = window.tracker) != null ? ref.trackEvent('Show subscription modal', {
      category: 'Subscription',
      label: label,
      level: slug,
      levelID: slug
    }) : void 0;
  };

  CampaignView.prototype.isPremiumCampaign = function(slug) {
    slug || (slug = window.location.pathname.split('/')[2]);
    return /campaign-(game|web)-dev-\d/.test(slug);
  };

  CampaignView.prototype.showAds = function() {
    return false;
    if (application.isProduction() && !me.isPremium() && !me.isTeacher() && !window.serverConfig.picoCTF) {
      return me.getCampaignAdsGroup() === 'leaderboard-ads';
    }
    return false;
  };

  CampaignView.prototype.annotateLevels = function(orderedLevels) {
    var j, k, len, len1, len2, level, levelIndex, maxConcepts, n, otherLevel, previousIncompletePracticeLevel, problem, ref, ref1, ref10, ref11, ref12, ref13, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, reward;
    previousIncompletePracticeLevel = false;
    results = [];
    for (levelIndex = j = 0, len = orderedLevels.length; j < len; levelIndex = ++j) {
      level = orderedLevels[levelIndex];
      if (level.position == null) {
        level.position = {
          x: 10,
          y: 10
        };
      }
      level.locked = !me.ownsLevel(level.original) || previousIncompletePracticeLevel;
      if (level.slug === 'kithgard-mastery' && this.calculateExperienceScore() === 0) {
        level.locked = true;
      }
      if (level.requiresSubscription && this.requiresSubscription && me.get('hourOfCode')) {
        level.locked = true;
      }
      if (ref = level.slug, indexOf.call(me.getDungeonLevelsHidden(), ref) >= 0) {
        level.locked = true;
      }
      if ((ref1 = this.levelStatusMap[level.slug]) === 'started' || ref1 === 'complete') {
        level.locked = false;
      }
      if (this.editorMode) {
        level.locked = false;
      }
      if ((ref2 = (ref3 = this.campaign) != null ? ref3.get('name') : void 0) === 'Auditions' || ref2 === 'Intro') {
        level.locked = false;
      }
      if (me.isInGodMode()) {
        level.locked = false;
      }
      if (level.adminOnly && ((ref4 = this.levelStatusMap[level.slug]) !== 'started' && ref4 !== 'complete')) {
        level.disabled = true;
      }
      if (me.isInGodMode()) {
        level.disabled = false;
      }
      level.color = 'rgb(255, 80, 60)';
      if (level.requiresSubscription) {
        level.color = 'rgb(80, 130, 200)';
      }
      if (level.adventurer) {
        level.color = 'rgb(200, 80, 200)';
      }
      if (level.locked) {
        level.color = 'rgb(193, 193, 193)';
      }
      level.unlocksHero = (ref5 = _.find(level.rewards, 'hero')) != null ? ref5.hero : void 0;
      if (level.unlocksHero) {
        level.purchasedHero = (ref6 = level.unlocksHero, indexOf.call(((ref7 = me.get('purchased')) != null ? ref7.heroes : void 0) || [], ref6) >= 0);
      }
      level.unlocksItem = (ref8 = _.find(level.rewards, 'item')) != null ? ref8.item : void 0;
      if (window.serverConfig.picoCTF) {
        if (problem = _.find(this.picoCTFProblems || [], {
          pid: level.picoCTFProblem
        })) {
          if (problem.unlocked || level.slug === 'digital-graffiti') {
            level.locked = false;
          }
          level.description = "### " + problem.name + "\n" + (level.description || problem.description) + "\n\n" + problem.category + " - " + problem.score + " points";
          if (problem.solved) {
            level.color = 'rgb(80, 130, 200)';
          }
        }
      }
      if (((ref9 = this.campaign) != null ? ref9.levelIsPractice(level) : void 0) && !level.locked && this.levelStatusMap[level.slug] !== 'complete' && (!level.requiresSubscription || level.adventurer || !this.requiresSubscription)) {
        previousIncompletePracticeLevel = true;
      }
      level.hidden = level.locked;
      if ((ref10 = level.concepts) != null ? ref10.length : void 0) {
        level.displayConcepts = level.concepts;
        maxConcepts = 6;
        if (level.displayConcepts.length > maxConcepts) {
          level.displayConcepts = level.displayConcepts.slice(-maxConcepts);
        }
      }
      level.unlockedInSameCampaign = levelIndex < 5;
      for (k = 0, len1 = orderedLevels.length; k < len1; k++) {
        otherLevel = orderedLevels[k];
        if (!level.unlockedInSameCampaign && otherLevel !== level) {
          ref12 = (ref11 = otherLevel.rewards) != null ? ref11 : [];
          for (n = 0, len2 = ref12.length; n < len2; n++) {
            reward = ref12[n];
            if (reward.level) {
              level.unlockedInSameCampaign || (level.unlockedInSameCampaign = reward.level === level.original);
            }
          }
        }
      }
      if (ref13 = level.slug, indexOf.call(me.getDungeonLevelsHidden(), ref13) >= 0) {
        results.push(level.unlockedInSameCampaign = false);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  CampaignView.prototype.countLevels = function(orderedLevels) {
    var completed, count, j, k, len, len1, level, levelIndex, ref, ref1, started;
    count = {
      total: 0,
      completed: 0
    };
    if (((ref = this.campaign) != null ? ref.get('slug') : void 0) === 'game-dev-hoc') {
      orderedLevels = _.sortBy(orderedLevels, function(level) {
        return level.position.x;
      });
      for (j = 0, len = orderedLevels.length; j < len; j++) {
        level = orderedLevels[j];
        if (this.levelStatusMap[level.slug] === 'complete') {
          count.completed++;
        }
      }
      count.total = orderedLevels.length;
      return count;
    }
    for (levelIndex = k = 0, len1 = orderedLevels.length; k < len1; levelIndex = ++k) {
      level = orderedLevels[levelIndex];
      if (level.locked == null) {
        this.annotateLevels(orderedLevels);
      }
      if (level.disabled) {
        continue;
      }
      completed = this.levelStatusMap[level.slug] === 'complete';
      started = this.levelStatusMap[level.slug] === 'started';
      if ((level.unlockedInSameCampaign || !level.locked) && (started || completed || !((ref1 = this.campaign) != null ? ref1.levelIsPractice(level) : void 0))) {
        ++count.total;
      }
      if (completed) {
        ++count.completed;
      }
    }
    return count;
  };

  CampaignView.prototype.showLeaderboard = function(levelSlug) {
    var leaderboardModal;
    leaderboardModal = new LeaderboardModal({
      supermodel: this.supermodel,
      levelSlug: levelSlug
    });
    return this.openModalView(leaderboardModal);
  };

  CampaignView.prototype.determineNextLevel = function(orderedLevels) {
    var dontPointTo, findNextLevel, foundNext, j, k, len, len1, len2, level, levelIndex, n, nextLevel, nextLevelIndex, ref, reward, subscriptionPrompts;
    dontPointTo = ['lost-viking', 'kithgard-mastery'];
    subscriptionPrompts = [
      {
        slug: 'boom-and-bust',
        unless: 'defense-of-plainswood'
      }
    ];
    if (((ref = this.campaign) != null ? ref.get('slug') : void 0) === 'game-dev-hoc') {
      orderedLevels = _.sortBy(orderedLevels, function(level) {
        return level.position.x;
      });
      for (j = 0, len = orderedLevels.length; j < len; j++) {
        level = orderedLevels[j];
        if (this.levelStatusMap[level.slug] !== 'complete') {
          level.next = true;
          level.locked = false;
          level.hidden = level.locked;
          level.disabled = false;
          level.color = 'rgb(255, 80, 60)';
          return;
        }
      }
    }
    findNextLevel = (function(_this) {
      return function(nextLevels, practiceOnly) {
        var k, len1, nextLevel, nextLevelOriginal, ref1, timesPointedOut;
        for (k = 0, len1 = nextLevels.length; k < len1; k++) {
          nextLevelOriginal = nextLevels[k];
          nextLevel = _.find(orderedLevels, {
            original: nextLevelOriginal
          });
          if (!nextLevel || nextLevel.locked) {
            continue;
          }
          if (practiceOnly && !_this.campaign.levelIsPractice(nextLevel)) {
            continue;
          }
          if (nextLevel.slug === 'kithgard-mastery' && !_this.levelStatusMap[nextLevel.slug] && _this.calculateExperienceScore() >= 3) {
            if (!((timesPointedOut = storage.load("pointed-out-" + nextLevel.slug) || 0) > 3)) {
              dontPointTo = _.without(dontPointTo, nextLevel.slug);
              storage.save("pointed-out-" + nextLevel.slug, timesPointedOut + 1);
            }
          }
          if (!nextLevel.disabled && _this.levelStatusMap[nextLevel.slug] !== 'complete' && (ref1 = nextLevel.slug, indexOf.call(dontPointTo, ref1) < 0) && !nextLevel.replayable && (me.isPremium() || !nextLevel.requiresSubscription || nextLevel.adventurer || _.any(subscriptionPrompts, function(prompt) {
            return nextLevel.slug === prompt.slug && !_this.levelStatusMap[prompt.unless];
          }))) {
            nextLevel.next = true;
            return true;
          }
        }
        return false;
      };
    })(this);
    foundNext = false;
    for (levelIndex = k = 0, len1 = orderedLevels.length; k < len1; levelIndex = ++k) {
      level = orderedLevels[levelIndex];
      if (this.campaign.get('type') === 'course') {
        level.nextLevels = [];
        for (nextLevelIndex = n = 0, len2 = orderedLevels.length; n < len2; nextLevelIndex = ++n) {
          nextLevel = orderedLevels[nextLevelIndex];
          if (!(nextLevelIndex > levelIndex)) {
            continue;
          }
          if (nextLevel.practice && level.nextLevels.length) {
            continue;
          }
          if (level.practice && !nextLevel.practice) {
            break;
          }
          level.nextLevels.push(nextLevel.original);
          if (!nextLevel.practice) {
            break;
          }
        }
      } else {
        level.nextLevels = (function() {
          var len3, o, ref1, ref2, results;
          ref2 = (ref1 = level.rewards) != null ? ref1 : [];
          results = [];
          for (o = 0, len3 = ref2.length; o < len3; o++) {
            reward = ref2[o];
            if (reward.level) {
              results.push(reward.level);
            }
          }
          return results;
        })();
      }
      if (!foundNext) {
        foundNext = findNextLevel(level.nextLevels, true);
      }
      if (!foundNext) {
        foundNext = findNextLevel(level.nextLevels, false);
      }
    }
    if (!foundNext && orderedLevels[0] && !orderedLevels[0].locked && this.levelStatusMap[orderedLevels[0].slug] !== 'complete') {
      return orderedLevels[0].next = true;
    }
  };

  CampaignView.prototype.calculateExperienceScore = function() {
    var adultPoint, experienceScore, j, len, levelSlug, ref, ref1, ref2, ref3, ref4, speedPoints, speedThreshold;
    adultPoint = (ref = me.get('ageRange')) === '18-24' || ref === '25-34' || ref === '35-44' || ref === '45-100';
    speedPoints = 0;
    ref1 = [['dungeons-of-kithgard', 50], ['gems-in-the-deep', 55], ['shadow-guard', 55], ['forgetful-gemsmith', 40], ['true-names', 40]];
    for (j = 0, len = ref1.length; j < len; j++) {
      ref2 = ref1[j], levelSlug = ref2[0], speedThreshold = ref2[1];
      if (((ref3 = _.find((ref4 = this.sessions) != null ? ref4.models : void 0, function(session) {
        return session.get('levelID') === levelSlug;
      })) != null ? ref3.attributes.playtime : void 0) <= speedThreshold) {
        ++speedPoints;
      }
    }
    experienceScore = adultPoint + speedPoints;
    return experienceScore;
  };

  CampaignView.prototype.createLines = function() {
    var j, len, level, nextLevel, nextLevelOriginal, ref, ref1, ref2, results;
    ref2 = (ref = (ref1 = this.campaign) != null ? ref1.renderedLevels : void 0) != null ? ref : [];
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      level = ref2[j];
      results.push((function() {
        var k, len1, ref3, ref4, results1;
        ref4 = (ref3 = level.nextLevels) != null ? ref3 : [];
        results1 = [];
        for (k = 0, len1 = ref4.length; k < len1; k++) {
          nextLevelOriginal = ref4[k];
          if (nextLevel = _.find(this.campaign.renderedLevels, {
            original: nextLevelOriginal
          })) {
            results1.push(this.createLine(level.position, nextLevel.position));
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  CampaignView.prototype.createLine = function(o1, o2) {
    var angle, length, line, mapHeight, mapWidth, p1, p2, ratio, transform;
    mapHeight = parseFloat($(".map").css("height"));
    mapWidth = parseFloat($(".map").css("width"));
    if (!(mapHeight > 0)) {
      return;
    }
    ratio = mapWidth / mapHeight;
    p1 = {
      x: o1.x,
      y: o1.y / ratio
    };
    p2 = {
      x: o2.x,
      y: o2.y / ratio
    };
    length = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    angle = Math.atan2(p1.y - p2.y, p2.x - p1.x) * 180 / Math.PI;
    transform = "translateY(-50%) translateX(-50%) rotate(" + angle + "deg) translateX(50%)";
    line = $('<div>').appendTo('.map').addClass('next-level-line').css({
      transform: transform,
      width: length + '%',
      left: o1.x + '%',
      bottom: (o1.y - 0.5) + '%'
    });
    return line.append($('<div class="line">')).append($('<div class="point">'));
  };

  CampaignView.prototype.applyCampaignStyles = function() {
    var background, backgroundColor, backgroundColorTransparent, backgrounds, i, j, k, len, len1, pos, ref, ref1, rule, rules;
    if (!((ref = this.campaign) != null ? ref.loaded : void 0)) {
      return;
    }
    if ((backgrounds = this.campaign.get('backgroundImage')) && backgrounds.length) {
      backgrounds = _.sortBy(backgrounds, 'width');
      backgrounds.reverse();
      rules = [];
      for (i = j = 0, len = backgrounds.length; j < len; i = ++j) {
        background = backgrounds[i];
        rule = "#campaign-view .map-background { background-image: url(/file/" + background.image + "); }";
        if (i) {
          rule = "@media screen and (max-width: " + background.width + "px) { " + rule + " }";
        }
        rules.push(rule);
      }
      utils.injectCSS(rules.join('\n'));
    }
    if (backgroundColor = this.campaign.get('backgroundColor')) {
      backgroundColorTransparent = this.campaign.get('backgroundColorTransparent');
      this.$el.css('background-color', backgroundColor);
      ref1 = ['top', 'right', 'bottom', 'left'];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        pos = ref1[k];
        this.$el.find("." + pos + "-gradient").css('background-image', "linear-gradient(to " + pos + ", " + backgroundColorTransparent + " 0%, " + backgroundColor + " 100%)");
      }
    }
    return this.playAmbientSound();
  };

  CampaignView.prototype.testParticles = function() {
    var j, len, level, particleKey, ref, ref1, ref2, ref3, ref4, results, terrain;
    if (!(((ref = this.campaign) != null ? ref.loaded : void 0) && $.browser.chrome)) {
      return;
    }
    if (this.particleMan == null) {
      this.particleMan = new ParticleMan();
    }
    this.particleMan.removeEmitters();
    this.particleMan.attach(this.$el.find('.map'));
    ref2 = (ref1 = this.campaign.renderedLevels) != null ? ref1 : {};
    results = [];
    for (j = 0, len = ref2.length; j < len; j++) {
      level = ref2[j];
      if (level.hidden && (this.campaign.levelIsPractice(level) || !level.unlockedInSameCampaign)) {
        continue;
      }
      terrain = this.terrain.replace('-branching-test', '').replace(/(campaign-)?(game|web)-dev-\d/, 'forest').replace(/(intro|game-dev-hoc)/, 'dungeon');
      particleKey = ['level', terrain];
      if (level.type && !((ref3 = level.type) === 'hero' || ref3 === 'course')) {
        particleKey.push(level.type);
      }
      if (level.replayable) {
        particleKey.push('replayable');
      }
      if (level.requiresSubscription) {
        particleKey.push('premium');
      }
      if ((ref4 = level.slug) === 'kithgard-gates' || ref4 === 'siege-of-stonehold' || ref4 === 'clash-of-clones' || ref4 === 'summits-gate') {
        particleKey.push('gate');
      }
      if (level.unlocksHero && !level.unlockedHero) {
        particleKey.push('hero');
      }
      if (particleKey.length === 2) {
        continue;
      }
      if (!(level.hidden || _.intersection(particleKey, ['item', 'hero-ladder', 'replayable', 'game-dev']).length)) {
        continue;
      }
      results.push(this.particleMan.addEmitter(level.position.x / 100, level.position.y / 100, particleKey.join('-')));
    }
    return results;
  };

  CampaignView.prototype.onMouseEnterPortals = function(e) {
    var ref, ref1;
    if (!(((ref = this.campaigns) != null ? ref.loaded : void 0) && ((ref1 = this.sessions) != null ? ref1.loaded : void 0))) {
      return;
    }
    this.portalScrollInterval = setInterval(this.onMouseMovePortals, 100);
    return this.onMouseMovePortals(e);
  };

  CampaignView.prototype.onMouseLeavePortals = function(e) {
    if (!this.portalScrollInterval) {
      return;
    }
    clearInterval(this.portalScrollInterval);
    return this.portalScrollInterval = null;
  };

  CampaignView.prototype.onMouseMovePortals = function(e) {
    var $portal, $portals, bodyWidth, direction, fraction, magnitude, portalsWidth, scrollTo;
    if (!this.portalScrollInterval) {
      return;
    }
    $portal = this.$el.find('.portal');
    $portals = this.$el.find('.portals');
    if (e) {
      this.portalOffsetX = Math.round(Math.max(0, e.clientX - $portal.offset().left));
    }
    bodyWidth = $('body').innerWidth();
    fraction = this.portalOffsetX / bodyWidth;
    if ((0.2 < fraction && fraction < 0.8)) {
      return;
    }
    direction = fraction < 0.5 ? 1 : -1;
    magnitude = 0.2 * bodyWidth * (direction === -1 ? fraction - 0.8 : 0.2 - fraction) / 0.2;
    portalsWidth = 2536;
    scrollTo = $portals.offset().left + direction * magnitude;
    scrollTo = Math.max(bodyWidth - portalsWidth, scrollTo);
    scrollTo = Math.min(0, scrollTo);
    return $portals.stop().animate({
      marginLeft: scrollTo
    }, 100, 'linear');
  };

  CampaignView.prototype.onSessionsLoaded = function(e) {
    var j, len, ref, ref1, ref2, session;
    if (this.editorMode) {
      return;
    }
    ref = this.sessions.models;
    for (j = 0, len = ref.length; j < len; j++) {
      session = ref[j];
      if (this.levelStatusMap[session.get('levelID')] !== 'complete') {
        this.levelStatusMap[session.get('levelID')] = ((ref1 = session.get('state')) != null ? ref1.complete : void 0) ? 'complete' : 'started';
      }
      if ((ref2 = session.get('state')) != null ? ref2.difficulty : void 0) {
        this.levelDifficultyMap[session.get('levelID')] = session.get('state').difficulty;
      }
    }
    this.render();
    if (!(me.get('anonymous') || window.serverConfig.picoCTF)) {
      return this.loadUserPollsRecord();
    }
  };

  CampaignView.prototype.onCampaignsLoaded = function(e) {
    return this.render();
  };

  CampaignView.prototype.preloadLevel = function(levelSlug) {
    var level, levelURL, sessionURL;
    levelURL = "/db/level/" + levelSlug;
    level = new Level().setURL(levelURL);
    level = this.supermodel.loadModel(level, null, 0).model;
    sessionURL = "/db/level/" + levelSlug + "/session";
    this.preloadedSession = new LevelSession().setURL(sessionURL);
    this.listenToOnce(this.preloadedSession, 'sync', this.onSessionPreloaded);
    this.preloadedSession = this.supermodel.loadModel(this.preloadedSession, {
      cache: false
    }).model;
    return this.preloadedSession.levelSlug = levelSlug;
  };

  CampaignView.prototype.onSessionPreloaded = function(session) {
    var badge, difficulty, levelElement, ref;
    session.url = function() {
      return '/db/level.session/' + this.id;
    };
    levelElement = this.$el.find('.level-info-container:visible');
    if (session.levelSlug !== levelElement.data('level-slug')) {
      return;
    }
    if (!(difficulty = (ref = session.get('state')) != null ? ref.difficulty : void 0)) {
      return;
    }
    badge = $("<span class='badge'>" + difficulty + "</span>");
    levelElement.find('.start-level .badge').remove();
    return levelElement.find('.start-level').append(badge);
  };

  CampaignView.prototype.onClickMap = function(e) {
    var ref, ref1;
    if ((ref = this.$levelInfo) != null) {
      ref.hide();
    }
    if (((ref1 = this.sessions) != null ? ref1.models.length : void 0) < 3) {
      return this.highlightElement('.level.next', {
        delay: 500,
        duration: 60000,
        rotation: 0,
        sides: ['top']
      });
    }
  };

  CampaignView.prototype.onClickLevel = function(e) {
    var levelElement, levelOriginal, levelSlug, ref;
    e.preventDefault();
    e.stopPropagation();
    if ((ref = this.$levelInfo) != null) {
      ref.hide();
    }
    levelElement = $(e.target).parents('.level');
    levelSlug = levelElement.data('level-slug');
    levelOriginal = levelElement.data('level-original');
    if (this.editorMode) {
      return this.trigger('level-clicked', levelOriginal);
    }
    this.$levelInfo = this.$el.find(".level-info-container[data-level-slug=" + levelSlug + "]").show();
    this.checkForCourseOption(levelOriginal);
    this.adjustLevelInfoPosition(e);
    this.endHighlight();
    return this.preloadLevel(levelSlug);
  };

  CampaignView.prototype.onDoubleClickLevel = function(e) {
    var levelElement, levelOriginal;
    if (!this.editorMode) {
      return;
    }
    levelElement = $(e.target).parents('.level');
    levelOriginal = levelElement.data('level-original');
    return this.trigger('level-double-clicked', levelOriginal);
  };

  CampaignView.prototype.onClickStartLevel = function(e) {
    var canPlayAnyway, level, levelElement, levelOriginal, levelSlug, ref, ref1, requiresSubscription;
    levelElement = $(e.target).parents('.level-info-container');
    levelSlug = levelElement.data('level-slug');
    levelOriginal = levelElement.data('level-original');
    level = _.find(_.values(this.campaign.get('levels')), {
      slug: levelSlug
    });
    requiresSubscription = level.requiresSubscription || (me.isOnPremiumServer() && !((ref = level.slug) === 'dungeons-of-kithgard' || ref === 'gems-in-the-deep' || ref === 'shadow-guard' || ref === 'forgetful-gemsmith' || ref === 'signs-and-portents' || ref === 'true-names'));
    canPlayAnyway = !this.requiresSubscription || level.adventurer || this.levelStatusMap[level.slug];
    if (requiresSubscription && !canPlayAnyway) {
      return this.promptForSubscription(levelSlug, 'map level clicked');
    } else {
      this.startLevel(levelElement);
      return (ref1 = window.tracker) != null ? ref1.trackEvent('Clicked Start Level', {
        category: 'World Map',
        levelID: levelSlug
      }) : void 0;
    }
  };

  CampaignView.prototype.onClickCourseVersion = function(e) {
    var courseID, courseInstanceID, levelSlug, url;
    levelSlug = $(e.target).parents('.level-info-container').data('level-slug');
    courseID = $(e.target).parents('.course-version').data('course-id');
    courseInstanceID = $(e.target).parents('.course-version').data('course-instance-id');
    url = "/play/level/" + levelSlug + "?course=" + courseID + "&course-instance=" + courseInstanceID;
    return Backbone.Mediator.publish('router:navigate', {
      route: url
    });
  };

  CampaignView.prototype.startLevel = function(levelElement) {
    var levelSlug, ref, ref1, ref2, session;
    if ((ref = this.setupManager) != null) {
      ref.destroy();
    }
    levelSlug = levelElement.data('level-slug');
    if (((ref1 = this.preloadedSession) != null ? ref1.loaded : void 0) && this.preloadedSession.levelSlug === levelSlug) {
      session = this.preloadedSession;
    }
    this.setupManager = new LevelSetupManager({
      supermodel: this.supermodel,
      levelID: levelSlug,
      levelPath: levelElement.data('level-path'),
      levelName: levelElement.data('level-name'),
      hadEverChosenHero: this.hadEverChosenHero,
      parent: this,
      session: session
    });
    if (!((ref2 = this.setupManager) != null ? ref2.navigatingToPlay : void 0)) {
      this.$levelInfo.find('.level-info, .progress').toggleClass('hide');
      this.listenToOnce(this.setupManager, 'open', function() {
        var ref3, ref4;
        if ((ref3 = this.$levelInfo) != null) {
          ref3.find('.level-info, .progress').toggleClass('hide');
        }
        return (ref4 = this.$levelInfo) != null ? ref4.hide() : void 0;
      });
      return this.setupManager.open();
    }
  };

  CampaignView.prototype.onClickViewSolutions = function(e) {
    var level, levelElement, levelSlug, ref;
    levelElement = $(e.target).parents('.level-info-container');
    levelSlug = levelElement.data('level-slug');
    level = _.find(_.values(this.campaign.get('levels')), {
      slug: levelSlug
    });
    if ((ref = level.type) === 'hero-ladder' || ref === 'course-ladder') {
      return Backbone.Mediator.publish('router:navigate', {
        route: "/play/ladder/" + levelSlug,
        viewClass: 'views/ladder/LadderView',
        viewArgs: [
          {
            supermodel: this.supermodel
          }, levelSlug
        ]
      });
    } else {
      return this.showLeaderboard(levelSlug);
    }
  };

  CampaignView.prototype.adjustLevelInfoPosition = function(e) {
    var height, mapOffset, mapX, mapY, margin, top, width;
    if (!this.$levelInfo) {
      return;
    }
    if (this.$map == null) {
      this.$map = this.$el.find('.map');
    }
    mapOffset = this.$map.offset();
    mapX = e.pageX - mapOffset.left;
    mapY = e.pageY - mapOffset.top;
    margin = 20;
    width = this.$levelInfo.outerWidth();
    this.$levelInfo.css('left', Math.min(Math.max(margin, mapX - width / 2), this.$map.width() - width - margin));
    height = this.$levelInfo.outerHeight();
    top = mapY - this.$levelInfo.outerHeight() - 60;
    if (top < 100) {
      top = mapY + 60;
    }
    return this.$levelInfo.css('top', top);
  };

  CampaignView.prototype.onWindowResize = function(e) {
    var adContainerHeight, aspectRatio, heightRatio, iPadHeight, mapHeight, mapWidth, pageHeight, pageWidth, resultingHeight, resultingMarginX, resultingMarginY, resultingWidth, widthRatio;
    mapHeight = iPadHeight = 1536;
    mapWidth = {
      dungeon: 2350,
      forest: 2500,
      auditions: 2500,
      desert: 2350,
      mountain: 2422,
      glacier: 2421
    }[this.terrain] || 2350;
    aspectRatio = mapWidth / mapHeight;
    pageWidth = this.$el.width();
    pageHeight = this.$el.height();
    if (adContainerHeight = $('.ad-container').outerHeight()) {
      pageHeight -= adContainerHeight;
    }
    widthRatio = pageWidth / mapWidth;
    heightRatio = pageHeight / mapHeight;
    if (heightRatio <= widthRatio) {
      resultingHeight = pageHeight;
      resultingWidth = resultingHeight * aspectRatio;
    } else {
      resultingWidth = pageWidth;
      resultingHeight = resultingWidth / aspectRatio;
    }
    resultingMarginX = (pageWidth - resultingWidth) / 2;
    resultingMarginY = (pageHeight - resultingHeight) / 2;
    this.$el.find('.map').css({
      width: resultingWidth,
      height: resultingHeight,
      'margin-left': resultingMarginX,
      'margin-top': resultingMarginY
    });
    if (this.particleMan) {
      return this.testParticles();
    }
  };

  CampaignView.prototype.playAmbientSound = function() {
    var file, ref, ref1, ref2, src;
    if (!me.get('volume')) {
      return;
    }
    if (this.ambientSound) {
      return;
    }
    if (!(file = (ref = this.campaign) != null ? (ref1 = ref.get('ambientSound')) != null ? ref1[AudioPlayer.ext.substr(1)] : void 0 : void 0)) {
      return;
    }
    src = "/file/" + file;
    if (!((ref2 = AudioPlayer.getStatus(src)) != null ? ref2.loaded : void 0)) {
      AudioPlayer.preloadSound(src);
      Backbone.Mediator.subscribeOnce('audio-player:loaded', this.playAmbientSound, this);
      return;
    }
    this.ambientSound = createjs.Sound.play(src, {
      loop: -1,
      volume: 0.1
    });
    return createjs.Tween.get(this.ambientSound).to({
      volume: 0.5
    }, 1000);
  };

  CampaignView.prototype.playMusic = function() {
    var musicFile;
    this.musicPlayer = new MusicPlayer();
    musicFile = '/music/music-menu';
    Backbone.Mediator.publish('music-player:play-music', {
      play: true,
      file: musicFile
    });
    if (!this.probablyCachedMusic) {
      return storage.save("loaded-menu-music", true);
    }
  };

  CampaignView.prototype.checkForCourseOption = function(levelOriginal) {
    var courseInstances, ref;
    if (!((ref = me.get('courseInstances')) != null ? ref.length : void 0)) {
      return;
    }
    if (this.courseOptionsChecked == null) {
      this.courseOptionsChecked = {};
    }
    if (this.courseOptionsChecked[levelOriginal]) {
      return;
    }
    this.courseOptionsChecked[levelOriginal] = true;
    courseInstances = new CocoCollection([], {
      url: "/db/course_instance/-/find_by_level/" + levelOriginal,
      model: CourseInstance
    });
    courseInstances.comparator = function(ci) {
      var ref1;
      return -((ref1 = ci.get('members')) != null ? ref1 : []).length;
    };
    this.supermodel.loadCollection(courseInstances, 'course_instances');
    return this.listenToOnce(courseInstances, 'sync', (function(_this) {
      return function() {
        var courseInstance;
        if (_this.destroyed) {
          return;
        }
        if (!(courseInstance = courseInstances.models[0])) {
          return;
        }
        return _this.$el.find(".course-version[data-level-original='" + levelOriginal + "']").removeClass('hidden').data({
          'course-id': courseInstance.get('courseID'),
          'course-instance-id': courseInstance.id
        });
      };
    })(this));
  };

  CampaignView.prototype.preloadTopHeroes = function() {
    var fullHero, heroID, j, len, ref, results, url;
    if (window.serverConfig.picoCTF) {
      return;
    }
    ref = ['captain', 'knight'];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      heroID = ref[j];
      url = "/db/thang.type/" + ThangType.heroes[heroID] + "/version";
      if (this.supermodel.getModel(url)) {
        continue;
      }
      fullHero = new ThangType();
      fullHero.setURL(url);
      results.push(this.supermodel.loadModel(fullHero));
    }
    return results;
  };

  CampaignView.prototype.updateVolume = function(volume) {
    var button, classes, ref;
    if (volume == null) {
      volume = (ref = me.get('volume')) != null ? ref : 1.0;
    }
    classes = ['vol-off', 'vol-down', 'vol-up'];
    button = $('#volume-button', this.$el);
    button.toggleClass('vol-off', volume <= 0.0);
    button.toggleClass('vol-down', (0.0 < volume && volume < 1.0));
    button.toggleClass('vol-up', volume >= 1.0);
    createjs.Sound.setVolume(volume === 1 ? 0.6 : volume);
    if (volume !== me.get('volume')) {
      me.set('volume', volume);
      me.patch();
      if (volume) {
        return this.playAmbientSound();
      }
    }
  };

  CampaignView.prototype.onToggleVolume = function(e) {
    var button, classes, i, j, len, newI, oldClass, volumes;
    button = $(e.target).closest('#volume-button');
    classes = ['vol-off', 'vol-down', 'vol-up'];
    volumes = [0, 0.4, 1.0];
    for (i = j = 0, len = classes.length; j < len; i = ++j) {
      oldClass = classes[i];
      if (button.hasClass(oldClass)) {
        newI = (i + 1) % classes.length;
        break;
      } else if (i === classes.length - 1) {
        newI = 2;
      }
    }
    return this.updateVolume(volumes[newI]);
  };

  CampaignView.prototype.onClickBack = function(e) {
    return Backbone.Mediator.publish('router:navigate', {
      route: "/play",
      viewClass: CampaignView,
      viewArgs: [
        {
          supermodel: this.supermodel
        }
      ]
    });
  };

  CampaignView.prototype.onClickClearStorage = function(e) {
    localStorage.clear();
    return noty({
      text: 'Local storage cleared. Reload to view the original campaign.',
      layout: 'topCenter',
      timeout: 5000,
      type: 'information'
    });
  };

  CampaignView.prototype.updateHero = function() {
    var hero, original, ref, ref1, slug;
    if (!(hero = (ref = me.get('heroConfig')) != null ? ref.thangType : void 0)) {
      return;
    }
    ref1 = ThangType.heroes;
    for (slug in ref1) {
      original = ref1[slug];
      if (!(original === hero)) {
        continue;
      }
      this.$el.find('.player-hero-icon').removeClass().addClass('player-hero-icon ' + slug);
      return;
    }
    return console.error("CampaignView hero update couldn't find hero slug for original:", hero);
  };

  CampaignView.prototype.onClickPortalCampaign = function(e) {
    var campaign, campaignSlug;
    campaign = $(e.target).closest('.campaign, .beta-campaign');
    if (campaign.is('.locked') || campaign.is('.silhouette')) {
      return;
    }
    campaignSlug = campaign.data('campaign-slug');
    if (this.isPremiumCampaign(campaignSlug) && !me.isPremium()) {
      return this.promptForSubscription(campaignSlug, 'premium campaign clicked');
    }
    return Backbone.Mediator.publish('router:navigate', {
      route: "/play/" + campaignSlug,
      viewClass: CampaignView,
      viewArgs: [
        {
          supermodel: this.supermodel
        }, campaignSlug
      ]
    });
  };

  CampaignView.prototype.onClickCampaignSwitch = function(e) {
    var campaignSlug;
    campaignSlug = $(e.target).data('campaign-slug');
    console.log(campaignSlug, this.isPremiumCampaign(campaignSlug));
    if (this.isPremiumCampaign(campaignSlug) && !me.isPremium()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return this.promptForSubscription(campaignSlug, 'premium campaign switch clicked');
    }
  };

  CampaignView.prototype.loadUserPollsRecord = function() {
    var onRecordSync, url;
    url = "/db/user.polls.record/-/user/" + me.id;
    this.userPollsRecord = new UserPollsRecord().setURL(url);
    onRecordSync = function() {
      var interval, lastVoted;
      if (this.destroyed) {
        return;
      }
      this.userPollsRecord.url = function() {
        return '/db/user.polls.record/' + this.id;
      };
      lastVoted = new Date(this.userPollsRecord.get('changed') || 0);
      interval = new Date() - lastVoted;
      if (interval > 22 * 60 * 60 * 1000) {
        return this.loadPoll();
      } else {
        return console.log('Poll will be ready in', (22 * 60 * 60 * 1000 - interval) / (60 * 60 * 1000), 'hours.');
      }
    };
    this.listenToOnce(this.userPollsRecord, 'sync', onRecordSync);
    this.userPollsRecord = this.supermodel.loadModel(this.userPollsRecord, null, 0).model;
    if (this.userPollsRecord.loaded) {
      return onRecordSync.call(this);
    }
  };

  CampaignView.prototype.loadPoll = function() {
    var onPollError, onPollSync, url;
    url = "/db/poll/" + this.userPollsRecord.id + "/next";
    this.poll = new Poll().setURL(url);
    onPollSync = function() {
      if (this.destroyed) {
        return;
      }
      this.poll.url = function() {
        return '/db/poll/' + this.id;
      };
      return _.delay(((function(_this) {
        return function() {
          return typeof _this.activatePoll === "function" ? _this.activatePoll() : void 0;
        };
      })(this)), 1000);
    };
    onPollError = function(poll, response, request) {
      if (response.status === 404) {
        console.log('There are no more polls left.');
      } else {
        console.error("Couldn't load poll:", response.status, response.statusText);
      }
      return delete this.poll;
    };
    this.listenToOnce(this.poll, 'sync', onPollSync);
    this.listenToOnce(this.poll, 'error', onPollError);
    this.poll = this.supermodel.loadModel(this.poll, null, 0).model;
    if (this.poll.loaded) {
      return onPollSync.call(this);
    }
  };

  CampaignView.prototype.activatePoll = function() {
    var $pollButton, pollTitle;
    pollTitle = utils.i18n(this.poll.attributes, 'name');
    $pollButton = this.$el.find('button.poll').removeClass('hidden').addClass('highlighted').attr({
      title: pollTitle
    }).addClass('has-tooltip').tooltip({
      title: pollTitle
    });
    if (me.get('lastLevel') === 'shadow-guard') {
      return this.showPoll();
    } else {
      return $pollButton.tooltip('show');
    }
  };

  CampaignView.prototype.showPoll = function() {
    var $pollButton, pollModal;
    pollModal = new PollModal({
      supermodel: this.supermodel,
      poll: this.poll,
      userPollsRecord: this.userPollsRecord
    });
    this.openModalView(pollModal);
    $pollButton = this.$el.find('button.poll');
    return pollModal.on('vote-updated', function() {
      return $pollButton.removeClass('highlighted').tooltip('hide');
    });
  };

  return CampaignView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/CampaignView.js.map
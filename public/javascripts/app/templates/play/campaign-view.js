require.register("templates/play/campaign-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,campaign = locals_.campaign,features = locals_.features,serverConfig = locals_.serverConfig,levels = locals_.levels,i18n = locals_.i18n,translate = locals_.translate,levelStatusMap = locals_.levelStatusMap,editorMode = locals_.editorMode,levelDifficultyMap = locals_.levelDifficultyMap,levelPlayCountMap = locals_.levelPlayCountMap,marked = locals_.marked,picoCTF = locals_.picoCTF,me = locals_.me,adjacentCampaigns = locals_.adjacentCampaigns,_ = locals_._,campaigns = locals_.campaigns,levelsCompleted = locals_.levelsCompleted,levelsTotal = locals_.levelsTotal;if ( view.showAds())
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
if ( !me.get('anonymous', true) && !features.codePlay)
{
buf.push("<a href=\"/account/settings\" data-original-title=\"Configuração\" class=\"btn account\"></a>");
}
buf.push("</div><div class=\"user-status header-font picoctf-hide\"><div class=\"user-status-line\"><span class=\"gem gem-30\"></span><span id=\"gems-count\" class=\"spr\">" + (jade.escape(null == (jade.interp = me.gems()) ? "" : jade.interp)) + "</span><span data-i18n=\"general.player_level\" class=\"level-indicator\"></span><span class=\"player-level spr\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><span class=\"player-hero-icon\"></span>");
if ( me.get('anonymous'))
{
buf.push("<span data-i18n=\"play.anonymous\" class=\"player-name spr\">Anonymous Player</span><button data-i18n=\"login.log_in\" class=\"btn btn-illustrated login-button btn-warning\"></button><button data-i18n=\"signup.sign_up\" class=\"btn btn-illustrated signup-button btn-danger\"></button>");
}
else
{
buf.push("<a href=\"/account/settings\" class=\"player-name spr\">" + (jade.escape(null == (jade.interp = me.get('name')) ? "" : jade.interp)) + "</a><button id=\"logout-button\" data-i18n=\"login.log_out\" class=\"btn btn-illustrated btn-warning\">Log Out</button>");
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

;
//# sourceMappingURL=/javascripts/app/templates/play/campaign-view.js.map
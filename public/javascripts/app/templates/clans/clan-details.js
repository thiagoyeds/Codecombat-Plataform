require.register("templates/clans/clan-details", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,clan = locals_.clan,owner = locals_.owner,stats = locals_.stats,isOwner = locals_.isOwner,isMember = locals_.isMember,joinClanLink = locals_.joinClanLink,arenas = locals_.arenas,i18n = locals_.i18n,members = locals_.members,memberSort = locals_.memberSort,memberLanguageMap = locals_.memberLanguageMap,conceptsProgression = locals_.conceptsProgression,userConceptsMap = locals_.userConceptsMap,campaignLevelProgressions = locals_.campaignLevelProgressions,lastUserCampaignLevelMap = locals_.lastUserCampaignLevelMap,memberLevelStateMap = locals_.memberLevelStateMap,showExpandedProgress = locals_.showExpandedProgress,memberAchievementsMap = locals_.memberAchievementsMap,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div id=\"editNameModal\" class=\"modal\"><div class=\"modal-dialog\"><div class=\"modal-header\"><button data-dismiss=\"modal\" class=\"close\"><span>&times;</span></button><h3 data-i18n=\"clans.edit_clan_name\" class=\"modal-title\">Edit Clan Name</h3></div><div class=\"modal-body\"><input" + (jade.attrs({ 'type':('text'), 'value':("" + (clan.get('name')) + ""), "class": [('edit-name-input')] }, {"type":true,"value":true})) + "/></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"modal.close\" class=\"btn\">Close</button><button data-i18n=\"common.save_changes\" class=\"btn edit-name-save-btn\">Save changes</button></div></div></div><div id=\"editDescriptionModal\" class=\"modal\"><div class=\"modal-dialog\"><div class=\"modal-header\"><button data-dismiss=\"modal\" class=\"close\"><span>&times;</span></button><h3 data-i18n=\"clans.edit_clan_description\" class=\"modal-title\">Edit Clan Description</h3></div><div class=\"modal-body\"><textarea rows=\"2\" class=\"edit-description-input\">" + (jade.escape(null == (jade.interp = clan.get('description')) ? "" : jade.interp)) + "</textarea></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"modal.close\" class=\"btn\">Close</button><button data-i18n=\"common.save_changes\" class=\"btn edit-description-save-btn\">Save changes</button></div></div></div><div class=\"row\"><div class=\"col-lg-6\">");
if ( clan)
{
buf.push("<h1>" + (jade.escape((jade.interp = clan.get('name')) == null ? '' : jade.interp)) + "");
if ( clan.get('type') === 'private')
{
buf.push("<small data-i18n=\"clans.private\">(private)</small>");
}
if ( clan.get('ownerID') === me.id)
{
buf.push("<span class=\"spl\"><button data-toggle=\"modal\" data-target=\"#editNameModal\" data-i18n=\"clans.edit_name\" class=\"btn btn-xs edit-name-btn\">edit name</button></span>");
}
buf.push("</h1>");
if ( clan.get('description'))
{
buf.push("<div class=\"clan-description\">");
// iterate clan.get('description').split('\n')
;(function(){
  var $$obj = clan.get('description').split('\n');
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var line = $$obj[$index];

buf.push("<p>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var line = $$obj[$index];

buf.push("<p>" + (jade.escape(null == (jade.interp = line) ? "" : jade.interp)) + "</p>");
    }

  }
}).call(this);

buf.push("</div>");
}
if ( clan.get('ownerID') === me.id)
{
buf.push("<button data-toggle=\"modal\" data-target=\"#editDescriptionModal\" data-i18n=\"clans.edit_description\" class=\"btn btn-xs edit-description-btn\">edit description</button>");
}
}
buf.push("<h5 data-i18n=\"clans.summary\">Summary</h5><table class=\"table table-condensed stats-table\">");
if ( owner)
{
buf.push("<tr><td><span data-i18n=\"clans.chieftain\" class=\"spr\">Chieftain</span></td><td><span" + (jade.attrs({ 'data-memberid':("" + (clan.get('ownerID')) + ""), "class": [('spr'),('player-hero-icon')] }, {"data-memberid":true})) + "></span><a" + (jade.attrs({ 'href':("/user/" + (clan.get('ownerID')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = owner.get('name')) ? "" : jade.interp)) + "</a></td></tr>");
}
if ( stats.averageLevel)
{
buf.push("<tr><td data-i18n=\"clans.average_level\">Average Level</td><td>" + (jade.escape(null == (jade.interp = stats.averageLevel) ? "" : jade.interp)) + "</td></tr>");
}
if ( stats.averageAchievements && clan.get('type') === 'public')
{
buf.push("<tr><td data-i18n=\"clans.average_achievements\">Average Achievements</td><td>" + (jade.escape(null == (jade.interp = stats.averageAchievements) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</table><p>");
if ( isOwner)
{
buf.push("<button data-i18n=\"clans.delete_clan\" class=\"btn btn-xs btn-warning delete-clan-btn\">Delete Clan</button>");
}
else if ( isMember)
{
buf.push("<button data-i18n=\"clans.leave_clan\" class=\"btn btn-xs btn-warning leave-clan-btn\">Leave Clan</button>");
}
else
{
buf.push("<button data-i18n=\"clans.join_clan\" class=\"btn btn-lg btn-success join-clan-btn\">Join Clan</button>");
}
buf.push("</p>");
if ( clan.get('ownerID') === me.id || clan.get('type') === 'public')
{
buf.push("<div><span data-i18n=\"clans.invite_1\" class=\"spl spr join-link-prompt\">Invite:</span><input" + (jade.attrs({ 'type':("text"), 'readonly':(true), 'value':("" + (joinClanLink) + ""), "class": [('join-clan-link')] }, {"type":true,"readonly":false,"value":true})) + "/></div><div data-i18n=\"clans.invite_2\" class=\"small\">*Invite players to this Clan by sending them this link.</div>");
}
buf.push("</div>");
if ( arenas && arenas.length)
{
buf.push("<div class=\"col-lg-6\"><h2 data-i18n=\"play.campaign_multiplayer\"></h2><p data-i18n=\"clans.leagues_explanation\"></p>");
// iterate arenas
;(function(){
  var $$obj = arenas;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var arena = $$obj[$index];

if ( arena.slug === 'cavern-survival' || arena.slug === 'zero-sum' || arena.slug === 'ace-of-coders')
{
buf.push("<h3><a" + (jade.attrs({ 'href':("/play/ladder/" + (arena.slug) + "/clan/" + (clan.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = i18n(arena, 'name')) ? "" : jade.interp)) + "</a></h3>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var arena = $$obj[$index];

if ( arena.slug === 'cavern-survival' || arena.slug === 'zero-sum' || arena.slug === 'ace-of-coders')
{
buf.push("<h3><a" + (jade.attrs({ 'href':("/play/ladder/" + (arena.slug) + "/clan/" + (clan.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = i18n(arena, 'name')) ? "" : jade.interp)) + "</a></h3>");
}
    }

  }
}).call(this);

buf.push("</div>");
}
buf.push("</div>");
if ( members)
{
buf.push("<h3><span data-i18n=\"clans.members\" class=\"spr\">Members</span><span>(" + (jade.escape((jade.interp = members.length) == null ? '' : jade.interp)) + ")</span></h3>");
if ( clan.get('dashboardType') === 'premium')
{
buf.push("<table class=\"table table-condensed\"><thead><tr><th><span data-i18n=\"resources.hero\" class=\"member-header spr\">Hero</span>");
if ( memberSort === 'nameAsc')
{
buf.push("<span class=\"member-header glyphicon glyphicon-chevron-up\"></span>");
}
else if ( memberSort === 'nameDesc')
{
buf.push("<span class=\"member-header glyphicon glyphicon-chevron-down\"></span>");
}
buf.push("</th><th><span data-i18n=\"clans.progress\" class=\"progress-header spr\">Progress</span>");
if ( memberSort === 'progressAsc')
{
buf.push("<span class=\"progress-header glyphicon glyphicon-chevron-up\"></span>");
}
else if ( memberSort === 'progressDesc')
{
buf.push("<span class=\"progress-header glyphicon glyphicon-chevron-down\"></span>");
}
else
{
buf.push("<span style=\"padding-left:16px;\"></span>");
}
buf.push("<span data-i18n=\"clans.complete_1\" class=\"spl progress-key progress-key-complete\">complete</span><span data-i18n=\"clans.started_1\" class=\"progress-key progress-key-started\">started</span><span data-i18n=\"clans.not_started_1\" class=\"progress-key\">not started</span><input type=\"checkbox\" class=\"expand-progress-checkbox\"/><span data-i18n=\"clans.exp_levels\" class=\"spl expand-progress-label\">Expand levels</span></th></tr></thead><tbody>");
// iterate members
;(function(){
  var $$obj = members;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var member = $$obj[$index];

buf.push("<tr><td><div><span class=\"hero-icon-cell\"><span" + (jade.attrs({ 'data-memberid':("" + (member.id) + ""), "class": [('spr'),('player-hero-icon')] }, {"data-memberid":true})) + "></span></span><span class=\"code-language-cell\">");
if ( memberLanguageMap && memberLanguageMap[member.id])
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (memberLanguageMap[member.id]) + "_small.png)"), 'title':(memberLanguageMap[member.id]), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("</span></div><div><a" + (jade.attrs({ 'href':("/user/" + (member.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = member.get('name') || 'Anonymous') ? "" : jade.interp)) + "</a></div><div>Level " + (jade.escape((jade.interp = member.level()) == null ? '' : jade.interp)) + "</div>");
if ( isOwner && member.id !== clan.get('ownerID'))
{
buf.push("<button" + (jade.attrs({ 'data-id':("" + (member.id) + ""), 'data-i18n':("clans.rem_hero"), "class": [('btn'),('btn-xs'),('btn-warning'),('remove-member-btn')] }, {"data-id":true,"data-i18n":true})) + ">Remove Hero</button>");
}
buf.push("</td><td class=\"progress-cell\"><div class=\"level-progression-concepts\">Concepts</div>");
// iterate conceptsProgression
;(function(){
  var $$obj = conceptsProgression;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-complete')] }, {"data-i18n":true})) + "></span>");
}
else if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-started')] }, {"data-i18n":true})) + "></span>");
}
else
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-not-started')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-complete')] }, {"data-i18n":true})) + "></span>");
}
else if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-started')] }, {"data-i18n":true})) + "></span>");
}
else
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-not-started')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

buf.push("<div class=\"level-progression-levels\">Levels</div>");
// iterate campaignLevelProgressions
;(function(){
  var $$obj = campaignLevelProgressions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaign = $$obj[$index];

if ( lastUserCampaignLevelMap[member.id] && lastUserCampaignLevelMap[member.id][campaign.ID])
{
buf.push("<div class=\"level-progression-campaign\">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</div>");
var i = 0
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  }
}).call(this);

}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaign = $$obj[$index];

if ( lastUserCampaignLevelMap[member.id] && lastUserCampaignLevelMap[member.id][campaign.ID])
{
buf.push("<div class=\"level-progression-campaign\">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</div>");
var i = 0
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  }
}).call(this);

}
    }

  }
}).call(this);

buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var member = $$obj[$index];

buf.push("<tr><td><div><span class=\"hero-icon-cell\"><span" + (jade.attrs({ 'data-memberid':("" + (member.id) + ""), "class": [('spr'),('player-hero-icon')] }, {"data-memberid":true})) + "></span></span><span class=\"code-language-cell\">");
if ( memberLanguageMap && memberLanguageMap[member.id])
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (memberLanguageMap[member.id]) + "_small.png)"), 'title':(memberLanguageMap[member.id]), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("</span></div><div><a" + (jade.attrs({ 'href':("/user/" + (member.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = member.get('name') || 'Anonymous') ? "" : jade.interp)) + "</a></div><div>Level " + (jade.escape((jade.interp = member.level()) == null ? '' : jade.interp)) + "</div>");
if ( isOwner && member.id !== clan.get('ownerID'))
{
buf.push("<button" + (jade.attrs({ 'data-id':("" + (member.id) + ""), 'data-i18n':("clans.rem_hero"), "class": [('btn'),('btn-xs'),('btn-warning'),('remove-member-btn')] }, {"data-id":true,"data-i18n":true})) + ">Remove Hero</button>");
}
buf.push("</td><td class=\"progress-cell\"><div class=\"level-progression-concepts\">Concepts</div>");
// iterate conceptsProgression
;(function(){
  var $$obj = conceptsProgression;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var concept = $$obj[$index];

if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-complete')] }, {"data-i18n":true})) + "></span>");
}
else if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-started')] }, {"data-i18n":true})) + "></span>");
}
else
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-not-started')] }, {"data-i18n":true})) + "></span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var concept = $$obj[$index];

if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-complete')] }, {"data-i18n":true})) + "></span>");
}
else if ( userConceptsMap[member.id] && userConceptsMap[member.id][concept] === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-started')] }, {"data-i18n":true})) + "></span>");
}
else
{
buf.push("<span" + (jade.attrs({ 'data-i18n':("concepts." + concept), "class": [('spr'),('progress-level-cell'),('progress-level-cell-not-started')] }, {"data-i18n":true})) + "></span>");
}
    }

  }
}).call(this);

buf.push("<div class=\"level-progression-levels\">Levels</div>");
// iterate campaignLevelProgressions
;(function(){
  var $$obj = campaignLevelProgressions;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var campaign = $$obj[$index];

if ( lastUserCampaignLevelMap[member.id] && lastUserCampaignLevelMap[member.id][campaign.ID])
{
buf.push("<div class=\"level-progression-campaign\">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</div>");
var i = 0
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  }
}).call(this);

}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var campaign = $$obj[$index];

if ( lastUserCampaignLevelMap[member.id] && lastUserCampaignLevelMap[member.id][campaign.ID])
{
buf.push("<div class=\"level-progression-campaign\">" + (jade.escape(null == (jade.interp = campaign.name) ? "" : jade.interp)) + "</div>");
var i = 0
// iterate campaign.levels
;(function(){
  var $$obj = campaign.levels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

i++
var state = null, levelInfo = null
if ( memberLevelStateMap[member.id][level.slug])
{
levelInfo = memberLevelStateMap[member.id][level.slug].levelInfo
state = memberLevelStateMap[member.id][level.slug].state
}
if ( state === 'complete')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-complete')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = levelInfo.level) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.complete_2\">Complete</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else if ( state === 'started')
{
buf.push("<span" + (jade.attrs({ 'data-level-info':(levelInfo), "class": [('progress-level-cell'),('progress-level-cell-started')] }, {"data-level-info":true})) + ">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><p><div><span data-i18n=\"clans.status\">Status</span><span class=\"spr\">:</span><span data-i18n=\"clans.started_2\">Started</span></div><div><span data-i18n=\"clans.playtime\">Playtime</span><span>: " + (jade.escape((jade.interp = levelInfo.playtime) == null ? '' : jade.interp)) + "s</span></div><div><span data-i18n=\"clans.last_played\">Last played</span><span>: " + (jade.escape((jade.interp = levelInfo.changed) == null ? '' : jade.interp)) + "</span></div></p>");
if ( isOwner || me.isAdmin())
{
buf.push("<strong data-i18n=\"clans.view_solution\">Click to view solution.</strong>");
}
buf.push("</div></span>");
}
else
{
buf.push("<span class=\"progress-level-cell level-progression-level-not-started\">" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + "");
if ( showExpandedProgress || i === 1 || i === lastUserCampaignLevelMap[member.id][campaign.ID].index + 1)
{
buf.push("<span class=\"spl\">" + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"level-popup-container\"><h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.name) == null ? '' : jade.interp)) + "</h3><div><span data-i18n=\"clans.status\">Status<span class=\"spr\">:</span><span data-i18n=\"clans.not_started_2\">Not Started</span></span></div></div></span>");
}
if ( lastUserCampaignLevelMap[member.id][campaign.ID].levelSlug === level.slug)
{
break
}
    }

  }
}).call(this);

}
    }

  }
}).call(this);

buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
else
{
buf.push("<table class=\"table table-striped table-condensed\"><thead><tr><th></th><th></th><th data-i18n=\"clans.name\" class=\"name-cell\">Name</th><th data-i18n=\"resources.level\" class=\"level-cell\">Level</th><th data-i18n=\"play.achievements\" class=\"achievements-cell\">Achievements</th><th data-i18n=\"clans.latest_achievement\" class=\"latest-achievement-cell\">Latest Achievement</th><th class=\"remove-member-cell\"></th></tr></thead><tbody>");
// iterate members
;(function(){
  var $$obj = members;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var member = $$obj[$index];

buf.push("<tr><td class=\"hero-icon-cell\"><span" + (jade.attrs({ 'data-memberid':("" + (member.id) + ""), "class": [('spr'),('player-hero-icon')] }, {"data-memberid":true})) + "></span></td><td class=\"code-language-cell\">");
if ( memberLanguageMap && memberLanguageMap[member.id])
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (memberLanguageMap[member.id]) + "_small.png)"), 'title':(memberLanguageMap[member.id]), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("</td><td class=\"name-cell\"><a" + (jade.attrs({ 'href':("/user/" + (member.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = member.get('name') || 'Anonymous') ? "" : jade.interp)) + "</a></td><td class=\"level-cell\">" + (jade.escape(null == (jade.interp = member.level()) ? "" : jade.interp)) + "</td><td class=\"achievements-cell\">");
if ( memberAchievementsMap && memberAchievementsMap[member.id])
{
buf.push("" + (jade.escape((jade.interp = memberAchievementsMap[member.id].length) == null ? '' : jade.interp)) + "");
}
buf.push("</td><td class=\"latest-achievement-cell\">");
if ( memberAchievementsMap && memberAchievementsMap[member.id] && memberAchievementsMap[member.id].length)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = memberAchievementsMap[member.id][0].get('achievementName')) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td class=\"remove-member-cell\">");
if ( isOwner && member.id !== clan.get('ownerID'))
{
buf.push("<button" + (jade.attrs({ 'data-id':("" + (member.id) + ""), 'data-i18n':("clans.rem_hero"), "class": [('btn'),('btn-xs'),('btn-warning'),('remove-member-btn')] }, {"data-id":true,"data-i18n":true})) + ">Remove Hero</button>");
}
buf.push("</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var member = $$obj[$index];

buf.push("<tr><td class=\"hero-icon-cell\"><span" + (jade.attrs({ 'data-memberid':("" + (member.id) + ""), "class": [('spr'),('player-hero-icon')] }, {"data-memberid":true})) + "></span></td><td class=\"code-language-cell\">");
if ( memberLanguageMap && memberLanguageMap[member.id])
{
buf.push("<span" + (jade.attrs({ 'style':("background-image: url(/images/common/code_languages/" + (memberLanguageMap[member.id]) + "_small.png)"), 'title':(memberLanguageMap[member.id]), "class": [('code-language-cell')] }, {"style":true,"title":true})) + "></span>");
}
buf.push("</td><td class=\"name-cell\"><a" + (jade.attrs({ 'href':("/user/" + (member.id) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = member.get('name') || 'Anonymous') ? "" : jade.interp)) + "</a></td><td class=\"level-cell\">" + (jade.escape(null == (jade.interp = member.level()) ? "" : jade.interp)) + "</td><td class=\"achievements-cell\">");
if ( memberAchievementsMap && memberAchievementsMap[member.id])
{
buf.push("" + (jade.escape((jade.interp = memberAchievementsMap[member.id].length) == null ? '' : jade.interp)) + "");
}
buf.push("</td><td class=\"latest-achievement-cell\">");
if ( memberAchievementsMap && memberAchievementsMap[member.id] && memberAchievementsMap[member.id].length)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = memberAchievementsMap[member.id][0].get('achievementName')) ? "" : jade.interp)) + "</span>");
}
buf.push("</td><td class=\"remove-member-cell\">");
if ( isOwner && member.id !== clan.get('ownerID'))
{
buf.push("<button" + (jade.attrs({ 'data-id':("" + (member.id) + ""), 'data-i18n':("clans.rem_hero"), "class": [('btn'),('btn-xs'),('btn-warning'),('remove-member-btn')] }, {"data-id":true,"data-i18n":true})) + ">Remove Hero</button>");
}
buf.push("</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
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

;
//# sourceMappingURL=/javascripts/app/templates/clans/clan-details.js.map
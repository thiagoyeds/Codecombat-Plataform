require.register("templates/admin", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,text = locals_.text,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div class=\"form-horizontal\"><form id=\"espionage-form\" class=\"form-group\">");
if ( !me.isAdmin())
{
buf.push("<div class=\"col-sm-2\"></div><div class=\"col-sm-4\"></div><div class=\"col-sm-1\"></div>");
}
else
{
buf.push("<label for=\"espionage-name-or-email\" class=\"control-label col-sm-2\">Espionage</label><div class=\"col-sm-4\"><input id=\"espionage-name-or-email\" placeholder=\"Email, username or id\" type=\"text\" class=\"form-control\"/></div><div class=\"col-sm-1\"><button id=\"enter-espionage-mode\" class=\"btn btn-primary btn-large\">007</button></div>");
}
buf.push("<label for=\"espionage-name-or-email\" class=\"control-label col-sm-5\"><em>you are currently " + (jade.escape((jade.interp = me.get('name') || '(no username)') == null ? '' : jade.interp)) + " at " + (jade.escape((jade.interp = me.get('email') || '(no email)') == null ? '' : jade.interp)) + "</em>");
if ( view.amActually)
{
buf.push("<br/><em>but you are actually " + (jade.escape((jade.interp = view.amActually.get('name') || '(no username)') == null ? '' : jade.interp)) + " at " + (jade.escape((jade.interp = view.amActually.get('email') || '(no email)') == null ? '' : jade.interp)) + "</em><br/><button id=\"stop-spying-btn\" class=\"btn btn-xs\">Stop Spying</button>");
}
if ( view.featureMode)
{
buf.push("<br/><em>and you are viewing feature mode \"" + (jade.escape((jade.interp = view.featureMode) == null ? '' : jade.interp)) + "\"</em>" + (jade.escape(null == (jade.interp = " ") ? "" : jade.interp)) + "<button id=\"clear-feature-mode-btn\" class=\"btn btn-sm\">Clear Feature Mode</button>");
}
buf.push("</label></form></div>");
if ( me.isAdmin())
{
buf.push("<div class=\"form-horizontal\"><form id=\"user-search-form\" class=\"form-group\"><label for=\"user-search\" class=\"control-label col-sm-2\">User Search</label><div class=\"col-sm-4\"><input id=\"user-search\" placeholder=\"Email, username, name, whatever\" type=\"text\" class=\"form-control\"/><a href=\"#\" class=\"search-help-toggle\">(search help)</a><div class=\"search-help\"><h4>Search Syntax</h4><ul><li>use <code>role:teacher</code> to limit a search by role</li><li>By default parts of the search are matched exactly.</li><li><code>*</code> can be used as a wildcard character (ex. '<code>rob*@gmail.com</code>')</li><li>Avoid special charaters and puncuation.  Consider replacing them with <code>*</code> in searches.</li><li><a href=\"http://sphinxsearch.com/docs/latest/extended-syntax.html\">Complete Syntax Guide</a></li></ul></div></div><div class=\"col-sm-1\"><button id=\"user-search-button\" class=\"btn btn-primary btn-large\"> Search</button></div></form></div><div id=\"user-search-result\"></div>");
}
if ( !me.isAdmin())
{
buf.push("<div class=\"text-center\">You must be logged in as an admin to view this page.</div>");
}
else
{
buf.push("<h4>Entities</h4><ul><li><a href=\"/admin/trial-requests\">Trial Requests</a></li><li><a href=\"/admin/user-code-problems\">User Code Problems</a></li></ul><h4>Analytics</h4><ul><li><a href=\"/admin/classrooms-progress?licenseEndMonths=12\">Classroom Progress vs. Available Content</a></li><li><a href=\"/admin/classroom-content\">Amount of Classroom Content</a></li><li><a href=\"/admin/classroom-levels\">Classroom Levels</a></li><li><button class=\"classroom-progress-csv btn btn-sm btn-success\">Classroom Progress CSV</button><input" + (jade.attrs({ 'type':(text), 'placeholder':("<class code>"), "class": [('classroom-progress-class-code')] }, {"type":true,"placeholder":true})) + "/></li><li><a href=\"/admin/analytics\">Dashboard</a></li><li><a href=\"/admin/school-licenses\">School Active Licenses</a></li><li><a href=\"/admin/school-counts\">School Counts</a></li><li><a href=\"/admin/analytics/subscriptions\">Subscriptions</a></li><li><a href=\"/admin/demo-requests\">Teacher Demo Requests</a></li></ul><h4>Other</h4><ul><li><a href=\"/admin/base\">Base (for debugging base.jade)</a></li><li><a href=\"/admin/clas\">CLAs</a></li><li><a href=\"/admin/pending-patches\">Patches</a></li><li><a href=\"/admin/skipped-contacts\">Sales — Contacts skipped by sales automation scripts</a></li></ul><hr/><h3>Prepaids</h3><a id=\"create-free-sub-btn\" class=\"btn btn-secondary\">Create Free Subscription Link</a><span class=\"spl spr\">");
if ( view.freeSubLink)
{
buf.push("<input" + (jade.attrs({ 'id':('free-sub-input'), 'type':("text"), 'readonly':(true), 'value':("" + (view.freeSubLink) + "") }, {"type":true,"readonly":false,"value":true})) + "/>");
}
buf.push("</span><div class=\"form-inline\"><div class=\"form-group\"><label for=\"users\">Users</label><input id=\"users\" name=\"users\" type=\"number\" min=\"1\" class=\"form-control\"/></div><div class=\"form-group\"><label for=\"months\">Months</label><input id=\"months\" name=\"months\" type=\"number\" min=\"1\" class=\"form-control\"/></div><a id=\"terminal-create\" class=\"btn btn-default\">Create Terminal Subscription Code</a></div><hr/><h3>Achievements</h3><p>This is just some stuff for temporary achievement testing. Should be replaced by a demo system.</p><input id=\"increment-field\" type=\"text\"/><a id=\"increment-button\" href=\"#\" class=\"btn btn-secondary\">Increment</a>");
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
//# sourceMappingURL=/javascripts/app/templates/admin.js.map
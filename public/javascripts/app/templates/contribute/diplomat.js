require.register("templates/contribute/diplomat", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><div class=\"contribute_class\"><div class=\"class_detail\"><img src=\"/images/pages/contribute/class_detail_diplomat.png\" alt=\"\"/></div><div id=\"diplomat-main\" class=\"class-main\"><h2><span data-i18n=\"classes.diplomat_title\">Diplomat</span><span> </span><span data-i18n=\"classes.diplomat_title_description\">(Translator)</span></h2><p><span data-i18n=\"contribute.diplomat_introduction_pref\">So, if there's one thing we learned from the </span><a href=\"http://blog.codecombat.com/post/64658141307/codecombat-in-y-combinator\" data-i18n=\"contribute.diplomat_launch_url\">launch in October</a><span>, </span><span data-i18n=\"contribute.diplomat_introduction_suf\">it's that there\nis sizeable interest in CodeCombat in other countries!\nWe're building a corps of translators eager to turn one set of words into\nanother set of words to get CodeCombat as accessible across the world as possible.\nIf you like getting sneak peeks at upcoming content and getting these levels to\nyour fellow nationals ASAP, then this class might be for you.</span></p><h4 data-i18n=\"contribute.class_attributes\">Class Attributes</h4><ul><li data-i18n=\"contribute.diplomat_attribute_1\">Fluency in English and the language you would like to translate to.\nWhen conveying complicated ideas, it's important to have a strong grasp in both!</li></ul><h4 data-i18n=\"contribute.how_to_join\">How to Join</h4><p><span data-i18n=\"contribute.diplomat_i18n_page_prefix\" class=\"spr\">You can start translating our levels by going to our</span><a href=\"/i18n\"><strong data-i18n=\"contribute.diplomat_i18n_page\">translations page</strong></a><span data-i18n=\"contribute.diplomat_i18n_page_suffix\" class=\"spr\">, or our interface and website on GitHub.</span><span data-i18n=\"contribute.diplomat_join_pref_github\">Find your language locale file </span><a href=\"https://github.com/codecombat/codecombat/tree/master/app/locale\"><strong data-i18n=\"contribute.diplomat_github_url\">on GitHub</strong></a><span data-i18n=\"contribute.diplomat_join_suf_github\">, edit it online, and submit a pull request. Also, check this box below to \nkeep up-to-date on new internationalization developments!</span></p><div class=\"contributor-signup-anonymous\"></div><div data-contributor-class-id=\"translator\" data-contributor-class-name=\"diplomat\" class=\"contributor-signup\"></div><h3 data-i18n=\"contribute.translating_diplomats\">Our Translating Diplomats:</h3><!--#contributor-list--><!-- TODO: collect CodeCombat userids for these guys so we can include a tiled list--><ul class=\"diplomats\">");
// iterate view.calculateSpokenLanguageStats()
;(function(){
  var $$obj = view.calculateSpokenLanguageStats();
  if ('number' == typeof $$obj.length) {

    for (var languageCode = 0, $$l = $$obj.length; languageCode < $$l; languageCode++) {
      var stats = $$obj[languageCode];

if ( !(stats.completion < 0.02 && !stats.diplomats.length))
{
buf.push("<li><a" + (jade.attrs({ 'href':(stats.githubURL) }, {"href":true})) + "><span>" + (jade.escape(null == (jade.interp = stats.englishDescription) ? "" : jade.interp)) + "</span>");
if ( stats.englishDescription != stats.nativeDescription)
{
buf.push("<span class=\"spl spr\">-</span><span>" + (jade.escape(null == (jade.interp = stats.nativeDescription) ? "" : jade.interp)) + "</span>");
}
buf.push("</a>");
if ( stats.diplomats.length)
{
buf.push("<span class=\"spl\">- " + (jade.escape((jade.interp = stats.diplomats.join(', ')) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"progress\"><div" + (jade.attrs({ 'style':('width: ' + (100 * stats.completion) + '%'), "class": [('progress-bar')] }, {"style":true})) + "><span" + (jade.attrs({ 'style':(stats.completion < 0.06 ? 'color: black; text-shadow: 0px 1px 0px white' : '') }, {"style":true})) + ">" + (jade.escape(null == (jade.interp = Math.min(100, (100 * stats.completion).toFixed(1)) + '%') ? "" : jade.interp)) + "</span></div></div></li>");
}
    }

  } else {
    var $$l = 0;
    for (var languageCode in $$obj) {
      $$l++;      var stats = $$obj[languageCode];

if ( !(stats.completion < 0.02 && !stats.diplomats.length))
{
buf.push("<li><a" + (jade.attrs({ 'href':(stats.githubURL) }, {"href":true})) + "><span>" + (jade.escape(null == (jade.interp = stats.englishDescription) ? "" : jade.interp)) + "</span>");
if ( stats.englishDescription != stats.nativeDescription)
{
buf.push("<span class=\"spl spr\">-</span><span>" + (jade.escape(null == (jade.interp = stats.nativeDescription) ? "" : jade.interp)) + "</span>");
}
buf.push("</a>");
if ( stats.diplomats.length)
{
buf.push("<span class=\"spl\">- " + (jade.escape((jade.interp = stats.diplomats.join(', ')) == null ? '' : jade.interp)) + "</span>");
}
buf.push("<div class=\"progress\"><div" + (jade.attrs({ 'style':('width: ' + (100 * stats.completion) + '%'), "class": [('progress-bar')] }, {"style":true})) + "><span" + (jade.attrs({ 'style':(stats.completion < 0.06 ? 'color: black; text-shadow: 0px 1px 0px white' : '') }, {"style":true})) + ">" + (jade.escape(null == (jade.interp = Math.min(100, (100 * stats.completion).toFixed(1)) + '%') ? "" : jade.interp)) + "</span></div></div></li>");
}
    }

  }
}).call(this);

buf.push("</ul></div><div class=\"clearfix\"></div></div></div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
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
//# sourceMappingURL=/javascripts/app/templates/contribute/diplomat.js.map
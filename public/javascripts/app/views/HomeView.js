require.register("templates/home-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view,serverConfig = locals_.serverConfig;var box_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<div class=\"well text-center\">");
if ( me.isAnonymous() == true)
{
buf.push("<h6 id=\"classroom-edition-header\" data-i18n=\"new_home.classroom_edition\"></h6><div><a data-event-action=\"Homepage Click Teacher Button CTA\" data-i18n=\"new_home.im_a_teacher\" class=\"teacher-btn btn btn-primary btn-lg btn-block\"></a></div><div><a href=\"/home#create-account-student\" data-event-action=\"Homepage Click Student Button CTA\" data-i18n=\"new_home.im_a_student\" class=\"student-btn btn btn-forest btn-lg btn-block\"></a></div><h6 id=\"learn-to-code-header\" data-i18n=\"new_home.learn_to_code\"></h6><a" + (jade.attrs({ 'href':(view.playURL), 'data-event-action':("Homepage Play Now CTA"), 'data-i18n':("new_home.play_now"), "class": [('btn'),('btn-gold'),('btn-lg'),('btn-block'),('play-btn')] }, {"href":true,"data-event-action":true,"data-i18n":true})) + "></a>");
}
else
{
buf.push("<h6 id=\"classroom-edition-header\" data-i18n=\"new_home.logged_in_as\"></h6><p class=\"small userName\">" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</p>");
if ( me.isTeacher())
{
buf.push("<div><button data-event-action=\"Homepage Click My Classes CTA\" data-i18n=\"new_home.goto_classes\" class=\"teacher-btn btn btn-forest btn-lg btn-block\"></button></div><div><button data-event-action=\"Homepage Click My Classes CTA\" data-i18n=\"teacher.resource_hub\" class=\"resource-btn btn btn-primary btn-lg btn-block\"></button></div><div>");
if ( !view.isTeacherWithDemo)
{
buf.push("<h6 data-i18n=\"new_home.want_coco\"></h6><button data-event-action=\"Homepage Request Demo CTA\" data-i18n=\"new_home.request_demo\" class=\"btn btn-primary btn-lg request-demo\"></button>");
}
buf.push("</div>");
}
else if ( me.isStudent())
{
buf.push("<div><a" + (jade.attrs({ 'href':(view.playURL), 'data-event-action':("Homepage Classroom Continue Playing CTA"), 'data-i18n':("courses.continue_playing"), "class": [('btn'),('btn-forest'),('btn-lg'),('btn-block'),('play-btn')] }, {"href":true,"data-event-action":true,"data-i18n":true})) + "></a></div><div><a" + (jade.attrs({ 'href':(view.playURL), 'data-event-action':("Homepage View Progress CTA"), 'data-i18n':("new_home.go_to_courses"), "class": [('btn'),('btn-primary'),('btn-lg'),('btn-block'),('play-btn')] }, {"href":true,"data-event-action":true,"data-i18n":true})) + "></a></div>");
}
else
{
buf.push("<div><a" + (jade.attrs({ 'href':(view.playURL), 'data-event-action':("Homepage Campaign Continue Playing CTA"), 'data-i18n':("courses.continue_playing"), "class": [('btn'),('btn-forest'),('btn-lg'),('btn-block'),('play-btn')] }, {"href":true,"data-event-action":true,"data-i18n":true})) + "></a></div><div><a" + (jade.attrs({ 'href':(view.playURL), 'data-event-action':("Homepage View Profile CTA"), 'data-i18n':("new_home.view_profile"), "class": [('btn'),('btn-primary'),('btn-lg'),('btn-block'),('profile-btn')] }, {"href":true,"data-event-action":true,"data-i18n":true})) + "></a></div>");
}
buf.push("<p class=\"small\"><span data-i18n=\"courses.not_you\"></span><span>&nbsp;</span><a data-i18n=\"login.log_out\" href=\"#\" class=\"logout-btn\"></a></p>");
}
buf.push("</div>");
if ( (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl')
{
buf.push("<div id=\"ideal-tickets-well\" class=\"well text-center hidden-xs hidden-sm\"><h6>Thuis versie:</h6><a href=\"http://codecombat.nl/kopen\" class=\"btn btn-purple btn-lg btn-block\">Prepaid codes (iDeal)</a></div>");
}
};
var accountLinks_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li><li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li>");
};
buf.push("<div class=\"style-flat\"><nav id=\"main-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid container\"><div class=\"row\"><div class=\"col-md-12\"><div class=\"navbar-header\"><button data-toggle=\"collapse\" data-target=\"#navbar-collapse\" aria-expanded=\"false\" class=\"navbar-toggle collapsed\"><span data-i18n=\"nav.toggle_nav\" class=\"sr-only\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">");
if ( serverConfig.codeNinjas)
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\" class=\"code-ninjas-powered-by\"/><img src=\"/images/pages/base/code-ninjas-logo-right.png\" class=\"code-ninjas-logo\"/>");
}
else
{
buf.push("<img id=\"logo-img\" src=\"/images/pages/base/logo.png\"/>");
}
buf.push("<span class=\"glyphicon glyphicon-home\"></span></a></div><div id=\"navbar-collapse\" class=\"collapse navbar-collapse\"><ul class=\"nav navbar-nav\">");
if ( (!me.isStudent() && !me.isTeacher()))
{
buf.push("<li><a href=\"/play\" data-i18n=\"common.play\"></a></li>");
}
buf.push("<li><a href=\"play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li>");
if ( me.isStudent())
{
buf.push("<li><a href=\"/students\" data-i18n=\"nav.my_courses\"></a></li>");
}
if ( !me.isAnonymous() && me.isTeacher())
{
buf.push("<li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li>");
}
buf.push("<li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li></ul>");
if ( me.isAnonymous())
{
buf.push("<ul class=\"nav navbar-nav\"><li><a id=\"create-account-link\" data-i18n=\"login.sign_up\" class=\"signup-button\"></a></li><li><a id=\"login-link\" data-i18n=\"login.log_in\" class=\"login-button\"></a></li></ul>");
}
else
{
buf.push("<ul class=\"nav navbar-nav hidden-md hidden-lg\"><li class=\"disabled\"><a><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span>" + (jade.escape(null == (jade.interp = me.displayName()) ? "" : jade.interp)) + "</span></a></li>");
accountLinks_mixin();
buf.push("</ul><ul class=\"nav navbar-nav\"><li class=\"dropdown hidden-xs hidden-sm\"><a href=\"#\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"dropdown-toggle\"><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),('img-circle-small'),('m-r-1'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/><span data-i18n=\"nav.my_account\"></span></a><ul class=\"dropdown-menu\"><li class=\"user-dropdown-header text-center\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><img" + (jade.attrs({ 'src':(me.getPhotoURL()), "class": [('img-circle'),((me.isTeacher() ? 'border-navy' : ''))] }, {"class":true,"src":true})) + "/></a><h5>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h5></li>");
accountLinks_mixin();
buf.push("</ul></li></ul>");
}
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div id=\"jumbotron-container-fluid\" class=\"container-fluid alt-image\"><div class=\"container\"><div style=\"height: 160px\" class=\"row hidden-xs top-spacer\"></div><div class=\"row hidden-sm hidden-xs\"><div class=\"col-lg-7 col-md-8\"><h1 data-i18n=\"new_home.slogan\"></h1></div><div class=\"col-lg-3 col-lg-offset-2 col-md-4\">");
box_mixin();
buf.push("</div></div><div class=\"row hidden-lg hidden-md\"><div class=\"col-lg-7 col-md-8\"><h1 data-i18n=\"new_home.slogan\"></h1></div><div class=\"col\"><div style=\"margin: auto; max-width: 300px\">");
box_mixin();
buf.push("</div></div></div><div id=\"learn-more-row\" class=\"row\"><div class=\"col-xs-12 text-center\"><a id=\"learn-more-link\"><h6 data-i18n=\"new_home.learn_more\"></h6><h2><span class=\"glyphicon glyphicon-chevron-down\"></span></h2></a></div></div></div></div><div id=\"classroom-in-box-container\" class=\"container\"><div id=\"classroom-in-box-row\" class=\"row\"><div class=\"col-sm-6\"><h2 data-i18n=\"new_home.classroom_in_a_box\" class=\"text-navy\"></h2></div><div class=\"col-sm-6\"><p data-i18n=\"[html]new_home.codecombat_is\"></p><p data-i18n=\"[html]new_home.our_courses\"></p></div></div><div class=\"top-screenshots\"><div class=\"screenshots\"><div class=\"hidden-sm hidden-md hidden-lg\"><small data-i18n=\"new_home.top_screenshots_hint\"></small></div><div title=\"Click to view full size\" class=\"screenshot-grid\"><a data-toggle=\"modal\" data-target=\"#screenshot-lightbox\" data-index=\"0\" class=\"screen-thumbnail\"><img src=\"/images/pages/about/desert.jpg\"/></a></div><div class=\"clearfix hidden-xs\"><small data-i18n=\"new_home.top_screenshots_hint\"></small></div></div></div><div id=\"feature-spread-row\" class=\"row text-center\"><h3 data-i18n=\"new_home.designed_with\"></h3><div class=\"col-sm-4\"><img src=\"/images/pages/home/F1_typedcode.png\" class=\"img-circle\"/><h4><span data-i18n=\"new_home.real_code\"></span><br/><span data-i18n=\"new_home.from_the_first_level\"></span></h4><p data-i18n=\"new_home.getting_students\" class=\"small\"></p></div><div class=\"col-sm-4\"><img src=\"/images/pages/home/F2_teacherguides.png\" class=\"img-circle\"/><h4><span data-i18n=\"new_home.educator_resources\"></span><br/><span data-i18n=\"new_home.course_guides\"></span></h4><p data-i18n=\"new_home.teaching_computer_science\" class=\"small\"></p></div><div class=\"col-sm-4\"><img src=\"/images/pages/home/F3_accessible.png\" class=\"img-circle\"/><h4><span data-i18n=\"new_home.accessible_to\"></span><br/><span data-i18n=\"new_home.everyone\"></span></h4><p data-i18n=\"new_home.democratizing\" class=\"small\"></p></div></div><div class=\"testimonials-rows\"><div class=\"testimonials-filler-left\"></div><div class=\"testimonials-filler-right\"></div><div class=\"row\"><div class=\"col-lg-offset-2 col-lg-7 col-sm-8\"><blockquote><h3 data-i18n=\"new_home.forgot_learning\"></h3></blockquote></div><div class=\"col-lg-2 col-sm-3 text-center\"><img src=\"/images/pages/home/timmaki.png\" class=\"img-circle\"/><h6>Tim Maki</h6><div class=\"small\">Director of Technology, Tilton School</div></div></div><div class=\"row\"><div class=\"col-lg-7 col-sm-8 col-sm-push-4 col-lg-push-3\"><blockquote><h3 data-i18n=\"new_home.wanted_to_do\"></h3></blockquote></div><div class=\"col-lg-2 col-sm-3 col-lg-offset-1 text-center col-sm-pull-8 col-lg-pull-7\"><img src=\"/images/pages/home/dylan.png\" class=\"img-circle\"/><h6>Dylan</h6><div class=\"small\">3rd Grader</div></div></div></div><h3 data-i18n=\"new_home.why_games\" class=\"text-center\"></h3><div id=\"benefit-row-1\" class=\"row\"><div id=\"benefit-graphic-1\" class=\"col-sm-6 col-sm-offset-1 col-sm-push-6\"><h2 data-i18n=\"new_home.games_reward\"></h2><img src=\"/images/pages/home/G1_reward.png\"/><div id=\"benefit-graphic-1-filler\"></div></div><div class=\"col-sm-5 col-sm-pull-6\"><p data-i18n=\"new_home.encourage\"></p><p><span data-i18n=\"new_home.excel\" class=\"spr\"></span><span>“</span><a href=\"http://blog.mindresearch.org/blog/game-based-learning-infographic-strong-math-practices\" target=\"_blank\" data-i18n=\"new_home.struggle\"></a><span>” -</span><span data-i18n=\"new_home.kind_of_struggle\" class=\"spl spr\"></span><a href=\"http://www.gamesandlearning.org/2014/06/09/teachers-on-using-games-in-class/\" target=\"_blank\" data-i18n=\"new_home.motivating\"></a><span>,</span><span data-i18n=\"new_home.not_tedious\" class=\"spl\"></span></p></div></div><div id=\"benefit-row-2\" class=\"row\"><div id=\"benefit-graphic-2\" class=\"col-sm-6\"><h2 data-i18n=\"new_home.gaming_is_good\"></h2><img src=\"/images/pages/home/G2_brains.png\"/><div id=\"benefit-graphic-2-filler\"></div></div><div class=\"col-sm-5 col-sm-offset-1\"><p><span data-i18n=\"new_home.game_based\" class=\"spr\"></span><a href=\"http://schoolsweek.co.uk/gaming-is-good-for-childrens-brains-study-suggests/\" target=\"_blank\" data-i18n=\"new_home.compared\"></a><span data-i18n=\"new_home.conventional\" class=\"spl spr\"></span><a href=\"http://dev.k-12techdecisions.com/article/game_based_learning_is_where_vygotsky_meets_dweck/P3\" target=\"_blank\" data-i18n=\"new_home.perform_at_higher_level\"></a><span></span></p><p><span data-i18n=\"new_home.feedback\"></span></p></div></div><div id=\"benefit-row-3\" class=\"row\"><div id=\"benefit-graphic-3\" class=\"col-sm-6 col-sm-offset-1 col-sm-push-6\"><h2 data-i18n=\"new_home.real_game\"></h2><img src=\"/images/pages/home/G3_game.png\"/><div id=\"benefit-graphic-3-filler\"></div></div><div class=\"col-sm-5 col-sm-pull-6\"><p><span data-i18n=\"new_home.great_game\"></span></p><p><span data-i18n=\"new_home.agency\"></span></p></div></div><div class=\"request-demo-row text-center\">");
if ( view.isTeacherWithDemo)
{
buf.push("<h3 data-i18n=\"new_home.get_started_title\"></h3>");
}
else
{
buf.push("<h3 data-i18n=\"new_home.request_demo_title\"></h3>");
}
buf.push("<div class=\"teacher-screenshots\"><div class=\"screenshots\"><div class=\"hidden-sm hidden-md hidden-lg\"><small data-i18n=\"new_home.top_screenshots_hint\"></small></div><div title=\"Click to view full size\" class=\"screenshot-grid\"><a data-toggle=\"modal\" data-target=\"#screenshot-lightbox\" data-index=\"1\" class=\"screen-thumbnail\"><img src=\"/images/pages/about/forest.jpg\"/></a><a data-toggle=\"modal\" data-target=\"#screenshot-lightbox\" data-index=\"2\" class=\"screen-thumbnail\"><img src=\"/images/pages/about/dungeon.jpg\"/></a><a data-toggle=\"modal\" data-target=\"#screenshot-lightbox\" data-index=\"3\" class=\"screen-thumbnail\"><img src=\"/images/pages/about/glacier.jpg\"/></a></div><div class=\"clearfix hidden-xs\"><small data-i18n=\"new_home.top_screenshots_hint\"></small></div></div></div>");
if ( view.isTeacherWithDemo)
{
buf.push("<h4 data-i18n=\"new_home.get_started_subtitle\"></h4><div><button data-event-action=\"Homepage Setup Class\" data-i18n=\"new_home.setup_a_class\" class=\"btn btn-primary btn-lg setup-class-btn\"></button></div>");
}
else
{
buf.push("<h4 data-i18n=\"new_home.request_demo_subtitle\"></h4><div><button data-event-action=\"Homepage Request Demo\" data-i18n=\"new_home.request_demo\" class=\"btn btn-primary btn-lg request-demo\"></button></div>");
if ( me.isAnonymous())
{
buf.push("<div class=\"have-an-account\"><span data-i18n=\"new_home.have_an_account\" class=\"spr\"></span><a data-i18n=\"login.log_in\" class=\"login-button\"></a></div>");
}
}
buf.push("</div><div class=\"testimonials-rows\"><div class=\"testimonials-filler-left\"></div><div class=\"testimonials-filler-right\"></div><div class=\"row\"><div class=\"col-lg-offset-2 col-lg-7 col-sm-8\"><blockquote><h3 data-i18n=\"new_home.boast\"></h3></blockquote></div><div class=\"col-lg-2 col-sm-3 text-center\"><img src=\"/images/pages/home/opensource.png\" class=\"img-circle\"/><h6>Open Source</h6><div class=\"small\">opensource.com</div></div></div><div class=\"row\"><div class=\"col-lg-7 col-sm-8 col-sm-push-4 col-lg-push-3\"><blockquote><h3 data-i18n=\"new_home.winning\"></h3></blockquote></div><div class=\"col-lg-2 col-sm-3 col-lg-offset-1 text-center col-sm-pull-8 col-lg-pull-7\"><img src=\"/images/pages/home/pcmag.png\" class=\"img-circle\"/><h6>PC Mag</h6><div class=\"small\">pcmag.com</div></div></div></div><div class=\"request-demo-row text-center\"><h3 data-i18n=\"new_home.run_class\"></h3>");
if ( view.isTeacherWithDemo)
{
buf.push("<div><button data-event-action=\"Homepage Setup Class Page Bottom\" data-i18n=\"new_home.setup_a_class\" class=\"btn btn-primary btn-lg setup-class-btn\"></button></div>");
}
else
{
buf.push("<div><button data-event-action=\"Homepage Request Demo Page Bottom\" data-i18n=\"new_home.request_demo\" class=\"btn btn-primary btn-lg request-demo\"></button></div>");
if ( me.isAnonymous())
{
buf.push("<div class=\"have-an-account\"><span data-i18n=\"new_home.have_an_account\" class=\"spr\"></span><a data-i18n=\"login.log_in\" class=\"login-button\"></a></div>");
}
}
buf.push("</div><div id=\"screenshot-lightbox\" data-show=\"false\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div id=\"screenshot-carousel\" class=\"carousel\"><ol class=\"carousel-indicators\"><li data-target=\".screenshot-display\" data-slide-to=\"0\" class=\"active\"></li><li data-target=\".screenshot-display\" data-slide-to=\"1\"></li><li data-target=\".screenshot-display\" data-slide-to=\"2\"></li><li data-target=\".screenshot-display\" data-slide-to=\"3\"></li></ol><div class=\"carousel-inner\"><div class=\"item active\"><img id=\"screenshot-desert\" src=\"/images/pages/about/desert.jpg\"/></div><div class=\"item\"><img id=\"screenshot-forest\" src=\"/images/pages/about/forest.jpg\"/></div><div class=\"item\"><img id=\"screenshot-dungeon\" src=\"/images/pages/about/dungeon.jpg\"/></div><div class=\"item\"><img id=\"screenshot-glacier\" src=\"/images/pages/about/glacier.jpg\"/></div></div><a id=\"carousel-left\" href=\"#screenshot-carousel\" role=\"button\" class=\"left carousel-control\"><span aria-hidden=\"true\" class=\"glyphicon glyphicons-chevron-left glyphicon-chevron-left\"></span><span data-i18n=\"about.previous\" class=\"sr-only\"></span></a><a id=\"carousel-right\" href=\"#screenshot-carousel\" role=\"button\" class=\"right carousel-control\"><span aria-hidden=\"true\" class=\"glyphicon glyphicons-chevron-right glyphicon-chevron-right\"></span><span data-i18n=\"play.next\" class=\"sr-only\"></span></a></div></div></div></div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
if ( !me.isStudent())
{
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.schools\"></strong></li><li><a href=\"/teachers/resources/faq\" data-i18n=\"teacher.educator_faq\"></a></li><li><a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a></li><li><a href=\"/teachers/resources\" data-i18n=\"nav.resource_hub\"></a></li><li><a href=\"/teachers/demo\" data-i18n=\"new_home.request_demo\"></a></li></ul></div>");
}
buf.push("<div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.get_involved\"></strong></li><li><a href=\"/community\" data-i18n=\"nav.community\"></a></li><li><a href=\"/contribute\" data-i18n=\"nav.contribute\"></a></li>");
if ( !me.isStudent())
{
buf.push("<li><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a></li>");
}
buf.push("<li><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a></li><li><a href=\"https://github.com/codecombat/codecombat\" data-i18n=\"nav.open_source\"></a></li></ul></div><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong data-i18n=\"nav.support\"></strong></li>");
if ( !me.isStudent())
{
buf.push("<li><a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("<li><a href=\"https://www.facebook.com/codecombat\" data-i18n=\"nav.facebook\"></a></li><li><a href=\"https://twitter.com/codecombat\" data-i18n=\"nav.twitter\"></a></li></ul></div></div></div></div><div id=\"final-footer\" class=\"small text-center\">Copyright ©2016 CodeCombat. All Rights Reserved.<br class=\"hidden-lg hidden-md\"/><img src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><br class=\"hidden-lg hidden-md\"/>");
if ( !me.isStudent())
{
buf.push("<span data-i18n=\"nav.help_pref\" class=\"spr\"></span>");
var supportEmail = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] == 'nl' ? 'klantenservice@codecombat.nl' : 'team@codecombat.com';
buf.push("<a" + (jade.attrs({ 'href':("mailto:" + supportEmail) }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = supportEmail) ? "" : jade.interp)) + "</a><span data-i18n=\"nav.help_suff\" class=\"spl\"></span>");
}
buf.push("</div></div></div>");;return buf.join("");
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

;require.register("views/HomeView", function(exports, require, module) {
var CocoCollection, Courses, HomeView, RootView, TrialRequest, TrialRequests, logoutUser, me, ref, storage, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/home-view');

CocoCollection = require('collections/CocoCollection');

TrialRequest = require('models/TrialRequest');

TrialRequests = require('collections/TrialRequests');

Courses = require('collections/Courses');

utils = require('core/utils');

storage = require('core/storage');

ref = require('core/auth'), logoutUser = ref.logoutUser, me = ref.me;

module.exports = HomeView = (function(superClass) {
  extend(HomeView, superClass);

  function HomeView() {
    this.fitToPage = bind(this.fitToPage, this);
    return HomeView.__super__.constructor.apply(this, arguments);
  }

  HomeView.prototype.id = 'home-view';

  HomeView.prototype.className = 'style-flat';

  HomeView.prototype.template = template;

  HomeView.prototype.events = {
    'click .play-btn': 'onClickPlayButton',
    'change #school-level-dropdown': 'onChangeSchoolLevelDropdown',
    'click .student-btn': 'onClickStudentButton',
    'click .teacher-btn': 'onClickTeacherButton',
    'click #learn-more-link': 'onClickLearnMoreLink',
    'click .screen-thumbnail': 'onClickScreenThumbnail',
    'click #carousel-left': 'onLeftPressed',
    'click #carousel-right': 'onRightPressed',
    'click .request-demo': 'onClickRequestDemo',
    'click .logout-btn': 'logoutAccount',
    'click .profile-btn': 'onClickViewProfile',
    'click .setup-class-btn': 'onClickSetupClass',
    'click .resource-btn': 'onClickResourceButton'
  };

  HomeView.prototype.shortcuts = {
    'right': 'onRightPressed',
    'left': 'onLeftPressed',
    'esc': 'onEscapePressed'
  };

  HomeView.prototype.initialize = function(options) {
    var isHourOfCodeWeek;
    this.courses = new Courses();
    this.supermodel.trackRequest(this.courses.fetchReleased());
    if (me.isTeacher()) {
      this.trialRequests = new TrialRequests();
      this.trialRequests.fetchOwn();
      this.supermodel.loadCollection(this.trialRequests);
    }
    isHourOfCodeWeek = false;
    return this.playURL = me.isStudent() ? '/students' : isHourOfCodeWeek ? '/play?hour_of_code=true' : '/play';
  };

  HomeView.prototype.onLoaded = function() {
    var ref1, ref2;
    if ((ref1 = this.trialRequests) != null ? ref1.size() : void 0) {
      this.trialRequest = this.trialRequests.first();
    }
    this.isTeacherWithDemo = this.trialRequest && ((ref2 = this.trialRequest.get('status')) === 'approved' || ref2 === 'submitted');
    return HomeView.__super__.onLoaded.call(this);
  };

  HomeView.prototype.onClickLearnMoreLink = function() {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent('Homepage Click Learn More', {
        category: 'Homepage'
      }, []);
    }
    return this.scrollToLink('#classroom-in-box-container');
  };

  HomeView.prototype.onClickPlayButton = function(e) {
    var ref1;
    return (ref1 = window.tracker) != null ? ref1.trackEvent($(e.target).data('event-action'), {
      category: 'Homepage'
    }, []) : void 0;
  };

  HomeView.prototype.onClickRequestDemo = function(e) {
    var ref1;
    this.playSound('menu-button-click');
    e.preventDefault();
    e.stopImmediatePropagation();
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    if (me.isTeacher()) {
      return application.router.navigate('/teachers/update-account', {
        trigger: true
      });
    } else {
      return application.router.navigate('/teachers/demo', {
        trigger: true
      });
    }
  };

  HomeView.prototype.onClickSetupClass = function(e) {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    return application.router.navigate("/teachers/classes", {
      trigger: true
    });
  };

  HomeView.prototype.onClickStudentButton = function(e) {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    if (document.location.href.search('/home#create-account-student') !== -1) {
      return typeof this.render === "function" ? this.render() : void 0;
    }
  };

  HomeView.prototype.onClickTeacherButton = function(e) {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    if (me.isTeacher()) {
      return application.router.navigate('/teachers', {
        trigger: true
      });
    } else {
      return application.router.navigate('/teachers/signup', {
        trigger: true
      });
    }
  };

  HomeView.prototype.onClickViewProfile = function(e) {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    return application.router.navigate("/user/" + (me.getSlugOrID()), {
      trigger: true
    });
  };

  HomeView.prototype.onClickResourceButton = function(e) {
    var ref1;
    if ((ref1 = window.tracker) != null) {
      ref1.trackEvent($(e.target).data('event-action'), {
        category: 'Homepage'
      }, []);
    }
    return application.router.navigate('/teachers/resources', {
      trigger: true
    });
  };

  HomeView.prototype.afterRender = function() {
    var CreateAccountModal;
    this.onChangeSchoolLevelDropdown();
    this.$('#screenshot-lightbox').modal();
    this.$('#screenshot-carousel').carousel({
      interval: 0,
      keyboard: false
    });
    $(window).on('resize', this.fitToPage);
    this.fitToPage();
    setTimeout(this.fitToPage, 0);
    if (me.isAnonymous()) {
      CreateAccountModal = require('views/core/CreateAccountModal/CreateAccountModal');
      if (document.location.hash === '#create-account') {
        this.openModalView(new CreateAccountModal());
      }
      if (document.location.hash === '#create-account-individual') {
        this.openModalView(new CreateAccountModal({
          startOnPath: 'individual'
        }));
      }
      if (document.location.hash === '#create-account-student') {
        this.openModalView(new CreateAccountModal({
          startOnPath: 'student'
        }));
      }
    }
    return HomeView.__super__.afterRender.call(this);
  };

  HomeView.prototype.destroy = function() {
    $(window).off('resize', this.fitToPage);
    return HomeView.__super__.destroy.call(this);
  };

  HomeView.prototype.logoutAccount = function() {
    Backbone.Mediator.publish("auth:logging-out", {});
    return logoutUser();
  };

  HomeView.prototype.onChangeSchoolLevelDropdown = function(e) {
    var level, levels;
    levels = {
      elementary: {
        'introduction-to-computer-science': '2-4',
        'game-dev-1': '2-3',
        'web-dev-1': '2-3',
        'game-development-1': '2-3',
        'web-development-1': '2-3',
        'game-development-2': '2-3',
        'web-development-3': '2-3',
        'computer-science-6': '24-30',
        'computer-science-7': '30-40',
        'computer-science-8': '30-40',
        "default": '16-25',
        total: '150-215 hours (about two and a half years)'
      },
      middle: {
        'introduction-to-computer-science': '1-3',
        'game-dev-1': '1-3',
        'web-dev-1': '1-3',
        'game-development-1': '1-3',
        'web-development-1': '1-3',
        'game-development-2': '1-3',
        'web-development-2': '1-3',
        'computer-science-6': '12-14',
        'computer-science-7': '14-16',
        'computer-science-8': '14-16',
        "default": '8-12',
        total: '75-100 hours (about one and a half years)'
      },
      high: {
        'introduction-to-computer-science': '1',
        'game-dev-1': '1-2',
        'web-dev-1': '1-2',
        'game-development-1': '1-2',
        'web-development-1': '1-2',
        'game-development-2': '1-2',
        'web-development-2': '1-2',
        'computer-science-6': '10-12',
        'computer-science-7': '12-16',
        'computer-science-8': '12-16',
        "default": '8-10',
        total: '65-85 hours (about one year)'
      }
    };
    level = e ? $(e.target).val() : 'middle';
    this.$el.find('#courses-row .course-details').each(function() {
      var duration, slug;
      slug = $(this).data('course-slug');
      duration = levels[level][slug] || levels[level]["default"];
      $(this).find('.course-duration .course-hours').text(duration);
      return $(this).find('.course-duration .unit').text($.i18n.t(duration === '1' ? 'units.hour' : 'units.hours'));
    });
    return this.$el.find('#semester-duration').text(levels[level].total);
  };

  HomeView.prototype.onRightPressed = function(event) {
    var ref1;
    if (event.type === 'keydown' && $(document.activeElement).is('.carousel-control')) {
      return;
    }
    if ((ref1 = $('#screenshot-lightbox').data('bs.modal')) != null ? ref1.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel('next');
    }
  };

  HomeView.prototype.onLeftPressed = function(event) {
    var ref1;
    if (event.type === 'keydown' && $(document.activeElement).is('.carousel-control')) {
      return;
    }
    if ((ref1 = $('#screenshot-lightbox').data('bs.modal')) != null ? ref1.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel('prev');
    }
  };

  HomeView.prototype.onEscapePressed = function(event) {
    var ref1;
    if ((ref1 = $('#screenshot-lightbox').data('bs.modal')) != null ? ref1.isShown : void 0) {
      event.preventDefault();
      return $('#screenshot-lightbox').modal('hide');
    }
  };

  HomeView.prototype.onClickScreenThumbnail = function(event) {
    var ref1;
    if (!((ref1 = $('#screenshot-lightbox').data('bs.modal')) != null ? ref1.isShown : void 0)) {
      event.preventDefault();
      return $('#screenshot-carousel').carousel($(event.currentTarget).data("index"));
    }
  };

  HomeView.prototype.fitToPage = function() {
    var adjustment, linkBox, linkOffset, newOffset, target, windowHeight;
    windowHeight = $(window).height();
    linkBox = this.$("#learn-more-link").parent();
    linkOffset = linkBox.offset();
    adjustment = windowHeight - (linkOffset.top + linkBox.height());
    target = this.$('.top-spacer').first();
    newOffset = parseInt(target.css('height') || 0) + adjustment;
    newOffset = Math.min(Math.max(0, newOffset), 170);
    return target.css({
      height: newOffset + "px"
    });
  };

  return HomeView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/HomeView.js.map
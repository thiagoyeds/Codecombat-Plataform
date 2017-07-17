require.register("templates/teachers/request-quote-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\">");
var showDone = !view.trialRequest.isNew() && me.isAnonymous();
buf.push("<div id=\"learn-more-modal\" class=\"modal fade\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content style-flat\"><div class=\"modal-header\"><div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div></div><div data-i18n=\"teachers_quote.learn_more_modal\" class=\"modal-body\"></div></div></div></div><div class=\"container\"><form" + (jade.attrs({ 'id':('request-form'), "class": [(showDone ? 'hide' : '')] }, {"class":true})) + "><div class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><h3 data-i18n=\"new_home.request_demo\" class=\"text-center\"></h3><h4 data-i18n=\"[html]teachers_quote.subtitle\" class=\"text-center\"></h4></div></div>");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><div class=\"alert alert-info text-center\"><div><span data-i18n=\"teachers_quote.not\" class=\"spr\"></span><strong>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</strong>?<a id=\"logout-link\" data-i18n=\"login.log_out\" class=\"spl\"></a></div>");
if ( me.get('role') === 'student')
{
buf.push("<div id=\"conversion-warning\"><span data-i18n=\"[html]teachers_quote.conversion_warning\" class=\"spr\"></span><a data-i18n=\"new_home.learn_more\" data-toggle=\"modal\" data-target=\"#learn-more-modal\"></a></div>");
}
buf.push("</div></div></div>");
}
buf.push("<div id=\"form-teacher-info\">");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"general.username\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span>");
var name = me.get('name') || '';
buf.push("<input" + (jade.attrs({ 'name':("name"), 'value':(name), 'disabled':(!!name), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"share_progress_modal.form_label\" class=\"control-label\"></span>");
var email = me.get('email') || '';
buf.push("<input" + (jade.attrs({ 'name':("email"), 'value':(email), 'disabled':(!!email), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div></div>");
}
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.first_name\" class=\"control-label\"></span>");
var firstName = me.get('firstName') || '';
buf.push("<input" + (jade.attrs({ 'name':("firstName"), 'value':(firstName), 'disabled':(!!firstName), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.last_name\" class=\"control-label\"></span>");
var lastName = me.get('lastName') || '';
buf.push("<input" + (jade.attrs({ 'name':("lastName"), 'value':(lastName), 'disabled':(!!lastName), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + "/></div></div></div>");
if ( !me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.phone_number\" class=\"control-label\"></span><input name=\"phoneNumber\" data-i18n=\"[placeholder]teachers_quote.phone_number_help\" class=\"form-control\"/></div></div></div>");
}
if ( me.isAnonymous())
{
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div id=\"email-form-group\" class=\"form-group\"><span data-i18n=\"general.email\" class=\"control-label\"></span>");
var email = me.get('email') || '';
buf.push("<input" + (jade.attrs({ 'name':("email"), 'type':("email"), 'value':(email), 'disabled':(!!email), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"disabled":true})) + "/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.phone_number\"></span></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.phone_number_help\" class=\"text-info\"></em></div><input name=\"phoneNumber\" class=\"form-control\"/></div></div></div>");
}
buf.push("<div class=\"row\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.primary_role_label\" class=\"control-label\"></span><select name=\"role\" class=\"form-control\"><option data-i18n=\"teachers_quote.primary_role_default\" ,=\",\" value=\"\"></option><option data-i18n=\"courses.teacher\" value=\"Teacher\"></option><option data-i18n=\"teachers_quote.tech_coordinator\" value=\"Technology coordinator\"></option><option data-i18n=\"teachers_quote.advisor\" value=\"Advisor\"></option><option data-i18n=\"teachers_quote.principal\" value=\"Principal\"></option><option data-i18n=\"teachers_quote.superintendent\" value=\"Superintendent\"></option><option data-i18n=\"teachers_quote.parent\" value=\"Parent\"></option></select></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.purchaser_role_label\" class=\"control-label\"></span><select name=\"purchaserRole\" class=\"form-control\"><option data-i18n=\"teachers_quote.purchaser_role_default\" ,=\",\" value=\"\"></option><option data-i18n=\"teachers_quote.influence_advocate\" value=\"Influence/Advocate\"></option><option data-i18n=\"teachers_quote.evaluate_recommend\" value=\"Evaluate/Recommend\"></option><option data-i18n=\"teachers_quote.approve_funds\" value=\"Approve Funds\"></option><option data-i18n=\"teachers_quote.no_purchaser_role\" value=\"No role in purchase decisions\"></option></select></div></div></div></div><div id=\"form-school-info\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.organization_label\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><input id=\"organization-control\" name=\"organization\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.district_label\" class=\"control-label form-control nullify-form-control\"></span><input id=\"district-control\" name=\"district\" data-i18n=\"[placeholder]teachers_quote.district_na\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.city\" class=\"control-label\"></span><input name=\"city\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.state\" class=\"control-label\"></span><input name=\"state\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.country\" class=\"control-labelspan control-label\"></span><input name=\"country\" class=\"form-control\"/></div></div></div></div><div id=\"form-students-info\"><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"courses.number_programming_students\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.num_students_help\" class=\"text-info\"></em></div><select name=\"numStudents\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-10</option><option>11-50</option><option>51-100</option><option>101-200</option><option>201-500</option><option>501-1000</option><option>1000+</option></select></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"courses.number_total_students\" class=\"control-label\"></span><select name=\"numStudentsTotal\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-500</option><option>500-1,000</option><option>1,000-5,000</option><option>5,000-10,000</option><option>10,000+</option></select></div></div></div><div class=\"form-group\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4\"><span data-i18n=\"teachers_quote.education_level_label\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.education_level_help\" class=\"text-info\"></em></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Elementary\"/><span data-i18n=\"teachers_quote.elementary_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Middle\"/><span data-i18n=\"teachers_quote.middle_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"High\"/><span data-i18n=\"teachers_quote.high_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"College+\"/><span data-i18n=\"teachers_quote.college_plus\"></span></label></div><div class=\"checkbox\"><label><input id=\"other-education-level-checkbox\" type=\"checkbox\"/><span data-i18n=\"nav.other\" class=\"spr\"></span><span data-i18n=\"teachers_quote.please_explain\"></span></label></div><input id=\"other-education-level-input\" class=\"form-control\"/></div></div></div></div><div id=\"anything-else-row\" class=\"row\"><div class=\"col-md-offset-2 col-md-8\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.anything_else\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><textarea rows=\"8\" name=\"notes\" class=\"form-control\"></textarea><input type=\"hidden\" name=\"nces_id\"/><input type=\"hidden\" name=\"nces_name\"/><input type=\"hidden\" name=\"nces_district\"/><input type=\"hidden\" name=\"nces_district_id\"/><input type=\"hidden\" name=\"nces_district_schools\"/><input type=\"hidden\" name=\"nces_district_students\"/><input type=\"hidden\" name=\"nces_students\"/><input type=\"hidden\" name=\"nces_phone\"/></div></div><div id=\"buttons-row\" class=\"row m-y-2 text-center\"><input id=\"submit-request-btn\" type=\"submit\" data-i18n=\"[value]new_home.request_demo\" class=\"btn btn-lg btn-primary\"/></div></form><div" + (jade.attrs({ 'id':('form-submit-success'), "class": [('text-center'),(showDone ? '' : 'hide')] }, {"class":true})) + "><h3 data-i18n=\"teachers_quote.thanks_header\"></h3><h4 data-i18n=\"teachers_quote.thanks_sub_header\"></h4><p><span data-i18n=\"teachers_quote.thanks_p\" class=\"spr\"></span><a href=\"mailto:team@codecombat.com\" class=\"spl\">team@codecombat.com</a></p>");
if (!( me.isAnonymous()))
{
buf.push("<a href=\"/teachers/classes\" class=\"btn btn-lg btn-navy\"><span data-i18n=\"teachers_quote.back_to_classes\"></span></a>");
}
if ( me.isAnonymous())
{
buf.push("<h5 data-i18n=\"teachers_quote.finish_signup\"></h5><p data-i18n=\"teachers_quote.finish_signup_p\"></p><div id=\"social-network-signups\"><button id=\"facebook-signup-btn\" class=\"btn btn-facebook btn-lg m-x-1\"><span data-i18n=\"teachers_quote.signup_with\" class=\"spr\"></span>Facebook<img src=\"/images/pages/community/logo_facebook.png\" class=\"m-l-1\"/></button><button id=\"gplus-signup-btn\" class=\"btn btn-gplus btn-lg spr\"><span data-i18n=\"teachers_quote.signup_with\" class=\"spr\"></span>G+<img src=\"/images/pages/community/logo_g+.png\" class=\"m-l-1\"/></button></div><div data-i18n=\"general.or\" class=\"text-h1 text-uppercase\"></div><form id=\"signup-form\" class=\"text-left\"><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.username\" class=\"control-label\"></span><input name=\"name\" class=\"form-control\"/></div></div></div><div class=\"row\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.password\" class=\"control-label\"></span><input name=\"password1\" type=\"password\" class=\"form-control\"/></div></div><div class=\"col-md-4\"><div class=\"form-group\"><span data-i18n=\"general.confirm_password\" class=\"control-label\"></span><input name=\"password2\" type=\"password\" class=\"form-control\"/></div></div></div><div class=\"text-center\"><button data-i18n=\"login.sign_up\" class=\"btn btn-lg btn-navy\"></button></div></form>");
}
buf.push("</div></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("views/teachers/RequestQuoteView", function(exports, require, module) {
var AuthModal, ConfirmModal, DISTRICT_NCES_KEYS, RequestQuoteView, RootView, SCHOOL_NCES_KEYS, SIGNUP_REDIRECT, TrialRequest, TrialRequests, algolia, errors, forms, i, key, len, requestFormSchemaAnonymous, requestFormSchemaLoggedIn, signupFormSchema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

forms = require('core/forms');

TrialRequest = require('models/TrialRequest');

TrialRequests = require('collections/TrialRequests');

AuthModal = require('views/core/AuthModal');

errors = require('core/errors');

ConfirmModal = require('views/core/ConfirmModal');

algolia = require('core/services/algolia');

SIGNUP_REDIRECT = '/teachers';

DISTRICT_NCES_KEYS = ['district', 'district_id', 'district_schools', 'district_students', 'phone'];

SCHOOL_NCES_KEYS = DISTRICT_NCES_KEYS.concat(['id', 'name', 'students']);

module.exports = RequestQuoteView = (function(superClass) {
  extend(RequestQuoteView, superClass);

  function RequestQuoteView() {
    return RequestQuoteView.__super__.constructor.apply(this, arguments);
  }

  RequestQuoteView.prototype.id = 'request-quote-view';

  RequestQuoteView.prototype.template = require('templates/teachers/request-quote-view');

  RequestQuoteView.prototype.logoutRedirectURL = null;

  RequestQuoteView.prototype.events = {
    'change #request-form': 'onChangeRequestForm',
    'submit #request-form': 'onSubmitRequestForm',
    'change input[name="city"]': 'invalidateNCES',
    'change input[name="state"]': 'invalidateNCES',
    'change input[name="district"]': 'invalidateNCES',
    'change input[name="country"]': 'invalidateNCES',
    'click #email-exists-login-link': 'onClickEmailExistsLoginLink',
    'submit #signup-form': 'onSubmitSignupForm',
    'click #logout-link': function() {
      return me.logout();
    },
    'click #gplus-signup-btn': 'onClickGPlusSignupButton',
    'click #facebook-signup-btn': 'onClickFacebookSignupButton'
  };

  RequestQuoteView.prototype.initialize = function() {
    var ref;
    this.trialRequest = new TrialRequest();
    this.trialRequests = new TrialRequests();
    this.trialRequests.fetchOwn();
    this.supermodel.trackCollection(this.trialRequests);
    this.formChanged = false;
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Request Demo Loaded', {
      category: 'Teachers'
    }, ['Mixpanel']) : void 0;
  };

  RequestQuoteView.prototype.onLeaveMessage = function() {
    if (this.formChanged) {
      return 'Your request has not been submitted! If you continue, your changes will be lost.';
    }
  };

  RequestQuoteView.prototype.onLoaded = function() {
    if (this.trialRequests.size()) {
      this.trialRequest = this.trialRequests.first();
    }
    return RequestQuoteView.__super__.onLoaded.call(this);
  };

  RequestQuoteView.prototype.invalidateNCES = function() {
    var i, key, len, results;
    results = [];
    for (i = 0, len = SCHOOL_NCES_KEYS.length; i < len; i++) {
      key = SCHOOL_NCES_KEYS[i];
      results.push(this.$('input[name="nces_' + key + '"]').val(''));
    }
    return results;
  };

  RequestQuoteView.prototype.afterRender = function() {
    var commonLevels, otherLevel, properties, submittedLevels;
    RequestQuoteView.__super__.afterRender.call(this);
    properties = this.trialRequest.get('properties');
    if (properties) {
      forms.objectToForm(this.$('#request-form'), properties);
      commonLevels = _.map(this.$('[name="educationLevel"]'), function(el) {
        return $(el).val();
      });
      submittedLevels = properties.educationLevel || [];
      otherLevel = _.first(_.difference(submittedLevels, commonLevels)) || '';
      this.$('#other-education-level-checkbox').attr('checked', !!otherLevel);
      this.$('#other-education-level-input').val(otherLevel);
    }
    $("#organization-control").algolia_autocomplete({
      hint: false
    }, [
      {
        source: function(query, callback) {
          return algolia.schoolsIndex.search(query, {
            hitsPerPage: 5,
            aroundLatLngViaIP: false
          }).then(function(answer) {
            return callback(answer.hits);
          }, function() {
            return callback([]);
          });
        },
        displayKey: 'name',
        templates: {
          suggestion: function(suggestion) {
            var hr, ref;
            hr = suggestion._highlightResult;
            return ("<div class='school'> " + hr.name.value + " </div>") + ("<div class='district'>" + hr.district.value + ", ") + ("<span>" + ((ref = hr.city) != null ? ref.value : void 0) + ", " + hr.state.value + "</span></div>");
          }
        }
      }
    ]).on('autocomplete:selected', (function(_this) {
      return function(event, suggestion, dataset) {
        var i, key, len;
        _this.$('input[name="district"]').val(suggestion.district);
        _this.$('input[name="city"]').val(suggestion.city);
        _this.$('input[name="state"]').val(suggestion.state);
        _this.$('input[name="country"]').val('USA');
        for (i = 0, len = SCHOOL_NCES_KEYS.length; i < len; i++) {
          key = SCHOOL_NCES_KEYS[i];
          _this.$('input[name="nces_' + key + '"]').val(suggestion[key]);
        }
        return _this.onChangeRequestForm();
      };
    })(this));
    return $("#district-control").algolia_autocomplete({
      hint: false
    }, [
      {
        source: function(query, callback) {
          return algolia.schoolsIndex.search(query, {
            hitsPerPage: 5,
            aroundLatLngViaIP: false
          }).then(function(answer) {
            return callback(answer.hits);
          }, function() {
            return callback([]);
          });
        },
        displayKey: 'district',
        templates: {
          suggestion: function(suggestion) {
            var hr, ref;
            hr = suggestion._highlightResult;
            return ("<div class='district'>" + hr.district.value + ", ") + ("<span>" + ((ref = hr.city) != null ? ref.value : void 0) + ", " + hr.state.value + "</span></div>");
          }
        }
      }
    ]).on('autocomplete:selected', (function(_this) {
      return function(event, suggestion, dataset) {
        var i, key, len;
        _this.$('input[name="organization"]').val('');
        _this.$('input[name="city"]').val(suggestion.city);
        _this.$('input[name="state"]').val(suggestion.state);
        _this.$('input[name="country"]').val('USA');
        for (i = 0, len = DISTRICT_NCES_KEYS.length; i < len; i++) {
          key = DISTRICT_NCES_KEYS[i];
          _this.$('input[name="nces_' + key + '"]').val(suggestion[key]);
        }
        return _this.onChangeRequestForm();
      };
    })(this));
  };

  RequestQuoteView.prototype.onChangeRequestForm = function() {
    var ref;
    if (!this.formChanged) {
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Teachers Request Demo Form Started', {
          category: 'Teachers'
        }, ['Mixpanel']);
      }
    }
    return this.formChanged = true;
  };

  RequestQuoteView.prototype.onSubmitRequestForm = function(e) {
    var attrs, error, form, modal, ref, requestFormSchema, result, trialRequestAttrs, val;
    e.preventDefault();
    form = this.$('#request-form');
    attrs = forms.formToObject(form);
    trialRequestAttrs = _.cloneDeep(attrs);
    if ((ref = trialRequestAttrs.district) != null ? ref.replace(/\s/ig, '').match(/n\/a/ig) : void 0) {
      trialRequestAttrs = _.omit(trialRequestAttrs, 'district');
    }
    if (this.$('#other-education-level-checkbox').is(':checked')) {
      val = this.$('#other-education-level-input').val();
      if (val) {
        trialRequestAttrs.educationLevel.push(val);
      }
    }
    forms.clearFormAlerts(form);
    requestFormSchema = me.isAnonymous() ? requestFormSchemaAnonymous : requestFormSchemaLoggedIn;
    result = tv4.validateMultiple(trialRequestAttrs, requestFormSchemaAnonymous);
    error = false;
    if (!result.valid) {
      forms.applyErrorsToForm(form, result.errors);
      error = true;
    }
    if (!error && !forms.validateEmail(trialRequestAttrs.email)) {
      forms.setErrorToProperty(form, 'email', 'invalid email');
      error = true;
    }
    if (!_.size(trialRequestAttrs.educationLevel)) {
      forms.setErrorToProperty(form, 'educationLevel', 'include at least one');
      error = true;
    }
    if (!attrs.district) {
      forms.setErrorToProperty(form, 'district', $.i18n.t('common.required_field'));
      error = true;
    }
    if (error) {
      forms.scrollToFirstError();
      return;
    }
    trialRequestAttrs['siteOrigin'] = 'demo request';
    this.trialRequest = new TrialRequest({
      type: 'course',
      properties: trialRequestAttrs
    });
    if (me.get('role') === 'student' && !me.isAnonymous()) {
      modal = new ConfirmModal({
        title: '',
        body: "<p>" + ($.i18n.t('teachers_quote.conversion_warning')) + "</p><p>" + ($.i18n.t('teachers_quote.learn_more_modal')) + "</p>",
        confirm: $.i18n.t('common.continue'),
        decline: $.i18n.t('common.cancel')
      });
      this.openModalView(modal);
      return modal.once('confirm', (function() {
        modal.hide();
        return this.saveTrialRequest();
      }), this);
    } else {
      return this.saveTrialRequest();
    }
  };

  RequestQuoteView.prototype.saveTrialRequest = function() {
    this.trialRequest.notyErrors = false;
    this.$('#submit-request-btn').text('Sending').attr('disabled', true);
    this.trialRequest.save();
    this.trialRequest.on('sync', this.onTrialRequestSubmit, this);
    return this.trialRequest.on('error', this.onTrialRequestError, this);
  };

  RequestQuoteView.prototype.onTrialRequestError = function(model, jqxhr) {
    var logIn, userExists;
    this.$('#submit-request-btn').text('Submit').attr('disabled', false);
    if (jqxhr.status === 409) {
      userExists = $.i18n.t('teachers_quote.email_exists');
      logIn = $.i18n.t('login.log_in');
      this.$('#email-form-group').addClass('has-error').append($("<div class='help-block error-help-block'>" + userExists + " <a id='email-exists-login-link'>" + logIn + "</a>"));
      return forms.scrollToFirstError();
    } else {
      return errors.showNotyNetworkError.apply(errors, arguments);
    }
  };

  RequestQuoteView.prototype.onClickEmailExistsLoginLink = function() {
    var modal, ref;
    modal = new AuthModal({
      initialValues: {
        email: (ref = this.trialRequest.get('properties')) != null ? ref.email : void 0
      }
    });
    return this.openModalView(modal);
  };

  RequestQuoteView.prototype.onTrialRequestSubmit = function() {
    var defaultName, ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Request Demo Form Submitted', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.formChanged = false;
    me.setRole(this.trialRequest.get('properties').role.toLowerCase(), true);
    defaultName = [this.trialRequest.get('firstName'), this.trialRequest.get('lastName')].join(' ');
    this.$('input[name="name"]').val(defaultName);
    this.$('#request-form, #form-submit-success').toggleClass('hide');
    this.scrollToTop(0);
    return $('#flying-focus').css({
      top: 0,
      left: 0
    });
  };

  RequestQuoteView.prototype.onClickGPlusSignupButton = function() {
    var btn;
    btn = this.$('#gplus-signup-btn');
    btn.attr('disabled', true);
    return application.gplusHandler.loadAPI({
      context: this,
      success: function() {
        btn.attr('disabled', false);
        return application.gplusHandler.connect({
          context: this,
          success: function() {
            btn.find('.sign-in-blurb').text($.i18n.t('signup.creating'));
            btn.attr('disabled', true);
            return application.gplusHandler.loadPerson({
              context: this,
              success: function(gplusAttrs) {
                me.set(gplusAttrs);
                return me.save(null, {
                  url: "/db/user?gplusID=" + gplusAttrs.gplusID + "&gplusAccessToken=" + (application.gplusHandler.token()),
                  type: 'PUT',
                  success: function() {
                    var ref;
                    if ((ref = window.tracker) != null) {
                      ref.trackEvent('Teachers Request Demo Create Account Google', {
                        category: 'Teachers'
                      }, ['Mixpanel']);
                    }
                    application.router.navigate(SIGNUP_REDIRECT);
                    return window.location.reload();
                  },
                  error: errors.showNotyNetworkError
                });
              }
            });
          }
        });
      }
    });
  };

  RequestQuoteView.prototype.onClickFacebookSignupButton = function() {
    var btn;
    btn = this.$('#facebook-signup-btn');
    btn.attr('disabled', true);
    return application.facebookHandler.loadAPI({
      context: this,
      success: function() {
        btn.attr('disabled', false);
        return application.facebookHandler.connect({
          context: this,
          success: function() {
            btn.find('.sign-in-blurb').text($.i18n.t('signup.creating'));
            btn.attr('disabled', true);
            return application.facebookHandler.loadPerson({
              context: this,
              success: function(facebookAttrs) {
                me.set(facebookAttrs);
                return me.save(null, {
                  url: "/db/user?facebookID=" + facebookAttrs.facebookID + "&facebookAccessToken=" + (application.facebookHandler.token()),
                  type: 'PUT',
                  success: function() {
                    var ref;
                    if ((ref = window.tracker) != null) {
                      ref.trackEvent('Teachers Request Demo Create Account Facebook', {
                        category: 'Teachers'
                      }, ['Mixpanel']);
                    }
                    application.router.navigate(SIGNUP_REDIRECT);
                    return window.location.reload();
                  },
                  error: errors.showNotyNetworkError
                });
              }
            });
          }
        });
      }
    });
  };

  RequestQuoteView.prototype.onSubmitSignupForm = function(e) {
    var attrs, error, form, result;
    e.preventDefault();
    form = this.$('#signup-form');
    attrs = forms.formToObject(form);
    forms.clearFormAlerts(form);
    result = tv4.validateMultiple(attrs, signupFormSchema);
    error = false;
    if (!result.valid) {
      forms.applyErrorsToForm(form, result.errors);
      error = true;
    }
    if (attrs.password1 !== attrs.password2) {
      forms.setErrorToProperty(form, 'password1', 'Passwords do not match');
      error = true;
    }
    if (error) {
      return;
    }
    me.set({
      password: attrs.password1,
      name: attrs.name,
      email: this.trialRequest.get('properties').email
    });
    return me.save(null, {
      success: function() {
        var ref;
        if ((ref = window.tracker) != null) {
          ref.trackEvent('Teachers Request Demo Create Account', {
            category: 'Teachers'
          }, ['Mixpanel']);
        }
        application.router.navigate(SIGNUP_REDIRECT);
        return window.location.reload();
      },
      error: errors.showNotyNetworkError
    });
  };

  return RequestQuoteView;

})(RootView);

requestFormSchemaAnonymous = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'role', 'purchaserRole', 'numStudents', 'numStudentsTotal', 'phoneNumber', 'city', 'state', 'country'],
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phoneNumber: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    purchaserRole: {
      type: 'string'
    },
    organization: {
      type: 'string'
    },
    district: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    numStudents: {
      type: 'string'
    },
    numStudentsTotal: {
      type: 'string'
    },
    educationLevel: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    notes: {
      type: 'string'
    }
  }
};

for (i = 0, len = SCHOOL_NCES_KEYS.length; i < len; i++) {
  key = SCHOOL_NCES_KEYS[i];
  requestFormSchemaAnonymous['nces_' + key] = {
    type: 'string'
  };
}

requestFormSchemaLoggedIn = _.cloneDeep(requestFormSchemaAnonymous);

requestFormSchemaLoggedIn.required.push('name');

signupFormSchema = {
  type: 'object',
  required: ['name', 'password1', 'password2'],
  properties: {
    name: {
      type: 'string'
    },
    password1: {
      type: 'string'
    },
    password2: {
      type: 'string'
    }
  }
};
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/RequestQuoteView.js.map
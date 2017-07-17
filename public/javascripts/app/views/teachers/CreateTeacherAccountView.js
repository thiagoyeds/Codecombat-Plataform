require.register("templates/teachers/create-teacher-account-view", function(exports, require, module) {
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><form id=\"signup-form\"><div class=\"row text-center\"><div class=\"col-md-offset-2 col-md-8\"><h3 class=\"m-t-3\">Criar uma conta de professor</h3><h4></h4>Obtenha acesso a ferramentas somente professor para o uso de CodeCombat na \nsala de aula. Definir uma classe, adicionar seus alunos e acompanhar o seu\nprogresso!<div class=\"alert alert-info m-y-2\"><span data-i18n=\"signup.login_switch\" class=\"spr\"></span><a data-i18n=\"login.log_in\" class=\"login-link\"></a></div></div></div><div id=\"gplus-logged-in-row\" class=\"row text-center hide\"><div class=\"col-md-offset-2 col-md-8\"><h2 data-i18n=\"signup.connected_gplus_header\"></h2><p data-i18n=\"signup.connected_gplus_p\"></p></div></div><div id=\"facebook-logged-in-row\" class=\"row text-center hide\"><div class=\"col-md-offset-2 col-md-8\"><h2 data-i18n=\"signup.connected_facebook_header\"></h2><p data-i18n=\"signup.connected_facebook_p\"></p></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.username\" class=\"control-label\"></span><input name=\"name\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div id=\"email-form-group\" class=\"form-group\"><span data-i18n=\"general.email\" class=\"control-label\"></span><input name=\"email\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.first_name\" class=\"control-label\"></span><input name=\"firstName\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.last_name\" class=\"control-label\"></span><input name=\"lastName\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.password\" class=\"control-label\"></span><input name=\"password1\" type=\"password\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"general.confirm_password\" class=\"control-label\"></span><input name=\"password2\" type=\"password\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.phone_number\"></span></span><input name=\"phoneNumber\" data-i18n=\"[placeholder]teachers_quote.phone_number_help\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.primary_role_label\" class=\"control-label\"></span><select name=\"role\" class=\"form-control\"><option data-i18n=\"teachers_quote.role_default\" ,=\",\" value=\"\"></option><option data-i18n=\"courses.teacher\" value=\"Teacher\"></option><option data-i18n=\"teachers_quote.tech_coordinator\" value=\"Technology coordinator\"></option><option data-i18n=\"teachers_quote.advisor\" value=\"Advisor\"></option><option data-i18n=\"teachers_quote.principal\" value=\"Principal\"></option><option data-i18n=\"teachers_quote.superintendent\" value=\"Superintendent\"></option><option data-i18n=\"teachers_quote.parent\" value=\"Parent\"></option></select></div></div></div><div id=\"form-school-info\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.organization_label\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><input id=\"organization-control\" name=\"organization\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.district_label\" class=\"control-label form-control nullify-form-control\"></span><input id=\"district-control\" name=\"district\" data-i18n=\"[placeholder]teachers_quote.district_na\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.city\" class=\"control-label\"></span><input name=\"city\" class=\"form-control\"/></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.state\" class=\"control-label\"></span><input name=\"state\" class=\"form-control\"/></div></div></div><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4 col-sm-6\"><div class=\"form-group\"><span data-i18n=\"teachers_quote.country\" class=\"control-label\"></span><input name=\"country\" class=\"form-control\"/></div></div></div></div><div id=\"form-students-info\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4\"><div class=\"form-group\"><span data-i18n=\"courses.number_programming_students\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.num_students_help\" class=\"text-info\"></em></div><select name=\"numStudents\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-10</option><option>11-50</option><option>51-100</option><option>101-200</option><option>201-500</option><option>501-1000</option><option>1000+</option></select></div></div><div class=\"col-md-4 col-sm-6\"><div class=\"form-group\"><span class=\"control-label\"><span data-i18n=\"courses.number_total_students\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><select name=\"numStudentsTotal\" class=\"form-control\"><option data-i18n=\"teachers_quote.num_students_default\" value=\"\"></option><option>1-500</option><option>500-1,000</option><option>1,000-5,000</option><option>5,000-10,000</option><option>10,000+</option></select></div></div></div><div class=\"form-group\"><div class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-4\"><span data-i18n=\"teachers_quote.education_level_label\" class=\"control-label\"></span><div class=\"help-block small\"><em data-i18n=\"teachers_quote.education_level_help\" class=\"text-info\"></em></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Elementary\"/><span data-i18n=\"teachers_quote.elementary_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"Middle\"/><span data-i18n=\"teachers_quote.middle_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"High\"/><span data-i18n=\"teachers_quote.high_school\"></span></label></div><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"educationLevel\" value=\"College+\"/><span data-i18n=\"teachers_quote.college_plus\"></span></label></div><div class=\"checkbox\"><label><input id=\"other-education-level-checkbox\" type=\"checkbox\"/><span data-i18n=\"nav.other\" class=\"spr\"></span><span data-i18n=\"teachers_quote.please_explain\"></span></label></div><input id=\"other-education-level-input\" class=\"form-control\"/></div></div></div></div><div id=\"anything-else-row\" class=\"row m-y-2\"><div class=\"col-md-offset-2 col-md-8\"><span class=\"control-label\"><span data-i18n=\"teachers_quote.anything_else\"></span><span data-i18n=\"signup.optional\" class=\"spl text-muted\"></span></span><textarea rows=\"8\" name=\"notes\" class=\"form-control\"></textarea><input type=\"hidden\" name=\"nces_id\"/><input type=\"hidden\" name=\"nces_name\"/><input type=\"hidden\" name=\"nces_district\"/><input type=\"hidden\" name=\"nces_district_id\"/><input type=\"hidden\" name=\"nces_district_schools\"/><input type=\"hidden\" name=\"nces_district_students\"/><input type=\"hidden\" name=\"nces_students\"/><input type=\"hidden\" name=\"nces_phone\"/></div></div><div id=\"buttons-row\" class=\"row m-y-2 text-center\"><input id=\"create-account-btn\" type=\"submit\" data-i18n=\"[value]teachers_quote.create_account\" class=\"btn btn-lg btn-primary\"/></div></form></div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("views/teachers/CreateTeacherAccountView", function(exports, require, module) {
var AuthModal, CreateTeacherAccountView, DISTRICT_NCES_KEYS, RootView, SCHOOL_NCES_KEYS, SIGNUP_REDIRECT, TrialRequest, TrialRequests, User, algolia, errors, formSchema, forms, i, key, len,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

forms = require('core/forms');

TrialRequest = require('models/TrialRequest');

TrialRequests = require('collections/TrialRequests');

AuthModal = require('views/core/AuthModal');

errors = require('core/errors');

User = require('models/User');

algolia = require('core/services/algolia');

SIGNUP_REDIRECT = '/teachers/classes';

DISTRICT_NCES_KEYS = ['district', 'district_id', 'district_schools', 'district_students', 'phone'];

SCHOOL_NCES_KEYS = DISTRICT_NCES_KEYS.concat(['id', 'name', 'students']);

module.exports = CreateTeacherAccountView = (function(superClass) {
  extend(CreateTeacherAccountView, superClass);

  function CreateTeacherAccountView() {
    return CreateTeacherAccountView.__super__.constructor.apply(this, arguments);
  }

  CreateTeacherAccountView.prototype.id = 'create-teacher-account-view';

  CreateTeacherAccountView.prototype.template = require('templates/teachers/create-teacher-account-view');

  CreateTeacherAccountView.prototype.events = {
    'click .login-link': 'onClickLoginLink',
    'change form#signup-form': 'onChangeForm',
    'submit form#signup-form': 'onSubmitForm',
    'click #gplus-signup-btn': 'onClickGPlusSignupButton',
    'click #facebook-signup-btn': 'onClickFacebookSignupButton',
    'change input[name="city"]': 'invalidateNCES',
    'change input[name="state"]': 'invalidateNCES',
    'change input[name="district"]': 'invalidateNCES',
    'change input[name="country"]': 'invalidateNCES'
  };

  CreateTeacherAccountView.prototype.initialize = function() {
    var ref;
    this.trialRequest = new TrialRequest();
    this.trialRequests = new TrialRequests();
    this.trialRequests.fetchOwn();
    this.supermodel.trackCollection(this.trialRequests);
    return (ref = window.tracker) != null ? ref.trackEvent('Teachers Create Account Loaded', {
      category: 'Teachers'
    }, ['Mixpanel']) : void 0;
  };

  CreateTeacherAccountView.prototype.onLeaveMessage = function() {
    if (this.formChanged) {
      return 'Your account has not been created! If you continue, your changes will be lost.';
    }
  };

  CreateTeacherAccountView.prototype.onLoaded = function() {
    if (this.trialRequests.size()) {
      this.trialRequest = this.trialRequests.first();
    }
    return CreateTeacherAccountView.__super__.onLoaded.call(this);
  };

  CreateTeacherAccountView.prototype.invalidateNCES = function() {
    var i, key, len, results;
    results = [];
    for (i = 0, len = SCHOOL_NCES_KEYS.length; i < len; i++) {
      key = SCHOOL_NCES_KEYS[i];
      results.push(this.$('input[name="nces_' + key + '"]').val(''));
    }
    return results;
  };

  CreateTeacherAccountView.prototype.afterRender = function() {
    var commonLevels, otherLevel, properties, submittedLevels;
    CreateTeacherAccountView.__super__.afterRender.call(this);
    properties = this.trialRequest.get('properties');
    if (properties) {
      forms.objectToForm(this.$('form'), properties);
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
        _this.$('input[name="district"]').val(suggestion.district).trigger('input').trigger('blur');
        _this.$('input[name="city"]').val(suggestion.city);
        _this.$('input[name="state"]').val(suggestion.state);
        _this.$('input[name="country"]').val('USA');
        for (i = 0, len = SCHOOL_NCES_KEYS.length; i < len; i++) {
          key = SCHOOL_NCES_KEYS[i];
          _this.$('input[name="nces_' + key + '"]').val(suggestion[key]);
        }
        return _this.onChangeForm();
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
        _this.$('input[name="organization"]').val('').trigger('input').trigger('blur');
        _this.$('input[name="city"]').val(suggestion.city);
        _this.$('input[name="state"]').val(suggestion.state);
        _this.$('input[name="country"]').val('USA');
        for (i = 0, len = DISTRICT_NCES_KEYS.length; i < len; i++) {
          key = DISTRICT_NCES_KEYS[i];
          _this.$('input[name="nces_' + key + '"]').val(suggestion[key]);
        }
        return _this.onChangeForm();
      };
    })(this));
  };

  CreateTeacherAccountView.prototype.onClickLoginLink = function() {
    var modal, ref;
    modal = new AuthModal({
      initialValues: {
        email: (ref = this.trialRequest.get('properties')) != null ? ref.email : void 0
      }
    });
    return this.openModalView(modal);
  };

  CreateTeacherAccountView.prototype.onChangeForm = function() {
    var ref;
    if (!this.formChanged) {
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Teachers Create Account Form Started', {
          category: 'Teachers'
        }, ['Mixpanel']);
      }
    }
    return this.formChanged = true;
  };

  CreateTeacherAccountView.prototype.onSubmitForm = function(e) {
    var allAttrs, error, form, ref, result, trialRequestAttrs, val;
    e.preventDefault();
    form = this.$('form');
    allAttrs = forms.formToObject(form);
    trialRequestAttrs = _.omit(allAttrs, 'name', 'password1', 'password2');
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
    tv4.addFormat({
      'phoneNumber': function(phoneNumber) {
        if (forms.validatePhoneNumber(phoneNumber)) {
          return null;
        } else {
          return {
            code: tv4.errorCodes.FORMAT_CUSTOM,
            message: 'Please enter a valid phone number, including area code.'
          };
        }
      }
    });
    result = tv4.validateMultiple(trialRequestAttrs, formSchema);
    error = false;
    if (!result.valid) {
      forms.applyErrorsToForm(form, result.errors);
      error = true;
    }
    if (!error && !forms.validateEmail(trialRequestAttrs.email)) {
      forms.setErrorToProperty(form, 'email', 'invalid email');
      error = true;
    }
    if (!error && forms.validateEmail(allAttrs.name)) {
      forms.setErrorToProperty(form, 'name', 'username may not be an email');
      error = true;
    }
    if (!_.size(trialRequestAttrs.educationLevel)) {
      forms.setErrorToProperty(form, 'educationLevel', 'include at least one');
      error = true;
    }
    if (!allAttrs.district) {
      forms.setErrorToProperty(form, 'district', $.i18n.t('common.required_field'));
      error = true;
    }
    if (!(this.gplusAttrs || this.facebookAttrs)) {
      if (!allAttrs.password1) {
        forms.setErrorToProperty(form, 'password1', $.i18n.t('common.required_field'));
        error = true;
      } else if (!allAttrs.password2) {
        forms.setErrorToProperty(form, 'password2', $.i18n.t('common.required_field'));
        error = true;
      } else if (allAttrs.password1 !== allAttrs.password2) {
        forms.setErrorToProperty(form, 'password1', 'Password fields are not equivalent');
        error = true;
      }
    }
    if (error) {
      forms.scrollToFirstError();
      return;
    }
    trialRequestAttrs['siteOrigin'] = 'create teacher';
    this.trialRequest = new TrialRequest({
      type: 'course',
      properties: trialRequestAttrs
    });
    this.trialRequest.notyErrors = false;
    this.$('#create-account-btn').text('Sending').attr('disabled', true);
    this.trialRequest.save();
    this.trialRequest.on('sync', this.onTrialRequestSubmit, this);
    return this.trialRequest.on('error', this.onTrialRequestError, this);
  };

  CreateTeacherAccountView.prototype.onTrialRequestError = function(model, jqxhr) {
    var logIn, userExists;
    this.$('#create-account-btn').text('Submit').attr('disabled', false);
    if (jqxhr.status === 409) {
      userExists = $.i18n.t('teachers_quote.email_exists');
      logIn = $.i18n.t('login.log_in');
      this.$('#email-form-group').addClass('has-error').append($("<div class='help-block error-help-block'>" + userExists + " <a class='login-link'>" + logIn + "</a>"));
      return forms.scrollToFirstError();
    } else {
      return errors.showNotyNetworkError.apply(errors, arguments);
    }
  };

  CreateTeacherAccountView.prototype.onClickEmailExistsLoginLink = function() {
    var modal, ref;
    modal = new AuthModal({
      initialValues: {
        email: (ref = this.trialRequest.get('properties')) != null ? ref.email : void 0
      }
    });
    return this.openModalView(modal);
  };

  CreateTeacherAccountView.prototype.onTrialRequestSubmit = function() {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Teachers Create Account Submitted', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.formChanged = false;
    return Promise.resolve().then((function(_this) {
      return function() {
        var attrs, jqxhr;
        attrs = _.pick(forms.formToObject(_this.$('form')), 'role', 'firstName', 'lastName');
        attrs.role = attrs.role.toLowerCase();
        me.set(attrs);
        if (_this.gplusAttrs) {
          me.set(_.omit(_this.gplusAttrs, 'gplusID', 'email'));
        }
        if (_this.facebookAttrs) {
          me.set(_.omit(_this.facebookAttrs, 'facebookID', 'email'));
        }
        jqxhr = me.save();
        if (!jqxhr) {
          throw new Error('Could not save user');
        }
        _this.trigger('update-settings');
        return jqxhr;
      };
    })(this)).then((function(_this) {
      return function() {
        var email, facebookID, gplusID, jqxhr, name, password1, ref1, ref2, ref3, ref4;
        ref1 = forms.formToObject(_this.$('form')), name = ref1.name, email = ref1.email;
        if (_this.gplusAttrs) {
          ref2 = _this.gplusAttrs, email = ref2.email, gplusID = ref2.gplusID;
          name = forms.formToObject(_this.$el).name;
          jqxhr = me.signupWithGPlus(name, email, _this.gplusAttrs.gplusID);
        } else if (_this.facebookAttrs) {
          ref3 = _this.facebookAttrs, email = ref3.email, facebookID = ref3.facebookID;
          name = forms.formToObject(_this.$el).name;
          jqxhr = me.signupWithFacebook(name, email, facebookID);
        } else {
          ref4 = forms.formToObject(_this.$el), name = ref4.name, email = ref4.email, password1 = ref4.password1;
          jqxhr = me.signupWithPassword(name, email, password1);
        }
        _this.trigger('signup');
        return jqxhr;
      };
    })(this)).then((function(_this) {
      return function() {
        application.router.navigate(SIGNUP_REDIRECT, {
          trigger: true
        });
        return application.router.reload();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        if (e instanceof Error) {
          noty({
            text: e.message,
            layout: 'topCenter',
            type: 'error',
            timeout: 5000,
            killer: false,
            dismissQueue: true
          });
        } else {
          errors.showNotyNetworkError.apply(errors, arguments);
        }
        return _this.$('#create-account-btn').text('Submit').attr('disabled', false);
      };
    })(this));
  };

  CreateTeacherAccountView.prototype.onClickGPlusSignupButton = function() {
    var btn;
    btn = this.$('#gplus-signup-btn');
    btn.attr('disabled', true);
    return application.gplusHandler.loadAPI({
      success: (function(_this) {
        return function() {
          btn.attr('disabled', false);
          return application.gplusHandler.connect({
            success: function() {
              btn.find('.sign-in-blurb').text($.i18n.t('signup.creating'));
              btn.attr('disabled', true);
              return application.gplusHandler.loadPerson({
                success: function(gplusAttrs) {
                  var existingUser;
                  _this.gplusAttrs = gplusAttrs;
                  existingUser = new User();
                  return existingUser.fetchGPlusUser(_this.gplusAttrs.gplusID, {
                    error: function(user, jqxhr) {
                      if (jqxhr.status === 404) {
                        return _this.onGPlusConnected();
                      } else {
                        return errors.showNotyNetworkError(jqxhr);
                      }
                    },
                    success: function() {
                      return me.loginGPlusUser(_this.gplusAttrs.gplusID, {
                        success: function() {
                          return application.router.navigate('/teachers/update-account', {
                            trigger: true
                          });
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
      })(this)
    });
  };

  CreateTeacherAccountView.prototype.onGPlusConnected = function() {
    var field, i, input, len, ref;
    this.formChanged = true;
    forms.objectToForm(this.$('form'), this.gplusAttrs);
    ref = ['email', 'firstName', 'lastName'];
    for (i = 0, len = ref.length; i < len; i++) {
      field = ref[i];
      input = this.$("input[name='" + field + "']");
      if (input.val()) {
        input.attr('disabled', true);
      }
    }
    this.$('input[type="password"]').attr('disabled', true);
    return this.$('#gplus-logged-in-row, #social-network-signups').toggleClass('hide');
  };

  CreateTeacherAccountView.prototype.onClickFacebookSignupButton = function() {
    var btn;
    btn = this.$('#facebook-signup-btn');
    btn.attr('disabled', true);
    return application.facebookHandler.loadAPI({
      success: (function(_this) {
        return function() {
          btn.attr('disabled', false);
          return application.facebookHandler.connect({
            success: function() {
              btn.find('.sign-in-blurb').text($.i18n.t('signup.creating'));
              btn.attr('disabled', true);
              return application.facebookHandler.loadPerson({
                success: function(facebookAttrs) {
                  var existingUser;
                  _this.facebookAttrs = facebookAttrs;
                  existingUser = new User();
                  return existingUser.fetchFacebookUser(_this.facebookAttrs.facebookID, {
                    error: function(user, jqxhr) {
                      if (jqxhr.status === 404) {
                        return _this.onFacebookConnected();
                      } else {
                        return errors.showNotyNetworkError(jqxhr);
                      }
                    },
                    success: function() {
                      return me.loginFacebookUser(_this.facebookAttrs.facebookID, {
                        success: function() {
                          return application.router.navigate('/teachers/update-account', {
                            trigger: true
                          });
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
      })(this)
    });
  };

  CreateTeacherAccountView.prototype.onFacebookConnected = function() {
    var field, i, input, len, ref;
    this.formChanged = true;
    forms.objectToForm(this.$('form'), this.facebookAttrs);
    ref = ['email', 'firstName', 'lastName'];
    for (i = 0, len = ref.length; i < len; i++) {
      field = ref[i];
      input = this.$("input[name='" + field + "']");
      if (input.val()) {
        input.attr('disabled', true);
      }
    }
    this.$('input[type="password"]').attr('disabled', true);
    return this.$('#facebook-logged-in-row, #social-network-signups').toggleClass('hide');
  };

  return CreateTeacherAccountView;

})(RootView);

formSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'email', 'role', 'numStudents', 'city', 'state', 'country', 'phoneNumber'],
  properties: {
    password1: {
      type: 'string'
    },
    password2: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    name: {
      type: 'string',
      minLength: 1
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phoneNumber: {
      type: 'string',
      format: 'phoneNumber'
    },
    role: {
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
  formSchema['nces_' + key] = {
    type: 'string'
  };
}
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/CreateTeacherAccountView.js.map
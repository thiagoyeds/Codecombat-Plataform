require.register("templates/account/israel-signup-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,serverConfig = locals_.serverConfig,view = locals_.view,loading = locals_.loading,fatalError = locals_.fatalError,queryParams = locals_.queryParams,name = locals_.name,password = locals_.password,formError = locals_.formError;var accountLinks_mixin = function(){
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
buf.push("<ul class=\"nav navbar-nav\"><li><div id=\"language-dropdown-wrapper\"><select class=\"language-dropdown form-control\"></select></div></li></ul></div></div></div></div></nav><div id=\"site-content-area\"><div class=\"container\"><h1 class=\"m-t-3 m-b-2 text-center\">Create Account</h1>");
if ( loading)
{
buf.push("<h5 class=\"text-center\">Loading</h5>");
}
else if ( fatalError)
{
buf.push("<div class=\"alert alert-danger text-center\">");
if ( fatalError === 'signed-in')
{
buf.push("<!-- You already have an account--><h3>יש לך כבר חשבון</h3><!-- Play CodeCombat!--><a href=\"/play\">שחק CodeCombat!</a>");
}
else if ( fatalError === 'missing-input')
{
buf.push("<!-- Not enough information was provided--><h3>חסר מידע</h3><!-- Need at least \"israelId\" included in GET parameters.--><p>לפחות קוד זיהוי ישראלי -  israelId חייב להיכלל בפרמטרים של בקשת ה GET</p>");
}
else if ( fatalError === 'email-exists')
{
buf.push("<!-- Your email is already in use--><h3>דוא\"ל זה כבר נמצא בשימוש  \"</h3><a data-i18n=\"login.log_in\" class=\"login-button\"></a>");
}
else
{
buf.push("<!-- Error--><h3>שגיאה</h3><p>" + (jade.escape(null == (jade.interp = fatalError) ? "" : jade.interp)) + "</p>");
}
buf.push("</div>");
}
else
{
buf.push("<div class=\"row\"><div class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\"><table class=\"table table-condensed\"><tr><!-- Israel Id--><th>קוד זיהוי ישראלי</th><td>" + (jade.escape(null == (jade.interp = queryParams.israelId) ? "" : jade.interp)) + "</td></tr>");
if ( queryParams.email)
{
buf.push("<tr><!-- Email--><th>אמייל</th><td>" + (jade.escape(null == (jade.interp = queryParams.email) ? "" : jade.interp)) + "</td></tr>");
}
if ( queryParams.firstName)
{
buf.push("<tr><!-- First Name--><th>שם פרטי</th><td>" + (jade.escape(null == (jade.interp = queryParams.firstName) ? "" : jade.interp)) + "</td></tr>");
}
if ( queryParams.lastName)
{
buf.push("<tr><!-- Last Name--><th>שם משפחה</th><td>" + (jade.escape(null == (jade.interp = queryParams.lastName) ? "" : jade.interp)) + "</td></tr>");
}
if ( queryParams.school)
{
buf.push("<tr><!-- School--><th>בית ספר</th><td>" + (jade.escape(null == (jade.interp = queryParams.school) ? "" : jade.interp)) + "</td></tr>");
}
if ( queryParams.city)
{
buf.push("<tr><!-- City--><th>עיר</th><td>" + (jade.escape(null == (jade.interp = queryParams.city) ? "" : jade.interp)) + "</td></tr>");
}
if ( queryParams.district)
{
buf.push("<tr><!-- District--><th>מחוז</th><td>" + (jade.escape(null == (jade.interp = queryParams.district) ? "" : jade.interp)) + "</td></tr>");
}
buf.push("</table><form><div class=\"form-group\"><label for=\"username-input\" data-i18n=\"general.username\" class=\"control-label\"></label><input" + (jade.attrs({ 'name':("name"), 'value':(name), "class": [('form-control'),('input-lg')] }, {"name":true,"value":true})) + "/></div><div class=\"form-group\"><label for=\"password-input\" data-i18n=\"general.password\" class=\"control-label\"></label><input" + (jade.attrs({ 'name':("password"), 'type':("password"), 'value':(password), "class": [('form-control'),('input-lg')] }, {"name":true,"type":true,"value":true})) + "/></div>");
if ( formError)
{
buf.push("<div class=\"alert alert-danger text-center\">" + (jade.escape(null == (jade.interp = formError) ? "" : jade.interp)) + "</div>");
}
buf.push("<button id=\"create-account-btn\" type=\"submit\" data-i18n=\"login.sign_up\" class=\"btn btn-lg btn-block btn-navy\"></button></form></div></div>");
}
buf.push("</div></div><div class=\"container-fluid\"><div id=\"footer\" class=\"small\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><ul class=\"list-unstyled\"><li><strong>CodeCombat</strong></li><li><a href=\"/about\" data-i18n=\"nav.about\"></a></li><li><a href=\"/about#jobs\" data-i18n=\"nav.jobs\"></a></li><li><a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a></li><li><a href=\"/legal\" data-i18n=\"nav.legal\"></a></li><li><a href=\"/privacy\" data-i18n=\"nav.privacy\"></a></li></ul></div>");
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

;require.register("views/account/IsraelSignupView", function(exports, require, module) {
var AbortError, IsraelSignupView, RootView, State, User, errors, formSchema, forms, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/account/israel-signup-view');

forms = require('core/forms');

errors = require('core/errors');

utils = require('core/utils');

User = require('models/User');

State = require('models/State');

AbortError = (function(superClass) {
  extend(AbortError, superClass);

  function AbortError() {
    return AbortError.__super__.constructor.apply(this, arguments);
  }

  return AbortError;

})(Error);

formSchema = {
  type: 'object',
  properties: _.pick(User.schema.properties, 'name', 'password'),
  required: ['name', 'password']
};

module.exports = IsraelSignupView = (function(superClass) {
  extend(IsraelSignupView, superClass);

  function IsraelSignupView() {
    return IsraelSignupView.__super__.constructor.apply(this, arguments);
  }

  IsraelSignupView.prototype.id = 'israel-signup-view';

  IsraelSignupView.prototype.template = template;

  IsraelSignupView.prototype.events = {
    'submit form': 'onSubmitForm',
    'input input[name="name"]': 'onChangeName',
    'input input[name="password"]': 'onChangePassword'
  };

  IsraelSignupView.prototype.initialize = function() {
    var email, israelId, ref;
    this.state = new State({
      fatalError: null,
      formError: null,
      loading: true,
      submitting: false,
      queryParams: _.pick(utils.getQueryVariables(), 'israelId', 'firstName', 'lastName', 'email', 'school', 'city', 'state', 'district'),
      name: '',
      password: ''
    });
    ref = this.state.get('queryParams'), israelId = ref.israelId, email = ref.email;
    if (!me.isAnonymous()) {
      this.state.set({
        fatalError: 'signed-in',
        loading: false
      });
    } else if (!israelId) {
      this.state.set({
        fatalError: 'missing-input',
        loading: false
      });
    } else if (email && !forms.validateEmail(email)) {
      this.state.set({
        fatalError: 'invalid-email',
        loading: false
      });
    } else if (!email) {
      this.state.set({
        loading: false
      });
    } else {
      User.checkEmailExists(email).then((function(_this) {
        return function(arg) {
          var exists;
          exists = arg.exists;
          _this.state.set({
            loading: false
          });
          if (exists) {
            return _this.state.set({
              fatalError: 'email-exists'
            });
          }
        };
      })(this))["catch"]((function(_this) {
        return function() {
          return _this.state.set({
            fatalError: $.i18n.t('loading_error.unknown'),
            loading: false
          });
        };
      })(this));
    }
    return this.listenTo(this.state, 'change', _.debounce(this.render));
  };

  IsraelSignupView.prototype.getRenderData = function() {
    var c;
    c = IsraelSignupView.__super__.getRenderData.call(this);
    return _.extend({}, this.state.attributes, c);
  };

  IsraelSignupView.prototype.onChangeName = function(e) {
    return this.state.set({
      name: $(e.currentTarget).val()
    }, {
      silent: true
    });
  };

  IsraelSignupView.prototype.onChangePassword = function(e) {
    return this.state.set({
      password: $(e.currentTarget).val()
    }, {
      silent: true
    });
  };

  IsraelSignupView.prototype.displayFormSubmitting = function() {
    this.$('#create-account-btn').text($.i18n.t('signup.creating')).attr('disabled', true);
    return this.$('input').attr('disabled', true);
  };

  IsraelSignupView.prototype.displayFormStandingBy = function() {
    this.$('#create-account-btn').text($.i18n.t('login.sign_up')).attr('disabled', false);
    return this.$('input').attr('disabled', false);
  };

  IsraelSignupView.prototype.onSubmitForm = function(e) {
    var data, queryParams, res;
    e.preventDefault();
    forms.clearFormAlerts(this.$el);
    this.state.set('formError', null);
    data = forms.formToObject(e.currentTarget);
    res = tv4.validateMultiple(data, formSchema);
    if (!res.valid) {
      forms.applyErrorsToForm(this.$('form'), res.errors);
      return;
    }
    queryParams = this.state.get('queryParams');
    this.displayFormSubmitting();
    return User.checkNameConflicts(data.name).then((function(_this) {
      return function(arg) {
        var conflicts, nameField, school, suggestedName, suggestedNameText;
        suggestedName = arg.suggestedName, conflicts = arg.conflicts;
        nameField = _this.$('input[name="name"]');
        if (conflicts) {
          suggestedNameText = $.i18n.t('signup.name_taken').replace('{{suggestedName}}', suggestedName);
          forms.setErrorToField(nameField, suggestedNameText);
          throw AbortError;
        }
        school = _.pick(queryParams, 'state', 'city', 'district');
        if (queryParams.school) {
          school.name = queryParams.school;
        }
        me.set(_.pick(queryParams, 'firstName', 'lastName', 'israelId'));
        me.set({
          school: school
        });
        return me.save();
      };
    })(this)).then((function(_this) {
      return function() {
        return me.signupWithPassword(_this.state.get('name'), queryParams.email || '', _this.state.get('password'));
      };
    })(this)).then((function(_this) {
      return function() {
        return application.router.navigate('/play', {
          trigger: true
        });
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        _this.displayFormStandingBy();
        if (e === AbortError) {

        } else {
          console.error('IsraelSignupView form submission Promise error:', e);
          return _this.state.set('formError', ((ref = e.responseJSON) != null ? ref.message : void 0) || e.message || 'Unknown Error');
        }
      };
    })(this));
  };

  return IsraelSignupView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/account/IsraelSignupView.js.map
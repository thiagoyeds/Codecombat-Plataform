require.register("templates/core/auth-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),showRequiredError = locals_.showRequiredError,view = locals_.view,translate = locals_.translate;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/modal/auth/login-background.png\" draggable=\"false\" class=\"auth-modal-background\"/><h1 data-i18n=\"login.log_in\"></h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div></div><div class=\"auth-form-content\">");
if ( showRequiredError)
{
buf.push("<div class=\"alert alert-success\"><span data-i18n=\"signup.required\"></span></div>");
}
buf.push("<div id=\"unknown-error-alert\" data-i18n=\"loading_error.unknown\" class=\"alert alert-danger hide\"></div><form class=\"form\"><div class=\"form-group\"><label for=\"username-or-email-input\" class=\"control-label\"><span data-i18n=\"login.email_or_username\"></span>:</label><div class=\"input-border\"><input" + (jade.attrs({ 'id':('username-or-email-input'), 'name':("emailOrUsername"), 'value':(view.previousFormInputs.email), "class": [('input-large'),('form-control')] }, {"name":true,"value":true})) + "/></div></div><div class=\"form-group\"><div id=\"recover-account-wrapper\"><a id=\"link-to-recover\" data-toggle=\"coco-modal\" data-target=\"core/RecoverModal\" data-i18n=\"login.forgot_password\"></a></div><label for=\"password\" class=\"control-label\"><span data-i18n=\"general.password\"></span>:</label><div class=\"input-border\"><input" + (jade.attrs({ 'id':('password-input'), 'name':("password"), 'type':("password"), 'value':(view.previousFormInputs.password), "class": [('input-large'),('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div></div><input" + (jade.attrs({ 'id':('login-btn'), 'value':(translate("login.log_in")), 'type':("submit"), "class": [('btn'),('btn-lg'),('btn-illustrated'),('btn-block'),('btn-success')] }, {"value":true,"type":true})) + "/></form><div class=\"wait secret\"><h3 data-i18n=\"login.logging_in\"></h3></div></div><div class=\"auth-network-logins\"><!-- GitHub login complete, but the button does not fit in with the design yet. Hidden for now--><!--div.network-login--><!--  btn.btn.btn-sm.github-login-button#github-login-button--><!--    img(src=\"/images/pages/modal/auth/github_icon.png\")--><!--    | GitHub--><button id=\"facebook-login-btn\" disabled=\"disabled\" class=\"btn btn-primary btn-lg btn-illustrated network-login\"><img src=\"/images/pages/community/logo_facebook.png\" draggable=\"false\" class=\"network-logo\"/><span data-i18n=\"login.sign_in_with_facebook\" class=\"sign-in-blurb\"></span></button><button id=\"gplus-login-btn\" disabled=\"disabled\" class=\"btn btn-danger btn-lg btn-illustrated network-login\"><img src=\"/images/pages/community/logo_g+.png\" draggable=\"false\" class=\"network-logo\"/><span data-i18n=\"login.sign_in_with_gplus\" class=\"sign-in-blurb\"></span><div class=\"gplus-login-wrapper\"><div class=\"gplus-login-button\"></div></div></button></div><div class=\"extra-pane\"><div data-i18n=\"login.signup_switch\" class=\"switch-explanation\"></div><div id=\"switch-to-signup-btn\" data-i18n=\"login.sign_up\" class=\"btn btn-lg btn-illustrated btn-warning\"></div></div></div>");;return buf.join("");
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

;require.register("views/core/AuthModal", function(exports, require, module) {
var AuthModal, ModalView, User, application, errors, formSchema, forms, loginNavigate, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/core/auth-modal');

forms = require('core/forms');

User = require('models/User');

application = require('core/application');

errors = require('core/errors');

module.exports = AuthModal = (function(superClass) {
  extend(AuthModal, superClass);

  function AuthModal() {
    this.onFacebookLoginError = bind(this.onFacebookLoginError, this);
    this.onGPlusLoginError = bind(this.onGPlusLoginError, this);
    return AuthModal.__super__.constructor.apply(this, arguments);
  }

  AuthModal.prototype.id = 'auth-modal';

  AuthModal.prototype.template = template;

  AuthModal.prototype.events = {
    'click #switch-to-signup-btn': 'onSignupInstead',
    'submit form': 'onSubmitForm',
    'keyup #name': 'onNameChange',
    'click #gplus-login-btn': 'onClickGPlusLoginButton',
    'click #facebook-login-btn': 'onClickFacebookLoginButton',
    'click #close-modal': 'hide'
  };

  AuthModal.prototype.initialize = function(options) {
    var base;
    if (options == null) {
      options = {};
    }
    this.previousFormInputs = options.initialValues || {};
    if ((base = this.previousFormInputs).emailOrUsername == null) {
      base.emailOrUsername = this.previousFormInputs.email || this.previousFormInputs.username;
    }
    application.gplusHandler.loadAPI({
      success: (function(_this) {
        return function() {
          return _.defer(function() {
            return _this.$('#gplus-login-btn').attr('disabled', false);
          });
        };
      })(this)
    });
    return application.facebookHandler.loadAPI({
      success: (function(_this) {
        return function() {
          return _.defer(function() {
            return _this.$('#facebook-login-btn').attr('disabled', false);
          });
        };
      })(this)
    });
  };

  AuthModal.prototype.afterRender = function() {
    AuthModal.__super__.afterRender.call(this);
    return this.playSound('game-menu-open');
  };

  AuthModal.prototype.afterInsert = function() {
    AuthModal.__super__.afterInsert.call(this);
    return _.delay(((function(_this) {
      return function() {
        return $('input:visible:first', _this.$el).focus();
      };
    })(this)), 500);
  };

  AuthModal.prototype.onSignupInstead = function(e) {
    var CreateAccountModal, modal;
    CreateAccountModal = require('./CreateAccountModal');
    modal = new CreateAccountModal({
      initialValues: forms.formToObject(this.$el)
    });
    return currentView.openModalView(modal);
  };

  AuthModal.prototype.onSubmitForm = function(e) {
    var res, userObject;
    this.playSound('menu-button-click');
    e.preventDefault();
    forms.clearFormAlerts(this.$el);
    this.$('#unknown-error-alert').addClass('hide');
    userObject = forms.formToObject(this.$el);
    res = tv4.validateMultiple(userObject, formSchema);
    if (!res.valid) {
      return forms.applyErrorsToForm(this.$el, res.errors);
    }
    return new Promise(me.loginPasswordUser(userObject.emailOrUsername, userObject.password).then).then(function() {
      if (window.nextURL) {
        return window.location.href = window.nextURL;
      } else {
        return loginNavigate();
      }
    })["catch"]((function(_this) {
      return function(jqxhr) {
        var errorID, showingError;
        showingError = false;
        if (jqxhr.status === 401) {
          errorID = jqxhr.responseJSON.errorID;
          if (errorID === 'not-found') {
            forms.setErrorToProperty(_this.$el, 'emailOrUsername', $.i18n.t('loading_error.not_found'));
            showingError = true;
          }
          if (errorID === 'wrong-password') {
            forms.setErrorToProperty(_this.$el, 'password', $.i18n.t('account_settings.wrong_password'));
            showingError = true;
          }
        }
        if (!showingError) {
          return _this.$('#unknown-error-alert').removeClass('hide');
        }
      };
    })(this));
  };

  AuthModal.prototype.onClickGPlusLoginButton = function() {
    var btn;
    btn = this.$('#gplus-login-btn');
    return application.gplusHandler.connect({
      context: this,
      success: function() {
        btn.find('.sign-in-blurb').text($.i18n.t('login.logging_in'));
        btn.attr('disabled', true);
        return application.gplusHandler.loadPerson({
          context: this,
          success: function(gplusAttrs) {
            var existingUser;
            existingUser = new User();
            return existingUser.fetchGPlusUser(gplusAttrs.gplusID, {
              success: (function(_this) {
                return function() {
                  return me.loginGPlusUser(gplusAttrs.gplusID, {
                    success: function() {
                      return loginNavigate();
                    },
                    error: _this.onGPlusLoginError
                  });
                };
              })(this),
              error: this.onGPlusLoginError
            });
          }
        });
      }
    });
  };

  AuthModal.prototype.onGPlusLoginError = function() {
    var btn;
    btn = this.$('#gplus-login-btn');
    btn.find('.sign-in-blurb').text($.i18n.t('login.sign_in_with_gplus'));
    btn.attr('disabled', false);
    return errors.showNotyNetworkError.apply(errors, arguments);
  };

  AuthModal.prototype.onClickFacebookLoginButton = function() {
    var btn;
    btn = this.$('#facebook-login-btn');
    return application.facebookHandler.connect({
      context: this,
      success: function() {
        btn.find('.sign-in-blurb').text($.i18n.t('login.logging_in'));
        btn.attr('disabled', true);
        return application.facebookHandler.loadPerson({
          context: this,
          success: function(facebookAttrs) {
            var existingUser;
            existingUser = new User();
            return existingUser.fetchFacebookUser(facebookAttrs.facebookID, {
              success: (function(_this) {
                return function() {
                  return me.loginFacebookUser(facebookAttrs.facebookID, {
                    success: function() {
                      return loginNavigate();
                    },
                    error: _this.onFacebookLoginError
                  });
                };
              })(this),
              error: this.onFacebookLoginError
            });
          }
        });
      }
    });
  };

  AuthModal.prototype.onFacebookLoginError = function() {
    var btn;
    btn = this.$('#facebook-login-btn');
    btn.find('.sign-in-blurb').text($.i18n.t('login.sign_in_with_facebook'));
    btn.attr('disabled', false);
    return errors.showNotyNetworkError.apply(errors, arguments);
  };

  AuthModal.prototype.onHidden = function() {
    AuthModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  return AuthModal;

})(ModalView);

formSchema = {
  type: 'object',
  properties: {
    emailOrUsername: {
      $or: [User.schema.properties.name, User.schema.properties.email]
    },
    password: User.schema.properties.password
  },
  required: ['emailOrUsername', 'password']
};

loginNavigate = function() {
  if (me.isStudent() && !me.isAdmin()) {
    application.router.navigate('/students', {
      trigger: true
    });
  } else if (me.isTeacher() && !me.isAdmin()) {
    application.router.navigate('/teachers/classes', {
      trigger: true
    });
  }
  return window.location.reload();
};
});

;
//# sourceMappingURL=/javascripts/app/views/core/AuthModal.js.map
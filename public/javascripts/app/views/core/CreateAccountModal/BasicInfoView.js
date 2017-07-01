require.register("views/core/CreateAccountModal/BasicInfoView", function(exports, require, module) {
var AuthModal, BasicInfoView, CocoView, State, User, errors, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

AuthModal = require('views/core/AuthModal');

template = require('templates/core/create-account-modal/basic-info-view');

forms = require('core/forms');

errors = require('core/errors');

User = require('models/User');

State = require('models/State');


/*
This view handles the primary form for user details — name, email, password, etc,
and the AJAX that actually creates the user.

It also handles facebook/g+ login, which if used, open one of two other screens:
sso-already-exists: If the facebook/g+ connection is already associated with a user, they're given a log in button
sso-confirm: If this is a new facebook/g+ connection, ask for a username, then allow creation of a user

The sso-confirm view *inherits from this view* in order to share its account-creation logic and events.
This means the selectors used in these events must work in both templates.

This view currently uses the old form API instead of stateful render.
It needs some work to make error UX and rendering better, but is functional.
 */

module.exports = BasicInfoView = (function(superClass) {
  extend(BasicInfoView, superClass);

  function BasicInfoView() {
    return BasicInfoView.__super__.constructor.apply(this, arguments);
  }

  BasicInfoView.prototype.id = 'basic-info-view';

  BasicInfoView.prototype.template = template;

  BasicInfoView.prototype.events = {
    'change input[name="email"]': 'onChangeEmail',
    'change input[name="name"]': 'onChangeName',
    'change input[name="password"]': 'onChangePassword',
    'click .back-button': 'onClickBackButton',
    'submit form': 'onSubmitForm',
    'click .use-suggested-name-link': 'onClickUseSuggestedNameLink',
    'click #facebook-signup-btn': 'onClickSsoSignupButton',
    'click #gplus-signup-btn': 'onClickSsoSignupButton'
  };

  BasicInfoView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
    this.state = new State({
      suggestedNameText: '...',
      checkEmailState: 'standby',
      checkEmailValue: null,
      checkEmailPromise: null,
      checkNameState: 'standby',
      checkNameValue: null,
      checkNamePromise: null,
      error: ''
    });
    this.listenTo(this.state, 'change:checkEmailState', function() {
      return this.renderSelectors('.email-check');
    });
    this.listenTo(this.state, 'change:checkNameState', function() {
      return this.renderSelectors('.name-check');
    });
    this.listenTo(this.state, 'change:error', function() {
      return this.renderSelectors('.error-area');
    });
    this.listenTo(this.signupState, 'change:facebookEnabled', function() {
      return this.renderSelectors('.auth-network-logins');
    });
    return this.listenTo(this.signupState, 'change:gplusEnabled', function() {
      return this.renderSelectors('.auth-network-logins');
    });
  };

  BasicInfoView.prototype.updateAuthModalInitialValues = function(values) {
    return this.signupState.set({
      authModalInitialValues: _.merge(this.signupState.get('authModalInitialValues'), values)
    }, {
      silent: true
    });
  };

  BasicInfoView.prototype.onChangeEmail = function(e) {
    this.updateAuthModalInitialValues({
      email: this.$(e.currentTarget).val()
    });
    return this.checkEmail();
  };

  BasicInfoView.prototype.checkEmail = function() {
    var email;
    email = this.$('[name="email"]').val();
    if (this.signupState.get('path') !== 'student' && (!_.isEmpty(email) && email === this.state.get('checkEmailValue'))) {
      return this.state.get('checkEmailPromise');
    }
    if (!(email && forms.validateEmail(email))) {
      this.state.set({
        checkEmailState: 'standby',
        checkEmailValue: email,
        checkEmailPromise: null
      });
      return Promise.resolve();
    }
    this.state.set({
      checkEmailState: 'checking',
      checkEmailValue: email,
      checkEmailPromise: User.checkEmailExists(email).then((function(_this) {
        return function(arg) {
          var exists;
          exists = arg.exists;
          if (email !== _this.$('[name="email"]').val()) {
            return;
          }
          if (exists) {
            return _this.state.set('checkEmailState', 'exists');
          } else {
            return _this.state.set('checkEmailState', 'available');
          }
        };
      })(this))["catch"]((function(_this) {
        return function(e) {
          _this.state.set('checkEmailState', 'standby');
          throw e;
        };
      })(this))
    });
    return this.state.get('checkEmailPromise');
  };

  BasicInfoView.prototype.onChangeName = function(e) {
    this.updateAuthModalInitialValues({
      name: this.$(e.currentTarget).val()
    });
    return this.checkName();
  };

  BasicInfoView.prototype.checkName = function() {
    var name;
    name = this.$('input[name="name"]').val();
    if (name === this.state.get('checkNameValue')) {
      return this.state.get('checkNamePromise');
    }
    if (!name) {
      this.state.set({
        checkNameState: 'standby',
        checkNameValue: name,
        checkNamePromise: null
      });
      return Promise.resolve();
    }
    this.state.set({
      checkNameState: 'checking',
      checkNameValue: name,
      checkNamePromise: User.checkNameConflicts(name).then((function(_this) {
        return function(arg) {
          var conflicts, suggestedName, suggestedNameText;
          suggestedName = arg.suggestedName, conflicts = arg.conflicts;
          if (name !== _this.$('input[name="name"]').val()) {
            return;
          }
          if (conflicts) {
            suggestedNameText = $.i18n.t('signup.name_taken').replace('{{suggestedName}}', suggestedName);
            return _this.state.set({
              checkNameState: 'exists',
              suggestedNameText: suggestedNameText
            });
          } else {
            return _this.state.set({
              checkNameState: 'available'
            });
          }
        };
      })(this))["catch"]((function(_this) {
        return function(error) {
          _this.state.set('checkNameState', 'standby');
          throw error;
        };
      })(this))
    });
    return this.state.get('checkNamePromise');
  };

  BasicInfoView.prototype.onChangePassword = function(e) {
    return this.updateAuthModalInitialValues({
      password: this.$(e.currentTarget).val()
    });
  };

  BasicInfoView.prototype.checkBasicInfo = function(data) {
    var res;
    tv4.addFormat({
      'email': function(email) {
        if (forms.validateEmail(email)) {
          return null;
        } else {
          return {
            code: tv4.errorCodes.FORMAT_CUSTOM,
            message: "Please enter a valid email address."
          };
        }
      }
    });
    forms.clearFormAlerts(this.$el);
    if (data.name && forms.validateEmail(data.name)) {
      forms.setErrorToProperty(this.$el, 'name', $.i18n.t('signup.name_is_email'));
      return false;
    }
    res = tv4.validateMultiple(data, this.formSchema());
    if (!res.valid) {
      forms.applyErrorsToForm(this.$('form'), res.errors);
    }
    return res.valid;
  };

  BasicInfoView.prototype.formSchema = function() {
    return {
      type: 'object',
      properties: {
        email: User.schema.properties.email,
        name: User.schema.properties.name,
        password: User.schema.properties.password
      },
      required: ['name', 'password'].concat((this.signupState.get('path') === 'student' ? ['firstName', 'lastName'] : ['email']))
    };
  };

  BasicInfoView.prototype.onClickBackButton = function() {
    return this.trigger('nav-back');
  };

  BasicInfoView.prototype.onClickUseSuggestedNameLink = function(e) {
    this.$('input[name="name"]').val(this.state.get('suggestedName'));
    return forms.clearFormAlerts(this.$el.find('input[name="name"]').closest('.form-group').parent());
  };

  BasicInfoView.prototype.onSubmitForm = function(e) {
    var AbortError, data, valid;
    this.state.unset('error');
    e.preventDefault();
    data = forms.formToObject(e.currentTarget);
    valid = this.checkBasicInfo(data);
    if (!valid) {
      return;
    }
    this.displayFormSubmitting();
    AbortError = new Error();
    return this.checkEmail().then(this.checkName()).then((function(_this) {
      return function() {
        var emails, jqxhr, ref;
        if (!(((ref = _this.state.get('checkEmailState')) === 'available' || ref === 'standby') && _this.state.get('checkNameState') === 'available')) {
          throw AbortError;
        }
        emails = _.assign({}, me.get('emails'));
        if (emails.generalNews == null) {
          emails.generalNews = {};
        }
        emails.generalNews.enabled = _this.$('#subscribe-input').is(':checked') && !_.isEmpty(_this.state.get('checkEmailValue'));
        me.set('emails', emails);
        me.set(_.pick(data, 'firstName', 'lastName'));
        if (!_.isNaN(_this.signupState.get('birthday').getTime())) {
          me.set('birthday', _this.signupState.get('birthday').toISOString());
        }
        me.set(_.omit(_this.signupState.get('ssoAttrs') || {}, 'email', 'facebookID', 'gplusID'));
        jqxhr = me.save();
        if (!jqxhr) {
          console.error(me.validationError);
          throw new Error('Could not save user');
        }
        return new Promise(jqxhr.then);
      };
    })(this)).then((function(_this) {
      return function() {
        var email, facebookID, gplusID, jqxhr, name, password, ref, ref1, ref2, ref3;
        if ((ref = window.tracker) != null) {
          ref.identify();
        }
        switch (_this.signupState.get('ssoUsed')) {
          case 'gplus':
            ref1 = _this.signupState.get('ssoAttrs'), email = ref1.email, gplusID = ref1.gplusID;
            name = forms.formToObject(_this.$el).name;
            jqxhr = me.signupWithGPlus(name, email, gplusID);
            break;
          case 'facebook':
            ref2 = _this.signupState.get('ssoAttrs'), email = ref2.email, facebookID = ref2.facebookID;
            name = forms.formToObject(_this.$el).name;
            jqxhr = me.signupWithFacebook(name, email, facebookID);
            break;
          default:
            ref3 = forms.formToObject(_this.$el), name = ref3.name, email = ref3.email, password = ref3.password;
            jqxhr = me.signupWithPassword(name, email, password);
        }
        return new Promise(jqxhr.then);
      };
    })(this)).then((function(_this) {
      return function() {
        var classCode, classroom, ref;
        ref = _this.signupState.attributes, classCode = ref.classCode, classroom = ref.classroom;
        if (classCode && classroom) {
          return new Promise(classroom.joinWithCode(classCode).then);
        }
      };
    })(this)).then((function(_this) {
      return function() {
        return _this.finishSignup();
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        _this.displayFormStandingBy();
        if (e === AbortError) {

        } else {
          console.error('BasicInfoView form submission Promise error:', e);
          return _this.state.set('error', ((ref = e.responseJSON) != null ? ref.message : void 0) || 'Unknown Error');
        }
      };
    })(this));
  };

  BasicInfoView.prototype.finishSignup = function() {
    return this.trigger('signup');
  };

  BasicInfoView.prototype.displayFormSubmitting = function() {
    this.$('#create-account-btn').text($.i18n.t('signup.creating')).attr('disabled', true);
    return this.$('input').attr('disabled', true);
  };

  BasicInfoView.prototype.displayFormStandingBy = function() {
    this.$('#create-account-btn').text($.i18n.t('login.sign_up')).attr('disabled', false);
    return this.$('input').attr('disabled', false);
  };

  BasicInfoView.prototype.onClickSsoSignupButton = function(e) {
    var handler, ssoUsed;
    e.preventDefault();
    ssoUsed = $(e.currentTarget).data('sso-used');
    handler = ssoUsed === 'facebook' ? application.facebookHandler : application.gplusHandler;
    return handler.connect({
      context: this,
      success: function() {
        return handler.loadPerson({
          context: this,
          success: function(ssoAttrs) {
            var email;
            this.signupState.set({
              ssoAttrs: ssoAttrs
            });
            email = ssoAttrs.email;
            return User.checkEmailExists(email).then((function(_this) {
              return function(arg) {
                var exists;
                exists = arg.exists;
                _this.signupState.set({
                  ssoUsed: ssoUsed,
                  email: ssoAttrs.email
                });
                if (exists) {
                  return _this.trigger('sso-connect:already-in-use');
                } else {
                  return _this.trigger('sso-connect:new-user');
                }
              };
            })(this));
          }
        });
      }
    });
  };

  return BasicInfoView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/BasicInfoView.js.map
require.register("views/core/CreateAccountModal/CreateAccountModal", function(exports, require, module) {
var AuthModal, BasicInfoView, ChooseAccountTypeView, ConfirmationView, CoppaDenyView, CreateAccountModal, ExtrasView, ModalView, SegmentCheckView, SingleSignOnAlreadyExistsView, SingleSignOnConfirmView, State, User, application, errors, forms, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

AuthModal = require('views/core/AuthModal');

ChooseAccountTypeView = require('./ChooseAccountTypeView');

SegmentCheckView = require('./SegmentCheckView');

CoppaDenyView = require('./CoppaDenyView');

BasicInfoView = require('./BasicInfoView');

SingleSignOnAlreadyExistsView = require('./SingleSignOnAlreadyExistsView');

SingleSignOnConfirmView = require('./SingleSignOnConfirmView');

ExtrasView = require('./ExtrasView');

ConfirmationView = require('./ConfirmationView');

State = require('models/State');

template = require('templates/core/create-account-modal/create-account-modal');

forms = require('core/forms');

User = require('models/User');

application = require('core/application');

errors = require('core/errors');

utils = require('core/utils');


/*
CreateAccountModal is a wizard-style modal with several subviews, one for each
`screen` that the user navigates forward and back through.

There are three `path`s, one for each account type (individual, student).
Teacher account path will be added later; for now it defers to /teachers/signup)
Each subview handles only one `screen`, but all three `path` variants because
their logic is largely the same.

They `screen`s are:
  choose-account-type: Sets the `path`.
  segment-check: Checks required info for the path (age, )
    coppa-deny: Seen if the indidual segment-check age is < 13 years old
  basic-info: This is the form for username/password/email/etc.
              It asks for whatever is needed for this type of user.
              It also handles the actual user creation.
              A user may create their account here, or connect with facebook/g+
    sso-confirm: Alternate version of basic-info for new facebook/g+ users
  sso-already-exists: When facebook/g+ user already exists, this prompts them to sign in.
  extras: Not yet implemented
  confirmation: When an account has been successfully created, this view shows them their info and
    links them to a landing page based on their account type.

NOTE: BasicInfoView's two children (SingleSignOn...View) inherit from it.
This allows them to have the same form-handling logic, but different templates.
 */

module.exports = CreateAccountModal = (function(superClass) {
  extend(CreateAccountModal, superClass);

  function CreateAccountModal() {
    return CreateAccountModal.__super__.constructor.apply(this, arguments);
  }

  CreateAccountModal.prototype.id = 'create-account-modal';

  CreateAccountModal.prototype.template = template;

  CreateAccountModal.prototype.closesOnClickOutside = false;

  CreateAccountModal.prototype.retainSubviews = true;

  CreateAccountModal.prototype.events = {
    'click .login-link': 'onClickLoginLink'
  };

  CreateAccountModal.prototype.initialize = function(options) {
    var classCode, startOnPath;
    if (options == null) {
      options = {};
    }
    classCode = utils.getQueryVariable('_cc', void 0);
    this.signupState = new State({
      path: classCode ? 'student' : null,
      screen: classCode ? 'segment-check' : 'choose-account-type',
      ssoUsed: null,
      classroom: null,
      facebookEnabled: application.facebookHandler.apiLoaded,
      gplusEnabled: application.gplusHandler.apiLoaded,
      classCode: classCode,
      birthday: new Date(''),
      authModalInitialValues: {},
      accountCreated: false
    });
    startOnPath = options.startOnPath;
    if (startOnPath === 'student') {
      this.signupState.set({
        path: 'student',
        screen: 'segment-check'
      });
    }
    if (startOnPath === 'individual') {
      this.signupState.set({
        path: 'individual',
        screen: 'segment-check'
      });
    }
    this.listenTo(this.signupState, 'all', _.debounce(this.render));
    this.listenTo(this.insertSubView(new ChooseAccountTypeView()), {
      'choose-path': function(path) {
        if (path === 'teacher') {
          return application.router.navigate('/teachers/signup', {
            trigger: true
          });
        } else {
          return this.signupState.set({
            path: path,
            screen: 'segment-check'
          });
        }
      }
    });
    this.listenTo(this.insertSubView(new SegmentCheckView({
      signupState: this.signupState
    })), {
      'choose-path': function(path) {
        return this.signupState.set({
          path: path,
          screen: 'segment-check'
        });
      },
      'nav-back': function() {
        return this.signupState.set({
          path: null,
          screen: 'choose-account-type'
        });
      },
      'nav-forward': function(screen) {
        return this.signupState.set({
          screen: screen || 'basic-info'
        });
      }
    });
    this.listenTo(this.insertSubView(new CoppaDenyView({
      signupState: this.signupState
    })), {
      'nav-back': function() {
        return this.signupState.set({
          screen: 'segment-check'
        });
      }
    });
    this.listenTo(this.insertSubView(new BasicInfoView({
      signupState: this.signupState
    })), {
      'sso-connect:already-in-use': function() {
        return this.signupState.set({
          screen: 'sso-already-exists'
        });
      },
      'sso-connect:new-user': function() {
        return this.signupState.set({
          screen: 'sso-confirm'
        });
      },
      'nav-back': function() {
        return this.signupState.set({
          screen: 'segment-check'
        });
      },
      'signup': function() {
        if (this.signupState.get('path') === 'student') {
          return this.signupState.set({
            screen: 'extras',
            accountCreated: true
          });
        } else {
          return this.signupState.set({
            screen: 'confirmation',
            accountCreated: true
          });
        }
      }
    });
    this.listenTo(this.insertSubView(new SingleSignOnAlreadyExistsView({
      signupState: this.signupState
    })), {
      'nav-back': function() {
        return this.signupState.set({
          screen: 'basic-info'
        });
      }
    });
    this.listenTo(this.insertSubView(new SingleSignOnConfirmView({
      signupState: this.signupState
    })), {
      'nav-back': function() {
        return this.signupState.set({
          screen: 'basic-info'
        });
      },
      'signup': function() {
        if (this.signupState.get('path') === 'student') {
          return this.signupState.set({
            screen: 'extras',
            accountCreated: true
          });
        } else {
          return this.signupState.set({
            screen: 'confirmation',
            accountCreated: true
          });
        }
      }
    });
    this.listenTo(this.insertSubView(new ExtrasView({
      signupState: this.signupState
    })), {
      'nav-forward': function() {
        return this.signupState.set({
          screen: 'confirmation'
        });
      }
    });
    this.insertSubView(new ConfirmationView({
      signupState: this.signupState
    }));
    application.facebookHandler.loadAPI({
      success: (function(_this) {
        return function() {
          if (!_this.destroyed) {
            return _this.signupState.set({
              facebookEnabled: true
            });
          }
        };
      })(this)
    });
    application.gplusHandler.loadAPI({
      success: (function(_this) {
        return function() {
          if (!_this.destroyed) {
            return _this.signupState.set({
              gplusEnabled: true
            });
          }
        };
      })(this)
    });
    return this.once('hidden', function() {
      if (this.signupState.get('accountCreated') && !application.testing) {
        if (me.isStudent()) {
          application.router.navigate('/students', {
            trigger: true
          });
        } else if (me.isTeacher()) {
          application.router.navigate('/teachers/classes', {
            trigger: true
          });
        }
        return window.location.reload();
      }
    });
  };

  CreateAccountModal.prototype.onClickLoginLink = function() {
    return this.openModalView(new AuthModal({
      initialValues: this.signupState.get('authModalInitialValues')
    }));
  };

  return CreateAccountModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/CreateAccountModal.js.map
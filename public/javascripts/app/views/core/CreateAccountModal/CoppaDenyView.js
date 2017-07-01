require.register("views/core/CreateAccountModal/CoppaDenyView", function(exports, require, module) {
var CocoView, CoppaDenyView, State, contact, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

State = require('models/State');

template = require('templates/core/create-account-modal/coppa-deny-view');

forms = require('core/forms');

contact = require('core/contact');

module.exports = CoppaDenyView = (function(superClass) {
  extend(CoppaDenyView, superClass);

  function CoppaDenyView() {
    return CoppaDenyView.__super__.constructor.apply(this, arguments);
  }

  CoppaDenyView.prototype.id = 'coppa-deny-view';

  CoppaDenyView.prototype.template = template;

  CoppaDenyView.prototype.events = {
    'click .send-parent-email-button': 'onClickSendParentEmailButton',
    'change input[name="parentEmail"]': 'onChangeParentEmail',
    'click .back-btn': 'onClickBackButton'
  };

  CoppaDenyView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
    this.state = new State({
      parentEmail: ''
    });
    return this.listenTo(this.state, 'all', _.debounce(this.render));
  };

  CoppaDenyView.prototype.onChangeParentEmail = function(e) {
    return this.state.set({
      parentEmail: $(e.currentTarget).val()
    }, {
      silent: true
    });
  };

  CoppaDenyView.prototype.onClickSendParentEmailButton = function(e) {
    e.preventDefault();
    this.state.set({
      parentEmailSending: true
    });
    return contact.sendParentSignupInstructions(this.state.get('parentEmail')).then((function(_this) {
      return function() {
        return _this.state.set({
          error: false,
          parentEmailSent: true,
          parentEmailSending: false
        });
      };
    })(this))["catch"]((function(_this) {
      return function() {
        return _this.state.set({
          error: true,
          parentEmailSent: false,
          parentEmailSending: false
        });
      };
    })(this));
  };

  CoppaDenyView.prototype.onClickBackButton = function() {
    return this.trigger('nav-back');
  };

  return CoppaDenyView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/CoppaDenyView.js.map
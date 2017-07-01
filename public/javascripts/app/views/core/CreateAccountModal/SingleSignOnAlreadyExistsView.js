require.register("views/core/CreateAccountModal/SingleSignOnAlreadyExistsView", function(exports, require, module) {
var CocoView, SingleSignOnAlreadyExistsView, User, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/core/create-account-modal/single-sign-on-already-exists-view');

forms = require('core/forms');

User = require('models/User');

module.exports = SingleSignOnAlreadyExistsView = (function(superClass) {
  extend(SingleSignOnAlreadyExistsView, superClass);

  function SingleSignOnAlreadyExistsView() {
    return SingleSignOnAlreadyExistsView.__super__.constructor.apply(this, arguments);
  }

  SingleSignOnAlreadyExistsView.prototype.id = 'single-sign-on-already-exists-view';

  SingleSignOnAlreadyExistsView.prototype.template = template;

  SingleSignOnAlreadyExistsView.prototype.events = {
    'click .back-button': 'onClickBackButton'
  };

  SingleSignOnAlreadyExistsView.prototype.initialize = function(arg) {
    this.signupState = arg.signupState;
  };

  SingleSignOnAlreadyExistsView.prototype.onClickBackButton = function() {
    this.signupState.set({
      ssoUsed: void 0,
      ssoAttrs: void 0
    });
    return this.trigger('nav-back');
  };

  return SingleSignOnAlreadyExistsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/SingleSignOnAlreadyExistsView.js.map
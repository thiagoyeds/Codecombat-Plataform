require.register("views/core/CreateAccountModal/SingleSignOnConfirmView", function(exports, require, module) {
var BasicInfoView, CocoView, SingleSignOnConfirmView, User, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

BasicInfoView = require('views/core/CreateAccountModal/BasicInfoView');

template = require('templates/core/create-account-modal/single-sign-on-confirm-view');

forms = require('core/forms');

User = require('models/User');

module.exports = SingleSignOnConfirmView = (function(superClass) {
  extend(SingleSignOnConfirmView, superClass);

  function SingleSignOnConfirmView() {
    return SingleSignOnConfirmView.__super__.constructor.apply(this, arguments);
  }

  SingleSignOnConfirmView.prototype.id = 'single-sign-on-confirm-view';

  SingleSignOnConfirmView.prototype.template = template;

  SingleSignOnConfirmView.prototype.events = _.extend({}, BasicInfoView.prototype.events, {
    'click .back-button': 'onClickBackButton'
  });

  SingleSignOnConfirmView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
    return SingleSignOnConfirmView.__super__.initialize.apply(this, arguments);
  };

  SingleSignOnConfirmView.prototype.onClickBackButton = function() {
    this.signupState.set({
      ssoUsed: void 0,
      ssoAttrs: void 0
    });
    return this.trigger('nav-back');
  };

  SingleSignOnConfirmView.prototype.formSchema = function() {
    return {
      type: 'object',
      properties: {
        name: User.schema.properties.name
      },
      required: ['name']
    };
  };

  return SingleSignOnConfirmView;

})(BasicInfoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/SingleSignOnConfirmView.js.map
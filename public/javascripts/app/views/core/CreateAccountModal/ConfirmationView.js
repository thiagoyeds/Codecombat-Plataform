require.register("views/core/CreateAccountModal/ConfirmationView", function(exports, require, module) {
var CocoView, ConfirmationView, State, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

State = require('models/State');

template = require('templates/core/create-account-modal/confirmation-view');

forms = require('core/forms');

module.exports = ConfirmationView = (function(superClass) {
  extend(ConfirmationView, superClass);

  function ConfirmationView() {
    return ConfirmationView.__super__.constructor.apply(this, arguments);
  }

  ConfirmationView.prototype.id = 'confirmation-view';

  ConfirmationView.prototype.template = template;

  ConfirmationView.prototype.events = {
    'click #start-btn': 'onClickStartButton'
  };

  ConfirmationView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
  };

  ConfirmationView.prototype.onClickStartButton = function() {
    var classroom;
    classroom = this.signupState.get('classroom');
    if (this.signupState.get('path') === 'student') {
      application.router.navigate('/', {
        replace: true
      });
      application.router.navigate('/students');
    } else {
      application.router.navigate('/play');
    }
    return document.location.reload();
  };

  return ConfirmationView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/ConfirmationView.js.map
require.register("views/core/CreateAccountModal/ChooseAccountTypeView", function(exports, require, module) {
var ChooseAccountTypeView, CocoView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/core/create-account-modal/choose-account-type-view');

module.exports = ChooseAccountTypeView = (function(superClass) {
  extend(ChooseAccountTypeView, superClass);

  function ChooseAccountTypeView() {
    return ChooseAccountTypeView.__super__.constructor.apply(this, arguments);
  }

  ChooseAccountTypeView.prototype.id = 'choose-account-type-view';

  ChooseAccountTypeView.prototype.template = template;

  ChooseAccountTypeView.prototype.events = {
    'click .teacher-path-button': function() {
      return this.trigger('choose-path', 'teacher');
    },
    'click .student-path-button': function() {
      return this.trigger('choose-path', 'student');
    },
    'click .individual-path-button': function() {
      return this.trigger('choose-path', 'individual');
    }
  };

  return ChooseAccountTypeView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/ChooseAccountTypeView.js.map
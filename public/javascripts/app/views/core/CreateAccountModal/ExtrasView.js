require.register("views/core/CreateAccountModal/ExtrasView", function(exports, require, module) {
var CocoView, ExtrasView, HeroSelectView, State, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

HeroSelectView = require('views/core/HeroSelectView');

template = require('templates/core/create-account-modal/extras-view');

State = require('models/State');

module.exports = ExtrasView = (function(superClass) {
  extend(ExtrasView, superClass);

  function ExtrasView() {
    return ExtrasView.__super__.constructor.apply(this, arguments);
  }

  ExtrasView.prototype.id = 'extras-view';

  ExtrasView.prototype.template = template;

  ExtrasView.prototype.retainSubviews = true;

  ExtrasView.prototype.events = {
    'click .next-button': function() {
      return this.trigger('nav-forward');
    }
  };

  ExtrasView.prototype.initialize = function(arg) {
    this.signupState = (arg != null ? arg : {}).signupState;
    return this.insertSubView(new HeroSelectView({
      showCurrentHero: false,
      createAccount: true
    }));
  };

  return ExtrasView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/CreateAccountModal/ExtrasView.js.map
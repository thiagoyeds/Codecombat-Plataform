require.register("views/CLAView", function(exports, require, module) {
var CLAView, RootView, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/cla');

me = require('core/auth').me;

module.exports = CLAView = (function(superClass) {
  extend(CLAView, superClass);

  function CLAView() {
    this.onAgreeFailed = bind(this.onAgreeFailed, this);
    this.onAgreeSucceeded = bind(this.onAgreeSucceeded, this);
    return CLAView.__super__.constructor.apply(this, arguments);
  }

  CLAView.prototype.id = 'cla-view';

  CLAView.prototype.template = template;

  CLAView.prototype.events = {
    'click #agreement-button': 'onAgree'
  };

  CLAView.prototype.onAgree = function() {
    this.$el.find('#agreement-button').prop('disabled', true).text('Saving');
    return $.ajax({
      url: '/db/user/me/agreeToCLA',
      data: {
        'githubUsername': this.$el.find('#github-username').val()
      },
      method: 'POST',
      success: this.onAgreeSucceeded,
      error: this.onAgreeFailed
    });
  };

  CLAView.prototype.onAgreeSucceeded = function() {
    return this.$el.find('#agreement-button').text('Success');
  };

  CLAView.prototype.onAgreeFailed = function() {
    return this.$el.find('#agreement-button').text('Failed');
  };

  return CLAView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/CLAView.js.map
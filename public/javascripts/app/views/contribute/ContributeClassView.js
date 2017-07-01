require.register("views/contribute/ContributeClassView", function(exports, require, module) {
var ContributeClassView, CreateAccountModal, RootView, contributorListTemplate, contributorSignupAnonymousTemplate, contributorSignupTemplate, me,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CreateAccountModal = require('views/core/CreateAccountModal');

RootView = require('views/core/RootView');

me = require('core/auth').me;

contributorSignupAnonymousTemplate = require('templates/contribute/contributor_signup_anonymous');

contributorSignupTemplate = require('templates/contribute/contributor_signup');

contributorListTemplate = require('templates/contribute/contributor_list');

module.exports = ContributeClassView = (function(superClass) {
  extend(ContributeClassView, superClass);

  function ContributeClassView() {
    return ContributeClassView.__super__.constructor.apply(this, arguments);
  }

  ContributeClassView.prototype.events = {
    'change input[type="checkbox"]': 'onCheckboxChanged'
  };

  ContributeClassView.prototype.afterRender = function() {
    var checkboxes;
    ContributeClassView.__super__.afterRender.call(this);
    this.$el.find('.contributor-signup-anonymous').replaceWith(contributorSignupAnonymousTemplate({
      me: me
    }));
    this.$el.find('.contributor-signup').each(function() {
      var context;
      context = {
        me: me,
        contributorClassName: $(this).data('contributor-class-name')
      };
      return $(this).replaceWith(contributorSignupTemplate(context));
    });
    this.$el.find('#contributor-list').replaceWith(contributorListTemplate({
      contributors: this.contributors,
      contributorClassName: this.contributorClassName
    }));
    checkboxes = this.$el.find('input[type="checkbox"]').toArray();
    return _.forEach(checkboxes, function(el) {
      el = $(el);
      if (me.isEmailSubscriptionEnabled(el.attr('name') + 'News')) {
        return el.prop('checked', true);
      }
    });
  };

  ContributeClassView.prototype.onCheckboxChanged = function(e) {
    var checked, el, subscription;
    el = $(e.target);
    checked = el.prop('checked');
    subscription = el.attr('name');
    me.setEmailSubscription(subscription + 'News', checked);
    me.patch();
    if (me.get('anonymous')) {
      this.openModalView(new CreateAccountModal());
    }
    return el.parent().find('.saved-notification').finish().show('fast').delay(3000).fadeOut(2000);
  };

  return ContributeClassView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/ContributeClassView.js.map
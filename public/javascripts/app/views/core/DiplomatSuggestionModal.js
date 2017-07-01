require.register("views/core/DiplomatSuggestionModal", function(exports, require, module) {
var DiplomatSuggestionModal, ModalView, forms, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/core/diplomat-suggestion');

me = require('core/auth').me;

forms = require('core/forms');

module.exports = DiplomatSuggestionModal = (function(superClass) {
  extend(DiplomatSuggestionModal, superClass);

  function DiplomatSuggestionModal() {
    return DiplomatSuggestionModal.__super__.constructor.apply(this, arguments);
  }

  DiplomatSuggestionModal.prototype.id = 'diplomat-suggestion-modal';

  DiplomatSuggestionModal.prototype.template = template;

  DiplomatSuggestionModal.prototype.events = {
    'click #subscribe-button': 'subscribeAsDiplomat'
  };

  DiplomatSuggestionModal.prototype.subscribeAsDiplomat = function() {
    me.setEmailSubscription('diplomatNews', true);
    me.patch();
    $('#email_translator').prop('checked', 1);
    this.hide();
    noty({
      text: $.i18n.t('account_settings.saved'),
      layout: 'topCenter',
      timeout: 5000,
      type: 'information'
    });
    return Backbone.Mediator.publish('router:navigate', {
      route: "/contribute/diplomat"
    });
  };

  return DiplomatSuggestionModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/DiplomatSuggestionModal.js.map
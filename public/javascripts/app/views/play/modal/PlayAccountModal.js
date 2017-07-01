require.register("templates/play/modal/play-account-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"nav.account\">Account</h3></div><div class=\"modal-body\"><div id=\"account-settings-view\"></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div id=\"save-button\" data-i18n=\"delta.no_changes\" disabled=\"true\" class=\"btn-lg btn disabled\">No Changes</div></div></div></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/modal/PlayAccountModal", function(exports, require, module) {
var AccountSettingsView, ModalView, PlayAccountModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/play-account-modal');

AccountSettingsView = require('views/account/AccountSettingsView');

module.exports = PlayAccountModal = (function(superClass) {
  extend(PlayAccountModal, superClass);

  PlayAccountModal.prototype.className = 'modal fade play-modal';

  PlayAccountModal.prototype.template = template;

  PlayAccountModal.prototype.plain = true;

  PlayAccountModal.prototype.id = 'play-account-modal';

  PlayAccountModal.prototype.events = {
    'click #save-button': function() {
      return this.accountSettingsView.save();
    }
  };

  function PlayAccountModal(options) {
    PlayAccountModal.__super__.constructor.call(this, options);
  }

  PlayAccountModal.prototype.afterRender = function() {
    PlayAccountModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.playSound('game-menu-open');
    this.accountSettingsView = new AccountSettingsView();
    this.insertSubView(this.accountSettingsView);
    this.listenTo(this.accountSettingsView, 'input-changed', this.onInputChanged);
    this.listenTo(this.accountSettingsView, 'save-user-began', this.onUserSaveBegan);
    this.listenTo(this.accountSettingsView, 'save-user-success', this.hide);
    return this.listenTo(this.accountSettingsView, 'save-user-error', this.onUserSaveError);
  };

  PlayAccountModal.prototype.onHidden = function() {
    PlayAccountModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  PlayAccountModal.prototype.onInputChanged = function() {
    return this.$el.find('#save-button').text($.i18n.t('common.save', {
      defaultValue: 'Save'
    })).addClass('btn-info').removeClass('disabled btn-danger').removeAttr('disabled');
  };

  PlayAccountModal.prototype.onUserSaveBegan = function() {
    return this.$el.find('#save-button').text($.i18n.t('common.saving', {
      defaultValue: 'Saving...'
    })).removeClass('btn-danger').addClass('btn-success').show();
  };

  PlayAccountModal.prototype.onUserSaveError = function() {
    return this.$el.find('#save-button').text($.i18n.t('account_settings.error_saving', {
      defaultValue: 'Error Saving'
    })).removeClass('btn-success').addClass('btn-danger', 500);
  };

  return PlayAccountModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PlayAccountModal.js.map
require.register("templates/core/recover-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"recover.recover_account_title\">Recover Account</h3></div><div class=\"modal-body\"><div class=\"form\"><div class=\"form-group\"><label for=\"recover-email\" data-i18n=\"general.email\" class=\"control-label\">Email     </label><input id=\"recover-email\" name=\"email\" type=\"email\" class=\"input-large form-control\"/></div></div></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"common.sending\">Sending...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"recover-button\" data-i18n=\"recover.send_password\" class=\"btn btn-primary btn-large\">Send Recovery Password</button></div></div></div></div>");;return buf.join("");
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

;require.register("views/core/RecoverModal", function(exports, require, module) {
var ModalView, RecoverModal, filterKeyboardEvents, forms, genericFailure, template,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/core/recover-modal');

forms = require('core/forms');

genericFailure = require('core/errors').genericFailure;

filterKeyboardEvents = function(allowedEvents, func) {
  return function() {
    var e, ref, splat;
    splat = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    e = splat[0];
    if (!((ref = e.keyCode, indexOf.call(allowedEvents, ref) >= 0) || !e.keyCode)) {
      return;
    }
    return func.apply(null, splat);
  };
};

module.exports = RecoverModal = (function(superClass) {
  extend(RecoverModal, superClass);

  RecoverModal.prototype.id = 'recover-modal';

  RecoverModal.prototype.template = template;

  RecoverModal.prototype.events = {
    'click #recover-button': 'recoverAccount',
    'keydown input': 'recoverAccount'
  };

  RecoverModal.prototype.subscriptions = {
    'errors:server-error': 'onServerError'
  };

  RecoverModal.prototype.onServerError = function(e) {
    return this.disableModalInProgress(this.$el);
  };

  function RecoverModal(options) {
    this.successfullyRecovered = bind(this.successfullyRecovered, this);
    this.recoverAccount = bind(this.recoverAccount, this);
    this.recoverAccount = filterKeyboardEvents([13], this.recoverAccount);
    RecoverModal.__super__.constructor.call(this, options);
  }

  RecoverModal.prototype.recoverAccount = function(e) {
    var email, res;
    this.playSound('menu-button-click');
    forms.clearFormAlerts(this.$el);
    email = (forms.formToObject(this.$el)).email;
    if (!email) {
      return;
    }
    res = $.post('/auth/reset', {
      email: email
    }, this.successfullyRecovered);
    res.fail(genericFailure);
    return this.enableModalInProgress(this.$el);
  };

  RecoverModal.prototype.successfullyRecovered = function() {
    this.disableModalInProgress(this.$el);
    this.$el.find('.modal-body:visible').text($.i18n.t('recover.recovery_sent'));
    return this.$el.find('.modal-footer').remove();
  };

  return RecoverModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/RecoverModal.js.map
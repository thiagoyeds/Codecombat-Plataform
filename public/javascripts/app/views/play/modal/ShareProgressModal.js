require.register("templates/play/modal/share-progress-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/parental_prompt_modal_background.png\" class=\"background-img\"/><img src=\"/images/pages/play/modal/parental_nudge_wizard.png\" class=\"wizard-img\"/><div class=\"blurb-container\"> <h1 data-i18n=\"share_progress_modal.title\"></h1><p data-i18n=\"share_progress_modal.blurb\"></p><div class=\"container-fluid send-container\"><div class=\"row\"><div class=\"col-xs-12 email-form\"><p data-i18n=\"share_progress_modal.form_blurb\"></p><div><label data-i18n=\"share_progress_modal.form_label\"></label><input type=\"email\" data-i18n=\"[placeholder]share_progress_modal.placeholder\" class=\"form-control email-input\"/></div></div></div><div class=\"row\"><div class=\"col-xs-8\"><div data-i18n=\"share_progress_modal.email_invalid\" class=\"email-invalid\"></div></div><div class=\"col-xs-4 text-right\"><button data-i18n=\"common.send\" class=\"btn btn-illustrated send-btn\"></button></div></div><div class=\"row continue-container\"><div class=\"col-xs-12 text-left\"><a data-i18n=\"common.continue\" class=\"continue-link\"></a></div></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/play/modal/ShareProgressModal", function(exports, require, module) {
var ModalView, ShareProgressModal, storage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/share-progress-modal');

storage = require('core/storage');

module.exports = ShareProgressModal = (function(superClass) {
  extend(ShareProgressModal, superClass);

  function ShareProgressModal() {
    return ShareProgressModal.__super__.constructor.apply(this, arguments);
  }

  ShareProgressModal.prototype.id = 'share-progress-modal';

  ShareProgressModal.prototype.template = template;

  ShareProgressModal.prototype.plain = true;

  ShareProgressModal.prototype.closesOnClickOutside = false;

  ShareProgressModal.prototype.events = {
    'click .close-btn': 'hide',
    'click .continue-link': 'hide',
    'click .send-btn': 'onClickSend'
  };

  ShareProgressModal.prototype.onClickSend = function(e) {
    var email, request;
    email = $('.email-input').val();
    if (!/[\w\.]+@\w+\.\w+/.test(email)) {
      $('.email-input').parent().addClass('has-error');
      $('.email-invalid').show();
      return false;
    }
    request = this.supermodel.addRequestResource('send_one_time_email', {
      url: '/db/user/-/send_one_time_email',
      data: {
        email: email,
        type: 'share progress modal parent'
      },
      method: 'POST'
    }, 0);
    request.load();
    storage.save('sent-parent-email', true);
    return this.hide();
  };

  return ShareProgressModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/ShareProgressModal.js.map
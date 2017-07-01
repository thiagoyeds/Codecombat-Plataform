require.register("core/contact", function(exports, require, module) {
module.exports = {
  sendContactMessage: function(contactMessageObject, modal) {
    if (modal != null) {
      modal.find('.sending-indicator').show();
    }
    return $.post('/contact', contactMessageObject, function(response) {
      if (!modal) {
        return;
      }
      modal.find('.sending-indicator').hide();
      modal.find('#contact-message').val('Thanks!');
      return _.delay(function() {
        modal.find('#contact-message').val('');
        return modal.modal('hide');
      }, 1000);
    });
  },
  send: function(options) {
    if (options == null) {
      options = {};
    }
    options.type = 'POST';
    options.url = '/contact';
    return $.ajax(options);
  },
  sendParentSignupInstructions: function(parentEmail) {
    var jqxhr;
    jqxhr = $.ajax('/contact/send-parent-signup-instructions', {
      method: 'POST',
      data: {
        parentEmail: parentEmail
      }
    });
    return new Promise(jqxhr.then);
  }
};
});

;
//# sourceMappingURL=/javascripts/app/core/contact.js.map
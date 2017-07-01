require.register("views/core/ContactModal", function(exports, require, module) {
var ContactModal, ModalView, contactSchema, forms, sendContactMessage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/core/contact');

forms = require('core/forms');

sendContactMessage = require('core/contact').sendContactMessage;

contactSchema = {
  additionalProperties: false,
  required: ['email', 'message'],
  properties: {
    email: {
      type: 'string',
      maxLength: 100,
      minLength: 1,
      format: 'email'
    },
    message: {
      type: 'string',
      minLength: 1
    }
  }
};

module.exports = ContactModal = (function(superClass) {
  extend(ContactModal, superClass);

  function ContactModal() {
    return ContactModal.__super__.constructor.apply(this, arguments);
  }

  ContactModal.prototype.id = 'contact-modal';

  ContactModal.prototype.template = template;

  ContactModal.prototype.closeButton = true;

  ContactModal.prototype.events = {
    'click #contact-submit-button': 'contact'
  };

  ContactModal.prototype.contact = function() {
    var contactMessage, ref, res;
    this.playSound('menu-button-click');
    forms.clearFormAlerts(this.$el);
    contactMessage = forms.formToObject(this.$el);
    res = tv4.validateMultiple(contactMessage, contactSchema);
    if (!res.valid) {
      return forms.applyErrorsToForm(this.$el, res.errors);
    }
    this.populateBrowserData(contactMessage);
    contactMessage = _.merge(contactMessage, this.options);
    contactMessage.country = me.get('country');
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Sent Feedback', {
        message: contactMessage
      });
    }
    sendContactMessage(contactMessage, this.$el);
    return $.post("/db/user/" + me.id + "/track/contact_codecombat");
  };

  ContactModal.prototype.populateBrowserData = function(context) {
    var ref, ref1;
    if ($.browser) {
      context.browser = $.browser.platform + " " + $.browser.name + " " + $.browser.versionNumber;
    }
    context.screenSize = ((ref = typeof screen !== "undefined" && screen !== null ? screen.width : void 0) != null ? ref : $(window).width()) + " x " + ((ref1 = typeof screen !== "undefined" && screen !== null ? screen.height : void 0) != null ? ref1 : $(window).height());
    return context.screenshotURL = this.screenshotURL;
  };

  ContactModal.prototype.updateScreenshot = function() {
    var screenshotEl;
    if (!this.screenshotURL) {
      return;
    }
    screenshotEl = this.$el.find('#contact-screenshot').removeClass('secret');
    screenshotEl.find('a').prop('href', this.screenshotURL.replace("http://codecombat.com/", "/"));
    return screenshotEl.find('img').prop('src', this.screenshotURL.replace("http://codecombat.com/", "/"));
  };

  return ContactModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/ContactModal.js.map
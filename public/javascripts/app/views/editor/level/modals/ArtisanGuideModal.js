require.register("views/editor/level/modals/ArtisanGuideModal", function(exports, require, module) {
var ArtisanGuideModal, ModalView, contactSchema, forms, sendContactMessage, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/artisan-guide-modal');

forms = require('core/forms');

sendContactMessage = require('core/contact').sendContactMessage;

contactSchema = {
  additionalProperties: false,
  required: ['creditName', 'levelPurpose', 'levelInspiration', 'levelLocation'],
  properties: {
    creditName: {
      type: 'string'
    },
    levelPurpose: {
      type: 'string'
    },
    levelInspiration: {
      type: 'string'
    },
    levelLocation: {
      type: 'string'
    }
  }
};

module.exports = ArtisanGuideModal = (function(superClass) {
  extend(ArtisanGuideModal, superClass);

  function ArtisanGuideModal() {
    return ArtisanGuideModal.__super__.constructor.apply(this, arguments);
  }

  ArtisanGuideModal.prototype.id = 'artisan-guide-modal';

  ArtisanGuideModal.prototype.template = template;

  ArtisanGuideModal.prototype.events = {
    'click #level-submit': 'levelSubmit'
  };

  ArtisanGuideModal.prototype.initialize = function(options) {
    this.level = options.level;
    return this.options = {
      level: this.level.get('name'),
      levelSlug: this.level.get('slug')
    };
  };

  ArtisanGuideModal.prototype.levelSubmit = function() {
    var contactMessage, res, results;
    this.playSound('menu-button-click');
    forms.clearFormAlerts(this.$el);
    results = forms.formToObject(this.$el);
    res = tv4.validateMultiple(results, contactSchema);
    if (!res.valid) {
      return forms.applyErrorsToForm(this.$el, res.errors);
    }
    contactMessage = {
      message: "User Name: " + results.creditName + "\nLevel: <a href=\"http://codecombat.com/editor/level/" + this.options.levelSlug + "\">" + this.options.level + "</a>\nPurpose: " + results.levelPurpose + "\nInspiration: " + results.levelInspiration + "\nLocation: " + results.levelLocation
    };
    this.populateBrowserData(contactMessage);
    contactMessage = _.merge(contactMessage, this.options);
    contactMessage.country = me.get('country');
    sendContactMessage(contactMessage, this.$el);
    return $.post("/db/user/" + me.id + "/track/contact_codecombat");
  };

  ArtisanGuideModal.prototype.populateBrowserData = function(context) {
    var ref, ref1;
    if ($.browser) {
      context.browser = $.browser.platform + " " + $.browser.name + " " + $.browser.versionNumber;
    }
    context.screenSize = ((ref = typeof screen !== "undefined" && screen !== null ? screen.width : void 0) != null ? ref : $(window).width()) + " x " + ((ref1 = typeof screen !== "undefined" && screen !== null ? screen.height : void 0) != null ? ref1 : $(window).height());
    return context.screenshotURL = this.screenshotURL;
  };

  ArtisanGuideModal.prototype.hasOwnership = function() {
    if (this.level.getOwner() === me.id) {
      return true;
    }
    return false;
  };

  return ArtisanGuideModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/ArtisanGuideModal.js.map
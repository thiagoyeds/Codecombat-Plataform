require.register("templates/teachers/purchase-starter-licenses-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3 data-i18n=\"special_offer.purchase_starter_licenses\"></h3></div></div><div class=\"modal-body\"><p data-i18n=\"special_offer.starter_licenses_can_be_used\"></p><div class=\"text-center input-row m-t-3 m-b-3\"><input" + (jade.attrs({ 'name':("quantity"), 'type':("number"), 'min':(0), 'max':(state.get('quantityAllowedToPurchase')), 'value':(state.get('quantityToBuy')) }, {"name":true,"type":true,"min":true,"max":true,"value":true})) + "/><span>x</span><span class=\"dollar-value render\">" + (jade.escape(null == (jade.interp = view.getDollarsPerStudentString()) ? "" : jade.interp)) + "</span><span>=</span><span class=\"dollar-value render\">" + (jade.escape(null == (jade.interp = view.getTotalPriceString()) ? "" : jade.interp)) + "</span></div><div class=\"text-center render\">");
var quantityIsValid = (state.get('quantityToBuy') > 0)
buf.push("<button" + (jade.attrs({ 'disabled':(!quantityIsValid), 'className':((quantityIsValid ? 'disabled' : '')), "class": [('pay-now-btn'),('btn-lg'),('btn-navy')] }, {"disabled":true,"className":true})) + "><span data-i18n=\"special_offer.pay_now\"></span></button></div><p data-i18n=\"special_offer.we_accept_all_major_credit_cards\" class=\"text-center m-t-1\"></p><p class=\"text-center purchase-progress-message render\">" + (jade.escape(null == (jade.interp = state.get('purchaseProgressMessage')) ? "" : jade.interp)) + "</p><p class=\"small m-t-5\"><span" + (jade.attrs({ 'data-i18n':("[html]special_offer.license_limit_description"), 'data-i18n-options':(JSON.stringify(view.i18nData())) }, {"data-i18n":true,"data-i18n-options":true})) + "></span></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div>");;return buf.join("");
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

;require.register("views/teachers/PurchaseStarterLicensesModal", function(exports, require, module) {
var ModalView, Prepaids, Products, PurchaseStarterLicensesModal, State, stripeHandler, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

State = require('models/State');

utils = require('core/utils');

Products = require('collections/Products');

Prepaids = require('collections/Prepaids');

stripeHandler = require('core/services/stripe');

module.exports = PurchaseStarterLicensesModal = (function(superClass) {
  extend(PurchaseStarterLicensesModal, superClass);

  function PurchaseStarterLicensesModal() {
    return PurchaseStarterLicensesModal.__super__.constructor.apply(this, arguments);
  }

  PurchaseStarterLicensesModal.prototype.id = 'purchase-starter-licenses-modal';

  PurchaseStarterLicensesModal.prototype.template = require('templates/teachers/purchase-starter-licenses-modal');

  PurchaseStarterLicensesModal.prototype.maxQuantityStarterLicenses = 75;

  PurchaseStarterLicensesModal.prototype.i18nData = function() {
    return {
      maxQuantityStarterLicenses: this.maxQuantityStarterLicenses,
      starterLicenseLengthMonths: 6,
      quantityAlreadyPurchased: this.state.get('quantityAlreadyPurchased'),
      supportEmail: "<a href='mailto:support@codecombat.com'>support@codecombat.com</a>"
    };
  };

  PurchaseStarterLicensesModal.prototype.events = {
    'input input[name="quantity"]': 'onInputQuantity',
    'change input[name="quantity"]': 'onInputQuantity',
    'click .pay-now-btn': 'onClickPayNowButton'
  };

  PurchaseStarterLicensesModal.prototype.initialize = function(options) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Purchase Starter License: Modal Opened', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.listenTo(stripeHandler, 'received-token', this.onStripeReceivedToken);
    this.state = new State({
      quantityToBuy: 10,
      centsPerStudent: void 0,
      dollarsPerStudent: void 0,
      quantityAlreadyPurchased: void 0,
      quantityAllowedToPurchase: void 0
    });
    this.products = new Products();
    this.supermodel.loadCollection(this.products, 'products');
    this.listenTo(this.products, 'sync change update', function() {
      var starterLicense;
      starterLicense = this.products.findWhere({
        name: 'starter_license'
      });
      return this.state.set({
        centsPerStudent: starterLicense.get('amount'),
        dollarsPerStudent: starterLicense.get('amount') / 100
      });
    });
    this.prepaids = new Prepaids();
    this.supermodel.trackRequest(this.prepaids.fetchByCreator(me.id));
    this.listenTo(this.prepaids, 'sync change update', function() {
      var quantityAllowedToPurchase, quantityAlreadyPurchased, starterLicenses;
      starterLicenses = new Prepaids(this.prepaids.where({
        type: 'starter_license'
      }));
      quantityAlreadyPurchased = starterLicenses.totalMaxRedeemers();
      quantityAllowedToPurchase = this.maxQuantityStarterLicenses - quantityAlreadyPurchased;
      return this.state.set({
        quantityAlreadyPurchased: quantityAlreadyPurchased,
        quantityAllowedToPurchase: quantityAllowedToPurchase,
        quantityToBuy: Math.min(this.state.get('quantityToBuy'), quantityAllowedToPurchase)
      });
    });
    this.listenTo(this.state, 'change', (function(_this) {
      return function() {
        return _this.renderSelectors('.render');
      };
    })(this));
    return PurchaseStarterLicensesModal.__super__.initialize.call(this, options);
  };

  PurchaseStarterLicensesModal.prototype.onLoaded = function() {
    return PurchaseStarterLicensesModal.__super__.onLoaded.call(this);
  };

  PurchaseStarterLicensesModal.prototype.getDollarsPerStudentString = function() {
    return utils.formatDollarValue(this.state.get('dollarsPerStudent'));
  };

  PurchaseStarterLicensesModal.prototype.getTotalPriceString = function() {
    return utils.formatDollarValue(this.state.get('dollarsPerStudent') * this.state.get('quantityToBuy'));
  };

  PurchaseStarterLicensesModal.prototype.boundedValue = function(value) {
    return Math.max(Math.min(value, this.state.get('quantityAllowedToPurchase')), 0);
  };

  PurchaseStarterLicensesModal.prototype.onInputQuantity = function(e) {
    var $input, boundedValue, inputValue;
    $input = $(e.currentTarget);
    inputValue = parseFloat($input.val()) || 0;
    boundedValue = inputValue;
    if ($input.val() !== '') {
      boundedValue = this.boundedValue(inputValue);
      if (boundedValue !== inputValue) {
        $input.val(boundedValue);
      }
    }
    return this.state.set({
      quantityToBuy: boundedValue
    });
  };

  PurchaseStarterLicensesModal.prototype.onClickPayNowButton = function() {
    var ref, ref1;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Purchase Starter License: Pay Now Clicked', {
        category: 'Teachers'
      }, ['Mixpanel']);
    }
    this.state.set({
      purchaseProgress: void 0,
      purchaseProgressMessage: void 0
    });
    if ((ref1 = application.tracker) != null) {
      ref1.trackEvent('Started course prepaid purchase', {
        price: this.state.get('centsPerStudent'),
        students: this.state.get('quantityToBuy')
      });
    }
    return stripeHandler.open({
      amount: this.state.get('quantityToBuy') * this.state.get('centsPerStudent'),
      description: "Starter course access for " + (this.state.get('quantityToBuy')) + " students",
      bitcoin: true,
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
    });
  };

  PurchaseStarterLicensesModal.prototype.onStripeReceivedToken = function(e) {
    var data;
    this.state.set({
      purchaseProgress: 'purchasing'
    });
    if (typeof this.render === "function") {
      this.render();
    }
    data = {
      maxRedeemers: this.state.get('quantityToBuy'),
      type: 'starter_license',
      stripe: {
        token: e.token.id,
        timestamp: new Date().getTime()
      }
    };
    return $.ajax({
      url: '/db/starter-license-prepaid',
      data: data,
      method: 'POST',
      context: this,
      success: function() {
        var ref;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Finished starter license purchase', {
            price: this.state.get('centsPerStudent'),
            seats: this.state.get('quantityToBuy')
          });
        }
        this.state.set({
          purchaseProgress: 'purchased'
        });
        return application.router.navigate('/teachers/licenses', {
          trigger: true
        });
      },
      error: function(jqxhr, textStatus, errorThrown) {
        var ref, ref1;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Failed starter license purchase', {
            status: textStatus
          });
        }
        if (jqxhr.status === 402) {
          this.state.set({
            purchaseProgress: 'error',
            purchaseProgressMessage: arguments[2]
          });
        } else {
          this.state.set({
            purchaseProgress: 'error',
            purchaseProgressMessage: jqxhr.status + ": " + (((ref1 = jqxhr.responseJSON) != null ? ref1.message : void 0) || 'Unknown Error')
          });
        }
        return typeof this.render === "function" ? this.render() : void 0;
      }
    });
  };

  return PurchaseStarterLicensesModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/PurchaseStarterLicensesModal.js.map
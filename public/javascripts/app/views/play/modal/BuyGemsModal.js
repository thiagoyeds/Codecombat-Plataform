require.register("templates/play/modal/buy-gems-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"> ");
if ( view.state === 'purchasing')
{
buf.push("<div data-i18n=\"buy_gems.purchasing\" class=\"alert alert-info\"></div>");
}
else if ( view.state === 'retrying')
{
buf.push("<div id=\"retrying-alert\" data-i18n=\"buy_gems.retrying\" class=\"alert alert-danger\"></div>");
}
else
{
if ( (me.get('preferredLanguage',true) || 'en-US').split('-')[0] == 'nl')
{
buf.push("<img src=\"/images/pages/play/modal/lang-nl/buy-gems-background-NL.png\" id=\"buy-gems-background\"/>");
}
else
{
buf.push("<img src=\"/images/pages/play/modal/buy-gems-background.png\" id=\"buy-gems-background\"/>");
}
buf.push("<h1 data-i18n=\"play.buy_gems\"> </h1><div id=\"products\">");
if ( view.supermodel.finished())
{
// iterate view.products.models
;(function(){
  var $$obj = view.products.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var product = $$obj[$index];

buf.push("<div class=\"product\"><h4>x" + (jade.escape((jade.interp = product.get('gems')) == null ? '' : jade.interp)) + "</h4><h3" + (jade.attrs({ 'data-i18n':(product.get('i18n')) }, {"data-i18n":true})) + "></h3><button" + (jade.attrs({ 'value':(product.get('name')), "class": [('btn'),('btn-illustrated'),('btn-lg')] }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = product.get('priceString')) ? "" : jade.interp)) + "</span></button></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var product = $$obj[$index];

buf.push("<div class=\"product\"><h4>x" + (jade.escape((jade.interp = product.get('gems')) == null ? '' : jade.interp)) + "</h4><h3" + (jade.attrs({ 'data-i18n':(product.get('i18n')) }, {"data-i18n":true})) + "></h3><button" + (jade.attrs({ 'value':(product.get('name')), "class": [('btn'),('btn-illustrated'),('btn-lg')] }, {"value":true})) + "><span>" + (jade.escape(null == (jade.interp = product.get('priceString')) ? "" : jade.interp)) + "</span></button></div>");
    }

  }
}).call(this);

if ( (me.get('preferredLanguage',true) || 'en-US').split('-')[0] == 'nl')
{
buf.push("<div class=\"product\"><h4 class=\"subscription-gem-amount\">x{{gems}} / mo</h4><h3> \n1, 3, 6 OF 12 <br/>MAANDEN</h3><a href=\"http://www.codecombat.nl/kopen\" target=\"_blank\"><button class=\"btn btn-ideal btn-illustrated btn-lg btn-succes\">PREPAID CODES</button></a></div>");
}
buf.push("<div class=\"product\"><h4 class=\"subscription-gem-amount\">x{{gems}} / mo</h4><h3 data-i18n=\"account.subscription\"></h3>");
if ( me.hasSubscription())
{
buf.push("<button class=\"disabled start-subscription-button btn btn-lg btn-illustrated btn-success\">✓ <span data-i18n=\"account.subscribed\"></span></button>");
}
else
{
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-illustrated btn-success\">Subscribe</button>");
}
buf.push("</div>");
}
buf.push("</div>");
if ( view.state === 'declined')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;      </span></button></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div id=\"error-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
if ( view.state === 'recovered_charge')
{
buf.push("<div id=\"recovered-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.recovered\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");
}
buf.push("<div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div>");
}
buf.push("</div></div>");;return buf.join("");
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

;require.register("views/play/modal/BuyGemsModal", function(exports, require, module) {
var BuyGemsModal, ModalView, Products, SubscribeModal, stripeHandler, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/buy-gems-modal');

stripeHandler = require('core/services/stripe');

utils = require('core/utils');

SubscribeModal = require('views/core/SubscribeModal');

Products = require('collections/Products');

module.exports = BuyGemsModal = (function(superClass) {
  extend(BuyGemsModal, superClass);

  BuyGemsModal.prototype.id = (me.get('preferredLanguage', true) || 'en-US').split('-')[0] === 'nl' ? 'buy-gems-modal-nl' : 'buy-gems-modal';

  BuyGemsModal.prototype.template = template;

  BuyGemsModal.prototype.plain = true;

  BuyGemsModal.prototype.subscriptions = {
    'ipad:products': 'onIPadProducts',
    'ipad:iap-complete': 'onIAPComplete',
    'stripe:received-token': 'onStripeReceivedToken'
  };

  BuyGemsModal.prototype.events = {
    'click .product button:not(.start-subscription-button)': 'onClickProductButton',
    'click #close-modal': 'hide',
    'click .start-subscription-button': 'onClickStartSubscription'
  };

  function BuyGemsModal(options) {
    BuyGemsModal.__super__.constructor.call(this, options);
    this.timestampForPurchase = new Date().getTime();
    this.state = 'standby';
    this.products = new Products();
    this.products.comparator = 'amount';
    if (application.isIPadApp) {
      this.products = [];
      Backbone.Mediator.publish('buy-gems-modal:update-products');
    } else {
      this.supermodel.loadCollection(this.products, 'products');
      $.post('/db/payment/check-stripe-charges', (function(_this) {
        return function(something, somethingElse, jqxhr) {
          if (jqxhr.status === 201) {
            _this.state = 'recovered_charge';
            return _this.render();
          }
        };
      })(this));
    }
  }

  BuyGemsModal.prototype.onLoaded = function() {
    var countrySpecificProduct;
    this.basicProduct = this.products.findWhere({
      name: 'basic_subscription'
    });
    if (countrySpecificProduct = this.products.findWhere({
      name: (me.get('country')) + "_basic_subscription"
    })) {
      this.basicProduct = countrySpecificProduct;
    }
    this.products.reset(this.products.filter(function(product) {
      return _.string.startsWith(product.get('name'), 'gems_');
    }));
    return BuyGemsModal.__super__.onLoaded.call(this);
  };

  BuyGemsModal.prototype.afterRender = function() {
    BuyGemsModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.playSound('game-menu-open');
    if (this.basicProduct) {
      return this.$el.find('.subscription-gem-amount').text($.i18n.t('buy_gems.price').replace('{{gems}}', this.basicProduct.get('gems')));
    }
  };

  BuyGemsModal.prototype.onHidden = function() {
    BuyGemsModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  BuyGemsModal.prototype.onIPadProducts = function(e) {};

  BuyGemsModal.prototype.onClickProductButton = function(e) {
    var product, productID, ref;
    this.playSound('menu-button-click');
    productID = $(e.target).closest('button').val();
    if (productID.length === 0) {
      return;
    }
    product = this.products.findWhere({
      name: productID
    });
    if (application.isIPadApp) {
      Backbone.Mediator.publish('buy-gems-modal:purchase-initiated', {
        productID: productID
      });
    } else {
      if ((ref = application.tracker) != null) {
        ref.trackEvent('Started gem purchase', {
          productID: productID
        });
      }
      stripeHandler.open({
        description: $.t(product.get('i18n')),
        amount: product.get('amount'),
        bitcoin: true,
        alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
      });
    }
    return this.productBeingPurchased = product;
  };

  BuyGemsModal.prototype.onStripeReceivedToken = function(e) {
    var data, jqxhr;
    data = {
      productID: this.productBeingPurchased.get('name'),
      stripe: {
        token: e.token.id,
        timestamp: this.timestampForPurchase
      }
    };
    this.state = 'purchasing';
    this.render();
    jqxhr = $.post('/db/payment', data);
    jqxhr.done((function(_this) {
      return function() {
        var ref;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Finished gem purchase', {
            productID: _this.productBeingPurchased.get('name'),
            value: _this.productBeingPurchased.get('amount')
          });
        }
        return document.location.reload();
      };
    })(this));
    return jqxhr.fail((function(_this) {
      return function() {
        var f;
        if (jqxhr.status === 402) {
          _this.state = 'declined';
          _this.stateMessage = arguments[2];
        } else if (jqxhr.status === 500) {
          _this.state = 'retrying';
          f = _.bind(_this.onStripeReceivedToken, _this, e);
          _.delay(f, 2000);
        } else {
          _this.state = 'unknown_error';
          _this.stateMessage = jqxhr.status + ": " + jqxhr.responseText;
        }
        return _this.render();
      };
    })(this));
  };

  BuyGemsModal.prototype.onIAPComplete = function(e) {
    var product, purchased, ref;
    product = this.products.findWhere({
      name: e.productID
    });
    purchased = (ref = me.get('purchased')) != null ? ref : {};
    purchased = _.clone(purchased);
    if (purchased.gems == null) {
      purchased.gems = 0;
    }
    purchased.gems += product.gems;
    me.set('purchased', purchased);
    return this.hide();
  };

  BuyGemsModal.prototype.onClickStartSubscription = function(e) {
    var ref;
    this.openModalView(new SubscribeModal());
    return (ref = window.tracker) != null ? ref.trackEvent('Show subscription modal', {
      category: 'Subscription',
      label: 'buy gems modal'
    }) : void 0;
  };

  return BuyGemsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/BuyGemsModal.js.map
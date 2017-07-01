require.register("templates/core/subscribe-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\">");
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
buf.push("<img id=\"subscribe-background\" src=\"/images/pages/play/modal/subscribe-background-blank.png\"/><h1 data-i18n=\"subscribe.subscribe_modal_title\"></h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><div data-i18n=\"[html]subscribe.comparison_blurb\" class=\"comparison-blurb\"></div><table class=\"table table-condensed table-bordered comparison-table\"><thead><tr>");
if ( me.isOnPremiumServer())
{
buf.push("<th></th>");
}
else
{
buf.push("<th data-i18n=\"subscribe.free\" colspan=\"2\" class=\"free-cell\"></th>");
}
buf.push("<th data-i18n=\"subscribe.premium\"></th></tr></thead><tbody><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature1"), 'data-i18n-options':('{"levelsCount": ' + view.i18nData.levelsCount + ', "worldsCount": ' + view.i18nData.worldsCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + "></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"center-ok free-cell\"><span class=\"glyphicon glyphicon-ok\"></span></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature3"), 'data-i18n-options':('{"bonusLevelsCount": ' + view.i18nData.bonusLevelsCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + ">)</span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><!-- Could try testing out things like features 6-8 in a new design with more space--><!--tr--><!--  td.feature-description--><!--    span(data-i18n=\"[html]subscribe.feature7\")--><!--  if !me.isOnPremiumServer()--><!--    td.free-cell--><!--  td.center-ok--><!--    span.glyphicon.glyphicon-ok--><!--tr--><!--  td.feature-description--><!--    span(data-i18n=\"subscribe.feature6\")--><!--  if !me.isOnPremiumServer()--><!--    td.free-cell--><!--  td.center-ok--><!--    span.glyphicon.glyphicon-ok--><!--if me.getCampaignAdsGroup() === 'leaderboard-ads'--><!--  tr--><!--    td.feature-description--><!--      span(data-i18n=\"[html]subscribe.feature8\")--><!--    if !me.isOnPremiumServer()--><!--      td.free-cell--><!--    td.center-ok--><!--      span.glyphicon.glyphicon-ok--><tr><td class=\"feature-description\"><span data-i18n=\"[html]subscribe.feature_game_dev\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span data-i18n=\"[html]subscribe.feature_web_dev\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description\"><span" + (jade.attrs({ 'data-i18n':("[html]subscribe.feature2"), 'data-i18n-options':('{"heroesCount": ' + view.i18nData.heroesCount + '}') }, {"data-i18n":true,"data-i18n-options":true})) + "></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr><tr><td class=\"feature-description gem-amount\"><span data-i18n=\"[html]subscribe.feature4\"></span></td>");
if ( !me.isOnPremiumServer())
{
buf.push("<td class=\"free-cell\"></td>");
}
buf.push("<td class=\"center-ok\"><span class=\"glyphicon glyphicon-ok\"></span></td></tr></tbody></table>");
if ( view.basicProduct)
{
buf.push("<div class=\"premium-pricing\"><span data-i18n=\"subscribe.premium_pricing_prefix\"></span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span>$" + (jade.escape((jade.interp = (view.basicProduct.get('amount') / 100)) == null ? '' : jade.interp)) + "/</span><span data-i18n=\"subscribe.month\"></span><span>" + (jade.escape(null == (jade.interp = ' ') ? "" : jade.interp)) + "</span><span data-i18n=\"subscribe.premium_pricing_suffix\"></span></div><div id=\"parents-info\" data-i18n=\"subscribe.parents\"></div><div id=\"payment-methods-info\" data-i18n=\"subscribe.payment_methods\"></div>");
}
buf.push("<div class=\"subscribe-actions\">");
if ( !me.isOnPremiumServer())
{
buf.push("<button data-i18n=\"subscribe.parent_button\" class=\"btn btn-lg btn-illustrated parent-button\"></button>");
}
if ( view.yearProduct)
{
buf.push("<button data-i18n=\"subscribe.sale_button\" class=\"btn btn-lg btn-illustrated sale-button\"></button>");
}
buf.push("<button data-i18n=\"subscribe.subscribe_title\" class=\"btn btn-lg btn-illustrated purchase-button\"></button></div>");
if ( view.state === 'declined')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"buy_gems.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div id=\"error-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
}
buf.push("<div class=\"parent-button-popover-content hidden\"><div class=\"email-parent-form\"><p data-i18n=\"subscribe.parent_email_description\"></p><form><div class=\"form-group\"><label data-i18n=\"subscribe.parent_email_input_label\"></label><input type=\"email\" data-i18n=\"[placeholder]subscribe.parent_email_input_placeholder\" class=\"parent-input form-control\"/><div data-i18n=\"subscribe.parent_email_input_invalid\" class=\"parent-email-validator email_invalid\"></div></div><button type=\"submit\" data-i18n=\"subscribe.parent_email_send\" class=\"parent-send btn btn-default\"></button></form></div><div class=\"email-parent-complete\"><p data-i18n=\"subscribe.parent_email_sent\"></p><button type=\"button\" onclick=\"$('.parent-button').popover('hide');\" data-i18n=\"modal.close\" class=\"btn\"></button></div></div></div></div>");;return buf.join("");
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

;require.register("views/core/SubscribeModal", function(exports, require, module) {
var CreateAccountModal, ModalView, Products, SubscribeModal, stripeHandler, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/core/subscribe-modal');

stripeHandler = require('core/services/stripe');

utils = require('core/utils');

CreateAccountModal = require('views/core/CreateAccountModal');

Products = require('collections/Products');

module.exports = SubscribeModal = (function(superClass) {
  extend(SubscribeModal, superClass);

  SubscribeModal.prototype.id = 'subscribe-modal';

  SubscribeModal.prototype.template = template;

  SubscribeModal.prototype.plain = true;

  SubscribeModal.prototype.closesOnClickOutside = false;

  SubscribeModal.prototype.planID = 'basic';

  SubscribeModal.prototype.i18nData = {
    levelsCount: '100',
    worldsCount: '5',
    heroesCount: '16',
    bonusLevelsCount: '330'
  };

  SubscribeModal.prototype.subscriptions = {
    'stripe:received-token': 'onStripeReceivedToken'
  };

  SubscribeModal.prototype.events = {
    'click #close-modal': 'hide',
    'click .popover-content .parent-send': 'onClickParentSendButton',
    'click .email-parent-complete button': 'onClickParentEmailCompleteButton',
    'click .purchase-button': 'onClickPurchaseButton',
    'click .sale-button': 'onClickSaleButton'
  };

  function SubscribeModal(options) {
    SubscribeModal.__super__.constructor.call(this, options);
    this.state = 'standby';
    this.products = new Products();
    this.supermodel.loadCollection(this.products, 'products');
  }

  SubscribeModal.prototype.onLoaded = function() {
    var countrySpecificProduct;
    this.basicProduct = this.products.findWhere({
      name: 'basic_subscription'
    });
    this.yearProduct = this.products.findWhere({
      name: me.getYearSubscriptionGroup()
    });
    if (this.yearProduct == null) {
      this.yearProduct = this.products.findWhere({
        name: 'year_subscription'
      });
    }
    if (countrySpecificProduct = this.products.findWhere({
      name: (me.get('country')) + "_basic_subscription"
    })) {
      this.basicProduct = countrySpecificProduct;
      this.yearProduct = this.products.findWhere({
        name: (me.get('country')) + "_year_subscription"
      });
    }
    return SubscribeModal.__super__.onLoaded.call(this);
  };

  SubscribeModal.prototype.afterRender = function() {
    SubscribeModal.__super__.afterRender.call(this);
    this.setupParentButtonPopover();
    this.setupParentInfoPopover();
    this.setupPaymentMethodsInfoPopover();
    if (this.basicProduct) {
      this.$el.find('.gem-amount').html($.i18n.t('subscribe.feature4').replace('{{gems}}', this.basicProduct.get('gems')));
      if (this.basicProduct.get('gems') < 3500) {
        this.$el.find('[data-i18n="subscribe.feature6"]').parents('tr').hide();
      }
    }
    return this.playSound('game-menu-open');
  };

  SubscribeModal.prototype.setupParentButtonPopover = function() {
    var popoverContent, popoverTitle;
    popoverTitle = $.i18n.t('subscribe.parent_email_title');
    popoverTitle += '<button type="button" class="close" onclick="$(&#39;.parent-button&#39;).popover(&#39;hide&#39;);">&times;</button>';
    popoverContent = function() {
      return $('.parent-button-popover-content').html();
    };
    return this.$el.find('.parent-button').popover({
      animation: true,
      html: true,
      placement: 'top',
      trigger: 'click',
      title: popoverTitle,
      content: popoverContent,
      container: this.$el
    }).on('shown.bs.popover', (function(_this) {
      return function() {
        var ref;
        return (ref = application.tracker) != null ? ref.trackEvent('Subscription ask parent button click') : void 0;
      };
    })(this));
  };

  SubscribeModal.prototype.setupParentInfoPopover = function() {
    var levelsCompleted, popoverContent, popoverTitle, price, ref;
    if (!this.products.size()) {
      return;
    }
    popoverTitle = $.i18n.t('subscribe.parents_title');
    levelsCompleted = ((ref = me.get('stats')) != null ? ref.gamesCompleted : void 0) || 'several';
    popoverContent = "<p>" + $.i18n.t('subscribe.parents_blurb1', {
      nLevels: levelsCompleted
    }) + "</p>";
    popoverContent += "<p>" + $.i18n.t('subscribe.parents_blurb1a') + "</p>";
    popoverContent += "<p>" + $.i18n.t('subscribe.parents_blurb2') + "</p>";
    price = (this.basicProduct.get('amount') / 100).toFixed(2);
    popoverContent = popoverContent.replace('{{price}}', price);
    popoverContent += "<p>" + $.i18n.t('subscribe.parents_blurb3') + "</p>";
    return this.$el.find('#parents-info').popover({
      animation: true,
      html: true,
      placement: 'top',
      trigger: 'hover',
      title: popoverTitle,
      content: popoverContent,
      container: this.$el
    }).on('shown.bs.popover', (function(_this) {
      return function() {
        var ref1;
        return (ref1 = application.tracker) != null ? ref1.trackEvent('Subscription parent hover') : void 0;
      };
    })(this));
  };

  SubscribeModal.prototype.setupPaymentMethodsInfoPopover = function() {
    var popoverContent, popoverTitle, threeMonthPrice, yearPrice;
    if (!this.products.size()) {
      return;
    }
    popoverTitle = $.i18n.t('subscribe.payment_methods_title');
    threeMonthPrice = (this.basicProduct.get('amount') * 3 / 100).toFixed(2);
    if (this.yearProduct) {
      yearPrice = (this.yearProduct.get('amount') / 100).toFixed(2);
    } else {
      yearPrice = (this.basicProduct.get('amount') * 12 / 100).toFixed(2);
    }
    popoverTitle += '<button type="button" class="close" onclick="$(&#39;#payment-methods-info&#39;).popover(&#39;hide&#39;);">&times;</button>';
    popoverContent = "<p>" + $.i18n.t('subscribe.payment_methods_blurb1') + "</p>";
    popoverContent = popoverContent.replace('{{three_month_price}}', threeMonthPrice);
    popoverContent = popoverContent.replace('{{year_price}}', yearPrice);
    popoverContent += "<p>" + $.i18n.t('subscribe.payment_methods_blurb2') + " <a href='mailto:support@codecombat.com'>support@codecombat.com</a>.";
    return this.$el.find('#payment-methods-info').popover({
      animation: true,
      html: true,
      placement: 'top',
      trigger: 'click',
      title: popoverTitle,
      content: popoverContent,
      container: this.$el
    }).on('shown.bs.popover', (function(_this) {
      return function() {
        var ref;
        return (ref = application.tracker) != null ? ref.trackEvent('Subscription payment methods hover') : void 0;
      };
    })(this));
  };

  SubscribeModal.prototype.onClickParentSendButton = function(e) {
    var email, request;
    email = this.$el.find('.popover-content .parent-input').val();
    if (!/[\w\.]+@\w+\.\w+/.test(email)) {
      this.$el.find('.popover-content .parent-input').parent().addClass('has-error');
      this.$el.find('.popover-content .parent-email-validator').show();
      return false;
    }
    request = this.supermodel.addRequestResource('send_one_time_email', {
      url: '/db/user/-/send_one_time_email',
      data: {
        email: email,
        type: 'subscribe modal parent'
      },
      method: 'POST'
    }, 0);
    request.load();
    this.$el.find('.popover-content .email-parent-form').hide();
    this.$el.find('.popover-content .email-parent-complete').show();
    return false;
  };

  SubscribeModal.prototype.onClickParentEmailCompleteButton = function(e) {
    return this.$el.find('.parent-button').popover('hide');
  };

  SubscribeModal.prototype.onClickPurchaseButton = function(e) {
    var options, ref;
    if (!this.basicProduct) {
      return;
    }
    this.playSound('menu-button-click');
    if (me.get('anonymous')) {
      return this.openModalView(new CreateAccountModal());
    }
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Started subscription purchase');
    }
    options = {
      description: $.i18n.t('subscribe.stripe_description'),
      amount: this.basicProduct.get('amount'),
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto',
      alipayReusable: true
    };
    this.purchasedAmount = options.amount;
    return stripeHandler.open(options);
  };

  SubscribeModal.prototype.onClickSaleButton = function(e) {
    var discount, discountString, options, ref;
    this.playSound('menu-button-click');
    if (me.get('anonymous')) {
      return this.openModalView(new CreateAccountModal());
    }
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Started 1 year subscription purchase');
    }
    discount = this.basicProduct.get('amount') * 12 - this.yearProduct.get('amount');
    discountString = (discount / 100).toFixed(2);
    options = {
      description: $.i18n.t('subscribe.stripe_description_year_sale').replace('{{discount}}', discountString),
      amount: this.yearProduct.get('amount'),
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto',
      alipayReusable: true
    };
    this.purchasedAmount = options.amount;
    return stripeHandler.open(options);
  };

  SubscribeModal.prototype.onStripeReceivedToken = function(e) {
    var data, jqxhr, ref, stripe;
    this.state = 'purchasing';
    this.render();
    if (this.purchasedAmount === this.basicProduct.get('amount')) {
      stripe = _.clone((ref = me.get('stripe')) != null ? ref : {});
      stripe.planID = this.basicProduct.get('planID');
      stripe.token = e.token.id;
      me.set('stripe', stripe);
      this.listenToOnce(me, 'sync', this.onSubscriptionSuccess);
      this.listenToOnce(me, 'error', this.onSubscriptionError);
      return me.patch({
        headers: {
          'X-Change-Plan': 'true'
        }
      });
    } else if (this.purchasedAmount === this.yearProduct.get('amount')) {
      data = {
        stripe: {
          token: e.token.id,
          timestamp: new Date().getTime()
        }
      };
      jqxhr = $.post('/db/subscription/-/year_sale', data);
      jqxhr.done((function(_this) {
        return function(data, textStatus, jqXHR) {
          var ref1;
          if ((ref1 = application.tracker) != null) {
            ref1.trackEvent('Finished 1 year subscription purchase', {
              value: _this.purchasedAmount
            });
          }
          if ((data != null ? data.stripe : void 0) != null) {
            me.set('stripe', data != null ? data.stripe : void 0);
          }
          Backbone.Mediator.publish('subscribe-modal:subscribed', {});
          _this.playSound('victory');
          return _this.hide();
        };
      })(this));
      return jqxhr.fail((function(_this) {
        return function(xhr, textStatus, errorThrown) {
          var ref1, ref2;
          console.error('We got an error subscribing with Stripe from our server:', textStatus, errorThrown);
          if ((ref1 = application.tracker) != null) {
            ref1.trackEvent('Failed to finish 1 year subscription purchase', {
              status: textStatus,
              value: _this.purchasedAmount
            });
          }
          stripe = (ref2 = me.get('stripe')) != null ? ref2 : {};
          delete stripe.token;
          delete stripe.planID;
          if (xhr.status === 402) {
            _this.state = 'declined';
          } else {
            _this.state = 'unknown_error';
            _this.stateMessage = xhr.status + ": " + xhr.responseText;
          }
          return _this.render();
        };
      })(this));
    } else {
      console.error("Unexpected purchase amount received", this.purchasedAmount, e);
      this.state = 'unknown_error';
      return this.stateMessage = "Uknown problem occurred while processing Stripe request";
    }
  };

  SubscribeModal.prototype.onSubscriptionSuccess = function() {
    var ref;
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Finished subscription purchase', {
        value: this.purchasedAmount
      });
    }
    Backbone.Mediator.publish('subscribe-modal:subscribed', {});
    this.playSound('victory');
    return this.hide();
  };

  SubscribeModal.prototype.onSubscriptionError = function(user, response, options) {
    var ref, ref1, ref2, stripe, xhr;
    console.error('We got an error subscribing with Stripe from our server:', response);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Failed to finish subscription purchase', {
        status: (ref1 = options.xhr) != null ? ref1.status : void 0,
        value: this.purchasedAmount
      });
    }
    stripe = (ref2 = me.get('stripe')) != null ? ref2 : {};
    delete stripe.token;
    delete stripe.planID;
    xhr = options.xhr;
    if (xhr.status === 402) {
      this.state = 'declined';
    } else {
      this.state = 'unknown_error';
      this.stateMessage = xhr.status + ": " + xhr.responseText;
    }
    return this.render();
  };

  SubscribeModal.prototype.onHidden = function() {
    SubscribeModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  return SubscribeModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/SubscribeModal.js.map
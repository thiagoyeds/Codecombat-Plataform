require.register("templates/account/prepaid-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a href=\"/play/ladder\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a><a href=\"/community\" data-i18n=\"nav.community\"></a>");
if ( me.get('anonymous') === false)
{
buf.push("<span class=\"dropdown\"><button href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-sm header-font dropdown-toggle\">");
if ( me.get('photoURL'))
{
buf.push("<img" + (jade.attrs({ 'src':(me.getPhotoURL(18)), 'alt':(""), "class": [('account-settings-image')] }, {"src":true,"alt":true})) + "/>");
}
else
{
buf.push("<i class=\"glyphicon glyphicon-user\"></i>");
}
buf.push("<span data-i18n=\"nav.account\" href=\"/account\" class=\"spl spr\"></span><span class=\"caret\"></span></button><ul role=\"menu\" class=\"dropdown-menu\"><li class=\"user-dropdown-header\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = me.level()) ? "" : jade.interp)) + "</span><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + "") }, {"href":true})) + "><div" + (jade.attrs({ 'style':("background-image: url(" + (me.getPhotoURL()) + ")"), "class": [('img-circle')] }, {"style":true})) + "></div></a><h3>" + (jade.escape(null == (jade.interp = me.broadName()) ? "" : jade.interp)) + "</h3></li><li><a" + (jade.attrs({ 'href':("/user/" + (me.getSlugOrID()) + ""), 'data-i18n':("nav.profile") }, {"href":true,"data-i18n":true})) + "></a></li><li><a href=\"/account/settings\" data-i18n=\"play.settings\"></a></li>");
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/payments\" data-i18n=\"account.payments\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()) || me.hasSubscription())
{
buf.push("<li><a href=\"/account/subscription\" data-i18n=\"account.subscription\"></a></li>");
}
if ( me.isAdmin() || !(me.isTeacher() || me.isStudent()))
{
buf.push("<li><a href=\"/account/prepaid\" data-i18n=\"account.prepaid_codes\"></a></li>");
}
buf.push("<li><a id=\"logout-button\" data-i18n=\"login.log_out\"></a></li></ul></span>");
}
else
{
buf.push("<button data-i18n=\"login.sign_up\" class=\"btn btn-sm btn-primary header-font signup-button\"></button><button data-i18n=\"login.log_in\" class=\"btn btn-sm btn-default header-font login-button\"></button>");
}
}
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\">");
if ( me.get('anonymous'))
{
buf.push("<p data-i18n=\"account_settings.not_logged_in\">Log in or create an account to change your settings.</p>");
}
else
{
buf.push("<ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"account.prepaid_codes\" class=\"active\"></li></ol><div class=\"row\"><div class=\"col-md-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#purchasepanel\"><span data-i18n=\"account_prepaid.purchase_code\"></span></a></div></div><div" + (jade.attrs({ 'id':('purchasepanel'), "class": [('panel-collapse'),('collapse'),(view.ppcQuery ? "": "in")] }, {"class":true})) + "><div class=\"panel-body\"><p data-i18n=\"account_prepaid.purchase_code1\"></p><p data-i18n=\"account_prepaid.purchase_code2\"></p><p data-i18n=\"account_prepaid.purchase_code3\"></p><strong><p data-i18n=\"account_prepaid.purchase_code4\"></p><p><span data-i18n=\"account_prepaid.purchase_code5\" class=\"spl\"></span><span>: </span><a href=\"mailto:team@codecombat.com\">team@codecombat.com</a></p></strong><div class=\"form-horizontal\"><div class=\"form-group\"><label for=\"users\" data-i18n=\"account_prepaid.users\" class=\"control-label col-md-2\"></label><div class=\"col-md-2\"><input" + (jade.attrs({ 'id':('users-input'), 'name':("users"), 'type':("number"), 'value':("" + (view.purchase.users) + ""), 'min':(1), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"min":true})) + "/></div></div><div class=\"form-group\"><label for=\"months\" data-i18n=\"account_prepaid.months\" class=\"control-label col-md-2\"></label><div class=\"col-md-2\"><input" + (jade.attrs({ 'id':('months-input'), 'name':("months"), 'type':("number"), 'value':("" + (view.purchase.months) + ""), 'min':(1), "class": [('form-control')] }, {"name":true,"type":true,"value":true,"min":true})) + "/></div></div><div class=\"form-group\"><label data-i18n=\"account_prepaid.purchase_total\" class=\"control-label col-md-2\"></label><div class=\"col-md-10\"><p class=\"form-control-static\">$<span id=\"total\">" + (jade.escape((jade.interp = (view.purchase.total/100).toFixed(2)) == null ? '' : jade.interp)) + "</span></p></div></div><button id=\"purchase-btn\" data-i18n=\"account_prepaid.purchase_button\" class=\"btn btn-success pull-right\"></button></div></div></div></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#redeempanel\"><span data-i18n=\"account_prepaid.redeem_codes\"></span></a></div></div><div id=\"redeempanel\" class=\"panel-collapse collapse in\"><div class=\"panel-body\"><p><span data-i18n=\"account_prepaid.prepaid_code\"></span><span class=\"spr\">:</span><input" + (jade.attrs({ 'name':("ppc"), 'type':("text"), 'value':("" + (view.ppc) + ""), 'required':(true), "class": [('input-ppc')] }, {"name":true,"type":true,"value":true,"required":false})) + "/></p>");
if ( view.ppcInfo && view.ppcInfo.length > 0)
{
buf.push("<p>");
// iterate view.ppcInfo
;(function(){
  var $$obj = view.ppcInfo;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var info = $$obj[$index];

buf.push("<div>" + (null == (jade.interp = info) ? "" : jade.interp) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var info = $$obj[$index];

buf.push("<div>" + (null == (jade.interp = info) ? "" : jade.interp) + "</div>");
    }

  }
}).call(this);

buf.push("</p>");
}
buf.push("<p><span class=\"spr\"><button id=\"lookup-code-btn\" data-i18n=\"account_prepaid.lookup_code\" class=\"btn btn-info\"></button></span><span><button id=\"redeem-code-btn\" data-i18n=\"account_prepaid.apply_account\" class=\"btn btn-success\"></button></span></p></div></div></div></div></div><div class=\"row\"><div class=\"col-md-12\"><div id=\"codes-panel\" class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title\"><a data-toggle=\"collapse\" href=\"#codeslist\"><span data-i18n=\"account_prepaid.your_codes\"></span></a></div></div><div id=\"codeslist\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">");
if ( view.codes && view.codes.length)
{
buf.push("<table class=\"table table-striped\"><tr><th> <span data-i18n=\"[title]account_prepaid.copy_link;general.code\" title=\"You can copy the code's link and send it to someone.\" class=\"spr\"><span aria-hidden=\"true\" class=\"glyphicon glyphicon-question-sign\"></span></span></th><th data-i18n=\"account_prepaid.months\"></th><th>Remaining Users</th><th>Total Users</th><th data-i18n=\"user.status\"></th></tr>");
// iterate view.codes.models
;(function(){
  var $$obj = view.codes.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var code = $$obj[$index];

if ( code.get('type') === 'terminal_subscription')
{
var owner = (code.get('creator') == me.id ? true : false)
var properties = code.get('properties')
var redeemers = code.get('redeemers')
var redeemed = redeemers ? redeemers.length : 0
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/account/prepaid?_ppc=" + (code.get('code')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = code.get('code')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = properties.months || '-') ? "" : jade.interp)) + "</td>");
if ( owner)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers') - redeemed) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers')) ? "" : jade.interp)) + "</td><td data-i18n=\"account.purchased\"></td>");
}
else
{
buf.push("<td>-</td><td>-</td><td data-i18n=\"account_prepaid.redeemed\"></td>");
}
buf.push("</tr>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var code = $$obj[$index];

if ( code.get('type') === 'terminal_subscription')
{
var owner = (code.get('creator') == me.id ? true : false)
var properties = code.get('properties')
var redeemers = code.get('redeemers')
var redeemed = redeemers ? redeemers.length : 0
buf.push("<tr><td><a" + (jade.attrs({ 'href':("/account/prepaid?_ppc=" + (code.get('code')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = code.get('code')) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = properties.months || '-') ? "" : jade.interp)) + "</td>");
if ( owner)
{
buf.push("<td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers') - redeemed) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = code.get('maxRedeemers')) ? "" : jade.interp)) + "</td><td data-i18n=\"account.purchased\"></td>");
}
else
{
buf.push("<td>-</td><td>-</td><td data-i18n=\"account_prepaid.redeemed\"></td>");
}
buf.push("</tr>");
}
    }

  }
}).call(this);

buf.push("</table>");
}
else
{
buf.push("<p data-i18n=\"account_prepaid.no_codes\"></p>");
}
buf.push("</div></div></div></div></div>");
}
buf.push("</div><div class=\"achievement-corner\"></div><div id=\"site-footer\"><img id=\"footer-background\" src=\"/images/pages/base/nav_background.png\"/><div" + (jade.attrs({ 'id':('footer-links'), "class": [(features.playViewsOnly ? 'hide' : '')] }, {"class":true})) + "><a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( !me.isStudent())
{
buf.push("<a tabindex=\"-1\" data-i18n=\"nav.contact\" class=\"contact-modal\"></a>");
}
buf.push("<a href=\"http://blog.codecombat.com/\" data-i18n=\"nav.blog\"></a><a href=\"https://jobs.lever.co/codecombat\" tabindex=\"-1\" data-i18n=\"nav.careers\"></a><a href=\"/legal\" tabindex=\"-1\" data-i18n=\"nav.legal\"></a><a href=\"/privacy\" tabindex=\"-1\" data-i18n=\"legal.privacy_title\"></a><a href=\"/contribute\" tabindex=\"-1\" data-i18n=\"nav.contribute\"></a>");
if ( !me.isStudent())
{
buf.push("<a href=\"/play/ladder\" tabindex=\"-1\" data-i18n=\"game_menu.multiplayer_tab\"></a>");
}
if ( me.isAdmin())
{
buf.push("<a href=\"/admin\">Admin</a>");
}
if ( usesSocialMedia)
{
buf.push("<div class=\"share-buttons\">");
if ( !isIE)
{
buf.push("<div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div>");
}
buf.push("<div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_footer_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div>");
if ( !isIE)
{
buf.push("<a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\"></a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe>");
}
buf.push("</div>");
}
buf.push("</div><div id=\"footer-credits\"><span><span>© All Rights Reserved</span><br/><span>CodeCombat 2015</span></span><img id=\"footer-logo\" src=\"/images/pages/base/logo.png\" alt=\"CodeCombat\"/><span><span>Site Design by</span><br/><a href=\"http://www.fullyillustrated.com/\">Fully Illustrated</a></span><!--a.firebase-bade(href=\"https://www.firebase.com/\")  // Not using right now--><!--  img(src=\"/images/pages/base/firebase.png\", alt=\"Powered by Firebase\")--></div></div>");;return buf.join("");
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

;require.register("views/account/PrepaidView", function(exports, require, module) {
var CocoCollection, Prepaid, PrepaidView, Products, RedeemModal, RootView, forms, getPrepaidCodeAmount, stripeHandler, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/account/prepaid-view');

stripeHandler = require('core/services/stripe');

getPrepaidCodeAmount = require('../../core/utils').getPrepaidCodeAmount;

CocoCollection = require('collections/CocoCollection');

Prepaid = require('../../models/Prepaid');

utils = require('core/utils');

RedeemModal = require('views/account/PrepaidRedeemModal');

forms = require('core/forms');

Products = require('collections/Products');

module.exports = PrepaidView = (function(superClass) {
  extend(PrepaidView, superClass);

  function PrepaidView() {
    this.confirmRedeem = bind(this.confirmRedeem, this);
    return PrepaidView.__super__.constructor.apply(this, arguments);
  }

  PrepaidView.prototype.id = 'prepaid-view';

  PrepaidView.prototype.template = template;

  PrepaidView.prototype.className = 'container-fluid';

  PrepaidView.prototype.events = {
    'change #users-input': 'onChangeUsersInput',
    'change #months-input': 'onChangeMonthsInput',
    'click #purchase-btn': 'onClickPurchaseButton',
    'click #redeem-btn': 'onClickRedeemButton',
    'click #lookup-code-btn': 'onClickLookupCodeButton',
    'click #redeem-code-btn': 'onClickRedeemCodeButton'
  };

  PrepaidView.prototype.subscriptions = {
    'stripe:received-token': 'onStripeReceivedToken'
  };

  PrepaidView.prototype.initialize = function() {
    var ref;
    this.purchase = {
      total: 0,
      users: 3,
      months: 3
    };
    this.updateTotal();
    this.codes = new CocoCollection([], {
      url: '/db/user/' + me.id + '/prepaid_codes',
      model: Prepaid
    });
    this.codes.on('sync', (function(_this) {
      return function(code) {
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this));
    this.supermodel.loadCollection(this.codes, {
      cache: false
    });
    this.ppc = (ref = utils.getQueryVariable('_ppc')) != null ? ref : '';
    if (!_.isEmpty(this.ppc)) {
      this.ppcQuery = true;
      this.loadPrepaid(this.ppc);
    }
    this.products = new Products();
    return this.supermodel.loadCollection(this.products);
  };

  PrepaidView.prototype.onLoaded = function() {
    this.prepaidProduct = this.products.findWhere({
      name: 'prepaid_subscription'
    });
    this.updateTotal();
    return PrepaidView.__super__.onLoaded.call(this);
  };

  PrepaidView.prototype.afterRender = function() {
    PrepaidView.__super__.afterRender.call(this);
    return this.$el.find("span[title]").tooltip();
  };

  PrepaidView.prototype.statusMessage = function(message, type) {
    if (type == null) {
      type = 'alert';
    }
    return noty({
      text: message,
      layout: 'topCenter',
      type: type,
      killer: false,
      timeout: 5000,
      dismissQueue: true,
      maxVisible: 3
    });
  };

  PrepaidView.prototype.updateTotal = function() {
    if (!this.prepaidProduct) {
      return;
    }
    this.purchase.total = getPrepaidCodeAmount(this.prepaidProduct.get('amount'), this.purchase.users, this.purchase.months);
    return this.renderSelectors("#total", "#users-input", "#months-input");
  };

  PrepaidView.prototype.onChangeUsersInput = function(e) {
    var el, err, message, newAmount;
    newAmount = $(e.target).val();
    if (newAmount < 1) {
      newAmount = 1;
    }
    this.purchase.users = newAmount;
    el = $('#purchasepanel');
    if (newAmount < 3 && this.purchase.months < 3) {
      message = "Either Users or Months must be greater than 2";
      err = [
        {
          message: message,
          property: 'users',
          formatted: true
        }
      ];
      forms.clearFormAlerts(el);
      forms.applyErrorsToForm(el, err);
    } else {
      forms.clearFormAlerts(el);
    }
    return this.updateTotal();
  };

  PrepaidView.prototype.onChangeMonthsInput = function(e) {
    var el, err, message, newAmount;
    newAmount = $(e.target).val();
    if (newAmount < 1) {
      newAmount = 1;
    }
    this.purchase.months = newAmount;
    el = $('#purchasepanel');
    if (newAmount < 3 && this.purchase.users < 3) {
      message = "Either Users or Months must be greater than 2";
      err = [
        {
          message: message,
          property: 'months',
          formatted: true
        }
      ];
      forms.clearFormAlerts(el);
      forms.applyErrorsToForm(el, err);
    } else {
      forms.clearFormAlerts(el);
    }
    return this.updateTotal();
  };

  PrepaidView.prototype.onClickPurchaseButton = function(e) {
    if (!($("#users-input").val() >= 3 || $("#months-input").val() >= 3)) {
      return;
    }
    this.purchaseTimestamp = new Date().getTime();
    this.stripeAmount = this.purchase.total;
    this.description = "Prepaid Code for " + this.purchase.users + " users / " + this.purchase.months + " months";
    return stripeHandler.open({
      amount: this.stripeAmount,
      description: this.description,
      bitcoin: true,
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
    });
  };

  PrepaidView.prototype.onClickRedeemButton = function(e) {
    var options, prepaid;
    this.ppc = $('#ppc').val();
    if (!this.ppc) {
      this.statusMessage("You must enter a code.", "error");
      return;
    }
    options = {
      url: '/db/prepaid/-/code/' + this.ppc,
      method: 'GET'
    };
    options.success = (function(_this) {
      return function(model, res, options) {
        var redeemModal;
        redeemModal = new RedeemModal({
          ppc: model
        });
        redeemModal.on('confirm-redeem', _this.confirmRedeem);
        return _this.openModalView(redeemModal);
      };
    })(this);
    options.error = (function(_this) {
      return function(model, res, options) {
        return console.warn('Error getting Prepaid Code');
      };
    })(this);
    prepaid = new Prepaid();
    return prepaid.fetch(options);
  };

  PrepaidView.prototype.confirmRedeem = function() {
    var options;
    options = {
      url: '/db/subscription/-/subscribe_prepaid',
      method: 'POST',
      data: {
        ppc: this.ppc
      }
    };
    options.error = (function(_this) {
      return function(model, res, options, foo) {
        var msg, ref;
        msg = (ref = model.responseText) != null ? ref : '';
        return _this.statusMessage("Error: Could not redeem prepaid code. " + msg, "error");
      };
    })(this);
    options.success = (function(_this) {
      return function(model, res, options) {
        _this.statusMessage("Prepaid Code Redeemed!", "success");
        _this.supermodel.loadCollection(_this.codes, 'prepaid', {
          cache: false
        });
        _this.codes.fetch();
        return me.fetch({
          cache: false
        });
      };
    })(this);
    return this.supermodel.addRequestResource('subscribe_prepaid', options, 0).load();
  };

  PrepaidView.prototype.onStripeReceivedToken = function(e) {
    var options;
    options = {
      url: '/db/prepaid/-/purchase',
      method: 'POST'
    };
    options.data = {
      amount: this.stripeAmount,
      description: this.description,
      stripe: {
        token: e.token.id,
        timestamp: this.purchaseTimestamp
      },
      type: 'terminal_subscription',
      maxRedeemers: this.purchase.users,
      months: this.purchase.months
    };
    options.error = (function(_this) {
      return function(model, response, options) {
        console.error('FAILED: Prepaid purchase', response);
        console.error(options);
        return _this.statusMessage("Error purchasing prepaid code", "error");
      };
    })(this);
    options.success = (function(_this) {
      return function(model, response, options) {
        _this.statusMessage("Successfully purchased Prepaid Code!", "success");
        _this.codes.add(model);
        return _this.renderSelectors('#codes-panel');
      };
    })(this);
    this.statusMessage("Finalizing purchase...", "information");
    return this.supermodel.addRequestResource(options, 0).load();
  };

  PrepaidView.prototype.loadPrepaid = function(ppc) {
    var options;
    if (!ppc) {
      return;
    }
    options = {
      cache: false,
      method: 'GET',
      url: "/db/prepaid/-/code/" + ppc
    };
    options.success = (function(_this) {
      return function(model, res, options) {
        var maxRedeemers, months, redeemers, ref, ref1, ref2, ref3, unlocksLeft;
        _this.ppcInfo = [];
        if (model.get('type') === 'terminal_subscription') {
          months = (ref = (ref1 = model.get('properties')) != null ? ref1.months : void 0) != null ? ref : 0;
          maxRedeemers = (ref2 = model.get('maxRedeemers')) != null ? ref2 : 0;
          redeemers = (ref3 = model.get('redeemers')) != null ? ref3 : [];
          unlocksLeft = maxRedeemers - redeemers.length;
          _this.ppcInfo.push("This prepaid code adds <strong>" + months + " months of subscription</strong> to your account.");
          _this.ppcInfo.push("It can be used <strong>" + unlocksLeft + " more</strong> times.");
        } else {
          _this.ppcInfo.push("Type: " + (model.get('type')));
        }
        return typeof _this.render === "function" ? _this.render() : void 0;
      };
    })(this);
    options.error = (function(_this) {
      return function(model, res, options) {
        return _this.statusMessage("Unable to retrieve code.", "error");
      };
    })(this);
    this.prepaid = new Prepaid();
    return this.prepaid.fetch(options);
  };

  PrepaidView.prototype.onClickLookupCodeButton = function(e) {
    this.ppc = $('.input-ppc').val();
    if (!this.ppc) {
      this.statusMessage("You must enter a code.", "error");
      return;
    }
    this.ppcInfo = [];
    if (typeof this.render === "function") {
      this.render();
    }
    return this.loadPrepaid(this.ppc);
  };

  PrepaidView.prototype.onClickRedeemCodeButton = function(e) {
    var options;
    this.ppc = $('.input-ppc').val();
    options = {
      url: '/db/subscription/-/subscribe_prepaid',
      method: 'POST',
      data: {
        ppc: this.ppc
      }
    };
    options.error = (function(_this) {
      return function(model, res, options, foo) {
        var msg, ref;
        msg = (ref = model.responseText) != null ? ref : '';
        return _this.statusMessage("Error: Could not redeem prepaid code. " + msg, "error");
      };
    })(this);
    options.success = (function(_this) {
      return function(model, res, options) {
        _this.statusMessage("Prepaid applied to your account!", "success");
        _this.codes.fetch({
          cache: false
        });
        me.fetch({
          cache: false
        });
        return _this.loadPrepaid(_this.ppc);
      };
    })(this);
    return this.supermodel.addRequestResource('subscribe_prepaid', options, 0).load();
  };

  return PrepaidView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/account/PrepaidView.js.map
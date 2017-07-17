require.register("templates/account/invoices-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view,state = locals_.state,usesSocialMedia = locals_.usesSocialMedia,isIE = locals_.isIE,fbRef = locals_.fbRef;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
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
buf.push("<p data-i18n=\"account_invoices.not_logged_in\"></p>");
}
else
{
buf.push("<ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"account.invoices\" class=\"active\"></li></ol>");
if ( state === 'purchasing')
{
buf.push("<div data-i18n=\"account_invoices.purchasing\" class=\"alert alert-info\"></div>");
}
else if ( state === 'retrying')
{
buf.push("<div id=\"retrying-alert\" data-i18n=\"account_invoices.retrying\" class=\"alert alert-danger\"></div>");
}
else
{
buf.push("<div class=\"form\"><div class=\"form-group\"><label for=\"amount\" data-i18n=\"account_invoices.amount\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('amount'), 'name':("amount"), 'type':("text"), 'value':("" + ((view.amount / 100).toFixed(2)) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group\"><label for=\"description\" data-i18n=\"general.description\" class=\"control-label\"></label><input" + (jade.attrs({ 'id':('description'), 'name':("description"), 'type':("text"), 'value':("" + (view.description) + ""), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><button id=\"pay-button\" data-i18n=\"account_invoices.pay\" class=\"btn form-control btn-primary\"></button></div><br/>");
if ( view.state === 'invoice_paid')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-success alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
if ( view.state === 'validation_error')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
if ( view.state === 'declined')
{
buf.push("<div id=\"declined-alert\" class=\"alert alert-danger alert-dismissible\"><span data-i18n=\"account_invoices.declined\"></span><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button></div>");
}
if ( view.state === 'unknown_error')
{
buf.push("<div id=\"error-alert\" class=\"alert alert-danger alert-dismissible\"><button type=\"button\" data-dismiss=\"alert\" class=\"close\"><span aria-hidden=\"true\">&times;</span></button><p data-i18n=\"loading_error.unknown\"></p><p>" + (jade.escape(null == (jade.interp = view.stateMessage) ? "" : jade.interp)) + "</p></div>");
}
}
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

;require.register("views/account/InvoicesView", function(exports, require, module) {
var InvoicesView, RootView, stripeHandler, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/account/invoices-view');

stripeHandler = require('core/services/stripe');

utils = require('core/utils');

module.exports = InvoicesView = (function(superClass) {
  extend(InvoicesView, superClass);

  InvoicesView.prototype.id = "invoices-view";

  InvoicesView.prototype.template = template;

  InvoicesView.prototype.events = {
    'click #pay-button': 'onPayButton'
  };

  InvoicesView.prototype.subscriptions = {
    'stripe:received-token': 'onStripeReceivedToken'
  };

  function InvoicesView(options) {
    InvoicesView.__super__.constructor.call(this, options);
    this.amount = utils.getQueryVariable('a', 0);
    this.description = utils.getQueryVariable('d', '');
  }

  InvoicesView.prototype.onPayButton = function() {
    var amount, ref;
    this.description = $('#description').val();
    amount = parseFloat($('#amount').val());
    if (isNaN(amount) || amount <= 0) {
      this.state = 'validation_error';
      this.stateMessage = $.t('account_invoices.invalid_amount');
      this.amount = 0;
      this.render();
      return;
    }
    this.state = void 0;
    this.stateMessage = void 0;
    this.amount = parseInt(amount * 100);
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Started invoice payment');
    }
    this.timestampForPurchase = new Date().getTime();
    return stripeHandler.open({
      amount: this.amount,
      description: this.description,
      bitcoin: true,
      alipay: me.get('country') === 'china' || (me.get('preferredLanguage') || 'en-US').slice(0, 2) === 'zh' ? true : 'auto'
    });
  };

  InvoicesView.prototype.onStripeReceivedToken = function(e) {
    var data, jqxhr;
    data = {
      amount: this.amount,
      description: this.description,
      stripe: {
        token: e.token.id,
        timestamp: this.timestampForPurchase
      }
    };
    this.state = 'purchasing';
    this.render();
    jqxhr = $.post('/db/payment/custom', data);
    jqxhr.done((function(_this) {
      return function() {
        var ref;
        if ((ref = application.tracker) != null) {
          ref.trackEvent('Finished invoice payment', {
            amount: _this.amount,
            description: _this.description
          });
        }
        _this.state = 'invoice_paid';
        _this.stateMessage = ("$" + ((_this.amount / 100).toFixed(2)) + " ") + $.t('account_invoices.success');
        _this.amount = 0;
        _this.description = '';
        return _this.render();
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

  return InvoicesView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/account/InvoicesView.js.map
require.register("templates/account/account-settings-root-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),features = locals_.features,me = locals_.me,view = locals_.view;buf.push("<div id=\"site-nav\"><a href=\"/\"><img id=\"nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><div id=\"site-nav-links\"><a href=\"/\"><img id=\"small-nav-logo\" src=\"/images/pages/base/logo.png\" title=\"CodeCombat - Learn how to code by playing a game\" alt=\"CodeCombat\"/></a><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a>");
if ( !features.playViewsOnly)
{
buf.push("<a href=\"/about\" data-i18n=\"nav.about\"></a>");
if ( me.isStudent())
{
buf.push("<a href=\"/students\" data-i18n=\"nav.my_courses\"></a>");
}
if ( me.isTeacher())
{
buf.push("<a href=\"/teachers/classes\" data-i18n=\"nav.my_classrooms\"></a>");
}
if ( !me.isAnonymous() && !me.isStudent() && !me.isTeacher())
{
buf.push("<a href=\"/play\" data-i18n=\"common.play\"></a><a" + (jade.attrs({ 'href':(view.forumLink()), 'data-i18n':("nav.forum") }, {"href":true,"data-i18n":true})) + "></a>");
}
buf.push("<a href=\"/community\" data-i18n=\"nav.community\"></a>");
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
buf.push("<select class=\"language-dropdown form-control\"></select></div></div><div id=\"site-content-area\"><ol class=\"breadcrumb\"><li><a href=\"/\"><span class=\"glyphicon glyphicon-home\"></span></a></li><li><a href=\"/account\" data-i18n=\"nav.account\"></a></li><li data-i18n=\"account_settings.title\" class=\"active\"></li></ol>");
if ( !me.get('anonymous', true))
{
buf.push("<div id=\"save-button-container\"><button id=\"save-button\" data-i18n=\"delta.no_changes\" disabled=\"true\" class=\"btn-lg btn disabled\">No Changes</button></div><div id=\"account-settings-view\"></div>");
}
buf.push("</div><div class=\"achievement-corner\"></div>");;return buf.join("");
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

;require.register("views/account/AccountSettingsRootView", function(exports, require, module) {
var AccountSettingsRootView, AccountSettingsView, CreateAccountModal, RootView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

RootView = require('views/core/RootView');

template = require('templates/account/account-settings-root-view');

AccountSettingsView = require('./AccountSettingsView');

CreateAccountModal = require('views/core/CreateAccountModal');

module.exports = AccountSettingsRootView = (function(superClass) {
  extend(AccountSettingsRootView, superClass);

  function AccountSettingsRootView() {
    return AccountSettingsRootView.__super__.constructor.apply(this, arguments);
  }

  AccountSettingsRootView.prototype.id = "account-settings-root-view";

  AccountSettingsRootView.prototype.template = template;

  AccountSettingsRootView.prototype.events = {
    'click #save-button': function() {
      return this.accountSettingsView.save();
    }
  };

  AccountSettingsRootView.prototype.shortcuts = {
    'enter': function() {
      return this;
    }
  };

  AccountSettingsRootView.prototype.afterRender = function() {
    AccountSettingsRootView.__super__.afterRender.call(this);
    this.accountSettingsView = new AccountSettingsView();
    this.insertSubView(this.accountSettingsView);
    this.listenTo(this.accountSettingsView, 'input-changed', this.onInputChanged);
    this.listenTo(this.accountSettingsView, 'save-user-began', this.onUserSaveBegan);
    this.listenTo(this.accountSettingsView, 'save-user-success', this.onUserSaveSuccess);
    return this.listenTo(this.accountSettingsView, 'save-user-error', this.onUserSaveError);
  };

  AccountSettingsRootView.prototype.afterInsert = function() {
    if (me.get('anonymous')) {
      return this.openModalView(new CreateAccountModal());
    }
  };

  AccountSettingsRootView.prototype.onInputChanged = function() {
    return this.$el.find('#save-button').text($.i18n.t('common.save', {
      defaultValue: 'Save'
    })).addClass('btn-info').removeClass('disabled btn-danger').removeAttr('disabled');
  };

  AccountSettingsRootView.prototype.onUserSaveBegan = function() {
    return this.$el.find('#save-button').text($.i18n.t('common.saving', {
      defaultValue: 'Saving...'
    })).removeClass('btn-danger').addClass('btn-success').show();
  };

  AccountSettingsRootView.prototype.onUserSaveSuccess = function() {
    return this.$el.find('#save-button').text($.i18n.t('account_settings.saved', {
      defaultValue: 'Changes Saved'
    })).removeClass('btn-success btn-info', 1000).attr('disabled', 'true');
  };

  AccountSettingsRootView.prototype.onUserSaveError = function() {
    return this.$el.find('#save-button').text($.i18n.t('account_settings.error_saving', {
      defaultValue: 'Error Saving'
    })).removeClass('btn-success').addClass('btn-danger', 500);
  };

  return AccountSettingsRootView;

})(RootView);
});

;
//# sourceMappingURL=/javascripts/app/views/account/AccountSettingsRootView.js.map
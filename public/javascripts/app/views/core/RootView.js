require.register("views/core/RootView", function(exports, require, module) {
var Achievement, AchievementPopup, CocoView, RootView, filterKeyboardEvents, locale, logoutUser, me, ref, utils,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('./CocoView');

ref = require('core/auth'), logoutUser = ref.logoutUser, me = ref.me;

locale = require('locale/locale');

Achievement = require('models/Achievement');

AchievementPopup = require('views/core/AchievementPopup');

utils = require('core/utils');

filterKeyboardEvents = function(allowedEvents, func) {
  return function() {
    var e, ref1, splat;
    splat = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    e = splat[0];
    if (!((ref1 = e.keyCode, indexOf.call(allowedEvents, ref1) >= 0) || !e.keyCode)) {
      return;
    }
    return func.apply(null, splat);
  };
};

module.exports = RootView = (function(superClass) {
  extend(RootView, superClass);

  function RootView() {
    return RootView.__super__.constructor.apply(this, arguments);
  }

  RootView.prototype.showBackground = true;

  RootView.prototype.events = {
    'click #logout-button': 'logoutAccount',
    'change .language-dropdown': 'onLanguageChanged',
    'click .toggle-fullscreen': 'toggleFullscreen',
    'click .signup-button': 'onClickSignupButton',
    'click .login-button': 'onClickLoginButton',
    'click a': 'onClickAnchor',
    'click button': 'toggleModal',
    'click li': 'toggleModal',
    'treema-error': 'onTreemaError',
    'click [data-i18n]': 'onClickTranslatedElement'
  };

  RootView.prototype.subscriptions = {
    'achievements:new': 'handleNewAchievements',
    'modal:open-modal-view': 'onOpenModalView'
  };

  RootView.prototype.shortcuts = {
    'ctrl+shift+a': 'navigateToAdmin'
  };

  RootView.prototype.showNewAchievement = function(achievement, earnedAchievement) {
    var ref1;
    earnedAchievement.set('notified', true);
    earnedAchievement.patch();
    if (achievement.get('collection') === 'level.sessions' && !((ref1 = achievement.get('query')) != null ? ref1.team : void 0)) {
      return;
    }
    if (window.serverConfig.picoCTF) {
      return;
    }
    if (achievement.get('hidden')) {
      return;
    }
    return new AchievementPopup({
      achievement: achievement,
      earnedAchievement: earnedAchievement
    });
  };

  RootView.prototype.handleNewAchievements = function(e) {
    return _.each(e.earnedAchievements.models, (function(_this) {
      return function(earnedAchievement) {
        var achievement;
        achievement = new Achievement({
          _id: earnedAchievement.get('achievement')
        });
        return achievement.fetch({
          success: function(achievement) {
            return typeof _this.showNewAchievement === "function" ? _this.showNewAchievement(achievement, earnedAchievement) : void 0;
          },
          cache: false
        });
      };
    })(this));
  };

  RootView.prototype.logoutAccount = function() {
    var ref1, ref2, ref3, ref4;
    if (window.application.isIPadApp) {
      if (typeof window !== "undefined" && window !== null) {
        if ((ref1 = window.webkit) != null) {
          if ((ref2 = ref1.messageHandlers) != null) {
            if ((ref3 = ref2.notification) != null) {
              ref3.postMessage({
                name: "signOut"
              });
            }
          }
        }
      }
    }
    Backbone.Mediator.publish("auth:logging-out", {});
    if (this.id === 'home-view') {
      if ((ref4 = window.tracker) != null) {
        ref4.trackEvent('Log Out', {
          category: 'Homepage'
        }, ['Google Analytics']);
      }
    }
    return logoutUser($('#login-email').val());
  };

  RootView.prototype.onClickSignupButton = function() {
    var CreateAccountModal, ref1, ref2, ref3;
    CreateAccountModal = require('views/core/CreateAccountModal');
    switch (this.id) {
      case 'home-view':
        if ((ref1 = window.tracker) != null) {
          ref1.trackEvent('Started Signup', {
            category: 'Homepage',
            label: 'Homepage'
          });
        }
        break;
      case 'world-map-view':
        if ((ref2 = window.tracker) != null) {
          ref2.trackEvent('Started Signup', {
            category: 'World Map',
            label: 'World Map'
          });
        }
        break;
      default:
        if ((ref3 = window.tracker) != null) {
          ref3.trackEvent('Started Signup', {
            label: this.id
          });
        }
    }
    return this.openModalView(new CreateAccountModal());
  };

  RootView.prototype.onClickLoginButton = function() {
    var AuthModal, ref1;
    AuthModal = require('views/core/AuthModal');
    if (this.id === 'home-view') {
      if ((ref1 = window.tracker) != null) {
        ref1.trackEvent('Login', {
          category: 'Homepage'
        }, ['Google Analytics']);
      }
    }
    return this.openModalView(new AuthModal());
  };

  RootView.prototype.onClickAnchor = function(e) {
    var anchorText, ref1, ref2;
    if (this.destroyed) {
      return;
    }
    anchorText = e != null ? (ref1 = e.currentTarget) != null ? ref1.text : void 0 : void 0;
    if (this.id === 'home-view' && anchorText) {
      if ((ref2 = window.tracker) != null) {
        ref2.trackEvent(anchorText, {
          category: 'Homepage'
        }, ['Google Analytics']);
      }
    }
    return this.toggleModal(e);
  };

  RootView.prototype.onOpenModalView = function(e) {
    var ModalClass;
    if (!(e.modalPath && (ModalClass = require(e.modalPath)))) {
      return console.error("Couldn't find modalPath " + e.modalPath);
    }
    return this.openModalView(new ModalClass({}));
  };

  RootView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('#site-content-area');
    }
    return RootView.__super__.showLoading.call(this, $el);
  };

  RootView.prototype.afterInsert = function() {
    RootView.__super__.afterInsert.call(this);
    return this.renderScrollbar();
  };

  RootView.prototype.afterRender = function() {
    var title;
    if (this.$el.find('#site-nav').length) {
      this.$el.addClass('site-chrome');
      if (this.showBackground) {
        this.$el.addClass('show-background');
      }
    }
    RootView.__super__.afterRender.apply(this, arguments);
    if (location.hash) {
      this.chooseTab(location.hash.replace('#', ''));
    }
    this.buildLanguages();
    $('body').removeClass('is-playing');
    if (title = this.getTitle()) {
      title += ' | CodeCombat';
    } else {
      title = 'CodeCombat - Learn how to code by playing a game';
    }
    return $('title').text(title);
  };

  RootView.prototype.getTitle = function() {
    return '';
  };

  RootView.prototype.chooseTab = function(category) {
    return $("a[href='#" + category + "']", this.$el).tab('show');
  };

  RootView.prototype.buildLanguages = function() {
    var $select, preferred;
    $select = this.$el.find('.language-dropdown').empty();
    preferred = me.get('preferredLanguage', true);
    this.addLanguagesToSelect($select, preferred);
    return $('body').attr('lang', preferred);
  };

  RootView.prototype.addLanguagesToSelect = function($select, initialVal) {
    var code, codes, genericCodes, localeInfo;
    if (initialVal == null) {
      initialVal = me.get('preferredLanguage', true);
    }
    codes = _.keys(locale);
    genericCodes = _.filter(codes, function(code) {
      return _.find(codes, function(code2) {
        return code2 !== code && code2.split('-')[0] === code;
      });
    });
    for (code in locale) {
      localeInfo = locale[code];
      if (!(code !== 'update' && (!(indexOf.call(genericCodes, code) >= 0) || code === initialVal))) {
        continue;
      }
      $select.append($('<option></option>').val(code).text(localeInfo.nativeDescription));
      if (code === 'fr') {
        $select.append($('<option class="select-dash" disabled="disabled"></option>').text('----------------------------------'));
      }
    }
    return $select.val(initialVal);
  };

  RootView.prototype.onLanguageChanged = function() {
    var loading, newLang;
    newLang = $('.language-dropdown').val();
    $.i18n.setLng(newLang, {});
    this.saveLanguage(newLang);
    loading = application.moduleLoader.loadLanguage(me.get('preferredLanguage', true));
    if (loading) {
      return this.listenToOnce(application.moduleLoader, 'load-complete', this.onLanguageLoaded);
    } else {
      return this.onLanguageLoaded();
    }
  };

  RootView.prototype.onLanguageLoaded = function() {
    var DiplomatModal;
    this.render();
    if (me.get('preferredLanguage').split('-')[0] !== 'en') {
      DiplomatModal = require('views/core/DiplomatSuggestionModal');
      return this.openModalView(new DiplomatModal());
    }
  };

  RootView.prototype.saveLanguage = function(newLang) {
    var res;
    me.set('preferredLanguage', newLang);
    res = me.patch();
    if (!res) {
      return;
    }
    res.error(function() {
      var errors;
      errors = JSON.parse(res.responseText);
      return console.warn('Error saving language:', errors);
    });
    return res.success(function(model, response, options) {});
  };

  RootView.prototype.isOldBrowser = function() {
    var majorVersion;
    if ($.browser) {
      majorVersion = $.browser.versionNumber;
      if ($.browser.mozilla && majorVersion < 25) {
        return true;
      }
      if ($.browser.chrome && majorVersion < 31) {
        return true;
      }
      if ($.browser.safari && majorVersion < 6) {
        return true;
      }
    } else {
      console.warn('no more jquery browser version...');
    }
    return false;
  };

  RootView.prototype.logoutRedirectURL = '/';

  RootView.prototype.navigateToAdmin = function() {
    if (window.serverSession.amActually || me.isAdmin()) {
      return application.router.navigate('/admin', {
        trigger: true
      });
    }
  };

  RootView.prototype.onTreemaError = function(e) {
    return noty({
      text: e.message,
      layout: 'topCenter',
      type: 'error',
      killer: false,
      timeout: 5000,
      dismissQueue: true
    });
  };

  return RootView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/core/RootView.js.map
require.register("core/application", function(exports, require, module) {
var Application, COMMON_FILES, CocoModel, FacebookHandler, GPlusHandler, GitHubHandler, ModuleLoader, Tracker, ctrlDefaultPrevented, elementAcceptsKeystrokes, locale, me, preload, preventBackspace,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

FacebookHandler = require('core/social-handlers/FacebookHandler');

GPlusHandler = require('core/social-handlers/GPlusHandler');

GitHubHandler = require('core/social-handlers/GitHubHandler');

ModuleLoader = require('core/ModuleLoader');

locale = require('locale/locale');

me = require('core/auth').me;

Tracker = require('core/Tracker');

CocoModel = require('models/CocoModel');

marked.setOptions({
  gfm: true,
  sanitize: true,
  smartLists: true,
  breaks: false
});

window.SPRITE_RESOLUTION_FACTOR = 3;

window.SPRITE_PLACEHOLDER_WIDTH = 60;

ctrlDefaultPrevented = [219, 221, 80, 83];

preventBackspace = function(event) {
  var ref;
  if (event.keyCode === 8 && !elementAcceptsKeystrokes(event.srcElement || event.target)) {
    return event.preventDefault();
  } else if ((event.ctrlKey || event.metaKey) && !event.altKey && (ref = event.keyCode, indexOf.call(ctrlDefaultPrevented, ref) >= 0)) {
    console.debug("Prevented keystroke", key, event);
    return event.preventDefault();
  }
};

elementAcceptsKeystrokes = function(el) {
  var ref, ref1, tag, textInputTypes, type;
  if (el == null) {
    el = document.activeElement;
  }
  tag = el.tagName.toLowerCase();
  type = (ref = el.type) != null ? ref.toLowerCase() : void 0;
  textInputTypes = ['text', 'password', 'file', 'number', 'search', 'url', 'tel', 'email', 'date', 'month', 'week', 'time', 'datetimelocal'];
  return (tag === 'textarea' || (tag === 'input' && indexOf.call(textInputTypes, type) >= 0) || ((ref1 = el.contentEditable) === '' || ref1 === 'true')) && !(el.readOnly || el.disabled);
};

COMMON_FILES = ['/images/pages/base/modal_background.png', '/images/level/popover_background.png', '/images/level/code_palette_wood_background.png', '/images/level/code_editor_background_border.png'];

preload = function(arrayOfImages) {
  return $(arrayOfImages).each(function() {
    return $('<img/>')[0].src = this;
  });
};

if (window.console == null) {
  window.console = {
    info: function() {},
    log: function() {},
    error: function() {},
    debug: function() {}
  };
}

if (console.debug == null) {
  console.debug = console.log;
}

Application = {
  initialize: function() {
    var Router, ref;
    Router = require('core/Router');
    this.isProduction = function() {
      return document.location.href.search('https?://localhost') === -1;
    };
    this.isIPadApp = ((typeof webkit !== "undefined" && webkit !== null ? webkit.messageHandlers : void 0) != null) && ((ref = navigator.userAgent) != null ? ref.indexOf('CodeCombat-iPad') : void 0) !== -1;
    if (this.isIPadApp) {
      $('body').addClass('ipad');
    }
    if (window.serverConfig.picoCTF) {
      $('body').addClass('picoctf');
    }
    if ($.browser.msie && parseInt($.browser.version) === 10) {
      $("html").addClass("ie10");
    }
    this.tracker = new Tracker();
    this.facebookHandler = new FacebookHandler();
    this.gplusHandler = new GPlusHandler();
    this.githubHandler = new GitHubHandler();
    this.moduleLoader = new ModuleLoader();
    this.moduleLoader.loadLanguage(me.get('preferredLanguage', true));
    $(document).bind('keydown', preventBackspace);
    preload(COMMON_FILES);
    CocoModel.pollAchievements();
    if (!me.get('anonymous')) {
      me.on('change:earned', function(user, newEarned) {
        var newHeroes, newItems, newLevels, oldEarned, ref1;
        if (newEarned == null) {
          newEarned = {};
        }
        oldEarned = (ref1 = user.previous('earned')) != null ? ref1 : {};
        if (oldEarned.gems !== newEarned.gems) {
          console.log('Gems changed', oldEarned.gems, '->', newEarned.gems);
        }
        newLevels = _.difference(newEarned.levels, oldEarned.levels);
        if (newLevels.length) {
          console.log('Levels added', newLevels);
        }
        newItems = _.difference(newEarned.items, oldEarned.items);
        if (newItems.length) {
          console.log('Items added', newItems);
        }
        newHeroes = _.difference(newEarned.heroes, oldEarned.heroes);
        if (newHeroes.length) {
          return console.log('Heroes added', newHeroes);
        }
      });
      me.on('change:points', function(user, newPoints) {
        return console.log('Points changed', user.previous('points'), '->', newPoints);
      });
      this.checkForNewAchievement();
    }
    return $.i18n.init({
      lng: me.get('preferredLanguage', true),
      fallbackLng: 'en',
      resStore: locale,
      useDataAttrOptions: true
    }, (function(_this) {
      return function(t) {
        var onIdleChanged;
        _this.router = new Router();
        onIdleChanged = function(to) {
          return function() {
            return Backbone.Mediator.publish('application:idle-changed', {
              idle: _this.userIsIdle = to
            });
          };
        };
        _this.idleTracker = new Idle({
          onAway: onIdleChanged(true),
          onAwayBack: onIdleChanged(false),
          onHidden: onIdleChanged(true),
          onVisible: onIdleChanged(false),
          awayTimeout: 5 * 60 * 1000
        });
        return _this.idleTracker.start();
      };
    })(this));
  },
  checkForNewAchievement: function() {
    var daysSince, startFrom;
    if (me.get('lastAchievementChecked')) {
      startFrom = new Date(me.get('lastAchievementChecked'));
    } else {
      startFrom = me.created();
    }
    daysSince = moment.duration(new Date() - startFrom).asDays();
    if (daysSince > 1) {
      return me.checkForNewAchievement().then((function(_this) {
        return function() {
          return _this.checkForNewAchievement();
        };
      })(this));
    }
  },
  featureMode: {
    useCodePlay: function() {
      return $.ajax({
        method: 'put',
        url: '/admin/feature-mode/code-play'
      }).then(function() {
        return document.location.reload();
      });
    },
    usePicoCtf: function() {
      return $.ajax({
        method: 'put',
        url: '/admin/feature-mode/pico-ctf'
      }).then(function() {
        return document.location.reload();
      });
    },
    clear: function() {
      return $.ajax({
        method: 'delete',
        url: '/admin/feature-mode'
      }).then(function() {
        return document.location.reload();
      });
    }
  }
};

module.exports = Application;

window.application = Application;
});

;
//# sourceMappingURL=/javascripts/app/core/application.js.map
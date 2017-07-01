require.register("templates/play/menu/game-menu-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,submenus = locals_.submenus,showTab = locals_.showTab,iconMap = locals_.iconMap,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/game-menu-background.png\" draggable=\"false\" id=\"game-menu-background\"/><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><ul id=\"game-menu-nav\" class=\"nav nav-pills nav-stacked\">");
if ( view.showsChooseHero())
{
buf.push("<li><a id=\"change-hero-tab\"><span class=\"glyphicon glyphicon-user\"></span><span data-i18n=\"[title]game_menu.choose_hero_caption;play.change_hero\"></span></a></li>");
}
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

buf.push("<li" + (jade.attrs({ "class": [(submenu === showTab ? "active" : "")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + "><span" + (jade.attrs({ "class": [('glyphicon'),("glyphicon-"+iconMap[submenu])] }, {"class":true})) + "></span>");
var i18nKey = 'game_menu.' + submenu.replace('-', '_');
buf.push("<span" + (jade.attrs({ 'data-i18n':('[title]' + i18nKey + '_caption;' + i18nKey + '_tab') }, {"data-i18n":true})) + "></span></a></li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

buf.push("<li" + (jade.attrs({ "class": [(submenu === showTab ? "active" : "")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + "><span" + (jade.attrs({ "class": [('glyphicon'),("glyphicon-"+iconMap[submenu])] }, {"class":true})) + "></span>");
var i18nKey = 'game_menu.' + submenu.replace('-', '_');
buf.push("<span" + (jade.attrs({ 'data-i18n':('[title]' + i18nKey + '_caption;' + i18nKey + '_tab') }, {"data-i18n":true})) + "></span></a></li>");
    }

  }
}).call(this);

if ( me.get('anonymous'))
{
buf.push("<li data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\" class=\"auth-tab\"><a data-toggle=\"coco-modal\" data-target=\"core/CreateAccountModal\"><span class=\"glyphicon glyphicon-pencil\"></span><span data-i18n=\"[title]game_menu.auth_caption;game_menu.auth_tab\"></span></a></li>");
}
buf.push("</ul><div class=\"tab-content game-menu-tab-content\">");
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu + '-view'), "class": [('tab-pane')] }, {"id":true})) + "></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu + '-view'), "class": [('tab-pane')] }, {"id":true})) + "></div>");
    }

  }
}).call(this);

buf.push("</div></div></div>");;return buf.join("");
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

;require.register("views/play/menu/GameMenuModal", function(exports, require, module) {
var CreateAccountModal, GameMenuModal, ModalView, submenuViews, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

CreateAccountModal = require('views/core/CreateAccountModal');

template = require('templates/play/menu/game-menu-modal');

submenuViews = [require('views/play/menu/SaveLoadView'), require('views/play/menu/OptionsView'), require('views/play/menu/GuideView')];

module.exports = GameMenuModal = (function(superClass) {
  extend(GameMenuModal, superClass);

  GameMenuModal.prototype.className = 'modal fade play-modal';

  GameMenuModal.prototype.template = template;

  GameMenuModal.prototype.id = 'game-menu-modal';

  GameMenuModal.prototype.instant = true;

  GameMenuModal.prototype.events = {
    'change input.select': 'onSelectionChanged',
    'shown.bs.tab #game-menu-nav a': 'onTabShown',
    'click #change-hero-tab': function() {
      return this.trigger('change-hero');
    },
    'click #close-modal': 'hide',
    'click .auth-tab': 'onClickSignupButton'
  };

  function GameMenuModal(options) {
    var ref, ref1;
    GameMenuModal.__super__.constructor.call(this, options);
    this.level = this.options.level;
    this.options.levelID = this.options.level.get('slug');
    this.options.startingSessionHeroConfig = $.extend({}, true, (ref = this.options.session.get('heroConfig')) != null ? ref : {});
    Backbone.Mediator.publish('music-player:enter-menu', {
      terrain: (ref1 = this.options.level.get('terrain', true)) != null ? ref1 : 'Dungeon'
    });
  }

  GameMenuModal.prototype.getRenderData = function(context) {
    var docs, ref, ref1, ref2, submenus;
    if (context == null) {
      context = {};
    }
    context = GameMenuModal.__super__.getRenderData.call(this, context);
    docs = (ref = this.options.level.get('documentation')) != null ? ref : {};
    submenus = ['guide', 'options', 'save-load'];
    if (window.serverConfig.picoCTF) {
      submenus = _.without(submenus, 'options');
    }
    if (!window.serverConfig.picoCTF) {
      if (this.level.isType('course', 'course-ladder') || !((ref1 = this.options.level.get('helpVideos')) != null ? ref1.length : void 0) > 0) {
        submenus = _.without(submenus, 'guide');
      }
    }
    if (!(me.isAdmin() || /https?:\/\/localhost/.test(window.location.href))) {
      submenus = _.without(submenus, 'save-load');
    }
    this.includedSubmenus = submenus;
    context.showTab = (ref2 = this.options.showTab) != null ? ref2 : submenus[0];
    context.submenus = submenus;
    context.iconMap = {
      'options': 'cog',
      'guide': 'list',
      'save-load': 'floppy-disk'
    };
    return context;
  };

  GameMenuModal.prototype.showsChooseHero = function() {
    var ref, ref1;
    if ((ref = this.level) != null ? ref.isType('course', 'course-ladder') : void 0) {
      return false;
    }
    if ((ref1 = this.options.levelID) === 'zero-sum' || ref1 === 'ace-of-coders' || ref1 === 'elemental-wars' || ref1 === 'the-battle-of-sky-span') {
      return false;
    }
    return true;
  };

  GameMenuModal.prototype.afterRender = function() {
    var firstView, i, len, submenuView;
    GameMenuModal.__super__.afterRender.call(this);
    for (i = 0, len = submenuViews.length; i < len; i++) {
      submenuView = submenuViews[i];
      this.insertSubView(new submenuView(this.options));
    }
    firstView = (function() {
      switch (this.options.showTab) {
        case 'guide':
          return this.subviews.guide_view;
        default:
          if (indexOf.call(this.includedSubmenus, 'guide') >= 0) {
            return this.subviews.guide_view;
          } else {
            return this.subviews.options_view;
          }
      }
    }).call(this);
    firstView.$el.addClass('active');
    if (typeof firstView.onShown === "function") {
      firstView.onShown();
    }
    this.playSound('game-menu-open');
    return this.$el.find('.nano:visible').nanoScroller();
  };

  GameMenuModal.prototype.onTabShown = function(e) {
    var base, ref, results, shownSubviewKey, subview, subviewKey;
    this.playSound('game-menu-tab-switch');
    shownSubviewKey = e.target.hash.substring(1).replace(/-/g, '_');
    if (typeof (base = this.subviews[shownSubviewKey]).onShown === "function") {
      base.onShown();
    }
    ref = this.subviews;
    results = [];
    for (subviewKey in ref) {
      subview = ref[subviewKey];
      if (subviewKey !== shownSubviewKey) {
        results.push(typeof subview.onHidden === "function" ? subview.onHidden() : void 0);
      }
    }
    return results;
  };

  GameMenuModal.prototype.onHidden = function() {
    var ref, subview, subviewKey;
    GameMenuModal.__super__.onHidden.call(this);
    ref = this.subviews;
    for (subviewKey in ref) {
      subview = ref[subviewKey];
      if (typeof subview.onHidden === "function") {
        subview.onHidden();
      }
    }
    this.playSound('game-menu-close');
    return Backbone.Mediator.publish('music-player:exit-menu', {});
  };

  GameMenuModal.prototype.onClickSignupButton = function(e) {
    var ref;
    if ((ref = window.tracker) != null) {
      ref.trackEvent('Started Signup', {
        category: 'Play Level',
        label: 'Game Menu',
        level: this.options.levelID
      });
    }
    e.preventDefault();
    return this.openModalView(new CreateAccountModal());
  };

  return GameMenuModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/GameMenuModal.js.map
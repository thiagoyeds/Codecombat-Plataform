require.register("templates/play/modal/play-heroes-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),gems = locals_.gems,heroes = locals_.heroes,isIE = locals_.isIE,visibleHero = locals_.visibleHero,codeLanguages = locals_.codeLanguages,codeLanguage = locals_.codeLanguage,confirmButtonI18N = locals_.confirmButtonI18N,me = locals_.me,serverConfig = locals_.serverConfig;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/heroes-background.png\" draggable=\"false\" id=\"play-heroes-background\"/><h1 data-i18n=\"choose_hero.choose_hero\"></h1><div id=\"gems-count-container\"><span id=\"gems-count\"><div class=\"gem gem-20\"></div><span class=\"spl\">" + (jade.escape(null == (jade.interp = gems) ? "" : jade.interp)) + "</span></span></div><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><div id=\"hero-carousel\" data-interval='0' class=\"carousel slide\"><div class=\"carousel-indicator-container\"><ol class=\"carousel-indicators\">");
// iterate heroes
;(function(){
  var $$obj = heroes;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var hero = $$obj[index];

buf.push("<li" + (jade.attrs({ 'data-hero-id':(hero.get('original')), 'title':(hero.name), 'data-slide-to':(index), 'data-target':("#hero-carousel"), "class": [("hero-indicator hero-index-" + index + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"data-hero-id":true,"title":true,"data-slide-to":true,"data-target":true,"class":true})) + "><div class=\"hero-avatar\"></div>");
if ( hero.locked && !hero.purchasable)
{
if ( isIE)
{
buf.push("<img src=\"/images/pages/game-menu/lock-processed.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
else
{
buf.push("<img src=\"/images/pages/game-menu/lock.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var hero = $$obj[index];

buf.push("<li" + (jade.attrs({ 'data-hero-id':(hero.get('original')), 'title':(hero.name), 'data-slide-to':(index), 'data-target':("#hero-carousel"), "class": [("hero-indicator hero-index-" + index + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"data-hero-id":true,"title":true,"data-slide-to":true,"data-target":true,"class":true})) + "><div class=\"hero-avatar\"></div>");
if ( hero.locked && !hero.purchasable)
{
if ( isIE)
{
buf.push("<img src=\"/images/pages/game-menu/lock-processed.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
else
{
buf.push("<img src=\"/images/pages/game-menu/lock.png\" draggable=\"false\" class=\"lock-indicator\"/>");
}
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ol></div><div class=\"carousel-inner\">");
// iterate heroes
;(function(){
  var $$obj = heroes;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var hero = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-hero-id':(hero.get('original')), "class": [("item hero-item" + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"class":true,"data-hero-id":true})) + "><canvas class=\"hero-canvas\"></canvas><div class=\"hero-pose-image\"><img draggable=\"false\"/></div><div class=\"hero-stats\"><h2>" + (jade.escape(null == (jade.interp = hero.name) ? "" : jade.interp)) + "</h2><div class=\"hero-description\">" + (jade.escape(null == (jade.interp = hero.description) ? "" : jade.interp)) + "</div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.status\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':(hero.restricted ? 'inventory.restricted_title' : (hero.purchasable ? 'play.purchasable' : (hero.locked ? 'play.locked' : 'play.available'))), "class": [('stat-value'),('hero-status-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"editor.level_components_type\" class=\"stat-label\"> </div><div" + (jade.attrs({ 'data-i18n':('general.' +hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.weapons\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':('choose_hero.weapons_'+hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div>");
if ( hero.stats)
{
if ( hero.stats.skills.length)
{
buf.push("<div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.skills\" class=\"stat-label\"></div><div class=\"stat-value\">" + (jade.escape(null == (jade.interp = hero.stats.skills.join(', ')) ? "" : jade.interp)) + "</div></div>");
}
// iterate ['attack', 'health', 'speed']
;(function(){
  var $$obj = ['attack', 'health', 'speed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var hero = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-hero-id':(hero.get('original')), "class": [("item hero-item" + (hero.locked ? " locked" : "") + (hero.purchasable ? " purchasable" : "") + (hero.restricted ? " restricted" : ""))] }, {"class":true,"data-hero-id":true})) + "><canvas class=\"hero-canvas\"></canvas><div class=\"hero-pose-image\"><img draggable=\"false\"/></div><div class=\"hero-stats\"><h2>" + (jade.escape(null == (jade.interp = hero.name) ? "" : jade.interp)) + "</h2><div class=\"hero-description\">" + (jade.escape(null == (jade.interp = hero.description) ? "" : jade.interp)) + "</div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.status\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':(hero.restricted ? 'inventory.restricted_title' : (hero.purchasable ? 'play.purchasable' : (hero.locked ? 'play.locked' : 'play.available'))), "class": [('stat-value'),('hero-status-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"editor.level_components_type\" class=\"stat-label\"> </div><div" + (jade.attrs({ 'data-i18n':('general.' +hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div><div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.weapons\" class=\"stat-label\"></div><div" + (jade.attrs({ 'data-i18n':('choose_hero.weapons_'+hero.class), "class": [('stat-value')] }, {"data-i18n":true})) + "></div></div>");
if ( hero.stats)
{
if ( hero.stats.skills.length)
{
buf.push("<div class=\"hero-stat-row\"><div data-i18n=\"choose_hero.skills\" class=\"stat-label\"></div><div class=\"stat-value\">" + (jade.escape(null == (jade.interp = hero.stats.skills.join(', ')) ? "" : jade.interp)) + "</div></div>");
}
// iterate ['attack', 'health', 'speed']
;(function(){
  var $$obj = ['attack', 'health', 'speed'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'title':(hero.stats[stat].description), "class": [('hero-stat-row'),(stat)] }, {"class":true,"title":true})) + "><div" + (jade.attrs({ 'data-i18n':('choose_hero.'+stat), "class": [('stat-label')] }, {"data-i18n":true})) + "></div><div class=\"stat-value\"><div class=\"stat-progress\"><div" + (jade.attrs({ 'style':("width: " + (parseInt(hero.stats[stat].relative * 100)) + "%"), "class": [('stat-progress-bar')] }, {"style":true})) + "></div></div></div></div>");
    }

  }
}).call(this);

}
buf.push("</div></div>");
    }

  }
}).call(this);

buf.push("</div><a role=\"button\" data-slide=\"prev\" href=\"#hero-carousel\" class=\"left\"><span class=\"glyphicon glyphicon-play\"></span></a><a role=\"button\" data-slide=\"next\" href=\"#hero-carousel\" class=\"right\"><span class=\"glyphicon glyphicon-play\"></span></a></div><div id=\"hero-footer\">");
if ( visibleHero)
{
if ( !visibleHero.get('original'))
{
buf.push("<div id=\"loading-hero-explanation\"><h2 data-i18n=\"common.loading\">Loading...</h2></div>");
}
else if ( visibleHero.restricted)
{
buf.push("<div id=\"restricted-hero-explanation\"><h2><span>" + (jade.escape(null == (jade.interp = visibleHero.name) ? "" : jade.interp)) + "</span><span data-i18n=\"inventory.restricted_title\" class=\"spl\">Restricted</span></h2><span data-i18n=\"choose_hero.restricted_to_certain_heroes\" class=\"spr\">Only certain heroes can play this level.</span></div><button id=\"restricted-hero-button\" data-i18n=\"inventory.restricted_title\" class=\"btn disabled btn-illustrated\">Restricted</button>");
}
else if ( visibleHero.purchasable)
{
buf.push("<div id=\"purchasable-hero-explanation\"><h2 data-i18n=\"choose_hero.available_for_purchase\">Available for Purchase</h2></div><button id=\"purchase-hero-button\" class=\"btn unlock-button\"><span data-i18n=\"play.unlock\" class=\"spr\">Unlock</span>");
if(!visibleHero.get('gems')) {
console.error('Huh, we loaded the hero with no gem cost.');
visibleHero.set('gems', {ninja: 400, librarian: 630, samurai: 1000, trapper: 1400, "potion-master": 1800, "forest-archer": 2500, sorcerer: 3400, raiser: 4600, necromancer: 6300, pixie: 8500, goliath: 12000, guardian: 16000, "dark-wizard": 21000, assassin: 29000}[visibleHero.get('slug')] || 99999);
}
buf.push("<span>" + (jade.escape(null == (jade.interp = visibleHero.get('gems')) ? "" : jade.interp)) + "</span><span class=\"gem gem-20\"></span></button>");
}
else if ( visibleHero.locked)
{
buf.push("<div id=\"locked-hero-explanation\"><h2><span>" + (jade.escape(null == (jade.interp = visibleHero.name) ? "" : jade.interp)) + "</span><span data-i18n=\"play.locked\" class=\"spl\">Locked</span></h2><span data-i18n=\"choose_hero.level_to_unlock\" class=\"spr\">Level to unlock:</span><strong>" + (jade.escape(null == (jade.interp = visibleHero.unlockLevelName || '???') ? "" : jade.interp)) + "</strong></div>");
}
else if ( visibleHero.loaded)
{
buf.push("<div class=\"form\"><div class=\"form-group select-group\"><span data-i18n=\"choose_hero.programming_language_description\" class=\"help-block\">Which programming language do you want to use?</span><select id=\"option-code-language\" name=\"code-language\">");
// iterate codeLanguages
;(function(){
  var $$obj = codeLanguages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':(codeLanguage === option.id) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var option = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(option.id), 'selected':(codeLanguage === option.id) }, {"value":true,"selected":true})) + ">" + (jade.escape(null == (jade.interp = option.name) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select></div></div><a" + (jade.attrs({ 'id':('confirm-button'), 'data-i18n':(confirmButtonI18N) }, {"data-i18n":true})) + "></a>");
}
}
buf.push("</div>");
if ( !me.finishedAnyLevels() && serverConfig.showCodePlayAds)
{
buf.push("<a href=\"https://lenovogamestate.com/\">");
var url = "/images/common/codeplay/NA_ChooseHeroPage_Yoga520_800x90.png"
if ( me.isFromUk())
{
url = "/images/common/codeplay/UK_ChooseHeroPage_Yoga510_800x90.png"
}
buf.push("<img" + (jade.attrs({ 'id':('codeplay-choose-hero-ad'), 'src':(url) }, {"src":true})) + "/></a>");
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

;require.register("views/play/modal/PlayHeroesModal", function(exports, require, module) {
var AudioPlayer, BuyGemsModal, CocoCollection, CreateAccountModal, Lank, LayerAdapter, ModalView, PlayHeroesModal, Purchase, SpriteBuilder, ThangType, buyGemsPromptTemplate, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/play-heroes-modal');

buyGemsPromptTemplate = require('templates/play/modal/buy-gems-prompt');

CocoCollection = require('collections/CocoCollection');

ThangType = require('models/ThangType');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

AudioPlayer = require('lib/AudioPlayer');

utils = require('core/utils');

BuyGemsModal = require('views/play/modal/BuyGemsModal');

CreateAccountModal = require('views/core/CreateAccountModal');

Purchase = require('models/Purchase');

LayerAdapter = require('lib/surface/LayerAdapter');

Lank = require('lib/surface/Lank');

module.exports = PlayHeroesModal = (function(superClass) {
  extend(PlayHeroesModal, superClass);

  PlayHeroesModal.prototype.className = 'modal fade play-modal';

  PlayHeroesModal.prototype.template = template;

  PlayHeroesModal.prototype.id = 'play-heroes-modal';

  PlayHeroesModal.prototype.events = {
    'slide.bs.carousel #hero-carousel': 'onHeroChanged',
    'change #option-code-language': 'onCodeLanguageChanged',
    'click #close-modal': 'hide',
    'click #confirm-button': 'saveAndHide',
    'click .unlock-button': 'onUnlockButtonClicked',
    'click .buy-gems-prompt-button': 'onBuyGemsPromptButtonClicked',
    'click': 'onClickedSomewhere'
  };

  PlayHeroesModal.prototype.shortcuts = {
    'left': function() {
      if (this.heroes.models.length && !this.$el.hasClass('secret')) {
        return this.$el.find('#hero-carousel').carousel('prev');
      }
    },
    'right': function() {
      if (this.heroes.models.length && !this.$el.hasClass('secret')) {
        return this.$el.find('#hero-carousel').carousel('next');
      }
    },
    'enter': function() {
      if (this.visibleHero && !this.visibleHero.locked) {
        return this.saveAndHide();
      }
    }
  };

  function PlayHeroesModal(options) {
    this.animateHeroes = bind(this.animateHeroes, this);
    var ref;
    PlayHeroesModal.__super__.constructor.call(this, options);
    if (options == null) {
      options = {};
    }
    this.confirmButtonI18N = (ref = options.confirmButtonI18N) != null ? ref : "common.save";
    this.heroes = new CocoCollection([], {
      model: ThangType
    });
    this.heroes.url = '/db/thang.type?view=heroes';
    this.heroes.setProjection(['original', 'name', 'slug', 'soundTriggers', 'featureImages', 'gems', 'heroClass', 'description', 'components', 'extendedName', 'unlockLevelName', 'i18n', 'poseImage']);
    this.heroes.comparator = 'gems';
    this.listenToOnce(this.heroes, 'sync', this.onHeroesLoaded);
    this.supermodel.loadCollection(this.heroes, 'heroes');
    this.stages = {};
    this.layers = [];
    this.session = options.session;
    this.initCodeLanguageList(options.hadEverChosenHero);
    this.heroAnimationInterval = setInterval(this.animateHeroes, 1000);
  }

  PlayHeroesModal.prototype.onHeroesLoaded = function() {
    var hero, i, len, ref, results;
    ref = this.heroes.models;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      hero = ref[i];
      results.push(this.formatHero(hero));
    }
    return results;
  };

  PlayHeroesModal.prototype.formatHero = function(hero) {
    var allowedHeroes, original, ref, ref1, ref2;
    hero.name = utils.i18n(hero.attributes, 'extendedName');
    if (hero.name == null) {
      hero.name = utils.i18n(hero.attributes, 'name');
    }
    hero.description = utils.i18n(hero.attributes, 'description');
    hero.unlockLevelName = utils.i18n(hero.attributes, 'unlockLevelName');
    original = hero.get('original');
    hero.locked = !me.ownsHero(original);
    hero.purchasable = hero.locked && (indexOf.call((ref = (ref1 = me.get('earned')) != null ? ref1.heroes : void 0) != null ? ref : [], original) >= 0);
    if (this.options.level && (allowedHeroes = this.options.level.get('allowedHeroes'))) {
      hero.restricted = !(ref2 = hero.get('original'), indexOf.call(allowedHeroes, ref2) >= 0);
    }
    hero["class"] = (hero.get('heroClass') || 'warrior').toLowerCase();
    return hero.stats = hero.getHeroStats();
  };

  PlayHeroesModal.prototype.getRenderData = function(context) {
    var ref, ref1, ref2, ref3, ref4;
    if (context == null) {
      context = {};
    }
    context = PlayHeroesModal.__super__.getRenderData.call(this, context);
    context.heroes = this.heroes.models;
    context.level = this.options.level;
    context.codeLanguages = this.codeLanguageList;
    context.codeLanguage = this.codeLanguage = (ref = (ref1 = (ref2 = this.options) != null ? (ref3 = ref2.session) != null ? ref3.get('codeLanguage') : void 0 : void 0) != null ? ref1 : (ref4 = me.get('aceConfig')) != null ? ref4.language : void 0) != null ? ref : 'python';
    context.confirmButtonI18N = this.confirmButtonI18N;
    context.visibleHero = this.visibleHero;
    context.gems = me.gems();
    context.isIE = this.isIE();
    return context;
  };

  PlayHeroesModal.prototype.afterRender = function() {
    var heroConfig, heroIndex, heroes, ref, ref1, ref2, ref3;
    PlayHeroesModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.playSound('game-menu-open');
    if (this.isIE()) {
      this.$el.find('.hero-avatar').addClass('ie');
    }
    heroes = this.heroes.models;
    this.$el.find('.hero-indicator').each(function() {
      var hero, heroID;
      heroID = $(this).data('hero-id');
      hero = _.find(heroes, function(hero) {
        return hero.get('original') === heroID;
      });
      return $(this).find('.hero-avatar').css('background-image', "url(" + (hero.getPortraitURL()) + ")").addClass('has-tooltip').tooltip();
    });
    this.canvasWidth = 313;
    this.canvasHeight = this.$el.find('canvas').height();
    heroConfig = (ref = (ref1 = (ref2 = this.options) != null ? (ref3 = ref2.session) != null ? ref3.get('heroConfig') : void 0 : void 0) != null ? ref1 : me.get('heroConfig')) != null ? ref : {};
    heroIndex = Math.max(0, _.findIndex(heroes, (function(hero) {
      return hero.get('original') === heroConfig.thangType;
    })));
    this.$el.find(".hero-item:nth-child(" + (heroIndex + 1) + "), .hero-indicator:nth-child(" + (heroIndex + 1) + ")").addClass('active');
    this.onHeroChanged({
      direction: null,
      relatedTarget: this.$el.find('.hero-item')[heroIndex]
    });
    this.$el.find('.hero-stat').addClass('has-tooltip').tooltip();
    return this.buildCodeLanguages();
  };

  PlayHeroesModal.prototype.rerenderFooter = function() {
    this.formatHero(this.visibleHero);
    this.renderSelectors('#hero-footer');
    this.buildCodeLanguages();
    return this.$el.find('#gems-count-container').toggle(Boolean(this.visibleHero.purchasable));
  };

  PlayHeroesModal.prototype.initCodeLanguageList = function(hadEverChosenHero) {
    if (application.isIPadApp) {
      return this.codeLanguageList = [
        {
          id: 'python',
          name: "Python (" + ($.i18n.t('choose_hero.default')) + ")"
        }, {
          id: 'javascript',
          name: 'JavaScript'
        }
      ];
    } else {
      this.codeLanguageList = (function() {
        switch (me.getDefaultLanguageGroup()) {
          case 'javascript':
            return [
              {
                id: 'javascript',
                name: "JavaScript (" + ($.i18n.t('choose_hero.default')) + ")"
              }, {
                id: 'python',
                name: "Python"
              }, {
                id: 'coffeescript',
                name: "CoffeeScript (" + ($.i18n.t('choose_hero.experimental')) + ")"
              }, {
                id: 'lua',
                name: 'Lua'
              }
            ];
          default:
            return [
              {
                id: 'python',
                name: "Python (" + ($.i18n.t('choose_hero.default')) + ")"
              }, {
                id: 'javascript',
                name: 'JavaScript'
              }, {
                id: 'coffeescript',
                name: "CoffeeScript (" + ($.i18n.t('choose_hero.experimental')) + ")"
              }, {
                id: 'lua',
                name: 'Lua'
              }
            ];
        }
      })();
      if (me.isAdmin() || !application.isProduction()) {
        return this.codeLanguageList.push({
          id: 'java',
          name: "Java (" + ($.i18n.t('choose_hero.experimental')) + ")"
        });
      }
    }
  };

  PlayHeroesModal.prototype.onHeroChanged = function(e) {
    var direction, hero, heroIndex, heroItem;
    direction = e.direction;
    heroItem = $(e.relatedTarget);
    hero = _.find(this.heroes.models, function(hero) {
      return hero.get('original') === heroItem.data('hero-id');
    });
    if (!hero) {
      return console.error("Couldn't find hero from heroItem:", heroItem);
    }
    heroIndex = heroItem.index();
    hero = this.loadHero(hero, heroIndex);
    this.preloadHero(heroIndex + 1);
    this.preloadHero(heroIndex - 1);
    if (!hero.locked) {
      this.selectedHero = hero;
    }
    this.visibleHero = hero;
    this.rerenderFooter();
    return this.trigger('hero-loaded', {
      hero: hero
    });
  };

  PlayHeroesModal.prototype.getFullHero = function(original) {
    var fullHero, url;
    url = "/db/thang.type/" + original + "/version";
    if (fullHero = this.supermodel.getModel(url)) {
      return fullHero;
    }
    fullHero = new ThangType();
    fullHero.setURL(url);
    fullHero = (this.supermodel.loadModel(fullHero)).model;
    return fullHero;
  };

  PlayHeroesModal.prototype.preloadHero = function(heroIndex) {
    var hero;
    if (!(hero = this.heroes.models[heroIndex])) {
      return;
    }
    return this.loadHero(hero, heroIndex, true);
  };

  PlayHeroesModal.prototype.loadHero = function(hero, heroIndex, preloading) {
    var fullHero, i, len, onLoaded, poseImage, ref, stage;
    if (preloading == null) {
      preloading = false;
    }
    ref = _.values(this.stages);
    for (i = 0, len = ref.length; i < len; i++) {
      stage = ref[i];
      createjs.Ticker.removeEventListener('tick', stage);
    }
    createjs.Ticker.setFPS(30);
    if (poseImage = hero.get('poseImage')) {
      $(".hero-item[data-hero-id='" + (hero.get('original')) + "'] canvas").hide();
      $(".hero-item[data-hero-id='" + (hero.get('original')) + "'] .hero-pose-image").show().find('img').prop('src', '/file/' + poseImage);
      if (!preloading) {
        this.playSelectionSound(hero);
      }
      return hero;
    }
    if (stage = this.stages[heroIndex]) {
      if (!preloading) {
        _.defer(function() {
          return createjs.Ticker.addEventListener('tick', stage);
        });
        this.playSelectionSound(hero);
      }
      return hero;
    }
    fullHero = this.getFullHero(hero.get('original'));
    onLoaded = (function(_this) {
      return function() {
        var canvas, lank, layer, multiplier;
        canvas = $(".hero-item[data-hero-id='" + (fullHero.get('original')) + "'] canvas");
        if (!canvas.length) {
          return;
        }
        if (!fullHero.get('raw')) {
          console.error("Couldn't make animation for " + (fullHero.get('name')) + " with attributes " + (_.cloneDeep(fullHero.attributes)) + ". Was it loaded with an improper projection or something?", fullHero);
          _this.rerenderFooter();
          return;
        }
        canvas.show().prop({
          width: _this.canvasWidth,
          height: _this.canvasHeight
        });
        layer = new LayerAdapter({
          webGL: true
        });
        _this.layers.push(layer);
        layer.resolutionFactor = 8;
        layer.buildAsync = false;
        multiplier = 7;
        layer.scaleX = layer.scaleY = multiplier;
        lank = new Lank(fullHero, {
          preloadSounds: false
        });
        layer.addLank(lank);
        layer.on('new-spritesheet', function() {
          var m, ref1, ref2, ref3;
          m = multiplier;
          if ((ref1 = fullHero.get('slug')) === 'knight' || ref1 === 'samurai' || ref1 === 'librarian' || ref1 === 'sorcerer' || ref1 === 'necromancer') {
            m *= 0.75;
          }
          if (fullHero.get('slug') === 'goliath') {
            m *= 0.4;
          }
          if (fullHero.get('slug') === 'champion') {
            m *= 0.9;
          }
          layer.container.scaleX = layer.container.scaleY = m;
          layer.container.children[0].x = 160 / m;
          layer.container.children[0].y = 250 / m;
          if ((ref2 = fullHero.get('slug')) === 'forest-archer' || ref2 === 'librarian' || ref2 === 'sorcerer' || ref2 === 'potion-master' || ref2 === 'necromancer' || ref2 === 'code-ninja') {
            layer.container.children[0].y -= 3;
          }
          if ((ref3 = fullHero.get('slug')) === 'librarian' || ref3 === 'sorcerer' || ref3 === 'potion-master' || ref3 === 'necromancer' || ref3 === 'goliath') {
            return layer.container.children[0].x -= 3;
          }
        });
        stage = new createjs.SpriteStage(canvas[0]);
        _this.stages[heroIndex] = stage;
        stage.addChild(layer.container);
        stage.update();
        if (!preloading) {
          createjs.Ticker.addEventListener('tick', stage);
          _this.playSelectionSound(hero);
        }
        return _this.rerenderFooter();
      };
    })(this);
    if (fullHero.loaded) {
      _.defer(onLoaded);
    } else {
      this.listenToOnce(fullHero, 'sync', onLoaded);
    }
    return fullHero;
  };

  PlayHeroesModal.prototype.animateHeroes = function() {
    var animation, heroIndex, ref, ref1, ref2, ref3, ref4;
    if (!this.visibleHero) {
      return;
    }
    heroIndex = Math.max(0, _.findIndex(this.heroes.models, ((function(_this) {
      return function(hero) {
        return hero.get('original') === _this.visibleHero.get('original');
      };
    })(this))));
    animation = _.sample(['attack', 'move_side', 'move_fore']);
    return (ref = this.stages[heroIndex]) != null ? (ref1 = ref.children) != null ? (ref2 = ref1[0]) != null ? (ref3 = ref2.children) != null ? (ref4 = ref3[0]) != null ? typeof ref4.gotoAndPlay === "function" ? ref4.gotoAndPlay(animation) : void 0 : void 0 : void 0 : void 0 : void 0 : void 0;
  };

  PlayHeroesModal.prototype.playSelectionSound = function(hero) {
    var name, ref, ref1, sound, sounds;
    if (this.$el.hasClass('secret')) {
      return;
    }
    if ((ref = this.currentSoundInstance) != null) {
      ref.stop();
    }
    if (!(sounds = (ref1 = hero.get('soundTriggers')) != null ? ref1.selected : void 0)) {
      return;
    }
    if (!(sound = sounds[Math.floor(Math.random() * sounds.length)])) {
      return;
    }
    name = AudioPlayer.nameForSoundReference(sound);
    AudioPlayer.preloadSoundReference(sound);
    this.currentSoundInstance = AudioPlayer.playSound(name, 1);
    return this.currentSoundInstance;
  };

  PlayHeroesModal.prototype.buildCodeLanguages = function() {
    var $select;
    $select = this.$el.find('#option-code-language');
    return $select.fancySelect().parent().find('.options li').each(function() {
      var blurb, languageID, languageName;
      languageName = $(this).text();
      languageID = $(this).data('value');
      blurb = $.i18n.t("choose_hero." + languageID + "_blurb");
      return $(this).text(languageName + " - " + blurb);
    });
  };

  PlayHeroesModal.prototype.onCodeLanguageChanged = function(e) {
    var ref, ref1;
    this.codeLanguage = this.$el.find('#option-code-language').val();
    this.codeLanguageChanged = true;
    return (ref = window.tracker) != null ? ref.trackEvent('Campaign changed code language', {
      category: 'Campaign Hero Select',
      codeLanguage: this.codeLanguage,
      levelSlug: (ref1 = this.options.level) != null ? ref1.get('slug') : void 0
    }) : void 0;
  };

  PlayHeroesModal.prototype.onUnlockButtonClicked = function(e) {
    var affordable, button, heroEntry, purchase, purchased, ref, ref1;
    e.stopPropagation();
    button = $(e.target).closest('button');
    affordable = this.visibleHero.get('gems') <= me.gems();
    if (!affordable) {
      this.playSound('menu-button-click');
      if (!features.freeOnly) {
        return this.askToBuyGems(button);
      }
    } else if (button.hasClass('confirm')) {
      this.playSound('menu-button-unlock-end');
      purchase = Purchase.makeFor(this.visibleHero);
      purchase.save();
      purchased = (ref = me.get('purchased')) != null ? ref : {};
      if (purchased.heroes == null) {
        purchased.heroes = [];
      }
      purchased.heroes.push(this.visibleHero.get('original'));
      me.set('purchased', purchased);
      me.set('spent', ((ref1 = me.get('spent')) != null ? ref1 : 0) + this.visibleHero.get('gems'));
      heroEntry = this.$el.find(".hero-item[data-hero-id='" + (this.visibleHero.get('original')) + "']");
      heroEntry.find('.hero-status-value').attr('data-i18n', 'play.available').i18n();
      heroEntry.removeClass('locked purchasable');
      this.selectedHero = this.visibleHero;
      this.rerenderFooter();
      return Backbone.Mediator.publish('store:hero-purchased', {
        hero: this.visibleHero,
        heroSlug: this.visibleHero.get('slug')
      });
    } else {
      this.playSound('menu-button-unlock-start');
      button.addClass('confirm').text($.i18n.t('play.confirm'));
      return this.$el.one('click', function(e) {
        if (e.target !== button[0]) {
          return button.removeClass('confirm').text($.i18n.t('play.unlock'));
        }
      });
    }
  };

  PlayHeroesModal.prototype.askToSignUp = function() {
    var createAccountModal;
    createAccountModal = new CreateAccountModal({
      supermodel: this.supermodel
    });
    return this.openModalView(createAccountModal);
  };

  PlayHeroesModal.prototype.askToBuyGems = function(unlockButton) {
    var popover, popoverTemplate, ref;
    this.$el.find('.unlock-button').popover('destroy');
    popoverTemplate = buyGemsPromptTemplate({});
    unlockButton.popover({
      animation: true,
      trigger: 'manual',
      placement: 'left',
      content: ' ',
      container: this.$el,
      template: popoverTemplate
    }).popover('show');
    popover = unlockButton.data('bs.popover');
    return popover != null ? (ref = popover.$tip) != null ? ref.i18n() : void 0 : void 0;
  };

  PlayHeroesModal.prototype.onBuyGemsPromptButtonClicked = function(e) {
    if (me.get('anonymous')) {
      return this.askToSignUp();
    }
    return this.openModalView(new BuyGemsModal());
  };

  PlayHeroesModal.prototype.onClickedSomewhere = function(e) {
    if (this.destroyed) {
      return;
    }
    return this.$el.find('.unlock-button').popover('destroy');
  };

  PlayHeroesModal.prototype.saveAndHide = function() {
    var aceConfig, changed, hero, ref, ref1, ref2;
    hero = (ref = this.selectedHero) != null ? ref.get('original') : void 0;
    if (((ref1 = this.visibleHero) != null ? ref1.loaded : void 0) && !this.visibleHero.locked) {
      if (hero == null) {
        hero = (ref2 = this.visibleHero) != null ? ref2.get('original') : void 0;
      }
    }
    if (!hero) {
      console.error('Somehow we tried to hide without having a hero selected yet...');
      noty({
        text: "Error: hero not loaded. If this keeps happening, please report the bug.",
        layout: 'topCenter',
        timeout: 10000,
        type: 'error'
      });
      return;
    }
    if (this.session) {
      changed = this.updateHeroConfig(this.session, hero);
      if (this.session.get('codeLanguage') !== this.codeLanguage) {
        this.session.set('codeLanguage', this.codeLanguage);
        changed = true;
      }
      if (changed) {
        this.session.patch();
      }
    }
    changed = this.updateHeroConfig(me, hero);
    aceConfig = _.clone(me.get('aceConfig')) || {};
    if (this.codeLanguage !== aceConfig.language) {
      aceConfig.language = this.codeLanguage;
      me.set('aceConfig', aceConfig);
      changed = true;
    }
    if (changed) {
      me.patch();
    }
    this.hide();
    return typeof this.trigger === "function" ? this.trigger('confirm-click', {
      hero: this.selectedHero
    }) : void 0;
  };

  PlayHeroesModal.prototype.updateHeroConfig = function(model, hero) {
    var heroConfig;
    if (!hero) {
      return false;
    }
    heroConfig = _.clone(model.get('heroConfig')) || {};
    if (heroConfig.thangType !== hero) {
      heroConfig.thangType = hero;
      model.set('heroConfig', heroConfig);
      return true;
    }
  };

  PlayHeroesModal.prototype.onHidden = function() {
    PlayHeroesModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  PlayHeroesModal.prototype.destroy = function() {
    var heroIndex, i, layer, len, ref, ref1, stage;
    clearInterval(this.heroAnimationInterval);
    ref = this.stages;
    for (heroIndex in ref) {
      stage = ref[heroIndex];
      createjs.Ticker.removeEventListener("tick", stage);
      stage.removeAllChildren();
    }
    ref1 = this.layers;
    for (i = 0, len = ref1.length; i < len; i++) {
      layer = ref1[i];
      layer.destroy();
    }
    return PlayHeroesModal.__super__.destroy.call(this);
  };

  return PlayHeroesModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PlayHeroesModal.js.map
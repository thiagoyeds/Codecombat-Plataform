require.register("templates/play/modal/play-items-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),gems = locals_.gems,itemCategories = locals_.itemCategories,itemCategoryNames = locals_.itemCategoryNames,itemCategoryCollections = locals_.itemCategoryCollections,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/items-background.png\" draggable=\"false\" id=\"play-items-modal-bg\"/><img src=\"/images/pages/play/modal/items-background-narrow.png\" draggable=\"false\" id=\"play-items-modal-narrow-bg\"/><h1 data-i18n=\"play.items\" class=\"big-font\"></h1><div id=\"gems-count-container\"><span id=\"gems-count\" class=\"big-font\">" + (jade.escape(null == (jade.interp = gems) ? "" : jade.interp)) + "</span></div><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><ul class=\"nav nav-pills nav-stacked\">");
// iterate itemCategories
;(function(){
  var $$obj = itemCategories;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var category = $$obj[index];

buf.push("<li" + (jade.attrs({ 'id':(category + '-tab'), "class": [(index ? "" : "active")] }, {"class":true,"id":true})) + "><a" + (jade.attrs({ 'href':("#item-category-" + category), 'data-toggle':("tab"), "class": [('one-line')] }, {"href":true,"data-toggle":true})) + "><img" + (jade.attrs({ 'src':("/images/pages/play/modal/item-icon-"+category+".png"), 'draggable':("false"), "class": [('tab-icon')] }, {"src":true,"draggable":true})) + "/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = itemCategoryNames[index]) ? "" : jade.interp)) + "</span></a></li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var category = $$obj[index];

buf.push("<li" + (jade.attrs({ 'id':(category + '-tab'), "class": [(index ? "" : "active")] }, {"class":true,"id":true})) + "><a" + (jade.attrs({ 'href':("#item-category-" + category), 'data-toggle':("tab"), "class": [('one-line')] }, {"href":true,"data-toggle":true})) + "><img" + (jade.attrs({ 'src':("/images/pages/play/modal/item-icon-"+category+".png"), 'draggable':("false"), "class": [('tab-icon')] }, {"src":true,"draggable":true})) + "/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = itemCategoryNames[index]) ? "" : jade.interp)) + "</span></a></li>");
    }

  }
}).call(this);

buf.push("</ul><div id=\"hero-type-select\" data-toggle=\"buttons\" class=\"btn-group\"><label id=\"all\" class=\"btn active\"><input type=\"radio\" name=\"hero-class-select\" autocomplete=\"off\"/><span data-i18n=\"editor.level_tab_thangs_all\"></span></label><label id=\"warrior\" class=\"btn\"><input type=\"radio\" name=\"hero-class-select\" autocomplete=\"off\"/><span data-i18n=\"general.warrior\"></span></label><label id=\"ranger\" class=\"btn\"><input type=\"radio\" name=\"hero-class-select\" autocomplete=\"off\"/><span data-i18n=\"general.ranger\"></span></label><label id=\"wizard\" class=\"btn\"><input type=\"radio\" name=\"hero-class-select\" autocomplete=\"off\"/><span data-i18n=\"general.wizard\"></span></label></div><div class=\"tab-content\">");
// iterate itemCategories
;(function(){
  var $$obj = itemCategories;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var category = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':("item-category-" + category), "class": [('tab-pane'),(index ? "" : "active")] }, {"class":true,"id":true})) + "><div class=\"nano\"><div class=\"nano-content\">");
// iterate itemCategoryCollections[category].models
;(function(){
  var $$obj = itemCategoryCollections[category].models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

var hidden = item.comingSoon && !me.isAdmin()
hidden = hidden || (!item.get('gems') && !item.owned)
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [("item " + item.get('heroClass') + (hidden ? " hide" : "") + (item.silhouetted && !item.owned ? " silhouetted" : ""))] }, {"class":true,"data-item-id":true})) + ">");
if ( item.silhouetted && !item.owned)
{
buf.push("<span class=\"glyphicon glyphicon-lock bolder\"></span><span class=\"glyphicon glyphicon-lock\"></span><img draggable=\"false\" class=\"item-silhouette\"/>");
if ( item.level)
{
buf.push("<div class=\"required-level\"><div data-i18n=\"general.player_level\"></div><div>" + (jade.escape(null == (jade.interp = item.level) ? "" : jade.interp)) + "</div></div>");
}
}
else
{
buf.push("<strong class=\"big-font\">" + (jade.escape(null == (jade.interp = item.name) ? "" : jade.interp)) + "</strong><img draggable=\"false\" class=\"item-img\"/>");
}
if ( item.owned)
{
buf.push("<span data-i18n=\"play.owned\" class=\"big-font owned\"></span>");
}
else if ( item.silhouetted)
{
buf.push("<span data-i18n=\"play.locked\" class=\"big-font locked\"></span>");
}
else
{
buf.push("<span class=\"cost\"><img src=\"/images/common/gem.png\" draggable=\"false\"/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = item.get('gems')) ? "" : jade.interp)) + "</span></span>");
if ( item.unequippable)
{
buf.push("<span class=\"big-font unequippable\">" + (jade.escape(null == (jade.interp = item.get('heroClass')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("play.unlock"), 'data-item-id':(item.id), "class": [('btn'),('unlock-button'),('big-font')] }, {"data-i18n":true,"data-item-id":true})) + "></button>");
}
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

var hidden = item.comingSoon && !me.isAdmin()
hidden = hidden || (!item.get('gems') && !item.owned)
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [("item " + item.get('heroClass') + (hidden ? " hide" : "") + (item.silhouetted && !item.owned ? " silhouetted" : ""))] }, {"class":true,"data-item-id":true})) + ">");
if ( item.silhouetted && !item.owned)
{
buf.push("<span class=\"glyphicon glyphicon-lock bolder\"></span><span class=\"glyphicon glyphicon-lock\"></span><img draggable=\"false\" class=\"item-silhouette\"/>");
if ( item.level)
{
buf.push("<div class=\"required-level\"><div data-i18n=\"general.player_level\"></div><div>" + (jade.escape(null == (jade.interp = item.level) ? "" : jade.interp)) + "</div></div>");
}
}
else
{
buf.push("<strong class=\"big-font\">" + (jade.escape(null == (jade.interp = item.name) ? "" : jade.interp)) + "</strong><img draggable=\"false\" class=\"item-img\"/>");
}
if ( item.owned)
{
buf.push("<span data-i18n=\"play.owned\" class=\"big-font owned\"></span>");
}
else if ( item.silhouetted)
{
buf.push("<span data-i18n=\"play.locked\" class=\"big-font locked\"></span>");
}
else
{
buf.push("<span class=\"cost\"><img src=\"/images/common/gem.png\" draggable=\"false\"/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = item.get('gems')) ? "" : jade.interp)) + "</span></span>");
if ( item.unequippable)
{
buf.push("<span class=\"big-font unequippable\">" + (jade.escape(null == (jade.interp = item.get('heroClass')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("play.unlock"), 'data-item-id':(item.id), "class": [('btn'),('unlock-button'),('big-font')] }, {"data-i18n":true,"data-item-id":true})) + "></button>");
}
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var category = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':("item-category-" + category), "class": [('tab-pane'),(index ? "" : "active")] }, {"class":true,"id":true})) + "><div class=\"nano\"><div class=\"nano-content\">");
// iterate itemCategoryCollections[category].models
;(function(){
  var $$obj = itemCategoryCollections[category].models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

var hidden = item.comingSoon && !me.isAdmin()
hidden = hidden || (!item.get('gems') && !item.owned)
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [("item " + item.get('heroClass') + (hidden ? " hide" : "") + (item.silhouetted && !item.owned ? " silhouetted" : ""))] }, {"class":true,"data-item-id":true})) + ">");
if ( item.silhouetted && !item.owned)
{
buf.push("<span class=\"glyphicon glyphicon-lock bolder\"></span><span class=\"glyphicon glyphicon-lock\"></span><img draggable=\"false\" class=\"item-silhouette\"/>");
if ( item.level)
{
buf.push("<div class=\"required-level\"><div data-i18n=\"general.player_level\"></div><div>" + (jade.escape(null == (jade.interp = item.level) ? "" : jade.interp)) + "</div></div>");
}
}
else
{
buf.push("<strong class=\"big-font\">" + (jade.escape(null == (jade.interp = item.name) ? "" : jade.interp)) + "</strong><img draggable=\"false\" class=\"item-img\"/>");
}
if ( item.owned)
{
buf.push("<span data-i18n=\"play.owned\" class=\"big-font owned\"></span>");
}
else if ( item.silhouetted)
{
buf.push("<span data-i18n=\"play.locked\" class=\"big-font locked\"></span>");
}
else
{
buf.push("<span class=\"cost\"><img src=\"/images/common/gem.png\" draggable=\"false\"/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = item.get('gems')) ? "" : jade.interp)) + "</span></span>");
if ( item.unequippable)
{
buf.push("<span class=\"big-font unequippable\">" + (jade.escape(null == (jade.interp = item.get('heroClass')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("play.unlock"), 'data-item-id':(item.id), "class": [('btn'),('unlock-button'),('big-font')] }, {"data-i18n":true,"data-item-id":true})) + "></button>");
}
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

var hidden = item.comingSoon && !me.isAdmin()
hidden = hidden || (!item.get('gems') && !item.owned)
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [("item " + item.get('heroClass') + (hidden ? " hide" : "") + (item.silhouetted && !item.owned ? " silhouetted" : ""))] }, {"class":true,"data-item-id":true})) + ">");
if ( item.silhouetted && !item.owned)
{
buf.push("<span class=\"glyphicon glyphicon-lock bolder\"></span><span class=\"glyphicon glyphicon-lock\"></span><img draggable=\"false\" class=\"item-silhouette\"/>");
if ( item.level)
{
buf.push("<div class=\"required-level\"><div data-i18n=\"general.player_level\"></div><div>" + (jade.escape(null == (jade.interp = item.level) ? "" : jade.interp)) + "</div></div>");
}
}
else
{
buf.push("<strong class=\"big-font\">" + (jade.escape(null == (jade.interp = item.name) ? "" : jade.interp)) + "</strong><img draggable=\"false\" class=\"item-img\"/>");
}
if ( item.owned)
{
buf.push("<span data-i18n=\"play.owned\" class=\"big-font owned\"></span>");
}
else if ( item.silhouetted)
{
buf.push("<span data-i18n=\"play.locked\" class=\"big-font locked\"></span>");
}
else
{
buf.push("<span class=\"cost\"><img src=\"/images/common/gem.png\" draggable=\"false\"/><span class=\"big-font\">" + (jade.escape(null == (jade.interp = item.get('gems')) ? "" : jade.interp)) + "</span></span>");
if ( item.unequippable)
{
buf.push("<span class=\"big-font unequippable\">" + (jade.escape(null == (jade.interp = item.get('heroClass')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<button" + (jade.attrs({ 'data-i18n':("play.unlock"), 'data-item-id':(item.id), "class": [('btn'),('unlock-button'),('big-font')] }, {"data-i18n":true,"data-item-id":true})) + "></button>");
}
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div></div></div></div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"item-details-view\"></div></div></div>");;return buf.join("");
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

;require.register("views/play/modal/PlayItemsModal", function(exports, require, module) {
var BuyGemsModal, CocoCollection, CreateAccountModal, ItemDetailsView, Level, LevelComponent, ModalView, PAGE_SIZE, PlayItemsModal, Purchase, ThangType, buyGemsPromptTemplate, slotToCategory, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

template = require('templates/play/modal/play-items-modal');

buyGemsPromptTemplate = require('templates/play/modal/buy-gems-prompt');

ItemDetailsView = require('./ItemDetailsView');

BuyGemsModal = require('views/play/modal/BuyGemsModal');

CreateAccountModal = require('views/core/CreateAccountModal');

CocoCollection = require('collections/CocoCollection');

ThangType = require('models/ThangType');

LevelComponent = require('models/LevelComponent');

Level = require('models/Level');

Purchase = require('models/Purchase');

utils = require('core/utils');

PAGE_SIZE = 200;

slotToCategory = {
  'right-hand': 'primary',
  'left-hand': 'secondary',
  'head': 'armor',
  'torso': 'armor',
  'gloves': 'armor',
  'feet': 'armor',
  'eyes': 'accessories',
  'neck': 'accessories',
  'wrists': 'accessories',
  'left-ring': 'accessories',
  'right-ring': 'accessories',
  'waist': 'accessories',
  'pet': 'misc',
  'minion': 'misc',
  'flag': 'misc',
  'misc-0': 'misc',
  'misc-1': 'misc',
  'programming-book': 'books'
};

module.exports = PlayItemsModal = (function(superClass) {
  extend(PlayItemsModal, superClass);

  PlayItemsModal.prototype.className = 'modal fade play-modal';

  PlayItemsModal.prototype.template = template;

  PlayItemsModal.prototype.id = 'play-items-modal';

  PlayItemsModal.prototype.events = {
    'click .item': 'onItemClicked',
    'shown.bs.tab': 'onTabClicked',
    'click .unlock-button': 'onUnlockButtonClicked',
    'click .buy-gems-prompt-button': 'onBuyGemsPromptButtonClicked',
    'click #close-modal': 'hide',
    'click': 'onClickedSomewhere',
    'update .tab-pane .nano': 'showVisibleItemImages',
    'click #hero-type-select label': 'onClickHeroTypeSelect'
  };

  function PlayItemsModal(options) {
    var itemFetcher, project;
    this.showVisibleItemImages = _.throttle(_.bind(this.showVisibleItemImages, this), 200);
    PlayItemsModal.__super__.constructor.call(this, options);
    this.items = new Backbone.Collection();
    this.itemCategoryCollections = {};
    project = ['name', 'components.config', 'components.original', 'slug', 'original', 'rasterIcon', 'gems', 'tier', 'description', 'i18n', 'heroClass'];
    itemFetcher = new CocoCollection([], {
      url: '/db/thang.type?view=items',
      project: project,
      model: ThangType
    });
    itemFetcher.skip = 0;
    itemFetcher.fetch({
      data: {
        skip: 0,
        limit: PAGE_SIZE
      }
    });
    this.listenTo(itemFetcher, 'sync', this.onItemsFetched);
    this.stopListening(this.supermodel, 'loaded-all');
    this.supermodel.loadCollection(itemFetcher, 'items');
    this.idToItem = {};
  }

  PlayItemsModal.prototype.onItemsFetched = function(itemFetcher) {
    var base, category, collection, cost, gemsOwned, i, len, model, needMore, ref;
    gemsOwned = me.gems();
    needMore = itemFetcher.models.length === PAGE_SIZE;
    ref = itemFetcher.models;
    for (i = 0, len = ref.length; i < len; i++) {
      model = ref[i];
      model.owned = me.ownsItem(model.get('original'));
      if (!((cost = model.get('gems')) || model.owned)) {
        continue;
      }
      category = slotToCategory[model.getAllowedSlots()[0]] || 'misc';
      if ((base = this.itemCategoryCollections)[category] == null) {
        base[category] = new Backbone.Collection();
      }
      collection = this.itemCategoryCollections[category];
      collection.comparator = function(m) {
        var ref1;
        return (ref1 = m.get('tier')) != null ? ref1 : m.get('gems');
      };
      collection.add(model);
      model.name = utils.i18n(model.attributes, 'name');
      model.affordable = cost <= gemsOwned;
      model.silhouetted = !model.owned && model.isSilhouettedItem();
      if (model.get('tier') != null) {
        model.level = model.levelRequiredForItem();
      }
      model.unequippable = !_.intersection(me.getHeroClasses(), model.getAllowedHeroClasses()).length;
      model.comingSoon = !model.getFrontFacingStats().props.length && !_.size(model.getFrontFacingStats().stats) && !model.owned;
      this.idToItem[model.id] = model;
    }
    if (itemFetcher.skip !== 0) {
      this.render();
    }
    if (needMore) {
      itemFetcher.skip += PAGE_SIZE;
      return itemFetcher.fetch({
        data: {
          skip: itemFetcher.skip,
          limit: PAGE_SIZE
        }
      });
    }
  };

  PlayItemsModal.prototype.getRenderData = function(context) {
    var category;
    if (context == null) {
      context = {};
    }
    context = PlayItemsModal.__super__.getRenderData.call(this, context);
    context.itemCategoryCollections = this.itemCategoryCollections;
    context.itemCategories = _.keys(this.itemCategoryCollections);
    context.itemCategoryNames = (function() {
      var i, len, ref, results;
      ref = context.itemCategories;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        category = ref[i];
        results.push($.i18n.t("items." + category));
      }
      return results;
    })();
    context.gems = me.gems();
    return context;
  };

  PlayItemsModal.prototype.afterRender = function() {
    var earnedLevels, ref, ref1;
    PlayItemsModal.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.playSound('game-menu-open');
    this.$el.find('.nano:visible').nanoScroller({
      alwaysVisible: true
    });
    this.itemDetailsView = new ItemDetailsView();
    this.insertSubView(this.itemDetailsView);
    this.$el.find("a[href='#item-category-armor']").click();
    earnedLevels = ((ref = me.get('earned')) != null ? ref.levels : void 0) || [];
    if (ref1 = Level.levels['defense-of-plainswood'], indexOf.call(earnedLevels, ref1) < 0) {
      this.$el.find('#misc-tab').hide();
      this.$el.find('#hero-type-select #warrior').click();
    }
    return this.showVisibleItemImages();
  };

  PlayItemsModal.prototype.onHidden = function() {
    PlayItemsModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  PlayItemsModal.prototype.onItemClicked = function(e) {
    var item, itemEl, wasSelected;
    if ($(e.target).closest('.unlock-button').length) {
      return;
    }
    this.playSound('menu-button-click');
    itemEl = $(e.target).closest('.item');
    wasSelected = itemEl.hasClass('selected');
    this.$el.find('.item.selected').removeClass('selected');
    if (wasSelected) {
      item = null;
    } else {
      item = this.idToItem[itemEl.data('item-id')];
      if (item.silhouetted && !item.owned) {
        item = null;
      } else {
        if (!wasSelected) {
          itemEl.addClass('selected');
        }
      }
    }
    return this.itemDetailsView.setItem(item);
  };

  PlayItemsModal.prototype.onTabClicked = function(e) {
    var nano;
    this.playSound('game-menu-tab-switch');
    nano = $($(e.target).attr('href')).find('.nano');
    nano.nanoScroller({
      alwaysVisible: true
    });
    this.paneNanoContent = nano.find('.nano-content');
    return this.showVisibleItemImages();
  };

  PlayItemsModal.prototype.showVisibleItemImages = function() {
    var i, item, itemEl, items, len, results, threshold;
    if (!this.paneNanoContent) {
      return console.error("Couldn't update scroll, since paneNanoContent wasn't initialized.");
    }
    items = this.paneNanoContent.find('.item:not(.loaded)');
    threshold = this.paneNanoContent.height() + 100;
    results = [];
    for (i = 0, len = items.length; i < len; i++) {
      itemEl = items[i];
      itemEl = $(itemEl);
      if (itemEl.position().top < threshold) {
        $(itemEl).addClass('loaded');
        item = this.idToItem[itemEl.data('item-id')];
        results.push(itemEl.find('.item-silhouette, .item-img').attr('src', item.getPortraitURL()));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  PlayItemsModal.prototype.onClickHeroTypeSelect = function(e) {
    var tabContent, value;
    value = $(e.target).closest('label').attr('id');
    tabContent = this.$el.find('.tab-content');
    tabContent.removeClass('filter-wizard filter-ranger filter-warrior');
    if (value !== 'all') {
      return tabContent.addClass("filter-" + value);
    }
  };

  PlayItemsModal.prototype.onUnlockButtonClicked = function(e) {
    var affordable, button, cost, gemsOwned, item, purchase, purchased, ref, ref1, ref2;
    e.stopPropagation();
    button = $(e.target).closest('button');
    item = this.idToItem[button.data('item-id')];
    gemsOwned = me.gems();
    cost = (ref = item.get('gems')) != null ? ref : 0;
    affordable = cost <= gemsOwned;
    if (!affordable) {
      this.playSound('menu-button-click');
      if (!features.freeOnly) {
        return this.askToBuyGems(button);
      }
    } else if (button.hasClass('confirm')) {
      this.playSound('menu-button-unlock-end');
      purchase = Purchase.makeFor(item);
      purchase.save();
      purchased = (ref1 = me.get('purchased')) != null ? ref1 : {};
      if (purchased.items == null) {
        purchased.items = [];
      }
      purchased.items.push(item.get('original'));
      item.owned = true;
      me.set('purchased', purchased);
      me.set('spent', ((ref2 = me.get('spent')) != null ? ref2 : 0) + item.get('gems'));
      this.renderSelectors(".item[data-item-id='" + item.id + "']", "#gems-count");
      console.log('render selectors', ".item[data-item-id='" + item.id + "']", "#gems-count");
      this.itemDetailsView.render();
      this.showVisibleItemImages();
      return Backbone.Mediator.publish('store:item-purchased', {
        item: item,
        itemSlug: item.get('slug')
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

  PlayItemsModal.prototype.askToSignUp = function() {
    var createAccountModal;
    createAccountModal = new CreateAccountModal({
      supermodel: this.supermodel
    });
    return this.openModalView(createAccountModal);
  };

  PlayItemsModal.prototype.askToBuyGems = function(unlockButton) {
    var popover, popoverTemplate, ref;
    this.$el.find('.unlock-button').popover('destroy');
    popoverTemplate = buyGemsPromptTemplate({});
    unlockButton.popover({
      animation: true,
      trigger: 'manual',
      placement: 'top',
      content: ' ',
      container: this.$el,
      template: popoverTemplate
    }).popover('show');
    popover = unlockButton.data('bs.popover');
    return popover != null ? (ref = popover.$tip) != null ? ref.i18n() : void 0 : void 0;
  };

  PlayItemsModal.prototype.onBuyGemsPromptButtonClicked = function(e) {
    this.playSound('menu-button-click');
    if (me.get('anonymous')) {
      return this.askToSignUp();
    }
    return this.openModalView(new BuyGemsModal());
  };

  PlayItemsModal.prototype.onClickedSomewhere = function(e) {
    if (this.destroyed) {
      return;
    }
    return this.$el.find('.unlock-button').popover('destroy');
  };

  PlayItemsModal.prototype.destroy = function() {
    this.$el.find('.unlock-button').popover('destroy');
    return PlayItemsModal.__super__.destroy.call(this);
  };

  return PlayItemsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/modal/PlayItemsModal.js.map
require.register("templates/play/menu/inventory-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),gems = locals_.gems,selectedHero = locals_.selectedHero,equipment = locals_.equipment,itemGroups = locals_.itemGroups,selectedHeroClass = locals_.selectedHeroClass;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/inventory-background.png\" draggable=\"false\" id=\"play-items-modal-narrow-bg\"/><h1 data-i18n=\"game_menu.inventory_tab\"></h1><div id=\"gems-count-container\"><span id=\"gems-count\" class=\"big-font\">" + (jade.escape(null == (jade.interp = gems) ? "" : jade.interp)) + "</span></div><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><div id=\"equipped\">");
if ( selectedHero && selectedHero.get('featureImages'))
{
var featureImages = selectedHero.get('featureImages');
buf.push("<img" + (jade.attrs({ 'src':("/file/"+featureImages.body), 'draggable':("false"), 'id':('hero-image') }, {"src":true,"draggable":true})) + "/><img" + (jade.attrs({ 'src':("/file/"+featureImages.head), 'draggable':("false"), 'id':('hero-image-head') }, {"src":true,"draggable":true})) + "/><img" + (jade.attrs({ 'src':("/file/"+featureImages.hair), 'draggable':("false"), 'id':('hero-image-hair') }, {"src":true,"draggable":true})) + "/><img" + (jade.attrs({ 'src':("/file/"+featureImages.thumb), 'draggable':("false"), 'id':('hero-image-thumb') }, {"src":true,"draggable":true})) + "/>");
}
// iterate ['head', 'eyes', 'neck', 'torso', 'gloves', 'wrists', 'left-hand', 'right-hand', 'waist', 'feet', 'left-ring', 'right-ring', 'minion', 'flag', 'pet', 'programming-book', 'misc-0', 'misc-1']
;(function(){
  var $$obj = ['head', 'eyes', 'neck', 'torso', 'gloves', 'wrists', 'left-hand', 'right-hand', 'waist', 'feet', 'left-ring', 'right-ring', 'minion', 'flag', 'pet', 'programming-book', 'misc-0', 'misc-1'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var slot = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-slot':(slot), "class": [('item-slot')] }, {"data-slot":true})) + "><div class=\"placeholder\"></div>");
if ( equipment[slot])
{
buf.push("<img" + (jade.attrs({ 'src':(equipment[slot].getPortraitURL()), 'data-item-id':(equipment[slot].id), "class": [('item')] }, {"src":true,"data-item-id":true})) + "/>");
}
buf.push("</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var slot = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'data-slot':(slot), "class": [('item-slot')] }, {"data-slot":true})) + "><div class=\"placeholder\"></div>");
if ( equipment[slot])
{
buf.push("<img" + (jade.attrs({ 'src':(equipment[slot].getPortraitURL()), 'data-item-id':(equipment[slot].id), "class": [('item')] }, {"src":true,"data-item-id":true})) + "/>");
}
buf.push("</div>");
    }

  }
}).call(this);

buf.push("</div><div id=\"unequipped\"><div class=\"nano\"><div class=\"nano-content\">");
if ( itemGroups)
{
if ( itemGroups.requiredPurchaseItems.models.length)
{
buf.push("<h4 id=\"required-purchase-description\" data-i18n=\"inventory.required_purchase_title\"></h4>");
// iterate itemGroups.requiredPurchaseItems.models
;(function(){
  var $$obj = itemGroups.requiredPurchaseItems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
}
if ( itemGroups.availableItems.models.length)
{
buf.push("<h4 id=\"available-description\" data-i18n=\"inventory.available_item\"></h4>");
// iterate itemGroups.availableItems.models
;(function(){
  var $$obj = itemGroups.availableItems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),('available'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img/><button data-i18n=\"inventory.equip\" class=\"btn equip-item\"></button></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),('available'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img/><button data-i18n=\"inventory.equip\" class=\"btn equip-item\"></button></div>");
}
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
}
buf.push("<div id=\"double-click-hint\" class=\"alert alert-info\"><span class=\"glyphicon glyphicon-info-sign spr\"></span><span data-i18n=\"inventory.should_equip\"></span></div>");
if ( itemGroups.restrictedItems.models.length)
{
buf.push("<h4 id=\"restricted-description\" data-i18n=\"inventory.restricted_title\"></h4>");
// iterate itemGroups.restrictedItems.models
;(function(){
  var $$obj = itemGroups.restrictedItems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
}
if ( itemGroups.lockedItems.models.length)
{
buf.push("<h4 id=\"locked-description\" data-i18n=\"play.locked\"></h4>");
// iterate itemGroups.lockedItems.models
;(function(){
  var $$obj = itemGroups.lockedItems.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

if ( selectedHeroClass && item.classes.indexOf(selectedHeroClass) > -1)
{
buf.push("<div" + (jade.attrs({ 'data-item-id':(item.id), "class": [('item'),(item.classes)] }, {"class":true,"data-item-id":true})) + "><img draggable=\"false\"/></div>");
}
    }

  }
}).call(this);

buf.push("<div class=\"clearfix\"></div>");
}
}
buf.push("</div></div></div><div id=\"item-details-view\"></div><div id=\"item-details-extra\"><button id=\"equip-item-viewed\" data-i18n=\"inventory.equip\" class=\"btn secret\"></button><button id=\"unequip-item-viewed\" data-i18n=\"inventory.unequip\" class=\"btn secret\"></button><div id=\"restricted-item-viewed\" data-i18n=\"inventory.restricted\" class=\"alert alert-danger secret\"></div></div><button id=\"choose-hero-button\" data-i18n=\"play.change_hero\" class=\"btn btn-lg btn-primary choose-inventory-active\">Change Hero</button><button id=\"play-level-button\" data-i18n=\"common.play\" class=\"btn btn-lg btn-success choose-inventory-active\">Play</button></div></div>");;return buf.join("");
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

;require.register("views/play/menu/InventoryModal", function(exports, require, module) {
var BuyGemsModal, CocoCollection, CreateAccountModal, InventoryModal, ItemDetailsView, ItemView, ModalView, Purchase, SpriteBuilder, ThangType, buyGemsPromptTemplate, gear, gearSlugs, hasGoneFullScreenOnce, heroGenders, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  slice = [].slice;

ModalView = require('views/core/ModalView');

template = require('templates/play/menu/inventory-modal');

buyGemsPromptTemplate = require('templates/play/modal/buy-gems-prompt');

me = require('core/auth').me;

ThangType = require('models/ThangType');

CocoCollection = require('collections/CocoCollection');

ItemView = require('./ItemView');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

ItemDetailsView = require('views/play/modal/ItemDetailsView');

Purchase = require('models/Purchase');

BuyGemsModal = require('views/play/modal/BuyGemsModal');

CreateAccountModal = require('views/core/CreateAccountModal');

hasGoneFullScreenOnce = false;

module.exports = InventoryModal = (function(superClass) {
  extend(InventoryModal, superClass);

  function InventoryModal() {
    return InventoryModal.__super__.constructor.apply(this, arguments);
  }

  InventoryModal.prototype.id = 'inventory-modal';

  InventoryModal.prototype.className = 'modal fade play-modal';

  InventoryModal.prototype.template = template;

  InventoryModal.prototype.slots = ['head', 'eyes', 'neck', 'torso', 'wrists', 'gloves', 'left-ring', 'right-ring', 'right-hand', 'left-hand', 'waist', 'feet', 'programming-book', 'pet', 'minion', 'flag'];

  InventoryModal.prototype.ringSlots = ['left-ring', 'right-ring'];

  InventoryModal.prototype.closesOnClickOutside = false;

  InventoryModal.prototype.events = {
    'click .item-slot': 'onItemSlotClick',
    'click #unequipped .item': 'onUnequippedItemClick',
    'doubletap #unequipped .item': 'onUnequippedItemDoubleClick',
    'doubletap .item-slot .item': 'onEquippedItemDoubleClick',
    'click button.equip-item': 'onClickEquipItemButton',
    'shown.bs.modal': 'onShown',
    'click #choose-hero-button': 'onClickChooseHero',
    'click #play-level-button': 'onClickPlayLevel',
    'click .unlock-button': 'onUnlockButtonClicked',
    'click #equip-item-viewed': 'onClickEquipItemViewed',
    'click #unequip-item-viewed': 'onClickUnequipItemViewed',
    'click #close-modal': 'hide',
    'click .buy-gems-prompt-button': 'onBuyGemsPromptButtonClicked',
    'click': 'onClickedSomewhere',
    'update #unequipped .nano': 'onScrollUnequipped'
  };

  InventoryModal.prototype.shortcuts = {
    'esc': 'clearSelection',
    'enter': 'onClickPlayLevel'
  };

  InventoryModal.prototype.initialize = function(options) {
    this.onScrollUnequipped = _.throttle(_.bind(this.onScrollUnequipped, this), 200);
    InventoryModal.__super__.initialize.apply(this, arguments);
    this.items = new CocoCollection([], {
      model: ThangType
    });
    this.items.url = '/db/thang.type?view=items';
    this.items.setProjection(['name', 'slug', 'components', 'original', 'rasterIcon', 'dollImages', 'gems', 'tier', 'description', 'heroClass', 'i18n']);
    this.supermodel.loadCollection(this.items, 'items');
    return this.equipment = {};
  };

  InventoryModal.prototype.onItemsLoaded = function() {
    var equipped, i, item, itemGroup, j, k, len, len1, len2, programmableConfig, ref, ref1, ref2, ref3, ref4, ref5, ref6, results;
    ref = this.items.models;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.notInLevel = true;
      programmableConfig = (ref1 = _.find(item.get('components'), function(c) {
        var ref2;
        return (ref2 = c.config) != null ? ref2.programmableProperties : void 0;
      })) != null ? ref1.config : void 0;
      item.programmableProperties = ((programmableConfig != null ? programmableConfig.programmableProperties : void 0) || []).concat((programmableConfig != null ? programmableConfig.moreProgrammableProperties : void 0) || []);
    }
    this.itemsProgrammablePropertiesConfigured = true;
    this.equipment = this.options.equipment || ((ref2 = this.options.session) != null ? (ref3 = ref2.get('heroConfig')) != null ? ref3.inventory : void 0 : void 0) || ((ref4 = me.get('heroConfig')) != null ? ref4.inventory : void 0) || {};
    this.equipment = $.extend(true, {}, this.equipment);
    this.requireLevelEquipment();
    this.itemGroups = {};
    this.itemGroups.requiredPurchaseItems = new Backbone.Collection();
    this.itemGroups.availableItems = new Backbone.Collection();
    this.itemGroups.restrictedItems = new Backbone.Collection();
    this.itemGroups.lockedItems = new Backbone.Collection();
    ref5 = _.values(this.itemGroups);
    for (j = 0, len1 = ref5.length; j < len1; j++) {
      itemGroup = ref5[j];
      itemGroup.comparator = (function(m) {
        var ref6;
        return (ref6 = m.get('tier')) != null ? ref6 : m.get('gems');
      });
    }
    equipped = _.values(this.equipment);
    ref6 = this.items.models;
    results = [];
    for (k = 0, len2 = ref6.length; k < len2; k++) {
      item = ref6[k];
      results.push(this.sortItem(item, equipped));
    }
    return results;
  };

  InventoryModal.prototype.sortItem = function(item, equipped) {
    var allRestrictedGear, heroClass, i, inCampaignView, j, len, len1, locked, placeholder, ref, ref1, ref2, ref3, ref4, ref5, requiredGear, requiredItems, requiredToPurchase, restricted, restrictedGear, slot;
    if (equipped == null) {
      equipped = _.values(this.equipment);
    }
    item.classes = _.clone(item.getAllowedSlots());
    ref = item.getAllowedHeroClasses();
    for (i = 0, len = ref.length; i < len; i++) {
      heroClass = ref[i];
      item.classes.push(heroClass);
    }
    if (ref1 = item.get('original'), indexOf.call(equipped, ref1) >= 0) {
      item.classes.push('equipped');
    }
    locked = !me.ownsItem(item.get('original'));
    restrictedGear = this.calculateRestrictedGearPerSlot();
    allRestrictedGear = _.flatten(_.values(restrictedGear));
    restricted = (ref2 = item.get('original'), indexOf.call(allRestrictedGear, ref2) >= 0);
    requiredToPurchase = false;
    inCampaignView = $('#campaign-view').length;
    if (!(gearSlugs[item.get('original')] === 'tarnished-bronze-breastplate' && inCampaignView && this.options.level.get('slug') === 'the-raised-sword')) {
      requiredGear = this.calculateRequiredGearPerSlot();
      ref3 = item.getAllowedSlots();
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        slot = ref3[j];
        if (!(requiredItems = requiredGear[slot])) {
          continue;
        }
        if (this.equipment[slot] && (ref4 = this.equipment[slot], indexOf.call(allRestrictedGear, ref4) < 0) && indexOf.call(this.ringSlots, slot) < 0) {
          continue;
        }
        if (item.get('original') === requiredItems[0] && !_.find(requiredItems, function(requiredItem) {
          return me.ownsItem(requiredItem);
        })) {
          requiredToPurchase = true;
          break;
        }
      }
    }
    if (requiredToPurchase && locked && !item.get('gems')) {
      if ((ref5 = application.tracker) != null) {
        ref5.trackEvent('Required Item Locked', {
          level: this.options.level.get('slug'),
          label: this.options.level.get('slug'),
          item: item.get('name'),
          playerLevel: me.level(),
          levelUnlocked: me.ownsLevel(this.options.level.get('original'))
        });
      }
      locked = false;
    }
    placeholder = !item.getFrontFacingStats().props.length && !_.size(item.getFrontFacingStats().stats);
    if (placeholder && locked) {
      null;
    } else if (locked && requiredToPurchase) {
      item.classes.push('locked');
      this.itemGroups.requiredPurchaseItems.add(item);
    } else if (locked) {
      item.classes.push('locked');
      if (item.isSilhouettedItem() || !item.get('gems')) {
        null;
      } else {
        this.itemGroups.lockedItems.add(item);
      }
    } else if (restricted) {
      this.itemGroups.restrictedItems.add(item);
      item.classes.push('restricted');
    } else {
      this.itemGroups.availableItems.add(item);
    }
    if (item.get('tier') != null) {
      return item.level = item.levelRequiredForItem();
    }
  };

  InventoryModal.prototype.onLoaded = function() {
    this.onItemsLoaded();
    return InventoryModal.__super__.onLoaded.call(this);
  };

  InventoryModal.prototype.getRenderData = function(context) {
    var itemOriginal, ref, ref1, slot;
    if (context == null) {
      context = {};
    }
    context = InventoryModal.__super__.getRenderData.call(this, context);
    context.equipped = _.values(this.equipment);
    context.items = this.items.models;
    context.itemGroups = this.itemGroups;
    context.slots = this.slots;
    context.selectedHero = this.selectedHero;
    context.selectedHeroClass = (ref = this.selectedHero) != null ? ref.get('heroClass') : void 0;
    context.equipment = _.clone(this.equipment);
    ref1 = context.equipment;
    for (slot in ref1) {
      itemOriginal = ref1[slot];
      context.equipment[slot] = this.items.findWhere({
        original: itemOriginal
      });
    }
    context.gems = me.gems();
    return context;
  };

  InventoryModal.prototype.afterRender = function() {
    InventoryModal.__super__.afterRender.call(this);
    this.$el.find('#play-level-button').css('visibility', 'hidden');
    if (!this.supermodel.finished()) {
      return;
    }
    this.$el.find('#play-level-button').css('visibility', 'visible');
    this.setUpDraggableEventsForAvailableEquipment();
    this.setUpDraggableEventsForEquippedArea();
    this.delegateEvents();
    this.itemDetailsView = new ItemDetailsView();
    this.insertSubView(this.itemDetailsView);
    this.requireLevelEquipment();
    this.$el.find('.nano').nanoScroller({
      alwaysVisible: true
    });
    this.onSelectionChanged();
    return this.onEquipmentChanged();
  };

  InventoryModal.prototype.afterInsert = function() {
    InventoryModal.__super__.afterInsert.call(this);
    this.canvasWidth = this.$el.find('canvas').innerWidth();
    this.canvasHeight = this.$el.find('canvas').innerHeight();
    this.inserted = true;
    return this.requireLevelEquipment();
  };

  InventoryModal.prototype.setUpDraggableEventsForAvailableEquipment = function() {
    var availableItemEl, dragHelper, i, len, ref, results;
    ref = this.$el.find('#unequipped .item');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      availableItemEl = ref[i];
      availableItemEl = $(availableItemEl);
      if (availableItemEl.hasClass('locked') || availableItemEl.hasClass('restricted')) {
        continue;
      }
      dragHelper = availableItemEl.clone().addClass('draggable-item');
      results.push((function(_this) {
        return function(dragHelper, availableItemEl) {
          availableItemEl.draggable({
            revert: 'invalid',
            appendTo: _this.$el,
            cursorAt: {
              left: 35.5,
              top: 35.5
            },
            helper: function() {
              return dragHelper;
            },
            revertDuration: 200,
            distance: 10,
            scroll: false,
            zIndex: 1100
          });
          return availableItemEl.on('dragstart', function() {
            return _this.selectUnequippedItem(availableItemEl);
          });
        };
      })(this)(dragHelper, availableItemEl));
    }
    return results;
  };

  InventoryModal.prototype.setUpDraggableEventsForEquippedArea = function() {
    var fn, i, itemSlot, len, ref, slot;
    ref = this.$el.find('.item-slot');
    fn = (function(_this) {
      return function(slot, itemSlot) {
        $(itemSlot).droppable({
          drop: function(e, ui) {
            return _this.equipSelectedItem();
          },
          accept: function(el) {
            return $(el).parent().hasClass(slot);
          },
          activeClass: 'droppable',
          hoverClass: 'droppable-hover',
          tolerance: 'touch'
        });
        return _this.makeEquippedSlotDraggable($(itemSlot));
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      itemSlot = ref[i];
      slot = $(itemSlot).data('slot');
      fn(slot, itemSlot);
    }
    return this.$el.find('#equipped').droppable({
      drop: (function(_this) {
        return function(e, ui) {
          return _this.equipSelectedItem();
        };
      })(this),
      accept: function(el) {
        return true;
      },
      activeClass: 'droppable',
      hoverClass: 'droppable-hover',
      tolerance: 'pointer'
    });
  };

  InventoryModal.prototype.makeEquippedSlotDraggable = function(slot) {
    var shouldStayEquippedWhenDropped, unequip;
    unequip = (function(_this) {
      return function() {
        var item, itemEl, selectedSlotItemID;
        itemEl = _this.unequipItemFromSlot(slot);
        selectedSlotItemID = itemEl.data('item-id');
        item = _this.items.get(selectedSlotItemID);
        _this.requireLevelEquipment();
        _this.showItemDetails(item, 'equip');
        _this.onSelectionChanged();
        return _this.onEquipmentChanged();
      };
    })(this);
    shouldStayEquippedWhenDropped = function(isValidDrop) {
      var pos, revert;
      pos = $(this).position();
      revert = Math.abs(pos.left) < $(this).outerWidth() && Math.abs(pos.top) < $(this).outerHeight();
      if (!revert) {
        unequip();
      }
      return revert;
    };
    $(slot).find('img').draggable({
      revert: shouldStayEquippedWhenDropped,
      appendTo: this.$el,
      cursorAt: {
        left: 35.5,
        top: 35.5
      },
      revertDuration: 200,
      distance: 10,
      scroll: false,
      zIndex: 100
    });
    return slot.on('dragstart', (function(_this) {
      return function() {
        return _this.selectItemSlot(slot);
      };
    })(this));
  };

  InventoryModal.prototype.onItemSlotClick = function(e) {
    var ref;
    if ((ref = this.remainingRequiredEquipment) != null ? ref.length : void 0) {
      return;
    }
    return this.selectItemSlot($(e.target).closest('.item-slot'));
  };

  InventoryModal.prototype.onUnequippedItemClick = function(e) {
    var itemEl;
    if (this.justDoubleClicked) {
      return;
    }
    if (this.justClickedEquipItemButton) {
      return;
    }
    itemEl = $(e.target).closest('.item');
    return this.selectUnequippedItem(itemEl);
  };

  InventoryModal.prototype.onUnequippedItemDoubleClick = function(e) {
    var itemEl;
    itemEl = $(e.target).closest('.item');
    if (itemEl.hasClass('locked') || itemEl.hasClass('restricted')) {
      return;
    }
    this.equipSelectedItem();
    this.justDoubleClicked = true;
    return _.defer((function(_this) {
      return function() {
        return _this.justDoubleClicked = false;
      };
    })(this));
  };

  InventoryModal.prototype.onEquippedItemDoubleClick = function() {
    return this.unequipSelectedItem();
  };

  InventoryModal.prototype.onClickEquipItemViewed = function() {
    return this.equipSelectedItem();
  };

  InventoryModal.prototype.onClickUnequipItemViewed = function() {
    return this.unequipSelectedItem();
  };

  InventoryModal.prototype.onClickEquipItemButton = function(e) {
    var itemEl;
    this.playSound('menu-button-click');
    itemEl = $(e.target).closest('.item');
    this.selectUnequippedItem(itemEl);
    this.equipSelectedItem();
    this.justClickedEquipItemButton = true;
    return _.defer((function(_this) {
      return function() {
        return _this.justClickedEquipItemButton = false;
      };
    })(this));
  };

  InventoryModal.prototype.selectItemSlot = function(slotEl) {
    var item, selectedSlotItemID;
    this.clearSelection();
    slotEl.addClass('selected');
    selectedSlotItemID = slotEl.find('.item').data('item-id');
    item = this.items.get(selectedSlotItemID);
    if (item) {
      this.showItemDetails(item, 'unequip');
    }
    return this.onSelectionChanged();
  };

  InventoryModal.prototype.selectUnequippedItem = function(itemEl) {
    var showExtra;
    this.clearSelection();
    itemEl.addClass('active');
    showExtra = itemEl.hasClass('restricted') ? 'restricted' : !itemEl.hasClass('locked') ? 'equip' : '';
    this.showItemDetails(this.items.get(itemEl.data('item-id')), showExtra);
    return this.onSelectionChanged();
  };

  InventoryModal.prototype.equipSelectedItem = function() {
    var allowedSlot, allowedSlots, firstSlot, i, len, selectedItem, selectedItemEl, slotEl, unequipped, unequippedSlot;
    selectedItemEl = this.getSelectedUnequippedItem();
    selectedItem = this.items.get(selectedItemEl.data('item-id'));
    if (!selectedItem) {
      return;
    }
    allowedSlots = selectedItem.getAllowedSlots();
    firstSlot = unequippedSlot = null;
    for (i = 0, len = allowedSlots.length; i < len; i++) {
      allowedSlot = allowedSlots[i];
      slotEl = this.$el.find(".item-slot[data-slot='" + allowedSlot + "']");
      if (firstSlot == null) {
        firstSlot = slotEl;
      }
      if (!slotEl.find('img').length) {
        if (unequippedSlot == null) {
          unequippedSlot = slotEl;
        }
      }
    }
    slotEl = unequippedSlot != null ? unequippedSlot : firstSlot;
    selectedItemEl.effect('transfer', {
      to: slotEl,
      duration: 500,
      easing: 'easeOutCubic'
    });
    unequipped = this.unequipItemFromSlot(slotEl);
    selectedItemEl.addClass('equipped');
    slotEl.append(selectedItemEl.find('img').clone().addClass('item').data('item-id', selectedItem.id));
    this.clearSelection();
    this.showItemDetails(selectedItem, 'unequip');
    slotEl.addClass('selected');
    selectedItem.classes.push('equipped');
    this.makeEquippedSlotDraggable(slotEl);
    this.requireLevelEquipment();
    this.onSelectionChanged();
    return this.onEquipmentChanged();
  };

  InventoryModal.prototype.unequipSelectedItem = function() {
    var item, itemEl, selectedSlotItemID, slotEl;
    slotEl = this.getSelectedSlot();
    this.clearSelection();
    itemEl = this.unequipItemFromSlot(slotEl);
    if (!(itemEl != null ? itemEl.length : void 0)) {
      return;
    }
    itemEl.addClass('active');
    slotEl.effect('transfer', {
      to: itemEl,
      duration: 500,
      easing: 'easeOutCubic'
    });
    selectedSlotItemID = itemEl.data('item-id');
    item = this.items.get(selectedSlotItemID);
    item.classes = _.without(item.classes, 'equipped');
    this.showItemDetails(item, 'equip');
    this.requireLevelEquipment();
    this.onSelectionChanged();
    return this.onEquipmentChanged();
  };

  InventoryModal.prototype.clearSelection = function() {
    this.deselectAllSlots();
    this.deselectAllUnequippedItems();
    return this.hideItemDetails();
  };

  InventoryModal.prototype.unequipItemFromSlot = function(slotEl) {
    var item, itemEl, itemIDToUnequip;
    itemEl = slotEl.find('.item');
    itemIDToUnequip = itemEl.data('item-id');
    if (!itemIDToUnequip) {
      return;
    }
    itemEl.remove();
    item = this.items.get(itemIDToUnequip);
    item.classes = _.without(item.classes, 'equipped');
    return this.$el.find("#unequipped .item[data-item-id=" + itemIDToUnequip + "]").removeClass('equipped');
  };

  InventoryModal.prototype.deselectAllSlots = function() {
    return this.$el.find('#equipped .item-slot.selected').removeClass('selected');
  };

  InventoryModal.prototype.deselectAllUnequippedItems = function() {
    return this.$el.find('#unequipped .item').removeClass('active');
  };

  InventoryModal.prototype.getSlot = function(name) {
    return this.$el.find(".item-slot[data-slot=" + name + "]");
  };

  InventoryModal.prototype.getSelectedSlot = function() {
    return this.$el.find('#equipped .item-slot.selected');
  };

  InventoryModal.prototype.getSelectedUnequippedItem = function() {
    return this.$el.find('#unequipped .item.active');
  };

  InventoryModal.prototype.onSelectionChanged = function() {
    var heroClass, itemsCanBeEquipped, ref, toShow;
    heroClass = (ref = this.selectedHero) != null ? ref.get('heroClass') : void 0;
    itemsCanBeEquipped = this.$el.find('#unequipped .item.available:not(.equipped)').filter('.' + heroClass).length;
    toShow = this.$el.find('#double-click-hint, #available-description');
    if (itemsCanBeEquipped) {
      toShow.removeClass('secret');
    } else {
      toShow.addClass('secret');
    }
    return this.delegateEvents();
  };

  InventoryModal.prototype.showItemDetails = function(item, showExtra) {
    this.itemDetailsView.setItem(item);
    this.$el.find('#item-details-extra > *').addClass('secret');
    return this.$el.find("#" + showExtra + "-item-viewed").removeClass('secret');
  };

  InventoryModal.prototype.hideItemDetails = function() {
    var ref;
    if ((ref = this.itemDetailsView) != null) {
      ref.setItem(null);
    }
    return this.$el.find('#item-details-extra > *').addClass('secret');
  };

  InventoryModal.prototype.getCurrentEquipmentConfig = function() {
    var config, i, item, len, ref, slot, slotItemID, slotName;
    config = {};
    ref = this.$el.find('.item-slot');
    for (i = 0, len = ref.length; i < len; i++) {
      slot = ref[i];
      slotName = $(slot).data('slot');
      slotItemID = $(slot).find('.item').data('item-id');
      if (!slotItemID) {
        continue;
      }
      item = _.find(this.items.models, {
        id: slotItemID
      });
      config[slotName] = item.get('original');
    }
    return config;
  };

  InventoryModal.prototype.requireLevelEquipment = function() {
    var equipment, hadRequired, ref;
    if (!(this.inserted && this.itemsProgrammablePropertiesConfigured)) {
      return;
    }
    equipment = this.supermodel.finished() ? this.getCurrentEquipmentConfig() : this.equipment;
    hadRequired = (ref = this.remainingRequiredEquipment) != null ? ref.length : void 0;
    this.remainingRequiredEquipment = [];
    this.$el.find('.should-equip').removeClass('should-equip');
    this.unequipClassRestrictedItems(equipment);
    this.unequipLevelRestrictedItems(equipment);
    this.updateLevelRequiredItems(equipment);
    if (hadRequired && !this.remainingRequiredEquipment.length) {
      this.endHighlight();
      this.highlightElement('#play-level-button', {
        duration: 5000
      });
    }
    return $('#play-level-button').prop('disabled', this.remainingRequiredEquipment.length > 0);
  };

  InventoryModal.prototype.unequipClassRestrictedItems = function(equipment) {
    var heroClass, item, itemModel, ref, ref1, results, slot;
    if (!(this.supermodel.finished() && (heroClass = (ref = this.selectedHero) != null ? ref.get('heroClass') : void 0))) {
      return;
    }
    ref1 = _.clone(equipment);
    results = [];
    for (slot in ref1) {
      item = ref1[slot];
      itemModel = this.items.findWhere({
        original: item
      });
      if (!(itemModel && indexOf.call(itemModel.classes, heroClass) >= 0)) {
        console.log('Unequipping', itemModel.get('heroClass'), 'item', itemModel.get('name'), 'from slot due to class restrictions.');
        this.unequipItemFromSlot(this.$el.find(".item-slot[data-slot='" + slot + "']"));
        results.push(delete equipment[slot]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  InventoryModal.prototype.calculateRequiredGearPerSlot = function() {
    var i, item, j, k, len, len1, len2, prop, ref, ref1, ref2, ref3, ref4, ref5, requiredGear, requiredProperties, requiredPropertiesOnThisItem, requiredPropertiesPerSlot, restrictedProperties, restrictedPropertiesOnThisItem, slot;
    if (this.requiredGearPerSlot) {
      return this.requiredGearPerSlot;
    }
    requiredGear = (ref = _.clone(this.options.level.get('requiredGear'))) != null ? ref : {};
    requiredProperties = (ref1 = this.options.level.get('requiredProperties')) != null ? ref1 : [];
    restrictedProperties = (ref2 = this.options.level.get('restrictedProperties')) != null ? ref2 : [];
    requiredPropertiesPerSlot = {};
    ref3 = this.items.models;
    for (i = 0, len = ref3.length; i < len; i++) {
      item = ref3[i];
      requiredPropertiesOnThisItem = _.intersection(item.programmableProperties, requiredProperties);
      restrictedPropertiesOnThisItem = _.intersection(item.programmableProperties, restrictedProperties);
      if (!(requiredPropertiesOnThisItem.length && !restrictedPropertiesOnThisItem.length)) {
        continue;
      }
      ref4 = item.getAllowedSlots();
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        slot = ref4[j];
        if (slot !== 'right-hand' && _.isEqual(requiredPropertiesOnThisItem, ['buildXY'])) {
          continue;
        }
        if (requiredGear[slot] == null) {
          requiredGear[slot] = [];
        }
        if (ref5 = item.get('original'), indexOf.call(requiredGear[slot], ref5) < 0) {
          requiredGear[slot].push(item.get('original'));
        }
        if (requiredPropertiesPerSlot[slot] == null) {
          requiredPropertiesPerSlot[slot] = [];
        }
        for (k = 0, len2 = requiredPropertiesOnThisItem.length; k < len2; k++) {
          prop = requiredPropertiesOnThisItem[k];
          if (indexOf.call(requiredPropertiesPerSlot[slot], prop) < 0) {
            requiredPropertiesPerSlot[slot].push(prop);
          }
        }
      }
    }
    this.requiredPropertiesPerSlot = requiredPropertiesPerSlot;
    this.requiredGearPerSlot = requiredGear;
    return this.requiredGearPerSlot;
  };

  InventoryModal.prototype.calculateRestrictedGearPerSlot = function() {
    var i, item, j, len, len1, ref, ref1, ref2, ref3, ref4, requiredPropertiesNotOnThisItem, restrictedGear, restrictedProperties, restrictedPropertiesOnThisItem, slot;
    if (this.restrictedGearPerSlot) {
      return this.restrictedGearPerSlot;
    }
    if (!this.requiredGearPerSlot) {
      this.calculateRequiredGearPerSlot();
    }
    restrictedGear = (ref = _.clone(this.options.level.get('restrictedGear'))) != null ? ref : {};
    restrictedProperties = (ref1 = this.options.level.get('restrictedProperties')) != null ? ref1 : [];
    ref2 = this.items.models;
    for (i = 0, len = ref2.length; i < len; i++) {
      item = ref2[i];
      restrictedPropertiesOnThisItem = _.intersection(item.programmableProperties, restrictedProperties);
      ref3 = item.getAllowedSlots();
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        slot = ref3[j];
        requiredPropertiesNotOnThisItem = _.without.apply(_, [this.requiredPropertiesPerSlot[slot]].concat(slice.call(item.programmableProperties)));
        if (restrictedPropertiesOnThisItem.length || requiredPropertiesNotOnThisItem.length) {
          if (restrictedGear[slot] == null) {
            restrictedGear[slot] = [];
          }
          if (ref4 = item.get('original'), indexOf.call(restrictedGear[slot], ref4) < 0) {
            restrictedGear[slot].push(item.get('original'));
          }
        }
      }
    }
    this.restrictedGearPerSlot = restrictedGear;
    return this.restrictedGearPerSlot;
  };

  InventoryModal.prototype.unequipLevelRestrictedItems = function(equipment) {
    var equipped, i, item, items, len, restrictedGear, slot;
    restrictedGear = this.calculateRestrictedGearPerSlot();
    for (slot in restrictedGear) {
      items = restrictedGear[slot];
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        equipped = equipment[slot];
        if (equipped && equipped === item) {
          console.log('Unequipping restricted item', equipped, 'for', slot, 'before level', this.options.level.get('slug'));
          this.unequipItemFromSlot(this.$el.find(".item-slot[data-slot='" + slot + "']"));
          delete equipment[slot];
        }
      }
    }
    return null;
  };

  InventoryModal.prototype.updateLevelRequiredItems = function(equipment) {
    var $itemEl, availableSlotSelector, bestOwnedItem, heroClass, inCampaignView, item, itemModel, itemOffsetBottom, itemOffsetTop, items, parentHeight, ref, ref1, requiredGear, slot, slug, validSlots;
    if (!(heroClass = (ref = this.selectedHero) != null ? ref.get('heroClass') : void 0)) {
      return;
    }
    requiredGear = this.calculateRequiredGearPerSlot();
    for (slot in requiredGear) {
      items = requiredGear[slot];
      if (!items.length) {
        continue;
      }
      if (indexOf.call(this.ringSlots, slot) >= 0) {
        validSlots = this.ringSlots;
      } else {
        validSlots = [slot];
      }
      if (validSlots.some(function(slot) {
        var equipped;
        equipped = equipment[slot];
        return indexOf.call(items, equipped) >= 0;
      })) {
        continue;
      }
      if (equipment[slot] && indexOf.call(this.ringSlots, slot) < 0) {
        continue;
      }
      items = (function() {
        var i, len, ref1, ref2, results;
        results = [];
        for (i = 0, len = items.length; i < len; i++) {
          item = items[i];
          if (indexOf.call((ref1 = (ref2 = this.items.findWhere({
            original: item
          })) != null ? ref2.classes : void 0) != null ? ref1 : [], heroClass) >= 0) {
            results.push(item);
          }
        }
        return results;
      }).call(this);
      if (!items.length) {
        continue;
      }
      items = _.sortBy(items, (function(_this) {
        return function(item) {
          var ref1;
          return (ref1 = _this.items.findWhere({
            original: item
          }).get('tier')) != null ? ref1 : 9001;
        };
      })(this));
      bestOwnedItem = _.findLast(items, function(item) {
        return me.ownsItem(item);
      });
      item = bestOwnedItem != null ? bestOwnedItem : items[0];
      slug = gearSlugs[item];
      inCampaignView = $('#campaign-view').length;
      if (slug === 'tarnished-bronze-breastplate' && inCampaignView && this.options.level.get('slug') === 'the-raised-sword') {
        continue;
      }
      itemModel = this.items.findWhere({
        original: item
      });
      availableSlotSelector = "#unequipped .item[data-item-id='" + itemModel.id + "']";
      this.highlightElement(availableSlotSelector, {
        delay: 500,
        sides: ['right'],
        rotation: Math.PI / 2
      });
      $itemEl = this.$el.find(availableSlotSelector).addClass('should-equip');
      this.$el.find("#equipped div[data-slot='" + slot + "']").addClass('should-equip');
      if (itemOffsetTop = (ref1 = $itemEl[0]) != null ? ref1.offsetTop : void 0) {
        itemOffsetBottom = itemOffsetTop + $itemEl.outerHeight(true);
        parentHeight = $itemEl.parent().height();
        if (itemOffsetBottom > $itemEl.parent().scrollTop() + parentHeight) {
          $itemEl.parent().scrollTop(itemOffsetBottom - parentHeight);
        } else if (itemOffsetTop < $itemEl.parent().scrollTop()) {
          $itemEl.parent().scrollTop(itemOffsetTop);
        }
      }
      this.remainingRequiredEquipment.push({
        slot: slot,
        item: item
      });
    }
    return null;
  };

  InventoryModal.prototype.setHero = function(selectedHero) {
    this.selectedHero = selectedHero;
    if (this.selectedHero.loading) {
      this.listenToOnce(this.selectedHero, 'sync', (function(_this) {
        return function() {
          return typeof _this.setHero === "function" ? _this.setHero(_this.selectedHero) : void 0;
        };
      })(this));
      return;
    }
    this.$el.removeClass('Warrior Ranger Wizard').addClass(this.selectedHero.get('heroClass'));
    this.requireLevelEquipment();
    this.render();
    return this.onEquipmentChanged();
  };

  InventoryModal.prototype.onShown = function() {
    return this.requireLevelEquipment();
  };

  InventoryModal.prototype.onHidden = function() {
    this.endHighlight();
    InventoryModal.__super__.onHidden.call(this);
    return this.playSound('game-menu-close');
  };

  InventoryModal.prototype.onClickChooseHero = function() {
    this.playSound('menu-button-click');
    this.hide();
    return this.trigger('choose-hero-click');
  };

  InventoryModal.prototype.onClickPlayLevel = function(e) {
    var isSafari, isTooShort, levelSlug, ref, ua;
    if (this.$el.find('#play-level-button').prop('disabled')) {
      return;
    }
    levelSlug = this.options.level.get('slug');
    this.playSound('menu-button-click');
    this.showLoading();
    ua = navigator.userAgent.toLowerCase();
    isSafari = /safari/.test(ua) && !/chrome/.test(ua);
    isTooShort = $(window).height() < 658;
    if (isTooShort && !me.isAdmin() && !hasGoneFullScreenOnce && !isSafari) {
      this.toggleFullscreen();
      hasGoneFullScreenOnce = true;
    }
    this.updateConfig((function(_this) {
      return function() {
        return typeof _this.trigger === "function" ? _this.trigger('play-click') : void 0;
      };
    })(this));
    return (ref = window.tracker) != null ? ref.trackEvent('Inventory Play', {
      category: 'Play Level',
      level: levelSlug
    }) : void 0;
  };

  InventoryModal.prototype.updateConfig = function(callback, skipSessionSave) {
    var hero, inventory, lastHeroConfig, patchMe, patchSession, ref, ref1, ref2, sessionHeroConfig;
    sessionHeroConfig = (ref = this.options.session.get('heroConfig')) != null ? ref : {};
    lastHeroConfig = (ref1 = me.get('heroConfig')) != null ? ref1 : {};
    inventory = this.getCurrentEquipmentConfig();
    patchSession = patchMe = false;
    patchSession || (patchSession = !_.isEqual(inventory, sessionHeroConfig.inventory));
    sessionHeroConfig.inventory = inventory;
    if (hero = (ref2 = this.selectedHero) != null ? ref2.get('original') : void 0) {
      patchSession || (patchSession = !_.isEqual(hero, sessionHeroConfig.thangType));
      sessionHeroConfig.thangType = hero;
    }
    patchMe || (patchMe = !_.isEqual(inventory, lastHeroConfig.inventory));
    lastHeroConfig.inventory = inventory;
    if (patchMe) {
      console.log('setting me.heroConfig to', JSON.stringify(lastHeroConfig));
      me.set('heroConfig', lastHeroConfig);
      me.patch();
    }
    if (patchSession) {
      console.log('setting session.heroConfig to', JSON.stringify(sessionHeroConfig));
      this.options.session.set('heroConfig', sessionHeroConfig);
      if (!skipSessionSave) {
        return this.options.session.patch({
          success: callback
        });
      }
    } else {
      return typeof callback === "function" ? callback() : void 0;
    }
  };

  InventoryModal.prototype.onUnlockButtonClicked = function(e) {
    var affordable, button, equipped, i, item, len, otherItem, purchase, purchased, ref, ref1, ref2;
    e.stopPropagation();
    button = $(e.target).closest('button');
    item = this.items.get(button.data('item-id'));
    affordable = item.affordable;
    if (!affordable) {
      this.playSound('menu-button-click');
      if (!features.freeOnly) {
        return this.askToBuyGems(button);
      }
    } else if (button.hasClass('confirm')) {
      this.playSound('menu-button-unlock-end');
      purchase = Purchase.makeFor(item);
      purchase.save();
      purchased = (ref = me.get('purchased')) != null ? ref : {};
      if (purchased.items == null) {
        purchased.items = [];
      }
      purchased.items.push(item.get('original'));
      me.set('purchased', purchased);
      me.set('spent', ((ref1 = me.get('spent')) != null ? ref1 : 0) + item.get('gems'));
      this.itemGroups.lockedItems.remove(item);
      this.itemGroups.requiredPurchaseItems.remove(item);
      equipped = _.values(this.getCurrentEquipmentConfig());
      ref2 = this.items.models;
      for (i = 0, len = ref2.length; i < len; i++) {
        otherItem = ref2[i];
        this.sortItem(otherItem, equipped);
      }
      this.renderSelectors('#unequipped', '#gems-count');
      this.requireLevelEquipment();
      this.delegateEvents();
      this.setUpDraggableEventsForAvailableEquipment();
      this.itemDetailsView.setItem(item);
      this.onScrollUnequipped(true);
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

  InventoryModal.prototype.askToSignUp = function() {
    var createAccountModal;
    createAccountModal = new CreateAccountModal({
      supermodel: this.supermodel
    });
    return this.openModalView(createAccountModal);
  };

  InventoryModal.prototype.askToBuyGems = function(unlockButton) {
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

  InventoryModal.prototype.onBuyGemsPromptButtonClicked = function(e) {
    this.playSound('menu-button-click');
    if (me.get('anonymous')) {
      return this.askToSignUp();
    }
    return this.openModalView(new BuyGemsModal());
  };

  InventoryModal.prototype.onClickedSomewhere = function(e) {
    if (this.destroyed) {
      return;
    }
    return this.$el.find('.unlock-button').popover('destroy');
  };

  InventoryModal.prototype.onScrollUnequipped = function(forceLoadAll) {
    var i, item, itemEl, items, len, nanoContent, results, threshold;
    if (forceLoadAll == null) {
      forceLoadAll = false;
    }
    if (this.destroyed) {
      return;
    }
    nanoContent = this.$el.find('#unequipped .nano-content');
    items = nanoContent.find('.item:visible:not(.loaded)');
    threshold = nanoContent.height() + 100;
    results = [];
    for (i = 0, len = items.length; i < len; i++) {
      itemEl = items[i];
      itemEl = $(itemEl);
      if (itemEl.position().top < threshold || forceLoadAll) {
        itemEl.addClass('loaded');
        item = this.items.get(itemEl.data('item-id'));
        results.push(itemEl.find('img').attr('src', item.getPortraitURL()));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  InventoryModal.prototype.onEquipmentChanged = function() {
    var didAdd, dollImages, equipment, gender, heroClass, item, original, ref, ref1, ref2, ref3, slot, slotsWithImages;
    heroClass = (ref = (ref1 = this.selectedHero) != null ? ref1.get('heroClass') : void 0) != null ? ref : 'Warrior';
    gender = (ref2 = (ref3 = this.selectedHero) != null ? ref3.get('slug') : void 0, indexOf.call(heroGenders.male, ref2) >= 0) ? 'male' : 'female';
    this.$el.find('#hero-image, #hero-image-hair, #hero-image-head, #hero-image-thumb').removeClass().addClass(gender + " " + heroClass);
    equipment = this.getCurrentEquipmentConfig();
    this.onScrollUnequipped();
    if (!(_.size(equipment) && this.supermodel.finished())) {
      return;
    }
    this.removeDollImages();
    slotsWithImages = [];
    for (slot in equipment) {
      original = equipment[slot];
      item = _.find(this.items.models, function(item) {
        return item.get('original') === original;
      });
      if (!(dollImages = item != null ? item.get('dollImages') : void 0)) {
        continue;
      }
      didAdd = this.addDollImage(slot, dollImages, heroClass, gender, item);
      if (item.get('original') !== '54ea39342b7506e891ca70f2') {
        if (didAdd) {
          slotsWithImages.push(slot);
        }
      }
    }
    this.$el.find('#hero-image-hair').toggle(!(indexOf.call(slotsWithImages, 'head') >= 0));
    this.$el.find('#hero-image-thumb').toggle(!(indexOf.call(slotsWithImages, 'gloves') >= 0));
    return this.equipment = this.options.equipment = equipment;
  };

  InventoryModal.prototype.removeDollImages = function() {
    return this.$el.find('.doll-image').remove();
  };

  InventoryModal.prototype.addDollImage = function(slot, dollImages, heroClass, gender, item) {
    var didAdd, i, imageEl, imageKey, imageKeys, imageURL, len, ref, ref1, ref2, ref3, ref4;
    heroClass = (ref = (ref1 = this.selectedHero) != null ? ref1.get('heroClass') : void 0) != null ? ref : 'Warrior';
    gender = (ref2 = (ref3 = this.selectedHero) != null ? ref3.get('slug') : void 0, indexOf.call(heroGenders.male, ref2) >= 0) ? 'male' : 'female';
    didAdd = false;
    if (slot === 'gloves') {
      if (heroClass === 'Ranger') {
        imageKeys = ["" + gender + heroClass, "" + gender + heroClass + "Thumb"];
      } else {
        imageKeys = ["" + gender, gender + "Thumb"];
      }
    } else if (heroClass === 'Wizard' && slot === 'torso') {
      imageKeys = [gender, gender + "Back"];
    } else if (heroClass === 'Ranger' && slot === 'head' && ((ref4 = item.get('original')) === '5441c2be4e9aeb727cc97105' || ref4 === '5441c3144e9aeb727cc97111')) {
      imageKeys = [gender + "Ranger"];
    } else {
      imageKeys = [gender];
    }
    for (i = 0, len = imageKeys.length; i < len; i++) {
      imageKey = imageKeys[i];
      imageURL = dollImages[imageKey];
      if (!imageURL) {
        console.log("Hmm, should have " + slot + " " + imageKey + " paper doll image, but don't have it.");
      } else {
        imageEl = $('<img>').attr('src', "/file/" + imageURL).addClass("doll-image " + slot + " " + heroClass + " " + gender + " " + (_.string.underscored(imageKey).replace(/_/g, '-'))).attr('draggable', false);
        this.$el.find('#equipped').append(imageEl);
        didAdd = true;
      }
    }
    return didAdd;
  };

  InventoryModal.prototype.destroy = function() {
    var ref;
    this.$el.find('.unlock-button').popover('destroy');
    this.$el.find('.ui-droppable').droppable('destroy');
    this.$el.find('.ui-draggable').draggable('destroy').off('dragstart');
    this.$el.find('.item-slot').off('dragstart');
    if ((ref = this.stage) != null) {
      ref.removeAllChildren();
    }
    return InventoryModal.__super__.destroy.call(this);
  };

  return InventoryModal;

})(ModalView);

heroGenders = {
  male: ['knight', 'samurai', 'trapper', 'potion-master', 'goliath', 'assassin', 'necromancer', 'duelist', 'code-ninja'],
  female: ['captain', 'ninja', 'forest-archer', 'librarian', 'sorcerer', 'raider', 'guardian', 'pixie', 'master-wizard', 'champion']
};

gear = {
  'simple-boots': '53e237bf53457600003e3f05',
  'simple-sword': '53e218d853457600003e3ebe',
  'tarnished-bronze-breastplate': '53e22eac53457600003e3efc',
  'leather-boots': '53e2384453457600003e3f07',
  'leather-belt': '5437002a7beba4a82024a97d',
  'programmaticon-i': '53e4108204c00d4607a89f78',
  'programmaticon-ii': '546e25d99df4a17d0d449be1',
  'crude-glasses': '53e238df53457600003e3f0b',
  'crude-builders-hammer': '53f4e6e3d822c23505b74f42',
  'long-sword': '544d7d1f8494308424f564a3',
  'sundial-wristwatch': '53e2396a53457600003e3f0f',
  'bronze-shield': '544c310ae0017993fce214bf',
  'wooden-glasses': '53e2167653457600003e3eb3',
  'basic-flags': '545bacb41e649a4495f887da',
  'roughedge': '544d7d918494308424f564a7',
  'sharpened-sword': '544d7deb8494308424f564ab',
  'crude-crossbow': '544d7ffd8494308424f564c3',
  'crude-dagger': '544d952b8494308424f56517',
  'weak-charge': '544d957d8494308424f5651f',
  'enchanted-stick': '544d87188494308424f564f1',
  'unholy-tome-i': '546374bc3839c6e02811d308',
  'book-of-life-i': '546375653839c6e02811d30b',
  'rough-sense-stone': '54693140a2b1f53ce79443bc',
  'polished-sense-stone': '53e215a253457600003e3eaf',
  'quartz-sense-stone': '54693240a2b1f53ce79443c5',
  'wooden-builders-hammer': '54694ba3a2b1f53ce794444d',
  'simple-wristwatch': '54693797a2b1f53ce79443e9'
};

gearSlugs = _.invert(gear);
});

;
//# sourceMappingURL=/javascripts/app/views/play/menu/InventoryModal.js.map
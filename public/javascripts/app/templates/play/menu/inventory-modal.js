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

;
//# sourceMappingURL=/javascripts/app/templates/play/menu/inventory-modal.js.map
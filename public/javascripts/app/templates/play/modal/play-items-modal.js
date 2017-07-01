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

;
//# sourceMappingURL=/javascripts/app/templates/play/modal/play-items-modal.js.map
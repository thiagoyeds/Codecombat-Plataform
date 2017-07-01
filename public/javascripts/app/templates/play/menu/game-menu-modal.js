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

;
//# sourceMappingURL=/javascripts/app/templates/play/menu/game-menu-modal.js.map
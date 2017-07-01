require.register("templates/play/modal/leaderboard-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),levelName = locals_.levelName,submenus = locals_.submenus;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/leaderboard-background.png\" draggable=\"false\" id=\"leaderboard-background\"/><h1 class=\"level-title\">" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</h1><div id=\"close-modal\"><span class=\"glyphicon glyphicon-remove\"></span></div><ul id=\"leaderboard-nav\" class=\"nav nav-pills nav-stacked\">");
var lastScoreType = null;
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

if ( lastScoreType && submenu.scoreType != lastScoreType)
{
buf.push("<br/>");
}
buf.push("<li" + (jade.attrs({ "class": [(index ? "" : "active")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu.scoreType + '-' + submenu.timespan + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + ">");
if ( submenu.scoreType != lastScoreType)
{
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.scoreType.replace('-', '_')), "class": [('scoreType')] }, {"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = submenu.scoreType) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"scoreType\">&nbsp;</div>");
}
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.timespan), "class": [('timespan')] }, {"data-i18n":true})) + "></div>");
lastScoreType = submenu.scoreType;
buf.push("</a></li>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

if ( lastScoreType && submenu.scoreType != lastScoreType)
{
buf.push("<br/>");
}
buf.push("<li" + (jade.attrs({ "class": [(index ? "" : "active")] }, {"class":true})) + "><a" + (jade.attrs({ 'href':('#' + submenu.scoreType + '-' + submenu.timespan + '-view'), 'data-toggle':('tab') }, {"href":true,"data-toggle":true})) + ">");
if ( submenu.scoreType != lastScoreType)
{
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.scoreType.replace('-', '_')), "class": [('scoreType')] }, {"data-i18n":true})) + ">" + (jade.escape(null == (jade.interp = submenu.scoreType) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div class=\"scoreType\">&nbsp;</div>");
}
buf.push("<div" + (jade.attrs({ 'data-i18n':('leaderboard.' + submenu.timespan), "class": [('timespan')] }, {"data-i18n":true})) + "></div>");
lastScoreType = submenu.scoreType;
buf.push("</a></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"tab-content leaderboard-tab-content\">");
// iterate submenus
;(function(){
  var $$obj = submenus;
  if ('number' == typeof $$obj.length) {

    for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu.scoreType + '-' + submenu.timespan + '-view'), "class": [('tab-pane')] }, {"id":true})) + "><div class=\"leaderboard-tab-view\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;      var submenu = $$obj[index];

buf.push("<div" + (jade.attrs({ 'id':(submenu.scoreType + '-' + submenu.timespan + '-view'), "class": [('tab-pane')] }, {"id":true})) + "><div class=\"leaderboard-tab-view\"></div></div>");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/leaderboard-modal.js.map
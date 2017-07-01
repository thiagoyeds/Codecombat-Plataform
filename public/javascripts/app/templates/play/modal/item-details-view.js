require.register("templates/play/modal/item-details-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),item = locals_.item,stats = locals_.stats,me = locals_.me,props = locals_.props;buf.push("<div id=\"item-title\"><h2 class=\"one-line big-font\">" + (jade.escape(null == (jade.interp = item ? item.name : '') ? "" : jade.interp)) + "</h2></div><div id=\"item-details-body\">");
if ( item)
{
buf.push("<div class=\"nano\"><div class=\"nano-content\"><div id=\"item-container\"><img" + (jade.attrs({ 'src':(item.getPortraitURL()), 'draggable':("false"), "class": [('item-img')] }, {"src":true,"draggable":true})) + "/><img" + (jade.attrs({ 'src':(item.getPortraitURL()), 'draggable':("false"), "class": [('item-shadow')] }, {"src":true,"draggable":true})) + "/></div><img src=\"/images/pages/play/modal/hr.png\" draggable=\"false\" class=\"hr\"/>");
// iterate stats
;(function(){
  var $$obj = stats;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("stat-row big-font" + (/^en/.test(me.get('preferredLanguage')) && stat.matchedShortName ? " short-name" : ""))] }, {"class":true})) + "><div class=\"stat-label\">" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</div><div class=\"stat\">" + (jade.escape(null == (jade.interp = stat.display) ? "" : jade.interp)) + "</div></div><img" + (jade.attrs({ 'src':("/images/pages/play/modal/hr.png"), 'draggable':("false"), "class": [('hr'),(stat.isLast ? "" : "faded")] }, {"class":true,"src":true,"draggable":true})) + "/>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var stat = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("stat-row big-font" + (/^en/.test(me.get('preferredLanguage')) && stat.matchedShortName ? " short-name" : ""))] }, {"class":true})) + "><div class=\"stat-label\">" + (jade.escape(null == (jade.interp = stat.name) ? "" : jade.interp)) + "</div><div class=\"stat\">" + (jade.escape(null == (jade.interp = stat.display) ? "" : jade.interp)) + "</div></div><img" + (jade.attrs({ 'src':("/images/pages/play/modal/hr.png"), 'draggable':("false"), "class": [('hr'),(stat.isLast ? "" : "faded")] }, {"class":true,"src":true,"draggable":true})) + "/>");
    }

  }
}).call(this);

if ( item.description)
{
buf.push("<div class=\"item-description\">" + (jade.escape(null == (jade.interp = item.description) ? "" : jade.interp)) + "</div>");
}
if ( props.length)
{
buf.push("<div id=\"skills\"><h3 data-i18n=\"play.skills_granted\" class=\"big-font\"></h3>");
// iterate props
;(function(){
  var $$obj = props;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var prop = $$obj[$index];

buf.push("<p><strong>" + (jade.escape(null == (jade.interp = prop.name) ? "" : jade.interp)) + "</strong><span class=\"spr\">:</span><span>" + (null == (jade.interp = prop.description) ? "" : jade.interp) + "</span></p>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var prop = $$obj[$index];

buf.push("<p><strong>" + (jade.escape(null == (jade.interp = prop.name) ? "" : jade.interp)) + "</strong><span class=\"spr\">:</span><span>" + (null == (jade.interp = prop.description) ? "" : jade.interp) + "</span></p>");
    }

  }
}).call(this);

buf.push("</div>");
}
if ( item.comingSoon)
{
buf.push("<div class=\"text-center\"><h3>This item has no stats.</h3><p>Only admins will see it for now.</p></div>");
}
buf.push("</div></div>");
}
buf.push("</div>");
if ( item && !item.owned)
{
if ( item.unequippable)
{
buf.push("<button class=\"btn big-font disabled unequippable\">" + (jade.escape((jade.interp = item.get('heroClass')) == null ? '' : jade.interp)) + " Only</button>");
}
else
{
buf.push("<button" + (jade.attrs({ 'id':('selected-item-unlock-button'), 'data-item-id':(item.id), "class": [('btn'),('big-font'),('unlock-button')] }, {"data-item-id":true})) + "><span data-i18n=\"play.unlock\">Unlock</span><span class=\"spl\">" + (jade.escape(null == (jade.interp = '('+item.get('gems')) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\"/><span>)</span></button>");
}
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/item-details-view.js.map
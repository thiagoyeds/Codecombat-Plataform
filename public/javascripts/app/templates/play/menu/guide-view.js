require.register("templates/play/menu/guide-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),docs = locals_.docs,showVideo = locals_.showVideo,videoLocked = locals_.videoLocked;if ( docs.length === 1)
{
if ( showVideo)
{
buf.push("<h3 id=\"help-video-heading\" data-i18n=\"game_menu.guide_video_tutorial\"></h3>");
if ( videoLocked)
{
buf.push("<p data-i18n=\"subscribe.unlock_help_videos\">Subscribe to unlock all video tutorials.</p><button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\">Subscribe</button>");
}
else
{
buf.push("<div id=\"help-video-player\"></div>");
}
}
buf.push("<h3 data-i18n=\"game_menu.guide_tips\"></h3><div>" + (null == (jade.interp = docs[0].html) ? "" : jade.interp) + "</div>");
}
else
{
buf.push("<ul class=\"nav nav-tabs\">");
if ( showVideo)
{
buf.push("<li><a data-target=\"#docs_tab_help_video\" data-toggle=\"tab\" data-i18n=\"game_menu.guide_video_tutorial\"></a></li>");
}
// iterate docs
;(function(){
  var $$obj = docs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'data-target':("#docs_tab_" + (doc.slug) + ""), 'data-toggle':("tab") }, {"data-target":true,"data-toggle":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</a></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<li><a" + (jade.attrs({ 'data-target':("#docs_tab_" + (doc.slug) + ""), 'data-toggle':("tab") }, {"data-target":true,"data-toggle":true})) + ">" + (jade.escape((jade.interp = doc.name) == null ? '' : jade.interp)) + "</a></li>");
    }

  }
}).call(this);

buf.push("</ul><div class=\"tab-content\">");
if ( showVideo)
{
buf.push("<div id=\"docs_tab_help_video\" class=\"tab-pane\">");
if ( videoLocked)
{
buf.push("<p data-i18n=\"subscribe.unlock_help_videos\">Subscribe to unlock all video tutorials.</p><button data-i18n=\"subscribe.subscribe_title\" class=\"start-subscription-button btn btn-lg btn-success\">Subscribe</button>");
}
else
{
buf.push("<div id=\"help-video-player\"></div>");
}
buf.push("</div>");
}
// iterate docs
;(function(){
  var $$obj = docs;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var doc = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("docs_tab_" + (doc.slug) + ""), "class": [('tab-pane')] }, {"id":true})) + ">" + (null == (jade.interp = doc.html) ? "" : jade.interp) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var doc = $$obj[$index];

buf.push("<div" + (jade.attrs({ 'id':("docs_tab_" + (doc.slug) + ""), "class": [('tab-pane')] }, {"id":true})) + ">" + (null == (jade.interp = doc.html) ? "" : jade.interp) + "</div>");
    }

  }
}).call(this);

buf.push("</div>");
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
//# sourceMappingURL=/javascripts/app/templates/play/menu/guide-view.js.map
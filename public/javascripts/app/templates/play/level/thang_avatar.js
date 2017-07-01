require.register("templates/play/level/thang_avatar", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),thang = locals_.thang,avatarURL = locals_.avatarURL,includeName = locals_.includeName;buf.push("<div" + (jade.attrs({ "class": [('thang-avatar-wrapper'),("team-" + (thang.team || "neutral"))] }, {"class":true})) + "><!--canvas(width=100, height=100, title=thang.id + \" - \" + thang.team)--><img" + (jade.attrs({ 'src':(avatarURL), 'draggable':("false"), "class": [('avatar')] }, {"src":true,"draggable":true})) + "/><img src=\"/images/level/thang_avatar_frame.png\" draggable=\"false\" class=\"avatar-frame\"/><div class=\"badge problems\"></div><div class=\"badge shared-thangs\"></div></div>");
if ( includeName)
{
buf.push("<div class=\"thang-name\">" + (jade.escape(null == (jade.interp = thang.id) ? "" : jade.interp)) + "</div>");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/thang_avatar.js.map
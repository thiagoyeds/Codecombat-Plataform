require.register("templates/core/achievement-popup", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),style = locals_.style,locked = locals_.locked,imgURL = locals_.imgURL,title = locals_.title,description = locals_.description,popup = locals_.popup,level = locals_.level,$ = locals_.$,currentXP = locals_.currentXP,newXP = locals_.newXP,leftXP = locals_.leftXP,oldXPWidth = locals_.oldXPWidth,newXPWidth = locals_.newXPWidth,leftXPWidth = locals_.leftXPWidth;var addedClass = style + (locked === true ? ' locked' : '')
buf.push("<div" + (jade.attrs({ "class": [('clearfix'),('achievement-body'),(addedClass)] }, {"class":true})) + "><div class=\"achievement-icon\"><div class=\"achievement-image\"><img" + (jade.attrs({ 'src':(imgURL) }, {"src":true})) + "/></div></div><div class=\"achievement-content\"><div class=\"achievement-title\">" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</div><p class=\"achievement-description\">" + (jade.escape(null == (jade.interp = description) ? "" : jade.interp)) + "</p>");
if ( popup)
{
buf.push("<div class=\"progress-wrapper\"><span class=\"user-level\">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</span><div class=\"progress-bar-wrapper\"><div class=\"progress\">");
var currentTitle = $.i18n.t('achievements.current_xp_prefix') + currentXP + ' XP' + $.i18n.t('achievements.current_xp_postfix');
var newTitle = $.i18n.t('achievements.new_xp_prefix') + newXP + ' XP' + $.i18n.t('achievements.new_xp_postfix');
var leftTitle = $.i18n.t('achievements.left_xp_prefix') + leftXP + ' XP' + $.i18n.t('achievements.left_xp_infix') + (level+1) + $.i18n.t('achievements.left_xp_postfix');
buf.push("<div" + (jade.attrs({ 'style':("width:" + (oldXPWidth) + "%"), 'data-toggle':("tooltip"), 'data-placement':("top"), 'title':("" + (currentTitle) + ""), "class": [('progress-bar'),('xp-bar-old')] }, {"style":true,"data-toggle":true,"data-placement":true,"title":true})) + "></div><div" + (jade.attrs({ 'style':("width:" + (newXPWidth) + "%"), 'data-toggle':("tooltip"), 'title':("" + (newTitle) + ""), "class": [('progress-bar'),('xp-bar-new')] }, {"style":true,"data-toggle":true,"title":true})) + "></div><div" + (jade.attrs({ 'style':("width:" + (leftXPWidth) + "%"), 'data-toggle':("tooltip"), 'title':("" + (leftTitle) + ""), "class": [('progress-bar'),('xp-bar-left')] }, {"style":true,"data-toggle":true,"title":true})) + "></div></div></div><div class=\"progress-bar-border\"></div></div>");
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

;
//# sourceMappingURL=/javascripts/app/templates/core/achievement-popup.js.map
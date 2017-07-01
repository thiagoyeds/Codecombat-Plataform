require.register("templates/play/level/hud_prop", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),prop = locals_.prop,hasIcon = locals_.hasIcon,hasBar = locals_.hasBar;buf.push("<div" + (jade.attrs({ 'name':("" + (prop) + ""), "class": [('prop')] }, {"name":true})) + ">");
if ( hasIcon)
{
buf.push("<span" + (jade.attrs({ "class": [("prop-label prop-label-icon prop-label-icon-" + (prop) + "")] }, {"class":true})) + "></span>");
}
else
{
buf.push("<span class=\"prop-label\">" + (jade.escape((jade.interp = prop) == null ? '' : jade.interp)) + ": </span>");
}
if ( hasBar)
{
buf.push("<span class=\"prop-value bar-prop\"><div class=\"bar\"></div></span><span class=\"prop-value bar-prop-value\"></span>");
}
else
{
buf.push("<span class=\"prop-value\"></span>");
}
buf.push("</div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/hud_prop.js.map
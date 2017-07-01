require.register("templates/play/level/tome/spell", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<img src=\"/images/level/code_editor_background.png\" class=\"code-background\"/><span class=\"code-background\"></span><div class=\"ace\"></div><div data-i18n=\"play_level.code_saved\" class=\"save-status\"></div><div class=\"programming-language-container\">");
if ( view.spell.level.isType('web-dev'))
{
var campaign = view.spell.level.get('campaign') || '';
if ( campaign.indexOf('web-dev-1') >= 0)
{
buf.push("<span data-i18n=\"teacher.language\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language\">HTML</span>");
}
else
{
buf.push("<span data-i18n=\"play_level.languages\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language spr\">HTML</span><span class=\"programming-language-label spr\">/</span><span class=\"programming-language\">JavaScript</span>");
}
}
else
{
buf.push("<span data-i18n=\"play_level.programming_language\" class=\"programming-language-label\"></span><span class=\"programming-language-label spr\">:</span><span class=\"programming-language\">" + (jade.escape(null == (jade.interp = view.spell.displayCodeLanguage) ? "" : jade.interp)) + "</span>");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell.js.map
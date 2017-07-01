require.register("templates/courses/change-course-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"courses.change_language\"></h3><div class=\"clearfix\"></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\">");
var currentLanguage = (me.get('aceConfig') || {}).language || 'python';
buf.push("<button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\">");
if ( currentLanguage === 'python')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>Python</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>Python</span>");
}
buf.push("</button><p><span class=\"spr\">-</span><span data-i18n=\"general.or\" class=\"text-uppercase\"></span><span class=\"spl\">-</span></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\">");
if ( currentLanguage === 'javascript')
{
buf.push("<span data-i18n=\"courses.keep_using\" class=\"spr\"></span><span>JavaScript</span>");
}
else
{
buf.push("<span data-i18n=\"courses.switch_to\" class=\"spr\"></span><span>JavaScript</span>");
}
buf.push("</button></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/change-course-language-modal.js.map
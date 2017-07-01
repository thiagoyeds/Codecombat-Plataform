require.register("templates/courses/choose-language-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"clearfix\"></div><div class=\"text-center\"><h2 data-i18n=\"courses.greetings\" class=\"modal-title\"></h2><h3 data-i18n=\"choose_hero.programming_language_description\"></h3></div></div><div class=\"modal-body\"><div id=\"choice-area\" class=\"text-center\"><button data-language=\"python\" class=\"lang-choice-btn btn btn-success btn-lg\"><img src=\"/images/common/code_languages/python_small.png\"/><span class=\"spl\">Python</span></button><p data-i18n=\"choose_hero.python_blurb\"></p><button data-language=\"javascript\" class=\"lang-choice-btn btn btn-default\"><img src=\"/images/common/code_languages/javascript_small.png\"/><span class=\"spl\">JavaScript</span></button><p data-i18n=\"choose_hero.javascript_blurb\"></p></div><div id=\"saving-progress\" class=\"progress progress-striped active hide\"><div style=\"width: 100%\" class=\"progress-bar\"></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/choose-language-modal.js.map
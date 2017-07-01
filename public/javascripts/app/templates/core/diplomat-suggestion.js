require.register("templates/core/diplomat-suggestion", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"diplomat_suggestion.title\">Help translate CodeCombat!</h3></div><div class=\"modal-body\"><h4 data-i18n=\"diplomat_suggestion.sub_heading\">We need your language skills.</h4><p data-i18n=\"diplomat_suggestion.pitch_body\">We develop CodeCombat in English, but we already have players all over the world. Many of them want to play in {English} but don't speak English, so if you can speak both, please consider signing up to be a Diplomat and help translate both the CodeCombat website and all the levels into {English}.</p><p data-i18n=\"diplomat_suggestion.missing_translations\">Until we can translate everything into {English}, you'll see English when {English} isn't available.</p><p><a href=\"/contribute/diplomat\" data-i18n=\"diplomat_suggestion.learn_more\">Learn more about being a Diplomat</a></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button id=\"subscribe-button\" data-i18n=\"diplomat_suggestion.subscribe_as_diplomat\" class=\"btn btn-primary btn-large\">Subscribe as a Diplomat</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/diplomat-suggestion.js.map
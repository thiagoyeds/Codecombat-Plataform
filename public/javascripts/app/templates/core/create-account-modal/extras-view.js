require.register("templates/core/create-account-modal/extras-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"modal-body\"><div class=\"modal-body-content\"><div class=\"text-center\"><h4 data-i18n=\"signup.select_your_starting_hero\"></h4><div data-i18n=\"signup.you_can_always_change_your_hero_later\" class=\"small\"></div></div><div id=\"hero-select-view\"></div></div><!-- In reverse order for tabbing purposes--><div class=\"history-nav-buttons\"><button type=\"button\" class=\"next-button btn btn-lg btn-navy\"><span data-i18n=\"play.next\"></span></button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/create-account-modal/extras-view.js.map
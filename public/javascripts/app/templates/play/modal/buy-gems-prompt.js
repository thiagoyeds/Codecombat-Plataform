require.register("templates/play/modal/buy-gems-prompt", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div role=\"tooltip\" class=\"popover buy-gems-prompt\"><div class=\"arrow\"></div><h2 data-i18n=\"buy_gems.prompt_title\">Not Enough Gems</h2><p data-i18n=\"buy_gems.prompt_body\">Do you want to get more?</p><button data-i18n=\"buy_gems.prompt_button\" class=\"btn btn-success btn-illustrated btn-lg buy-gems-prompt-button\">Enter Shop</button></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/buy-gems-prompt.js.map
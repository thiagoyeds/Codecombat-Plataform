require.register("templates/core/loading", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"loading-screen loading-container\"><h1 data-i18n=\"common.loading\">Loading...</h1><div class=\"progress\"><div class=\"progress-bar\"></div></div><div class=\"errors\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/loading.js.map
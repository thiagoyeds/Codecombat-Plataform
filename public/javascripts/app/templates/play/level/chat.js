require.register("templates/play/level/chat", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"closed-chat-area\"><table><tbody></tbody></table></div><div class=\"open-chat-area secret\"><table><tbody></tbody></table></div><textarea></textarea><i class=\"icon-comment icon-white\"></i>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/chat.js.map
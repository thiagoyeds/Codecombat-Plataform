require.register("templates/play/level/tome/spell_debug", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"progress\"><div role=\"progressbar\" aria-valuenow=\"50\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar\"><span>Inspecting variable...</span></div></div><pre><code></code></pre>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell_debug.js.map
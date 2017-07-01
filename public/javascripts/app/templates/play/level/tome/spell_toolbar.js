require.register("templates/play/level/tome/spell_toolbar", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"flow\"><div class=\"spell-progress\"><div class=\"progress\"><div class=\"progress-bar\"><div class=\"scrubber-handle\"></div></div></div></div><div class=\"btn-group steppers\"><button title=\"Ctrl/Cmd + Alt + [: Step Backward\" class=\"btn btn-mini btn-inverse banner step-backward\"><i class=\"icon-arrow-left icon-white\"></i></button><button title=\"Ctrl/Cmd + Alt + ]: Step Forward\" class=\"btn btn-mini btn-inverse banner step-forward\"><i class=\"icon-arrow-right icon-white\"></i></button></div><div class=\"metrics\"><div class=\"statements-metric\">Statement <span class=\"metric statement-index\"></span> / <span class=\"metric statements-executed\"></span><span class=\"metric statements-executed-total\"></span></div><div class=\"calls-metric\">Call <span class=\"metric call-index\"></span> / <span class=\"metric calls-executed\"></span></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/spell_toolbar.js.map
require.register("templates/play/level/goals", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<ul id=\"primary-goals-list\"></ul><div class=\"goals-status\"><span data-i18n=\"play_level.goals\">Goals</span><span class=\"spr\">:</span><span data-i18n=\"play_level.running\" class=\"secret goal-status running\">Running...</span><span data-i18n=\"play_level.success\" class=\"secret goal-status success\">Success!</span><span data-i18n=\"play_level.incomplete\" class=\"secret goal-status incomplete\">Incomplete</span><span data-i18n=\"play_level.timed_out\" class=\"secret goal-status timed-out\">Ran out of time</span><span data-i18n=\"play_level.failing\" class=\"secret goal-status failure\">Failing</span></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/goals.js.map
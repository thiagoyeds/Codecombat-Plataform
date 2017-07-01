require.register("templates/play/level/tome/problem_alert", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<button type=\"button\" class=\"close\">&times;</button><h3 data-i18n=\"play_level.problem_alert_title\" class=\"problem-alert-title\">Fix Your Code</h3>");
if ( view.hint)
{
buf.push("<span class=\"problem-title\">" + (null == (jade.interp = view.hint) ? "" : jade.interp) + "</span><br/><span class=\"problem-subtitle\">" + (null == (jade.interp = view.message) ? "" : jade.interp) + "</span>");
}
else
{
buf.push("<span class=\"problem-title\">" + (null == (jade.interp = view.message) ? "" : jade.interp) + "</span>");
};return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/problem_alert.js.map
require.register("templates/teachers/hovers/progress-dot-single-student-course", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),completed = locals_.completed,started = locals_.started,levelsCompleted = locals_.levelsCompleted,levelsTotal = locals_.levelsTotal;if ( completed)
{
buf.push("<span data-i18n=\"clans.complete_2\" class=\"small-details\">Complete</span>");
}
else if ( started)
{
buf.push("<div class=\"fraction-students small-details\">" + (jade.escape(null == (jade.interp = levelsCompleted) ? "" : jade.interp)) + "/" + (jade.escape(null == (jade.interp = levelsTotal) ? "" : jade.interp)) + "<span data-i18n=\"teacher.levels\" class=\"spl\">Levels</span></div><div class=\"percent-students small-details\">" + (jade.escape(null == (jade.interp = Math.floor(levelsCompleted / levelsTotal * 100)) ? "" : jade.interp)) + "%<span data-i18n=\"clans.complete_2\" class=\"spl\">Complete</span></div>");
}
else
{
buf.push("<span data-i18n=\"teacher.assigned\" class=\"small-details\">Assigned</span>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/hovers/progress-dot-single-student-course.js.map
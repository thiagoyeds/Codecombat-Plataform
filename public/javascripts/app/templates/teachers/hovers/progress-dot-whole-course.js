require.register("templates/teachers/hovers/progress-dot-whole-course", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),total = locals_.total,complete = locals_.complete;if ( !total)
{
buf.push("<span data-i18n=\"teacher.no_progress\" class=\"small-details\">No Progress</span>");
}
else
{
buf.push("<div class=\"fraction-students small-details\">" + (jade.escape(null == (jade.interp = complete) ? "" : jade.interp)) + "/" + (jade.escape(null == (jade.interp = total) ? "" : jade.interp)) + "<span data-i18n=\"courses.students\" class=\"spl\">Students</span></div><div class=\"percent-students small-details\">" + (jade.escape(null == (jade.interp = Math.floor(complete / total * 100)) ? "" : jade.interp)) + "%<span data-i18n=\"clans.complete_2\" class=\"spl\">Complete</span></div>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/hovers/progress-dot-whole-course.js.map
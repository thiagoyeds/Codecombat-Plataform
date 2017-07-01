require.register("templates/teachers/hovers/progress-dot-all-students-single-level", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),practice = locals_.practice,started = locals_.started,levelNumber = locals_.levelNumber,levelName = locals_.levelName,numStarted = locals_.numStarted,numStudents = locals_.numStudents,completed = locals_.completed;if ( practice)
{
buf.push("<span data-i18n=\"teacher.practice\" class=\"text-uppercase small-details\"></span>");
}
if ( started)
{
buf.push("<div class=\"small-details nowrap\"><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">. </span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span></div><div class=\"small-details nowrap\"><div class=\"fraction-students small-details\">" + (jade.escape(null == (jade.interp = numStarted) ? "" : jade.interp)) + "/" + (jade.escape(null == (jade.interp = numStudents) ? "" : jade.interp)));
if ( completed)
{
buf.push("<span data-i18n=\"teacher.completed\" class=\"spl\"></span>");
}
else
{
buf.push("<span data-i18n=\"teacher.started\" class=\"spl\"></span>");
}
buf.push("</div></div>");
}
else
{
buf.push("<div class=\"small-details nowrap\"><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">. </span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span></div><span data-i18n=\"teacher.no_progress\" class=\"small-details nowrap\"></span>");
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
//# sourceMappingURL=/javascripts/app/templates/teachers/hovers/progress-dot-all-students-single-level.js.map
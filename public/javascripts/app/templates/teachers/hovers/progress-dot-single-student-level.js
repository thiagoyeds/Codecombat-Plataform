require.register("templates/teachers/hovers/progress-dot-single-student-level", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),practice = locals_.practice,session = locals_.session,moment = locals_.moment,completed = locals_.completed,levelNumber = locals_.levelNumber,levelName = locals_.levelName,started = locals_.started;if ( practice)
{
buf.push("<span data-i18n=\"teacher.practice\" class=\"text-uppercase small-details\"></span>");
}
var timePlayed_mixin = function(){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( session.get('playtime') > 0)
{
buf.push("<div class=\"small-details nowrap\"><span data-i18n=\"teacher.time_played\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = moment.duration({ seconds: session.get('playtime') }).humanize()) ? "" : jade.interp)) + "</span></div>");
}
};
if ( completed)
{
buf.push("<div class=\"small-details nowrap\"><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">. </span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span></div><div class=\"small-details nowrap\"><span data-i18n=\"teacher.completed\" class=\"spr\"></span>");
var dateCompleted = session.get('dateFirstCompleted') || session.get('created') || session.get('changed');
if ( dateCompleted)
{
buf.push("<span>" + (jade.escape(null == (jade.interp = new Date(dateCompleted).toLocaleString()) ? "" : jade.interp)) + "</span>");
}
timePlayed_mixin();
buf.push("</div>");
}
else if ( started)
{
buf.push("<div class=\"small-details nowrap\"><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">. </span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span></div><div class=\"small-details nowrap\"><span data-i18n=\"teacher.last_played\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = new Date(session.get('changed')).toLocaleString()) ? "" : jade.interp)) + "</span>");
timePlayed_mixin();
buf.push("</div>");
}
else
{
buf.push("<div class=\"small-details nowrap\"><span>" + (jade.escape(null == (jade.interp = levelNumber) ? "" : jade.interp)) + "</span><span class=\"spr\">. </span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span></div>");
if ( practice)
{
buf.push("<span data-i18n=\"teacher.not_required\" class=\"small-details nowrap\"></span>");
}
else
{
buf.push("<span data-i18n=\"teacher.no_progress\" class=\"small-details nowrap\"></span>");
}
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
//# sourceMappingURL=/javascripts/app/templates/teachers/hovers/progress-dot-single-student-level.js.map
require.register("templates/courses/classroom-level-popover", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),session = locals_.session,i = locals_.i,level = locals_.level,moment = locals_.moment,canViewSolution = locals_.canViewSolution;var completed = session && session.get('state') && session.get('state').complete;
buf.push("<h3>" + (jade.escape((jade.interp = i) == null ? '' : jade.interp)) + ". " + (jade.escape((jade.interp = level.get('name').replace('Course: ', '')) == null ? '' : jade.interp)) + "</h3>");
if ( session)
{
buf.push("<p><span data-i18n=\"courses.play_time\" class=\"spr\"></span><span>" + (jade.escape((jade.interp = moment.duration(session.get('playtime'), "seconds").humanize()) == null ? '' : jade.interp)) + "</span></p><p><span" + (jade.attrs({ 'data-i18n':(completed ? "courses.completed" : "clans.last_played"), "class": [('spr')] }, {"data-i18n":true})) + "></span><span>" + (jade.escape((jade.interp = moment(session.get('changed')).format('MMMM Do YYYY, h:mm:ss a')) == null ? '' : jade.interp)) + "</span></p>");
}
if ( session && canViewSolution)
{
buf.push("<strong" + (jade.attrs({ 'data-i18n':(completed ? "clans.view_solution" : "clans.view_attempt") }, {"data-i18n":true})) + "></strong>");
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
//# sourceMappingURL=/javascripts/app/templates/courses/classroom-level-popover.js.map
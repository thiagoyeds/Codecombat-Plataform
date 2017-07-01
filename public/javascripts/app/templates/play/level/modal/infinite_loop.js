require.register("templates/play/level/modal/infinite_loop", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.options.nonUserCodeProblem)
{
buf.push("<h3 data-i18n=\"play_level.non_user_code_problem_title\">Unable to Load Level</h3>");
}
else
{
buf.push("<h3 data-i18n=\"play_level.infinite_loop_title\">Infinite Loop Detected</h3>");
}
buf.push("</div><div class=\"modal-body\"><div class=\"modal-body\"><p data-i18n=\"play_level.infinite_loop_description\">The initial code to build the world never finished running. It's probably either really slow or has an infinite loop. Or there might be a bug. You can either try running this code again or reset the code to the default state. If that doesn't fix it, please let us know.</p><p><span data-i18n=\"play_level.check_dev_console\" class=\"spr\">You can also open the developer console to see what might be going wrong.</span><a href=\"http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers/77337#77337\" data-i18n=\"play_level.check_dev_console_link\" target=\"_blank\">(instructions)</a></p></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.infinite_loop_try_again\" id=\"restart-level-infinite-loop-retry-button\" class=\"btn\">Try Again</a><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.infinite_loop_reset_level\" id=\"restart-level-infinite-loop-confirm-button\" class=\"btn btn-danger\">Reset Level</a><a href=\"#\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.infinite_loop_comment_out\" id=\"restart-level-infinite-loop-comment-button\" class=\"btn btn-primary\">Comment Out My Code</a></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/infinite_loop.js.map
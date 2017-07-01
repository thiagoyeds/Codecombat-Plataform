require.register("templates/play/common/ladder_submission", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),lastSubmitted = locals_.lastSubmitted,simulateURL = locals_.simulateURL;buf.push("<button class=\"btn btn-lg btn-block btn-success rank-button btn-illustrated\"><span data-i18n=\"ladder.rank_no_code\" class=\"unavailable secret\">No New Code to Rank</span><span data-i18n=\"ladder.rank_my_game\" class=\"rank secret\">Rank My Game!</span><span data-i18n=\"ladder.rank_submitting\" class=\"submitting secret\">Submitting...</span><span data-i18n=\"ladder.rank_submitted\" class=\"submitted secret\">Submitted for Ranking</span><span data-i18n=\"ladder.rank_failed\" class=\"failed secret\">Failed to Rank</span><span data-i18n=\"ladder.rank_being_ranked\" class=\"ranking secret\">Game Being Ranked</span></button>");
if ( lastSubmitted)
{
buf.push("<div class=\"last-submitted secret\"><span data-i18n=\"ladder.rank_last_submitted\">submitted </span>" + (jade.escape((jade.interp = lastSubmitted) == null ? '' : jade.interp)) + "</div>");
}
buf.push("<a" + (jade.attrs({ 'href':(simulateURL), 'data-i18n':("ladder.help_simulate"), "class": [('help-simulate'),('secret')] }, {"href":true,"data-i18n":true})) + ">Help simulate games?</a><div class=\"clearfix\"></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/common/ladder_submission.js.map
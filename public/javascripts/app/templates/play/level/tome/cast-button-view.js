require.register("templates/play/level/tome/cast-button-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;if ( view.options.level.isType('game-dev'))
{
buf.push("<button class=\"btn btn-lg btn-illustrated btn-success game-dev-play-btn\"><span data-i18n=\"play_level.test_level\"></span></button><button class=\"btn btn-lg btn-illustrated btn-success done-button secret\"><span data-i18n=\"play_level.done\"></span></button>");
}
else
{
buf.push("<button" + (jade.attrs({ 'title':(view.castVerbose()), "class": [('btn'),('btn-lg'),('btn-illustrated'),('cast-button')] }, {"title":true})) + "><span data-i18n=\"play_level.tome_cast_button_ran\">Ran</span></button>");
if ( !view.observing)
{
if ( view.mirror)
{
buf.push("<div class=\"ladder-submission-view\"></div>");
}
else
{
buf.push("<button" + (jade.attrs({ 'title':(view.castRealTimeVerbose()), "class": [('btn'),('btn-lg'),('btn-illustrated'),('submit-button')] }, {"title":true})) + "><span data-i18n=\"play_level.tome_submit_button\">Submit</span><span class=\"spl secret submit-again-time\"></span></button><button class=\"btn btn-lg btn-illustrated btn-success done-button secret\"><span data-i18n=\"play_level.done\">Done</span></button>");
if ( view.autoSubmitsToLadder)
{
buf.push("<div class=\"hidden\"><div class=\"ladder-submission-view\"></div></div>");
}
}
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
//# sourceMappingURL=/javascripts/app/templates/play/level/tome/cast-button-view.js.map
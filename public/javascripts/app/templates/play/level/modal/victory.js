require.register("templates/play/level/modal/victory", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,levelName = locals_.levelName,body = locals_.body,readyToRank = locals_.readyToRank,level = locals_.level,me = locals_.me,fbRef = locals_.fbRef;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3><span data-i18n=\"play_level.victory_title_prefix\"></span><span>" + (jade.escape(null == (jade.interp = levelName) ? "" : jade.interp)) + "</span><span data-i18n=\"play_level.victory_title_suffix\">Complete</span></h3></div><div class=\"modal-body\"><img src=\"/images/level/victory.png\" alt=\"\" class=\"victory-banner\"/><div>" + (null == (jade.interp = body) ? "" : jade.interp) + "</div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( readyToRank)
{
buf.push("<div class=\"ladder-submission-view\"></div>");
}
else if ( level.isType('ladder'))
{
buf.push("<a" + (jade.attrs({ 'href':("/play/ladder/" + (level.get('slug')) + "#my-matches"), 'data-dismiss':("modal"), 'data-i18n':("play_level.victory_return_to_ladder"), "class": [('btn'),('btn-primary')] }, {"href":true,"data-dismiss":true,"data-i18n":true})) + ">Return to Ladder</a>");
}
else
{
buf.push("<a href=\"/\" data-dismiss=\"modal\" data-i18n=\"play_level.victory_go_home\" class=\"btn btn-primary\">Go Home</a>");
}
if ( me.get('anonymous'))
{
buf.push("<p class=\"sign-up-poke\"><button data-dismiss=\"modal\" data-i18n=\"play_level.victory_sign_up\" class=\"btn btn-success sign-up-button btn-large\">Sign Up to Save Progress</button><span data-i18n=\"play_level.victory_sign_up_poke\">Want to save your code? Create a free account!</span></p><p class=\"clearfix\"></p>");
}
else
{
buf.push("<div class=\"rating secret\"><span data-i18n=\"play_level.victory_rate_the_level\">Rate the level:</span><i class=\"icon-star-empty\"></i><i class=\"icon-star-empty\"></i><i class=\"icon-star-empty\"></i><i class=\"icon-star-empty\"></i><i class=\"icon-star-empty\"></i></div>");
}
if ( !me.get('anonymous'))
{
buf.push("<div class=\"review secret\"><span data-i18n=\"play_level.victory_review\">Tell us more!</span><br/><textarea></textarea></div>");
}
buf.push("<div class=\"share-buttons\"><div data-href=\"http://codecombat.com\" data-size=\"medium\" class=\"g-plusone\"></div><div" + (jade.attrs({ 'data-href':("https://www.facebook.com/codecombat"), 'data-send':("false"), 'data-layout':("button_count"), 'data-width':("350"), 'data-show-faces':("true"), 'data-ref':("coco_victory_" + (fbRef) + ""), "class": [('fb-like')] }, {"data-href":true,"data-send":true,"data-layout":true,"data-width":true,"data-show-faces":true,"data-ref":true})) + "></div><a href=\"https://twitter.com/CodeCombat\" data-show-count=\"true\" data-show-screen-name=\"false\" data-dnt=\"true\" data-align=\"right\" data-i18n=\"nav.twitter_follow\" class=\"twitter-follow-button\">Follow</a><iframe src=\"https://ghbtns.com/github-btn.html?user=codecombat&amp;repo=codecombat&amp;type=watch&amp;count=true\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"110\" height=\"20\" class=\"github-star-button\"></iframe></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/modal/victory.js.map
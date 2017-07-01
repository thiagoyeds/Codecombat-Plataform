require.register("templates/play/modal/poll-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,i18n = locals_.i18n,poll = locals_.poll,marked = locals_.marked,me = locals_.me;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h1><span>" + (jade.escape(null == (jade.interp = i18n(poll.attributes, "name")) ? "" : jade.interp)) + "</span></h1></div><div class=\"modal-body\"><div class=\"description\">");
if ( poll.get("description"))
{
buf.push("<div>" + (null == (jade.interp = marked(i18n(poll.attributes, "description"))) ? "" : jade.interp) + "</div>");
}
else
{
buf.push("<div>&nbsp;</div>");
}
buf.push("</div><div class=\"answers-container-wrapper\"><div class=\"answers-container\"><table class=\"table table-hover\">");
// iterate poll.get("answers") || []
;(function(){
  var $$obj = poll.get("answers") || [];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var answer = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-answer':(answer.key), "class": [("answer")] }, {"class":true,"data-answer":true})) + "><td>" + (null == (jade.interp = marked(i18n(answer, "text"))) ? "" : jade.interp) + "</td><td class=\"graph-cell\"><div class=\"progress\"><div class=\"progress-bar\"></div></div></td><td class=\"votes-cell\"><span class=\"badge vote-percentage\"></span></td>");
if ( me.isAdmin())
{
buf.push("<td class=\"votes-cell\"><span class=\"badge vote-count\"></span></td>");
}
buf.push("</tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var answer = $$obj[$index];

buf.push("<tr" + (jade.attrs({ 'data-answer':(answer.key), "class": [("answer")] }, {"class":true,"data-answer":true})) + "><td>" + (null == (jade.interp = marked(i18n(answer, "text"))) ? "" : jade.interp) + "</td><td class=\"graph-cell\"><div class=\"progress\"><div class=\"progress-bar\"></div></div></td><td class=\"votes-cell\"><span class=\"badge vote-percentage\"></span></td>");
if ( me.isAdmin())
{
buf.push("<td class=\"votes-cell\"><span class=\"badge vote-count\"></span></td>");
}
buf.push("</tr>");
    }

  }
}).call(this);

buf.push("</table></div></div><div class=\"random-gems-container-wrapper\"><div class=\"random-gems-container\"><code class=\"random-gems-code\"><span>randomNumber = Math.random()                   </span><span id=\"random-number-comment\" class=\"comment\"></span></code><code class=\"random-gems-code\"><span>gems = Math.ceil(2 * randomNumber * me.level)  </span><span id=\"random-gems-comment\" class=\"comment\"></span></code><code class=\"random-gems-code\"><span>me.gems += gems                                </span><span id=\"total-gems-comment\" class=\"comment\"></span></code></div></div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"play_level.done\" class=\"btn btn-illustrated btn-lg done-button\">Done</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/poll-modal.js.map
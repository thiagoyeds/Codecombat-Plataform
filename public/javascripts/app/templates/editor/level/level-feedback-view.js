require.register("templates/editor/level/level-feedback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),averageRating = locals_.averageRating,totalRatings = locals_.totalRatings,allFeedback = locals_.allFeedback,moment = locals_.moment;buf.push("<h2>Average Rating: " + (jade.escape((jade.interp = averageRating.toFixed(2)) == null ? '' : jade.interp)) + ", " + (jade.escape((jade.interp = totalRatings) == null ? '' : jade.interp)) + " ratings</h2><ul class=\"user-feedback-list list-group\">");
// iterate allFeedback
;(function(){
  var $$obj = allFeedback;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var feedback = $$obj[$index];

buf.push("<li class=\"list-group-item\">");
// iterate Array(feedback.rating)
;(function(){
  var $$obj = Array(feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star\"></div>");
    }

  }
}).call(this);

if ( feedback.rating < 5)
{
// iterate Array(5 - feedback.rating)
;(function(){
  var $$obj = Array(5 - feedback.rating);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<div class=\"glyphicon glyphicon-star-empty\"></div>");
    }

  }
}).call(this);

}
buf.push("<span class=\"spl spr\">-</span><em>" + (jade.escape(null == (jade.interp = moment(new Date(feedback.created)).fromNow()) ? "" : jade.interp)) + "</em><span class=\"spl spr\">-</span><a" + (jade.attrs({ 'href':("/user/" + (feedback.creator) + "") }, {"href":true})) + "><strong>" + (jade.escape(null == (jade.interp = feedback.creatorName || 'Anonymous') ? "" : jade.interp)) + "</strong></a>");
if ( feedback.review)
{
buf.push("<span class=\"spr\">:</span><span>" + (jade.escape(null == (jade.interp = feedback.review) ? "" : jade.interp)) + "</span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/level-feedback-view.js.map
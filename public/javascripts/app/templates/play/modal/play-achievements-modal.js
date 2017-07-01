require.register("templates/play/modal/play-achievements-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,moment = locals_.moment,rewards = locals_.rewards,worth = locals_.worth;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"play.achievements\">Achievements</h3></div><div class=\"modal-body\">");
// iterate view.achievements.models
;(function(){
  var $$obj = view.achievements.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var achievement = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [('panel'),(achievement.earned ? 'earned' : '')] }, {"class":true})) + "><div class=\"panel-body\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'draggable':("false"), "class": [('icon')] }, {"src":true,"draggable":true})) + "/><h3>" + (jade.escape(null == (jade.interp = achievement.name + (achievement.earned && achievement.earned.get('achievedAmount') ? (' - ' + achievement.earned.get('achievedAmount') + 'x') : '')) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</p></div>");
if ( achievement.earnedDate)
{
buf.push("<div class=\"created\">" + (jade.escape(null == (jade.interp = moment(achievement.earnedDate).fromNow()) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div data-i18n=\"user.status_unfinished\" class=\"created\"></div>");
}
buf.push("<div class=\"rewards\">");
rewards = achievement.get('rewards');
if ( rewards && rewards.gems)
{
buf.push("<span class=\"gems label label-default\"><span>" + (jade.escape(null == (jade.interp = achievement.earnedGems || rewards.gems) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\" class=\"gem\"/></span>");
}
worth = achievement.get('worth');
if ( worth)
{
buf.push("<span class=\"worth label label-default\"><span>" + (jade.escape((jade.interp = achievement.earnedPoints || worth) == null ? '' : jade.interp)) + "xp</span></span>");
}
buf.push("<!-- maybe add more icons/numbers for items, heroes, levels, xp?--></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var achievement = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [('panel'),(achievement.earned ? 'earned' : '')] }, {"class":true})) + "><div class=\"panel-body\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'draggable':("false"), "class": [('icon')] }, {"src":true,"draggable":true})) + "/><h3>" + (jade.escape(null == (jade.interp = achievement.name + (achievement.earned && achievement.earned.get('achievedAmount') ? (' - ' + achievement.earned.get('achievedAmount') + 'x') : '')) ? "" : jade.interp)) + "</h3><p>" + (jade.escape(null == (jade.interp = achievement.description) ? "" : jade.interp)) + "</p></div>");
if ( achievement.earnedDate)
{
buf.push("<div class=\"created\">" + (jade.escape(null == (jade.interp = moment(achievement.earnedDate).fromNow()) ? "" : jade.interp)) + "</div>");
}
else
{
buf.push("<div data-i18n=\"user.status_unfinished\" class=\"created\"></div>");
}
buf.push("<div class=\"rewards\">");
rewards = achievement.get('rewards');
if ( rewards && rewards.gems)
{
buf.push("<span class=\"gems label label-default\"><span>" + (jade.escape(null == (jade.interp = achievement.earnedGems || rewards.gems) ? "" : jade.interp)) + "</span><img src=\"/images/common/gem.png\" draggable=\"false\" class=\"gem\"/></span>");
}
worth = achievement.get('worth');
if ( worth)
{
buf.push("<span class=\"worth label label-default\"><span>" + (jade.escape((jade.interp = achievement.earnedPoints || worth) == null ? '' : jade.interp)) + "xp</span></span>");
}
buf.push("<!-- maybe add more icons/numbers for items, heroes, levels, xp?--></div></div>");
    }

  }
}).call(this);

buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/play-achievements-modal.js.map
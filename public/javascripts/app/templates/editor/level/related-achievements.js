require.register("templates/editor/level/related-achievements", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),me = locals_.me,view = locals_.view;buf.push("<div class=\"nano editor-nano-container\"><div class=\"nano-content\"><button" + (jade.attrs({ 'id':('new-achievement-button'), 'disabled':((me.isAdmin() === true || me.isArtisan() === true) ? undefined : "true"), 'data-i18n':("editor.new_achievement_title"), "class": [('btn'),('btn-primary')] }, {"disabled":true,"data-i18n":true})) + ">Create a New Achievement</button>");
if ( !view.achievements.models.length)
{
buf.push("<div class=\"panel\"><div class=\"panel-body\"><p data-i18n=\"editor.no_achievements\">No achievements added for this level yet.</p></div></div>");
}
else
{
buf.push("<table class=\"table table-hover\"><thead><tr><th></th><th data-i18n=\"general.name\">Name</th><th data-i18n=\"general.description\">Description</th><th>XP</th></tr></thead><tbody>");
// iterate view.achievements.models
;(function(){
  var $$obj = view.achievements.models;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var achievement = $$obj[$index];

buf.push("<tr><td style=\"width: 20px\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'alt':("#{achievement.get('name') icon"), "class": [('achievement-icon-small')] }, {"src":true,"alt":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (achievement.get('slug')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = achievement.get('name', true)) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = achievement.get('description', true)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = achievement.get('worth', true)) ? "" : jade.interp)) + "</td></tr>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var achievement = $$obj[$index];

buf.push("<tr><td style=\"width: 20px\"><img" + (jade.attrs({ 'src':(achievement.getImageURL()), 'alt':("#{achievement.get('name') icon"), "class": [('achievement-icon-small')] }, {"src":true,"alt":true})) + "/></td><td><a" + (jade.attrs({ 'href':("/editor/achievement/" + (achievement.get('slug')) + "") }, {"href":true})) + ">" + (jade.escape(null == (jade.interp = achievement.get('name', true)) ? "" : jade.interp)) + "</a></td><td>" + (jade.escape(null == (jade.interp = achievement.get('description', true)) ? "" : jade.interp)) + "</td><td>" + (jade.escape(null == (jade.interp = achievement.get('worth', true)) ? "" : jade.interp)) + "</td></tr>");
    }

  }
}).call(this);

buf.push("</tbody></table>");
}
buf.push("</div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/related-achievements.js.map
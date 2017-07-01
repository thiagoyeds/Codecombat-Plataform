require.register("templates/play/level/duel-stats-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;// iterate view.players
;(function(){
  var $$obj = view.players;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("player-container team-" + player.team)] }, {"class":true})) + "><div class=\"player-portrait\"><div class=\"thang-avatar-placeholder\"></div></div><div class=\"player-info\"><div class=\"name-and-power\">");
if ( view.showsPower)
{
buf.push("<div class=\"player-power\"><div class=\"power-icon\"></div><div class=\"power-value\"></div></div>");
}
if ( view.showsGold)
{
buf.push("<div class=\"player-gold\"><div class=\"gold-icon\"></div><div class=\"gold-value\"></div></div>");
}
buf.push("<div class=\"player-name\">" + (jade.escape(null == (jade.interp = player.name || 'Anonymous') ? "" : jade.interp)) + "</div></div><div class=\"player-health\"><div class=\"health-icon\"></div><div class=\"health-bar-container\"><div class=\"health-bar\"></div></div><div class=\"health-value\"></div></div></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

buf.push("<div" + (jade.attrs({ "class": [("player-container team-" + player.team)] }, {"class":true})) + "><div class=\"player-portrait\"><div class=\"thang-avatar-placeholder\"></div></div><div class=\"player-info\"><div class=\"name-and-power\">");
if ( view.showsPower)
{
buf.push("<div class=\"player-power\"><div class=\"power-icon\"></div><div class=\"power-value\"></div></div>");
}
if ( view.showsGold)
{
buf.push("<div class=\"player-gold\"><div class=\"gold-icon\"></div><div class=\"gold-value\"></div></div>");
}
buf.push("<div class=\"player-name\">" + (jade.escape(null == (jade.interp = player.name || 'Anonymous') ? "" : jade.interp)) + "</div></div><div class=\"player-health\"><div class=\"health-icon\"></div><div class=\"health-bar-container\"><div class=\"health-bar\"></div></div><div class=\"health-value\"></div></div></div></div>");
    }

  }
}).call(this);
;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/duel-stats-view.js.map
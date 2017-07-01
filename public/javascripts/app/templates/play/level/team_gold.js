require.register("templates/play/level/team_gold", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),team = locals_.team;buf.push("<div" + (jade.attrs({ "class": [("team-gold team-" + team)] }, {"class":true})) + "><img src=\"/images/level/gold_icon.png\" alt=\"\" draggable=\"false\"/><div" + (jade.attrs({ "class": [("gold-amount team-" + team)] }, {"class":true})) + "></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/team_gold.js.map
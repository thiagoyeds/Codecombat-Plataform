require.register("templates/play/spectate", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"level-loading-view\"></div><div class=\"level-content\"><div id=\"control-bar-view\"></div><div id=\"canvas-wrapper\"><canvas width=\"924\" height=\"589\" id=\"webgl-surface\"></canvas><canvas width=\"924\" height=\"589\" id=\"normal-surface\"></canvas><div id=\"canvas-left-gradient\" class=\"gradient\"></div><div id=\"canvas-top-gradient\" class=\"gradient\"></div></div><div id=\"gold-view\" class=\"secret expanded\"></div><div id=\"level-chat-view\"></div><div id=\"duel-stats-view\"></div><div id=\"playback-view\"></div><div id=\"thang-hud\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/spectate.js.map
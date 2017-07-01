require.register("templates/play/level/hud", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"wood-background\"></div><div class=\"hinge hinge-0\"></div><div class=\"hinge hinge-1\"></div><div class=\"hinge hinge-2\"></div><div class=\"hinge hinge-3\"></div><div class=\"avatar-wrapper-container\"><div class=\"thang-canvas-wrapper thang-elem\"><canvas class=\"thang-canvas\"></canvas></div></div><div class=\"center\"><div class=\"thang-name\"></div><div class=\"thang-props thang-elem\"></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/hud.js.map
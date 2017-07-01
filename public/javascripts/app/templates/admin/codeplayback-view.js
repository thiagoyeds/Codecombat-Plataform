require.register("templates/admin/codeplayback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"code-container\"><div id=\"acearea\"></div></div><div><div id=\"start-time\" class=\"number\">0</div><div id=\"slider-container\"><input id=\"slider\" value=\"0\" type=\"range\" step=\"0.001\"/></div><div id=\"end-time\" class=\"number\">n</div></div><div id=\"control-container\"><div id=\"play-container\"><button id=\"play-button\">Play</button><button id=\"pause-button\">Pause</button><button id=\"next-frame-button\">Next Second</button><button id=\"next-frame-button\">Next Event</button></div><div id=\"speed-container\"><button data-speed=\"1\" class=\"speed-button clicked\">1x</button><button data-speed=\"2\" class=\"speed-button\">2x</button><button data-speed=\"4\" class=\"speed-button\">4x</button><button data-speed=\"8\" class=\"speed-button\">8x</button></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/admin/codeplayback-view.js.map
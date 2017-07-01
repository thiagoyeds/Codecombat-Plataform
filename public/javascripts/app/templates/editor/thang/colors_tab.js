require.register("templates/editor/thang/colors_tab", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div id=\"color-groups-treema\"></div><div id=\"color-group-settings\" class=\"secret\"><div id=\"shape-buttons\"></div><canvas id=\"tinting-display\" width=\"400\" height=\"400\"></canvas><div id=\"controls\"><div class=\"slider-cell\">Hue:<span class=\"hue-label\"></span><div id=\"hue-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Saturation:<span class=\"saturation-label\"></span><div id=\"saturation-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Lightness:<span class=\"lightness-label\"></span><div id=\"lightness-slider\" class=\"selector\"></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/thang/colors_tab.js.map
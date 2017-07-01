require.register("templates/play/level/level-playback-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<button id=\"play-button\" title=\"Ctrl/Cmd + P: Toggle level play/pause\" class=\"btn btn-xs btn-inverse paused\"><div class=\"glyphicon glyphicon-play\"></div><div class=\"glyphicon glyphicon-pause\"></div><div class=\"glyphicon glyphicon-repeat\"></div></button><button id=\"volume-button\" title=\"Adjust volume\" class=\"btn btn-xs btn-inverse picoctf-hide\"><div class=\"glyphicon glyphicon-volume-off\"></div><div class=\"glyphicon glyphicon-volume-down\"></div><div class=\"glyphicon glyphicon-volume-up\"></div></button><button id=\"music-button\" title=\"Toggle Music\" class=\"btn btn-xs btn-inverse picoctf-hide\"><span>♫</span></button>");
if ( !view.options.level.isType('game-dev'))
{
buf.push("<div class=\"scrubber\"><div class=\"scrubber-inner\"><div id=\"timeProgress\" class=\"progress secret\"><div class=\"progress-bar\"><div class=\"scrubber-handle\"></div><div id=\"timePopover\" class=\"popover fade top in\"><div class=\"arrow\"></div><h3 class=\"popover-title\"></h3><div class=\"popover-content\"></div></div></div></div></div></div>");
}
buf.push("<div id=\"playback-settings\" class=\"btn-group dropup\"><button title=\"Toggle fullscreen\" class=\"btn btn-xs btn-inverse toggle-fullscreen\"><div class=\"glyphicon glyphicon-fullscreen\"></div></button><button id=\"zoom-in-button\" title=\"Zoom In (or scroll down)\" class=\"btn btn-xs btn-inverse\"><div class=\"glyphicon glyphicon-zoom-in\"></div></button><button id=\"zoom-out-button\" title=\"Zoom Out (or scroll up)\" class=\"btn btn-xs btn-inverse\"><div class=\"glyphicon glyphicon-zoom-out\"></div></button></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/level-playback-view.js.map
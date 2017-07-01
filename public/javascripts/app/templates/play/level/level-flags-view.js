require.register("templates/play/level/level-flags-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button title=\"G: Place a green flag\" class=\"flag-button btn btn-lg green-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">G</span>reen</span></button><button title=\"B: Place a black flag\" class=\"flag-button btn btn-lg black-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">B</span>lack</span></button><button title=\"V: Place a violet flag\" class=\"flag-button btn btn-lg violet-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">V</span>iolet</span></button>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/level-flags-view.js.map
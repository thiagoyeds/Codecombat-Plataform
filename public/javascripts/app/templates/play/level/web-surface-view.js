require.register("templates/play/level/web-surface-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),fullUnsafeContentHostname = locals_.fullUnsafeContentHostname;buf.push("<iframe" + (jade.attrs({ 'src':("//" + fullUnsafeContentHostname + "/web-dev-iframe.html") }, {"src":true})) + "></iframe>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/level/web-surface-view.js.map
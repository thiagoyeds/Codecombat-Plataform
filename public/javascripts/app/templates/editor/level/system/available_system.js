require.register("templates/editor/level/system/available_system", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),system = locals_.system;buf.push("<li" + (jade.attrs({ 'title':("" + (system.description) + ""), 'data-system-id':("" + (system._id) + "") }, {"title":true,"data-system-id":true})) + "><a class=\"system-name\"><strong>" + (jade.escape((jade.interp = system.name) == null ? '' : jade.interp)) + "</strong></a></li>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/level/system/available_system.js.map
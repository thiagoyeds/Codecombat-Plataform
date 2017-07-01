require.register("templates/core/error", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),status = locals_.status,statusText = locals_.statusText,message = locals_.message;buf.push("<div id=\"modal-error\" class=\"modal fade\"><div class=\"modal-dialog\"><div class=\"modal-header\"><div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div><h3>Error " + (jade.escape((jade.interp = status) == null ? '' : jade.interp)) + ": " + (jade.escape((jade.interp = statusText) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><p>" + (jade.escape((jade.interp = message) == null ? '' : jade.interp)) + "</p></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/core/error.js.map
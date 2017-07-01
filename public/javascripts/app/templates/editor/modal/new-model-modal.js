require.register("templates/editor/modal/new-model-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3" + (jade.attrs({ 'data-i18n':("" + (view.newModelTitle) + "") }, {"data-i18n":true})) + ">Create New " + (jade.escape((jade.interp = view.modelLabel) == null ? '' : jade.interp)) + "</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"name\" data-i18n=\"general.name\" class=\"control-label\">Name</label><input id=\"name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button data-i18n=\"common.create\" class=\"btn btn-primary new-model-submit\">Create</button></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"play_level.tip_reticulating\">Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/modal/new-model-modal.js.map
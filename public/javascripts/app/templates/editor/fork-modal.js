require.register("templates/editor/fork-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog game\"><div class=\"background-wrapper\"><div class=\"modal-content\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3 data-i18n=\"editor.fork_title\">Fork New Version</h3></div><div class=\"modal-body\"><form class=\"form\"><div class=\"form-group\"><label for=\"model-name\" data-i18n=\"general.name\">Name</label><input id=\"fork-model-name\" name=\"name\" type=\"text\" class=\"form-control\"/></div></form></div><div class=\"modal-body wait secret\"><h3 data-i18n=\"editor.fork_creating\">Creating Fork...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn\">Cancel</button><button id=\"fork-model-confirm-button\" data-i18n=\"common.save\" class=\"btn btn-primary\">Save</button></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/editor/fork-modal.js.map
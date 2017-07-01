require.register("templates/play/modal/share-progress-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content\"><img src=\"/images/pages/play/modal/parental_prompt_modal_background.png\" class=\"background-img\"/><img src=\"/images/pages/play/modal/parental_nudge_wizard.png\" class=\"wizard-img\"/><div class=\"blurb-container\"> <h1 data-i18n=\"share_progress_modal.title\"></h1><p data-i18n=\"share_progress_modal.blurb\"></p><div class=\"container-fluid send-container\"><div class=\"row\"><div class=\"col-xs-12 email-form\"><p data-i18n=\"share_progress_modal.form_blurb\"></p><div><label data-i18n=\"share_progress_modal.form_label\"></label><input type=\"email\" data-i18n=\"[placeholder]share_progress_modal.placeholder\" class=\"form-control email-input\"/></div></div></div><div class=\"row\"><div class=\"col-xs-8\"><div data-i18n=\"share_progress_modal.email_invalid\" class=\"email-invalid\"></div></div><div class=\"col-xs-4 text-right\"><button data-i18n=\"common.send\" class=\"btn btn-illustrated send-btn\"></button></div></div><div class=\"row continue-container\"><div class=\"col-xs-12 text-left\"><a data-i18n=\"common.continue\" class=\"continue-link\"></a></div></div></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/play/modal/share-progress-modal.js.map
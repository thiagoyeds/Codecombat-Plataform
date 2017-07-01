require.register("templates/teachers/how-to-enroll-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h3 data-i18n=\"teacher.how_to_apply_licenses\"></h3></div></div><div class=\"modal-body\"><p data-i18n=\"teacher.how_to_apply_licenses_blurb_1\"></p><img src=\"/images/pages/courses/how_to_apply_licenses.png\" class=\"m-y-3\"/><h5 data-i18n=\"teacher.how_to_apply_licenses_blurb_2\"></h5><p data-i18n=\"teacher.how_to_apply_licenses_blurb_3\"></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" data-i18n=\"modal.okay\" class=\"btn btn-primary\">Okay</button></div></div></div>");;return buf.join("");
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

;require.register("views/teachers/HowToEnrollModal", function(exports, require, module) {
var HowToEnrollModal, ModalView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

module.exports = HowToEnrollModal = (function(superClass) {
  extend(HowToEnrollModal, superClass);

  function HowToEnrollModal() {
    return HowToEnrollModal.__super__.constructor.apply(this, arguments);
  }

  HowToEnrollModal.prototype.id = 'how-to-enroll-modal';

  HowToEnrollModal.prototype.template = require('templates/teachers/how-to-enroll-modal');

  return HowToEnrollModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/HowToEnrollModal.js.map
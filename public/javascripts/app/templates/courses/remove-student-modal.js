require.register("templates/courses/remove-student-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<div class=\"text-center\"><h1 data-i18n=\"courses.remove_student1\" class=\"modal-title\"></h1><span class=\"glyphicon glyphicon-warning-sign text-danger\"></span><p><span>" + (jade.escape(null == (jade.interp = view.user.get('name', true)) ? "" : jade.interp)) + "</span>");
if ( view.user.get('email'))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = " — " + view.user.get('email')) ? "" : jade.interp)) + "</span>");
}
buf.push("</p><h2 data-i18n=\"courses.are_you_sure\"></h2></div></div><div class=\"modal-body\"><p class=\"text-center\"><span data-i18n=\"courses.remove_description1\"></span>");
if ( view.user.isEnrolled())
{
buf.push("<span data-i18n=\"courses.remove_description2\"></span>");
}
buf.push("</p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div id=\"remove-student-buttons\" class=\"text-center\"><p><button data-dismiss=\"modal\" data-i18n=\"courses.keep_student\" class=\"btn btn-lg btn-forest text-uppercase\"></button></p><p>- OR -</p><p><button id=\"remove-student-btn\" data-i18n=\"courses.remove_student1\" class=\"btn btn-lg btn-burgandy text-uppercase\"></button></p></div><div id=\"remove-student-progress\" class=\"text-center hide\"><div class=\"progress\"><div class=\"progress-bar\"></div></div><p data-i18n=\"courses.removing_user\" class=\"text-info\"></p></div></div></div></div>");;return buf.join("");
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
//# sourceMappingURL=/javascripts/app/templates/courses/remove-student-modal.js.map
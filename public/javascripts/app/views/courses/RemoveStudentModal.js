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

;require.register("views/courses/RemoveStudentModal", function(exports, require, module) {
var ModalView, RemoveStudentModal, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/remove-student-modal');

module.exports = RemoveStudentModal = (function(superClass) {
  extend(RemoveStudentModal, superClass);

  function RemoveStudentModal() {
    return RemoveStudentModal.__super__.constructor.apply(this, arguments);
  }

  RemoveStudentModal.prototype.id = 'remove-student-modal';

  RemoveStudentModal.prototype.template = template;

  RemoveStudentModal.prototype.events = {
    'click #remove-student-btn': 'onClickRemoveStudentButton'
  };

  RemoveStudentModal.prototype.initialize = function(options) {
    this.classroom = options.classroom;
    this.user = options.user;
    return this.courseInstances = options.courseInstances;
  };

  RemoveStudentModal.prototype.onClickRemoveStudentButton = function() {
    var userID;
    this.$('#remove-student-buttons').addClass('hide');
    this.$('#remove-student-progress').removeClass('hide');
    userID = this.user.id;
    this.toRemove = this.courseInstances.filter(function(courseInstance) {
      return _.contains(courseInstance.get('members'), userID);
    });
    this.toRemove.push(this.classroom);
    this.totalJobs = _.size(this.toRemove);
    return this.removeStudent();
  };

  RemoveStudentModal.prototype.removeStudent = function() {
    var model, pct;
    model = this.toRemove.shift();
    if (!model) {
      this.trigger('remove-student', {
        user: this.user
      });
      this.hide();
      return;
    }
    model.removeMember(this.user.id);
    pct = (100 * (this.totalJobs - this.toRemove.length) / this.totalJobs).toFixed(1) + '%';
    this.$('#remove-student-progress .progress-bar').css('width', pct);
    return this.listenToOnce(model, 'sync', function() {
      return this.removeStudent();
    });
  };

  return RemoveStudentModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/RemoveStudentModal.js.map
require.register("templates/teachers/edit-student-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,state = locals_.state;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h3><span data-i18n=\"teacher.edit_2\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.user.broadName()) ? "" : jade.interp)) + "</span></h3></div><div class=\"modal-body\"><div class=\"text-center\"><div class=\"edit-student-details\"><strong data-i18n=\"teacher.student_details\"></strong><span class=\"spr\">:</span><div class=\"small-details\"> <span data-i18n=\"teacher.student_name\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('firstName') && view.user.get('lastName')))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.user.get('firstName')) ? "" : jade.interp)) + "</span><span class=\"spl\">" + (jade.escape(null == (jade.interp = view.user.get('lastName')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_name\"></i>");
}
buf.push("</div><div class=\"small-details\"> <span data-i18n=\"general.username\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('name')))
{
buf.push("<span>" + (jade.escape(null == (jade.interp = view.user.get('name')) ? "" : jade.interp)) + "</span>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_username\"></i>");
}
buf.push("</div><div class=\"small-details\"> <span data-i18n=\"general.email\"></span><span class=\"spr\">:</span>");
if ( (view.user.get('email')))
{
buf.push("<a" + (jade.attrs({ 'href':("mailto:"+view.user.get('email')) }, {"href":true})) + "><span>" + (jade.escape(null == (jade.interp = view.user.get('email')) ? "" : jade.interp)) + "</span></a>");
}
else
{
buf.push("<i data-i18n=\"teacher.no_email\"></i>");
}
buf.push("</div></div>");
if ( view.user.get('emailVerified'))
{
buf.push("<p><span data-i18n=\"teacher.send_email_to\"></span></p><p class=\"m-b-3\">" + (jade.escape(null == (jade.interp = view.user.get('email')) ? "" : jade.interp)) + "</p>");
if ( state.get('emailSent'))
{
buf.push("<div class=\"send-recovery-email-btn btn btn-lg btn-primary uppercase disabled\"><span data-i18n=\"teacher.email_sent\"></span></div>");
}
else
{
buf.push("<div class=\"send-recovery-email-btn btn btn-lg btn-primary uppercase\"><span data-i18n=\"teacher.send_recovery_email\"></span></div>");
}
}
else
{
buf.push("<div class=\"m-b-1\"><strong data-i18n=\"teacher.enter_new_password_below\"></strong></div><div" + (jade.attrs({ "class": [('m-b-2'),('form-group'),((state.get('errorMessage') ? 'has-error' : ''))] }, {"class":true})) + "><input" + (jade.attrs({ 'placeholder':("type a new password here"), 'value':(state.get('newPassword')), "class": [('new-password-input')] }, {"placeholder":true,"value":true})) + "/><div class=\"help-block error-help-block m-t-1 small\"><span>" + (jade.escape(null == (jade.interp = state.get('errorMessage')) ? "" : jade.interp)) + "</span></div></div>");
if ( state.get('passwordChanged'))
{
buf.push("<button class=\"change-password-btn btn btn-lg btn-primary uppercase disabled\"><span data-i18n=\"teacher.changed\"></span></button>");
}
else
{
buf.push("<button class=\"change-password-btn btn btn-lg btn-primary uppercase\"><span data-i18n=\"teacher.change_password\"></span></button>");
}
}
buf.push("</div></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"btn btn-primary\">");
if ( state.get('passwordChanged') || state.get('emailSent'))
{
buf.push("<span data-i18n=\"modal.close\"></span>");
}
else
{
buf.push("<span data-i18n=\"common.cancel\"></span>");
}
buf.push("</button></div></div></div>");;return buf.join("");
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

;require.register("views/teachers/EditStudentModal", function(exports, require, module) {
var EditStudentModal, ModalView, State, auth, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

State = require('models/State');

template = require('templates/teachers/edit-student-modal');

auth = require('core/auth');

module.exports = EditStudentModal = (function(superClass) {
  extend(EditStudentModal, superClass);

  function EditStudentModal() {
    return EditStudentModal.__super__.constructor.apply(this, arguments);
  }

  EditStudentModal.prototype.id = 'edit-student-modal';

  EditStudentModal.prototype.template = template;

  EditStudentModal.prototype.events = {
    'click .send-recovery-email-btn:not(.disabled)': 'onClickSendRecoveryEmail',
    'click .change-password-btn:not(.disabled)': 'onClickChangePassword',
    'input .new-password-input': 'onChangeNewPasswordInput'
  };

  EditStudentModal.prototype.initialize = function(arg) {
    this.user = arg.user, this.classroom = arg.classroom;
    this.supermodel.trackRequest(this.user.fetch());
    this.utils = require('core/utils');
    this.state = new State({
      emailSent: false,
      passwordChanged: false,
      newPassword: "",
      errorMessage: ""
    });
    this.listenTo(this.state, 'change', this.render);
    this.listenTo(this.classroom, 'save-password:success', function() {
      return this.state.set({
        passwordChanged: true,
        errorMessage: ""
      });
    });
    return this.listenTo(this.classroom, 'save-password:error', function(error) {
      return this.state.set({
        errorMessage: error.message
      });
    });
  };

  EditStudentModal.prototype.onClickSendRecoveryEmail = function() {
    var email;
    email = this.user.get('email');
    return auth.sendRecoveryEmail(email).then((function(_this) {
      return function() {
        return _this.state.set({
          emailSent: true
        });
      };
    })(this));
  };

  EditStudentModal.prototype.onClickChangePassword = function() {
    return this.classroom.setStudentPassword(this.user, this.state.get('newPassword'));
  };

  EditStudentModal.prototype.onChangeNewPasswordInput = function(e) {
    this.state.set({
      newPassword: $(e.currentTarget).val(),
      emailSent: false,
      passwordChanged: false
    }, {
      silent: true
    });
    return this.renderSelectors('.change-password-btn');
  };

  return EditStudentModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/teachers/EditStudentModal.js.map
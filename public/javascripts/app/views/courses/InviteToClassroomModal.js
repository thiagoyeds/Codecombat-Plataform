require.register("templates/courses/invite-to-classroom-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("</div><div class=\"modal-body\"><h3 data-i18n=\"courses.option1_header\"></h3><div class=\"form\"><div class=\"form-group\"><p data-i18n=\"courses.enter_emails\" class=\"small help-block\"></p><textarea id=\"invite-emails-textarea\" rows=\"10\" class=\"form-control\"></textarea></div><div class=\"form-group\"><div class=\"text-center\"><button id=\"send-invites-btn\" data-i18n=\"courses.send_invites\" class=\"btn btn-lg btn-primary\"></button><div id=\"invite-emails-sending-alert\" data-i18n=\"common.sending\" class=\"alert alert-info hide\"></div><div id=\"invite-emails-success-alert\" data-i18n=\"play_level.done\" class=\"alert alert-success hide\"></div></div></div></div><br/><p data-i18n=\"courses.option1_body\" class=\"small\"></p></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"></div></div></div>");;return buf.join("");
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

;require.register("views/courses/InviteToClassroomModal", function(exports, require, module) {
var InviteToClassroomModal, ModalView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/invite-to-classroom-modal');

module.exports = InviteToClassroomModal = (function(superClass) {
  extend(InviteToClassroomModal, superClass);

  function InviteToClassroomModal() {
    return InviteToClassroomModal.__super__.constructor.apply(this, arguments);
  }

  InviteToClassroomModal.prototype.id = 'invite-to-classroom-modal';

  InviteToClassroomModal.prototype.template = template;

  InviteToClassroomModal.prototype.events = {
    'click #send-invites-btn': 'onClickSendInvitesButton',
    'click #copy-url-btn, #join-url-input': 'copyURL'
  };

  InviteToClassroomModal.prototype.initialize = function(options) {
    this.classroom = options.classroom;
    this.classCode = this.classroom.get('codeCamel') || this.classroom.get('code');
    return this.joinURL = document.location.origin + "/students?_cc=" + this.classCode;
  };

  InviteToClassroomModal.prototype.onClickSendInvitesButton = function() {
    var email, emails, ref;
    emails = this.$('#invite-emails-textarea').val();
    emails = emails.split('\n');
    emails = _.filter((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = emails.length; i < len; i++) {
        email = emails[i];
        results.push(_.string.trim(email));
      }
      return results;
    })());
    if (!emails.length) {
      return;
    }
    this.$('#send-invites-btn, #invite-emails-textarea').addClass('hide');
    this.$('#invite-emails-sending-alert').removeClass('hide');
    if ((ref = application.tracker) != null) {
      ref.trackEvent('Classroom invite via email', {
        category: 'Courses',
        classroomID: this.classroom.id,
        emails: emails
      });
    }
    return this.classroom.inviteMembers(emails, {
      success: (function(_this) {
        return function() {
          _this.$('#invite-emails-sending-alert').addClass('hide');
          return _this.$('#invite-emails-success-alert').removeClass('hide');
        };
      })(this)
    });
  };

  InviteToClassroomModal.prototype.copyURL = function() {
    var err, error, ref;
    this.$('#join-url-input').val(this.joinURL).select();
    try {
      document.execCommand('copy');
      this.$('#copied-alert').removeClass('hide');
      return (ref = application.tracker) != null ? ref.trackEvent('Classroom copy URL', {
        category: 'Courses',
        classroomID: this.classroom.id,
        url: this.joinURL
      }) : void 0;
    } catch (error) {
      err = error;
      console.log('Oops, unable to copy', err);
      return this.$('#copy-failed-alert').removeClass('hide');
    }
  };

  return InviteToClassroomModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/InviteToClassroomModal.js.map
require.register("templates/courses/join-class-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,me = locals_.me;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.classroom.loaded)
{
buf.push("<div class=\"text-center\"><h3 class=\"modal-title\"><span data-i18n=\"courses.join\"></span><span class=\"spr\"> </span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span></h3><b class=\"small-details\"><span data-i18n=\"courses.instructor\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.owner.get('name')) ? "" : jade.interp)) + "</span></b></div>");
}
buf.push("</div><div class=\"modal-body\">");
if ( view.classroom.loaded)
{
buf.push("<p><span data-i18n=\"courses.youve_been_invited_1\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span><span data-i18n=\"courses.youve_been_invited_2\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.capitalLanguage) ? "" : jade.interp)) + "</span><span data-i18n=\"courses.youve_been_invited_3\" class=\"spl\"></span></p><p><span data-i18n=\"courses.by_joining_1\" class=\"spr\"></span><span>" + (jade.escape(null == (jade.interp = view.classroom.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\">, </span><span>" + (jade.escape(null == (jade.interp = view.classroom.owner.get('name')) ? "" : jade.interp)) + "</span><span class=\"spr\"> </span><span data-i18n=\"courses.by_joining_2\"></span></p>");
if (!( me.get('emailVerified')))
{
buf.push("<div class=\"text-center m-t-4\"><div><b class=\"small-details\"><span data-i18n=\"courses.sent_verification\"></span></b></div><div class=\"small\">" + (jade.escape(null == (jade.interp = me.get('email')) ? "" : jade.interp)) + "</div><div class=\"small\"><span data-i18n=\"courses.you_can_edit\" class=\"spr\"></span><a href=\"/account/settings\"><span data-i18n=\"courses.account_settings\"></span></a></div></div>");
}
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\"><button data-i18n=\"courses.join_class_2\" class=\"join-class-btn btn btn-lg btn-navy\"></button><button data-dismiss=\"modal\" data-i18n=\"common.cancel\" class=\"btn btn-lg\"></button></div></div></div></div>");;return buf.join("");
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

;require.register("views/courses/JoinClassModal", function(exports, require, module) {
var Classroom, JoinClassModal, ModalView, User, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/courses/join-class-modal');

Classroom = require('models/Classroom');

User = require('models/User');

module.exports = JoinClassModal = (function(superClass) {
  extend(JoinClassModal, superClass);

  function JoinClassModal() {
    return JoinClassModal.__super__.constructor.apply(this, arguments);
  }

  JoinClassModal.prototype.id = 'join-class-modal';

  JoinClassModal.prototype.template = template;

  JoinClassModal.prototype.events = {
    'click .join-class-btn': 'onClickJoinClassButton'
  };

  JoinClassModal.prototype.initialize = function(arg) {
    var jqxhr;
    this.classCode = (arg != null ? arg : {}).classCode;
    this.classroom = new Classroom();
    this.teacher = new User();
    jqxhr = this.supermodel.trackRequest(this.classroom.fetchByCode(this.classCode));
    if (!me.get('emailVerified')) {
      this.supermodel.trackRequest($.post("/db/user/" + me.id + "/request-verify-email"));
    }
    this.listenTo(this.classroom, 'error', function() {
      return this.trigger('error');
    });
    this.listenTo(this.classroom, 'sync', function() {
      return this.render;
    });
    this.listenTo(this.classroom, 'join:success', function() {
      return this.trigger('join:success', this.classroom);
    });
    return this.listenTo(this.classroom, 'join:error', function() {
      return this.trigger('join:error', this.classroom, jqxhr);
    });
  };

  JoinClassModal.prototype.onClickJoinClassButton = function() {
    return this.classroom.joinWithCode(this.classCode);
  };

  return JoinClassModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/JoinClassModal.js.map
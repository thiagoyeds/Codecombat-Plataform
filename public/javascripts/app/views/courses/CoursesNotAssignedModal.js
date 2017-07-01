require.register("templates/courses/courses-not-assigned-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
buf.push("<h2 data-i18n=\"teacher.not_assigned_modal_title\"></h2></div><div class=\"modal-body\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_starter_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
else
{
buf.push("<p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_1"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("teacher.not_assigned_modal_full_body_2"), 'data-i18n-options':(JSON.stringify(view.i18nData)), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p><p" + (jade.attrs({ 'data-i18n':("[html]teacher.not_assigned_modal_full_body_3"), 'data-i18n-options':(JSON.stringify({ supportEmail: "<a href='mailto:support@codecombat.com'>support@codecombat.com</a>" })), "class": [('small')] }, {"data-i18n":true,"data-i18n-options":true})) + "></p>");
}
buf.push("</div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\">");
if ( view.state.get('promoteStarterLicenses'))
{
buf.push("<div class=\"text-center\"><a data-i18n=\"about.learn_more\" href=\"/teachers/starter-licenses\" class=\"btn btn-navy btn-lg\"></a></div>");
}
else
{
buf.push("<button class=\"btn btn-forest btn-lg pull-left\"><span data-i18n=\"general.contact_us\"></span></button><button data-dismiss=\"modal\" class=\"btn btn-navy btn-lg pull-right\"><span data-i18n=\"general.close_window\"></span></button>");
}
buf.push("</div></div></div>");;return buf.join("");
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

;require.register("views/courses/CoursesNotAssignedModal", function(exports, require, module) {
var CoursesNotAssignedModal, ModalView, STARTER_LICENSE_COURSE_IDS, State, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ModalView = require('views/core/ModalView');

State = require('models/State');

template = require('templates/courses/courses-not-assigned-modal');

STARTER_LICENSE_COURSE_IDS = require('core/constants').STARTER_LICENSE_COURSE_IDS;

module.exports = CoursesNotAssignedModal = (function(superClass) {
  extend(CoursesNotAssignedModal, superClass);

  function CoursesNotAssignedModal() {
    return CoursesNotAssignedModal.__super__.constructor.apply(this, arguments);
  }

  CoursesNotAssignedModal.prototype.id = 'courses-not-assigned-modal';

  CoursesNotAssignedModal.prototype.template = template;

  CoursesNotAssignedModal.prototype.initialize = function(options) {
    var ref;
    this.i18nData = _.pick(options, ['selected', 'numStudentsWithoutFullLicenses', 'numFullLicensesAvailable']);
    this.state = new State({
      promoteStarterLicenses: false
    });
    if (ref = options.courseID, indexOf.call(STARTER_LICENSE_COURSE_IDS, ref) >= 0) {
      this.supermodel.trackRequest(me.getLeadPriority()).then((function(_this) {
        return function(arg) {
          var priority;
          priority = arg.priority;
          return _this.state.set({
            promoteStarterLicenses: priority === 'low'
          });
        };
      })(this));
    }
    return this.listenTo(this.state, 'change', this.render);
  };

  return CoursesNotAssignedModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/CoursesNotAssignedModal.js.map
require.register("templates/courses/classroom-settings-modal", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view,_ = locals_._,me = locals_.me;var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("<div class=\"modal-dialog\"><div class=\"modal-content style-flat\"><div class=\"modal-header\">");
if ( view.closeButton)
{
buf.push("<div type=\"button\" data-dismiss=\"modal\" aria-hidden=\"true\" class=\"button close\">&times;</div>");
}
if ( view.classroom.isNew())
{
buf.push("<h3 data-i18n=\"courses.create_new_class\" class=\"modal-title\"></h3>");
}
else
{
buf.push("<h3 data-i18n=\"courses.edit_settings1\" class=\"modal-title\"></h3>");
}
buf.push("</div><div class=\"modal-body\"><form><div class=\"form-group\"><label data-i18n=\"courses.class_name\"></label><input" + (jade.attrs({ 'id':('name-input'), 'name':("name"), 'type':('text'), 'value':(view.classroom.get('name')), "class": [('form-control')] }, {"name":true,"type":true,"value":true})) + "/></div><div class=\"form-group\"><label><span data-i18n=\"general.description\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><textarea name=\"description\" rows=\"2\" class=\"form-control\">" + (jade.escape(null == (jade.interp = view.classroom.get('description')) ? "" : jade.interp)) + "</textarea></div><div class=\"form-group\"><label data-i18n=\"choose_hero.programming_language\"></label>");
var aceConfig = view.classroom.get('aceConfig') || {};
var languageDisabled = !!_.size(view.classroom.get('members'));
buf.push("<div data-i18n=\"courses.language_cannot_change\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'id':('programming-language-select'), 'name':("language"), 'value':(aceConfig.language), 'disabled':(languageDisabled), "class": [('form-control')] }, {"name":true,"value":true,"disabled":true})) + ">");
var aceConfig = view.classroom.get('aceConfig') || {};
buf.push("<option value=\"\" data-i18n=\"courses.language_select\"></option><option value=\"python\">Python</option><option value=\"javascript\">JavaScript</option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.avg_student_exp_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div data-i18n=\"courses.avg_student_exp_desc\" class=\"help-block small text-navy\"></div><select" + (jade.attrs({ 'name':("averageStudentExp"), 'value':(view.classroom.get('averageStudentExp')), "class": [('form-control')] }, {"name":true,"value":true})) + "><option value=\"\" data-i18n=\"courses.avg_student_exp_select\"></option><option value=\"none\" data-i18n=\"courses.avg_student_exp_none\"></option><option value=\"beginner\" data-i18n=\"courses.avg_student_exp_beginner\"></option><option value=\"intermediate\" data-i18n=\"courses.avg_student_exp_intermediate\"></option><option value=\"advanced\" data-i18n=\"courses.avg_student_exp_advanced\"></option><option value=\"varied\" data-i18n=\"courses.avg_student_exp_varied\"></option></select></div><div class=\"form-group\"><label><span data-i18n=\"courses.student_age_range_label\"></span><i data-i18n=\"signup.optional\" class=\"spl text-muted\"></i></label><div>");
ageRange_mixin("ageRangeMin");
buf.push("<span data-i18n=\"courses.student_age_range_to\" class=\"spl spr\"></span>");
ageRange_mixin("ageRangeMax");
buf.push("</div>");
var ageRange_mixin = function(name){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
buf.push("<select" + (jade.attrs({ 'name':(name), 'value':(view.classroom.get(name)), "class": [('age-range-select'),('form-control')] }, {"name":true,"value":true})) + "><option value=\"\">-</option><option value=\"&lt;6\" data-i18n=\"courses.student_age_range_younger\"></option>");
// iterate _.range(6,18)
;(function(){
  var $$obj = _.range(6,18);
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var i = $$obj[$index];

buf.push("<option" + (jade.attrs({ 'value':(i) }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = i) ? "" : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("<option value=\"18\" data-i18n=\"courses.student_age_range_older\"></option></select>");
};
buf.push("</div></form></div><div class=\"modal-body wait secret\"><h3>Reticulating Splines...</h3><div class=\"progress progress-striped active\"><div class=\"progress-bar\"></div></div></div><div class=\"modal-footer\"><div class=\"text-center\">");
if ( view.classroom.isNew())
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"courses.create_class\" class=\"btn btn-primary btn-lg\"></button>");
}
else
{
buf.push("<button id=\"save-settings-btn\" data-i18n=\"common.save_changes\" class=\"btn btn-primary btn-lg\"></button>");
}
if ( me.isAdmin())
{
buf.push("<hr/><!-- DNT--><h3>Admin Only</h3><button id=\"update-courses-btn\" class=\"btn btn-forest btn-lg\">Update Courses</button>");
}
buf.push("</div></div></div></div>");;return buf.join("");
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

;require.register("views/courses/ClassroomSettingsModal", function(exports, require, module) {
var Classroom, ClassroomSettingsModal, ModalView, errors, forms, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Classroom = require('models/Classroom');

ModalView = require('views/core/ModalView');

template = require('templates/courses/classroom-settings-modal');

forms = require('core/forms');

errors = require('core/errors');

module.exports = ClassroomSettingsModal = (function(superClass) {
  extend(ClassroomSettingsModal, superClass);

  function ClassroomSettingsModal() {
    return ClassroomSettingsModal.__super__.constructor.apply(this, arguments);
  }

  ClassroomSettingsModal.prototype.id = 'classroom-settings-modal';

  ClassroomSettingsModal.prototype.template = template;

  ClassroomSettingsModal.prototype.events = {
    'click #save-settings-btn': 'onSubmitForm',
    'click #update-courses-btn': 'onClickUpdateCoursesButton',
    'submit form': 'onSubmitForm'
  };

  ClassroomSettingsModal.prototype.initialize = function(options) {
    if (options == null) {
      options = {};
    }
    return this.classroom = options.classroom || new Classroom();
  };

  ClassroomSettingsModal.prototype.afterRender = function() {
    ClassroomSettingsModal.__super__.afterRender.call(this);
    return forms.updateSelects(this.$('form'));
  };

  ClassroomSettingsModal.prototype.onSubmitForm = function(e) {
    var attrs, button, error, form, i, len, ref, schemaErrors;
    this.classroom.notyErrors = false;
    e.preventDefault();
    form = this.$('form');
    forms.clearFormAlerts(form);
    attrs = forms.formToObject(form, {
      ignoreEmptyString: false
    });
    if (attrs.language) {
      attrs.aceConfig = {
        language: attrs.language
      };
      delete attrs.language;
    } else {
      forms.setErrorToProperty(form, 'language', $.i18n.t('common.required_field'));
      return;
    }
    this.classroom.set(attrs);
    schemaErrors = this.classroom.getValidationErrors();
    if (schemaErrors) {
      for (i = 0, len = schemaErrors.length; i < len; i++) {
        error = schemaErrors[i];
        if (error.schemaPath === "/properties/name/minLength") {
          error.message = 'Please enter a class name.';
        }
      }
      forms.applyErrorsToForm(form, schemaErrors);
      return;
    }
    button = this.$('#save-settings-btn');
    this.oldButtonText = button.text();
    button.text($.i18n.t('common.saving')).attr('disabled', true);
    this.classroom.save();
    this.listenToOnce(this.classroom, 'error', function(model, jqxhr) {
      this.stopListening(this.classroom, 'sync', this.hide);
      button.text(this.oldButtonText).attr('disabled', false);
      return errors.showNotyNetworkError(jqxhr);
    });
    this.listenToOnce(this.classroom, 'sync', this.hide);
    return (ref = window.tracker) != null ? ref.trackEvent("Teachers Edit Class Saved", {
      category: 'Teachers',
      classroomID: this.classroom.id
    }, ['Mixpanel']) : void 0;
  };

  ClassroomSettingsModal.prototype.onClickUpdateCoursesButton = function() {
    this.$('#update-courses-btn').attr('disabled', true);
    return Promise.resolve(this.classroom.updateCourses()).then((function(_this) {
      return function() {
        _this.$('#update-courses-btn').attr('disabled', false);
        return noty({
          text: 'Updated',
          timeout: 2000
        });
      };
    })(this))["catch"]((function(_this) {
      return function(e) {
        var ref;
        console.log('e', e);
        _this.$('#update-courses-btn').attr('disabled', false);
        return noty({
          text: ((ref = e.responseJSON) != null ? ref.message : void 0) || e.responseText || 'Error!',
          type: 'error',
          timeout: 5000
        });
      };
    })(this));
  };

  return ClassroomSettingsModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/courses/ClassroomSettingsModal.js.map
require.register("views/i18n/I18NEditCourseView", function(exports, require, module) {
var Course, I18NEditCourseView, I18NEditModelView, Patch, PatchModal, Patches, deltasLib,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

Course = require('models/Course');

deltasLib = require('core/deltas');

Patch = require('models/Patch');

Patches = require('collections/Patches');

PatchModal = require('views/editor/PatchModal');

module.exports = I18NEditCourseView = (function(superClass) {
  extend(I18NEditCourseView, superClass);

  function I18NEditCourseView() {
    return I18NEditCourseView.__super__.constructor.apply(this, arguments);
  }

  I18NEditCourseView.prototype.id = "i18n-edit-course-view";

  I18NEditCourseView.prototype.modelClass = Course;

  I18NEditCourseView.prototype.buildTranslationList = function() {
    var description, i18n, lang, name, ref, ref1;
    lang = this.selectedLanguage;
    if (i18n = this.model.get('i18n')) {
      if (name = this.model.get('name')) {
        this.wrapRow('Course short name', ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      }
      if (description = this.model.get('description')) {
        return this.wrapRow('Course description', ['description'], description, (ref1 = i18n[lang]) != null ? ref1.description : void 0, []);
      }
    }
  };

  return I18NEditCourseView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditCourseView.js.map
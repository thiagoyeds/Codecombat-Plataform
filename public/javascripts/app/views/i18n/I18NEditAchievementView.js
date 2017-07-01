require.register("views/i18n/I18NEditAchievementView", function(exports, require, module) {
var Achievement, I18NEditAchievementView, I18NEditModelView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

Achievement = require('models/Achievement');

module.exports = I18NEditAchievementView = (function(superClass) {
  extend(I18NEditAchievementView, superClass);

  function I18NEditAchievementView() {
    return I18NEditAchievementView.__super__.constructor.apply(this, arguments);
  }

  I18NEditAchievementView.prototype.id = "i18n-edit-achievement-view";

  I18NEditAchievementView.prototype.modelClass = Achievement;

  I18NEditAchievementView.prototype.buildTranslationList = function() {
    var description, i18n, lang, name, ref, ref1;
    lang = this.selectedLanguage;
    if (i18n = this.model.get('i18n')) {
      if (name = this.model.get('name')) {
        this.wrapRow("Achievement name", ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      }
      if (description = this.model.get('description')) {
        return this.wrapRow("Achievement description", ['description'], description, (ref1 = i18n[lang]) != null ? ref1.description : void 0, []);
      }
    }
  };

  return I18NEditAchievementView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditAchievementView.js.map
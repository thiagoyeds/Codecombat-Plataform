require.register("views/i18n/I18NEditThangTypeView", function(exports, require, module) {
var I18NEditModelView, I18NEditThangTypeView, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

ThangType = require('models/ThangType');

module.exports = I18NEditThangTypeView = (function(superClass) {
  extend(I18NEditThangTypeView, superClass);

  function I18NEditThangTypeView() {
    return I18NEditThangTypeView.__super__.constructor.apply(this, arguments);
  }

  I18NEditThangTypeView.prototype.id = 'i18n-thang-type-view';

  I18NEditThangTypeView.prototype.modelClass = ThangType;

  I18NEditThangTypeView.prototype.buildTranslationList = function() {
    var extendedName, i18n, lang, name, ref, ref1, ref2, ref3, unlockLevelName;
    lang = this.selectedLanguage;
    if (!this.model.hasLocalChanges()) {
      this.model.markToRevert();
    }
    i18n = this.model.get('i18n');
    if (i18n) {
      name = this.model.get('name');
      this.wrapRow('Name', ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      this.wrapRow('Description', ['description'], this.model.get('description'), (ref1 = i18n[lang]) != null ? ref1.description : void 0, [], 'markdown');
      if (extendedName = this.model.get('extendedName')) {
        this.wrapRow('Extended Hero Name', ['extendedName'], extendedName, (ref2 = i18n[lang]) != null ? ref2.extendedName : void 0, []);
      }
      if (unlockLevelName = this.model.get('unlockLevelName')) {
        return this.wrapRow('Unlock Level Name', ['unlockLevelName'], unlockLevelName, (ref3 = i18n[lang]) != null ? ref3.unlockLevelName : void 0, []);
      }
    }
  };

  return I18NEditThangTypeView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditThangTypeView.js.map
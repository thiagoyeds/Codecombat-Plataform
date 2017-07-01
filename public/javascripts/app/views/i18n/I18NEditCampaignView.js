require.register("views/i18n/I18NEditCampaignView", function(exports, require, module) {
var Campaign, I18NEditCampaignView, I18NEditModelView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

Campaign = require('models/Campaign');

module.exports = I18NEditCampaignView = (function(superClass) {
  extend(I18NEditCampaignView, superClass);

  function I18NEditCampaignView() {
    return I18NEditCampaignView.__super__.constructor.apply(this, arguments);
  }

  I18NEditCampaignView.prototype.id = "i18n-edit-campaign-view";

  I18NEditCampaignView.prototype.modelClass = Campaign;

  I18NEditCampaignView.prototype.buildTranslationList = function() {
    var description, fullName, i18n, lang, name, ref, ref1, ref2;
    lang = this.selectedLanguage;
    if (i18n = this.model.get('i18n')) {
      if (name = this.model.get('name')) {
        this.wrapRow('Campaign short name', ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      }
      if (fullName = this.model.get('fullName')) {
        this.wrapRow('Campaign full name', ['fullName'], fullName, (ref1 = i18n[lang]) != null ? ref1.fullName : void 0, []);
      }
      if (description = this.model.get('description')) {
        return this.wrapRow('Campaign description', ['description'], description, (ref2 = i18n[lang]) != null ? ref2.description : void 0, []);
      }
    }
  };

  return I18NEditCampaignView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditCampaignView.js.map
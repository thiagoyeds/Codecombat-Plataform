require.register("views/i18n/I18NEditPollView", function(exports, require, module) {
var I18NEditModelView, I18NEditPollView, Poll,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

Poll = require('models/Poll');

module.exports = I18NEditPollView = (function(superClass) {
  extend(I18NEditPollView, superClass);

  function I18NEditPollView() {
    return I18NEditPollView.__super__.constructor.apply(this, arguments);
  }

  I18NEditPollView.prototype.id = "i18n-edit-poll-view";

  I18NEditPollView.prototype.modelClass = Poll;

  I18NEditPollView.prototype.buildTranslationList = function() {
    var answer, description, i, i18n, index, lang, len, name, ref, ref1, ref2, ref3, ref4, results;
    lang = this.selectedLanguage;
    if (i18n = this.model.get('i18n')) {
      if (name = this.model.get('name')) {
        this.wrapRow("Poll name", ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      }
      if (description = this.model.get('description')) {
        this.wrapRow("Poll description", ['description'], description, (ref1 = i18n[lang]) != null ? ref1.description : void 0, []);
      }
    }
    ref3 = (ref2 = this.model.get('answers')) != null ? ref2 : [];
    results = [];
    for (index = i = 0, len = ref3.length; i < len; index = ++i) {
      answer = ref3[index];
      if (i18n = answer.i18n) {
        results.push(this.wrapRow('Answer', ['text'], answer.text, (ref4 = i18n[lang]) != null ? ref4.text : void 0, ['answers', index]));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return I18NEditPollView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditPollView.js.map
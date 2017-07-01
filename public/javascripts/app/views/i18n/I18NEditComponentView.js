require.register("views/i18n/I18NEditComponentView", function(exports, require, module) {
var I18NEditComponentView, I18NEditModelView, LevelComponent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

LevelComponent = require('models/LevelComponent');

module.exports = I18NEditComponentView = (function(superClass) {
  extend(I18NEditComponentView, superClass);

  function I18NEditComponentView() {
    return I18NEditComponentView.__super__.constructor.apply(this, arguments);
  }

  I18NEditComponentView.prototype.id = 'i18n-edit-component-view';

  I18NEditComponentView.prototype.modelClass = LevelComponent;

  I18NEditComponentView.prototype.buildTranslationList = function() {
    var argDoc, argIndex, context, d, description, i, i18n, key, lang, len, path, progLang, propDoc, propDocIndex, propDocs, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, results, value;
    lang = this.selectedLanguage;
    propDocs = this.model.get('propertyDocumentation');
    results = [];
    for (propDocIndex = i = 0, len = propDocs.length; i < len; propDocIndex = ++i) {
      propDoc = propDocs[propDocIndex];
      if (i18n = propDoc.i18n) {
        path = ['propertyDocumentation', propDocIndex];
        this.wrapRow(propDoc.name + " name value", ['name'], propDoc.name, (ref = i18n[lang]) != null ? ref.name : void 0, path);
        if (_.isObject(propDoc.description)) {
          ref1 = propDoc.description;
          for (progLang in ref1) {
            description = ref1[progLang];
            this.wrapRow(propDoc.name + " description (" + progLang + ")", ['description', progLang], description, (ref2 = i18n[lang]) != null ? (ref3 = ref2[progLang]) != null ? ref3.description : void 0 : void 0, path, 'markdown');
          }
        } else if (_.isString(propDoc.description)) {
          this.wrapRow(propDoc.name + " description", ['description'], propDoc.description, (ref4 = i18n[lang]) != null ? ref4.description : void 0, path, 'markdown');
        }
        if (context = propDoc.context) {
          for (key in context) {
            value = context[key];
            this.wrapRow(propDoc.name + " context value", ['context', key], value, (ref5 = i18n[lang]) != null ? (ref6 = ref5.context) != null ? ref6[key] : void 0 : void 0, path);
          }
        }
      }
      if (i18n = (ref7 = propDoc.returns) != null ? ref7.i18n : void 0) {
        path = ['propertyDocumentation', propDocIndex, 'returns'];
        d = propDoc.returns.description;
        if (_.isObject(d)) {
          ref8 = d.description;
          for (progLang in ref8) {
            description = ref8[progLang];
            this.wrapRow(propDoc.name + " return val (" + progLang + ")", ['description', progLang], description, (ref9 = i18n[lang]) != null ? (ref10 = ref9[progLang]) != null ? ref10.description : void 0 : void 0, path, 'markdown');
          }
        } else if (_.isString(d)) {
          this.wrapRow(propDoc.name + " return val", ['description'], d, (ref11 = i18n[lang]) != null ? ref11.description : void 0, path, 'markdown');
        }
      }
      if (propDoc.args) {
        results.push((function() {
          var j, len1, ref12, ref13, results1;
          ref12 = propDoc.args;
          results1 = [];
          for (argIndex = j = 0, len1 = ref12.length; j < len1; argIndex = ++j) {
            argDoc = ref12[argIndex];
            if (i18n = argDoc.i18n) {
              path = ['propertyDocumentation', propDocIndex, 'args', argIndex];
              if (_.isObject(argDoc.description)) {
                results1.push((function() {
                  var ref13, ref14, ref15, results2;
                  ref13 = argDoc.description;
                  results2 = [];
                  for (progLang in ref13) {
                    description = ref13[progLang];
                    results2.push(this.wrapRow(propDoc.name + " arg description " + argDoc.name + " (" + progLang + ")", ['description', progLang], description, (ref14 = i18n[lang]) != null ? (ref15 = ref14[progLang]) != null ? ref15.description : void 0 : void 0, path, 'markdown'));
                  }
                  return results2;
                }).call(this));
              } else if (_.isString(argDoc.description)) {
                results1.push(this.wrapRow(propDoc.name + " arg description " + argDoc.name, ['description'], argDoc.description, (ref13 = i18n[lang]) != null ? ref13.description : void 0, path, 'markdown'));
              } else {
                results1.push(void 0);
              }
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return I18NEditComponentView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditComponentView.js.map
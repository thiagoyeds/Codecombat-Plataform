require.register("views/i18n/I18NEditLevelView", function(exports, require, module) {
var I18NEditLevelView, I18NEditModelView, Level, LevelComponent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

I18NEditModelView = require('./I18NEditModelView');

Level = require('models/Level');

LevelComponent = require('models/LevelComponent');

module.exports = I18NEditLevelView = (function(superClass) {
  extend(I18NEditLevelView, superClass);

  function I18NEditLevelView() {
    return I18NEditLevelView.__super__.constructor.apply(this, arguments);
  }

  I18NEditLevelView.prototype.id = 'i18n-edit-level-view';

  I18NEditLevelView.prototype.modelClass = Level;

  I18NEditLevelView.prototype.buildTranslationList = function() {
    var component, componentIndex, context, description, doc, goal, hint, i, i18n, index, j, k, key, l, lang, len, len1, len2, len3, len4, len5, len6, len7, len8, loadingTip, m, method, methodName, n, name, noteGroup, noteGroupIndex, o, p, path, pathPrefix, q, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref18, ref19, ref2, ref20, ref21, ref22, ref23, ref24, ref25, ref26, ref27, ref28, ref29, ref3, ref30, ref31, ref32, ref33, ref34, ref35, ref36, ref4, ref5, ref6, ref7, ref8, ref9, response, responseIndex, results, script, scriptIndex, spriteCommand, spriteCommandIndex, studentPlayInstructions, thang, thangIndex, value;
    lang = this.selectedLanguage;
    if (i18n = this.model.get('i18n')) {
      if (name = this.model.get('name')) {
        this.wrapRow('Level name', ['name'], name, (ref = i18n[lang]) != null ? ref.name : void 0, []);
      }
      if (description = this.model.get('description')) {
        this.wrapRow('Level description', ['description'], description, (ref1 = i18n[lang]) != null ? ref1.description : void 0, []);
      }
      if (loadingTip = this.model.get('loadingTip')) {
        this.wrapRow('Loading tip', ['loadingTip'], loadingTip, (ref2 = i18n[lang]) != null ? ref2.loadingTip : void 0, []);
      }
      if (studentPlayInstructions = this.model.get('studentPlayInstructions')) {
        this.wrapRow('Student Play Instructions', ['studentPlayInstructions'], studentPlayInstructions, (ref3 = i18n[lang]) != null ? ref3.studentPlayInstructions : void 0, []);
      }
    }
    ref5 = (ref4 = this.model.get('goals')) != null ? ref4 : [];
    for (index = i = 0, len = ref5.length; i < len; index = ++i) {
      goal = ref5[index];
      if (i18n = goal.i18n) {
        this.wrapRow('Goal name', ['name'], goal.name, (ref6 = i18n[lang]) != null ? ref6.name : void 0, ['goals', index]);
      }
    }
    ref9 = (ref7 = (ref8 = this.model.get('documentation')) != null ? ref8.specificArticles : void 0) != null ? ref7 : [];
    for (index = j = 0, len1 = ref9.length; j < len1; index = ++j) {
      doc = ref9[index];
      if (i18n = doc.i18n) {
        this.wrapRow('Guide article name', ['name'], doc.name, (ref10 = i18n[lang]) != null ? ref10.name : void 0, ['documentation', 'specificArticles', index]);
        this.wrapRow("'" + doc.name + "' body", ['body'], doc.body, (ref11 = i18n[lang]) != null ? ref11.body : void 0, ['documentation', 'specificArticles', index], 'markdown');
      }
    }
    ref14 = (ref12 = (ref13 = this.model.get('documentation')) != null ? ref13.hints : void 0) != null ? ref12 : [];
    for (index = k = 0, len2 = ref14.length; k < len2; index = ++k) {
      hint = ref14[index];
      if (i18n = hint.i18n) {
        name = "Hint " + (index + 1);
        this.wrapRow("'" + name + "' body", ['body'], hint.body, (ref15 = i18n[lang]) != null ? ref15.body : void 0, ['documentation', 'hints', index], 'markdown');
      }
    }
    ref18 = (ref16 = (ref17 = this.model.get('documentation')) != null ? ref17.hintsB : void 0) != null ? ref16 : [];
    for (index = l = 0, len3 = ref18.length; l < len3; index = ++l) {
      hint = ref18[index];
      if (i18n = hint.i18n) {
        name = "Hint " + (index + 1);
        this.wrapRow("'" + name + "' body", ['body'], hint.body, (ref19 = i18n[lang]) != null ? ref19.body : void 0, ['documentation', 'hints', index], 'markdown');
      }
    }
    ref21 = (ref20 = this.model.get('scripts')) != null ? ref20 : [];
    for (scriptIndex = m = 0, len4 = ref21.length; m < len4; scriptIndex = ++m) {
      script = ref21[scriptIndex];
      ref23 = (ref22 = script.noteChain) != null ? ref22 : [];
      for (noteGroupIndex = n = 0, len5 = ref23.length; n < len5; noteGroupIndex = ++n) {
        noteGroup = ref23[noteGroupIndex];
        ref25 = (ref24 = noteGroup.sprites) != null ? ref24 : [];
        for (spriteCommandIndex = o = 0, len6 = ref25.length; o < len6; spriteCommandIndex = ++o) {
          spriteCommand = ref25[spriteCommandIndex];
          pathPrefix = ['scripts', scriptIndex, 'noteChain', noteGroupIndex, 'sprites', spriteCommandIndex, 'say'];
          if (i18n = (ref26 = spriteCommand.say) != null ? ref26.i18n : void 0) {
            if (spriteCommand.say.text) {
              this.wrapRow('Sprite text', ['text'], spriteCommand.say.text, (ref27 = i18n[lang]) != null ? ref27.text : void 0, pathPrefix, 'markdown');
            }
            if (spriteCommand.say.blurb) {
              this.wrapRow('Sprite blurb', ['blurb'], spriteCommand.say.blurb, (ref28 = i18n[lang]) != null ? ref28.blurb : void 0, pathPrefix);
            }
          }
          ref31 = (ref29 = (ref30 = spriteCommand.say) != null ? ref30.responses : void 0) != null ? ref29 : [];
          for (responseIndex = p = 0, len7 = ref31.length; p < len7; responseIndex = ++p) {
            response = ref31[responseIndex];
            if (i18n = response.i18n) {
              this.wrapRow('Response button', ['text'], response.text, (ref32 = i18n[lang]) != null ? ref32.text : void 0, pathPrefix.concat(['responses', responseIndex]));
            }
          }
        }
      }
    }
    if (i18n = (ref33 = this.model.get('victory')) != null ? ref33.i18n : void 0) {
      this.wrapRow('Victory text', ['body'], this.model.get('victory').body, (ref34 = i18n[lang]) != null ? ref34.body : void 0, ['victory'], 'markdown');
    }
    ref36 = (ref35 = this.model.get('thangs')) != null ? ref35 : [];
    results = [];
    for (thangIndex = q = 0, len8 = ref36.length; q < len8; thangIndex = ++q) {
      thang = ref36[thangIndex];
      results.push((function() {
        var len9, r, ref37, ref38, results1;
        ref38 = (ref37 = thang.components) != null ? ref37 : [];
        results1 = [];
        for (componentIndex = r = 0, len9 = ref38.length; r < len9; componentIndex = ++r) {
          component = ref38[componentIndex];
          if (component.original !== LevelComponent.ProgrammableID) {
            continue;
          }
          results1.push((function() {
            var ref39, ref40, ref41, results2;
            ref41 = (ref39 = (ref40 = component.config) != null ? ref40.programmableMethods : void 0) != null ? ref39 : {};
            results2 = [];
            for (methodName in ref41) {
              method = ref41[methodName];
              if ((i18n = method.i18n) && (context = method.context)) {
                results2.push((function() {
                  var ref42, ref43, results3;
                  results3 = [];
                  for (key in context) {
                    value = context[key];
                    path = ['thangs', thangIndex, 'components', componentIndex, 'config', 'programmableMethods', methodName];
                    results3.push(this.wrapRow('Code comment', ['context', key], value, (ref42 = i18n[lang]) != null ? (ref43 = ref42.context) != null ? ref43[key] : void 0 : void 0, path));
                  }
                  return results3;
                }).call(this));
              } else {
                results2.push(void 0);
              }
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  return I18NEditLevelView;

})(I18NEditModelView);
});

;
//# sourceMappingURL=/javascripts/app/views/i18n/I18NEditLevelView.js.map
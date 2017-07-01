require.register("models/Poll", function(exports, require, module) {
var CocoModel, Poll, schema,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoModel = require('./CocoModel');

schema = require('schemas/models/poll.schema');

module.exports = Poll = (function(superClass) {
  extend(Poll, superClass);

  function Poll() {
    return Poll.__super__.constructor.apply(this, arguments);
  }

  Poll.className = 'Poll';

  Poll.schema = schema;

  Poll.prototype.urlRoot = '/db/poll';

  Poll.prototype.applyDelta = function(delta) {
    var answerChanges, answerIndex, answerIndexNum, base, base1, change, i, i18nDelta, isDeletion, isI18N, key, language, len, oldTranslations, oldValue, pickedChange, ref, ref1, ref2, ref3, translationKey, translationValue, value;
    i18nDelta = {};
    if (delta.i18n) {
      i18nDelta.i18n = $.extend(true, {}, delta.i18n);
    }
    ref1 = (ref = delta.answers) != null ? ref : {};
    for (answerIndex in ref1) {
      answerChanges = ref1[answerIndex];
      if (i18nDelta.answers == null) {
        i18nDelta.answers = {};
      }
      if (_.isArray(answerChanges)) {
        if ((base = i18nDelta.answers)[answerIndex] == null) {
          base[answerIndex] = [];
        }
        for (i = 0, len = answerChanges.length; i < len; i++) {
          change = answerChanges[i];
          if (_.isNumber(change)) {
            pickedChange = change;
          } else {
            pickedChange = $.extend(true, {}, change);
            for (key in pickedChange) {
              answerIndexNum = parseInt(answerIndex.replace('_', ''), 10);
              if (!_.isNaN(answerIndexNum)) {
                oldValue = this.get('answers')[answerIndexNum][key];
                isDeletion = _.string.startsWith(answerIndex, '_');
                isI18N = key === 'i18n';
                if (isI18N && !isDeletion) {
                  value = pickedChange[key];
                  ref2 = oldValue != null ? oldValue : {};
                  for (language in ref2) {
                    oldTranslations = ref2[language];
                    ref3 = oldTranslations != null ? oldTranslations : {};
                    for (translationKey in ref3) {
                      translationValue = ref3[translationKey];
                      if (value[language] == null) {
                        value[language] = {};
                      }
                      if ((base1 = value[language])[translationKey] == null) {
                        base1[translationKey] = translationValue;
                      }
                    }
                  }
                } else {
                  value = oldValue;
                }
                pickedChange[key] = value;
              }
            }
          }
          i18nDelta.answers[answerIndex].push(pickedChange);
        }
      } else {
        i18nDelta.answers[answerIndex] = answerChanges;
        if (answerChanges != null ? answerChanges.votes : void 0) {
          i18nDelta.answers[answerIndex] = _.omit(answerChanges, 'votes');
        }
      }
    }
    return Poll.__super__.applyDelta.call(this, i18nDelta);
  };

  return Poll;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/Poll.js.map
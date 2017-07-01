require.register("schemas/languages", function(exports, require, module) {
var code, language, languageAliases, languageCodeFromAcceptedLanguages, languageCodes, languageCodesLower, languages, locale, localeInfo;

locale = require('../locale/locale');

languages = [];

for (code in locale) {
  localeInfo = locale[code];
  languages.push({
    code: code,
    nativeDescription: localeInfo.nativeDescription,
    englishDescription: localeInfo.englishDescription
  });
}

module.exports.languages = languages;

module.exports.languageCodes = languageCodes = (function() {
  var i, len, results;
  results = [];
  for (i = 0, len = languages.length; i < len; i++) {
    language = languages[i];
    results.push(language.code);
  }
  return results;
})();

module.exports.languageCodesLower = languageCodesLower = (function() {
  var i, len, results;
  results = [];
  for (i = 0, len = languageCodes.length; i < len; i++) {
    code = languageCodes[i];
    results.push(code.toLowerCase());
  }
  return results;
})();

languageAliases = {
  'en': 'en-US',
  'zh-cn': 'zh-HANS',
  'zh-hans-cn': 'zh-HANS',
  'zh-sg': 'zh-HANS',
  'zh-hans-sg': 'zh-HANS',
  'zh-tw': 'zh-HANT',
  'zh-hant-tw': 'zh-HANT',
  'zh-hk': 'zh-HANT',
  'zh-hant-hk': 'zh-HANT',
  'zh-mo': 'zh-HANT',
  'zh-hant-mo': 'zh-HANT'
};

module.exports.languageCodeFromAcceptedLanguages = languageCodeFromAcceptedLanguages = function(acceptedLanguages) {
  var codeIndex, i, lang, len, ref;
  ref = acceptedLanguages != null ? acceptedLanguages : [];
  for (i = 0, len = ref.length; i < len; i++) {
    lang = ref[i];
    code = languageAliases[lang.toLowerCase()];
    if (code) {
      return code;
    }
    codeIndex = _.indexOf(languageCodesLower, lang);
    if (codeIndex !== -1) {
      return languageCodes[codeIndex];
    }
  }
  return 'en-US';
};
});

;
//# sourceMappingURL=/javascripts/app/schemas/languages.js.map
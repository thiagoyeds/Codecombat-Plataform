require.register("locale/locale", function(exports, require, module) {
module.exports = {
  update: function() {
    var code, i, len, localesLoaded, path, results, s;
    localesLoaded = (function() {
      var i, len, ref, results;
      ref = window.require.list();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (_.string.startsWith(s, 'locale/')) {
          results.push(s);
        }
      }
      return results;
    })();
    results = [];
    for (i = 0, len = localesLoaded.length; i < len; i++) {
      path = localesLoaded[i];
      if (path === 'locale/locale') {
        continue;
      }
      code = path.replace('locale/', '');
      results.push(this[code] = require(path));
    }
    return results;
  },
  'en': {
    nativeDescription: 'English',
    englishDescription: 'English'
  },
  'en-US': {
    nativeDescription: 'English (US)',
    englishDescription: 'English (US)'
  },
  'en-GB': {
    nativeDescription: 'English (UK)',
    englishDescription: 'English (UK)'
  },
  'zh-HANS': {
    nativeDescription: '简体中文',
    englishDescription: 'Chinese (Simplified)'
  },
  'zh-HANT': {
    nativeDescription: '繁體中文',
    englishDescription: 'Chinese (Traditional)'
  },
  'ru': {
    nativeDescription: 'русский',
    englishDescription: 'Russian'
  },
  'es-ES': {
    nativeDescription: 'español (ES)',
    englishDescription: 'Spanish (Spain)'
  },
  'es-419': {
    nativeDescription: 'español (América Latina)',
    englishDescription: 'Spanish (Latin America)'
  },
  'fr': {
    nativeDescription: 'français',
    englishDescription: 'French'
  },
  'ar': {
    nativeDescription: 'العربية',
    englishDescription: 'Arabic'
  },
  'bg': {
    nativeDescription: 'български език',
    englishDescription: 'Bulgarian'
  },
  'ca': {
    nativeDescription: 'Català',
    englishDescription: 'Catalan'
  },
  'cs': {
    nativeDescription: 'čeština',
    englishDescription: 'Czech'
  },
  'da': {
    nativeDescription: 'dansk',
    englishDescription: 'Danish'
  },
  'de-DE': {
    nativeDescription: 'Deutsch (Deutschland)',
    englishDescription: 'German (Germany)'
  },
  'de-AT': {
    nativeDescription: 'Deutsch (Österreich)',
    englishDescription: 'German (Austria)'
  },
  'de-CH': {
    nativeDescription: 'Deutsch (Schweiz)',
    englishDescription: 'German (Switzerland)'
  },
  'et': {
    nativeDescription: 'Eesti',
    englishDescription: 'Estonian'
  },
  'el': {
    nativeDescription: 'Ελληνικά',
    englishDescription: 'Greek'
  },
  'eo': {
    nativeDescription: 'Esperanto',
    englishDescription: 'Esperanto'
  },
  'fa': {
    nativeDescription: 'فارسی',
    englishDescription: 'Persian'
  },
  'gl': {
    nativeDescription: 'Galego',
    englishDescription: 'Galician'
  },
  'ko': {
    nativeDescription: '한국어',
    englishDescription: 'Korean'
  },
  'haw': {
    nativeDescription: 'ʻŌlelo Hawaiʻi',
    englishDescription: 'Hawaiian'
  },
  'he': {
    nativeDescription: 'עברית',
    englishDescription: 'Hebrew'
  },
  'hr': {
    nativeDescription: 'hrvatski jezik',
    englishDescription: 'Croatian'
  },
  'hu': {
    nativeDescription: 'magyar',
    englishDescription: 'Hungarian'
  },
  'id': {
    nativeDescription: 'Bahasa Indonesia',
    englishDescription: 'Indonesian'
  },
  'it': {
    nativeDescription: 'Italiano',
    englishDescription: 'Italian'
  },
  'lt': {
    nativeDescription: 'lietuvių kalba',
    englishDescription: 'Lithuanian'
  },
  'mi': {
    nativeDescription: 'te reo Māori',
    englishDescription: 'Māori'
  },
  'mk-MK': {
    nativeDescription: 'Македонски',
    englishDescription: 'Macedonian'
  },
  'hi': {
    nativeDescription: 'मानक हिन्दी',
    englishDescription: 'Hindi'
  },
  'ms': {
    nativeDescription: 'Bahasa Melayu',
    englishDescription: 'Bahasa Malaysia'
  },
  'my': {
    nativeDescription: 'မြန်မာစကား',
    englishDescription: 'Myanmar language'
  },
  'nl': {
    nativeDescription: 'Nederlands',
    englishDescription: 'Dutch'
  },
  'nl-BE': {
    nativeDescription: 'Nederlands (België)',
    englishDescription: 'Dutch (Belgium)'
  },
  'nl-NL': {
    nativeDescription: 'Nederlands (Nederland)',
    englishDescription: 'Dutch (Netherlands)'
  },
  'ja': {
    nativeDescription: '日本語',
    englishDescription: 'Japanese'
  },
  'nb': {
    nativeDescription: 'Norsk Bokmål',
    englishDescription: 'Norwegian (Bokmål)'
  },
  'nn': {
    nativeDescription: 'Norsk Nynorsk',
    englishDescription: 'Norwegian (Nynorsk)'
  },
  'uz': {
    nativeDescription: "O'zbekcha",
    englishDescription: 'Uzbek'
  },
  'pl': {
    nativeDescription: 'język polski',
    englishDescription: 'Polish'
  },
  'pt-PT': {
    nativeDescription: 'Português (Portugal)',
    englishDescription: 'Portuguese (Portugal)'
  },
  'pt-BR': {
    nativeDescription: 'Português (Brasil)',
    englishDescription: 'Portuguese (Brazil)'
  },
  'ro': {
    nativeDescription: 'limba română',
    englishDescription: 'Romanian'
  },
  'sr': {
    nativeDescription: 'српски',
    englishDescription: 'Serbian'
  },
  'sk': {
    nativeDescription: 'slovenčina',
    englishDescription: 'Slovak'
  },
  'sl': {
    nativeDescription: 'slovenščina',
    englishDescription: 'Slovene'
  },
  'fi': {
    nativeDescription: 'suomi',
    englishDescription: 'Finnish'
  },
  'sv': {
    nativeDescription: 'Svenska',
    englishDescription: 'Swedish'
  },
  'th': {
    nativeDescription: 'ไทย',
    englishDescription: 'Thai'
  },
  'tr': {
    nativeDescription: 'Türkçe',
    englishDescription: 'Turkish'
  },
  'uk': {
    nativeDescription: 'українська',
    englishDescription: 'Ukrainian'
  },
  'ur': {
    nativeDescription: 'اُردُو',
    englishDescription: 'Urdu'
  },
  'vi': {
    nativeDescription: 'Tiếng Việt',
    englishDescription: 'Vietnamese'
  },
  'zh-WUU-HANS': {
    nativeDescription: '吴语',
    englishDescription: 'Wuu (Simplified)'
  },
  'zh-WUU-HANT': {
    nativeDescription: '吳語',
    englishDescription: 'Wuu (Traditional)'
  }
};
});

;
//# sourceMappingURL=/javascripts/app/locale/locale.js.map
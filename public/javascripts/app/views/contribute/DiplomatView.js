require.register("views/contribute/DiplomatView", function(exports, require, module) {
var ContributeClassView, DiplomatView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ContributeClassView = require('./ContributeClassView');

template = require('templates/contribute/diplomat');

me = require('core/auth').me;

require("locale/en");

require("locale/en-US");

require("locale/en-GB");

require("locale/ru");

require("locale/de-DE");

require("locale/de-AT");

require("locale/de-CH");

require("locale/es-419");

require("locale/es-ES");

require("locale/zh-HANS");

require("locale/zh-HANT");

require("locale/zh-WUU-HANS");

require("locale/zh-WUU-HANT");

require("locale/fr");

require("locale/ja");

require("locale/ar");

require("locale/pt-BR");

require("locale/pt-PT");

require("locale/pl");

require("locale/it");

require("locale/tr");

require("locale/nl");

require("locale/nl-BE");

require("locale/nl-NL");

require("locale/fa");

require("locale/cs");

require("locale/sv");

require("locale/id");

require("locale/el");

require("locale/ro");

require("locale/vi");

require("locale/hu");

require("locale/th");

require("locale/da");

require("locale/ko");

require("locale/sk");

require("locale/sl");

require("locale/fi");

require("locale/bg");

require("locale/nb");

require("locale/nn");

require("locale/he");

require("locale/lt");

require("locale/sr");

require("locale/uk");

require("locale/hi");

require("locale/ur");

require("locale/ms");

require("locale/ca");

require("locale/gl");

require("locale/mk-MK");

require("locale/eo");

require("locale/uz");

require("locale/my");

require("locale/et");

require("locale/hr");

require("locale/mi");

require("locale/haw");

module.exports = DiplomatView = (function(superClass) {
  extend(DiplomatView, superClass);

  function DiplomatView() {
    return DiplomatView.__super__.constructor.apply(this, arguments);
  }

  DiplomatView.prototype.id = 'diplomat-view';

  DiplomatView.prototype.template = template;

  DiplomatView.prototype.initialize = function() {
    return this.contributorClassName = 'diplomat';
  };

  DiplomatView.prototype.calculateSpokenLanguageStats = function() {
    var language, languageCode, languageStats, ref, totalStrings;
    if (this.locale == null) {
      this.locale = require('locale/locale');
    }
    totalStrings = this.countStrings(this.locale.en);
    languageStats = {};
    ref = this.locale;
    for (languageCode in ref) {
      language = ref[languageCode];
      if (languageCode === 'update') {
        continue;
      }
      languageStats[languageCode] = {
        githubURL: "https://github.com/codecombat/codecombat/blob/master/app/locale/" + languageCode + ".coffee",
        completion: this.countStrings(language) / totalStrings,
        nativeDescription: language.nativeDescription,
        englishDescription: language.englishDescription,
        diplomats: this.diplomats[languageCode],
        languageCode: languageCode
      };
    }
    return languageStats;
  };

  DiplomatView.prototype.countStrings = function(language) {
    var ref, section, strings, translated;
    translated = 0;
    ref = language.translation;
    for (section in ref) {
      strings = ref[section];
      translated += _.size(strings);
    }
    return translated;
  };

  DiplomatView.prototype.diplomats = {
    en: [],
    'en-US': [],
    'en-GB': [],
    ru: ['EagleTA', 'ImmortalJoker', 'Mr A', 'Shpionus', 'a1ip', 'fess89', 'iulianR', 'kerradus', 'kisik21', 'nixel', 'ser-storchak'],
    'de-DE': ['Anon', 'Dirk', 'HiroP0', 'bahuma20', 'bkimminich', 'djsmith85', 'dkundel', 'domenukk', 'faabsen', 'Zeldaretter'],
    'de-AT': ['djsmith85'],
    'de-CH': ['greyhusky'],
    'es-419': ['2xG', 'Federico Tomas', 'Jesús Ruppel', 'Mariano Luzza', 'Matthew Burt'],
    'es-ES': ['3rr3s3v3n', 'Anon', 'DanielRodriguezRivero', 'Matthew Burt', 'OviiiOne', 'Pouyio', 'Vindurrin'],
    'zh-HANS': ['1c7', 'Adam23', 'BonnieBBS', 'Cheng Zheng', 'Vic020', 'ZephyrSails', 'julycoolwind', 'onion7878', 'spacepope', 'yangxuan8282', 'yfdyh000'],
    'zh-HANT': ['Adam23', 'gintau', 'shuwn'],
    'zh-WUU-HANS': [],
    'zh-WUU-HANT': ['benojan'],
    fr: ['Anon', 'Armaldio', 'ChrisLightman', 'Elfisen', 'Feugy', 'MartinDelille', 'Oaugereau', 'Xeonarno', 'dc55028', 'jaybi', 'pstweb', 'veritable', 'xavismeh'],
    ja: ['Coderaulic', 'g1itch', 'kengos', 'treby'],
    ar: ['5y', 'ahmed80dz'],
    'pt-BR': ['Bia41', 'Gutenberg Barros', 'Kieizroe', 'Matthew Burt', 'brunoporto', 'cassiocardoso', 'jklemm', 'Arkhad'],
    'pt-PT': ['Imperadeiro98', 'Matthew Burt', 'ProgramadorLucas', 'ReiDuKuduro', 'batista', 'gutierri'],
    pl: ['Anon', 'Kacper Ciepielewski', 'TigroTigro', 'kvasnyk'],
    it: ['AlessioPaternoster', 'flauta', 'Atomk', 'Lionhear7'],
    tr: ['Nazım Gediz Aydındoğmuş', 'cobaimelan', 'gediz', 'ilisyus', 'wakeup'],
    nl: [],
    'nl-BE': ['Glen De Cauwsemaecker', 'Ruben Vereecken'],
    'nl-NL': ['Guido Zuidhof', "Jasper D\'haene"],
    fa: ['Reza Habibi (Rehb)'],
    cs: ['Martin005', 'Gygram', 'vanous'],
    sv: ['iamhj', 'Galaky'],
    id: ['mlewisno-oberlin'],
    el: ['Stergios', 'micman', 'zsdregas'],
    ro: [],
    vi: ['An Nguyen Hoang Thien'],
    hu: ['Anon', 'atlantisguru', 'bbeasmile', 'csuvsaregal', 'divaDseidnA', 'ferpeter', 'kinez', 'adamcsillag', 'LogMeIn', 'espell.com'],
    th: ['Kamolchanok Jittrepit'],
    da: ['Anon', 'Einar Rasmussen', 'Rahazan', 'Randi Hillerøe', 'Silwing', 'marc-portier', 'sorsjen', 'Zleep-Dogg'],
    ko: ['Melondonut'],
    sk: ['Anon', 'Juraj Pecháč'],
    sl: [],
    fi: [],
    bg: [],
    nb: ['bardeh', 'ebirkenes', 'matifol', 'mcclane654', 'mogsie', 'torehaug'],
    nn: [],
    he: ['OverProgram', 'monetita'],
    lt: [],
    sr: [],
    uk: ['ImmortalJoker', 'OlenaGapak', 'Rarst', 'endrilian', 'fess89', 'gorodsb', 'probil'],
    hi: [],
    ur: [],
    ms: [],
    ca: ['ArniMcFrag', 'Nainufar'],
    gl: ['mcaeiror'],
    'mk-MK': ['SuperPranx'],
    eo: [],
    uz: [],
    my: [],
    et: [],
    hr: [],
    mi: [],
    haw: []
  };

  return DiplomatView;

})(ContributeClassView);
});

;
//# sourceMappingURL=/javascripts/app/views/contribute/DiplomatView.js.map
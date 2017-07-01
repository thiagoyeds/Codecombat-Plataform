require.register("core/utils", function(exports, require, module) {
var TEXT, aceEditModes, capitalLanguages, clone, combineAncestralObject, compare, countries, courseAcronyms, courseIDs, createLevelNumberMap, createLinearFunc, createLogFunc, createPowFunc, createQuadraticFunc, cutHex, dummy, extractPlayerCodeTag, filterMarkdownCodeLanguages, findNextLevel, formatDollarValue, functionCreators, getByPath, getCourseBundlePrice, getCoursePraise, getDocumentSearchString, getPrepaidCodeAmount, getQueryVariable, getQueryVariables, getSponsoredSubsAmount, getUTCDay, getYearSubscriptionGroup, grayscale, hexToB, hexToG, hexToHSL, hexToR, hslToHex, i18n, initializeACE, injectCSS, isID, keepDoingUntil, kindaEqual, needsPractice, normalizeFunc, objectIdToDate, orderedCourseIDs, pathToUrl, positify, replaceText, round, sortCourses, startsWithVowel, stripIndentation, toHex, usStateCodes, userAgent,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

clone = function(obj) {
  var key, temp;
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  temp = obj.constructor();
  for (key in obj) {
    temp[key] = clone(obj[key]);
  }
  return temp;
};

combineAncestralObject = function(obj, propertyName) {
  var combined, key, ref, value;
  combined = {};
  while (obj != null ? obj[propertyName] : void 0) {
    ref = obj[propertyName];
    for (key in ref) {
      value = ref[key];
      if (combined[key]) {
        continue;
      }
      combined[key] = value;
    }
    if (obj.__proto__) {
      obj = obj.__proto__;
    } else {
      obj = Object.getPrototypeOf(obj);
    }
  }
  return combined;
};

countries = [
  {
    country: 'united-states',
    countryCode: 'US'
  }, {
    country: 'china',
    countryCode: 'CN'
  }, {
    country: 'brazil',
    countryCode: 'BR'
  }, {
    country: 'united-kingdom',
    countryCode: 'GB'
  }, {
    country: 'russia',
    countryCode: 'RU'
  }, {
    country: 'australia',
    countryCode: 'AU'
  }, {
    country: 'canada',
    countryCode: 'CA'
  }, {
    country: 'france',
    countryCode: 'FR'
  }, {
    country: 'taiwan',
    countryCode: 'TW'
  }, {
    country: 'ukraine',
    countryCode: 'UA'
  }, {
    country: 'poland',
    countryCode: 'PL'
  }, {
    country: 'spain',
    countryCode: 'ES'
  }, {
    country: 'germany',
    countryCode: 'DE'
  }, {
    country: 'netherlands',
    countryCode: 'NL'
  }, {
    country: 'hungary',
    countryCode: 'HU'
  }, {
    country: 'japan',
    countryCode: 'JP'
  }, {
    country: 'turkey',
    countryCode: 'TR'
  }, {
    country: 'south-africa',
    countryCode: 'ZA'
  }, {
    country: 'indonesia',
    countryCode: 'ID'
  }, {
    country: 'new-zealand',
    countryCode: 'NZ'
  }, {
    country: 'finland',
    countryCode: 'FI'
  }, {
    country: 'south-korea',
    countryCode: 'KR'
  }, {
    country: 'mexico',
    countryCode: 'MX'
  }, {
    country: 'vietnam',
    countryCode: 'VN'
  }, {
    country: 'singapore',
    countryCode: 'SG'
  }, {
    country: 'colombia',
    countryCode: 'CO'
  }, {
    country: 'india',
    countryCode: 'IN'
  }, {
    country: 'thailand',
    countryCode: 'TH'
  }, {
    country: 'belgium',
    countryCode: 'BE'
  }, {
    country: 'sweden',
    countryCode: 'SE'
  }, {
    country: 'denmark',
    countryCode: 'DK'
  }, {
    country: 'czech-republic',
    countryCode: 'CZ'
  }, {
    country: 'hong-kong',
    countryCode: 'HK'
  }, {
    country: 'italy',
    countryCode: 'IT'
  }, {
    country: 'romania',
    countryCode: 'RO'
  }, {
    country: 'belarus',
    countryCode: 'BY'
  }, {
    country: 'norway',
    countryCode: 'NO'
  }, {
    country: 'philippines',
    countryCode: 'PH'
  }, {
    country: 'lithuania',
    countryCode: 'LT'
  }, {
    country: 'argentina',
    countryCode: 'AR'
  }, {
    country: 'malaysia',
    countryCode: 'MY'
  }, {
    country: 'pakistan',
    countryCode: 'PK'
  }, {
    country: 'serbia',
    countryCode: 'RS'
  }, {
    country: 'greece',
    countryCode: 'GR'
  }, {
    country: 'israel',
    countryCode: 'IL'
  }, {
    country: 'portugal',
    countryCode: 'PT'
  }, {
    country: 'slovakia',
    countryCode: 'SK'
  }, {
    country: 'ireland',
    countryCode: 'IE'
  }, {
    country: 'switzerland',
    countryCode: 'CH'
  }, {
    country: 'peru',
    countryCode: 'PE'
  }, {
    country: 'bulgaria',
    countryCode: 'BG'
  }, {
    country: 'venezuela',
    countryCode: 'VE'
  }, {
    country: 'austria',
    countryCode: 'AT'
  }, {
    country: 'croatia',
    countryCode: 'HR'
  }, {
    country: 'saudia-arabia',
    countryCode: 'SA'
  }, {
    country: 'chile',
    countryCode: 'CL'
  }, {
    country: 'united-arab-emirates',
    countryCode: 'AE'
  }, {
    country: 'kazakhstan',
    countryCode: 'KZ'
  }, {
    country: 'estonia',
    countryCode: 'EE'
  }, {
    country: 'iran',
    countryCode: 'IR'
  }, {
    country: 'egypt',
    countryCode: 'EG'
  }, {
    country: 'ecuador',
    countryCode: 'EC'
  }, {
    country: 'slovenia',
    countryCode: 'SI'
  }, {
    country: 'macedonia',
    countryCode: 'MK'
  }
];

courseIDs = {
  INTRODUCTION_TO_COMPUTER_SCIENCE: '560f1a9f22961295f9427742',
  COMPUTER_SCIENCE_2: '5632661322961295f9428638',
  GAME_DEVELOPMENT_1: '5789587aad86a6efb573701e',
  WEB_DEVELOPMENT_1: '5789587aad86a6efb573701f',
  COMPUTER_SCIENCE_3: '56462f935afde0c6fd30fc8c',
  GAME_DEVELOPMENT_2: '57b621e7ad86a6efb5737e64',
  WEB_DEVELOPMENT_2: '5789587aad86a6efb5737020',
  COMPUTER_SCIENCE_4: '56462f935afde0c6fd30fc8d',
  COMPUTER_SCIENCE_5: '569ed916efa72b0ced971447',
  COMPUTER_SCIENCE_6: '5817d673e85d1220db624ca4'
};

orderedCourseIDs = [courseIDs.INTRODUCTION_TO_COMPUTER_SCIENCE, courseIDs.COMPUTER_SCIENCE_2, courseIDs.GAME_DEVELOPMENT_1, courseIDs.WEB_DEVELOPMENT_1, courseIDs.COMPUTER_SCIENCE_3, courseIDs.GAME_DEVELOPMENT_2, courseIDs.WEB_DEVELOPMENT_2, courseIDs.COMPUTER_SCIENCE_4, courseIDs.COMPUTER_SCIENCE_5, courseIDs.COMPUTER_SCIENCE_6];

courseAcronyms = {};

courseAcronyms[courseIDs.INTRODUCTION_TO_COMPUTER_SCIENCE] = 'CS1';

courseAcronyms[courseIDs.COMPUTER_SCIENCE_2] = 'CS2';

courseAcronyms[courseIDs.GAME_DEVELOPMENT_1] = 'GD1';

courseAcronyms[courseIDs.WEB_DEVELOPMENT_1] = 'WD1';

courseAcronyms[courseIDs.COMPUTER_SCIENCE_3] = 'CS3';

courseAcronyms[courseIDs.GAME_DEVELOPMENT_2] = 'GD2';

courseAcronyms[courseIDs.WEB_DEVELOPMENT_2] = 'WD2';

courseAcronyms[courseIDs.COMPUTER_SCIENCE_4] = 'CS4';

courseAcronyms[courseIDs.COMPUTER_SCIENCE_5] = 'CS5';

courseAcronyms[courseIDs.COMPUTER_SCIENCE_6] = 'CS6';

normalizeFunc = function(func_thing, object) {
  var func;
  if (object == null) {
    object = {};
  }
  if (_.isString(func_thing)) {
    func = object[func_thing];
    if (!func) {
      console.error("Could not find method " + func_thing + " in object", object);
      return (function(_this) {
        return function() {
          return null;
        };
      })(this);
    }
    func_thing = func;
  }
  return func_thing;
};

objectIdToDate = function(objectID) {
  return new Date(parseInt(objectID.toString().slice(0, 8), 16) * 1000);
};

hexToHSL = function(hex) {
  return rgbToHsl(hexToR(hex), hexToG(hex), hexToB(hex));
};

hexToR = function(h) {
  return parseInt((cutHex(h)).substring(0, 2), 16);
};

hexToG = function(h) {
  return parseInt((cutHex(h)).substring(2, 4), 16);
};

hexToB = function(h) {
  return parseInt((cutHex(h)).substring(4, 6), 16);
};

cutHex = function(h) {
  if (h.charAt(0) === '#') {
    return h.substring(1, 7);
  } else {
    return h;
  }
};

hslToHex = function(hsl) {
  var n;
  return '#' + ((function() {
    var j, len, ref, results;
    ref = hslToRgb.apply(null, hsl);
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      n = ref[j];
      results.push(toHex(n));
    }
    return results;
  })()).join('');
};

toHex = function(n) {
  var h;
  h = Math.floor(n).toString(16);
  if (h.length === 1) {
    h = '0' + h;
  }
  return h;
};

pathToUrl = function(path) {
  var base;
  base = location.protocol + '//' + location.hostname + (location.port && ":" + location.port);
  return base + path;
};

extractPlayerCodeTag = function(code) {
  var ref, unwrappedDefaultCode;
  unwrappedDefaultCode = (ref = code.match(/<playercode>\n([\s\S]*)\n *<\/playercode>/)) != null ? ref[1] : void 0;
  if (unwrappedDefaultCode) {
    return stripIndentation(unwrappedDefaultCode);
  } else {
    return void 0;
  }
};

stripIndentation = function(code) {
  var codeLines, indentation, line, strippedCode;
  codeLines = code.split('\n');
  indentation = _.min(_.filter(codeLines.map(function(line) {
    var ref, ref1;
    return (ref = line.match(/^\s*/)) != null ? (ref1 = ref[0]) != null ? ref1.length : void 0 : void 0;
  })));
  strippedCode = ((function() {
    var j, len, results;
    results = [];
    for (j = 0, len = codeLines.length; j < len; j++) {
      line = codeLines[j];
      results.push(line.substr(indentation));
    }
    return results;
  })()).join('\n');
  return strippedCode;
};

i18n = function(say, target, language, fallback) {
  var fallBackResult, fallForwardResult, fallSidewaysResult, generalName, generalResult, locale, localeName, matches, ref, result;
  if (language == null) {
    language = me.get('preferredLanguage', true);
  }
  if (fallback == null) {
    fallback = 'en';
  }
  generalResult = null;
  fallBackResult = null;
  fallForwardResult = null;
  fallSidewaysResult = null;
  matches = /\w+/gi.exec(language);
  if (matches) {
    generalName = matches[0];
  }
  ref = say.i18n;
  for (localeName in ref) {
    locale = ref[localeName];
    if (localeName === '-') {
      continue;
    }
    if (target in locale) {
      result = locale[target];
    } else {
      continue;
    }
    if (localeName === language) {
      return result;
    }
    if (localeName === generalName) {
      generalResult = result;
    }
    if (localeName === fallback) {
      fallBackResult = result;
    }
    if (localeName.indexOf(language) === 0 && (fallForwardResult == null)) {
      fallForwardResult = result;
    }
    if (localeName.indexOf(generalName) === 0 && (fallSidewaysResult == null)) {
      fallSidewaysResult = result;
    }
  }
  if (generalResult != null) {
    return generalResult;
  }
  if (fallForwardResult != null) {
    return fallForwardResult;
  }
  if (fallSidewaysResult != null) {
    return fallSidewaysResult;
  }
  if (fallBackResult != null) {
    return fallBackResult;
  }
  if (target in say) {
    return say[target];
  }
  return null;
};

getByPath = function(target, path) {
  var j, len, obj, piece, pieces;
  if (!target) {
    throw new Error('Expected an object to match a query against, instead got null');
  }
  pieces = path.split('.');
  obj = target;
  for (j = 0, len = pieces.length; j < len; j++) {
    piece = pieces[j];
    if (!(piece in obj)) {
      return void 0;
    }
    obj = obj[piece];
  }
  return obj;
};

isID = function(id) {
  var ref;
  return _.isString(id) && id.length === 24 && ((ref = id.match(/[a-f0-9]/gi)) != null ? ref.length : void 0) === 24;
};

round = _.curry(function(digits, n) {
  return n = +n.toFixed(digits);
});

positify = function(func) {
  return function(params) {
    return function(x) {
      if (x > 0) {
        return func(params)(x);
      } else {
        return 0;
      }
    };
  };
};

createLinearFunc = function(params) {
  return function(x) {
    return (params.a || 1) * x + (params.b || 0);
  };
};

createQuadraticFunc = function(params) {
  return function(x) {
    return (params.a || 1) * x * x + (params.b || 1) * x + (params.c || 0);
  };
};

createLogFunc = function(params) {
  return function(x) {
    if (x > 0) {
      return (params.a || 1) * Math.log((params.b || 1) * (x + (params.c || 0))) + (params.d || 0);
    } else {
      return 0;
    }
  };
};

createPowFunc = function(params) {
  return function(x) {
    return (params.a || 1) * Math.pow(x, params.b || 1) + (params.c || 0);
  };
};

functionCreators = {
  linear: positify(createLinearFunc),
  quadratic: positify(createQuadraticFunc),
  logarithmic: positify(createLogFunc),
  pow: positify(createPowFunc)
};

keepDoingUntil = function(func, wait, totalWait) {
  var done, waitSoFar;
  if (wait == null) {
    wait = 100;
  }
  if (totalWait == null) {
    totalWait = 5000;
  }
  waitSoFar = 0;
  return (done = function(success) {
    if ((waitSoFar += wait) <= totalWait && !success) {
      return _.delay((function() {
        return func(done);
      }), wait);
    }
  })(false);
};

grayscale = function(imageData) {
  var b, d, g, i, j, r, ref, v;
  d = imageData.data;
  for (i = j = 0, ref = d.length; j <= ref; i = j += 4) {
    r = d[i];
    g = d[i + 1];
    b = d[i + 2];
    v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  return imageData;
};

kindaEqual = compare = function(l, r) {
  var j, key, len, ref;
  if (_.isObject(l) && _.isObject(r)) {
    ref = _.union(Object.keys(l), Object.keys(r));
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      if (!compare(l[key], r[key])) {
        return false;
      }
    }
    return true;
  } else if (l === r) {
    return true;
  } else {
    return false;
  }
};

getUTCDay = function(offset) {
  var day, partDay, partMonth, partYear;
  if (offset == null) {
    offset = 0;
  }
  day = new Date();
  day.setDate(day.getUTCDate() + offset);
  partYear = day.getUTCFullYear();
  partMonth = day.getUTCMonth() + 1;
  if (partMonth < 10) {
    partMonth = "0" + partMonth;
  }
  partDay = day.getUTCDate();
  if (partDay < 10) {
    partDay = "0" + partDay;
  }
  return "" + partYear + partMonth + partDay;
};

getYearSubscriptionGroup = function(testGroupNumber) {
  switch (testGroupNumber % 4) {
    case 0:
    case 2:
      return 'year_subscription';
    case 1:
    case 3:
      return 'year_subscription_b';
  }
};

if (typeof document !== "undefined" && document !== null ? document.createElement : void 0) {
  dummy = document.createElement('div');
  dummy.innerHTML = 'text';
  TEXT = dummy.textContent === 'text' ? 'textContent' : 'innerText';
  replaceText = function(elems, text) {
    var elem, j, len;
    for (j = 0, len = elems.length; j < len; j++) {
      elem = elems[j];
      elem[TEXT] = text;
    }
    return null;
  };
}

if (typeof document !== "undefined" && document !== null ? document.createElement : void 0) {
  injectCSS = (function(doc) {
    var temp, wrap;
    wrap = doc.createElement("div");
    temp = doc.createElement("div");
    return function(cssRules) {
      if (!wrap.id) {
        wrap.id = "injected-css";
        wrap.style.display = "none";
        doc.body.appendChild(wrap);
      }
      temp.innerHTML = "<br><style>" + cssRules + "</style>";
      wrap.appendChild(temp.children[1]);
    };
  })(document);
}

userAgent = function() {
  return window.navigator.userAgent;
};

getDocumentSearchString = function() {
  return document.location.search;
};

getQueryVariables = function() {
  var j, key, len, pair, pairs, query, ref, ref1, value, variables;
  query = module.exports.getDocumentSearchString().substring(1);
  pairs = (function() {
    var j, len, ref, results;
    ref = query.split('&');
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      pair = ref[j];
      results.push(pair.split('='));
    }
    return results;
  })();
  variables = {};
  for (j = 0, len = pairs.length; j < len; j++) {
    ref = pairs[j], key = ref[0], value = ref[1];
    variables[key] = (ref1 = {
      'true': true,
      'false': false
    }[value]) != null ? ref1 : decodeURIComponent(value);
  }
  return variables;
};

getQueryVariable = function(param, defaultValue) {
  var ref, variables;
  variables = getQueryVariables();
  return (ref = variables[param]) != null ? ref : defaultValue;
};

getSponsoredSubsAmount = function(price, subCount, personalSub) {
  var offset;
  if (price == null) {
    price = 999;
  }
  if (subCount == null) {
    subCount = 0;
  }
  if (personalSub == null) {
    personalSub = false;
  }
  if (!(subCount > 0)) {
    return 0;
  }
  offset = personalSub ? 1 : 0;
  if (subCount <= 1 - offset) {
    return price;
  } else if (subCount <= 11 - offset) {
    return Math.round((1 - offset) * price + (subCount - 1 + offset) * price * 0.8);
  } else {
    return Math.round((1 - offset) * price + 10 * price * 0.8 + (subCount - 11 + offset) * price * 0.6);
  }
};

getCourseBundlePrice = function(coursePrices, seats) {
  var pricePerSeat, totalPricePerSeat;
  if (seats == null) {
    seats = 20;
  }
  totalPricePerSeat = coursePrices.reduce((function(a, b) {
    return a + b;
  }), 0);
  if (coursePrices.length > 2) {
    pricePerSeat = Math.round(totalPricePerSeat / 2.0);
  } else {
    pricePerSeat = parseInt(totalPricePerSeat);
  }
  return seats * pricePerSeat;
};

getCoursePraise = function() {
  var praise;
  praise = [
    {
      quote: "The kids love it.",
      source: "Leo Joseph Tran, Athlos Leadership Academy"
    }, {
      quote: "My students have been using the site for a couple of weeks and they love it.",
      source: "Scott Hatfield, Computer Applications Teacher, School Technology Coordinator, Eastside Middle School"
    }, {
      quote: "Thanks for the captivating site. My eighth graders love it.",
      source: "Janet Cook, Ansbach Middle/High School"
    }, {
      quote: "My students have started working on CodeCombat and love it! I love that they are learning coding and problem solving skills without them even knowing it!!",
      source: "Kristin Huff, Special Education Teacher, Webb City School District"
    }, {
      quote: "I recently introduced Code Combat to a few of my fifth graders and they are loving it!",
      source: "Shauna Hamman, Fifth Grade Teacher, Four Peaks Elementary School"
    }, {
      quote: "Overall I think it's a fantastic service. Variables, arrays, loops, all covered in very fun and imaginative ways. Every kid who has tried it is a fan.",
      source: "Aibinder Andrew, Technology Teacher"
    }, {
      quote: "I love what you have created. The kids are so engaged.",
      source: "Desmond Smith, 4KS Academy"
    }, {
      quote: "My students love the website and I hope on having content structured around it in the near future.",
      source: "Michael Leonard, Science Teacher, Clearwater Central Catholic High School"
    }
  ];
  return praise[_.random(0, praise.length - 1)];
};

getPrepaidCodeAmount = function(price, users, months) {
  var total;
  if (price == null) {
    price = 0;
  }
  if (users == null) {
    users = 0;
  }
  if (months == null) {
    months = 0;
  }
  if (!(users > 0 && months > 0)) {
    return 0;
  }
  total = price * users * months;
  return total;
};

formatDollarValue = function(dollars) {
  return '$' + (parseFloat(dollars).toFixed(2));
};

startsWithVowel = function(s) {
  var ref;
  return ref = s[0], indexOf.call('aeiouAEIOU', ref) >= 0;
};

filterMarkdownCodeLanguages = function(text, language) {
  var codeBlockExclusionRegex, commonLanguageReplacements, currentLanguage, excludedLanguages, from, imageExclusionRegex, j, len, ref, ref1, ref2, ref3, to;
  if (!text) {
    return '';
  }
  currentLanguage = language || ((ref = me.get('aceConfig')) != null ? ref.language : void 0) || 'python';
  excludedLanguages = _.without(['javascript', 'python', 'coffeescript', 'clojure', 'lua', 'java', 'io', 'html'], currentLanguage);
  codeBlockExclusionRegex = new RegExp("```(" + (excludedLanguages.join('|')) + ")\n[^`]+```\n?", 'gm');
  imageExclusionRegex = new RegExp("!\\[(" + (excludedLanguages.join('|')) + ") - .+?\\]\\(.+?\\)\n?", 'gm');
  text = text.replace(codeBlockExclusionRegex, '').replace(imageExclusionRegex, '');
  commonLanguageReplacements = {
    python: [['true', 'True'], ['false', 'False'], ['null', 'None'], ['object', 'dictionary'], ['Object', 'Dictionary'], ['array', 'list'], ['Array', 'List']],
    lua: [['null', 'nil'], ['object', 'table'], ['Object', 'Table'], ['array', 'table'], ['Array', 'Table']]
  };
  ref2 = (ref1 = commonLanguageReplacements[currentLanguage]) != null ? ref1 : [];
  for (j = 0, len = ref2.length; j < len; j++) {
    ref3 = ref2[j], from = ref3[0], to = ref3[1];
    text = text.replace(RegExp("`" + from + "`", "g"), "`" + to + "`");
    if (startsWithVowel(from) && !startsWithVowel(to)) {
      text = text.replace(RegExp("( a|A)n( `" + to + "`)", "g"), "$1$2");
    }
    if (!startsWithVowel(from) && startsWithVowel(to)) {
      text = text.replace(RegExp("( a|A)( `" + to + "`)", "g"), "$1n$2");
    }
  }
  return text;
};

aceEditModes = {
  javascript: 'ace/mode/javascript',
  coffeescript: 'ace/mode/coffee',
  python: 'ace/mode/python',
  lua: 'ace/mode/lua',
  java: 'ace/mode/java',
  html: 'ace/mode/html'
};

initializeACE = function(el, codeLanguage) {
  var contents, editor, session;
  contents = $(el).text().trim();
  editor = ace.edit(el);
  editor.setOptions({
    maxLines: Infinity
  });
  editor.setReadOnly(true);
  editor.setTheme('ace/theme/textmate');
  editor.setShowPrintMargin(false);
  editor.setShowFoldWidgets(false);
  editor.setHighlightActiveLine(false);
  editor.setHighlightActiveLine(false);
  editor.setBehavioursEnabled(false);
  editor.renderer.setShowGutter(false);
  editor.setValue(contents);
  editor.clearSelection();
  session = editor.getSession();
  session.setUseWorker(false);
  session.setMode(aceEditModes[codeLanguage]);
  session.setWrapLimitRange(null);
  session.setUseWrapMode(true);
  session.setNewLineMode('unix');
  return editor;
};

capitalLanguages = {
  'javascript': 'JavaScript',
  'coffeescript': 'CoffeeScript',
  'python': 'Python',
  'java': 'Java',
  'lua': 'Lua',
  'html': 'HTML'
};

createLevelNumberMap = function(levels) {
  var i, j, len, level, levelNumber, levelNumberMap, practiceLevelCurrentCount, practiceLevelTotalCount;
  levelNumberMap = {};
  practiceLevelTotalCount = 0;
  practiceLevelCurrentCount = 0;
  for (i = j = 0, len = levels.length; j < len; i = ++j) {
    level = levels[i];
    levelNumber = i - practiceLevelTotalCount + 1;
    if (level.practice) {
      levelNumber = i - practiceLevelTotalCount + String.fromCharCode('a'.charCodeAt(0) + practiceLevelCurrentCount);
      practiceLevelTotalCount++;
      practiceLevelCurrentCount++;
    } else {
      practiceLevelCurrentCount = 0;
    }
    levelNumberMap[level.key] = levelNumber;
  }
  return levelNumberMap;
};

findNextLevel = function(levels, currentIndex, needsPractice) {
  var index;
  index = currentIndex;
  index++;
  if (needsPractice) {
    if (levels[currentIndex].practice || index < levels.length && levels[index].practice) {
      while (index < levels.length && levels[index].complete) {
        index++;
      }
    } else {
      index--;
      while (index >= 0 && !levels[index].practice) {
        index--;
      }
      if (index >= 0) {
        while (index >= 0 && levels[index].practice) {
          index--;
        }
        if (index >= 0) {
          index++;
          while (index < levels.length && levels[index].practice && levels[index].complete) {
            index++;
          }
          if (levels[index].practice && !levels[index].complete) {
            return index;
          }
        }
      }
      index = currentIndex + 1;
      while (index < levels.length && levels[index].complete) {
        index++;
      }
    }
  } else {
    while (index < levels.length && (levels[index].practice || levels[index].complete)) {
      index++;
    }
  }
  return index;
};

needsPractice = function(playtime, threshold) {
  if (playtime == null) {
    playtime = 0;
  }
  if (threshold == null) {
    threshold = 5;
  }
  return playtime / 60 > threshold;
};

sortCourses = function(courses) {
  return _.sortBy(courses, function(course) {
    var index, ref;
    index = orderedCourseIDs.indexOf((ref = course.id) != null ? ref : course._id);
    if (index === -1) {
      index = 9001;
    }
    return index;
  });
};

usStateCodes = (function() {
  var getStateCodeByStateName, getStateNameByStateCode, sanitizeStateCode, sanitizeStateName, stateCodesByName, stateNamesByCode;
  stateNamesByCode = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District of Columbia',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };
  stateCodesByName = _.invert(stateNamesByCode);
  sanitizeStateCode = function(code) {
    code = _.isString(code) ? code.trim().toUpperCase().replace(/[^A-Z]/g, '') : null;
    if (stateNamesByCode[code]) {
      return code;
    } else {
      return null;
    }
  };
  getStateNameByStateCode = function(code) {
    return stateNamesByCode[sanitizeStateCode(code)] || null;
  };
  sanitizeStateName = function(name) {
    var tokens;
    if (!_.isString(name)) {
      return null;
    }
    name = name.trim().toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ');
    tokens = name.split(/\s+/);
    tokens = _.map(tokens, function(token) {
      return token.charAt(0).toUpperCase() + token.slice(1);
    });
    if (tokens.length > 2) {
      tokens[1] = tokens[1].toLowerCase();
    }
    name = tokens.join(' ');
    if (stateCodesByName[name]) {
      return name;
    } else {
      return null;
    }
  };
  getStateCodeByStateName = function(name) {
    return stateCodesByName[sanitizeStateName(name)] || null;
  };
  return {
    sanitizeStateCode: sanitizeStateCode,
    getStateNameByStateCode: getStateNameByStateCode,
    sanitizeStateName: sanitizeStateName,
    getStateCodeByStateName: getStateCodeByStateName
  };
})();

module.exports = {
  aceEditModes: aceEditModes,
  capitalLanguages: capitalLanguages,
  clone: clone,
  combineAncestralObject: combineAncestralObject,
  countries: countries,
  courseAcronyms: courseAcronyms,
  courseIDs: courseIDs,
  createLevelNumberMap: createLevelNumberMap,
  extractPlayerCodeTag: extractPlayerCodeTag,
  filterMarkdownCodeLanguages: filterMarkdownCodeLanguages,
  findNextLevel: findNextLevel,
  formatDollarValue: formatDollarValue,
  functionCreators: functionCreators,
  getByPath: getByPath,
  getCourseBundlePrice: getCourseBundlePrice,
  getCoursePraise: getCoursePraise,
  getDocumentSearchString: getDocumentSearchString,
  getPrepaidCodeAmount: getPrepaidCodeAmount,
  getQueryVariable: getQueryVariable,
  getQueryVariables: getQueryVariables,
  getSponsoredSubsAmount: getSponsoredSubsAmount,
  getUTCDay: getUTCDay,
  getYearSubscriptionGroup: getYearSubscriptionGroup,
  grayscale: grayscale,
  hexToHSL: hexToHSL,
  hslToHex: hslToHex,
  i18n: i18n,
  initializeACE: initializeACE,
  injectCSS: injectCSS,
  isID: isID,
  keepDoingUntil: keepDoingUntil,
  kindaEqual: kindaEqual,
  needsPractice: needsPractice,
  normalizeFunc: normalizeFunc,
  objectIdToDate: objectIdToDate,
  orderedCourseIDs: orderedCourseIDs,
  pathToUrl: pathToUrl,
  replaceText: replaceText,
  round: round,
  sortCourses: sortCourses,
  stripIndentation: stripIndentation,
  usStateCodes: usStateCodes,
  userAgent: userAgent
};
});

;
//# sourceMappingURL=/javascripts/app/core/utils.js.map
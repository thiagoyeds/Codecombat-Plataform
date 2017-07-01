require.register("models/User", function(exports, require, module) {
var CocoModel, GRAVATAR_URL, Level, ThangType, User, cache, tiersByLevel, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

GRAVATAR_URL = 'https://www.gravatar.com/';

cache = {};

CocoModel = require('./CocoModel');

ThangType = require('./ThangType');

Level = require('./Level');

utils = require('core/utils');

module.exports = User = (function(superClass) {
  var a, b, c;

  extend(User, superClass);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  User.className = 'User';

  User.schema = require('schemas/models/user');

  User.prototype.urlRoot = '/db/user';

  User.prototype.notyErrors = false;

  User.prototype.isAdmin = function() {
    return indexOf.call(this.get('permissions', true), 'admin') >= 0;
  };

  User.prototype.isArtisan = function() {
    return indexOf.call(this.get('permissions', true), 'artisan') >= 0;
  };

  User.prototype.isInGodMode = function() {
    return indexOf.call(this.get('permissions', true), 'godmode') >= 0;
  };

  User.prototype.isAnonymous = function() {
    return this.get('anonymous', true);
  };

  User.prototype.displayName = function() {
    return this.get('name', true);
  };

  User.prototype.broadName = function() {
    var emailDomain, emailName, name, ref, ref1;
    if (this.get('deleted')) {
      return '(deleted)';
    }
    name = _.filter([this.get('firstName'), this.get('lastName')]).join(' ');
    if (name) {
      return name;
    }
    name = this.get('name');
    if (name) {
      return name;
    }
    ref1 = ((ref = this.get('email')) != null ? ref.split('@') : void 0) || [], emailName = ref1[0], emailDomain = ref1[1];
    if (emailName) {
      return emailName;
    }
    return 'Anonymous';
  };

  User.prototype.getPhotoURL = function(size, useJobProfilePhoto, useEmployerPageAvatar) {
    var photoURL, prefix, ref;
    if (size == null) {
      size = 80;
    }
    if (useJobProfilePhoto == null) {
      useJobProfilePhoto = false;
    }
    if (useEmployerPageAvatar == null) {
      useEmployerPageAvatar = false;
    }
    photoURL = useJobProfilePhoto ? (ref = this.get('jobProfile')) != null ? ref.photoURL : void 0 : null;
    photoURL || (photoURL = this.get('photoURL'));
    if (photoURL) {
      prefix = photoURL.search(/\?/) === -1 ? '?' : '&';
      if (photoURL.search('http') !== -1) {
        return "" + photoURL + prefix + "s=" + size;
      }
      return "/file/" + photoURL + prefix + "s=" + size;
    }
    return "/db/user/" + this.id + "/avatar?s=" + size + "&employerPageAvatar=" + useEmployerPageAvatar;
  };

  User.prototype.getRequestVerificationEmailURL = function() {
    return this.url() + "/request-verify-email";
  };

  User.prototype.getSlugOrID = function() {
    return this.get('slug') || this.get('_id');
  };

  User.prototype.set = function() {
    if (arguments[0] === 'jobProfileApproved' && this.get("jobProfileApproved") === false && !this.get("jobProfileApprovedDate")) {
      this.set("jobProfileApprovedDate", (new Date()).toISOString());
    }
    return User.__super__.set.apply(this, arguments);
  };

  User.getUnconflictedName = function(name, done) {
    return $.ajax("/auth/name/" + (encodeURIComponent(name)), {
      cache: false,
      success: function(data) {
        return done(data.suggestedName);
      }
    });
  };

  User.checkNameConflicts = function(name) {
    return new Promise(function(resolve, reject) {
      return $.ajax("/auth/name/" + (encodeURIComponent(name)), {
        cache: false,
        success: resolve,
        error: function(jqxhr) {
          return reject(jqxhr.responseJSON);
        }
      });
    });
  };

  User.checkEmailExists = function(email) {
    return new Promise(function(resolve, reject) {
      return $.ajax("/auth/email/" + (encodeURIComponent(email)), {
        cache: false,
        success: resolve,
        error: function(jqxhr) {
          return reject(jqxhr.responseJSON);
        }
      });
    });
  };

  User.prototype.getEnabledEmails = function() {
    var emailDoc, emailName, ref, results;
    ref = this.get('emails', true);
    results = [];
    for (emailName in ref) {
      emailDoc = ref[emailName];
      if (emailDoc.enabled) {
        results.push(emailName);
      }
    }
    return results;
  };

  User.prototype.setEmailSubscription = function(name, enabled) {
    var newSubs;
    newSubs = _.clone(this.get('emails')) || {};
    (newSubs[name] != null ? newSubs[name] : newSubs[name] = {}).enabled = enabled;
    return this.set('emails', newSubs);
  };

  User.prototype.isEmailSubscriptionEnabled = function(name) {
    var ref;
    return (ref = (this.get('emails') || {})[name]) != null ? ref.enabled : void 0;
  };

  User.prototype.isStudent = function() {
    return this.get('role') === 'student';
  };

  User.prototype.isTeacher = function() {
    var ref;
    return (ref = this.get('role')) === 'teacher' || ref === 'technology coordinator' || ref === 'advisor' || ref === 'principal' || ref === 'superintendent' || ref === 'parent';
  };

  User.prototype.isSessionless = function() {
    return Boolean((utils.getQueryVariable('dev', false) || me.isTeacher()) && utils.getQueryVariable('course', false));
  };

  User.prototype.setRole = function(role, force) {
    var oldRole, ref;
    if (force == null) {
      force = false;
    }
    oldRole = this.get('role');
    if (oldRole === role || (oldRole && !force)) {
      return;
    }
    this.set('role', role);
    this.patch();
    if ((ref = application.tracker) != null) {
      ref.updateRole();
    }
    return this.get('role');
  };

  a = 5;

  b = 100;

  c = b;

  User.levelFromExp = function(xp) {
    if (xp > 0) {
      return Math.floor(a * Math.log((1 / b) * (xp + c))) + 1;
    } else {
      return 1;
    }
  };

  User.expForLevel = function(level) {
    if (level > 1) {
      return Math.ceil(Math.exp((level - 1) / a) * b - c);
    } else {
      return 0;
    }
  };

  User.tierFromLevel = function(level) {
    return tiersByLevel[Math.min(level, tiersByLevel.length - 1)];
  };

  User.levelForTier = function(tier) {
    var i, len, level, tierThreshold;
    for (level = i = 0, len = tiersByLevel.length; i < len; level = ++i) {
      tierThreshold = tiersByLevel[level];
      if (tierThreshold >= tier) {
        return level;
      }
    }
  };

  User.prototype.level = function() {
    var totalPoint;
    totalPoint = this.get('points');
    if (me.isInGodMode()) {
      totalPoint = totalPoint + 1000000;
    }
    return User.levelFromExp(totalPoint);
  };

  User.prototype.tier = function() {
    return User.tierFromLevel(this.level());
  };

  User.prototype.gems = function() {
    var gemsEarned, gemsPurchased, gemsSpent, ref, ref1, ref2, ref3, ref4;
    gemsEarned = (ref = (ref1 = this.get('earned')) != null ? ref1.gems : void 0) != null ? ref : 0;
    if (me.isInGodMode()) {
      gemsEarned = gemsEarned + 100000;
    }
    gemsPurchased = (ref2 = (ref3 = this.get('purchased')) != null ? ref3.gems : void 0) != null ? ref2 : 0;
    gemsSpent = (ref4 = this.get('spent')) != null ? ref4 : 0;
    return Math.floor(gemsEarned + gemsPurchased - gemsSpent);
  };

  User.prototype.heroes = function() {
    var heroes, ref, ref1;
    heroes = ((ref = (ref1 = me.get('purchased')) != null ? ref1.heroes : void 0) != null ? ref : []).concat([ThangType.heroes.captain, ThangType.heroes.knight, ThangType.heroes.champion, ThangType.heroes.duelist]);
    if (window.serverConfig.codeNinjas) {
      heroes.push(ThangType.heroes['code-ninja']);
    }
    return heroes;
  };

  User.prototype.items = function() {
    var ref, ref1, ref2, ref3;
    return ((ref2 = (ref3 = me.get('earned')) != null ? ref3.items : void 0) != null ? ref2 : []).concat((ref = (ref1 = me.get('purchased')) != null ? ref1.items : void 0) != null ? ref : []).concat([ThangType.items['simple-boots']]);
  };

  User.prototype.levels = function() {
    var ref, ref1, ref2, ref3;
    return ((ref2 = (ref3 = me.get('earned')) != null ? ref3.levels : void 0) != null ? ref2 : []).concat((ref = (ref1 = me.get('purchased')) != null ? ref1.levels : void 0) != null ? ref : []).concat(Level.levels['dungeons-of-kithgard']);
  };

  User.prototype.ownsHero = function(heroOriginal) {
    return me.isInGodMode() || indexOf.call(this.heroes(), heroOriginal) >= 0;
  };

  User.prototype.getHeroClasses = function() {
    var heroClass, heroSlugs, id, idsToSlugs, myHeroClasses, myHeroSlugs, ref;
    idsToSlugs = _.invert(ThangType.heroes);
    myHeroSlugs = (function() {
      var i, len, ref, results;
      ref = this.heroes();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        id = ref[i];
        results.push(idsToSlugs[id]);
      }
      return results;
    }).call(this);
    myHeroClasses = [];
    ref = ThangType.heroClasses;
    for (heroClass in ref) {
      heroSlugs = ref[heroClass];
      if (_.intersection(myHeroSlugs, heroSlugs).length) {
        myHeroClasses.push(heroClass);
      }
    }
    return myHeroClasses;
  };

  User.prototype.getAnnouncesActionAudioGroup = function() {
    var group;
    if (this.announcesActionAudioGroup) {
      return this.announcesActionAudioGroup;
    }
    group = me.get('testGroupNumber') % 4;
    this.announcesActionAudioGroup = (function() {
      switch (group) {
        case 0:
          return 'all-audio';
        case 1:
          return 'no-audio';
        case 2:
          return 'just-take-damage';
        case 3:
          return 'without-take-damage';
      }
    })();
    if (me.isAdmin()) {
      this.announcesActionAudioGroup = 'all-audio';
    }
    if (!me.isAdmin()) {
      application.tracker.identify({
        announcesActionAudioGroup: this.announcesActionAudioGroup
      });
    }
    return this.announcesActionAudioGroup;
  };

  User.prototype.getCampaignAdsGroup = function() {
    if (this.campaignAdsGroup) {
      return this.campaignAdsGroup;
    }
    this.campaignAdsGroup = 'leaderboard-ads';
    if (me.isAdmin()) {
      this.campaignAdsGroup = 'no-ads';
    }
    if (!me.isAdmin()) {
      application.tracker.identify({
        campaignAdsGroup: this.campaignAdsGroup
      });
    }
    return this.campaignAdsGroup;
  };

  User.prototype.getFourthLevelGroup = function() {
    var group;
    return 'forgetful-gemsmith';
    if (this.fourthLevelGroup) {
      return this.fourthLevelGroup;
    }
    group = me.get('testGroupNumber') % 8;
    this.fourthLevelGroup = (function() {
      switch (group) {
        case 0:
        case 1:
        case 2:
        case 3:
          return 'signs-and-portents';
        case 4:
        case 5:
        case 6:
        case 7:
          return 'forgetful-gemsmith';
      }
    })();
    if (me.isAdmin()) {
      this.fourthLevelGroup = 'signs-and-portents';
    }
    if (!me.isAdmin()) {
      application.tracker.identify({
        fourthLevelGroup: this.fourthLevelGroup
      });
    }
    return this.fourthLevelGroup;
  };

  User.prototype.getDefaultLanguageGroup = function() {
    var group;
    if (this.defaultLanguageGroup) {
      return this.defaultLanguageGroup;
    }
    group = me.get('testGroupNumber') % 2;
    this.defaultLanguageGroup = (function() {
      switch (group) {
        case 0:
          return 'javascript';
        case 1:
          return 'python';
      }
    })();
    if (!me.isAdmin()) {
      application.tracker.identify({
        defaultLanguageGroup: this.defaultLanguageGroup
      });
    }
    return this.defaultLanguageGroup;
  };

  User.prototype.getVideoTutorialStylesIndex = function(numVideos) {
    if (numVideos == null) {
      numVideos = 0;
    }
    if (!(numVideos > 0)) {
      return 0;
    }
    return me.get('testGroupNumber') % numVideos;
  };

  User.prototype.getYearSubscriptionGroup = function() {
    if (this.yearSubscriptionGroup) {
      return this.yearSubscriptionGroup;
    }
    this.yearSubscriptionGroup = utils.getYearSubscriptionGroup(me.get('testGroupNumber'));
    if (!me.isAdmin()) {
      application.tracker.identify({
        yearSubscriptionGroup: this.yearSubscriptionGroup
      });
    }
    return this.yearSubscriptionGroup;
  };

  User.prototype.getDungeonLevelsGroup = function() {
    var ref, skipTest;
    if (this.dungeonLevelsGroup) {
      return this.dungeonLevelsGroup;
    }
    this.dungeonLevelsGroup = 'none';
    this.dungeonLevelsHidden = ['cell-commentary', 'kithgard-librarian', 'loop-da-loop', 'haunted-kithmaze', 'dread-door', 'closing-the-distance'];
    skipTest = me.isAdmin() || me.isPremium() || features.freeOnly || me.isOnPremiumServer();
    if (skipTest) {
      ref = ['control', []], this.dungeonLevelsGroup = ref[0], this.dungeonLevelsHidden = ref[1];
    }
    return this.dungeonLevelsGroup;
  };

  User.prototype.getDungeonLevelsHidden = function() {
    this.getDungeonLevelsGroup();
    return this.dungeonLevelsHidden;
  };

  User.prototype.dungeonLevelSlugsToOriginals = {
    'cell-commentary': '57aa1bd5e5636725008854c0',
    'kithgard-librarian': '5604169b60537b8705386a59',
    'loop-da-loop': '565ce2291b940587057366dd',
    'haunted-kithmaze': '545a5914d820eb0000f6dc0a',
    'dread-door': '5418d40f4c16460000ab9ac2',
    'closing-the-distance': '541b288e1ccc8eaae19f3c25',
    'fire-dancing': '55ca293b9bc1892c835b0136',
    'the-second-kithmaze': '5418cf256bae62f707c7e1c3',
    'descending-further': '5452a84d57e83800009730e4',
    'known-enemy': '5452adea57e83800009730ee',
    'cupboards-of-kithgard': '54e0cdefe308cb510555a7f5',
    'a-mayhem-of-munchkins': '55ca29439bc1892c835b0137',
    'tactical-strike': '5452cfa706a59e000067e4f5'
  };

  User.prototype.dungeonItemSlugsToOriginals = {
    'programmaticon-i': '53e4108204c00d4607a89f78',
    'wooden-shield': '53e22aa153457600003e3ef5'
  };

  User.prototype.dungeonLevelUnlocksToRewrite = [
    {
      levels: ['kithgard-librarian'],
      unlockedInsteadOf: 'cell-commentary',
      groups: ['kithgard-librarian']
    }, {
      levels: ['fire-dancing'],
      item: 'programmaticon-i',
      unlockedInsteadOf: 'cell-commentary',
      groups: ['loop-da-loop', 'haunted-kithmaze', 'none']
    }, {
      levels: ['fire-dancing'],
      item: 'programmaticon-i',
      unlockedInsteadOf: 'kithgard-librarian',
      groups: ['cell-commentary']
    }, {
      levels: ['haunted-kithmaze'],
      unlockedInsteadOf: 'loop-da-loop',
      groups: ['haunted-kithmaze']
    }, {
      levels: ['the-second-kithmaze', 'descending-further'],
      unlockedInsteadOf: 'haunted-kithmaze',
      groups: ['conservative', 'loop-da-loop']
    }, {
      levels: ['the-second-kithmaze', 'descending-further'],
      unlockedInsteadOf: 'loop-da-loop',
      groups: ['cell-commentary', 'kithgard-librarian', 'none']
    }, {
      levels: ['known-enemy', 'cupboards-of-kithgard'],
      unlockedInsteadOf: 'dread-door',
      groups: ['conservative', 'cell-commentary', 'kithgard-librarian', 'loop-da-loop', 'haunted-kithmaze', 'none']
    }, {
      levels: ['a-mayhem-of-munchkins', 'tactical-strike'],
      item: 'wooden-shield',
      unlockedInsteadOf: 'closing-the-distance',
      groups: ['conservative', 'cell-commentary', 'kithgard-librarian', 'loop-da-loop', 'haunted-kithmaze', 'none']
    }
  ];

  User.prototype.ownsLevel = function(levelOriginal) {
    var i, len, levelSlug, levelUnlockRewrite, ref, ref1;
    if (indexOf.call(this.levels(), levelOriginal) >= 0) {
      return true;
    }
    if (this.dungeonLevelOriginalsToSlugs == null) {
      this.dungeonLevelOriginalsToSlugs = _.invert(this.dungeonLevelSlugsToOriginals);
    }
    levelSlug = this.dungeonLevelOriginalsToSlugs[levelOriginal];
    if (!levelSlug) {
      return false;
    }
    ref = this.dungeonLevelUnlocksToRewrite;
    for (i = 0, len = ref.length; i < len; i++) {
      levelUnlockRewrite = ref[i];
      if (ref1 = this.getDungeonLevelsGroup(), indexOf.call(levelUnlockRewrite.groups, ref1) >= 0) {
        if (indexOf.call(levelUnlockRewrite.levels, levelSlug) >= 0) {
          return this.ownsLevel(this.dungeonLevelSlugsToOriginals[levelUnlockRewrite.unlockedInsteadOf]);
        }
      }
    }
    return false;
  };

  User.prototype.ownsItem = function(itemOriginal) {
    var i, itemSlug, len, levelUnlockRewrite, ref, ref1;
    if (indexOf.call(this.items(), itemOriginal) >= 0) {
      return true;
    }
    if (this.dungeonItemOriginalsToSlugs == null) {
      this.dungeonItemOriginalsToSlugs = _.invert(this.dungeonItemSlugsToOriginals);
    }
    itemSlug = this.dungeonItemOriginalsToSlugs[itemOriginal];
    if (!itemSlug) {
      return false;
    }
    ref = this.dungeonLevelUnlocksToRewrite;
    for (i = 0, len = ref.length; i < len; i++) {
      levelUnlockRewrite = ref[i];
      if (ref1 = this.getDungeonLevelsGroup(), indexOf.call(levelUnlockRewrite.groups, ref1) >= 0) {
        if (itemSlug === levelUnlockRewrite.item) {
          return this.ownsLevel(this.dungeonLevelSlugsToOriginals[levelUnlockRewrite.unlockedInsteadOf]);
        }
      }
    }
    return false;
  };

  User.prototype.hasSubscription = function() {
    var stripe;
    if (!(stripe = this.get('stripe'))) {
      return false;
    }
    if (stripe.sponsorID) {
      return true;
    }
    if (stripe.subscriptionID) {
      return true;
    }
    if (stripe.free === true) {
      return true;
    }
    if (_.isString(stripe.free) && new Date() < new Date(stripe.free)) {
      return true;
    }
  };

  User.prototype.isPremium = function() {
    if (me.isInGodMode()) {
      return true;
    }
    if (me.isAdmin()) {
      return true;
    }
    if (me.hasSubscription()) {
      return true;
    }
    return false;
  };

  User.prototype.isOnPremiumServer = function() {
    var ref, ref1;
    if ((ref = me.get('country')) === 'brazil') {
      return true;
    }
    if (((ref1 = me.get('country')) === 'china') && (me.isPremium() || me.get('stripe'))) {
      return true;
    }
    return false;
  };

  User.prototype.sendVerificationCode = function(code) {
    return $.ajax({
      method: 'POST',
      url: "/db/user/" + this.id + "/verify/" + code,
      success: (function(_this) {
        return function(attributes) {
          _this.set(attributes);
          return _this.trigger('email-verify-success');
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.trigger('email-verify-error');
        };
      })(this)
    });
  };

  User.prototype.isEnrolled = function() {
    return this.prepaidStatus() === 'enrolled';
  };

  User.prototype.prepaidStatus = function() {
    var coursePrepaid;
    coursePrepaid = this.get('coursePrepaid');
    if (!coursePrepaid) {
      return 'not-enrolled';
    }
    if (!coursePrepaid.endDate) {
      return 'enrolled';
    }
    if (coursePrepaid.endDate > new Date().toISOString()) {
      return 'enrolled';
    } else {
      return 'expired';
    }
  };

  User.prototype.prepaidType = function() {
    var ref;
    if (!(this.get('coursePrepaid') || this.get('coursePrepaidID'))) {
      return void 0;
    }
    return ((ref = this.get('coursePrepaid')) != null ? ref.type : void 0) || 'course';
  };

  User.prototype.prepaidIncludesCourse = function(course) {
    var courseID, includedCourseIDs, ref;
    if (!(this.get('coursePrepaid') || this.get('coursePrepaidID'))) {
      return false;
    }
    includedCourseIDs = (ref = this.get('coursePrepaid')) != null ? ref.includedCourseIDs : void 0;
    courseID = course.id || course;
    return !includedCourseIDs || indexOf.call(includedCourseIDs, courseID) >= 0;
  };

  User.prototype.spy = function(user, options) {
    if (options == null) {
      options = {};
    }
    user = user.id || user;
    options.url = '/auth/spy';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    options.data.user = user;
    return this.fetch(options);
  };

  User.prototype.stopSpying = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = '/auth/stop-spying';
    options.type = 'POST';
    return this.fetch(options);
  };

  User.prototype.logout = function(options) {
    if (options == null) {
      options = {};
    }
    options.type = 'POST';
    options.url = '/auth/logout';
    if (typeof FB !== "undefined" && FB !== null) {
      if (typeof FB.logout === "function") {
        FB.logout();
      }
    }
    if (options.success == null) {
      options.success = function() {
        var location;
        location = _.result(currentView, 'logoutRedirectURL');
        if (location) {
          return window.location = location;
        } else {
          return window.location.reload();
        }
      };
    }
    return this.fetch(options);
  };

  User.prototype.signupWithPassword = function(name, email, password, options) {
    var jqxhr;
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/signup-with-password';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    _.extend(options.data, {
      name: name,
      email: email,
      password: password
    });
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.data);
    jqxhr = this.fetch(options);
    jqxhr.then(function() {
      var ref;
      return (ref = window.tracker) != null ? ref.trackEvent('Finished Signup', {
        category: "Signup",
        label: 'CodeCombat'
      }) : void 0;
    });
    return jqxhr;
  };

  User.prototype.signupWithFacebook = function(name, email, facebookID, options) {
    var jqxhr;
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/signup-with-facebook';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    _.extend(options.data, {
      name: name,
      email: email,
      facebookID: facebookID,
      facebookAccessToken: application.facebookHandler.token()
    });
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.data);
    jqxhr = this.fetch(options);
    jqxhr.then(function() {
      var ref, ref1;
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Facebook Login', {
          category: "Signup",
          label: 'Facebook'
        });
      }
      return (ref1 = window.tracker) != null ? ref1.trackEvent('Finished Signup', {
        category: "Signup",
        label: 'Facebook'
      }) : void 0;
    });
    return jqxhr;
  };

  User.prototype.signupWithGPlus = function(name, email, gplusID, options) {
    var jqxhr;
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/signup-with-gplus';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    _.extend(options.data, {
      name: name,
      email: email,
      gplusID: gplusID,
      gplusAccessToken: application.gplusHandler.token()
    });
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.data);
    jqxhr = this.fetch(options);
    jqxhr.then(function() {
      var ref, ref1;
      if ((ref = window.tracker) != null) {
        ref.trackEvent('Google Login', {
          category: "Signup",
          label: 'GPlus'
        });
      }
      return (ref1 = window.tracker) != null ? ref1.trackEvent('Finished Signup', {
        category: "Signup",
        label: 'GPlus'
      }) : void 0;
    });
    return jqxhr;
  };

  User.prototype.fetchGPlusUser = function(gplusID, options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.gplusID = gplusID;
    options.data.gplusAccessToken = application.gplusHandler.token();
    return this.fetch(options);
  };

  User.prototype.loginGPlusUser = function(gplusID, options) {
    if (options == null) {
      options = {};
    }
    options.url = '/auth/login-gplus';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    options.data.gplusID = gplusID;
    options.data.gplusAccessToken = application.gplusHandler.token();
    return this.fetch(options);
  };

  User.prototype.fetchFacebookUser = function(facebookID, options) {
    if (options == null) {
      options = {};
    }
    if (options.data == null) {
      options.data = {};
    }
    options.data.facebookID = facebookID;
    options.data.facebookAccessToken = application.facebookHandler.token();
    return this.fetch(options);
  };

  User.prototype.loginFacebookUser = function(facebookID, options) {
    if (options == null) {
      options = {};
    }
    options.url = '/auth/login-facebook';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    options.data.facebookID = facebookID;
    options.data.facebookAccessToken = application.facebookHandler.token();
    return this.fetch(options);
  };

  User.prototype.loginPasswordUser = function(usernameOrEmail, password, options) {
    if (options == null) {
      options = {};
    }
    options.url = '/auth/login';
    options.type = 'POST';
    if (options.data == null) {
      options.data = {};
    }
    _.extend(options.data, {
      username: usernameOrEmail,
      password: password
    });
    return this.fetch(options);
  };

  User.prototype.makeCoursePrepaid = function() {
    var Prepaid, coursePrepaid;
    coursePrepaid = this.get('coursePrepaid');
    if (!coursePrepaid) {
      return null;
    }
    Prepaid = require('models/Prepaid');
    return new Prepaid(coursePrepaid);
  };

  User.prototype.getLeadPriority = function() {
    var request;
    request = $.get('/db/user/-/lead-priority');
    request.then(function(arg) {
      var priority;
      priority = arg.priority;
      return application.tracker.identify({
        priority: priority
      });
    });
    return request;
  };

  User.prototype.becomeStudent = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = '/db/user/-/become-student';
    options.type = 'PUT';
    return this.fetch(options);
  };

  User.prototype.remainTeacher = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = '/db/user/-/remain-teacher';
    options.type = 'PUT';
    return this.fetch(options);
  };

  User.prototype.destudent = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/destudent';
    options.type = 'POST';
    return this.fetch(options);
  };

  User.prototype.deteacher = function(options) {
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/deteacher';
    options.type = 'POST';
    return this.fetch(options);
  };

  User.prototype.checkForNewAchievement = function(options) {
    var jqxhr;
    if (options == null) {
      options = {};
    }
    options.url = _.result(this, 'url') + '/check-for-new-achievement';
    options.type = 'POST';
    jqxhr = this.fetch(options);
    this.loading = false;
    return jqxhr;
  };

  User.prototype.finishedAnyLevels = function() {
    return Boolean((this.get('stats') || {}).gamesCompleted);
  };

  User.prototype.isFromUk = function() {
    return this.get('country') === 'united-kingdom';
  };

  return User;

})(CocoModel);

tiersByLevel = [-1, 0, 0.05, 0.14, 0.18, 0.32, 0.41, 0.5, 0.64, 0.82, 0.91, 1.04, 1.22, 1.35, 1.48, 1.65, 1.78, 1.96, 2.1, 2.24, 2.38, 2.55, 2.69, 2.86, 3.03, 3.16, 3.29, 3.42, 3.58, 3.74, 3.89, 4.04, 4.19, 4.32, 4.47, 4.64, 4.79, 4.96, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15];
});

;
//# sourceMappingURL=/javascripts/app/models/User.js.map
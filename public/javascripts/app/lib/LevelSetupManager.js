require.register("lib/LevelSetupManager", function(exports, require, module) {
var CocoClass, InventoryModal, Level, LevelSession, LevelSetupManager, PlayHeroesModal, SuperModel, ThangType, lastHeroesEarned, lastHeroesPurchased, ref, ref1, ref2, ref3,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

PlayHeroesModal = require('views/play/modal/PlayHeroesModal');

InventoryModal = require('views/play/menu/InventoryModal');

Level = require('models/Level');

LevelSession = require('models/LevelSession');

SuperModel = require('models/SuperModel');

ThangType = require('models/ThangType');

lastHeroesEarned = (ref = (ref1 = me.get('earned')) != null ? ref1.heroes : void 0) != null ? ref : [];

lastHeroesPurchased = (ref2 = (ref3 = me.get('purchased')) != null ? ref3.heroes : void 0) != null ? ref2 : [];

module.exports = LevelSetupManager = (function(superClass) {
  extend(LevelSetupManager, superClass);

  function LevelSetupManager(options) {
    var ref4;
    this.options = options;
    LevelSetupManager.__super__.constructor.call(this);
    this.supermodel = (ref4 = this.options.supermodel) != null ? ref4 : new SuperModel();
    this.session = this.options.session;
    if (!(this.level = this.options.level)) {
      this.loadLevel();
    }
    if (this.session) {
      this.fillSessionWithDefaults();
    } else {
      this.loadSession();
    }
  }

  LevelSetupManager.prototype.loadLevel = function() {
    var levelURL;
    levelURL = "/db/level/" + this.options.levelID;
    this.level = new Level().setURL(levelURL);
    this.level = this.supermodel.loadModel(this.level).model;
    if (this.level.loaded) {
      return this.onLevelSync();
    } else {
      return this.listenToOnce(this.level, 'sync', this.onLevelSync);
    }
  };

  LevelSetupManager.prototype.loadSession = function() {
    var sessionURL;
    sessionURL = "/db/level/" + this.options.levelID + "/session";
    if (this.options.courseID) {
      sessionURL += "?course=" + this.options.courseID;
    }
    this.session = new LevelSession().setURL(sessionURL);
    this.session = this.supermodel.loadModel(this.session).model;
    if (this.session.loaded) {
      return this.onSessionSync();
    } else {
      return this.listenToOnce(this.session, 'sync', this.onSessionSync);
    }
  };

  LevelSetupManager.prototype.onLevelSync = function() {
    if (this.destroyed) {
      return;
    }
    if (this.waitingToLoadModals) {
      this.waitingToLoadModals = false;
      return this.loadModals();
    }
  };

  LevelSetupManager.prototype.onSessionSync = function() {
    if (this.destroyed) {
      return;
    }
    this.session.url = function() {
      return '/db/level.session/' + this.id;
    };
    return this.fillSessionWithDefaults();
  };

  LevelSetupManager.prototype.fillSessionWithDefaults = function() {
    var heroConfig;
    heroConfig = _.merge({}, me.get('heroConfig'), this.session.get('heroConfig'));
    this.session.set('heroConfig', heroConfig);
    if (this.level.loaded) {
      return this.loadModals();
    } else {
      return this.waitingToLoadModals = true;
    }
  };

  LevelSetupManager.prototype.loadModals = function() {
    var goliath, lightseeker, raider, ref4, sorcerer, wizard;
    if (this.level.get('slug') === 'zero-sum') {
      sorcerer = '52fd1524c7e6cf99160e7bc9';
      if (this.session.get('creator') === '532dbc73a622924444b68ed9') {
        sorcerer = '53e126a4e06b897606d38bef';
      }
      this.session.set('heroConfig', {
        "thangType": sorcerer,
        "inventory": {
          "misc-0": "53e2396a53457600003e3f0f",
          "programming-book": "546e266e9df4a17d0d449be5",
          "minion": "54eb5dbc49fa2d5c905ddf56",
          "feet": "53e214f153457600003e3eab",
          "right-hand": "54eab7f52b7506e891ca7202",
          "left-hand": "5463758f3839c6e02811d30f",
          "wrists": "54693797a2b1f53ce79443e9",
          "gloves": "5469425ca2b1f53ce7944421",
          "torso": "546d4a549df4a17d0d449a97",
          "neck": "54693274a2b1f53ce79443c9",
          "eyes": "546941fda2b1f53ce794441d",
          "head": "546d4ca19df4a17d0d449abf"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'the-gauntlet-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "feet": "53e237bf53457600003e3f05",
          "head": "546d38269df4a17d0d4499ff",
          "eyes": "53e238df53457600003e3f0b",
          "torso": "53e22eac53457600003e3efc",
          "right-hand": "53e218d853457600003e3ebe",
          "programming-book": "53e4108204c00d4607a89f78"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'woodland-cleaver-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "eyes": "53e238df53457600003e3f0b",
          "head": "546d38269df4a17d0d4499ff",
          "torso": "545d3f0b2d03e700001b5a5d",
          "right-hand": "544d7d1f8494308424f564a3",
          "wrists": "53e2396a53457600003e3f0f",
          "feet": "53e2384453457600003e3f07",
          "programming-book": "546e25d99df4a17d0d449be1",
          "left-hand": "544c310ae0017993fce214bf"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'crossroads-kr') {
      lightseeker = '583d2cca6ffa3e65d170f29f';
      this.session.set('heroConfig', {
        "thangType": lightseeker,
        "inventory": {
          "wrists": "53e2396a53457600003e3f0f",
          "eyes": "53e2167653457600003e3eb3",
          "feet": "546d4d589df4a17d0d449ac9",
          "left-hand": "544d7bb88494308424f56493",
          "right-hand": "54694ba3a2b1f53ce794444d",
          "waist": "5437002a7beba4a82024a97d",
          "programming-book": "546e25d99df4a17d0d449be1",
          "gloves": "5469425ca2b1f53ce7944421",
          "head": "546d390b9df4a17d0d449a0b",
          "torso": "546aaf1b3777d6186329285e",
          "neck": "54693140a2b1f53ce79443bc"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if ((ref4 = this.level.get('slug')) === 'ace-of-coders' || ref4 === 'elemental-wars') {
      goliath = '55e1a6e876cb0948c96af9f8';
      this.session.set('heroConfig', {
        "thangType": goliath,
        "inventory": {
          "eyes": "53eb99f41a100989a40ce46e",
          "neck": "54693274a2b1f53ce79443c9",
          "wrists": "54693797a2b1f53ce79443e9",
          "feet": "546d4d8e9df4a17d0d449acd",
          "minion": "54eb5bf649fa2d5c905ddf4a",
          "programming-book": "557871261ff17fef5abee3ee"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'the-battle-of-sky-span') {
      wizard = '52fc1460b2b91c0d5a7b6af3';
      this.session.set('heroConfig', {
        "thangType": wizard,
        "inventory": {
          "eyes": "546941fda2b1f53ce794441d",
          "feet": "546d4d8e9df4a17d0d449acd",
          "torso": "546d4a549df4a17d0d449a97",
          "head": "546d4ca19df4a17d0d449abf",
          "minion": "54eb5d1649fa2d5c905ddf52",
          "neck": "54693240a2b1f53ce79443c5",
          "wrists": "54693830a2b1f53ce79443f1",
          "programming-book": "557871261ff17fef5abee3ee",
          "left-ring": "54692d2aa2b1f53ce794438f"
        }
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.get('slug') === 'assembly-speed') {
      raider = '55527eb0b8abf4ba1fe9a107';
      this.session.set('heroConfig', {
        "thangType": raider,
        "inventory": {}
      });
      this.onInventoryModalPlayClicked();
      return;
    }
    if (this.level.isType('course', 'course-ladder', 'game-dev', 'web-dev') || window.serverConfig.picoCTF) {
      this.onInventoryModalPlayClicked();
      return;
    }
    this.heroesModal = new PlayHeroesModal({
      supermodel: this.supermodel,
      session: this.session,
      confirmButtonI18N: 'play.next',
      level: this.level,
      hadEverChosenHero: this.options.hadEverChosenHero
    });
    this.inventoryModal = new InventoryModal({
      supermodel: this.supermodel,
      session: this.session,
      level: this.level
    });
    this.heroesModalDestroy = this.heroesModal.destroy;
    this.inventoryModalDestroy = this.inventoryModal.destroy;
    this.heroesModal.destroy = this.inventoryModal.destroy = _.noop;
    this.listenTo(this.heroesModal, 'confirm-click', this.onHeroesModalConfirmClicked);
    this.listenToOnce(this.heroesModal, 'hero-loaded', this.onceHeroLoaded);
    this.listenTo(this.inventoryModal, 'choose-hero-click', this.onChooseHeroClicked);
    this.listenTo(this.inventoryModal, 'play-click', this.onInventoryModalPlayClicked);
    this.modalsLoaded = true;
    if (this.waitingToOpen) {
      this.waitingToOpen = false;
      return this.open();
    }
  };

  LevelSetupManager.prototype.open = function() {
    var allowedHeroSlugs, firstModal, ref10, ref11, ref4, ref5, ref6, ref7, ref8, ref9;
    if (!this.modalsLoaded) {
      return this.waitingToOpen = true;
    }
    firstModal = this.options.hadEverChosenHero ? this.inventoryModal : this.heroesModal;
    if (!_.isEqual(lastHeroesEarned, (ref4 = (ref5 = me.get('earned')) != null ? ref5.heroes : void 0) != null ? ref4 : []) || !_.isEqual(lastHeroesPurchased, (ref6 = (ref7 = me.get('purchased')) != null ? ref7.heroes : void 0) != null ? ref6 : [])) {
      console.log('Showing hero picker because heroes earned/purchased has changed.');
      firstModal = this.heroesModal;
    } else if (allowedHeroSlugs = this.level.get('allowedHeroes')) {
      if (!_.find(allowedHeroSlugs, function(slug) {
        var ref8;
        return ThangType.heroes[slug] === ((ref8 = me.get('heroConfig')) != null ? ref8.thangType : void 0);
      })) {
        firstModal = this.heroesModal;
      }
    }
    lastHeroesEarned = (ref8 = (ref9 = me.get('earned')) != null ? ref9.heroes : void 0) != null ? ref8 : [];
    lastHeroesPurchased = (ref10 = (ref11 = me.get('purchased')) != null ? ref11.heroes : void 0) != null ? ref10 : [];
    this.options.parent.openModalView(firstModal);
    return this.trigger('open');
  };

  LevelSetupManager.prototype.onceHeroLoaded = function(e) {
    if (window.currentModal === this.inventoryModal) {
      return this.inventoryModal.setHero(e.hero);
    }
  };

  LevelSetupManager.prototype.onHeroesModalConfirmClicked = function(e) {
    var ref4;
    this.options.parent.openModalView(this.inventoryModal);
    this.inventoryModal.render();
    this.inventoryModal.didReappear();
    this.inventoryModal.onShown();
    if (e.hero) {
      this.inventoryModal.setHero(e.hero);
    }
    return (ref4 = window.tracker) != null ? ref4.trackEvent('Choose Inventory', {
      category: 'Play Level'
    }) : void 0;
  };

  LevelSetupManager.prototype.onChooseHeroClicked = function() {
    var ref4;
    this.options.parent.openModalView(this.heroesModal);
    this.heroesModal.render();
    this.heroesModal.didReappear();
    this.inventoryModal.endHighlight();
    return (ref4 = window.tracker) != null ? ref4.trackEvent('Change Hero', {
      category: 'Play Level'
    }) : void 0;
  };

  LevelSetupManager.prototype.onInventoryModalPlayClicked = function() {
    var LadderView, PlayLevelView, route, viewClass;
    this.navigatingToPlay = true;
    PlayLevelView = 'views/play/level/PlayLevelView';
    LadderView = 'views/ladder/LadderView';
    viewClass = this.options.levelPath === 'ladder' ? LadderView : PlayLevelView;
    route = "/play/" + (this.options.levelPath || 'level') + "/" + this.options.levelID;
    if (this.level.get('primerLanguage')) {
      route += "?codeLanguage=" + this.level.get('primerLanguage');
    }
    return Backbone.Mediator.publish('router:navigate', {
      route: route,
      viewClass: viewClass,
      viewArgs: [
        {
          supermodel: this.supermodel
        }, this.options.levelID
      ]
    });
  };

  LevelSetupManager.prototype.destroy = function() {
    var ref4, ref5, ref6, ref7;
    if (!((ref4 = this.heroesModal) != null ? ref4.destroyed : void 0)) {
      if ((ref5 = this.heroesModalDestroy) != null) {
        ref5.call(this.heroesModal);
      }
    }
    if (!((ref6 = this.inventoryModal) != null ? ref6.destroyed : void 0)) {
      if ((ref7 = this.inventoryModalDestroy) != null) {
        ref7.call(this.inventoryModal);
      }
    }
    return LevelSetupManager.__super__.destroy.call(this);
  };

  return LevelSetupManager;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/LevelSetupManager.js.map
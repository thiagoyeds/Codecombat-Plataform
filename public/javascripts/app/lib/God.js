require.register("lib/God", function(exports, require, module) {
var Angel, CocoClass, GameUIState, God, World, errors, imitateIE9, now,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

now = require('lib/world/world_utils').now;

World = require('lib/world/world');

CocoClass = require('core/CocoClass');

Angel = require('lib/Angel');

GameUIState = require('models/GameUIState');

errors = require('core/errors');

module.exports = God = (function(superClass) {
  extend(God, superClass);

  God.nicks = ['Athena', 'Baldr', 'Crom', 'Dagr', 'Eris', 'Freyja', 'Great Gish', 'Hades', 'Ishtar', 'Janus', 'Khronos', 'Loki', 'Marduk', 'Negafook', 'Odin', 'Poseidon', 'Quetzalcoatl', 'Ra', 'Shiva', 'Thor', 'Umvelinqangi', 'Týr', 'Vishnu', 'Wepwawet', 'Xipe Totec', 'Yahweh', 'Zeus', '上帝', 'Tiamat', '盘古', 'Phoebe', 'Artemis', 'Osiris', '嫦娥', 'Anhur', 'Teshub', 'Enlil', 'Perkele', 'Chaos', 'Hera', 'Iris', 'Theia', 'Uranus', 'Stribog', 'Sabazios', 'Izanagi', 'Ao', 'Tāwhirimātea', 'Tengri', 'Inmar', 'Torngarsuk', 'Centzonhuitznahua', 'Hunab Ku', 'Apollo', 'Helios', 'Thoth', 'Hyperion', 'Alectrona', 'Eos', 'Mitra', 'Saranyu', 'Freyr', 'Koyash', 'Atropos', 'Clotho', 'Lachesis', 'Tyche', 'Skuld', 'Urðr', 'Verðandi', 'Camaxtli', 'Huhetotl', 'Set', 'Anu', 'Allah', 'Anshar', 'Hermes', 'Lugh', 'Brigit', 'Manannan Mac Lir', 'Persephone', 'Mercury', 'Venus', 'Mars', 'Azrael', 'He-Man', 'Anansi', 'Issek', 'Mog', 'Kos', 'Amaterasu Omikami', 'Raijin', 'Susanowo', 'Blind Io', 'The Lady', 'Offler', 'Ptah', 'Anubis', 'Ereshkigal', 'Nergal', 'Thanatos', 'Macaria', 'Angelos', 'Erebus', 'Hecate', 'Hel', 'Orcus', 'Ishtar-Deela Nakh', 'Prometheus', 'Hephaestos', 'Sekhmet', 'Ares', 'Enyo', 'Otrera', 'Pele', 'Hadúr', 'Hachiman', 'Dayisun Tngri', 'Ullr', 'Lua', 'Minerva'];

  God.prototype.subscriptions = {
    'tome:cast-spells': 'onTomeCast',
    'tome:spell-debug-value-request': 'retrieveValueFromFrame',
    'god:new-world-created': 'onNewWorldCreated'
  };

  function God(options) {
    this.onDebugWorkerMessage = bind(this.onDebugWorkerMessage, this);
    this.retrieveValueFromFrame = bind(this.retrieveValueFromFrame, this);
    var angelCount, i, j, ref;
    if (options == null) {
      options = {};
    }
    this.retrieveValueFromFrame = _.throttle(this.retrieveValueFromFrame, 1000);
    if (this.gameUIState == null) {
      this.gameUIState = options.gameUIState || new GameUIState();
    }
    this.indefiniteLength = options.indefiniteLength || false;
    God.__super__.constructor.call(this);
    this.angelsShare = {
      workerCode: options.workerCode || '/javascripts/workers/worker_world.js',
      headless: options.headless,
      spectate: options.spectate,
      god: this,
      godNick: this.nick,
      gameUIState: this.gameUIState,
      workQueue: [],
      firstWorld: true,
      world: void 0,
      goalManager: void 0,
      worldClassMap: void 0,
      angels: [],
      busyAngels: []
    };
    if (options.maxAngels != null) {
      angelCount = options.maxAngels;
    } else if (window.application.isIPadApp) {
      angelCount = 1;
    } else {
      angelCount = 2;
    }
    for (i = j = 0, ref = angelCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      _.delay(((function(_this) {
        return function() {
          if (!_this.destroyed) {
            return new Angel(_this.angelsShare);
          }
        };
      })(this)), 250 * i);
    }
  }

  God.prototype.destroy = function() {
    var angel, j, len, ref, ref1, ref2, ref3;
    ref = this.angelsShare.angels.slice();
    for (j = 0, len = ref.length; j < len; j++) {
      angel = ref[j];
      angel.destroy();
    }
    if ((ref1 = this.angelsShare.goalManager) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.debugWorker) != null) {
      ref2.terminate();
    }
    if ((ref3 = this.debugWorker) != null) {
      ref3.removeEventListener('message', this.onDebugWorkerMessage);
    }
    return God.__super__.destroy.call(this);
  };

  God.prototype.setLevel = function(level) {
    this.level = level;
  };

  God.prototype.setLevelSessionIDs = function(levelSessionIDs) {
    this.levelSessionIDs = levelSessionIDs;
  };

  God.prototype.setGoalManager = function(goalManager) {
    var ref;
    if (this.angelsShare.goalManager !== goalManager) {
      if ((ref = this.angelsShare.goalManager) != null) {
        ref.destroy();
      }
    }
    return this.angelsShare.goalManager = goalManager;
  };

  God.prototype.setWorldClassMap = function(worldClassMap) {
    return this.angelsShare.worldClassMap = worldClassMap;
  };

  God.prototype.onTomeCast = function(e) {
    var flag;
    if (e.god !== this) {
      return;
    }
    this.lastSubmissionCount = e.submissionCount;
    this.lastFixedSeed = e.fixedSeed;
    this.lastFlagHistory = (function() {
      var j, len, ref, results;
      ref = e.flagHistory;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        flag = ref[j];
        if (flag.source !== 'code') {
          results.push(flag);
        }
      }
      return results;
    })();
    this.lastDifficulty = e.difficulty;
    return this.createWorld(e.spells, e.preload, e.realTime, e.justBegin);
  };

  God.prototype.createWorld = function(spells, preload, realTime, justBegin) {
    var angel, hadPreloader, isPreloading, j, k, len, len1, ref, ref1, ref2, userCodeMap, work;
    console.log(this.nick + ": Let there be light upon " + this.level.name + "! (preload: " + preload + ")");
    userCodeMap = this.getUserCodeMap(spells);
    hadPreloader = false;
    ref = this.angelsShare.busyAngels;
    for (j = 0, len = ref.length; j < len; j++) {
      angel = ref[j];
      isPreloading = angel.running && angel.work.preload && _.isEqual(angel.work.userCodeMap, userCodeMap, function(a, b) {
        if (((a != null ? a.raw : void 0) != null) && ((b != null ? b.raw : void 0) != null)) {
          return a.raw === b.raw;
        }
        return void 0;
      });
      if (!hadPreloader && isPreloading && !realTime) {
        angel.finalizePreload();
        hadPreloader = true;
      } else if (preload && angel.running && !angel.work.preload) {
        return;
      } else {
        angel.abort();
      }
    }
    if (hadPreloader) {
      return;
    }
    this.angelsShare.workQueue = [];
    work = {
      userCodeMap: userCodeMap,
      level: this.level,
      levelSessionIDs: this.levelSessionIDs,
      submissionCount: this.lastSubmissionCount,
      fixedSeed: this.lastFixedSeed,
      flagHistory: this.lastFlagHistory,
      difficulty: this.lastDifficulty,
      goals: (ref1 = this.angelsShare.goalManager) != null ? ref1.getGoals() : void 0,
      headless: this.angelsShare.headless,
      preload: preload,
      synchronous: typeof Worker === "undefined" || Worker === null,
      realTime: realTime,
      justBegin: justBegin,
      indefiniteLength: this.indefiniteLength && realTime
    };
    this.angelsShare.workQueue.push(work);
    ref2 = this.angelsShare.angels;
    for (k = 0, len1 = ref2.length; k < len1; k++) {
      angel = ref2[k];
      angel.workIfIdle();
    }
    return work;
  };

  God.prototype.getUserCodeMap = function(spells) {
    var name, spell, spellKey, userCodeMap;
    userCodeMap = {};
    for (spellKey in spells) {
      spell = spells[spellKey];
      (userCodeMap[name = spell.thang.thang.id] != null ? userCodeMap[name] : userCodeMap[name] = {})[spell.name] = spell.thang.aether.serialize();
    }
    return userCodeMap;
  };

  God.prototype.retrieveValueFromFrame = function(args) {
    var ref;
    if (this.destroyed) {
      return;
    }
    if (!(args.thangID && args.spellID && args.variableChain)) {
      return;
    }
    if (!this.currentUserCodeMap) {
      return console.error('Tried to retrieve debug value with no currentUserCodeMap');
    }
    if (this.debugWorker == null) {
      this.debugWorker = this.createDebugWorker();
    }
    if (args.frame == null) {
      args.frame = this.angelsShare.world.age / this.angelsShare.world.dt;
    }
    return this.debugWorker.postMessage({
      func: 'retrieveValueFromFrame',
      args: {
        userCodeMap: this.currentUserCodeMap,
        level: this.level,
        levelSessionIDs: this.levelSessionIDs,
        submissionCount: this.lastSubmissionCount,
        fixedSeed: this.fixedSeed,
        flagHistory: this.lastFlagHistory,
        difficulty: this.lastDifficulty,
        goals: (ref = this.goalManager) != null ? ref.getGoals() : void 0,
        frame: args.frame,
        currentThangID: args.thangID,
        currentSpellID: args.spellID,
        variableChain: args.variableChain
      }
    });
  };

  God.prototype.createDebugWorker = function() {
    var worker;
    worker = new Worker('/javascripts/workers/worker_world.js');
    worker.addEventListener('message', this.onDebugWorkerMessage);
    worker.addEventListener('error', errors.onWorkerError);
    return worker;
  };

  God.prototype.onDebugWorkerMessage = function(event) {
    switch (event.data.type) {
      case 'console-log':
        return console.log.apply(console, ["|" + this.nick + "'s debugger|"].concat(slice.call(event.data.args)));
      case 'debug-value-return':
        return Backbone.Mediator.publish('god:debug-value-return', event.data.serialized, {
          god: this
        });
      case 'debug-world-load-progress-changed':
        return Backbone.Mediator.publish('god:debug-world-load-progress-changed', {
          progress: event.data.progress,
          god: this
        });
    }
  };

  God.prototype.onNewWorldCreated = function(e) {
    return this.currentUserCodeMap = this.filterUserCodeMapWhenFromWorld(e.world.userCodeMap);
  };

  God.prototype.filterUserCodeMapWhenFromWorld = function(worldUserCodeMap) {
    var aether, newUserCodeMap, shallowFilteredObject, spellName, thang, thangName;
    newUserCodeMap = {};
    for (thangName in worldUserCodeMap) {
      thang = worldUserCodeMap[thangName];
      newUserCodeMap[thangName] = {};
      for (spellName in thang) {
        aether = thang[spellName];
        shallowFilteredObject = _.pick(aether, ['raw', 'pure', 'originalOptions']);
        newUserCodeMap[thangName][spellName] = _.cloneDeep(shallowFilteredObject);
        newUserCodeMap[thangName][spellName] = _.defaults(newUserCodeMap[thangName][spellName], {
          flow: {},
          metrics: {},
          problems: {
            errors: [],
            infos: [],
            warnings: []
          },
          style: {}
        });
      }
    }
    return newUserCodeMap;
  };

  return God;

})(CocoClass);

imitateIE9 = false;

if (imitateIE9) {
  window.Worker = null;
  window.Float32Array = null;
}
});

;
//# sourceMappingURL=/javascripts/app/lib/God.js.map
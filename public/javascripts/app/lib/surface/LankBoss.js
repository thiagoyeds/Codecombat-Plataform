require.register("lib/surface/LankBoss", function(exports, require, module) {
var CocoClass, FlagLank, Grid, Lank, LankBoss, LayerAdapter, Mark, me, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

me = require('core/auth').me;

LayerAdapter = require('./LayerAdapter');

FlagLank = require('lib/surface/FlagLank');

Lank = require('lib/surface/Lank');

Mark = require('./Mark');

Grid = require('lib/world/Grid');

utils = require('core/utils');

module.exports = LankBoss = (function(superClass) {
  extend(LankBoss, superClass);

  LankBoss.prototype.subscriptions = {
    'level:set-debug': 'onSetDebug',
    'sprite:highlight-sprites': 'onHighlightSprites',
    'surface:stage-mouse-down': 'onStageMouseDown',
    'level:select-sprite': 'onSelectSprite',
    'level:suppress-selection-sounds': 'onSuppressSelectionSounds',
    'level:lock-select': 'onSetLockSelect',
    'level:restarted': 'onLevelRestarted',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'camera:dragged': 'onCameraDragged',
    'sprite:loaded': function() {
      return this.update(true);
    },
    'level:flag-color-selected': 'onFlagColorSelected',
    'level:flag-updated': 'onFlagUpdated',
    'surface:flag-appeared': 'onFlagAppeared',
    'surface:remove-selected-flag': 'onRemoveSelectedFlag'
  };

  function LankBoss(options1) {
    var base;
    this.options = options1 != null ? options1 : {};
    LankBoss.__super__.constructor.call(this);
    this.handleEvents = this.options.handleEvents;
    this.gameUIState = this.options.gameUIState;
    this.dragged = 0;
    this.camera = this.options.camera;
    this.webGLStage = this.options.webGLStage;
    this.surfaceTextLayer = this.options.surfaceTextLayer;
    this.world = this.options.world;
    if ((base = this.options).thangTypes == null) {
      base.thangTypes = [];
    }
    this.lanks = {};
    this.lankArray = [];
    this.createLayers();
    this.pendingFlags = [];
    if (!this.handleEvents) {
      this.listenTo(this.gameUIState, 'change:selected', this.onChangeSelected);
    }
  }

  LankBoss.prototype.destroy = function() {
    var j, lank, lankLayer, len, ref, ref1, ref2, ref3, thangID;
    ref = this.lanks;
    for (thangID in ref) {
      lank = ref[thangID];
      this.removeLank(lank);
    }
    if ((ref1 = this.targetMark) != null) {
      ref1.destroy();
    }
    if ((ref2 = this.selectionMark) != null) {
      ref2.destroy();
    }
    ref3 = _.values(this.layerAdapters);
    for (j = 0, len = ref3.length; j < len; j++) {
      lankLayer = ref3[j];
      lankLayer.destroy();
    }
    return LankBoss.__super__.destroy.call(this);
  };

  LankBoss.prototype.toString = function() {
    return "<LankBoss: " + this.lankArray.length + " lanks>";
  };

  LankBoss.prototype.thangTypeFor = function(type) {
    return _.find(this.options.thangTypes, function(m) {
      return m.get('original') === type || m.get('name') === type;
    });
  };

  LankBoss.prototype.createLayers = function() {
    var j, lankLayer, len, name, priority, ref, ref1, ref2;
    this.layerAdapters = {};
    ref = [['Land', -40], ['Ground', -30], ['Obstacle', -20], ['Path', -10], ['Default', 0], ['Floating', 10]];
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], name = ref1[0], priority = ref1[1];
      this.layerAdapters[name] = new LayerAdapter({
        name: name,
        webGL: true,
        layerPriority: priority,
        transform: LayerAdapter.TRANSFORM_SURFACE,
        camera: this.camera
      });
    }
    return (ref2 = this.webGLStage).addChild.apply(ref2, (function() {
      var k, len1, ref2, results;
      ref2 = _.values(this.layerAdapters);
      results = [];
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        lankLayer = ref2[k];
        results.push(lankLayer.container);
      }
      return results;
    }).call(this));
  };

  LankBoss.prototype.layerForChild = function(child, lank) {
    var layer, thang;
    if (child.layerPriority == null) {
      if (thang = lank != null ? lank.thang : void 0) {
        child.layerPriority = thang.layerPriority;
        if (thang.isSelectable) {
          if (child.layerPriority == null) {
            child.layerPriority = 0;
          }
        }
        if (thang.isLand) {
          if (child.layerPriority == null) {
            child.layerPriority = -40;
          }
        }
      }
    }
    if (child.layerPriority == null) {
      child.layerPriority = 0;
    }
    if (!child.layerPriority) {
      return this.layerAdapters['Default'];
    }
    layer = _.findLast(this.layerAdapters, function(layer, name) {
      return layer.layerPriority <= child.layerPriority;
    });
    if (child.layerPriority < -40) {
      if (layer == null) {
        layer = this.layerAdapters['Land'];
      }
    }
    return layer != null ? layer : this.layerAdapters['Default'];
  };

  LankBoss.prototype.addLank = function(lank, id, layer) {
    var ref;
    if (id == null) {
      id = null;
    }
    if (layer == null) {
      layer = null;
    }
    if (id == null) {
      id = lank.thang.id;
    }
    if (this.lanks[id]) {
      console.error('Lank collision! Already have:', id);
    }
    this.lanks[id] = lank;
    this.lankArray.push(lank);
    if (((ref = lank.thang) != null ? ref.spriteName.search(/(dungeon|indoor|ice|classroom|vr).wall/i) : void 0) !== -1) {
      if (layer == null) {
        layer = this.layerAdapters['Obstacle'];
      }
    }
    if (layer == null) {
      layer = this.layerForChild(lank.sprite, lank);
    }
    layer.addLank(lank);
    layer.updateLayerOrder();
    return lank;
  };

  LankBoss.prototype.createMarks = function() {
    this.targetMark = new Mark({
      name: 'target',
      camera: this.camera,
      layer: this.layerAdapters['Ground'],
      thangType: 'target'
    });
    return this.selectionMark = new Mark({
      name: 'selection',
      camera: this.camera,
      layer: this.layerAdapters['Ground'],
      thangType: 'selection'
    });
  };

  LankBoss.prototype.createLankOptions = function(options) {
    return _.extend(options, {
      camera: this.camera,
      resolutionFactor: SPRITE_RESOLUTION_FACTOR,
      groundLayer: this.layerAdapters['Ground'],
      textLayer: this.surfaceTextLayer,
      floatingLayer: this.layerAdapters['Floating'],
      showInvisible: this.options.showInvisible,
      gameUIState: this.gameUIState,
      handleEvents: this.handleEvents
    });
  };

  LankBoss.prototype.onSetDebug = function(e) {
    var j, lank, len, ref, results;
    if (e.debug === this.debug) {
      return;
    }
    this.debug = e.debug;
    ref = this.lankArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      results.push(lank.setDebug(this.debug));
    }
    return results;
  };

  LankBoss.prototype.onHighlightSprites = function(e) {
    var highlightedIDs, lank, ref, results, thangID;
    highlightedIDs = e.thangIDs || [];
    ref = this.lanks;
    results = [];
    for (thangID in ref) {
      lank = ref[thangID];
      results.push(typeof lank.setHighlight === "function" ? lank.setHighlight(indexOf.call(highlightedIDs, thangID) >= 0, e.delay) : void 0);
    }
    return results;
  };

  LankBoss.prototype.addThangToLanks = function(thang, layer) {
    var lank, options, thangType;
    if (layer == null) {
      layer = null;
    }
    if (this.lanks[thang.id]) {
      return console.warn('Tried to add Thang to the surface it already has:', thang.id);
    }
    thangType = _.find(this.options.thangTypes, function(m) {
      if (!(m.get('actions') || m.get('raster'))) {
        return false;
      }
      return m.get('name') === thang.spriteName;
    });
    if (thangType == null) {
      thangType = _.find(this.options.thangTypes, function(m) {
        return m.get('name') === thang.spriteName;
      });
    }
    if (!thangType) {
      return console.error("Couldn't find ThangType for", thang);
    }
    options = this.createLankOptions({
      thang: thang
    });
    options.resolutionFactor = thangType.get('kind') === 'Floor' ? 2 : SPRITE_RESOLUTION_FACTOR;
    if (this.options.playerNames && /Hero Placeholder/.test(thang.id)) {
      options.playerName = this.options.playerNames[thang.team];
    }
    lank = new Lank(thangType, options);
    this.listenTo(lank, 'sprite:mouse-up', this.onLankMouseUp);
    this.addLank(lank, null, layer);
    lank.setDebug(this.debug);
    return lank;
  };

  LankBoss.prototype.removeLank = function(lank) {
    var thang;
    lank.layer.removeLank(lank);
    thang = lank.thang;
    delete this.lanks[lank.thang.id];
    this.lankArray.splice(this.lankArray.indexOf(lank), 1);
    this.stopListening(lank);
    lank.destroy();
    return lank.thang = thang;
  };

  LankBoss.prototype.updateSounds = function() {
    var j, lank, len, ref, results;
    ref = this.lankArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      results.push(lank.playSounds());
    }
    return results;
  };

  LankBoss.prototype.update = function(frameChanged) {
    var j, lank, len, ref;
    if (frameChanged) {
      this.adjustLankExistence();
    }
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.update(frameChanged);
    }
    this.updateSelection();
    this.layerAdapters['Default'].updateLayerOrder();
    return this.cacheObstacles();
  };

  LankBoss.prototype.adjustLankExistence = function() {
    var isObstacle, item, itemsJustEquipped, j, k, lank, len, len1, missing, ref, ref1, ref2, thang, thangID, updatedObstacles;
    updatedObstacles = [];
    itemsJustEquipped = [];
    ref = this.world.thangs;
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (!(thang.exists && thang.pos)) {
        continue;
      }
      if (thang.equip) {
        itemsJustEquipped = itemsJustEquipped.concat(this.equipNewItems(thang));
      }
      if (lank = this.lanks[thang.id]) {
        lank.setThang(thang);
      } else {
        lank = this.addThangToLanks(thang);
        Backbone.Mediator.publish('surface:new-thang-added', {
          thang: thang,
          sprite: lank
        });
        if (lank.sprite.parent === this.layerAdapters['Obstacle']) {
          updatedObstacles.push(lank);
        }
        lank.playSounds();
      }
    }
    for (k = 0, len1 = itemsJustEquipped.length; k < len1; k++) {
      item = itemsJustEquipped[k];
      item.modifyStats();
    }
    ref1 = this.lanks;
    for (thangID in ref1) {
      lank = ref1[thangID];
      missing = !(lank.notOfThisWorld || ((ref2 = this.world.thangMap[thangID]) != null ? ref2.exists : void 0));
      isObstacle = lank.sprite.parent === this.layerAdapters['Obstacle'];
      if (isObstacle && (missing || lank.hasMoved)) {
        updatedObstacles.push(lank);
      }
      lank.hasMoved = false;
      if (missing) {
        this.removeLank(lank);
      }
    }
    if (updatedObstacles.length && this.cachedObstacles) {
      this.cacheObstacles(updatedObstacles);
    }
    if (this.willSelectThang && this.lanks[this.willSelectThang[0]]) {
      this.selectThang.apply(this, this.willSelectThang);
    }
    return this.updateScreenReader();
  };

  LankBoss.prototype.updateScreenReader = function() {
    var ascii, availableHeight, availableWidth, fullHeight, fullWidth, grid, lank, scale, thangs;
    if (me.get('name') !== 'zersiax') {
      return;
    }
    ascii = $('#ascii-surface');
    thangs = (function() {
      var j, len, ref, results;
      ref = this.lankArray;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        lank = ref[j];
        results.push(lank.thang);
      }
      return results;
    }).call(this);
    grid = new Grid(thangs, this.world.width, this.world.height, 0, 0, 0, true);
    utils.replaceText(ascii, grid.toString(true));
    ascii.css('transform', 'initial');
    fullWidth = ascii.innerWidth();
    fullHeight = ascii.innerHeight();
    availableWidth = ascii.parent().innerWidth();
    availableHeight = ascii.parent().innerHeight();
    scale = availableWidth / fullWidth;
    scale = Math.min(scale, availableHeight / fullHeight);
    return ascii.css('transform', "scale(" + scale + ")");
  };

  LankBoss.prototype.equipNewItems = function(thang) {
    var item, itemID, itemsJustEquipped, ref, slot;
    itemsJustEquipped = [];
    if (thang.equip && !thang.equipped) {
      thang.equip();
      itemsJustEquipped.push(thang);
    }
    if (thang.inventoryIDs) {
      ref = thang.inventoryIDs;
      for (slot in ref) {
        itemID = ref[slot];
        item = this.world.getThangByID(itemID);
        if (!item.equipped) {
          if (!item.equip) {
            console.log(thang.id, 'equipping', item, 'in', thang.slot, 'Surface-side, but it cannot equip?');
          }
          if (typeof item.equip === "function") {
            item.equip();
          }
          if (item.equip) {
            itemsJustEquipped.push(item);
          }
        }
      }
    }
    return itemsJustEquipped;
  };

  LankBoss.prototype.cacheObstacles = function(updatedObstacles) {
    var j, lank, lankArray, len, possiblyUpdatedWallLanks, s, wallGrid, wallLank, wallLanks, walls;
    if (updatedObstacles == null) {
      updatedObstacles = null;
    }
    if (this.cachedObstacles && !updatedObstacles) {
      return;
    }
    lankArray = this.lankArray;
    wallLanks = (function() {
      var j, len, ref, results;
      results = [];
      for (j = 0, len = lankArray.length; j < len; j++) {
        lank = lankArray[j];
        if (((ref = lank.thangType) != null ? ref.get('name').search(/(dungeon|indoor|ice|classroom|vr).wall/i) : void 0) !== -1) {
          results.push(lank);
        }
      }
      return results;
    })();
    if (_.any((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = wallLanks.length; j < len; j++) {
        s = wallLanks[j];
        results.push(s.stillLoading);
      }
      return results;
    })())) {
      return;
    }
    walls = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = wallLanks.length; j < len; j++) {
        lank = wallLanks[j];
        results.push(lank.thang);
      }
      return results;
    })();
    this.world.calculateBounds();
    wallGrid = new Grid(walls, this.world.width, this.world.height);
    if (updatedObstacles) {
      possiblyUpdatedWallLanks = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = wallLanks.length; j < len; j++) {
          lank = wallLanks[j];
          if (_.find(updatedObstacles, function(w2) {
            return lank === w2 || (Math.abs(lank.thang.pos.x - w2.thang.pos.x) + Math.abs(lank.thang.pos.y - w2.thang.pos.y)) <= 16;
          })) {
            results.push(lank);
          }
        }
        return results;
      })();
    } else {
      possiblyUpdatedWallLanks = wallLanks;
    }
    for (j = 0, len = possiblyUpdatedWallLanks.length; j < len; j++) {
      wallLank = possiblyUpdatedWallLanks[j];
      if (!wallLank.currentRootAction) {
        wallLank.queueAction('idle');
      }
      wallLank.lockAction(false);
      wallLank.updateActionDirection(wallGrid);
      wallLank.lockAction(true);
      wallLank.updateScale();
      wallLank.updatePosition();
    }
    return this.cachedObstacles = true;
  };

  LankBoss.prototype.lankFor = function(thangID) {
    return this.lanks[thangID];
  };

  LankBoss.prototype.onNewWorld = function(e) {
    this.world = this.options.world = e.world;
    if (e.finished && /kithgard-mastery/.test(window.location.href)) {
      return this.cachedObstacles = false;
    }
  };

  LankBoss.prototype.play = function() {
    var j, lank, len, ref, ref1, ref2;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.play();
    }
    if ((ref1 = this.selectionMark) != null) {
      ref1.play();
    }
    return (ref2 = this.targetMark) != null ? ref2.play() : void 0;
  };

  LankBoss.prototype.stop = function() {
    var j, lank, len, ref, ref1, ref2;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      lank.stop();
    }
    if ((ref1 = this.selectionMark) != null) {
      ref1.stop();
    }
    return (ref2 = this.targetMark) != null ? ref2.stop() : void 0;
  };

  LankBoss.prototype.onSuppressSelectionSounds = function(e) {
    return this.suppressSelectionSounds = e.suppress;
  };

  LankBoss.prototype.onSetLockSelect = function(e) {
    return this.selectLocked = e.lock;
  };

  LankBoss.prototype.onLevelRestarted = function(e) {
    this.selectLocked = false;
    return this.selectLank(e, null);
  };

  LankBoss.prototype.onSelectSprite = function(e) {
    return this.selectThang(e.thangID, e.spellName);
  };

  LankBoss.prototype.onCameraDragged = function() {
    return this.dragged += 1;
  };

  LankBoss.prototype.onLankMouseUp = function(e) {
    var lank, ref, ref1;
    if (!this.handleEvents) {
      return;
    }
    if (key.shift) {
      return;
    }
    if (this.dragged > 3) {
      return this.dragged = 0;
    }
    this.dragged = 0;
    lank = ((ref = e.sprite) != null ? (ref1 = ref.thang) != null ? ref1.isSelectable : void 0 : void 0) ? e.sprite : null;
    if (this.flagCursorLank && (lank != null ? lank.thangType.get('name') : void 0) === 'Flag') {
      return;
    }
    return this.selectLank(e, lank);
  };

  LankBoss.prototype.onStageMouseDown = function(e) {
    if (!this.handleEvents) {
      return;
    }
    if (key.shift) {
      return;
    }
    if (e.onBackground) {
      return this.selectLank(e);
    }
  };

  LankBoss.prototype.onChangeSelected = function(gameUIState, selected) {
    var addedLanks, j, k, lank, layer, len, len1, mark, newLanks, oldLanks, removedLanks, results, s;
    oldLanks = (function() {
      var j, len, ref, results;
      ref = gameUIState.previousAttributes().selected || [];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        s = ref[j];
        results.push(s.sprite);
      }
      return results;
    })();
    newLanks = (function() {
      var j, len, ref, results;
      ref = selected || [];
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        s = ref[j];
        results.push(s.sprite);
      }
      return results;
    })();
    addedLanks = _.difference(newLanks, oldLanks);
    removedLanks = _.difference(oldLanks, newLanks);
    for (j = 0, len = addedLanks.length; j < len; j++) {
      lank = addedLanks[j];
      layer = lank.sprite.parent !== this.layerAdapters.Default.container ? this.layerAdapters.Default : this.layerAdapters.Ground;
      mark = new Mark({
        name: 'selection',
        camera: this.camera,
        layer: layer,
        thangType: 'selection'
      });
      mark.toggle(true);
      mark.setLank(lank);
      mark.update();
      lank.marks.selection = mark;
    }
    results = [];
    for (k = 0, len1 = removedLanks.length; k < len1; k++) {
      lank = removedLanks[k];
      results.push(typeof lank.removeMark === "function" ? lank.removeMark('selection') : void 0);
    }
    return results;
  };

  LankBoss.prototype.selectThang = function(thangID, spellName, treemaThangSelected) {
    if (spellName == null) {
      spellName = null;
    }
    if (treemaThangSelected == null) {
      treemaThangSelected = null;
    }
    if (!this.lanks[thangID]) {
      return this.willSelectThang = [thangID, spellName];
    }
    return this.selectLank(null, this.lanks[thangID], spellName, treemaThangSelected);
  };

  LankBoss.prototype.selectLank = function(e, lank, spellName, treemaThangSelected) {
    var alive, instance, ref, ref1, ref2, ref3, worldPos;
    if (lank == null) {
      lank = null;
    }
    if (spellName == null) {
      spellName = null;
    }
    if (treemaThangSelected == null) {
      treemaThangSelected = null;
    }
    if (e && (this.disabled || this.selectLocked)) {
      return;
    }
    worldPos = lank != null ? (ref = lank.thang) != null ? ref.pos : void 0 : void 0;
    if (e != null ? e.originalEvent : void 0) {
      if (worldPos == null) {
        worldPos = this.camera.screenToWorld({
          x: e.originalEvent.rawX,
          y: e.originalEvent.rawY
        });
      }
    }
    if (this.handleEvents) {
      if ((!this.reallyStopMoving) && worldPos && (this.options.navigateToSelection || !lank || treemaThangSelected) && (e != null ? (ref1 = e.originalEvent) != null ? (ref2 = ref1.nativeEvent) != null ? ref2.which : void 0 : void 0 : void 0) !== 3) {
        this.camera.zoomTo((lank != null ? lank.sprite : void 0) || this.camera.worldToSurface(worldPos), this.camera.zoom, 1000, true);
      }
    }
    if (this.options.choosing) {
      lank = null;
    }
    if (lank !== this.selectedLank) {
      if ((ref3 = this.selectedLank) != null) {
        ref3.selected = false;
      }
      if (lank != null) {
        lank.selected = true;
      }
      this.selectedLank = lank;
    }
    alive = lank && !(lank.thang.health < 0);
    Backbone.Mediator.publish('surface:sprite-selected', {
      thang: lank ? lank.thang : null,
      sprite: lank,
      spellName: spellName != null ? spellName : e != null ? e.spellName : void 0,
      originalEvent: e,
      worldPos: worldPos
    });
    if (lank) {
      this.willSelectThang = null;
    }
    if (alive && !this.suppressSelectionSounds) {
      instance = lank.playSound('selected');
      if ((instance != null ? instance.playState : void 0) === 'playSucceeded') {
        Backbone.Mediator.publish('sprite:thang-began-talking', {
          thang: lank != null ? lank.thang : void 0
        });
        return instance.addEventListener('complete', function() {
          return Backbone.Mediator.publish('sprite:thang-finished-talking', {
            thang: lank != null ? lank.thang : void 0
          });
        });
      }
    }
  };

  LankBoss.prototype.onFlagColorSelected = function(e) {
    var flagLank, j, len, ref;
    if (this.flagCursorLank) {
      this.removeLank(this.flagCursorLank);
    }
    this.flagCursorLank = null;
    ref = this.lankArray;
    for (j = 0, len = ref.length; j < len; j++) {
      flagLank = ref[j];
      if (flagLank.thangType.get('name') === 'Flag') {
        flagLank.sprite.cursor = e.color ? 'crosshair' : 'pointer';
      }
    }
    if (!e.color) {
      return;
    }
    this.flagCursorLank = new FlagLank(this.thangTypeFor('Flag'), this.createLankOptions({
      thangID: 'Flag Cursor',
      color: e.color,
      team: me.team,
      isCursor: true,
      pos: e.pos
    }));
    return this.addLank(this.flagCursorLank, this.flagCursorLank.thang.id, this.layerAdapters['Floating']);
  };

  LankBoss.prototype.onFlagUpdated = function(e) {
    var pendingFlag;
    if (!e.active) {
      return;
    }
    pendingFlag = new FlagLank(this.thangTypeFor('Flag'), this.createLankOptions({
      thangID: 'Pending Flag ' + Math.random(),
      color: e.color,
      team: e.team,
      isCursor: false,
      pos: e.pos
    }));
    this.addLank(pendingFlag, pendingFlag.thang.id, this.layerAdapters['Floating']);
    return this.pendingFlags.push(pendingFlag);
  };

  LankBoss.prototype.onFlagAppeared = function(e) {
    var foundExactMatch, i, j, matched, matchedType, pending, pendingFlag, ref, ref1, ref2, t1, t2;
    t1 = e.sprite.thang;
    pending = ((ref = this.pendingFlags) != null ? ref : []).slice();
    foundExactMatch = false;
    for (i = j = ref1 = pending.length - 1; j >= 0; i = j += -1) {
      pendingFlag = pending[i];
      t2 = pendingFlag.thang;
      matchedType = t1.color === t2.color && t1.team === t2.team;
      matched = matchedType && (foundExactMatch || Math.abs(t1.pos.x - t2.pos.x) < 0.00001 && Math.abs(t1.pos.y - t2.pos.y) < 0.00001);
      if (matched) {
        foundExactMatch = true;
        this.pendingFlags.splice(i, 1);
        this.removeLank(pendingFlag);
      }
    }
    if ((ref2 = e.sprite.sprite) != null) {
      ref2.cursor = this.flagCursorLank ? 'crosshair' : 'pointer';
    }
    return null;
  };

  LankBoss.prototype.onRemoveSelectedFlag = function(e) {
    var flagLank;
    flagLank = _.find([this.selectedLank].concat(this.lankArray), function(lank) {
      return lank && lank.thangType.get('name') === 'Flag' && lank.thang.team === me.team && (lank.thang.color === e.color || !e.color) && !lank.notOfThisWorld;
    });
    if (!flagLank) {
      return;
    }
    return Backbone.Mediator.publish('surface:remove-flag', {
      color: flagLank.thang.color
    });
  };

  LankBoss.prototype.updateSelection = function() {
    var ref, ref1, thangID;
    if (((ref = this.selectedLank) != null ? ref.thang : void 0) && (!this.selectedLank.thang.exists || !this.world.getThangByID(this.selectedLank.thang.id))) {
      thangID = this.selectedLank.thang.id;
      this.selectedLank = null;
      if ((ref1 = this.selectionMark) != null) {
        ref1.toggle(false);
      }
      this.willSelectThang = [thangID, null];
    }
    this.updateTarget();
    if (!this.selectionMark) {
      return;
    }
    if (this.selectedLank && (this.selectedLank.destroyed || !this.selectedLank.thang)) {
      this.selectedLank = null;
    }
    if (this.selectedLank && this.selectedLank.sprite.parent !== this.layerAdapters.Default.container) {
      this.selectionMark.setLayer(this.layerAdapters.Default);
    } else if (this.selectedLank) {
      this.selectionMark.setLayer(this.layerAdapters.Ground);
    }
    this.selectionMark.toggle(this.selectedLank != null);
    this.selectionMark.setLank(this.selectedLank);
    return this.selectionMark.update();
  };

  LankBoss.prototype.updateTarget = function() {
    var ref, target, targetPos, thang;
    if (!this.targetMark) {
      return;
    }
    thang = (ref = this.selectedLank) != null ? ref.thang : void 0;
    target = thang != null ? thang.target : void 0;
    targetPos = thang != null ? thang.targetPos : void 0;
    if (targetPos != null ? typeof targetPos.isZero === "function" ? targetPos.isZero() : void 0 : void 0) {
      targetPos = null;
    }
    this.targetMark.setLank(target ? this.lanks[target.id] : null);
    this.targetMark.toggle(this.targetMark.lank || targetPos);
    return this.targetMark.update(targetPos ? this.camera.worldToSurface(targetPos) : null);
  };

  return LankBoss;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/LankBoss.js.map
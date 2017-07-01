require.register("views/editor/level/thangs/ThangsTabView", function(exports, require, module) {
var AddThangsView, CocoCollection, CocoView, GameUIState, Level, LevelComponent, LevelComponents, LevelThangEditView, MOVE_MARGIN, MOVE_SPEED, Surface, Thang, ThangNode, ThangType, ThangTypeSearchCollection, ThangsFolderNode, ThangsTabView, isObjectID, overlappableThangTypeNames, thangs_template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

AddThangsView = require('./AddThangsView');

thangs_template = require('templates/editor/level/thangs-tab-view');

Level = require('models/Level');

ThangType = require('models/ThangType');

LevelComponent = require('models/LevelComponent');

CocoCollection = require('collections/CocoCollection');

isObjectID = require('models/CocoModel').isObjectID;

Surface = require('lib/surface/Surface');

Thang = require('lib/world/thang');

LevelThangEditView = require('./LevelThangEditView');

LevelComponents = require('collections/LevelComponents');

require('vendor/treema');

GameUIState = require('models/GameUIState');

MOVE_MARGIN = 0.15;

MOVE_SPEED = 13;

overlappableThangTypeNames = ['Torch', 'Chains', 'Bird', 'Cloud 1', 'Cloud 2', 'Cloud 3', 'Waterfall', 'Obstacle', 'Electrowall', 'Spike Walls'];

ThangTypeSearchCollection = (function(superClass) {
  extend(ThangTypeSearchCollection, superClass);

  function ThangTypeSearchCollection() {
    return ThangTypeSearchCollection.__super__.constructor.apply(this, arguments);
  }

  ThangTypeSearchCollection.prototype.url = '/db/thang.type?project=original,name,version,slug,kind,components,prerenderedSpriteSheetData';

  ThangTypeSearchCollection.prototype.model = ThangType;

  return ThangTypeSearchCollection;

})(CocoCollection);

module.exports = ThangsTabView = (function(superClass) {
  extend(ThangsTabView, superClass);

  ThangsTabView.prototype.id = 'thangs-tab-view';

  ThangsTabView.prototype.className = 'tab-pane active';

  ThangsTabView.prototype.template = thangs_template;

  ThangsTabView.prototype.subscriptions = {
    'surface:mouse-moved': 'onSurfaceMouseMoved',
    'surface:mouse-over': 'onSurfaceMouseOver',
    'surface:mouse-out': 'onSurfaceMouseOut',
    'editor:edit-level-thang': 'editThang',
    'editor:level-thang-edited': 'onLevelThangEdited',
    'editor:level-thang-done-editing': 'onLevelThangDoneEditing',
    'editor:view-switched': 'onViewSwitched',
    'sprite:dragged': 'onSpriteDragged',
    'sprite:mouse-up': 'onSpriteMouseUp',
    'sprite:double-clicked': 'onSpriteDoubleClicked',
    'surface:stage-mouse-down': 'onStageMouseDown',
    'surface:stage-mouse-up': 'onStageMouseUp',
    'editor:random-terrain-generated': 'onRandomTerrainGenerated'
  };

  ThangsTabView.prototype.events = {
    'click #extant-thangs-filter button': 'onFilterExtantThangs',
    'click #delete': 'onDeleteClicked',
    'click #duplicate': 'onDuplicateClicked',
    'click #thangs-container-toggle': 'toggleThangsContainer',
    'click #thangs-palette-toggle': 'toggleThangsPalette',
    'click #rotation-menu-item button': 'onClickRotationButton'
  };

  ThangsTabView.prototype.shortcuts = {
    'esc': 'selectAddThang',
    'delete, del, backspace': 'deleteSelectedExtantThang',
    'ctrl+z, ⌘+z': 'undo',
    'ctrl+shift+z, ⌘+shift+z': 'redo',
    'alt+c': 'toggleSelectedThangCollision',
    'left': function() {
      return this.moveSelectedThangBy(-1, 0);
    },
    'right': function() {
      return this.moveSelectedThangBy(1, 0);
    },
    'up': function() {
      return this.moveSelectedThangBy(0, 1);
    },
    'down': function() {
      return this.moveSelectedThangBy(0, -1);
    },
    'alt+left': function() {
      if (!key.shift) {
        return this.rotateSelectedThangTo(Math.PI);
      }
    },
    'alt+right': function() {
      if (!key.shift) {
        return this.rotateSelectedThangTo(0);
      }
    },
    'alt+up': function() {
      return this.rotateSelectedThangTo(-Math.PI / 2);
    },
    'alt+down': function() {
      return this.rotateSelectedThangTo(Math.PI / 2);
    },
    'alt+shift+left': function() {
      return this.rotateSelectedThangBy(Math.PI / 16);
    },
    'alt+shift+right': function() {
      return this.rotateSelectedThangBy(-Math.PI / 16);
    },
    'shift+left': function() {
      return this.resizeSelectedThangBy(-1, 0);
    },
    'shift+right': function() {
      return this.resizeSelectedThangBy(1, 0);
    },
    'shift+up': function() {
      return this.resizeSelectedThangBy(0, 1);
    },
    'shift+down': function() {
      return this.resizeSelectedThangBy(0, -1);
    }
  };

  function ThangsTabView(options) {
    this.onTreemaThangDoubleClicked = bind(this.onTreemaThangDoubleClicked, this);
    this.onTreemaThangSelected = bind(this.onTreemaThangSelected, this);
    this.onThangsChanged = bind(this.onThangsChanged, this);
    this.deleteSelectedExtantThang = bind(this.deleteSelectedExtantThang, this);
    this.moveSide = bind(this.moveSide, this);
    this.selectAddThang = bind(this.selectAddThang, this);
    ThangsTabView.__super__.constructor.call(this, options);
    this.world = options.world;
    this.gameUIState = new GameUIState();
    this.listenTo(this.gameUIState, 'sprite:mouse-down', this.onSpriteMouseDown);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-move', this.onStageMouseMove);
    this.listenTo(this.gameUIState, 'change:selected', this.onChangeSelected);
    this.thangTypes = this.supermodel.loadCollection(new ThangTypeSearchCollection(), 'thangs').model;
    this.componentCollection = new LevelComponents([], {
      saveBackups: true
    });
    this.supermodel.trackRequest(this.componentCollection.fetch());
    this.listenToOnce(this.componentCollection, 'sync', function() {
      var component, i, len, ref, results;
      ref = this.componentCollection.models;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        component = ref[i];
        component.url = "/db/level.component/" + (component.get('original')) + "/version/" + (component.get('version').major);
        results.push(this.supermodel.registerModel(component));
      }
      return results;
    });
    this.level = options.level;
    this.onThangsChanged = _.debounce(this.onThangsChanged);
    $(document).bind('contextmenu', this.preventDefaultContextMenu);
  }

  ThangsTabView.prototype.getRenderData = function(context) {
    var group, groupMap, groupName, groups, i, j, k, len, len1, len2, name1, ref, ref1, someThangTypes, thangType, thangTypes;
    if (context == null) {
      context = {};
    }
    context = ThangsTabView.__super__.getRenderData.call(this, context);
    if (!this.supermodel.finished()) {
      return context;
    }
    ref = this.thangTypes.models;
    for (i = 0, len = ref.length; i < len; i++) {
      thangType = ref[i];
      thangType.notInLevel = true;
    }
    thangTypes = (function() {
      var j, len1, ref1, results;
      ref1 = this.supermodel.getModels(ThangType);
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        thangType = ref1[j];
        results.push(thangType.attributes);
      }
      return results;
    }).call(this);
    thangTypes = _.uniq(thangTypes, false, 'original');
    thangTypes = _.reject(thangTypes, function(tt) {
      var ref1;
      return (ref1 = tt.kind) === 'Mark' || ref1 === (void 0);
    });
    groupMap = {};
    for (j = 0, len1 = thangTypes.length; j < len1; j++) {
      thangType = thangTypes[j];
      if (groupMap[name1 = thangType.kind] == null) {
        groupMap[name1] = [];
      }
      groupMap[thangType.kind].push(thangType);
    }
    groups = [];
    ref1 = Object.keys(groupMap).sort();
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      groupName = ref1[k];
      someThangTypes = groupMap[groupName];
      someThangTypes = _.sortBy(someThangTypes, 'name');
      group = {
        name: groupName,
        thangs: someThangTypes
      };
      groups.push(group);
    }
    context.thangTypes = thangTypes;
    context.groups = groups;
    return context;
  };

  ThangsTabView.prototype.undo = function(e) {
    if (!this.editThangView) {
      return this.thangsTreema.undo();
    } else {
      return this.editThangView.undo();
    }
  };

  ThangsTabView.prototype.redo = function(e) {
    if (!this.editThangView) {
      return this.thangsTreema.redo();
    } else {
      return this.editThangView.redo();
    }
  };

  ThangsTabView.prototype.afterRender = function() {
    ThangsTabView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    $('.tab-content').mousedown(this.selectAddThang);
    $('#thangs-list').bind('mousewheel', this.preventBodyScrollingInThangList);
    this.$el.find('#extant-thangs-filter button:first').button('toggle');
    $(window).on('resize', this.onWindowResize);
    this.addThangsView = this.insertSubView(new AddThangsView({
      world: this.world
    }));
    this.buildInterface();
    if (_.keys(this.thangsTreema.data).length) {
      return this.$el.find('#canvas-overlay').css('display', 'none');
    }
  };

  ThangsTabView.prototype.onFilterExtantThangs = function(e) {
    var button, val;
    this.$el.find('#extant-thangs-filter button.active').button('toggle');
    button = $(e.target).closest('button');
    button.button('toggle');
    val = button.val();
    if (this.lastHideClass) {
      this.thangsTreema.$el.removeClass(this.lastHideClass);
    }
    if (val) {
      return this.thangsTreema.$el.addClass(this.lastHideClass = "hide-except-" + val);
    }
  };

  ThangsTabView.prototype.preventBodyScrollingInThangList = function(e) {
    this.scrollTop += (e.deltaY < 0 ? 1 : -1) * 30;
    return e.preventDefault();
  };

  ThangsTabView.prototype.buildInterface = function(e) {
    var data, oldHeight, ref, schema, thangsHeaderHeight, thangsObject, treemaOptions;
    if (e) {
      this.level = e.level;
    }
    data = $.extend(true, [], (ref = this.level.attributes.thangs) != null ? ref : []);
    thangsObject = this.groupThangs(data);
    schema = {
      type: 'object',
      format: 'thangs-folder',
      additionalProperties: {
        anyOf: [
          {
            type: 'object',
            format: 'thang',
            required: ['thangType', 'id']
          }, {
            $ref: '#'
          }
        ]
      }
    };
    treemaOptions = {
      schema: schema,
      data: thangsObject,
      skipValidation: true,
      supermodel: this.supermodel,
      callbacks: {
        change: this.onThangsChanged,
        select: this.onTreemaThangSelected,
        dblclick: this.onTreemaThangDoubleClicked
      },
      readOnly: true,
      nodeClasses: {
        thang: ThangNode,
        'thangs-folder': ThangsFolderNode
      },
      world: this.world
    };
    this.thangsTreema = this.$el.find('#thangs-treema').treema(treemaOptions);
    this.thangsTreema.build();
    this.thangsTreema.open();
    this.openSmallerFolders(this.thangsTreema);
    this.onThangsChanged();
    this.initSurface();
    thangsHeaderHeight = $('#thangs-header').height();
    oldHeight = $('#thangs-list').height();
    $('#thangs-list').height(oldHeight - thangsHeaderHeight);
    if (data != null ? data.length : void 0) {
      return this.$el.find('.generate-terrain-button').hide();
    }
  };

  ThangsTabView.prototype.openSmallerFolders = function(folderTreema) {
    var child, children, i, len, results;
    children = _.values(folderTreema.childrenTreemas);
    results = [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child.data.thangType) {
        continue;
      }
      if (_.keys(child.data).length < 5) {
        child.open();
        results.push(this.openSmallerFolders(child));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangsTabView.prototype.initSurface = function() {
    var normalCanvas, webGLCanvas;
    webGLCanvas = $('canvas#webgl-surface', this.$el);
    normalCanvas = $('canvas#normal-surface', this.$el);
    this.surface = new Surface(this.world, normalCanvas, webGLCanvas, {
      paths: false,
      coords: true,
      grid: true,
      navigateToSelection: false,
      thangTypes: this.supermodel.getModels(ThangType),
      showInvisible: true,
      frameRate: 15,
      levelType: this.level.get('type', true),
      gameUIState: this.gameUIState,
      handleEvents: false
    });
    this.surface.playing = false;
    this.surface.setWorld(this.world);
    this.surface.lankBoss.suppressSelectionSounds = true;
    return this.centerCamera();
  };

  ThangsTabView.prototype.centerCamera = function() {
    var bottom, center, height, left, ref, ref1, right, sup, top, width, zoom;
    ref = this.world.size(), width = ref[0], height = ref[1];
    width = Math.max(width, 80);
    height = Math.max(height, 68);
    ref1 = this.world.getBounds(), left = ref1.left, top = ref1.top, right = ref1.right, bottom = ref1.bottom;
    center = {
      x: left + width / 2,
      y: bottom + height / 2
    };
    sup = this.surface.camera.worldToSurface(center);
    zoom = 0.94 * 92.4 / width;
    return this.surface.camera.zoomTo(sup, zoom, 0);
  };

  ThangsTabView.prototype.destroy = function() {
    var ref, ref1;
    this.selectAddThangType(null);
    if ((ref = this.surface) != null) {
      ref.destroy();
    }
    $(window).off('resize', this.onWindowResize);
    $(document).unbind('contextmenu', this.preventDefaultContextMenu);
    if ((ref1 = this.thangsTreema) != null) {
      ref1.destroy();
    }
    return ThangsTabView.__super__.destroy.call(this);
  };

  ThangsTabView.prototype.onViewSwitched = function(e) {
    var ref, ref1;
    this.selectAddThang(null, true);
    return (ref = this.surface) != null ? (ref1 = ref.lankBoss) != null ? ref1.selectLank(null, null) : void 0 : void 0;
  };

  ThangsTabView.prototype.onStageMouseDown = function(e) {
    var ref;
    this.dragged = 0;
    this.willUnselectSprite = false;
    this.gameUIState.set('canDragCamera', true);
    if (((ref = this.addThangLank) != null ? ref.thangType.get('kind') : void 0) === 'Wall') {
      this.paintingWalls = true;
      return this.gameUIState.set('canDragCamera', false);
    } else if (this.addThangLank) {
      return this.addThang(this.addThangType, this.addThangLank.thang.pos);
    } else if (e.onBackground) {
      return this.gameUIState.set('selected', []);
    }
  };

  ThangsTabView.prototype.onStageMouseMove = function(e) {
    return this.dragged += 1;
  };

  ThangsTabView.prototype.onStageMouseUp = function(e) {
    this.paintingWalls = false;
    return $('#contextmenu').hide();
  };

  ThangsTabView.prototype.onSpriteMouseDown = function(e) {
    var alreadySelected, lastSelected, nativeEvent, ref, selected;
    nativeEvent = e.originalEvent.nativeEvent;
    selected = [];
    if (nativeEvent.metaKey || nativeEvent.ctrlKey) {
      selected = _.clone(this.gameUIState.get('selected'));
    }
    if ((ref = e.thang) != null ? ref.isSelectable : void 0) {
      alreadySelected = _.find(selected, function(s) {
        return s.thang === e.thang;
      });
      if (alreadySelected) {
        this.willUnselectSprite = true;
        selected = _.without(selected, alreadySelected);
      }
      selected.push({
        thang: e.thang,
        sprite: e.sprite,
        spellName: e.spellName
      });
    }
    if (_.any(selected) && key.alt) {
      lastSelected = _.last(selected);
      this.selectAddThangType(lastSelected.thang.spriteName, lastSelected.thang);
      selected = [];
    }
    this.gameUIState.set('selected', selected);
    if (_.any(selected)) {
      return this.gameUIState.set('canDragCamera', false);
    }
  };

  ThangsTabView.prototype.onSpriteDragged = function(e) {
    var cap, h, i, id, j, lastSelected, len, len1, newPos, posAfter, posBefore, ref, ref1, ref2, selected, sidebarWidth, sidebarWidths, singleSelected, stageX, stageY, w, wop, xDiff, yDiff;
    selected = this.gameUIState.get('selected');
    if (!(_.any(selected) && this.dragged > 10)) {
      return;
    }
    this.willUnselectSprite = false;
    ref = e.originalEvent, stageX = ref.stageX, stageY = ref.stageY;
    lastSelected = _.last(selected);
    cap = this.surface.camera.screenToCanvas({
      x: stageX,
      y: stageY
    });
    wop = this.surface.camera.canvasToWorld(cap);
    wop.z = lastSelected.thang.depth / 2;
    posBefore = _.clone(lastSelected.thang.pos);
    this.adjustThangPos(lastSelected.sprite, lastSelected.thang, wop);
    posAfter = lastSelected.thang.pos;
    xDiff = posAfter.x - posBefore.x;
    yDiff = posAfter.y - posBefore.y;
    if (xDiff || yDiff) {
      ref1 = selected.slice(0, selected.length - 1);
      for (i = 0, len = ref1.length; i < len; i++) {
        singleSelected = ref1[i];
        newPos = {
          x: singleSelected.thang.pos.x + xDiff,
          y: singleSelected.thang.pos.y + yDiff
        };
        this.adjustThangPos(singleSelected.sprite, singleSelected.thang, newPos);
      }
    }
    ref2 = [this.surface.camera.canvasWidth, this.surface.camera.canvasHeight], w = ref2[0], h = ref2[1];
    sidebarWidths = (function() {
      var j, len1, ref3, results;
      ref3 = ['#all-thangs', '#add-thangs-view'];
      results = [];
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        id = ref3[j];
        results.push(this.$el.find(id).hasClass('hide') ? 0 : this.$el.find(id).outerWidth() / this.surface.camera.canvasScaleFactorX);
      }
      return results;
    }).call(this);
    for (j = 0, len1 = sidebarWidths.length; j < len1; j++) {
      sidebarWidth = sidebarWidths[j];
      w -= sidebarWidth;
    }
    cap.x -= sidebarWidths[0];
    return this.calculateMovement(cap.x / w, cap.y / h, w / h);
  };

  ThangsTabView.prototype.onSpriteMouseUp = function(e) {
    var clickedSprite, i, len, path, physical, pos, ref, selected, singleSelected, thang;
    selected = this.gameUIState.get('selected');
    if (e.originalEvent.nativeEvent.button === 2 && _.any(selected)) {
      this.onSpriteContextMenu(e);
    }
    if (this.movementInterval != null) {
      clearInterval(this.movementInterval);
    }
    this.movementInterval = null;
    if (!_.any(selected)) {
      return;
    }
    for (i = 0, len = selected.length; i < len; i++) {
      singleSelected = selected[i];
      pos = singleSelected.thang.pos;
      thang = _.find((ref = this.level.get('thangs')) != null ? ref : [], {
        id: singleSelected.thang.id
      });
      path = (this.pathForThang(thang)) + "/components/original=" + LevelComponent.PhysicalID;
      physical = this.thangsTreema.get(path);
      if (!physical || (physical.config.pos.x === pos.x && physical.config.pos.y === pos.y)) {
        continue;
      }
      this.thangsTreema.set(path + '/config/pos', {
        x: pos.x,
        y: pos.y,
        z: pos.z
      });
    }
    if (this.willUnselectSprite) {
      clickedSprite = _.find(selected, {
        sprite: e.sprite
      });
      return this.gameUIState.set('selected', _.without(selected, clickedSprite));
    }
  };

  ThangsTabView.prototype.onSpriteDoubleClicked = function(e) {
    if (this.dragged > 10) {
      return;
    }
    if (!e.thang) {
      return;
    }
    return this.editThang({
      thangID: e.thang.id
    });
  };

  ThangsTabView.prototype.onRandomTerrainGenerated = function(e) {
    var i, len, listening, nonRandomThangs, ref, thang;
    this.thangsBatch = [];
    this.hush = true;
    nonRandomThangs = (function() {
      var i, len, ref, results;
      ref = this.flattenThangs(this.thangsTreema.data);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        thang = ref[i];
        if (!/Random/.test(thang.id)) {
          results.push(thang);
        }
      }
      return results;
    }).call(this);
    this.thangsTreema.set('', this.groupThangs(nonRandomThangs));
    listening = {};
    ref = e.thangs;
    for (i = 0, len = ref.length; i < len; i++) {
      thang = ref[i];
      this.selectAddThangType(thang.id);
      if (!(this.addThangType.isFullyLoaded() || listening[this.addThangType.cid])) {
        listening[this.addThangType.cid] = true;
        this.listenToOnce(this.addThangType, 'build-complete', this.onThangsChanged);
      }
      this.addThang(this.addThangType, thang.pos, true);
    }
    this.hush = false;
    this.onThangsChanged();
    return this.selectAddThangType(null);
  };

  ThangsTabView.prototype.onChangeSelected = function(gameUIState, selected) {
    var previousSprite, ref, ref1, ref2, sprite, thang;
    previousSprite = (ref = gameUIState.previousAttributes()) != null ? (ref1 = ref.selected) != null ? ref1.sprite : void 0 : void 0;
    sprite = selected != null ? selected.sprite : void 0;
    thang = selected != null ? selected.thang : void 0;
    if (previousSprite !== sprite) {
      if (previousSprite != null) {
        if (typeof previousSprite.setNameLabel === "function") {
          previousSprite.setNameLabel(null);
        }
      }
    }
    if (thang && !(this.addThangLank && (ref2 = this.addThangType.get('name'), indexOf.call(overlappableThangTypeNames, ref2) >= 0))) {
      this.selectAddThang(null, true);
      this.selectedExtantThangClickTime = new Date();
      sprite.setNameLabel(sprite.thangType.get('name') + ': ' + thang.id);
      sprite.updateLabels();
      return sprite.updateMarks();
    }
  };

  ThangsTabView.prototype.justAdded = function() {
    return this.lastAddTime && (new Date() - this.lastAddTime) < 150;
  };

  ThangsTabView.prototype.selectAddThang = function(e, forceDeselect) {
    var ref, target, wasSelected;
    if (forceDeselect == null) {
      forceDeselect = false;
    }
    if ((e != null) && $(e.target).closest('#thang-search').length) {
      return;
    }
    if (!(((e != null) && $(e.target).closest('#thangs-tab-view').length) || key.isPressed('esc') || forceDeselect)) {
      return;
    }
    if (e) {
      target = $(e.target);
    } else {
      target = this.$el.find('.add-thangs-palette');
    }
    if (target.attr('id') === 'webgl-surface') {
      return true;
    }
    target = target.closest('.add-thang-palette-icon');
    wasSelected = target.hasClass('selected');
    this.$el.find('.add-thangs-palette .add-thang-palette-icon.selected').removeClass('selected');
    if (!(key.alt || key.meta)) {
      this.selectAddThangType(wasSelected ? null : target.attr('data-thang-type'));
    }
    if ((ref = this.addThangLank) != null) {
      if (typeof ref.playSound === "function") {
        ref.playSound('selected');
      }
    }
    if (this.addThangType) {
      return target.addClass('selected');
    }
  };

  ThangsTabView.prototype.moveAddThangSelection = function(direction) {
    var icons, nextSelectedIndex, selectedIcon, selectedIndex;
    if (!this.addThangType) {
      return;
    }
    icons = $('.add-thangs-palette .add-thang-palette-icon');
    selectedIcon = icons.filter('.selected');
    selectedIndex = icons.index(selectedIcon);
    nextSelectedIndex = (selectedIndex + direction + icons.length) % icons.length;
    return this.selectAddThang({
      target: icons[nextSelectedIndex]
    });
  };

  ThangsTabView.prototype.selectAddThangType = function(type, cloneSourceThang) {
    var pos, ref, ref1, thang;
    this.cloneSourceThang = cloneSourceThang;
    if (_.isString(type)) {
      type = _.find(this.supermodel.getModels(ThangType), function(m) {
        return m.get('name') === type;
      });
    }
    pos = (ref = this.addThangLank) != null ? ref.thang.pos : void 0;
    if (this.addThangLank) {
      this.surface.lankBoss.removeLank(this.addThangLank);
    }
    this.addThangType = type;
    if (this.addThangType) {
      this.surface.lankBoss.reallyStopMoving = true;
      thang = this.createAddThang();
      this.addThangLank = this.surface.lankBoss.addThangToLanks(thang, this.surface.lankBoss.layerAdapters['Floating']);
      this.addThangLank.notOfThisWorld = true;
      this.addThangLank.sprite.alpha = 0.75;
      if (pos == null) {
        pos = {
          x: Math.round(this.world.width / 2),
          y: Math.round(this.world.height / 2)
        };
      }
      return this.adjustThangPos(this.addThangLank, thang, pos);
    } else {
      this.addThangLank = null;
      return (ref1 = this.surface) != null ? ref1.lankBoss.reallyStopMoving = false : void 0;
    }
  };

  ThangsTabView.prototype.createEssentialComponents = function(defaultComponents) {
    var physicalConfig, physicalOriginal, ref, ref1, ref2;
    physicalConfig = {
      pos: {
        x: 10,
        y: 10,
        z: 1
      }
    };
    if (physicalOriginal = _.find(defaultComponents != null ? defaultComponents : [], {
      original: LevelComponent.PhysicalID
    })) {
      physicalConfig.pos.z = (ref = (ref1 = physicalOriginal.config) != null ? (ref2 = ref1.pos) != null ? ref2.z : void 0 : void 0) != null ? ref : 1;
    }
    return [
      {
        original: LevelComponent.ExistsID,
        majorVersion: 0,
        config: {}
      }, {
        original: LevelComponent.PhysicalID,
        majorVersion: 0,
        config: physicalConfig
      }
    ];
  };

  ThangsTabView.prototype.createAddThang = function() {
    var allComponents, comp, componentClass, components, i, lc, len, mockThang, raw, rawComponents, ref, ref1, ref2, thang;
    allComponents = (function() {
      var i, len, ref, results;
      ref = this.supermodel.getModels(LevelComponent);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        lc = ref[i];
        results.push(lc.attributes);
      }
      return results;
    }).call(this);
    rawComponents = (ref = this.addThangType.get('components')) != null ? ref : [];
    if (!rawComponents.length) {
      rawComponents = this.createEssentialComponents();
    }
    mockThang = {
      components: rawComponents
    };
    this.level.sortThangComponents([mockThang], allComponents);
    components = [];
    ref1 = mockThang.components;
    for (i = 0, len = ref1.length; i < len; i++) {
      raw = ref1[i];
      comp = _.find(allComponents, {
        original: raw.original
      });
      if ((ref2 = comp.name) === 'Selectable' || ref2 === 'Attackable') {
        continue;
      }
      componentClass = this.world.loadClassFromCode(comp.js, comp.name, 'component');
      components.push([componentClass, raw.config]);
    }
    thang = new Thang(this.world, this.addThangType.get('name'), 'Add Thang Phantom');
    thang.addComponents.apply(thang, components);
    return thang;
  };

  ThangsTabView.prototype.adjustThangPos = function(sprite, thang, pos) {
    var ref, ref1, ref2, ref3, ref4, ref5, snap;
    if (key.shift) {
      pos.x = Math.round(pos.x);
      pos.y = Math.round(pos.y);
    } else {
      snap = (sprite != null ? (ref = sprite.data) != null ? ref.snap : void 0 : void 0) || (sprite != null ? (ref1 = sprite.thangType) != null ? ref1.get('snap') : void 0 : void 0) || {
        x: 0.01,
        y: 0.01
      };
      pos.x = Math.round((pos.x - ((ref2 = thang.width) != null ? ref2 : 1) / 2) / snap.x) * snap.x + ((ref3 = thang.width) != null ? ref3 : 1) / 2;
      pos.y = Math.round((pos.y - ((ref4 = thang.height) != null ? ref4 : 1) / 2) / snap.y) * snap.y + ((ref5 = thang.height) != null ? ref5 : 1) / 2;
    }
    pos.z = thang.depth / 2;
    thang.pos = pos;
    thang.stateChanged = true;
    return this.surface.lankBoss.update(true);
  };

  ThangsTabView.prototype.onSurfaceMouseMoved = function(e) {
    var wop;
    if (!this.addThangLank) {
      return;
    }
    wop = this.surface.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.z = 0.5;
    this.adjustThangPos(this.addThangLank, this.addThangLank.thang, wop);
    if (this.paintingWalls) {
      if (!_.find(this.surface.lankBoss.lankArray, ((function(_this) {
        return function(lank) {
          return lank.thangType.get('kind') === 'Wall' && Math.abs(lank.thang.pos.x - _this.addThangLank.thang.pos.x) < 2 && Math.abs(lank.thang.pos.y - _this.addThangLank.thang.pos.y) < 2 && lank !== _this.addThangLank;
        };
      })(this)))) {
        this.addThang(this.addThangType, this.addThangLank.thang.pos);
        this.lastAddTime = new Date();
        this.paintedWalls = true;
      }
    }
    return null;
  };

  ThangsTabView.prototype.onSurfaceMouseOver = function(e) {
    if (!this.addThangLank) {
      return;
    }
    return this.addThangLank.sprite.visible = true;
  };

  ThangsTabView.prototype.onSurfaceMouseOut = function(e) {
    if (!this.addThangLank) {
      return;
    }
    return this.addThangLank.sprite.visible = false;
  };

  ThangsTabView.prototype.calculateMovement = function(pctX, pctY, widthHeightRatio) {
    var MOVE_TOP_MARGIN, diff;
    MOVE_TOP_MARGIN = 1.0 - MOVE_MARGIN;
    if ((MOVE_TOP_MARGIN > pctX && pctX > MOVE_MARGIN) && (MOVE_TOP_MARGIN > pctY && pctY > MOVE_MARGIN)) {
      if (this.movementInterval != null) {
        clearInterval(this.movementInterval);
      }
      this.movementInterval = null;
      return this.moveLatitude = this.moveLongitude = this.speed = 0;
    }
    diff = MOVE_MARGIN * 2;
    this.speed = Math.max(Math.abs(pctX - 0.5), Math.abs(pctY - 0.5)) * 2;
    this.speed -= 1.0 - diff;
    this.speed *= 1.0 / diff;
    this.speed *= MOVE_SPEED;
    this.moveLatitude = pctX * 2 - 1;
    this.moveLongitude = pctY * 2 - 1;
    if (widthHeightRatio > 1.0) {
      this.moveLongitude /= widthHeightRatio;
    }
    if (widthHeightRatio < 1.0) {
      this.moveLatitude *= widthHeightRatio;
    }
    if (this.movementInterval == null) {
      return this.movementInterval = setInterval(this.moveSide, 16);
    }
  };

  ThangsTabView.prototype.moveSide = function() {
    var c, p;
    if (!this.speed) {
      return;
    }
    c = this.surface.camera;
    p = {
      x: c.target.x + this.moveLatitude * this.speed / c.zoom,
      y: c.target.y + this.moveLongitude * this.speed / c.zoom
    };
    return c.zoomTo(p, c.zoom, 0);
  };

  ThangsTabView.prototype.deleteSelectedExtantThang = function(e) {
    var i, len, selected, singleSelected, thang;
    if ($(e.target).hasClass('treema-node')) {
      return;
    }
    selected = this.gameUIState.get('selected');
    if (!_.any(selected)) {
      return;
    }
    for (i = 0, len = selected.length; i < len; i++) {
      singleSelected = selected[i];
      thang = this.getThangByID(singleSelected.thang.id);
      this.thangsTreema["delete"](this.pathForThang(thang));
      this.deleteEmptyTreema(thang);
      Thang.resetThangIDs();
    }
    return this.gameUIState.set('selected', []);
  };

  ThangsTabView.prototype.deleteEmptyTreema = function(thang) {
    var children, folderPath, thangKind, thangName, thangType;
    thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
    children = this.thangsTreema.childrenTreemas;
    thangKind = children[thangType.get('kind', true)].data;
    thangName = thangKind[thangType.get('name', true)];
    if (Object.keys(thangName).length === 0) {
      folderPath = [thangType.get('kind', true), thangType.get('name', true)].join('/');
      this.thangsTreema["delete"](folderPath);
      if (Object.keys(thangKind).length === 0) {
        folderPath = [thangType.get('kind', true)].join('/');
        return this.thangsTreema["delete"](folderPath);
      }
    }
  };

  ThangsTabView.prototype.groupThangs = function(thangs) {
    var grouped, i, index, j, key, len, len1, obj, path, thang;
    grouped = {};
    for (index = i = 0, len = thangs.length; i < len; index = ++i) {
      thang = thangs[index];
      path = this.folderForThang(thang);
      obj = grouped;
      for (j = 0, len1 = path.length; j < len1; j++) {
        key = path[j];
        if (obj[key] == null) {
          obj[key] = {};
        }
        obj = obj[key];
      }
      obj[thang.id] = thang;
      thang.index = index;
    }
    return grouped;
  };

  ThangsTabView.prototype.folderForThang = function(thang) {
    var thangType;
    thangType = this.supermodel.getModelByOriginal(ThangType, thang.thangType);
    if (!thangType.get('kind', true)) {
      console.error('uhh, we had kind', thangType.get('kind', true), 'for', thangType);
    }
    return [thangType.get('kind', true), thangType.get('name', true)];
  };

  ThangsTabView.prototype.pathForThang = function(thang) {
    var folder;
    folder = this.folderForThang(thang);
    folder.push(thang.id);
    return folder.join('/');
  };

  ThangsTabView.prototype.flattenThangs = function(thangs) {
    var flattened, key, value;
    flattened = [];
    for (key in thangs) {
      value = thangs[key];
      if ((value.id != null) && value.thangType) {
        flattened.push(value);
      } else {
        flattened = flattened.concat(this.flattenThangs(value));
      }
    }
    return flattened;
  };

  ThangsTabView.prototype.populateFoldersForThang = function(thang) {
    var i, len, prefix, results, segment, thangFolder;
    thangFolder = this.folderForThang(thang);
    prefix = '';
    results = [];
    for (i = 0, len = thangFolder.length; i < len; i++) {
      segment = thangFolder[i];
      if (prefix) {
        prefix += '/';
      }
      prefix += segment;
      if (!this.thangsTreema.get(prefix)) {
        results.push(this.thangsTreema.set(prefix, {}));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ThangsTabView.prototype.onThangsChanged = function(skipSerialization) {
    var error, error1, i, j, k, len, len1, len2, ref, ref1, ref2, selected, serializedLevel, singleSelected, sprite, thang, thangs;
    if (this.hush) {
      return;
    }
    thangs = this.flattenThangs(this.thangsTreema.data);
    thangs = $.extend(true, [], thangs);
    thangs = _.sortBy(thangs, 'index');
    for (i = 0, len = thangs.length; i < len; i++) {
      thang = thangs[i];
      delete thang.index;
    }
    this.level.set('thangs', thangs);
    if (this.editThangView) {
      return;
    }
    if (skipSerialization) {
      return;
    }
    serializedLevel = this.level.serialize({
      supermodel: this.supermodel,
      session: null,
      otherSession: null,
      headless: false,
      sessionless: true,
      cached: true
    });
    try {
      this.world.loadFromLevel(serializedLevel, false);
    } catch (error1) {
      error = error1;
      console.error('Catastrophic error loading the level:', error);
    }
    ref = this.world.thangs;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      thang = ref[j];
      thang.isSelectable = !thang.isLand;
    }
    if ((ref1 = this.surface) != null) {
      ref1.setWorld(this.world);
    }
    if ((ref2 = this.surface) != null) {
      ref2.lankBoss.cachedObstacles = false;
    }
    if (this.addThangType) {
      this.selectAddThangType(this.addThangType, this.cloneSourceThang);
    }
    selected = this.gameUIState.get('selected');
    if (_.any(selected)) {
      for (k = 0, len2 = selected.length; k < len2; k++) {
        singleSelected = selected[k];
        sprite = this.surface.lankBoss.lanks[singleSelected.thang.id];
        if (sprite) {
          sprite.updateMarks();
          singleSelected.sprite = sprite;
          singleSelected.thang = sprite.thang;
        }
      }
    }
    return Backbone.Mediator.publish('editor:thangs-edited', {
      thangs: this.world.thangs
    });
  };

  ThangsTabView.prototype.onTreemaThangSelected = function(e, selectedTreemas) {
    var lank, lanks, node, selected, selectedThangTreemas, thangID, thangIDs;
    selectedThangTreemas = _.filter(selectedTreemas, function(t) {
      return t instanceof ThangNode;
    });
    thangIDs = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = selectedThangTreemas.length; i < len; i++) {
        node = selectedThangTreemas[i];
        results.push(node.data.id);
      }
      return results;
    })();
    lanks = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = thangIDs.length; i < len; i++) {
        thangID = thangIDs[i];
        if (thangID) {
          results.push(this.surface.lankBoss.lanks[thangID]);
        }
      }
      return results;
    }).call(this);
    selected = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = lanks.length; i < len; i++) {
        lank = lanks[i];
        if (lank) {
          results.push({
            thang: lank.thang,
            sprite: lank
          });
        }
      }
      return results;
    })();
    return this.gameUIState.set('selected', selected);
  };

  ThangsTabView.prototype.onTreemaThangDoubleClicked = function(e, treema) {
    var id, nativeEvent, ref;
    nativeEvent = e.originalEvent.nativeEvent;
    if (nativeEvent && (nativeEvent.ctrlKey || nativeEvent.metaKey)) {
      return;
    }
    id = treema != null ? (ref = treema.data) != null ? ref.id : void 0 : void 0;
    if (id) {
      return this.editThang({
        thangID: id
      });
    }
  };

  ThangsTabView.prototype.getThangByID = function(id) {
    var ref;
    return _.find((ref = this.level.get('thangs')) != null ? ref : [], {
      id: id
    });
  };

  ThangsTabView.prototype.addThang = function(thangType, pos, batchInsert) {
    var components, physical, ref, thang, thangID;
    if (batchInsert == null) {
      batchInsert = false;
    }
    this.$el.find('.generate-terrain-button').hide();
    if (batchInsert) {
      if (thangType.get('name') === 'Hero Placeholder') {
        thangID = 'Hero Placeholder';
        if (!this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev') || this.getThangByID(thangID)) {
          return;
        }
      } else {
        thangID = "Random " + (thangType.get('name')) + " " + this.thangsBatch.length;
      }
    } else {
      while (!(thangID && !this.getThangByID(thangID))) {
        thangID = Thang.nextID(thangType.get('name'), this.world);
      }
    }
    if (this.cloneSourceThang) {
      components = _.cloneDeep(this.getThangByID(this.cloneSourceThang.id).components);
    } else if (this.level.isType('hero', 'hero-ladder', 'hero-coop', 'course', 'course-ladder', 'game-dev', 'web-dev')) {
      components = [];
    } else {
      components = _.cloneDeep((ref = thangType.get('components')) != null ? ref : []);
    }
    if (!components.length) {
      components = this.createEssentialComponents(thangType.get('components'));
    }
    physical = _.find(components, function(c) {
      var ref1;
      return ((ref1 = c.config) != null ? ref1.pos : void 0) != null;
    });
    if (physical) {
      physical.config.pos = {
        x: pos.x,
        y: pos.y,
        z: physical.config.pos.z
      };
    }
    thang = {
      thangType: thangType.get('original'),
      id: thangID,
      components: components
    };
    if (batchInsert) {
      this.thangsBatch.push(thang);
    }
    this.populateFoldersForThang(thang);
    return this.thangsTreema.set(this.pathForThang(thang), thang);
  };

  ThangsTabView.prototype.editThang = function(e) {
    var thangData;
    if (e.target) {
      thangData = $(e.target).data('thang-data');
    } else {
      thangData = this.getThangByID(e.thangID);
    }
    if (!thangData) {
      return;
    }
    this.editThangView = new LevelThangEditView({
      thangData: thangData,
      level: this.level,
      world: this.world,
      supermodel: this.supermodel,
      oldPath: this.pathForThang(thangData)
    });
    this.insertSubView(this.editThangView);
    this.$el.find('>').hide();
    this.editThangView.$el.show();
    return Backbone.Mediator.publish('editor:view-switched', {});
  };

  ThangsTabView.prototype.onLevelThangDoneEditing = function(e) {
    this.removeSubView(this.editThangView);
    this.editThangView = null;
    this.updateEditedThang(e.thangData, e.oldPath);
    return this.$el.find('>').show();
  };

  ThangsTabView.prototype.onLevelThangEdited = function(e) {
    return this.updateEditedThang(e.thangData, e.oldPath);
  };

  ThangsTabView.prototype.updateEditedThang = function(newThang, oldPath) {
    this.hush = true;
    this.thangsTreema["delete"](oldPath);
    this.populateFoldersForThang(newThang);
    this.thangsTreema.set(this.pathForThang(newThang), newThang);
    this.hush = false;
    return this.onThangsChanged();
  };

  ThangsTabView.prototype.preventDefaultContextMenu = function(e) {
    if (!$(e.target).closest('#canvas-wrapper').length) {
      return;
    }
    return e.preventDefault();
  };

  ThangsTabView.prototype.onSpriteContextMenu = function(e) {
    var clientX, clientY, ref;
    ref = e.originalEvent.nativeEvent, clientX = ref.clientX, clientY = ref.clientY;
    if (this.addThangType) {
      $('#duplicate a').html($.i18n.t('editor.stop_duplicate'));
    } else {
      $('#duplicate a').html($.i18n.t('editor.duplicate'));
    }
    $('#contextmenu').css({
      position: 'fixed',
      left: clientX,
      top: clientY
    });
    return $('#contextmenu').show();
  };

  ThangsTabView.prototype.onDeleteClicked = function(e) {
    $('#contextmenu').hide();
    return this.deleteSelectedExtantThang(e);
  };

  ThangsTabView.prototype.onDuplicateClicked = function(e) {
    var selected;
    $('#contextmenu').hide();
    selected = _.last(this.gameUIState.get('selected'));
    return this.selectAddThangType(selected.thang.spriteName, selected.thang);
  };

  ThangsTabView.prototype.onClickRotationButton = function(e) {
    var rotation;
    $('#contextmenu').hide();
    rotation = parseFloat($(e.target).closest('button').data('rotation'));
    return this.rotateSelectedThangTo(rotation * Math.PI);
  };

  ThangsTabView.prototype.modifySelectedThangComponentConfig = function(thang, componentOriginal, modificationFunction) {
    var component, lank, ref, thangData;
    if (!thang) {
      return;
    }
    this.hush = true;
    thangData = this.getThangByID(thang.id);
    thangData = $.extend(true, {}, thangData);
    component = _.find(thangData.components, {
      original: componentOriginal
    });
    if (!component) {
      component = {
        original: componentOriginal,
        config: {},
        majorVersion: 0
      };
      thangData.components.push(component);
    }
    modificationFunction(component);
    this.thangsTreema.set(this.pathForThang(thangData), thangData);
    this.hush = false;
    this.onThangsChanged(true);
    thang.stateChanged = true;
    lank = this.surface.lankBoss.lanks[thang.id];
    lank.update(true);
    if ((ref = lank.marks.debug) != null) {
      ref.destroy();
    }
    delete lank.marks.debug;
    return lank.setDebug(true);
  };

  ThangsTabView.prototype.rotateSelectedThangTo = function(radians) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          component.config.rotation = radians;
          return selectedThang.rotation = component.config.rotation;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.rotateSelectedThangBy = function(radians) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          var ref1;
          component.config.rotation = (((ref1 = component.config.rotation) != null ? ref1 : 0) + radians) % (2 * Math.PI);
          return selectedThang.rotation = component.config.rotation;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.moveSelectedThangBy = function(xDir, yDir) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          component.config.pos.x += 0.5 * xDir;
          component.config.pos.y += 0.5 * yDir;
          selectedThang.pos.x = component.config.pos.x;
          return selectedThang.pos.y = component.config.pos.y;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.resizeSelectedThangBy = function(xDir, yDir) {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.PhysicalID, (function(_this) {
        return function(component) {
          var ref1, ref2;
          component.config.width = ((ref1 = component.config.width) != null ? ref1 : 4) + 0.5 * xDir;
          component.config.height = ((ref2 = component.config.height) != null ? ref2 : 4) + 0.5 * yDir;
          selectedThang.width = component.config.width;
          return selectedThang.height = component.config.height;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.toggleSelectedThangCollision = function() {
    var i, len, ref, results, selectedThang, singleSelected;
    ref = this.gameUIState.get('selected');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      singleSelected = ref[i];
      selectedThang = singleSelected.thang;
      results.push(this.modifySelectedThangComponentConfig(selectedThang, LevelComponent.CollidesID, (function(_this) {
        return function(component) {
          if (component.config == null) {
            component.config = {};
          }
          component.config.collisionCategory = component.config.collisionCategory === 'none' ? 'ground' : 'none';
          return selectedThang.collisionCategory = component.config.collisionCategory;
        };
      })(this)));
    }
    return results;
  };

  ThangsTabView.prototype.toggleThangsContainer = function(e) {
    return $('#all-thangs').toggleClass('hide');
  };

  ThangsTabView.prototype.toggleThangsPalette = function(e) {
    return $('#add-thangs-view').toggleClass('hide');
  };

  return ThangsTabView;

})(CocoView);

ThangsFolderNode = (function(superClass) {
  extend(ThangsFolderNode, superClass);

  function ThangsFolderNode() {
    return ThangsFolderNode.__super__.constructor.apply(this, arguments);
  }

  ThangsFolderNode.prototype.valueClass = 'treema-thangs-folder';

  ThangsFolderNode.prototype.nodeDescription = 'Thang';

  ThangsFolderNode.nameToThangTypeMap = null;

  ThangsFolderNode.prototype.getTrackedActionDescription = function(trackedAction) {
    var path, trackedActionDescription;
    trackedActionDescription = ThangsFolderNode.__super__.getTrackedActionDescription.call(this, trackedAction);
    if (trackedActionDescription === 'Edit ' + this.nodeDescription) {
      path = trackedAction.path.split('/');
      if (path[path.length - 1] === 'pos') {
        trackedActionDescription = 'Move Thang';
      }
    }
    return trackedActionDescription;
  };

  ThangsFolderNode.prototype.buildValueForDisplay = function(valEl, data) {
    var el;
    el = $("<span><strong>" + this.keyForParent + "</strong> <span class='text-muted'>(" + (this.countThangs(data)) + ")</span></span>");
    return valEl.append(el);
  };

  ThangsFolderNode.prototype.countThangs = function(data) {
    var key, num, value;
    if (data.thangType && (data.id != null)) {
      return 0;
    }
    num = 0;
    for (key in data) {
      value = data[key];
      if (value.thangType && (value.id != null)) {
        num += 1;
      } else {
        num += this.countThangs(value);
      }
    }
    return num;
  };

  ThangsFolderNode.prototype.nameToThangType = function(name) {
    var i, len, map, thangType, thangTypes;
    if (!ThangsFolderNode.nameToThangTypeMap) {
      thangTypes = this.settings.supermodel.getModels(ThangType);
      map = {};
      for (i = 0, len = thangTypes.length; i < len; i++) {
        thangType = thangTypes[i];
        map[thangType.get('name')] = thangType;
      }
      ThangsFolderNode.nameToThangTypeMap = map;
    }
    return ThangsFolderNode.nameToThangTypeMap[name];
  };

  return ThangsFolderNode;

})(TreemaNode.nodeMap.object);

ThangNode = (function(superClass) {
  extend(ThangNode, superClass);

  function ThangNode() {
    return ThangNode.__super__.constructor.apply(this, arguments);
  }

  ThangNode.prototype.valueClass = 'treema-thang';

  ThangNode.prototype.collection = false;

  ThangNode.thangNameMap = {};

  ThangNode.thangKindMap = {};

  ThangNode.prototype.buildValueForDisplay = function(valEl, data) {
    var pos, ref, s, thangType;
    pos = (ref = _.find(data.components, function(c) {
      var ref1;
      return ((ref1 = c.config) != null ? ref1.pos : void 0) != null;
    })) != null ? ref.config.pos : void 0;
    s = data.id;
    if (pos) {
      s += " (" + (Math.round(pos.x)) + ", " + (Math.round(pos.y)) + ")";
    } else {
      s += ' (non-physical)';
    }
    this.buildValueForDisplaySimply(valEl, s);
    thangType = this.settings.supermodel.getModelByOriginal(ThangType, data.thangType);
    if (thangType) {
      return valEl.prepend($("<img class='img-circle' src='" + (thangType.getPortraitURL()) + "' />"));
    }
  };

  ThangNode.prototype.onEnterPressed = function() {
    return Backbone.Mediator.publish('editor:edit-level-thang', {
      thangID: this.getData().id
    });
  };

  return ThangNode;

})(TreemaObjectNode);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/thangs/ThangsTabView.js.map
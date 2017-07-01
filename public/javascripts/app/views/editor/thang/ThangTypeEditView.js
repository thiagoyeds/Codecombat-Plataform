require.register("templates/editor/thang/thang-type-edit-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),thangType = locals_.thangType,recentlyPlayedLevels = locals_.recentlyPlayedLevels,authorized = locals_.authorized,me = locals_.me,fileSizeString = locals_.fileSizeString,animations = locals_.animations;if ( thangType.loading)
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><div class=\"container-fluid\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul></div></nav>");
}
else
{
buf.push("<nav role=\"navigation\" id=\"thang-editor-top-nav\" class=\"navbar navbar-default\"><ul class=\"nav navbar-nav\"><li><a href=\"/editor/thang\"><span class=\"glyphicon-home glyphicon\"></span></a></li></ul><ul class=\"nav navbar-nav nav-tabs\"><li class=\"active\"><a href=\"#editor-thang-main-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_main\">Main</a></li><li><a href=\"#editor-thang-components-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.level_tab_components\">Components</a></li><li><a href=\"#editor-thang-spritesheets-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_spritesheets\">Spritesheets</a></li><li><a href=\"#editor-thang-colors-tab-view\" data-toggle=\"tab\" data-i18n=\"editor.thang_colors\" id=\"color-tab\">Colors</a></li><li><a href=\"#editor-thang-patches-view\" data-toggle=\"tab\" id=\"patches-tab\"><span data-i18n=\"resources.patches\" class=\"spr\">Patches</span>");
var patches = thangType.get('patches')
if ( patches && patches.length)
{
buf.push("<span class=\"badge\">" + (jade.escape(null == (jade.interp = patches.length) ? "" : jade.interp)) + "</span>");
}
buf.push("</a></li></ul><div class=\"navbar-header\"><span class=\"navbar-brand\">" + (jade.escape((jade.interp = thangType.attributes.name) == null ? '' : jade.interp)) + "</span></div><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a data-toggle=\"dropdown\" class=\"play-with-level-parent\"><span class=\"glyphicon-play glyphicon\"></span></a><ul class=\"dropdown-menu\"><li class=\"dropdown-header\">Play Which Level?</li><li>");
// iterate recentlyPlayedLevels
;(function(){
  var $$obj = recentlyPlayedLevels;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var level = $$obj[$index];

buf.push("<a" + (jade.attrs({ 'data-level':(level), "class": [('play-with-level-button')] }, {"data-level":true})) + ">" + (jade.escape(null == (jade.interp = level) ? "" : jade.interp)) + "</a>");
    }

  }
}).call(this);

buf.push("<input placeholder=\"Type in a level name\" class=\"play-with-level-input\"/></li></ul></li>");
if ( authorized)
{
buf.push("<li id=\"save-button\"><a><span class=\"glyphicon-floppy-disk glyphicon\"></span></a></li>");
}
buf.push("<li class=\"dropdown\"><a data-toggle=\"dropdown\"><span class=\"glyphicon-chevron-down glyphicon\"></span></a><ul class=\"dropdown-menu\"><li data-i18n=\"common.actions\" class=\"dropdown-header\">Actions</li><li" + (jade.attrs({ "class": [(!me.isAdmin() && !me.isArtisan() ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"common.fork\" id=\"fork-start-button\">Fork</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a" + (jade.attrs({ 'data-toggle':("coco-modal"), 'data-target':("modal/RevertModal"), 'data-i18n':("editor.revert"), 'disabled':(!authorized), 'id':('revert-button') }, {"data-toggle":true,"data-target":true,"data-i18n":true,"disabled":true})) + ">Revert</a></li><li" + (jade.attrs({ "class": [(!authorized ? "disabled": "")] }, {"class":true})) + "><a data-i18n=\"editor.pop_i18n\" id=\"pop-level-i18n-button\">Populate i18n</a></li><li class=\"divider\"></li><li data-i18n=\"common.info\" class=\"dropdown-header\">Info</li><li id=\"history-button\"><a href=\"#\" data-i18n=\"general.version_history\">Version History</a></li><li class=\"divider\"></li><li data-i18n=\"common.help\" class=\"dropdown-header\">Help</li><li><a href=\"https://github.com/codecombat/codecombat/wiki/Artisan-Home\" data-i18n=\"editor.wiki\" target=\"_blank\">Wiki</a></li><li><a href=\"https://coco-slack-invite.herokuapp.com/\" data-i18n=\"editor.live_chat\" target=\"_blank\">Live Chat</a></li><li><a href=\"http://discourse.codecombat.com/category/artisan\" data-i18n=\"nav.forum\" target=\"_blank\">Forum</a></li>");
if ( !me.isStudent())
{
buf.push("<li><a data-i18n=\"nav.contact\" class=\"contact-modal\"></a></li>");
}
buf.push("</ul></li></ul></nav>");
}
buf.push("<div class=\"outer-content\"><div class=\"tab-content\"><div id=\"editor-thang-colors-tab-view\" class=\"tab-pane\"></div><div id=\"editor-thang-main-tab-view\" class=\"tab-pane active\"><div id=\"settings-col\" class=\"well\"><div class=\"row\"><div class=\"col-sm-3\"><img id=\"portrait\" class=\"img-thumbnail\"/></div><div class=\"col-sm-9\"><div class=\"file-controls\"><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('upload-button'), "class": [('btn'),('btn-sm'),('btn-info')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-upload\"></span><span class=\"spl\">Upload Animation</span></button><button" + (jade.attrs({ 'disabled':(authorized === true ? undefined : "true"), 'id':('clear-button'), "class": [('btn'),('btn-sm'),('btn-danger')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-remove\"></span><span class=\"spl\">Clear Data</span></button><button" + (jade.attrs({ 'id':('set-vector-icon'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-gbp\"></span><span class=\"spl\">Vector Icon Setup</span></button><button" + (jade.attrs({ 'id':('export-sprite-sheet-btn'), 'disabled':(authorized === true ? undefined : "true"), "class": [('btn'),('btn-sm')] }, {"disabled":true})) + "><span class=\"glyphicon glyphicon-export\"></span><span class=\"spl\">Export SpriteSheet</span></button><input id=\"real-upload-button\" type=\"file\"/></div><div id=\"thang-type-file-size\">" + (jade.escape(null == (jade.interp = fileSizeString) ? "" : jade.interp)) + "</div></div></div><div id=\"thang-type-treema\"></div><div class=\"clearfix\"></div></div><div id=\"display-col\" class=\"well\"><canvas id=\"canvas\" width=\"400\" height=\"600\"></canvas><select id=\"animations-select\" class=\"form-control\">");
// iterate animations
;(function(){
  var $$obj = animations;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var animation = $$obj[$index];

buf.push("<option>" + (jade.escape((jade.interp = animation) == null ? '' : jade.interp)) + "</option>");
    }

  }
}).call(this);

buf.push("</select><div><button id=\"marker-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-map-marker\"></i><span class=\"spl\">Markers</span></button><button id=\"play-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-play\"></i><span class=\"spl\">Play</span></button><button id=\"stop-button\" class=\"btn btn-small btn-primary\"><i class=\"icon-stop\"></i><span class=\"spl\">Stop</span></button></div><div class=\"slider-cell\">Rotation:<span class=\"rotation-label\"></span><div id=\"rotation-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Scale:<span class=\"scale-label\"></span><div id=\"scale-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Resolution:<span class=\"resolution-label\"> 4.0x</span><div id=\"resolution-slider\" class=\"selector\"></div></div><div class=\"slider-cell\">Health:<span class=\"health-label\"> 10hp</span><div id=\"health-slider\" class=\"selector\"></div></div></div></div><div id=\"editor-thang-components-tab-view\" class=\"tab-pane\"><div id=\"thang-components-edit-view\"></div></div><div id=\"editor-thang-spritesheets-view\" class=\"tab-pane\"><div id=\"spritesheets\"></div></div><div id=\"editor-thang-patches-view\" class=\"tab-pane\"><div class=\"patches-view\"></div></div></div><div class=\"clearfix\"></div></div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/editor/thang/ThangTypeEditView", function(exports, require, module) {
var CENTER, Camera, DocumentFiles, ExportThangTypeModal, ForkModal, Lank, LayerAdapter, PatchesView, RootView, SaveVersionModal, SpriteBuilder, SpriteParser, ThangComponentsEditView, ThangType, ThangTypeColorsTabView, ThangTypeEditView, ThangTypeVersionsModal, VectorIconSetupModal, animatedThangTypeTasks, commonTasks, containerTasks, defaultTasks, displayedThangTypeTasks, imageToPortrait, purchasableTasks, storage, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ThangType = require('models/ThangType');

SpriteParser = require('lib/sprites/SpriteParser');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

Lank = require('lib/surface/Lank');

LayerAdapter = require('lib/surface/LayerAdapter');

Camera = require('lib/surface/Camera');

DocumentFiles = require('collections/DocumentFiles');

require('vendor/treema');

require('views/modal/RevertModal');

RootView = require('views/core/RootView');

ThangComponentsEditView = require('views/editor/component/ThangComponentsEditView');

ThangTypeVersionsModal = require('./ThangTypeVersionsModal');

ThangTypeColorsTabView = require('./ThangTypeColorsTabView');

PatchesView = require('views/editor/PatchesView');

ForkModal = require('views/editor/ForkModal');

VectorIconSetupModal = require('views/editor/thang/VectorIconSetupModal');

SaveVersionModal = require('views/editor/modal/SaveVersionModal');

template = require('templates/editor/thang/thang-type-edit-view');

storage = require('core/storage');

ExportThangTypeModal = require('./ExportThangTypeModal');

require('game-libraries');

CENTER = {
  x: 200,
  y: 400
};

commonTasks = ['Upload the art.', 'Set up the vector icon.'];

displayedThangTypeTasks = ['Configure the idle action.', 'Configure the positions (registration point, etc.).', 'Set shadow diameter to 0 if needed.', 'Set scale to 0.3, 0.5, or whatever is appropriate.', 'Set rotation to isometric if needed.', 'Set accurate Physical size, shape, and default z.', 'Set accurate Collides collision information if needed.', 'Double-check that fixedRotation is accurate, if it collides.'];

animatedThangTypeTasks = displayedThangTypeTasks.concat(['Configure the non-idle actions.', 'Configure any per-action registration points needed.', 'Add flipX per action if needed to face to the right.', 'Make sure any death and attack actions do not loop.', 'Add defaultSimlish if needed.', 'Add selection sounds if needed.', 'Add per-action sound triggers.', 'Add team color groups.']);

containerTasks = displayedThangTypeTasks.concat(['Select viable terrains if not universal.', 'Set Exists stateless: true if needed.']);

purchasableTasks = ['Add a tier, or 10 + desired tier if not ready yet.', 'Add a gem cost.', 'Write a description.', 'Click the Populate i18n button.'];

defaultTasks = {
  Unit: commonTasks.concat(animatedThangTypeTasks.concat(['Start a new name category in names.coffee if needed.', 'Set to Allied to correct team (ogres, humans, or neutral).', 'Add AutoTargetsNearest or FightsBack if needed.', 'Add other Components like Shoots or Casts if needed.', 'Configure other Components, like Moves, Attackable, Attacks, etc.', 'Override the HasAPI type if it will not be correctly inferred.', 'Add to Existence System power table.'])),
  Hero: commonTasks.concat(animatedThangTypeTasks.concat(purchasableTasks.concat(['Set the hero class.', 'Add Extended Hero Name.', 'Upload Hero Doll Images.', 'Upload Pose Image.', 'Start a new name category in names.coffee.', 'Set up hero stats in Equips, Attackable, Moves.', 'Set Collects collectRange to 2, Sees visualRange to 60.', 'Add any custom hero abilities.', 'Add to ThangType model hard-coded hero ids/classes list.', 'Add to LevelHUDView hard-coded hero short names list.', 'Add to InventoryView hard-coded hero gender list.', 'Add to PlayHeroesModal hard-coded hero positioning logic.', 'Add as unlock to a level and add unlockLevelName here.']))),
  Floor: commonTasks.concat(containerTasks.concat(['Add 10 x 8.5 snapping.', 'Set fixed rotation.', 'Make sure everything is scaled to tile perfectly.', 'Adjust SingularSprite floor scale list if necessary.'])),
  Wall: commonTasks.concat(containerTasks.concat(['Add 4x4 snapping.', 'Set fixed rotation.', 'Set up and tune complicated wall-face actions.', 'Make sure everything is scaled to tile perfectly.'])),
  Doodad: commonTasks.concat(containerTasks.concat(['Add to GenerateTerrainModal logic if needed.'])),
  Misc: commonTasks.concat(['Add any misc tasks for this misc ThangType.']),
  Mark: commonTasks.concat(['Check the animation framerate.', 'Double-check that bottom of mark is just touching registration point.']),
  Item: commonTasks.concat(purchasableTasks.concat(['Set the hero class if class-specific.', 'Upload Paper Doll Images.', 'Configure item stats and abilities.'])),
  Missile: commonTasks.concat(animatedThangTypeTasks.concat(['Make sure there is a launch sound trigger.', 'Make sure there is a hit sound trigger.', 'Make sure there is a die animation.', 'Add Arrow, Shell, Beam, or other missile Component.', 'Choose Missile.leadsShots and Missile.shootsAtGround.', 'Choose Moves.maxSpeed and other config.', 'Choose Expires.lifespan config if needed.', 'Set spriteType: singular if needed for proper rendering.', 'Add HasAPI if the missile should show up in findEnemyMissiles.']))
};

module.exports = ThangTypeEditView = (function(superClass) {
  extend(ThangTypeEditView, superClass);

  ThangTypeEditView.prototype.id = 'thang-type-edit-view';

  ThangTypeEditView.prototype.className = 'editor';

  ThangTypeEditView.prototype.template = template;

  ThangTypeEditView.prototype.resolution = 4;

  ThangTypeEditView.prototype.scale = 3;

  ThangTypeEditView.prototype.mockThang = {
    health: 10.0,
    maxHealth: 10.0,
    hudProperties: ['health'],
    acts: true
  };

  ThangTypeEditView.prototype.events = {
    'click #clear-button': 'clearRawData',
    'click #upload-button': function() {
      return this.$el.find('input#real-upload-button').click();
    },
    'click #set-vector-icon': 'onClickSetVectorIcon',
    'change #real-upload-button': 'animationFileChosen',
    'change #animations-select': 'showAnimation',
    'click #marker-button': 'toggleDots',
    'click #stop-button': 'stopAnimation',
    'click #play-button': 'playAnimation',
    'click #history-button': 'showVersionHistory',
    'click li:not(.disabled) > #fork-start-button': 'startForking',
    'click #save-button': 'openSaveModal',
    'click #patches-tab': function() {
      return this.patchesView.load();
    },
    'click .play-with-level-button': 'onPlayLevel',
    'click .play-with-level-parent': 'onPlayLevelSelect',
    'keyup .play-with-level-input': 'onPlayLevelKeyUp',
    'click li:not(.disabled) > #pop-level-i18n-button': 'onPopulateLevelI18N',
    'mousedown #canvas': 'onCanvasMouseDown',
    'mouseup #canvas': 'onCanvasMouseUp',
    'mousemove #canvas': 'onCanvasMouseMove',
    'click #export-sprite-sheet-btn': 'onClickExportSpriteSheetButton'
  };

  ThangTypeEditView.prototype.onClickSetVectorIcon = function() {
    var modal;
    modal = new VectorIconSetupModal({}, this.thangType);
    this.openModalView(modal);
    return modal.once('done', (function(_this) {
      return function() {
        return _this.treema.set('/', _this.getThangData());
      };
    })(this));
  };

  ThangTypeEditView.prototype.subscriptions = {
    'editor:thang-type-color-groups-changed': 'onColorGroupsChanged'
  };

  function ThangTypeEditView(options, thangTypeID) {
    this.thangTypeID = thangTypeID;
    this.onSelectNode = bind(this.onSelectNode, this);
    this.pushChangesToPreview = bind(this.pushChangesToPreview, this);
    this.updateHealth = bind(this.updateHealth, this);
    this.updateResolution = bind(this.updateResolution, this);
    this.updateScale = bind(this.updateScale, this);
    this.updateRotation = bind(this.updateRotation, this);
    this.refreshAnimation = bind(this.refreshAnimation, this);
    this.onFileLoad = bind(this.onFileLoad, this);
    this.onComponentsChanged = bind(this.onComponentsChanged, this);
    this.initComponents = bind(this.initComponents, this);
    ThangTypeEditView.__super__.constructor.call(this, options);
    this.mockThang = $.extend(true, {}, this.mockThang);
    this.thangType = new ThangType({
      _id: this.thangTypeID
    });
    this.thangType = this.supermodel.loadModel(this.thangType).model;
    this.thangType.saveBackups = true;
    this.listenToOnce(this.thangType, 'sync', function() {
      this.files = this.supermodel.loadCollection(new DocumentFiles(this.thangType), 'files').model;
      return this.updateFileSize();
    });
  }

  ThangTypeEditView.prototype.showLoading = function($el) {
    if ($el == null) {
      $el = this.$el.find('.outer-content');
    }
    return ThangTypeEditView.__super__.showLoading.call(this, $el);
  };

  ThangTypeEditView.prototype.getRenderData = function(context) {
    var ref;
    if (context == null) {
      context = {};
    }
    context = ThangTypeEditView.__super__.getRenderData.call(this, context);
    context.thangType = this.thangType;
    context.animations = this.getAnimationNames();
    context.authorized = !me.get('anonymous');
    context.recentlyPlayedLevels = (ref = storage.load('recently-played-levels')) != null ? ref : ['items'];
    context.fileSizeString = this.fileSizeString;
    return context;
  };

  ThangTypeEditView.prototype.getAnimationNames = function() {
    return _.sortBy(_.keys(this.thangType.get('actions') || {}), function(a) {
      return {
        move: 1,
        cast: 2,
        attack: 3,
        idle: 4,
        portrait: 6
      }[a] || 5;
    });
  };

  ThangTypeEditView.prototype.afterRender = function() {
    ThangTypeEditView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.initStage();
    this.buildTreema();
    this.initSliders();
    this.initComponents();
    this.insertSubView(new ThangTypeColorsTabView(this.thangType));
    this.patchesView = this.insertSubView(new PatchesView(this.thangType), this.$el.find('.patches-view'));
    if (me.get('anonymous')) {
      this.showReadOnly();
    }
    return this.updatePortrait();
  };

  ThangTypeEditView.prototype.initComponents = function() {
    var options, ref;
    options = {
      components: (ref = this.thangType.get('components')) != null ? ref : [],
      supermodel: this.supermodel
    };
    this.thangComponentEditView = new ThangComponentsEditView(options);
    this.listenTo(this.thangComponentEditView, 'components-changed', this.onComponentsChanged);
    return this.insertSubView(this.thangComponentEditView);
  };

  ThangTypeEditView.prototype.onComponentsChanged = function(components) {
    return this.thangType.set('components', components);
  };

  ThangTypeEditView.prototype.onColorGroupsChanged = function(e) {
    this.temporarilyIgnoringChanges = true;
    this.treema.set('colorGroups', e.colorGroups);
    return this.temporarilyIgnoringChanges = false;
  };

  ThangTypeEditView.prototype.makeDot = function(color) {
    var circle;
    circle = new createjs.Shape();
    circle.graphics.beginFill(color).beginStroke('black').drawCircle(0, 0, 5);
    circle.scaleY = 0.2;
    circle.scaleX = 0.5;
    return circle;
  };

  ThangTypeEditView.prototype.initStage = function() {
    var canvas, ref;
    canvas = this.$el.find('#canvas');
    this.stage = new createjs.Stage(canvas[0]);
    this.layerAdapter = new LayerAdapter({
      name: 'Default',
      webGL: true
    });
    this.topLayer = new createjs.Container();
    this.layerAdapter.container.x = this.topLayer.x = CENTER.x;
    this.layerAdapter.container.y = this.topLayer.y = CENTER.y;
    this.stage.addChild(this.layerAdapter.container, this.topLayer);
    this.listenTo(this.layerAdapter, 'new-spritesheet', this.onNewSpriteSheet);
    if ((ref = this.camera) != null) {
      ref.destroy();
    }
    this.camera = new Camera(canvas);
    this.torsoDot = this.makeDot('blue');
    this.mouthDot = this.makeDot('yellow');
    this.aboveHeadDot = this.makeDot('green');
    this.groundDot = this.makeDot('red');
    this.topLayer.addChild(this.groundDot, this.torsoDot, this.mouthDot, this.aboveHeadDot);
    this.updateGrid();
    _.defer(this.refreshAnimation);
    this.toggleDots(false);
    createjs.Ticker.setFPS(30);
    return createjs.Ticker.addEventListener('tick', this.stage);
  };

  ThangTypeEditView.prototype.toggleDots = function(newShowDots) {
    this.showDots = typeof newShowDots === 'boolean' ? newShowDots : !this.showDots;
    return this.updateDots();
  };

  ThangTypeEditView.prototype.updateDots = function() {
    var aboveHead, mouth, torso;
    this.topLayer.removeChild(this.torsoDot, this.mouthDot, this.aboveHeadDot, this.groundDot);
    if (!this.currentLank) {
      return;
    }
    if (!this.showDots) {
      return;
    }
    torso = this.currentLank.getOffset('torso');
    mouth = this.currentLank.getOffset('mouth');
    aboveHead = this.currentLank.getOffset('aboveHead');
    this.torsoDot.x = torso.x;
    this.torsoDot.y = torso.y;
    this.mouthDot.x = mouth.x;
    this.mouthDot.y = mouth.y;
    this.aboveHeadDot.x = aboveHead.x;
    this.aboveHeadDot.y = aboveHead.y;
    return this.topLayer.addChild(this.groundDot, this.torsoDot, this.mouthDot, this.aboveHeadDot);
  };

  ThangTypeEditView.prototype.stopAnimation = function() {
    var ref;
    return (ref = this.currentLank) != null ? ref.queueAction('idle') : void 0;
  };

  ThangTypeEditView.prototype.playAnimation = function() {
    var ref;
    return (ref = this.currentLank) != null ? ref.queueAction(this.$el.find('#animations-select').val()) : void 0;
  };

  ThangTypeEditView.prototype.updateGrid = function() {
    var grid, line, newLine, step, width, x, y;
    grid = new createjs.Container();
    line = new createjs.Shape();
    width = 1000;
    line.graphics.beginFill('#666666').drawRect(-width / 2, -0.5, width, 0.5);
    line.x = CENTER.x;
    line.y = CENTER.y;
    y = line.y;
    step = 10 * this.scale;
    while (y > 0) {
      y -= step;
    }
    while (y < 500) {
      y += step;
      newLine = line.clone();
      newLine.y = y;
      grid.addChild(newLine);
    }
    x = line.x;
    while (x > 0) {
      x -= step;
    }
    while (x < 400) {
      x += step;
      newLine = line.clone();
      newLine.x = x;
      newLine.rotation = 90;
      grid.addChild(newLine);
    }
    if (this.grid) {
      this.stage.removeChild(this.grid);
    }
    this.stage.addChildAt(grid, 0);
    return this.grid = grid;
  };

  ThangTypeEditView.prototype.updateSelectBox = function() {
    var i, len, name, names, results, select;
    names = this.getAnimationNames();
    select = this.$el.find('#animations-select');
    if (select.find('option').length === names.length) {
      return;
    }
    select.empty();
    results = [];
    for (i = 0, len = names.length; i < len; i++) {
      name = names[i];
      results.push(select.append($('<option></option>').text(name)));
    }
    return results;
  };

  ThangTypeEditView.prototype.animationFileChosen = function(e) {
    this.file = e.target.files[0];
    if (!this.file) {
      return;
    }
    if (!_.string.endsWith(this.file.type, 'javascript')) {
      return;
    }
    this.reader = new FileReader();
    this.reader.onload = this.onFileLoad;
    return this.reader.readAsText(this.file);
  };

  ThangTypeEditView.prototype.onFileLoad = function(e) {
    var parser, result;
    result = this.reader.result;
    parser = new SpriteParser(this.thangType);
    parser.parse(result);
    this.treema.set('raw', this.thangType.get('raw'));
    this.updateSelectBox();
    this.refreshAnimation();
    return this.updateFileSize();
  };

  ThangTypeEditView.prototype.updateFileSize = function() {
    var compressed, compressedSize, file, gzipCompressedSize, size;
    file = JSON.stringify(this.thangType.attributes);
    compressed = LZString.compress(file);
    size = (file.length / 1024).toFixed(1) + "KB";
    compressedSize = (compressed.length / 1024).toFixed(1) + "KB";
    gzipCompressedSize = compressedSize * 1.65;
    this.fileSizeString = "Size: " + size + " (~" + compressedSize + " gzipped)";
    return this.$el.find('#thang-type-file-size').text(this.fileSizeString);
  };

  ThangTypeEditView.prototype.refreshAnimation = function() {
    var options;
    this.thangType.resetSpriteSheetCache();
    if (this.thangType.get('raster')) {
      return this.showRasterImage();
    }
    options = this.getLankOptions();
    console.log('refresh animation....');
    this.showAnimation();
    return this.updatePortrait();
  };

  ThangTypeEditView.prototype.showRasterImage = function() {
    var lank;
    lank = new Lank(this.thangType, this.getLankOptions());
    this.showLank(lank);
    return this.updateScale();
  };

  ThangTypeEditView.prototype.onNewSpriteSheet = function() {
    var i, image, len, ref;
    $('#spritesheets').empty();
    ref = this.layerAdapter.spriteSheet._images;
    for (i = 0, len = ref.length; i < len; i++) {
      image = ref[i];
      $('#spritesheets').append(image);
    }
    this.layerAdapter.container.x = CENTER.x;
    this.layerAdapter.container.y = CENTER.y;
    return this.updateScale();
  };

  ThangTypeEditView.prototype.showAnimation = function(animationName) {
    if (!_.isString(animationName)) {
      animationName = this.$el.find('#animations-select').val();
    }
    if (!animationName) {
      return;
    }
    this.mockThang.action = animationName;
    this.showAction(animationName);
    this.updateRotation();
    return this.updateScale();
  };

  ThangTypeEditView.prototype.showMovieClip = function(animationName) {
    var movieClip, ref, reg, scale, vectorParser;
    vectorParser = new SpriteBuilder(this.thangType);
    movieClip = vectorParser.buildMovieClip(animationName);
    if (!movieClip) {
      return;
    }
    reg = (ref = this.thangType.get('positions')) != null ? ref.registration : void 0;
    if (reg) {
      movieClip.regX = -reg.x;
      movieClip.regY = -reg.y;
    }
    scale = this.thangType.get('scale');
    if (scale) {
      movieClip.scaleX = movieClip.scaleY = scale;
    }
    return this.showSprite(movieClip);
  };

  ThangTypeEditView.prototype.getLankOptions = function() {
    return {
      resolutionFactor: this.resolution,
      thang: this.mockThang,
      preloadSounds: false
    };
  };

  ThangTypeEditView.prototype.showAction = function(actionName) {
    var lank, options;
    options = this.getLankOptions();
    lank = new Lank(this.thangType, options);
    this.showLank(lank);
    return lank.queueAction(actionName);
  };

  ThangTypeEditView.prototype.updatePortrait = function() {
    var options, portrait;
    options = this.getLankOptions();
    portrait = this.thangType.getPortraitImage(options);
    if (!portrait) {
      return;
    }
    if (portrait != null) {
      portrait.attr('id', 'portrait').addClass('img-thumbnail');
    }
    portrait.addClass('img-thumbnail');
    return $('#portrait').replaceWith(portrait);
  };

  ThangTypeEditView.prototype.showLank = function(lank) {
    this.clearDisplayObject();
    this.clearLank();
    this.layerAdapter.resetSpriteSheet();
    this.layerAdapter.addLank(lank);
    this.currentLank = lank;
    return this.currentLankOffset = null;
  };

  ThangTypeEditView.prototype.showSprite = function(sprite) {
    this.clearDisplayObject();
    this.clearLank();
    this.topLayer.addChild(sprite);
    this.currentObject = sprite;
    return this.updateDots();
  };

  ThangTypeEditView.prototype.clearDisplayObject = function() {
    if (this.currentObject != null) {
      return this.topLayer.removeChild(this.currentObject);
    }
  };

  ThangTypeEditView.prototype.clearLank = function() {
    var ref;
    if (this.currentLank) {
      this.layerAdapter.removeLank(this.currentLank);
    }
    return (ref = this.currentLank) != null ? ref.destroy() : void 0;
  };

  ThangTypeEditView.prototype.initSliders = function() {
    this.rotationSlider = this.initSlider($('#rotation-slider', this.$el), 50, this.updateRotation);
    this.scaleSlider = this.initSlider($('#scale-slider', this.$el), 29, this.updateScale);
    this.resolutionSlider = this.initSlider($('#resolution-slider', this.$el), 39, this.updateResolution);
    return this.healthSlider = this.initSlider($('#health-slider', this.$el), 100, this.updateHealth);
  };

  ThangTypeEditView.prototype.updateRotation = function() {
    var value;
    value = parseInt(180 * (this.rotationSlider.slider('value') - 50) / 50);
    this.$el.find('.rotation-label').text(" " + value + "° ");
    if (this.currentLank) {
      this.currentLank.rotation = value;
      return this.currentLank.update(true);
    }
  };

  ThangTypeEditView.prototype.updateScale = function() {
    var fixed, scaleValue;
    scaleValue = (this.scaleSlider.slider('value') + 1) / 10;
    this.layerAdapter.container.scaleX = this.layerAdapter.container.scaleY = this.topLayer.scaleX = this.topLayer.scaleY = scaleValue;
    fixed = scaleValue.toFixed(1);
    this.scale = scaleValue;
    this.$el.find('.scale-label').text(" " + fixed + "x ");
    return this.updateGrid();
  };

  ThangTypeEditView.prototype.updateResolution = function() {
    var fixed, value;
    value = (this.resolutionSlider.slider('value') + 1) / 10;
    fixed = value.toFixed(1);
    this.$el.find('.resolution-label').text(" " + fixed + "x ");
    this.resolution = value;
    return this.refreshAnimation();
  };

  ThangTypeEditView.prototype.updateHealth = function() {
    var ref, value;
    value = parseInt((this.healthSlider.slider('value')) / 10);
    this.$el.find('.health-label').text(" " + value + "hp ");
    this.mockThang.health = value;
    return (ref = this.currentLank) != null ? ref.update() : void 0;
  };

  ThangTypeEditView.prototype.saveNewThangType = function(e) {
    var modal, newThangType, res;
    newThangType = e.major ? this.thangType.cloneNewMajorVersion() : this.thangType.cloneNewMinorVersion();
    newThangType.set('commitMessage', e.commitMessage);
    if (newThangType.get('i18nCoverage')) {
      newThangType.updateI18NCoverage();
    }
    res = newThangType.save(null, {
      type: 'POST'
    });
    if (!res) {
      return;
    }
    modal = $('#save-version-modal');
    this.enableModalInProgress(modal);
    res.error((function(_this) {
      return function() {
        return _this.disableModalInProgress(modal);
      };
    })(this));
    return res.success((function(_this) {
      return function() {
        var image, portraitSource, success, url;
        url = "/editor/thang/" + (newThangType.get('slug') || newThangType.id);
        portraitSource = null;
        if (_this.thangType.get('raster')) {
          image = _this.currentLank.sprite.spriteSheet._images[0];
          portraitSource = imageToPortrait(image);
        }
        success = function() {
          _this.thangType.clearBackup();
          return document.location.href = url;
        };
        return newThangType.uploadGenericPortrait(success, portraitSource);
      };
    })(this));
  };

  ThangTypeEditView.prototype.clearRawData = function() {
    this.thangType.resetRawData();
    this.thangType.set('actions', void 0);
    this.clearDisplayObject();
    return this.treema.set('/', this.getThangData());
  };

  ThangTypeEditView.prototype.getThangData = function() {
    var data;
    data = $.extend(true, {}, this.thangType.attributes);
    return data = _.pick(data, (function(_this) {
      return function(value, key) {
        return !(key === 'components');
      };
    })(this));
  };

  ThangTypeEditView.prototype.buildTreema = function() {
    var data, el, options, schema;
    data = this.getThangData();
    schema = _.cloneDeep(ThangType.schema);
    schema.properties = _.pick(schema.properties, (function(_this) {
      return function(value, key) {
        return !(key === 'components');
      };
    })(this));
    options = {
      data: data,
      schema: schema,
      files: this.files,
      filePath: "db/thang.type/" + (this.thangType.get('original')),
      readOnly: me.get('anonymous'),
      callbacks: {
        change: this.pushChangesToPreview,
        select: this.onSelectNode
      }
    };
    el = this.$el.find('#thang-type-treema');
    this.treema = this.$el.find('#thang-type-treema').treema(options);
    this.treema.build();
    return this.lastKind = data.kind;
  };

  ThangTypeEditView.prototype.pushChangesToPreview = function() {
    var key, keysProcessed, kind, ref, t, value;
    if (this.temporarilyIgnoringChanges) {
      return;
    }
    keysProcessed = {};
    for (key in this.thangType.attributes) {
      keysProcessed[key] = true;
      if (key === 'components') {
        continue;
      }
      this.thangType.set(key, this.treema.data[key]);
    }
    ref = this.treema.data;
    for (key in ref) {
      value = ref[key];
      if (!keysProcessed[key]) {
        this.thangType.set(key, value);
      }
    }
    this.updateSelectBox();
    this.refreshAnimation();
    this.updateDots();
    this.updatePortrait();
    if ((kind = this.treema.data.kind) !== this.lastKind) {
      this.lastKind = kind;
      Backbone.Mediator.publish('editor:thang-type-kind-changed', {
        kind: kind
      });
      if ((kind === 'Doodad' || kind === 'Floor' || kind === 'Wall') && !this.treema.data.terrains) {
        this.treema.set('/terrains', ['Grass', 'Dungeon', 'Indoor', 'Desert', 'Mountain', 'Glacier', 'Volcano']);
      }
      if (!this.treema.data.tasks) {
        return this.treema.set('/tasks', (function() {
          var i, len, ref1, results;
          ref1 = defaultTasks[kind];
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            t = ref1[i];
            results.push({
              name: t
            });
          }
          return results;
        })());
      }
    }
  };

  ThangTypeEditView.prototype.onSelectNode = function(e, selected) {
    var bounds, key, obj, parts, path, ref, type, vectorParser;
    selected = selected[0];
    if (this.boundsBox) {
      this.topLayer.removeChild(this.boundsBox);
    }
    if (!selected) {
      return this.stopShowingSelectedNode();
    }
    path = selected.getPath();
    parts = path.split('/');
    if (!(parts.length >= 4 && _.string.startsWith(path, '/raw/'))) {
      return this.stopShowingSelectedNode();
    }
    key = parts[3];
    type = parts[2];
    vectorParser = new SpriteBuilder(this.thangType);
    if (type === 'animations') {
      obj = vectorParser.buildMovieClip(key);
    }
    if (type === 'containers') {
      obj = vectorParser.buildContainerFromStore(key);
    }
    if (type === 'shapes') {
      obj = vectorParser.buildShapeFromStore(key);
    }
    bounds = (obj != null ? obj.bounds : void 0) || (obj != null ? obj.nominalBounds : void 0);
    if (bounds) {
      this.boundsBox = new createjs.Shape();
      this.boundsBox.graphics.beginFill('#aaaaaa').beginStroke('black').drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      this.topLayer.addChild(this.boundsBox);
      obj.regX = this.boundsBox.regX = bounds.x + bounds.width / 2;
      obj.regY = this.boundsBox.regY = bounds.y + bounds.height / 2;
    }
    if (obj) {
      this.showSprite(obj);
    }
    this.showingSelectedNode = true;
    if ((ref = this.currentLank) != null) {
      ref.destroy();
    }
    this.currentLank = null;
    this.updateScale();
    return this.grid.alpha = 0.0;
  };

  ThangTypeEditView.prototype.stopShowingSelectedNode = function() {
    if (!this.showingSelectedNode) {
      return;
    }
    this.grid.alpha = 1.0;
    this.showAnimation();
    return this.showingSelectedNode = false;
  };

  ThangTypeEditView.prototype.showVersionHistory = function(e) {
    return this.openModalView(new ThangTypeVersionsModal({
      thangType: this.thangType
    }, this.thangTypeID));
  };

  ThangTypeEditView.prototype.onPopulateLevelI18N = function() {
    this.thangType.populateI18N();
    return _.delay((function() {
      return document.location.reload();
    }), 500);
  };

  ThangTypeEditView.prototype.openSaveModal = function() {
    var modal;
    modal = new SaveVersionModal({
      model: this.thangType
    });
    this.openModalView(modal);
    this.listenToOnce(modal, 'save-new-version', this.saveNewThangType);
    return this.listenToOnce(modal, 'hidden', function() {
      return this.stopListening(modal);
    });
  };

  ThangTypeEditView.prototype.startForking = function(e) {
    return this.openModalView(new ForkModal({
      model: this.thangType,
      editorPath: 'thang'
    }));
  };

  ThangTypeEditView.prototype.onPlayLevelSelect = function(e) {
    if (this.childWindow && !this.childWindow.closed) {
      e.stopImmediatePropagation();
      this.onPlayLevel(e);
    }
    return _.defer(function() {
      return $('.play-with-level-input').focus();
    });
  };

  ThangTypeEditView.prototype.onPlayLevelKeyUp = function(e) {
    var input, level, recentlyPlayedLevels, ref;
    if (e.keyCode !== 13) {
      return;
    }
    input = this.$el.find('.play-with-level-input');
    input.parents('.dropdown').find('.play-with-level-parent').dropdown('toggle');
    level = _.string.slugify(input.val());
    if (!level) {
      return;
    }
    this.onPlayLevel(null, level);
    recentlyPlayedLevels = (ref = storage.load('recently-played-levels')) != null ? ref : [];
    recentlyPlayedLevels.push(level);
    return storage.save('recently-played-levels', recentlyPlayedLevels);
  };

  ThangTypeEditView.prototype.onPlayLevel = function(e, level) {
    var scratchLevelID;
    if (level == null) {
      level = null;
    }
    if (level == null) {
      level = $(e.target).data('level');
    }
    level = _.string.slugify(level);
    if (this.childWindow && !this.childWindow.closed) {
      this.childWindow.Backbone.Mediator.publish('level:reload-thang-type', {
        thangType: this.thangType
      });
    } else {
      scratchLevelID = level + '?dev=true';
      if (me.get('name') === 'Nick') {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=2560,height=1080,left=0,top=-1600,location=1,menubar=1,scrollbars=1,status=0,titlebar=1,toolbar=1', true);
      } else {
        this.childWindow = window.open("/play/level/" + scratchLevelID, 'child_window', 'width=1024,height=560,left=10,top=10,location=0,menubar=0,scrollbars=0,status=0,titlebar=0,toolbar=0', true);
      }
    }
    return this.childWindow.focus();
  };

  ThangTypeEditView.prototype.onCanvasMouseMove = function(e) {
    var offset, p1, p2;
    if (!(p1 = this.canvasDragStart)) {
      return;
    }
    p2 = {
      x: e.offsetX,
      y: e.offsetY
    };
    offset = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
    this.currentLank.sprite.x = this.currentLankOffset.x + offset.x / this.scale;
    this.currentLank.sprite.y = this.currentLankOffset.y + offset.y / this.scale;
    return this.canvasDragOffset = offset;
  };

  ThangTypeEditView.prototype.onCanvasMouseDown = function(e) {
    if (!this.currentLank) {
      return;
    }
    this.canvasDragStart = {
      x: e.offsetX,
      y: e.offsetY
    };
    return this.currentLankOffset != null ? this.currentLankOffset : this.currentLankOffset = {
      x: this.currentLank.sprite.x,
      y: this.currentLank.sprite.y
    };
  };

  ThangTypeEditView.prototype.onCanvasMouseUp = function(e) {
    var node, offset;
    this.canvasDragStart = null;
    if (!this.canvasDragOffset) {
      return;
    }
    if (!(node = this.treema.getLastSelectedTreema())) {
      return;
    }
    offset = node.get('/');
    offset.x += Math.round(this.canvasDragOffset.x);
    offset.y += Math.round(this.canvasDragOffset.y);
    this.canvasDragOffset = null;
    return node.set('/', offset);
  };

  ThangTypeEditView.prototype.onClickExportSpriteSheetButton = function() {
    var modal;
    modal = new ExportThangTypeModal({}, this.thangType);
    return this.openModalView(modal);
  };

  ThangTypeEditView.prototype.destroy = function() {
    var ref;
    if ((ref = this.camera) != null) {
      ref.destroy();
    }
    return ThangTypeEditView.__super__.destroy.call(this);
  };

  return ThangTypeEditView;

})(RootView);

imageToPortrait = function(img) {
  var canvas, ctx, scaleX, scaleY;
  canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  ctx = canvas.getContext('2d');
  scaleX = 100 / img.width;
  scaleY = 100 / img.height;
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
};
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/ThangTypeEditView.js.map
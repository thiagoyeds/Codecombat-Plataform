require.register("views/editor/level/modals/WorldSelectModal", function(exports, require, module) {
var ModalView, Surface, ThangType, WorldSelectModal, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ModalView = require('views/core/ModalView');

template = require('templates/editor/level/modal/world-select-modal');

Surface = require('lib/surface/Surface');

ThangType = require('models/ThangType');

module.exports = WorldSelectModal = (function(superClass) {
  extend(WorldSelectModal, superClass);

  WorldSelectModal.prototype.id = 'world-select-modal';

  WorldSelectModal.prototype.template = template;

  WorldSelectModal.prototype.modalWidthPercent = 80;

  WorldSelectModal.prototype.cache = false;

  WorldSelectModal.prototype.subscriptions = {
    'surface:choose-region': 'selectionMade',
    'surface:choose-point': 'selectionMade'
  };

  WorldSelectModal.prototype.events = {
    'click #done-button': 'done'
  };

  WorldSelectModal.prototype.shortcuts = {
    'enter': 'done'
  };

  function WorldSelectModal(options) {
    this.done = bind(this.done, this);
    this.selectionMade = bind(this.selectionMade, this);
    this.getRenderData = bind(this.getRenderData, this);
    this.world = options.world;
    this.dataType = options.dataType || 'point';
    this["default"] = options["default"];
    this.defaultFromZoom = options.defaultFromZoom;
    this.selectionMade = _.debounce(this.selectionMade, 300);
    this.supermodel = options.supermodel;
    WorldSelectModal.__super__.constructor.call(this);
  }

  WorldSelectModal.prototype.getRenderData = function(c) {
    if (c == null) {
      c = {};
    }
    c = WorldSelectModal.__super__.getRenderData.call(this, c);
    c.selectingPoint = this.dataType === 'point';
    c.flexibleRegion = this.dataType === 'region';
    return c;
  };

  WorldSelectModal.prototype.afterInsert = function() {
    WorldSelectModal.__super__.afterInsert.call(this);
    return this.initSurface();
  };

  WorldSelectModal.prototype.initSurface = function() {
    var canvases, normalCanvas, webGLCanvas;
    webGLCanvas = this.$el.find('.webgl-canvas');
    normalCanvas = this.$el.find('.normal-canvas');
    canvases = webGLCanvas.add(normalCanvas);
    canvases.attr('width', currentView.$el.width() * .8 - 70);
    canvases.attr('height', currentView.$el.height() * .6);
    this.surface = new Surface(this.world, normalCanvas, webGLCanvas, {
      paths: false,
      grid: true,
      navigateToSelection: false,
      choosing: this.dataType,
      coords: true,
      thangTypes: this.supermodel.getModels(ThangType),
      showInvisible: true
    });
    this.surface.playing = false;
    this.surface.setWorld(this.world);
    this.surface.camera.zoomTo({
      x: 262,
      y: -164
    }, 1.66, 0);
    return this.showDefaults();
  };

  WorldSelectModal.prototype.showDefaults = function() {
    var surfaceTarget;
    if (this.dataType === 'point') {
      if ((this["default"] != null) && _.isFinite(this["default"].x) && _.isFinite(this["default"].y)) {
        this.surface.chooser.setPoint(this["default"]);
        return this.surface.camera.zoomTo(this.surface.camera.worldToSurface(this["default"]), 2);
      }
    } else if (this.defaultFromZoom != null) {
      this.showZoomRegion();
      surfaceTarget = this.surface.camera.worldToSurface(this.defaultFromZoom.target);
      return this.surface.camera.zoomTo(surfaceTarget, this.defaultFromZoom.zoom * 0.6);
    } else if ((this["default"] != null) && _.isFinite(this["default"][0].x) && _.isFinite(this["default"][0].y) && _.isFinite(this["default"][1].x) && _.isFinite(this["default"][1].y)) {
      this.surface.chooser.setRegion(this["default"]);
      return this.showBoundaryRegion();
    }
  };

  WorldSelectModal.prototype.showZoomRegion = function() {
    var canvasHeight, canvasWidth, d, dimensions, height, region, target, width;
    d = this.defaultFromZoom;
    canvasWidth = 924;
    canvasHeight = 589;
    dimensions = {
      x: canvasWidth / d.zoom,
      y: canvasHeight / d.zoom
    };
    dimensions = this.surface.camera.surfaceToWorld(dimensions);
    width = dimensions.x;
    height = dimensions.y;
    target = d.target;
    region = [
      {
        x: target.x - width / 2,
        y: target.y - height / 2
      }, {
        x: target.x + width / 2,
        y: target.y + height / 2
      }
    ];
    return this.surface.chooser.setRegion(region);
  };

  WorldSelectModal.prototype.showBoundaryRegion = function() {
    var bounds, point, zoom;
    bounds = this.surface.camera.normalizeBounds(this["default"]);
    point = {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2
    };
    zoom = 0.8 * (this.surface.camera.canvasWidth / bounds.width);
    return this.surface.camera.zoomTo(point, zoom);
  };

  WorldSelectModal.prototype.selectionMade = function(e) {
    e.camera = this.surface.camera;
    return this.lastSelection = e;
  };

  WorldSelectModal.prototype.done = function() {
    if (typeof this.callback === "function") {
      this.callback(this.lastSelection);
    }
    return this.hide();
  };

  WorldSelectModal.prototype.onHidden = function() {
    var ref;
    return (ref = this.surface) != null ? ref.destroy() : void 0;
  };

  return WorldSelectModal;

})(ModalView);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/level/modals/WorldSelectModal.js.map
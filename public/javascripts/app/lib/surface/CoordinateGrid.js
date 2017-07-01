require.register("lib/surface/CoordinateGrid", function(exports, require, module) {
var CocoClass, CoordinateGrid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = CoordinateGrid = (function(superClass) {
  extend(CoordinateGrid, superClass);

  CoordinateGrid.prototype.subscriptions = {
    'level:toggle-grid': 'onToggleGrid'
  };

  CoordinateGrid.prototype.shortcuts = {
    'ctrl+g, ⌘+g': 'onToggleGrid'
  };

  function CoordinateGrid(options, worldSize) {
    CoordinateGrid.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.textLayer = options.textLayer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    if (!this.textLayer) {
      console.error(this.toString(), 'needs a textLayer.');
    }
    this.build(worldSize);
  }

  CoordinateGrid.prototype.destroy = function() {
    return CoordinateGrid.__super__.destroy.call(this);
  };

  CoordinateGrid.prototype.toString = function() {
    return '<CoordinateGrid>';
  };

  CoordinateGrid.prototype.build = function(worldSize) {
    var bounds, gridSize, linesDrawn, ref, ref1, sup, supEnd, supStart, t, wop, wopEnd, wopStart, worldHeight, worldWidth;
    worldWidth = worldSize[0] || 80;
    worldHeight = worldSize[1] || 68;
    this.gridContainer = new createjs.Container();
    this.gridShape = new createjs.Shape();
    this.gridContainer.addChild(this.gridShape);
    this.gridContainer.mouseEnabled = false;
    this.gridShape.alpha = 0.125;
    this.gridShape.graphics.setStrokeStyle(1);
    this.gridShape.graphics.beginStroke('blue');
    gridSize = Math.round(worldWidth / 20);
    wopStart = {
      x: 0,
      y: 0
    };
    wopEnd = {
      x: worldWidth,
      y: worldHeight
    };
    supStart = this.camera.worldToSurface(wopStart);
    supEnd = this.camera.worldToSurface(wopEnd);
    wop = {
      x: wopStart.x,
      y: wopStart.y
    };
    this.labels = [];
    linesDrawn = 0;
    while (wop.x <= wopEnd.x) {
      sup = this.camera.worldToSurface(wop);
      this.gridShape.graphics.mt(sup.x, supStart.y).lt(sup.x, supEnd.y);
      if (++linesDrawn % 2) {
        t = new createjs.Text(wop.x.toFixed(0), '16px Arial', 'blue');
        t.textAlign = 'center';
        t.textBaseline = 'bottom';
        t.x = sup.x;
        t.y = supStart.y;
        t.alpha = 0.75;
        this.labels.push(t);
      }
      wop.x += gridSize;
      if ((wopEnd.x < (ref = wop.x) && ref <= wopEnd.x - gridSize / 2)) {
        wop.x = wopEnd.x;
      }
    }
    linesDrawn = 0;
    while (wop.y <= wopEnd.y) {
      sup = this.camera.worldToSurface(wop);
      this.gridShape.graphics.mt(supStart.x, sup.y).lt(supEnd.x, sup.y);
      if (++linesDrawn % 2) {
        t = new createjs.Text(wop.y.toFixed(0), '16px Arial', 'blue');
        t.textAlign = 'left';
        t.textBaseline = 'middle';
        t.x = 0;
        t.y = sup.y;
        t.alpha = 0.75;
        this.labels.push(t);
      }
      wop.y += gridSize;
      if ((wopEnd.y < (ref1 = wop.y) && ref1 <= wopEnd.y - gridSize / 2)) {
        wop.y = wopEnd.y;
      }
    }
    this.gridShape.graphics.endStroke();
    bounds = {
      x: supStart.x,
      y: supEnd.y,
      width: supEnd.x - supStart.x,
      height: supStart.y - supEnd.y
    };
    if (!((bounds != null ? bounds.width : void 0) && bounds.height)) {
      return;
    }
    return this.gridContainer.cache(bounds.x, bounds.y, bounds.width, bounds.height);
  };

  CoordinateGrid.prototype.showGrid = function() {
    var i, label, len, ref, results;
    if (this.gridShowing()) {
      return;
    }
    this.layer.addChild(this.gridContainer);
    ref = this.labels;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      results.push(this.textLayer.addChild(label));
    }
    return results;
  };

  CoordinateGrid.prototype.hideGrid = function() {
    var i, label, len, ref, results;
    if (!this.gridShowing()) {
      return;
    }
    this.layer.removeChild(this.gridContainer);
    ref = this.labels;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      label = ref[i];
      results.push(this.textLayer.removeChild(label));
    }
    return results;
  };

  CoordinateGrid.prototype.gridShowing = function() {
    var ref;
    return ((ref = this.gridContainer) != null ? ref.parent : void 0) != null;
  };

  CoordinateGrid.prototype.onToggleGrid = function(e) {
    if (e != null) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
    }
    if (this.gridShowing()) {
      return this.hideGrid();
    } else {
      return this.showGrid();
    }
  };

  return CoordinateGrid;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/CoordinateGrid.js.map
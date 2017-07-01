require.register("lib/surface/RegionChooser", function(exports, require, module) {
var Camera, CocoClass, RegionChooser,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

Camera = require('./Camera');

module.exports = RegionChooser = (function(superClass) {
  extend(RegionChooser, superClass);

  function RegionChooser(options) {
    this.options = options;
    this.onMouseUp = bind(this.onMouseUp, this);
    this.onMouseMove = bind(this.onMouseMove, this);
    this.onMouseDown = bind(this.onMouseDown, this);
    RegionChooser.__super__.constructor.call(this);
    this.options.stage.addEventListener('stagemousedown', this.onMouseDown);
    this.options.stage.addEventListener('stagemousemove', this.onMouseMove);
    this.options.stage.addEventListener('stagemouseup', this.onMouseUp);
  }

  RegionChooser.prototype.destroy = function() {
    this.options.stage.removeEventListener('stagemousedown', this.onMouseDown);
    this.options.stage.removeEventListener('stagemousemove', this.onMouseMove);
    this.options.stage.removeEventListener('stagemouseup', this.onMouseUp);
    return RegionChooser.__super__.destroy.call(this);
  };

  RegionChooser.prototype.onMouseDown = function(e) {
    if (!key.shift) {
      return;
    }
    this.firstPoint = this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    });
    return this.options.camera.dragDisabled = true;
  };

  RegionChooser.prototype.onMouseMove = function(e) {
    if (!this.firstPoint) {
      return;
    }
    this.secondPoint = this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    });
    if (this.options.restrictRatio || key.alt) {
      this.restrictRegion();
    }
    return this.updateShape();
  };

  RegionChooser.prototype.onMouseUp = function(e) {
    if (!this.firstPoint) {
      return;
    }
    Backbone.Mediator.publish('surface:choose-region', {
      points: [this.firstPoint, this.secondPoint]
    });
    this.firstPoint = null;
    this.secondPoint = null;
    return this.options.camera.dragDisabled = false;
  };

  RegionChooser.prototype.restrictRegion = function() {
    var RATIO, currentRatio, rect, targetSurfaceHeight, targetSurfaceWidth, targetWorldHeight, targetWorldWidth;
    RATIO = 1.56876;
    rect = this.options.camera.normalizeBounds([this.firstPoint, this.secondPoint]);
    currentRatio = rect.width / rect.height;
    if (currentRatio > RATIO) {
      targetSurfaceHeight = rect.width / RATIO;
      targetWorldHeight = targetSurfaceHeight * Camera.MPP * this.options.camera.x2y;
      if (this.secondPoint.y < this.firstPoint.y) {
        targetWorldHeight *= -1;
      }
      return this.secondPoint.y = this.firstPoint.y + targetWorldHeight;
    } else {
      targetSurfaceWidth = rect.height * RATIO;
      targetWorldWidth = targetSurfaceWidth * Camera.MPP;
      if (this.secondPoint.x < this.firstPoint.x) {
        targetWorldWidth *= -1;
      }
      return this.secondPoint.x = this.firstPoint.x + targetWorldWidth;
    }
  };

  RegionChooser.prototype.setRegion = function(worldPoints) {
    this.firstPoint = worldPoints[0];
    this.secondPoint = worldPoints[1];
    this.updateShape();
    this.firstPoint = null;
    return this.secondPoint = null;
  };

  RegionChooser.prototype.updateShape = function() {
    var rect;
    rect = this.options.camera.normalizeBounds([this.firstPoint, this.secondPoint]);
    if (this.shape) {
      this.options.surfaceLayer.removeChild(this.shape);
    }
    this.shape = new createjs.Shape();
    this.shape.alpha = 0.5;
    this.shape.mouseEnabled = false;
    this.shape.graphics.beginFill('#fedcba').drawRect(rect.x, rect.y, rect.width, rect.height);
    this.shape.graphics.endFill();
    this.shape.skipScaling = true;
    return this.options.surfaceLayer.addChild(this.shape);
  };

  return RegionChooser;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/RegionChooser.js.map
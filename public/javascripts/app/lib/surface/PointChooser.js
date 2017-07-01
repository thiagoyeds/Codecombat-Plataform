require.register("lib/surface/PointChooser", function(exports, require, module) {
var CocoClass, PointChooser,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = PointChooser = (function(superClass) {
  extend(PointChooser, superClass);

  function PointChooser(options) {
    this.options = options;
    this.onMouseDown = bind(this.onMouseDown, this);
    PointChooser.__super__.constructor.call(this);
    this.buildShape();
    this.options.stage.addEventListener('stagemousedown', this.onMouseDown);
    this.options.camera.dragDisabled = true;
  }

  PointChooser.prototype.destroy = function() {
    this.options.stage.removeEventListener('stagemousedown', this.onMouseDown);
    return PointChooser.__super__.destroy.call(this);
  };

  PointChooser.prototype.setPoint = function(point) {
    this.point = point;
    return this.updateShape();
  };

  PointChooser.prototype.buildShape = function() {
    this.shape = new createjs.Shape();
    this.shape.alpha = 0.9;
    this.shape.mouseEnabled = false;
    this.shape.graphics.setStrokeStyle(1, 'round').beginStroke('#000000').beginFill('#fedcba');
    return this.shape.graphics.drawCircle(0, 0, 4).endFill();
  };

  PointChooser.prototype.onMouseDown = function(e) {
    if (!key.shift) {
      return;
    }
    this.setPoint(this.options.camera.screenToWorld({
      x: e.stageX,
      y: e.stageY
    }));
    return Backbone.Mediator.publish('surface:choose-point', {
      point: this.point
    });
  };

  PointChooser.prototype.updateShape = function() {
    var sup;
    sup = this.options.camera.worldToSurface(this.point);
    if (!this.shape.parent) {
      this.options.surfaceLayer.addChild(this.shape);
    }
    this.shape.x = sup.x;
    return this.shape.y = sup.y;
  };

  return PointChooser;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/PointChooser.js.map
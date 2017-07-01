require.register("lib/surface/Camera", function(exports, require, module) {
var Camera, CocoClass, DEFAULT_TARGET, DEFAULT_TIME, DEFAULT_ZOOM, GameUIState, MAX_ZOOM, MIN_ZOOM, STANDARD_ZOOM_HEIGHT, STANDARD_ZOOM_WIDTH, d2r, r2d,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

GameUIState = require('models/GameUIState');

r2d = function(radians) {
  return radians * 180 / Math.PI;
};

d2r = function(degrees) {
  return degrees / 180 * Math.PI;
};

MAX_ZOOM = 8;

MIN_ZOOM = 0.1;

DEFAULT_ZOOM = 2.0;

DEFAULT_TARGET = {
  x: 0,
  y: 0
};

DEFAULT_TIME = 1000;

STANDARD_ZOOM_WIDTH = 924;

STANDARD_ZOOM_HEIGHT = 589;

module.exports = Camera = (function(superClass) {
  extend(Camera, superClass);

  Camera.PPM = 10;

  Camera.MPP = 0.1;

  Camera.prototype.bounds = null;

  Camera.prototype.target = DEFAULT_TARGET;

  Camera.prototype.zoom = DEFAULT_ZOOM;

  Camera.prototype.canvasScaleFactorX = 1;

  Camera.prototype.canvasScaleFactorY = 1;

  Camera.prototype.oldZoom = null;

  Camera.prototype.newZoom = null;

  Camera.prototype.oldTarget = null;

  Camera.prototype.newTarget = null;

  Camera.prototype.tweenProgress = 0.0;

  Camera.prototype.instant = false;

  Camera.prototype.subscriptions = {
    'camera:zoom-in': 'onZoomIn',
    'camera:zoom-out': 'onZoomOut',
    'camera:zoom-to': 'onZoomTo',
    'level:restarted': 'onLevelRestarted'
  };

  function Camera(canvas, options) {
    var angle, hFOV, ref;
    this.canvas = canvas;
    this.options = options != null ? options : {};
    this.finishTween = bind(this.finishTween, this);
    angle = Math.asin(0.75);
    hFOV = d2r(30);
    Camera.__super__.constructor.call(this);
    this.gameUIState = this.options.gameUIState || new GameUIState();
    this.listenTo(this.gameUIState, 'surface:stage-mouse-move', this.onMouseMove);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-down', this.onMouseDown);
    this.listenTo(this.gameUIState, 'surface:stage-mouse-up', this.onMouseUp);
    this.listenTo(this.gameUIState, 'surface:mouse-scrolled', this.onMouseScrolled);
    this.handleEvents = (ref = this.options.handleEvents) != null ? ref : true;
    this.canvasWidth = parseInt(this.canvas.attr('width'), 10);
    this.canvasHeight = parseInt(this.canvas.attr('height'), 10);
    this.offset = {
      x: 0,
      y: 0
    };
    this.calculateViewingAngle(angle);
    this.calculateFieldOfView(hFOV);
    this.calculateAxisConversionFactors();
    this.calculateMinMaxZoom();
    this.updateViewports();
  }

  Camera.prototype.onResize = function(newCanvasWidth, newCanvasHeight) {
    this.canvasScaleFactorX = newCanvasWidth / this.canvasWidth;
    this.canvasScaleFactorY = newCanvasHeight / this.canvasHeight;
    return Backbone.Mediator.publish('camera:zoom-updated', {
      camera: this,
      zoom: this.zoom,
      surfaceViewport: this.surfaceViewport
    });
  };

  Camera.prototype.calculateViewingAngle = function(angle) {
    var epsilon;
    epsilon = 0.000001;
    this.angle = Math.max(Math.min(Math.PI / 2 - epsilon, angle), epsilon);
    if (this.angle !== angle && angle !== 0 && angle !== Math.PI / 2) {
      return console.log("Restricted given camera angle of " + (r2d(angle)) + " to " + (r2d(this.angle)) + ".");
    }
  };

  Camera.prototype.calculateFieldOfView = function(hFOV) {
    var epsilon;
    epsilon = 0.000001;
    this.hFOV = Math.max(Math.min(Math.PI - epsilon, hFOV), epsilon);
    if (this.hFOV !== hFOV && hFOV !== 0 && hFOV !== Math.PI) {
      console.log("Restricted given horizontal field of view to " + (r2d(hFOV)) + " to " + (r2d(this.hFOV)) + ".");
    }
    this.vFOV = 2 * Math.atan(Math.tan(this.hFOV / 2) * this.canvasHeight / this.canvasWidth);
    if (this.vFOV > Math.PI) {
      console.log('Vertical field of view problem: expected canvas not to be taller than it is wide with high field of view.');
      return this.vFOV = Math.PI - epsilon;
    }
  };

  Camera.prototype.calculateAxisConversionFactors = function() {
    this.y2x = Math.sin(this.angle);
    this.z2x = Math.cos(this.angle);
    this.z2y = this.z2x / this.y2x;
    this.x2y = 1 / this.y2x;
    this.x2z = 1 / this.z2x;
    return this.y2z = 1 / this.z2y;
  };

  Camera.prototype.worldToSurface = function(pos) {
    var x, y;
    x = pos.x * Camera.PPM;
    y = -pos.y * this.y2x * Camera.PPM;
    if (pos.z) {
      y -= this.z2y * this.y2x * pos.z * Camera.PPM;
    }
    return {
      x: x,
      y: y
    };
  };

  Camera.prototype.surfaceToCanvas = function(pos) {
    return {
      x: (pos.x - this.surfaceViewport.x) * this.zoom,
      y: (pos.y - this.surfaceViewport.y) * this.zoom
    };
  };

  Camera.prototype.canvasToScreen = function(pos) {
    return {
      x: pos.x * this.canvasScaleFactorX,
      y: pos.y * this.canvasScaleFactorY
    };
  };

  Camera.prototype.screenToCanvas = function(pos) {
    return {
      x: pos.x / this.canvasScaleFactorX,
      y: pos.y / this.canvasScaleFactorY
    };
  };

  Camera.prototype.canvasToSurface = function(pos) {
    return {
      x: pos.x / this.zoom + this.surfaceViewport.x,
      y: pos.y / this.zoom + this.surfaceViewport.y
    };
  };

  Camera.prototype.surfaceToWorld = function(pos) {
    return {
      x: pos.x * Camera.MPP,
      y: -pos.y * Camera.MPP * this.x2y,
      z: 0
    };
  };

  Camera.prototype.canvasToWorld = function(pos) {
    return this.surfaceToWorld(this.canvasToSurface(pos));
  };

  Camera.prototype.worldToCanvas = function(pos) {
    return this.surfaceToCanvas(this.worldToSurface(pos));
  };

  Camera.prototype.worldToScreen = function(pos) {
    return this.canvasToScreen(this.worldToCanvas(pos));
  };

  Camera.prototype.surfaceToScreen = function(pos) {
    return this.canvasToScreen(this.surfaceToCanvas(pos));
  };

  Camera.prototype.screenToSurface = function(pos) {
    return this.canvasToSurface(this.screenToCanvas(pos));
  };

  Camera.prototype.screenToWorld = function(pos) {
    return this.surfaceToWorld(this.screenToSurface(pos));
  };

  Camera.prototype.cameraWorldPos = function() {
    var botDist, botFOV, topFOV, z;
    botFOV = this.x2y * this.vFOV / (this.y2x + this.x2y);
    topFOV = this.y2x * this.vFOV / (this.y2x + this.x2y);
    botDist = this.worldViewport.height / 2 * Math.sin(this.angle) / Math.sin(botFOV);
    z = botDist * Math.sin(this.angle + botFOV);
    return {
      x: this.worldViewport.cx,
      y: this.worldViewport.cy - z * this.z2y,
      z: z
    };
  };

  Camera.prototype.distanceTo = function(pos) {
    var cpos, dx, dy, dz;
    cpos = this.cameraWorldPos();
    dx = pos.x - cpos.x;
    dy = pos.y - cpos.y;
    dz = (pos.z || 0) - cpos.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  Camera.prototype.distanceRatioTo = function(pos) {
    var camDist, cpos, dy;
    cpos = this.cameraWorldPos();
    dy = this.worldViewport.cy - cpos.y;
    camDist = Math.sqrt(dy * dy + cpos.z * cpos.z);
    return this.distanceTo(pos) / camDist;
  };

  Camera.prototype.onZoomIn = function(e) {
    return this.zoomTo(this.target, this.zoom * 1.15, 300);
  };

  Camera.prototype.onZoomOut = function(e) {
    return this.zoomTo(this.target, this.zoom / 1.15, 300);
  };

  Camera.prototype.onMouseDown = function(e) {
    if (this.dragDisabled) {
      return;
    }
    this.lastPos = {
      x: e.originalEvent.rawX,
      y: e.originalEvent.rawY
    };
    return this.mousePressed = true;
  };

  Camera.prototype.onMouseMove = function(e) {
    var newPos, target;
    if (!(this.mousePressed && this.gameUIState.get('canDragCamera'))) {
      return;
    }
    if (this.dragDisabled) {
      return;
    }
    target = this.boundTarget(this.target, this.zoom);
    newPos = {
      x: target.x + (this.lastPos.x - e.originalEvent.rawX) / this.zoom,
      y: target.y + (this.lastPos.y - e.originalEvent.rawY) / this.zoom
    };
    this.zoomTo(newPos, this.zoom, 0);
    this.lastPos = {
      x: e.originalEvent.rawX,
      y: e.originalEvent.rawY
    };
    return Backbone.Mediator.publish('camera:dragged', {});
  };

  Camera.prototype.onMouseUp = function(e) {
    return this.mousePressed = false;
  };

  Camera.prototype.onMouseScrolled = function(e) {
    var mousePoint, newHeight, newTargetX, newTargetY, newWidth, newZoom, ratio, ratioPosX, ratioPosY, target;
    ratio = 1 + 0.05 * Math.sqrt(Math.abs(e.deltaY));
    if (e.deltaY > 0) {
      ratio = 1 / ratio;
    }
    newZoom = this.zoom * ratio;
    if (e.screenPos && !this.focusedOnSprite()) {
      mousePoint = this.screenToSurface(e.screenPos);
      ratioPosX = (mousePoint.x - this.surfaceViewport.x) / this.surfaceViewport.width;
      ratioPosY = (mousePoint.y - this.surfaceViewport.y) / this.surfaceViewport.height;
      newWidth = this.canvasWidth / newZoom;
      newHeight = this.canvasHeight / newZoom;
      newTargetX = mousePoint.x - (newWidth * ratioPosX) + (newWidth / 2);
      newTargetY = mousePoint.y - (newHeight * ratioPosY) + (newHeight / 2);
      target = {
        x: newTargetX,
        y: newTargetY
      };
    } else {
      target = this.target;
    }
    return this.zoomTo(target, newZoom, 0);
  };

  Camera.prototype.onLevelRestarted = function() {
    return this.setBounds(this.firstBounds, false);
  };

  Camera.prototype.setBounds = function(worldBounds, updateZoom) {
    if (updateZoom == null) {
      updateZoom = true;
    }
    if (!this.firstBounds) {
      this.firstBounds = worldBounds;
    }
    this.bounds = this.normalizeBounds(worldBounds);
    this.calculateMinMaxZoom();
    if (updateZoom) {
      this.updateZoom(true);
    }
    if (!this.focusedOnSprite()) {
      return this.target = this.currentTarget;
    }
  };

  Camera.prototype.normalizeBounds = function(worldBounds) {
    var bottom, left, p1, p2, right, top;
    if (!worldBounds) {
      return null;
    }
    top = Math.max(worldBounds[0].y, worldBounds[1].y);
    left = Math.min(worldBounds[0].x, worldBounds[1].x);
    bottom = Math.min(worldBounds[0].y, worldBounds[1].y);
    right = Math.max(worldBounds[0].x, worldBounds[1].x);
    if (top === bottom) {
      bottom -= 1;
    }
    if (left === right) {
      right += 1;
    }
    p1 = this.worldToSurface({
      x: left,
      y: top
    });
    p2 = this.worldToSurface({
      x: right,
      y: bottom
    });
    return {
      x: p1.x,
      y: p1.y,
      width: p2.x - p1.x,
      height: p2.y - p1.y
    };
  };

  Camera.prototype.calculateMinMaxZoom = function() {
    this.maxZoom = MAX_ZOOM;
    if (!this.bounds) {
      return this.minZoom = MIN_ZOOM;
    }
    this.minZoom = Math.max(this.canvasWidth / this.bounds.width, this.canvasHeight / this.bounds.height);
    if (this.zoom) {
      this.zoom = Math.max(this.minZoom, this.zoom);
      return this.zoom = Math.min(this.maxZoom, this.zoom);
    }
  };

  Camera.prototype.zoomTo = function(newTarget, newZoom, time) {
    var ref, ref1, ref2, scale, thangType;
    if (newTarget == null) {
      newTarget = null;
    }
    if (newZoom == null) {
      newZoom = 1.0;
    }
    if (time == null) {
      time = 1500;
    }
    if (this.instant) {
      time = 0;
    }
    if (newTarget == null) {
      newTarget = {
        x: 0,
        y: 0
      };
    }
    if (this.locked) {
      newTarget = this.newTarget || this.target;
    }
    newZoom = Math.max(newZoom, this.minZoom);
    newZoom = Math.min(newZoom, this.maxZoom);
    thangType = (ref = this.target) != null ? (ref1 = ref.sprite) != null ? ref1.thangType : void 0 : void 0;
    if (thangType) {
      this.offset = _.clone(((ref2 = thangType.get('positions')) != null ? ref2.torso : void 0) || {
        x: 0,
        y: 0
      });
      scale = thangType.get('scale') || 1;
      this.offset.x *= scale;
      this.offset.y *= scale;
    } else {
      this.offset = {
        x: 0,
        y: 0
      };
    }
    if (this.zoom === newZoom && newTarget === newTarget.x && newTarget.y === newTarget.y) {
      return;
    }
    this.finishTween(true);
    if (time) {
      this.newTarget = newTarget;
      this.oldTarget = this.boundTarget(this.target, this.zoom);
      this.oldZoom = this.zoom;
      this.newZoom = newZoom;
      this.tweenProgress = 0.01;
      return createjs.Tween.get(this).to({
        tweenProgress: 1.0
      }, time, createjs.Ease.getPowOut(4)).call(this.finishTween);
    } else {
      this.target = newTarget;
      this.zoom = newZoom;
      return this.updateZoom(true);
    }
  };

  Camera.prototype.focusedOnSprite = function() {
    var ref;
    return (ref = this.target) != null ? ref.name : void 0;
  };

  Camera.prototype.finishTween = function(abort) {
    if (abort == null) {
      abort = false;
    }
    createjs.Tween.removeTweens(this);
    if (!this.newTarget) {
      return;
    }
    if (abort !== true) {
      this.target = this.newTarget;
      this.zoom = this.newZoom;
    }
    this.newZoom = this.oldZoom = this.newTarget = this.newTarget = this.tweenProgress = null;
    return this.updateZoom(true);
  };

  Camera.prototype.updateZoom = function(force) {
    var p1, p2, ref, t, target, viewportDifference;
    if (force == null) {
      force = false;
    }
    if ((!force) && (this.locked || (!this.newTarget && !this.focusedOnSprite()))) {
      return;
    }
    if (this.newTarget) {
      t = this.tweenProgress;
      this.zoom = this.oldZoom + t * (this.newZoom - this.oldZoom);
      ref = [this.oldTarget, this.boundTarget(this.newTarget, this.newZoom)], p1 = ref[0], p2 = ref[1];
      target = this.target = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };
    } else {
      target = this.boundTarget(this.target, this.zoom);
      if (!force && _.isEqual(target, this.currentTarget)) {
        return;
      }
    }
    this.currentTarget = target;
    viewportDifference = this.updateViewports(target);
    if (viewportDifference > 0.1) {
      return Backbone.Mediator.publish('camera:zoom-updated', {
        camera: this,
        zoom: this.zoom,
        surfaceViewport: this.surfaceViewport,
        minZoom: this.minZoom
      });
    }
  };

  Camera.prototype.boundTarget = function(pos, zoom) {
    var marginX, marginY, ref, thang, x, y;
    if (!this.bounds) {
      return pos;
    }
    y = pos.y;
    if (thang = (ref = pos.sprite) != null ? ref.thang : void 0) {
      y = this.worldToSurface({
        x: thang.pos.x,
        y: thang.pos.y
      }).y;
    }
    marginX = this.canvasWidth / zoom / 2;
    marginY = this.canvasHeight / zoom / 2;
    x = Math.min(Math.max(marginX + this.bounds.x, pos.x + this.offset.x), this.bounds.x + this.bounds.width - marginX);
    y = Math.min(Math.max(marginY + this.bounds.y, y + this.offset.y), this.bounds.y + this.bounds.height - marginY);
    return {
      x: x,
      y: y
    };
  };

  Camera.prototype.updateViewports = function(target) {
    var sv, viewportDifference, wv;
    if (target == null) {
      target = this.target;
    }
    sv = {
      width: this.canvasWidth / this.zoom,
      height: this.canvasHeight / this.zoom,
      cx: target.x,
      cy: target.y
    };
    sv.x = sv.cx - sv.width / 2;
    sv.y = sv.cy - sv.height / 2;
    if (this.surfaceViewport) {
      viewportDifference = Math.abs(this.surfaceViewport.x - sv.x) + 1.01 * Math.abs(this.surfaceViewport.y - sv.y) + 1.02 * Math.abs(this.surfaceViewport.width - sv.width);
    } else {
      viewportDifference = 9001;
    }
    this.surfaceViewport = sv;
    wv = this.surfaceToWorld(sv);
    wv.width = sv.width * Camera.MPP;
    wv.height = sv.height * Camera.MPP * this.x2y;
    wv.cx = wv.x + wv.width / 2;
    wv.cy = wv.y + wv.height / 2;
    this.worldViewport = wv;
    return viewportDifference;
  };

  Camera.prototype.lock = function() {
    this.target = this.currentTarget;
    return this.locked = true;
  };

  Camera.prototype.unlock = function() {
    return this.locked = false;
  };

  Camera.prototype.destroy = function() {
    createjs.Tween.removeTweens(this);
    return Camera.__super__.destroy.call(this);
  };

  Camera.prototype.onZoomTo = function(e) {
    return this.zoomTo(this.worldToSurface(e.pos), this.zoom, e.duration);
  };

  return Camera;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Camera.js.map
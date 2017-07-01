require.register("lib/surface/TrailMaster", function(exports, require, module) {
var Camera, CocoClass, FUTURE_PATH_ALPHA, FUTURE_PATH_INTERVAL_DIVISOR, FUTURE_PATH_WIDTH, PAST_PATH_ALPHA, PAST_PATH_INTERVAL_DIVISOR, PAST_PATH_WIDTH, TARGET_ALPHA, TARGET_WIDTH, TrailMaster,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

PAST_PATH_ALPHA = 0.75;

PAST_PATH_WIDTH = 5;

FUTURE_PATH_ALPHA = 0.75;

FUTURE_PATH_WIDTH = 4;

TARGET_ALPHA = 1;

TARGET_WIDTH = 10;

FUTURE_PATH_INTERVAL_DIVISOR = 4;

PAST_PATH_INTERVAL_DIVISOR = 2;

Camera = require('./Camera');

CocoClass = require('core/CocoClass');

module.exports = TrailMaster = (function(superClass) {
  extend(TrailMaster, superClass);

  TrailMaster.prototype.world = null;

  function TrailMaster(camera, layerAdapter) {
    this.camera = camera;
    this.layerAdapter = layerAdapter;
    TrailMaster.__super__.constructor.call(this);
    this.tweenedSprites = [];
    this.tweens = [];
    this.listenTo(this.layerAdapter, 'new-spritesheet', function() {
      return this.generatePaths(this.world, this.thang);
    });
  }

  TrailMaster.prototype.generatePaths = function(world, thang) {
    var pathDisplayObject;
    this.world = world;
    this.thang = thang;
    if (this.generatingPaths) {
      return;
    }
    this.generatingPaths = true;
    this.cleanUp();
    this.createGraphics();
    pathDisplayObject = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    pathDisplayObject.mouseEnabled = pathDisplayObject.mouseChildren = false;
    pathDisplayObject.addChild(this.createFuturePath());
    pathDisplayObject.addChild(this.createTargets());
    this.generatingPaths = false;
    return pathDisplayObject;
  };

  TrailMaster.prototype.cleanUp = function() {
    var j, len, ref, sprite;
    ref = this.tweenedSprites;
    for (j = 0, len = ref.length; j < len; j++) {
      sprite = ref[j];
      createjs.Tween.removeTweens(sprite);
    }
    this.tweenedSprites = [];
    return this.tweens = [];
  };

  TrailMaster.prototype.createGraphics = function() {
    this.targetDotKey = this.cachePathDot(TARGET_WIDTH, this.colorForThang(this.thang.team, TARGET_ALPHA), [0, 0, 0, 1]);
    this.pastDotKey = this.cachePathDot(PAST_PATH_WIDTH, this.colorForThang(this.thang.team, PAST_PATH_ALPHA), [0, 0, 0, 1]);
    return this.futureDotKey = this.cachePathDot(FUTURE_PATH_WIDTH, [255, 255, 255, FUTURE_PATH_ALPHA], this.colorForThang(this.thang.team, 1));
  };

  TrailMaster.prototype.cachePathDot = function(width, fillColor, strokeColor) {
    var circle, key, radius, ref, ref1;
    key = "path-dot-" + width + "-" + fillColor + "-" + strokeColor;
    fillColor = (ref = createjs.Graphics).getRGB.apply(ref, fillColor);
    strokeColor = (ref1 = createjs.Graphics).getRGB.apply(ref1, strokeColor);
    if (indexOf.call(this.layerAdapter.spriteSheet.getAnimations(), key) < 0) {
      circle = new createjs.Shape();
      radius = width / 2;
      circle.graphics.setStrokeStyle(width / 5).beginFill(fillColor).beginStroke(strokeColor).drawCircle(0, 0, radius);
      this.layerAdapter.addCustomGraphic(key, circle, [-radius * 1.5, -radius * 1.5, radius * 3, radius * 3]);
    }
    return key;
  };

  TrailMaster.prototype.colorForThang = function(team, alpha) {
    var rgb;
    if (alpha == null) {
      alpha = 1.0;
    }
    rgb = [0, 255, 0];
    if (team === 'humans') {
      rgb = [255, 0, 0];
    }
    if (team === 'ogres') {
      rgb = [0, 0, 255];
    }
    rgb.push(alpha);
    return rgb;
  };

  TrailMaster.prototype.createPastPath = function() {
    var interval, params, points;
    if (!(points = this.world.pointsForThang(this.thang.id, this.camera))) {
      return;
    }
    interval = Math.max(1, parseInt(this.world.frameRate / PAST_PATH_INTERVAL_DIVISOR));
    params = {
      interval: interval,
      frameKey: this.pastDotKey
    };
    return this.createPath(points, params);
  };

  TrailMaster.prototype.createFuturePath = function() {
    var interval, params, points;
    if (!(points = this.world.pointsForThang(this.thang.id, this.camera))) {
      return;
    }
    interval = Math.max(1, parseInt(this.world.frameRate / FUTURE_PATH_INTERVAL_DIVISOR));
    params = {
      interval: interval,
      animate: true,
      frameKey: this.futureDotKey
    };
    return this.createPath(points, params);
  };

  TrailMaster.prototype.createTargets = function() {
    var container, i, j, len, ref, sprite, sup, x, y;
    if (!this.thang.allTargets) {
      return;
    }
    container = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    ref = this.thang.allTargets;
    for (i = j = 0, len = ref.length; j < len; i = j += 2) {
      x = ref[i];
      y = this.thang.allTargets[i + 1];
      sup = this.camera.worldToSurface({
        x: x,
        y: y
      });
      sprite = new createjs.Sprite(this.layerAdapter.spriteSheet);
      sprite.scaleX = sprite.scaleY = 1 / this.layerAdapter.resolutionFactor;
      sprite.scaleY *= this.camera.y2x;
      sprite.gotoAndStop(this.targetDotKey);
      sprite.x = sup.x;
      sprite.y = sup.y;
      container.addChild(sprite);
    }
    return container;
  };

  TrailMaster.prototype.createPath = function(points, options) {
    var container, i, interval, j, key, lastSprite, len, ref, sprite, tween, x, y;
    if (options == null) {
      options = {};
    }
    options = options || {};
    interval = options.interval || 8;
    key = options.frameKey || this.pastDotKey;
    container = new createjs.SpriteContainer(this.layerAdapter.spriteSheet);
    ref = interval * 2;
    for ((ref > 0 ? (i = j = 0, len = points.length) : i = j = points.length - 1); ref > 0 ? j < len : j >= 0; i = j += ref) {
      x = points[i];
      y = points[i + 1];
      sprite = new createjs.Sprite(this.layerAdapter.spriteSheet);
      sprite.scaleX = sprite.scaleY = 1 / this.layerAdapter.resolutionFactor;
      sprite.scaleY *= this.camera.y2x;
      sprite.gotoAndStop(key);
      sprite.x = x;
      sprite.y = y;
      container.addChild(sprite);
      if (lastSprite && options.animate) {
        tween = createjs.Tween.get(lastSprite, {
          loop: true
        }).to({
          x: x,
          y: y
        }, 1000);
        this.tweenedSprites.push(lastSprite);
        this.tweens.push(tween);
      }
      lastSprite = sprite;
    }
    this.logged = true;
    return container;
  };

  TrailMaster.prototype.play = function() {
    var j, len, ref, results, tween;
    ref = this.tweens;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      tween = ref[j];
      results.push(tween.setPaused(false));
    }
    return results;
  };

  TrailMaster.prototype.stop = function() {
    var j, len, ref, results, tween;
    ref = this.tweens;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      tween = ref[j];
      results.push(tween.setPaused(true));
    }
    return results;
  };

  TrailMaster.prototype.destroy = function() {
    this.cleanUp();
    return TrailMaster.__super__.destroy.call(this);
  };

  return TrailMaster;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/TrailMaster.js.map
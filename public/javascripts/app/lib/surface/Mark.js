require.register("lib/surface/Mark", function(exports, require, module) {
var Camera, CocoClass, Mark, ThangType, markThangTypes,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

Camera = require('./Camera');

ThangType = require('models/ThangType');

markThangTypes = {};

module.exports = Mark = (function(superClass) {
  extend(Mark, superClass);

  Mark.prototype.subscriptions = {};

  Mark.prototype.alpha = 1;

  function Mark(options) {
    Mark.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.name = options.name;
    this.lank = options.lank;
    this.camera = options.camera;
    this.layer = options.layer;
    this.thangType = options.thangType;
    this.listenTo(this.layer, 'new-spritesheet', this.onLayerMadeSpriteSheet);
    if (!this.name) {
      console.error(this.toString(), 'needs a name.');
    }
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  Mark.prototype.destroy = function() {
    var ref, ref1;
    if (this.sprite) {
      createjs.Tween.removeTweens(this.sprite);
    }
    if ((ref = this.sprite) != null) {
      if ((ref1 = ref.parent) != null) {
        ref1.removeChild(this.sprite);
      }
    }
    if (this.markLank) {
      this.layer.removeLank(this.markLank);
      this.markLank.destroy();
    }
    this.lank = null;
    return Mark.__super__.destroy.call(this);
  };

  Mark.prototype.toString = function() {
    var ref, ref1, ref2;
    return "<Mark " + this.name + ": Sprite " + ((ref = (ref1 = this.lank) != null ? (ref2 = ref1.thang) != null ? ref2.id : void 0 : void 0) != null ? ref : 'None') + ">";
  };

  Mark.prototype.onLayerMadeSpriteSheet = function() {
    if (!this.sprite) {
      return;
    }
    if (this.markLank) {
      return this.update();
    }
    this.layer.removeChild(this.sprite);
    this.sprite = null;
    this.build();
    this.layer.addChild(this.sprite);
    this.layer.updateLayerOrder();
    return this.update();
  };

  Mark.prototype.toggle = function(to) {
    to = !!to;
    if (to === this.on) {
      return this;
    }
    if (!this.sprite) {
      return this.toggleTo = to;
    }
    this.on = to;
    delete this.toggleTo;
    if (this.on) {
      if (this.markLank) {
        this.layer.addLank(this.markLank);
      } else {
        this.layer.addChild(this.sprite);
        this.layer.updateLayerOrder();
      }
    } else {
      if (this.markLank) {
        this.layer.removeLank(this.markLank);
      } else {
        this.layer.removeChild(this.sprite);
      }
      if (this.highlightTween) {
        this.highlightDelay = this.highlightTween = null;
        createjs.Tween.removeTweens(this.sprite);
        this.sprite.visible = true;
      }
    }
    return this;
  };

  Mark.prototype.setLayer = function(layer) {
    var wasOn;
    if (layer === this.layer) {
      return;
    }
    wasOn = this.on;
    this.toggle(false);
    this.layer = layer;
    if (wasOn) {
      return this.toggle(true);
    }
  };

  Mark.prototype.setLank = function(lank) {
    if (lank === this.lank) {
      return;
    }
    this.lank = lank;
    this.build();
    return this;
  };

  Mark.prototype.build = function() {
    var ref;
    if (!this.sprite) {
      if (this.name === 'bounds') {
        this.buildBounds();
      } else if (this.name === 'shadow') {
        this.buildShadow();
      } else if (this.name === 'debug') {
        this.buildDebug();
      } else if (this.name.match(/.+(Range|Distance|Radius)$/)) {
        this.buildRadius(this.name);
      } else if (this.thangType) {
        this.buildSprite();
      } else {
        console.error('Don\'t know how to build mark for', this.name);
      }
      if ((ref = this.sprite) != null) {
        ref.mouseEnabled = false;
      }
    }
    return this;
  };

  Mark.prototype.buildBounds = function() {
    var color, colors, h, i, letter, ref, ref1, shape, style, text, w;
    this.sprite = new createjs.Container();
    this.sprite.mouseChildren = false;
    style = this.lank.thang.drawsBoundsStyle;
    this.drawsBoundsIndex = this.lank.thang.drawsBoundsIndex;
    if (style === 'corner-text' && this.lank.thang.world.age === 0) {
      return;
    }
    colors = (function() {
      var j, results;
      results = [];
      for (i = j = 1; j < 4; i = ++j) {
        results.push(128 + Math.floor(('0.' + Math.sin(3 * this.drawsBoundsIndex + i).toString().substr(6)) * 128));
      }
      return results;
    }).call(this);
    color = "rgba(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ", 0.5)";
    ref = [this.lank.thang.width * Camera.PPM, this.lank.thang.height * Camera.PPM * this.camera.y2x], w = ref[0], h = ref[1];
    if (style === 'border-text' || style === 'corner-text') {
      this.drawsBoundsBorderShape = shape = new createjs.Shape();
      shape.graphics.setStrokeStyle(5);
      shape.graphics.beginStroke(color);
      if (style === 'border-text') {
        shape.graphics.beginFill(color.replace('0.5', '0.25'));
      } else {
        shape.graphics.beginFill(color);
      }
      if ((ref1 = this.lank.thang.shape) === 'ellipsoid' || ref1 === 'disc') {
        shape.drawEllipse(0, 0, w, h);
      } else {
        shape.graphics.drawRect(-w / 2, -h / 2, w, h);
      }
      shape.graphics.endStroke();
      shape.graphics.endFill();
      this.sprite.addChild(shape);
    }
    if (style === 'border-text') {
      text = new createjs.Text('' + this.drawsBoundsIndex, '20px Arial', color.replace('0.5', '1'));
      text.regX = text.getMeasuredWidth() / 2;
      text.regY = text.getMeasuredHeight() / 2;
      text.shadow = new createjs.Shadow('#000000', 1, 1, 0);
      this.sprite.addChild(text);
    } else if (style === 'corner-text') {
      if (this.lank.thang.world.age === 0) {
        return;
      }
      letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.drawsBoundsIndex % 26];
      text = new createjs.Text(letter, '14px Arial', '#333333');
      text.x = -w / 2 + 2;
      text.y = -h / 2 + 2;
      this.sprite.addChild(text);
    } else {
      console.warn(this.lank.thang.id, 'didn\'t know how to draw bounds style:', style);
    }
    if (w > 0 && h > 0 && style === 'border-text') {
      this.sprite.cache(-w / 2, -h / 2, w, h, 2);
    }
    this.lastWidth = this.lank.thang.width;
    return this.lastHeight = this.lank.thang.height;
  };

  Mark.prototype.buildShadow = function() {
    var SHADOW_SIZE, actualLongest, alpha, bounds, height, key, longest, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, shape, shapeName, width;
    shapeName = (ref = this.lank.thang.shape) === 'ellipsoid' || ref === 'disc' ? 'ellipse' : 'rect';
    key = shapeName + "-shadow";
    SHADOW_SIZE = 10;
    if (indexOf.call(this.layer.spriteSheet.getAnimations(), key) < 0) {
      shape = new createjs.Shape();
      shape.graphics.beginFill("rgba(0,0,0)");
      bounds = [-SHADOW_SIZE / 2, -SHADOW_SIZE / 2, SHADOW_SIZE, SHADOW_SIZE];
      if (shapeName === 'ellipse') {
        (ref1 = shape.graphics).drawEllipse.apply(ref1, bounds);
      } else {
        (ref2 = shape.graphics).drawRect.apply(ref2, bounds);
      }
      shape.graphics.endFill();
      this.layer.addCustomGraphic(key, shape, bounds);
    }
    alpha = (ref3 = (ref4 = this.lank.thang) != null ? ref4.alpha : void 0) != null ? ref3 : 1;
    width = ((ref5 = (ref6 = this.lank.thang) != null ? ref6.width : void 0) != null ? ref5 : 0) + 0.5;
    height = ((ref7 = (ref8 = this.lank.thang) != null ? ref8.height : void 0) != null ? ref7 : 0) + 0.5;
    longest = Math.max(width, height);
    actualLongest = (ref9 = this.lank.thangType.get('shadow')) != null ? ref9 : longest;
    width = width * actualLongest / longest;
    height = height * actualLongest / longest;
    width *= Camera.PPM;
    height *= Camera.PPM * this.camera.y2x;
    this.sprite = new createjs.Sprite(this.layer.spriteSheet);
    this.sprite.gotoAndStop(key);
    this.sprite.mouseEnabled = false;
    this.sprite.alpha = alpha;
    this.baseScaleX = this.sprite.scaleX = width / (this.layer.resolutionFactor * SHADOW_SIZE);
    return this.baseScaleY = this.sprite.scaleY = height / (this.layer.resolutionFactor * SHADOW_SIZE);
  };

  Mark.prototype.buildRadius = function(range) {
    var alpha, colors, extraColors, fillColor, i, rangeNames, ref, strokeColor;
    alpha = 0.15;
    colors = {
      voiceRange: "rgba(0,145,0," + alpha + ")",
      visualRange: "rgba(0,0,145," + alpha + ")",
      attackRange: "rgba(145,0,0," + alpha + ")"
    };
    extraColors = ["rgba(145,0,145," + alpha + ")", "rgba(0,145,145," + alpha + ")", "rgba(145,105,0," + alpha + ")", "rgba(225,125,0," + alpha + ")"];
    rangeNames = this.lank.ranges.map(function(range, index) {
      return range['name'];
    });
    i = rangeNames.indexOf(range);
    this.sprite = new createjs.Shape();
    fillColor = (ref = colors[range]) != null ? ref : extraColors[i];
    this.sprite.graphics.beginFill(fillColor);
    this.sprite.graphics.drawCircle(0, 0, this.lank.thang[range] * Camera.PPM);
    if (i + 1 < this.lank.ranges.length) {
      this.sprite.graphics.arc(0, 0, this.lank.ranges[i + 1]['radius'], Math.PI * 2, 0, true);
    }
    this.sprite.graphics.endFill();
    strokeColor = fillColor.replace('' + alpha, '0.75');
    this.sprite.graphics.setStrokeStyle(2);
    this.sprite.graphics.beginStroke(strokeColor);
    this.sprite.graphics.arc(0, 0, this.lank.thang[range] * Camera.PPM, Math.PI * 2, 0, true);
    this.sprite.graphics.endStroke();
    return this.sprite.scaleY *= this.camera.y2x;
  };

  Mark.prototype.buildDebug = function() {
    var DEBUG_SIZE, PX, bounds, debugColor, h, key, ref, ref1, ref2, shape, shapeName, w;
    shapeName = (ref = this.lank.thang.shape) === 'ellipsoid' || ref === 'disc' ? 'ellipse' : 'rect';
    key = shapeName + "-debug-" + this.lank.thang.collisionCategory;
    DEBUG_SIZE = 10;
    if (indexOf.call(this.layer.spriteSheet.getAnimations(), key) < 0) {
      shape = new createjs.Shape();
      debugColor = {
        none: 'rgba(224,255,239,0.25)',
        ground: 'rgba(239,171,205,0.5)',
        air: 'rgba(131,205,255,0.5)',
        ground_and_air: 'rgba(2391,140,239,0.5)',
        obstacles: 'rgba(88,88,88,0.5)',
        dead: 'rgba(89,171,100,0.25)'
      }[this.lank.thang.collisionCategory] || 'rgba(171,205,239,0.5)';
      shape.graphics.beginFill(debugColor);
      bounds = [-DEBUG_SIZE / 2, -DEBUG_SIZE / 2, DEBUG_SIZE, DEBUG_SIZE];
      if (shapeName === 'ellipse') {
        (ref1 = shape.graphics).drawEllipse.apply(ref1, bounds);
      } else {
        (ref2 = shape.graphics).drawRect.apply(ref2, bounds);
      }
      shape.graphics.endFill();
      this.layer.addCustomGraphic(key, shape, bounds);
    }
    this.sprite = new createjs.Sprite(this.layer.spriteSheet);
    this.sprite.gotoAndStop(key);
    PX = 3;
    w = Math.max(PX, this.lank.thang.width * Camera.PPM) * (this.camera.y2x + (1 - this.camera.y2x) * Math.abs(Math.cos(this.lank.thang.rotation)));
    h = Math.max(PX, this.lank.thang.height * Camera.PPM) * (this.camera.y2x + (1 - this.camera.y2x) * Math.abs(Math.sin(this.lank.thang.rotation)));
    this.sprite.scaleX = w / (this.layer.resolutionFactor * DEBUG_SIZE);
    this.sprite.scaleY = h / (this.layer.resolutionFactor * DEBUG_SIZE);
    return this.sprite.rotation = -this.lank.thang.rotation * 180 / Math.PI;
  };

  Mark.prototype.buildSprite = function() {
    var Lank, markLank, thangType;
    if (_.isString(this.thangType)) {
      thangType = markThangTypes[this.thangType];
      if (!thangType) {
        return this.loadThangType();
      }
      this.thangType = thangType;
    }
    if (!this.thangType.loaded) {
      return this.listenToOnce(this.thangType, 'sync', this.onLoadedThangType);
    }
    Lank = require('./Lank');
    markLank = new Lank(this.thangType);
    markLank.queueAction('idle');
    this.sprite = markLank.sprite;
    this.markLank = markLank;
    return this.listenTo(this.markLank, 'new-sprite', function(sprite) {
      this.sprite = sprite;
    });
  };

  Mark.prototype.loadThangType = function() {
    var name;
    name = this.thangType;
    this.thangType = new ThangType();
    this.thangType.url = function() {
      return "/db/thang.type/" + name;
    };
    this.listenToOnce(this.thangType, 'sync', this.onLoadedThangType);
    this.thangType.fetch();
    return markThangTypes[name] = this.thangType;
  };

  Mark.prototype.onLoadedThangType = function() {
    this.build();
    if (this.markLank) {
      this.update();
    }
    if (this.toggleTo != null) {
      this.toggle(this.toggleTo);
    }
    return Backbone.Mediator.publish('sprite:loaded', {
      sprite: this
    });
  };

  Mark.prototype.update = function(pos) {
    var ref;
    if (pos == null) {
      pos = null;
    }
    if (!(this.on && this.sprite)) {
      return false;
    }
    if ((this.lank != null) && !this.lank.thangType.isFullyLoaded()) {
      return false;
    }
    this.sprite.visible = !this.hidden;
    this.updatePosition(pos);
    this.updateRotation();
    this.updateScale();
    if (this.name === 'highlight' && this.highlightDelay && !this.highlightTween) {
      this.sprite.visible = false;
      this.highlightTween = createjs.Tween.get(this.sprite).to({}, this.highlightDelay).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          _this.sprite.visible = true;
          return _this.highlightDelay = _this.highlightTween = null;
        };
      })(this));
    }
    if ((ref = this.name) === 'shadow' || ref === 'bounds') {
      this.updateAlpha(this.alpha);
    }
    return true;
  };

  Mark.prototype.updatePosition = function(pos) {
    var offset, ref, ref1, ref2;
    if (((ref = this.lank) != null ? ref.thang : void 0) && ((ref1 = this.name) === 'shadow' || ref1 === 'debug' || ref1 === 'target' || ref1 === 'selection' || ref1 === 'repair')) {
      pos = this.camera.worldToSurface({
        x: this.lank.thang.pos.x,
        y: this.lank.thang.pos.y
      });
    } else {
      if (pos == null) {
        pos = (ref2 = this.lank) != null ? ref2.sprite : void 0;
      }
    }
    if (!pos) {
      return;
    }
    this.sprite.x = pos.x;
    this.sprite.y = pos.y;
    if (this.statusEffect || this.name === 'highlight') {
      offset = this.lank.getOffset('aboveHead');
      this.sprite.x += offset.x;
      this.sprite.y += offset.y;
      if (this.statusEffect) {
        return this.sprite.y -= 3;
      }
    }
  };

  Mark.prototype.updateAlpha = function(alpha1) {
    var ref, worldZ;
    this.alpha = alpha1;
    if (!this.sprite || this.name === 'debug') {
      return;
    }
    if (this.name === 'shadow') {
      worldZ = this.lank.thang.pos.z - this.lank.thang.depth / 2 + this.lank.getBobOffset();
      return this.sprite.alpha = this.alpha * 0.451 / Math.sqrt(worldZ / 2 + 1);
    } else if (this.name === 'bounds') {
      return (ref = this.drawsBoundsBorderShape) != null ? ref.alpha = Math.floor(this.lank.thang.alpha) : void 0;
    } else {
      return this.sprite.alpha = this.alpha;
    }
  };

  Mark.prototype.updateRotation = function() {
    var ref, ref1;
    if (this.name === 'debug' || (this.name === 'shadow' && ((ref = (ref1 = this.lank.thang) != null ? ref1.shape : void 0) === 'rectangle' || ref === 'box'))) {
      return this.sprite.rotation = -this.lank.thang.rotation * 180 / Math.PI;
    }
  };

  Mark.prototype.updateScale = function() {
    var factor, oldMark, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, thang, width;
    if (this.name === 'bounds' && ((this.lank.thang.width !== this.lastWidth || this.lank.thang.height !== this.lastHeight) || (this.lank.thang.drawsBoundsIndex !== this.drawsBoundsIndex))) {
      oldMark = this.sprite;
      this.buildBounds();
      oldMark.parent.addChild(this.sprite);
      oldMark.parent.swapChildren(oldMark, this.sprite);
      oldMark.parent.removeChild(oldMark);
    }
    if (this.markLank != null) {
      this.markLank.scaleFactor = 1.2;
      this.markLank.updateScale();
    }
    if (this.name === 'shadow' && (thang = this.lank.thang)) {
      this.sprite.scaleX = this.baseScaleX * ((ref = (ref1 = thang.scaleFactor) != null ? ref1 : thang.scaleFactorX) != null ? ref : 1);
      this.sprite.scaleY = this.baseScaleY * ((ref2 = (ref3 = thang.scaleFactor) != null ? ref3 : thang.scaleFactorY) != null ? ref2 : 1);
    }
    if ((ref4 = this.name) !== 'selection' && ref4 !== 'target' && ref4 !== 'repair' && ref4 !== 'highlight') {
      return;
    }
    factor = 0.3;
    if ((ref5 = this.lank) != null ? ref5.sprite : void 0) {
      width = ((ref6 = this.lank.sprite.getBounds()) != null ? ref6.width : void 0) || 0;
      width /= this.lank.options.resolutionFactor;
      factor = width / 100;
      factor *= 1.1;
      factor = Math.max(factor, 0.3);
    }
    this.sprite.scaleX *= factor;
    this.sprite.scaleY *= factor;
    if ((ref7 = this.name) === 'selection' || ref7 === 'target' || ref7 === 'repair') {
      return this.sprite.scaleY *= this.camera.y2x;
    }
  };

  Mark.prototype.stop = function() {
    var ref;
    return (ref = this.markLank) != null ? ref.stop() : void 0;
  };

  Mark.prototype.play = function() {
    var ref;
    return (ref = this.markLank) != null ? ref.play() : void 0;
  };

  Mark.prototype.hide = function() {
    return this.hidden = true;
  };

  Mark.prototype.show = function() {
    return this.hidden = false;
  };

  return Mark;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Mark.js.map
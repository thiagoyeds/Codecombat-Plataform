require.register("lib/surface/Dimmer", function(exports, require, module) {
var CocoClass, Dimmer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

module.exports = Dimmer = (function(superClass) {
  extend(Dimmer, superClass);

  Dimmer.prototype.subscriptions = {
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'sprite:highlight-sprites': 'onHighlightSprites',
    'sprite:speech-updated': 'onSpriteSpeechUpdated',
    'surface:frame-changed': 'onFrameChanged',
    'camera:zoom-updated': 'onZoomUpdated'
  };

  function Dimmer(options) {
    this.updateDimMask = bind(this.updateDimMask, this);
    Dimmer.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
    this.updateDimMask = _.throttle(this.updateDimMask, 10);
    this.highlightedThangIDs = [];
    this.sprites = {};
  }

  Dimmer.prototype.toString = function() {
    return '<Dimmer>';
  };

  Dimmer.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimLayer.addChild(this.dimMask = new createjs.Shape());
    this.dimScreen.graphics.beginFill('rgba(0,0,0,0.5)').rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    this.dimMask.compositeOperation = 'destination-out';
    return this.dimLayer.cache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
  };

  Dimmer.prototype.onDisableControls = function(e) {
    if (this.on || (e.controls && !(indexOf.call(e.controls, 'surface') >= 0))) {
      return;
    }
    return this.dim();
  };

  Dimmer.prototype.onEnableControls = function(e) {
    if (!this.on || (e.controls && !(indexOf.call(e.controls, 'surface') >= 0))) {
      return;
    }
    return this.undim();
  };

  Dimmer.prototype.onSpriteSpeechUpdated = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onFrameChanged = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onZoomUpdated = function(e) {
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.onHighlightSprites = function(e) {
    var ref;
    this.highlightedThangIDs = (ref = e.thangIDs) != null ? ref : [];
    if (this.on) {
      return this.updateDimMask();
    }
  };

  Dimmer.prototype.setSprites = function(sprites) {
    this.sprites = sprites;
  };

  Dimmer.prototype.dim = function() {
    var ref, sprite, thangID;
    this.on = true;
    this.layer.addChild(this.dimLayer);
    this.layer.updateLayerOrder();
    ref = this.sprites;
    for (thangID in ref) {
      sprite = ref[thangID];
      sprite.setDimmed(true);
    }
    return this.updateDimMask();
  };

  Dimmer.prototype.undim = function() {
    var ref, results, sprite, thangID;
    this.on = false;
    this.layer.removeChild(this.dimLayer);
    ref = this.sprites;
    results = [];
    for (thangID in ref) {
      sprite = ref[thangID];
      results.push(sprite.setDimmed(false));
    }
    return results;
  };

  Dimmer.prototype.updateDimMask = function() {
    var cap, r, ref, sprite, sup, thangID;
    this.dimMask.graphics.clear();
    ref = this.sprites;
    for (thangID in ref) {
      sprite = ref[thangID];
      if (!((indexOf.call(this.highlightedThangIDs, thangID) >= 0) || (typeof sprite.isTalking === "function" ? sprite.isTalking() : void 0))) {
        continue;
      }
      sup = {
        x: sprite.sprite.x,
        y: sprite.sprite.y
      };
      cap = this.camera.surfaceToCanvas(sup);
      r = 50 * this.camera.zoom;
      this.dimMask.graphics.beginRadialGradientFill(['rgba(0,0,0,1)', 'rgba(0,0,0,0)'], [0.5, 1], cap.x, cap.y, 0, cap.x, cap.y, r).drawCircle(cap.x, cap.y, r);
    }
    return this.dimLayer.updateCache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
  };

  return Dimmer;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Dimmer.js.map
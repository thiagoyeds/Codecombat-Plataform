require.register("lib/surface/Letterbox", function(exports, require, module) {
var Letterbox,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = Letterbox = (function(superClass) {
  extend(Letterbox, superClass);

  Letterbox.prototype.subscriptions = {
    'level:set-letterbox': 'onSetLetterbox'
  };

  function Letterbox(options) {
    var channel, func, ref;
    Letterbox.__super__.constructor.call(this);
    this.initialize();
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    if (!(this.canvasWidth && this.canvasHeight)) {
      console.error('Letterbox needs canvasWidth/Height.');
    }
    this.build();
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  Letterbox.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.matteHeight = 0.10 * this.canvasHeight;
    this.upperMatte = new createjs.Shape();
    this.upperMatte.graphics.beginFill('black').rect(0, 0, this.canvasWidth, this.matteHeight);
    this.lowerMatte = this.upperMatte.clone();
    this.upperMatte.x = this.lowerMatte.x = 0;
    this.upperMatte.y = -this.matteHeight;
    this.lowerMatte.y = this.canvasHeight;
    return this.addChild(this.upperMatte, this.lowerMatte);
  };

  Letterbox.prototype.onSetLetterbox = function(e) {
    var T, ease, interval, lowerY, upperY;
    T = createjs.Tween;
    T.removeTweens(this.upperMatte);
    T.removeTweens(this.lowerMatte);
    upperY = e.on ? 0 : -this.matteHeight;
    lowerY = e.on ? this.canvasHeight - this.matteHeight : this.canvasHeight;
    interval = 700;
    ease = createjs.Ease.cubicOut;
    T.get(this.upperMatte).to({
      y: upperY
    }, interval, ease);
    return T.get(this.lowerMatte).to({
      y: lowerY
    }, interval, ease);
  };

  Letterbox.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  return Letterbox;

})(createjs.Container);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Letterbox.js.map
require.register("lib/surface/DebugDisplay", function(exports, require, module) {
var DebugDisplay,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = DebugDisplay = (function(superClass) {
  extend(DebugDisplay, superClass);

  DebugDisplay.prototype.layerPriority = 20;

  DebugDisplay.prototype.subscriptions = {
    'level:set-debug': 'onSetDebug'
  };

  function DebugDisplay(options) {
    var channel, func, ref;
    DebugDisplay.__super__.constructor.call(this);
    this.initialize();
    this.canvasWidth = options.canvasWidth;
    this.canvasHeight = options.canvasHeight;
    if (!(this.canvasWidth && this.canvasHeight)) {
      console.error('DebugDisplay needs canvasWidth/Height.');
    }
    this.build();
    this.onSetDebug({
      debug: true
    });
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  DebugDisplay.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  DebugDisplay.prototype.onSetDebug = function(e) {
    if (e.debug === this.on) {
      return;
    }
    this.visible = this.on = e.debug;
    this.fps = null;
    this.framesRenderedThisSecond = 0;
    return this.lastFrameSecondStart = Date.now();
  };

  DebugDisplay.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.addChild(this.frameText = new createjs.Text('...', '20px Arial', '#FFF'));
    this.frameText.name = 'frame text';
    this.frameText.x = this.canvasWidth - 50;
    this.frameText.y = this.canvasHeight - 25;
    return this.frameText.alpha = 0.5;
  };

  DebugDisplay.prototype.updateFrame = function(currentFrame) {
    var diff, time;
    if (!this.on) {
      return;
    }
    ++this.framesRenderedThisSecond;
    time = Date.now();
    diff = (time - this.lastFrameSecondStart) / 1000;
    if (diff > 1) {
      this.fps = Math.round(this.framesRenderedThisSecond / diff);
      this.lastFrameSecondStart = time;
      this.framesRenderedThisSecond = 0;
    }
    this.frameText.text = Math.round(currentFrame) + (this.fps != null ? ' - ' + this.fps + ' fps' : '');
    return this.frameText.x = this.canvasWidth - this.frameText.getMeasuredWidth() - 10;
  };

  return DebugDisplay;

})(createjs.Container);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/DebugDisplay.js.map
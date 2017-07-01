require.register("lib/surface/Dropper", function(exports, require, module) {
var Dropper;

Dropper = Dropper = (function() {
  Dropper.prototype.lostFrames = 0.0;

  Dropper.prototype.dropCounter = 0;

  function Dropper() {
    this.listener = (function(_this) {
      return function(e) {
        return _this.tick(e);
      };
    })(this);
  }

  Dropper.prototype.tick = function() {
    var actual, fps;
    if (!this.tickedOnce) {
      this.tickedOnce = true;
      return;
    }
    if (this.dropCounter > 0) {
      --this.dropCounter;
    }
    fps = createjs.Ticker.getFPS();
    actual = createjs.Ticker.getMeasuredFPS(1);
    this.lostFrames += (fps - actual) / fps;
    this.dropCounter += parseInt(this.lostFrames);
    return this.lostFrames = this.lostFrames % 1;
  };

  Dropper.prototype.drop = function() {
    return this.dropCounter > 0;
  };

  return Dropper;

})();

module.exports = new Dropper();
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Dropper.js.map
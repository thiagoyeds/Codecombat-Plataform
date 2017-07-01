require.register("lib/surface/CameraBorder", function(exports, require, module) {
var CameraBorder,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = CameraBorder = (function(superClass) {
  extend(CameraBorder, superClass);

  CameraBorder.prototype.layerPriority = 100;

  CameraBorder.prototype.subscriptions = {};

  function CameraBorder(options) {
    var channel, func, ref;
    CameraBorder.__super__.constructor.call(this);
    this.initialize();
    this.mouseEnabled = this.mouseChildren = false;
    this.updateBounds(options.bounds);
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  CameraBorder.prototype.destroy = function() {
    var channel, func, ref, results;
    ref = this.subscriptions;
    results = [];
    for (channel in ref) {
      func = ref[channel];
      results.push(Backbone.Mediator.unsubscribe(channel, this[func], this));
    }
    return results;
  };

  CameraBorder.prototype.updateBounds = function(bounds) {
    var i, opacity, width;
    if (_.isEqual(bounds, this.bounds)) {
      return;
    }
    this.bounds = bounds;
    if (this.border) {
      this.removeChild(this.border);
      this.border = null;
    }
    if (!this.bounds) {
      return;
    }
    this.addChild(this.border = new createjs.Shape());
    width = 20;
    i = width;
    while (i) {
      opacity = 3 * (1 - (i / width)) / width;
      this.border.graphics.setStrokeStyle(i, 'round').beginStroke("rgba(0,0,0," + opacity + ")").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      i -= 1;
    }
    return this.border.cache(bounds.x, bounds.y, bounds.width, bounds.height);
  };

  return CameraBorder;

})(createjs.Container);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/CameraBorder.js.map
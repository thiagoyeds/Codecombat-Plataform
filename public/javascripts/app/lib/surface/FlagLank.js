require.register("lib/surface/FlagLank", function(exports, require, module) {
var FlagLank, IndieLank, me,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

IndieLank = require('lib/surface/IndieLank');

me = require('core/auth').me;

module.exports = FlagLank = (function(superClass) {
  extend(FlagLank, superClass);

  FlagLank.prototype.subscriptions = {
    'surface:mouse-moved': 'onMouseMoved'
  };

  FlagLank.prototype.defaultPos = function() {
    return {
      x: 20,
      y: 20,
      z: 1
    };
  };

  function FlagLank(thangType, options) {
    FlagLank.__super__.constructor.call(this, thangType, options);
    this.toggleCursor(options.isCursor);
  }

  FlagLank.prototype.makeIndieThang = function(thangType, options) {
    var thang;
    thang = FlagLank.__super__.makeIndieThang.call(this, thangType, options);
    thang.width = thang.height = thang.depth = 2;
    thang.pos.z = 1;
    thang.isSelectable = false;
    thang.color = options.color;
    thang.team = options.team;
    return thang;
  };

  FlagLank.prototype.onMouseMoved = function(e) {
    var wop;
    if (!this.options.isCursor) {
      return;
    }
    wop = this.options.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    this.thang.pos.x = wop.x;
    return this.thang.pos.y = wop.y;
  };

  FlagLank.prototype.toggleCursor = function(to) {
    this.options.isCursor = to;
    this.thang.alpha = to ? 0.33 : 0.67;
    this.thang.action = 'appear';
    return this.updateAlpha();
  };

  return FlagLank;

})(IndieLank);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/FlagLank.js.map
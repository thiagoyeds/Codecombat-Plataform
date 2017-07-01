require.register("lib/surface/IndieLank", function(exports, require, module) {
var IndieLank, Lank, Thang,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Thang = require('lib/world/thang');

Lank = require('lib/surface/Lank');

module.exports = IndieLank = IndieLank = (function(superClass) {
  extend(IndieLank, superClass);

  IndieLank.prototype.notOfThisWorld = true;

  IndieLank.prototype.subscriptions = {
    'script:note-group-started': 'onNoteGroupStarted',
    'script:note-group-ended': 'onNoteGroupEnded'
  };

  function IndieLank(thangType, options) {
    this.onNoteGroupEnded = bind(this.onNoteGroupEnded, this);
    this.onNoteGroupStarted = bind(this.onNoteGroupStarted, this);
    options.thang = this.makeIndieThang(thangType, options);
    IndieLank.__super__.constructor.call(this, thangType, options);
    this.shadow = this.thang;
  }

  IndieLank.prototype.makeIndieThang = function(thangType, options) {
    var ref, thang;
    this.thang = thang = new Thang(null, thangType.get('name'), options.thangID);
    thang.exists = true;
    thang.width = thang.height = thang.depth = 4;
    thang.pos = (ref = options.pos) != null ? ref : this.defaultPos();
    thang.pos.z = thang.depth / 2;
    thang.shape = 'ellipsoid';
    thang.rotation = 0;
    thang.action = 'idle';
    thang.setAction = function(action) {
      return thang.action = action;
    };
    thang.getActionName = function() {
      return thang.action;
    };
    thang.acts = true;
    thang.isSelectable = true;
    thang.team = options.team;
    thang.teamColors = options.teamColors;
    return thang;
  };

  IndieLank.prototype.onNoteGroupStarted = function() {
    return this.scriptRunning = true;
  };

  IndieLank.prototype.onNoteGroupEnded = function() {
    return this.scriptRunning = false;
  };

  IndieLank.prototype.onMouseEvent = function(e, ourEventName) {
    if (!this.scriptRunning) {
      return IndieLank.__super__.onMouseEvent.call(this, e, ourEventName);
    }
  };

  IndieLank.prototype.defaultPos = function() {
    return {
      x: -20,
      y: 20,
      z: this.thang.depth / 2
    };
  };

  return IndieLank;

})(Lank);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/IndieLank.js.map
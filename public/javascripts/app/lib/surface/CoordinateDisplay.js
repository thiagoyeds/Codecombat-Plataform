require.register("lib/surface/CoordinateDisplay", function(exports, require, module) {
var CoordinateDisplay,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = CoordinateDisplay = (function(superClass) {
  extend(CoordinateDisplay, superClass);

  CoordinateDisplay.prototype.layerPriority = -10;

  CoordinateDisplay.prototype.subscriptions = {
    'surface:mouse-moved': 'onMouseMove',
    'surface:mouse-out': 'onMouseOut',
    'surface:mouse-over': 'onMouseOver',
    'surface:stage-mouse-down': 'onMouseDown',
    'camera:zoom-updated': 'onZoomUpdated',
    'level:flag-color-selected': 'onFlagColorSelected'
  };

  function CoordinateDisplay(options) {
    this.show = bind(this.show, this);
    var channel, func, ref;
    CoordinateDisplay.__super__.constructor.call(this);
    this.initialize();
    this.camera = options.camera;
    this.layer = options.layer;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
    this.performShow = this.show;
    this.show = _.debounce(this.show, 125);
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.subscribe(channel, this[func], this);
    }
  }

  CoordinateDisplay.prototype.destroy = function() {
    var channel, func, ref;
    ref = this.subscriptions;
    for (channel in ref) {
      func = ref[channel];
      Backbone.Mediator.unsubscribe(channel, this[func], this);
    }
    this.show = null;
    return this.destroyed = true;
  };

  CoordinateDisplay.prototype.toString = function() {
    return '<CoordinateDisplay>';
  };

  CoordinateDisplay.prototype.build = function() {
    this.mouseEnabled = this.mouseChildren = false;
    this.addChild(this.background = new createjs.Shape());
    this.addChild(this.label = new createjs.Text('', 'bold 16px Arial', '#FFFFFF'));
    this.addChild(this.pointMarker = new createjs.Shape());
    this.label.name = 'Coordinate Display Text';
    this.label.shadow = new createjs.Shadow('#000000', 1, 1, 0);
    this.background.name = 'Coordinate Display Background';
    this.pointMarker.name = 'Point Marker';
    return this.layer.addChild(this);
  };

  CoordinateDisplay.prototype.onMouseOver = function(e) {
    return this.mouseInBounds = true;
  };

  CoordinateDisplay.prototype.onMouseOut = function(e) {
    return this.mouseInBounds = false;
  };

  CoordinateDisplay.prototype.onMouseMove = function(e) {
    var ref, ref1, wop;
    wop = this.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.x = Math.round(wop.x);
    wop.y = Math.round(wop.y);
    if (wop.x === ((ref = this.lastPos) != null ? ref.x : void 0) && wop.y === ((ref1 = this.lastPos) != null ? ref1.y : void 0)) {
      return;
    }
    this.lastPos = wop;
    this.lastScreenPos = {
      x: e.x,
      y: e.y
    };
    this.hide();
    return this.show();
  };

  CoordinateDisplay.prototype.onMouseDown = function(e) {
    var wop;
    if (!key.shift) {
      return;
    }
    wop = this.camera.screenToWorld({
      x: e.x,
      y: e.y
    });
    wop.x = Math.round(wop.x);
    wop.y = Math.round(wop.y);
    Backbone.Mediator.publish('tome:focus-editor', {});
    return Backbone.Mediator.publish('surface:coordinate-selected', wop);
  };

  CoordinateDisplay.prototype.onZoomUpdated = function(e) {
    var wop;
    if (!this.lastPos) {
      return;
    }
    wop = this.camera.screenToWorld(this.lastScreenPos);
    this.lastPos.x = Math.round(wop.x);
    this.lastPos.y = Math.round(wop.y);
    if (this.label.parent) {
      return this.performShow();
    }
  };

  CoordinateDisplay.prototype.onFlagColorSelected = function(e) {
    return this.placingFlag = Boolean(e.color);
  };

  CoordinateDisplay.prototype.hide = function() {
    if (!this.label.parent) {
      return;
    }
    this.removeChild(this.label);
    this.removeChild(this.background);
    this.removeChild(this.pointMarker);
    return this.uncache();
  };

  CoordinateDisplay.prototype.updateSize = function() {
    var contentHeight, contentWidth, contributionsToTotalSize, fullPointMarkerLength, horizontalEdge, margin, pointMarkerLength, pointMarkerStroke, totalHeight, totalWidth, verticalEdge;
    margin = 3;
    contentWidth = this.label.getMeasuredWidth() + (2 * margin);
    contentHeight = this.label.getMeasuredHeight() + (2 * margin);
    this.pointMarker.regY = contentHeight;
    pointMarkerStroke = 2;
    pointMarkerLength = 8;
    fullPointMarkerLength = pointMarkerLength + (pointMarkerStroke / 2);
    contributionsToTotalSize = [];
    contributionsToTotalSize = contributionsToTotalSize.concat(this.updateCoordinates(contentWidth, contentHeight, fullPointMarkerLength));
    contributionsToTotalSize = contributionsToTotalSize.concat(this.updatePointMarker(0, contentHeight, pointMarkerLength, pointMarkerStroke));
    totalWidth = contentWidth + contributionsToTotalSize.reduce(function(a, b) {
      return a + b;
    });
    totalHeight = contentHeight + contributionsToTotalSize.reduce(function(a, b) {
      return a + b;
    });
    if (this.isNearTopEdge()) {
      verticalEdge = {
        startPos: -fullPointMarkerLength,
        posShift: -contentHeight + 4
      };
    } else {
      verticalEdge = {
        startPos: -totalHeight + fullPointMarkerLength,
        posShift: contentHeight
      };
    }
    if (this.isNearRightEdge()) {
      horizontalEdge = {
        startPos: -totalWidth + fullPointMarkerLength,
        posShift: totalWidth
      };
    } else {
      horizontalEdge = {
        startPos: -fullPointMarkerLength,
        posShift: 0
      };
    }
    return this.orient(verticalEdge, horizontalEdge, totalHeight, totalWidth);
  };

  CoordinateDisplay.prototype.isNearTopEdge = function() {
    var yRatio;
    yRatio = 1 - (this.camera.worldViewport.y - this.lastPos.y) / this.camera.worldViewport.height;
    return yRatio > 0.9;
  };

  CoordinateDisplay.prototype.isNearRightEdge = function() {
    var xRatio;
    xRatio = (this.lastPos.x - this.camera.worldViewport.x) / this.camera.worldViewport.width;
    return xRatio > 0.85;
  };

  CoordinateDisplay.prototype.orient = function(verticalEdge, horizontalEdge, totalHeight, totalWidth) {
    this.label.regY = this.background.regY = verticalEdge.posShift;
    this.label.regX = this.background.regX = horizontalEdge.posShift;
    return this.cache(horizontalEdge.startPos, verticalEdge.startPos, totalWidth, totalHeight);
  };

  CoordinateDisplay.prototype.updateCoordinates = function(contentWidth, contentHeight, offset) {
    var backgroundStroke, contributionsToTotalSize, radius;
    this.label.x = contentWidth / 2 - (this.label.getMeasuredWidth() / 2) + offset;
    this.label.y = contentHeight / 2 - (this.label.getMeasuredHeight() / 2) - offset;
    this.background.graphics.clear().beginFill('rgba(0,0,0,0.4)').beginStroke('rgba(0,0,0,0.6)').setStrokeStyle(backgroundStroke = 1).drawRoundRect(offset, -offset, contentWidth, contentHeight, radius = 2.5).endFill().endStroke();
    return contributionsToTotalSize = [offset, backgroundStroke];
  };

  CoordinateDisplay.prototype.updatePointMarker = function(centerX, centerY, length, strokeSize) {
    var contributionsToTotalSize, strokeStyle;
    strokeStyle = 'square';
    this.pointMarker.graphics.beginStroke('rgb(255, 255, 255)').setStrokeStyle(strokeSize, strokeStyle).moveTo(centerX, centerY - length).lineTo(centerX, centerY + length).moveTo(centerX - length, centerY).lineTo(centerX + length, centerY).endStroke();
    return contributionsToTotalSize = [strokeSize, length];
  };

  CoordinateDisplay.prototype.show = function() {
    var sup;
    if (!(this.mouseInBounds && this.lastPos && !this.destroyed)) {
      return;
    }
    this.label.text = "{x: " + this.lastPos.x + ", y: " + this.lastPos.y + "}";
    this.updateSize();
    sup = this.camera.worldToSurface(this.lastPos);
    this.x = sup.x;
    this.y = sup.y;
    this.addChild(this.background);
    this.addChild(this.label);
    if (!this.placingFlag) {
      this.addChild(this.pointMarker);
    }
    this.updateCache();
    return Backbone.Mediator.publish('surface:coordinates-shown', {});
  };

  return CoordinateDisplay;

})(createjs.Container);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/CoordinateDisplay.js.map
require.register("lib/world/ellipse", function(exports, require, module) {
var Ellipse, LineSegment, Rectangle, Vector;

Vector = require('./vector');

LineSegment = require('./line_segment');

Rectangle = require('./rectangle');

Ellipse = (function() {
  Ellipse.className = "Ellipse";

  Ellipse.prototype.isEllipse = true;

  Ellipse.prototype.apiProperties = ['x', 'y', 'width', 'height', 'rotation', 'distanceToPoint', 'distanceSquaredToPoint', 'distanceToRectangle', 'distanceSquaredToRectangle', 'distanceToEllipse', 'distanceSquaredToEllipse', 'distanceToShape', 'distanceSquaredToShape', 'containsPoint', 'intersectsLineSegment', 'intersectsRectangle', 'intersectsEllipse', 'getPos', 'containsPoint', 'copy'];

  function Ellipse(x1, y1, width, height, rotation) {
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.rotation = rotation != null ? rotation : 0;
  }

  Ellipse.prototype.copy = function() {
    return new Ellipse(this.x, this.y, this.width, this.height, this.rotation);
  };

  Ellipse.prototype.getPos = function() {
    return new Vector(this.x, this.y);
  };

  Ellipse.prototype.rectangle = function() {
    return new Rectangle(this.x, this.y, this.width, this.height, this.rotation);
  };

  Ellipse.prototype.axisAlignedBoundingBox = function(rounded) {
    if (rounded == null) {
      rounded = true;
    }
    return this.rectangle().axisAlignedBoundingBox();
  };

  Ellipse.prototype.distanceToPoint = function(p) {
    return this.rectangle().distanceToPoint(p);
  };

  Ellipse.prototype.distanceSquaredToPoint = function(p) {
    return this.rectangle().distanceSquaredToPoint(p);
  };

  Ellipse.prototype.distanceToRectangle = function(other) {
    return Math.sqrt(this.distanceSquaredToRectangle(other));
  };

  Ellipse.prototype.distanceSquaredToRectangle = function(other) {
    return this.rectangle().distanceSquaredToRectangle(other);
  };

  Ellipse.prototype.distanceToEllipse = function(ellipse) {
    return Math.sqrt(this.distanceSquaredToEllipse(ellipse));
  };

  Ellipse.prototype.distanceSquaredToEllipse = function(ellipse) {
    return this.rectangle().distanceSquaredToEllipse(ellipse);
  };

  Ellipse.prototype.distanceToShape = function(shape) {
    return Math.sqrt(this.distanceSquaredToShape(shape));
  };

  Ellipse.prototype.distanceSquaredToShape = function(shape) {
    if (shape.isEllipse) {
      return this.distanceSquaredToEllipse(shape);
    } else {
      return this.distanceSquaredToRectangle(shape);
    }
  };

  Ellipse.prototype.containsPoint = function(p, withRotation) {
    var c, ref, ref1, s, x, y;
    if (withRotation == null) {
      withRotation = true;
    }
    ref = [p.x - this.x, p.y - this.y], x = ref[0], y = ref[1];
    if (withRotation && this.rotation) {
      c = Math.cos(this.rotation);
      s = Math.sin(this.rotation);
      ref1 = [x * c + y * s, y * c - x * s], x = ref1[0], y = ref1[1];
    }
    x = x / this.width * 2;
    y = y / this.height * 2;
    return x * x + y * y <= 1;
  };

  Ellipse.prototype.intersectsLineSegment = function(p1, p2) {
    var a, a2, a4, b, b2, b4, bigX, bigY, c, c2, cos2t, cost, denominator, h, h2, k, k2, littleX, littleY, m, m2, numeratorLeft, numeratorMiddle, numeratorRight, px1, px2, py1, py2, ref, ref1, ref2, ref3, ref4, ref5, sin2t, sint, solution, solution1, solution2, x, x2;
    ref = [p1.x, p1.y, p2.x, p2.y], px1 = ref[0], py1 = ref[1], px2 = ref[2], py2 = ref[3];
    m = (py1 - py2) / (px1 - px2);
    m2 = Math.pow(m, 2);
    c = py1 - (m * px1);
    c2 = Math.pow(c, 2);
    ref1 = [this.width / 2, this.height / 2], a = ref1[0], b = ref1[1];
    ref2 = [this.x, this.y], h = ref2[0], k = ref2[1];
    a2 = Math.pow(a, 2);
    a4 = Math.pow(a, 2);
    b2 = Math.pow(b, 2);
    b4 = Math.pow(b, 4);
    h2 = Math.pow(h, 2);
    k2 = Math.pow(k, 2);
    sint = Math.sin(this.rotation);
    sin2t = Math.sin(2 * this.rotation);
    cost = Math.cos(this.rotation);
    cos2t = Math.cos(2 * this.rotation);
    if ((!isNaN(m)) && m !== Infinity && m !== -Infinity) {
      numeratorLeft = (-a2 * c * m * cos2t) - (a2 * c * m) + (a2 * c * sin2t) - (a2 * h * m * sin2t) - (a2 * h * cos2t) + (a2 * h) + (a2 * k * m * cos2t) + (a2 * k * m) - (a2 * k * sin2t);
      numeratorMiddle = Math.SQRT2 * Math.sqrt((a4 * b2 * m2 * cos2t) + (a4 * b2 * m2) - (2 * a4 * b2 * m * sin2t) - (a4 * b2 * cos2t) + (a4 * b2) - (a2 * b4 * m2 * cos2t) + (a2 * b4 * m2) + (2 * a2 * b4 * m * sin2t) + (a2 * b4 * cos2t) + (a2 * b4) - (2 * a2 * b2 * c2) - (4 * a2 * b2 * c * h * m) + (4 * a2 * b2 * c * k) - (2 * a2 * b2 * h2 * m2) + (4 * a2 * b2 * h * k * m) - (2 * a2 * b2 * k2));
      numeratorRight = (b2 * c * m * cos2t) - (b2 * c * m) - (b2 * c * sin2t) + (b2 * h * m * sin2t) + (b2 * h * cos2t) + (b2 * h) - (b2 * k * m * cos2t) + (b2 * k * m) + (b2 * k * sin2t);
      denominator = (a2 * m2 * cos2t) + (a2 * m2) - (2 * a2 * m * sin2t) - (a2 * cos2t) + a2 - (b2 * m2 * cos2t) + (b2 * m2) + (2 * b2 * m * sin2t) + (b2 * cos2t) + b2;
      solution1 = (-numeratorLeft - numeratorMiddle + numeratorRight) / denominator;
      solution2 = (-numeratorLeft + numeratorMiddle + numeratorRight) / denominator;
      if ((!isNaN(solution1)) && (!isNaN(solution2))) {
        ref3 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref3[0], bigX = ref3[1];
        if ((littleX <= solution1 && bigX >= solution1) || (littleX <= solution2 && bigX >= solution2)) {
          return true;
        }
      }
      if ((!isNaN(solution1)) || (!isNaN(solution2))) {
        solution = !isNaN(solution1) ? solution1 : solution2;
        ref4 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref4[0], bigX = ref4[1];
        if (littleX <= solution && bigX >= solution) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      x = px1;
      x2 = Math.pow(x, 2);
      numeratorLeft = (-a2 * h * sin2t) + (a2 * k * cos2t) + (a2 * k) + (a2 * x * sin2t);
      numeratorMiddle = Math.SQRT2 * Math.sqrt((a4 * b2 * cos2t) + (a4 * b2) - (a2 * b4 * cos2t) + (a2 * b4) - (2 * a2 * b2 * h2) + (4 * a2 * b2 * h * x) - (2 * a2 * b2 * x2));
      numeratorRight = (b2 * h * sin2t) - (b2 * k * cos2t) + (b2 * k) - (b2 * x * sin2t);
      denominator = (a2 * cos2t) + a2 - (b2 * cos2t) + b2;
      solution1 = (numeratorLeft - numeratorMiddle + numeratorRight) / denominator;
      solution2 = (numeratorLeft + numeratorMiddle + numeratorRight) / denominator;
      if ((!isNaN(solution1)) || (!isNaN(solution2))) {
        solution = !isNaN(solution1) ? solution1 : solution2;
        ref5 = py1 < py2 ? [py1, py2] : [py2, py1], littleY = ref5[0], bigY = ref5[1];
        if (littleY <= solution && bigY >= solution) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  };

  Ellipse.prototype.intersectsRectangle = function(rectangle) {
    return rectangle.intersectsEllipse(this);
  };

  Ellipse.prototype.intersectsEllipse = function(ellipse) {
    return this.rectangle().intersectsEllipse(ellipse);
  };

  Ellipse.prototype.intersectsShape = function(shape) {
    if (shape.isEllipse) {
      return this.intersectsEllipse(shape);
    } else {
      return this.intersectsRectangle(shape);
    }
  };

  Ellipse.prototype.toString = function() {
    return "{x: " + (this.x.toFixed(0)) + ", y: " + (this.y.toFixed(0)) + ", w: " + (this.width.toFixed(0)) + ", h: " + (this.height.toFixed(0)) + ", rot: " + (this.rotation.toFixed(3)) + "}";
  };

  Ellipse.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
      r: this.rotation
    };
  };

  Ellipse.deserialize = function(o, world, classMap) {
    return new Ellipse(o.x, o.y, o.w, o.h, o.r);
  };

  Ellipse.prototype.serializeForAether = function() {
    return this.serialize();
  };

  Ellipse.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return Ellipse;

})();

module.exports = Ellipse;
});

;
//# sourceMappingURL=/javascripts/app/lib/world/ellipse.js.map
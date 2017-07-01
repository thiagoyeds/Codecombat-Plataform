require.register("lib/world/line_segment", function(exports, require, module) {
var LineSegment;

LineSegment = (function() {
  LineSegment.className = "LineSegment";

  function LineSegment(a, b) {
    this.a = a;
    this.b = b;
    this.slope = (this.a.y - this.b.y) / (this.a.x - this.b.x);
    this.y0 = this.a.y - (this.slope * this.a.x);
    this.left = this.a.x < this.b.x ? this.a : this.b;
    this.right = this.a.x > this.b.x ? this.a : this.b;
    this.bottom = this.a.y < this.b.y ? this.a : this.b;
    this.top = this.a.y > this.b.y ? this.a : this.b;
  }

  LineSegment.prototype.y = function(x) {
    return (this.slope * x) + this.y0;
  };

  LineSegment.prototype.x = function(y) {
    return (y - this.y0) / this.slope;
  };

  LineSegment.prototype.intersectsLineSegment = function(lineSegment) {
    var bottom, left, nonvertical, ref, ref1, right, top, vertical, x, y;
    if (lineSegment.slope === this.slope) {
      if (lineSegment.y0 === this.y0) {
        if (lineSegment.left.x === this.left.x || lineSegment.left.x === this.right.x || lineSegment.right.x === this.right.x || lineSegment.right.x === this.left.x) {
          return true;
        } else {
          ref = lineSegment.left.x < this.left.x ? [lineSegment, this] : [this, lineSegment], left = ref[0], right = ref[1];
          if (left.right.x > right.left.x) {
            return true;
          }
        }
      }
    } else if (Math.abs(this.slope) !== Infinity && Math.abs(lineSegment.slope) !== Infinity) {
      x = (lineSegment.y0 - this.y0) / (this.slope - lineSegment.slope);
      if (x >= this.left.x && x <= this.right.x && x >= lineSegment.left.x && x <= lineSegment.right.x) {
        return true;
      }
    } else if (Math.abs(this.slope) !== Infinity || Math.abs(lineSegment.slope) !== Infinity) {
      ref1 = Math.abs(this.slope) !== Infinity ? [lineSegment, this] : [this, lineSegment], vertical = ref1[0], nonvertical = ref1[1];
      x = vertical.a.x;
      bottom = vertical.bottom.y;
      top = vertical.top.y;
      y = nonvertical.y(x);
      left = nonvertical.left.x;
      right = nonvertical.right.x;
      if (y >= bottom && y <= top && x >= left && x <= right) {
        return true;
      }
    }
    return false;
  };

  LineSegment.prototype.pointOnLine = function(point, segment) {
    var bigY, littleY, ref;
    if (segment == null) {
      segment = true;
    }
    if (point.y === this.y(point.x)) {
      if (segment) {
        ref = this.a.y < this.b.y ? [this.a.y, this.b.y] : [this.b.y, this.a.y], littleY = ref[0], bigY = ref[1];
        if (littleY <= point.y && bigY >= point.y) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  };

  LineSegment.prototype.distanceSquaredToPoint = function(point) {
    var lineMagnitudeSquared, res, t;
    if (this.a.equals(this.b)) {
      return this.a.distanceSquared(point);
    }
    res = Math.min(point.distanceSquared(this.a), point.distanceSquared(this.b));
    lineMagnitudeSquared = this.a.distanceSquared(this.b);
    t = ((point.x - this.a.x) * (this.b.x - this.a.x) + (point.y - this.a.y) * (this.b.y - this.a.y)) / lineMagnitudeSquared;
    if (t < 0) {
      return this.a.distanceSquared(point);
    }
    if (t > 1) {
      return this.b.distanceSquared(point);
    }
    return point.distanceSquared({
      x: this.a.x + t * (this.b.x - this.a.x),
      y: this.a.y + t * (this.b.y - this.a.y)
    });
  };

  LineSegment.prototype.distanceToPoint = function(point) {
    return Math.sqrt(this.distanceSquaredToPoint(point));
  };

  LineSegment.prototype.toString = function() {
    return "lineSegment(a=" + this.a + ", b=" + this.b + ", slope=" + this.slope + ", y0=" + this.y0 + ", left=" + this.left + ", right=" + this.right + ", bottom=" + this.bottom + ", top=" + this.top + ")";
  };

  LineSegment.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      a: this.a,
      b: this.b
    };
  };

  LineSegment.deserialize = function(o, world, classMap) {
    return new LineSegment(o.a, o.b);
  };

  LineSegment.prototype.serializeForAether = function() {
    return this.serialize();
  };

  LineSegment.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return LineSegment;

})();

module.exports = LineSegment;
});

;
//# sourceMappingURL=/javascripts/app/lib/world/line_segment.js.map
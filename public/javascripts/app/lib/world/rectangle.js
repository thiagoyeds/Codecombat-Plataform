require.register("lib/world/rectangle", function(exports, require, module) {
var LineSegment, Rectangle, Vector;

Vector = require('./vector');

LineSegment = require('./line_segment');

Rectangle = (function() {
  var fn, k, len, name, ref;

  Rectangle.className = 'Rectangle';

  ref = ['add', 'subtract', 'multiply', 'divide'];
  fn = function(name) {
    return Rectangle[name] = function(a, b) {
      return a.copy()[name](b);
    };
  };
  for (k = 0, len = ref.length; k < len; k++) {
    name = ref[k];
    fn(name);
  }

  Rectangle.prototype.isRectangle = true;

  Rectangle.prototype.apiProperties = ['x', 'y', 'width', 'height', 'rotation', 'getPos', 'vertices', 'touchesRect', 'touchesPoint', 'distanceToPoint', 'distanceSquaredToPoint', 'distanceToRectangle', 'distanceSquaredToRectangle', 'distanceToEllipse', 'distanceSquaredToEllipse', 'distanceToShape', 'distanceSquaredToShape', 'containsPoint', 'copy', 'intersectsLineSegment', 'intersectsEllipse', 'intersectsRectangle', 'intersectsShape'];

  function Rectangle(x1, y1, width, height, rotation) {
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.rotation = rotation != null ? rotation : 0;
  }

  Rectangle.prototype.copy = function() {
    return new Rectangle(this.x, this.y, this.width, this.height, this.rotation);
  };

  Rectangle.prototype.getPos = function() {
    return new Vector(this.x, this.y);
  };

  Rectangle.prototype.vertices = function() {
    var cos, h2, ref1, sin, w2;
    ref1 = [this.width / 2, this.height / 2, Math.cos(this.rotation), Math.sin(-this.rotation)], w2 = ref1[0], h2 = ref1[1], cos = ref1[2], sin = ref1[3];
    return [new Vector(this.x - (w2 * cos - h2 * sin), this.y - (w2 * sin + h2 * cos)), new Vector(this.x - (w2 * cos + h2 * sin), this.y - (w2 * sin - h2 * cos)), new Vector(this.x + (w2 * cos - h2 * sin), this.y + (w2 * sin + h2 * cos)), new Vector(this.x + (w2 * cos + h2 * sin), this.y + (w2 * sin - h2 * cos))];
  };

  Rectangle.prototype.lineSegments = function() {
    var lineSegment0, lineSegment1, lineSegment2, lineSegment3, vertices;
    vertices = this.vertices();
    lineSegment0 = new LineSegment(vertices[0], vertices[1]);
    lineSegment1 = new LineSegment(vertices[1], vertices[2]);
    lineSegment2 = new LineSegment(vertices[2], vertices[3]);
    lineSegment3 = new LineSegment(vertices[3], vertices[0]);
    return [lineSegment0, lineSegment1, lineSegment2, lineSegment3];
  };

  Rectangle.prototype.touchesRect = function(other) {
    var bl1, bl2, br1, br2, ref1, ref2, tl1, tl2, tr1, tr2;
    ref1 = this.vertices(), bl1 = ref1[0], tl1 = ref1[1], tr1 = ref1[2], br1 = ref1[3];
    ref2 = other.vertices(), bl2 = ref2[0], tl2 = ref2[1], tr2 = ref2[2], br2 = ref2[3];
    if (tl1.x > tr2.x || tl2.x > tr1.x) {
      return false;
    }
    if (bl1.y > tl2.y || bl2.y > tl1.y) {
      return false;
    }
    if (tl1.x === tr2.x || tl2.x === tr1.x) {
      return true;
    }
    if (tl1.y === bl2.y || tl2.y === bl1.y) {
      return true;
    }
    return false;
  };

  Rectangle.prototype.touchesPoint = function(p) {
    var bl, br, ref1, tl, tr;
    ref1 = this.vertices(), bl = ref1[0], tl = ref1[1], tr = ref1[2], br = ref1[3];
    if (!(p.y >= bl.y && p.y <= tl.y)) {
      return false;
    }
    if (!(p.x >= bl.x && p.x <= br.x)) {
      return false;
    }
    if (p.x === bl.x || p.x === br.x) {
      return true;
    }
    if (p.y === bl.y || p.y === tl.y) {
      return true;
    }
    return false;
  };

  Rectangle.prototype.axisAlignedBoundingBox = function(rounded) {
    var box, l, left, len1, ref1, ref2, ref3, ref4, ref5, top, vertex;
    if (rounded == null) {
      rounded = true;
    }
    box = this.copy();
    if (!this.rotation) {
      return box;
    }
    box.rotation = 0;
    ref1 = [9001, 9001], left = ref1[0], top = ref1[1];
    ref2 = this.vertices();
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      vertex = ref2[l];
      ref3 = [Math.min(left, vertex.x), Math.min(top, vertex.y)], left = ref3[0], top = ref3[1];
    }
    if (rounded) {
      ref4 = [Math.round(left), Math.round(top)], left = ref4[0], top = ref4[1];
    }
    ref5 = [2 * (this.x - left), 2 * (this.y - top)], box.width = ref5[0], box.height = ref5[1];
    return box;
  };

  Rectangle.prototype.distanceToPoint = function(p) {
    var dx, dy;
    p = Vector.subtract(p, this.getPos()).rotate(-this.rotation);
    dx = Math.max(Math.abs(p.x) - this.width / 2, 0);
    dy = Math.max(Math.abs(p.y) - this.height / 2, 0);
    return Math.sqrt(dx * dx + dy * dy);
  };

  Rectangle.prototype.distanceSquaredToPoint = function(p) {
    var dx, dy;
    p = Vector.subtract(p, this.getPos());
    dx = Math.max(Math.abs(p.x) - this.width / 2, 0);
    dy = Math.max(Math.abs(p.y) - this.height / 2, 0);
    return dx * dx + dy * dy;
  };

  Rectangle.prototype.distanceToRectangle = function(other) {
    return Math.sqrt(this.distanceSquaredToRectangle(other));
  };

  Rectangle.prototype.distanceSquaredToRectangle = function(other) {
    var ans, firstEdges, firstVertices, i, j, l, q, r, ref1, ref2, ref3, ref4, secondEdges, secondVertices;
    if (this.intersectsRectangle(other)) {
      return 0;
    }
    ref1 = [this.vertices(), other.vertices()], firstVertices = ref1[0], secondVertices = ref1[1];
    ref2 = [this.lineSegments(), other.lineSegments()], firstEdges = ref2[0], secondEdges = ref2[1];
    ans = Infinity;
    for (i = l = 0; l < 4; i = ++l) {
      for (j = q = 0, ref3 = firstEdges.length; 0 <= ref3 ? q < ref3 : q > ref3; j = 0 <= ref3 ? ++q : --q) {
        ans = Math.min(ans, firstEdges[j].distanceSquaredToPoint(secondVertices[i]));
      }
      for (j = r = 0, ref4 = secondEdges.length; 0 <= ref4 ? r < ref4 : r > ref4; j = 0 <= ref4 ? ++r : --r) {
        ans = Math.min(ans, secondEdges[j].distanceSquaredToPoint(firstVertices[i]));
      }
    }
    return ans;
  };

  Rectangle.prototype.distanceToEllipse = function(ellipse) {
    return Math.sqrt(this.distanceSquaredToEllipse(ellipse));
  };

  Rectangle.prototype.distanceSquaredToEllipse = function(ellipse) {
    return this.distanceSquaredToRectangle(ellipse.rectangle());
  };

  Rectangle.prototype.distanceToShape = function(shape) {
    return Math.sqrt(this.distanceSquaredToShape(shape));
  };

  Rectangle.prototype.distanceSquaredToShape = function(shape) {
    if (shape.isEllipse) {
      return this.distanceSquaredToEllipse(shape);
    } else {
      return this.distanceSquaredToRectangle(shape);
    }
  };

  Rectangle.prototype.containsPoint = function(p, withRotation) {
    var ref1, ref2;
    if (withRotation == null) {
      withRotation = true;
    }
    if (withRotation && this.rotation) {
      return !this.distanceToPoint(p);
    } else {
      return (this.x - this.width / 2 < (ref1 = p.x) && ref1 < this.x + this.width / 2) && (this.y - this.height / 2 < (ref2 = p.y) && ref2 < this.y + this.height / 2);
    }
  };

  Rectangle.prototype.intersectsLineSegment = function(p1, p2) {
    var b, b1, b2, bigX, bigY, l, len1, lineSegment, lineSegments, littleX, littleY, m, m1, m2, px1, px2, py1, py2, ref1, ref2, ref3, ref4, vertices, x, y;
    ref1 = [p1.x, p1.y, p2.x, p2.y], px1 = ref1[0], py1 = ref1[1], px2 = ref1[2], py2 = ref1[3];
    m1 = (py1 - py2) / (px1 - px2);
    b1 = py1 - (m1 * px1);
    vertices = this.vertices();
    lineSegments = [[vertices[0], vertices[1]], [vertices[1], vertices[2]], [vertices[2], vertices[3]], [vertices[3], vertices[0]]];
    for (l = 0, len1 = lineSegments.length; l < len1; l++) {
      lineSegment = lineSegments[l];
      ref2 = [p1.x, p1.y, p2.x, p2.y], px1 = ref2[0], py1 = ref2[1], px2 = ref2[2], py2 = ref2[3];
      m2 = (py1 - py2) / (px1 - px2);
      b2 = py1 - (m * px1);
      if (m1 !== m2) {
        m = m1 - m2;
        b = b2 - b1;
        x = b / m;
        ref3 = px1 < px2 ? [px1, px2] : [px2, px1], littleX = ref3[0], bigX = ref3[1];
        if (x >= littleX && x <= bigX) {
          y = (m1 * x) + b1;
          ref4 = py1 < py2 ? [py1, py2] : [py2, py1], littleY = ref4[0], bigY = ref4[1];
          if (littleY <= solution && bigY >= solution) {
            return true;
          }
        }
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsRectangle = function(rectangle) {
    var l, len1, len2, q, ref1, ref2, thatLineSegment, thisLineSegment;
    if (this.containsPoint(rectangle.getPos())) {
      return true;
    }
    ref1 = this.lineSegments();
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      thisLineSegment = ref1[l];
      ref2 = rectangle.lineSegments();
      for (q = 0, len2 = ref2.length; q < len2; q++) {
        thatLineSegment = ref2[q];
        if (thisLineSegment.intersectsLineSegment(thatLineSegment)) {
          return true;
        }
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsEllipse = function(ellipse) {
    var l, len1, lineSegment, ref1;
    if (this.containsPoint(ellipse.getPos())) {
      return true;
    }
    ref1 = this.lineSegments();
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      lineSegment = ref1[l];
      if (ellipse.intersectsLineSegment(lineSegment.a, lineSegment.b)) {
        return true;
      }
    }
    return false;
  };

  Rectangle.prototype.intersectsShape = function(shape) {
    if (shape.isEllipse) {
      return this.intersectsEllipse(shape);
    } else {
      return this.intersectsRectangle(shape);
    }
  };

  Rectangle.prototype.subtract = function(point) {
    this.x -= point.x;
    this.y -= point.y;
    this.pos.subtract(point);
    return this;
  };

  Rectangle.prototype.add = function(point) {
    this.x += point.x;
    this.y += point.y;
    this.pos.add(point);
    return this;
  };

  Rectangle.prototype.divide = function(n) {
    var ref1;
    ref1 = [this.width / n, this.height / n], this.width = ref1[0], this.height = ref1[1];
    return this;
  };

  Rectangle.prototype.multiply = function(n) {
    var ref1;
    ref1 = [this.width * n, this.height * n], this.width = ref1[0], this.height = ref1[1];
    return this;
  };

  Rectangle.prototype.isEmpty = function() {
    return this.width === 0 && this.height === 0;
  };

  Rectangle.prototype.invalid = function() {
    return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.width === Infinity || isNaN(this.width) || this.height === Infinity || isNaN(this.height) || this.rotation === Infinity || isNaN(this.rotation);
  };

  Rectangle.prototype.toString = function() {
    return "{x: " + (this.x.toFixed(0)) + ", y: " + (this.y.toFixed(0)) + ", w: " + (this.width.toFixed(0)) + ", h: " + (this.height.toFixed(0)) + ", rot: " + (this.rotation.toFixed(3)) + "}";
  };

  Rectangle.prototype.serialize = function() {
    return {
      CN: this.constructor.className,
      x: this.x,
      y: this.y,
      w: this.width,
      h: this.height,
      r: this.rotation
    };
  };

  Rectangle.deserialize = function(o, world, classMap) {
    return new Rectangle(o.x, o.y, o.w, o.h, o.r);
  };

  Rectangle.prototype.serializeForAether = function() {
    return this.serialize();
  };

  Rectangle.deserializeFromAether = function(o) {
    return this.deserialize(o);
  };

  return Rectangle;

})();

module.exports = Rectangle;
});

;
//# sourceMappingURL=/javascripts/app/lib/world/rectangle.js.map
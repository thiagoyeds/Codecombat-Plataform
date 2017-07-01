require.register("lib/world/world_utils", function(exports, require, module) {
var ArrayBufferView, Ellipse, Grid, LineSegment, Rectangle, Vector, addRect, clone, consolidateThangs, dissectRectangles, downTheChain, occ, occCol, ref, someArray, typedArraySupport;

Vector = require('./vector');

Rectangle = require('./rectangle');

Ellipse = require('./ellipse');

LineSegment = require('./line_segment');

Grid = require('./Grid');

module.exports.typedArraySupport = typedArraySupport = typeof Float32Array !== "undefined" && Float32Array !== null;

if (typeof ArrayBufferView === "undefined" || ArrayBufferView === null) {
  if (typedArraySupport) {
    someArray = new Uint8Array(0);
    if (someArray.__proto__) {
      ArrayBufferView = someArray.__proto__.__proto__.constructor;
    } else {
      ArrayBufferView = Object.getPrototypeOf(Object.getPrototypeOf(someArray)).constructor;
    }
  } else {
    ArrayBufferView = null;
  }
}

module.exports.clone = clone = function(obj, skipThangs) {
  var flags, key, newInstance;
  if (skipThangs == null) {
    skipThangs = false;
  }
  if ((obj == null) || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    flags = '';
    if (obj.global != null) {
      flags += 'g';
    }
    if (obj.ignoreCase != null) {
      flags += 'i';
    }
    if (obj.multiline != null) {
      flags += 'm';
    }
    if (obj.sticky != null) {
      flags += 'y';
    }
    return new RegExp(obj.source, flags);
  }
  if ((obj instanceof Vector) || (obj instanceof Rectangle) || (obj instanceof Ellipse) || (obj instanceof LineSegment)) {
    return obj.copy();
  }
  if (skipThangs && obj.isThang) {
    return obj;
  }
  if (_.isArray(obj)) {
    return obj.slice();
  }
  if (ArrayBufferView && obj instanceof ArrayBufferView) {
    return new obj.constructor(obj);
  }
  newInstance = new obj.constructor();
  for (key in obj) {
    newInstance[key] = clone(obj[key], skipThangs);
  }
  return newInstance;
};

module.exports.downTheChain = downTheChain = function(obj, keyChain, newValue) {
  var value;
  if (newValue == null) {
    newValue = void 0;
  }
  if (!obj) {
    return null;
  }
  if (!_.isArray(keyChain)) {
    return obj[keyChain];
  }
  value = obj;
  while (keyChain.length && value) {
    if (newValue !== void 0 && keyChain.length === 1) {
      value[keyChain[0]] = newValue;
      return newValue;
    }
    value = value[keyChain[0]];
    keyChain = keyChain.slice(1);
  }
  return value;
};

module.exports.now = ((typeof window !== "undefined" && window !== null ? (ref = window.performance) != null ? ref.now : void 0 : void 0) != null ? (function() {
  return window.performance.now();
}) : (function() {
  return new Date();
}));

module.exports.consolidateThangs = consolidateThangs = function(thangs) {
  var addStructuralThang, bottom, bottommost, debug, dissection, grid, height, isStructural, left, leftmost, padding, rightmost, structural, topmost, width;
  debug = false;
  isStructural = function(t) {
    var ref1;
    return t.stateless && t.collides && t.collisionCategory === 'obstacles' && ((ref1 = t.shape) === 'box' || ref1 === 'sheet') && t.spriteName !== 'Ice Wall' && t.restitution === 1.0 && /Wall/.test(t.spriteName) && (t.pos.x - t.width / 2 >= 0) && (t.pos.y - t.height / 2 >= 0);
  };
  structural = _.remove(thangs, isStructural);
  if (!structural.length) {
    return;
  }
  rightmost = _.max(structural, function(t) {
    return t.pos.x + t.width / 2;
  });
  topmost = _.max(structural, function(t) {
    return t.pos.y + t.height / 2;
  });
  leftmost = _.min(structural, function(t) {
    return t.pos.x - t.width / 2;
  });
  bottommost = _.min(structural, function(t) {
    return t.pos.y - t.height / 2;
  });
  if (debug) {
    console.log('got rightmost', rightmost.id, 'topmost', topmost.id, 'lefmostmost', leftmost.id, 'bottommost', bottommost.id, 'out of', structural.length, 'structural thangs');
  }
  left = Math.min(0, leftmost.pos.x - leftmost.width / 2);
  bottom = Math.min(0, bottommost.pos.y - bottommost.height / 2);
  if ((left < 0) || (bottom < 0)) {
    console.error('Negative structural Thangs aren\'t supported, sorry!');
  }
  left = 0;
  bottom = 0;
  width = rightmost.pos.x + rightmost.width / 2 - left;
  height = topmost.pos.y + topmost.height / 2 - bottom;
  padding = 0;
  if (debug) {
    console.log('got max width', width, 'height', height, 'left', left, 'bottom', bottom, 'of thangs', thangs.length, 'structural', structural.length);
  }
  grid = new Grid(structural, width, height, padding, left, bottom);
  dissection = [];
  addStructuralThang = function(rect) {
    var thang;
    thang = structural[dissection.length];
    if (!thang) {
      console.error('Hmm, our dissection has more Thangs than the original structural Thangs?', dissection.length);
    }
    thang.pos.x = rect.x;
    thang.pos.y = rect.y;
    thang.width = rect.width;
    thang.height = rect.height;
    thang.destroyBody();
    thang.createBodyDef();
    thang.createBody();
    return dissection.push(thang);
  };
  dissectRectangles(grid, addStructuralThang, false, debug);
  console.log('Turned', structural.length, 'structural Thangs into', dissection.length, 'dissecting Thangs.');
  thangs.push.apply(thangs, dissection);
  return structural.slice(dissection.length, structural.length);
};

module.exports.dissectRectangles = dissectRectangles = function(grid, rectangleCallback, wantEmpty, debug) {
  var h, i, len, rect, ref1, results, w, x, x2, y, y2;
  if (debug) {
    console.log(grid.toString());
  }
  ref1 = grid.rows(grid.left, grid.left + grid.width);
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    x = ref1[i];
    y = grid.clampColumn(grid.bottom);
    results.push((function() {
      var results1;
      results1 = [];
      while (y < grid.clampColumn(grid.bottom + grid.height)) {
        y2 = y;
        while (!occ(x, y2, grid, wantEmpty)) {
          ++y2;
        }
        if (y2 > y) {
          x2 = x + 1;
          while (!occCol(x2, y, y2, grid, wantEmpty)) {
            ++x2;
          }
          w = x2 - x;
          h = y2 - y;
          rect = addRect(grid, x, y, w, h, wantEmpty);
          rectangleCallback(rect);
          if (debug) {
            console.log(grid.toString());
          }
          y = y2;
        }
        results1.push(++y);
      }
      return results1;
    })());
  }
  return results;
};

occ = function(x, y, grid, wantEmpty) {
  var ref1;
  if (y > grid.bottom + grid.height || x > grid.left + grid.width) {
    return true;
  }
  if (!((ref1 = grid.grid[y]) != null ? ref1[x] : void 0)) {
    console.error('trying to check invalid coordinates', x, y, 'from grid', grid.bottom, grid.left, grid.width, grid.height);
  }
  return Boolean(grid.grid[y][x].length) === wantEmpty;
};

occCol = function(x, y1, y2, grid, wantEmpty) {
  var i, j, ref1, ref2;
  for (j = i = ref1 = y1, ref2 = y2; ref1 <= ref2 ? i < ref2 : i > ref2; j = ref1 <= ref2 ? ++i : --i) {
    if (occ(x, j, grid, wantEmpty)) {
      return true;
    }
  }
  return false;
};

addRect = function(grid, leftX, bottomY, width, height, wantEmpty) {
  var i, k, ref1, ref2, ref3, ref4, x, y;
  for (x = i = ref1 = leftX, ref2 = leftX + width; ref1 <= ref2 ? i < ref2 : i > ref2; x = ref1 <= ref2 ? ++i : --i) {
    for (y = k = ref3 = bottomY, ref4 = bottomY + height; ref3 <= ref4 ? k < ref4 : k > ref4; y = ref3 <= ref4 ? ++k : --k) {
      grid.grid[y][x] = wantEmpty ? [true] : [];
    }
  }
  return new Rectangle(leftX + width / 2, bottomY + height / 2, width, height);
};
});

;
//# sourceMappingURL=/javascripts/app/lib/world/world_utils.js.map
require.register("lib/world/Grid", function(exports, require, module) {
var Grid,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = Grid = (function() {
  function Grid(thangs, width1, height1, padding, left, bottom, rogue1) {
    this.width = width1;
    this.height = height1;
    this.padding = padding != null ? padding : 0;
    this.left = left != null ? left : 0;
    this.bottom = bottom != null ? bottom : 0;
    this.rogue = rogue1 != null ? rogue1 : false;
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    this.left = Math.floor(this.left);
    this.bottom = Math.floor(this.bottom);
    this.update(thangs);
  }

  Grid.prototype.update = function(thangs) {
    var i, j, k, l, len, len1, maxX, maxY, minX, minY, rect, ref, ref1, ref2, ref3, results, t, thang, v, x, y;
    this.grid = [];
    for (y = i = 0, ref = this.height; 0 <= ref ? i <= ref : i >= ref; y = 0 <= ref ? ++i : --i) {
      this.grid.push([]);
      for (x = j = 0, ref1 = this.width; 0 <= ref1 ? j <= ref1 : j >= ref1; x = 0 <= ref1 ? ++j : --j) {
        this.grid[y].push([]);
      }
    }
    if (this.rogue) {
      thangs = (function() {
        var k, len, results;
        results = [];
        for (k = 0, len = thangs.length; k < len; k++) {
          t = thangs[k];
          if (t.collides || t.spriteName === 'Gem' && !t.dead) {
            results.push(t);
          }
        }
        return results;
      })();
    } else {
      thangs = (function() {
        var k, len, results;
        results = [];
        for (k = 0, len = thangs.length; k < len; k++) {
          t = thangs[k];
          if (t.collides) {
            results.push(t);
          }
        }
        return results;
      })();
    }
    results = [];
    for (k = 0, len = thangs.length; k < len; k++) {
      thang = thangs[k];
      rect = thang.rectangle();
      ref2 = [9001, -9001, 9001, -9001], minX = ref2[0], maxX = ref2[1], minY = ref2[2], maxY = ref2[3];
      ref3 = rect.vertices();
      for (l = 0, len1 = ref3.length; l < len1; l++) {
        v = ref3[l];
        minX = Math.min(minX, v.x - this.padding);
        minY = Math.min(minY, v.y - this.padding);
        maxX = Math.max(maxX, v.x + this.padding);
        maxY = Math.max(maxY, v.y + this.padding);
      }
      results.push((function() {
        var len2, m, ref4, results1;
        ref4 = this.columns(minY, maxY);
        results1 = [];
        for (m = 0, len2 = ref4.length; m < len2; m++) {
          y = ref4[m];
          results1.push((function() {
            var len3, n, ref5, results2;
            ref5 = this.rows(minX, maxX);
            results2 = [];
            for (n = 0, len3 = ref5.length; n < len3; n++) {
              x = ref5[n];
              results2.push(this.grid[y][x].push(thang));
            }
            return results2;
          }).call(this));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Grid.prototype.contents = function(gx, gy, width, height) {
    var i, j, k, len, len1, len2, ref, ref1, ref2, thang, thangs, x, y;
    if (width == null) {
      width = 1;
    }
    if (height == null) {
      height = 1;
    }
    thangs = [];
    ref = this.columns(gy - height / 2, gy + height / 2);
    for (i = 0, len = ref.length; i < len; i++) {
      y = ref[i];
      ref1 = this.rows(gx - width / 2, gx + width / 2);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        x = ref1[j];
        ref2 = this.grid[y][x];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          thang = ref2[k];
          if (thang.collides && !(indexOf.call(thangs, thang) >= 0) && thang.id !== 'Add Thang Phantom') {
            thangs.push(thang);
          }
        }
      }
    }
    return thangs;
  };

  Grid.prototype.clampColumn = function(y) {
    y = Math.max(0, Math.floor(y) - this.bottom);
    return Math.min(this.grid.length, Math.ceil(y) - this.bottom);
  };

  Grid.prototype.clampRow = function(x) {
    var ref;
    x = Math.max(0, Math.floor(x) - this.left);
    return Math.min(((ref = this.grid[0]) != null ? ref.length : void 0) || 0, Math.ceil(x) - this.left);
  };

  Grid.prototype.columns = function(minY, maxY) {
    var i, ref, ref1, results;
    return (function() {
      results = [];
      for (var i = ref = this.clampColumn(minY), ref1 = this.clampColumn(maxY); ref <= ref1 ? i < ref1 : i > ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  };

  Grid.prototype.rows = function(minX, maxX) {
    var i, ref, ref1, results;
    return (function() {
      results = [];
      for (var i = ref = this.clampRow(minX), ref1 = this.clampRow(maxX); ref <= ref1 ? i < ref1 : i > ref1; ref <= ref1 ? i++ : i--){ results.push(i); }
      return results;
    }).apply(this);
  };

  Grid.prototype.toString = function(rogue) {
    var row, thangs, upsideDown;
    if (rogue == null) {
      rogue = false;
    }
    upsideDown = _.clone(this.grid);
    upsideDown.reverse();
    return ((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = upsideDown.length; i < len; i++) {
        row = upsideDown[i];
        results.push(((function() {
          var j, len1, results1;
          results1 = [];
          for (j = 0, len1 = row.length; j < len1; j++) {
            thangs = row[j];
            results1.push(this.charForThangs(thangs, rogue));
          }
          return results1;
        }).call(this)).join(' '));
      }
      return results;
    }).call(this)).join("\n");
  };

  Grid.prototype.charForThangs = function(thangs, rogue) {
    if (!rogue) {
      return thangs.length || ' ';
    }
    if (!thangs.length) {
      return '.';
    }
    if (_.find(thangs, function(t) {
      return /Hero Placeholder/.test(t.id);
    })) {
      return '@';
    }
    if (_.find(thangs, {
      spriteName: 'Spike Walls'
    })) {
      return '>';
    }
    if (_.find(thangs, {
      spriteName: 'Fence Wall'
    })) {
      return 'F';
    }
    if (_.find(thangs, {
      spriteName: 'Fire Trap'
    })) {
      return 'T';
    }
    if (_.find(thangs, {
      spriteName: 'Dungeon Wall'
    })) {
      return ' ';
    }
    if (_.find(thangs, {
      spriteName: 'Gem'
    })) {
      return 'G';
    }
    if (_.find(thangs, {
      spriteName: 'Treasure Chest'
    })) {
      return 'C';
    }
    if (_.find(thangs, {
      spriteName: 'Spear'
    })) {
      return '*';
    }
    if (_.find(thangs, {
      type: 'munchkin'
    })) {
      return 'o';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'ogres';
    })) {
      return 'O';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'humans';
    })) {
      return 'H';
    }
    if (_.find(thangs, function(t) {
      return t.team === 'neutral';
    })) {
      return 'N';
    }
    return '?';
  };

  return Grid;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/Grid.js.map
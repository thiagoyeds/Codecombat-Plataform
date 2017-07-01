require.register("lib/world/rand", function(exports, require, module) {
var Rand,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Rand = (function() {
  Rand.className = 'Rand';

  function Rand(seed1) {
    var ref;
    this.seed = seed1;
    this.choice = bind(this.choice, this);
    this.shuffle = bind(this.shuffle, this);
    this.randfRange = bind(this.randfRange, this);
    this.randf2 = bind(this.randf2, this);
    this.rand2 = bind(this.rand2, this);
    this.rand = bind(this.rand, this);
    this.randf = bind(this.randf, this);
    this.randn = bind(this.randn, this);
    this.multiplier = 1664525;
    this.modulo = 4294967296;
    this.offset = 1013904223;
    if (!((this.seed != null) && (0 <= (ref = this.seed) && ref < this.modulo))) {
      this.seed = (new Date().valueOf() * new Date().getMilliseconds()) % this.modulo;
    }
  }

  Rand.prototype.setSeed = function(seed) {
    return this.seed = ((seed % this.modulo) + this.modulo) % this.modulo;
  };

  Rand.prototype.randn = function() {
    return this.seed = (this.multiplier * this.seed + this.offset) % this.modulo;
  };

  Rand.prototype.randf = function() {
    return this.randn() / this.modulo;
  };

  Rand.prototype.rand = function(n) {
    return Math.floor(this.randf() * n);
  };

  Rand.prototype.rand2 = function(min, max) {
    return min + this.rand(max - min);
  };

  Rand.prototype.randf2 = function(min, max) {
    return min + this.randf() * (max - min);
  };

  Rand.prototype.randfRange = function(x, range) {
    return x + (-0.5 + this.randf()) * range;
  };

  Rand.prototype.shuffle = function(arr) {
    var i, j, k, ref, t;
    if (!(arr.length > 2)) {
      return arr;
    }
    for (i = k = ref = arr.length - 1; ref <= 1 ? k <= 1 : k >= 1; i = ref <= 1 ? ++k : --k) {
      j = Math.floor(this.randf() * (i + 1));
      t = arr[j];
      arr[j] = arr[i];
      arr[i] = t;
    }
    return arr;
  };

  Rand.prototype.choice = function(arr) {
    return arr[this.rand(arr.length)];
  };

  return Rand;

})();

module.exports = Rand;
});

;
//# sourceMappingURL=/javascripts/app/lib/world/rand.js.map
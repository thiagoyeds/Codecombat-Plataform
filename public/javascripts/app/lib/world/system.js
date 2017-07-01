require.register("lib/world/system", function(exports, require, module) {
var System,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = System = (function() {
  System.className = 'System';

  function System(world, config) {
    var key, ref, value;
    this.world = world;
    ref = config != null ? config : {};
    for (key in ref) {
      value = ref[key];
      this[key] = value;
    }
    this.registries = [];
    this.hashes = {};
  }

  System.prototype.start = function(thangs) {};

  System.prototype.update = function(thangs) {
    var hash;
    return hash = 0;
  };

  System.prototype.finish = function(thangs) {};

  System.prototype.addRegistry = function(condition) {
    var registry;
    registry = [];
    this.registries.push([registry, condition]);
    return registry;
  };

  System.prototype.register = function(thang) {
    var condition, j, len, ref, ref1, registry, thangIndex;
    ref = this.registries;
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], registry = ref1[0], condition = ref1[1];
      if (condition(thang)) {
        if (indexOf.call(registry, thang) < 0) {
          registry.push(thang);
        }
      } else {
        thangIndex = registry.indexOf(thang);
        if (thangIndex !== -1) {
          registry.splice(thangIndex, 1);
        }
      }
    }
    return null;
  };

  System.prototype.checkRegistration = function(thang, registry) {};

  System.prototype.hashString = function(s) {
    var hash, i, j, ref;
    if (s in this.hashes) {
      return this.hashes[s];
    }
    hash = 0;
    for (i = j = 0, ref = Math.min(s.length, 100); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      hash = hash * 31 + s.charCodeAt(i);
    }
    hash = this.hashes[s] = hash % 3.141592653589793;
    return hash;
  };

  System.prototype.toString = function() {
    return "<System: " + this.constructor.className;
  };

  return System;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/system.js.map
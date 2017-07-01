require.register("lib/world/systems/collision", function(exports, require, module) {
var CollisionCategory;

module.exports.CollisionCategory = CollisionCategory = (function() {
  CollisionCategory.className = 'CollisionCategory';

  function CollisionCategory(name, superteamIndex1, collisionSystem) {
    var otherCat, otherCatName, ref;
    this.superteamIndex = superteamIndex1 != null ? superteamIndex1 : null;
    this.collisionSystem = collisionSystem;
    this.ground = name.search('ground') !== -1;
    this.air = name.search('air') !== -1;
    this.name = CollisionCategory.nameFor(name, this.superteamIndex);
    if (this.ground || this.air) {
      if (this.superteamIndex == null) {
        this.superteamIndex = 0;
      }
    }
    this.number = 1 << this.collisionSystem.totalCategories++;
    if (this.collisionSystem.totalCategories > 16) {
      console.log('There should only be 16 collision categories!');
    }
    this.mask = 0;
    this.collisionSystem.allCategories[this.name] = this;
    ref = this.collisionSystem.allCategories;
    for (otherCatName in ref) {
      otherCat = ref[otherCatName];
      if (this.collidesWith(otherCat)) {
        this.mask = this.mask | otherCat.number;
        otherCat.mask = otherCat.mask | this.number;
      }
    }
  }

  CollisionCategory.prototype.collidesWith = function(cat) {
    var sameTeam;
    if (this.name === 'none' || cat.name === 'none') {
      return false;
    }
    if (cat.name === 'obstacles' || this.name === 'obstacles') {
      return true;
    }
    if (this.name === 'dead') {
      return cat.name === 'obstacles';
    }
    if (cat.name === 'dead') {
      return this.name === 'obstacles';
    }
    sameTeam = this.superteamIndex && cat.superteamIndex === this.superteamIndex;
    if (sameTeam && this.ground && this.air) {
      return false;
    }
    if (this.ground && this.air && cat.ground && cat.air) {
      return false;
    }
    if (cat.ground && this.ground) {
      return true;
    }
    if (cat.air && this.air) {
      return true;
    }
    return false;
  };

  CollisionCategory.nameFor = function(name, superteamIndex) {
    if (superteamIndex == null) {
      superteamIndex = null;
    }
    if (!(name.match('ground') || name.match('air'))) {
      return name;
    }
    return name + '_' + (superteamIndex || 0);
  };

  return CollisionCategory;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/systems/collision.js.map
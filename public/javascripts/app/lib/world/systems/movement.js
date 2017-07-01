require.register("lib/world/systems/movement", function(exports, require, module) {
var AIR_DENSITY, ICE_FRICTION, STANDARD_FRICTION, SWAMP_DENSITY, VACUUM_DENSITY, WATER_DENSITY;

module.exports.WATER_DENSITY = WATER_DENSITY = 1000;

module.exports.AIR_DENSITY = AIR_DENSITY = 1.225;

module.exports.VACUUM_DENSITY = VACUUM_DENSITY = 0.00000000000000129;

module.exports.SWAMP_DENSITY = SWAMP_DENSITY = WATER_DENSITY / 4;

module.exports.STANDARD_FRICTION = STANDARD_FRICTION = 0.7;

module.exports.ICE_FRICTION = ICE_FRICTION = 0.1;
});

;
//# sourceMappingURL=/javascripts/app/lib/world/systems/movement.js.map
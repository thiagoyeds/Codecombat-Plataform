require.register("lib/world/world_frame", function(exports, require, module) {
var ThangState, WorldFrame;

ThangState = require('./thang_state');

module.exports = WorldFrame = (function() {
  WorldFrame.className = 'WorldFrame';

  function WorldFrame(world1, time) {
    this.world = world1;
    this.time = time != null ? time : 0;
    this.thangStateMap = {};
    if (this.world) {
      this.setState();
    }
  }

  WorldFrame.prototype.getNextFrame = function() {
    var j, len, nextFrame, nextTime, ref, system;
    nextTime = this.time + this.world.dt;
    if (nextTime > this.world.lifespan && !this.world.indefiniteLength) {
      return null;
    }
    this.hash = this.world.rand.seed;
    ref = this.world.systems;
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      this.hash += system.update();
    }
    nextFrame = new WorldFrame(this.world, nextTime);
    return nextFrame;
  };

  WorldFrame.prototype.setState = function() {
    var j, len, ref, results, thang;
    ref = this.world.thangs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      if (!thang.stateless) {
        results.push(this.thangStateMap[thang.id] = thang.getState());
      }
    }
    return results;
  };

  WorldFrame.prototype.restoreState = function() {
    var j, len, ref, ref1, results, thang, thangID, thangState;
    ref = this.thangStateMap;
    for (thangID in ref) {
      thangState = ref[thangID];
      thangState.restore();
    }
    ref1 = this.world.thangs;
    results = [];
    for (j = 0, len = ref1.length; j < len; j++) {
      thang = ref1[j];
      if (!this.thangStateMap[thang.id] && !thang.stateless) {
        results.push(thang.exists = false);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  WorldFrame.prototype.restorePartialState = function(ratio) {
    var ref, results, thangID, thangState;
    ref = this.thangStateMap;
    results = [];
    for (thangID in ref) {
      thangState = ref[thangID];
      results.push(thangState.restorePartial(ratio));
    }
    return results;
  };

  WorldFrame.prototype.restoreStateForThang = function(thang) {
    var thangState;
    thangState = this.thangStateMap[thang.id];
    if (!thangState) {
      if (!thang.stateless) {
        thang.exists = false;
      }
      return;
    }
    return thangState.restore();
  };

  WorldFrame.prototype.clearEvents = function() {
    var j, len, ref, results, thang;
    ref = this.world.thangs;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      thang = ref[j];
      results.push(thang.currentEvents = []);
    }
    return results;
  };

  WorldFrame.prototype.toString = function() {
    var i, j, k, l, len, map, rect, ref, ref1, ref2, ref3, ref4, symbols, thang, x, xs, y;
    map = (function() {
      var j, ref, results;
      results = [];
      for (y = j = 0, ref = this.world.height; 0 <= ref ? j <= ref : j >= ref; y = 0 <= ref ? ++j : --j) {
        results.push((function() {
          var k, ref1, results1;
          results1 = [];
          for (x = k = 0, ref1 = this.world.width; 0 <= ref1 ? k <= ref1 : k >= ref1; x = 0 <= ref1 ? ++k : --k) {
            results1.push(' ');
          }
          return results1;
        }).call(this));
      }
      return results;
    }).call(this);
    symbols = '.ox@dfga[]/D';
    ref = this.world.thangs;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      thang = ref[i];
      if (!thang.rectangle) {
        continue;
      }
      rect = thang.rectangle().axisAlignedBoundingBox();
      for (y = k = ref1 = Math.floor(rect.y - rect.height / 2), ref2 = Math.ceil(rect.y + rect.height / 2); ref1 <= ref2 ? k < ref2 : k > ref2; y = ref1 <= ref2 ? ++k : --k) {
        for (x = l = ref3 = Math.floor(rect.x - rect.width / 2), ref4 = Math.ceil(rect.x + rect.width / 2); ref3 <= ref4 ? l < ref4 : l > ref4; x = ref3 <= ref4 ? ++l : --l) {
          if ((0 <= y && y < this.world.height) && (0 <= x && x < this.world.width)) {
            map[y][x] = symbols[i % symbols.length];
          }
        }
      }
    }
    return this.time + '\n' + ((function() {
      var len1, m, results;
      results = [];
      for (m = 0, len1 = map.length; m < len1; m++) {
        xs = map[m];
        results.push(xs.join(' '));
      }
      return results;
    })()).join('\n') + '\n';
  };

  WorldFrame.prototype.serialize = function(frameIndex, trackedPropertiesThangIDs, trackedPropertiesPerThangIndices, trackedPropertiesPerThangTypes, trackedPropertiesPerThangValues, specialValuesToKeys, specialKeysToValues) {
    var j, len, thangID, thangIndex, thangState;
    for (thangIndex = j = 0, len = trackedPropertiesThangIDs.length; j < len; thangIndex = ++j) {
      thangID = trackedPropertiesThangIDs[thangIndex];
      thangState = this.thangStateMap[thangID];
      if (thangState) {
        thangState.serialize(frameIndex, trackedPropertiesPerThangIndices[thangIndex], trackedPropertiesPerThangTypes[thangIndex], trackedPropertiesPerThangValues[thangIndex], specialValuesToKeys, specialKeysToValues);
      }
    }
    return this.hash;
  };

  WorldFrame.deserialize = function(world, frameIndex, trackedPropertiesThangIDs, trackedPropertiesThangs, trackedPropertiesPerThangKeys, trackedPropertiesPerThangTypes, trackedPropertiesPerThangValues, specialKeysToValues, hash, age) {
    var j, len, thangID, thangIndex, wf;
    wf = new WorldFrame(null, age);
    wf.world = world;
    wf.hash = hash;
    for (thangIndex = j = 0, len = trackedPropertiesThangIDs.length; j < len; thangIndex = ++j) {
      thangID = trackedPropertiesThangIDs[thangIndex];
      wf.thangStateMap[thangID] = ThangState.deserialize(world, frameIndex, trackedPropertiesThangs[thangIndex], trackedPropertiesPerThangKeys[thangIndex], trackedPropertiesPerThangTypes[thangIndex], trackedPropertiesPerThangValues[thangIndex], specialKeysToValues);
    }
    return wf;
  };

  return WorldFrame;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/world_frame.js.map
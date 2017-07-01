require.register("core/deltas", function(exports, require, module) {
var SystemNameLoader, expandFlattenedDelta, flattenDelta, groupDeltasByAffectingPaths, objectHash, prunePath;

SystemNameLoader = require('./../core/SystemNameLoader');


/*
  Good-to-knows:
    dataPath: an array of keys that walks you up a JSON object that's being patched
      ex: ['scripts', 0, 'description']
    deltaPath: an array of keys that walks you up a JSON Diff Patch object.
      ex: ['scripts', '_0', 'description']
 */

module.exports.expandDelta = function(delta, left, schema) {
  var fd, flattenedDeltas, j, len, results1, right;
  if (left != null) {
    right = jsondiffpatch.clone(left);
    jsondiffpatch.patch(right, delta);
  }
  flattenedDeltas = flattenDelta(delta);
  results1 = [];
  for (j = 0, len = flattenedDeltas.length; j < len; j++) {
    fd = flattenedDeltas[j];
    results1.push(expandFlattenedDelta(fd, left, right, schema));
  }
  return results1;
};

module.exports.flattenDelta = flattenDelta = function(delta, dataPath, deltaPath) {
  var affectingArray, childDelta, dataIndex, deltaIndex, results;
  if (dataPath == null) {
    dataPath = null;
  }
  if (deltaPath == null) {
    deltaPath = null;
  }
  if (!delta) {
    return [];
  }
  if (dataPath == null) {
    dataPath = [];
  }
  if (deltaPath == null) {
    deltaPath = [];
  }
  if (_.isArray(delta)) {
    return [
      {
        dataPath: dataPath,
        deltaPath: deltaPath,
        o: delta
      }
    ];
  }
  results = [];
  affectingArray = delta._t === 'a';
  for (deltaIndex in delta) {
    childDelta = delta[deltaIndex];
    if (deltaIndex === '_t') {
      continue;
    }
    dataIndex = affectingArray ? parseInt(deltaIndex.replace('_', '')) : deltaIndex;
    results = results.concat(flattenDelta(childDelta, dataPath.concat([dataIndex]), deltaPath.concat([deltaIndex])));
  }
  return results;
};

expandFlattenedDelta = function(delta, left, right, schema) {
  var childLeft, childRight, childSchema, humanKey, humanPath, i, j, key, len, o, parentLeft, parentRight, parentSchema, ref, ref1;
  delta.action = '???';
  o = delta.o;
  humanPath = [];
  parentLeft = left;
  parentRight = right;
  parentSchema = schema;
  ref = delta.dataPath;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    key = ref[i];
    childSchema = (parentSchema != null ? parentSchema.items : void 0) || (parentSchema != null ? (ref1 = parentSchema.properties) != null ? ref1[key] : void 0 : void 0) || {};
    childLeft = parentLeft != null ? parentLeft[key] : void 0;
    childRight = parentRight != null ? parentRight[key] : void 0;
    humanKey = null;
    if (childRight) {
      if (humanKey == null) {
        humanKey = childRight.name || childRight.id;
      }
    }
    if (humanKey == null) {
      humanKey = SystemNameLoader.getName(childRight != null ? childRight.original : void 0);
    }
    if (childSchema.title) {
      if (humanKey == null) {
        humanKey = "" + childSchema.title;
      }
    }
    if (humanKey == null) {
      humanKey = _.string.titleize(key);
    }
    humanPath.push(humanKey);
    parentLeft = childLeft;
    parentRight = childRight;
    parentSchema = childSchema;
  }
  if (!childLeft && childRight) {
    childLeft = jsondiffpatch.patch(childRight, jsondiffpatch.reverse(o));
  }
  if (_.isArray(o) && o.length === 1) {
    delta.action = 'added';
    delta.newValue = o[0];
  }
  if (_.isArray(o) && o.length === 2) {
    delta.action = 'modified';
    delta.oldValue = o[0];
    delta.newValue = o[1];
  }
  if (_.isArray(o) && o.length === 3 && o[1] === 0 && o[2] === 0) {
    delta.action = 'deleted';
    delta.oldValue = o[0];
  }
  if (_.isPlainObject(o) && o._t === 'a') {
    delta.action = 'modified-array';
  }
  if (_.isPlainObject(o) && o._t !== 'a') {
    delta.action = 'modified-object';
  }
  if (_.isArray(o) && o.length === 3 && o[2] === 3) {
    delta.action = 'moved-index';
    delta.destinationIndex = o[1];
    delta.originalIndex = delta.dataPath[delta.dataPath.length - 1];
    delta.hash = objectHash(childRight);
  }
  if (_.isArray(o) && o.length === 3 && o[1] === 0 && o[2] === 2) {
    delta.action = 'text-diff';
    delta.unidiff = o[0];
  }
  delta.humanPath = humanPath.join(' :: ');
  delta.schema = childSchema;
  delta.left = childLeft;
  delta.right = childRight;
  return delta;
};

objectHash = function(obj) {
  if (obj != null) {
    return obj.name || obj.id || obj._id || JSON.stringify(_.keys(obj).sort());
  } else {
    return 'null';
  }
};

module.exports.makeJSONDiffer = function() {
  return jsondiffpatch.create({
    objectHash: objectHash
  });
};

module.exports.getConflicts = function(headDeltas, pendingDeltas) {
  var conflicts, headDelta, headMetaDelta, headPathMap, i, j, l, len, len1, len2, m, nextPath, offset, path, paths, pendingDelta, pendingMetaDelta, pendingPathMap, ref, ref1;
  headPathMap = groupDeltasByAffectingPaths(headDeltas);
  pendingPathMap = groupDeltasByAffectingPaths(pendingDeltas);
  paths = _.keys(headPathMap).concat(_.keys(pendingPathMap));
  conflicts = [];
  paths.sort();
  for (i = j = 0, len = paths.length; j < len; i = ++j) {
    path = paths[i];
    offset = 1;
    while (i + offset < paths.length) {
      nextPath = paths[i + offset];
      offset += 1;
      if (!(_.string.startsWith(nextPath, path))) {
        break;
      }
      if (!(headPathMap[path] || headPathMap[nextPath])) {
        continue;
      }
      if (!(pendingPathMap[path] || pendingPathMap[nextPath])) {
        continue;
      }
      ref = headPathMap[path] || headPathMap[nextPath];
      for (l = 0, len1 = ref.length; l < len1; l++) {
        headMetaDelta = ref[l];
        headDelta = headMetaDelta.delta;
        ref1 = pendingPathMap[path] || pendingPathMap[nextPath];
        for (m = 0, len2 = ref1.length; m < len2; m++) {
          pendingMetaDelta = ref1[m];
          pendingDelta = pendingMetaDelta.delta;
          conflicts.push({
            headDelta: headDelta,
            pendingDelta: pendingDelta
          });
          pendingDelta.conflict = headDelta;
          headDelta.conflict = pendingDelta;
        }
      }
    }
  }
  if (conflicts.length) {
    return conflicts;
  }
};

groupDeltasByAffectingPaths = function(deltas) {
  var conflictPaths, delta, item, j, l, len, len1, map, metaDeltas, path, ref;
  metaDeltas = [];
  for (j = 0, len = deltas.length; j < len; j++) {
    delta = deltas[j];
    conflictPaths = [];
    if (delta.action === 'moved-index') {
      conflictPaths.push(delta.dataPath.slice(0, delta.dataPath.length - 1));
    } else if (((ref = delta.action) === 'deleted' || ref === 'added') && _.isNumber(delta.dataPath[delta.dataPath.length - 1])) {
      conflictPaths.push(delta.dataPath.slice(0, delta.dataPath.length - 1));
    } else {
      conflictPaths.push(delta.dataPath);
    }
    for (l = 0, len1 = conflictPaths.length; l < len1; l++) {
      path = conflictPaths[l];
      metaDeltas.push({
        delta: delta,
        path: ((function() {
          var len2, m, results1;
          results1 = [];
          for (m = 0, len2 = path.length; m < len2; m++) {
            item = path[m];
            results1.push(item.toString());
          }
          return results1;
        })()).join('/')
      });
    }
  }
  map = _.groupBy(metaDeltas, 'path');
  return map;
};

module.exports.pruneConflictsFromDelta = function(delta, conflicts) {
  var conflict, expandedDeltas;
  expandedDeltas = (function() {
    var j, len, results1;
    results1 = [];
    for (j = 0, len = conflicts.length; j < len; j++) {
      conflict = conflicts[j];
      results1.push(conflict.pendingDelta);
    }
    return results1;
  })();
  return module.exports.pruneExpandedDeltasFromDelta(delta, expandedDeltas);
};

module.exports.pruneExpandedDeltasFromDelta = function(delta, expandedDeltas) {
  var expandedDelta, j, len;
  for (j = 0, len = expandedDeltas.length; j < len; j++) {
    expandedDelta = expandedDeltas[j];
    prunePath(delta, expandedDelta.deltaPath);
  }
  if (_.isEmpty(delta)) {
    return void 0;
  } else {
    return delta;
  }
};

prunePath = function(delta, path) {
  var k, keys;
  if (path.length === 1) {
    if (delta[path] !== void 0) {
      return delete delta[path];
    }
  } else {
    if (delta[path[0]] !== void 0) {
      prunePath(delta[path[0]], path.slice(1));
    }
    keys = (function() {
      var j, len, ref, results1;
      ref = _.keys(delta[path[0]]);
      results1 = [];
      for (j = 0, len = ref.length; j < len; j++) {
        k = ref[j];
        if (k !== '_t') {
          results1.push(k);
        }
      }
      return results1;
    })();
    if (keys.length === 0) {
      return delete delta[path[0]];
    }
  }
};

module.exports.DOC_SKIP_PATHS = ['_id', 'version', 'commitMessage', 'parent', 'created', 'slug', 'index', '__v', 'patches', 'creator', 'js', 'watchers', 'levelsUpdated'];
});

;
//# sourceMappingURL=/javascripts/app/core/deltas.js.map
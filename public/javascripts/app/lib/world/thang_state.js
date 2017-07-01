require.register("lib/world/thang_state", function(exports, require, module) {
var FloatArrayType, ThangState, Vector, bytesPerFloat, clone, ref, ref1, typedArraySupport;

ref = require('./world_utils'), clone = ref.clone, typedArraySupport = ref.typedArraySupport;

Vector = require('./vector');

if (typedArraySupport) {
  FloatArrayType = Float32Array;
  bytesPerFloat = (ref1 = FloatArrayType.BYTES_PER_ELEMENT) != null ? ref1 : FloatArrayType.prototype.BYTES_PER_ELEMENT;
} else {
  bytesPerFloat = 4;
}

module.exports = ThangState = (function() {
  ThangState.className = 'ThangState';

  ThangState.trackedPropertyTypes = ['boolean', 'number', 'string', 'array', 'object', 'Vector', 'Thang'];

  ThangState.prototype.hasRestored = false;

  function ThangState(thang) {
    var j, len, prop, propIndex, ref2, type, value;
    this.props = [];
    if (!thang) {
      return;
    }
    this.thang = thang;
    ref2 = thang.trackedPropertiesKeys;
    for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
      prop = ref2[propIndex];
      type = thang.trackedPropertiesTypes[propIndex];
      value = thang[prop];
      if (type === 'Vector') {
        this.props.push(value != null ? value.copy() : void 0);
      } else if (type === 'object' || type === 'array') {
        this.props.push(clone(value, true));
      } else {
        this.props.push(value);
      }
    }
  }

  ThangState.prototype.getStoredProp = function(propIndex, type, storage) {
    var specialKey, value, valueString;
    if (!type) {
      type = this.trackedPropertyTypes[propIndex];
      storage = this.trackedPropertyValues[propIndex];
    }
    if (type === 'Vector') {
      value = new Vector(storage[3 * this.frameIndex], storage[3 * this.frameIndex + 1], storage[3 * this.frameIndex + 2]);
    } else if (type === 'string') {
      specialKey = storage[this.frameIndex];
      value = this.specialKeysToValues[specialKey];
    } else if (type === 'Thang') {
      specialKey = storage[this.frameIndex];
      value = this.thang.world.getThangByID(this.specialKeysToValues[specialKey]);
    } else if (type === 'array') {
      specialKey = storage[this.frameIndex];
      valueString = this.specialKeysToValues[specialKey];
      if (valueString && valueString.length > 1) {
        value = valueString.substring(1, valueString.length - 1).split('\x1E');
      } else {
        value = [];
      }
    } else {
      value = storage[this.frameIndex];
    }
    return value;
  };

  ThangState.prototype.getStateForProp = function(prop) {
    var initialPropIndex, propIndex, value;
    propIndex = this.trackedPropertyKeys.indexOf(prop);
    if (propIndex === -1) {
      initialPropIndex = this.thang.unusedTrackedPropertyKeys.indexOf(prop);
      if (initialPropIndex === -1) {
        return null;
      }
      return this.thang.unusedTrackedPropertyValues[initialPropIndex];
    }
    value = this.props[propIndex];
    if (value !== void 0 || this.hasRestored) {
      return value;
    }
    return this.props[propIndex] = this.getStoredProp(propIndex);
  };

  ThangState.prototype.restore = function() {
    var j, k, l, len, len1, len2, len3, m, prop, propIndex, props, ref2, ref3, ref4, ref5, storage, type;
    if (this.thang._state === this && !this.thang.partialState) {
      return this;
    }
    if (!this.hasRestored) {
      ref2 = this.thang.unusedTrackedPropertyKeys;
      for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
        prop = ref2[propIndex];
        if (this.trackedPropertyKeys.indexOf(prop) === -1) {
          this.thang[prop] = this.thang.unusedTrackedPropertyValues[propIndex];
        }
      }
      props = [];
      ref3 = this.trackedPropertyKeys;
      for (propIndex = k = 0, len1 = ref3.length; k < len1; propIndex = ++k) {
        prop = ref3[propIndex];
        type = this.trackedPropertyTypes[propIndex];
        storage = this.trackedPropertyValues[propIndex];
        props.push(this.thang[prop] = this.getStoredProp(propIndex, type, storage));
      }
      this.props = props;
      this.trackedPropertyTypes = this.trackedPropertyValues = this.specialKeysToValues = null;
      this.hasRestored = true;
    } else {
      ref4 = this.thang.unusedTrackedPropertyKeys;
      for (propIndex = l = 0, len2 = ref4.length; l < len2; propIndex = ++l) {
        prop = ref4[propIndex];
        if (this.trackedPropertyKeys.indexOf(prop) === -1) {
          this.thang[prop] = this.thang.unusedTrackedPropertyValues[propIndex];
        }
      }
      ref5 = this.trackedPropertyKeys;
      for (propIndex = m = 0, len3 = ref5.length; m < len3; propIndex = ++m) {
        prop = ref5[propIndex];
        this.thang[prop] = this.props[propIndex];
      }
    }
    this.thang.partialState = false;
    this.thang.stateChanged = true;
    return this;
  };

  ThangState.prototype.restorePartial = function(ratio) {
    var inverse, j, len, prop, propIndex, ref2, storage, type, value;
    inverse = 1 - ratio;
    ref2 = this.trackedPropertyKeys;
    for (propIndex = j = 0, len = ref2.length; j < len; propIndex = ++j) {
      prop = ref2[propIndex];
      if (!(prop === 'pos' || prop === 'rotation')) {
        continue;
      }
      if (this.hasRestored) {
        value = this.props[propIndex];
      } else {
        type = this.trackedPropertyTypes[propIndex];
        storage = this.trackedPropertyValues[propIndex];
        value = this.getStoredProp(propIndex, type, storage);
      }
      if (prop === 'pos') {
        if ((this.thang.teleport && this.thang.pos.distanceSquared(value) > 900) || (this.thang.pos.x === 0 && this.thang.pos.y === 0)) {
          this.thang.pos = value;
        } else {
          this.thang.pos = this.thang.pos.copy();
          this.thang.pos.x = inverse * this.thang.pos.x + ratio * value.x;
          this.thang.pos.y = inverse * this.thang.pos.y + ratio * value.y;
          this.thang.pos.z = inverse * this.thang.pos.z + ratio * value.z;
        }
      } else if (prop === 'rotation') {
        this.thang.rotation = inverse * this.thang.rotation + ratio * value;
      }
      this.thang.partialState = true;
    }
    this.thang.stateChanged = true;
    return this;
  };

  ThangState.prototype.serialize = function(frameIndex, trackedPropertyIndices, trackedPropertyTypes, trackedPropertyValues, specialValuesToKeys, specialKeysToValues) {
    var element, j, k, len, len1, newPropIndex, originalPropIndex, specialKey, storage, stringPieces, type, value;
    for (newPropIndex = j = 0, len = trackedPropertyTypes.length; j < len; newPropIndex = ++j) {
      type = trackedPropertyTypes[newPropIndex];
      originalPropIndex = trackedPropertyIndices[newPropIndex];
      storage = trackedPropertyValues[newPropIndex];
      value = this.props[originalPropIndex];
      if (value) {
        if (type === 'Vector') {
          storage[3 * frameIndex] = value.x;
          storage[3 * frameIndex + 1] = value.y;
          storage[3 * frameIndex + 2] = value.z;
        } else if (type === 'string') {
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else if (type === 'Thang') {
          value = value.id;
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else if (type === 'array') {
          stringPieces = ['\x1D'];
          for (k = 0, len1 = value.length; k < len1; k++) {
            element = value[k];
            if (element && element.id) {
              element = element.id;
            }
            stringPieces.push(element, '\x1E');
          }
          value = stringPieces.join('');
          specialKey = specialValuesToKeys[value];
          if (!specialKey) {
            specialKey = specialKeysToValues.length;
            specialValuesToKeys[value] = specialKey;
            specialKeysToValues.push(value);
            storage[frameIndex] = specialKey;
          }
          storage[frameIndex] = specialKey;
        } else {
          storage[frameIndex] = value;
        }
      }
    }
    return null;
  };

  ThangState.deserialize = function(world, frameIndex, thang, trackedPropertyKeys, trackedPropertyTypes, trackedPropertyValues, specialKeysToValues) {
    var ts;
    ts = new ThangState;
    ts.thang = thang;
    ts.frameIndex = frameIndex;
    ts.trackedPropertyKeys = trackedPropertyKeys;
    ts.trackedPropertyTypes = trackedPropertyTypes;
    ts.trackedPropertyValues = trackedPropertyValues;
    ts.specialKeysToValues = specialKeysToValues;
    return ts;
  };

  ThangState.transferableBytesNeededForType = function(type, nFrames) {
    var bytes;
    bytes = (function() {
      switch (type) {
        case 'boolean':
          return 1;
        case 'number':
          return bytesPerFloat;
        case 'Vector':
          return bytesPerFloat * 3;
        case 'string':
          return 4;
        case 'Thang':
          return 4;
        case 'array':
          return 4;
        default:
          return 0;
      }
    })();
    return bytesPerFloat * Math.ceil(nFrames * bytes / bytesPerFloat);
  };

  ThangState.createArrayForType = function(type, nFrames, buffer, offset) {
    var bytes, storage;
    bytes = this.transferableBytesNeededForType(type, nFrames);
    storage = (function() {
      switch (type) {
        case 'boolean':
          return new Uint8Array(buffer, offset, nFrames);
        case 'number':
          return new FloatArrayType(buffer, offset, nFrames);
        case 'Vector':
          return new FloatArrayType(buffer, offset, nFrames * 3);
        case 'string':
          return new Uint32Array(buffer, offset, nFrames);
        case 'Thang':
          return new Uint32Array(buffer, offset, nFrames);
        case 'array':
          return new Uint32Array(buffer, offset, nFrames);
        default:
          return [];
      }
    })();
    return [storage, bytes];
  };

  return ThangState;

})();

if (!typedArraySupport) {
  ThangState.createArrayForType = function(type, nFrames, buffer, offset) {
    var bytes, elementsPerFrame, i, storage;
    bytes = this.transferableBytesNeededForType(type, nFrames);
    elementsPerFrame = type === 'Vector' ? 3 : 1;
    storage = (function() {
      var j, ref2, results;
      results = [];
      for (i = j = 0, ref2 = nFrames * elementsPerFrame; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
        results.push(0);
      }
      return results;
    })();
    return [storage, bytes];
  };
}
});

;
//# sourceMappingURL=/javascripts/app/lib/world/thang_state.js.map
require.register("lib/world/thang", function(exports, require, module) {
var ArgumentError, Rand, Thang, ThangState, thangNames,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ThangState = require('./thang_state');

thangNames = require('./names').thangNames;

ArgumentError = require('./errors').ArgumentError;

Rand = require('./rand');

module.exports = Thang = (function() {
  Thang.className = 'Thang';

  Thang.remainingThangNames = {};

  Thang.nextID = function(spriteName, world) {
    var baseName, extantThang, i, name, originals, remaining;
    originals = thangNames[spriteName] || [spriteName];
    remaining = Thang.remainingThangNames[spriteName];
    if (!(remaining != null ? remaining.length : void 0)) {
      remaining = Thang.remainingThangNames[spriteName] = originals.slice();
    }
    baseName = remaining.splice(world.rand.rand(remaining.length), 1)[0];
    i = 0;
    while (true) {
      name = i ? baseName + " " + i : baseName;
      extantThang = world.thangMap[name];
      if (!extantThang) {
        break;
      }
      i++;
    }
    return name;
  };

  Thang.resetThangIDs = function() {
    return Thang.remainingThangNames = {};
  };

  Thang.prototype.isThang = true;

  Thang.prototype.apiProperties = ['id', 'spriteName', 'health', 'pos', 'team'];

  function Thang(world1, spriteName1, id1) {
    this.world = world1;
    this.spriteName = spriteName1;
    this.id = id1;
    if (this.spriteName == null) {
      this.spriteName = this.constructor.className;
    }
    if (this.id == null) {
      this.id = this.constructor.nextID(this.spriteName, this.world);
    }
    this.addTrackedProperties(['exists', 'boolean']);
  }

  Thang.prototype.destroy = function() {
    var key;
    for (key in this) {
      this[key] = void 0;
    }
    this.destroyed = true;
    return this.destroy = function() {};
  };

  Thang.prototype.updateRegistration = function() {
    var j, len, ref, results, system;
    ref = this.world.systems;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      system = ref[j];
      results.push(system.register(this));
    }
    return results;
  };

  Thang.prototype.publishNote = function(channel, event) {
    event.thang = this;
    return this.world.publishNote(channel, event);
  };

  Thang.prototype.getGoalState = function(goalID) {
    return this.world.getGoalState(goalID);
  };

  Thang.prototype.setGoalState = function(goalID, status) {
    return this.world.setGoalState(goalID, status);
  };

  Thang.prototype.getThangByID = function(id) {
    return this.world.getThangByID(id);
  };

  Thang.prototype.addComponents = function() {
    var base, c, componentClass, componentConfig, components, j, len, name1, ref, ref1, results;
    components = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.components == null) {
      this.components = [];
    }
    results = [];
    for (j = 0, len = components.length; j < len; j++) {
      ref = components[j], componentClass = ref[0], componentConfig = ref[1];
      this.components.push([componentClass, componentConfig]);
      if (_.isString(componentClass)) {
        componentClass = this.world.classMap[componentClass];
      } else {
        if ((ref1 = this.world) != null) {
          if ((base = ref1.classMap)[name1 = componentClass.className] == null) {
            base[name1] = componentClass;
          }
        }
      }
      c = new componentClass(componentConfig != null ? componentConfig : {});
      results.push(c.attach(this));
    }
    return results;
  };

  Thang.prototype.addTrackedProperties = function() {
    var j, len, oldPropIndex, oldType, prop, props, ref, results, type;
    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.trackedPropertiesKeys == null) {
      this.trackedPropertiesKeys = [];
    }
    if (this.trackedPropertiesTypes == null) {
      this.trackedPropertiesTypes = [];
    }
    if (this.trackedPropertiesUsed == null) {
      this.trackedPropertiesUsed = [];
    }
    results = [];
    for (j = 0, len = props.length; j < len; j++) {
      ref = props[j], prop = ref[0], type = ref[1];
      if (indexOf.call(ThangState.trackedPropertyTypes, type) < 0) {
        throw new Error("Type " + type + " for property " + prop + " is not a trackable property type: " + ThangState.trackedPropertyTypes);
      }
      oldPropIndex = this.trackedPropertiesKeys.indexOf(prop);
      if (oldPropIndex === -1) {
        this.trackedPropertiesKeys.push(prop);
        this.trackedPropertiesTypes.push(type);
        results.push(this.trackedPropertiesUsed.push(false));
      } else {
        oldType = this.trackedPropertiesTypes[oldPropIndex];
        if (type !== oldType) {
          throw new Error("Two types were specified for trackable property " + prop + ": " + oldType + " and " + type + ".");
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  };

  Thang.prototype.keepTrackedProperty = function(prop) {
    var propIndex;
    propIndex = this.trackedPropertiesKeys.indexOf(prop);
    if (propIndex !== -1) {
      return this.trackedPropertiesUsed[propIndex] = true;
    }
  };

  Thang.prototype.addTrackedFinalProperties = function() {
    var k, props;
    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.trackedFinalProperties == null) {
      this.trackedFinalProperties = [];
    }
    return this.trackedFinalProperties = this.trackedFinalProperties.concat((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = props.length; j < len; j++) {
        k = props[j];
        if (!(indexOf.call(this.trackedFinalProperties, k) >= 0)) {
          results.push(k);
        }
      }
      return results;
    }).call(this));
  };

  Thang.prototype.getState = function() {
    return this._state = new ThangState(this);
  };

  Thang.prototype.setState = function(state) {
    return this._state = state.restore();
  };

  Thang.prototype.toString = function() {
    return this.id;
  };

  Thang.prototype.createMethodChain = function(methodName) {
    var chain;
    if (this.methodChains == null) {
      this.methodChains = {};
    }
    chain = this.methodChains[methodName];
    if (chain) {
      return chain;
    }
    chain = this.methodChains[methodName] = {
      original: this[methodName],
      user: null,
      components: []
    };
    this[methodName] = _.partial(this.callChainedMethod, methodName);
    return chain;
  };

  Thang.prototype.appendMethod = function(methodName, newMethod) {
    return this.createMethodChain(methodName).components.push(newMethod);
  };

  Thang.prototype.callChainedMethod = function() {
    var args, chain, componentMethod, j, len, methodName, primaryMethod, ref, ret, ret2;
    methodName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    chain = this.methodChains[methodName];
    primaryMethod = chain.user || chain.original;
    ret = primaryMethod != null ? primaryMethod.apply(this, args) : void 0;
    ref = chain.components;
    for (j = 0, len = ref.length; j < len; j++) {
      componentMethod = ref[j];
      ret2 = componentMethod.apply(this, args);
      ret = ret2 != null ? ret2 : ret;
    }
    return ret;
  };

  Thang.prototype.getMethodSource = function(methodName) {
    var chain, ref, ref1, ref2, source;
    source = {};
    if ((this.methodChains != null) && methodName in this.methodChains) {
      chain = this.methodChains[methodName];
      source.original = chain.original.toString();
      source.user = (ref = chain.user) != null ? ref.toString() : void 0;
    } else {
      source.original = (ref1 = (ref2 = this[methodName]) != null ? ref2.toString() : void 0) != null ? ref1 : '';
    }
    source.original = Aether.getFunctionBody(source.original);
    return source;
  };

  Thang.prototype.serialize = function() {
    var base, componentClass, componentClassName, componentConfig, i, j, l, len, len1, name1, o, propIndex, ref, ref1, ref2, ref3, ref4, trackedFinalProperty, used;
    o = {
      spriteName: this.spriteName,
      id: this.id,
      components: [],
      finalState: {}
    };
    ref1 = (ref = this.components) != null ? ref : [];
    for (i = j = 0, len = ref1.length; j < len; i = ++j) {
      ref2 = ref1[i], componentClass = ref2[0], componentConfig = ref2[1];
      if (_.isString(componentClass)) {
        componentClassName = componentClass;
      } else {
        componentClassName = componentClass.className;
        if ((base = this.world.classMap)[name1 = componentClass.className] == null) {
          base[name1] = componentClass;
        }
      }
      o.components.push([componentClassName, componentConfig]);
    }
    ref4 = (ref3 = this.trackedFinalProperties) != null ? ref3 : [];
    for (l = 0, len1 = ref4.length; l < len1; l++) {
      trackedFinalProperty = ref4[l];
      o.finalState[trackedFinalProperty] = this[trackedFinalProperty];
    }
    o.unusedTrackedPropertyKeys = (function() {
      var len2, m, ref5, results;
      ref5 = this.trackedPropertiesUsed;
      results = [];
      for (propIndex = m = 0, len2 = ref5.length; m < len2; propIndex = ++m) {
        used = ref5[propIndex];
        if (!used) {
          results.push(this.trackedPropertiesKeys[propIndex]);
        }
      }
      return results;
    }).call(this);
    return o;
  };

  Thang.deserialize = function(o, world, classMap, levelComponents) {
    var componentClass, componentClassName, componentConfig, componentModel, j, len, prop, ref, ref1, ref2, t, val;
    t = new Thang(world, o.spriteName, o.id);
    ref = o.components;
    for (j = 0, len = ref.length; j < len; j++) {
      ref1 = ref[j], componentClassName = ref1[0], componentConfig = ref1[1];
      if (!(componentClass = classMap[componentClassName])) {
        console.debug('Compiling new Component while deserializing:', componentClassName);
        componentModel = _.find(levelComponents, {
          name: componentClassName
        });
        componentClass = world.loadClassFromCode(componentModel.js, componentClassName, 'component');
        world.classMap[componentClassName] = componentClass;
      }
      t.addComponents([componentClass, componentConfig]);
    }
    t.unusedTrackedPropertyKeys = o.unusedTrackedPropertyKeys;
    t.unusedTrackedPropertyValues = (function() {
      var l, len1, ref2, results;
      ref2 = o.unusedTrackedPropertyKeys;
      results = [];
      for (l = 0, len1 = ref2.length; l < len1; l++) {
        prop = ref2[l];
        results.push(t[prop]);
      }
      return results;
    })();
    ref2 = o.finalState;
    for (prop in ref2) {
      val = ref2[prop];
      t[prop] = val;
    }
    return t;
  };

  Thang.prototype.serializeForAether = function() {
    return {
      CN: this.constructor.className,
      id: this.id
    };
  };

  Thang.prototype.getLankOptions = function() {
    var color, colorConfigs, colorType, colorValue, options, ref, ref1, teamColor;
    colorConfigs = this.teamColors || ((ref = this.world) != null ? ref.getTeamColors() : void 0) || {};
    options = {
      colorConfig: {}
    };
    if (this.id === 'Hero Placeholder' && !this.world.getThangByID('Hero Placeholder 1')) {
      return options;
    }
    if (this.team && (teamColor = colorConfigs[this.team])) {
      options.colorConfig.team = teamColor;
    }
    if (this.color && (color = this.grabColorConfig(this.color))) {
      options.colorConfig.color = color;
    }
    if (this.colors) {
      ref1 = this.colors;
      for (colorType in ref1) {
        colorValue = ref1[colorType];
        options.colorConfig[colorType] = colorValue;
      }
    }
    return options;
  };

  Thang.prototype.grabColorConfig = function(color) {
    return {
      green: {
        hue: 0.33,
        saturation: 0.5,
        lightness: 0.5
      },
      black: {
        hue: 0,
        saturation: 0,
        lightness: 0.25
      },
      violet: {
        hue: 0.83,
        saturation: 0.5,
        lightness: 0.5
      }
    }[color];
  };

  return Thang;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/thang.js.map
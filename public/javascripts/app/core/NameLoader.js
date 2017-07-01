require.register("core/NameLoader", function(exports, require, module) {
var CocoClass, NameLoader, namesCache,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

namesCache = {};

NameLoader = (function(superClass) {
  extend(NameLoader, superClass);

  function NameLoader() {
    this.loadedNames = bind(this.loadedNames, this);
    return NameLoader.__super__.constructor.apply(this, arguments);
  }

  NameLoader.prototype.loadNames = function(ids) {
    var id, jqxhrOptions, toLoad;
    toLoad = _.uniq((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = ids.length; i < len; i++) {
        id = ids[i];
        if (!namesCache[id]) {
          results.push(id);
        }
      }
      return results;
    })());
    if (!toLoad.length) {
      return false;
    }
    jqxhrOptions = {
      url: '/db/user/x/names',
      type: 'POST',
      data: {
        ids: toLoad
      },
      success: this.loadedNames
    };
    return jqxhrOptions;
  };

  NameLoader.prototype.loadedNames = function(newNames) {
    return _.extend(namesCache, newNames);
  };

  NameLoader.prototype.getName = function(id) {
    var ref, ref1, ref2, ref3, ref4, ref5;
    if (((ref = namesCache[id]) != null ? ref.firstName : void 0) && ((ref1 = namesCache[id]) != null ? ref1.lastName : void 0)) {
      return ((ref2 = namesCache[id]) != null ? ref2.firstName : void 0) + " " + ((ref3 = namesCache[id]) != null ? ref3.lastName : void 0);
    }
    return ((ref4 = namesCache[id]) != null ? ref4.firstName : void 0) || ((ref5 = namesCache[id]) != null ? ref5.name : void 0) || id;
  };

  return NameLoader;

})(CocoClass);

module.exports = new NameLoader();
});

;
//# sourceMappingURL=/javascripts/app/core/NameLoader.js.map
require.register("core/SystemNameLoader", function(exports, require, module) {
var CocoClass, SystemNameLoader, namesCache,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('./CocoClass');

namesCache = {};

SystemNameLoader = (function(superClass) {
  extend(SystemNameLoader, superClass);

  function SystemNameLoader() {
    return SystemNameLoader.__super__.constructor.apply(this, arguments);
  }

  SystemNameLoader.prototype.getName = function(id) {
    var ref;
    return (ref = namesCache[id]) != null ? ref.name : void 0;
  };

  SystemNameLoader.prototype.setName = function(system) {
    return namesCache[system.get('original')] = {
      name: system.get('name')
    };
  };

  return SystemNameLoader;

})(CocoClass);

module.exports = new SystemNameLoader();
});

;
//# sourceMappingURL=/javascripts/app/core/SystemNameLoader.js.map
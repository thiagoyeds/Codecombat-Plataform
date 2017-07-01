require.register("lib/world/component", function(exports, require, module) {
var Component, componentKeywords,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

componentKeywords = ['attach', 'constructor', 'validateArguments', 'toString', 'isComponent'];

module.exports = Component = (function() {
  Component.className = 'Component';

  Component.prototype.isComponent = true;

  function Component(config) {
    var key, value;
    for (key in config) {
      value = config[key];
      this[key] = value;
    }
  }

  Component.prototype.attach = function(thang) {
    var key, oldValue, results, value;
    results = [];
    for (key in this) {
      value = this[key];
      if (!(indexOf.call(componentKeywords, key) < 0 && key[0] !== '_')) {
        continue;
      }
      oldValue = thang[key];
      if (typeof oldValue === 'function') {
        results.push(thang.appendMethod(key, value));
      } else {
        results.push(thang[key] = value);
      }
    }
    return results;
  };

  Component.prototype.validateArguments = {
    additionalProperties: false
  };

  Component.prototype.toString = function() {
    return "<Component: " + this.constructor.className;
  };

  return Component;

})();
});

;
//# sourceMappingURL=/javascripts/app/lib/world/component.js.map
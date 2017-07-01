require.register("models/LevelSystem", function(exports, require, module) {
var CocoModel, LevelSystem, SystemNameLoader,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoModel = require('./CocoModel');

SystemNameLoader = require('core/SystemNameLoader');

module.exports = LevelSystem = (function(superClass) {
  extend(LevelSystem, superClass);

  function LevelSystem() {
    return LevelSystem.__super__.constructor.apply(this, arguments);
  }

  LevelSystem.className = 'LevelSystem';

  LevelSystem.schema = require('schemas/models/level_system');

  LevelSystem.prototype.urlRoot = '/db/level.system';

  LevelSystem.prototype.editableByArtisans = true;

  LevelSystem.prototype.set = function(key, val, options) {
    var attrs, ref;
    if (_.isObject(key)) {
      ref = [key, val], attrs = ref[0], options = ref[1];
    } else {
      (attrs = {})[key] = val;
    }
    if ('code' in attrs && !('js' in attrs)) {
      attrs.js = this.compile(attrs.code);
    }
    return LevelSystem.__super__.set.call(this, attrs, options);
  };

  LevelSystem.prototype.onLoaded = function() {
    LevelSystem.__super__.onLoaded.call(this);
    if (!this.get('js')) {
      this.set('js', this.compile(this.get('code')));
    }
    return SystemNameLoader.setName(this);
  };

  LevelSystem.prototype.compile = function(code) {
    var e, error, js;
    if (this.get('codeLanguage') && this.get('codeLanguage') !== 'coffeescript') {
      return console.error('Can\'t compile', this.get('codeLanguage'), '-- only CoffeeScript.', this);
    }
    try {
      js = CoffeeScript.compile(code, {
        bare: true
      });
    } catch (error) {
      e = error;
      js = this.get('js');
    }
    return js;
  };

  LevelSystem.prototype.getDependencies = function(allSystems) {
    var dep, i, j, len, len1, ref, ref1, result, results, system;
    results = [];
    ref = this.get('dependencies') || [];
    for (i = 0, len = ref.length; i < len; i++) {
      dep = ref[i];
      system = _.find(allSystems, function(sys) {
        return sys.get('original') === dep.original && sys.get('version').major === dep.majorVersion;
      });
      ref1 = system.getDependencies(allSystems).concat([system]);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        result = ref1[j];
        if (indexOf.call(results, result) < 0) {
          results.push(result);
        }
      }
    }
    return results;
  };

  return LevelSystem;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/LevelSystem.js.map
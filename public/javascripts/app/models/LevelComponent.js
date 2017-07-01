require.register("models/LevelComponent", function(exports, require, module) {
var CocoModel, LevelComponent,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoModel = require('./CocoModel');

module.exports = LevelComponent = (function(superClass) {
  extend(LevelComponent, superClass);

  function LevelComponent() {
    return LevelComponent.__super__.constructor.apply(this, arguments);
  }

  LevelComponent.className = 'LevelComponent';

  LevelComponent.schema = require('schemas/models/level_component');

  LevelComponent.EquipsID = '53e217d253457600003e3ebb';

  LevelComponent.ItemID = '53e12043b82921000051cdf9';

  LevelComponent.AttacksID = '524b7ba57fc0f6d519000016';

  LevelComponent.PhysicalID = '524b75ad7fc0f6d519000001';

  LevelComponent.ExistsID = '524b4150ff92f1f4f8000024';

  LevelComponent.LandID = '524b7aff7fc0f6d519000006';

  LevelComponent.CollidesID = '524b7b857fc0f6d519000012';

  LevelComponent.PlansID = '524b7b517fc0f6d51900000d';

  LevelComponent.ProgrammableID = '524b7b5a7fc0f6d51900000e';

  LevelComponent.MovesID = '524b7b8c7fc0f6d519000013';

  LevelComponent.MissileID = '524cc2593ea855e0ab000142';

  LevelComponent.FindsPathsID = '52872b0ead92b98561000002';

  LevelComponent.AttackableID = '524b7bab7fc0f6d519000017';

  LevelComponent.prototype.urlRoot = '/db/level.component';

  LevelComponent.prototype.editableByArtisans = true;

  LevelComponent.prototype.set = function(key, val, options) {
    var attrs, ref;
    if (_.isObject(key)) {
      ref = [key, val], attrs = ref[0], options = ref[1];
    } else {
      (attrs = {})[key] = val;
    }
    if ('code' in attrs && !('js' in attrs)) {
      attrs.js = this.compile(attrs.code);
    }
    return LevelComponent.__super__.set.call(this, attrs, options);
  };

  LevelComponent.prototype.onLoaded = function() {
    LevelComponent.__super__.onLoaded.call(this);
    if (!this.get('js')) {
      return this.set('js', this.compile(this.get('code')));
    }
  };

  LevelComponent.prototype.compile = function(code) {
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

  LevelComponent.prototype.getDependencies = function(allComponents) {
    var comp, dep, i, j, len, len1, ref, ref1, result, results;
    results = [];
    ref = this.get('dependencies') || [];
    for (i = 0, len = ref.length; i < len; i++) {
      dep = ref[i];
      comp = _.find(allComponents, function(c) {
        return c.get('original') === dep.original && c.get('version').major === dep.majorVersion;
      });
      ref1 = comp.getDependencies(allComponents).concat([comp]);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        result = ref1[j];
        if (indexOf.call(results, result) < 0) {
          results.push(result);
        }
      }
    }
    return results;
  };

  return LevelComponent;

})(CocoModel);
});

;
//# sourceMappingURL=/javascripts/app/models/LevelComponent.js.map
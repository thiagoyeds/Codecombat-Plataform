require.register("lib/sprites/SpriteBuilder", function(exports, require, module) {
var SpriteBuilder, hexToHSL, hslToHex, ref, sum,
  slice = [].slice;

ref = require('core/utils'), hexToHSL = ref.hexToHSL, hslToHex = ref.hslToHex;

module.exports = SpriteBuilder = (function() {
  function SpriteBuilder(thangType, options) {
    var raw;
    this.thangType = thangType;
    this.options = options;
    if (this.options == null) {
      this.options = {};
    }
    raw = this.thangType.get('raw') || {};
    this.shapeStore = raw.shapes;
    this.containerStore = raw.containers;
    this.animationStore = raw.animations;
    this.buildColorMaps();
  }

  SpriteBuilder.prototype.setOptions = function(options) {
    this.options = options;
  };

  SpriteBuilder.prototype.buildMovieClip = function(animationName, mode, startPosition, loops, labels) {
    var anim, animData, args, bounds, func, i, j, len, len1, locals, ref1, stopped, tween, tweenData;
    animData = this.animationStore[animationName];
    if (!animData) {
      console.error('couldn\'t find animData from', this.animationStore, 'for', animationName);
      return null;
    }
    locals = {};
    _.extend(locals, this.buildMovieClipShapes(animData.shapes));
    _.extend(locals, this.buildMovieClipContainers(animData.containers));
    _.extend(locals, this.buildMovieClipAnimations(animData.animations));
    _.extend(locals, this.buildMovieClipGraphics(animData.graphics));
    anim = new createjs.MovieClip();
    if (!labels) {
      labels = {};
      labels[animationName] = 0;
    }
    anim.initialize(mode != null ? mode : createjs.MovieClip.INDEPENDENT, startPosition != null ? startPosition : 0, loops != null ? loops : true, labels);
    ref1 = animData.tweens;
    for (i = 0, len = ref1.length; i < len; i++) {
      tweenData = ref1[i];
      tween = createjs.Tween;
      stopped = false;
      for (j = 0, len1 = tweenData.length; j < len1; j++) {
        func = tweenData[j];
        args = _.cloneDeep(func.a);
        this.dereferenceArgs(args, locals);
        if (tween[func.n]) {
          tween = tween[func.n].apply(tween, args);
        } else {
          stopped = true;
          break;
        }
      }
      if (!stopped) {
        anim.timeline.addTween(tween);
      }
    }
    anim.nominalBounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, animData.bounds, function(){});
    if (animData.frameBounds) {
      anim.frameBounds = (function() {
        var k, len2, ref2, results;
        ref2 = animData.frameBounds;
        results = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          bounds = ref2[k];
          results.push((function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(createjs.Rectangle, bounds, function(){}));
        }
        return results;
      })();
    }
    return anim;
  };

  SpriteBuilder.prototype.dereferenceArgs = function(args, locals) {
    var key, val;
    for (key in args) {
      val = args[key];
      if (locals[val]) {
        args[key] = locals[val];
      } else if (val === null) {
        args[key] = {};
      } else if (_.isString(val) && val.indexOf('createjs.') === 0) {
        args[key] = eval(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        this.dereferenceArgs(val, locals);
      }
    }
    return args;
  };

  SpriteBuilder.prototype.buildMovieClipShapes = function(localShapes) {
    var i, len, localShape, map, shape;
    map = {};
    for (i = 0, len = localShapes.length; i < len; i++) {
      localShape = localShapes[i];
      if (localShape.im) {
        shape = new createjs.Shape();
        shape._off = true;
      } else {
        shape = this.buildShapeFromStore(localShape.gn);
        if (localShape.m) {
          shape.mask = map[localShape.m];
        }
      }
      map[localShape.bn] = shape;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipContainers = function(localContainers) {
    var container, i, len, localContainer, map;
    map = {};
    for (i = 0, len = localContainers.length; i < len; i++) {
      localContainer = localContainers[i];
      container = this.buildContainerFromStore(localContainer.gn);
      container.setTransform.apply(container, localContainer.t);
      if (localContainer.o != null) {
        container._off = localContainer.o;
      }
      if (localContainer.al != null) {
        container.alpha = localContainer.al;
      }
      map[localContainer.bn] = container;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipAnimations = function(localAnimations) {
    var animation, i, len, localAnimation, map;
    map = {};
    for (i = 0, len = localAnimations.length; i < len; i++) {
      localAnimation = localAnimations[i];
      animation = this.buildMovieClip.apply(this, [localAnimation.gn].concat(slice.call(localAnimation.a)));
      animation.setTransform.apply(animation, localAnimation.t);
      map[localAnimation.bn] = animation;
    }
    return map;
  };

  SpriteBuilder.prototype.buildMovieClipGraphics = function(localGraphics) {
    var graphic, i, len, localGraphic, map;
    map = {};
    for (i = 0, len = localGraphics.length; i < len; i++) {
      localGraphic = localGraphics[i];
      graphic = new createjs.Graphics().p(localGraphic.p);
      map[localGraphic.bn] = graphic;
    }
    return map;
  };

  SpriteBuilder.prototype.buildShapeFromStore = function(shapeKey, debug) {
    var ref1, ref2, ref3, ref4, ref5, shape, shapeData;
    if (debug == null) {
      debug = false;
    }
    shapeData = this.shapeStore[shapeKey];
    shape = new createjs.Shape();
    if (shapeData.lf != null) {
      (ref1 = shape.graphics).lf.apply(ref1, shapeData.lf);
    } else if (shapeData.fc != null) {
      shape.graphics.f(this.colorMap[shapeKey] || shapeData.fc);
    } else if (shapeData.rf != null) {
      (ref2 = shape.graphics).rf.apply(ref2, shapeData.rf);
    }
    if (shapeData.ls != null) {
      (ref3 = shape.graphics).ls.apply(ref3, shapeData.ls);
    } else if (shapeData.sc != null) {
      shape.graphics.s(shapeData.sc);
    }
    if (shapeData.ss != null) {
      (ref4 = shape.graphics).ss.apply(ref4, shapeData.ss);
    }
    if (shapeData.de != null) {
      (ref5 = shape.graphics).de.apply(ref5, shapeData.de);
    }
    if (shapeData.p != null) {
      shape.graphics.p(shapeData.p);
    }
    shape.setTransform.apply(shape, shapeData.t);
    return shape;
  };

  SpriteBuilder.prototype.buildContainerFromStore = function(containerKey) {
    var child, childData, cont, contData, i, len, ref1;
    if (!containerKey) {
      console.error('Yo we don\'t have no containerKey');
    }
    contData = this.containerStore[containerKey];
    cont = new createjs.Container();
    cont.initialize();
    ref1 = contData.c;
    for (i = 0, len = ref1.length; i < len; i++) {
      childData = ref1[i];
      if (_.isString(childData)) {
        child = this.buildShapeFromStore(childData);
      } else {
        if (!childData.gn) {
          continue;
        }
        child = this.buildContainerFromStore(childData.gn);
        child.setTransform.apply(child, childData.t);
      }
      cont.addChild(child);
    }
    cont.bounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, contData.b, function(){});
    return cont;
  };

  SpriteBuilder.prototype.buildColorMaps = function() {
    var colorConfig, colorGroups, config, group, results;
    this.colorMap = {};
    colorGroups = this.thangType.get('colorGroups');
    if (_.isEmpty(colorGroups)) {
      return;
    }
    if (!_.size(this.shapeStore)) {
      return;
    }
    colorConfig = this.options.colorConfig;
    if (!colorConfig) {
      return;
    }
    results = [];
    for (group in colorConfig) {
      config = colorConfig[group];
      if (!colorGroups[group]) {
        continue;
      }
      results.push(this.buildColorMapForGroup(colorGroups[group], config));
    }
    return results;
  };

  SpriteBuilder.prototype.buildColorMapForGroup = function(shapes, config) {
    var colors;
    if (!shapes.length) {
      return;
    }
    colors = this.initColorMap(shapes);
    this.adjustHuesForColorMap(colors, config.hue);
    this.adjustValueForColorMap(colors, 1, config.saturation);
    this.adjustValueForColorMap(colors, 2, config.lightness);
    return this.applyColorMap(shapes, colors);
  };

  SpriteBuilder.prototype.initColorMap = function(shapes) {
    var colors, hsl, i, len, shape, shapeKey;
    colors = {};
    for (i = 0, len = shapes.length; i < len; i++) {
      shapeKey = shapes[i];
      shape = this.shapeStore[shapeKey];
      if ((shape.fc == null) || colors[shape.fc]) {
        continue;
      }
      hsl = hexToHSL(shape.fc);
      colors[shape.fc] = hsl;
    }
    return colors;
  };

  SpriteBuilder.prototype.adjustHuesForColorMap = function(colors, targetHue) {
    var averageHue, diff, h, hex, hsl, hues, results;
    hues = (function() {
      var results;
      results = [];
      for (hex in colors) {
        hsl = colors[hex];
        results.push(hsl[0]);
      }
      return results;
    })();
    if (Math.max(hues) - Math.min(hues) > 0.5) {
      hues = ((function() {
        var i, len, results;
        if (h < 0.5) {
          return h + 1.0;
        } else {
          results = [];
          for (i = 0, len = hues.length; i < len; i++) {
            h = hues[i];
            results.push(h);
          }
          return results;
        }
      })());
    }
    averageHue = sum(hues) / hues.length;
    averageHue %= 1;
    if (targetHue == null) {
      targetHue = 0;
    }
    diff = targetHue - averageHue;
    results = [];
    for (hex in colors) {
      hsl = colors[hex];
      results.push(hsl[0] = (hsl[0] + diff + 1) % 1);
    }
    return results;
  };

  SpriteBuilder.prototype.adjustValueForColorMap = function(colors, index, targetValue) {
    var averageValue, diff, hex, hsl, results, values;
    values = (function() {
      var results;
      results = [];
      for (hex in colors) {
        hsl = colors[hex];
        results.push(hsl[index]);
      }
      return results;
    })();
    averageValue = sum(values) / values.length;
    if (targetValue == null) {
      targetValue = 0.5;
    }
    diff = targetValue - averageValue;
    results = [];
    for (hex in colors) {
      hsl = colors[hex];
      results.push(hsl[index] = Math.max(0, Math.min(1, hsl[index] + diff)));
    }
    return results;
  };

  SpriteBuilder.prototype.applyColorMap = function(shapes, colors) {
    var i, len, results, shape, shapeKey;
    results = [];
    for (i = 0, len = shapes.length; i < len; i++) {
      shapeKey = shapes[i];
      shape = this.shapeStore[shapeKey];
      if ((shape.fc == null) || !colors[shape.fc]) {
        continue;
      }
      results.push(this.colorMap[shapeKey] = hslToHex(colors[shape.fc]));
    }
    return results;
  };

  return SpriteBuilder;

})();

sum = function(nums) {
  return _.reduce(nums, function(s, num) {
    return s + num;
  });
};
});

;
//# sourceMappingURL=/javascripts/app/lib/sprites/SpriteBuilder.js.map
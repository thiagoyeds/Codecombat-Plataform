require.register("views/editor/thang/ThangTypeColorsTabView", function(exports, require, module) {
var CocoView, ColorGroupNode, SpriteBuilder, ThangTypeColorsTabView, hexToHSL, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/editor/thang/colors_tab');

SpriteBuilder = require('lib/sprites/SpriteBuilder');

hexToHSL = require('core/utils').hexToHSL;

require('vendor/treema');

module.exports = ThangTypeColorsTabView = (function(superClass) {
  extend(ThangTypeColorsTabView, superClass);

  ThangTypeColorsTabView.prototype.id = 'editor-thang-colors-tab-view';

  ThangTypeColorsTabView.prototype.template = template;

  ThangTypeColorsTabView.prototype.className = 'tab-pane';

  ThangTypeColorsTabView.prototype.offset = 0;

  function ThangTypeColorsTabView(thangType, options) {
    var f;
    this.thangType = thangType;
    this.onColorGroupSelected = bind(this.onColorGroupSelected, this);
    this.onColorGroupsChanged = bind(this.onColorGroupsChanged, this);
    ThangTypeColorsTabView.__super__.constructor.call(this, options);
    this.supermodel.loadModel(this.thangType);
    this.colorConfig = {
      hue: 0,
      saturation: 0.5,
      lightness: 0.5
    };
    if (this.thangType.get('raw')) {
      this.spriteBuilder = new SpriteBuilder(this.thangType);
    }
    f = (function(_this) {
      return function() {
        _this.offset++;
        return _this.updateMovieClip();
      };
    })(this);
    this.interval = setInterval(f, 1000);
  }

  ThangTypeColorsTabView.prototype.destroy = function() {
    var ref;
    if ((ref = this.colorGroups) != null) {
      ref.destroy();
    }
    clearInterval(this.interval);
    return ThangTypeColorsTabView.__super__.destroy.call(this);
  };

  ThangTypeColorsTabView.prototype.afterRender = function() {
    ThangTypeColorsTabView.__super__.afterRender.call(this);
    if (!this.supermodel.finished()) {
      return;
    }
    this.createShapeButtons();
    this.initStage();
    this.initSliders();
    return this.tryToBuild();
  };

  ThangTypeColorsTabView.prototype.initSliders = function() {
    this.hueSlider = this.initSlider($('#hue-slider', this.$el), 0, this.makeSliderCallback('hue'));
    this.saturationSlider = this.initSlider($('#saturation-slider', this.$el), 50, this.makeSliderCallback('saturation'));
    return this.lightnessSlider = this.initSlider($('#lightness-slider', this.$el), 50, this.makeSliderCallback('lightness'));
  };

  ThangTypeColorsTabView.prototype.makeSliderCallback = function(property) {
    return (function(_this) {
      return function(e, result) {
        _this.colorConfig[property] = result.value / 100;
        return _this.updateMovieClip();
      };
    })(this);
  };

  ThangTypeColorsTabView.prototype.initStage = function() {
    var canvas;
    canvas = this.$el.find('#tinting-display');
    this.stage = new createjs.Stage(canvas[0]);
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener('tick', this.stage);
    return this.updateMovieClip();
  };

  ThangTypeColorsTabView.prototype.updateMovieClip = function() {
    var a, actionDict, animation, animations, bounds, index, key, larger, options, ref, ref1;
    if (!(this.currentColorGroupTreema && this.thangType.get('raw'))) {
      return;
    }
    actionDict = this.thangType.getActions();
    animations = (function() {
      var results;
      results = [];
      for (key in actionDict) {
        a = actionDict[key];
        if (a.animation) {
          results.push(a.animation);
        }
      }
      return results;
    })();
    index = this.offset % animations.length;
    animation = animations[index];
    if (!animation) {
      return this.updateContainer();
    }
    if (this.movieClip) {
      this.stage.removeChild(this.movieClip);
    }
    options = {
      colorConfig: {}
    };
    options.colorConfig[this.currentColorGroupTreema.keyForParent] = this.colorConfig;
    this.spriteBuilder.setOptions(options);
    this.spriteBuilder.buildColorMaps();
    this.movieClip = this.spriteBuilder.buildMovieClip(animation);
    bounds = (ref = (ref1 = this.movieClip.frameBounds) != null ? ref1[0] : void 0) != null ? ref : this.movieClip.nominalBounds;
    larger = Math.min(400 / bounds.width, 400 / bounds.height);
    this.movieClip.scaleX = larger;
    this.movieClip.scaleY = larger;
    this.movieClip.regX = bounds.x;
    this.movieClip.regY = bounds.y;
    return this.stage.addChild(this.movieClip);
  };

  ThangTypeColorsTabView.prototype.updateContainer = function() {
    var actionDict, idle, larger, options;
    if (!this.thangType.get('raw')) {
      return;
    }
    actionDict = this.thangType.getActions();
    idle = actionDict.idle;
    if (this.container) {
      this.stage.removeChild(this.container);
    }
    if (!(idle != null ? idle.container : void 0)) {
      return;
    }
    options = {
      colorConfig: {}
    };
    options.colorConfig[this.currentColorGroupTreema.keyForParent] = this.colorConfig;
    this.spriteBuilder.setOptions(options);
    this.spriteBuilder.buildColorMaps();
    this.container = this.spriteBuilder.buildContainerFromStore(idle.container);
    larger = Math.min(400 / this.container.bounds.width, 400 / this.container.bounds.height);
    this.container.scaleX = larger;
    this.container.scaleY = larger;
    this.container.regX = this.container.bounds.x;
    this.container.regY = this.container.bounds.y;
    return this.stage.addChild(this.container);
  };

  ThangTypeColorsTabView.prototype.createShapeButtons = function() {
    var button, buttons, color, colors, j, key, len, s, shape, shapes;
    buttons = $('<div></div>').prop('id', 'shape-buttons');
    shapes = (function() {
      var ref, ref1, results;
      ref1 = ((ref = this.thangType.get('raw')) != null ? ref.shapes : void 0) || {};
      results = [];
      for (key in ref1) {
        shape = ref1[key];
        results.push(shape);
      }
      return results;
    }).call(this);
    colors = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = shapes.length; j < len; j++) {
        s = shapes[j];
        if (s.fc != null) {
          results.push(s.fc);
        }
      }
      return results;
    })();
    colors = _.uniq(colors);
    colors.sort(function(a, b) {
      var aHSL, bHSL;
      aHSL = hexToHSL(a);
      bHSL = hexToHSL(b);
      if (aHSL[0] > bHSL[0]) {
        return -1;
      } else {
        return 1;
      }
    });
    for (j = 0, len = colors.length; j < len; j++) {
      color = colors[j];
      button = $('<button></button>').addClass('btn');
      button.css('background', color);
      button.val(color);
      buttons.append(button);
    }
    buttons.click((function(_this) {
      return function(e) {
        $(e.target).toggleClass('selected');
        return _this.updateColorGroup();
      };
    })(this));
    this.$el.find('#shape-buttons').replaceWith(buttons);
    return this.buttons = buttons;
  };

  ThangTypeColorsTabView.prototype.tryToBuild = function() {
    var data, keys, ref, ref1, schema, treemaOptions;
    if (!this.thangType.loaded) {
      return;
    }
    data = this.thangType.get('colorGroups');
    if (data == null) {
      data = {};
    }
    schema = (ref = this.thangType.schema().properties) != null ? ref.colorGroups : void 0;
    treemaOptions = {
      data: data,
      schema: schema,
      readOnly: !(me.isAdmin() || this.thangType.hasWriteAccess(me)) ? true : void 0,
      callbacks: {
        change: this.onColorGroupsChanged,
        select: this.onColorGroupSelected
      },
      nodeClasses: {
        'thang-color-group': ColorGroupNode
      }
    };
    this.colorGroups = this.$el.find('#color-groups-treema').treema(treemaOptions);
    this.colorGroups.build();
    this.colorGroups.open();
    keys = Object.keys(this.colorGroups.childrenTreemas);
    if (keys[0]) {
      return (ref1 = this.colorGroups.childrenTreemas[keys[0]]) != null ? ref1.$el.click() : void 0;
    }
  };

  ThangTypeColorsTabView.prototype.onColorGroupsChanged = function() {
    this.thangType.set('colorGroups', this.colorGroups.data);
    return Backbone.Mediator.publish('editor:thang-type-color-groups-changed', {
      colorGroups: this.colorGroups.data
    });
  };

  ThangTypeColorsTabView.prototype.onColorGroupSelected = function(e, selected) {
    var colors, j, key, len, ref, ref1, ref2, shape, shapes, treema;
    this.$el.find('#color-group-settings').toggle(selected.length > 0);
    treema = this.colorGroups.getLastSelectedTreema();
    if (!treema) {
      return;
    }
    this.currentColorGroupTreema = treema;
    shapes = {};
    ref = treema.data;
    for (j = 0, len = ref.length; j < len; j++) {
      shape = ref[j];
      shapes[shape] = true;
    }
    colors = {};
    ref2 = ((ref1 = this.thangType.get('raw')) != null ? ref1.shapes : void 0) || {};
    for (key in ref2) {
      shape = ref2[key];
      if (shape.fc == null) {
        continue;
      }
      if (shapes[key]) {
        colors[shape.fc] = true;
      }
    }
    this.buttons.find('button').removeClass('selected');
    this.buttons.find('button').each(function(i, button) {
      if (colors[$(button).val()]) {
        return $(button).addClass('selected');
      }
    });
    return this.updateMovieClip();
  };

  ThangTypeColorsTabView.prototype.updateColorGroup = function() {
    var colors, key, ref, ref1, shape, shapes;
    colors = {};
    this.buttons.find('button').each(function(i, button) {
      if (!$(button).hasClass('selected')) {
        return;
      }
      return colors[$(button).val()] = true;
    });
    shapes = [];
    ref1 = ((ref = this.thangType.get('raw')) != null ? ref.shapes : void 0) || {};
    for (key in ref1) {
      shape = ref1[key];
      if (shape.fc == null) {
        continue;
      }
      if (colors[shape.fc]) {
        shapes.push(key);
      }
    }
    this.currentColorGroupTreema.set('/', shapes);
    return this.updateMovieClip();
  };

  return ThangTypeColorsTabView;

})(CocoView);

ColorGroupNode = (function(superClass) {
  extend(ColorGroupNode, superClass);

  function ColorGroupNode() {
    return ColorGroupNode.__super__.constructor.apply(this, arguments);
  }

  ColorGroupNode.prototype.collection = false;

  ColorGroupNode.prototype.canAddChild = function() {
    return false;
  };

  return ColorGroupNode;

})(TreemaNode.nodeMap.array);
});

;
//# sourceMappingURL=/javascripts/app/views/editor/thang/ThangTypeColorsTabView.js.map
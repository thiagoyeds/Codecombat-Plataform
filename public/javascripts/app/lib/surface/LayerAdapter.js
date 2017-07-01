require.register("lib/surface/LayerAdapter", function(exports, require, module) {

/*
  * SpriteStage (WebGL Canvas)
  ** Land texture
  ** Ground-based selection/target marks, range radii
  ** Walls/obstacles
  ** Paths and target pieces (and ghosts?)
  ** Normal Thangs, bots, wizards (z-indexing based on World-determined sprite.thang.pos.z/y, mainly, instead of sprite-map-determined sprite.z, which we rename to... something)
  ** Above-thang marks (blood, highlight) and health bars

  * Stage (Regular Canvas)
  ** Camera border
  ** surfaceTextLayer (speech, names)
  ** screenLayer
  *** Letterbox
  **** Letterbox top and bottom
  *** FPS display, maybe grid axis labels, coordinate hover

  ** Grid lines--somewhere--we will figure it out, do not really need it at first
 */
var CocoClass, LayerAdapter, NEVER_RENDER_ANYTHING, SegmentedSprite, SingularSprite, SpriteBuilder, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('lib/sprites/SpriteBuilder');

CocoClass = require('core/CocoClass');

SegmentedSprite = require('./SegmentedSprite');

SingularSprite = require('./SingularSprite');

ThangType = require('models/ThangType');

NEVER_RENDER_ANYTHING = false;

module.exports = LayerAdapter = LayerAdapter = (function(superClass) {
  extend(LayerAdapter, superClass);

  LayerAdapter.TRANSFORM_SURFACE = 'surface';

  LayerAdapter.TRANSFORM_SURFACE_TEXT = 'surface_text';

  LayerAdapter.TRANSFORM_SCREEN = 'screen';

  LayerAdapter.prototype.actionRenderState = null;

  LayerAdapter.prototype.needToRerender = false;

  LayerAdapter.prototype.toRenderBundles = null;

  LayerAdapter.prototype.willRender = false;

  LayerAdapter.prototype.buildAutomatically = true;

  LayerAdapter.prototype.buildAsync = true;

  LayerAdapter.prototype.resolutionFactor = SPRITE_RESOLUTION_FACTOR;

  LayerAdapter.prototype.numThingsLoading = 0;

  LayerAdapter.prototype.lanks = null;

  LayerAdapter.prototype.spriteSheet = null;

  LayerAdapter.prototype.container = null;

  LayerAdapter.prototype.customGraphics = null;

  LayerAdapter.prototype.subscriptions = {
    'camera:zoom-updated': 'onZoomUpdated'
  };

  function LayerAdapter(options) {
    var ref, ref1, ref2;
    LayerAdapter.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.name = (ref = options.name) != null ? ref : 'Unnamed';
    this.defaultSpriteType = this.name === 'Default' ? 'segmented' : 'singular';
    this.customGraphics = {};
    this.layerPriority = (ref1 = options.layerPriority) != null ? ref1 : 0;
    this.transformStyle = (ref2 = options.transform) != null ? ref2 : LayerAdapter.TRANSFORM_SURFACE;
    this.camera = options.camera;
    this.updateLayerOrder = _.throttle(this.updateLayerOrder, 1000 / 30);
    this.webGL = !!options.webGL;
    if (this.webGL) {
      this.initializing = true;
      this.spriteSheet = this._renderNewSpriteSheet(false);
      this.container = new createjs.SpriteContainer(this.spriteSheet);
      this.actionRenderState = {};
      this.toRenderBundles = [];
      this.lanks = [];
      this.initializing = false;
    } else {
      this.container = new createjs.Container();
    }
  }

  LayerAdapter.prototype.toString = function() {
    return "<Layer " + this.layerPriority + ": " + this.name + ">";
  };

  LayerAdapter.prototype.updateLayerOrder = function() {
    if (this.destroyed) {
      return;
    }
    return this.container.sortChildren(this.layerOrderComparator);
  };

  LayerAdapter.prototype.layerOrderComparator = function(a, b) {
    var aLank, aPos, aThang, alp, az, bLank, bPos, bThang, blp, bz;
    alp = a.layerPriority || 0;
    blp = b.layerPriority || 0;
    if (alp !== blp) {
      return alp - blp;
    }
    az = a.z || 1000;
    bz = b.z || 1000;
    if (aLank = a.lank) {
      if (aThang = aLank.thang) {
        aPos = aThang.pos;
        if (aThang.health < 0 && aThang.pos.z <= aThang.depth / 2) {
          --az;
        }
      }
    }
    if (bLank = b.lank) {
      if (bThang = bLank.thang) {
        bPos = bThang.pos;
        if (bThang.health < 0 && bThang.pos.z <= bThang.depth / 2) {
          --bz;
        }
      }
    }
    if (az === bz) {
      if (!(aPos && bPos)) {
        return 0;
      }
      return (bPos.y - aPos.y) || (bPos.x - aPos.x);
    }
    return az - bz;
  };

  LayerAdapter.prototype.onZoomUpdated = function(e) {
    var change, child, j, len, ref, ref1, results;
    if (e.camera !== this.camera) {
      return;
    }
    if ((ref = this.transformStyle) === LayerAdapter.TRANSFORM_SURFACE || ref === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      change = this.container.scaleX / e.zoom;
      this.container.scaleX = this.container.scaleY = e.zoom;
      if (this.webGL) {
        this.container.scaleX *= this.camera.canvasScaleFactorX;
        this.container.scaleY *= this.camera.canvasScaleFactorY;
      }
      this.container.regX = e.surfaceViewport.x;
      this.container.regY = e.surfaceViewport.y;
      if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
        ref1 = this.container.children;
        results = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          child = ref1[j];
          if (child.skipScaling) {
            continue;
          }
          child.scaleX *= change;
          results.push(child.scaleY *= change);
        }
        return results;
      }
    }
  };

  LayerAdapter.prototype.addChild = function() {
    var child, children, j, len, ref, results;
    children = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    (ref = this.container).addChild.apply(ref, children);
    if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        if (child.skipScaling) {
          continue;
        }
        child.scaleX /= this.container.scaleX;
        results.push(child.scaleY /= this.container.scaleY);
      }
      return results;
    }
  };

  LayerAdapter.prototype.removeChild = function() {
    var child, children, j, len, ref, results;
    children = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    (ref = this.container).removeChild.apply(ref, children);
    if (this.transformStyle === LayerAdapter.TRANSFORM_SURFACE_TEXT) {
      results = [];
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.scaleX *= this.container.scaleX;
        results.push(child.scaleY *= this.container.scaleY);
      }
      return results;
    }
  };

  LayerAdapter.prototype.addLank = function(lank) {
    var prerenderedSpriteSheet;
    lank.options.resolutionFactor = this.resolutionFactor;
    lank.layer = this;
    this.listenTo(lank, 'action-needs-render', this.onActionNeedsRender);
    this.lanks.push(lank);
    if (!currentView.getQueryVariable('jitSpritesheets')) {
      lank.thangType.initPrerenderedSpriteSheets();
    }
    prerenderedSpriteSheet = lank.thangType.getPrerenderedSpriteSheet(lank.options.colorConfig, this.defaultSpriteType);
    if (prerenderedSpriteSheet != null) {
      prerenderedSpriteSheet.markToLoad();
    }
    this.loadThangType(lank.thangType);
    this.addDefaultActionsToRender(lank);
    this.setSpriteToLank(lank);
    this.updateLayerOrder();
    return lank.addHealthBar();
  };

  LayerAdapter.prototype.removeLank = function(lank) {
    this.stopListening(lank);
    lank.layer = null;
    this.container.removeChild(lank.sprite);
    return this.lanks = _.without(this.lanks, lank);
  };

  LayerAdapter.prototype.loadThangType = function(thangType) {
    var prerenderedSpriteSheet, startedLoading;
    if (!thangType.isFullyLoaded()) {
      thangType.setProjection(null);
      if (!thangType.loading) {
        thangType.fetch();
      }
      this.numThingsLoading++;
      return this.listenToOnce(thangType, 'sync', this.somethingLoaded);
    } else if (thangType.get('raster') && !thangType.loadedRaster) {
      thangType.loadRasterImage();
      this.listenToOnce(thangType, 'raster-image-loaded', this.somethingLoaded);
      return this.numThingsLoading++;
    } else if (prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheetToLoad()) {
      startedLoading = prerenderedSpriteSheet.loadImage();
      if (!startedLoading) {
        return;
      }
      this.listenToOnce(prerenderedSpriteSheet, 'image-loaded', function() {
        return this.somethingLoaded(thangType);
      });
      return this.numThingsLoading++;
    }
  };

  LayerAdapter.prototype.somethingLoaded = function(thangType) {
    var j, lank, len, ref;
    this.numThingsLoading--;
    this.loadThangType(thangType);
    ref = this.lanks;
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      if (lank.thangType === thangType) {
        this.addDefaultActionsToRender(lank);
      }
    }
    return this.renderNewSpriteSheet();
  };

  LayerAdapter.prototype.onActionNeedsRender = function(lank, action) {
    return this.upsertActionToRender(lank.thangType, action.name, lank.options.colorConfig);
  };

  LayerAdapter.prototype.addDefaultActionsToRender = function(lank) {
    var action, j, len, needToRender, ref, results;
    needToRender = false;
    if (lank.thangType.get('raster')) {
      return this.upsertActionToRender(lank.thangType);
    } else {
      ref = _.values(lank.thangType.getActions());
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        action = ref[j];
        if (!_.any(ThangType.defaultActions, function(prefix) {
          return _.string.startsWith(action.name, prefix);
        })) {
          continue;
        }
        results.push(this.upsertActionToRender(lank.thangType, action.name, lank.options.colorConfig));
      }
      return results;
    }
  };

  LayerAdapter.prototype.upsertActionToRender = function(thangType, actionName, colorConfig) {
    var groupKey;
    groupKey = this.renderGroupingKey(thangType, actionName, colorConfig);
    if (this.actionRenderState[groupKey] !== void 0) {
      return false;
    }
    this.actionRenderState[groupKey] = 'need-to-render';
    this.toRenderBundles.push({
      thangType: thangType,
      actionName: actionName,
      colorConfig: colorConfig
    });
    if (this.willRender || !this.buildAutomatically) {
      return true;
    }
    this.willRender = _.defer((function(_this) {
      return function() {
        return _this.renderNewSpriteSheet();
      };
    })(this));
    return true;
  };

  LayerAdapter.prototype.addCustomGraphic = function(key, graphic, bounds) {
    if (this.customGraphics[key]) {
      return false;
    }
    this.customGraphics[key] = {
      graphic: graphic,
      bounds: (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(createjs.Rectangle, bounds, function(){})
    };
    if (this.willRender || !this.buildAutomatically) {
      return true;
    }
    return this._renderNewSpriteSheet(false);
  };

  LayerAdapter.prototype.renderNewSpriteSheet = function() {
    this.willRender = false;
    if (this.numThingsLoading) {
      return;
    }
    return this._renderNewSpriteSheet();
  };

  LayerAdapter.prototype._renderNewSpriteSheet = function(async) {
    var actionNames, args, builder, bundle, bundleGrouping, colorConfig, dimension, e, error, extantGraphics, frame, graphic, groups, j, key, len, placeholder, ref, ref1, ref2, sheet, thangType;
    if (this.asyncBuilder) {
      this.asyncBuilder.stopAsync();
    }
    this.asyncBuilder = null;
    if (async == null) {
      async = this.buildAsync;
    }
    builder = new createjs.SpriteSheetBuilder();
    groups = _.groupBy(this.toRenderBundles, (function(bundle) {
      return this.renderGroupingKey(bundle.thangType, '', bundle.colorConfig);
    }), this);
    placeholder = this.createPlaceholder();
    dimension = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
    placeholder.setBounds(0, 0, dimension, dimension);
    builder.addFrame(placeholder);
    extantGraphics = ((ref = this.spriteSheet) != null ? ref.resolutionFactor : void 0) === this.resolutionFactor ? this.spriteSheet.getAnimations() : [];
    ref1 = this.customGraphics;
    for (key in ref1) {
      graphic = ref1[key];
      if (indexOf.call(extantGraphics, key) >= 0) {
        graphic = new createjs.Sprite(this.spriteSheet);
        graphic.gotoAndStop(key);
        frame = builder.addFrame(graphic);
      } else {
        frame = builder.addFrame(graphic.graphic, graphic.bounds, this.resolutionFactor);
      }
      builder.addAnimation(key, [frame], false);
    }
    if (NEVER_RENDER_ANYTHING) {
      groups = {};
    }
    ref2 = _.values(groups);
    for (j = 0, len = ref2.length; j < len; j++) {
      bundleGrouping = ref2[j];
      thangType = bundleGrouping[0].thangType;
      colorConfig = bundleGrouping[0].colorConfig;
      actionNames = (function() {
        var k, len1, results;
        results = [];
        for (k = 0, len1 = bundleGrouping.length; k < len1; k++) {
          bundle = bundleGrouping[k];
          results.push(bundle.actionName);
        }
        return results;
      })();
      args = [thangType, colorConfig, actionNames, builder];
      if (thangType.get('raw') || thangType.get('prerenderedSpriteSheetData')) {
        if ((thangType.get('spriteType') || this.defaultSpriteType) === 'segmented') {
          this.renderSegmentedThangType.apply(this, args);
        } else {
          this.renderSingularThangType.apply(this, args);
        }
      } else {
        this.renderRasterThangType(thangType, builder);
      }
    }
    if (async) {
      try {
        builder.buildAsync();
      } catch (error) {
        e = error;
        this.resolutionFactor *= 0.9;
        return this._renderNewSpriteSheet(async);
      }
      builder.on('complete', this.onBuildSpriteSheetComplete, this, true, builder);
      return this.asyncBuilder = builder;
    } else {
      sheet = builder.build();
      this.onBuildSpriteSheetComplete({
        async: async
      }, builder);
      return sheet;
    }
  };

  LayerAdapter.prototype.onBuildSpriteSheetComplete = function(e, builder) {
    var image, index, j, k, l, lank, len, len1, len2, len3, m, oldLayer, parent, prop, ref, ref1, ref2, ref3, ref4, total;
    if (this.initializing || this.destroyed) {
      return;
    }
    this.asyncBuilder = null;
    if (builder.spriteSheet._images.length > 1) {
      total = 0;
      ref = builder.spriteSheet._images;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        image = ref[index];
        total += image.height / builder.maxHeight;
      }
      this.resolutionFactor /= Math.max(1.25, Math.sqrt(total));
      this._renderNewSpriteSheet(e.async);
      return;
    }
    this.spriteSheet = builder.spriteSheet;
    this.spriteSheet.resolutionFactor = this.resolutionFactor;
    oldLayer = this.container;
    this.container = new createjs.SpriteContainer(this.spriteSheet);
    ref1 = this.lanks;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      lank = ref1[k];
      if (lank.destroyed) {
        console.log('zombie sprite found on layer', this.name);
      }
      if (lank.destroyed) {
        continue;
      }
      this.setSpriteToLank(lank);
    }
    ref2 = ['scaleX', 'scaleY', 'regX', 'regY'];
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      prop = ref2[l];
      this.container[prop] = oldLayer[prop];
    }
    if (parent = oldLayer.parent) {
      index = parent.getChildIndex(oldLayer);
      parent.removeChildAt(index);
      parent.addChildAt(this.container, index);
    }
    if ((ref3 = this.camera) != null) {
      ref3.updateZoom(true);
    }
    this.updateLayerOrder();
    ref4 = this.lanks;
    for (m = 0, len3 = ref4.length; m < len3; m++) {
      lank = ref4[m];
      lank.options.resolutionFactor = this.resolutionFactor;
      lank.updateScale();
      lank.updateRotation();
    }
    return this.trigger('new-spritesheet');
  };

  LayerAdapter.prototype.resetSpriteSheet = function() {
    var j, lank, len, ref;
    ref = this.lanks.slice(0);
    for (j = 0, len = ref.length; j < len; j++) {
      lank = ref[j];
      this.removeLank(lank);
    }
    this.toRenderBundles = [];
    this.actionRenderState = {};
    this.initializing = true;
    this.spriteSheet = this._renderNewSpriteSheet(false);
    return this.initializing = false;
  };

  LayerAdapter.prototype.createPlaceholder = function() {
    var bounds, color, g, ref, ref1, ref2, width;
    g = new createjs.Graphics();
    g.setStrokeStyle(5);
    color = {
      'Land': [0, 50, 0],
      'Ground': [230, 230, 230],
      'Obstacle': [20, 70, 20],
      'Path': [200, 100, 200],
      'Default': [64, 64, 64],
      'Floating': [100, 100, 200]
    }[this.name] || [0, 0, 0];
    g.beginStroke((ref = createjs.Graphics).getRGB.apply(ref, color));
    color.push(0.7);
    g.beginFill((ref1 = createjs.Graphics).getRGB.apply(ref1, color));
    width = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
    bounds = [0, 0, width, width];
    if ((ref2 = this.name) === 'Default' || ref2 === 'Ground' || ref2 === 'Floating' || ref2 === 'Path') {
      g.drawEllipse.apply(g, bounds);
    } else {
      g.drawRect.apply(g, bounds);
    }
    return new createjs.Shape(g);
  };

  LayerAdapter.prototype.renderSegmentedThangType = function(thangType, colorConfig, actionNames, spriteSheetBuilder) {
    var animations, container, containerGlobalName, containerKey, containersToRender, frame, j, len, prerenderedSpriteSheet, ref, renderedActions, results, scale, spriteBuilder;
    prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheet(colorConfig, 'segmented');
    if (prerenderedSpriteSheet && !prerenderedSpriteSheet.loadedImage) {
      return;
    } else if (prerenderedSpriteSheet) {
      animations = prerenderedSpriteSheet.spriteSheet._animations;
      renderedActions = _.zipObject(animations, _.times(animations.length, function() {
        return true;
      }));
    }
    containersToRender = thangType.getContainersForActions(actionNames);
    spriteBuilder = new SpriteBuilder(thangType, {
      colorConfig: colorConfig
    });
    results = [];
    for (j = 0, len = containersToRender.length; j < len; j++) {
      containerGlobalName = containersToRender[j];
      containerKey = this.renderGroupingKey(thangType, containerGlobalName, colorConfig);
      if (((ref = this.spriteSheet) != null ? ref.resolutionFactor : void 0) === this.resolutionFactor && indexOf.call(this.spriteSheet.getAnimations(), containerKey) >= 0) {
        container = new createjs.Sprite(this.spriteSheet);
        container.gotoAndStop(containerKey);
        frame = spriteSheetBuilder.addFrame(container);
      } else if (prerenderedSpriteSheet && renderedActions[containerGlobalName]) {
        container = new createjs.Sprite(prerenderedSpriteSheet.spriteSheet);
        container.gotoAndStop(containerGlobalName);
        scale = this.resolutionFactor / (prerenderedSpriteSheet.get('resolutionFactor') || 1);
        frame = spriteSheetBuilder.addFrame(container, null, scale);
      } else {
        container = spriteBuilder.buildContainerFromStore(containerGlobalName);
        frame = spriteSheetBuilder.addFrame(container, null, this.resolutionFactor * (thangType.get('scale') || 1));
      }
      results.push(spriteSheetBuilder.addAnimation(containerKey, [frame], false));
    }
    return results;
  };

  LayerAdapter.prototype.renderSingularThangType = function(thangType, colorConfig, actionNames, spriteSheetBuilder) {
    var a, action, actionKeys, actionObjects, actions, animationActions, animationGroups, animationName, container, containerActions, containerGroups, containerName, f, frame, frames, framesMap, framesNeeded, framesToRender, i, index, j, k, key, l, len, len1, len2, len3, len4, len5, len6, len7, len8, m, mc, n, name, next, o, p, prerenderedFrames, prerenderedFramesMap, prerenderedSpriteSheet, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, renderAll, res, results, scale, sprite, spriteBuilder;
    prerenderedSpriteSheet = thangType.getPrerenderedSpriteSheet(colorConfig, 'singular');
    prerenderedFramesMap = {};
    if (prerenderedSpriteSheet) {
      if (!prerenderedSpriteSheet.loadedImage) {
        return;
      }
      scale = this.resolutionFactor / (prerenderedSpriteSheet.get('resolutionFactor') || 1);
      ref = prerenderedSpriteSheet.spriteSheet._frames;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        frame = ref[i];
        sprite = new createjs.Sprite(prerenderedSpriteSheet.spriteSheet);
        sprite.gotoAndStop(i);
        prerenderedFramesMap[i] = spriteSheetBuilder.addFrame(sprite, null, scale);
      }
    }
    actionObjects = _.values(thangType.getActions());
    animationActions = [];
    for (k = 0, len1 = actionObjects.length; k < len1; k++) {
      a = actionObjects[k];
      if (!a.animation) {
        continue;
      }
      if (ref1 = a.name, indexOf.call(actionNames, ref1) < 0) {
        continue;
      }
      animationActions.push(a);
    }
    spriteBuilder = new SpriteBuilder(thangType, {
      colorConfig: colorConfig
    });
    animationGroups = _.groupBy(animationActions, function(action) {
      return action.animation;
    });
    for (animationName in animationGroups) {
      actions = animationGroups[animationName];
      renderAll = _.any(actions, function(action) {
        return action.frames === void 0;
      });
      scale = actions[0].scale || thangType.get('scale') || 1;
      actionKeys = (function() {
        var l, len2, results;
        results = [];
        for (l = 0, len2 = actions.length; l < len2; l++) {
          action = actions[l];
          results.push(this.renderGroupingKey(thangType, action.name, colorConfig));
        }
        return results;
      }).call(this);
      if (((ref2 = this.spriteSheet) != null ? ref2.resolutionFactor : void 0) === this.resolutionFactor && _.all(actionKeys, (function(_this) {
        return function(key) {
          return indexOf.call(_this.spriteSheet.getAnimations(), key) >= 0;
        };
      })(this))) {
        framesNeeded = _.uniq(_.flatten((function() {
          var l, len2, results;
          results = [];
          for (l = 0, len2 = actionKeys.length; l < len2; l++) {
            key = actionKeys[l];
            results.push((this.spriteSheet.getAnimation(key)).frames);
          }
          return results;
        }).call(this)));
        framesMap = {};
        for (l = 0, len2 = framesNeeded.length; l < len2; l++) {
          frame = framesNeeded[l];
          sprite = new createjs.Sprite(this.spriteSheet);
          sprite.gotoAndStop(frame);
          framesMap[frame] = spriteSheetBuilder.addFrame(sprite);
        }
        for (index = m = 0, len3 = actionKeys.length; m < len3; index = ++m) {
          key = actionKeys[index];
          action = actions[index];
          frames = (function() {
            var len4, n, ref3, results;
            ref3 = this.spriteSheet.getAnimation(key).frames;
            results = [];
            for (n = 0, len4 = ref3.length; n < len4; n++) {
              f = ref3[n];
              results.push(framesMap[f]);
            }
            return results;
          }).call(this);
          next = thangType.nextForAction(action);
          spriteSheetBuilder.addAnimation(key, frames, next);
        }
        continue;
      }
      if (prerenderedSpriteSheet) {
        for (n = 0, len4 = actions.length; n < len4; n++) {
          action = actions[n];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          prerenderedFrames = (ref3 = prerenderedSpriteSheet.get('animations')) != null ? (ref4 = ref3[action.name]) != null ? ref4.frames : void 0 : void 0;
          if (!prerenderedFrames) {
            continue;
          }
          frames = (function() {
            var len5, o, results;
            results = [];
            for (o = 0, len5 = prerenderedFrames.length; o < len5; o++) {
              frame = prerenderedFrames[o];
              results.push(prerenderedFramesMap[frame]);
            }
            return results;
          })();
          next = thangType.nextForAction(action);
          spriteSheetBuilder.addAnimation(name, frames, next);
        }
        continue;
      }
      mc = spriteBuilder.buildMovieClip(animationName, null, null, null, {
        'temp': 0
      });
      if (renderAll) {
        res = spriteSheetBuilder.addMovieClip(mc, null, scale * this.resolutionFactor);
        frames = spriteSheetBuilder._animations['temp'].frames;
        framesMap = _.zipObject(_.range(frames.length), frames);
      } else {
        framesMap = {};
        framesToRender = _.uniq(_.flatten((function() {
          var len5, o, results;
          results = [];
          for (o = 0, len5 = actions.length; o < len5; o++) {
            a = actions[o];
            results.push(a.frames.split(','));
          }
          return results;
        })()));
        for (o = 0, len5 = framesToRender.length; o < len5; o++) {
          frame = framesToRender[o];
          frame = parseInt(frame);
          f = _.bind(mc.gotoAndStop, mc, frame);
          framesMap[frame] = spriteSheetBuilder.addFrame(mc, null, scale * this.resolutionFactor, f);
        }
      }
      for (p = 0, len6 = actions.length; p < len6; p++) {
        action = actions[p];
        name = this.renderGroupingKey(thangType, action.name, colorConfig);
        if (action.frames) {
          frames = (function() {
            var len7, q, ref5, results;
            ref5 = action.frames.split(',');
            results = [];
            for (q = 0, len7 = ref5.length; q < len7; q++) {
              frame = ref5[q];
              results.push(framesMap[parseInt(frame)]);
            }
            return results;
          })();
        } else {
          frames = _.sortBy(_.values(framesMap));
        }
        next = thangType.nextForAction(action);
        spriteSheetBuilder.addAnimation(name, frames, next);
      }
    }
    containerActions = [];
    for (q = 0, len7 = actionObjects.length; q < len7; q++) {
      a = actionObjects[q];
      if (!a.container) {
        continue;
      }
      if (ref5 = a.name, indexOf.call(actionNames, ref5) < 0) {
        continue;
      }
      containerActions.push(a);
    }
    containerGroups = _.groupBy(containerActions, function(action) {
      return action.container;
    });
    results = [];
    for (containerName in containerGroups) {
      actions = containerGroups[containerName];
      if (prerenderedSpriteSheet) {
        for (r = 0, len8 = actions.length; r < len8; r++) {
          action = actions[r];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          prerenderedFrames = (ref6 = prerenderedSpriteSheet.get('animations')) != null ? (ref7 = ref6[action.name]) != null ? ref7.frames : void 0 : void 0;
          if (!prerenderedFrames) {
            continue;
          }
          frame = prerenderedFramesMap[prerenderedFrames[0]];
          spriteSheetBuilder.addAnimation(name, [frame], false);
        }
        continue;
      }
      container = spriteBuilder.buildContainerFromStore(containerName);
      scale = actions[0].scale || thangType.get('scale') || 1;
      frame = spriteSheetBuilder.addFrame(container, null, scale * this.resolutionFactor);
      results.push((function() {
        var len9, results1, s;
        results1 = [];
        for (s = 0, len9 = actions.length; s < len9; s++) {
          action = actions[s];
          name = this.renderGroupingKey(thangType, action.name, colorConfig);
          results1.push(spriteSheetBuilder.addAnimation(name, [frame], false));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  LayerAdapter.prototype.renderRasterThangType = function(thangType, spriteSheetBuilder) {
    var $img, bm, frame, scale;
    if (!thangType.rasterImage) {
      console.error("Cannot render the LayerAdapter SpriteSheet until the raster image for <" + (thangType.get('name')) + "> is loaded.");
    }
    $img = $(thangType.rasterImage[0]);
    $('body').append($img);
    bm = new createjs.Bitmap(thangType.rasterImage[0]);
    scale = thangType.get('scale') || 1;
    frame = spriteSheetBuilder.addFrame(bm, null, scale);
    spriteSheetBuilder.addAnimation(this.renderGroupingKey(thangType), [frame], false);
    return $img.remove();
  };

  LayerAdapter.prototype.setSpriteToLank = function(lank) {
    var SpriteClass, prefix, ref, ref1, ref2, reg, scale, sprite;
    if (!lank.thangType.isFullyLoaded()) {
      sprite = new createjs.Sprite(this.spriteSheet);
      sprite.gotoAndStop(0);
      sprite.placeholder = true;
      sprite.regX = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH / 2;
      sprite.regY = this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH;
      sprite.baseScaleX = sprite.baseScaleY = sprite.scaleX = sprite.scaleY = 10 / (this.resolutionFactor * SPRITE_PLACEHOLDER_WIDTH);
    } else if (lank.thangType.get('raster')) {
      sprite = new createjs.Sprite(this.spriteSheet);
      scale = lank.thangType.get('scale') || 1;
      reg = lank.getOffset('registration');
      sprite.regX = -reg.x * scale;
      sprite.regY = -reg.y * scale;
      sprite.gotoAndStop(this.renderGroupingKey(lank.thangType));
      sprite.baseScaleX = sprite.baseScaleY = 1;
    } else {
      SpriteClass = (lank.thangType.get('spriteType') || this.defaultSpriteType) === 'segmented' ? SegmentedSprite : SingularSprite;
      prefix = this.renderGroupingKey(lank.thangType, null, lank.options.colorConfig) + '.';
      sprite = new SpriteClass(this.spriteSheet, lank.thangType, prefix, this.resolutionFactor);
    }
    sprite.lank = lank;
    sprite.camera = this.camera;
    sprite.layerPriority = (ref = (ref1 = lank.thang) != null ? ref1.layerPriority : void 0) != null ? ref : lank.thangType.get('layerPriority');
    sprite.name = ((ref2 = lank.thang) != null ? ref2.spriteName : void 0) || lank.thangType.get('name');
    lank.setSprite(sprite);
    lank.update(true);
    this.container.addChild(sprite);
    if (lank.thangType.get('matchWorldDimensions')) {
      return lank.updateScale(true);
    }
  };

  LayerAdapter.prototype.renderGroupingKey = function(thangType, grouping, colorConfig) {
    var colorKey, colorValue, key, ref;
    key = thangType.get('slug');
    ref = colorConfig != null ? colorConfig : {};
    for (colorKey in ref) {
      colorValue = ref[colorKey];
      key += "(" + colorKey + ":" + colorValue.hue + "," + colorValue.saturation + "," + colorValue.lightness + ")";
    }
    if (grouping) {
      key += '.' + grouping;
    }
    return key;
  };

  LayerAdapter.prototype.destroy = function() {
    var child, j, len, ref;
    ref = this.container.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (typeof child.destroy === "function") {
        child.destroy();
      }
    }
    if (this.asyncBuilder) {
      this.asyncBuilder.stopAsync();
    }
    return LayerAdapter.__super__.destroy.call(this);
  };

  return LayerAdapter;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/LayerAdapter.js.map
require.register("lib/sprites/SpriteExporter", function(exports, require, module) {
var CocoClass, SpriteBuilder, SpriteExporter, ThangType,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('./SpriteBuilder');

ThangType = require('models/ThangType');

CocoClass = require('core/CocoClass');

SpriteExporter = (function(superClass) {
  'To be used by the ThangTypeEditView to export ThangTypes to single sprite sheets which can be uploaded to\nGridFS and used in gameplay, avoiding rendering vector images.\n\nCode has been copied and reworked and simplified from LayerAdapter. Some shared code has been refactored into\nThangType, but more work could be done to rethink and reorganize Sprite rendering.';
  extend(SpriteExporter, superClass);

  function SpriteExporter(thangType, options) {
    var action;
    this.thangType = thangType;
    if (options == null) {
      options = {};
    }
    this.colorConfig = options.colorConfig || {};
    this.resolutionFactor = options.resolutionFactor || 1;
    this.actionNames = options.actionNames || ((function() {
      var i, len, ref, results;
      ref = this.thangType.getDefaultActions();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        action = ref[i];
        results.push(action.name);
      }
      return results;
    }).call(this));
    this.spriteType = options.spriteType || this.thangType.get('spriteType') || 'segmented';
    SpriteExporter.__super__.constructor.call(this);
  }

  SpriteExporter.prototype.build = function() {
    var e, error, spriteSheetBuilder;
    spriteSheetBuilder = new createjs.SpriteSheetBuilder();
    if (this.spriteType === 'segmented') {
      this.renderSegmentedThangType(spriteSheetBuilder);
    } else {
      this.renderSingularThangType(spriteSheetBuilder);
    }
    try {
      spriteSheetBuilder.buildAsync();
    } catch (error) {
      e = error;
      this.resolutionFactor *= 0.9;
      return this.build();
    }
    spriteSheetBuilder.on('complete', this.onBuildSpriteSheetComplete, this, true, spriteSheetBuilder);
    return this.asyncBuilder = spriteSheetBuilder;
  };

  SpriteExporter.prototype.renderSegmentedThangType = function(spriteSheetBuilder) {
    var container, containerGlobalName, containersToRender, frame, i, len, results, spriteBuilder;
    containersToRender = this.thangType.getContainersForActions(this.actionNames);
    spriteBuilder = new SpriteBuilder(this.thangType, {
      colorConfig: this.colorConfig
    });
    results = [];
    for (i = 0, len = containersToRender.length; i < len; i++) {
      containerGlobalName = containersToRender[i];
      container = spriteBuilder.buildContainerFromStore(containerGlobalName);
      frame = spriteSheetBuilder.addFrame(container, null, this.resolutionFactor * (this.thangType.get('scale') || 1));
      results.push(spriteSheetBuilder.addAnimation(containerGlobalName, [frame], false));
    }
    return results;
  };

  SpriteExporter.prototype.renderSingularThangType = function(spriteSheetBuilder) {
    var a, action, actionObjects, actions, animationActions, animationGroups, animationName, container, containerActions, containerGroups, containerName, frame, frames, framesMap, i, j, k, len, len1, len2, mc, next, ref, ref1, results, scale, spriteBuilder;
    actionObjects = _.values(this.thangType.getActions());
    animationActions = [];
    for (i = 0, len = actionObjects.length; i < len; i++) {
      a = actionObjects[i];
      if (!a.animation) {
        continue;
      }
      if (ref = a.name, indexOf.call(this.actionNames, ref) < 0) {
        continue;
      }
      animationActions.push(a);
    }
    spriteBuilder = new SpriteBuilder(this.thangType, {
      colorConfig: this.colorConfig
    });
    animationGroups = _.groupBy(animationActions, function(action) {
      return action.animation;
    });
    for (animationName in animationGroups) {
      actions = animationGroups[animationName];
      scale = actions[0].scale || this.thangType.get('scale') || 1;
      mc = spriteBuilder.buildMovieClip(animationName, null, null, null, {
        'temp': 0
      });
      spriteSheetBuilder.addMovieClip(mc, null, scale * this.resolutionFactor);
      frames = spriteSheetBuilder._animations['temp'].frames;
      framesMap = _.zipObject(_.range(frames.length), frames);
      for (j = 0, len1 = actions.length; j < len1; j++) {
        action = actions[j];
        if (action.frames) {
          frames = (function() {
            var k, len2, ref1, results;
            ref1 = action.frames.split(',');
            results = [];
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              frame = ref1[k];
              results.push(framesMap[parseInt(frame)]);
            }
            return results;
          })();
        } else {
          frames = _.sortBy(_.values(framesMap));
        }
        next = this.thangType.nextForAction(action);
        spriteSheetBuilder.addAnimation(action.name, frames, next);
      }
    }
    containerActions = [];
    for (k = 0, len2 = actionObjects.length; k < len2; k++) {
      a = actionObjects[k];
      if (!a.container) {
        continue;
      }
      if (ref1 = a.name, indexOf.call(this.actionNames, ref1) < 0) {
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
      container = spriteBuilder.buildContainerFromStore(containerName);
      scale = actions[0].scale || this.thangType.get('scale') || 1;
      frame = spriteSheetBuilder.addFrame(container, null, scale * this.resolutionFactor);
      results.push((function() {
        var l, len3, results1;
        results1 = [];
        for (l = 0, len3 = actions.length; l < len3; l++) {
          action = actions[l];
          results1.push(spriteSheetBuilder.addAnimation(action.name, [frame], false));
        }
        return results1;
      })());
    }
    return results;
  };

  SpriteExporter.prototype.onBuildSpriteSheetComplete = function(e, builder) {
    var i, image, index, len, ref, total;
    if (builder.spriteSheet._images.length > 1) {
      total = 0;
      ref = builder.spriteSheet._images;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        image = ref[index];
        total += image.height / builder.maxHeight;
      }
      this.resolutionFactor /= Math.max(1.1, Math.sqrt(total));
      this._renderNewSpriteSheet(e.async);
      return;
    }
    return this.trigger('build', {
      spriteSheet: builder.spriteSheet
    });
  };

  return SpriteExporter;

})(CocoClass);

module.exports = SpriteExporter;
});

;
//# sourceMappingURL=/javascripts/app/lib/sprites/SpriteExporter.js.map
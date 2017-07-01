require.register("lib/surface/SegmentedSprite", function(exports, require, module) {
var SegmentedSprite, SpriteBuilder, specialGoToAndStop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

SpriteBuilder = require('lib/sprites/SpriteBuilder');

specialGoToAndStop = function(frame) {
  if (frame === this.currentFrame && this.childrenCopy) {
    return this.addChild.apply(this, this.childrenCopy);
  } else {
    this.gotoAndStop(frame);
    return this.childrenCopy = this.children.slice(0);
  }
};

module.exports = SegmentedSprite = (function(superClass) {
  extend(SegmentedSprite, superClass);

  SegmentedSprite.prototype.childMovieClips = null;

  function SegmentedSprite(spriteSheet, thangType, spriteSheetPrefix, resolutionFactor) {
    var base;
    this.spriteSheet = spriteSheet;
    this.thangType = thangType;
    this.spriteSheetPrefix = spriteSheetPrefix;
    this.resolutionFactor = resolutionFactor != null ? resolutionFactor : SPRITE_RESOLUTION_FACTOR;
    this.handleTick = bind(this.handleTick, this);
    if ((base = this.spriteSheet).mcPool == null) {
      base.mcPool = {};
    }
    SegmentedSprite.__super__.constructor.call(this, this.spriteSheet);
    this.addEventListener('tick', this.handleTick);
  }

  SegmentedSprite.prototype.destroy = function() {
    this.handleTick = void 0;
    if (this.baseMovieClip) {
      this.baseMovieClip.inUse = false;
    }
    return this.removeAllEventListeners();
  };

  SegmentedSprite.prototype.play = function() {
    if (!(this.baseMovieClip && this.animLength > 1)) {
      return this.paused = false;
    }
  };

  SegmentedSprite.prototype.stop = function() {
    return this.paused = true;
  };

  SegmentedSprite.prototype.gotoAndPlay = function(actionName) {
    return this.goto(actionName, false);
  };

  SegmentedSprite.prototype.gotoAndStop = function(actionName) {
    return this.goto(actionName, true);
  };

  SegmentedSprite.prototype.goto = function(actionName, paused) {
    var action, actionScale, bounds, containerName, f, j, k, len, len1, mc, movieClip, randomStart, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reg, scale, sprite;
    this.paused = paused != null ? paused : true;
    this.removeAllChildren();
    this.currentAnimation = actionName;
    if (this.baseMovieClip) {
      this.baseMovieClip.inUse = false;
    }
    if (this.childMovieClips) {
      ref = this.childMovieClips;
      for (j = 0, len = ref.length; j < len; j++) {
        mc = ref[j];
        mc.inUse = false;
      }
    }
    this.childMovieClips = this.baseMovieClip = this.framerate = this.animLength = null;
    this.actionNotSupported = false;
    action = this.thangType.getActions()[actionName];
    randomStart = _.string.startsWith(actionName, 'move');
    reg = ((ref1 = action.positions) != null ? ref1.registration : void 0) || ((ref2 = this.thangType.get('positions')) != null ? ref2.registration : void 0) || {
      x: 0,
      y: 0
    };
    if (action.animation) {
      this.regX = -reg.x;
      this.regY = -reg.y;
      this.framerate = ((ref3 = action.framerate) != null ? ref3 : 20) * ((ref4 = action.speed) != null ? ref4 : 1);
      this.childMovieClips = [];
      this.baseMovieClip = this.buildMovieClip(action.animation);
      this.baseMovieClip.inUse = true;
      this.frames = action.frames;
      if (this.frames) {
        this.frames = (function() {
          var k, len1, ref5, results;
          ref5 = this.frames.split(',');
          results = [];
          for (k = 0, len1 = ref5.length; k < len1; k++) {
            f = ref5[k];
            results.push(parseInt(f));
          }
          return results;
        }).call(this);
      }
      this.animLength = this.frames ? this.frames.length : this.baseMovieClip.timeline.duration;
      if (this.animLength === 1) {
        this.paused = true;
      }
      if (this.frames) {
        if (randomStart) {
          this.currentFrame = this.frames[_.random(this.frames.length - 1)];
        } else {
          this.currentFrame = this.frames[0];
        }
      } else {
        if (randomStart) {
          this.currentFrame = Math.floor(Math.random() * this.animLength);
        } else {
          this.currentFrame = 0;
        }
      }
      this.baseMovieClip.specialGoToAndStop(this.currentFrame);
      ref5 = this.childMovieClips;
      for (k = 0, len1 = ref5.length; k < len1; k++) {
        movieClip = ref5[k];
        if (movieClip.mode === 'single') {
          movieClip.specialGoToAndStop(movieClip.startPosition);
        } else {
          movieClip.specialGoToAndStop(this.currentFrame);
        }
      }
      this.takeChildrenFromMovieClip(this.baseMovieClip, this);
      this.loop = action.loops !== false;
      this.goesTo = action.goesTo;
      if (this.actionNotSupported) {
        this.notifyActionNeedsRender(action);
      }
      this.scaleX = this.scaleY = (ref6 = (ref7 = action.scale) != null ? ref7 : this.thangType.get('scale')) != null ? ref6 : 1;
    } else if (action.container) {
      this.regX = this.regY = 0;
      this.scaleX = this.scaleY = 1;
      this.childMovieClips = [];
      containerName = this.spriteSheetPrefix + action.container;
      sprite = new createjs.Sprite(this.spriteSheet);
      sprite.gotoAndStop(containerName);
      if (sprite.currentFrame === 0 || this.usePlaceholders) {
        sprite.gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = this.thangType.get('raw').containers[action.container].b;
        actionScale = (ref8 = (ref9 = action.scale) != null ? ref9 : this.thangType.get('scale')) != null ? ref8 : 1;
        sprite.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        sprite.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        sprite.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        sprite.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref10 = (ref11 = action.scale) != null ? ref11 : this.thangType.get('scale')) != null ? ref10 : 1);
        sprite.regX = -reg.x * scale;
        sprite.regY = -reg.y * scale;
        sprite.scaleX = sprite.scaleY = 1 / this.resolutionFactor;
      }
      this.children = [];
      this.addChild(sprite);
    } else if (action.goesTo) {
      this.goto(action.goesTo, this.paused);
      return;
    }
    if (action.flipX) {
      this.scaleX *= -1;
    }
    if (action.flipY) {
      this.scaleY *= -1;
    }
    this.baseScaleX = this.scaleX;
    this.baseScaleY = this.scaleY;
  };

  SegmentedSprite.prototype.notifyActionNeedsRender = function(action) {
    var ref;
    return (ref = this.lank) != null ? ref.trigger('action-needs-render', this.lank, action) : void 0;
  };

  SegmentedSprite.prototype.buildMovieClip = function(animationName, mode, startPosition, loops) {
    var anim, animData, args, base, bounds, func, graphic, i, j, k, key, l, len, len1, len2, len3, len4, locals, m, mc, n, raw, ref, ref1, ref2, ref3, shape, stopped, toSkip, tween, tweenData;
    key = JSON.stringify([this.spriteSheetPrefix].concat(arguments));
    if ((base = this.spriteSheet.mcPool)[key] == null) {
      base[key] = [];
    }
    ref = this.spriteSheet.mcPool[key];
    for (j = 0, len = ref.length; j < len; j++) {
      mc = ref[j];
      if (!mc.inUse) {
        mc.gotoAndStop(mc.currentFrame + 0.01);
        this.childMovieClips = mc.childMovieClips;
        return mc;
      }
    }
    raw = this.thangType.get('raw');
    animData = raw.animations[animationName];
    this.lastAnimData = animData;
    locals = {};
    _.extend(locals, this.buildMovieClipContainers(animData.containers));
    _.extend(locals, this.buildMovieClipAnimations(animData.animations));
    toSkip = {};
    ref1 = animData.shapes;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      shape = ref1[k];
      toSkip[shape.bn] = true;
    }
    ref2 = animData.graphics;
    for (l = 0, len2 = ref2.length; l < len2; l++) {
      graphic = ref2[l];
      toSkip[graphic.bn] = true;
    }
    anim = new createjs.MovieClip();
    anim.initialize(mode != null ? mode : createjs.MovieClip.INDEPENDENT, startPosition != null ? startPosition : 0, loops != null ? loops : true);
    anim.specialGoToAndStop = specialGoToAndStop;
    ref3 = animData.tweens;
    for (i = m = 0, len3 = ref3.length; m < len3; i = ++m) {
      tweenData = ref3[i];
      stopped = false;
      tween = createjs.Tween;
      for (n = 0, len4 = tweenData.length; n < len4; n++) {
        func = tweenData[n];
        args = $.extend(true, [], func.a);
        if (this.dereferenceArgs(args, locals, toSkip) === false) {
          stopped = true;
          break;
        }
        if (tween[func.n]) {
          tween = tween[func.n].apply(tween, args);
        } else {
          stopped = true;
          break;
        }
      }
      if (stopped) {
        continue;
      }
      anim.timeline.addTween(tween);
    }
    anim.nominalBounds = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(createjs.Rectangle, animData.bounds, function(){});
    if (animData.frameBounds) {
      anim.frameBounds = (function() {
        var len5, o, ref4, results;
        ref4 = animData.frameBounds;
        results = [];
        for (o = 0, len5 = ref4.length; o < len5; o++) {
          bounds = ref4[o];
          results.push((function(func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
          })(createjs.Rectangle, bounds, function(){}));
        }
        return results;
      })();
    }
    anim.childMovieClips = this.childMovieClips;
    this.spriteSheet.mcPool[key].push(anim);
    return anim;
  };

  SegmentedSprite.prototype.buildMovieClipContainers = function(localContainers) {
    var bounds, innerContainer, j, len, localContainer, map, outerContainer;
    map = {};
    for (j = 0, len = localContainers.length; j < len; j++) {
      localContainer = localContainers[j];
      outerContainer = new createjs.SpriteContainer(this.spriteSheet);
      innerContainer = new createjs.Sprite(this.spriteSheet);
      innerContainer.gotoAndStop(this.spriteSheetPrefix + localContainer.gn);
      if (innerContainer.currentFrame === 0 || this.usePlaceholders) {
        innerContainer.gotoAndStop(0);
        this.actionNotSupported = true;
        bounds = this.thangType.get('raw').containers[localContainer.gn].b;
        innerContainer.x = bounds[0];
        innerContainer.y = bounds[1];
        innerContainer.scaleX = bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        innerContainer.scaleY = bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
      } else {
        innerContainer.scaleX = innerContainer.scaleY = 1 / (this.resolutionFactor * (this.thangType.get('scale') || 1));
      }
      outerContainer.addChild(innerContainer);
      outerContainer.setTransform.apply(outerContainer, localContainer.t);
      if (localContainer.o != null) {
        outerContainer._off = localContainer.o;
      }
      if (localContainer.al != null) {
        outerContainer.alpha = localContainer.al;
      }
      map[localContainer.bn] = outerContainer;
    }
    return map;
  };

  SegmentedSprite.prototype.buildMovieClipAnimations = function(localAnimations) {
    var animation, j, len, localAnimation, map;
    map = {};
    for (j = 0, len = localAnimations.length; j < len; j++) {
      localAnimation = localAnimations[j];
      animation = this.buildMovieClip.apply(this, [localAnimation.gn].concat(slice.call(localAnimation.a)));
      animation.inUse = true;
      animation.setTransform.apply(animation, localAnimation.t);
      map[localAnimation.bn] = animation;
      this.childMovieClips.push(animation);
    }
    return map;
  };

  SegmentedSprite.prototype.dereferenceArgs = function(args, locals, toSkip) {
    var key, res, val;
    for (key in args) {
      val = args[key];
      if (locals[val]) {
        args[key] = locals[val];
      } else if (val === null) {
        args[key] = {};
      } else if (_.isString(val) && val.indexOf('createjs.') === 0) {
        args[key] = eval(val);
      } else if (_.isObject(val) || _.isArray(val)) {
        res = this.dereferenceArgs(val, locals, toSkip);
        if (res === false) {
          return res;
        }
      } else if (_.isString(val) && toSkip[val]) {
        return false;
      }
    }
    return args;
  };

  SegmentedSprite.prototype.handleTick = function(e) {
    if (this.lastTimeStamp) {
      this.tick(e.timeStamp - this.lastTimeStamp);
    }
    return this.lastTimeStamp = e.timeStamp;
  };

  SegmentedSprite.prototype.tick = function(delta) {
    var j, len, movieClip, newFrame, newFrameIndex, nextFrame, pct, prevFrame, ref, translatedFrame;
    if (this.paused || !this.baseMovieClip) {
      return;
    }
    if (this.animLength === 1) {
      return this.paused = true;
    }
    newFrame = this.currentFrame + this.framerate * delta / 1000;
    if (newFrame > this.animLength) {
      if (this.goesTo) {
        this.gotoAndPlay(this.goesTo);
        return;
      } else if (!this.loop) {
        this.paused = true;
        newFrame = this.animLength - 1;
        _.defer((function(_this) {
          return function() {
            return _this.dispatchEvent('animationend');
          };
        })(this));
      } else {
        newFrame = newFrame % this.animLength;
      }
    }
    translatedFrame = newFrame;
    if (this.frames) {
      prevFrame = Math.floor(newFrame);
      nextFrame = Math.ceil(newFrame);
      if (prevFrame === nextFrame) {
        translatedFrame = this.frames[newFrame];
      } else if (nextFrame === this.frames.length) {
        translatedFrame = this.frames[prevFrame];
      } else {
        pct = newFrame % 1;
        newFrameIndex = this.frames[prevFrame] + (pct * (this.frames[nextFrame] - this.frames[prevFrame]));
        translatedFrame = newFrameIndex;
      }
    }
    this.currentFrame = newFrame;
    if (translatedFrame === this.baseMovieClip.currentFrame) {
      return;
    }
    this.baseMovieClip.specialGoToAndStop(translatedFrame);
    ref = this.childMovieClips;
    for (j = 0, len = ref.length; j < len; j++) {
      movieClip = ref[j];
      movieClip.specialGoToAndStop(movieClip.mode === 'single' ? movieClip.startPosition : newFrame);
    }
    this.children = [];
    return this.takeChildrenFromMovieClip(this.baseMovieClip, this);
  };

  SegmentedSprite.prototype.takeChildrenFromMovieClip = function(movieClip, recipientContainer) {
    var child, childRecipient, j, k, len, len1, prop, ref, ref1, results;
    ref = movieClip.childrenCopy;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if (child instanceof createjs.MovieClip) {
        childRecipient = new createjs.SpriteContainer(this.spriteSheet);
        this.takeChildrenFromMovieClip(child, childRecipient);
        ref1 = ['regX', 'regY', 'rotation', 'scaleX', 'scaleY', 'skewX', 'skewY', 'x', 'y'];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          prop = ref1[k];
          childRecipient[prop] = child[prop];
        }
        results.push(recipientContainer.addChild(childRecipient));
      } else {
        results.push(recipientContainer.addChild(child));
      }
    }
    return results;
  };

  return SegmentedSprite;

})(createjs.SpriteContainer);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/SegmentedSprite.js.map
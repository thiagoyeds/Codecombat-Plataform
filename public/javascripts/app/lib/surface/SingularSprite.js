require.register("lib/surface/SingularSprite", function(exports, require, module) {
var SingularSprite, SpriteBuilder, cliffs, floors,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

SpriteBuilder = require('lib/sprites/SpriteBuilder');

floors = ['Dungeon Floor', 'Indoor Floor', 'Grass', 'Grass01', 'Grass02', 'Grass03', 'Grass04', 'Grass05', 'Goal Trigger', 'Obstacle', 'Sand 01', 'Sand 02', 'Sand 03', 'Sand 04', 'Sand 05', 'Sand 06', 'Talus 1', 'Talus 2', 'Talus 3', 'Talus 4', 'Talus 5', 'Talus 6', 'Firn 1', 'Firn 2', 'Firn 3', 'Firn 4', 'Firn 5', 'Firn 6', 'Ice Rink 1', 'Ice Rink 2', 'Ice Rink 3', 'Firn Cliff', 'VR Floor', 'Classroom Floor'];

cliffs = ['Dungeon Pit', 'Grass Cliffs'];

module.exports = SingularSprite = (function(superClass) {
  extend(SingularSprite, superClass);

  SingularSprite.prototype.childMovieClips = null;

  function SingularSprite(spriteSheet, thangType, spriteSheetPrefix, resolutionFactor) {
    this.spriteSheet = spriteSheet;
    this.thangType = thangType;
    this.spriteSheetPrefix = spriteSheetPrefix;
    this.resolutionFactor = resolutionFactor != null ? resolutionFactor : SPRITE_RESOLUTION_FACTOR;
    SingularSprite.__super__.constructor.call(this, this.spriteSheet);
  }

  SingularSprite.prototype.destroy = function() {
    return this.removeAllEventListeners();
  };

  SingularSprite.prototype.gotoAndPlay = function(actionName) {
    return this.goto(actionName, false);
  };

  SingularSprite.prototype.gotoAndStop = function(actionName) {
    return this.goto(actionName, true);
  };

  SingularSprite.prototype._gotoAndPlay = createjs.Sprite.prototype.gotoAndPlay;

  SingularSprite.prototype._gotoAndStop = createjs.Sprite.prototype.gotoAndStop;

  SingularSprite.prototype.goto = function(actionName, paused) {
    var action, actionScale, animationName, bounds, frames, func, randomStart, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref15, ref16, ref17, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, reg, scale;
    this.paused = paused != null ? paused : true;
    this.actionNotSupported = false;
    action = this.thangType.getActions()[actionName];
    randomStart = _.string.startsWith(actionName, 'move');
    reg = ((ref = action.positions) != null ? ref.registration : void 0) || ((ref1 = this.thangType.get('positions')) != null ? ref1.registration : void 0) || {
      x: 0,
      y: 0
    };
    if (action.animation) {
      this.framerate = ((ref2 = action.framerate) != null ? ref2 : 20) * ((ref3 = action.speed) != null ? ref3 : 1);
      func = this.paused ? '_gotoAndStop' : '_gotoAndPlay';
      animationName = this.spriteSheetPrefix + actionName;
      this[func](animationName);
      if (this.currentFrame === 0 || this.usePlaceholders) {
        this._gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = (ref4 = this.thangType.get('raw')) != null ? (ref5 = ref4.animations) != null ? (ref6 = ref5[action.animation]) != null ? ref6.bounds : void 0 : void 0 : void 0;
        if (bounds == null) {
          bounds = [0, 0, 1, 1];
        }
        actionScale = (ref7 = (ref8 = action.scale) != null ? ref8 : this.thangType.get('scale')) != null ? ref7 : 1;
        this.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        this.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref9 = (ref10 = action.scale) != null ? ref10 : this.thangType.get('scale')) != null ? ref9 : 1);
        this.regX = -reg.x * scale;
        this.regY = -reg.y * scale;
        this.scaleX = this.scaleY = 1 / this.resolutionFactor;
        this.framerate = action.framerate || 20;
        if (randomStart && (frames = (ref11 = this.spriteSheet.getAnimation(animationName)) != null ? ref11.frames : void 0)) {
          this.currentAnimationFrame = Math.floor(Math.random() * frames.length);
        }
      }
    }
    if (action.container) {
      animationName = this.spriteSheetPrefix + actionName;
      this._gotoAndStop(animationName);
      if (this.currentFrame === 0 || this.usePlaceholders) {
        this._gotoAndStop(0);
        this.notifyActionNeedsRender(action);
        bounds = this.thangType.get('raw').containers[action.container].b;
        actionScale = (ref12 = (ref13 = action.scale) != null ? ref13 : this.thangType.get('scale')) != null ? ref12 : 1;
        this.scaleX = actionScale * bounds[2] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.scaleY = actionScale * bounds[3] / (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor);
        this.regX = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.x - bounds[0]) / bounds[2]);
        this.regY = (SPRITE_PLACEHOLDER_WIDTH * this.resolutionFactor) * ((-reg.y - bounds[1]) / bounds[3]);
      } else {
        scale = this.resolutionFactor * ((ref14 = (ref15 = action.scale) != null ? ref15 : this.thangType.get('scale')) != null ? ref14 : 1);
        this.regX = -reg.x * scale;
        this.regY = -reg.y * scale;
        this.scaleX = this.scaleY = 1 / this.resolutionFactor;
      }
    }
    if (action.flipX) {
      this.scaleX *= -1;
    }
    if (action.flipY) {
      this.scaleY *= -1;
    }
    this.baseScaleX = this.scaleX;
    this.baseScaleY = this.scaleY;
    if (this.camera && (ref16 = this.thangType.get('name'), indexOf.call(floors, ref16) >= 0)) {
      this.baseScaleY *= this.camera.y2x;
    } else if (this.camera && (ref17 = this.thangType.get('name'), indexOf.call(cliffs, ref17) >= 0)) {
      if (actionName === 'idle_side') {
        this.baseScaleX *= this.camera.x2y;
        this.baseScaleY *= this.camera.y2x * 0.85;
      } else {
        this.baseScaleY *= this.camera.y2x / 0.85;
      }
    }
    this.currentAnimation = actionName;
  };

  SingularSprite.prototype.notifyActionNeedsRender = function(action) {
    var ref;
    return (ref = this.lank) != null ? ref.trigger('action-needs-render', this.lank, action) : void 0;
  };

  return SingularSprite;

})(createjs.Sprite);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/SingularSprite.js.map
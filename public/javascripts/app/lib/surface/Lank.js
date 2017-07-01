require.register("lib/surface/Lank", function(exports, require, module) {
var AudioPlayer, Camera, CocoClass, Label, Lank, Mark, ThangType, createProgressBar, healthColors, me,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

createProgressBar = require('./sprite_utils').createProgressBar;

Camera = require('./Camera');

Mark = require('./Mark');

Label = require('./Label');

AudioPlayer = require('lib/AudioPlayer');

me = require('core/auth').me;

ThangType = require('models/ThangType');

healthColors = {
  ogres: [64, 128, 212],
  humans: [255, 0, 0],
  neutral: [64, 212, 128]
};

module.exports = Lank = Lank = (function(superClass) {
  extend(Lank, superClass);

  Lank.prototype.thangType = null;

  Lank.prototype.sprite = null;

  Lank.prototype.healthBar = null;

  Lank.prototype.marks = null;

  Lank.prototype.labels = null;

  Lank.prototype.ranges = null;

  Lank.prototype.options = {
    groundLayer: null,
    textLayer: null,
    floatingLayer: null,
    thang: null,
    camera: null,
    showInvisible: false,
    preloadSounds: true
  };

  Lank.prototype.possessed = false;

  Lank.prototype.flipped = false;

  Lank.prototype.flippedCount = 0;

  Lank.prototype.actionQueue = null;

  Lank.prototype.actions = null;

  Lank.prototype.rotation = 0;

  Lank.prototype.scaleFactorX = 1;

  Lank.prototype.scaleFactorY = 1;

  Lank.prototype.targetScaleFactorX = 1;

  Lank.prototype.targetScaleFactorY = 1;

  Lank.prototype.currentRootAction = null;

  Lank.prototype.currentAction = null;

  Lank.prototype.subscriptions = {
    'level:sprite-dialogue': 'onDialogue',
    'level:sprite-clear-dialogue': 'onClearDialogue',
    'level:set-letterbox': 'onSetLetterbox',
    'surface:ticked': 'onSurfaceTicked',
    'sprite:move': 'onMove'
  };

  function Lank(thangType1, options) {
    var spriteName;
    this.thangType = thangType1;
    if (options == null) {
      options = {};
    }
    this.move = bind(this.move, this);
    this.rotateEffect = bind(this.rotateEffect, this);
    this.playNextAction = bind(this.playNextAction, this);
    Lank.__super__.constructor.call(this);
    spriteName = this.thangType.get('name');
    this.isMissile = /(Missile|Arrow|Spear|Bolt)/.test(spriteName) && !/(Tower|Charge)/.test(spriteName);
    this.options = _.extend($.extend(true, {}, this.options), options);
    this.gameUIState = this.options.gameUIState;
    this.handleEvents = this.options.handleEvents;
    this.setThang(this.options.thang);
    this.setColorConfig();
    if (!this.thangType) {
      console.error(this.toString(), 'has no ThangType!');
    }
    this.sprite = new createjs.Container;
    this.actionQueue = [];
    this.marks = {};
    this.labels = {};
    this.ranges = [];
    this.handledDisplayEvents = {};
    this.age = 0;
    this.stillLoading = true;
    if (this.thangType.isFullyLoaded()) {
      this.onThangTypeLoaded();
    } else {
      this.listenToOnce(this.thangType, 'sync', this.onThangTypeLoaded);
    }
  }

  Lank.prototype.toString = function() {
    var ref;
    return "<Lank: " + ((ref = this.thang) != null ? ref.id : void 0) + ">";
  };

  Lank.prototype.setColorConfig = function() {
    var colorConfig, ref, unlockedLevels;
    if (!(colorConfig = (ref = this.thang) != null ? typeof ref.getLankOptions === "function" ? ref.getLankOptions().colorConfig : void 0 : void 0)) {
      return;
    }
    if (this.thangType.get('original') === ThangType.heroes['code-ninja']) {
      unlockedLevels = me.levels();
      if (indexOf.call(unlockedLevels, '5522b98685fca53105544b53') >= 0) {
        colorConfig.belt = {
          hue: 0.4,
          saturation: 0.75,
          lightness: 0.25
        };
      } else if (indexOf.call(unlockedLevels, '56fc56ac7cd2381f00d758b4') >= 0) {
        colorConfig.belt = {
          hue: 0.067,
          saturation: 0.75,
          lightness: 0.5
        };
      } else {
        colorConfig.belt = {
          hue: 0.167,
          saturation: 0.75,
          lightness: 0.4
        };
      }
    }
    return this.options.colorConfig = colorConfig;
  };

  Lank.prototype.onThangTypeLoaded = function() {
    var i, len, ref, ref1, ref2, ref3, ref4, sound, sounds, trigger;
    this.stillLoading = false;
    if (this.options.preloadSounds) {
      ref = this.thangType.get('soundTriggers') || {};
      for (trigger in ref) {
        sounds = ref[trigger];
        if (trigger !== 'say') {
          for (i = 0, len = sounds.length; i < len; i++) {
            sound = sounds[i];
            if (sound) {
              AudioPlayer.preloadSoundReference(sound);
            }
          }
        }
      }
    }
    if (this.thangType.get('raster')) {
      this.actions = {};
      this.isRaster = true;
    } else {
      this.actions = this.thangType.getActions();
      this.createMarks();
    }
    if (((ref1 = this.thang) != null ? ref1.scaleFactorX : void 0) != null) {
      this.scaleFactorX = this.thang.scaleFactorX;
    }
    if (((ref2 = this.thang) != null ? ref2.scaleFactor : void 0) != null) {
      this.scaleFactorX = this.thang.scaleFactor;
    }
    if (((ref3 = this.thang) != null ? ref3.scaleFactorY : void 0) != null) {
      this.scaleFactorY = this.thang.scaleFactorY;
    }
    if (((ref4 = this.thang) != null ? ref4.scaleFactor : void 0) != null) {
      this.scaleFactorY = this.thang.scaleFactor;
    }
    if (!this.currentAction) {
      return this.updateAction();
    }
  };

  Lank.prototype.setSprite = function(newSprite) {
    var base, i, len, parent, prop, ref;
    if (this.sprite) {
      this.sprite.off('animationend', this.playNextAction);
      if (typeof (base = this.sprite).destroy === "function") {
        base.destroy();
      }
      if (parent = this.sprite.parent) {
        parent.removeChild(this.sprite);
        if (parent.spriteSheet === newSprite.spriteSheet) {
          parent.addChild(newSprite);
        }
      }
    }
    ref = ['lastPos', 'currentRootAction'];
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      delete this[prop];
    }
    this.sprite = newSprite;
    if (this.thang && this.thang.stateChanged === false) {
      this.thang.stateChanged = true;
    }
    this.configureMouse();
    this.sprite.on('animationend', this.playNextAction);
    if (this.currentAction && !this.stillLoading) {
      this.playAction(this.currentAction);
    }
    return this.trigger('new-sprite', this.sprite);
  };

  Lank.prototype.queueAction = function(action) {
    var nextAction, ref, ref1, ref2;
    if (_.isString(action)) {
      action = this.actions[action];
    }
    if (action == null) {
      action = this.actions.idle;
    }
    this.actionQueue = [];
    if ((ref = this.currentRootAction) != null ? (ref1 = ref.relatedActions) != null ? ref1.end : void 0 : void 0) {
      this.actionQueue.push(this.currentRootAction.relatedActions.end);
    }
    if ((ref2 = action.relatedActions) != null ? ref2.begin : void 0) {
      this.actionQueue.push(action.relatedActions.begin);
    }
    this.actionQueue.push(action);
    if (action.goesTo && (nextAction = this.actions[action.goesTo])) {
      if (nextAction) {
        this.actionQueue.push(nextAction);
      }
    }
    this.currentRootAction = action;
    return this.playNextAction();
  };

  Lank.prototype.onSurfaceTicked = function(e) {
    return this.age += e.dt;
  };

  Lank.prototype.playNextAction = function() {
    if (this.destroyed) {
      return;
    }
    if (this.actionQueue.length) {
      return this.playAction(this.actionQueue.splice(0, 1)[0]);
    }
  };

  Lank.prototype.playAction = function(action) {
    var base, m;
    if (this.isRaster) {
      return;
    }
    this.currentAction = action;
    if (!(action.animation || action.container || action.relatedActions || action.goesTo)) {
      return this.hide();
    }
    this.show();
    if (!(action.animation || action.container || action.goesTo)) {
      return this.updateActionDirection();
    }
    if (this.sprite.placeholder) {
      return;
    }
    m = action.container ? 'gotoAndStop' : 'gotoAndPlay';
    if (typeof (base = this.sprite)[m] === "function") {
      base[m](action.name);
    }
    this.updateScale();
    return this.updateRotation();
  };

  Lank.prototype.hide = function() {
    this.hiding = true;
    return this.updateAlpha();
  };

  Lank.prototype.show = function() {
    this.hiding = false;
    return this.updateAlpha();
  };

  Lank.prototype.stop = function() {
    var mark, name, ref, ref1;
    if ((ref = this.sprite) != null) {
      if (typeof ref.stop === "function") {
        ref.stop();
      }
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.stop();
    }
    return this.stopped = true;
  };

  Lank.prototype.play = function() {
    var mark, name, ref, ref1;
    if ((ref = this.sprite) != null) {
      if (typeof ref.play === "function") {
        ref.play();
      }
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.play();
    }
    return this.stopped = false;
  };

  Lank.prototype.update = function(frameChanged) {
    var thangUnchanged;
    if (this.stillLoading) {
      return false;
    }
    thangUnchanged = this.thang && this.thang.stateChanged === false;
    if ((frameChanged && !thangUnchanged) || (this.thang && this.thang.bobHeight) || this.notOfThisWorld) {
      this.updatePosition();
    }
    if (thangUnchanged) {
      return false;
    }
    frameChanged = frameChanged || this.targetScaleFactorX !== this.scaleFactorX || this.targetScaleFactorY !== this.scaleFactorY;
    if (frameChanged) {
      this.handledDisplayEvents = {};
      this.updateScale();
      this.updateAlpha();
      this.updateRotation();
      this.updateAction();
      this.updateStats();
      this.updateGold();
      this.showAreaOfEffects();
      this.showTextEvents();
      this.updateHealthBar();
    }
    this.updateMarks();
    this.updateLabels();
    if (this.thang && this.thang.stateChanged === true) {
      this.thang.stateChanged = false;
    }
    return true;
  };

  Lank.prototype.showAreaOfEffects = function() {
    var args, circle, endAngle, event, i, key, layer, layerName, len, pos, radius, ref, ref1, ref2, resFactor, results, startAngle;
    if (!((ref = this.thang) != null ? ref.currentEvents : void 0)) {
      return;
    }
    ref1 = this.thang.currentEvents;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (!_.string.startsWith(event, 'aoe-')) {
        continue;
      }
      if (this.handledDisplayEvents[event]) {
        continue;
      }
      this.handledDisplayEvents[event] = true;
      args = JSON.parse(event.slice(4));
      key = 'aoe-' + JSON.stringify(args.slice(2));
      layerName = (ref2 = args[6]) != null ? ref2 : 'ground';
      if (!(layer = this.options[layerName + 'Layer'])) {
        console.error(this.thang.id + " couldn't find layer " + layerName + "Layer for AOE effect " + key + "; using ground layer.");
        layer = this.options.groundLayer;
      }
      if (indexOf.call(layer.spriteSheet.getAnimations(), key) < 0) {
        circle = new createjs.Shape();
        radius = args[2] * Camera.PPM;
        if (args.length === 4) {
          circle.graphics.beginFill(args[3]).drawCircle(0, 0, radius);
        } else {
          startAngle = args[4] || 0;
          endAngle = args[5] || 2 * Math.PI;
          if (startAngle === endAngle) {
            startAngle = 0;
            endAngle = 2 * Math.PI;
          }
          circle.graphics.beginFill(args[3]).lineTo(0, 0).lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle)).arc(0, 0, radius, startAngle, endAngle).lineTo(0, 0);
        }
        layer.addCustomGraphic(key, circle, [-radius, -radius, radius * 2, radius * 2]);
      }
      circle = new createjs.Sprite(layer.spriteSheet);
      circle.gotoAndStop(key);
      pos = this.options.camera.worldToSurface({
        x: args[0],
        y: args[1]
      });
      circle.x = pos.x;
      circle.y = pos.y;
      resFactor = layer.resolutionFactor;
      circle.scaleY = this.options.camera.y2x * 0.7 / resFactor;
      circle.scaleX = 0.7 / resFactor;
      circle.alpha = 0.2;
      layer.addChild(circle);
      results.push(createjs.Tween.get(circle).to({
        alpha: 0.6,
        scaleY: this.options.camera.y2x / resFactor,
        scaleX: 1 / resFactor
      }, 100, createjs.Ease.circOut).to({
        alpha: 0,
        scaleY: 0,
        scaleX: 0
      }, 700, createjs.Ease.circIn).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          layer.removeChild(circle);
          return delete _this.handledDisplayEvents[event];
        };
      })(this)));
    }
    return results;
  };

  Lank.prototype.showTextEvents = function() {
    var event, i, label, len, offset, options, ref, ref1, ref2, ref3, results, shadowColor;
    if (!((ref = this.thang) != null ? ref.currentEvents : void 0)) {
      return;
    }
    ref1 = this.thang.currentEvents;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (!_.string.startsWith(event, 'text-')) {
        continue;
      }
      if (this.handledDisplayEvents[event]) {
        continue;
      }
      this.handledDisplayEvents[event] = true;
      options = JSON.parse(event.slice(5));
      label = new createjs.Text(options.text, "bold " + (options.size || 16) + "px Arial", options.color || '#FFF');
      shadowColor = (ref2 = {
        humans: '#F00',
        ogres: '#00F',
        neutral: '#0F0',
        common: '#0F0'
      }[this.thang.team]) != null ? ref2 : '#000';
      label.shadow = new createjs.Shadow(shadowColor, 1, 1, 3);
      offset = this.getOffset('aboveHead');
      ref3 = [this.sprite.x + offset.x - label.getMeasuredWidth() / 2, this.sprite.y + offset.y], label.x = ref3[0], label.y = ref3[1];
      this.options.textLayer.addChild(label);
      if (window.labels == null) {
        window.labels = [];
      }
      window.labels.push(label);
      label.alpha = 0;
      results.push(createjs.Tween.get(label).to({
        y: label.y - 2,
        alpha: 1
      }, 200, createjs.Ease.linear).to({
        y: label.y - 12
      }, 1000, createjs.Ease.linear).to({
        y: label.y - 22,
        alpha: 0
      }, 1000, createjs.Ease.linear).call((function(_this) {
        return function() {
          if (_this.destroyed) {
            return;
          }
          return _this.options.textLayer.removeChild(label);
        };
      })(this)));
    }
    return results;
  };

  Lank.prototype.getBobOffset = function() {
    if (!this.thang.bobHeight) {
      return 0;
    }
    if (this.stopped) {
      return this.lastBobOffset;
    }
    return this.lastBobOffset = this.thang.bobHeight * (1 + Math.sin(this.age * Math.PI / this.thang.bobTime));
  };

  Lank.prototype.getWorldPosition = function() {
    var bobOffset, p1;
    p1 = this.possessed ? this.shadow.pos : this.thang.pos;
    if (bobOffset = this.getBobOffset()) {
      p1 = (typeof p1.copy === "function" ? p1.copy() : void 0) || _.clone(p1);
      p1.z += bobOffset;
    }
    return {
      x: p1.x,
      y: p1.y,
      z: this.thang.isLand ? 0 : p1.z - this.thang.depth / 2
    };
  };

  Lank.prototype.updatePosition = function(whileLoading) {
    var p0, p1, ref, ref1, ref2, sup, wop;
    if (whileLoading == null) {
      whileLoading = false;
    }
    if (this.stillLoading && !whileLoading) {
      return;
    }
    if (!(((ref = this.thang) != null ? ref.pos : void 0) && (this.options.camera != null))) {
      return;
    }
    ref1 = [this.lastPos, this.thang.pos], p0 = ref1[0], p1 = ref1[1];
    if (p0 && p0.x === p1.x && p0.y === p1.y && p0.z === p1.z && !this.thang.bobHeight) {
      return;
    }
    wop = this.getWorldPosition();
    sup = this.options.camera.worldToSurface(wop);
    ref2 = [sup.x, sup.y], this.sprite.x = ref2[0], this.sprite.y = ref2[1];
    if (!whileLoading) {
      this.lastPos = (typeof p1.copy === "function" ? p1.copy() : void 0) || _.clone(p1);
    }
    this.hasMoved = true;
    if (this.thangType.get('name') === 'Flag' && !this.notOfThisWorld) {
      return _.defer((function(_this) {
        return function() {
          return Backbone.Mediator.publish('surface:flag-appeared', {
            sprite: _this
          });
        };
      })(this));
    }
  };

  Lank.prototype.updateScale = function(force) {
    var angle, bounds, newScaleFactorX, newScaleFactorY, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, scaleX, scaleY;
    if (!this.sprite) {
      return;
    }
    if (this.thangType.get('matchWorldDimensions') && this.thang && this.options.camera) {
      if (force || this.thang.width !== this.lastThangWidth || this.thang.height !== this.lastThangHeight || this.thang.rotation !== this.lastThangRotation) {
        bounds = this.sprite.getBounds();
        if (!bounds) {
          return;
        }
        this.sprite.scaleX = this.thang.width * Camera.PPM / bounds.width * (this.options.camera.y2x + (1 - this.options.camera.y2x) * Math.abs(Math.cos(this.thang.rotation)));
        this.sprite.scaleY = this.thang.height * Camera.PPM / bounds.height * (this.options.camera.y2x + (1 - this.options.camera.y2x) * Math.abs(Math.sin(this.thang.rotation)));
        this.sprite.regX = bounds.width * 3 / 4;
        this.sprite.regY = bounds.height * 3 / 4;
        if (this.thang.spriteName !== 'Beam') {
          this.sprite.scaleX *= (ref = this.thangType.get('scale')) != null ? ref : 1;
          this.sprite.scaleY *= (ref1 = this.thangType.get('scale')) != null ? ref1 : 1;
        }
        ref2 = [this.thang.width, this.thang.height, this.thang.rotation], this.lastThangWidth = ref2[0], this.lastThangHeight = ref2[1], this.lastThangRotation = ref2[2];
      }
      return;
    }
    scaleX = scaleY = 1;
    if (this.isMissile) {
      angle = this.getRotation();
      if (angle < 0) {
        angle = -angle;
      }
      if (angle > 90) {
        angle = 180 - angle;
      }
      scaleX = 0.5 + 0.5 * (90 - angle) / 90;
    }
    this.sprite.scaleX = this.sprite.baseScaleX * this.scaleFactorX * scaleX;
    this.sprite.scaleY = this.sprite.baseScaleY * this.scaleFactorY * scaleY;
    newScaleFactorX = (ref3 = (ref4 = (ref5 = this.thang) != null ? ref5.scaleFactorX : void 0) != null ? ref4 : (ref6 = this.thang) != null ? ref6.scaleFactor : void 0) != null ? ref3 : 1;
    newScaleFactorY = (ref7 = (ref8 = (ref9 = this.thang) != null ? ref9.scaleFactorY : void 0) != null ? ref8 : (ref10 = this.thang) != null ? ref10.scaleFactor : void 0) != null ? ref7 : 1;
    if (((ref11 = this.layer) != null ? ref11.name : void 0) === 'Land' || ((ref12 = this.thang) != null ? ref12.spriteName : void 0) === 'Beam') {
      this.scaleFactorX = newScaleFactorX;
      return this.scaleFactorY = newScaleFactorY;
    } else if (this.thang && (newScaleFactorX !== this.targetScaleFactorX || newScaleFactorY !== this.targetScaleFactorY)) {
      this.targetScaleFactorX = newScaleFactorX;
      this.targetScaleFactorY = newScaleFactorY;
      createjs.Tween.removeTweens(this);
      return createjs.Tween.get(this).to({
        scaleFactorX: this.targetScaleFactorX,
        scaleFactorY: this.targetScaleFactorY
      }, 2000, createjs.Ease.elasticOut);
    }
  };

  Lank.prototype.updateAlpha = function() {
    var mark, name, ref, ref1, ref2;
    this.sprite.alpha = this.hiding ? 0 : 1;
    if (((ref = this.thang) != null ? ref.alpha : void 0) == null) {
      return;
    }
    if (this.sprite.alpha === this.thang.alpha) {
      return;
    }
    this.sprite.alpha = this.thang.alpha;
    if (this.options.showInvisible) {
      this.sprite.alpha = Math.max(0.5, this.sprite.alpha);
    }
    ref1 = this.marks;
    for (name in ref1) {
      mark = ref1[name];
      mark.updateAlpha(this.thang.alpha);
    }
    return (ref2 = this.healthBar) != null ? ref2.alpha = this.thang.alpha : void 0;
  };

  Lank.prototype.updateRotation = function(sprite) {
    var heading, rotation, rotationType, speed, vx, vz, xFactor, zFactor;
    rotationType = this.thangType.get('rotationType');
    if (rotationType === 'fixed') {
      return;
    }
    rotation = this.getRotation();
    if (this.isMissile && this.thang.velocity) {
      vz = this.thang.velocity.z;
      if (vz && (speed = this.thang.velocity.magnitude(true))) {
        vx = this.thang.velocity.x;
        heading = this.thang.velocity.heading();
        xFactor = Math.cos(heading);
        zFactor = vz / Math.sqrt(vz * vz + vx * vx);
        rotation -= xFactor * zFactor * 45;
      }
    }
    if (sprite == null) {
      sprite = this.sprite;
    }
    if (rotationType === 'free' || !rotationType) {
      return sprite.rotation = rotation;
    }
    return this.updateIsometricRotation(rotation, sprite);
  };

  Lank.prototype.getRotation = function() {
    var rotation, thang;
    thang = this.possessed ? this.shadow : this.thang;
    if (!(thang != null ? thang.rotation : void 0)) {
      return this.rotation;
    }
    rotation = thang != null ? thang.rotation : void 0;
    rotation = (360 - (rotation * 180 / Math.PI) % 360) % 360;
    if (rotation > 180) {
      rotation -= 360;
    }
    return rotation;
  };

  Lank.prototype.updateIsometricRotation = function(rotation, sprite) {
    if (!this.currentAction) {
      return;
    }
    if (_.string.endsWith(this.currentAction.name, 'back')) {
      return;
    }
    if (_.string.endsWith(this.currentAction.name, 'fore')) {
      return;
    }
    if (Math.abs(rotation) >= 90) {
      return sprite.scaleX *= -1;
    }
  };

  Lank.prototype.updateAction = function() {
    var action, base, isDifferent, ref, ref1, ref2;
    if (this.isRaster || this.actionLocked) {
      return;
    }
    action = this.determineAction();
    isDifferent = action !== this.currentRootAction || action === null;
    if (!action && ((ref = this.thang) != null ? ref.actionActivated : void 0) && !this.stopLogging) {
      console.error('action is', action, 'for', (ref1 = this.thang) != null ? ref1.id : void 0, 'from', this.currentRootAction, this.thang.action, typeof (base = this.thang).getActionName === "function" ? base.getActionName() : void 0);
      this.stopLogging = true;
    }
    if (action && (isDifferent || (((ref2 = this.thang) != null ? ref2.actionActivated : void 0) && action.name !== 'move'))) {
      this.queueAction(action);
    }
    return this.updateActionDirection();
  };

  Lank.prototype.determineAction = function() {
    var action, thang;
    action = null;
    thang = this.possessed ? this.shadow : this.thang;
    if (thang != null ? thang.acts : void 0) {
      action = thang.action;
    }
    if (this.currentRootAction != null) {
      if (action == null) {
        action = this.currentRootAction.name;
      }
    }
    if (action == null) {
      action = 'idle';
    }
    if (this.actions[action] == null) {
      if (this.warnedFor == null) {
        this.warnedFor = {};
      }
      if (!this.warnedFor[action]) {
        console.warn('Cannot show action', action, 'for', this.thangType.get('name'), 'because it DNE');
      }
      this.warnedFor[action] = true;
      if (this.action === 'idle') {
        return null;
      } else {
        return 'idle';
      }
    }
    if ((this.actions.die != null) && ((thang != null ? thang.health : void 0) != null) && thang.health <= 0) {
      action = 'die';
    }
    return this.actions[action];
  };

  Lank.prototype.updateActionDirection = function(wallGrid) {
    var action;
    this.wallGrid = wallGrid != null ? wallGrid : null;
    if (!(action = this.getActionDirection())) {
      return;
    }
    if (action !== this.currentAction) {
      return this.playAction(action);
    }
  };

  Lank.prototype.lockAction = function() {
    return this.actionLocked = true;
  };

  Lank.prototype.getActionDirection = function(rootAction) {
    var action, direction, gx, gy, i, index, j, keys, len, len1, matchedAction, ref, ref1, ref2, ref3, relatedAction, relatedActions, rotation, tileSize, value, wallThangs, x, y;
    if (rootAction == null) {
      rootAction = null;
    }
    if (rootAction == null) {
      rootAction = this.currentRootAction;
    }
    if (!(relatedActions = (ref = rootAction != null ? rootAction.relatedActions : void 0) != null ? ref : {})) {
      return null;
    }
    rotation = this.getRotation();
    if (relatedActions['111111111111']) {
      if (this.wallGrid) {
        this.hadWallGrid = true;
        action = '';
        tileSize = 4;
        ref1 = [this.thang.pos.x, this.thang.pos.y], gx = ref1[0], gy = ref1[1];
        ref2 = [gy + tileSize, gy, gy - tileSize, gy - tileSize * 2];
        for (i = 0, len = ref2.length; i < len; i++) {
          y = ref2[i];
          ref3 = [gx - tileSize, gx, gx + tileSize];
          for (j = 0, len1 = ref3.length; j < len1; j++) {
            x = ref3[j];
            if (x >= 0 && y >= 0 && x < this.wallGrid.width && y < this.wallGrid.height) {
              wallThangs = this.wallGrid.contents(x, y);
            } else {
              wallThangs = ['outside of the map yo'];
            }
            if (wallThangs.length === 0) {
              if (y === gy && x === gx) {
                action += '1';
              } else {
                action += '0';
              }
            } else if (wallThangs.length === 1) {
              action += '1';
            } else {
              console.error('Overlapping walls at', x, y, '...', wallThangs);
              action += '1';
            }
          }
        }
        matchedAction = '111111111111';
        for (relatedAction in relatedActions) {
          if (action.match(relatedAction.replace(/\?/g, '.'))) {
            matchedAction = relatedAction;
            break;
          }
        }
        return relatedActions[matchedAction];
      } else if (this.hadWallGrid) {
        return null;
      } else {
        keys = _.keys(relatedActions);
        index = Math.max(0, Math.floor((179 + rotation) / 360 * keys.length));
        return relatedActions[keys[index]];
      }
    }
    value = Math.abs(rotation);
    direction = null;
    if (value <= 45 || value >= 135) {
      direction = 'side';
    }
    if ((135 > rotation && rotation > 45)) {
      direction = 'fore';
    }
    if ((-135 < rotation && rotation < -45)) {
      direction = 'back';
    }
    return relatedActions[direction];
  };

  Lank.prototype.updateStats = function() {
    var bar, healthPct;
    if (!(this.thang && this.thang.health !== this.lastHealth)) {
      return;
    }
    this.lastHealth = this.thang.health;
    if (bar = this.healthBar) {
      healthPct = Math.max(this.thang.health / this.thang.maxHealth, 0);
      bar.scaleX = healthPct / this.options.floatingLayer.resolutionFactor;
    }
    if (this.thang.showsName) {
      return this.setNameLabel(this.thang.health <= 0 ? '' : this.thang.id);
    } else if (this.options.playerName) {
      return this.setNameLabel(this.options.playerName);
    }
  };

  Lank.prototype.configureMouse = function() {
    var ref, ref1, ref2;
    if ((ref = this.thang) != null ? ref.isSelectable : void 0) {
      this.sprite.cursor = 'pointer';
    }
    if (!(((ref1 = this.thang) != null ? ref1.isSelectable : void 0) || ((ref2 = this.thang) != null ? ref2.isLand : void 0))) {
      this.sprite.mouseEnabled = this.sprite.mouseChildren = false;
    }
    if (this.sprite.mouseEnabled) {
      this.sprite.on('mousedown', this.onMouseEvent, this, false, 'sprite:mouse-down');
      this.sprite.on('click', this.onMouseEvent, this, false, 'sprite:clicked');
      this.sprite.on('dblclick', this.onMouseEvent, this, false, 'sprite:double-clicked');
      this.sprite.on('pressmove', this.onMouseEvent, this, false, 'sprite:dragged');
      return this.sprite.on('pressup', this.onMouseEvent, this, false, 'sprite:mouse-up');
    }
  };

  Lank.prototype.onMouseEvent = function(e, ourEventName) {
    var newEvent, p;
    if (this.letterboxOn || !this.sprite) {
      return;
    }
    p = this.sprite;
    while (p.parent) {
      p = p.parent;
    }
    newEvent = {
      sprite: this,
      thang: this.thang,
      originalEvent: e,
      canvas: p.canvas
    };
    this.trigger(ourEventName, newEvent);
    Backbone.Mediator.publish(ourEventName, newEvent);
    return this.gameUIState.trigger(ourEventName, newEvent);
  };

  Lank.prototype.addHealthBar = function() {
    var bar, hadHealthBar, healthColor, key, offset, ref, ref1, ref2, ref3, team;
    if (!((((ref = this.thang) != null ? ref.health : void 0) != null) && indexOf.call((ref1 = (ref2 = this.thang) != null ? ref2.hudProperties : void 0) != null ? ref1 : [], 'health') >= 0 && this.options.floatingLayer)) {
      return;
    }
    team = ((ref3 = this.thang) != null ? ref3.team : void 0) || 'neutral';
    key = team + "-health-bar";
    if (indexOf.call(this.options.floatingLayer.spriteSheet.getAnimations(), key) < 0) {
      healthColor = healthColors[team];
      bar = createProgressBar(healthColor);
      this.options.floatingLayer.addCustomGraphic(key, bar, bar.bounds);
    }
    hadHealthBar = this.healthBar;
    this.healthBar = new createjs.Sprite(this.options.floatingLayer.spriteSheet);
    this.healthBar.gotoAndStop(key);
    offset = this.getOffset('aboveHead');
    this.healthBar.scaleX = this.healthBar.scaleY = 1 / this.options.floatingLayer.resolutionFactor;
    this.healthBar.name = 'health bar';
    this.options.floatingLayer.addChild(this.healthBar);
    this.updateHealthBar();
    this.lastHealth = null;
    if (!hadHealthBar) {
      return this.listenTo(this.options.floatingLayer, 'new-spritesheet', this.addHealthBar);
    }
  };

  Lank.prototype.getActionProp = function(prop, subProp, def) {
    var i, len, ref, ref1, val;
    if (def == null) {
      def = null;
    }
    ref1 = [(ref = this.currentAction) != null ? ref[prop] : void 0, this.thangType.get(prop)];
    for (i = 0, len = ref1.length; i < len; i++) {
      val = ref1[i];
      if ((val != null) && subProp) {
        val = val[subProp];
      }
      if (val != null) {
        return val;
      }
    }
    return def;
  };

  Lank.prototype.getOffset = function(prop) {
    var def, pos, ref, ref1, ref2, ref3, scale;
    def = {
      x: 0,
      y: {
        registration: 0,
        torso: -50,
        mouth: -60,
        aboveHead: -100
      }[prop]
    };
    pos = this.getActionProp('positions', prop, def);
    pos = {
      x: pos.x,
      y: pos.y
    };
    if (!this.isRaster) {
      scale = this.getActionProp('scale', null, 1);
      if (prop === 'registration') {
        scale *= this.sprite.parent.resolutionFactor;
      }
      pos.x *= scale;
      pos.y *= scale;
    }
    if (this.thang && prop !== 'registration') {
      pos.x *= (ref = (ref1 = this.thang.scaleFactorX) != null ? ref1 : this.thang.scaleFactor) != null ? ref : 1;
      pos.y *= (ref2 = (ref3 = this.thang.scaleFactorY) != null ? ref3 : this.thang.scaleFactor) != null ? ref2 : 1;
    }
    return pos;
  };

  Lank.prototype.createMarks = function() {
    if (!this.options.camera) {
      return;
    }
    if (this.thang) {
      if (this.thangType.get('shadow') !== 0) {
        return this.addMark('shadow').toggle(true);
      }
    }
  };

  Lank.prototype.updateMarks = function() {
    var i, j, len, len1, mark, name, range, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9;
    if (!this.options.camera) {
      return;
    }
    if ((ref = this.thang) != null ? ref.erroredOut : void 0) {
      this.addMark('repair', null, 'repair');
    }
    if ((ref1 = this.marks.repair) != null) {
      ref1.toggle((ref2 = this.thang) != null ? ref2.erroredOut : void 0);
    }
    if (this.selected) {
      ref3 = this.ranges;
      for (i = 0, len = ref3.length; i < len; i++) {
        range = ref3[i];
        this.marks[range['name']].toggle(true);
      }
    } else {
      ref4 = this.ranges;
      for (j = 0, len1 = ref4.length; j < len1; j++) {
        range = ref4[j];
        this.marks[range['name']].toggle(false);
      }
    }
    if (this.isMissile && this.thang.action === 'die') {
      if ((ref5 = this.marks.shadow) != null) {
        ref5.hide();
      }
    }
    ref6 = this.marks;
    for (name in ref6) {
      mark = ref6[name];
      mark.update();
    }
    if (((ref7 = this.thang) != null ? (ref8 = ref7.effectNames) != null ? ref8.length : void 0 : void 0) || ((ref9 = this.previousEffectNames) != null ? ref9.length : void 0)) {
      return this.updateEffectMarks();
    }
  };

  Lank.prototype.updateEffectMarks = function() {
    var effect, i, j, len, len1, mark, ref, ref1;
    if (_.isEqual(this.thang.effectNames, this.previousEffectNames)) {
      return;
    }
    if (this.stopped) {
      return;
    }
    ref = this.thang.effectNames;
    for (i = 0, len = ref.length; i < len; i++) {
      effect = ref[i];
      mark = this.addMark(effect, this.options.floatingLayer, effect);
      mark.statusEffect = true;
      mark.toggle('on');
      mark.show();
    }
    if (this.previousEffectNames) {
      ref1 = this.previousEffectNames;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        effect = ref1[j];
        if (indexOf.call(this.thang.effectNames, effect) >= 0) {
          continue;
        }
        mark = this.marks[effect];
        mark.toggle(false);
      }
    }
    if (this.thang.effectNames.length > 1 && !this.effectInterval) {
      this.rotateEffect();
      this.effectInterval = setInterval(this.rotateEffect, 1500);
    } else if (this.effectInterval && this.thang.effectNames.length <= 1) {
      clearInterval(this.effectInterval);
      this.effectInterval = null;
    }
    return this.previousEffectNames = this.thang.effectNames;
  };

  Lank.prototype.rotateEffect = function() {
    var effect, effects, i, len, m;
    effects = (function() {
      var i, len, ref, results;
      ref = _.values(this.marks);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        if (m.on && m.statusEffect && m.mark) {
          results.push(m.name);
        }
      }
      return results;
    }).call(this);
    if (!effects.length) {
      return;
    }
    effects.sort();
    if (this.effectIndex == null) {
      this.effectIndex = 0;
    }
    this.effectIndex = (this.effectIndex + 1) % effects.length;
    for (i = 0, len = effects.length; i < len; i++) {
      effect = effects[i];
      this.marks[effect].hide();
    }
    return this.marks[effects[this.effectIndex]].show();
  };

  Lank.prototype.setHighlight = function(to, delay) {
    var ref, ref1;
    if (to) {
      this.addMark('highlight', this.options.floatingLayer, 'highlight');
    }
    if ((ref = this.marks.highlight) != null) {
      ref.highlightDelay = delay;
    }
    return (ref1 = this.marks.highlight) != null ? ref1.toggle(to && !this.dimmed) : void 0;
  };

  Lank.prototype.setDimmed = function(dimmed) {
    var ref;
    this.dimmed = dimmed;
    return (ref = this.marks.highlight) != null ? ref.toggle(this.marks.highlight.on && !this.dimmed) : void 0;
  };

  Lank.prototype.setThang = function(thang1) {
    this.thang = thang1;
    return this.options.thang = this.thang;
  };

  Lank.prototype.setDebug = function(debug) {
    var d, ref;
    if (!(((ref = this.thang) != null ? ref.collides : void 0) && (this.options.camera != null))) {
      return;
    }
    if (debug) {
      this.addMark('debug', this.options.floatingLayer);
    }
    if (d = this.marks.debug) {
      d.toggle(debug);
      return d.updatePosition();
    }
  };

  Lank.prototype.addLabel = function(name, style) {
    var base;
    if ((base = this.labels)[name] == null) {
      base[name] = new Label({
        sprite: this,
        camera: this.options.camera,
        layer: this.options.textLayer,
        style: style
      });
    }
    return this.labels[name];
  };

  Lank.prototype.addMark = function(name, layer, thangType) {
    var base;
    if (thangType == null) {
      thangType = null;
    }
    if ((base = this.marks)[name] == null) {
      base[name] = new Mark({
        name: name,
        lank: this,
        camera: this.options.camera,
        layer: layer != null ? layer : this.options.groundLayer,
        thangType: thangType
      });
    }
    return this.marks[name];
  };

  Lank.prototype.removeMark = function(name) {
    this.marks[name].destroy();
    return delete this.marks[name];
  };

  Lank.prototype.notifySpeechUpdated = function(e) {
    e = _.clone(e);
    e.sprite = this;
    if (e.blurb == null) {
      e.blurb = '...';
    }
    e.thang = this.thang;
    return Backbone.Mediator.publish('sprite:speech-updated', e);
  };

  Lank.prototype.isTalking = function() {
    var ref, ref1;
    return Boolean(((ref = this.labels.dialogue) != null ? ref.text : void 0) || ((ref1 = this.labels.say) != null ? ref1.text : void 0));
  };

  Lank.prototype.onDialogue = function(e) {
    var label, ref, ref1, ref2, ref3, sound;
    if (((ref = this.thang) != null ? ref.id : void 0) !== e.spriteID) {
      return;
    }
    if (((ref1 = this.thang) != null ? ref1.id : void 0) !== 'Hero Placeholder') {
      label = this.addLabel('dialogue', Label.STYLE_DIALOGUE);
      label.setText(e.blurb || '...');
    }
    sound = (ref2 = e.sound) != null ? ref2 : AudioPlayer.soundForDialogue(e.message, this.thangType.get('soundTriggers'));
    if ((ref3 = this.dialogueSoundInstance) != null) {
      ref3.stop();
    }
    if (this.dialogueSoundInstance = this.playSound(sound, false)) {
      this.dialogueSoundInstance.addEventListener('complete', function() {
        return Backbone.Mediator.publish('sprite:dialogue-sound-completed', {});
      });
    }
    return this.notifySpeechUpdated(e);
  };

  Lank.prototype.onClearDialogue = function(e) {
    var ref, ref1, ref2;
    if (!((ref = this.labels.dialogue) != null ? ref.text : void 0)) {
      return;
    }
    if ((ref1 = this.labels.dialogue) != null) {
      ref1.setText(null);
    }
    if ((ref2 = this.dialogueSoundInstance) != null) {
      ref2.stop();
    }
    return this.notifySpeechUpdated({});
  };

  Lank.prototype.onSetLetterbox = function(e) {
    return this.letterboxOn = e.on;
  };

  Lank.prototype.setNameLabel = function(name) {
    var label;
    label = this.addLabel('name', Label.STYLE_NAME);
    return label.setText(name);
  };

  Lank.prototype.updateLabels = function() {
    var blurb, label, labelStyle, ls, name, ref, ref1, ref2, ref3, ref4, results;
    if (!this.thang) {
      return;
    }
    blurb = this.thang.health <= 0 ? null : this.thang.sayMessage;
    if (blurb === 'For Thoktar!' || blurb === 'Bones!' || blurb === 'Behead!' || blurb === 'Destroy!' || blurb === 'Die, humans!') {
      blurb = null;
    }
    if (/Hero Placeholder/.test(this.thang.id)) {
      labelStyle = Label.STYLE_DIALOGUE;
    } else {
      labelStyle = (ref = this.thang.labelStyle) != null ? ref : Label.STYLE_SAY;
    }
    if (blurb) {
      this.addLabel('say', labelStyle);
    }
    if ((ref1 = this.labels.say) != null ? ref1.setText(blurb) : void 0) {
      this.notifySpeechUpdated({
        blurb: blurb
      });
    }
    if (((ref2 = this.thang) != null ? ref2.variableNames : void 0) != null) {
      ls = this.addLabel('variableNames', Label.STYLE_VAR);
      ls.setText((ref3 = this.thang) != null ? ref3.variableNames : void 0);
    } else if (this.labels.variableNames) {
      this.labels.variableNames.destroy();
      delete this.labels.variableNames;
    }
    ref4 = this.labels;
    results = [];
    for (name in ref4) {
      label = ref4[name];
      results.push(label.update());
    }
    return results;
  };

  Lank.prototype.updateGold = function() {
    var gold, ref, ref1;
    if (!this.thang) {
      return;
    }
    if (this.thang.gold === this.lastGold) {
      return;
    }
    gold = Math.floor((ref = this.thang.gold) != null ? ref : 0);
    if (this.thang.world.age === 0) {
      gold = this.thang.world.initialTeamGold[this.thang.team].gold;
    }
    if (gold === this.lastGold) {
      return;
    }
    this.lastGold = gold;
    return Backbone.Mediator.publish('surface:gold-changed', {
      team: this.thang.team,
      gold: gold,
      goldEarned: Math.floor((ref1 = this.thang.goldEarned) != null ? ref1 : 0)
    });
  };

  Lank.prototype.shouldMuteMessage = function(m) {
    var ref, ref1, t0, t1;
    if ((ref = me.getAnnouncesActionAudioGroup()) === 'no-audio' || ref === 'just-take-damage') {
      if (m === 'moveRight' || m === 'moveUp' || m === 'moveDown' || m === 'moveLeft') {
        return true;
      }
      if (/^attack /.test(m)) {
        return true;
      }
      if (/^Repeating loop/.test(m)) {
        return true;
      }
      if (/^findNearestEnemy/.test(m)) {
        return true;
      }
    }
    if (m === 'moveRight' || m === 'moveUp' || m === 'moveDown' || m === 'moveLeft') {
      return false;
    }
    if (this.previouslySaidMessages == null) {
      this.previouslySaidMessages = {};
    }
    t0 = (ref1 = this.previouslySaidMessages[m]) != null ? ref1 : 0;
    t1 = new Date();
    this.previouslySaidMessages[m] = t1;
    if (t1 - t0 < 5 * 1000) {
      return true;
    }
    return false;
  };

  Lank.prototype.playSounds = function(withDelay, volume) {
    var action, event, i, len, offsetFrames, ref, ref1, ref2, sound;
    if (withDelay == null) {
      withDelay = true;
    }
    if (volume == null) {
      volume = 1.0;
    }
    ref1 = (ref = this.thang.currentEvents) != null ? ref : [];
    for (i = 0, len = ref1.length; i < len; i++) {
      event = ref1[i];
      if (event === 'take-damage' && ((ref2 = me.getAnnouncesActionAudioGroup()) === 'no-audio' || ref2 === 'without-take-damage')) {
        null;
      } else {
        this.playSound(event, withDelay, volume);
      }
      if (event === 'pay-bounty-gold' && this.thang.bountyGold > 25 && this.thang.team !== me.team) {
        AudioPlayer.playInterfaceSound('coin_1', 0.25);
      }
    }
    if (this.thang.actionActivated && (action = this.thang.getActionName()) !== 'say') {
      this.playSound(action, withDelay, volume);
    }
    if (this.thang.sayMessage && withDelay && !this.thang.silent && !this.shouldMuteMessage(this.thang.sayMessage)) {
      offsetFrames = Math.abs(this.thang.sayStartTime - this.thang.world.age) / this.thang.world.dt;
      if (offsetFrames <= 2) {
        sound = AudioPlayer.soundForDialogue(this.thang.sayMessage, this.thangType.get('soundTriggers'));
        return this.playSound(sound, false, volume);
      }
    }
  };

  Lank.prototype.playSound = function(sound, withDelay, volume) {
    var delay, instance, name, ref;
    if (withDelay == null) {
      withDelay = true;
    }
    if (volume == null) {
      volume = 1.0;
    }
    if (_.isString(sound)) {
      sound = (ref = this.thangType.get('soundTriggers')) != null ? ref[sound] : void 0;
    }
    if (_.isArray(sound)) {
      sound = sound[Math.floor(Math.random() * sound.length)];
    }
    if (!sound) {
      return null;
    }
    delay = withDelay && sound.delay ? 1000 * sound.delay / createjs.Ticker.getFPS() : 0;
    name = AudioPlayer.nameForSoundReference(sound);
    AudioPlayer.preloadSoundReference(sound);
    instance = AudioPlayer.playSound(name, volume, delay, this.getWorldPosition());
    return instance;
  };

  Lank.prototype.onMove = function(e) {
    var args, distance, heading, offset, pos, ref, target;
    if (e.spriteID !== ((ref = this.thang) != null ? ref.id : void 0)) {
      return;
    }
    pos = e.pos;
    if (_.isArray(pos)) {
      pos = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Vector, pos, function(){});
    } else if (_.isString(pos)) {
      if (!(pos in this.options.sprites)) {
        return console.warn('Couldn\'t find target sprite', pos, 'from', this.options.sprites);
      }
      target = this.options.sprites[pos].thang;
      heading = Vector.subtract(target.pos, this.thang.pos).normalize();
      distance = this.thang.pos.distance(target.pos);
      offset = Math.max(target.width, target.height, 2) / 2 + 3;
      pos = Vector.add(this.thang.pos, heading.multiply(distance - offset));
    }
    Backbone.Mediator.publish('level:sprite-clear-dialogue', {});
    this.onClearDialogue();
    args = [pos];
    if (e.duration != null) {
      args.push(e.duration);
    }
    return this.move.apply(this, args);
  };

  Lank.prototype.move = function(pos, duration, endAnimation) {
    var base, ease, endFunc, z;
    if (duration == null) {
      duration = 2000;
    }
    if (endAnimation == null) {
      endAnimation = 'idle';
    }
    this.updateShadow();
    if (!duration) {
      if (this.lastTween) {
        createjs.Tween.removeTweens(this.shadow.pos);
      }
      this.lastTween = null;
      z = this.shadow.pos.z;
      this.shadow.pos = pos;
      this.shadow.pos.z = z;
      if (typeof (base = this.sprite).gotoAndPlay === "function") {
        base.gotoAndPlay(endAnimation);
      }
      return;
    }
    this.shadow.action = 'move';
    this.shadow.actionActivated = true;
    this.pointToward(pos);
    this.possessed = true;
    this.update(true);
    ease = createjs.Ease.getPowInOut(2.2);
    if (this.lastTween) {
      ease = createjs.Ease.getPowOut(1.2);
      createjs.Tween.removeTweens(this.shadow.pos);
    }
    endFunc = (function(_this) {
      return function() {
        _this.lastTween = null;
        if (!_this.stillLoading) {
          _this.sprite.gotoAndPlay(endAnimation);
        }
        _this.shadow.action = 'idle';
        _this.update(true);
        return _this.possessed = false;
      };
    })(this);
    return this.lastTween = createjs.Tween.get(this.shadow.pos).to({
      x: pos.x,
      y: pos.y
    }, duration, ease).call(endFunc);
  };

  Lank.prototype.pointToward = function(pos) {
    this.shadow.rotation = Math.atan2(pos.y - this.shadow.pos.y, pos.x - this.shadow.pos.x);
    if ((this.shadow.rotation * 180 / Math.PI) % 90 === 0) {
      return this.shadow.rotation += 0.01;
    }
  };

  Lank.prototype.updateShadow = function() {
    if (!this.shadow) {
      this.shadow = {};
    }
    this.shadow.pos = this.thang.pos;
    this.shadow.rotation = this.thang.rotation;
    this.shadow.action = this.thang.action;
    return this.shadow.actionActivated = this.thang.actionActivated;
  };

  Lank.prototype.updateHealthBar = function() {
    var bounds, offset;
    if (!this.healthBar) {
      return;
    }
    bounds = this.healthBar.getBounds();
    offset = this.getOffset('aboveHead');
    this.healthBar.x = this.sprite.x - (-offset.x + bounds.width / 2 / this.options.floatingLayer.resolutionFactor);
    return this.healthBar.y = this.sprite.y - (-offset.y + bounds.height / 2 / this.options.floatingLayer.resolutionFactor);
  };

  Lank.prototype.destroy = function() {
    var label, mark, name, p, ref, ref1, ref2, ref3, ref4;
    ref = this.marks;
    for (name in ref) {
      mark = ref[name];
      mark.destroy();
    }
    ref1 = this.labels;
    for (name in ref1) {
      label = ref1[name];
      label.destroy();
    }
    if (p = (ref2 = this.healthBar) != null ? ref2.parent : void 0) {
      p.removeChild(this.healthBar);
    }
    if ((ref3 = this.sprite) != null) {
      ref3.off('animationend', this.playNextAction);
    }
    if (this.effectInterval) {
      clearInterval(this.effectInterval);
    }
    if ((ref4 = this.dialogueSoundInstance) != null) {
      ref4.removeAllEventListeners();
    }
    return Lank.__super__.destroy.call(this);
  };

  return Lank;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/Lank.js.map
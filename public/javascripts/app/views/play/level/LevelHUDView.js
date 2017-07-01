require.register("views/play/level/LevelHUDView", function(exports, require, module) {
var CocoView, LevelHUDView, prop_template, template, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoView = require('views/core/CocoView');

template = require('templates/play/level/hud');

prop_template = require('templates/play/level/hud_prop');

utils = require('core/utils');

module.exports = LevelHUDView = (function(superClass) {
  extend(LevelHUDView, superClass);

  function LevelHUDView() {
    return LevelHUDView.__super__.constructor.apply(this, arguments);
  }

  LevelHUDView.prototype.id = 'thang-hud';

  LevelHUDView.prototype.template = template;

  LevelHUDView.prototype.subscriptions = {
    'surface:frame-changed': 'onFrameChanged',
    'level:disable-controls': 'onDisableControls',
    'level:enable-controls': 'onEnableControls',
    'surface:sprite-selected': 'onSpriteSelected',
    'sprite:thang-began-talking': 'onThangBeganTalking',
    'sprite:thang-finished-talking': 'onThangFinishedTalking',
    'god:new-world-created': 'onNewWorld'
  };

  LevelHUDView.prototype.events = {
    'click': 'onClick'
  };

  LevelHUDView.prototype.afterRender = function() {
    LevelHUDView.__super__.afterRender.call(this);
    this.$el.addClass('no-selection');
    if (this.options.level.get('hidesHUD')) {
      this.hidesHUD = true;
      return this.$el.addClass('hide-hud-properties');
    }
  };

  LevelHUDView.prototype.onClick = function(e) {
    if (!$(e.target).parents('.thang-props').length) {
      return Backbone.Mediator.publish('tome:focus-editor', {});
    }
  };

  LevelHUDView.prototype.onFrameChanged = function(e) {
    this.timeProgress = e.progress;
    return this.update();
  };

  LevelHUDView.prototype.onDisableControls = function(e) {
    if (e.controls && !(indexOf.call(e.controls, 'hud') >= 0)) {
      return;
    }
    this.disabled = true;
    return this.$el.addClass('controls-disabled');
  };

  LevelHUDView.prototype.onEnableControls = function(e) {
    if (e.controls && !(indexOf.call(e.controls, 'hud') >= 0)) {
      return;
    }
    this.disabled = false;
    return this.$el.removeClass('controls-disabled');
  };

  LevelHUDView.prototype.onSpriteSelected = function(e) {
    var ref;
    if (this.disabled) {
      return;
    }
    return this.setThang(e.thang, (ref = e.sprite) != null ? ref.thangType : void 0);
  };

  LevelHUDView.prototype.onNewWorld = function(e) {
    var hadThang;
    hadThang = this.thang;
    if (this.thang) {
      this.thang = e.world.thangMap[this.thang.id];
    }
    if (hadThang && !this.thang) {
      return this.setThang(null, null);
    }
  };

  LevelHUDView.prototype.setThang = function(thang, thangType) {
    if ((thang == null) && (this.thang == null)) {
      return;
    }
    if ((thang != null) && (this.thang != null) && thang.id === this.thang.id) {
      return;
    }
    if ((thang != null) && this.hidesHUD && thang.id !== 'Hero Placeholder') {
      return;
    }
    if (!thang) {
      return;
    }
    this.thang = thang;
    this.thangType = thangType;
    if (!this.thang) {
      return;
    }
    this.createAvatar(thangType, this.thang);
    this.createProperties();
    return this.update();
  };

  LevelHUDView.prototype.createAvatar = function(thangType, thang, colorConfig) {
    var args, newCanvas, options, ref, ref1, stage, team, wrapper;
    if (!thangType.isFullyLoaded()) {
      args = arguments;
      if (!this.listeningToCreateAvatar) {
        this.listenToOnce(thangType, 'sync', function() {
          return this.createAvatar.apply(this, args);
        });
        this.listeningToCreateAvatar = true;
      }
      return;
    }
    this.listeningToCreateAvatar = false;
    options = thang.getLankOptions() || {};
    options.async = false;
    if (colorConfig) {
      options.colorConfig = colorConfig;
    }
    wrapper = this.$el.find('.thang-canvas-wrapper');
    team = (ref = this.thang) != null ? ref.team : void 0;
    wrapper.removeClass(function(i, css) {
      return (css.match(/\bteam-\S+/g) || []).join(' ');
    });
    wrapper.addClass("team-" + team);
    if (thangType.get('raster')) {
      wrapper.empty().append($('<img draggable="false"/>').addClass('avatar').attr('src', '/file/' + thangType.get('raster')));
    } else {
      if (!(stage = thangType.getPortraitStage(options, 100))) {
        return;
      }
      newCanvas = $(stage.canvas).addClass('thang-canvas avatar');
      wrapper.empty().append(newCanvas);
      stage.update();
      if ((ref1 = this.stage) != null) {
        ref1.stopTalking();
      }
      this.stage = stage;
    }
    return wrapper.append($('<img draggable="false" />').addClass('avatar-frame').attr('src', '/images/level/thang_avatar_frame.png'));
  };

  LevelHUDView.prototype.onThangBeganTalking = function(e) {
    var ref;
    if (!(this.stage && this.thang === e.thang)) {
      return;
    }
    return (ref = this.stage) != null ? ref.startTalking() : void 0;
  };

  LevelHUDView.prototype.onThangFinishedTalking = function(e) {
    var ref;
    if (!(this.stage && this.thang === e.thang)) {
      return;
    }
    return (ref = this.stage) != null ? ref.stopTalking() : void 0;
  };

  LevelHUDView.prototype.createProperties = function() {
    var i, j, len, name, pel, prop, propNames, props, ref, ref1, ref2;
    if (this.options.level.isType('game-dev')) {
      name = 'Game';
    } else if ((ref = this.thang.id) === 'Hero Placeholder' || ref === 'Hero Placeholder 1') {
      name = ((ref1 = this.thangType) != null ? ref1.getHeroShortName() : void 0) || 'Hero';
    } else {
      name = this.thang.hudName || (this.thang.type ? this.thang.id + " - " + this.thang.type : this.thang.id);
    }
    utils.replaceText(this.$el.find('.thang-name'), name);
    props = this.$el.find('.thang-props');
    props.find('.prop').remove();
    propNames = this.thang.hudProperties;
    ref2 = propNames != null ? propNames : [];
    for (i = j = 0, len = ref2.length; j < len; i = ++j) {
      prop = ref2[i];
      pel = this.createPropElement(prop);
      if (pel == null) {
        continue;
      }
      if (pel.find('.bar').is('*') && props.find('.bar').is('*')) {
        props.find('.bar-prop').last().after(pel);
      } else {
        props.append(pel);
      }
    }
    return null;
  };

  LevelHUDView.prototype.update = function() {
    var j, len, prop, ref, ref1, results;
    if (!this.thang) {
      return;
    }
    this.$el.find('.thang-props-column').toggleClass('nonexistent', !this.thang.exists);
    if (this.thang.exists) {
      ref1 = (ref = this.thang.hudProperties) != null ? ref : [];
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        prop = ref1[j];
        results.push(this.updatePropElement(prop, this.thang[prop]));
      }
      return results;
    }
  };

  LevelHUDView.prototype.createPropElement = function(prop) {
    var context;
    if (prop === 'maxHealth') {
      return null;
    }
    context = {
      prop: prop,
      hasIcon: prop === 'health' || prop === 'pos' || prop === 'target' || prop === 'collectedThangIDs' || prop === 'gold' || prop === 'bountyGold' || prop === 'value' || prop === 'visualRange' || prop === 'attackDamage' || prop === 'attackRange' || prop === 'maxSpeed' || prop === 'attackNearbyEnemyRange',
      hasBar: prop === 'health'
    };
    return $(prop_template(context));
  };

  LevelHUDView.prototype.updatePropElement = function(prop, val) {
    var cooldown, dps, labelText, max, pel, percent, regen, s;
    pel = this.$el.find('.thang-props *[name=' + prop + ']');
    if (prop === 'maxHealth') {
      return;
    }
    if (prop === 'health') {
      max = this.thang['max' + prop.charAt(0).toUpperCase() + prop.slice(1)];
      regen = this.thang[prop + 'ReplenishRate'];
      percent = Math.round(100 * val / max);
      pel.find('.bar').css('width', percent + '%');
      labelText = prop + ': ' + this.formatValue(prop, val) + ' / ' + this.formatValue(prop, max);
      if (regen) {
        labelText += ' (+' + this.formatValue(prop, regen) + '/s)';
      }
      utils.replaceText(pel.find('.bar-prop-value'), Math.round(val));
    } else {
      s = this.formatValue(prop, val);
      labelText = prop + ": " + s;
      if (prop === 'attackDamage') {
        cooldown = this.thang.actions.attack.cooldown;
        dps = this.thang.attackDamage / cooldown;
        labelText += " / " + (cooldown.toFixed(2)) + "s (DPS: " + (dps.toFixed(2)) + ")";
      }
      utils.replaceText(pel.find('.prop-value'), s);
    }
    pel.attr('title', labelText);
    return pel;
  };

  LevelHUDView.prototype.formatValue = function(prop, val) {
    if (prop === 'target' && !val) {
      val = this.thang['targetPos'];
      if (val != null ? val.isZero() : void 0) {
        val = null;
      }
    }
    if (prop === 'rotation') {
      return (val * 180 / Math.PI).toFixed(0) + '˚';
    }
    if (prop.search(/Range$/) !== -1) {
      return val + 'm';
    }
    if (typeof val === 'number') {
      if (Math.round(val) === val || prop === 'gold') {
        return val.toFixed(0);
      }
      if ((-10 < val && val < 10)) {
        return val.toFixed(2);
      }
      if ((-100 < val && val < 100)) {
        return val.toFixed(1);
      }
      return val.toFixed(0);
    }
    if (val && typeof val === 'object') {
      if (val.id) {
        return val.id;
      } else if (val.x && val.y) {
        return "x: " + (val.x.toFixed(0)) + " y: " + (val.y.toFixed(0));
      }
    } else if (val == null) {
      return 'No ' + prop;
    }
    return val;
  };

  LevelHUDView.prototype.destroy = function() {
    var ref;
    if ((ref = this.stage) != null) {
      ref.stopTalking();
    }
    return LevelHUDView.__super__.destroy.call(this);
  };

  return LevelHUDView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelHUDView.js.map
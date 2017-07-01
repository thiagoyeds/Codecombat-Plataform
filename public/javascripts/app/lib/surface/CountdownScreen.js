require.register("lib/surface/CountdownScreen", function(exports, require, module) {
var CocoClass, CountdownScreen,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoClass = require('core/CocoClass');

module.exports = CountdownScreen = (function(superClass) {
  extend(CountdownScreen, superClass);

  CountdownScreen.prototype.subscriptions = {
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded'
  };

  function CountdownScreen(options) {
    this.decrementCountdown = bind(this.decrementCountdown, this);
    CountdownScreen.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.showsCountdown = options.showsCountdown;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  CountdownScreen.prototype.destroy = function() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    return CountdownScreen.__super__.destroy.call(this);
  };

  CountdownScreen.prototype.onCastingBegins = function(e) {
    if (!e.preload) {
      return this.show();
    }
  };

  CountdownScreen.prototype.onCastingEnds = function(e) {
    return this.hide();
  };

  CountdownScreen.prototype.toString = function() {
    return '<CountdownScreen>';
  };

  CountdownScreen.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimScreen.graphics.beginFill('rgba(0,0,0,0.5)').rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    this.dimLayer.alpha = 0;
    return this.dimLayer.addChild(this.makeCountdownText());
  };

  CountdownScreen.prototype.makeCountdownText = function() {
    var size, text;
    size = Math.ceil(this.camera.canvasHeight / 2);
    text = new createjs.Text('3...', size + "px Open Sans Condensed", '#F7B42C');
    text.shadow = new createjs.Shadow('#000', Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 120));
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = this.camera.canvasWidth / 2;
    text.y = this.camera.canvasHeight / 2;
    this.text = text;
    return text;
  };

  CountdownScreen.prototype.show = function() {
    if (this.showing) {
      return;
    }
    createjs.Tween.removeTweens(this.dimLayer);
    if (this.showsCountdown) {
      this.dimLayer.alpha = 0;
      this.showing = true;
      createjs.Tween.get(this.dimLayer).to({
        alpha: 1
      }, 500);
      this.secondsRemaining = 3;
      this.countdownInterval = setInterval(this.decrementCountdown, 1000);
      this.updateText();
      return this.layer.addChild(this.dimLayer);
    } else {
      return this.endCountdown();
    }
  };

  CountdownScreen.prototype.hide = function(duration) {
    if (duration == null) {
      duration = 500;
    }
    if (!this.showing) {
      return;
    }
    this.showing = false;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 0
    }, duration).call((function(_this) {
      return function() {
        if (!_this.destroyed) {
          return _this.layer.removeChild(_this.dimLayer);
        }
      };
    })(this));
  };

  CountdownScreen.prototype.decrementCountdown = function() {
    if (this.destroyed) {
      return;
    }
    --this.secondsRemaining;
    this.updateText();
    if (!this.secondsRemaining) {
      return this.endCountdown();
    }
  };

  CountdownScreen.prototype.updateText = function() {
    return this.text.text = this.secondsRemaining ? this.secondsRemaining + "..." : '0!';
  };

  CountdownScreen.prototype.endCountdown = function() {
    console.log('should actually start in 1s');
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = null;
    return this.hide();
  };

  CountdownScreen.prototype.onRealTimePlaybackStarted = function(e) {
    return this.show();
  };

  CountdownScreen.prototype.onRealTimePlaybackEnded = function(e) {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = null;
    return this.hide(Math.max(500, 1000 * (this.secondsRemaining || 0)));
  };

  return CountdownScreen;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/CountdownScreen.js.map
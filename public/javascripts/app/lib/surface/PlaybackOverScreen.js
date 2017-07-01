require.register("lib/surface/PlaybackOverScreen", function(exports, require, module) {
var CocoClass, PlaybackOverScreen,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CocoClass = require('core/CocoClass');

module.exports = PlaybackOverScreen = (function(superClass) {
  extend(PlaybackOverScreen, superClass);

  PlaybackOverScreen.prototype.subscriptions = {
    'goal-manager:new-goal-states': 'onNewGoalStates'
  };

  function PlaybackOverScreen(options) {
    PlaybackOverScreen.__super__.constructor.call(this);
    if (options == null) {
      options = {};
    }
    this.camera = options.camera;
    this.layer = options.layer;
    this.playerNames = options.playerNames;
    if (!this.camera) {
      console.error(this.toString(), 'needs a camera.');
    }
    if (!this.layer) {
      console.error(this.toString(), 'needs a layer.');
    }
    this.build();
  }

  PlaybackOverScreen.prototype.toString = function() {
    return '<PlaybackOverScreen>';
  };

  PlaybackOverScreen.prototype.build = function() {
    this.dimLayer = new createjs.Container();
    this.dimLayer.mouseEnabled = this.dimLayer.mouseChildren = false;
    this.dimLayer.addChild(this.dimScreen = new createjs.Shape());
    this.dimLayer.alpha = 0;
    return this.layer.addChild(this.dimLayer);
  };

  PlaybackOverScreen.prototype.makeVictoryText = function() {
    var s, size, text;
    s = '';
    size = Math.ceil(this.camera.canvasHeight / 6);
    text = new createjs.Text(s, size + "px Open Sans Condensed", '#F7B42C');
    text.shadow = new createjs.Shadow('#000', Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 300), Math.ceil(this.camera.canvasHeight / 120));
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.x = 0.5 * this.camera.canvasWidth;
    text.y = 0.8 * this.camera.canvasHeight;
    this.dimLayer.addChild(text);
    return this.text = text;
  };

  PlaybackOverScreen.prototype.show = function() {
    if (this.showing) {
      return;
    }
    this.showing = true;
    if (!this.color) {
      this.updateColor('rgba(212, 212, 212, 0.4)');
    }
    this.dimLayer.alpha = 0;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 1
    }, 500);
  };

  PlaybackOverScreen.prototype.hide = function() {
    if (!this.showing) {
      return;
    }
    this.showing = false;
    createjs.Tween.removeTweens(this.dimLayer);
    return createjs.Tween.get(this.dimLayer).to({
      alpha: 0
    }, 500);
  };

  PlaybackOverScreen.prototype.onNewGoalStates = function(e) {
    var color, failure, incomplete, success, timedOut;
    success = e.overallStatus === 'success';
    failure = e.overallStatus === 'failure';
    timedOut = e.timedOut;
    incomplete = !success && !failure && !timedOut;
    color = failure ? 'rgba(255, 128, 128, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    this.updateColor(color);
    return this.updateText(e);
  };

  PlaybackOverScreen.prototype.updateColor = function(color) {
    if (color === this.color) {
      return;
    }
    this.dimScreen.graphics.clear().beginFill(color).rect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    if (this.color) {
      this.dimLayer.updateCache();
    } else {
      this.dimLayer.cache(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
    }
    return this.color = color;
  };

  PlaybackOverScreen.prototype.updateText = function(goalEvent) {
    var g, goal, goals, i, len, overallStatus, ref, ref1, ref2, statuses, team, teamGoals, teamOverallStatuses;
    if (!_.size(this.playerNames)) {
      return;
    }
    teamOverallStatuses = {};
    goals = goalEvent.goalStates ? _.values(goalEvent.goalStates) : [];
    goals = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = goals.length; i < len; i++) {
        g = goals[i];
        if (!g.optional) {
          results.push(g);
        }
      }
      return results;
    })();
    ref = ['humans', 'ogres'];
    for (i = 0, len = ref.length; i < len; i++) {
      team = ref[i];
      teamGoals = (function() {
        var j, len1, ref1, results;
        results = [];
        for (j = 0, len1 = goals.length; j < len1; j++) {
          g = goals[j];
          if ((ref1 = g.team) === (void 0) || ref1 === team) {
            results.push(g);
          }
        }
        return results;
      })();
      statuses = (function() {
        var j, len1, results;
        results = [];
        for (j = 0, len1 = teamGoals.length; j < len1; j++) {
          goal = teamGoals[j];
          results.push(goal.status);
        }
        return results;
      })();
      if (statuses.length > 0 && _.every(statuses, function(s) {
        return s === 'success';
      })) {
        overallStatus = 'success';
      }
      if (statuses.length > 0 && indexOf.call(statuses, 'failure') >= 0) {
        overallStatus = 'failure';
      }
      teamOverallStatuses[team] = overallStatus;
    }
    if (!this.text) {
      this.makeVictoryText();
    }
    if (teamOverallStatuses.humans === 'success') {
      this.text.color = '#E62B1E';
      this.text.text = (((ref1 = this.playerNames.humans) != null ? ref1 : $.i18n.t('ladder.red_ai')) + ' ' + $.i18n.t('ladder.wins')).toLocaleUpperCase();
    } else if (teamOverallStatuses.ogres === 'success') {
      this.text.color = '#0597FF';
      this.text.text = (((ref2 = this.playerNames.ogres) != null ? ref2 : $.i18n.t('ladder.blue_ai')) + ' ' + $.i18n.t('ladder.wins')).toLocaleUpperCase();
    } else {
      this.text.color = '#F7B42C';
      if (goalEvent.timedOut) {
        this.text.text = 'TIMED OUT';
      } else {
        this.text.text = 'INCOMPLETE';
      }
    }
    return this.dimLayer.updateCache();
  };

  return PlaybackOverScreen;

})(CocoClass);
});

;
//# sourceMappingURL=/javascripts/app/lib/surface/PlaybackOverScreen.js.map
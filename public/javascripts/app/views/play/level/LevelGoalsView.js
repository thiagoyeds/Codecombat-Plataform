require.register("views/play/level/LevelGoalsView", function(exports, require, module) {
var CocoView, LevelGoalsView, me, stateIconMap, template, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/goals');

me = require('core/auth').me;

utils = require('core/utils');

stateIconMap = {
  success: 'glyphicon-ok',
  failure: 'glyphicon-remove'
};

module.exports = LevelGoalsView = (function(superClass) {
  extend(LevelGoalsView, superClass);

  LevelGoalsView.prototype.id = 'goals-view';

  LevelGoalsView.prototype.template = template;

  LevelGoalsView.prototype.className = 'secret expanded';

  LevelGoalsView.prototype.playbackEnded = false;

  LevelGoalsView.prototype.subscriptions = {
    'goal-manager:new-goal-states': 'onNewGoalStates',
    'tome:cast-spells': 'onTomeCast',
    'level:set-letterbox': 'onSetLetterbox',
    'level:set-playing': 'onSetPlaying',
    'surface:playback-restarted': 'onSurfacePlaybackRestarted',
    'surface:playback-ended': 'onSurfacePlaybackEnded'
  };

  LevelGoalsView.prototype.events = {
    'mouseenter': function() {
      this.mouseEntered = true;
      return this.updatePlacement();
    },
    'mouseleave': function() {
      this.mouseEntered = false;
      return this.updatePlacement();
    }
  };

  function LevelGoalsView(options) {
    this.playToggleSound = bind(this.playToggleSound, this);
    LevelGoalsView.__super__.constructor.call(this, options);
    this.level = options.level;
  }

  LevelGoalsView.prototype.onNewGoalStates = function(e) {
    var classToShow, completed, dead, firstRun, goal, goals, i, iconClass, len, li, list, ref, state, targeted, text;
    firstRun = this.previousGoalStatus == null;
    if (this.previousGoalStatus == null) {
      this.previousGoalStatus = {};
    }
    this.$el.find('.goal-status').addClass('secret');
    classToShow = null;
    if (e.overallStatus === 'success') {
      classToShow = 'success';
    }
    if (e.overallStatus === 'failure') {
      classToShow = 'failure';
    }
    if (e.timedOut) {
      if (classToShow == null) {
        classToShow = 'timed-out';
      }
    }
    if (classToShow == null) {
      classToShow = 'incomplete';
    }
    this.$el.find('.goal-status.' + classToShow).removeClass('secret');
    list = $('#primary-goals-list', this.$el);
    list.empty();
    goals = [];
    ref = e.goals;
    for (i = 0, len = ref.length; i < len; i++) {
      goal = ref[i];
      state = e.goalStates[goal.id];
      if (goal.optional && this.level.isType('course') && state.status !== 'success') {
        continue;
      }
      if (goal.hiddenGoal) {
        if (goal.optional && state.status !== 'success') {
          continue;
        }
        if (!goal.optional && state.status !== 'failure') {
          continue;
        }
      }
      if (goal.team && me.team !== goal.team) {
        continue;
      }
      text = utils.i18n(goal, 'name');
      if (state.killed) {
        dead = _.filter(_.values(state.killed)).length;
        targeted = _.values(state.killed).length;
        if (targeted > 1) {
          if (goal.isPositive) {
            completed = dead;
          } else {
            completed = targeted - dead;
          }
          text = text + (" (" + completed + "/" + targeted + ")");
        }
      }
      li = $('<li></li>').addClass("status-" + state.status).text(text);
      iconClass = stateIconMap[state.status];
      li.prepend($('<i></i>').addClass("glyphicon " + (iconClass || '')));
      list.append(li);
      goals.push(goal);
      if (!firstRun && state.status === 'success' && this.previousGoalStatus[goal.id] !== 'success') {
        this.soundToPlayWhenPlaybackEnded = 'goal-success';
      } else if (!firstRun && state.status !== 'success' && this.previousGoalStatus[goal.id] === 'success') {
        this.soundToPlayWhenPlaybackEnded = 'goal-incomplete-again';
      } else {
        this.soundToPlayWhenPlaybackEnded = null;
      }
      this.previousGoalStatus[goal.id] = state.status;
    }
    if (goals.length > 0 && this.$el.hasClass('secret')) {
      this.$el.removeClass('secret');
      this.lastSizeTweenTime = new Date();
    }
    return this.updatePlacement();
  };

  LevelGoalsView.prototype.onTomeCast = function(e) {
    if (e.preload) {
      return;
    }
    this.$el.find('.goal-status').addClass('secret');
    return this.$el.find('.goal-status.running').removeClass('secret');
  };

  LevelGoalsView.prototype.onSetPlaying = function(e) {
    if (!e.playing) {
      return;
    }
    this.mouseEntered = false;
    this.expanded = true;
    return this.updatePlacement();
  };

  LevelGoalsView.prototype.onSurfacePlaybackRestarted = function() {
    this.playbackEnded = false;
    this.$el.removeClass('brighter');
    this.lastSizeTweenTime = new Date();
    return this.updatePlacement();
  };

  LevelGoalsView.prototype.onSurfacePlaybackEnded = function() {
    if (this.level.isType('game-dev')) {
      return;
    }
    this.playbackEnded = true;
    this.updateHeight();
    this.$el.addClass('brighter');
    this.lastSizeTweenTime = new Date();
    this.updatePlacement();
    if (this.soundToPlayWhenPlaybackEnded) {
      return this.playSound(this.soundToPlayWhenPlaybackEnded);
    }
  };

  LevelGoalsView.prototype.updateHeight = function() {
    if (this.$el.hasClass('brighter') || this.$el.hasClass('secret')) {
      return;
    }
    if ((new Date() - this.lastSizeTweenTime) < 500) {
      return;
    }
    return this.normalHeight = this.$el.outerHeight();
  };

  LevelGoalsView.prototype.updatePlacement = function() {
    var expand, height, sound, top;
    expand = this.playbackEnded !== this.mouseEntered;
    if (expand === this.expanded) {
      return;
    }
    this.updateHeight();
    sound = expand ? 'goals-expand' : 'goals-collapse';
    if (expand) {
      top = -5;
    } else {
      height = this.normalHeight;
      if (!height || this.playbackEnded) {
        height = this.$el.outerHeight();
      }
      top = 41 - height;
    }
    this.$el.css('top', top);
    if (this.soundTimeout) {
      clearTimeout(this.soundTimeout);
      this.soundTimeout = null;
    } else if (this.expanded != null) {
      this.soundTimeout = _.delay(this.playToggleSound, 500, sound);
    }
    return this.expanded = expand;
  };

  LevelGoalsView.prototype.playToggleSound = function(sound) {
    if (this.destroyed) {
      return;
    }
    if (!this.options.level.isType('game-dev')) {
      this.playSound(sound);
    }
    return this.soundTimeout = null;
  };

  LevelGoalsView.prototype.onSetLetterbox = function(e) {
    this.$el.toggle(!e.on);
    return this.updatePlacement();
  };

  return LevelGoalsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelGoalsView.js.map
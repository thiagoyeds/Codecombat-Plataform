require.register("templates/play/level/level-flags-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<button title=\"G: Place a green flag\" class=\"flag-button btn btn-lg green-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">G</span>reen</span></button><button title=\"B: Place a black flag\" class=\"flag-button btn btn-lg black-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">B</span>lack</span></button><button title=\"V: Place a violet flag\" class=\"flag-button btn btn-lg violet-flag\"><span class=\"glyphicon glyphicon-flag\"></span><span class=\"flag-caption\"><span class=\"flag-shortcut\">V</span>iolet</span></button>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/play/level/LevelFlagsView", function(exports, require, module) {
var CocoView, LevelFlagsView, me, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/level-flags-view');

me = require('core/auth').me;

module.exports = LevelFlagsView = (function(superClass) {
  extend(LevelFlagsView, superClass);

  LevelFlagsView.prototype.id = 'level-flags-view';

  LevelFlagsView.prototype.template = template;

  LevelFlagsView.prototype.className = 'secret';

  LevelFlagsView.prototype.subscriptions = {
    'playback:real-time-playback-started': 'onRealTimePlaybackStarted',
    'playback:real-time-playback-ended': 'onRealTimePlaybackEnded',
    'surface:stage-mouse-down': 'onStageMouseDown',
    'god:new-world-created': 'onNewWorld',
    'god:streaming-world-updated': 'onNewWorld',
    'surface:remove-flag': 'onRemoveFlag'
  };

  LevelFlagsView.prototype.events = {
    'click .green-flag': function() {
      return this.onFlagSelected({
        color: 'green',
        source: 'button'
      });
    },
    'click .black-flag': function() {
      return this.onFlagSelected({
        color: 'black',
        source: 'button'
      });
    },
    'click .violet-flag': function() {
      return this.onFlagSelected({
        color: 'violet',
        source: 'button'
      });
    }
  };

  LevelFlagsView.prototype.shortcuts = {
    'g': function() {
      return this.onFlagSelected({
        color: 'green',
        source: 'shortcut'
      });
    },
    'b': function() {
      return this.onFlagSelected({
        color: 'black',
        source: 'shortcut'
      });
    },
    'v': function() {
      return this.onFlagSelected({
        color: 'violet',
        source: 'shortcut'
      });
    },
    'esc': function() {
      return this.onFlagSelected({
        color: null,
        source: 'shortcut'
      });
    },
    'delete, del, backspace': 'onDeletePressed'
  };

  function LevelFlagsView(options) {
    LevelFlagsView.__super__.constructor.call(this, options);
    this.levelID = options.levelID;
    this.world = options.world;
  }

  LevelFlagsView.prototype.onRealTimePlaybackStarted = function(e) {
    this.realTime = true;
    this.$el.show();
    this.flags = {};
    return this.flagHistory = [];
  };

  LevelFlagsView.prototype.onRealTimePlaybackEnded = function(e) {
    this.onFlagSelected({
      color: null
    });
    this.realTime = false;
    return this.$el.hide();
  };

  LevelFlagsView.prototype.onFlagSelected = function(e) {
    var color;
    if (!this.realTime) {
      return;
    }
    if (e.color) {
      this.playSound('menu-button-click');
    }
    color = e.color === this.flagColor ? null : e.color;
    this.flagColor = color;
    Backbone.Mediator.publish('level:flag-color-selected', {
      color: color
    });
    this.$el.find('.flag-button').removeClass('active');
    if (color) {
      return this.$el.find("." + color + "-flag").addClass('active');
    }
  };

  LevelFlagsView.prototype.onStageMouseDown = function(e) {
    var flag, now, pos, ref;
    if (!(this.flagColor && this.realTime)) {
      return;
    }
    this.playSound('menu-button-click');
    pos = {
      x: e.worldPos.x,
      y: e.worldPos.y
    };
    now = this.world.dt * this.world.frames.length;
    flag = {
      player: me.id,
      team: me.team,
      color: this.flagColor,
      pos: pos,
      time: now,
      active: true,
      source: 'click'
    };
    this.flags[this.flagColor] = flag;
    this.flagHistory.push(flag);
    if ((ref = this.realTimeFlags) != null) {
      ref.create(flag);
    }
    return Backbone.Mediator.publish('level:flag-updated', flag);
  };

  LevelFlagsView.prototype.onDeletePressed = function(e) {
    if (!this.realTime) {
      return;
    }
    return Backbone.Mediator.publish('surface:remove-selected-flag', {});
  };

  LevelFlagsView.prototype.onRemoveFlag = function(e) {
    var flag, now;
    delete this.flags[e.color];
    now = this.world.dt * this.world.frames.length;
    flag = {
      player: me.id,
      team: me.team,
      color: e.color,
      time: now,
      active: false,
      source: 'click'
    };
    this.flagHistory.push(flag);
    return Backbone.Mediator.publish('level:flag-updated', flag);
  };

  LevelFlagsView.prototype.onNewWorld = function(event) {
    if (event.world.name !== this.world.name) {
      return;
    }
    return this.world = this.options.world = event.world;
  };

  return LevelFlagsView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelFlagsView.js.map
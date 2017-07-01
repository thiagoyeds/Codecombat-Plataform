require.register("templates/play/level/tome/cast-button-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
var locals_ = (locals || {}),view = locals_.view;if ( view.options.level.isType('game-dev'))
{
buf.push("<button class=\"btn btn-lg btn-illustrated btn-success game-dev-play-btn\"><span data-i18n=\"play_level.test_level\"></span></button><button class=\"btn btn-lg btn-illustrated btn-success done-button secret\"><span data-i18n=\"play_level.done\"></span></button>");
}
else
{
buf.push("<button" + (jade.attrs({ 'title':(view.castVerbose()), "class": [('btn'),('btn-lg'),('btn-illustrated'),('cast-button')] }, {"title":true})) + "><span data-i18n=\"play_level.tome_cast_button_ran\">Ran</span></button>");
if ( !view.observing)
{
if ( view.mirror)
{
buf.push("<div class=\"ladder-submission-view\"></div>");
}
else
{
buf.push("<button" + (jade.attrs({ 'title':(view.castRealTimeVerbose()), "class": [('btn'),('btn-lg'),('btn-illustrated'),('submit-button')] }, {"title":true})) + "><span data-i18n=\"play_level.tome_submit_button\">Submit</span><span class=\"spl secret submit-again-time\"></span></button><button class=\"btn btn-lg btn-illustrated btn-success done-button secret\"><span data-i18n=\"play_level.done\">Done</span></button>");
if ( view.autoSubmitsToLadder)
{
buf.push("<div class=\"hidden\"><div class=\"ladder-submission-view\"></div></div>");
}
}
}
};return buf.join("");
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

;require.register("views/play/level/tome/CastButtonView", function(exports, require, module) {
var CastButtonView, CocoView, LadderSubmissionView, LevelSession, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/cast-button-view');

me = require('core/auth').me;

LadderSubmissionView = require('views/play/common/LadderSubmissionView');

LevelSession = require('models/LevelSession');

module.exports = CastButtonView = (function(superClass) {
  extend(CastButtonView, superClass);

  CastButtonView.prototype.id = 'cast-button-view';

  CastButtonView.prototype.template = template;

  CastButtonView.prototype.events = {
    'click .cast-button': 'onCastButtonClick',
    'click .submit-button': 'onCastRealTimeButtonClick',
    'click .done-button': 'onDoneButtonClick',
    'click .game-dev-play-btn': 'onClickGameDevPlayButton'
  };

  CastButtonView.prototype.subscriptions = {
    'tome:spell-changed': 'onSpellChanged',
    'tome:cast-spells': 'onCastSpells',
    'tome:manual-cast-denied': 'onManualCastDenied',
    'god:new-world-created': 'onNewWorld',
    'goal-manager:new-goal-states': 'onNewGoalStates',
    'god:goals-calculated': 'onGoalsCalculated',
    'playback:ended-changed': 'onPlaybackEndedChanged'
  };

  function CastButtonView(options) {
    this.updateReplayability = bind(this.updateReplayability, this);
    var ref, ref1;
    CastButtonView.__super__.constructor.call(this, options);
    this.spells = options.spells;
    this.castShortcut = '⇧↵';
    this.updateReplayabilityInterval = setInterval(this.updateReplayability, 1000);
    this.observing = options.session.get('creator') !== me.id;
    if ((ref = this.options.level.get('slug')) === 'ace-of-coders' || ref === 'elemental-wars' || ref === 'the-battle-of-sky-span') {
      this.loadMirrorSession();
    }
    this.mirror = this.mirrorSession != null;
    this.autoSubmitsToLadder = (ref1 = this.options.level.get('slug')) === 'wakka-maul';
  }

  CastButtonView.prototype.destroy = function() {
    clearInterval(this.updateReplayabilityInterval);
    return CastButtonView.__super__.destroy.call(this);
  };

  CastButtonView.prototype.afterRender = function() {
    var ref, ref1, ref2, ref3, spell, spellKey;
    CastButtonView.__super__.afterRender.call(this);
    this.castButton = $('.cast-button', this.$el);
    ref = this.spells;
    for (spellKey in ref) {
      spell = ref[spellKey];
      if ((ref1 = spell.view) != null) {
        ref1.createOnCodeChangeHandlers();
      }
    }
    if (this.options.level.get('hidesSubmitUntilRun') || this.options.level.get('hidesRealTimePlayback') || this.options.level.isType('web-dev')) {
      this.$el.find('.submit-button').hide();
    }
    if (((ref2 = this.options.session.get('state')) != null ? ref2.complete : void 0) && (this.options.level.get('hidesRealTimePlayback') || this.options.level.isType('web-dev'))) {
      this.$el.find('.done-button').show();
    }
    if ((ref3 = this.options.level.get('slug')) === 'course-thornbush-farm' || ref3 === 'thornbush-farm') {
      this.$el.find('.submit-button').hide();
    }
    this.updateReplayability();
    return this.updateLadderSubmissionViews();
  };

  CastButtonView.prototype.attachTo = function(spellView) {
    return this.$el.detach().prependTo(spellView.toolbarView.$el).show();
  };

  CastButtonView.prototype.castShortcutVerbose = function() {
    var enter, shift;
    shift = $.i18n.t('keyboard_shortcuts.shift');
    enter = $.i18n.t('keyboard_shortcuts.enter');
    return shift + "+" + enter;
  };

  CastButtonView.prototype.castVerbose = function() {
    return this.castShortcutVerbose() + ': ' + $.i18n.t('keyboard_shortcuts.run_code');
  };

  CastButtonView.prototype.castRealTimeVerbose = function() {
    var castRealTimeShortcutVerbose;
    castRealTimeShortcutVerbose = (this.isMac() ? 'Cmd' : 'Ctrl') + '+' + this.castShortcutVerbose();
    return castRealTimeShortcutVerbose + ': ' + $.i18n.t('keyboard_shortcuts.run_real_time');
  };

  CastButtonView.prototype.onCastButtonClick = function(e) {
    return Backbone.Mediator.publish('tome:manual-cast', {});
  };

  CastButtonView.prototype.onCastRealTimeButtonClick = function(e) {
    var timeUntilResubmit;
    if (this.options.level.get('replayable') && (timeUntilResubmit = this.options.session.timeUntilResubmit()) > 0) {
      Backbone.Mediator.publish('tome:manual-cast-denied', {
        timeUntilResubmit: timeUntilResubmit
      });
    } else {
      Backbone.Mediator.publish('tome:manual-cast', {
        realTime: true
      });
    }
    return this.updateReplayability();
  };

  CastButtonView.prototype.onClickGameDevPlayButton = function() {
    return Backbone.Mediator.publish('tome:manual-cast', {
      realTime: true
    });
  };

  CastButtonView.prototype.onDoneButtonClick = function(e) {
    var ref;
    if (this.options.level.hasLocalChanges()) {
      return;
    }
    this.options.session.recordScores((ref = this.world) != null ? ref.scores : void 0, this.options.level);
    return Backbone.Mediator.publish('level:show-victory', {
      showModal: true,
      manual: true
    });
  };

  CastButtonView.prototype.onSpellChanged = function(e) {
    return this.updateCastButton();
  };

  CastButtonView.prototype.onCastSpells = function(e) {
    if (e.preload) {
      return;
    }
    this.casting = true;
    if (this.hasStartedCastingOnce) {
      if (!this.options.level.isType('game-dev')) {
        this.playSound('cast', 0.5);
      }
    }
    this.hasStartedCastingOnce = true;
    return this.updateCastButton();
  };

  CastButtonView.prototype.onManualCastDenied = function(e) {
    var wait;
    wait = moment().add(e.timeUntilResubmit, 'ms').fromNow();
    return noty({
      text: "You can try again " + wait + ".",
      layout: 'center',
      type: 'warning',
      killer: false,
      timeout: 6000
    });
  };

  CastButtonView.prototype.onNewWorld = function(e) {
    var myHeroID, ref;
    this.casting = false;
    if (this.hasCastOnce) {
      if (!this.options.level.isType('game-dev')) {
        this.playSound('cast-end', 0.5);
      }
      myHeroID = me.team === 'ogres' ? 'Hero Placeholder 1' : 'Hero Placeholder';
      if (this.autoSubmitsToLadder && !((ref = e.world.thangMap[myHeroID]) != null ? ref.errorsOut : void 0) && !me.get('anonymous')) {
        if (this.ladderSubmissionView) {
          _.delay(((function(_this) {
            return function() {
              var ref1;
              return (ref1 = _this.ladderSubmissionView) != null ? ref1.rankSession() : void 0;
            };
          })(this)), 1000);
        }
      }
    }
    this.hasCastOnce = true;
    this.updateCastButton();
    return this.world = e.world;
  };

  CastButtonView.prototype.onNewGoalStates = function(e) {
    var ref, winnable;
    winnable = e.overallStatus === 'success';
    if (this.winnable === winnable) {
      return;
    }
    this.winnable = winnable;
    this.$el.toggleClass('winnable', this.winnable);
    Backbone.Mediator.publish('tome:winnability-updated', {
      winnable: this.winnable,
      level: this.options.level
    });
    if (this.options.level.get('hidesRealTimePlayback') || this.options.level.isType('web-dev', 'game-dev')) {
      return this.$el.find('.done-button').toggle(this.winnable);
    } else if (this.winnable && ((ref = this.options.level.get('slug')) === 'course-thornbush-farm' || ref === 'thornbush-farm')) {
      return this.$el.find('.submit-button').show();
    }
  };

  CastButtonView.prototype.onGoalsCalculated = function(e) {
    var ref;
    if (e.god !== this.god) {
      return;
    }
    if (!e.preload) {
      return;
    }
    if (this.options.level.get('hidesRealTimePlayback')) {
      return;
    }
    if ((ref = this.options.level.get('slug')) === 'course-thornbush-farm' || ref === 'thornbush-farm') {
      return;
    }
    return this.onNewGoalStates(e);
  };

  CastButtonView.prototype.onPlaybackEndedChanged = function(e) {
    if (!(e.ended && this.winnable)) {
      return;
    }
    return this.$el.toggleClass('has-seen-winning-replay', true);
  };

  CastButtonView.prototype.updateCastButton = function() {
    if (_.some(this.spells, (function(_this) {
      return function(spell) {
        return !spell.loaded;
      };
    })(this))) {
      return;
    }
    return async.some(_.values(this.spells), (function(_this) {
      return function(spell, callback) {
        return spell.hasChangedSignificantly(spell.getSource(), null, callback);
      };
    })(this), (function(_this) {
      return function(castable) {
        var castText, ref;
        Backbone.Mediator.publish('tome:spell-has-changed-significantly-calculation', {
          hasChangedSignificantly: castable
        });
        _this.castButton.toggleClass('castable', castable).toggleClass('casting', _this.casting);
        if (_this.casting) {
          castText = $.i18n.t('play_level.tome_cast_button_running');
        } else if (castable || true) {
          castText = $.i18n.t('play_level.tome_cast_button_run');
          if (!_this.options.level.get('hidesRunShortcut')) {
            castText += ' ' + _this.castShortcut;
          }
        } else {
          castText = $.i18n.t('play_level.tome_cast_button_ran');
        }
        _this.castButton.text(castText);
        return (ref = _this.ladderSubmissionView) != null ? ref.updateButton() : void 0;
      };
    })(this));
  };

  CastButtonView.prototype.updateReplayability = function() {
    var disabled, submitAgainLabel, submitButton, timeUntilResubmit, waitTime;
    if (this.destroyed) {
      return;
    }
    if (!this.options.level.get('replayable')) {
      return;
    }
    timeUntilResubmit = this.options.session.timeUntilResubmit();
    disabled = timeUntilResubmit > 0;
    submitButton = this.$el.find('.submit-button').toggleClass('disabled', disabled);
    submitAgainLabel = submitButton.find('.submit-again-time').toggleClass('secret', !disabled);
    if (disabled) {
      waitTime = moment().add(timeUntilResubmit, 'ms').fromNow();
      return submitAgainLabel.text(waitTime);
    }
  };

  CastButtonView.prototype.loadMirrorSession = function() {
    var mirrorSession, url;
    url = "/db/level/" + (this.options.level.get('slug') || this.options.level.id) + "/session";
    url += "?team=" + (me.team === 'humans' ? 'ogres' : 'humans');
    mirrorSession = new LevelSession().setURL(url);
    return this.mirrorSession = this.supermodel.loadModel(mirrorSession, {
      cache: false
    }).model;
  };

  CastButtonView.prototype.updateLadderSubmissionViews = function() {
    var key, placeholder, ref, subview;
    ref = this.subviews;
    for (key in ref) {
      subview = ref[key];
      if (subview instanceof LadderSubmissionView) {
        this.removeSubView(subview);
      }
    }
    placeholder = this.$el.find('.ladder-submission-view');
    if (!placeholder.length) {
      return;
    }
    this.ladderSubmissionView = new LadderSubmissionView({
      session: this.options.session,
      level: this.options.level,
      mirrorSession: this.mirrorSession
    });
    return this.insertSubView(this.ladderSubmissionView, placeholder);
  };

  return CastButtonView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/CastButtonView.js.map
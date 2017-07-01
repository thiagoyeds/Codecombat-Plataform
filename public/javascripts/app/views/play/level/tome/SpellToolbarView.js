require.register("views/play/level/tome/SpellToolbarView", function(exports, require, module) {
var CocoView, SpellToolbarView, template,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/tome/spell_toolbar');

module.exports = SpellToolbarView = (function(superClass) {
  extend(SpellToolbarView, superClass);

  SpellToolbarView.prototype.className = 'spell-toolbar-view';

  SpellToolbarView.prototype.template = template;

  SpellToolbarView.prototype.progressHoverDelay = 500;

  SpellToolbarView.prototype.subscriptions = {
    'tome:spell-step-backward': 'onStepBackward',
    'tome:spell-step-forward': 'onStepForward'
  };

  SpellToolbarView.prototype.events = {
    'mousedown .spell-progress': 'onProgressMouseDown',
    'mouseup .spell-progress': 'onProgressMouseUp',
    'mousemove .spell-progress': 'onProgressMouseMove',
    'tapstart .spell-progress': 'onProgressTapStart',
    'tapend .spell-progress': 'onProgressTapEnd',
    'tapmove .spell-progress': 'onProgressTapMove',
    'click .step-backward': 'onStepBackward',
    'click .step-forward': 'onStepForward'
  };

  function SpellToolbarView(options) {
    SpellToolbarView.__super__.constructor.call(this, options);
    this.ace = options.ace;
  }

  SpellToolbarView.prototype.afterRender = function() {
    return SpellToolbarView.__super__.afterRender.call(this);
  };

  SpellToolbarView.prototype.toggleFlow = function(to) {
    return this.$el.find('.flow').toggle(to);
  };

  SpellToolbarView.prototype.setStatementIndex = function(statementIndex) {
    var ref, ref1, ref2, total;
    if (!(total = (ref = this.callState) != null ? ref.statementsExecuted : void 0)) {
      return;
    }
    this.statementIndex = Math.min(total - 1, Math.max(0, statementIndex));
    this.statementRatio = this.statementIndex / (total - 1);
    this.statementTime = (ref1 = (ref2 = this.callState.statements[this.statementIndex]) != null ? ref2.userInfo.time : void 0) != null ? ref1 : 0;
    this.$el.find('.progress-bar').css('width', 100 * this.statementRatio + '%');
    this.$el.find('.step-backward').prop('disabled', this.statementIndex === 0);
    this.$el.find('.step-forward').prop('disabled', this.statementIndex === total - 1);
    this.updateMetrics();
    return _.defer((function(_this) {
      return function() {
        return Backbone.Mediator.publish('tome:spell-statement-index-updated', {
          statementIndex: _this.statementIndex,
          ace: _this.ace
        });
      };
    })(this));
  };

  SpellToolbarView.prototype.updateMetrics = function() {
    var $metrics, left, statementsExecuted, titleSuffix;
    statementsExecuted = this.callState.statementsExecuted;
    $metrics = this.$el.find('.metrics');
    if (this.suppressMetricsUpdates || !(statementsExecuted || this.metrics.statementsExecuted)) {
      return $metrics.hide();
    }
    if (this.metrics.callsExecuted > 1) {
      $metrics.find('.call-index').text(this.callIndex + 1);
      $metrics.find('.calls-executed').text(this.metrics.callsExecuted);
      $metrics.find('.calls-metric').show().attr('title', "Method call " + (this.callIndex + 1) + " of " + this.metrics.callsExecuted + " calls");
    } else {
      $metrics.find('.calls-metric').hide();
    }
    if (this.metrics.statementsExecuted) {
      $metrics.find('.statement-index').text(this.statementIndex + 1);
      $metrics.find('.statements-executed').text(statementsExecuted);
      if (this.metrics.statementsExecuted > statementsExecuted) {
        $metrics.find('.statements-executed-total').text(" (" + this.metrics.statementsExecuted + ")");
        titleSuffix = " (" + this.metrics.statementsExecuted + " statements total)";
      } else {
        $metrics.find('.statements-executed-total').text('');
        titleSuffix = '';
      }
      $metrics.find('.statements-metric').show().attr('title', "Statement " + (this.statementIndex + 1) + " of " + statementsExecuted + " this call" + titleSuffix);
    } else {
      $metrics.find('.statements-metric').hide();
    }
    left = this.$el.find('.scrubber-handle').position().left + this.$el.find('.spell-progress').position().left;
    return $metrics.finish().show().css({
      left: left - $metrics.width() / 2
    }).delay(2000).fadeOut('fast');
  };

  SpellToolbarView.prototype.setStatementRatio = function(ratio) {
    var ref, statementIndex, total;
    if (!(total = (ref = this.callState) != null ? ref.statementsExecuted : void 0)) {
      return;
    }
    statementIndex = Math.floor(ratio * total);
    if (statementIndex !== this.statementIndex) {
      return this.setStatementIndex(statementIndex);
    }
  };

  SpellToolbarView.prototype.onProgressMouseDown = function(e) {
    this.dragging = true;
    this.scrubProgress(e);
    return Backbone.Mediator.publish('level:set-playing', {
      playing: false
    });
  };

  SpellToolbarView.prototype.onProgressMouseUp = function(e) {
    return this.dragging = false;
  };

  SpellToolbarView.prototype.onProgressMouseMove = function(e) {
    if (!this.dragging) {
      return;
    }
    return this.scrubProgress(e);
  };

  SpellToolbarView.prototype.onProgressTapStart = function(e, touchData) {
    this.dragging = true;
    return this.scrubProgress(e, touchData);
  };

  SpellToolbarView.prototype.onProgressTapEnd = function(e, touchData) {
    return this.dragging = false;
  };

  SpellToolbarView.prototype.onProgressTapMove = function(e, touchData) {
    if (!this.dragging) {
      return;
    }
    return this.scrubProgress(e, touchData);
  };

  SpellToolbarView.prototype.scrubProgress = function(e, touchData) {
    var offsetX, ref, ref1, screenOffsetX;
    screenOffsetX = (ref = (ref1 = e.clientX) != null ? ref1 : touchData != null ? touchData.position.x : void 0) != null ? ref : 0;
    offsetX = screenOffsetX - this.$el.find('.spell-progress').offset().left;
    offsetX = Math.max(offsetX, 0);
    this.setStatementRatio(offsetX / this.$el.find('.spell-progress').width());
    this.updateTime();
    return this.updateScroll();
  };

  SpellToolbarView.prototype.onStepBackward = function(e) {
    return this.step(-1);
  };

  SpellToolbarView.prototype.onStepForward = function(e) {
    return this.step(1);
  };

  SpellToolbarView.prototype.step = function(delta) {
    var lastTime;
    lastTime = this.statementTime;
    this.setStatementIndex(this.statementIndex + delta);
    if (this.statementTime !== lastTime) {
      this.updateTime();
    }
    this.updateScroll();
    return Backbone.Mediator.publish('level:set-playing', {
      playing: false
    });
  };

  SpellToolbarView.prototype.updateTime = function() {
    this.maintainIndexScrub = true;
    if (this.maintainIndexScrubTimeout) {
      clearTimeout(this.maintainIndexScrubTimeout);
    }
    this.maintainIndexScrubTimeout = _.delay(((function(_this) {
      return function() {
        return _this.maintainIndexScrub = false;
      };
    })(this)), 500);
    return Backbone.Mediator.publish('level:set-time', {
      time: this.statementTime,
      scrubDuration: 500
    });
  };

  SpellToolbarView.prototype.updateScroll = function() {
    var currentLine, ref, ref1, ref2, statementStart, text;
    if (!(statementStart = (ref = this.callState) != null ? (ref1 = ref.statements) != null ? (ref2 = ref1[this.statementIndex]) != null ? ref2.range[0] : void 0 : void 0 : void 0)) {
      return;
    }
    text = this.ace.getValue();
    currentLine = statementStart.row;
    return this.ace.scrollToLine(currentLine, true, true);
  };

  SpellToolbarView.prototype.setCallState = function(callState, statementIndex, callIndex, metrics) {
    var ref;
    this.callIndex = callIndex;
    this.metrics = metrics;
    if (callState === this.callState && statementIndex === this.statementIndex) {
      return;
    }
    if (!(this.callState = callState)) {
      return;
    }
    this.suppressMetricsUpdates = true;
    if (!this.maintainIndexScrub && !this.dragging && (statementIndex != null) && ((ref = callState.statements[statementIndex]) != null ? ref.userInfo.time : void 0) !== this.statementTime) {
      this.setStatementIndex(statementIndex);
    } else {
      this.setStatementRatio(this.statementRatio);
    }
    return this.suppressMetricsUpdates = false;
  };

  return SpellToolbarView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/SpellToolbarView.js.map
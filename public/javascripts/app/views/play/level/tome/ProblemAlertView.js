require.register("views/play/level/tome/ProblemAlertView", function(exports, require, module) {
var CocoView, GameMenuModal, ProblemAlertView, me, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

GameMenuModal = require('views/play/menu/GameMenuModal');

template = require('templates/play/level/tome/problem_alert');

me = require('core/auth').me;

module.exports = ProblemAlertView = (function(superClass) {
  extend(ProblemAlertView, superClass);

  ProblemAlertView.prototype.id = 'problem-alert-view';

  ProblemAlertView.prototype.className = 'problem-alert';

  ProblemAlertView.prototype.template = template;

  ProblemAlertView.prototype.subscriptions = {
    'tome:show-problem-alert': 'onShowProblemAlert',
    'tome:hide-problem-alert': 'onHideProblemAlert',
    'level:restart': 'onHideProblemAlert',
    'tome:jiggle-problem-alert': 'onJiggleProblemAlert',
    'tome:manual-cast': 'onHideProblemAlert'
  };

  ProblemAlertView.prototype.events = {
    'click .close': 'onRemoveClicked',
    'click': function() {
      return Backbone.Mediator.publish('tome:focus-editor', {});
    }
  };

  function ProblemAlertView(options) {
    this.onWindowResize = bind(this.onWindowResize, this);
    this.supermodel = options.supermodel;
    ProblemAlertView.__super__.constructor.call(this, options);
    this.level = options.level;
    this.session = options.session;
    if (options.problem != null) {
      this.problem = options.problem;
      this.onWindowResize();
    } else {
      this.$el.hide();
    }
    $(window).on('resize', this.onWindowResize);
  }

  ProblemAlertView.prototype.destroy = function() {
    $(window).off('resize', this.onWindowResize);
    return ProblemAlertView.__super__.destroy.call(this);
  };

  ProblemAlertView.prototype.afterRender = function() {
    ProblemAlertView.__super__.afterRender.call(this);
    if (this.problem != null) {
      this.$el.addClass('alert').addClass("alert-" + this.problem.level).hide().fadeIn('slow');
      if (!this.problem.hint) {
        this.$el.addClass('no-hint');
      }
      return this.playSound('error_appear');
    }
  };

  ProblemAlertView.prototype.setProblemMessage = function() {
    var age, format, message, ref;
    if (this.problem != null) {
      format = function(s) {
        if (s != null) {
          return marked(s.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        }
      };
      message = this.problem.message;
      if ((this.problem.hint != null) && /(?:null|undefined)/.test(this.problem.hint)) {
        age = (ref = this.problem.userInfo) != null ? ref.age : void 0;
        if (age != null) {
          if (/^Line \d+:/.test(message)) {
            message = message.replace(/^(Line \d+)/, "$1, time " + (age.toFixed(1)));
          } else {
            message = "Time " + (age.toFixed(1)) + ": " + message;
          }
        }
      }
      this.message = format(message);
      return this.hint = format(this.problem.hint);
    }
  };

  ProblemAlertView.prototype.onShowProblemAlert = function(data) {
    var ref, ref1;
    if (!$('#code-area').is(":visible")) {
      return;
    }
    if (this.problem != null) {
      if (this.$el.hasClass("alert-" + this.problem.level)) {
        this.$el.removeClass("alert-" + this.problem.level);
      }
      if (this.$el.hasClass("no-hint")) {
        this.$el.removeClass("no-hint");
      }
    }
    this.problem = data.problem;
    this.lineOffsetPx = data.lineOffsetPx || 0;
    this.$el.show();
    this.onWindowResize();
    this.setProblemMessage();
    this.render();
    this.onJiggleProblemAlert();
    return (ref = application.tracker) != null ? ref.trackEvent('Show problem alert', {
      levelID: this.level.get('slug'),
      ls: (ref1 = this.session) != null ? ref1.get('_id') : void 0
    }) : void 0;
  };

  ProblemAlertView.prototype.onJiggleProblemAlert = function() {
    var pauseJiggle;
    if (this.problem == null) {
      return;
    }
    if (!this.$el.is(":visible")) {
      this.$el.show();
    }
    this.$el.addClass('jiggling');
    this.playSound('error_appear');
    pauseJiggle = (function(_this) {
      return function() {
        var ref;
        return (ref = _this.$el) != null ? ref.removeClass('jiggling') : void 0;
      };
    })(this);
    return _.delay(pauseJiggle, 1000);
  };

  ProblemAlertView.prototype.onHideProblemAlert = function() {
    if (!this.$el.is(':visible')) {
      return;
    }
    return this.onRemoveClicked();
  };

  ProblemAlertView.prototype.onRemoveClicked = function() {
    this.playSound('menu-button-click');
    this.$el.hide();
    return Backbone.Mediator.publish('tome:focus-editor', {});
  };

  ProblemAlertView.prototype.onWindowResize = function(e) {
    var codeAreaWidth, goalsViewWidth, levelContentWidth;
    if (this.problem != null) {
      levelContentWidth = $('.level-content').outerWidth(true);
      goalsViewWidth = $('#goals-view').outerWidth(true);
      codeAreaWidth = $('#code-area').outerWidth(true);
      this.$el.css('max-width', levelContentWidth - codeAreaWidth - goalsViewWidth + 40 + 'px');
      this.$el.css('right', codeAreaWidth + 'px');
      return this.$el.css('top', (110 + this.lineOffsetPx) + 'px');
    }
  };

  return ProblemAlertView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/tome/ProblemAlertView.js.map
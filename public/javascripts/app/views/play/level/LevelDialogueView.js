require.register("templates/play/level/level-dialogue-view", function(exports, require, module) {
var __templateData = function anonymous(locals
/**/) {
var buf = [];
buf.push("<div class=\"dialogue-area\"><p class=\"bubble dialogue-bubble\"></p></div>");;return buf.join("");
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

;require.register("views/play/level/LevelDialogueView", function(exports, require, module) {
var CocoView, DialogueAnimator, LevelDialogueView, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

CocoView = require('views/core/CocoView');

template = require('templates/play/level/level-dialogue-view');

DialogueAnimator = require('./DialogueAnimator');

module.exports = LevelDialogueView = (function(superClass) {
  extend(LevelDialogueView, superClass);

  LevelDialogueView.prototype.id = 'level-dialogue-view';

  LevelDialogueView.prototype.template = template;

  LevelDialogueView.prototype.subscriptions = {
    'sprite:speech-updated': 'onSpriteDialogue',
    'level:sprite-clear-dialogue': 'onSpriteClearDialogue',
    'level:shift-space-pressed': 'onShiftSpacePressed',
    'level:escape-pressed': 'onEscapePressed',
    'sprite:dialogue-sound-completed': 'onDialogueSoundCompleted'
  };

  LevelDialogueView.prototype.events = {
    'click': 'onClick',
    'click a': 'onClickLink'
  };

  function LevelDialogueView(options) {
    this.animateEnterButton = bind(this.animateEnterButton, this);
    this.addMoreMessage = bind(this.addMoreMessage, this);
    LevelDialogueView.__super__.constructor.call(this, options);
    this.level = options.level;
    this.sessionID = options.sessionID;
  }

  LevelDialogueView.prototype.onClick = function(e) {
    return Backbone.Mediator.publish('tome:focus-editor', {});
  };

  LevelDialogueView.prototype.onClickLink = function(e) {
    var PlayItemsModal, route;
    route = $(e.target).attr('href');
    if (route && /item-store/.test(route)) {
      PlayItemsModal = require('views/play/modal/PlayItemsModal');
      this.openModalView(new PlayItemsModal({
        supermodel: this.supermodal
      }));
      return e.stopPropagation();
    }
  };

  LevelDialogueView.prototype.onSpriteDialogue = function(e) {
    var ref;
    if (!e.message) {
      return;
    }
    this.$el.addClass('active speaking');
    $('body').addClass('dialogue-view-active');
    this.setMessage(e.message, e.mood, e.responses);
    return (ref = window.tracker) != null ? ref.trackEvent('Heard Sprite', {
      message: e.message,
      label: e.message,
      ls: this.sessionID
    }) : void 0;
  };

  LevelDialogueView.prototype.onDialogueSoundCompleted = function() {
    return this.$el.removeClass('speaking');
  };

  LevelDialogueView.prototype.onSpriteClearDialogue = function() {
    this.$el.removeClass('active speaking');
    return $('body').removeClass('dialogue-view-active');
  };

  LevelDialogueView.prototype.setMessage = function(message, mood, responses) {
    var button, group, j, len, response, s, sk;
    message = marked(message);
    message = message.replace(/&lt;i class=&#39;(.+?)&#39;&gt;&lt;\/i&gt;/, "<i class='$1'></i>");
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    this.bubble = $('.dialogue-bubble', this.$el);
    if (this.lastMood) {
      this.bubble.removeClass(this.lastMood);
    }
    this.lastMood = mood;
    this.bubble.text('');
    group = $('<div class="enter secret"></div>');
    this.bubble.append(group);
    if (responses) {
      this.lastResponses = responses;
      for (j = 0, len = responses.length; j < len; j++) {
        response = responses[j];
        button = $('<button class="btn btn-small banner"></button>').text(response.text);
        if (response.buttonClass) {
          button.addClass(response.buttonClass);
        }
        group.append(button);
        response.button = $('button:last', group);
      }
    } else {
      s = $.i18n.t('common.continue', {
        defaultValue: 'Continue'
      });
      sk = $.i18n.t('play_level.skip_tutorial', {
        defaultValue: 'skip: esc'
      });
      if (!this.escapePressed && !this.isFullScreen()) {
        group.append('<span class="hud-hint">' + sk + '</span>');
      }
      group.append($('<button class="btn btn-small banner with-dot">' + s + ' <div class="dot"></div></button>'));
      this.lastResponses = null;
    }
    this.animator = new DialogueAnimator(message, this.bubble);
    return this.messageInterval = setInterval(this.addMoreMessage, 1000 / 30);
  };

  LevelDialogueView.prototype.isFullScreen = function() {
    return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  };

  LevelDialogueView.prototype.addMoreMessage = function() {
    var buttons, channel, f, i, j, len, ref, response;
    if (this.animator.done()) {
      clearInterval(this.messageInterval);
      this.messageInterval = null;
      $('.enter', this.bubble).removeClass('secret').css('opacity', 0.0).delay(500).animate({
        opacity: 1.0
      }, 500, this.animateEnterButton);
      if (this.lastResponses) {
        buttons = $('.enter button');
        ref = this.lastResponses;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          response = ref[i];
          channel = response.channel.replace('level-set-playing', 'level:set-playing');
          f = (function(_this) {
            return function(r) {
              return function() {
                return setTimeout((function() {
                  return Backbone.Mediator.publish(channel, r.event || {});
                }), 10);
              };
            };
          })(this);
          $(buttons[i]).click(f(response));
        }
      } else {
        $('.enter', this.bubble).click(function() {
          return Backbone.Mediator.publish('script:end-current-script', {});
        });
      }
      return;
    }
    return this.animator.tick();
  };

  LevelDialogueView.prototype.onShiftSpacePressed = function(e) {
    var channel, r, ref;
    this.shiftSpacePressed = (this.shiftSpacePressed || 0) + 1;
    if (!((ref = this.lastResponses) != null ? ref.length : void 0)) {
      return;
    }
    r = this.lastResponses[this.lastResponses.length - 1];
    channel = r.channel.replace('level-set-playing', 'level:set-playing');
    return _.delay((function() {
      return Backbone.Mediator.publish(channel, r.event || {});
    }), 10);
  };

  LevelDialogueView.prototype.onEscapePressed = function(e) {
    return this.escapePressed = true;
  };

  LevelDialogueView.prototype.animateEnterButton = function() {
    var button, dot;
    if (!this.bubble) {
      return;
    }
    button = $('.enter', this.bubble);
    dot = $('.dot', button);
    return dot.animate({
      opacity: 0.2
    }, 300).animate({
      opacity: 1.9
    }, 600, this.animateEnterButton);
  };

  LevelDialogueView.prototype.destroy = function() {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    return LevelDialogueView.__super__.destroy.call(this);
  };

  return LevelDialogueView;

})(CocoView);
});

;
//# sourceMappingURL=/javascripts/app/views/play/level/LevelDialogueView.js.map